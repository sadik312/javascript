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
