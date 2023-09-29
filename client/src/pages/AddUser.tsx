import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddUser.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  username: "",
  password: "",
  email: "",
};

const AddUser = () => {
  const [state, setState] = useState(initialState);

  const { username, password, email } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/users/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password || !email) {
      toast.error("Please provide value into each input field");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/post/users", {
            username,
            password,
            email,
          })
          .then(() => {
            setState({ username: "", password: "", email: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("User Added Successfully");
      } else {
        axios
          .put(`http://localhost:5000/api/update/users/${id}`, {
            username,
            password,
            email,
          })
          .then(() => {
            setState({ username: "", password: "", email: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("User Updated Successfully");
      }

      setTimeout(() => navigate("/users"), 500);
    }
  };

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Your Username ..."
          value={username || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Your Password ..."
          value={password || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Your E-Mail ..."
          value={email || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/users">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddUser;
