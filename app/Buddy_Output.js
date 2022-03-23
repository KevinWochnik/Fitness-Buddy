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
        console.log('dziala')
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
                    return (`Pozostało Ci jeszcze do spożycia ${Math.abs(caloriesLeft)} kcal, oraz szklanek wody w ilości ${Math.abs(waterLeft)}.`)
                }
                else if(caloriesLeft>0 && !waterLeft)
                {
                    return (`Wypiłeś/wypiłaś już wystarczająco dużo wody, oraz zostało Ci jeszcze do spożycia ${Math.abs(caloriesLeft)} kcal.`)
                }
                else if(caloriesLeft>0 && waterLeft<0)
                {
                    return (`Nie masz problemu z uzupełnianiem płynów w organizmie, a kalorii do spożycia zostało Ci jeszcze ${Math.abs(caloriesLeft)}.`)
                }
                else if(!caloriesLeft && waterLeft>0)
                {
                    return (`Zjadłeś/zjadłaś już dzisiaj wystarczająco dużo kalorii, postaraj się wypić jeszcze trochę wody.`)
                }
                else if(!caloriesLeft && !waterLeft)
                {
                    return (`Zapotrzebowanie na kalorie i wodę zostało w zupełności zaspokojone na dziś. Gratulacje.`)
                }
                else if(!caloriesLeft && waterLeft<0)
                {
                    return (`Zapotrzebowanie na kalorie zostało zaspokojone. Nie masz również problemu z piciem wystarczającej ilości wody. Oby tak dalej.`)
                }
                else if(caloriesLeft<0 && waterLeft>0)
                {
                    return (`Zapotrzebowanie kaloryczne zostało przekroczone o ${Math.abs(caloriesLeft)} kcal. Wybierz się na spacer spalić troche kalorii oraz wypij więcej wody.`)
                }
                else if(caloriesLeft<0 && !waterLeft)
                {
                    return (`Zapotrzebowanie kaloryczne zostało przekroczone o ${Math.abs(caloriesLeft)} kcal. Ale za to wypiłeś/wypiłaś wystarczająco dużo wody.`)
                }
                else
                {
                    return (`Zapotrzebowanie kaloryczne zostało przekroczone o ${Math.abs(caloriesLeft)} kcal. Nie masz problemu za to ze spożywaniem wystarczającej ilości wody w ciągu dnia. Może teraz jakiś trening? Powodzenia!`)
                }
            }
    
            if(!(calculatorValues.kcal||listValues.calories||waterValues))
            {
                outputH1.textContent = `Wypełnij jeden z formularzy :)`
            }
            else if(calculatorValues.kcal!=0 && listValues.calories==0 && waterValues==0)
            {
                outputH1.textContent = `Dobra robota! Twoje zapotrzebowanie kaloryczne to ${calculatorValues.kcal} kcal, następnie wprowadź produkty do jadłospisu oraz ilość wypitych szklanek wody.`
            }
            else if(calculatorValues.kcal==0 && listValues.calories!=0 && waterValues==0)
            {
                outputH1.textContent = `Bardzo dobrze! Poprawnie wprowadzono produkty do listy. Teraz oblicz swoje zapotrzebowanie kaloryczne oraz wskaż, ile szklanek wody dziś już wypiłeś/wypiłaś`
            }
            else if(calculatorValues.kcal==0 && listValues.calories==0 && waterValues!=0)
            {
                outputH1.textContent = `Świetnie! Poprawnie wprowadzono informacje o spożytej wodzie. Następnie oblicz swoje zapotrzebowanie kaloryczne oraz wprowadź produkty do swojego jadłospisu.`
            }
            else if(calculatorValues.kcal!=0 && listValues.calories!=0 && waterValues==0)
            {
                outputH1.textContent = `Wspaniale! Wiemy już ile kalorii powinno być spożyte w ciągu dnia (${calculatorValues.kcal} kcal), oraz co już dziś zostało zjedzone. Następnie uzupełnij pole ze spożytą wodą, do uzyskania pełnej informacji zwrotnej.`
            }
            else if(calculatorValues.kcal!=0 && listValues.calories==0 && waterValues!=0)
            {
                outputH1.textContent = `Ekstra! Wiemy już ile kalorii powinno być spożyte w ciągu dnia (${calculatorValues.kcal} kcal), oraz ile szklanek wody zostało już wypite (${waterValues}). Teraz dodaj spożyte produkty do listy, w celu uzyskania pełnej informacji zwrotnej.`
            }
            else if(calculatorValues.kcal==0 && listValues.calories!=0 && waterValues!=0)
            {
                outputH1.textContent = `Super! Teraz wystarczy już tylko wprowadzić dane do kalkulatora kalorii, w celu uzyskania pełnej informacji zwrotnej.`
            }
            else
            {
                outputH1.textContent = `Wszystko zostało prawidłowo wprowadzone! ${lastFeedbackMessage()} `
            }
        }, 0) 
    }
}