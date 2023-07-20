import { GAME_CANVA_HEIGHT } from "../GameOperatingClasses/constant.js";
import { GAME_CANVA_WIDTH } from "../GameOperatingClasses/constant.js";
import { getRandomIntInclusive } from "../GameOperatingClasses/auxFuncs.js";
import { GraphicElement } from "./GraphicElement.js";
import { GAMEPLAY_SCALE } from "./constants.js";

const SHADOW_W = [
    20*GAMEPLAY_SCALE,
    29*GAMEPLAY_SCALE,
    30*GAMEPLAY_SCALE,
    44*GAMEPLAY_SCALE,
    55*GAMEPLAY_SCALE,
    95*GAMEPLAY_SCALE
];
const SHADOW_H = [
    21*GAMEPLAY_SCALE,
    25*GAMEPLAY_SCALE,
    26*GAMEPLAY_SCALE,
    47*GAMEPLAY_SCALE,
    44*GAMEPLAY_SCALE,
    62*GAMEPLAY_SCALE
];

const GRASS_W = [
    5*GAMEPLAY_SCALE,
    9*GAMEPLAY_SCALE,
    5*GAMEPLAY_SCALE,
    8*GAMEPLAY_SCALE,
    6*GAMEPLAY_SCALE,
    5*GAMEPLAY_SCALE
];
const GRASS_H = [
    6*GAMEPLAY_SCALE,
    6*GAMEPLAY_SCALE,
    7*GAMEPLAY_SCALE,
    5*GAMEPLAY_SCALE,
    10*GAMEPLAY_SCALE,
    8*GAMEPLAY_SCALE
];

export class DecorGraphics{
    gameplayUI;
    elements;
    shadows;
    grass;
    

    constructor(gameplayUI){
        this.gameplayUI = gameplayUI;
        this.shadows = [];
        this.grass = [];
        for(let i = 1; i<7 ; i++){
            this.shadows[i-1] = new Image();
            this.shadows[i-1].src = "./res/Shadow/" + i + ".png";
            this.grass[i-1] = new Image();
            this.grass[i-1].src = "./res/Grass/" + i + ".png";
        }

        this.initElements();
    }

    initElements(){
        this.elements = [];
        let numberOfElements = GAME_CANVA_WIDTH*10;
        let x;
        let y;
        let randomIndex;

        for(let i = 0; i<numberOfElements/10; i++){
            x = getRandomIntInclusive (0 - GAME_CANVA_WIDTH*4, GAME_CANVA_WIDTH*5);
            y = getRandomIntInclusive(0 - GAME_CANVA_HEIGHT*4, GAME_CANVA_HEIGHT*5);
            randomIndex = getRandomIntInclusive(0,2);

            this.elements[i] = new GraphicElement(x, y, SHADOW_W[randomIndex], SHADOW_H[randomIndex], this.shadows[randomIndex]);
        }
        for(let i = numberOfElements/10; i<numberOfElements; i++){
            x = getRandomIntInclusive (0 - GAME_CANVA_WIDTH*4, GAME_CANVA_WIDTH*5);
            y = getRandomIntInclusive(0 - GAME_CANVA_HEIGHT*4, GAME_CANVA_HEIGHT*5);
            randomIndex = getRandomIntInclusive(0,5);

            this.elements[i] = new GraphicElement(x, y, GRASS_W[randomIndex], GRASS_H[randomIndex], this.grass[randomIndex]);
        }
    }

    draw(){
        for(let i = 0; i<this.elements.length - 1 ; i++){
            this.elements[i].draw(this.gameplayUI.context, this.gameplayUI.offsetX, this.gameplayUI.offsetY);
        }
    }
}