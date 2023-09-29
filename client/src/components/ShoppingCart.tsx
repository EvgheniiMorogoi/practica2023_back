/* eslint-disable @typescript-eslint/no-explicit-any */
import { Offcanvas, Stack } from "react-bootstrap";
import { useEffect, useState } from "react"; // Import useState and useEffect
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import { fetchItemsFromDatabase } from "../data/api";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const [fetchedCartItems, setFetchedCartItems] = useState<{
    id: number ,
    name: string ,
    price: number ,
    quantity:number,
    imgUrl: string
  }[]>([]);

  useEffect(() => {
    fetchItemsFromDatabase().then((items) => {
      // Map the fetched items to match the expected properties
      const mappedItems = items.map((item: { id: any; name: any; price: any; quantity: any; imgUrl: any; }) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1, // Set the initial quantity as needed
        imgUrl: item.imgUrl
      }));
      setFetchedCartItems(mappedItems);
    });
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
          return <CartItem key={cartItem.id} cartItem={item} />;
        })}



          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const foundItem = fetchedCartItems.find(
                  (i) => i.id === cartItem.id
                );
                return total + (foundItem?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
