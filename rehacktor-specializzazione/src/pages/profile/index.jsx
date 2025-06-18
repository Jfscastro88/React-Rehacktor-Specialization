import { useContext } from "react";
import SessionContext from "../../context/SessionContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import FavoritesContext from "../../context/FavoritesContext";

const favoriteGameui = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

export default function ProfilePage() {
    const { session } = useContext(SessionContext);
    const { favorites, removeFavorite } = useContext(FavoritesContext);
    
    return (
        <main className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl space-y-6">
        <h2 className="text-2xl font-bold">
        Hey {session?.user.user_metadata.first_name}
        </h2>
        
        <details className="dropdown open">
        <summary className="text-lg font-semibold cursor-pointer mb-2">
        I tuoi giochi preferiti
        </summary>
        
        {favorites.length === 0 ? (
            <p className="text-gray-500">Non ci sono preferiti al momento...</p>
        ) : (
            <ul className="space-y-4">
            {favorites.map((game) => (
                <li
                key={game.id}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm"
                >
                <div className="flex items-center gap-4">
                <img
                src={game.game_image}
                alt={game.game_name}
                width={50}
                height={50}
                className="rounded object-cover"
                />
                <p className="text-gray-800 font-medium">{game.game_name}</p>
                </div>
                <button
                onClick={() => removeFavorite(game.game_id)}
                className="hover:text-red-600 transition"
                title="Rimuovi dai preferiti"
                >
                <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                </button>
                </li>
            ))}
            </ul>
        )}
        </details>
        </main>
        
    );
}