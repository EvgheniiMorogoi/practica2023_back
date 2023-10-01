/* eslint-disable @typescript-eslint/no-explicit-any */
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const [fetchedCartItems, setFetchedCartItems] = useState<any[]>([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axios.get("http://localhost:5000/api/get/products"); // Use Axios for fetching data
        const data = response.data;
        setFetchedCartItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }

    fetchItems();
  }, []);

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((cartItem) => {
            const item = fetchedCartItems.find((i) => i.id === cartItem.id);
            if (!item) return null;
            return (
              <CartItem
                key={cartItem.id}
                id={cartItem.id}
                quantity={cartItem.quantity}
              />
            );
          })}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = fetchedCartItems.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
