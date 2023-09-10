// Selection Sort:
function swap(arr, xp, yp) {
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}

function selectionSort(arr, n) {
    var i, j, min_idx;

    // One by one move boundary of unsorted array
    for (i=0; i<n-1; i++)
    {
        // Find the minimum element in unsorted subarray
        min_idx = i;
        for (j=i+1; j<n; j++)
        if (arr[j] < arr[min_idx]){
            min_idx = j;
        }

            // Swap found minimuj element with first element
            swap(arr, min_idx, i);
    }
}

function printArray(arr, size)
{
    var i;
    for (i=0; i<size; i++) {
        console.log(arr[i] + " ");
    }
}

