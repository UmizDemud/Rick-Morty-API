import classNames from 'classnames';
import { FC } from 'react';
import { Character } from '@/types/character';

type Props = {
  character: Character;
  searchString: string;
  slug?: string;
};

export const CharacterRow: FC<Props> = ({ character, searchString, slug }) => {
  return (
    <tr
      data-cy="character"
      className={classNames(
        { 'has-background-warning': slug === character.id.toString() },
      )}
    >
      <td className="min-w-20 whitespace-nowrap" >
        <span>
          {character.name}
        </span>
      </td>
      <td className="min-w-20  whitespace-nowrap" >{character.species}</td>
      <td className="min-w-24  whitespace-nowrap" >{character.type}</td>
      <td className="min-w-20  whitespace-nowrap" >{character.gender}</td>
      <td className="min-w-20  whitespace-nowrap" >{character.status}</td>
      <td className="min-w-24  whitespace-nowrap" >{character.origin.name}</td>
      <td className="min-w-24  whitespace-nowrap" >{character.location.name}</td>
    </tr>
  );
};
