import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ViewProduct.css";

// Define a type for the user data
type ProductDataProps = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imgUrl: string;
};

const ViewProduct = () => {
  // Initialize user with the ProductDataProps type
  const [product, setProduct] = useState<ProductDataProps | null>(null); // Use null to indicate that data is initially not available

  const { id } = useParams();

  useEffect(() => {
    axios
      .get<ProductDataProps[]>(`http://localhost:5000/api/get/products/${id}`)
      .then((resp) => {
        // Assuming that the API response is an array and you want the first item
        if (resp.data.length > 0) {
          setProduct(resp.data[0]);
        }
      });
  }, [id]);

  // Check if product is null (data not available yet)
  if (product === null) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>Product Details</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{product.id}</span>
          <br />
          <br />
          <strong>Name: </strong>
          <span>{product.name}</span>
          <br />
          <br />
          <strong>Price: </strong>
          <span>{product.price}</span>
          <br />
          <br />
          <strong>Quantity: </strong>
          <span>{product.quantity}</span>
          <br />
          <br />
          <strong>ImgUrl: </strong>
          <span>{product.imgUrl}</span>
          <br />
          <br />
          <Link to="/products">
            <div className="btn btn-edit">Go Back</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
