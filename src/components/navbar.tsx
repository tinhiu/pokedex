'use client'
import { useState, type BaseSyntheticEvent, type Dispatch, type SetStateAction, useRef, useEffect } from 'react';

import { Pokemon } from '@/app/api/pokemon/route';
import useDebounce from '@/hooks/useDebounce';
import { useTheme } from 'next-themes'

type Props = {
    setPokemonList: Dispatch<SetStateAction<Pokemon[]>>;
    pokemonList: Pokemon[]
};
export default function Navbar({ setPokemonList, pokemonList }: Props) {
    const { setTheme, theme } = useTheme();
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const debouncedValue = useDebounce(searchValue, 800);
    useEffect(() => {
        const searchResult = async () => {
            let result: Pokemon[] = [];
            result = pokemonList.filter(
                (pokemon: any) => pokemon.name.toLowerCase().includes(debouncedValue.toLowerCase())
            );
            setPokemonList(result);
        };
        if (searchValue != '') {

            searchResult();
        } else {
            setPokemonList(pokemonList)
        }
        window.scrollTo({
            top: 0,
        });
    }, [debouncedValue]);
    const handleMode = (theme: string | undefined) => {
        document
            .querySelector('#theme-toggle')
            ?.setAttribute('aria-label', theme || '')
        return theme == 'dark' ? setTheme('light') : setTheme('dark')
    }
    const handleChange = (e: BaseSyntheticEvent) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(e.target.value);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-400/20 bg-white/10 px-5 backdrop-blur">
            <div className="mx-auto flex items-center justify-between">
                <input
                    ref={inputRef}
                    value={searchValue}
                    spellCheck="false"
                    type="text"
                    placeholder="search pokemon..."
                    className="border-transparent bg-transparent py-4 focus:border-transparent
                    focus:outline-none focus:ring-0 focus:ring-offset-0 dark:bg-transparent dark:placeholder:text-white"
                    onChange={handleChange}
                />
                <button
                    onClick={() => handleMode(theme)}
                    className="theme-toggle" id="theme-toggle" title="Toggles light & dark" aria-label="auto" aria-live="polite">
                    <svg className="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
                        <mask className="moon" id="moon-mask">
                            <rect x="0" y="0" width="100%" height="100%" fill="white" />
                            <circle cx="24" cy="10" r="6" fill="black" />
                        </mask>
                        <circle className="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
                        <g className="sun-beams" stroke="currentColor">
                            <line x1="12" y1="1" x2="12" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" />
                            <line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </g>
                    </svg>
                </button>
            </div>
        </nav>
    )
}