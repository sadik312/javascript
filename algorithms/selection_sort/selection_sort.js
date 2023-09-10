// Selection Sort

function selectionSort(arr) {
    let n = arr.length;

    for (let i=0; i<n; i++) {
        // Finding smallest element in subarray
        let min = i;
        for (let j=i+1; j<n; j++) {
            if (arr[j] < arr[min]) {
                min=j;
            }
        }
        if (min != i) {
            // Swapping elments
            let temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }
    return arr;
}

// Driver code
let arr = [5, 2, 4, 1, 3];
selectionSort(arr);
console.log(arr);