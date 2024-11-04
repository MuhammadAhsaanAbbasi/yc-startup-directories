"use server";

import { z } from "zod";
import { StartUpFormSchema } from "../utils/StartupForm";
import { auth } from "../../../auth";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";


export const CreateStartUp = async (
    values: z.infer<typeof StartUpFormSchema>,
    StartUpId?: string
) => {
    const ValidatedTypes = StartUpFormSchema.safeParse(values);

    if (!ValidatedTypes.success) {
        return {
            error: ValidatedTypes.error,
        };
    }

    const session = await auth();

    if (!session) {
        return { error: "Not Signed-in" };
    }

    const { title, description, image, category, pitch } = ValidatedTypes.data;

    const slug = slugify(title, { lower: true, strict: true });

    // Prepare the startup document
    const startupDetails: StartupDetails = {
        title,
        description,
        category,
        slug: {
            _type: 'slug',
            current: slug,
        },
        author: {
            _type: 'reference',
            _ref: session.id,
        },
        pitch,
        // `image` is optional
    };

    try {
        // Upload the image to Sanity
        if (image) {
            const asset = await writeClient.assets.upload('image', image);
            startupDetails.image = {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: asset._id, // Use the uploaded asset's _id
                },
            };
        }

        if (StartUpId) {
            const post = await client.fetch(STARTUP_BY_ID_QUERY, { id: StartUpId });
            if(session?.id != post.author?._id) {
                return { error: "You can't edit this StartUp!" };
            };

            startupDetails.views = post.views

            const result = await writeClient
                .patch(StartUpId)
                .set(startupDetails)
                .commit();

            console.log(result);

            return { success: result, message: 'StartUp Updated Successfully!' };
        } else {
            startupDetails.views = 0
            const result = await writeClient.create({
                _type: 'startup',
                ...startupDetails,
            });

            console.log(result);

            return { success: result, message: 'StartUp Created Successfully!' };
        }
    } catch (error) {
        if (error instanceof Error) {
            return { error: 'Invalid Credentials!', message: error.message };
        }
        return { message: error };
    }
};
