/*************************************************************************\
|
|  Name:
|  Year:
|
\*************************************************************************/
function myCode() {
//Level 1
    // var angle = arctan(3/4);
    // mouse.faceDirection(angle);
    // mouse.moveDistance(5);
//Level 2
    var a = 14 - mouse.X();
    var b = 10 - mouse.Y();
    var hypotenuse = sqrt(a*a + b*b);


    var adjacent = 14 - 5;
    var opposite = 10 - mouse.Y();
    var angle = arctan(opposite/adjacent);
    mouse.faceDirection(angle);
    mouse.moveDistance(hypotenuse);
}
//    mouse.eatCheese();

//}
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
