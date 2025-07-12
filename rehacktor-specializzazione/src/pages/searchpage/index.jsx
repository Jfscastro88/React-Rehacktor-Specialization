import { useSearchParams } from "react-router-dom";
import  useFetchSolution from "../../hook/useFetchSolution";
import CardGame from "../../components/CardGame";
import { useTranslation } from 'react-i18next';


function SearchPage() {
    const { t } = useTranslation();
    let [searchParams] = useSearchParams();
    const game = searchParams.get("query");
    
    const initialUrl = `https://api.rawg.io/api/games?key=e83c62b7168e4b73b7d8c2a6fcb17f81&search=${game}`;
    
    const { data, loading, error } = useFetchSolution(initialUrl);
    
    return (
        <main className="px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-10">{t('Results for')}: <span className="capitalize">{game}</span></h1>
        
        {loading && (
            <p className="text-gray-600">{t('Loading results for')}“{game}”...</p>
        )}
        
        {error && (
            <p className="text-red-500">{t('Error')}: {error}</p>
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