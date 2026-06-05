import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; // Added useNavigate for a back button
import { fetchSingleProduct } from "../Services/ProductService";
import type { productFetchType } from "../utils/global";

export default function ProductDetailPage() {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [productData, setProductData] = useState<productFetchType | null>(null);

    useEffect(() => {
        if (productId) {
            getSingleProduct();
        }
    }, [productId]); // Added dependency array to stop infinite loops

    const getSingleProduct = async () => {
        const data = await fetchSingleProduct(productId || "");
        setProductData(data);
    };

    if (!productData) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {/* Navigation & Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors group"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Products
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Left Column: Product Image */}
                <div className="flex flex-col gap-4">
                    <div className="relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50">
                        <img
                            src={productData.p_image}
                            alt={productData.p_name}
                            className="w-full h-auto object-cover min-h-[400px] max-h-[600px] bg-slate-50"
                            onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/500?text=Image+Not+Found')}
                        />
                        <div className="absolute top-4 right-4">
                            <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                                {productData.p_category}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Product Info */}
                <div className="flex flex-col space-y-6">
                    {/* Product Details */}
                    <div className="border-b border-slate-100 pb-6">
                        <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                            {productData.p_name}
                        </h1>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-1">Price</p>
                                <p className="text-4xl font-black text-indigo-600">
                                    ₹{Number(productData.p_price).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-1">Availability</p>
                                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-base ${productData.p_stock > 0
                                        ? 'bg-emerald-50 text-emerald-700'
                                        : 'bg-red-50 text-red-700'
                                    }`}>
                                    <span className={`h-2 w-2 rounded-full ${productData.p_stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                    {productData.p_stock > 0 ? `In Stock (${productData.p_stock} units)` : 'Out of Stock'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Description</h3>
                        <p className="text-slate-600 leading-relaxed text-base">
                            {productData.p_description}
                        </p>
                    </div>

                    {/* Product Specs */}
                    <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-xl p-4">
                        <div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Category</p>
                            <p className="font-semibold text-slate-900">{productData.p_category}</p>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Stock Units</p>
                            <p className="font-semibold text-slate-900">{productData.p_stock}</p>
                        </div>
                    </div>

                    {/* Action Area */}
                    <div className="pt-4 space-y-4 border-t border-slate-100">
                        <div className="flex gap-3">
                            <button
                                disabled={productData.p_stock === 0}
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-lg shadow-lg shadow-indigo-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {productData.p_stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                            <button className="px-5 py-3.5 bg-slate-50 border-2 border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 rounded-lg transition-all font-bold">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-center text-xs text-slate-500 font-medium">
                            ✓ Free shipping on orders over ₹1,000 • ✓ Secure Payment • ✓ 7-day Returns
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}