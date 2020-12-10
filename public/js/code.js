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
    state.hairS=0;
    state.topS=0;
    state.bottomS=0;
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

function clearOutfit()
{
    console.log("inside function clear");

    var hairC=document.getElementById("hair");
    var topC=document.getElementById("top");
    var bottomC=document.getElementById("bottom");

    state = {
        hairS : 0,
        topS:0,
        bottomS:0
    };

    hairC.setAttribute("src", hairArray[0].picture); 
    topC.setAttribute("src", topArray[0].picture);; 
    bottomC.setAttribute("src", bottomArray[0].picture);
}

function nextHair()
{
    if(state.hairS < hairCount - 1){
        state.hairS++;
    }else{state.hairS = 0;}
    var img = document.getElementById("hair");
    img.setAttribute("src", hairArray[state.hairS].picture);
    var test = document.getElementById("hairID");
    test.setAttribute('value', state.hairS);
}

function nextTop()
{
    if(state.topS < topCount - 1){
        state.topS++;
    }else{state.topS = 0;}
    var img = document.getElementById("top");
    img.setAttribute("src", topArray[state.topS].picture);
    var test = document.getElementById("topID");
    test.setAttribute('value', state.topS);
}

function nextBottom()
{
    if(state.bottomS < bottomCount - 1){
        state.bottomS++;
    }else{state.bottomS = 0;}
    var img = document.getElementById("bottom");
    img.setAttribute("src", bottomArray[state.bottomS].picture);
    var test = document.getElementById("bottomID");
    test.setAttribute('value', state.bottomS);
}

function prevHair()
{
    if(state.hairS > 0){
        state.hairS--;
    }else{state.hairS = hairCount - 1;}
    var img = document.getElementById("hair");
    img.setAttribute("src", hairArray[state.hairS].picture);
    var test = document.getElementById("hairID");
    test.setAttribute('value', state.hairS);
}

function prevTop()
{
    if(state.topS > 0){
        state.topS--;
    }else{state.topS = topCount - 1;}
    var img = document.getElementById("top");
    img.setAttribute("src", topArray[state.topS].picture);
    var test = document.getElementById("topID");
    test.setAttribute('value', state.topS);
}

function prevBottom()
{
    if(state.bottomS > 0){
        state.bottomS--;
    }else{state.bottomS = bottomCount - 1;}
    var img = document.getElementById("bottom");
    img.setAttribute("src", bottomArray[state.bottomS].picture);
    var test = document.getElementById("bottomID");
    test.setAttribute('value', state.bottomS);
}

function saveOutfit()
{
    saveH = state.hairS;
    saveT = state.topS;
    saveB = state.bottomS;
    let data = saveH + ' ' + saveT + ' ' + saveB;
    return data
}