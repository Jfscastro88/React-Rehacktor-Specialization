import CardGame from "../../components/CardGame";
import useFetchSolution from '../../hook/useFetchSolution';

function HomePage() {
    
    const initialUrl = `https://api.rawg.io/api/games?key=e83c62b7168e4b73b7d8c2a6fcb17f81&dates=2024-01-01,2024-12-31&page=1` 
    
    const { data, loading, error } = useFetchSolution(initialUrl);
    
    return ( 
        <main className="px-4 py-6">
        <h1 className="text-4xl font-bold text-center mb-10">GameNest – A cozy nest where all your favorite games live.</h1>
        
        {loading && <p className="text-gray-600">Loading games…</p>}
        {error && <p className="text-red-500">Errore: {error}</p>}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data?.results?.map((game) => (
            <CardGame key={game.id} game={game} />
        ))}
        </div>
        </main>
    );
}
export default HomePage;