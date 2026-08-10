import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const models = [
    {
        canvas: "viewer1",
        loading: "loading1",
        file: "/Jasper-3D-Models/models/FerrariF40.glb"
    },

    {
        canvas: "viewer2",
        loading: "loading2",
        file: "/Jasper-3D-Models/models/Basketball.glb"
    },

    {
        canvas: "viewer3",
        loading: "loading3",
        file: "/Jasper-3D-Models/models/Chair.glb"
    }
];


const loader = new GLTFLoader();


function createViewer(data) {

    const canvas = document.getElementById(data.canvas);
    const loading = document.getElementById(data.loading);

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x080809);

    const camera = new THREE.PerspectiveCamera(
        45,
        canvas.clientWidth / canvas.clientHeight,
        0.01,
        1000
    );

    camera.position.set(3, 2, 5);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: false
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        canvas.clientWidth,
        canvas.clientHeight,
        false
    );

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const ambientLight =
        new THREE.HemisphereLight(
            0xffffff,
            0x222222,
            3
        );

    scene.add(ambientLight);


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

    loader.load(

        data.file,

        function(gltf) {

            const model = gltf.scene;

            scene.add(model);

            const box =
                new THREE.Box3().setFromObject(model);

            const center =
                box.getCenter(new THREE.Vector3());

            const size =
                box.getSize(new THREE.Vector3());


            const maxDimension =
                Math.max(
                    size.x,
                    size.y,
                    size.z
                );

            model.position.sub(center);

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

            loading.style.display = "none";

        },

        function(progress) {

            if (progress.total > 0) {

                const percent =
                    Math.round(
                        (progress.loaded /
                        progress.total) * 100
                    );

                loading.textContent =
                    `Loading ${percent}%`;

            }

        },

        function(error) {

            console.error(
                "Failed to load:",
                data.file,
                error
            );

            loading.textContent =
                "Failed to load model";

        }

    );

    function animate() {

        requestAnimationFrame(animate);

        controls.update();

        renderer.render(
            scene,
            camera
        );

    }

    animate();

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


models.forEach(createViewer);

function openProduct(id) {

    const modal =
        document.getElementById(
            "productModal"
        );

    const title =
        document.getElementById(
            "modalTitle"
        );


    const products = {

        1: {
            title: "Model One"
        },

        2: {
            title: "Model Two"
        },

        3: {
            title: "Model Three"
        }

    };


    const product =
        products[id];


    title.textContent =
        product.title;


    modal.classList.add(
        "active"
    );

}


function closeProduct() {

    document
        .getElementById("productModal")
        .classList.remove("active");

}


window.openProduct = openProduct;
window.closeProduct = closeProduct;