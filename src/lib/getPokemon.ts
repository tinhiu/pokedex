import { Pokemon } from '@/app/api/pokemon/route';

export async function getPokemon({
	list,
	limit,
	page,
}: {
	list: Pokemon[];
	limit: number;
	page: number;
}) {
	const totalPages = Math.ceil(list.length / limit);
	if (page > totalPages)
		return { list: [], total: 0, totalPages };
	const pagiantePokemon = list.slice((page - 1) * limit, page * limit);
	return {
		list: pagiantePokemon,
		total: pagiantePokemon.length,
		totalPages,
	};
}
