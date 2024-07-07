function getRandomNumbers(max, min = 0) { 
    const randomCount = Math.floor(Math.random() * (max - min) + min); 
    const result = [] 
    for (let i = randomCount; i >= min; i--) {   
        result.push(i) 
    } 
    return result 
}

const r = getRandomNumbers(19, 1);
console.log(r);