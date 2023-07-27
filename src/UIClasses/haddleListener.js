import {CLICK_AREA_W} from "./GameplayUi.js";
import {CLICK_AREA_H} from "./GameplayUi.js";
import { GAME_CANVA_HEIGHT } from "../GameOperatingClasses/constant.js";
import { GAME_CANVA_WIDTH } from "../GameOperatingClasses/constant.js";
import {GameplayUi} from "./GameplayUi.js";
import { GameplayState } from "../GameOperatingClasses/States/GameplayState.js";
import { SCALE_RELATIVE_TO_GAMEPLAY } from "./constants.js";
import {OFFSET_WIDTH} from "./GameplayMapUI.js";
import {OFFSET_HEIGTH} from "./GameplayMapUI.js";

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

            if(gameplayState.gameTree.G[i].mod){
                gameplayState.gameTree.G[i].modify();
                gui.setCurrentNode(gameplayState.gameTree.G[i]);
            }

            
        }
    }


}

export function canvaGamaplayHandleMove(event, gui){
    let mousePositionX =  event.offsetX;
    let mousePositionY = event.offsetY;


    if(gui.inCutScene != true){
        if(mousePositionX >= GAME_CANVA_WIDTH*0.9){
            gui.horizontalPositiveMove= true;
        }else{
            gui.horizontalPositiveMove= false;
        }
        
        if(mousePositionX<= GAME_CANVA_WIDTH*0.1){
            gui.horizontalNegativeMove = true;
        }else{
            gui.horizontalNegativeMove = false;
        }
    
        if(mousePositionY >= GAME_CANVA_HEIGHT*0.9){
            gui.verticalPositiveMove= true;
        }else{
            gui.verticalPositiveMove= false;
        }
        
        if(mousePositionY<= GAME_CANVA_HEIGHT*0.1){
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
        let x = (event.offsetX  - OFFSET_WIDTH) / SCALE_RELATIVE_TO_GAMEPLAY - GAME_CANVA_WIDTH/2;
        let y = (event.offsetY  - OFFSET_HEIGTH/2)/ SCALE_RELATIVE_TO_GAMEPLAY;
        state.gameplayGui.setOffsetCenter(x,y);
    }

}