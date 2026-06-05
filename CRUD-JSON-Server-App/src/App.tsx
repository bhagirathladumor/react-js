import { Outlet } from "react-router";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">

      <Header />

      {/* Page Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Container for the Outlet content */}
        <div className="min-h-[500px] rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
          <Outlet />
        </div>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </main>
    </div>
  );
}