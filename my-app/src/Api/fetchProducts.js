import axios from "axios";
import { BASE_URL, API_URLS } from "./Constant"

export const getAllProducts = async (id,typeId)=>{
    let url = BASE_URL + API_URLS.GET_PRODUCTS + `?categoryId=${id}`;
    if(typeId){
        url = url + `&typeId=${typeId}`;
    }

    try{
        const result = await axios(url,{
            method:"GET"
        });
        return result?.data;
    }
    catch(err){
        console.error(err);
    }
}

// export const getProductById = async (id) => {
//     const url = BASE_URL + API_URLS.GET_PRODUCT + `?id=${id}`;
//     try {
//         const result = await axios(url, {
//             method: "GET",
//         });
//         return result?.data?.[0];
//     } catch (err) {
//         console.error(err);
//     }
// };


// export const getProductById = async (id) => {
//     const url = `${BASE_URL}${API_URLS.GET_PRODUCT}/${id}`; // 👈 path param, not query param
//     try {
//       const result = await axios.get(url);
//       return result.data;
//     } catch (err) {
//       console.error("Failed to fetch product", err);
//       throw err;
//     }
//   };
  

export const getProductById = async (id) => {
    const url = `${BASE_URL}${API_URLS.GET_PRODUCT(id)}`;
    try {
      const result = await axios.get(url);
      return result.data;
    } catch (err) {
      console.error("Failed to fetch product", err);
      throw err;
    }
  };
  

export const getProductsByCategory = async (categoryName) => {
    try {
      const result = await axios.get(`${BASE_URL}/api/products/category/${categoryName}`);
      return result.data;
    } catch (err) {
      console.error(err);
    }
  };
  
