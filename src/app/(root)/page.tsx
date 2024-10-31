import SearchInput from "@/components/root/SearchInputForm";
import StartupCard from "@/components/startup/StartupCard";

export default async function Home(
  { searchParams }: {
    searchParams: Promise<{ query: string }>
  }) {
  const query = (await searchParams).query

  const posts: StartupProps[] = [{
      _createdAt : new Date(Date.now()).toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric"
      }),
      views: 55,
      author: {
        _id: 0,
        name: "John Doe",
        image: "https://myapplication-logos.s3.ap-south-1.amazonaws.com/hamzah_syed.png",
      },
      title: "VC Robots",
      category: "Robotics",
      _id: 0,
      image: "https://myapplication-logos.s3.ap-south-1.amazonaws.com/image.png",
      description: "This is a product Description",
    }
  ]

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
              posts.map((post) => (
                <StartupCard post={post} key={post._id} />
              ))
            ) : (
              <p>No StartUps Found</p>
            )}
          </ul>
        </h4>
      </section>
    </main>
  );
}
