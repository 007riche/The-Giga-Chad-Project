import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "gray" })

const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
);

scene.add(cubeMesh);

/* Initialising the Aspect Ratio of the viewport */
/* const aspectRatio = 16 / 9; */
const aspectRatio = window.innerWidth / window.innerHeight;


/* Initiating a perspective camera */
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);



/* const camera = new THREE.OrthographicCamera(
  -1 * aspectRatio,
  1 * aspectRatio,
  1,
  -1,
  0.1,
  200
); */


camera.position.z = 5;
/* camera.translateZ(5);
camera.translateX(5);
camera.translateY(5); */
//camera.position.y = 5;
//camera.position.x = 5;

const canvas = document.querySelector('canvas.threeJS');


const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Instantiation of the controls
const controls = new OrbitControls(camera, canvas);
controls.autoRotate = true;
controls.enableDamping = true;

window.addEventListener("resize", () => {
  // Updating the aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;

  // Updating the camera's projection matrix to match the window changes
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

});



const renderloop = () => {
  //updation before rendering the scene
  controls.update();

  // 
  renderer.render(scene, camera);

  // Gets the actual frame each time a new frame has to be rendered by the browser depenending on
  // the frequency of the screen or monitor
  // params: pre-rendering processing
  window.requestAnimationFrame(renderloop);
}
renderloop();