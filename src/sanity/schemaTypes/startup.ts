import { defineField, defineType } from "sanity";

export const startup = defineType({
    name: "startup",
    title: "StartUp",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
        }),
        defineField({
            name: "author",
            title: "Author",
            type: "reference",
            to: { type: "author" },
        }),
        defineField({
            name: "views",
            title: "Views",
            type: "number",
        }),
        defineField({
            name: "description",
            title: "Description",
            type:"text"
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            validation: (Rule) => Rule.min(1).max(20).required().error("Category is required"),
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "url",
            validation: (Rule) => Rule.required().error("Image Url is required")
        }),
        defineField({
            name: "pitch",
            title: "Startup Pitch",
            type: "markdown",
        }),
    ],
});