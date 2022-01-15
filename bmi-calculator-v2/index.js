function calculateBMI(weight,height){
     return weight / (height * height);
}

function calculateIdealWeight(height){
    const idealWeight = 22.5 * height * height;
    return idealWeight;
}

function calculateBMR(weight,height,ageOfUser,genderOfUser){
    
    const heightInCm = height * 100;

    let BMR;
    if (genderOfUser === "m") {
        BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser + 50;
    } 
    else {
    BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser - 150;
    }

    return BMR;
}

function calculateDailyCalories(bmr,exercise){
    
    let dailyCalorieUsage;
    if(exercise === "yes"){
        dailyCalorieUsage = bmr * 1.6;
    }else{
        dailyCalorieUsage = bmr * 1.4;
    }
    return dailyCalorieUsage;

}

function calculateDietWeeks(weightToLose){
    return Math.abs(weightToLose/0.5);
}

function calculateDietCalories(weightToLose,caloriesUsedDaily){

    let dietCalories;
    if (weightToLose > 0){
        dietCalories = caloriesUsedDaily - 500;
    }else{
        dietCalories = caloriesUsedDaily + 500;
    }
    
    return dietCalories;
}

function validateNumberOfInputs(argv) {
    

    if (argv.length !== 7) {
        console.log(`
          You gave ${argv.length - 2} argument(s) to the program
      
          Please provide 5 arguments for
          
          weight (kg), 
          height (m), 
          age (years), 
          wether you exercise daily (yes or no)
          and your gender (m or f)
          
          Example:
      
          $ node index.js 82 1.79 32 yes m
        `);
    
        process.exit();
     }
}

function validateWeightHeightAge(weight,height,ageofUser){
    if (isNaN(weight) || isNaN(height) || isNaN(ageofUser)){
        console.log(`
        Please make sure that weight height and age are numbers:

        input example weight:82 | your input: ${weight}
        input example height:1.79 | your input: ${height}
        input example age:32 |your input: ${ageofUser}
        `)
        process.exit();
    }
    
    if (ageofUser < 20){
        console.log("This BMI calculator is designed for people over 20");
        process.exit();
    }

    if(weight<30 || weight>300){
        console.log(`
        Please enter a weight in kgs
      
        Your weight of ${weight} kgs does not fall in the range between 30 kg and 300 kg
  
        If you weight is below 30 kg or over 300 kg seek professional medical help
        `)
        process.exit();
    }
}

function validateDailyExercise(exercise){
    if(exercise !== "yes" && exercise !== "no"){
        console.log(`
        Please specify wether you exercise daily with yes or no

        You entered: ${exercise}

        (Don't worry, we won't judge you if you enter no)
        `)
        process.exit();
    }
}

function validateGender(genderofUser){
    if(genderofUser !== "m" && genderofUser !== "f"){
        console.log(`
        Please specify wether you are a male "m" or female "f"
        You entered: ${genderofUser}
        `)
        process.exit();
    }
}

function formatOutput(userObject){
    return `
    **************
    BMI CALCULATOR
    **************

    age: ${userObject.age} years
    gender: ${userObject.gender}
    height: ${userObject.heightInM} m
    weight: ${userObject.weightInKg} kg
    Do you exercise daily? ${userObject.dailyExercise}


    **************
    FACING THE FACTS
    **************

    Your BMI is ${Math.round(userObject.BMI)}

    A BMI under 18.5 is considered underweight
    A BMI above 25 is considered overweight

    Your ideal weight is ${Math.round(userObject.idealWeightKg)} kg
    You burn ${Math.round(userObject.dailyCalories)} calories a day

    **************
    DIET PLAN
    **************

    If you want to reach your ideal weight of ${Math.round(userObject.idealWeightKg)} kg: 

    Eat ${Math.round(userObject.dietCalories)} calories a day
    For ${Math.round(userObject.dietWeeks)} weeks
    
    `

}
  
function bmiCalculator() {
  
  validateNumberOfInputs(process.argv);
  
  const weightInKg = parseInt(process.argv[2]);
  const heightInM = parseFloat(process.argv[3]);
  const age = parseInt(process.argv[4]);
  const dailyExercise = process.argv[5];
  const gender = process.argv[6];


  validateWeightHeightAge(weightInKg,heightInM,age);
  validateDailyExercise(dailyExercise);
  validateGender(gender);



  const BMI = calculateBMI(weightInKg,heightInM);
  const BMR = calculateBMR(weightInKg, heightInM, age, gender);
  const idealWeight = calculateIdealWeight(heightInM);
  //console.log("ideal weight:",idealWeight);
  const dailyCalorieUsage = calculateDailyCalories(BMR,dailyExercise);
  //console.log("daily calorie usage:",dailyCalorieUsage);
  const weightToLosekg = weightInKg - idealWeight;
  const dietWeeks = calculateDietWeeks(weightToLosekg);
  const dietCalories = calculateDietCalories(weightToLosekg,dailyCalorieUsage);
  
  
  const user = {
    weightInKg: weightInKg,
    heightInM: heightInM,
    age: age,
    dailyExercise: dailyExercise,
    gender: gender,
    BMI: BMI,
    idealWeightKg: idealWeight,
    dailyCalories: dailyCalorieUsage,
    weightToLoseKg: weightToLosekg,
    dietWeeks: dietWeeks,
    dietCalories: dietCalories,
  };

  const output = formatOutput(user);
  console.log(output);
  
  

}

bmiCalculator();
