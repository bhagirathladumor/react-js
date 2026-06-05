import { useEffect, useState } from "react";
import { fetchAllProducts, deleteProduct } from "../Services/ProductService";
import type { productFetchType } from "../utils/global";
import { Link } from "react-router";

export default function HomePage() {
    const [allProducts, setAllProducts] = useState<productFetchType[]>([]);
    const [allCategories, setAllCategories] = useState<string[]>([]);
    const [filterCategory, setFilterCategory] = useState<string>("All");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        getAllProductData();
    }, []);

    useEffect(() => {
        let allCategory: any = new Set(allProducts.map((product) => product.p_category));
        allCategory = Array.from(allCategory);
        setAllCategories(["All", ...allCategory]);
    }, [allProducts]);

    const getAllProductData = async () => {
        setIsLoading(true);
        try {
            const allProductData = await fetchAllProducts();
            setAllProducts(allProductData);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteProduct = async (id: string, event: React.MouseEvent) => {
        event.preventDefault(); // Prevent navigation to product detail
        event.stopPropagation(); // Stop event bubbling

        if (window.confirm("Are you sure you want to delete this product?")) {
            setDeletingId(id);
            try {
                await deleteProduct(id);
                // Remove product from state
                setAllProducts(prevProducts => prevProducts.filter(product => product.id !== id));
                alert("Product deleted successfully!");
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Failed to delete product. Please try again.");
            } finally {
                setDeletingId(null);
            }
        }
    };

    const filterProducts = (filterCategory === "All")
        ? allProducts
        : allProducts.filter((product) => product.p_category === filterCategory);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-96 bg-gray-200 rounded-2xl mb-12"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl h-96"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white border-b border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 opacity-50"></div>
                <div className="relative max-w-7xl mx-auto py-20 px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-6">
                        Discover Amazing<br />Products
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Curated collection of premium items that combine style, quality, and innovation
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Category Filter */}
                <div className="mb-12">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {allCategories.map((category, index) => {
                            const isActive = filterCategory === category;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setFilterCategory(category)}
                                    className={`relative px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${isActive
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Product Grid */}
                {filterProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
                        <p className="text-gray-500">Try adjusting your category filter</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filterProducts.map((product) => (
                            <div key={product.id} className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                                <Link to={`product-detail/${product.id}`}>
                                    {/* Image Container */}
                                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                        <img
                                            src={product.p_image}
                                            alt={product.p_name}
                                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400?text=Product+Image')}
                                        />

                                        {/* Badges */}
                                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                                {product.p_category}
                                            </span>
                                            {product.p_stock < 5 && product.p_stock > 0 && (
                                                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                                                    Low Stock
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-5">
                                        <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                            {product.p_name}
                                        </h2>

                                        <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                                            {product.p_description}
                                        </p>

                                        {/* Price */}
                                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                            <div>
                                                <span className="text-xs text-gray-500">Price</span>
                                                <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                                    ₹{Number(product.p_price).toLocaleString()}
                                                </p>
                                            </div>
                                            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </Link>

                                {/* Delete Button - Separate from Link */}
                                <button
                                    onClick={(e) => handleDeleteProduct(product.id, e)}
                                    disabled={deletingId === product.id}
                                    className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg z-10"
                                >
                                    {deletingId === product.id ? (
                                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}