
//CLASS
function Square(x){
	this.x = x;
}

Square.prototype.square = function(){
	return this.x*this.x;
}



//mySquare is the instance/Object of the Square CLASS.
var mySquare = new Square(5);
console.log(mySquare.square());

var mySquare = new Square(7);
console.log(mySquare.square());