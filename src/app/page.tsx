
import { MainComponent } from '@/components/main-component';
import ScrollToTop from '@/components/scroll-top';

import { getPokemonList } from './api/pokemon/route';

export default async function Home() {
  const pokemonList = await getPokemonList(960); //960
  return (
    <div className="dark:bg-[#93928dcc]">
      <main className="flex flex-row px-[5vw] md:px-[9vw]">
        <div className="flex min-h-screen w-full flex-col items-center justify-start xl:mr-[26rem]">
          <MainComponent pokemonList={pokemonList} />
        </div>
      </main>
      <ScrollToTop />
    </div>

  )
}

