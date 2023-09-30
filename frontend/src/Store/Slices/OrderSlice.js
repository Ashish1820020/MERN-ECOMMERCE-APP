import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    orderData: [],
    allOrderData: [],
    singleOrderData: [],
    status: "processing",
    isSingleLoading: false,
    isError: false,
    isLoading: false
}

const orderSlice = createSlice ({
    name: "order",
    initialState,
    reducers: {
        addOrders(state, action){
            return{
                ...state,
                orderData: action.payload,
                isLoading: false,
                isError: false,
            }
        },
        addAllOrders(state, action){
            return{
                ...state,
                allOrderData: action.payload,
                isLoading: false,
                isError: false,
            }
        },
        addSingleOrderData(state, action){
            return{
                ...state,
                singleOrderData: action.payload,
                status: action.payload.orderStatus,
                isSingleLoading: false,
                isError: false,
            }
        },
        setIsSingleLoading(state, action){
            return {
                ...state,
                isSingleLoading: true
            }
        },
        setIsLoading(state, action){
            return {
                ...state,
                isLoading: true
            }
        },
        
        setIsError(state, action){
            return {
                ...state,
                isError: true
            }
        },
        setStatus(state, action){
            return {
                ...state,
                status: action.payload
            }
        }
    }
});


export const { setIsLoading, addOrders, setIsError, addAllOrders, setIsSingleLoading, addSingleOrderData, setStatus } = orderSlice.actions;
export default orderSlice.reducer;