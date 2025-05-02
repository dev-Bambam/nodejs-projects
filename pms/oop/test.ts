type Colorful = {
    color: string
}
type Circle = {
    radius: number
}

type ColorfulCircle = Colorful & Circle

function draw(circle: ColorfulCircle) {
    console.log(`Radius was ${circle.radius}`)
    console.log(`Color was ${circle.color}`)
}

const myCircle:ColorfulCircle = {
    
}
draw({color: "red", radius:34})