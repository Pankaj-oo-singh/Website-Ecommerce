import axios from "axios";
import { BASE_URL } from "./Constant";
import { getHeaders } from "./Constant";
import { logOut } from "../Utils/Jwt-Utils";


// export const fetchUserDetails = async ()=>{
//     const url = BASE_URL + '/api/user/profile';
//     try{
//         const response = await axios(url,{
//             method:"GET",
//             headers:getHeaders()
//         });
//         return response?.data;
//     }
//     catch(err){
//         throw new Error(err);
//     }
// }

export const fetchUserDetails = async () => {
    const url = BASE_URL + '/api/user/profile';
    try {
      const response = await axios.get(url, {
        headers: getHeaders()
      });
      return response?.data;
    } catch (err) {
      if (err?.response?.status === 401) {
        logOut();
        window.location.href = '/login'; // Or use navigate('/login') if inside a React component
      }
      throw new Error(err);
    }
  };
  
 
 


  export const addAddressAPI = async (data) => {
    const url = `${BASE_URL}/api/address`; 
  
    try {
      const response = await axios.post(url, data, {
        headers: getHeaders(),
      });
      console.log('Added address:', response.data); // Log the response data
      return response.data; // Returning the created address
    } catch (err) {
      console.error('Error adding address:', err);
      throw new Error('Failed to add address');
    }
  };
  
  export const deleteAddressAPI = async (id) => {
    const url = `${BASE_URL}/api/address/${id}`;
  
    try {
      const response = await axios.delete(url, {
        headers: getHeaders(),
      });
      console.log('Deleted address:', response.data); // Log the deleted address info
      return response.data; // If the backend returns some info after delete, return it
    } catch (err) {
      console.error('Error deleting address:', err);
      throw new Error('Failed to delete address');
    }
  };


//   export const fetchOrderAPI = async ()=>{
//     const url = BASE_URL + `/api/order/user`;
//     try{
//         const response = await axios(url,{
//             method:"GET",
//             headers:getHeaders()
//         });
//         return response?.data;
//     }
//     catch(err){
//         throw new Error(err);
//     }
// }

// export const cancelOrderAPI = async (id)=>{
//     const url = BASE_URL + `/api/order/cancel/${id}`;
//     try{
//         const response = await axios(url,{
//             method:"POST",
//             headers:getHeaders()
//         });
//         return response?.data;
//     }
//     catch(err){
//         throw new Error(err);
//     }
// }


export const fetchOrderAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/order/user`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (err) {
    console.error("Failed to fetch orders:", err?.response?.data || err.message);
    throw new Error(err?.response?.data?.message || "Failed to fetch orders");
  }
};

// Cancel a specific order by ID
export const cancelOrderAPI = async (id) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/order/cancel/${id}`, {}, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (err) {
    console.error(`Failed to cancel order ${id}:`, err?.response?.data || err.message);
    throw new Error(err?.response?.data?.message || "Failed to cancel order");
  }
};