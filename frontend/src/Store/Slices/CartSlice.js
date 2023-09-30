import {createSlice} from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit';

const getLocalCartData = () => {
    let localCartData = localStorage.getItem("cartProducts");
    if (localCartData === null || localCartData === undefined) {
      return [];
    } else {
      return JSON.parse(localCartData);
    }
};

const initialState = {
    cartProducts: getLocalCartData(),
    totalItems: getLocalCartData().length,
    totalAmount: 0,
    discountedPrice: 0,
}


const cartSlice = createSlice ({
    name: "cart",
    initialState,
    reducers: {

        // <----ADD TO CART---->
        addToCart(state, action){
            const {amount, color, _id, name, image, price, stock, discount, rating} = action.payload;

            // finding existing product
            let existingProduct = state.cartProducts.find(curElem => (curElem._id + curElem.color === _id + color));

            // product exists in cart
            if (existingProduct) {
                const updatedCartProducts = state.cartProducts.map((curElem) => {
                    if (curElem._id + curElem.color === _id + color) {
                        let newCount = curElem.amount + amount;
                        if (newCount >= curElem.stock) newCount = curElem.stock;
                        return { ...curElem, amount: newCount };
                    } else {
                        return curElem;
                    }
                });
                localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
                
                return { ...state, cartProducts: updatedCartProducts };
            }
            else {
                let cartProduct = {amount, color, _id, name, image, price, stock, discount, rating};
                
                const updatedCartProducts = [...state.cartProducts, cartProduct];
                localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
                
                return { ...state, cartProducts: updatedCartProducts, totalItems: updatedCartProducts.length };
            }
        },
        
        // <----REMOVE FROM CART---->
        removeFromCart(state, action){
            const { _id, color } = action.payload;
            let updatedCart = state.cartProducts.filter( curItem => (curItem._id + curItem.color !== _id+color));
            
            localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
            return {
                ...state,
                cartProducts: updatedCart
            };
        },

        // <----CLEAR CART---->
        clearCart(state, action){
            localStorage.setItem("cartProducts", JSON.stringify([]));
            return {
                ...state,
                cartProducts: [],
                totalItems: 0,
                totalAmount: 0,
                discountedPrice: 0
            }        
        },

        // <----SET TO CART---->
        setToCart(state, action){
            return {
                ...state,
                isSingleLoading: false,
                singleProduct: action.payload
            }
        },

        // <----ADD TO CART FROM DB AFTER LOGIN---->
        addFromDb(state, action){
            const userCartItems = action.payload;
            const { cartProducts } = state;

            // console.log(action.payload);

            const cartProduct = userCartItems.filter(obj1 => !cartProducts.some((obj2) => (obj1.product + obj1.color === obj2._id + obj2.color)));

            // console.log(cartProduct);

            let currentCartProducts = current(cartProducts);

            let total = 0;
            currentCartProducts = [...currentCartProducts, ...cartProduct];

            // console.log(currentCartProducts);
        
            const updatedData = currentCartProducts.map((elem) => {
                total += (elem.price * elem.amount);
                return {  
                    _id: elem.product? elem.product : elem._id, 
                    name: elem.name, color: elem.color, amount: elem.amount,
                    image: elem.image, price: elem.price, stock: elem.stock, discount: elem.discount, rating: elem.rating
                }
            });
            localStorage.setItem("cartProducts", JSON.stringify(updatedData));

            return {
                cartProducts: updatedData,
                totalAmount: total,
                totalItems: updatedData.length
            }
        },

        // <----------------------------->
        setIncrease(state, action){
            const {_id, color} = action.payload;
            const { cartProducts } = state;

            const newElement = cartProducts.map((curElem) => {
                if(curElem._id + curElem.color === _id + color){
                 
                    let newAmount = curElem.amount + 1;
                    newAmount = newAmount > curElem.stock ?  curElem.stock : newAmount;
                    return{ ...curElem, amount: newAmount }
                }
                else return {...curElem}   
            });
            return {
                ...state,
                cartProducts: newElement
            }
        },

        // <----------------------------->
        setDecrease(state, action){
            const {_id, color} = action.payload;
            const { cartProducts } = state;

            const newElement = cartProducts.map((curElem) => {
                if(curElem._id + curElem.color === _id + color){
                    let newAmount = curElem.amount - 1;
                    newAmount = newAmount < 1 ?  1 : newAmount;
                    return{ ...curElem, amount: newAmount }
                }
                else return { ...curElem }
            });

            return {
                ...state,
                cartProducts: newElement
            }
        },
        
        // <----TOTAL AMOUNT, TOTAL ITEM, DISCOUNTED PRICE---->
        setTotal(state, action){
            const { cartProducts } = state;

            let { totalItems, totalAmount, discountedPrice } = cartProducts.reduce((total, curElem) => {
                let { price, amount, discount } = curElem;
        
                let countDiscounts = Math.ceil(price*discount/100)
                total.totalItems += 1;
                total.totalAmount += price * amount;
                total.discountedPrice += ((price - countDiscounts) * amount)
        
                return total;
              },
              { totalItems: 0, totalAmount: 0, discountedPrice: 0 }
            );

            return { ...state, totalItems, totalAmount, discountedPrice };
        }
    }
});


export const { addToCart, removeFromCart, clearCart, setToCart, setTotal, setIncrease, setDecrease, addFromDb } = cartSlice.actions;
export default cartSlice.reducer;