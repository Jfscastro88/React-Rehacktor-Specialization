import { useParams } from "react-router";
import useFetchSolution from '../../hook/useFetchSolution';
import ToggleFavorite from "../../components/ToggleFavorite";


function GamePage() {
    
    const { id } = useParams();
    
    const initialUrl = `https://api.rawg.io/api/games/${id}?key=e83c62b7168e4b73b7d8c2a6fcb17f81`;
    
    const { data, loading, error } = useFetchSolution(initialUrl);
    
    if (loading) return <p>Loading game details…</p>;
    
    
    
    return (
        <>
        {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-md shadow mb-4">
            <h1 className="text-lg font-semibold">Errore</h1>
            <p>{error}</p>
            </div>
        )}
        
        {data && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white rounded-2xl shadow-lg max-w-5xl mx-auto mt-6">
            <div className="space-y-4">
            <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">{data.name}</h1>
            <ToggleFavorite game={data} />
            </div>
            <p className="text-gray-600 text-sm">
            <span className="font-semibold">Released:</span> {data.released}
            </p>
            <p className="text-gray-600 text-sm">
            <span className="font-semibold">Rating:</span> {data.rating}
            </p>
            <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-1">About</h2>
            <p className="text-gray-700 leading-relaxed">{data.description_raw}</p>
            </div>
            </div>
            
            <div className="flex justify-center items-start">
            <img
            src={data.background_image}
            alt={`Background of ${data.name}`}
            className="rounded-xl shadow-md w-full max-h-[400px] object-cover"
            />
            </div>
            </div>
        )}
        
        </>
    )
}
export default GamePage;


