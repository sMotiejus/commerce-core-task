import Benefit from "components/Benefit";

import { ReactComponent as CashBack } from "assets/cashback.svg";
import { ReactComponent as Rating } from "assets/rating.svg";
import { ReactComponent as CustomerService } from "assets/customer-service.svg";

export default function Benefits() {
  return (
    <div className="flex flex-col gap-4 w-full px-4 pb-6 lg:p-0">
      <div className="flex gap-4 items-center">
        <div className="w-full border-t border-secondary-default"></div>
        <div className="text-sm text-nowrap">Why Choose LogoIpsum</div>
        <div className="w-full border-t border-secondary-default"></div>
      </div>
      <div className="flex flex-col gap-4">
        <Benefit
          Icon={CashBack}
          title="90-Day Money Back Guarantee"
          content="We love our products and we're confident you will too! If you're not in love with your LogoIpsum product, our easy return and refund policy is designed to make things as easy as possible for you. "
        />
        <Benefit
          Icon={Rating}
          title="Over 75,000+ Happy Customer"
          content="Everyone that tries LogoIpsum says it’s a must-have. We invest a lot of love and care into making our products, so you can enjoy seeing results when using it."
        />
        <Benefit
          Icon={CustomerService}
          title="Professional Customer Support"
          content="Our customer service works 24/7 for your satisfaction. Feel free to reach out to us anytime."
        />
      </div>
    </div>
  );
}
