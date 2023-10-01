import express from "express";
import { createProductMulter } from "../utils/multer.js";
import {
     getallProduct 
    ,createProductForm 
    , createProductData
    ,singleProductData
    ,deleteProductData
    ,editProductData
    ,updateProductData

 } from "../controllers/productController.js";

// init router;

const router = express.Router();
router.get("/create" , createProductForm);
router.post("/product" , createProductMulter, createProductData);
router.get("/" , getallProduct);
router.get("/single/:slug" , singleProductData );
router.get("/delete/:id" , deleteProductData)
router.get("/edit/:id" , editProductData);
router.post("/updateProduct/:id" , createProductMulter , updateProductData);



// export default router here;
export default router;