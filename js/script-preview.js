function initialise(dataUrl, cupColour) {
    
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

//    var light = new THREE.SpotLight( 0xffffff, 0.3 );
//    light.position.set( 1000, 1000, 0 );
//    scene.add( light );
//
//    var light2 = new THREE.SpotLight( 0xffffff, 0.3 );
//    light2.position.set( -1000, 1000, 0 );
//    scene.add( light2 );
//
//    var light3 = new THREE.SpotLight( 0xffffff, 0.3 );
//    light3.position.set( 1000, -1000, 0 );
//    scene.add( light3 );
//
//    var light4 = new THREE.SpotLight( 0xffffff, 0.3 );
//    light4.position.set( -1000, -1000, 0 );
//    scene.add( light4 );
//
//    var light5 = new THREE.SpotLight( 0xffffff, 0.3 );
//    light5.position.set( 0, -1000, 1000 );
//    scene.add( light5 );
//
//    var light6 = new THREE.SpotLight( 0xffffff, 0.3 );
//    light6.position.set( 0, 1000, -1000 );
//    scene.add( light6 );
//
//    var light7 = new THREE.SpotLight( 0xffffff, 0.3 );
//    light7.position.set( 0, -1000, -1000 );
//    scene.add( light7 );
//
//    var light8 = new THREE.SpotLight( 0xffffff, 0.3 );
//    light8.position.set( 0, 1000, 1000 );
//    scene.add( light8 );
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    var designContainer = document.getElementById("design-container");
    
    var threeDCanvasDiv = document.createElement("div");
    threeDCanvasDiv.id = "preview-container"
    threeDCanvasDiv.style.width = "85vw";
    designContainer.parentNode.insertBefore(threeDCanvasDiv, designContainer.nextSibling);
    
    var buttonDiv = document.createElement("div");
    buttonDiv.id = "button-div";
    threeDCanvasDiv.appendChild(buttonDiv);

    //X button
    exitButton = document.createElement("button");
    exitButton.id = "exit-button";
    exitButton.text = "X";
    
    //X button style
    exitButton.style.width = "30px";
    exitButton.style.height = "30px";
    exitButton.style.cursor = "pointer";
    exitButton.style.display = "block";
    exitButton.style.position = "fixed";
    exitButton.innerHTML = "X";
    exitButton.style.backgroundColor = "red";
    
    buttonDiv.appendChild(exitButton);
    
    
    var previewDiv = document.createElement("div");
    previewDiv.id = "preview-div";
    threeDCanvasDiv.appendChild(previewDiv);
    
    
    //Canvas Style
    renderer.domElement.id = "3d-canvas";
    renderer.domElement.style.width = "80vw";
    renderer.domElement.style.height = "auto";
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.boxShadow = "2px 2px";
    renderer.domElement.style.top = "8vh";
    renderer.domElement.style.left = "9vw";
    renderer.domElement.style.border = "2px solid black";
//    renderer.domElement.style.display = "block";
//    renderer.domElement.style.float = "left";
    
    previewDiv.appendChild( renderer.domElement );
    

    document.getElementById("exit-button").addEventListener("click", function() {
        
         document.getElementById("exit-button").style.display = "none";
        document.getElementById("3d-canvas").style.display = "none";
    
    });
    
    var controls = new THREE.OrbitControls( camera, renderer.domElement );

    var loader = new THREE.JSONLoader();
    loader.load("js/cup.json", handle_load);

    var mesh;

    function handle_load(geometry, materials) {
        
        var skyboxCubeGeometry = new THREE.CubeGeometry(1000, 1000, 1000);
        
    var skyboxMaterial = new THREE.MeshBasicMaterial( { color: 0xEBC26E, side: THREE.DoubleSide} );
    
    var skyboxCube = new THREE.Mesh( skyboxCubeGeometry, skyboxMaterial );
    
    var ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.9 );
    
    scene.add( skyboxCube );
    
    scene.add( ambientLight );

        var texture = new THREE.TextureLoader().load( dataUrl );
        
        var texture2 = new THREE.TextureLoader().load( "js/magnolia.jpg" );
        
        var texture3 = new THREE.TextureLoader().load( "js/grey.jpg" );

        var material = [];
        
        material.push( new THREE.MeshLambertMaterial( { map: texture3 } ) );

        material.push( new THREE.MeshLambertMaterial( { map: texture } ) );

        material.push( new THREE.MeshLambertMaterial( { map: texture2 } ) );

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        camera.position.z = 5;

    };

    var animate = function () {
        requestAnimationFrame(animate);

                mesh.rotation.y += 0.01;

        renderer.render(scene, camera);
    };

    animate();

};


if (previewClicked) {
    
    console.log("Hello!");
        
    document.getElementById("exit-button").addEventListener("click", function() {
        
//        document.getElementById("button-div").removeChild("exit-button");
//        document.getElementById("preview-div").removeChild("3d-canvas");
        
         document.getElementById("exit-button").style.display = "none";
        document.getElementById("3d-canvas").style.display = "none";
        
        console.log("Hello!")
    
    })
    
}