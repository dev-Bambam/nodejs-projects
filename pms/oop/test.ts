interface Shape{
    area():number
}

class Rectangle implements Shape{
    constructor(
        public width: number,
        public height:number
    ) { }
    
    area(): number {
        return this.height * this.width
    }
}
class Square implements Shape{
    constructor(public size: number) { }
    area(): number {
        return this.size * this.size
    }
}

function testShape(shape: Shape) {
    console.assert(shape.area() >0)
}