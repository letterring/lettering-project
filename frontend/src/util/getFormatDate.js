// 날짜 문자열에서 'YY.MM.DD' 형식으로 변환하는 함수
export const getFormatDate = (dateString) => {
  if (!dateString) return '';

  const datePart = dateString.split('T')[0];
  const [year, month, day] = datePart.split('-');

  return `${year.slice(2)}.${month}.${day}`;
};
