import { useContext } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";

export default function Chatbox({ data }) {
    const { session } = useContext(SessionContext);
    
    const handleMessageSubmit = async ( event ) => {
        event.preventDefault();
        const inputMessage = event.currentTarget;
        const { message } = Object.fromEntries(new FormData(inputMessage));
        if (typeof message === "string" && message.trim().length !==0) {
            const { error } = await supabase
            .from("messages")
            .insert([
                {
                    profile_id: session?.user.id,
                    profile_username: session?.user.user_metadata.username,
                    game_id: data.id,
                    content: message,
                },
            ])
            .select ();
            if (error) {
                console.log(error);
            } else {
                inputMessage.reset();
            }
        }
    };
    
    return (
        <>
            <h4> Gamers Chat</h4>
            <div>
                <form onSubmit={handleMessageSubmit} className="flex items-center space-x-2">
                <input type="text" name="message" placeholder="Scrivi un messaggio…" className="flex-1 border   border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                <button type="submit" className="bg-indigo-600 text-white rounded-full px-4 py-2 hover:bg-indigo-700 transition"> Invia </button>
            </form>
            </div>
        </>
    );
}