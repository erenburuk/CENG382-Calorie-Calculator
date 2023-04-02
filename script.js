const list = document.getElementById("list");
const totalCal = document.getElementById("total-calories");
const resultMsg = document.getElementById("total-calories");
const recipeIng = document.querySelector(".recipe__ingredients");
const welcomeMsg = document.querySelector(".welcome-message");

let ingredientCounter = 0;
let totalCalories = 0;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

const viewIngredients = function (name, quantity, unit, cal) {
  return `
  <li class="recipe__ingredient">
    ${name}
    <span class="quantity">${quantity}</span>
    <span class="unit">${unit}</span>
    <span class="calorie">${cal}</span> cal./100
    <span class="unit">${unit}</span>
  </li>`;
};

const viewTotal = function (total, msg) {
  return `
    <span class="total-heading">Total calories: </span>
    <span class="total-amount">${total.toFixed(2)}</span>
    <div id="result-message" class="result-message">
      ${msg}
    </div>
  `;
};

const isNegative = function (n) {
  return (res = Math.sign(n) === -1 ? false : true);
};

const checkCalorieRate = function (quantity, cal) {
  return (res = cal / quantity > 20 ? false : true);
};

const calculateTotalCalorie = function (total, amount, cal) {
  total += (amount * cal) / 100;
  return total;
};

const resultMessage = function (total) {
  if (total <= 100) {
    return "🥑 Very healthy";
  } else if (101 <= total && total <= 200) {
    return "🥛 Healthy";
  } else if (201 <= total && total <= 300) {
    return "🍕 It is good to stay away";
  } else {
    return "🚫 Stay away";
  }
};

const reset = function () {
  displayMessage("");
  totalCal.innerHTML = "";
};

document.querySelector(".btn--add").addEventListener("click", function (e) {
  e.preventDefault();
  reset();

  if (recipeIng.classList.contains("hidden")) {
    recipeIng.classList.remove("hidden");
  }

  if (!welcomeMsg.classList.contains("hidden")) {
    welcomeMsg.classList.add("hidden");
  }

  const name = document.getElementById("ingredient-name").value;
  const quantity = document.getElementById("amount").value;
  const calories = +document.getElementById("calories").value;

  const quantityArr = quantity.split(",");

  const amount = +quantityArr[0];
  const unit = quantityArr[1];

  // When there is no input
  if (!name || !quantity || !calories) {
    displayMessage("⛔ No input!");

    // If ingredients number is 10
  } else if (ingredientCounter === 10) {
    displayMessage("⛔ Max ingredient input!");

    // Negative check
  } else if (!isNegative(amount) || !isNegative(calories)) {
    displayMessage("⛔ Quantity or calorie cannot be negative!");

    // Input format
  } else if (quantityArr.length !== 2) {
    displayMessage("Wrong ingredient format!");

    // Cal/gr rate check
  } else if (!checkCalorieRate(amount, calories)) {
    displayMessage(
      "⛔ The calorie cannot be no more than 20 calories per gram!"
    );

    // Add ingredients
  } else {
    list.innerHTML += viewIngredients(name, amount, unit, calories);
    totalCalories = calculateTotalCalorie(totalCalories, amount, calories);

    ingredientCounter++;
  }
});

document
  .querySelector(".btn--calculate")
  .addEventListener("click", function (e) {
    e.preventDefault();

    totalCal.innerHTML = viewTotal(totalCalories, resultMessage(totalCalories));
  });
