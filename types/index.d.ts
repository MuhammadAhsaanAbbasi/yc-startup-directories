declare interface UserProps {
    id?: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
}

declare interface StartupProps {
    _createdAt: string,
    views: number,
    author: {
        _id: number,
        name: string,
        image: string,
    },
    title: string,
    category: string,
    _id: number,
    image: string,
    description: string,

}