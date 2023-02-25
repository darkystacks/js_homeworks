const SimpleNums = (n) => {
    let result = [];
    let nums = [0, 1];
    let i = 2;
    let counter;

    while (result.length < n) {
        counter = 0;
        nums.push(i)
        for (const num in nums) {
            if (i % num === 0) {
                counter += 1
            }
        }
        if (counter === 2) {
            result.push(i)
        }
        i++;
    }
    return result
}

console.log(SimpleNums(process.argv[2]))

