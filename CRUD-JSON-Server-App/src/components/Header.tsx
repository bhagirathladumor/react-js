import { NavLink } from "react-router";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-sm backdrop-blur-md bg-white/95">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo Section */}
                    <div className="flex items-center gap-8">
                        <NavLink to="/" className="flex items-center gap-3 group">
                            {/* VibeCart Icon Box */}
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-600 shadow-lg shadow-indigo-200 group-hover:shadow-xl group-hover:scale-105 transition-all">
                                <span className="text-white font-black text-xl tracking-tight">V</span>
                            </div>
                            {/* Updated Store Name */}
                            <span className="text-xl font-extrabold tracking-tight text-slate-900 hidden sm:block">
                                Vibe<span className="text-indigo-600">Cart</span>
                            </span>
                        </NavLink>

                        {/* Navigation Links */}
                        <ul className="hidden md:flex items-center gap-1">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `rounded-lg px-4 py-2 text-sm font-semibold transition-all ${isActive
                                            ? "text-indigo-600 bg-indigo-50"
                                            : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                                        }`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/view-product"
                                    className={({ isActive }) =>
                                        `rounded-lg px-4 py-2 text-sm font-semibold transition-all ${isActive
                                            ? "text-indigo-600 bg-indigo-50"
                                            : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                                        }`
                                    }
                                >
                                    Products
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center">
                        <NavLink
                            to="/add-product"
                            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-100 transition-all active:scale-95"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="hidden sm:inline">Add Product</span>
                            <span className="sm:hidden">Add</span>
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    );
}