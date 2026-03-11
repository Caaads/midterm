import * as THREE from './three.module.js'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101820);


const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight,
  0.1, 
  1000 
);
camera.position.z = 5;


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1.2);
pointLight.position.set(4, 5, 6);
scene.add(pointLight);


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00  });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// SPHERE
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    material
);
sphere.position.set(-1, 0, 0);
scene.add(sphere);


// TORUS (donut)
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 100),
    material
);
torus.position.set(5, 0, 0);
scene.add(torus);



const randomSpinX = 0.01 + Math.random() * 0.02;
const randomSpinY = 0.01 + Math.random() * 0.02;
const randomMoveAmp = 0.2 + Math.random() * 0.4;


function animate(time) {
  time *= 0.001;

  cube.rotation.x += randomSpinX;
  cube.rotation.y += randomSpinY;
  cube.position.y = Math.sin(time * 2) * randomMoveAmp;

  sphere.rotation.x += randomSpinX;
  sphere.rotation.y += randomSpinY;
  sphere.position.y = Math.sin(time * 2) * randomMoveAmp;

  torus.rotation.x += randomSpinX;
  torus.rotation.y += randomSpinY;
  torus.position.y = Math.sin(time * 2) * randomMoveAmp;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
window.addEventListener("resize", onWindowResize);