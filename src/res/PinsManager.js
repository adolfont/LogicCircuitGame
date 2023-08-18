export class PinsManager{
    denielPins = 1;
    denielPinCount = 0;

    addDenielPin(){
        if(this.denielPins<3){    
            this.denielPins++;
        }
    }

    subDenielPin(){
        this.denielPins--;
    }
}