import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, MenuItem,Rating,Select,Stack, Typography, } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
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
import Carousel from "./carusel";

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


export default function Products(props:ProductsProps) {
    const { onAdd } = props;
    const { setProducts } = actionDispatch(useDispatch());
    const { products } = useSelector(productRetriever);
    const [ productSearch, setProductSearch] = useState<ProductInquiry>({
        
            page: 1,
            limit: 8,
            order: "createdAt",
            productCollection: ProductCollection.CAMERAS,
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
    
    useEffect(() => {
        const product = new ProductService();
        product.getProducts(productSearch)
          .then(data => setProducts(data))
          .catch(err => console.log(err));
      }, [productSearch]);
      

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
                           <Box className={"restaurant-title"}>Shop Page</Box>
                        </Stack>
                        <Stack className={"search"}>
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
                                    // variant={"contained"}
                                    // color={"primary"}
                                    startIcon={<SearchIcon />}
                                    className={"search-button"}
                                    onClick={searchProductHandler}
                                >
                                    SEARCH
                                </Button>
                            </Stack>
                            <Stack className={"dishes-filter-box"}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography variant="body2" color="black">
                                        Sort By:
                                    </Typography>

                                    <Select
                                        size="small"
                                        value={productSearch.order}
                                        onChange={(e) => searchOrderHandler(e.target.value)}
                                        sx={{ minWidth: 150 }}
                                    >
                                        <MenuItem value="createdAt">News</MenuItem>
                                        <MenuItem value="productPrice">Price</MenuItem>
                                        <MenuItem value="productViews">Views</MenuItem>
                                    </Select>
                                 </Box>
                  
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack className={"categories-box"}>
                        <Button 
                            className={"category-box1"}
                             onClick={() =>searchCollectionHandler(ProductCollection.CAMERAS)}
                        >
                            <Box className={"category-img"}>
                                <img src={"/icons/camera-50.png"} />
                            </Box>
                            <span className={"title"}>Cameras</span> 
                        </Button>
                        <Button 
                            className={"category-box1"}
                            onClick={() =>searchCollectionHandler(ProductCollection.TV)}
                        >
                            <Box className={"category-img"}>
                                <img src={"/icons/tv-50.png"} />
                            </Box>
                            <span className={"title"}>Tv</span> 
                        </Button>
                        <Button 
                            className={"category-box1"}
                            onClick={() =>searchCollectionHandler(ProductCollection.COMPUTERS)}
                        >
                            <Box className={"category-img"}>
                                <img src={"/icons/macbook-pro-m4.png"} />
                            </Box>
                                <span className={"title"}>Computers</span> 
                        </Button>
                        <Button 
                            className={"category-box1"}
                            onClick={() =>searchCollectionHandler(ProductCollection.PHONES)}
                        >
                            <Box className={"category-img"}>
                                <img src={"/icons/smartphone.png"} />
                            </Box>
                                <span className={"title"}>Phones</span> 
                        </Button>
                        <Button
                            className={"category-box1"} 
                            onClick={() =>searchCollectionHandler(ProductCollection.SMARTWATCHES)}
                        >
                            <Box className={"category-img"}>
                                <img src={"/icons/smart-watch-50.png"} />
                            </Box>
                                <span className={"title"}>SmartWatches</span> 
                        </Button>
                        <Button
                            className={"category-box1"} 
                            onClick={() =>searchCollectionHandler(ProductCollection.REFRIGERATOR)}
                        >
                            <Box className={"category-img"}>
                                <img src={"/icons/refrigerator-50.png"} />
                            </Box>
                                <span className={"title"}>Refrigerator</span> 
                        </Button>
                        <Button 
                            className={"category-box1"}
                            onClick={() =>searchCollectionHandler(ProductCollection.OTHER)}
                        >
                            <Box className={"category-img"}>
                                <img src={"/icons/cpu-50.png"} />
                            </Box>
                            <span className={"title"}>Other</span> 
                        </Button>
                    </Stack>

                    <Stack className={"dishes-filter-section"}>
                    </Stack>

                    <Stack className={"list-category-section"}>
                    <Stack className={"product-category"}>
                         
                    </Stack>

                    <Stack className={"product-wrapper"}>
                        {products.length !== 0 ? (
                            products.map((product: Product) => {
                                const imagePath = `${serverApi}/${product.productImages[0]}`;
                                const sizeVolume = 
                                product.productCollection === ProductCollection.PHONES ||
                                product.productCollection === ProductCollection.COMPUTERS ||
                                product.productCollection === ProductCollection.TV ||
                                product.productCollection === ProductCollection.REFRIGERATOR
                                ? product.productSize + ""
                                : product.productColor + "";
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
                                            {/* <div className={"product-sale"}>{sizeVolume}</div> */}
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
                                            <div className={"product-sale"}>{sizeVolume}</div>
                                            <div className={"product-desc"}>
                                                <AttachMoneyIcon />
                                                {product.productPrice}
                                            </div>
                                            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
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
                <div className={"family-brands"}>
                   <Carousel />
                </div>
            </div>
            
            <div className={"address"}>
                <Container>
                    <Stack className={"address-area"}>
                        <Box className={"title"}>Our address</Box>
                        <iframe 
                            style={{marginTop: "60px"}}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21928.31291548617!2d69.25272060119083!3d41.296563483691585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b48a35ed52f%3A0x6d868958ae00961!2sTashkent%20City%20Mall!5e0!3m2!1sen!2skr!4v1761067850640!5m2!1sen!2skr"
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