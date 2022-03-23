export class List{
    constructor({inputMeal, inputMealB, inputMealT, inputMealW, listMealDiv, listMealUl, formSubmitMeal}){
        this.inputMeal = inputMeal;
        this.inputMealB = inputMealB;
        this.inputMealT = inputMealT;
        this.inputMealW = inputMealW;
        this.listMealDiv = listMealDiv;
        this.listMealUl = listMealUl;
        this.formSubmitMeal = formSubmitMeal;

        this.formSubmitMeal.addEventListener('submit', this.handleAddElement);
        this.meals = [];
    }
    handleAddElement = (e)=>{
        e.preventDefault();

        const {inputMeal, inputMealB, inputMealT, inputMealW} = this;

        let mealNameValue = inputMeal.value;
        let mealProteinValue = Number(inputMealB.value);
        let mealFatsValue = Number(inputMealT.value);
        let mealCarbsValue = Number(inputMealW.value);

        if(this.meals.some(meal=>meal.mealNameValue == mealNameValue)) return alert('nazwy posiłków nie mogą się powtarzać')
        if(!mealNameValue) return alert('dodaj nazwę posiłku')
        if(
            inputMealB.value==='' || inputMealT.value==='' || inputMealW.value===''
        ) return alert('uzupełnij wszystkie pola makroskładników')
        if(
            mealProteinValue<0 || mealFatsValue<0 || mealCarbsValue<0
        ) return alert('mikroskładniki nie mogą przyjmować wartości ujemnych')
        if(!(mealProteinValue+mealFatsValue+mealCarbsValue)) return alert('wprowadź poprawne dane o makroskładnikach')
        
        const meal = {mealNameValue, mealProteinValue, mealFatsValue, mealCarbsValue}
        this.meals.push(meal)

        this.inputMeal.value = '';
        this.inputMealB.value = '';
        this.inputMealT.value = '';
        this.inputMealW.value = '';

        this.renderList()
        this.getListValue()
    }
    renderList = ()=>{
        this.listMealUl.textContent = '';
        this.meals.forEach(meal=>{
            
            const name = meal.mealNameValue;
            const protein = Number(meal.mealProteinValue);
            const fats = Number(meal.mealFatsValue);
            const carbs = Number(meal.mealCarbsValue);

            let kcal = (protein*4) + (fats*9) + (carbs*4);

            const liElement = document.createElement('li');
            liElement.innerHTML = `<h3 id="font_H3_black">${name} (${kcal} kcal)<h3><button id='removeListItem' data-key='${name}'>X</button>`;
            this.listMealUl.appendChild(liElement)

            const btnsRemove = [...document.querySelectorAll('#removeListItem')];

            btnsRemove.forEach(button=>button.addEventListener('click', this.removeItem))
        })
    }
    removeItem = (e)=>{
        const mealName = e.target.dataset.key;
        const mealIndex = this.meals.findIndex(meal=>meal.mealNameValue==mealName);

        this.meals.splice(mealIndex,1);
        
        this.renderList();
        this.getListValue()
    }
    getListValue = ()=>{  

        let proteins = 0;
        let fats = 0;
        let carbs = 0;
        let calories = 0;

        this.meals.forEach(meal=>{
            proteins += meal.mealProteinValue;
            fats += meal.mealFatsValue;
            carbs += meal.mealCarbsValue;
        })
        calories += (proteins*4)+(fats*9)+(carbs*4);
        return {calories, proteins, fats, carbs}
    }
}
