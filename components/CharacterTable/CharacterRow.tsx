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
      <td>
        <a
          className={`link${character.status !== 'alive' ? ' link--red' : ''}`}
          href={`#/people/${character.id}${searchString.length ? `?${searchString}` : ''}`}
        >
          {character.name}
        </a>
      </td>
      <td>{character.species}</td>
      <td>{character.type}</td>
      <td>{character.gender}</td>
      <td>{character.status}</td>
      <td>{character.origin.name}</td>
      <td>{character.location.name}</td>
    </tr>
  );
};
