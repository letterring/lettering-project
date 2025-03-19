import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';

const ViewerWrapper = ({ objPath, mtlPath }) => {
  const [positionY, setPositionY] = useState(-10); // 🔥 처음엔 아래
  const [rotationSpeed, setRotationSpeed] = useState(0); // 🔥 처음엔 회전 안함
  const [isRising, setIsRising] = useState(true); // 🔥 상승 여부

  useEffect(() => {
    if (isRising) {
      let startTime = performance.now();
      const duration = 600; // 🔥 2초 동안 부드럽게 올라옴

      const animateUp = (currentTime) => {
        let elapsed = currentTime - startTime;
        let progress = Math.min(elapsed / duration, 1); // 🔥 0 ~ 1 (애니메이션 진행률)
        let easedProgress = Math.sin((progress * Math.PI) / 2); // 🔥 Ease-In-Out 효과 적용

        setPositionY(-10 + easedProgress * 10); // 🔥 부드럽게 Y 위치 변경

        if (progress < 1) {
          requestAnimationFrame(animateUp);
        } else {
          setIsRising(false); // 🔥 올라온 후 회전 시작
          setRotationSpeed(100);
        }
      };

      requestAnimationFrame(animateUp);
    }
  }, [isRising]);

  useEffect(() => {
    if (!isRising && rotationSpeed > 0) {
      let currentRotation = 0;
      const totalRotation = Math.PI * 38; // 360도
      const interval = setInterval(() => {
        currentRotation += rotationSpeed * 0.1;
        if (currentRotation >= totalRotation) {
          setRotationSpeed(0); // 🔥 한 바퀴 돌고 멈춤
          clearInterval(interval);
        }
      }, 50);
    }
  }, [rotationSpeed, isRising]);

  return (
    <Canvas shadows camera={{ position: [0, 0, 15], fov: 50 }}>
      <ambientLight intensity={1} />
      <directionalLight castShadow position={[5, 5, 5]} intensity={3} />
      <directionalLight position={[-5, 5, 5]} intensity={0} />
      <pointLight position={[0, 3, 3]} intensity={5} />
      <spotLight position={[10, 10, 10]} angle={0.2} intensity={4} castShadow />

      <OBJViewer objPath={objPath} mtlPath={mtlPath} position={[0, positionY, 0]} />

      <OrbitControls
        enableZoom={true}
        enableRotate={true}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        autoRotate={true}
        autoRotateSpeed={rotationSpeed}
      />
    </Canvas>
  );
};

export default ViewerWrapper;
