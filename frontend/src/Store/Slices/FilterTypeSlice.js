import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    categories: [],
    companies: [],
    colors: []
}

const FilterTypeSlice = createSlice ({
    name: "products",
    initialState,
    reducers: {

        addCategory(state, action){
            state.categories.push(action.payload)
        }, 

        updateCategories(state, action){
            state.categories = action.payload;
        },

        updateFilters(state, action){
            return{
                ...state,
                companies: action.payload.companies,
                colors: action.payload.colors
            }
        },

    }
});


export const { addCategory, updateCategories, updateFilters } = FilterTypeSlice.actions;
export default FilterTypeSlice.reducer;