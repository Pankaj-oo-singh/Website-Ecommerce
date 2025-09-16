import axios from "axios";
import { BASE_URL,getHeaders } from "./Constant"


export const placeOrderAPI = async (data) => {
    const url = BASE_URL + '/api/order/create';
    try {
      const response = await axios(url, {
        method: "POST",
        data: data,
        headers: getHeaders(), // Make sure this includes JWT token if needed
      });
      return response?.data;
    } catch (err) {
      throw new Error(err?.response?.data?.message || "Order failed");
    }
  };
  
export const confirmPaymentAPI = async (data)=>{
    const url = BASE_URL + '/api/order/update-payment';
    try{
        const response = await axios(url,{
            method:"POST",
            data:data,
            headers:getHeaders()
        });
        return response?.data;
    }
    catch(err){
        throw new Error(err);
    }
}