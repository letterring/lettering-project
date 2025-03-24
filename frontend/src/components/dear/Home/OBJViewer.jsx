import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const OBJViewer = ({ objPath, mtlPath, position }) => {
  const [object, setObject] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const mtlLoader = new MTLLoader();
      const objLoader = new OBJLoader();

      try {
        const materials = await mtlLoader.loadAsync(mtlPath);
        materials.preload();
        objLoader.setMaterials(materials);

        const obj = await objLoader.loadAsync(objPath);
        setObject(obj);
      } catch (error) {
        console.error('Error loading OBJ/MTL:', error);
      }
    };

    loadModel();
  }, [objPath, mtlPath]);

  return object ? <primitive object={object} position={position} /> : null;
};

const ViewerWrapper = ({ objPath, mtlPath, newLetter, onMissedClick }) => {
  const [positionY, setPositionY] = useState(-10);
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const [isRising, setIsRising] = useState(true);

  useEffect(() => {
    if (isRising) {
      let startTime = performance.now();
      const duration = 600; // 🔥 2초 동안 부드럽게 올라옴
      const targetHeight = 10; // 🔼 더 높이 멈추고 싶을 때 값 조절

      const animateUp = (currentTime) => {
        let elapsed = currentTime - startTime;
        let progress = Math.min(elapsed / duration, 1); // 🔥 0 ~ 1 (애니메이션 진행률)
        let easedProgress = Math.sin((progress * Math.PI) / 2); // 🔥 Ease-In-Out 효과 적용

        setPositionY(-10 + easedProgress * targetHeight);

        if (progress < 1) {
          requestAnimationFrame(animateUp);
        } else {
          setIsRising(false);
          setRotationSpeed(100);
        }
      };

      requestAnimationFrame(animateUp);
    }
  }, [isRising]);

  useEffect(() => {
    if (!isRising && rotationSpeed > 0) {
      let currentRotation = 0;
      const totalRotation = Math.PI * 17; // 360도
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
    <StCanvasWrapper>
      <Canvas
        shadows
        camera={{ position: [0, 0, 20], fov: 50 }}
        onPointerMissed={(e) => {
          if (e.button === 0) {
            onMissedClick?.();
          }
        }}
      >
        <ambientLight intensity={1} />
        <directionalLight castShadow position={[5, 5, 5]} intensity={3} />
        <directionalLight position={[-5, 5, 5]} intensity={0} />
        <pointLight position={[0, 3, 3]} intensity={5} />
        <spotLight position={[10, 10, 10]} angle={0.2} intensity={4} castShadow />

        {!isRising && newLetter ? (
          <OBJViewer objPath={objPath} mtlPath={mtlPath} position={[0, positionY + 2, 0]} />
        ) : null}
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
    </StCanvasWrapper>
  );
};

export default ViewerWrapper;

const StCanvasWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
