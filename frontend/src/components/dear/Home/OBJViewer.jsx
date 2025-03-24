import { Html, OrbitControls } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import AnimatedEnvelope from './AnimatedEnvelope';

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

const CameraZoomHelper = ({ trigger, targetPosition, onComplete }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (trigger && targetPosition) {
      const start = performance.now();
      const duration = 1000;

      const startPos = camera.position.clone();
      const endPos = new THREE.Vector3(...targetPosition).add(new THREE.Vector3(0, 0, 5));

      const animate = (time) => {
        const elapsed = time - start;
        const t = Math.min(elapsed / duration, 1);

        camera.position.lerpVectors(startPos, endPos, t);
        camera.lookAt(...targetPosition);

        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          onComplete?.();
        }
      };

      requestAnimationFrame(animate);
    }
  }, [trigger, targetPosition]);

  return null;
};

const ViewerWrapper = ({
  objPath,
  mtlPath,
  envelopeObjPath,
  envelopeMtlPath,
  newLetter,
  onMissedClick,
}) => {
  const navigate = useNavigate();

  const [positionY, setPositionY] = useState(-10);
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const [isRising, setIsRising] = useState(true);
  const [startZoom, setStartZoom] = useState(false);
  const [zoomTarget, setZoomTarget] = useState(null);

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
      const totalRotation = Math.PI * 36;
      const interval = setInterval(() => {
        currentRotation += rotationSpeed * 0.1;
        if (currentRotation >= totalRotation) {
          setRotationSpeed(0); // 🔥 한 바퀴 돌고 멈춤
          clearInterval(interval);
        }
      }, 50);
    }
  }, [rotationSpeed, isRising]);

  useEffect(() => {
    if (!isRising && rotationSpeed === 0) {
      if (newLetter) {
        const timeout = setTimeout(() => {
          const target = [0, positionY + 3, 0];
          setZoomTarget(target);
          setStartZoom(true);
        }, 1500);
        return () => clearTimeout(timeout);
      }
      const timeout = setTimeout(() => {
        navigate('/dear/home');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isRising, rotationSpeed, newLetter]);

  // 📬 확대 끝나고 라우터 이동
  const handleZoomComplete = () => {
    navigate('/dear/postcard');
  };

  return (
    <StCanvasPageWrapper>
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

          {!isRising && newLetter && (
            <AnimatedEnvelope
              objPath={envelopeObjPath}
              mtlPath={envelopeMtlPath}
              basePosition={[0, positionY + 3, 0]}
            />
          )}
          <OBJViewer objPath={objPath} mtlPath={mtlPath} position={[0, positionY, 0]} />

          {!isRising && newLetter && (
            <Html position={[0, positionY - 4, 0]} center>
              <StFloatingText>새로운 편지가 도착했어요!</StFloatingText>
            </Html>
          )}

          <OrbitControls
            enableZoom={true}
            enableRotate={true}
            enablePan={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            autoRotate={true}
            autoRotateSpeed={rotationSpeed}
          />
          <CameraZoomHelper
            trigger={startZoom}
            targetPosition={zoomTarget}
            onComplete={handleZoomComplete}
          />
        </Canvas>
      </StCanvasWrapper>
    </StCanvasPageWrapper>
  );
};

export default ViewerWrapper;

const StCanvasPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StCanvasWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const StFloatingText = styled.div`
  font-family: 'Pretendard';
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 130%;
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 0.8rem;
  white-space: nowrap;
  display: inline-block;
`;
