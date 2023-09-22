import * as THREE from 'three';
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TextureLoader } from 'three';


window.Webflow ||= [];
window.Webflow.push(() => {
  init3d();
});

function init3d() {
    const viewport = document.querySelector('[data-3d="c"]')
    console.log(viewport);

    // renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( viewport.clientWidth, viewport.clientHeight );
    viewport.appendChild( renderer.domElement );

    // camera
    const camera = new THREE.PerspectiveCamera( 
        75, 
        viewport.clientWidth / viewport.clientHeight,
        0.1,
        100
    );

    camera.position.y = 0;
    camera.position.z = 5;

     // controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false;
    // controls.autoRotate = false;
    // controls.enableDamping = false;
    // controls.dampingFactor = 0.05;

    // scene
    const scene = new THREE.Scene();

    //geometry
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial( { 
      color: 0xfffff,
    } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    //rendering
    function animate() {
        requestAnimationFrame( animate );

        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;

        controls.update();

        renderer.render( scene, camera );
      
      };
      animate();

    //resize
    function onWindowResize() {
    camera.aspect = viewport.clientWidth / viewport.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( viewport.clientWidth, viewport.clientHeight );
    }
    window.addEventListener( 'resize', onWindowResize, false );

    //mouse move
    function onMouseMove(e) {
    const x = e.clientX
    const y = e.clientY
    
    gsap.to(scene.rotation, {
        y: gsap.utils.mapRange(0, viewport.clientWidth, .2, -.2, x),
        x: gsap.utils.mapRange(0, viewport.clientHeight, .2, -.2, y)
    })
    }
    window.addEventListener('mousemove', onMouseMove)
}


    // //load 3d async

    // const assets = load();
    // assets.then((data) => {
    // console.log(data, data.model);

    // data.model.traverse((child) => {
    //     if (child.isMesh) {
    //         child.material = new THREE.MeshBasicMaterial();
    //         child.material.map = data.texture;
    //     }
    // });

    // data.model.position.y = 1;
    // scene.add(data.model);
    // })

    // //Loader Functions
    // async function load() {
    // const model = await loadModel(
    //     'https://uploads-ssl.webflow.com/63a027a7d4fdce748dd31f5b/650c58af1eb462e257fa1372_dragon.txt', 
    // );

    // const texture = await loadTexture(
    //     'https://uploads-ssl.webflow.com/63a027a7d4fdce748dd31f5b/63a08efc0612e3a0c04bb901_Schermata%202022-12-19%20alle%2017.18.44.png', 
    // );
    // };

    // return { model, texture };

    // const TextureLoader = new THREE.TextureLoader();
    // const modelLoader = new GLTFLoader();

    // function loadTexture(url) {
    //     return new Promise((resolve) => {
    //         textureLoader.load(url, (data) => {
    //             data.needsUpdate = true;
    //             data.flipY = false;

    //             resolve(data);
    //         });
    //     });
    // }

    // function loadModel(url, id) {
    //     return new Promise((resolve, reject) => {
    //         modelLoader.load(url, (gltf) => {
    //             const result = gltf.scene;
    //             resolve(result);
    //         });
    //     });
    // }