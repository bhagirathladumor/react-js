import { useEffect, useState } from "react";
import { fetchAllProducts } from "../Services/ProductService";
import type { productFetchType } from "../utils/global";
import { Link } from "react-router";

export default function HomePage() {
    const [allProducts, setAllProducts] = useState<productFetchType[]>([]);
    const [allCategories, setAllCategories] = useState<string[]>([]);
    const [filterCategory, setFilterCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>(""); // Search state

    useEffect(() => {
        getAllProductData();
    }, []);

    useEffect(() => {
        // Extract unique categories safely
        const categories = Array.from(new Set(allProducts.map((product) => product.p_category)));
        setAllCategories(["All", ...categories]);
    }, [allProducts]);

    const getAllProductData = async () => {
        const allProductData = await fetchAllProducts();
        setAllProducts(allProductData);
    };

    // Derived Dashboard Stats
    const totalProducts = allProducts.length;
    const totalCategories = allCategories.length - 1 > 0 ? allCategories.length - 1 : 0;
    const lowStockCount = allProducts.filter(p => p.p_stock < 5 && p.p_stock > 0).length;
    const averagePrice = allProducts.length
        ? Math.round(allProducts.reduce((acc, p) => acc + Number(p.p_price), 0) / allProducts.length)
        : 0;

    // Filtered Products logic based on both Category and Search Query
    const filterProducts = allProducts.filter((product) => {
        const matchesCategory = filterCategory === "All" || product.p_category === filterCategory;
        const matchesSearch = product.p_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.p_description?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-slate-50 min-h-screen pb-16 font-sans">

            {/* Hero & Shop Brand Header */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-slate-800 mb-8">
                <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8 text-center">
                    <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-indigo-500/30">
                        Welcome to the Future of Shopping
                    </span>
                    <h1 className="text-4xl font-black tracking-tight sm:text-6xl mt-3">
                        VibeCart <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Premium Store</span>
                    </h1>
                    <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
                        Explore our enterprise-grade catalog with real-time analytics. Filter, search, and manage items seamlessly.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- DASHBOARD STATISTICS SECTION --- */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
                        <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Products</p>
                            <p className="text-2xl font-bold text-slate-800">{totalProducts}</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
                        <div className="p-3 rounded-lg bg-cyan-50 text-cyan-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Categories</p>
                            <p className="text-2xl font-bold text-slate-800">{totalCategories}</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
                        <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Low Stock</p>
                            <p className="text-2xl font-bold text-slate-800">{lowStockCount}</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
                        <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Avg Price</p>
                            <p className="text-2xl font-bold text-slate-800">₹{averagePrice.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* --- CONTROLS: SEARCH & FILTERS --- */}
                <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm mb-8 space-y-4">
                    {/* Search Input */}
                    <div className="relative max-w-md">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search products by name or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2 items-center pt-2 border-t border-slate-100">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Categories:</span>
                        {allCategories.map((category, index) => {
                            const isActive = filterCategory === category;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setFilterCategory(category)}
                                    className={`px-4 py-2 rounded-lg font-semibold text-xs transition-all tracking-wide ${isActive
                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                                        : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                        } active:scale-95`}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* --- PRODUCT GRID --- */}
                {filterProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border border-slate-200/60 shadow-sm">
                        <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">No Products Found</h3>
                        <p className="text-slate-500 text-sm max-w-xs">We couldn't find anything matching your combination of filters and search queries.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filterProducts.map((product, index) => (
                            <Link key={product.id || index} to={`product-detail/${product.id}`} className="group">
                                <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">

                                    {/* Image Container */}
                                    <div className="relative aspect-square overflow-hidden bg-slate-50 border-b border-slate-100">
                                        <img
                                            src={product.p_image}
                                            alt={product.p_name}
                                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300?text=Product')}
                                        />
                                        <div className="absolute top-3 right-3 left-3 flex items-start justify-between">
                                            <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
                                                {product.p_category}
                                            </span>
                                            {product.p_stock < 5 && product.p_stock > 0 && (
                                                <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm animate-pulse">Low Stock</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        <div className="mb-2">
                                            <h2 className="text-base font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                                {product.p_name}
                                            </h2>
                                        </div>

                                        <p className="text-slate-500 text-xs line-clamp-2 mb-4 flex-grow">
                                            {product.p_description}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                                            <div>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Price</p>
                                                <p className="text-lg font-black text-slate-900">₹{Number(product.p_price).toLocaleString()}</p>
                                            </div>
                                            <button className="bg-slate-900 group-hover:bg-indigo-600 text-white p-2.5 rounded-lg shadow-sm transition-all active:scale-95">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}