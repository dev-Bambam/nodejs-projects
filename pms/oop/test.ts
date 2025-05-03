const animal = {
    speak() {
        console.log('Animal speak')
    }
}

const dog = Object.create(animal)
dog.bark = function () {
    console.log("dog barks")
}

dog.speak()
dog.bark()