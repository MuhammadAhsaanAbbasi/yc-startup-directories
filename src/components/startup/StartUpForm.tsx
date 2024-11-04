"use client";
import React, { useEffect, useState, useTransition } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { StartUpFormSchema } from '@/lib/utils/StartupForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { Textarea } from '../ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { CreateStartUp } from '@/lib/actions/startup-form.actions';
import { toast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const StartUpForm = ({ StartUpId }: { StartUpId?: string }) => {
    const [StartUpDetails, setStartUpDetails] = useState<StartupCardProps>();

    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const form = useForm<z.infer<typeof StartUpFormSchema>>({
        resolver: zodResolver(StartUpFormSchema),
        defaultValues: {
            title: '',
            description: '',
            category: '',
            pitch: '',
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            const post = await client.fetch(STARTUP_BY_ID_QUERY, { id: StartUpId });
            if (post) setStartUpDetails(post);
        };
        if (StartUpId) {
            fetchData();
        }
    }, [StartUpId]);

    useEffect(() => {
        if (StartUpDetails) {
            form.reset({
                title: StartUpDetails.title || '',
                description: StartUpDetails.description || '',
                category: StartUpDetails.category || '',
                pitch: StartUpDetails.pitch || '',
            });
        }
    }, [StartUpDetails, form]);

    const onSubmit = (values: z.infer<typeof StartUpFormSchema>) => {
        startTransition(() => {
            CreateStartUp(values, StartUpId)
                .then((data) => {
                    if (data?.error) {
                        toast({
                            title: 'Failed',
                            description: data?.error.toString(),
                            variant: 'destructive',
                            duration: 2000,
                        });
                    }
                    if (data.success) {
                        toast({
                            title: 'Success!',
                            description: data?.message,
                            duration: 2000,
                        });
                        router.push(`/startup/${data.success._id}`);
                    }
                })
                .catch((error) => {
                    toast({
                        title: 'Failed',
                        description: error.message,
                        variant: 'destructive',
                        duration: 2000,
                    });
                })
                .finally(() => {
                    form.reset();
                });
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="startup-form">
                {/* Title Field */}
                <FormField
                    control={form.control}
                    name={'title'}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor={'title'} className="startup-form_label">
                                Title
                            </FormLabel>
                            <FormControl>
                                <Input
                                    id={'title'}
                                    {...field}
                                    type="text"
                                    placeholder="StartUp Title"
                                    className={'startup-form_input'}
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

                {/* Description Field */}
                <FormField
                    control={form.control}
                    name={'description'}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor={'description'} className="startup-form_label">
                                Description
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    id={'description'}
                                    {...field}
                                    placeholder="StartUp Description"
                                    className={'startup-form_textarea'}
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

                {/* Image Field */}
                {
                    StartUpId ? (
                        <div className='flex items-center gap-3'>
                            {/* Image */}
                            {StartUpDetails?.image && (
                                <Image
                                    src={StartUpDetails.image}
                                    alt={StartUpDetails.title || ""}
                                    width={200}
                                    height={200}
                                />
                            )}

                            {/* Image Field */}
                            <FormField
                                control={form.control}
                                name={'image'}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col justify-center">
                                        <FormLabel htmlFor={'image'} className="startup-form_label">
                                            Image
                                        </FormLabel>
                                        <FormControl>
                                            <input
                                                id={'image'}
                                                type="file"
                                                className={'startup-form_input'}
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    field.onChange(file);
                                                }}
                                                disabled={isPending}
                                                ref={field.ref}
                                                name={field.name}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ) : (
                        < FormField
                            control={form.control}
                            name={'image'}
                            render={({ field }) => (
                                <FormItem className="flex flex-col justify-center">
                                    <FormLabel htmlFor={'image'} className="startup-form_label">
                                        Image
                                    </FormLabel>
                                    <FormControl>
                                        <input
                                            id={'image'}
                                            type="file"
                                            className={'startup-form_input'}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                field.onChange(file);
                                            }}
                                            disabled={isPending}
                                            ref={field.ref}
                                            name={field.name}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )
                }

                {/* Category Field */}
                <FormField
                    control={form.control}
                    name={'category'}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor={'category'} className="startup-form_label">
                                Category
                            </FormLabel>
                            <FormControl>
                                <Input
                                    id={'category'}
                                    {...field}
                                    type="text"
                                    placeholder="StartUp Category"
                                    className={'startup-form_input'}
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

                {/* Pitch Field */}
                <FormField
                    control={form.control}
                    name={'pitch'}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor={'pitch'} className="startup-form_label">
                                StartUp Pitch
                            </FormLabel>
                            <FormControl>
                                <MDEditor
                                    id={'pitch'}
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e as string);
                                    }}
                                    preview="edit"
                                    height={400}
                                    style={{ borderRadius: 20, overflow: 'hidden' }}
                                    textareaProps={{
                                        placeholder: "Briefly Describe Your Ideas, What Problem it's solves",
                                    }}
                                    previewOptions={{
                                        disallowedElements: ['style'],
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="rounded-lg disabled:cursor-progress text-lg w-full py-6"
                    disabled={isPending}
                >
                    {isPending ? <LoaderCircle className="animate-spin size-6" /> 
                    : StartUpId ? 'Update StartUp' : 'Create StartUp'
                }
                </Button>
            </form>
        </Form>
    );
};

export default StartUpForm;
