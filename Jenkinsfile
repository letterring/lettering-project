pipeline {
  agent any

  environment {
    COMPOSE_PROJECT_DIR = "${WORKSPACE}"
  }

  stages {
    stage('Git Clone 확인') {
      steps {
        echo "Jenkins가 GitLab 저장소를 성공적으로 불러왔습니다."
      }
    }

    stage('도커 종료 및 정리') {
      steps {
        echo "🧹 기존 컨테이너 정리 중..."
        sh '''
          docker compose down || true
        '''
      }
    }

    stage('도커 이미지 재빌드 및 배포') {
      steps {
        echo "🚀 이미지 빌드 및 컨테이너 재실행"
        sh '''
          docker compose -f docker-compose.yml up --build -d
        '''
      }
    }
  }

  post {
    failure {
      echo '❌ 빌드 실패!'
    }
    success {
      echo '🎉 배포 성공!'
    }
  }
}
