export default class ZPP_MatMN {
	constructor(m,n) {
		this.x = null;
		this.n = 0;
		this.m = 0;
		this.outer = null;
		this.m = m;
		this.n = n;
		this.x = [];
		let _g = 0;
		let _g1 = m * n;
		while(_g < _g1) {
			let i = _g++;
			this.x.push(0.0);
		}
	}
}
