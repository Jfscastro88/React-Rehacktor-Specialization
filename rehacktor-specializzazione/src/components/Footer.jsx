import { useContext } from "react";
import { Link } from "react-router-dom";
import SessionContext from "../context/SessionContext";
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => i18n.changeLanguage(lng);
    const { session } = useContext(SessionContext);
    const isAuthenticated = Boolean(session?.user);
    
    return (
        <footer className="bg-gray-900 text-white py-4 md:py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-4">
                        <span className="text-xl font-bold">GameNest</span>
                    </div>

                    <nav className="flex space-x-6">
                        <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                            {t('Homepage')}
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    {t('Profile')}
                                </Link>
                                <Link to="/account" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    {t('Account Settings')}
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    {t('Login')}
                                </Link>
                                <Link to="/register" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    {t('Register')}
                                </Link>
                            </>
                        )}
                    </nav>

                    <div>
                        <select
                            value={i18n.language}
                            onChange={(e) => changeLanguage(e.target.value)}
                            className="bg-gray-800 text-gray-400 rounded p-1 focus:outline-none">
                            <option value="en">EN</option>
                            <option value="it">IT</option>
                        </select>
                    </div>
                </div>

                <div className="mt-6 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} GameNest. {t('All rights reserved')}
                </div>
            </div>
        </footer>
    );
}
export default Footer;