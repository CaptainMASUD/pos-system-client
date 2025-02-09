import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS

//api routes
import productlistRoutes from './routes/productlist.routes.js';
import categoryRoutes from './routes/category.routes.js';
import brandRoutes from './routes/brand.routes.js';
app.use('/api/productlist', productlistRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);

//handle error
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(statusCode).json({
        success : "false",
        statusCode,
        message
    });
});

export {app};
