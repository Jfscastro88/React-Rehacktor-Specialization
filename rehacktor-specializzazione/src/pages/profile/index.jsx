import { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import FavoritesContext from "../../context/FavoritesContext";
import SessionContext from "../../context/SessionContext";
import { Button } from "@heroui/react";

export default function ProfilePage() {
    const { session } = useContext(SessionContext);
    const { favorites, removeFavorite } = useContext(FavoritesContext);
    
    const firstName = session?.user.user_metadata.first_name;
    const avatarUrl = session?.user.user_metadata.avatar_url;
        
    return (
        <main className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
        <div className="flex items-center space-x-4 mb-6">
        <h2 className="text-3xl font-bold">Welcome, {firstName}!</h2>
        </div>
        
        <details className="group" open>
        <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold mb-4">
        <span>Your favorite games</span>
        <span className="transition-transform duration-200 group-open:rotate-180">🡇</span>
        </summary>
        {favorites.length === 0 ? (
            <p className="text-gray-500">There are no favorites at the moment...</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((game) => (
                <div
                key={game.game_id}
                className="relative bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-md transition"
                >
                <img
                src={game.game_image}
                alt={game.game_name}
                className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col justify-between h-32">
                <h3 className="text-gray-800 text-center font-medium truncate">
                {game.game_name}
                </h3>
                <div className="flex justify-between items-center">
                <Link to={`/games/${game.slug}/${game.game_id}`}>
                <Button size="sm">See Details</Button>
                </Link>
                <button
                onClick={() => removeFavorite(game.game_id)}
                className="text-red-500 hover:text-red-700 transition"
                title="Rimuovi dai preferiti"
                >
                <FontAwesomeIcon icon={faTrash} />
                </button>
                </div>
                </div>
                </div>
            ))}
            </div>
        )}
        </details>
        </main>
    );
}
