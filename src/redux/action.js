import axios from "axios";

export const setProducts = async(dispatch) =>{
    const response = await axios.get("../../products.json");
    return dispatch({type:"SET_PRODUCTS",payload:response.data});
}