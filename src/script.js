import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const white = new THREE.Color(0xffffff);
const baseColor = new THREE.Color(0x768fac);
const selectedColor = new THREE.Color(0xff0000);

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

camera.position.z = -1;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const renderer = new THREE.WebGLRenderer({
	antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const loader = new GLTFLoader();

const modelPath = '../models/bodyMuscles.glb';

// Load the model
loader.load(modelPath, (gltf) => {
	const modelScene = gltf.scene;

	// Set the model's material
	modelScene.traverse((node) => {
		if (!node.material) return;

		node.material = new THREE.MeshPhysicalMaterial({
			color: baseColor,
			emissive: baseColor,
			emissiveIntensity: 0.5,
			metalness: 0,
			roughness: 1,
			clearcoat: 1,
			clearcoatRoughness: 1,
		});

		node.castShadow = true;
	});

	console.log(modelScene);

	// Rotate the model 180 degrees
	modelScene.rotation.y = Math.PI;

	scene.add(modelScene);
});

// Add lighting

const frontLight = new THREE.SpotLight(white, 0.5);
frontLight.position.set(0, 0, -1);
scene.add(frontLight);

const backLight = new THREE.SpotLight(white, 0.5);
backLight.position.set(0, 0, 1);
backLight.rotation.y = Math.PI;
scene.add(backLight);

const ambientLight = new THREE.AmbientLight(white, 0.4);
scene.add(ambientLight);

// shadows

const shadowLight = new THREE.DirectionalLight(white, 1);
shadowLight.position.set(0, 1, 0);
shadowLight.castShadow = true;
shadowLight.shadow.radius = 8;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Soften shadows a lot
shadowLight.shadow.bias = 0.0001;
shadowLight.shadow.radius = 100;
shadowLight.shadow.mapSize.width = 2048;
shadowLight.shadow.mapSize.height = 2048;

scene.add(shadowLight);

// Mouse events
let mouseDown = false;

window.addEventListener('mousemove', (event) => {
	pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('mouseup', () => {
	mouseDown = false;
});

window.addEventListener('mousedown', () => {
	mouseDown = true;
});

// Touch events

window.addEventListener('touchmove', (event) => {
	pointer.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
	pointer.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('touchend', () => {
	mouseDown = false;
});

window.addEventListener('touchstart', () => {
	mouseDown = true;
});

function animate() {
	requestAnimationFrame(animate);

	if (mouseDown) {
		raycaster.setFromCamera(pointer, camera);

		const children = scene.children;
		const intersects = raycaster.intersectObjects(children);

		if (intersects.length > 0) {
			let intersectsNames = [];

			for (let i = 0; i < intersects.length; i++) {
				const intersection = intersects[i].object;
				const name = intersection.name;

				if (!name.includes('MUSCLE_')) continue;

				intersectsNames.push(name);

				intersection.material.emissive.set(selectedColor);
			}

			for (let i = 0; i < children.length; i++) {
				children[i].traverse((child) => {
					const name = child.name;

					if (!child.name.includes('MUSCLE_')) return;
					if (!child.material) return;

					for (let i = 0; i < intersectsNames.length; i++) {
						if (
							intersectsNames[i].includes(
								name.slice(0, name.length - 1)
							)
						) {
							child.material.emissive.set(selectedColor);

							return;
						}
					}

					child.material.emissive.set(baseColor);
				});
			}
		}
	}

	controls.update();
	renderer.render(scene, camera);
}

animate();
