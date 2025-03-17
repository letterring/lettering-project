//util에서 여러곳에서 공통되게 사용할 함수 선언
//네이밍 : get으로 시작

// 날짜 문자열에서 'YYYY-MM-DD' 형식으로 변환하는 함수
export const getFormatDate = (dateString) => {
  if (!dateString) return ''; // 값이 없을 경우 빈 문자열 반환
  return dateString.split('T')[0]; // "T" 기준으로 문자열을 나누고 첫 번째 부분(YYYY-MM-DD) 반환
};
