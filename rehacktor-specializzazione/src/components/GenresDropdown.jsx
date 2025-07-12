import { Link } from "react-router";
import useFetchSolution from '../hook/useFetchSolution'; 
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";
import { useTranslation } from 'react-i18next';

function GenresDropdown (){
    const { t } = useTranslation();   
    const initialUrl = "https://api.rawg.io/api/genres?key=e83c62b7168e4b73b7d8c2a6fcb17f81";
    const { data, loading, error } = useFetchSolution(initialUrl);
    
    return (
        <Dropdown backdrop="blur">
        <DropdownTrigger>
        <Button variant="bordered" size="md">
        {loading ? t('Loading') : t('Genres')}
        </Button>
        </DropdownTrigger>
        
        <DropdownMenu aria-label="Genres" variant="faded">
        {error && (
            <DropdownItem key="error" className="text-danger">
            {error}
            </DropdownItem>
        )}

        {data?.results?.map((genre) => (
            <DropdownItem key={genre.id}>
            <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
            </DropdownItem>
        ))}
        </DropdownMenu>
        </Dropdown>
    );
};
export default GenresDropdown;