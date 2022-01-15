if (process.argv.length !== 7) {
    console.log(`
      You gave ${process.argv.length - 2} argument(s) to the program
  
      Please provide 5 arguments for
      
      weight (kg), 
      height (m), 
      age (years), 
      whether you exercise daily (yes or no)
      and your gender (m or f)
      
      Example:
  
      $ node index.js 82 1.79 32 yes m
    `);

    process.exit();
  }

const weightInKg = parseInt(process.argv[2]);
const heightInM = parseFloat(process.argv[3]);
const age = parseFloat(process.argv[4]);
const dailyExercise = process.argv[5];
const gender = process.argv[6];

if (isNaN(weightInKg) || isNaN(heightInM) || isNaN(age)) {
    console.log(`
      Please make sure weight, height and age are numbers:
  
      weight (kg) example: 82 | your input: ${process.argv[2]}
      height (m) example 1.79 | your input: ${process.argv[3]}
      age (years) example 32  | your input: ${process.argv[4]} 
  
      $ node index.js 82 1.79 32 yes m
    `);
  
    process.exit();
  }

if(age<20){
    console.log("This BMI calculator is designed for people over 20")
    process.exit();
}

if (weightInKg<30 || weightInKg>300){
    console.log(`
    Please provide a number for weight in kilograms between 30 and 300:

    weight (kg) example: 82 | your input: ${process.argv[2]} 
    `)
    process.exit();
}


if(dailyExercise !== "yes" && dailyExercise!=="no"){
    console.log(`
    Please specify wether you exercise daily with yes or no
    daily exercise example : yes  |  your input: ${process.argv[5]}
    `)
    process.exit();
}

if (gender !== "m" && gender !== "f") {
    console.log(`
    Please provide the correct gender, example: m | You provided ${process.argv[6]}
    `);
        process.exit();
}

const BMI = weightInKg / (heightInM * heightInM)
const roundedBMI = Math.round(BMI);

const idealBMI = 22.5
const idealWeight = idealBMI * heightInM * heightInM

let BMR ;
if(gender === "f"){
    BMR = (10*weightInKg) + (6.25*heightInM*100) - (5*age) - 150
}
else{
    BMR = (10*weightInKg) + (6.25*heightInM*100) - (5*age) + 50
}

let dailyCalories;
if(dailyExercise === "yes") {
    dailyCalories = BMR * 1.6
}
else{
    dailyCalories = BMR *1.4
}

const weightWeNeedToLose = weightInKg - idealWeight;
const week = Math.abs(weightWeNeedToLose/0.5);

let calorieYouNeedToConsume;

if(weightWeNeedToLose > 0){
    calorieYouNeedToConsume = dailyCalories -500
}
else{
    calorieYouNeedToConsume = dailyCalories +500
}

console.log(`
**************
BMI CALCULATOR
**************

age: ${age} years
gender: ${gender}
height: ${heightInM} m
weight: ${weightInKg} kg
Do you exercise daily? ${dailyExercise}


**************
FACING THE FACTS
**************

Your BMI is ${roundedBMI}

A BMI under 18.5 is considered underweight
A BMI above 25 is considered overweight

Your ideal weight is ${Math.round(idealWeight)} kg
You burn ${Math.round(dailyCalories)} calories a day

**************
DIET PLAN
**************

If you want to reach your ideal weight of ${Math.round(idealWeight)} kg: 

Eat ${Math.round(calorieYouNeedToConsume)} calories a day
For ${Math.round(week)} weeks
`);





