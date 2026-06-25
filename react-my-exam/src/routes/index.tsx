import { Route, Routes } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Detail from "../pages/Detail/detail";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="news/:id" element={<Detail />} />
            </Route>
        </Routes>
    );
}
