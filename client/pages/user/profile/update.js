import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Avatar } from "antd";
import Link from "next/link";
import AuthForm from "../../../components/Forms/AuthForm";
import { UserContext } from "../../../context";
import { useRouter } from "next/router";
import { LoadingOutlined, CameraOutlined } from "@ant-design/icons";

const ProfileUpdate = () => {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  //Profile Image
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (state && state.user) {
      //   console.log("user from state", state.user);
      setUsername(state.user.username);
      setAbout(state.user.about);
      setName(state.user.name);
      setEmail(state.user.email);
      setImage(state.user.image);
    }
  }, [state && state.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name, email, password, secret);
    setLoading(true);
    try {
      const { data } = await axios.put(`/profile-update`, {
        username,
        about,
        name,
        email,
        password,
        secret,
        image,
      });
      console.log("Update Response", data);
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // update local storage, update user, keep token
        let auth = JSON.parse(localStorage.getItem("auth"));
        auth.user = data;
        localStorage.setItem("auth", JSON.stringify(auth));
        // update context
        setState({ ...state, user: data });
        setOk(true);
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
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
    <div className="container-fluid">
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1>Profile</h1>
        </div>
      </div>
      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          {/* Upload Profile Images */}

          <label className="d-flex justify-content-center h5">
            {image && image.url ? (
              <Avatar size={30} src={image.url} className="mt-1" />
            ) : uploading ? (
              <LoadingOutlined className="mt-2" />
            ) : (
              <CameraOutlined className="mt-2" />
            )}
            <input
              onChange={handleImage}
              type="file"
              accept="images/*"
              hidden
            />
          </label>

          <AuthForm
            ProfileUpdate={true}
            username={username}
            setUsername={setUsername}
            about={about}
            setAbout={setAbout}
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            secret={secret}
            setSecret={setSecret}
            loading={loading}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Modal
            title="Congratulations"
            visible={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p>You have succesfully updated your profile.</p>
          </Modal>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="text-center">
            Already Registered?{" "}
            <Link href="/login">
              <a>Login</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
