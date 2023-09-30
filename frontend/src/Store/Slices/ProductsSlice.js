import {createSlice, current} from '@reduxjs/toolkit'

const initialState = {
    isProductLoading: false,
    isError: false,
    pageCount: 1,
    currentPage: 1,
    products: [],
    featureProducts: [],
    topRatedProducts: [],
    filteredProducts: [],
    isSingleLoading: false,
    singleProduct: {},
    banners: []
}

const productsSlice = createSlice ({
    name: "products",
    initialState,
    reducers: {

        isLoading(state, action){
            return {
                ...state,
                isProductLoading: true
            }
        },

        updateProductList(state, action){
            return {
                ...state,
                isProductLoading: false,
                products: action.payload
            }
        },

        clearProductList(state, action){
            return {
                ...state,
                isProductLoading: false,
                products: []
            }
        },

        
        isError(state, action){
            return {
                ...state,
               isError: true
            }
        },
        
        
        updateBanners(state, action){
            return {
                ...state,
                isProductLoading: false,
                banners: action.payload
            }
        }, 
        
        
        updateFeaturedProducts(state, action){
            return {
                ...state,
                isProductLoading: false,
                featureProducts: action.payload
            }
        },


        updateTopRatedProducts(state, action){
            return {
                ...state,
                isProductLoading: false,
                topRatedProducts: action.payload
            }
        },


        isSingleLoading(state, action){
            return {
                ...state,
                isSingleLoading: true
            }
        },

        updateSingleProductData(state, action){
            return {
                ...state,
                isSingleLoading: false,
                singleProduct: action.payload
            }
        },

        addNewProduct(state, action){
            return {
                ...state,
                products: [...state.products, action.payload]
            }

        },

        deleteProduct(state, action){

            const newProductlist = state.products.filter((curr) => {
                return curr._id !== action.payload.id;
            })
            return {
                ...state,
                product: newProductlist
            }
        },

        clearSingleProductData(state, action){
            return {
                ...state,
                isSingleLoading: false,
                singleProduct: {}
            }
        },

    }
});




export const { isLoading, isError, updateProductList, clearProductList, updateFeaturedProducts, isSingleLoading, updateTopRatedProducts,
                updateSingleProductData, updateFilteredProducts, updateBanners, clearSingleProductData, addNewProduct, deleteProduct} = productsSlice.actions;
export default productsSlice.reducer;