if (/Mobi/i.test(navigator.userAgent)) {
    // mobile!
    console.log("MOBILE!!!");
    var pMobile = document.createElement("p");
    pMobile.id = "p-mobile";
    pMobile.innerHTML = "HELLOOOOOOOOOO!!!";
    document.body.appendChild(pMobile);
    
    var mobileScale = true;
    
} else {
    console.log("Computer");

}