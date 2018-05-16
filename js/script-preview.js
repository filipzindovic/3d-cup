var scene, camera, renderer, previewCanvas, controls, loader;

function create3dScene(dataUrl) {
    
    var mesh;
    
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    previewCanvas = document.getElementById("preview-canvas");
    previewCanvas.appendChild( renderer.domElement );
    previewCanvasStyle();
    
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    
    addSkyboxToScene();
    
    addLightToScene();
    
    loadAndAnimateCup(dataUrl);
    
};

function loadAndAnimateCup(dataUrl) {
    
    loader = new THREE.JSONLoader();
    loader.load("js/cup.json", function(geometry, materials) {

        var texture = new THREE.TextureLoader().load( dataUrl );

        var texture2 = new THREE.TextureLoader().load( "js/magnolia.jpg" );

        var texture3 = new THREE.TextureLoader().load( "js/grey.jpg" );

        var material = [];

        material.push( new THREE.MeshLambertMaterial( { map: texture3 } ) );

        material.push( new THREE.MeshLambertMaterial( { map: texture } ) );

        material.push( new THREE.MeshLambertMaterial( { map: texture2 } ) );

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        requestAnimationFrame(animate);

    });
};

function previewCanvasStyle() {
    renderer.domElement.id = "3d-canvas";
    renderer.domElement.style.width = "90%";
    renderer.domElement.style.height = "auto";
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.boxShadow = "2px 2px";
    renderer.domElement.style.top = "5%";
    renderer.domElement.style.left = "5%";
    renderer.domElement.style.border = "2px solid black";
    renderer.domElement.style.zIndex = "2";
};

function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.y += 0.005;

    renderer.render(scene, camera);
};

function addSkyboxToScene() {
    
    var skyboxCubeGeometry = new THREE.CubeGeometry(1000, 1000, 1000);

    var skyboxMaterial = new THREE.MeshBasicMaterial( { color: 0xEBC26E, side: THREE.DoubleSide} );

    var skyboxCube = new THREE.Mesh( skyboxCubeGeometry, skyboxMaterial );
    
    scene.add( skyboxCube );
};

function addLightToScene() {
    var ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.9 );

    scene.add( ambientLight );
}