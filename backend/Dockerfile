# OpenJDK 기반의 Java 17 이미지 사용
FROM openjdk:17-jdk-slim

# 작업 디렉토리 설정
WORKDIR /app

# Gradle Wrapper 및 설정 파일 복사 (캐싱 최적화)
COPY gradlew ./
COPY gradle ./gradle
COPY build.gradle ./
COPY settings.gradle ./

# Gradle Wrapper 실행 권한 부여
RUN chmod +x gradlew

# 🔥 소스 코드 및 설정 파일 복사
COPY src ./src
COPY src/main/resources/secrets.properties /app/resources/secrets.properties

# Gradle 의존성 미리 다운로드 (빌드 속도 개선)
RUN ./gradlew dependencies --no-daemon

# Gradle 빌드 시 테스트 제외
RUN ./gradlew build -x test --no-daemon

# 🔥 JAR 파일 복사 (정확한 파일명 명시)
RUN cp build/libs/lettering-0.0.1-SNAPSHOT.jar /app/app.jar || echo "No JAR file found"

# 포트 설정
EXPOSE 8080

# 실행 명령 (secrets.properties 경로 명시)
ENTRYPOINT ["java", "-Dspring.config.additional-location=/app/resources/secrets.properties", "-jar", "/app/app.jar"]