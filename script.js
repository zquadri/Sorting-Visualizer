let arrSize = 0;
let arr = [];
let error = document.getElementById("error-mssg");
let input = document.getElementById("array-size-input");
let button = document.querySelector("#gen-button");
let arrayDiv = document.querySelector(".array");
var inputPlaceholder = document.querySelectorAll("inputPlaceholder");
for (i = 0; i < inputPlaceholder.length; i++) {
  inputPlaceholder[i].setAttribute(
    "size",
    inputPlaceholder[i].getAttribute("placeholder").length
  );
}
button.addEventListener("click", function() {
  let val = input.value;
  if (isNaN(val)) {
    error.textContent = "You Must Enter a Valid Number!";
  } else {
    error.textContent = "";
  }

  arrSize = input.value;
  if (arrSize < 0 || arrSize > 10000) {
    error.textContent = "Please Enter a Number between 1 and 10000";
  } else {
    arr = generateArray(arrSize);
    console.log(generateArray(arrSize));
  }
  input.value = "";
});

// document.write(arr);
function generateArray(size) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * size));
  }
  return arr;
}
arrayDiv.textContent = arr.toString();
