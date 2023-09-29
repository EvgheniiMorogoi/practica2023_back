/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Products.css";

type EditCrudProps = {
    id: number,
    name: string,
    price: number,
    quantity: number,
    imgUrl: string,
}


export function Products() {
    const [ data, setData ] = useState<EditCrudProps[]>([]);

    const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get/products");
    setData(response.data);
      };

    useEffect(() => {
      loadData();
    }, []);

    const deleteContact = (id:number) => {
        if (
          window.confirm("Are you sure that you wanted to delete that product ?")
        ) {
          axios.delete(`http://localhost:5000/api/delete/products/${id}`);
          toast.success("Product Deleted Successfully");
          setTimeout(() => loadData(), 500);
        }
      };

    return (
        <div style={{ marginTop: "150px" }}>
      <Link to="/addProduct">
        <button className="btn btn-contact">Add product</button>
      </Link>
        
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Price</th>
            <th style={{ textAlign: "center" }}>Quantity</th>
            <th style={{ textAlign: "center" }}>ImgUrl</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.imgUrl}</td>
                <td>
                  <Link to={`/update/products/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteContact(item.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/products/${item.id}`}>
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