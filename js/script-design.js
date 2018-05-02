var previewClicked = false;

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
      if (mobileScale) {
        var oImg = img.set().scale(0.1);  
      } else {
        var oImg = img.set().scale(0.4);  
      }
      designCanvas.add(oImg).renderAll();
      var a = designCanvas.setActiveObject(oImg);
      var dataURL = designCanvas.toDataURL({format: 'png', quality: 1});
    });
  };
  reader.readAsDataURL(file);
});

document.getElementById("preview-button").addEventListener("click", function() {
    var dataUrl = designCanvas.toDataURL();
    var cupColour = Number(`0x${document.getElementById("chosen-cup-colour").value}`);
    previewClicked = true;
    initialise(dataUrl, cupColour);
});
    
