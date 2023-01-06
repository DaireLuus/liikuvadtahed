let canvas;
let ctx;
let sinus = [];
let cosinus = [];
let stars = [];



window.onload = function(){
	canvas = document.querySelector("#canvas");
	ctx = canvas.getContext("2d");
	ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
	ctx.translate(canvas.width / 2, canvas.height / 2);
	calcTrigo()
	
	
}




function multiplyMatrix2(a,b){
	let multMatrix = [];
	for(let i = 0; i < 2; i ++){
		let resultA = a[i][0] * b[0][0] + a[i][1] * b[1][0];
		let resultB = a[i][0] * b[0][1] + a[i][1] * b[1][1];
		multMatrix.push([resultA, resultB]);
	}
	return multMatrix;
}

function multiplyMatrix3(a,b){
	let multmatrix = [];
	for(let i = 0; i < a.length; i ++){
		let tempmatrix = [];
		for(let j = 0; j < 3; j ++){
			let result = a[i][0] * b[0][j] + a[i][1] * b[1][j] + a[i][2] * b[2][j];
			tempmatrix.push(result);
		}
		multmatrix.push(tempmatrix);
	}
	return multmatrix;
}

function calcTrigo(){
	for (let i = 0; i < 360; i ++){
		sinus.push(Math.sin(Math.PI / 180 * i));
		cosinus.push(Math.cos(Math.PI / 180 * i));
	}
	
	begin();
	
	
}




function begin(){
	let verts = 4 + Math.round(Math.random() * 20);
	let size = 100 + Math.round(Math.random() * 50);
	let lw = 5 + Math.round(Math.random() * 15);
	for(let count = 0; count <= 5; count++){
		if(count < 1){
			stars.push(new Star(0, 0, verts, size*1.5, lw*1.5, 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')'));}
		if(count < 2){
		 	stars.push(new Star(canvas.width/3, canvas.height/6, verts, size, lw, 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')'));}
		if(count < 3){
			stars.push(new Star(-canvas.width/3, -canvas.height/6, verts, size, lw, 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')'));}
		if(count < 4){
				stars.push(new Star(canvas.width/3, canvas.height/6, verts, size*0.5, lw*0.5, 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')'));}
		if(count < 5){
			   stars.push(new Star(-canvas.width/3, -canvas.height/6, verts, size*0.5, lw*0.5, 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')'));}
    } 
	
	moveObjects();
	setTimeout(function() {
		location.reload();
	  }, 3000); 
	
	
	
	
	
	
}




function moveObjects(){
	canvas.width = canvas.width;
	ctx.translate(canvas.width / 2, canvas.height / 2);
	
	stars[0].rotAroundX();
	stars[0].rotAroundY();
	stars[0].rotAroundZ();
	stars[1].rotAroundX();
	stars[1].rotAroundY();
	stars[1].rotAroundZ();
	stars[2].rotAroundX();
	stars[2].rotAroundY();
	stars[2].rotAroundZ();
	stars[3].rotAroundX();
	stars[3].rotAroundY();
	stars[3].rotAroundZ();
	stars[4].rotAroundX();
	stars[4].rotAroundY();
	stars[4].rotAroundZ();
	
		
	requestAnimationFrame(moveObjects);
	
}

class Star{
	constructor(x,y,verts,size,lw,lcolor){
		this.x = x;
		this.y = y;
		this.verts = verts;
		this.size = size;
		this.lw = lw;
		this.lcolor = lcolor;
		this.points = [];
		this.zeroangle = 0;
		this.createPoints();
	}
	
	createPoints(){
		let d = [this.size, this.size / 2];
		let anglestep = 360 / (this.verts * 2);
		for(let i = 0; i < this.verts * 2; i ++){
			this.points.push([Math.round(cosinus[Math.round(i * anglestep)] * d[i%2] + this.x), Math.round(sinus[Math.round(i * anglestep)] * d[i%2] + this.y), 1]);
		}
		this.drawSelf(this.points);
	}
	
	drawSelf(currentpoints){
		ctx.lineWidth = this.lw;
		ctx.strokeStyle = this.lcolor;
		ctx.lineJoin = "miter";
		ctx.beginPath();
			ctx.moveTo(currentpoints[0][0],currentpoints[0][1]);
			for(let i = 1; i < currentpoints.length; i ++){
				ctx.lineTo(currentpoints[i][0],currentpoints[i][1]);
			}
			ctx.lineTo(currentpoints[0][0],currentpoints[0][1]);
			ctx.lineTo(currentpoints[1][0],currentpoints[1][1]);
			ctx.stroke();
		ctx.closePath();
	}
	
	rotAroundY(){
		this.zeroangle ++;
		this.zeroangle = this.zeroangle%360;
		let rotMatrixY = [[cosinus[this.zeroangle], 0, sinus[this.zeroangle]], [0, 1, 0], [-sinus[this.zeroangle], 0, cosinus[this.zeroangle]]];
		let newPoints = [];
		for(let i = 0; i < this.points.length; i++){
			let singlePoint = [];
			singlePoint.push(this.points[i]);
			let tempMatrix = multiplyMatrix3(singlePoint, rotMatrixY);
			//console.log(tempMatrix);
			newPoints.push(tempMatrix[0]);
		}
		//console.log(newPoints);
		this.drawSelf(newPoints);
	}
	rotAroundX(){
		this.zeroangle ++;
		this.zeroangle = this.zeroangle%360;
		let rotMatrixX = [[1, 0, 0], [0,cosinus[this.zeroangle] ,-sinus[this.zeroangle]], [0, sinus[this.zeroangle], cosinus[this.zeroangle]]];
		let newPoints = [];
		for(let i = 0; i < this.points.length; i++){
			let singlePoint = [];
			singlePoint.push(this.points[i]);
			let tempMatrix = multiplyMatrix3(singlePoint, rotMatrixX);
			//console.log(tempMatrix);
			newPoints.push(tempMatrix[0]);
		}
		//console.log(newPoints);
		this.drawSelf(newPoints);
	}
	rotAroundZ(){
		this.zeroangle ++;
		this.zeroangle = this.zeroangle%360;
		let rotMatrixZ = [[cosinus[this.zeroangle] ,-sinus[this.zeroangle], 0], [sinus[this.zeroangle], cosinus[this.zeroangle], 0], [0, 0, 1]];
		let newPoints = [];
		for(let i = 0; i < this.points.length; i++){
			let singlePoint = [];
			singlePoint.push(this.points[i]);
			let tempMatrix = multiplyMatrix3(singlePoint, rotMatrixZ);
			//console.log(tempMatrix);
			newPoints.push(tempMatrix[0]);
		}
		//console.log(newPoints);
		this.drawSelf(newPoints);
	}
}
