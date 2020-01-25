function linearSearch(arr, elToFind) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == elToFind) {
      return i;
    }
  }
  console.log("target not found");
  return null;
}
