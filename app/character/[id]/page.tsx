import { Card } from '@/components/Card/Card';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  const getCharacter = async () => {
    const url = `https://rickandmortyapi.com/api/character/${id}`

    const res = await fetch(url)
      .then(res => res.json());

    return res
  }

  const res = await getCharacter();
  return (
    <div className="flex flex-col items-center">
      <Card res={res} />
    </div>
  )
}