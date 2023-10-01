import multer from "multer";

const storage = multer.diskStorage({
    destination : (req , file , cb) =>{
        if(file.fieldname === "productPhoto"){
            cb(null , "public/product");
        };
    
    },
    filename : (req , file , cb) =>{
     cb(null , Date.now()+ "_" +Math.floor(Math.random() *100000) + "_" + file.originalname);
    },
});

export const createProductMulter = multer({ storage : storage , fileFilter : (req , file , cb) =>{
    if(file.mimetype === "image/jpeg" 
    || file.mimetype === "image/png" 
    || file.mimetype === "image/jpg" 
    || file.mimetype === "image/svg" 
    || file.mimetype === "image/tiff" 
    || file.mimetype === "image/ai" 
    || file.mimetype === "image/row"){
        cb(null , true);
    }else{
        cb(new Error("invalid file type"))
    }
} }).single("productPhoto");