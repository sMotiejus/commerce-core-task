import { ReactComponent as Logo } from "assets/logoipsum-logo-8.svg";
import { ReactComponent as ShopingBag } from "assets/shopping-bag.svg";

export default function Navbar() {
  return (
    <div
      className="flex justify-between
        lg:absolute z-20 bg-white
        w-[390px]  lg:w-[1920px]
        border-b border-secondary-default
        p-4 lg:px-[440px]"
    >
      <Logo className="w-auto h-6 lg:h-10" />
      <ShopingBag />
    </div>
  );
}
