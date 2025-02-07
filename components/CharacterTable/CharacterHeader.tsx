import { FC } from "react";

type Props = {
  title: string
};
// I was planning to implement sorting here
export const CharacterHeader: FC<Props> = ({ title }) => {
  return (
    <th>
      {title}
    </th>
  );
}
