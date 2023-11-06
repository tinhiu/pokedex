
export function upperCaseFirst(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export const typeColors: { [char: string]: string } = {
  'normal': 'bg-[#BCBCAC]',
  'fighting': 'bg-[#BC5442]',
  'flying': 'bg-[#669AFF]',
  'poison': 'bg-[#AB549A]',
  'ground': 'bg-[#DEBC54]',
  'rock': 'bg-[#BCAC66]',
  'bug': 'bg-[#ABBC1C]',
  'ghost': 'bg-[#6666BC]',
  'steel': 'bg-[#ABACBC]',
  'fire': 'bg-[#FF421C]',
  'water': 'bg-[#2F9AFF]',
  'grass': 'bg-[#78CD54]',
  'electric': 'bg-[#FFCD30]',
  'psychic': 'bg-[#FF549A]',
  'ice': 'bg-[#78DEFF]',
  'dragon': 'bg-[#7866EF]',
  'dark': 'bg-[#785442]',
  'fairy': 'bg-[#FFACFF]',
  'shadow': 'bg-[#0E2E4C]'
};