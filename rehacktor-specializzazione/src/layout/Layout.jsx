import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div role="alert" className="p-6 bg-red-50 text-red-700">
        <p>⚠️ Something went wrong:</p>
        <pre className="mt-2 text-sm">{error.message}</pre>
        <button
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        onClick={resetErrorBoundary}
        >Try again
        </button>
        </div>
    );
}
export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
        <Header />
        
        <div className="flex-1">
        <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()}
        >
        <Outlet />
        </ErrorBoundary>
        </div>
        
        <Footer />
        </div>
    );
}