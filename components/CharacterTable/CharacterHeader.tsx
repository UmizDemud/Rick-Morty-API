import { FC } from "react";

type Props = {
  title: string
  handleSortClick: (arg: string) => void
  currentSortBy: string
};

export const CharacterHeader: FC<Props> = ({ title, handleSortClick, currentSortBy }) => {
  return (
    <th>
      <button onClick={() => handleSortClick(title)} className="is-flex is-flex-wrap-nowrap">
        {title}
        <div>
          <span className="icon">
            {currentSortBy === title
              ? <></>
              : <></>
            }
          </span>
        </div>
      </button>
    </th>
  );
}
