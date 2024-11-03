"use server";

import { z } from "zod";
import { StartUpFormSchema } from "../utils/StartupForm";
import { auth } from "../../../auth";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const CreateStartUp = async (values: z.infer<typeof StartUpFormSchema>) => {

    const ValidatedTypes = StartUpFormSchema.safeParse(values);

    if (!ValidatedTypes.success) {
        return {
            error: ValidatedTypes.error
        }
    }

    const session = await auth();

    if (!session) {
        return { error: "Not Sign-in" }
    }

    const { title, description, image, category, pitch } = ValidatedTypes.data;

    const slug = slugify(title, { lower: true, strict: true })

    try {
        // Upload the image to Sanity
        const asset = await writeClient.assets.upload('image', image);

        // Prepare the startup document
        const startupDetails = {
            title,
            description,
            category,
            image: {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: asset._id, // Use the uploaded asset's _id
                },
            },
            slug: {
                _type: 'slug',
                current: slug,
            },
            views: 0,
            author: {
                _type: 'reference',
                _ref: session.id,
            },
            pitch,
        };

        const result = await writeClient.create({ _type: "startup", ...startupDetails });

        console.log(result)

        return { success: result, message: "StartUp Created Successfully!" }
    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid Credentials!", message: error.message }
        }
        return { message: error }
    }

}