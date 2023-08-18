export class PinsManager{
    denielPins = 1;
    denielPinCount = 0;

    addDenielPin(){
        if(denielPins<3){    
            this.denielPins++;
        }
    }

    subDenielPin(){
        this.denielPins--;
    }
}