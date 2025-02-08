"use client"

import { Character } from "@/types/character";
import { useRouter } from "next/navigation";
import { useRef } from "react";

type Props = {
  res: Character
}

export const Card: React.FC<Props> = ({res}) => {
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target)
    if (!buttonRef?.current) return;
    const div = buttonRef.current;

    const divWidth = div.offsetWidth;
    const clickX = event.nativeEvent.offsetX;
    const idNumber = res.id;

    if (clickX < divWidth / 2) {
      if (idNumber - 1 <= 0) return;
      router.push(`/character/${idNumber - 1}`)
    } else {
      if (idNumber + 1 > 826) return;
      router.push(`/character/${idNumber + 1}`)
    }
  }

  const episodes = res.episode.map((ep: string) => {
    const epSpl = ep.split('/');
    const epNo = epSpl[epSpl.length - 1];

    return epNo
  }).join(', ')

  return (
    <button onClick={handleClick} ref={buttonRef}>
      <div className="dark:text-slate-800 mt-12 w-80 rounded bg-slate-200 shadow-lg px-2 py-4">
        <div className="flex gap-1"><span className="text-lg">{res.name}</span></div>
        <img className="rounded m-auto" src={res.image} alt="origin place" />

        <div className="pt-4 flex justify-between border-b border-slate-800/40"><span>Status:</span><div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-48">{res.status}</div></div>
        <div className="flex justify-between border-b border-slate-800/40"><span>Species:</span><div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-48">{res.species}</div></div>
        <div className="flex justify-between border-b border-slate-800/40"><span>Type:</span><div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-48">{res.type || '-'}</div></div>
        <div className="flex justify-between border-b border-slate-800/40"><span>Gender:</span><div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-48">{res.gender}</div></div>
        <div className="flex justify-between border-b border-slate-800/40"><span>Origin:</span><div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-48">{res.origin.name}</div></div>
        <div className="flex justify-between border-b border-slate-800/40"><span>Location:</span><div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-48">{res.location.name}</div></div>
        <div className="flex justify-between gap-1 overflow-hidden min-w-0"><span>Episodes: </span>
          <div className="max-w-48 text-ellipsis flex gap-1 min-w-0">
          <span className="whitespace-nowrap text-ellipsis overflow-hidden">{episodes}</span>

          </div>
        </div>
      </div>
    </button>
  )
}

