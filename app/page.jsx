import Feed from "@components/Feed";

const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
              Share and Read
            <br />
            <span className="blue_gradient text-center">Anonymous Stories</span>
            </h1>
            <p className="desc text-center">
              Share without Anyone Knowing
            </p>

            {/* Feed */}
            <Feed />
        </section>
    )
}

export default Home;