export const IMG_CARD_BOX_TYPE = 1;
export const DIALOG_BOX_TYPE = 0;

export class Level{
    gameTree;
    UI;
    inEventFlag;
    scripts;    /*Guarda os scripts de evento do nivel*/
    scriptIndex = 0;
    levelMenager;
    event = -1

    /*Para um evento ser iniciado, basta definir inEventFlag = true
    e então indicar o script a se executado por meio do scriptIndex*/

    constructor(levelMenager){
        this.levelMenager = levelMenager;
    }

    setUI(ui){
        this.UI = ui;
    }

    inEvent(){
        return this.inEventFlag;
    }

    getEventString(){
        return this.eventString;
    }

    getGameTree(){
        return this.gameTree;
    }

    /*Executa o script do evento do level*/
    executeEvent(){
        this.scripts[this.scriptIndex](this);
        return this.event;
    }

    finalizeLevel(){
        this.levelMenager.goToNextLevel();
        this.UI.executeTransition();
    }
}