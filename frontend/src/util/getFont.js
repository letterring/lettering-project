const fontList = [
  { id: 'GOMSIN1', name: 'Gomsin', style: 'Gomsin1' },
  { id: 'GOMSIN2', name: 'Gomsin', style: 'Gomsin2' },
  { id: 'UHBEE1', name: 'Uhbee BEOJJI', style: 'Uhbee1' },
  { id: 'SAEUM5', name: 'GangwonEduSaeeum', style: 'Saeum5' },
  { id: 'SAEUM6', name: 'GangwonEduSaeeum', style: 'Saeum6' },
  { id: 'EDUBODY0', name: 'GangwonEduAll', style: 'EduBody0' },
  { id: 'EDUBODY1', name: 'GangwonEduAll', style: 'EduBody1' },
];

export const getFontStyle = (id) => {
  const font = fontList.find((font) => font.id === id);
  return font ? font.style : undefined;
};

export const getFontName = (id) => {
  const font = fontList.find((font) => font.id === id);
  return font ? font.name : undefined;
};
