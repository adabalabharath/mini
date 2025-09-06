import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";


export const addToBag=(product,sizeSelected)=>{
const {user,localSet}=useContext(AuthContext)
  if (product.availableSizes.length > 0) {
      const exists = user?.bag.some(
        (x) => x.id === product.id && x.selectedSize === sizeSelected
      );

      if (exists) {
        const updatedBag = user.bag.map((x) =>
          x.id === product.id && x.selectedSize === sizeSelected
            ? { ...x, qty: x.qty + 1 }
            : x
        );
        const updatedUser = { ...user, bag: updatedBag };
        localSet(updatedUser);
      } else {
        const cartItem = { ...product, selectedSize:sizeSelected, qty: 1, selected: true };
        const updatedUser = { ...user, bag: [...user.bag, cartItem] };
        localSet(updatedUser);
      }
    } else {
      const cartItem = { ...product, selectedSize:sizeSelected, qty: 1, selected: true };
      const updatedUser = { ...user, bag: [...user.bag, cartItem] };
      localSet(updatedUser);
    }
}