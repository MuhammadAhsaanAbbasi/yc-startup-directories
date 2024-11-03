"use client"
import React, { useEffect, useState, useTransition } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { StartUpFormSchema } from '@/lib/utils/StartupForm'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '../ui/input'
import { client } from '@/sanity/lib/client'
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries'
import { Textarea } from '../ui/textarea'
import MDEditor from '@uiw/react-md-editor';

const StartUpForm = ({ StartUpId }: { StartUpId?: string }) => {

    const [StartUpDetails, setStartUpDetails] = useState<StartupCardProps>()

    const [isPending, startTransition] = useTransition();

    useEffect( () => {
        const fetchData = async () => {
            const post = await client.fetch(STARTUP_BY_ID_QUERY, { id: StartUpId });
            if(post) setStartUpDetails(post)
        }
        fetchData();
    }, [StartUpId])

    const form = useForm<z.infer<typeof StartUpFormSchema>>({
        resolver: zodResolver(StartUpFormSchema),
        defaultValues: {
            title: StartUpDetails?.title || "",
            description: StartUpDetails?.description || "",
            category: StartUpDetails?.category || "",
            pitch: StartUpDetails?.pitch || ""
        }
    })

    const onSubmit = (values: z.infer<typeof StartUpFormSchema>) => {
        startTransition(() => {
            console.log(values)
        })
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='startup-form'>
                <FormField
                    control={form.control}
                    name={"title"}
                    render={({ field }) => (
                        <FormItem className='col-span-2'>
                            <FormLabel htmlFor={"title"} className='startup-form_label'>Title</FormLabel>
                            <FormControl>
                                <Input
                                    id={"title"}
                                    {...field}
                                    type="text"
                                    placeholder='StartUp Title'
                                    className={"startup-form_input"}
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"description"}
                    render={({ field }) => (
                        <FormItem className='col-span-2'>
                            <FormLabel htmlFor={"description"} className='startup-form_label'>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    id={"description"}
                                    {...field}
                                    placeholder='StartUp Description'
                                    className={"startup-form_textarea"}
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"image"}
                    render={({ field }) => (
                        <FormItem className='col-span-2'>
                            <FormLabel htmlFor={"image"} className='startup-form_label'>Image</FormLabel>
                            <FormControl>
                                <Input
                                    id={"image"}
                                    {...field}
                                    type="file"
                                    placeholder='StartUp Title'
                                    className={"startup-form_input"}
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"category"}
                    render={({ field }) => (
                        <FormItem className='col-span-2'>
                            <FormLabel htmlFor={"category"} className='startup-form_label'>Category</FormLabel>
                            <FormControl>
                                <Input
                                    id={"category"}
                                    {...field}
                                    type="text"
                                    placeholder='StartUp Category'
                                    className={"startup-form_input"}
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"pitch"}
                    render={({ field }) => (
                        <FormItem className='col-span-2'>
                            <FormLabel htmlFor={"pitch"} className='startup-form_label'>StartUp Pitch</FormLabel>
                            <FormControl>
                                <MDEditor
                                    id={"title"}
                                    {...field}
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e as string);
                                    }}
                                    preview='edit'
                                    height={400}
                                    style={{borderRadius: 20, overflow: "hidden"}}
                                    textareaProps={{
                                        placeholder: "Briefly Describe Your Ideas, What Problem it's solves"
                                    }}
                                    previewOptions={{
                                        disallowedElements: ["style"]
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

export default StartUpForm