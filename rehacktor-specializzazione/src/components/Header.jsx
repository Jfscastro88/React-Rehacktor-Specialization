import { useEffect, useState, useContext } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link as HeroLink, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button } from "@heroui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import GenresDropdown from '../components/GenresDropdown';
import Searchbar from '../components/Searchbar';
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import logoImg from "../assets/pictures/logo.png";

function Logo() {
    return (
    <RouterLink to="/">
        <img
        src={logoImg}
        alt="Logo Rehacktor"
        className="h-8 w-auto"
        />
    </RouterLink>
    );
}

function Header() {
    const navigate = useNavigate();
    const { session, setSession } = useContext(SessionContext); 
    
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Sign out error:", error);
        } else {
            alert("You have been signed out successfully.");
            navigate("/");
        }
    };
    
    useEffect(() => {
        supabase.auth.getSession().then(({ data, error }) => {
            if (!error) setSession(data.session);
        });
        
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
        
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);
    
    return (
        <Navbar isBordered className="px-6">
        <NavbarContent justify="start" className="gap-6">
        <NavbarBrand>
        <Logo />
        <HeroLink as={RouterLink} to="/" color="foreground">
        <p className="ml-2 font-bold text-inherit">Gaming and React</p>
        </HeroLink>
        </NavbarBrand>
        
        <GenresDropdown />
        </NavbarContent>
        
        <NavbarContent justify="center" className="flex-1 hidden md:flex">
        <Searchbar />
        </NavbarContent>
        
        <NavbarContent justify="end" className="gap-4">
        {!session && (
            <>
            <HeroLink as={RouterLink} to="/login" color="foreground">
            Login
            </HeroLink>
            <HeroLink as={RouterLink} to="/register" color="foreground">
            Register
            </HeroLink>
            </>
        )}
        
        {session && (
            <Dropdown placement="bottom-end">
            <DropdownTrigger>
            <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name={session?.user?.user_metadata?.first_name}
            size="sm"
            src={`https://i.pravatar.cc/150?u=${session?.user?.id}`}
            />
            </DropdownTrigger>
            
            <DropdownMenu aria-label="User Menu" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
            👋 Hey {session?.user?.user_metadata?.first_name}
            </DropdownItem>
            <DropdownItem>
            <HeroLink as={RouterLink} to="/profile" color="foreground">
            Profile
            </HeroLink>
            </DropdownItem>
            <DropdownItem>
            <HeroLink as={RouterLink} to="/account" color="foreground">
            Account
            </HeroLink>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={signOut}>
            Log Out
            </DropdownItem>
            </DropdownMenu>
            </Dropdown>
        )}
        </NavbarContent>
        </Navbar>
    );
}

export default Header;
