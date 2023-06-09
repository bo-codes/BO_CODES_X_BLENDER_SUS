import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import './OBJViewer.css'

const OBJViewer = ({OBJFile}) => {
  // CREATING REFERENCE TO THE DIV WHERE WE WILL SHOW OUR CANVAS
  const containerRef = useRef(null);

  const [modelLoaded, setModelLoaded] = useState(false)

  useEffect(() => {
    // -------------- SCENE SETUP -------------- vv
    const scene = new THREE.Scene();
    // ADDS MAIN XYZ(RGB) AXES TO SCENE
    // scene.add(new THREE.AxesHelper(5));
    //
    //
    // ------ CREATES CAMERA THAT WE WILL SEE THE SCENE THROUGH
    const camera = new THREE.PerspectiveCamera(25, 1, 0.1, 2000);
    // ------ SETS POSITION OF CAMERA(DEFAULT IS (0,0,0))
    camera.position.set(0, 0, -300);
    // ------ THIS CODE IS ALSO ACCOMPLISHING THE SAME AS THE CODE ABOVE
    // camera.position.z = -400;
    //
    //
    // ------ CREATE AN AMBIENT LIGHT
    const ambLight = new THREE.AmbientLight(0x404040);
    // ------ ADD THE LIGHT TO THE SCENE
    scene.add(ambLight);
    // ------ CREATE A DIRECTIONAL LIGHT
    let light = new THREE.DirectionalLight();
    light.position.set(10, 30, -30)
    // ------ ADD THE LIGHT TO THE SCENE
    scene.add(light);
    // ------ NOT SURE WHAT THIS DOES YET
    let helper = new THREE.DirectionalLightHelper(light);
    scene.add(helper);
    // -------------- SCENE SETUP -------------- ^^
    //
    //
    //
    //
    // -------------- CREATE ORBIT CONTROLS (to navigate the scene) -------------- vv
    const controls = new OrbitControls(camera, containerRef.current);
    // MAKES THE PHYSICS HEAVIER/NICER FOR CONTROLS
    controls.enableDamping = true;
    // MAKES MODEL AUTO-ROTATE
    controls.autoRotate = true;
    // SETS THE ROTATION SPEED
    controls.autoRotateSpeed = 4;
    // SETTING TO FALSE MAKES IT SO USER CAN'T PAN
    controls.enablePan = false;
    // SETTING TO FALSE MAKES IT SO USER CAN'T ZOOM
    controls.enableZoom = false;
    // -------------- CREATE ORBIT CONTROLS (to navigate the scene) -------------- ^^
    //
    //
    //
    //
    // -------------------- RENDERER SETUP -------------------- vv
    // ------ FUNCTION TO CALCULATE RENDER SIZE DEPENDING ON THE WIDTH OF OUR WINDOW(CHECKS IF WE ARE ON MOBILE OR NOT)
    const renderSize = () => {
      // if (window.innerWidth < 500) {
      //   return 240;
      // }
      return 360;
    };
    // ------ CREATES A NEW INSTANCE OF A RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // ------ SETS THE SIZE OF THE RENDERER TO THE VALUE OUR renderSize FUNCTION RETURNS
    renderer.setSize(renderSize(), renderSize());
    // -------------------- RENDERER SETUP -------------------- ^^
    //
    //
    //
    //
    // renderer HAS PROPERTY domElement. THIS HOLDS OUR CANVAS WITH OUR MODEL. WE ARE ATTACHING THAT TO THE DIV WHERE WE WANT TO SHOW IT BELOW IN OUR COMPONENT RETURN.
    containerRef.current.appendChild(renderer.domElement);
    //
    //
    //
    //
    // -------------------- OBJECT LOADER SETUP -------------------- vv
    // ------ CREATES LOADER
    const objLoader = new OBJLoader();
    // ------ LOADS THE OBJ FILE
    objLoader.load(OBJFile , (model) => {
      // once the obj is loaded, add it to the scene
      scene.add(model);
      // once the obj is added to the scene, render the scene
      renderer.render(scene, camera);
      setModelLoaded(true)
    });
    // -------------------- OBJECT LOADER SETUP -------------------- ^^
    //
    //
    //
    //
    // -------------------- ANIMATE FUNCTION -------------------- vv
    const animate = () => {
      // ------ REQUEST THE ANIMATION
      requestAnimationFrame(animate);
      // ------ UPDATE THE CONTROLS
      controls.update();
      // ------ THIS IS IF WE ARE USING THE LIGHT HELPER
      helper.update();
      // ------ RENDER THE SCENE
      renderer.render(scene, camera);
    };
    // CALL THE ANIMATE FUNCTION
    animate();
    // -------------------- ANIMATE FUNCTION -------------------- ^^
    //
    //
    //
    //
    return () => {
      // containerRef.current.removeChild(renderer.domElement);
    };
  },[OBJFile]);

  return (
    <div id="model-container">
      <div
        style={{ display: modelLoaded ? "block" : "none" }}
        ref={containerRef}
      ></div>
      <div id='model-loading' style={{ display: !modelLoaded ? "flex" : "none" }}>
        LOADING...
      </div>
      <div>BO_CODES X BLENDER_SUS</div>
    </div>
  );
};

export default OBJViewer;
