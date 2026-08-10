import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const models = [
    {
        canvas: "viewer1",
        loading: "loading1",
        file: "./models/model1.glb"
    },

    {
        canvas: "viewer2",
        loading: "loading2",
        file: "./models/model2.glb"
    },

    {
        canvas: "viewer3",
        loading: "loading3",
        file: "./models/model3.glb"
    }
];


const loader = new GLTFLoader();


function createViewer(data) {

    const canvas = document.getElementById(data.canvas);

    const loading = document.getElementById(data.loading);


    /* SCENE */

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x080809);


    /* CAMERA */

    const camera = new THREE.PerspectiveCamera(
        45,
        canvas.clientWidth / canvas.clientHeight,
        0.01,
        1000
    );

    camera.position.set(3, 2, 5);


    /* RENDERER */

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


    /* LIGHTING */

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


    /* CONTROLS */

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


    /* LOAD MODEL */

    loader.load(

        data.file,

        function(gltf) {

            const model = gltf.scene;

            scene.add(model);


            /*
             * Automatically calculate
             * model size.
             */

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


            /*
             * Center model
             */

            model.position.sub(center);


            /*
             * Position camera
             */

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


    /* ANIMATION */

    function animate() {

        requestAnimationFrame(animate);

        controls.update();

        renderer.render(
            scene,
            camera
        );

    }

    animate();


    /* RESIZE */

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


/* PRODUCT MODAL */

function openProduct(id) {

    const modal =
        document.getElementById(
            "productModal"
        );

    const title =
        document.getElementById(
            "modalTitle"
        );

    const description =
        document.getElementById(
            "modalDescription"
        );

    const price =
        document.getElementById(
            "modalPrice"
        );


    const products = {

        1: {
            title: "Model One",
            description:
                "Game-ready 3D model with textures.",
            price: "€5.00"
        },

        2: {
            title: "Model Two",
            description:
                "Game-ready 3D model with textures.",
            price: "€5.00"
        },

        3: {
            title: "Model Three",
            description:
                "Game-ready 3D model with textures.",
            price: "€5.00"
        }

    };


    const product =
        products[id];


    title.textContent =
        product.title;

    description.textContent =
        product.description;

    price.textContent =
        product.price;


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