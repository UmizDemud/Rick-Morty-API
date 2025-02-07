"use client"

import {
  FC,
  memo,
  useState,
  ReactNode,
  useEffect,
  useRef,
  ChangeEvent,
} from 'react';
import classNames from 'classnames';
import { Character } from '@/types/character';
import { sortBy } from '@/utils/sortBy';
import { CharacterRow } from './CharacterRow';
import { CharacterHeader } from './CharacterHeader';
import { debounce } from '@/utils/debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  characters: Character[];
  pageCount: number
  currentPage: number
  filters: {
    status?: "Alive" | "Dead" | "unknown",
    gender?: "Male" | "Female" | "unknown"
  }
};

export const CharacterTable: FC<Props> = memo(({ characters, pageCount, currentPage, filters }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [page, setPage] = useState(currentPage);
  const [currentSortBy, setCurrentSortBy] = useState("");
  const [isCurrentlyReversed, setIsCurrentlyReversed] = useState(false);
  const router = useRouter();

  const sortCharacters = () => {
    let res = characters.sort(
      (a, b) => (a[currentSortBy] as string)?.localeCompare(b[currentSortBy])
    );

    if (isCurrentlyReversed)
      res = res.reverse();

    return res;
  };

  const handleSortClick = (nextSortBy: string) => {
    // First click
    if (!currentSortBy || nextSortBy !== currentSortBy) {
      setCurrentSortBy(nextSortBy)
      setIsCurrentlyReversed(false)
    }

    // Second click
    if (currentSortBy === nextSortBy && !isCurrentlyReversed) {
      setCurrentSortBy(nextSortBy)
      setIsCurrentlyReversed(true)
    }

    // Third click
    setCurrentSortBy("")
    setIsCurrentlyReversed(false)
  };

  const [visibleCharacters, setVisibleCharacters] = useState(() => {
    if (characters.length) {
      return sortCharacters();
    }

    return [];
  });

  useEffect(() => {
    //const preparedCharacters = filterCharacters(characters);

    if (characters.length) {
      setVisibleCharacters(sortCharacters());
    } else {
      setVisibleCharacters([]);
    }
  }, [currentSortBy, isCurrentlyReversed]);


  const handleClick = (key: string, value?: string) => {
    let newRoute: any = {...filters};
    if ("page" in newRoute) delete newRoute.page
    if (!!value) {
      newRoute[key] = value;
    } else {
      if (key in newRoute) delete newRoute[key]
    }

    let url = "?";
    Object.entries(newRoute).map((item, i) => {
      if (i !== 0) { url += "&"} 
      url += `${item[0]}=${item[1]}`
    })
    setPage(1);
    router.push(url)
  }

  const paginate = (to: number) => {
    let newRoute: any = {...filters};
    if ("page" in newRoute) {
      delete newRoute.page
    }

    let url = "?page=" + to

    Object.entries(newRoute).map((item, i) => {
      url += `&${item[0]}=${item[1]}`
    })
    setPage(to);
    router.push(url)
  }

  return (
    <>
      <div className='flex m-auto'>
        <div className='flex flex-col pr-2 border-r-2'>
          <div className='text-right'>Status</div>
          <div className='flex gap-2'>
            <button onClick={() => handleClick("status", "Alive")} className={
              classNames(
                'border px-2 py-1 hover:bg-slate-500',
                filters?.status === "Alive" && "bg-blue-500"
              )
            }>Alive</button>
            <button onClick={() => handleClick("status", "Dead")} className={
              classNames(
                'border px-2 py-1 hover:bg-slate-500',
                filters?.status === "Dead" && "bg-blue-500"
              )
            }>Dead</button>
            <button onClick={() => handleClick("status", "unknown")} className={
              classNames(
                'border px-2 py-1 hover:bg-slate-500',
                filters?.status === "unknown" && "bg-blue-500"
              )
            }>Unknown</button>
            <button onClick={() => handleClick("status")} className={
              classNames(
                'border px-2 py-1 hover:bg-slate-500',
                filters?.status !== "Alive" && filters?.status !== "Dead" && filters?.status !== "unknown" && "bg-blue-500"
              )
            }>All</button>
          </div>
        </div>
        <div className='flex flex-col pl-2'>
          <div className='text-left'>Gender</div>
          <div className='flex gap-2'>
            <button onClick={() => handleClick("gender", "Male")} className={
              classNames(
                'border px-2 py-1 hover:bg-slate-500',
                filters?.gender === "Male" && "bg-blue-500"
              )
            }>Male</button>
            <button onClick={() => handleClick("gender", "Female")} className={
              classNames(
                'border px-2 py-1 hover:bg-slate-500',
                filters?.gender === "Female" && "bg-blue-500"
              )
            }>Female</button>
            <button onClick={() => handleClick("gender", "unknown")} className={
              classNames(
                'border px-2 py-1 hover:bg-slate-500',
                filters?.gender === "unknown" && "bg-blue-500"
              )
            }>Unknown</button>
            <button onClick={() => handleClick("gender")} className={
              classNames(
                'border px-2 py-1 hover:bg-slate-500',
                filters?.gender !== "Male" && filters?.gender !== "Female" && filters?.gender !== "unknown" && "bg-blue-500"
              )
            }>All</button>
          </div>
        </div>
      </div>
      <table
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <CharacterHeader title={"Name"} currentSortBy={currentSortBy} handleSortClick={handleSortClick} />
            <CharacterHeader title={"Species"} currentSortBy={currentSortBy} handleSortClick={handleSortClick} />
            <CharacterHeader title={"Type"} currentSortBy={currentSortBy} handleSortClick={handleSortClick} />
            <CharacterHeader title={"Gender"} currentSortBy={currentSortBy} handleSortClick={handleSortClick} />
            <CharacterHeader title={"Status"} currentSortBy={currentSortBy} handleSortClick={handleSortClick} />
            <CharacterHeader title={"Origin"} currentSortBy={currentSortBy} handleSortClick={handleSortClick} />
            <CharacterHeader title={"Location"} currentSortBy={currentSortBy} handleSortClick={handleSortClick} />
          </tr>
        </thead>

        <tbody>
          {visibleCharacters.map((character, i) => (
            <CharacterRow
              key={i * 20 + character.id}
              character={character}
              searchString={inputRef?.current?.value || ""}
              slug={(i * 20 + character.id).toString()}
            />
            ))}
        </tbody>
      </table>
      <div className='flex gap-1 mx-auto'>
      {Array(pageCount).fill(0).map((_, i) => (
        <button
          key={i}
          className={classNames(
            'border text-center w-8 py-1',
            i + 1 === page && "bg-blue-500"
          )}
          onClick={() => paginate(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      </div>
    </>
  );
});
