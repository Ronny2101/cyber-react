import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { createSelector } from "reselect";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { Badge, Box, Button, Container, Pagination, PaginationItem, Stack, Collapse, Rating } from "@mui/material";
import { setProducts } from "../productsPage/slice";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { ChangeEvent, useEffect, useState } from "react";
import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { SxProps } from '@mui/system';

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RemoveRedEyeIcon  from "@mui/icons-material/RemoveRedEye";
import { retrieveProducts } from "../productsPage/selector";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon  from "@mui/icons-material/ArrowForward";
import { Collections } from "@mui/icons-material";

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

export default function PopularCategory(props: ProductsProps) {
    const { onAdd } = props;
    const { setProducts } = actionDispatch(useDispatch());
    const { products } = useSelector(productRetriever);
    const productWrapperRef = React.useRef<HTMLDivElement>(null);
    const [ productSearch, setProductSearch] = useState<ProductInquiry>({
        
            page: 1,
            limit: 8,
            order: "createdAt",
        });

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
    .getProducts(productSearch)
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


    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          productWrapperRef.current &&
          !productWrapperRef.current.contains(event.target as Node)
        ) {
          setOpenCategory(null);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    }, []);

    // const searchCollectionHandler = (collection: ProductCollection) => {
    //   dispatch(setProductCollection(collection));
    // };

    // const searchCollectionHandler = (collection: ProductCollection) => {
    //   setProductSearch({
    //     ...productSearch,
    //     productCollection: collection,
    //     page: 1,
    //   });
    // };
const searchCollectionHandler = (collection: ProductCollection) => {
       productSearch.page = 1;
       productSearch.productCollection = collection;
       setProductSearch({...productSearch });
       setOpenCategory(collection);
    };

    
    const [openCategory, setOpenCategory] = useState<string| null>(null);
    

    const handleCategoryClick = (value: string) => {
      setOpenCategory((prev) => (prev === value ? null : value));
    }

    const searchOrderHandler = (order: string) => {
        productSearch.page = 1;
        productSearch.order = order;
        setProductSearch({...productSearch });
     };

     const searchProductHandler = () => {
       productSearch.search = searchText;
       setProductSearch({...productSearch });
     };

    // const handleCategoryClick = (category: ProductCollection) => {
    //   setSelectedCategory(category);
    //   setProductSearch({
    //     ...productSearch,
    //     productCollection: 
    //     category, page:1
    //   });
    // };
    
    const paginationHandler = (e: ChangeEvent<any>, value: number) => {
        productSearch.page = value;
        setProductSearch({ ...productSearch });
    };

    const choseDishHandler = (id: string) => {
      history.push(`/products/${id}`);
  }

 return (
     <Container>
      <Stack>
        <Stack className="category-info">
                  <Stack
                      flexDirection={"column"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      className={"tops-text"}
                  >
                      <Box className={"category-titles"}>Property Category</Box>
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
                  <Collapse in={Boolean(openCategory)} timeout={500}>
                      <Stack 
                        ref={productWrapperRef} 
                        className={"product-wrapper"}
                      >
                       {products.length !== 0 ? (
                           products.map((product: Product) => {
                               const imagePath = `${serverApi}/${product.productImages[0]}`;
                              // const sizeVolume = 
                              //  product.productCollection === ProductCollection.PHONES
                              //  ? product.productColor + " "
                              //  : product.productSize + " ";
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
                                            Add to Card
                                               {/* <img 
                                                    
                                                   src={"/icons/shopping-cart.svg"}
                                                   style={{ display: "flex" }}
                                               /> */}
                                               {/* <p 
                                               className={"add-title"}
                                               style={{ display: "flex" }}>Add to Cart</p> */}
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
                                             {/* <p>$    </p> */}
                                               <AttachMoneyIcon />
                                              <p> {product.productPrice}</p> 
                                           </div>
                                           <Rating className="rating" name="half-rating" defaultValue={4.5} precision={1} />
                                       </Box>
                                   </Stack>
                               );
                           })
                       ) : (
                           <Box className="no-data"> Products are not avilable!</Box>
                       )}
                    {/* <Stack className={"pagination-section"}>
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
                    </Stack>   */}
                   </Stack>
      {/* <Stack 
            // sx={{
            //   maxHeight: selectedCategory ? "2000px" : 0,
            //   opacity: selectedCategory ? 1 : 0,
            //   overflow: "hidden",
            //   transition: "all 0.5s ease",
            // }}
            className={`product-wrapper ${selectedCategory ? "open" : "closed"}`}>
            {selectedCategory ? (
              products.length > 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.PHONES
                      ? product.productColor + " litre"
                      : product.productSize + " size";

                  return (
                    <Stack
                      key={product._id}
                      className="product-card"
                      onClick={() => choseDishHandler(product._id)}
                    >
                      <Stack
                        className="product-img"
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className="product-sale">{sizeVolume}</div>
                        <Button
                          className="shop-btn"
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
                          <img src="/icons/shopping-cart.svg" />
                        </Button>
                        <Button className="view-btn" sx={{ right: "36px" }}>
                          <Badge badgeContent={product.productViews} color="secondary">
                            <RemoveRedEyeIcon
                              sx={{
                                color: product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className="products-desc">
                        <span className="product-title">{product.productName}</span>
                        <div className="product-desc">
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )
            ) : null}
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
          </Stack> */}
          </Collapse>
        </Stack>
      </Stack>
    </Container>
  );
};




    