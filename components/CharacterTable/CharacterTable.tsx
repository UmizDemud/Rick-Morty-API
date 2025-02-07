"use client"

import {
  FC,
  useState,
  useRef,
} from 'react';
import classNames from 'classnames';
import { Character } from '@/types/character';
import { CharacterRow } from './CharacterRow';
import { CharacterHeader } from './CharacterHeader';
import { useRouter } from 'next/navigation';

type Props = {
  characters: Character[];
  pageCount: number
  currentPage: number
  filters: {
    status?: "Alive" | "Dead" | "unknown",
    gender?: "Male" | "Female" | "unknown"
  }
};

export const CharacterTable: FC<Props> = ({ characters, filters }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleClick = (key: "status" | "gender", value?: string) => {
    const newRoute = {...filters};
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
            <CharacterHeader title={"Name"} />
            <CharacterHeader title={"Species"} />
            <CharacterHeader title={"Type"} />
            <CharacterHeader title={"Gender"} />
            <CharacterHeader title={"Status"} />
            <CharacterHeader title={"Origin"} />
            <CharacterHeader title={"Location"} />
          </tr>
        </thead>

        <tbody>
          {characters.map((character, i) => (
            <CharacterRow
              key={i * 20 + character.id}
              character={character}
              searchString={inputRef?.current?.value || ""}
              slug={(i * 20 + character.id).toString()}
            />
            ))}
        </tbody>
      </table>
    </>
  );
};
