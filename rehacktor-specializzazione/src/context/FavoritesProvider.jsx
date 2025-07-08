import { useContext, useState, useCallback, useEffect } from "react";
import supabase from "../supabase/supabase-client"
import SessionContext from "./SessionContext";
import FavoritesContext from "../context/FavoritesContext"

export default function FavoritesProvider({ children }) {
    const { session } = useContext(SessionContext);
    const [favorites, setFavorites] = useState([]);
    
    const getFavorites = useCallback(async () => {
        const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", session?.user.id);
        if (error) {
            console.error("Errore nel recupero dei preferiti:", error);
        } else {
            setFavorites(data);
        }
    }, [session]);
    
    const addFavorite = async (game) => {
        const { data, error } = await supabase
        .from("favorites")
        .insert([
            {
                user_id: session?.user.id,
                game_id: game.id,
                game_name: game.name,
                game_image: game.background_image,
            },
        ])
        .select();
        
        if (!error && data) {
            setFavorites((prev) => [...prev, ...data]);
        }
    };
    
    const removeFavorite = async (gameId) => {
        const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("game_id", gameId)
        .eq("user_id", session?.user.id);
        
        if (error) {
            console.error("Errore nella rimozione:", error);
        } else {
            setFavorites((prev) => prev.filter((fav) => fav.game_id !== gameId));
        }
    };
    
    useEffect(() => {
        if (session) {
            getFavorites();
        }
        
        const subscription = supabase
        .channel("favorites")
        .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "favorites" },
            () => getFavorites()
        )
        .subscribe();
        
        return () => {
            if (subscription) {
                supabase.removeChannel(subscription);
                subscription.unsubscribe?.();
            }
        };
    }, [getFavorites, session]);
    return (
        <FavoritesContext.Provider 
        value={{ favorites,
            setFavorites,
            addFavorite,
            removeFavorite,}}>
            {children}
            </FavoritesContext.Provider>
        );
    }