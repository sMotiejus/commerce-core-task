import { Item } from "interfaces/Item";
import React from "react";
import ipl from "assets/ipl.png";

interface ItemDisplayProps {
  cartItem: Item;
}

const ItemDisplay: React.FC<ItemDisplayProps> = ({ cartItem }) => {
  const price = cartItem.price * cartItem.quantity;
  return (
    <div className="flex justify-between items-center text-sm">
      <div className="flex gap-4 items-center">
        <div className="relative w-[66px] h-[66px] border border-secondary-default rounded">
          <img
            className="relative z-[-1]"
            width={64}
            height={64}
            src={ipl}
            alt={"IPL"}
          />
          <div className="absolute w-[21px] top-0 right-0 translate-x-2/4 -translate-y-2/4 bg-quantity rounded-[100px]">
            <div className="text-white text-xs leading-[21px] font-bold text-center">
              {cartItem.quantity}
            </div>
          </div>
        </div>

        <div className="font-bold text-primary-text">{cartItem.name}</div>
      </div>
      <div className="font-medium">${price.toFixed(2)}</div>
    </div>
  );
};

export default ItemDisplay;
