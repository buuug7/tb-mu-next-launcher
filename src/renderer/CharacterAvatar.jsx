export default function CharacterAvatar({
  roleName,
  item,
  isRank,
  width = 75,
  height = 75,
}) {
  let img = 'elf';
  const baseDir = '/asserts/character-avatar';
  const fileExt = '.png';
  switch (roleName) {
    case '法师':
    case '魔导士':
    case '神导师':
      img = 'dw';
      break;
    case '剑士':
    case '骑士':
    case '神骑士':
      img = 'dk';
      break;
    case '弓箭手':
    case '圣射手':
    case '神射手':
      img = 'elf';
      break;
    case '召唤师':
    case '圣巫师':
    case '神巫师':
      img = 'sum';
      break;
    case '魔剑士':
    case '剑圣':
      img = 'mg';
      break;
    case '圣导师':
    case '祭师':
      img = 'dl';
      break;
    case '格斗家':
    case '格斗大师':
      img = 'sum-1';
      break;
    default:
      img = 'elf';
  }

  let fileName = `${baseDir}/${img}${fileExt}`;

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
      alt={roleName}
      className="rounded-circle"
      title={roleName}
    />
  );
}
