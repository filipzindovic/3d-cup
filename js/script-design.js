var designCanvas = new fabric.Canvas("c", {backgroundColor: "#fff"});

function updateCanvas(jscolor) {

    designCanvas.backgroundColor = `#${jscolor}`;
    designCanvas.renderAll();

}

document.getElementById('user_file').addEventListener("change", function (e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.onload = function (f) {
    var data = f.target.result;                    
    fabric.Image.fromURL(data, function (img) {
      var oImg = img.set().scale(0.4);  
      designCanvas.add(oImg).renderAll();
      var a = designCanvas.setActiveObject(oImg);
      var dataURL = designCanvas.toDataURL({format: 'png', quality: 1});
    });
  };
  reader.readAsDataURL(file);
});

function updateDesignCanvas() {
    var dataUrl = designCanvas.toDataURL();
    return dataUrl;
}

document.getElementById("preview-button").addEventListener("click", function() {
    
    create3dScene(updateDesignCanvas());
    
    document.getElementById("preview-container").style.visibility = "visible";
    
});

document.getElementById("close-button").addEventListener("click", function() {
    
    document.getElementById("preview-container").style.visibility = "hidden";

});

    
