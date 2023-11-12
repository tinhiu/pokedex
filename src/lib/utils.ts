import { Pokemon } from '@/app/api/pokemon/route';

export function upperCaseFirst(input: string) {
	return input.charAt(0).toUpperCase() + input.slice(1);
}

export const typeColors: { [char: string]: string } = {
	normal: 'bg-[#BCBCAC]',
	fighting: 'bg-[#BC5442]',
	flying: 'bg-[#669AFF]',
	poison: 'bg-[#AB549A]',
	ground: 'bg-[#DEBC54]',
	rock: 'bg-[#BCAC66]',
	bug: 'bg-[#ABBC1C]',
	ghost: 'bg-[#6666BC]',
	steel: 'bg-[#ABACBC]',
	fire: 'bg-[#FF421C]',
	water: 'bg-[#2F9AFF]',
	grass: 'bg-[#78CD54]',
	electric: 'bg-[#FFCD30]',
	psychic: 'bg-[#FF549A]',
	ice: 'bg-[#78DEFF]',
	dragon: 'bg-[#7866EF]',
	dark: 'bg-[#785442]',
	fairy: 'bg-[#FFACFF]',
	shadow: 'bg-[#0E2E4C]',
};

export async function getListByName(pokemonList: Pokemon[], value: string, sort: number) {
	if (sort == 1) {
		return pokemonList
			.filter((pokemon: any) => pokemon.name.toLowerCase().includes(value.toLowerCase()))
			.sort((a, b) => b.id - a.id);
	} else if (sort == 2) {
		return pokemonList
			.filter((pokemon: any) => pokemon.name.toLowerCase().includes(value.toLowerCase()))
			.sort((a, b) => a.name.localeCompare(b.name));
	} else if (sort == 3) {
		return pokemonList
			.filter((pokemon: any) => pokemon.name.toLowerCase().includes(value.toLowerCase()))
			.sort((a, b) => b.name.localeCompare(a.name));
	} else {
		return pokemonList
			.filter((pokemon: any) => pokemon.name.toLowerCase().includes(value.toLowerCase()))
			.sort((a, b) => a.id - b.id);
	}
}
