import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios

interface Product {
  id: number;
  quantity: number;
  name: string;
  price: number;
  imgUrl: string;
}

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const [item, setItem] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await axios.get(`http://localhost:5000/api/get/products/${id}`); // Use Axios for fetching data
        const data = response.data;
        // console.log("Fetched item data:", data);
        setItem(data);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    }

    fetchItem();
  }, [id,item]);

  if (!item) {
    return null;
  } else {
    return (
      
      <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
        <img
          src={item.imgUrl}
          style={{ width: "125px", height: "75px", objectFit: "cover" }}
          alt={item.name} // Add alt attribute for image
        />
        <div className="me-auto">
          <div>
            {item.name}{" "}
            {quantity > 1 && (
              <span className="text-muted" style={{ fontSize: ".65rem" }}>
                x{quantity}
              </span>
            )}
          </div>
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
            {formatCurrency(item.price)}
          </div>
        </div>
        <div> {formatCurrency(item.price * quantity)}</div>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeFromCart(item.id)}
        >
          &times;
        </Button>
      </Stack>
    );
  }
}
