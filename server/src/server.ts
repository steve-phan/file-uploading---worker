import express, { Express, Request, Response } from "express";
import cors from "cors";
import ProductController from "./controllers/productController";
import productRouter from "./routes/productRoutes";
import uploadRouter from "./routes/uploadRoutes";

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});
 
app.use('/api/products', productRouter)
app.use('/api/uploads', uploadRouter)


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
