export default function ErrorPage() {
    return (
        <main className="flex flex-col items-center justify-center h-[60vh] px-4 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-2">Oops!</h1>
        <p className="text-lg text-gray-600">Qualcosa è andato storto o la pagina non esiste.</p>
        <p className="mt-4">
        Torna alla{" "}
        <a href="/" className="text-blue-600 underline hover:text-blue-800">
        home page
        </a>
        .
        </p>
        </main>
    )
}