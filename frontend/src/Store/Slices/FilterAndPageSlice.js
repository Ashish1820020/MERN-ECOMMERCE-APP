import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    gridView: false,
    pageCount : 1,
    limit : 10,
    currentPage: 1,
    sortingType: {type: "rating", sort: -1},
    isFilterProductsLoading: false,
    isError: false,
    filteredProducts: [],
    filters: {
        search: "",
        category: [],
        company: [],
        color: '',
        price: 200000,
        minPrice: 0,
        maxPrice: 200000,
    }
};



const filterAndPageSlice = createSlice ({
    name: "products",
    initialState,
    reducers: {
        
        setGridView(state, action){
            return{
                ...state,
                gridView: true,
                currentPage: 1,
                limit: 15
            }
        },


        setListView(state, action){
            return{
                ...state,
                gridView: false,
                currentPage: 1,
                limit: 8
            }
        },


        isLoading(state, action){

            return {
                ...state,
                isFilterProductsLoading: true
            }
        },


        isError(state, action){
            return{
                ...state,
                isError: true
            }
        },


        updateFilteredProducts(state, action){
            return{
                ...state,
                isFilterProductsLoading:  false,
                filteredProducts: action.payload.result,
                pageCount: action.payload.pageCount
            }
        },
        

        clearFilters(state, action){
            return {
                ...state,
                filters : {
                    search: "",
                    category: [],
                    company: [],
                    color: [],
                    price: 200000,
                    minPrice: 0,
                    maxPrice: 200000
                }
            }
        },


        setCurrentPage(state, action){
            return{
                ...state,
                currentPage: action.payload
            }
        },


        setFilters(state, action){
            const { name, value } = action.payload;
            
            if(name === "search"){
                return{
                    ...state,
                    currentPage: 1,
                    filters: {
                        ...state.filters,
                        [name]: value
                    }
                }
            }

            let temp = [...state.filters[name]];
            const isPresent = temp.includes(value);
            
            if(isPresent){
                temp = temp.filter((item) => item!==value);
            }else{
                temp.push(value);
            }

            return{
                ...state,
                currentPage: 1,
                filters: {
                    ...state.filters,
                    [name]: temp
                }
            }
        },


        setPriceRange(state, action){

            return{
                ...state,
                currentPage: 1,
                filters: {
                    ...state.filters,
                    price: action.payload
                }
            }
        },
        

        setSortingType(state, action){
            let sorting;

            switch(action.payload){
                case "a-z":
                    sorting = {type: "name", sort: 1}
                    break;
                case "z-a":
                    sorting = {type: "name", sort: -1}
                    break;
                case "highest":
                    sorting = {type: "price", sort: -1}
                    break;
                case "lowest":
                    sorting = {type: "price", sort: 1}
                    break;
                default: 
                    sorting = {type: "rating", sort: -1}
            }
           return {
            ...state,
            sortingType: sorting
           }
        },
    }
});





export const { isLoading, isError, updateFilteredProducts, setGridView, setListView, setCurrentPage,
                setSortingType, setFilters, setPriceRange, clearFilters } = filterAndPageSlice.actions;
export default filterAndPageSlice.reducer;


























// const sort = (sortingType, filteredProducts) => {
//     let tempSortData = [...filteredProducts];

//     let newSortedData = tempSortData.sort((a, b)=>{
//         switch(sortingType){
//             case 'a-z':
//                 return a.name.localeCompare(b.name);
//             case 'z-a':
//                 return b.name.localeCompare(a.name);
//             case 'highest':
//                 return (b.price)-(a.price);
//             case 'lowest':
//                 return (a.price)-(b.price);
//             default: return b
//         }
//     });

//     return newSortedData;
// }


// const filter = (tempFilterProducts, filters) => {
//     const {text, category, company, color, price} = filters;

//     if(text){
//         tempFilterProducts = tempFilterProducts.filter((currentElement)=>{
//             return currentElement.name.toLowerCase().includes(text.toLowerCase());
//         });
//     }
//     if(category !== 'all'){
//         tempFilterProducts = tempFilterProducts.filter((currentElement)=>{
//             return currentElement.category === category;
//         });
//     }
//     if(company !== 'all'){
//         tempFilterProducts = tempFilterProducts.filter((currentElement)=> currentElement.company === company);
//     }
//     if(color !== 'all'){
//         tempFilterProducts = tempFilterProducts.filter((currentElement)=>{
//             return [...currentElement.colors].includes(color);
//         });
//     }
//     if (price === 0) {
//         tempFilterProducts = tempFilterProducts.filter(
//             (curElem) => curElem.price === price
//         )
//     }
//     else {
//         tempFilterProducts = tempFilterProducts.filter(
//             (curElem) => curElem.price <= price
//         );
//     }
// }





