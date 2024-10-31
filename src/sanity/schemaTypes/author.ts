import { defineField, defineType } from "sanity";
import { UserIcon } from "lucide-react";

export const author = defineType({
    name: "author",
    title: "Author",
    type: "document",
    icon: UserIcon,
    fields: [
        defineField({
            name: "id",
            type: "number",
        }),
        defineField({
            name: "name",
            title: "Name",
            type: "string",
        }),
        defineField({
            name: "username",
            title: "UserName",
            type: "string",
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "email",
        }),
        defineField({
            name: "image",
            type: "url",
        }),
        defineField({
            name: "bio",
            type: "text",
        }),
    ],
    preview: {
        select: {
            title: "name",
        },
    },
});