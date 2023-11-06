
'use client'
import { useState } from 'react'

import { Pokemon } from '@/app/api/pokemon/route'

import Navbar from './navbar'
import { PokemonGrid } from './pokemon-grid'


type Props = {
    pokemonList: Pokemon[]
}

export function MainComponent({ pokemonList }: Props) {
    const [list, setList] = useState(pokemonList)

    return (
        <>
            <Navbar setPokemonList={setList} pokemonList={pokemonList} />
            <div className='p-2'>A total of {list.length} Pokémon were discovered!</div>
            {pokemonList ? <PokemonGrid pokemonList={list || pokemonList} /> : <h1>Loading...</h1>}
        </>
    )
}
