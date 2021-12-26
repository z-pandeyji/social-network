import ParallaxBG from "../../../components/cards/ParallaxBG";
import axios from "axios";
import PostPublic from "../../../components/cards/PostPublic";
import Head from "next/head";

const SinglePost = ({ post }) => {
  //   const [state, setState] = useContext(UserContext);
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

  return (
    <>
      {head()}
      <ParallaxBG url="/images/default.jpg" />
      <div className="container">
        <div className="row pt-5">
          <div className="col-md-8 offset-md-2">
            <PostPublic key={post._id} post={post} />
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(contacxt) {
  const { data } = await axios.get(`/post/${contacxt.params._id}`);

  console.log(data);
  return {
    props: {
      post: data,
    },
  };
}

export default SinglePost;
