export var GAME_CANVA_WIDTH;;
export var GAME_CANVA_HEIGHT;

if(window.screen.availWidth>window.screen.availHeight){
    GAME_CANVA_WIDTH = window.innerWidth;
    GAME_CANVA_HEIGHT = window.innerHeight;
}else{
    GAME_CANVA_WIDTH = window.screen.availWidth;
    GAME_CANVA_HEIGHT = window.screen.availHeight;
}