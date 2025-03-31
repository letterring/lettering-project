const fontList = [
  { id: 'GOMSIN1', name: 'Gomsin', style: 'Gomsin1' },
  { id: 'UHBEE1', name: 'Uhbee BEOJJI', style: 'Uhbee1' },
  { id: 'SAEUM5', name: 'GangwonEduSaeeum', style: 'Saeum5' },
  { id: 'EDUBODY0', name: 'GangwonEduAll', style: 'EduBody0' },
];

export const getFontStyle = (id) => {
  const font = fontList.find((font) => font.id === id);
  return font ? font.style : undefined;
};

export const getFontName = (id) => {
  const font = fontList.find((font) => font.id === id);
  return font ? font.name : undefined;
};
