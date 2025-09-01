import axios from "axios";

export const setProducts = async(dispatch) =>{
    const response = await axios.get("../../products.json");
    return dispatch({type:"SET_PRODUCTS",payload:response.data});
}

export const setSizeFilter = (size)=>(dispatch)=>{
    return dispatch({type:"SET_SIZE_FILTER",payload:size});
}

export const priceFilter = (price)=>(dispatch)=>{  
    return dispatch({type:"SET_PRICE_FILTER",payload:price});
}

export const ratingFilter = (rating)=>(dispatch)=>{
    return dispatch({type:"SET_RATING_FILTER",payload:rating});
}
export const genderFilter=(gender)=>(dispatch)=>{
    return dispatch({type:"SET_GENDER_FILTER",payload: gender});
}

export const clearFilters=()=>(dispatch)=>{
    return dispatch({type:"CLEAR_FILTERS"});
}