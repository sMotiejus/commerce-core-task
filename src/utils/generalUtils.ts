import { OrderData } from "interfaces/OrderData";

export function saveOrderDataInLocalStorage(data: OrderData) {
  Object.entries(data).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
  console.log("Order data saved to localStorage:", data);
}
