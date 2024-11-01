import { getBaseUrl } from 'config';
import { getMetaByCharClass } from '../util';

export default function CharacterAvatar({
  item,
  isRank,
  width = 75,
  height = 75,
}) {
  const baseDir = '/asserts/character-avatar';
  const charMeta = getMetaByCharClass(item['Class']);
  let fileName = `my-res://${baseDir}/${charMeta.icon}.png`;

  const titleIndex = item.customTitleIndex;
  if (isRank && titleIndex) {
    fileName = `${getBaseUrl()}/custom-title/${titleIndex
      .toString()
      .padStart(3, '0')}.jpg`;
  }

  return (
    <img
      src={fileName}
      width={width}
      height={height}
      alt={charMeta.name}
      className="rounded-circle"
      title={charMeta.name}
    />
  );
}
