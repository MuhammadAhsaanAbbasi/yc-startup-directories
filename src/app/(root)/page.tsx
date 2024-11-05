import SearchInput from "@/components/root/SearchInputForm";
import StartupCard from "@/components/startup/StartupCard";
import { SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { auth } from "../../../auth";
import { client } from "@/sanity/lib/client";

// export const 

export default async function Home(
  { searchParams }: {
    searchParams: Promise<{ query: string }>
  }) {
  const query = (await searchParams).query

  const params = {search: query || null};

  const session = await auth();

  console.log(session?.id)
  
const posts = await client.fetch(STARTUPS_QUERY, {search: params.search});

  return (
    <main>
      <section className="orange_container">
        <h2 className="tag uppercase">Pitch Vote And Grow</h2>
        <h1 className="heading">
          Pitch your Startup <br />
          Connect With Entrepreneurs
        </h1>
        <p className="sub-heading">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchInput query={query} />
      </section>
      <section className="section_container">
        <h4 className="text-30-semibold">
          {query ? `Search Results for: ${query}` : "All StartUps"}
          <ul className="my-5 card_grid">
            {posts.length > 0 ? (
              posts.map((post: StartupCardProps) => (
                <StartupCard post={post} key={post._id} />
              ))
            ) : (
              <p>No StartUps Found</p>
            )}
          </ul>
        </h4>
      </section>
      <SanityLive /> 
    </main>
  );
}
