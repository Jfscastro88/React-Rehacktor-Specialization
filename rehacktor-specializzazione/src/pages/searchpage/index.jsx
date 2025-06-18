import { useSearchParams } from "react-router";
import  useFetchSolution from "../../hook/useFetchSolution";
import CardGame from "../../components/CardGame";

function SearchPage() {
    let [searchParams] = useSearchParams();
    const game = searchParams.get("query");
    
    const initialUrl = `https://api.rawg.io/api/games?key=e83c62b7168e4b73b7d8c2a6fcb17f81&search=${game}`;
    
    const { data, loading, error } = useFetchSolution(initialUrl);
    
    return (
        <main className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Risultati per: <span className="capitalize">{game}</span></h1>
        
        {loading && (
            <p className="text-gray-600">Caricamento dei risultati per “{game}”...</p>
        )}
        
        {error && (
            <p className="text-red-500">Errore: {error}</p>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data?.results?.map((game) => (
            <CardGame key={game.id} game={game} />
        ))}
        </div>
        </main>
        
    )
}

export default SearchPage;