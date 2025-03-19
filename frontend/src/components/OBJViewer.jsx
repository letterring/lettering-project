import React from 'react';
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

export default OBJViewer;
