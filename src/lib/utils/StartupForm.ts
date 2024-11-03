import * as z from "zod"

export const StartUpFormSchema = z.object({
    title: z.string(),
    description: z.string().min(20, { message: "The 20 Characters Description is Required for StartUp" }),
    image: z.instanceof(File).refine(file => {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        return validTypes.includes(file.type);
    }, {
        message: 'Invalid file type. Only JPEG, PNG, and GIF are allowed.',
    }),
    category: z.string().min(3, { message: "The Category is Required for StartUp" }),
    pitch: z.string().min(25, { message: "Pitch is Required & must be more then 20+ Characters." })
})