import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container,Stack, } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon  from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon  from "@mui/icons-material/ArrowForward";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),

});

const productRetriever = createSelector(retrieveProducts, (products) => ({
    products
}))

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

// const products = [
//  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
//  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
//  { productName: "Kebab", imagePath: "/img/kebab.webp" },
//  { productName: "Lavash", imagePath: "/img/lavash.webp" },
//  { productName: "Lavash", imagePath: "/img/lavash.webp" },
//  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
//  { productName: "Kebab", imagePath: "/img/kebab.webp" },
//  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
// ];

export default function Products(props:ProductsProps) {
    const { onAdd } = props;
    const { setProducts } = actionDispatch(useDispatch());
    const { products } = useSelector(productRetriever);
    const [ productSearch, setProductSearch] = useState<ProductInquiry>({
        
            page: 1,
            limit: 8,
            order: "createdAt",
            productCollection: ProductCollection.DISH,
            search: "",
        });

        const [searchText, setSearchText] = useState<string>("");
        const history = useHistory();
        
        useEffect(() => {
            const product = new ProductService();
            product.getProducts(productSearch)
        .then((data) => setProducts(data))
        .catch((err) => console.log(err));
    }, [productSearch]);

    useEffect(() => {
        if (searchText === "") {
            productSearch.search = "";
            setProductSearch({...productSearch });
        }
    }, [searchText]);

    /**HANDLERS */
    
    const searchCollectionHandler = (collection: ProductCollection) => {
       productSearch.page = 1;
       productSearch.productCollection = collection;
       setProductSearch({...productSearch });
    };

    const searchOrderHandler = (order: string) => {
        productSearch.page = 1;
        productSearch.order = order;
        setProductSearch({...productSearch });
     };

     const searchProductHandler = () => {
       productSearch.search = searchText;
       setProductSearch({...productSearch });
     };

    const paginationHandler = (e: ChangeEvent<any>, value: number) => {
        productSearch.page = value;
        setProductSearch({ ...productSearch });
    };

    const choseDishHandler = (id: string) => {
        history.push(`/products/${id}`);
    }

    return (
        <div className={"products"}>
            <Container>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Stack className={"avatar-big-box"}>
                        <Stack
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            className={"top-text"}
                        >
                        <Box className={"restaurant-title"}>Burak Restaurant</Box>
                            <Stack flexDirection={"row"} alignItems={"center"} className={"search-box"}>
                                <input 
                                    type={"text"} 
                                    placeholder={"Type here"} 
                                    className={"search-input"}
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if(e.key === "Enter") searchProductHandler();
                                    }}
                                />
                                <Button
                                    variant={"contained"}
                                    color={"primary"}
                                    startIcon={<SearchIcon />}
                                    className={"search-button"}
                                    onClick={searchProductHandler}
                                >
                                    SEARCH
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack className={"dishes-filter-section"}>
                        <Stack className={"dishes-filter-box"}>
                            <Button 
                                variant={"contained"}
                                className={"order"}
                                color={
                                    productSearch.order === "createdAt" ? "primary" : "secondary"
                                }
                                onClick={() => searchOrderHandler("createdAt")}
                            >
                                New
                            </Button>
                            <Button 
                                variant={"contained"}
                                className={"order"}
                                color={
                                    productSearch.order === "productPrice" ? "primary" : "secondary"
                                }
                                onClick={() => searchOrderHandler("productPrice")}
                            >
                                Price
                            </Button>
                            <Button 
                                variant={"contained"}
                                className={"order"}
                                color={
                                    productSearch.order === "productViews" ? "primary" : "secondary"
                                }
                                onClick={() => searchOrderHandler("productViews")}
                            >
                                Views
                            </Button>
                        </Stack>
                    </Stack>

                    <Stack className={"list-category-section"}>
                    <Stack className={"product-category"}>
                        <div className={"category-main"}>
                            <Button 
                                variant={"contained"}
                                color={
                                    productSearch.productCollection === ProductCollection.OTHER 
                                    ? "primary" 
                                    : "secondary"}
                                onClick={() =>searchCollectionHandler(ProductCollection.OTHER)}
                            >
                                Other
                            </Button>
                            <Button 
                                variant={"contained"} 
                                color={
                                    productSearch.productCollection === ProductCollection.DESERT 
                                    ? "primary" 
                                    : "secondary"}
                                onClick={() =>searchCollectionHandler(ProductCollection.DESERT)}
                            >
                                Desert
                            </Button>
                            <Button 
                                variant={"contained"} 
                                color={
                                    productSearch.productCollection === ProductCollection.DRINK 
                                    ? "primary" 
                                    : "secondary"}
                                onClick={() =>searchCollectionHandler(ProductCollection.DRINK)}
                            >
                                Drink
                            </Button>
                            <Button 
                                variant={"contained"} 
                                color={
                                    productSearch.productCollection === ProductCollection.SALAD 
                                    ? "primary" 
                                    : "secondary"}
                                onClick={() =>searchCollectionHandler(ProductCollection.SALAD)}
                            >
                                Salad
                            </Button>
                            <Button 
                                variant={"contained"} 
                                color={
                                  productSearch.productCollection === ProductCollection.DISH 
                                  ? "primary" 
                                  : "secondary"}
                                onClick={() =>searchCollectionHandler(ProductCollection.DISH)}
                            >
                                Dish
                            </Button>
                        </div>
                    </Stack>

                    <Stack className={"product-wrapper"}>
                        {products.length !== 0 ? (
                            products.map((product: Product) => {
                                const imagePath = `${serverApi}/${product.productImages[0]}`;
                                const sizeVolume = 
                                product.productCollection === ProductCollection.DRINK
                                ? product.productVolume + "litre"
                                :product.productSize + " size";
                                return (
                                    <Stack 
                                        key={product._id} 
                                        className={"product-card"} 
                                        onClick={() => choseDishHandler(product._id)}
                                    >
                                        <Stack 
                                            className={"product-img"}
                                            sx={{ backgroundImage: `url(${imagePath})`}}
                                        >
                                            <div className={"product-sale"}>{sizeVolume}</div>
                                            <Button 
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
                                            </Button>
                                            <Button className={"view-btn"} sx={{ right: "36px" }}>
                                                <Badge badgeContent={product.productViews} color="secondary">
                                                    <RemoveRedEyeIcon 
                                                        sx={{
                                                        color: 
                                                        product.productViews === 0 ? "gray" : "white",
                                                        }}
                                                    />
                                                </Badge>
                                            </Button>
                                        </Stack>
                                        <Box className={"products-desc"}>
                                            <span className={"product-title"}>
                                                {product.productName}
                                            </span>
                                            <div className={"product-desc"}>
                                                <MonetizationOnIcon />
                                                {product.productPrice}
                                            </div>
                                        </Box>
                                    </Stack>
                                );
                            })
                        ) : (
                            <Box className="no-data"> Products are not avilable!</Box>
                        )}
                    </Stack>
                    </Stack>

                    <Stack className={"pagination-section"}>
                        <Pagination 
                        count={
                        products.length !== 0 
                            ? productSearch.page + 1 
                            : productSearch.page
                        }
                        page={productSearch.page}
                        renderItem={(item) => (
                                <PaginationItem 
                                    components={{
                                        previous: ArrowBackIcon,
                                        next: ArrowForwardIcon,
                                    }}
                                    {...item}
                                    color={"secondary"}
                                />
                            )}
                            onChange={paginationHandler}
                        />
                    </Stack>
                </Stack>
            </Container>
        
            <div className={"brands-logo"}>
                <Container className={"family-brands"}>
                    <Box className={"category-title"}>Our Family Brands</Box>
                    <Stack className={"brand-list"}>
                            <Box className={"review-box"}>
                            <img src={"/img/gurme.png"} />
                            </Box> 
                            <Box className={"review-box"}>
                            <img src={"/img/sweets.png"} />
                            </Box> 
                            <Box className={"review-box"}>
                            <img src={"/img/seafood.png"} />
                            </Box> 
                            <Box className={"review-box"}>
                            <img src={"/img/doner.png"} />
                            </Box> 
                    </Stack>
                </Container>
            </div>
            
            <div className={"address"}>
                <Container>
                    <Stack className={"address-area"}>
                        <Box className={"title"}>Our address</Box>
                        <iframe 
                            style={{marginTop: "60px"}}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95921.86029841103!2d69.24383806795467!3d41.296720245239506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b704b18669b%3A0xf6fe4f90a44a98fe!2sCZN%20Burak%20Gurme!5e0!3m2!1sen!2skr!4v1745642929687!5m2!1sen!2skr"
                            width="1320"
                            height="500"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </Stack>
                </Container>
            </div>
        </div>
    );
}