import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import axios from "axios";

// Define a type for the items you expect to receive from the API
type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imgUrl: string;
  // Add other properties as needed
};

export function Store() {
  const [storeItems, setStoreItems] = useState<Product[]>([]);

  useEffect(() => {
    // Make a GET request to your API route to fetch items from the database
    axios.get<Product[]>("http://localhost:5000/api/get/products").then((response) => {
      // Assuming your API returns an array of items of type Product
      setStoreItems(response.data);
    });
  }, []);

  return (
    <>
      <h1>Store</h1>
      <Row xs={1} md={2} lg={3} className="g-3">
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
