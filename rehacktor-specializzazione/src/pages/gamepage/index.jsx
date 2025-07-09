import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchSolution from "../../hook/useFetchSolution";
import ToggleFavorite from "../../components/ToggleFavorite";
import Chatbox from "../../components/Chatbox";
import RealtimeChat from "../../components/RealtimeChat";
import SessionContext from "../../context/SessionContext";
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';

function GamePage() {
    const { id } = useParams();
    const { session } = useContext(SessionContext);
    const isAuthenticated = Boolean(session?.user);
    
    const [chatOpen, setChatOpen] = useState(false);
    const initialUrl = `https://api.rawg.io/api/games/${id}?key=e83c62b7168e4b73b7d8c2a6fcb17f81`;
    const { data, loading, error } = useFetchSolution(initialUrl);
    
    if (loading) return <p>Loading game details…</p>;
    
    return (
        <>
        {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-md shadow mb-4 max-w-5xl mx-auto">
            <h1 className="text-lg font-semibold">Errore</h1>
            <p>{error}</p>
            </div>
        )}
        
        {data && (
            <div className="flex flex-col bg-white rounded-2xl shadow-lg max-w-5xl mx-auto mt-6 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-3xl font-bold text-gray-800">{data.name}</h1>
            <ToggleFavorite game={data} />
            </div>
            
            <div className="w-full flex justify-center px-6">
            <img
            src={data.background_image}
            alt={`Background of ${data.name}`}
            className="rounded-xl shadow-md object-cover max-h-[400px] w-full"/>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">About</h2>
            <p className="text-gray-700 leading-relaxed">{data.description_raw}</p>
            </div>
            
            <div className="px-6 py-2 flex justify-end space-x-8 border-t border-gray-200">
            <div className="text-gray-600 text-sm">
            <span className="font-semibold">Rating:</span> {data.rating}
            </div>
            <div className="text-gray-600 text-sm">
            <span className="font-semibold">Released:</span> {data.released}
            </div>
            </div>
            </div>
        )}
        
        {isAuthenticated && data && (
            <>
            <button
            onClick={() => setChatOpen(!chatOpen)}
            className="fixed bottom-6 mb-35 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition"
            aria-label={chatOpen ? "Close chat" : "Open chat"}
            >
            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
            </button>
            
            {chatOpen && (
                <div className="fixed bottom-20 mb-15 right-6 w-full max-w-sm lg:max-w-md bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden h-96">
                <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-gray-800">Live Chat</h4>
                <button onClick={() => setChatOpen(false)} className="text-gray-600 hover:text-gray-800">
                ×
                </button>
                </div>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto">
                <RealtimeChat data={data} />
                </div>
                
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <Chatbox data={data} />
                </div>
                </div>
            )}
            </>
        )}
        </>
    );
}

export default GamePage;