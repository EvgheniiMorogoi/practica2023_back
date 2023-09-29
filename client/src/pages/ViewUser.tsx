import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ViewUser.css";

// Define a type for the user data
type UserDataProps = {
  id: number;
  username: string;
  password: string;
  email: string;
};

const ViewUser = () => {
  // Initialize user with the UserData type
  const [user, setUser] = useState<UserDataProps | null>(null); // Use null to indicate that data is initially not available

  const { id } = useParams();

  useEffect(() => {
    axios
      .get<UserDataProps[]>(`http://localhost:5000/api/get/users/${id}`)
      .then((resp) => {
        // Assuming that the API response is an array and you want the first item
        if (resp.data.length > 0) {
          setUser(resp.data[0]);
        }
      });
  }, [id]);

  // Check if user is null (data not available yet)
  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>User Details</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{user.id}</span>
          <br />
          <br />
          <strong>Username: </strong>
          <span>{user.username}</span>
          <br />
          <br />
          <strong>Password: </strong>
          <span>{user.password}</span>
          <br />
          <br />
          <strong>E-Mail: </strong>
          <span>{user.email}</span>
          <br />
          <br />
          <Link to="/users">
            <div className="btn btn-edit">Go Back</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
