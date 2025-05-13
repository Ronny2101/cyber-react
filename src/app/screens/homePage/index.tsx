import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPopularDishes } from "./slice";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";


/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);

export default function HomePage() {
   const { setPopularDishes } = actionDispatch(useDispatch());
   const { popularDishes } = useSelector(popularDishesRetriever);
    //Selector: Store => Data 


  useEffect(() => {
    //Backend server  data request => Data
    const result = [
      {
          "_id": "67f9334766cb6970de674ee7",
          "productStatus": "PROCESS",
          "productCollection": "DISH",
          "productName": "mustang",
          "productPrice": 7,
          "productLeftCount": 9,
          "productSize": "NORMAL",
          "productVolume": "1",
          "productDesc": "7777",
          "productImages": [
              "uploads/products/758a5cd7-fdd7-43f4-a0d7-aab84145eeb8.jpg",
              "uploads/products/754bf8af-9422-4f84-8fb0-e458a04374d6.jpg"
          ],
          "productViews": 0,
          "createdAt": "2025-04-11T15:20:39.629Z",
          "updatedAt": "2025-04-11T17:13:43.028Z",
          "__v": 0
      },
      {
          "_id": "681787a64fe19da758562579",
          "productStatus": "PROCESS",
          "productCollection": "DISH",
          "productName": "LAVASH",
          "productPrice": 10,
          "productLeftCount": 100,
          "productSize": "NORMAL",
          "productVolume": "1",
          "productDesc": "Delicious meal",
          "productImages": [
              "uploads/products/d19e4247-0c01-47a8-8430-33a34fae20c9.jpg",
              "uploads/products/64f29f01-ba20-4b99-b2b0-1a4d8ec0d636.jpg",
              "uploads/products/55abacb1-8cf7-46ae-af3f-254773f5da17.jpg",
              "uploads/products/f27fe249-d2fd-4cf0-9d30-0f3c86a59e8b.jpg",
              "uploads/products/93579dad-95d1-4a53-a4d5-911bc0aeedb3.jpg"
          ],
          "productViews": 0,
          "createdAt": "2025-05-04T15:28:38.006Z",
          "updatedAt": "2025-05-04T15:28:38.006Z",
          "__v": 0
      },
  ];
    //Slice: Data => Store
    //@ts-ignore
    setPopularDishes(result);
  },[]);
  return  (
      <div className={"homepage"}>
        <Statistics/>
        <PopularDishes/>
        <NewDishes/>
        <Advertisement/>
        <ActiveUsers/>
        <Events/>
      </div>
  );
}