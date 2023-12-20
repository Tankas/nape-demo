import ZPP_MatMN from '../../zpp_nape/geom/ZPP_MatMN.js';
export default class MatMN {
	constructor(rows,cols) {
		this.zpp_inner = null;
		if(rows <= 0 || cols <= 0) {
			throw haxe_Exception.thrown("Error: MatMN::dimensions cannot be < 1");
		}
		this.zpp_inner = new ZPP_MatMN(rows,cols);
		this.zpp_inner.outer = this;
	}
	get_rows() {
		return this.zpp_inner.m;
	}
	get_cols() {
		return this.zpp_inner.n;
	}
	x(row,col) {
		if(row < 0 || col < 0 || row >= this.zpp_inner.m || col >= this.zpp_inner.n) {
			throw haxe_Exception.thrown("Error: MatMN indices out of range");
		}
		return this.zpp_inner.x[row * this.zpp_inner.n + col];
	}
	setx(row,col,x) {
		if(row < 0 || col < 0 || row >= this.zpp_inner.m || col >= this.zpp_inner.n) {
			throw haxe_Exception.thrown("Error: MatMN indices out of range");
		}
		return this.zpp_inner.x[row * this.zpp_inner.n + col] = x;
	}
	toString() {
		let ret = "{ ";
		let fst = true;
		let _g = 0;
		let _g1 = this.zpp_inner.m;
		while(_g < _g1) {
			let i = _g++;
			if(!fst) {
				ret += "; ";
			}
			fst = false;
			let _g1 = 0;
			let _g2 = this.zpp_inner.n;
			while(_g1 < _g2) {
				let j = _g1++;
				if(i < 0 || j < 0 || i >= this.zpp_inner.m || j >= this.zpp_inner.n) {
					throw haxe_Exception.thrown("Error: MatMN indices out of range");
				}
				ret += this.zpp_inner.x[i * this.zpp_inner.n + j] + " ";
			}
		}
		ret += "}";
		return ret;
	}
	transpose() {
		let ret = new MatMN(this.zpp_inner.n,this.zpp_inner.m);
		let _g = 0;
		let _g1 = this.zpp_inner.m;
		while(_g < _g1) {
			let i = _g++;
			let _g1 = 0;
			let _g2 = this.zpp_inner.n;
			while(_g1 < _g2) {
				let j = _g1++;
				if(i < 0 || j < 0 || i >= this.zpp_inner.m || j >= this.zpp_inner.n) {
					throw haxe_Exception.thrown("Error: MatMN indices out of range");
				}
				let x = this.zpp_inner.x[i * this.zpp_inner.n + j];
				if(j < 0 || i < 0 || j >= ret.zpp_inner.m || i >= ret.zpp_inner.n) {
					throw haxe_Exception.thrown("Error: MatMN indices out of range");
				}
				ret.zpp_inner.x[j * ret.zpp_inner.n + i] = x;
			}
		}
		return ret;
	}
	mul(matrix) {
		let y = matrix;
		if(this.zpp_inner.n != y.zpp_inner.m) {
			throw haxe_Exception.thrown("Error: Matrix dimensions aren't compatible");
		}
		let ret = new MatMN(this.zpp_inner.m,y.zpp_inner.n);
		let _g = 0;
		let _g1 = this.zpp_inner.m;
		while(_g < _g1) {
			let i = _g++;
			let _g1 = 0;
			let _g2 = y.zpp_inner.n;
			while(_g1 < _g2) {
				let j = _g1++;
				let v = 0.0;
				let _g = 0;
				let _g2 = this.zpp_inner.n;
				while(_g < _g2) {
					let k = _g++;
					if(i < 0 || k < 0 || i >= this.zpp_inner.m || k >= this.zpp_inner.n) {
						throw haxe_Exception.thrown("Error: MatMN indices out of range");
					}
					let v1 = this.zpp_inner.x[i * this.zpp_inner.n + k];
					if(k < 0 || j < 0 || k >= y.zpp_inner.m || j >= y.zpp_inner.n) {
						throw haxe_Exception.thrown("Error: MatMN indices out of range");
					}
					v += v1 * y.zpp_inner.x[k * y.zpp_inner.n + j];
				}
				if(i < 0 || j < 0 || i >= ret.zpp_inner.m || j >= ret.zpp_inner.n) {
					throw haxe_Exception.thrown("Error: MatMN indices out of range");
				}
				ret.zpp_inner.x[i * ret.zpp_inner.n + j] = v;
			}
		}
		return ret;
	}
}
