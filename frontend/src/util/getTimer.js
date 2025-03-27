// 날짜만 비교: '오늘', '1일 후', '3일 후' 등
export const getRelativeDate = (conditionTime) => {
  const today = new Date();
  const target = new Date(conditionTime);

  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const targetMidnight = new Date(target.getFullYear(), target.getMonth(), target.getDate());

  const diff = (targetMidnight.getTime() - todayMidnight.getTime()) / (1000 * 60 * 60 * 24);

  if (diff === 0) return '오늘';
  if (diff > 0) return `${diff}일 후`;
  return `${Math.abs(diff)}일 전`;
};

// 초단위 타이머 텍스트 반환
export const getCountdown = (conditionTime) => {
  const now = new Date();
  const target = new Date(conditionTime);
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) return '곧 열립니다!';

  let remaining = Math.floor(diff / 1000);
  const days = Math.floor(remaining / 86400);
  remaining %= 86400;
  const hours = Math.floor(remaining / 3600);
  remaining %= 3600;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return `${days > 0 ? `${days}일 ` : ''}${hours}시간 ${minutes}분 ${seconds}초`;
};
