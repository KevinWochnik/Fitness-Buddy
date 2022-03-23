export class WaterCalculator{
    constructor({inputWater, formWater, waterH3}){
        this.inputWater = inputWater;
        this.formWater = formWater;
        this.waterH3 = waterH3;

        this.glassNumber = 10;
        this.glassValue = 0;

        this.renderInitialText();
        this.formWater.addEventListener('submit', this.handleTextFeedback)
    }

    renderInitialText(){
        const {inputWater, waterH3} = this;

        if(inputWater.value === ''){
            waterH3.textContent = `Dorosły człowiek powinien wypić od 8 do 10 szklanek wody dziennie :)`
        }
    }

    handleTextFeedback = (e)=>{
        e.preventDefault();

        const {inputWater, glassNumber, waterH3} = this;
        const inputValue = Number(inputWater.value);

        let suffix;

        if(inputValue<=5){
            suffix = `ek`
        }
        else if(inputValue>5&&inputValue<9){
            suffix = `ki`
        }
        else if(inputValue==9){
            suffix = `kę`
        }

        if(inputWater.value===''||inputWater.value==0) return alert('wprowadź poprawną liczbę wypitych szklanek wody')
        if(inputWater.value<0) return alert('liczba wypitych szklanek nie może przymować wartości ujemnych')
        

        if(inputValue<glassNumber-5){
            waterH3.textContent = `To bardzo mało, wypij jeszcze ${glassNumber-inputValue} szklan${suffix} wody, aby uzupełnić niedobów wody w organizmie :)`
        }
        else if(inputValue>=5 && inputValue<glassNumber){
            waterH3.textContent = `Dobrze Ci idzie! Wypij jeszcze dziś ${glassNumber-inputValue} szklan${suffix} wody.`
        }
        else{
            waterH3.textContent = `Super! Wypiłeś/wypiłaś już dzisiaj wystarczająco dużo wody.`
        }
        this.glassValue = inputWater.value;
        inputWater.value = '';
    }
    getWaterValue = ()=>{
        return this.glassValue
    }
}