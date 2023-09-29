/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Users.css";

type EditCrudProps = {
    id: number,
    username: string,
    password: string,
    email: string,
}


export function Users() {
    const [ data, setData ] = useState<EditCrudProps[]>([]);

    const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get/users");
    setData(response.data);
      };

    useEffect(() => {
      loadData();
    }, []);

    const deleteContact = (id:number) => {
        if (
          window.confirm("Are you sure that you wanted to delete that user ?")
        ) {
          axios.delete(`http://localhost:5000/api/delete/users/${id}`);
          toast.success("User Deleted Successfully");
          setTimeout(() => loadData(), 500);
        }
      };

    return (
        <div style={{ marginTop: "150px" }}>
      <Link to="/addUser">
        <button className="btn btn-contact">Add User</button>
      </Link>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Username</th>
            <th style={{ textAlign: "center" }}>Password</th>
            <th style={{ textAlign: "center" }}>E-mail</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.username}</td>
                <td>{item.password}</td>
                <td>{item.email}</td>
                <td>
                  <Link to={`/update/users/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteContact(item.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/users/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to="/editcrud">
        <button className="btn btn-contact">Go Back</button>
      </Link>
    </div>
    )
}