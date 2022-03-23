export class CaloriesCalculator{
    
    constructor({inputCaloriesAge, inputCaloriesWeight, inputGenderMan, inputGenderWoman, inputRangeActivity, buttonSubmitCalories, caloriesH1, caloriesB, caloriesT, caloriesW}){
        this.inputCaloriesAge = inputCaloriesAge;
        this.inputCaloriesWeight = inputCaloriesWeight;
        this.inputGenderMan = inputGenderMan;
        this.inputGenderWoman = inputGenderWoman;
        this.inputRangeActivity = inputRangeActivity;
        this.buttonSubmitCalories = buttonSubmitCalories;
        this.caloriesH1 = caloriesH1;
        this.caloriesB = caloriesB;
        this.caloriesT = caloriesT;
        this.caloriesW = caloriesW;

        this.kcal = 0;
        this.proteins = 0;
        this.fats = 0;
        this.carbs = 0;


        this.buttonSubmitCalories.addEventListener('click', this.calculator.bind(this))
    }
    calculator = (e)=>{
        e.preventDefault();
        const age = Number(this.inputCaloriesAge.value);
        const weight = Number(this.inputCaloriesWeight.value);
        const man = this.inputGenderMan.checked;
        const woman = this.inputGenderWoman.checked;
        const activity = Number(this.inputRangeActivity.value);

        const firstValue = (weight * activity);
        let value;

        if(this.inputCaloriesAge.value===''||this.inputCaloriesWeight.value==='') return alert('wypełnij wszystkie dane')
        if(this.inputCaloriesAge.value==0||this.inputCaloriesWeight.value==0)
        return alert('wprowadź poprawne wartości wieku lub wagi')
        if(!(man||woman)) return alert('zaznacz czy jesteś kobietą czy mężczyzną')
        if(age<0||weight<0) return alert('wiek i waga nie mogą przyjmować wartości ujemnych')

        if(man){
            value = Math.round(firstValue * 20 + age)
            return this.render(value)
            
        }
        if(woman){
            value = Math.round(firstValue * 16 + age)
            return this.render(value)
        }
    }
    render(value){
        let protein = Math.floor((value*0.3)/4)
        let fats = Math.floor((value*0.3)/9)
        let carbs = Math.floor((value*0.4)/4)

        this.kcal = value;
        this.proteins = protein;
        this.fats = fats;
        this.carbs = carbs;

        this.caloriesH1.textContent = `${value} :kcal`;
        this.caloriesB.textContent = `${protein} B`;
        this.caloriesT.textContent = `${fats} T`;
        this.caloriesW.textContent = `${carbs} W`;  

        this.inputCaloriesAge.value = '';
        this.inputCaloriesWeight.value = '';
        this.inputGenderMan.checked = false;
        this.inputGenderWoman.checked = false;
        this.inputRangeActivity.value = '';
    }
    getCalculatorValue = ()=>{
        return({
            kcal: this.kcal,
            proteins: this.proteins,
            fats: this.fats,
            carbs: this.fats
        })
    }
}