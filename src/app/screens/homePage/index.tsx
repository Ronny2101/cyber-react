import React, { useEffect } from "react";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularCategory, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { Member } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import "../../../css/home.css";
import Statistic from "./Statistic";
import Statistics from "./Statistics";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularCategory:(data: Product[]) => dispatch(setPopularCategory(data)),
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});



export default function HomePage() {
  //  const { onAdd } = props;
   const { setPopularCategory, setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(useDispatch());
  

  useEffect(() => {
    // Backend server data fetch => Data 
    const product = new ProductService();

    product
      .getProducts({
        page: 1,
        limit: 8,
        order: "productViews",
        // productCollection: ProductCollection.TV,
      })
      .then((data) => {
        console.log("data passed here:", data);
        setPopularCategory(data);
      })
      .catch((err) => console.log(err));


    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.PHONES
      })
      .then((data) => {
        console.log("data passed here:", data);
        setPopularDishes(data);
      })
      .catch((err) => console.log(err));

      product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        productCollection: ProductCollection.CAMERAS,
      })
      .then((data) =>setNewDishes(data))
      .catch((err) => console.log(err));

      const member = new MemberService();
      member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));
  },[]);



  return  (
      <div className={"homepage"}>
        <Statistics />
        {/* <PopularCategory onAdd={function (item: CartItem): void {
        throw new Error("Function not implemented.");
      } }  /> */}
        <PopularDishes/>
        <NewDishes />
        <Advertisement/>
        <ActiveUsers/>
        <Events/>
        <Statistic />
      </div>
  );
}


// import * as React from 'react';
// import Box from '@mui/material/Box';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import { SxProps } from '@mui/system';

// export default function LeadingClickAway() {
//   const [open, setOpen] = React.useState(false);

//   const handleClick = () => {
//     setOpen((prev) => !prev);
//   };

//   const handleClickAway = () => {
//     setOpen(false);
//   };

//   const styles: SxProps = {
//     position: 'absolute',
//     top: 28,
//     right: 0,
//     left: 0,
//     zIndex: 1,
//     border: '1px solid',
//     p: 1,
//     bgcolor: 'background.paper',
//   };

//   return (
//     <ClickAwayListener
//       mouseEvent="onMouseDown"
//       touchEvent="onTouchStart"
//       onClickAway={handleClickAway}
//     >
//       <Box sx={{ position: 'relative' }}>
//         <button type="button" onClick={handleClick}>
//           Open menu dropdown
//         </button>
//         {open ? (
//           <Box sx={styles}>
//             Click me, I will stay visible until you click outside.
//           </Box>
//         ) : null}
//       </Box>
//     </ClickAwayListener>
//   );
// }
