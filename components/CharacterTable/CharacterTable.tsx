"use client"

import {
  FC,
  useState,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { Character } from '@/types/character';
import { CharacterRow } from './CharacterRow';
import { CharacterHeader } from './CharacterHeader';
import { useRouter } from 'next/navigation';
import { sortBy } from '@/utils/sortBy';

import "./styles.css"

type Props = {
  characters: Character[];
  pageCount: number
  currentPage: number
  filters: {
    status?: "Alive" | "Dead" | "unknown",
    gender?: "Male" | "Female" | "unknown"
  }
};

export const CharacterTable: FC<Props> = ({ characters, pageCount, currentPage, filters }) => {
  const [page, setPage] = useState(currentPage);
  const router = useRouter();

  const sortCharacters = () => {

    if (currentSortBy) {
      let res = sortBy([...characters], currentSortBy);
  
      if (isCurrentlyReversed)
        res = res.reverse();

      return res;
    }

    return characters;
  };

  const [currentSortBy, setCurrentSortBy] = useState("");
  const [isCurrentlyReversed, setIsCurrentlyReversed] = useState(false);
  const [visibleCharacters, setVisibleCharacters] = useState(characters);

  useEffect(() => {
    //const preparedCharacters = filterCharacters(characters);

    if (characters.length) {
      setVisibleCharacters(sortCharacters());
    } else {
      setVisibleCharacters([]);
    }
  }, [currentSortBy, isCurrentlyReversed]);

  const handleClick = (key: "status" | "gender", value?: string) => {
    const newRoute = {...filters};
    if ("page" in newRoute) delete newRoute.page
    if (!!value) {
      newRoute[key] = value as keyof typeof filters["status" | "gender"];
    } else {
      if (key in newRoute) delete newRoute[key]
    }

    let url = "?";
    Object.entries(newRoute).map((item, i) => {
      if (i !== 0) { url += "&"} 
      url += `${item[0]}=${item[1]}`
    })

    router.push(url);
    window.location.href = url
  }

  const paginate = (to: number) => {
    const newRoute = {...filters};
    if ("page" in newRoute) {
      delete newRoute.page
    }

    let url = "?page=" + to

    Object.entries(newRoute).map((item) => {
      url += `&${item[0]}=${item[1]}`
    })
    setPage(to);
    router.push(url)
    window.location.href = url;
  }

   const handleSortClick = (nextSortBy: string) => {
    // First click
    if (!currentSortBy || nextSortBy !== currentSortBy) {
      setCurrentSortBy(nextSortBy)
      setIsCurrentlyReversed(false)

      return
    }

    // Second click
    if (currentSortBy === nextSortBy && !isCurrentlyReversed) {
      setIsCurrentlyReversed(true)

      return
    }

    // Third click
    setCurrentSortBy("")
    setIsCurrentlyReversed(false)
  };

  return (
    <>
      <div className='flex m-auto'>
        <div className='flex flex-col pr-2 border-r-2'>
          <div className='text-right text-lg'>Status</div>
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
          <div className='text-left text-lg'>Gender</div>
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
        className="border-separate border-spacing-x-1"
      >
        <thead>
          <tr>
            <CharacterHeader isCurrentlyReversed={isCurrentlyReversed} objKey={"name"} title={"Name"} currentSortBy={currentSortBy} handleSortClick={handleSortClick} />
            <CharacterHeader isCurrentlyReversed={isCurrentlyReversed} objKey={"species"} title={"Species"} currentSortBy={currentSortBy} handleSortClick={handleSortClick} />
            <CharacterHeader isCurrentlyReversed={isCurrentlyReversed} objKey={"type"} title={"Type"} currentSortBy={currentSortBy} handleSortClick={handleSortClick} />
            <CharacterHeader isCurrentlyReversed={isCurrentlyReversed} objKey={"gender"} title={"Gender"} currentSortBy={currentSortBy} handleSortClick={handleSortClick} />
            <CharacterHeader isCurrentlyReversed={isCurrentlyReversed} objKey={"status"} title={"Status"} currentSortBy={currentSortBy} handleSortClick={handleSortClick} />
            <CharacterHeader isCurrentlyReversed={isCurrentlyReversed} objKey={""} title={"Origin"} currentSortBy={currentSortBy} handleSortClick={handleSortClick} />
            <CharacterHeader isCurrentlyReversed={isCurrentlyReversed} objKey={""} title={"Location"} currentSortBy={currentSortBy} handleSortClick={handleSortClick} />
          </tr>
        </thead>

        <tbody>
          {visibleCharacters.map((character) => (
            <CharacterRow key={character.id} character={character} />
          ))}
        </tbody>
      </table>
      <div className='box-border p-2 mx-auto'>
        <div className='p-2 small_scroll_bar max-w-96 rounded overflow-x-scroll box-border flex gap-2'>
        {Array(pageCount).fill(0).map((_, i) => (
          <button
            key={i}
            className={classNames(
              'border rounded text-center w-8 py-1 shrink-0',
              i + 1 === page && "bg-blue-500"
            )}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        </div>
      </div>
    </>
  );
};
