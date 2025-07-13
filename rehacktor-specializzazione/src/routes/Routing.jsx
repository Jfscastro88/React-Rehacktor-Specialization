import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/homepage/index.jsx";
import Layout from "../layout/Layout.jsx";
import ErrorPage from "../pages/error/index.jsx";
import GenrePage from "../pages/generepage/index.jsx";
import GamePage from "../pages/gamepage/index.jsx";
import SearchPage from "../pages/searchpage/index.jsx";
import RegisterPage from "../pages/registerpage/index.jsx";
import LoginPage from "../pages/login/index.jsx";
import AccountPage from "../pages/accountpage/index.jsx";
import ProfilePage from "../pages/profile/index.jsx";

function Routing() { 
    return (
        <HashRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/games/:genre" element={<GenrePage />} />
                    <Route path="/games/:slug/:id" element={<GamePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/register" element={< RegisterPage />}/>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/account" element={<AccountPage />}/>
                    <Route path="/profile" element={<ProfilePage />}/>
                </Route>
            </Routes>
        </HashRouter>
    );
}
export default Routing;