import { useState, useEffect } from "react";
import SessionContext from "./SessionContext"
import supabase from "../supabase/supabase-client"

export default function SessionProvider({ children }) {
    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data, error }) => {
            if (!error) {
                setSession(data.session);
            }
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_OUT") {
                setSession(null);
            } else {
                setSession(session);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
    }