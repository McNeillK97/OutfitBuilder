window.onload=init;
var hairCount = 5;
var topCount = 7;
var bottomCount = 5;

var hairArray = [];
var topArray = [];
var bottomArray = [];


function init()
{
    console.log("window has loaded");
    loadOutfit();
    loadProfile();
}

var state = {
    hairS : 0,
    topS:0,
    bottomS:0
};

class Hair {
    constructor(imageID, picture) {
        this.imageId = imageID;
        this.picture = picture;
    }
}

class Top {
    constructor(imageID, picture) {
        this.imageId = imageID;
        this.picture = picture;
    }
}

class Bottom {
    constructor(imageID, picture) {
        this.imageId = imageID;
        this.picture = picture;
    }
}

class Outfit{
    constructor(h, t, b, u, v){
        this.hair = h;
        this.top = t;
        this.bottom = b;
        this.votes = v;
        this.userID = u;
    }
}

function loadOutfit(){
    for(x = 0; x < hairCount; x++){
        hairImg = new Image
        hairImg.src = '/Images/Outfit/Hair' + x + '.png';
        tempHair = new Hair(x, hairImg.src);
        hairArray.push(tempHair);
    }

    for(x = 0; x < topCount; x++){
        topImg = new Image
        topImg.src = '/Images/Outfit/Top' + x + '.png';
        tempTop = new Top(x, topImg.src);
        topArray.push(tempTop);
    }

    for(x = 0; x < bottomCount; x++){
        bottomImg = new Image
        bottomImg.src = '/Images/Outfit/Bottom' + x + '.png';
        tempBottom = new Bottom(x, bottomImg.src);
        bottomArray.push(tempBottom);
    }
}

function loadProfile(){
    hair1ID = getCookie("hairID1");
    top1ID = getCookie("topID1");
    bottom1ID = getCookie("bottomID1");
    var img = document.getElementById("hair1");
    img.setAttribute("src", hairArray[hair1ID].picture);
    var img = document.getElementById("top1");
    img.setAttribute("src", topArray[top1ID].picture);
    var img = document.getElementById("bottom1");
    img.setAttribute("src", bottomArray[bottom1ID].picture);



    hair2ID = getCookie("hairID2");
    top2ID = getCookie("topID2");
    bottom2ID = getCookie("bottomID2");
    var img = document.getElementById("hair2");
    img.setAttribute("src", hairArray[hair2ID].picture);
    var img = document.getElementById("top2");
    img.setAttribute("src", topArray[top2ID].picture);
    var img = document.getElementById("bottom2");
    img.setAttribute("src", bottomArray[bottom2ID].picture);

    hair3ID = getCookie("hairID3");
    top3ID = getCookie("topID3");
    bottom3ID = getCookie("bottomID3");
    var img = document.getElementById("hair3");
    img.setAttribute("src", hairArray[hair3ID].picture);
    var img = document.getElementById("top3");
    img.setAttribute("src", topArray[top3ID].picture);
    var img = document.getElementById("bottom3");
    img.setAttribute("src", bottomArray[bottom3ID].picture);

    hair4ID = getCookie("hairID4");
    top4ID = getCookie("topID4");
    bottom4ID = getCookie("bottomID4");
    var img = document.getElementById("hair4");
    img.setAttribute("src", hairArray[hair4ID].picture);
    var img = document.getElementById("top4");
    img.setAttribute("src", topArray[top4ID].picture);
    var img = document.getElementById("bottom4");
    img.setAttribute("src", bottomArray[bottom4ID].picture);
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }