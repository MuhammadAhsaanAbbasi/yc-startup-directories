import SearchInput from "@/components/root/SearchInput";

export default function Home() {
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
        <SearchInput />
      </section>
    </main>
  );
}
