import { useContext, useEffect, useState } from "react";
import SessionContext from "../../context/SessionContext";
import supabase from "../../supabase/supabase-client";
import Avatar from "../../components/Avatar";
import { Input, Button } from "@heroui/react"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function AccountPage() {
    
    const { session } = useContext(SessionContext);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);
    
    useEffect(() => {
        if (!session || !session.user) return;
        
        let ignore = false;
        const getProfile = async () => {
            setLoading(true);
            const { user } = session;
            
            const { data, error } = await supabase
            .from("profiles")
            .select("username, first_name, last_name, avatar_url")
            .eq("id", user.id)
            .single();
            
            if (!ignore) {
                if (error) {
                    console.warn(error);
                } else if (data) {
                    setUsername(data.username);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setAvatarUrl(data.avatar_url);
                }
                setLoading(false);
            }
        };
        
        getProfile();
        return () => {
            ignore = true;
        };
    }, [session]);
    
    if (!session || !session.user) {
        return <p>Caricamento sessione utente…</p>;
    }
    if (loading) {
        return <p>Caricamento profilo…</p>;
    }
    
    const updateProfile = async (event, newAvatarUrl) => {
        event.preventDefault();
        setLoading(true);
        const { user } = session;
        
        const updates = {
            id: user.id,
            username,
            first_name,
            last_name,
            avatar_url: newAvatarUrl,
            updated_at: new Date(),
        };
        
        const { error } = await supabase.from("profiles").upsert(updates);
        if (error) {
            alert(error.message);
        } else {
            setAvatarUrl(newAvatarUrl);
        }
        setLoading(false);
    };
    
    
    return (
        <div className="max-w-xl mx-auto mt-10 px-6 py-8 bg-white shadow-xl rounded-2xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
        Account Settings
        </h2>
        
        <form onSubmit={updateProfile} className="space-y-6">
        <div className="flex flex-col items-center">
        <Avatar
        url={avatar_url}
        size={150}
        onUpload={(event, url) => updateProfile(event, url)}
        />
        
        <button
        type="button"
        onClick={() => document.getElementById("single")?.click()}
        disabled={loading}
        className="flex mt-5 items-center px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
        >
        <FontAwesomeIcon icon={faUpload} className="mr-2" /> Upload new photo
        </button>
        </div>
        
        <Input
        label="Email"
        type="email"
        value={session.user.email}
        isDisabled
        className="w-full"
        />
        
        <Input
        id="username"
        label="Username"
        isRequired
        value={username || ""}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full"
        />
        
        <Input
        id="first_name"
        label="First Name"
        value={first_name || ""}
        onChange={(e) => setFirstName(e.target.value)}
        className="w-full"
        />
        
        <Input
        id="last_name"
        label="Last Name"
        value={last_name || ""}
        onChange={(e) => setLastName(e.target.value)}
        className="w-full"
        />
        
        <div className="flex justify-center">
        <Button type="submit" variant="solid" color="primary" isDisabled={loading}>
        {loading ? "Updating..." : "Update"}
        </Button>
        </div>
        </form>
        </div>
    );
}
