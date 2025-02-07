import { FC } from "react";

import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";


type Props = {
  objKey: string
  title: string
  handleSortClick: (arg: string) => void
  currentSortBy: string
  isCurrentlyReversed: boolean
};

export const CharacterHeader: FC<Props> = ({ objKey, title, handleSortClick, currentSortBy, isCurrentlyReversed }) => {
  return (
    <th>
      <button onClick={() => handleSortClick(objKey)} className="flex w-full items-center gap-1">
        <div>{title}</div>
        <div>
          <span className="icon">
            {objKey && currentSortBy === objKey ?
              isCurrentlyReversed
                ? <FaAngleUp />
                : <FaAngleDown />
            : <></>}
          </span>
        </div>
      </button>
    </th>
  );
}
