// live.ts
import { defineLive } from "next-sanity";
import "server-only";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
    client,
    serverToken: process.env.SANITY_SERVER_TOKEN, // Use without NEXT_PUBLIC_
    browserToken: process.env.NEXT_PUBLIC_SANITY_BROWSER_TOKEN, // Keep NEXT_PUBLIC_
});
