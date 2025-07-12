import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@heroui/react";

function Searchbar() {
    const navigate = useNavigate();
    const [ search, setSearch ] = useState("");
    const [ariaInvalid, setAriaInvalid] = useState(false);
    
    const handleSearch = (event) => {
        event.preventDefault();
        if (typeof search === 'string' && search.trim().length !== 0) {
            navigate(`/search?query=${search}`)
            setSearch("");
            setAriaInvalid(false);
        } else {
            setAriaInvalid(true);
        }
    };
    
    return (
        <form onSubmit={handleSearch} className="searchbar w-full max-w-md mx-auto">
        <fieldset role="search">
        <Input
        classNames={{
            mainWrapper: "h-full",
            base: "w-full sm:w-[20rem] h-10",
            input: "text-xs text-center leading-none",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder={ariaInvalid ? "Devi cercare qualcosa" : "Search a game"}
        size="md"
        type="search"
        name="search"
        value={search}
        aria-invalid={ariaInvalid}
        onChange={(event) => {
            setSearch(event.target.value);
            if (ariaInvalid) setAriaInvalid(false);
        }}
        />
        </fieldset>
        </form>
    );
}

export default Searchbar;