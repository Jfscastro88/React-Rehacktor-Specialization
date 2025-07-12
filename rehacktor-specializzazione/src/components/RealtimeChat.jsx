import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState, useEffect, useRef, useCallback } from 'react';
import supabase from '../supabase/supabase-client';

dayjs.extend(relativeTime);

function RealtimeChat ({ data }) {
    const [ messages, setMessages ] = useState([]);
    const [ loadingInitial, setLoadingInitial ] = useState(false);
    const [ error, setError ] = useState("");
    const messageRef = useRef(null);
    
    const scrollSmoothToBottom = () => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }
    const getInitialMessages = useCallback(async () => {
        setLoadingInitial(true);
        const { data: messages, error } = await supabase
        .from("messages")
        .select()
        .eq("game_id", data.id);
        if (error) {
            setError(error.message);
            return;
        }
        setLoadingInitial(false);
        setMessages(messages);
    }, [data?.id]);
    useEffect(() => {
        if (data) {
            getInitialMessages();
        } 
        const channel = supabase
        .channel("messages")
        .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "messages" },
            () => getInitialMessages()
        )
        .subscribe();
        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }
            channel.unsubscribe();
        };
    }, [data, getInitialMessages]);
    
    useEffect(() => {
        scrollSmoothToBottom();
    }, [messages]);
    
    return (
        <div ref={messageRef}
        className="flex-1 overflow-y-auto p-4 bg-gray-100 space-y-2 rounded-t-lg shadow-inner">
        {loadingInitial && (
            <div className="w-full">
            <progress className="w-full h-96 rounded-full bg-gray-300" />
            </div>
        )}
        {error && (
            <article className="p-4 bg-red-100 text-red-700 rounded-lg shadow-sm">
            {error}
            </article>
        )}
        {messages?.map(message => (
            <article key={message.id}
            className="p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 hover:bg-gray-50">
            <p className="text-sm font-semibold text-gray-600">
            {message.profile_username}
            </p>
            <p className="mt-1 text-base text-gray-800 leading-relaxed">
            {message.content}
            </p>
            <p className="mt-2 text-xs text-gray-400 text-right">
            {dayjs().to(dayjs(message.created_at))}
            </p>
            </article>
        ))}
        </div>
    );
}
export default RealtimeChat;