/*************************************************************************\
|
|  Name:
|  Year:
|
\*************************************************************************/
function myCode() {
// starting:
    // mouse.faceDirection(90);
    // mouse.moveDistance(4);
    // mouse.faceDirection(358);
//Level 1
mouse.faceDirection(358);

    // var angle = arctan(4/3);
    // mouse.faceDirection(angle);
    // mouse.moveDistance(5);

//Level 2

    var a = 14 - 5;
    var b = 12 - 10;
    var hypotenuse = sqrt(a*a + b*b);


    var adjacent = 14 - 5;
    var opposite = 12 - 10;
    var angle = arctan(opposite/adjacent);
    mouse.faceDirection(angle+90);
    mouse.moveDistance(hypotenuse);


}
/*
//Level 3
    var a = cheese.X() - mouse.X();
    var b = cheese.Y() - mouse.Y()
    var hypotenuse = sqrt(a*a + b*b);

    var slope;
    if (b === 0) {
        console.log("Panic!!");
    } else {
        slope = a/b;

        if (slope >= 0) {

        } else {

        }
    }

}

// read access
mouse.X()
mouse.Y()
mouse.direction()
cheese[i].X()
cheese[i].Y()

// write access
mouse.faceDirection(90)
mouse.moveDistance(4.5)
mouse.eat()

//eg

for each (cheese in cheeses) {
    var hypotenuse = 10 + cheese.X();

}

Mathematical uses you can use:

sqrt
exponent
multiply
divide
add
subtract

pi
sine
cosine
tangent
arcsin
arccos
arctan

*/
