import {createSlice, current} from '@reduxjs/toolkit'

const getLocalCartData = () => {
    let localCartData = localStorage.getItem("wishlistProducts");
    if (localCartData === null || localCartData === undefined) {
      return [];
    } else {
      return JSON.parse(localCartData);
    }
};

const initialState = {
    wishlistProducts: getLocalCartData(),
    totalItems: getLocalCartData().length
}


const wishlistSlice = createSlice ({
    name: "wishlist",
    initialState,
    reducers: {

        // <----ADD TO Wishlist---->
        addToWishlist(state, action){
            const {amount, color, _id, name, image, price, stock, discount, rating} = action.payload;
            let updatedWishlist;
            
            
            // finding existing product
            let existingProduct = state.wishlistProducts.find(curElem => (curElem._id+curElem.color === _id+color));
            
            // product exists in Wishlist
            if (existingProduct) {
                updatedWishlist = [...state.wishlistProducts]
            }
            else {
                let wishlistProduct = {amount, color, _id, name, image, price, stock, discount, rating};
                updatedWishlist = [...state.wishlistProducts, wishlistProduct];
            }

            localStorage.setItem("wishlistProducts", JSON.stringify(updatedWishlist));
            return { ...state, wishlistProducts: updatedWishlist, totalItems: updatedWishlist.length };
        },


        // <----CLEAR WISHLIST---->
        removeFromWishlist(state, action){
            const { _id, color } = action.payload;
            let updatedWishlist = state.wishlistProducts.filter( curItem => (curItem._id + curItem.color !== _id+color));

            
            localStorage.setItem("wishlistProducts", JSON.stringify(updatedWishlist));

            return {
                ...state,
                wishlistProducts: updatedWishlist,
                totalItems: updatedWishlist.length
            };      
        },


        // <----CLEAR WISHLIST---->
        clearWishlist(state, action){
            localStorage.setItem("wishlistProducts", JSON.stringify([]));
            return {
                ...state,
                wishlistProducts: [],
                totalItems: 0
            }        
        },


        // <----ADD WISHLIST DATA FROM DB AFTER LOGIN---->
        addFromDbWishlist(state, action){
            const userWishlist = action.payload;


            const updatedWishlist = userWishlist.map((currElem) => {
                const  { amount, color, discount, image, name, price, product, rating, stock, _id } = currElem;
                return{ amount, color, discount, image, name, price, rating, stock, _id: product }
            });
            
            localStorage.setItem("wishlistProducts", JSON.stringify(updatedWishlist));

           
            return {
                wishlistProducts: updatedWishlist,
                totalItems: updatedWishlist.length
            }
        }
    }
});


export const { addToWishlist, removeFromWishlist, clearWishlist, addFromDbWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;