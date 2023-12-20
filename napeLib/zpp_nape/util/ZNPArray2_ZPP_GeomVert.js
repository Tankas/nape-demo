export default class ZNPArray2_ZPP_GeomVert {
	constructor(width,height) {
		this.width = 0;
		this.list = null;
		this.width = width;
		this.list = [];
	}
	resize(width,height,def) {
		this.width = width;
		let _g = 0;
		let _g1 = width * height;
		while(_g < _g1) {
			let i = _g++;
			this.list[i] = def;
		}
	}
	get(x,y) {
		return this.list[y * this.width + x];
	}
	set(x,y,obj) {
		return this.list[y * this.width + x] = obj;
	}
}
