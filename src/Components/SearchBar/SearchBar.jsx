import React, { useState, useEffect } from "react";
import ErrorComponent from "../Error/ErrorComponent";
import { useTranslation } from "react-i18next";


const SearchBar = ({
    searchQuery,
    setSearchQuery,
    setScrollReset,
    noResults,
}) => {
    const [inputValue, setInputValue] = useState(searchQuery);
    const { t } = useTranslation();
    

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(inputValue);
            if (setScrollReset) {
                setScrollReset(0);
            }
        }, 300);
        return () => {
            clearTimeout(timer)
        };
    }, [inputValue]);

    return (
        <div className="p-4 w-full flex flex-col items-center justify-center">
            <input
                className="w-full max-w-lg px-6 py-3 text-lg text-purple-900 bg-white border-4 border-purple-300 rounded-full shadow-lg outline-none transition-all duration-300 placeholder-purple-400 hover:shadow-xl"
                placeholder={t("SearchBar.placeholder")}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />

            {noResults && <ErrorComponent />}
        </div>
    );
};

export default SearchBar;