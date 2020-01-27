let arrSize = 0;
let arr = [];
let error = document.getElementById("error-mssg");
let input = document.getElementById("array-size-input");
let button = document.querySelector("#gen-button");
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

var ctx = document.getElementById("array-chart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
});
