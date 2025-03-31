import { getFormatDate } from './getFormatDate';

// 날짜만 비교: '오늘', '1일 후', '3일 후' 등
export const getRelativeFormat = (conditionTime) => {
  const today = new Date();
  const target = new Date(conditionTime);

  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const targetMidnight = new Date(target.getFullYear(), target.getMonth(), target.getDate());

  const diff = (targetMidnight.getTime() - todayMidnight.getTime()) / (1000 * 60 * 60 * 24);

  if (diff === 0) return '오늘';
  if (diff > 0) return `${diff}일 후`;
  return getRelativeDate(conditionTime);
};

// 현재 시간 기준 상대시간 계산
export const getRelativeDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const seconds = Math.round((now - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) {
    return `${seconds}초 전`;
  } else if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else if (days < 7) {
    return `${days}일 전`;
  } else if (now.getFullYear() - date.getFullYear() < 1) {
    return `${date.getMonth() + 1}. ${date.getDate()}`;
  }
  return getFormatDate(date.toISOString());
};
