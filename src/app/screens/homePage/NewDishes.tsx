import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from '@mui/joy/Card';
import CardOverflow  from "@mui/joy/CardOverflow";
import Typography from '@mui/joy/Typography';
import {CssVarsProvider} from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import { ProductCollection } from "../../../lib/enums/product.enum";
 

// const newDishes = [
//     {productName: "Lavash", imagePath: "/img/lavash.webp"},
//     {productName: "Cutlet", imagePath: "/img/cutlet.webp"},
//     {productName: "Kebab", imagePath: "/img/kebab.webp"},
//     {productName: "Kebab", imagePath: "/img/kebab-fresh.webp"},
// ];

/** REDUX SLICE & SELECTOR */
const newDishesRetriever = createSelector(
  retrieveNewDishes,
  (newDishes) => ({ newDishes,
}));

interface NewDishes {
    onAdd: (item: CartItem) => void;
  }

export default function NewDishes(props: NewDishes) {
    const { onAdd } = props;
 const { newDishes } = useSelector(newDishesRetriever);
    
 console.log("newDishes:",newDishes);
    

    return (
        <div className={"new-products-frame"}>
            <Container>
                <Stack className={"main"}>
                  <Box className={"category-title"}>Popular Cameras</Box>
                  <Stack className={"cards-frame"}>
                    <CssVarsProvider>
                        { newDishes.length !== 0 ? (
                            newDishes.map((product: Product) => {
                                const imagePath = `${serverApi}/${product.productImages[0]}`
                                const sizeVolume = product.productCollection === ProductCollection.PHONES 
                                ? product.productColor + ""
                                : product.productSize + "";
                                return (
                                    <Card key={product._id} variant="outlined" className={"card"}>
                                        <CardOverflow>
                                            {/* <div className="product-sale">{sizeVolume}</div> */}
                                            <AspectRatio ratio="1">
                                             <img src={imagePath} alt="" />
                                            </AspectRatio>
                                        </CardOverflow>
                                        {/* <Button 
                                                className={"shop-btn"}
                                                onClick={(e) => {
                                                    onAdd({
                                                        _id: product._id,
                                                        quantity: 1,
                                                        name: product.productName,
                                                        price: product.productPrice,
                                                        image: product.productImages[0],
                                                    });
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <img 
                                                    src={"/icons/shopping-cart.svg"}
                                                    style={{ display: "flex" }}
                                                />
                                            </Button> */}

                                        <CardOverflow variant="soft" className="product-detail">
                                            <Stack className="info">
                                                <Stack className={"info-title"}>
                                                    <Typography className={"title"}>
                                                        {product.productName}
                                                    </Typography>
                                                    {/* <Divider width="2" height="24" bg="#d9d9d9" /> */}
                                                        <Typography className={"price"}>${product.productPrice}</Typography>
                                                </Stack>
                                                <Stack>
                                                    <Typography className={"views"}>
                                                        {product.productViews}
                                                        <VisibilityIcon
                                                        sx={{ fontSize: 20, marginLeft: "5px"}}
                                                        />
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </CardOverflow>
                                    </Card>
                                );
                            })
                        ) : (
                          <Box className="no-data">Popular products are not avilable!</Box>
                        )}
                    </CssVarsProvider>
                  </Stack>
                </Stack>
            </Container>
        </div>
    );
}