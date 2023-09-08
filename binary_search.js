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

// Time Complexity: O(logN)

/*
Iterative Approach
Instead of recursion, a while loop is used
Loop runs untils it hits the base condition 
*/

let iterativeFunction = function (arr, x) {
    let start = 0, end = arr.length-1;

    // Iterative while start does not meet end
    while (start<=end) {

        // Find mid index
        let mid = Match.floor((start + end) / 2);

        // If element is equal to mid, return True
        if (arr[mid]===x) {
            return true;
        // Else look in left or right half accordingly
        } else if (arr[mid] < x) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
        return false;
    }
}

