import axios from "axios";

export const setProducts = async(dispatch) =>{
    try{
    dispatch({type:"LOADING"})
    const response = await axios.get("/products.json");
     dispatch({type:"SET_PRODUCTS",payload:response.data});
    }catch(error){
      dispatch({type:'FAILURE',payload:error})
    }
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

export const sortProducts=(order)=>(dispatch)=>{
    return dispatch({type:"SORT",payload:order})
}