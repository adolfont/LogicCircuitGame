import {CLICK_AREA_W} from "./GameplayUi.js";
import {CLICK_AREA_H} from "./GameplayUi.js";
import { GAME_CANVA_HEIGHT } from "../GameOperatingClasses/config.js";
import { GAME_CANVA_WIDTH } from "../GameOperatingClasses/config.js";
import {GameplayUi} from "./GameplayUi.js";
import { GameplayState } from "../GameOperatingClasses/States/GameplayState.js";
import { SCALE_RELATIVE_TO_GAMEPLAY } from "./constants.js";
import {OFFSET_WIDTH} from "./GameplayMapUI.js";
import {OFFSET_HEIGTH} from "./GameplayMapUI.js";

var interval;
var lastXMousePos = 0;
var lastYMousePos = 0;
var intervalNumber = 0;
var clientX = 0;
var clientY = 0;

export function canvaGamaplayHandleClick(event, gameplayState){
    let clickX = event.offsetX;
    let clickY = event.offsetY;
    let gui = gameplayState.gameplayGui

    gameplayState.mapUi.releaseFocus();
    gameplayState.gameplayGui.requestFocus();

    /*Se a posição do mouse está dento dos limites dos botões de atalho*/
    if(clickX > gui.shortcutUI.outputButton.x && clickX < gui.shortcutUI.outputButton.x + gui.shortcutUI.outputButton.w
        && clickY > gui.shortcutUI.outputButton.y && clickY < gui.shortcutUI.outputButton.y + gui.shortcutUI.outputButton.h){
            
        if(gui.currentNode.output != null){
            gui.setCurrentNode(gui.currentNode.output);
            gui.executeShortcut();
        }
    }else if(clickX > gui.shortcutUI.LinputButton.x && clickX < gui.shortcutUI.LinputButton.x + gui.shortcutUI.LinputButton.w
        && clickY > gui.shortcutUI.LinputButton.y && clickY < gui.shortcutUI.LinputButton.y + gui.shortcutUI.LinputButton.h){
        
        if(gui.currentNode.Linput != null){
            gui.setCurrentNode(gui.currentNode.Linput);
            gui.executeShortcut();
        }
    }else if(clickX > gui.shortcutUI.RinputButton.x && clickX < gui.shortcutUI.RinputButton.x + gui.shortcutUI.RinputButton.w
        && clickY > gui.shortcutUI.RinputButton.y && clickY < gui.shortcutUI.RinputButton.y +  gui.shortcutUI.RinputButton.h){
 
        if(gui.currentNode.Rinput != null){
            gui.setCurrentNode(gui.currentNode.Rinput);
            gui.executeShortcut();
        }
    }
    
    for(let i = 0 ; i < gameplayState.gameTree.G.length ; i++){
        /*Se a posição do mouse está dentro dos limites de uma porta*/
        if(clickX > gameplayState.gameTree.G[i].x - CLICK_AREA_W/2 && clickX < gameplayState.gameTree.G[i].x + CLICK_AREA_W/2
            && clickY > gameplayState.gameTree.G[i].y && clickY < gameplayState.gameTree.G[i].y + CLICK_AREA_H){
            
            interval = null;
            if(gui.denielButton.press){
                gameplayState.gameTree.G[i].denielApply();
                gui.denielButton.pinManager.subDenielPin();
            }else if(gameplayState.gameTree.G[i].mod){
                gameplayState.gameTree.G[i].modify();
                gui.setCurrentNode(gameplayState.gameTree.G[i]);
            }
        }
    }

        
    if(gui.denielButton.x<clickX && gui.denielButton.w + gui.denielButton.x>clickX && gui.denielButton.y<clickY && gui.denielButton.h + gui.denielButton.y>clickY){
        gui.denielButton.callback();
    }else if(gui.denielButton.press == true){
        gui.denielButton.callback();
    }


}

function handleMouseDownInterval(){

}

export function handleMouseUp(){
    clearInterval(interval)
    intervalNumber = 0
    console.log("mouseUp!")
}

export function handleMouseDown(gui, e){

    if(e.buttons==1 || e.type == "touchstart"){
        console.log("mousedown");

        interval = setInterval(function(){
            let diffoffsetX = 0;
            let diffoffsetY = 0;    

            /*
            A diferença entre a posição anterior do toque e a posição mais recente do toque
            não deverá ser maior que 30. Dessa forma são impedidos de acontecer
            grandes saltos na camera. Sem essas restrições algumas posições de touch
            são dadas erradas (acredito que por uma limitação de hardware (??)).
            */
            if(lastXMousePos == 0 && lastYMousePos == 0
                || (clientX - lastXMousePos) > 30 || (clientX - lastXMousePos) < -30
                || (clientY - lastYMousePos) > 30 || (clientY - lastYMousePos) < -30){
                lastXMousePos = clientX;
                lastYMousePos = clientY;
            }else{
                diffoffsetX = clientX - lastXMousePos;
                diffoffsetY = clientY - lastYMousePos;
                gui.offsetX -= diffoffsetX;
                gui.offsetY -= diffoffsetY;
                
                lastXMousePos = clientX;
                lastYMousePos = clientY;

                    
                console.log(clientX);    
            }
            
        }, 10);
    }
}

export function canvaGamaplayHandleMove(event, gui){
    let mousePositionX =  event.offsetX;
    let mousePositionY = event.offsetY;
    clientX = mousePositionX;
    clientY = mousePositionY; 

    if(event.type == "touchmove"){
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    }

    if(gui.denielButton.press){
        gui.denielPin.updateDenielPinPos(mousePositionX,mousePositionY);
    }


    if(gui.inCutScene != true){
        if(mousePositionX >= GAME_CANVA_WIDTH*0.95){
            gui.horizontalPositiveMove= true;
        }else{
            gui.horizontalPositiveMove= false;
        }
        
        if(mousePositionX<= GAME_CANVA_WIDTH*0.05){
            gui.horizontalNegativeMove = true;
        }else{
            gui.horizontalNegativeMove = false;
        }
    
        if(mousePositionY >= GAME_CANVA_HEIGHT*0.95){
            gui.verticalPositiveMove= true;
        }else{
            gui.verticalPositiveMove= false;
        }
        
        if(mousePositionY<= GAME_CANVA_HEIGHT*0.05){
            gui.verticalNegativeMove = true;
        }else{
            gui.verticalNegativeMove = false;
        }
    }
}

export function canvaMiniMapHandleClick(event, state){
    if(!state.mapUi.focus){
        state.mapUi.requestFocus();
        state.gameplayGui.releaseFocus();
        state.gameplayGui.stopCam();
    }else{
        state.mapUi.releaseFocus();
    }
}

export function canvaMiniMapHandleMove(event, state){
    if(state.mapUi.focus){
        let x = (event.offsetX  - OFFSET_WIDTH*0.8) / SCALE_RELATIVE_TO_GAMEPLAY;
        let y = (event.offsetY  - OFFSET_HEIGTH/2)/ SCALE_RELATIVE_TO_GAMEPLAY;
        state.gameplayGui.setOffsetCenter(x,y);
    }

}