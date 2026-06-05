import { useNavigate } from "react-router"

export default function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <div className="text-center max-w-md">
                {/* Icon */}
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-50">
                        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4v2m0-12a9 9 0 110 18 9 9 0 010-18z" />
                        </svg>
                    </div>
                </div>

                {/* Error Code */}
                <h1 className="text-7xl font-black text-slate-900 mb-4">
                    404
                </h1>

                {/* Error Message */}
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Page Not Found
                </h2>
                <p className="text-slate-500 mb-8 leading-relaxed">
                    Sorry, the page you're looking for doesn't exist or has been moved. Let's get you back on track.
                </p>

                {/* Action Button */}
                <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition-all active:scale-95 shadow-lg shadow-indigo-200"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12a9 9 0 110 18 9 9 0 010-18zm0 0a8.949 8.949 0 013.466-2.888m0 0a8.949 8.949 0 0111.068 0m0 0a8.949 8.949 0 013.466 2.888" />
                    </svg>
                    Back to Home
                </button>
            </div>
        </div>
    )
}