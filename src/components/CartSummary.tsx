import ItemDisplay from "components/ItemDisplay";
import { Item } from "interfaces/Item";
import React from "react";

interface CartSummaryProps {
  cartItems: Item[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ cartItems }) => {
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col gap-4 px-4 pb-4 lg:p-0">
      <div className="lg:hidden h-full border-b border-secondary-default" />
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <ItemDisplay cartItem={item} />
            </li>
          ))}
        </ul>
      )}
      <div className="h-full border-b border-secondary-default" />
      <div className="flex justify-between text-sm text-primary-text">
        <div>Subtotal</div>
        <div>${totalPrice.toFixed(2)}</div>
      </div>
      <div className="h-full border-b border-secondary-default" />
      <div className="flex justify-between text-lg leading-[24px] font-bold text-primary-text">
        <div>Total</div>
        <div>${totalPrice.toFixed(2)}</div>
      </div>
      <div className="h-full border-b border-secondary-default lg:border-secondary-background" />
    </div>
  );
};

export default CartSummary;
