import { CaloriesCalculator } from "../app/CaloriesCalculator.js";
import { List } from "../app/List.js";
import { WaterCalculator } from "../app/WaterCalculator.js";


export class Buddy_Output {
    constructor(){
        this.caloriesCalculator =  new CaloriesCalculator({
            inputCaloriesAge:  document.getElementById('age'),
            inputCaloriesWeight:  document.getElementById('weight'),
            inputGenderMan:  document.getElementById('man'),
            inputGenderWoman:  document.getElementById('woman'),
            inputRangeActivity:  document.getElementById('activity'),
            buttonSubmitCalories:  document.getElementById('submitCalories'),
            caloriesH1:  document.getElementById('H1Calories'),
            caloriesB:  document.getElementById('proteinDetail'),
            caloriesT:  document.getElementById('fatDetail'),
            caloriesW:  document.getElementById('carbsDetail'),
        });
        this.list = new List({
            inputMeal: document.getElementById('addFoodInput'),
            inputMealB: document.getElementById('proteinInput'),
            inputMealT: document.getElementById('fatsInput'),
            inputMealW: document.getElementById('carbsInput'),
            listMealDiv: document.getElementById('foodListItems'),
            listMealUl: document.querySelector('#foodListItems ul'),
            formSubmitMeal: document.getElementById('listForm')
        });
        this.waterCalculator = new WaterCalculator({
            inputWater: document.getElementById('inputWater'),
            formWater: document.getElementById('waterForm'),
            waterH3: document.getElementById('waterInfo'),
        });

        this.btnChangeColor = document.querySelector('.app .colors .changeColor');
        this.btnChangeColor.addEventListener('click',this.handleChangeColor);
        this.color = true;

        this.buttons = [
            document.getElementById('submitCalories'),
            document.getElementById('submitMeal'),
            document.getElementById('submitWater'),
        ]
        this.buttons.forEach(button=>button.addEventListener('click', this.updateOutput));
        this.outputH1 = document.querySelector('section.feedback h1.caloriesFeedback');

    }
    handleChangeColor(){
        const style = document.documentElement.style;
        const blue = '#00539CFF';
        const peach = '#EEA47FFF';
        const teal = '#317773';
        const lavender = '#E2D1F9';

        if(this.color){
            style.setProperty('--colorMain', blue);
            style.setProperty('--colorSecond', peach);
            style.setProperty('--colorBtnMain', teal);
            style.setProperty('--colorBtnSecond', lavender);

            this.color = !this.color;
        }
        else{
            style.setProperty('--colorMain', teal);
            style.setProperty('--colorSecond', lavender);
            style.setProperty('--colorBtnMain', blue);
            style.setProperty('--colorBtnSecond', peach);

            this.color = !this.color
        }
    }
    updateOutput = ()=>{
        setTimeout(() =>{
            const inputs = [
                document.getElementById('age'),
                document.getElementById('weight'),
                document.getElementById('proteinInput'),
                document.getElementById('fatsInput'),
                document.getElementById('carbsInput'),
                document.getElementById('inputWater'),
            ]
            if(inputs.some(input=>input.value<0)) return

            const btnRemoveItem = [...document.querySelectorAll('#removeListItem')]
            btnRemoveItem.forEach(button=>button.addEventListener('click', this.updateOutput))

            const calculatorValues = this.caloriesCalculator.getCalculatorValue();
            const listValues = this.list.getListValue();
            const waterValues = this.waterCalculator.getWaterValue();
            let {outputH1} = this;

            const lastFeedbackMessage = ()=>{
                let caloriesLeft = calculatorValues.kcal - listValues.calories;
                let waterLeft = 10 - waterValues;
                
                if(caloriesLeft>0 && waterLeft>0)
                {
                    return (`Pozosta??o Ci jeszcze do spo??ycia ${Math.abs(caloriesLeft)} kcal, oraz szklanek wody w ilo??ci ${Math.abs(waterLeft)}.`)
                }
                else if(caloriesLeft>0 && !waterLeft)
                {
                    return (`Wypi??e??/wypi??a?? ju?? wystarczaj??co du??o wody, oraz zosta??o Ci jeszcze do spo??ycia ${Math.abs(caloriesLeft)} kcal.`)
                }
                else if(caloriesLeft>0 && waterLeft<0)
                {
                    return (`Nie masz problemu z uzupe??nianiem p??yn??w w organizmie, a kalorii do spo??ycia zosta??o Ci jeszcze ${Math.abs(caloriesLeft)}.`)
                }
                else if(!caloriesLeft && waterLeft>0)
                {
                    return (`Zjad??e??/zjad??a?? ju?? dzisiaj wystarczaj??co du??o kalorii, postaraj si?? wypi?? jeszcze troch?? wody.`)
                }
                else if(!caloriesLeft && !waterLeft)
                {
                    return (`Zapotrzebowanie na kalorie i wod?? zosta??o w zupe??no??ci zaspokojone na dzi??. Gratulacje.`)
                }
                else if(!caloriesLeft && waterLeft<0)
                {
                    return (`Zapotrzebowanie na kalorie zosta??o zaspokojone. Nie masz r??wnie?? problemu z piciem wystarczaj??cej ilo??ci wody. Oby tak dalej.`)
                }
                else if(caloriesLeft<0 && waterLeft>0)
                {
                    return (`Zapotrzebowanie kaloryczne zosta??o przekroczone o ${Math.abs(caloriesLeft)} kcal. Wybierz si?? na spacer spali?? troche kalorii oraz wypij wi??cej wody.`)
                }
                else if(caloriesLeft<0 && !waterLeft)
                {
                    return (`Zapotrzebowanie kaloryczne zosta??o przekroczone o ${Math.abs(caloriesLeft)} kcal. Ale za to wypi??e??/wypi??a?? wystarczaj??co du??o wody.`)
                }
                else
                {
                    return (`Zapotrzebowanie kaloryczne zosta??o przekroczone o ${Math.abs(caloriesLeft)} kcal. Nie masz problemu za to ze spo??ywaniem wystarczaj??cej ilo??ci wody w ci??gu dnia. Mo??e teraz jaki?? trening? Powodzenia!`)
                }
            }
    
            if(!(calculatorValues.kcal||listValues.calories||waterValues))
            {
                outputH1.textContent = `Wype??nij jeden z formularzy :)`
            }
            else if(calculatorValues.kcal!=0 && listValues.calories==0 && waterValues==0)
            {
                outputH1.textContent = `Dobra robota! Twoje zapotrzebowanie kaloryczne to ${calculatorValues.kcal} kcal, nast??pnie wprowad?? produkty do jad??ospisu oraz ilo???? wypitych szklanek wody.`
            }
            else if(calculatorValues.kcal==0 && listValues.calories!=0 && waterValues==0)
            {
                outputH1.textContent = `Bardzo dobrze! Poprawnie wprowadzono produkty do listy. Teraz oblicz swoje zapotrzebowanie kaloryczne oraz wska??, ile szklanek wody dzi?? ju?? wypi??e??/wypi??a??`
            }
            else if(calculatorValues.kcal==0 && listValues.calories==0 && waterValues!=0)
            {
                outputH1.textContent = `??wietnie! Poprawnie wprowadzono informacje o spo??ytej wodzie. Nast??pnie oblicz swoje zapotrzebowanie kaloryczne oraz wprowad?? produkty do swojego jad??ospisu.`
            }
            else if(calculatorValues.kcal!=0 && listValues.calories!=0 && waterValues==0)
            {
                outputH1.textContent = `Wspaniale! Wiemy ju?? ile kalorii powinno by?? spo??yte w ci??gu dnia (${calculatorValues.kcal} kcal), oraz co ju?? dzi?? zosta??o zjedzone. Nast??pnie uzupe??nij pole ze spo??yt?? wod??, do uzyskania pe??nej informacji zwrotnej.`
            }
            else if(calculatorValues.kcal!=0 && listValues.calories==0 && waterValues!=0)
            {
                outputH1.textContent = `Ekstra! Wiemy ju?? ile kalorii powinno by?? spo??yte w ci??gu dnia (${calculatorValues.kcal} kcal), oraz ile szklanek wody zosta??o ju?? wypite (${waterValues}). Teraz dodaj spo??yte produkty do listy, w celu uzyskania pe??nej informacji zwrotnej.`
            }
            else if(calculatorValues.kcal==0 && listValues.calories!=0 && waterValues!=0)
            {
                outputH1.textContent = `Super! Teraz wystarczy ju?? tylko wprowadzi?? dane do kalkulatora kalorii, w celu uzyskania pe??nej informacji zwrotnej.`
            }
            else
            {
                outputH1.textContent = `Wszystko zosta??o prawid??owo wprowadzone! ${lastFeedbackMessage()} `
            }
        }, 0) 
    }
}