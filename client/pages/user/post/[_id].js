import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import PostForm from "../../../components/Forms/PostForm";
import { toast } from "react-toastify";
import UserRoute from "../../../components/routes/UserRoute";

const postForm = () => {
  const [post, setPost] = useState({});
  //state
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const router = useRouter();
  // console.log(router);
  const _id = router.query._id;

  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`, {
        content,
        image,
      });
      setPost(data);
      setContent(data.content);
      setImage(data.image);
    } catch (err) {
      console.log(err);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submit post is updates", content, image);
    try {
      const { data } = await axios.put(`/update-post/${_id}`, {
        content,
        image,
      });
      // console.log(data);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Post Updated");
        router.push("/user/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    // formData.append("content", content);
    // console.log(...formData);
    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      // console.log("uploaded Image =>", data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-5 text-light bg-default-image">
          <div className="col text-center">
            <h1>Newsfeed</h1>
          </div>
        </div>

        <div className="row py-3">
          <div className="col-md-8 offset-md-2">
            <PostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default postForm;
