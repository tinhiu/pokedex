import { NextResponse } from 'next/server';

import api from '../axiosInstance';

export type Pokemon = {
	id: number;
	name: string;
	image: string;
	types: Array<string>;
};

export interface PokemonInfo extends Pokemon {
	desc: string;
}
export async function GET(req: Request) {
	return NextResponse.json('This is pokemon route');
}
function waiting(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function getPokemonList(limit: number) {
	let ListPokemon: Pokemon[] = [];

	const response = await api.get(`/pokemon?limit=${limit}`);
	const result = response.data.results;
	for (let i = 0; i < result.length; i++) {
		ListPokemon.push({
			id: i + 1,
			name: result[i].name,
			image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
				i + 1
			}.png`,
			types: [],
		});
	}
	await getAllTypes(ListPokemon);
	return ListPokemon;
}
export async function getAllTypes(ListPokemon: Pokemon[]) {
	for (let i = 0; i < 18; i++) {
		const response = await api.get(`/type/${i + 1}`);
		const result = await response.data;

		const list = result.pokemon;
		for (let j = 0; j < list.length; j++) {
			const pokemonId = list[j].pokemon.url
				.replace('https://pokeapi.co/api/v2/pokemon/', '')
				.replace('/', '');
			if (pokemonId <= ListPokemon.length && ListPokemon[pokemonId - 1]) {
				ListPokemon[pokemonId - 1].types.push(result.name);
			}
		}
	}
}
export async function getPokemonInfo(id: number) {
	if (id === 0) return null;
	await waiting(2000);
	const pokemon = await api.get(`/pokemon/${id}`);
	const responseSpecies = api.get(`/pokemon-species/${id}`);
	const species = (await responseSpecies).data;

	const responseEvolutions = await fetch(species.evolution_chain.url);
	const evolution_chain = await responseEvolutions.json();

	return await setUpPokemonAbout(pokemon.data, id, species, evolution_chain);
}
async function setUpPokemonAbout(pokemon: any, id: number, species: any, evolution_chain: any) {
	for (let i = 0; i < species.flavor_text_entries.length; i++) {
		if (species.flavor_text_entries[i].language.name == 'en') {
			pokemon.desc = species.flavor_text_entries[i].flavor_text.replace('', ' ');
			break;
		}
	}
	if (id >= 650) {
		pokemon.image =
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/' +
			id +
			'.png';
	} else {
		pokemon.image =
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' +
			id +
			'.gif';
	}
	pokemon.height = pokemon.height / 10 + 'm';
	pokemon.weight = pokemon.weight / 10 + 'kg';
	pokemon.statsTotal = pokemon.stats.reduce(
		(partialSum: number, x: any) => partialSum + x.base_stat,
		0
	);
	pokemon.evolution_chain = await setupEvolutionChain(evolution_chain);
	return pokemon;
}

/* Only 3 first level */
async function setupEvolutionChain(evolutionChain: any) {
	const chain = evolutionChain.chain;
	let trackingApiData = [chain];
	let evoId = filterIdFromSpeciesURL(chain.species.url);
	let evoChainFormattedData = [
		{
			id: evoId,
			image:
				'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
				evoId +
				'.png',
			name: chain.species.name as string,
			min_level: '',
		},
	];
	let maxEvo = 2;
	for (let i = 0; i < maxEvo; i++) {
		if (trackingApiData[i].evolves_to.length > 1) {
			let multiEvoPath: { id: string; image: string; name: string; min_level: string }[] = [];
			trackingApiData[i].evolves_to.forEach((pokemon: any) => {
				trackingApiData.push(pokemon);
				evoId = filterIdFromSpeciesURL(pokemon.species.url);
				multiEvoPath.push({
					id: evoId,
					image:
						'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
						evoId +
						'.png',
					name: pokemon.species.name as string,
					min_level: pokemon.evolution_details[0].min_level
						? 'Lv. ' + pokemon.evolution_details[0].min_level
						: '?',
				});
			});
			evoChainFormattedData.push(...multiEvoPath);
		} else {
			if (trackingApiData[i].evolves_to.length) {
				let nextEvoData = trackingApiData[i].evolves_to[0];
				trackingApiData.push(nextEvoData);
				evoId = filterIdFromSpeciesURL(nextEvoData.species.url);
				evoChainFormattedData.push({
					id: evoId,
					image:
						'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
						evoId +
						'.png',
					name: nextEvoData.species.name,
					min_level: nextEvoData.evolution_details[0].min_level
						? 'Lv. ' + nextEvoData.evolution_details[0].min_level
						: '?',
					// multiPaths: false
				});
			} else {
				// end early if this pokemon doesn't have any other evolutions
				i = maxEvo;
			}
		}
	}
	return evoChainFormattedData.slice(0, 3);
}

// filter id from species url
function filterIdFromSpeciesURL(url: string) {
	return url.replace('https://pokeapi.co/api/v2/pokemon-species/', '').replace('/', '');
}
