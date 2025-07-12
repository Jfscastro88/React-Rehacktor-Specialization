import { useEffect, useContext, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link as HeroLink,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar as AvatarUI
} from "@heroui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import GenresDropdown from "../components/GenresDropdown";
import Searchbar from "../components/Searchbar";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import logoImg from "../assets/pictures/logo.png";
import { useTranslation } from 'react-i18next';

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { session, setSession } = useContext(SessionContext);
  const [isOpen, setIsOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [profileFirstName, setProfileFirstName] = useState(
    session?.user?.user_metadata?.first_name || ''
  );

  const isAuthenticated = Boolean(session?.user);

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (!error) setSession(data.session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, [setSession]);

  useEffect(() => {
    if (session?.user?.id) {
      supabase
        .from('profiles')
        .select('avatar_url, first_name')
        .eq('id', session.user.id)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Error fetching profile data:', error);
            return;
          }
          if (data) {
            if (data.avatar_url) {
              const { data: publicData, error: publicError } = supabase
                .storage
                .from('avatars')
                .getPublicUrl(data.avatar_url);
              if (!publicError) setAvatarUrl(publicData.publicUrl);
            }
            if (data.first_name) {
              setProfileFirstName(data.first_name);
            }
          }
        });
    }
  }, [session]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Sign out error:', error);
    else navigate('/');
  };

  return (
    <header>
      <Navbar isBordered className="px-6 bg-white backdrop-blur-none">
        <NavbarContent justify="start" className="gap-6 items-center">
          <NavbarBrand>
            <RouterLink to="/">
              <div className="flex items-center">
                <img src={logoImg} alt="GameNest Logo" className="h-8 w-8" />
                <p className="ml-2 text-2xl font-bold text-inherit">GameNest</p>
              </div>
            </RouterLink>
          </NavbarBrand>

          <NavbarItem className="hidden md:block">
            <GenresDropdown />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="center" className="flex-1 hidden md:flex">
          <NavbarItem>
            <Searchbar />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end" className="gap-4 items-center">
          <div className="hidden md:flex gap-4 items-center">
            {!isAuthenticated ? (
              <>
                <HeroLink as={RouterLink} to="/login" color="foreground">
                  {t('Login')}
                </HeroLink>
                <HeroLink as={RouterLink} to="/register" color="foreground">
                  {t('Register')}
                </HeroLink>
              </>
            ) : (
              <>
                <p className="text-sm text-black mr-2 font-bold">
                  {t('Hey')} {profileFirstName}!
                </p>
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    {avatarUrl ? (
                      <AvatarUI isBordered name={profileFirstName} size="md" src={avatarUrl} className="rounded-full"/>
                    ) : (
                      <AvatarUI isBordered name={profileFirstName} size="md" className="rounded-full"/>
                    )}
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User Menu" variant="flat">
                    <DropdownItem>
                      <HeroLink as={RouterLink} to="/profile" color="foreground">
                        {t('Profile')}
                      </HeroLink>
                    </DropdownItem>
                    <DropdownItem>
                      <HeroLink as={RouterLink} to="/account" color="foreground">
                        {t('Account Settings')}
                      </HeroLink>
                    </DropdownItem>
                    <DropdownItem color="danger" onClick={signOut}>
                      {t('Logout')}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(prev => !prev)}
            className="md:hidden flex justify-center w-full p-2 rounded-md hover:bg-gray-200 focus:outline-none"
            aria-label="Toggle menu">
            {isOpen ? (
              <XMarkIcon className="h-6 w-6 text-black" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-black" />
            )}
          </button>
        </NavbarContent>
      </Navbar>

      {isOpen && (
        <nav className="md:hidden bg-white px-6 pt-4 pb-6 space-y-4 text-center">
          <RouterLink to="/" onClick={() => setIsOpen(false)}
            className="block text-black text-lg font-semibold mx-auto">
            {t('Homepage')}
          </RouterLink>
          <div onClick={() => setIsOpen(false)} className="mx-auto">
            <GenresDropdown mobile />
          </div>
          <div className="mx-auto">
            <Searchbar mobile />
          </div>
          {!isAuthenticated ? (
            <>
              <RouterLink to="/login" onClick={() => setIsOpen(false)}
                className="block text-black text-lg mx-auto">
                {t('Login')}
              </RouterLink>
              <RouterLink to="/register" onClick={() => setIsOpen(false)}
                className="block text-black text-lg mx-auto">
                {t('Register')}
              </RouterLink>
            </>
          ) : (
            <>
              <p className="text-black text-lg font-bold">
                {t('Hey')} {profileFirstName}
              </p>
              <RouterLink to="/profile" onClick={() => setIsOpen(false)}
                className="block text-black text-lg mx-auto">
                {t('Profile')}
              </RouterLink>
              <RouterLink to="/account" onClick={() => setIsOpen(false)}
                className="block text-black text-lg mx-auto">
                {t('Account Settings')}
              </RouterLink>
              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="block text-red-500 text-lg mx-auto">
                {t('Logout')}
              </button>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
export default Header;