'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Pokemon } from '@/app/api/pokemon/route'
import Image from 'next/image';

import { getPokemon } from '@/lib/getPokemon';
import { typeColors, upperCaseFirst } from '@/lib/utils';

import leuleu from '../../public/liu-liu.gif'
import { PokemonInfo } from './pokemon-info';


interface PokemonGridProps {
    pokemonList: Pokemon[],
}


export function PokemonGrid({ pokemonList }: PokemonGridProps) {
    const [pokemon, setPokemon] = useState<Pokemon[]>(pokemonList.slice(0, 60));

    const [isOpen, setIsOpen] = useState(true);

    const [page, setPage] = useState(1);
    const [pokId, setPokId] = useState(0);

    const { ref, inView } = useInView();

    const loadMorePokemon = async () => {
        let nextPage = (page + 1);
        const totalPages = Math.ceil(pokemonList.length / 60);
        if (nextPage > totalPages) nextPage = 2;
        const { list: newPokemon } = (await getPokemon({ list: pokemonList, limit: 60, page: nextPage }));
        setPokemon((prev: Pokemon[]) => [...prev, ...newPokemon]);
        setPage(nextPage);
    };

    useEffect(() => {
        if (inView) {
            loadMorePokemon();
        }
    }, [inView]);
    useEffect(() => {
        setPokemon(pokemonList.slice(0, 60));
    }, [pokemonList]);
    const handleOnclick = (id: number) => {
        setPokId(id);
        setIsOpen(true);
    }

    return (
        <>
            <div className="grid w-full grid-cols-2 lg:grid-cols-3">
                {pokemon.map((pok: Pokemon, index: number) => (
                    <button key={index} className="group relative m-3 mt-16 flex min-w-[25%]
                    scale-100 flex-col items-center justify-center rounded-2xl border-2 border-solid border-white bg-white pb-4 pt-12
                    shadow-md outline-none duration-300 ease-in hover:scale-[0.97] hover:cursor-help hover:border-gray-400
                    focus:outline-none focus:ring-2 focus:ring-stone-500 dark:border-black/10 dark:bg-stone-400
                     dark:hover:border-white/80 dark:focus:ring-gray-200 md:min-w-[20%]"
                        onClick={() => handleOnclick(pok.id)}
                    >
                        <Image src={pok.image} width={96} height={96} alt={pok.name}
                            className="absolute -top-14 scale-100 duration-200 ease-in group-hover:scale-110 "
                        />
                        <span className="text-sm font-extrabold text-gray-400 dark:text-gray-200">N° {pok.id}</span>
                        <h3 className="p-2 text-lg font-bold">{upperCaseFirst(pok.name)}</h3>
                        <div className="flex flex-row items-center gap-2 rounded-md">
                            {pok.types.map((item: string, index: number) => (
                                <span key={index} className={`rounded px-2 py-1 font-semibold ${typeColors[item]}                       
                                text-black opacity-75 dark:text-white dark:opacity-100 `}>
                                    {upperCaseFirst(item)}
                                </span>
                            ))}
                        </div>
                    </button>
                ))}
                <PokemonInfo id={pokId} isOpen={isOpen} setIsOpen={setIsOpen} setPokId={setPokId} />
            </div>
            {pokemon.length > 0 && (pokemon.length != pokemonList.length ? <div
                className="flex items-center justify-center p-4"
                ref={ref}
            >
                <div className="pokemon flex items-center">
                </div>
            </div> : <h3 className='p-8'>There are no pokemon anymore!</h3>)}
            {pokemon.length == 0 &&
                <Image src={leuleu} width={250} height={250} alt={'no-pokemon-found'} />
            }
        </>
    )
}