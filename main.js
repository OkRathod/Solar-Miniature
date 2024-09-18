import * as THREE from "three";

import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";

import stars from "/images/stars.jpg";

import neptune from "/images/2k_neptune.jpg";

import uranus from "/images/2k_uranus.jpg";

import venus from "/images/8k_venus_surface.jpg";

import mars from "/images/8k_mars.jpg";

import earth from "/images/8k_earth_daymap.jpg";

import sun from "/images/8k_sun.jpg";

import mercury from "/images/8k_mercury.jpg";

import jupiter from "/images/8k_jupiter.jpg";

import saturn from "/images/8k_saturn.jpg";

import saturnRing from "/images/8k_saturn_ring_alpha.png";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-242, 100, -2);

orbit.update();

const textureLoader = new THREE.TextureLoader();

const cubeTextureLoader = new THREE.CubeTextureLoader();

scene.background = cubeTextureLoader.load([
  stars,
  stars,
  stars,
  stars,
  stars,
  stars,
]);

// Sun //

const sunGeo = new THREE.SphereGeometry(30, 30, 30);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sun),
});
const Sun = new THREE.Mesh(sunGeo, sunMaterial);
scene.add(Sun);

// Mars //

// const marsGeometry = new THREE.SphereGeometry(10, 30, 30);
// const marsMaterial = new THREE.MeshStandardMaterial({
//   map: textureLoader.load(mars),
// });
// const Mars = new THREE.Mesh(marsGeometry, marsMaterial);
// Sun.add(Mars);
// Mars.position.x = 260;

// Function //

function createObject(size, texture, position) {
  const geo = new THREE.SphereGeometry(size, 60, 60);
  const material = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const planet = new THREE.Mesh(geo, material);
  const obj = new THREE.Object3D();
  obj.add(planet);
  scene.add(obj);
  planet.position.x = position;
  return { planet, obj };
}

// Planets //

const Mercury = createObject(4, mercury, 50);
const Venus = createObject(6, venus, 80);
const Earth = createObject(12, earth, 120);
const Mars = createObject(13, mars, 180);

const Jupiter = createObject(20, jupiter, 300);
const Saturn = createObject(21, saturn, 400);
const Neptune = createObject(16, neptune, 500);
const Uranus = createObject(14, uranus, 600);

// Rings //

const satRingGeo = new THREE.RingGeometry(25, 35);
const satRingMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load(saturnRing),
  side: THREE.DoubleSide,
});
const ring = new THREE.Mesh(satRingGeo, satRingMaterial);
Saturn.planet.add(ring);
ring.rotation.x = -0.5 * Math.PI;

// Light //

const pointLight = new THREE.PointLight(0xffffff, 50000, 300000);
scene.add(pointLight);

function animate() {
  Sun.rotateY(0.004);

  Mercury.planet.rotateY(0.03);
  Mercury.obj.rotateY(0.02);

  Venus.planet.rotateY(0.04);
  Venus.obj.rotateY(0.018);

  Earth.planet.rotateY(0.05);
  Earth.obj.rotateY(0.01);

  Mars.planet.rotateY(0.003);
  Mars.obj.rotateY(0.002);

  Jupiter.planet.rotateY(0.2);
  Jupiter.obj.rotateY(0.0003);

  Saturn.planet.rotateY(0.02);
  Saturn.obj.rotateY(0.0002);

  Neptune.planet.rotateY(0.003);
  Neptune.obj.rotateY(0.0004);

  Uranus.planet.rotateY(0.03);
  Uranus.obj.rotateY(0.00032);

  renderer.render(scene, camera);
}

const mousePosition = new THREE.Vector2();

window.addEventListener("mousemove", function (e) {
  mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
  mousePosition.y = (e.clientY / window.innerHeight) * 2 + 1;
  // const rayCaster = new THREE.Raycaster();
  // rayCaster.setFromCamera(mousePosition, camera);

  // const intersects = rayCaster.intersectObjects(scene.children);
  // console.log(intersects);
});

window.addEventListener("click", function (e) {
  const rayCaster = new THREE.Raycaster();
  rayCaster.setFromCamera(mousePosition, camera);

  const intersects = rayCaster.intersectObjects(scene.children);
  console.log(intersects);
  console.log(mousePosition);
});

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Making Camera Move with Object //
