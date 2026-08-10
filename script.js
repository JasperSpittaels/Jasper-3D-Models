import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const models = [

    {
        canvas: "viewer1",
        file: "/Jasper-3D-Models/models/FerrariF40.glb"
    },

    {
        canvas: "viewer2",
        file: "/Jasper-3D-Models/models/Basketball.glb"
    },

    {
        canvas: "viewer3",
        file: "/Jasper-3D-Models/models/Chair.glb"
    }

];


const loader = new GLTFLoader();


function createViewer(data) {

    const canvas =
        document.getElementById(data.canvas);


    // SCENE

    const scene =
        new THREE.Scene();

    scene.background = new THREE.Color(0x080809);


    // CAMERA

    const camera =
        new THREE.PerspectiveCamera(
            45,
            canvas.clientWidth /
            canvas.clientHeight,
            0.01,
            1000
        );

    camera.position.set(
        3,
        2,
        5
    );


    // RENDERER

    const renderer =
        new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: false
        });

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );

    renderer.setSize(
        canvas.clientWidth,
        canvas.clientHeight,
        false
    );

    renderer.outputColorSpace =
        THREE.SRGBColorSpace;


    // LIGHTING

    // Sky light
	const skyLight = new THREE.HemisphereLight(
		0x87CEEB,
		0x444444,
		1.5
	);

	scene.add(skyLight);


	// Sun light
	const sunLight = new THREE.DirectionalLight(
		0xffffff,
		2
	);

	sunLight.position.set(
		5,
		10,
		5
	);

	sunLight.castShadow = true;

	scene.add(sunLight);


    const keyLight =
        new THREE.DirectionalLight(
            0xffffff,
            4
        );

    keyLight.position.set(
        5,
        8,
        5
    );

    scene.add(keyLight);


    const fillLight =
        new THREE.DirectionalLight(
            0xffffff,
            2
        );

    fillLight.position.set(
        -5,
        3,
        -5
    );

    scene.add(fillLight);


    // CONTROLS

    const controls =
        new OrbitControls(
            camera,
            renderer.domElement
        );

    controls.enableDamping = true;

    controls.dampingFactor = 0.05;

    controls.minDistance = 1;

    controls.maxDistance = 20;

    controls.enablePan = false;


    // LOAD MODEL

    loader.load(

        data.file,

        function(gltf) {

            const model =
                gltf.scene;

            scene.add(model);
			
			model.rotation.y = Math.PI;

            // Calculate size

            const box =
                new THREE.Box3()
                    .setFromObject(model);

            const center =
                box.getCenter(
                    new THREE.Vector3()
                );

            const size =
                box.getSize(
                    new THREE.Vector3()
                );


            const maxDimension =
                Math.max(
                    size.x,
                    size.y,
                    size.z
                );


            // Center model

            model.position.sub(
                center
            );


            // Camera

            camera.position.set(
                maxDimension * 1.5,
                maxDimension * 0.8,
                maxDimension * 1.5
            );


            controls.target.set(
                0,
                0,
                0
            );

            controls.update();

        },

        undefined,

        function(error) {

            console.error(
                "Failed to load:",
                data.file,
                error
            );

        }

    );


    // ANIMATION

    function animate() {

        requestAnimationFrame(
            animate
        );

        controls.update();

        renderer.render(
            scene,
            camera
        );

    }

    animate();


    // RESIZE

    function resize() {

        const width =
            canvas.clientWidth;

        const height =
            canvas.clientHeight;


        camera.aspect =
            width / height;

        camera.updateProjectionMatrix();


        renderer.setSize(
            width,
            height,
            false
        );

    }


    window.addEventListener(
        "resize",
        resize
    );

}


models.forEach(
    createViewer
);