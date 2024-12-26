//Import three.js
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';

//ORBITCONTROLS allow the camera to move
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';

//GLTFLoader allow for import the .gltf file
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

//TWEEN allow to create animation in camera position
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';


let canvasform= document.getElementById('dCanvas');
let width=canvasform.offsetWidth;
let height=canvasform.offsetHeight;


//Create a threeJS scene
let scene=new THREE.Scene();
//Create Camera
let camera=new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
//Keep the 3d Object - Almacenará el modelo 3D cargado
let object;
//OrbitControls allow the camera to move - La var almacena el objeto que gestiona los controles de la cámara 
let controls;
//Instance a loader for the .gilft file - se instancia un nuevo cargador de modelos en formato .gltf a través de la clase GLTFLoader de Three.js. Este cargador permite importar archivos .gltf o .glb 
let loader = new GLTFLoader();

//load the file
loader.load(
    'free_porsche_911_carrera_4s/scene.gltf',
    function(gltf){ //función de retorno (callback) que se ejecuta una vez que el archivo ha sido cargado correctamente. El parámetro gltf de esta función contiene los datos del modelo cargado.
        //if file loaded add to scene
        object=gltf.scene; //gltf.scene es el objeto 3D que contiene toda la escena (y los objetos dentro de ella)
        scene.add(object); // agrega este objeto a la escena de Three.js. Esto permite que el modelo cargado sea renderizado en la escena.
    }
)

//Create renderer
//Allow background transparent with alpha=true
let renderer=new THREE.WebGLRenderer({
    alpha:true //el fondo del canvas (el área donde se renderiza la escena 3D) será transparente en lugar de tener un color de fondo opaco
}); //Crea una instancia del renderer, que es el componente responsable de renderizar la escena en el canvas. WebGLRenderer es el tipo de renderer utilizado, que emplea WebGL para renderizar gráficos 3D en el navegador.

renderer.setSize(width, height); //Ajusta el tamaño del renderer al ancho y alto definidos anteriormente, que corresponden al tamaño del contenedor donde se renderizará la escena.

//Add the renderer to DOM 
document.getElementById("dCanvas").appendChild(renderer.domElement); //renderer.domElement es el canvas HTML en el que Three.js dibuja la escena. Este es un elemento <canvas> que es creado automáticamente cuando instancias un WebGLRenderer

//set Camera
camera.position.set(5, 0, 1); //x, y, z
//Add controls to the camera - allow the camera to move(rotate, zoom, scroll)
controls=new OrbitControls(camera, renderer.domElement); //camera: Se le pasa la cámara que se moverá. renderer.domElement: Se le pasa el canvas donde se renderiza la escena, lo que permite que los controles respondan a las interacciones del usuario en ese elemento.
//Render the scene
function animate(){ //Se ejecutará continuamente para renderizar la escena y actualizar los movimientos o animaciones.
    requestAnimationFrame(animate);//Llama a la función animate una y otra vez en cada frame (cuadro) de la animación, lo que asegura que se actualice constantemente la escena
    renderer.render(scene, camera); //Dibuja la escena (contenida en la variable scene) en el canvas (usando el renderer), desde la perspectiva de la cámara. Esto es lo que hace que los objetos 3D sean visibles en la pantalla
    TWEEN.update();//Actualiza las animaciones creadas con TWEEN.js (que permite hacer transiciones y animaciones). Si tienes objetos o cámaras animados con TWEEN.js, esta línea actualiza sus posiciones, rotaciones u otros parámetros en cada frame de la animación
}

//inicia el ciclo de renderizado y actualización de la escena. Una vez llamada, requestAnimationFrame asegura que la función se ejecute de forma continua, creando la animación.
animate();