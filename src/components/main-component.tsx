
'use client'
import { BaseSyntheticEvent, useState } from 'react'

import { Pokemon } from '@/app/api/pokemon/route'
import { RiArrowDropDownLine } from 'react-icons/ri'

import Navbar from './navbar'
import { PokemonGrid } from './pokemon-grid'


type Props = {
    pokemonList: Pokemon[]
}

export function MainComponent({ pokemonList }: Props) {

    const [list, setList] = useState(pokemonList)
    const [sort, setSort] = useState(0)

    const handleChange = (e: BaseSyntheticEvent) => {
        setSort(e.target.value)
        if (e.target.value == 1) {
            setList(list.sort((a, b) => b.id - a.id))
        } else if (e.target.value == 2) {
            setList(list.sort((a, b) => a.name.localeCompare(b.name)))
        } else if (e.target.value == 3) {
            setList(list.sort((a, b) => b.name.localeCompare(a.name)))
        } else {
            setList(list.sort((a, b) => a.id - b.id))
        }
    }
    return (
        <>
            <Navbar setPokemonList={setList} pokemonList={pokemonList} sort={sort} />
            <div className='flex w-full flex-col items-center justify-between gap-3 p-2 md:flex-row'>
                <p>A total of {list.length} Pokémon were discovered!</p>
                <div className="relative inline-flex items-center self-center">
                    <RiArrowDropDownLine size={25} className="pointer-events-none absolute right-1 dark:text-black" />

                    <select className="m-0 block w-full appearance-none rounded  border border-solid border-gray-300
                    bg-white   
                    bg-clip-padding bg-no-repeat py-1.5 pl-6 pr-8 text-base font-normal text-gray-700
                    transition ease-in-out focus:bg-white focus:text-gray-700 focus:outline-none focus:ring
                    focus:ring-violet-300 dark:bg-gray-200"
                        onChange={handleChange}
                        aria-label="Default select example">
                        <option defaultChecked value="0">Sort by id (asc)</option>
                        <option value="1">Sort by id (desc)</option>
                        <option value="2">Name (A - Z)</option>
                        <option value="3">Name (Z - A)</option>
                    </select>
                </div>
            </div >

            {pokemonList ? <PokemonGrid pokemonList={list} sort={sort} /> : <h1>Loading...</h1 >}
        </>
    )
}
