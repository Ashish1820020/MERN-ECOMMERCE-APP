import {createSlice, current} from '@reduxjs/toolkit'


const localUserData = () => {
    let localUserData = localStorage.getItem("userData");
  
    if (localUserData === null || localUserData === undefined || Object.keys(localUserData).length === 0  ) {
      return {};
    } else {
      return JSON.parse(localUserData);
    }
};



const initialState = {
    userData: localUserData(),
    isLoggedIn: Object.keys(localUserData()).length === 0? false : true,
    isError: false,
    lastLogIn: "",
    lastUpdated: "",
    allUsers: [], 
    isLoading: false
}

const authSlice = createSlice ({
    name: "Auth",
    initialState,
    reducers: {
        addUserData(state, action){
            return{
                ...state,
                userData: action.payload,
                isLoggedIn: true,
                lastLogIn: Date.now()
            }
        },
        isLoading(state, action){
            return{
                ...state,
                isLoading: true
            }
        },
        removeUserData(state, action){
            return{
                ...state,
                userData: {},
                isLoggedIn: false
            }
        },
        isError(state, action){
            return {
                ...state,
                isError: true
            }
        },
        updateUserData(state, action){

            console.log(action.payload);

            return{
                ...state,
                isLoading: false,
                userData: action.payload
            }
        },
        setAllUsers(state, action){
            return{
                ...state,
                isLoading: false,
                allUsers: action.payload
            }
        },
        addAddress(state, action){
            return{
                ...state,
                isLoading: false,
                userData: action.payload
            }
        },
    }
});









export const { addUserData, removeUserData, isError, isLoading, updateUserData, setAllUsers, addAddress } = authSlice.actions;
export default authSlice.reducer;