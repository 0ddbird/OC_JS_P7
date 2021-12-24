console.log("Hello world");

let myNum = 8;

let myArray: number[] = [];

myArray.push(myNum)
myArray.push(10)

console.log(myArray)

function myFunction(param1: number, param2: string):string {
    return param1 + param2
}

console.log(myFunction(12, 'test'))