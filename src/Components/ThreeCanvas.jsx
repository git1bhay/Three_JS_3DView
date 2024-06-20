import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const ThreeCanvas = () => {
  const mountRef = useRef(null);
  const cubeSpeedRef = useRef(0.01);
  const torusSpeedRef = useRef(0.01);
  const coneSpeedRef = useRef(0.01);

  const [cubeSpeed, setCubeSpeed] = useState(0.01);
  const [torusSpeed, setTorusSpeed] = useState(0.01);
  const [coneSpeed, setConeSpeed] = useState(0.01);

  const [cube, setCube] = useState(null);
  const [torus, setTorus] = useState(null);
  const [cone, setCone] = useState(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xccd9ff);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight();
    scene.add(light);
    light.position.set(4, 4, 0);

    // Geometry and Material
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

    const geometry = new THREE.BoxGeometry();
    const cubeObj = new THREE.Mesh(geometry, material);
    scene.add(cubeObj);
    setCube(cubeObj);

    const geometry1 = new THREE.TorusGeometry();
    const torusObj = new THREE.Mesh(geometry1, material);
    scene.add(torusObj);
    setTorus(torusObj);
    torusObj.position.x = -4;

    const geometry2 = new THREE.ConeGeometry();
    const coneObj = new THREE.Mesh(geometry2, material);
    scene.add(coneObj);
    setCone(coneObj);
    coneObj.position.x = 4;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      cubeObj.rotation.x += cubeSpeedRef.current;
      cubeObj.rotation.y += cubeSpeedRef.current;

      torusObj.rotation.x += torusSpeedRef.current;
      torusObj.rotation.y += torusSpeedRef.current;

      coneObj.rotation.x += coneSpeedRef.current;
      coneObj.rotation.y += coneSpeedRef.current;

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on component unmount
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  const handleSpeedChange = (setter, ref) => (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 0.1) {
      setter(value);
      ref.current = value;
    }
  };

  return (
    <div ref={mountRef} className='webgl relative'>
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2'>
        <button
          onClick={() => (cube.visible = !cube.visible)}
          className='mx-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300'
        >
          Toggle Cube
        </button>
        <button
          onClick={() => (torus.visible = !torus.visible)}
          className='mx-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300'
        >
          Toggle Torus
        </button>
        <button
          onClick={() => (cone.visible = !cone.visible)}
          className='mx-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300'
        >
          Toggle Cone
        </button>
      </div>
      <div className='absolute top-4 left-1/2 transform -translate-x-1/2'>
        <div className='my-2'>
          <label>Cube Speed: </label>
          <input
            type='range'
            min='0'
            max='0.1'
            step='0.001'
            value={cubeSpeed}
            onChange={(e) => {
              setCubeSpeed(parseFloat(e.target.value));
              cubeSpeedRef.current = parseFloat(e.target.value);
            }}
          />
          <input
            type='number'
            min='0'
            max='0.1'
            step='0.001'
            value={cubeSpeed}
            onChange={handleSpeedChange(setCubeSpeed, cubeSpeedRef)}
            className='ml-2'
          />
        </div>
        <div className='my-2'>
          <label>Torus Speed: </label>
          <input
            type='range'
            min='0'
            max='0.1'
            step='0.001'
            value={torusSpeed}
            onChange={(e) => {
              setTorusSpeed(parseFloat(e.target.value));
              torusSpeedRef.current = parseFloat(e.target.value);
            }}
          />
          <input
            type='number'
            min='0'
            max='0.1'
            step='0.001'
            value={torusSpeed}
            onChange={handleSpeedChange(setTorusSpeed, torusSpeedRef)}
            className='ml-2'
          />
        </div>
        <div className='my-2'>
          <label>Cone Speed: </label>
          <input
            type='range'
            min='0'
            max='0.1'
            step='0.001'
            value={coneSpeed}
            onChange={(e) => {
              setConeSpeed(parseFloat(e.target.value));
              coneSpeedRef.current = parseFloat(e.target.value);
            }}
          />
          <input
            type='number'
            min='0'
            max='0.1'
            step='0.001'
            value={coneSpeed}
            onChange={handleSpeedChange(setConeSpeed, coneSpeedRef)}
            className='ml-2'
          />
        </div>
      </div>
    </div>
  );
};

export default ThreeCanvas;
