import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";


const initialState: HomePageState = {
    popularCategory:[],
    popularDishes: [],
    newDishes: [],
    topUsers: [],
};

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setPopularCategory: (state, action) => {
            state.popularCategory = action.payload;
        },
        setPopularDishes: (state, action) => {
            state.popularDishes = action.payload;
        },
        setNewDishes: (state, action) => {
            state.newDishes = action.payload;
        },
        setTopUsers: (state, action) => {
            state.topUsers = action.payload;
        },
    },
});

export const {  setPopularCategory, setPopularDishes, setNewDishes, setTopUsers} = homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;