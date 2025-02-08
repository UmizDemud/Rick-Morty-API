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

  return (
    <button onClick={handleClick} ref={buttonRef}>
      <div className="mt-12 rounded bg-slate-200 shadow-lg px-2 py-4">
        <div className="flex gap-1"><span className="text-lg">{res.name}</span></div>
        <img src={res.image} alt="origin place" />

        <div className="pt-4 flex justify-between border-b border-slate-800/40"><span>Status:</span><span>{res.status}</span></div>
        <div className="flex justify-between border-b border-slate-800/40"><span>Species:</span><span>{res.species}</span></div>
        <div className="flex justify-between border-b border-slate-800/40"><span>Type:</span><span>{res.type || '-'}</span></div>
        <div className="flex justify-between border-b border-slate-800/40"><span>Gender:</span><span>{res.gender}</span></div>
        <div className="flex justify-between border-b border-slate-800/40"><span>Origin:</span><span>{res.origin.name}</span></div>
        <div className="flex justify-between border-b border-slate-800/40"><span>Location:</span><span>{res.location.name}</span></div>
        <div className="flex justify-between"><span>Episodes: </span>
          <div className="flex gap-1">
            {res.episode.map((ep: string, i: number) => {
              const epSpl = ep.split('/');
              const epNo = epSpl[epSpl.length - 1];

              if (i !== res.episode.length - 1) {
                return (
                  <span key={epNo}>{epNo}, </span>
                )
              }

              return (
                <span key={epNo}>{epNo}</span>
              )
            })}
          </div>
        </div>
      </div>
    </button>
  )
}

