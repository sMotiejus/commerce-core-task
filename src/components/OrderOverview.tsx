import { Item } from "interfaces/Item";
import React, { useState } from "react";
import { ReactComponent as ArrowUp } from "assets/arrow-up.svg";
import { ReactComponent as ArrowDown } from "assets/arrow-down.svg";
import Button from "./Button";
import CartSummary from "./CartSummary";

interface OrderOverviewProps {
  cartItems: Item[];
}

const OrderOverview: React.FC<OrderOverviewProps> = ({ cartItems }) => {
  const [viewToggle, setViewToggle] = useState(true);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <div className="flex flex-col text-sm justify-center">
      <div className="flex justify-between p-4 font-medium text-primary-text">
        <div className="flex gap-2 font-normal">
          <div>Order overview</div>
          <Button onClick={() => setViewToggle(!viewToggle)}>
            {viewToggle ? <ArrowDown /> : <ArrowUp />}
          </Button>
        </div>
        ${totalPrice.toFixed(2)}
      </div>
      {viewToggle || <CartSummary cartItems={cartItems} />}
    </div>
  );
};

export default OrderOverview;
