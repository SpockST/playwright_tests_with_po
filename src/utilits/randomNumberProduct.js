export function getRandomNumbers() { 
    const randomCount = Math.floor(Math.random() * 5); 
    const result = [] 
    for (let i = randomCount; i >= 0; i--) {   
        result.push(i) 
    } 
    return result 
}