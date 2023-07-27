export class Level{
    gameTree;
    UI;
    inEventFlag;
    scripts;
    scriptIndex = 0;
    levelMenager;

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
    }

    finalizeLevel(){
        this.levelMenager.goToNextLevel();
        this.UI.executeTransition();
    }
}