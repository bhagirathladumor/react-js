import { useState } from "react";
import type { productType } from "../utils/global";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { addProduct } from "../Services/ProductService";

export default function AddProductPage() {

    const navigate = useNavigate();

    const [productData, setProductData] = useState<productType>({
        p_name: "",
        p_price: 0,
        p_stock: 0,
        p_image: "",
        p_category: "",
        p_description: "",
    });

    const productCategory = ["Electronic", "Home & Living", "Sports", "Fashion", "Books"];

    // Shared Tailwind classes for consistent styling
    const labelClasses = "block text-sm font-semibold text-slate-700 mb-1.5";
    const inputClasses = "w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-400";

    const onHandleChange = (event: any) => {
        const { name, value } = event.target;

        setProductData(prev => ({ ...prev, [name]: (name === 'p_price' || name === 'p_stock') ? Number(value) : value }));
    }

    const onHandleSubmit = async (event: any) => {
        event.preventDefault();

        if (!productData.p_name || productData.p_price === 0 || productData.p_stock === 0 || !productData.p_image || !productData.p_category || !productData.p_description) {
            toast.error("All filds are required..");
            return;
        }

        console.log("Product Data : ", productData);

        // add product
        const status = await addProduct(productData);

        if (status) {
            navigate('/view-product');
        }

    }
    return (
        <div className="max-w-2xl mx-auto">
            {/* Page Header */}
            <div className="mb-8 border-b border-slate-100 pb-5">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Add New Product
                </h1>
                <p className="mt-2 text-slate-500">
                    Fill in the details below to list a new item in your inventory.
                </p>
            </div>

            {/* Form Card */}
            <form className="space-y-6" onSubmit={onHandleSubmit}>
                {/* Row 1: Product Name */}
                <div>
                    <label className={labelClasses}>Product Name</label>
                    <input
                        type="text"
                        name="p_name"
                        onChange={onHandleChange}
                        placeholder="e.g. Wireless Noise Cancelling Headphones"
                        className={inputClasses}
                    />
                </div>

                {/* Row 2: Price & Stock (Grid) */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className={labelClasses}>Product Price ($)</label>
                        <input
                            type="number"
                            name="p_price"
                            onChange={onHandleChange}
                            placeholder="0.00"
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Product Stock</label>
                        <input
                            type="number"
                            name="p_stock"
                            onChange={onHandleChange}
                            placeholder="Quantity available"
                            className={inputClasses}
                        />
                    </div>
                </div>

                {/* Row 3: Image Link & Category (Grid) */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className={labelClasses}>Product Image URL</label>
                        <input
                            type="text"
                            name="p_image"
                            onChange={onHandleChange}
                            placeholder="https://images.com/product.jpg"
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Product Category</label>
                        <div className="relative">
                            <select name="p_category" onChange={onHandleChange} className={`${inputClasses} appearance-none cursor-pointer`}>
                                <option value="">Select a category</option>
                                {productCategory.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                            {/* Custom Chevron Icon for Select */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 4: Description */}
                <div>
                    <label className={labelClasses}>Product Description</label>
                    <textarea
                        name="p_description"
                        rows={4}
                        onChange={onHandleChange}
                        placeholder="Describe the product's features and benefits..."
                        className={`${inputClasses} resize-none`}
                    ></textarea>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100 mt-6">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-2.5 text-sm font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-8 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    );
}