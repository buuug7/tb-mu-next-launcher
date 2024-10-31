import { getMetaByCharClass } from '../util';

export default function CharacterAvatar({
  item,
  isRank,
  width = 75,
  height = 75,
}) {
  const baseDir = '/asserts/character-avatar';
  const charMeta = getMetaByCharClass(item['Class']);
  let fileName = `${baseDir}/${charMeta.icon}.png`;

  if (isRank) {
    const titleIndex = item.customTitleIndex;
    fileName = titleIndex
      ? `/assets/custom-title/${titleIndex.toString().padStart(3, '0')}.jpg`
      : fileName;
  }

  const imgSrc = `my-res://${fileName}`;

  return (
    <img
      src={imgSrc}
      width={width}
      height={height}
      alt={charMeta.name}
      className="rounded-circle"
      title={charMeta.name}
    />
  );
}
