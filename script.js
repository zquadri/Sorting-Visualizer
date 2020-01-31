const arrInfo = {
  arrSize: 0,
  arr: [],
  tempArr: [],
  isSorted: false
};
const labels = {
  x_indicies: [],
  y_values: [],
  x_tempIndicies: [],
  y_tempValues: []
};

let error = document.getElementById('error-mssg');
let input_field = document.getElementById('array-size-input');
const gen_button = document.querySelector('#gen-button');
const sort_button = document.querySelector('#sort-button');
const sortErrorMssg = document.querySelector('.sort-error-mssg');
//Sets Event listener for Generate Button.
gen_button.addEventListener('click', function() {
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
    chartUnSortedArray();
  }
  input_field.value = '';
});

sort_button.addEventListener('click', function() {
  let tempArr = Array.from(arrInfo.tempArr);
  tempArr = arrInfo.arr;
  if (tempArr.length < 1) {
    sortErrorMssg.textContent =
      'You must generate an array before trying to sort.';
  } else {
    // let chart = document.querySelector('#sorted-array-chart');
    // if (chart) {
    //   destroyChart('sorted');
    // }
    // let newChart = document.createElement('canvas');
    // newChart.classList.add('sorted-array-chart');
    // let col = document.querySelector('.right');
    // col.appendChild(newChart);
    const sortMethod = getDropDownValue();
    console.log(sortMethod);
    if (sortMethod === 'mergeSort') {
      let t0 = performance.now();
      let newArr = Array.from(tempArr);
      console.log(newArr);
      newArr = mergeSort(newArr);
      console.log(newArr);
      for (let i = 0; i < newArr.length; i++) {
        labels.x_tempIndicies.push(i);
        labels.y_tempValues.push(newArr[i]);
      }
      chartSortedArray();
      let t1 = performance.now();
      let timeTaken = t1 - t0;
      console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.');
      insertRow('Merge Sort', 'O(nlogn)', newArr.length, timeTaken);
    }
    if (sortMethod === 'quickSort') {
      let t0 = performance.now();
      let newArr = Array.from(tempArr);
      console.log(newArr);
      newArr = quickSort(newArr, 0, newArr.length - 1);
      console.log(newArr);
      for (let i = 0; i < newArr.length; i++) {
        labels.x_tempIndicies.push(i);
        labels.y_tempValues.push(newArr[i]);
      }
      chartSortedArray();
      let t1 = performance.now();
      let timeTaken = t1 - t0;
      console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.');
      insertRow('Quick Sort', 'O(nlogn)', newArr.length, timeTaken);
    }
    if (sortMethod === 'heapSort') {
      let t0 = performance.now();
      let newArr = Array.from(tempArr);
      console.log(newArr);
      newArr = heapSort(newArr);
      console.log(newArr);
      for (let i = 0; i < newArr.length; i++) {
        labels.x_tempIndicies.push(i);
        labels.y_tempValues.push(newArr[i]);
      }
      chartSortedArray();
      let t1 = performance.now();
      let timeTaken = t1 - t0;
      console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.');
      insertRow('Heap Sort', 'O(nlogn)', newArr.length, timeTaken);
    }
    if (sortMethod === 'bubbleSort') {
      let t0 = performance.now();
      let newArr = Array.from(tempArr);
      console.log(newArr);
      newArr = bubbleSort(newArr);
      console.log(newArr);
      for (let i = 0; i < newArr.length; i++) {
        labels.x_tempIndicies.push(i);
        labels.y_tempValues.push(newArr[i]);
      }
      chartSortedArray();
      let t1 = performance.now();
      let timeTaken = t1 - t0;
      console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.');
      let bigO = 'O(n' + '<sup>' + '2' + '</sup>' + ')';
      insertRow('Bubble Sort', bigO, newArr.length, timeTaken);
    }
    if (sortMethod === 'insertionSort') {
      let t0 = performance.now();
      let newArr = Array.from(tempArr);
      console.log(newArr);
      newArr = insertionSort(newArr);
      console.log(newArr);
      for (let i = 0; i < newArr.length; i++) {
        labels.x_tempIndicies.push(i);
        labels.y_tempValues.push(newArr[i]);
      }
      chartSortedArray();
      let t1 = performance.now();
      let timeTaken = t1 - t0;
      console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.');
      let bigO = 'O(n' + '<sup>' + '2' + '</sup>' + ')';
      insertRow('Insertion Sort', bigO, newArr.length, timeTaken);
    }
  }
});

function getDropDownValue() {
  const dropDown = document.querySelector('.select-css');
  return dropDown.options[dropDown.selectedIndex].value;
}

//Makes sure input is a number between 1-10000.
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
    arr.push(Math.floor(Math.random() * (size * 20)));
  }
  return arr;
}

//sets x and y axis values for chart.
function setChartLabels(arr) {
  for (let i = 0; i < arr.length; i++) {
    labels.x_indicies.push(i);
    labels.y_values.push(arr[i]);
  }
}

//creates unsorted chart based on input and displays on page.
function chartUnSortedArray() {
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

//display sorted chart to page
function chartSortedArray() {
  const ctx = document.getElementById('sorted-array-chart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels.x_tempIndicies,
      datasets: [
        {
          label: 'Your Generated Array',
          data: labels.y_tempValues,
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
//emptys out array to ensure correct values of new chart to be added.
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

//1.Destory Chart before making new one.
//2.Take care of person clicking sort while no array has been genereated.
//3.Set onclick of sort to chart the sorted array based on selected option.
function insertRow(algo, timeComplexity, arrSize, time) {
  const newRow = document.querySelector('.algo-table').insertRow();
  const cell0 = newRow.insertCell(0);
  const cell1 = newRow.insertCell(1);
  const cell2 = newRow.insertCell(2);
  const cell3 = newRow.insertCell(3);

  cell0.innerHTML = algo;
  cell1.innerHTML = timeComplexity;
  cell2.innerHTML = arrSize;
  cell3.innerHTML = time;
  // newRow.innerHTML =
  //   '<td>algo</td><td>`timeComplexity`</td><td>arrSize</td><td>time</td>';
}
