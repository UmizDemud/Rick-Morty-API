import { CharacterTable } from "@/components/CharacterTable/CharacterTable";

export default async function Home({
  searchParams,
}: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {

  const keyList = ["status", "gender", "page"];
  const sP = await searchParams

  const getCharacters = async () => {
    const filters = keyList.filter(k => {
      if (k in sP) return true;
      return false;
    })

    let url = "https://rickandmortyapi.com/api/character/"

    for (let i = 0; i < filters.length; i++) {
      if (i === 0) {
        url += "?";
      }
      url += `${filters[i]}=${sP[filters[i]]}`
      

      if (i !== filters.length - 1) {
        url += "&";
      }
    }

    const res = await fetch(url)
      .then(res => res.json());

    let nextP: URLSearchParams | null = null;
    let currentPage = 1;

    if (res?.info?.next) {
      nextP = new URLSearchParams(res.info.next.split('?')[1])
      currentPage = parseInt(nextP.get('page') || "2") - 1;
    }

    return {
      characters: res.results,
      pageCount: res.info.pages,
      currentPage
    };
  }

  const {characters, pageCount, currentPage} = await getCharacters();

  return (
    <div className="w-full py-8 px-4">

      <div className="flex flex-col items-middle gap-4">
        <CharacterTable characters={[...characters]} filters={sP} pageCount={pageCount} currentPage={currentPage} />
      </div>
    </div>
  );
}
