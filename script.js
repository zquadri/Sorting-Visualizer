const arrInfo = {
  arrSize: 0,
  arr: [],
  isSorted: false
};
const labels = {
  x_indicies: [],
  y_values: []
};

let error = document.getElementById('error-mssg');
let input_field = document.getElementById('array-size-input');
const button = document.querySelector('#gen-button');

button.addEventListener('click', function() {
  clearArr();
  let input = input_field.value;
  if (!isValidInput(input)) {
    error.textContent = 'You Must Enter a Valid Number!';
  } else {
    error.textContent = '';
    arrInfo.arrSize = input;
    arrInfo.arr = generateArray(arrInfo.arrSize);
    setChartLabels(arrInfo.arr);
    console.log('arr is ' + arrInfo.arr);
    chartIt();
  }
  input_field.value = '';
});

function clearArr() {
  const chart = document.querySelector('#array-chart');
  // if (chart) {
  //   chart.remove();
  // }
  arrInfo.arrSize = 0;
  arrInfo.arr = [];
  labels.x_indicies = [];
  labels.y_values = [];
}

function isValidInput(input) {
  if (!input || isNaN(input) || input < 0 || input > 10000) {
    return false;
  }
  return true;
}

// generates and returns an array based on given input size;
function generateArray(size) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * size));
  }
  return arr;
}

//issues if user deicdes to gen new array need to clear vals first before gen new array

function setChartLabels(arr) {
  for (let i = 0; i < arr.length; i++) {
    labels.x_indicies.push(i);
    labels.y_values.push(arr[i]);
  }
}

//creates chart and displays on page.
function chartIt() {
  const ctx = document.getElementById('array-chart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels.x_indicies,
      datasets: [
        {
          label: 'Your Generated Array',
          data: labels.y_values,
          backgroundColor: 'rgba(255, 99, 80)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      responsive: false
    }
  });
}

// var inputPlaceholder = document.querySelectorAll('inputPlaceholder');
// for (i = 0; i < inputPlaceholder.length; i++) {
//   inputPlaceholder[i].setAttribute(
//     'size',
//     inputPlaceholder[i].getAttribute('placeholder').length
//   );
// }
