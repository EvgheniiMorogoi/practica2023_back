/* eslint-disable @typescript-eslint/no-explicit-any */
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Stack, Button } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";



  
  export function CartItem({ cartItem}:{cartItem: any}) {
    const { removeFromCart } = useShoppingCart();
  
    return (
      <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
        <img
          src={cartItem.imgUrl}
          style={{
            width: "125px",
            height: "75px",
            objectFit: "cover",
          }}
        />
        <div className="me-auto">
          <div>
            {cartItem.name} {cartItem.quantity > 1 && <span className="text-muted" style={{ fontSize: ".65rem" }}>x{cartItem.quantity}</span>}
          </div>
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
            {formatCurrency(cartItem.price)}
          </div>
        </div>
        <div>{formatCurrency(cartItem.price * cartItem.quantity)}</div>
        <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(cartItem.id)}>
          &times;
        </Button>
      </Stack>
    );
  }
  