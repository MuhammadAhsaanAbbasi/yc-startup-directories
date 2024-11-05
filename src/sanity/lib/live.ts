import { defineLive } from "next-sanity";
import "server-only";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
    client,
    serverToken: process.env.SANITY_SERVER_TOKEN, // Add server token here
    // browserToken: process.env.NEXT_PUBLIC_SANITY_BROWSER_TOKEN, // Add browser token here
});
