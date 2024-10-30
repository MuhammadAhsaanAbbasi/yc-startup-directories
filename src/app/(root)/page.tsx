import SearchInput from "@/components/root/SearchInputForm";

export default async function Home(
  {searchParams}: {
    searchParams : Promise<{query: string}>
  }) {
    const query = (await searchParams).query

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
          </h4>
      </section>
    </main>
  );
}
