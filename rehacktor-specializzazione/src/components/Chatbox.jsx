import { useContext } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";

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
        <h4 className="text-xl font-semibold text-gray-800 mb-4">
        Gamers Chat
        </h4>
        
        <div className="bg-white rounded-2xl shadow-inner overflow-hidden">
        <form onSubmit={handleMessageSubmit}
        className="flex items-center p-4 border-t border-gray-200 bg-white rounded-b-lg">
        <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-gray-400 mr-3" />
        
        <input
        type="text"
        name="message"
        placeholder="Scrivi un messaggio…"
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"/>
        
        <button
        type="submit"
        className="ml-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 transition">
        Invia
        </button>
        </form>
        </div>
        </>
    );
}