// Binary Search
/*
Searching technique which works on Divide and Conquer approach
It is used to search for elements in a sorted array
2 types of approaches: Iterative and Recursive
*/

/*
Recursive Approach:
1. Base Condition: if starting index is greater than ending index, return false
2. Compute the middle index
3. Compare middle with number x, if equal, return true
4. If greater, call the same function with ending index = middle-1 and repeat step 1
5. If smaller, call the same function with starting index = middle+1 and repeat step 1
*/

let recursiveFunction = function (arr, x, start, end) {
    // Base Condition
    if (start > end) {
        return false;
    }

    // Find middle index
    let mid = Math.floor((start + end) / 2);

    // Compare mid with given key x
    if (arr[mid] === x) {
        return true;
    }

    // If element at mid is greater than x,
    // search LEFT half of mid
    if (arr[mid] > x) {
        return recursiveFunction(arr, x, start, mid - 1);
    } else {
        // If element at mid is smaller than x,
        // search RIGHT half of mid
        return recursiveFunction(arr, x, mid + 1, end);
    }
};

// Driver code
let arr = [1, 3, 5, 7, 9];
let x = 5;

if (recursiveFunction(arr, x, 0, arr.length - 1)) {
    console.log("Element found!<br>");
} else {
    console.log("Element not found!<br>");
}

x = 6;

if (recursiveFunction(arr, x, 0, arr.length-1)) {
    console.log("Element found!");
} else {
    console.log("Element not found!");
}

