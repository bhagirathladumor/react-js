import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../page/HomePage";
import AddProdutPage from "../page/AddProductPage";
import ViewProductPage from "../page/ViewProductPage";
import NotFoundPage from "../page/NotFoundPage";
import EditProductPage from "../page/EditProductPage";
import ProductDetailPage from "../page/ProductDetailPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: HomePage
            },
            {
                path: "add-product",
                Component: AddProdutPage
            },
            {
                path: "view-product",
                Component: ViewProductPage
            },
            {
                path: "edit-product/:productId",
                Component: EditProductPage
            },
            {
                path: 'product-detail/:productId',
                Component: ProductDetailPage
            },
            {
                path: "*",
                Component: NotFoundPage
            }
        ],
    },
]);