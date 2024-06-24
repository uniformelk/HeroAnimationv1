

document.addEventListener('DOMContentLoaded', () => {
    /**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

/**
 * Loaders
 */
const loadingBarElement = document.querySelector('.loading-bar')
const bodyElement = document.querySelector('body')

const gltfLoader = new THREE.GLTFLoader()

/**
 *  Textures
 */
const textureLoader = new THREE.TextureLoader()

// Scene
const scene = new THREE.Scene()



/**
 * GLTF Model
 */
let world = null

gltfLoader.load(
    'models/world/scene.gltf',
    (gltf) => {
        // console.log(gltf);

        world = gltf.scene

        const radius = 2

        world.position.x = 0;
        world.position.z = 0;
        world.position.y = -5;

        world.rotation.x = Math.PI * 1
        world.rotation.y = Math.PI * 0.15
        world.rotation.z = Math.PI * .5

        world.scale.set(radius, radius, radius)

        scene.add(world)
    },
    (progress) => {
        // console.log(progress);
    },
    (error) => {
        // console.error(error);
    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth -20,
    height: window.innerHeight
}

/**
 * Scroll
 */
// let scrollY = window.scrollY
// let currentSection = 0





/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 7

scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))


/**
 * Animate
 */
const clock = new THREE.Clock()
let lastElapsedTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime

    if (!!world) {
        world.position.y = Math.sin(elapsedTime * .2) * .1 - 0.1
        world.opacity = .5
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

/**
 * On Reload
 */
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

const transformWorld = [
    {
        rotationY: Math.PI * 0.15,
        positionX: 2,
        scale: 1.2
    },
    {
        rotationZ: 0.0314,
        positionX: 4,
        positionY: 0,
        scale: 2
    },  
]

    const card1 = document.querySelector('#card1');
    const card2 = document.querySelector('#card2');
    const cardClick1 = document.querySelector('#cardClick1');
    const cardClick2 = document.querySelector('#cardClick2');
    const hero = document.querySelector('.hero');

    if(cardClick1){
        cardClick1.addEventListener('click', (e) => {
            canvas.classList.add('zoomOut');
            hero.classList.add('animate');
            if (!!world) {
                gsap.to(
                world.rotation, {
                    duration: 2,
                    ease: 'power2.inOut',
                    y: transformWorld[0].rotationY,
                    
                }
                )
                gsap.to(
                world.position, {
                    duration: 3,
                    ease: 'power2.inOut',
                    x: transformWorld[0].positionX,
                }
                )
                gsap.to(
                world.scale, {
                    duration: 3,
                    ease: 'power2.inOut',
                    x: transformWorld[0].scale,
                    y: transformWorld[0].scale,
                    z: transformWorld[0].scale
                },
                )
            }
            setTimeout(() => {
                gsap.to(
                    world.position, {
                        duration: 2,
                        ease: 'power2.inOut',
                        x: transformWorld[1].positionX,
                    }
                )
                gsap.to(
                    world.scale, {
                        duration: 2,
                        ease: 'power2.inOut',
                        x: transformWorld[1].scale,
                        y: transformWorld[1].scale,
                        z: transformWorld[1].scale
                    },
                )
                canvas.classList.add('zoomIn');
                hero.classList.add('animateLeft');
            }, 4000);
        });
    }
});