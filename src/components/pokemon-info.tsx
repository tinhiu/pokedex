
import type { Dispatch, SetStateAction } from 'react';
import { useQuery } from 'react-query';

import { getPokemonInfo } from '@/app/api/pokemon/route'
import useWindowSize from '@/hooks/useWindowSize';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { typeColors, upperCaseFirst } from '@/lib/utils';

import noPokemon from '../../public/no-pokemon-selected-image.png'
import loading from '../../public/pokeball-loading.gif'
type Props = {
  id: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setPokId: Dispatch<SetStateAction<number>>;
};

export function PokemonInfo({ id, isOpen, ...props }: Props) {
  const size = useWindowSize();
  const { data: pokemon, isFetching, isLoading } = useQuery({
    queryKey: ['getPokemonInfo', id],
    queryFn: () => getPokemonInfo(id),
    keepPreviousData: true,
    staleTime: 60 * 1000
  })

  if (id == 0 && !pokemon) return (
    <div
      className='fixed bottom-0 right-[calc(10vw-20px)] mx-4 mt-4 hidden h-[82vh] w-96 flex-col justify-center
      rounded-t-2xl border-t bg-white px-4 text-center text-lg drop-shadow-md dark:bg-stone-400 xl:flex'>
      <Image src={noPokemon} alt='no-pokemon' width={100} height={100}
        className='absolute inset-x-0 bottom-[77vh] mx-auto drop-shadow-none'
      />
      Select a Pokemon <br /> to display here
    </div>
  );

  if (isLoading || isFetching) return (
    <div className='fixed bottom-0 right-0 m-auto flex h-full w-full flex-col
    items-center justify-center backdrop-blur xl:right-[calc(10vw+50px)] xl:w-auto'>
      <Image src={loading} alt='loading' width={120} height={120} />
    </div>
  )

  if (isOpen && size !== 'xlg') {
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  } else {
    document.getElementsByTagName('html')[0].style.removeProperty('overflow');
  }
  const close = () => {
    document.getElementsByTagName('html')[0].style.removeProperty('overflow');
    props.setIsOpen(false);
  };
  return (
    isOpen && (
      <div className="z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: .35 }}
          className={`fixed inset-x-0 top-0 h-full w-full  ${typeColors[pokemon.types[0].type.name]} xl:hidden`}>
          <span onClick={close} className='absolute right-5 mt-2 cursor-pointer p-2 text-3xl'>&#x2716;</span>

        </motion.div>
        <motion.div
          key={id}
          initial={{ opacity: 0, x: 100, scale: 'var(--scale-from, 1)' }}
          animate={{ opacity: 1, x: 0, scale: 'var(--scale-to, 1)' }}
          exit={{ opacity: 0, x: -50, scale: 0 }}
          transition={{ type: 'spring', bounce: 0.3, duration: .8 }}
          className={`fixed bottom-0 right-0 z-10 mx-0 mt-2 flex h-[82vh] w-full flex-col rounded-t-xl border-t
          bg-white px-4 text-center drop-shadow-md dark:border-0 dark:bg-stone-400
          xl:right-[calc(10vw-20px)] xl:mx-2 xl:w-96 xl:[--scale-from:0%] xl:[--scale-to:100%]`}>
          <div className="no-scrollbar mx-auto mt-10 flex h-[86vh] w-fit flex-col justify-start space-y-3
           overflow-y-scroll duration-300 ease-in xl:w-full">
            {/* Pokemon img */}
            <Image src={pokemon.image} alt={pokemon.name} width={150} height={150}
              className="absolute inset-x-0 bottom-[77vh] mx-auto max-h-[22vh]"
            />
            {/* Pokemon id */}
            <span className="text-sm font-extrabold text-gray-400 dark:text-gray-200">N° {pokemon.id}</span>
            {/* Pokemon name */}
            <h2 className="mt-0 text-2xl font-bold">{upperCaseFirst(pokemon.name)}</h2>
            {/* Pokemon types */}
            <div className="flex flex-row items-center justify-center gap-2 rounded-md">
              {pokemon.types.map((item: any, index: number) => (
                <span key={index}
                  className={`rounded px-2 py-1 font-semibold text-black dark:text-white 
                  ${typeColors[item.type.name]} opacity-75 dark:opacity-100`}>
                  {upperCaseFirst(item.type.name)}
                </span>
              ))}
            </div>
            {/* Pokemon desc */}
            <h4 className='text-xl font-semibold'>Pokemon Desc</h4>
            <span className='text-gray-400 dark:text-white'>{pokemon.desc}</span>
            {/* Pokemon H&W */}
            <div className='flex flex-row items-center justify-center gap-2'>
              <div className='flex w-full flex-col items-center justify-center'>
                <h4 className="text-lg font-semibold">Height</h4>
                <span className='mt-2 w-full rounded-3xl bg-slate-300 py-2 dark:bg-black/30'>{pokemon.height}</span>
              </div>
              <div className='flex w-full flex-col items-center justify-center'>
                <h4 className="text-lg font-semibold">Weight</h4>
                <span className='mt-2  w-full rounded-3xl bg-slate-300 py-2 dark:bg-black/30'>{pokemon.weight}</span>
              </div>
            </div>
            {/* Abilities */}
            <h4 className='text-base font-semibold'>Abilities</h4>
            <div className='flex flex-row items-center justify-center gap-2'>
              {
                pokemon.abilities.map((abi: any, index: number) => {
                  if (index == 3) return;
                  return (
                    <div key={index} className='flex w-full flex-col items-center justify-center'>
                      <span className='w-full rounded-3xl bg-slate-300 py-2 dark:bg-black/30'>
                        {upperCaseFirst(abi.ability.name)}
                      </span>
                    </div>
                  )
                })
              }
            </div>
            {/* Pokemon stats */}
            <h4 className='text-base font-semibold'>Stats</h4>
            <div className="flex flex-row items-center justify-around xl:justify-center">
              {/* HP */}
              <div className="flex flex-col p-1">
                <span className="flex h-8 w-8 items-center justify-center rounded-full
                  bg-red-600 p-[1.15rem] text-white">HP</span>
                <h5 className="my-2 font-semibold">{pokemon.stats[0].base_stat}</h5>
              </div>
              {/* Attack */}
              <div className="flex flex-col p-1">
                <span className="flex h-8 w-8 items-center justify-center rounded-full
                  bg-orange-600 p-[1.15rem] text-white">ATK</span>
                <h5 className="my-2 font-semibold">{pokemon.stats[1].base_stat}</h5>
              </div>
              {/* Defense */}
              <div className="flex flex-col p-1">
                <span className="flex h-8 w-8 items-center justify-center rounded-full
                  bg-yellow-600 p-[1.15rem] text-white">DEF</span>
                <h5 className="my-2 font-semibold">{pokemon.stats[2].base_stat}</h5>
              </div>
              {/* Special Attack */}
              <div className="flex flex-col p-1">
                <span className="flex h-8 w-8 items-center justify-center rounded-full
                  bg-cyan-600 p-[1.15rem] text-white">SpA</span>
                <h5 className="my-2 font-semibold">{pokemon.stats[3].base_stat}</h5>
              </div>
              {/* Special Defense */}
              <div className="flex flex-col p-1">
                <span className="flex h-8 w-8 items-center justify-center rounded-full
                  bg-green-600 p-[1.15rem] text-white">SpD</span>
                <h5 className="my-2 font-semibold">{pokemon.stats[4].base_stat}</h5>
              </div>
              {/* Speed */}
              <div className="flex flex-col p-1">
                <span className="flex h-8 w-8 items-center justify-center rounded-full
                  bg-pink-600 p-[1.15rem] text-white">SPD</span>
                <h5 className="my-2 font-semibold">{pokemon.stats[5].base_stat}</h5>
              </div>
              {/* Total */}
              <div className="flex flex-col rounded-3xl bg-blue-400 p-1">
                <span className="flex h-9 w-9 items-center justify-center rounded-full
                 bg-purple-600 p-[1.15rem] text-white">TOT</span>
                <h5 className="my-2 font-semibold">{pokemon.statsTotal}</h5>
              </div>
            </div>
            {/* Pokemon Evolution */}
            <h4 className='text-base font-semibold'>Evolution</h4>
            <div className="!mb-4 flex flex-row items-center justify-around xl:justify-center">
              {pokemon.evolution_chain.map((item: any) => (
                <>
                  {item.min_level && <span className='m-1 w-12 whitespace-nowrap p-2'>{item.min_level}</span>}
                  <Image src={item.image} alt={item.name} width={75} height={75}
                    className='cursor-pointer'
                    onClick={() => props.setPokId(item.id)}
                  />
                </>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    )
  )
}
