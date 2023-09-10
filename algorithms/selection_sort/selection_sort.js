// Selection Sort

function selctionSort(arr) {
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