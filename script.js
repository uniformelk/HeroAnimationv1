var scene;
var camera;
var renderer;

var earthMesh;
var cloudMesh;
const canvas = document.querySelector('.hero');
var directionalLight;
var ambientLight;

var createDirectionalLight = function() {
    directionalLight = new THREE.DirectionalLight(0xffffff, .8);
    directionalLight.position.set(-100,500,600);
    directionalLight.name='directional';
    scene.add(directionalLight);
};


var createAmbientLight = function() {
    ambientLight = new THREE.AmbientLight(0xffffff, .1);
    ambientLight.name='ambient';
    scene.add(ambientLight);
};


var createEarthMaterial = function() {
    var earthTexture = new THREE.TextureLoader().load("models/textures/earthmap4k2.jpg");
    var normalMap = new THREE.TextureLoader().load("models/textures/earth_normalmap_flat4k.jpg");
    var specularMap = new THREE.TextureLoader().load("models/textures/earthspec4k.jpg");
    var iluminationMap = new THREE.TextureLoader().load("models/textures/Earth_Illumination_6K.jpg");
    var earthMaterial = new THREE.MeshPhongMaterial();
    earthMaterial.map = earthTexture;
    earthMaterial.normalMap = normalMap;
    earthMaterial.normalScale.set(0.5, 0.7);
    earthMaterial.specularMap = specularMap;
    earthMaterial.specular = new THREE.Color(0x262626);
    earthMaterial.iluminationMap = iluminationMap;
    earthMaterial.shininess = 5;
    earthMaterial.transparent= true;
    earthMaterial.combine = 1;
    return earthMaterial;

};

var createCloudMaterial = function() {
    var cloudTexture = new THREE.TextureLoader().load("models/textures/fair_clouds_4k.png");
    var cloudMaterial = new THREE.MeshPhongMaterial();
    cloudMaterial.map = cloudTexture;
    cloudMaterial.transparent = true;
    return cloudMaterial;
};
var createLightMaterial = function() {
    var lightTexture = new THREE.TextureLoader().load("models/textures/test.png");
    var lightMaterial = new THREE.MeshPhongMaterial();
    lightMaterial.map = lightTexture;
    lightMaterial.color = new THREE.Color(0xffffff);
    lightMaterial.transparent = true;
    lightMaterial.opacity = .3;
    lightMaterial.side = THREE.DoubleSide;
    return lightMaterial;
};

var createGreenMapMaterial = function() {
    var greenMapTexture = new THREE.TextureLoader().load('models/textures/green-map.png');
    var greenMapMaterial = new THREE.MeshPhongMaterial();
    greenMapMaterial.map = greenMapTexture;
    greenMapMaterial.opacity = 0;
    greenMapMaterial.transparent = true;
    return greenMapMaterial;
};
var createBluePointsMaterial = function() {
    var bluePointsTexture = new THREE.TextureLoader().load('models/textures/blue-points-map.png');
    var bluePointsMaterial = new THREE.MeshPhongMaterial();
    bluePointsMaterial.map = bluePointsTexture;
    bluePointsMaterial.opacity = 0;
    bluePointsMaterial.transparent = true;
    return bluePointsMaterial;
};

var createASphere = function() {
    var sphereGeometry = new THREE.SphereGeometry(15, 60, 60);
    var sphereMaterial = this.createEarthMaterial();
    earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    earthMesh.name = 'earth';
    earthMesh.position.set(transformEarth[0].positionX, transformEarth[0].positionY, transformEarth[0].positionZ);
    earthMesh.rotation.set(transformEarth[0].rotationX, transformEarth[0].rotationY, transformEarth[0].rotationZ);
    

    var cloudGeometry = new THREE.SphereGeometry(15, 60, 60);
    var cloudMaterial = this.createCloudMaterial();
    cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloudMesh.name = 'clouds';
    cloudMesh.position.set(transformEarth[0].positionX, transformEarth[0].positionY, transformEarth[0].positionZ);
    cloudMesh.rotation.set(transformEarth[0].rotationX, transformEarth[0].rotationY, transformEarth[0].rotationZ);
    

    var lightGeometry = new THREE.SphereGeometry(15.4, 20, 20);
    var lightMaterial = this.createLightMaterial();
    lightMesh = new THREE.Mesh(lightGeometry, lightMaterial);
    lightMesh.name = 'lights';
    lightMesh.position.set(transformEarth[0].positionX, transformEarth[0].positionY, .01);
    

    var greenMapGeometry = new THREE.SphereGeometry(15, 60, 60);
    var greenMapMaterial = this.createGreenMapMaterial();
    greenMapMesh = new THREE.Mesh(greenMapGeometry, greenMapMaterial);
    greenMapMesh.name = 'greenMaps';
    greenMapMesh.position.set(transformEarth[0].positionX, transformEarth[0].positionY, transformEarth[0].positionZ);
    greenMapMesh.rotation.set(transformEarth[0].rotationX, transformEarth[0].rotationY, transformEarth[0].rotationZ);

    scene.add(greenMapMesh);
    scene.add(earthMesh);
    scene.add(cloudMesh);
    scene.add(lightMesh);
    
    
    var bluePointsGeometry = new THREE.SphereGeometry(15.2, 60, 60);
    var bluePointsMaterial = this.createBluePointsMaterial();
    bluePointsMesh = new THREE.Mesh(bluePointsGeometry, bluePointsMaterial);
    bluePointsMesh.name = 'bluePointss';
    bluePointsMesh.position.set(transformEarth[0].positionX, transformEarth[0].positionY, transformEarth[0].positionZ);
    bluePointsMesh.rotation.set(transformEarth[0].rotationX, transformEarth[0].rotationY, transformEarth[0].rotationZ);
    
    scene.add(greenMapMesh);
    scene.add(earthMesh);
    scene.add(cloudMesh);
    scene.add(lightMesh);
    
    // scene.add(bluePointsMesh);

   
    // scene.add(universeMesh);
    
};


var init = function() {
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize( window.innerWidth, 800 );


    this.createASphere();

    this.createAmbientLight();
    this.createDirectionalLight();

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 50;
    camera.lookAt(scene.position);


   canvas.appendChild( renderer.domElement );

    this.render();
    console.log(scene);
};

var render = function() {
    // cloudMesh.rotation.y += 0.001*1.1;
    requestAnimationFrame( render );
    renderer.render( scene, camera );
};


window.onload = this.init;

// window.addEventListener('resize', function() {
//     renderer.setSize(window.innerWidth, 800);
//     camera.aspect = window.innerWidth / 800;
//     camera.updateProjectionMatrix();
// }
// );
const transformEarth = [
    {
        positionX: 0,
        positionY: -25,
        positionZ: 0,
        rotationX: 12.3,
        rotationZ: 0,
        rotationY: 10.5
    },
    {
        positionX: 10,
        positionY: 2,
        positionZ: 0,
        rotationX: 2,
        rotationZ: 2,
        rotationY: 10.4
    }
]
const transformUniverse = [
    {
        positionX: 0,
        positionY: 0,
        positionZ: 0
    },
    {
        positionX: -30,
        positionY: -22,
        positionZ: 80,
        rotationX: 2,
        rotationZ: 2,
        rotationY: 0
    },
    {
        positionZ: 40
    }
]
document.addEventListener('DOMContentLoaded', () => {
    const cardClick1 = document.querySelector('#cardClick1');
    const hero = document.querySelector('.hero');
    if(cardClick1){
        cardClick1.addEventListener('click', (e) => {
            if (!!camera) {
                tl = gsap.timeline({defaults: {ease: 'power2.inOut'}})
                gsap.to(
                    camera.position, {
                    duration: 3,
                    ease: 'power2.inOut',
                    x: transformUniverse[1].positionX,
                    y: transformUniverse[1].positionY,
                    z: transformUniverse[1].positionZ
                }
                )
                gsap.to(
                    greenMapMesh.material, {
                    duration: 3,
                    ease: 'power2.inOut',
                    delay: .2,
                    opacity: 1
                    }
                );
                gsap.to(
                    hero.classList, {
                    duration: 3,
                    ease: 'power2.inOut',
                    delay: .2,
                    add: 'animate'
                    }
                );
                // gsap.to(
                //     cloudMesh.rotation, {
                //         duration: 8,
                //         ease: 'power2.inOut',
                //         delay: 2,
                //         y: transformEarth[1].rotationY,
                //     }
                // )
                gsap.to(
                    camera.position, {
                        duration: 3,
                        ease: 'power2.inOut',
                        delay: 8,
                        z: transformUniverse[2].positionZ,
                    }
                )
                gsap.to(
                    cloudMesh.material, {
                        duration: 3,
                        ease: 'power2.inOut',
                        delay: 8,
                        opacity: 0,
                    }
                )
                gsap.to(
                    earthMesh.material, {
                        duration: 3,
                        ease: 'power2.inOut',
                        delay: 8,
                        opacity: 0,
                    }
                )
                gsap.to(
                    hero.classList, {
                        duration: 4,
                        ease: 'power2.inOut',
                        delay: 8.5,
                        add: 'animateLeft',
                    }
                )
                gsap.to(
                    greenMapMesh.material, {
                        duration: 3,
                        ease: 'power2.inOut',
                        delay: 10,
                        opacity: 0
                    }
                )
                gsap.to(
                    lightMesh.material, {
                        duration: 3,
                        ease: 'power2.inOut',
                        delay: 10,
                        opacity: 0
                    }
                )
                setTimeout(() => {
                    window.location.href = 'https://google.com';
                }, 12000);
            }
        });
    } 
});

// document.addEventListener('keydown', function(event) {
//         if (event.keyCode === 39) {
//             gsap.to(
//                 ambientLight.rotation, {
//                 duration: 1,
//                 ease: 'power2.inOut',
//                 z: transformEarth[1].positionX-= 1,
//                 }
//             )
//         }
//         if (event.keyCode === 37) {
//             gsap.to(
//                 ambientLight.rotation, {
//                 duration: 1,
//                 ease: 'power2.inOut',
//                 z: transformEarth[1].positionX+= 1,
//                 }
//             )
//         }
//         if (event.keyCode === 38) {
//             gsap.to(
//                 ambientLight.rotation, {
//                 duration: 1,
//                 ease: 'power2.inOut',
//                 x: transformEarth[1].positionX-= 1,
//                 }
//             )
//         }
//         if (event.keyCode === 40) {
//             console.log('abajo')
//             gsap.to(
//                 ambientLight.rotation, {
//                 duration: 1,
//                 ease: 'power2.inOut',
//                 x: transformEarth[1].positionX+= 1,
//                 }
//             )
//         }
//         console.log(ambientLight.rotation);
//     });