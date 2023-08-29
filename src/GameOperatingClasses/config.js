export var GAME_CANVA_WIDTH;;
export var GAME_CANVA_HEIGHT;
export var mapIsVisible = true;
export var mobileMode = false;

export function disableMap(){
    mapIsVisible = false;
}

export function enableMobileMode(){
    mobileMode = true;
}

if(window.screen.availWidth>window.screen.availHeight){
    GAME_CANVA_WIDTH = window.innerWidth;
    GAME_CANVA_HEIGHT = window.innerHeight;
}else{
    GAME_CANVA_WIDTH = window.screen.availWidth;
    GAME_CANVA_HEIGHT = window.screen.availHeight;
}