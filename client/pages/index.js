import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import ParallaxBG from "../components/cards/ParallaxBG";
import axios from "axios";
import PostPublic from "../components/cards/PostPublic";
import Head from "next/head";
import Link from "next/link";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
  reconnection: true,
});

const Home = ({ posts }) => {
  const [state, setState] = useContext(UserContext);
  const [newsFeed, setNewsFeed] = useState([]);

  // useEffect(() => {
  //   // console.log("SOCKETIO ON JOIN", socket);
  //   socket.on("receive-message", (newMessage) => {
  //     alert(newMessage);
  //   });
  // }, []);

  useEffect(() => {
    socket.on("new-post", (newPost) => {
      setNewsFeed([newPost, ...posts]);
    });
  }, []);

  const head = () => (
    <Head>
      <title> ANIME-CLUB - A social network by dev weeb for weebs </title>
      <meta
        name="description"
        content="A social network by anime lover for anime lovers"
      />
      <meta
        property="og:description"
        content="A social network by anime lover for anime lovers"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ANIMECLUB" />
      <meta property="og:url" content="http://animeclub.com" /> //Domain-Name
      <meta
        property="og:image:secure_url"
        content="http://animeclub.com/images/default.jpg"
      />
    </Head>
  );

  const collection = newsFeed.length > 0 ? newsFeed : posts;

  return (
    <>
      {head()}
      <ParallaxBG url="/images/default.jpg" />
      <div className="container">
        {/* <button
          onClick={() => {
            socket.emit("send-message", "This is Shivanshu");
          }}
        >
          Send Message
        </button> */}
        <div className="row pt-5">
          {collection.map((post) => (
            <div className="col-md-4">
              <Link href={`/post/view/${post._id}`}>
                <a>
                  <PostPublic key={post._id} post={post} />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get("/posts");
  console.log(data);
  return {
    props: {
      posts: data,
    },
  };
}

export default Home;
