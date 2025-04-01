# Nginx 최신 이미지 사용
FROM nginx:latest

# 정적 파일 복사
COPY dist/ /usr/share/nginx/html/

# 기본 index.html 제거 여부는 필요 시 선택 (여기선 dist로 덮어쓰기 충분)
# RUN rm -rf /usr/share/nginx/html/*

# 권한 설정 (선택)
RUN chmod -R 755 /usr/share/nginx/html
