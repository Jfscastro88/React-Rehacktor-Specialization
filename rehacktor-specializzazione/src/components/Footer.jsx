export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div>
        <span className="text-xl font-bold">Rehacktor</span>
        </div>
        <nav className="flex space-x-6">
        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Services</a>
        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Profile</a>
        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Settings</a>
        </nav>
        </div>
        <div className="mt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Rehacktor. Tutti i diritti riservati.
        </div>
        </div>
        </footer>
    );
}