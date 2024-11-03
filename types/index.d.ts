

declare interface UserProps {
    email?: string | null;
    name?: string | null;
    image?: string | null;
}

declare type StartupCardProps = {
    _id: string;
    title: string | null;
    slug: Slug | null;
    _createdAt: string;
    author?: {
        _id: string;
        name: string | null;
        username: string | null;
        image: string | null;
        bio: string | null;
    } | null;
    views: number | null;
    description: string | null;
    category: string | null;
    image: string | null;
    pitch: string | null;
};