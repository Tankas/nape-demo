export default class Graphics {
	constructor() {
	}
	clear() {
	}
	lineStyle(thickness,color,alpha) {
		if(alpha == null) {
			alpha = 1;
		}
	}
	moveTo(x,y) {
	}
	lineTo(x,y) {
	}
	quadraticCurveTo(cx,cy,endx,endy) {
	}
	drawCircle(x,y,radius) {
	}
	drawRect(x,y,width,height) {
	}
	beginFill(color,alpha) {
		if(alpha == null) {
			alpha = 1;
		}
	}
	endFill() {
	}
	static createGraphics() {
		return new Graphics();
	}
}
