import type { productFetchType, productType } from "../utils/global";

const productURL = "http://localhost:8000/product/";

export const addProduct = async (body: productType) => {
    const res = await fetch(productURL, {
        method: "POST",
        body: JSON.stringify(body)
    });

    return res.ok;
}

export const fetchAllProducts = async () => {
    const res = await fetch(productURL);
    const allProductData = await res.json();

    return allProductData;
}

export const deleteProduct = async (id: string) => {

    const res = await fetch(productURL + id, {
        method: "DELETE"
    });

    return res.ok;
}

export const fetchSingleProduct = async (id: string) => {
    const res = await fetch(productURL + id, { method: "GET" });

    const singleProduct = await res.json();

    return singleProduct;

}

export const updateProduct = async (body: productFetchType) => {
    const res = await fetch(productURL + body.id, {
        method: "PATCH",
        body: JSON.stringify(body)
    });

    return res.ok;
}