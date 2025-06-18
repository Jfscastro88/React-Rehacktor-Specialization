import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import SessionContext from "../context/SessionContext";
import FavoritesContext from "../context/FavoritesContext";

export default function ToggleFavorite({ game }) {
    const { session } = useContext(SessionContext);
    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
    
    if (!session) return null;
    
    const isFavorite = favorites.some(
        (fav) =>
            String(fav.game_id) === String(game.id) &&
            String(fav.user_id) === String(session.user.id)
    );
    
    const handleToggle = () => {
        console.log("Clicked! isFavorite:", isFavorite);
        if (isFavorite) {
            console.log("Removing...");
            removeFavorite(game.id);
        } else {
            console.log("Adding...");
            addFavorite(game);
        }
    };
    
    return (
        <button onClick={handleToggle} aria-label="Toggle Favorite">
        <FontAwesomeIcon
        icon={isFavorite ? solidHeart : regularHeart}
        className={`text-2xl ${
            isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-400 transition"
        }`}
        />
        </button>
    );
}