import { SyncOutlined } from "@ant-design/icons";
import ProfileUpdate from "../../pages/user/profile/update";

const AuthForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
  username,
  setUsername,
  about,
  setAbout,
  ProfileUpdate,
}) => (
  <form onSubmit={handleSubmit}>
    {ProfileUpdate && (
      <div className="form-group p-2">
        <small>
          <label className="text-muted">Username</label>
        </small>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Enter Username"
        />
      </div>
    )}
    {ProfileUpdate && (
      <div className="form-group p-2">
        <small>
          <label className="text-muted">About</label>
        </small>
        <input
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Write About Yourself..."
        />
      </div>
    )}
    {page !== "login" && (
      <div className="form-group p-2">
        <small>
          <label className="text-muted">Your Name</label>
        </small>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Enter Name"
        />
      </div>
    )}
    <div className="form-group p-2">
      <small>
        <label className="text-muted">Email Address</label>
      </small>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="form-control"
        placeholder="Enter Email Address"
        disabled={ProfileUpdate}
      />
    </div>
    <div className="form-group p-2">
      <small>
        <label className="text-muted">Password</label>
      </small>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="form-control"
        placeholder="Enter Password"
      />
    </div>
    {page !== "login" && (
      <>
        <div className="form-group p-2">
          <small>
            <label className="text-muted">Pick a question</label>
          </small>
          <select className="form-control">
            <option>What is your favourite color?</option>
            <option>What is your best friend's name?</option>
            <option>What city you were born?</option>
          </select>
          <small className="form-text text-muted">
            You can use this to reset your password if forgotton.
          </small>
        </div>

        <div className="form-group p-2">
          <input
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Write you answer here"
          />
        </div>
      </>
    )}
    <div className="form-group p-2">
      <button
        disabled={
          ProfileUpdate
            ? loading
            : page === "login"
            ? !email || !password || loading
            : !name || !email || !secret || !password || loading
        }
        className="btn btn-primary col-12"
      >
        {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
      </button>
    </div>
  </form>
);

export default AuthForm;
