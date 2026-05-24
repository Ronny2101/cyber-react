import { createSlice } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../lib/types/screen";

const initialState: ProductsPageState = {
    restaurant: null,
    chosenProduct: null,
    products: []
};

const productsPageSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        // setProductCollection: (state, action) => {
        //      state.productCollection = action.payload;
        // },
        setRestaurant: (state, action) => {
            state.restaurant = action.payload;
        },
        setChosenProduct: (state, action) => {
            state.chosenProduct = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
    },
});

export const { setRestaurant, setChosenProduct, setProducts} = productsPageSlice.actions;

const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;