import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddProduct.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  price: "",
  quantity: "",
  imgUrl:"",
};

const AddProduct = () => {
  const [state, setState] = useState(initialState);

  const { name, price, quantity, imgUrl } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/products/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !price || !quantity || !imgUrl) {
      toast.error("Please provide value into each input field");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/post/products", {
            name,
            price,
            quantity,
            imgUrl,
          })
          .then(() => {
            setState({ name: "", price: "", quantity: "", imgUrl: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Product Added Successfully");
      } else {
        axios
          .put(`http://localhost:5000/api/update/products/${id}`, {
            name,
            price,
            quantity,
            imgUrl,
          })
          .then(() => {
            setState({ name: "", price: "", quantity: "", imgUrl:"" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Product Updated Successfully");
      }

      setTimeout(() => navigate("/products"), 500);
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
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Product ..."
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Product price ..."
          value={price || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          placeholder="Product quantity ..."
          value={quantity || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="imgUrl">ImgUrl</label>
        <input
          type="text"
          id="imgUrl"
          name="imgUrl"
          placeholder="Product image url ..."
          value={imgUrl || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/products">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddProduct;
