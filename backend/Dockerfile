# ✅ 1. 베이스 이미지
FROM openjdk:17-jdk-slim

# ✅ 2. 작업 디렉토리
WORKDIR /app

# ✅ 3. 빌드된 JAR만 복사
COPY build/libs/lettering-0.0.1-SNAPSHOT.jar /app/app.jar

# ✅ 4. 설정파일 복사 
COPY src/main/resources/secrets.properties /app/secrets.properties

# ✅ 5. 포트 및 실행
EXPOSE 8080
ENTRYPOINT ["java", "-Dspring.config.additional-location=/app/secrets.properties", "-jar", "/app/app.jar"]
