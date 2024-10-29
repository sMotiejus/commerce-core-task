import { useEffect, useState } from "react";

import { ReactComponent as Visa } from "assets/paymentMethods/visa.svg";
import { ReactComponent as MasterCard } from "assets/paymentMethods/mastercard.svg";
import { ReactComponent as Amex } from "assets/paymentMethods/Amex.svg";
import { ReactComponent as DinnersClub } from "assets/paymentMethods/diners-club.svg";
import { ReactComponent as Discorver } from "assets/paymentMethods/discover.svg";
import { ReactComponent as Lock } from "assets/lock.svg";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { countries as countriesList } from "countries-list";
import * as yup from "yup";

import CartSummary from "components/CartSummary";
import Benefits from "components/Benefits";
import OrderOverview from "components/OrderOverview";
import Input from "components/Input";
import RadioButton from "components/RadioButton/RadioButton";
import Select from "components/Select";

import { Item } from "interfaces/Item";

import {
  formatExpiryDate,
  formatStringWithCreditCardGaps,
} from "utils/formatUtils";
import { getSecurityCodeLength, maxCardLength } from "utils/lengthFindUtils";
import { saveOrderDataInLocalStorage } from "utils/generalUtils";

import allStates from "assets/states.json";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    zip: yup
      .string()
      .matches(/^\d{5}$/, "ZIP Code must be 5 digits")
      .required("ZIP Code is required"),
    cardNumber: yup
      .string()
      .min(17, "Card Number must be at least 14 digits")
      .max(22, "Card Number must be at most 19 digits")
      .required("Card Number is required"),
    expiryDate: yup
      .string()
      .min(5, "Full expiry Date is required")
      .required("Expiry Date is required"),
    securityCode: yup
      .string()
      .min(3, "Security code must be least 3 digits")
      .required("Security code is required"),
    nameOnCard: yup.string().required("Name on card is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function CheckOutPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardNumberLength, setCardNumberLength] = useState(19);
  const [securityCodeLength, setSecurityCodeLength] = useState(3);

  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const cartItems: Item[] = [
    { id: 1, name: "LogoIpsum IPL", price: 99.99, quantity: 3 },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    let countryTempList = [];
    for (const [_, value] of Object.entries(countriesList)) {
      countryTempList.push(value.name as string);
    }
    setCountries(countryTempList);
    setSelectedCountry(countryTempList[232]);
  }, []);

  useEffect(() => {
    let allStatesTemp = allStates
      .filter((state) => state.country_name === selectedCountry)
      .map((state) => state.name);

    setSelectedState(allStatesTemp.length > 0 ? allStatesTemp[0] : "");
    setStates(allStatesTemp);
  }, [selectedCountry]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    saveOrderDataInLocalStorage({
      ...data,
      state: selectedState,
      country: selectedCountry,
    });
  };

  return (
    <>
      <div className="lg:hidden">
        <OrderOverview cartItems={cartItems} />
      </div>
      <div className="lg:relative flex flex-col gap-4 lg:gap-0 lg:flex-row flex-nowrap top-16 h-full lg:w-[1920px]">
        <div className="lg:w-[1037px] lg:bg-white lg:pt-10 lg:pr-[38px] lg:pb-6 lg:pl-[440px] shrink-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 lg:gap-8"
          >
            <div className="border-y border-secondary-default lg:border-0 p-4 pt-6 lg:p-0 bg-white">
              <div className="flex flex-col gap-3 lg:gap-4">
                <div className="text-2xl font-bold text-primary-text">
                  Contact
                </div>
                <Input
                  label="Email Address"
                  register={register("email")}
                  error={errors.email}
                  type="email"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-white border-y lg:border-y-0 border-secondary-default p-4 lg:p-0">
              <div className="text-2xl font-bold text-primary-text">
                Delivery
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3 w-full">
                  <Input
                    label="First Name"
                    register={register("firstName")}
                    error={errors.firstName}
                  />
                  <Input
                    label="Last Name"
                    register={register("lastName")}
                    allowOnly="alphabetical"
                    error={errors.lastName}
                  />
                </div>
                <Input
                  label="Address"
                  register={register("address")}
                  error={errors.address}
                />
                <div className="grid gap-3 grid-cols-2 lg:grid-cols-3">
                  <div className="col-span-2 lg:col-span-1">
                    <Input
                      label="City"
                      register={register("city")}
                      allowOnly="alphabetical"
                      error={errors.city}
                    />
                  </div>
                  <div className="col-span-1 lg:col-span-1">
                    <Select
                      label="State / Province"
                      options={states}
                      value={selectedState}
                      isDisabled={selectedState.length === 0}
                      onChange={(e) => setSelectedState(e)}
                    />
                  </div>
                  <div className="col-span-1 lg:col-span-1">
                    <Input
                      label="ZIP / Postal Code"
                      register={register("zip")}
                      allowOnly="numerical"
                      maxLength={5}
                      error={errors.zip}
                    />
                  </div>
                </div>

                <Select
                  label="Country"
                  options={countries}
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 bg-white border-y lg:border-y-0 border-secondary-default p-4 lg:p-0">
              <div className="flex flex-col gap-2">
                <div className="text-2xl font-bold text-primary-text">
                  Payment
                </div>
                <div className="text-xs text-secondary-text">
                  All transactions are secure and encrypted.
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex gap-4 justify-between items-center p-[15px] border border-[#3362AB] bg-[#F0F5FF] rounded-t-md">
                  <div className="flex gap-4 items-center">
                    <RadioButton
                      name="paymentMethod"
                      value="credit-card"
                      checked={paymentMethod === "credit-card"}
                      onCheck={(e) => setPaymentMethod(e)}
                    />
                    <div className="text-sm text-primary-text">Credit Card</div>
                  </div>

                  <div className="flex gap-1">
                    <Visa />
                    <MasterCard />
                    <Amex />
                    <DinnersClub />
                    <Discorver />
                  </div>
                </div>
                <div className="flex flex-col gap-3 p-3 bg-[#FAFAFA] border-x border-b border-secondary-default rounded-b-md">
                  <Input
                    label="Card Number"
                    maxLength={cardNumberLength}
                    register={register("cardNumber", {
                      onChange: (v) => {
                        setCardNumberLength(maxCardLength(v.target.value));
                        setSecurityCodeLength(
                          getSecurityCodeLength(v.target.value)
                        );
                        v.target.value = formatStringWithCreditCardGaps(
                          v.target.value
                        );
                      },
                    })}
                    error={errors.cardNumber}
                  />
                  <div className="flex gap-3">
                    <Input
                      label="Expiration (MM/YY)"
                      register={register("expiryDate", {
                        onChange: (v) => {
                          v.target.value = formatExpiryDate(v.target.value);
                        },
                      })}
                      error={errors.expiryDate}
                    />
                    <Input
                      label="Security code"
                      register={register("securityCode")}
                      allowOnly="numerical"
                      maxLength={securityCodeLength}
                      error={errors.securityCode}
                    />
                  </div>

                  <Input
                    label="Name on card"
                    register={register("nameOnCard")}
                    error={errors.nameOnCard}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="poppins-font w-full bg-[#009900] rounded px-8 py-3 lg:py-4 
           text-white font-bold text-sm lg:text-lg leading-6 tracking-[0.07em]"
              >
                COMPLETE ORDER
              </button>

              <div className="flex gap-2 justify-center items-center h-5">
                <Lock />
                <div className="text-sm text-secondary-text">
                  All transactions are secure and encrypted
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="hidden lg:block lg:absolute left-[1037px] top-0 h-full border-l border-secondary-default"></div>
        <div className="flex flex-col gap-6 lg:w-[883px] lg:py-10 lg:pr-[440px] lg:pl-[38px] lg:h-full">
          <div className="hidden lg:block">
            <CartSummary cartItems={cartItems} />
          </div>
          <Benefits />
        </div>
      </div>
    </>
  );
}
