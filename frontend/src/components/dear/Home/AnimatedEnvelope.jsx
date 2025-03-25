import React, { useEffect, useState } from 'react';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const AnimatedEnvelope = ({ objPath, mtlPath, basePosition }) => {
  const [object, setObject] = useState(null);
  const [floatY, setFloatY] = useState(0);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();

    const load = async () => {
      const materials = await mtlLoader.loadAsync(mtlPath);
      materials.preload();
      objLoader.setMaterials(materials);

      const obj = await objLoader.loadAsync(objPath);
      setObject(obj);
    };

    load();
  }, [objPath, mtlPath]);

  // 💫 부드럽게 둥실 떠오르는 모션
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setFrame((prev) => {
        const next = prev + 0.03;
        setFloatY(Math.sin(next) * 0.2); // +0.5 ~ -0.5 진동
        return next;
      });
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return object ? (
    <primitive
      object={object}
      position={[basePosition[0], basePosition[1] + floatY, basePosition[2]]}
    />
  ) : null;
};

export default AnimatedEnvelope;
