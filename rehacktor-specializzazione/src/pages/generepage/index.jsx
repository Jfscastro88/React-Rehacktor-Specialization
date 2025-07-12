import { useParams } from "react-router-dom";
import CardGame from '../../components/CardGame';
import useFetchSolution from '../../hook/useFetchSolution';
import { useTranslation } from 'react-i18next';

function GenrePage () {
    const { t } = useTranslation();
    const  { genre } = useParams();
    
    const initialUrl = `https://api.rawg.io/api/games?key=e83c62b7168e4b73b7d8c2a6fcb17f81&genres=${genre}&page=1`;
    
    const { data, loading, error } = useFetchSolution(initialUrl);
    
    return (
        <main className="px-4 py-6">
        <h2 className="text-3xl font-bold text-center mb-10">
        {t('Welcome to the')} {genre} {t('games')}!
        </h2>
        
        {loading && (
            <p className="text-gray-600">{t('Loading')} {genre} {t('games')}…</p>
        )}
        {error && (
            <p className="text-red-500 mb-4">{t('Error')}: {error}</p>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data?.results?.map((game) => (
            <CardGame key={game.id} game={game} />
        ))}
        </div>
        </main>
    );
}

export default GenrePage;