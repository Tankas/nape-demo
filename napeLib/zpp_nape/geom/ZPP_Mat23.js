import Mat23 from '../../nape/geom/Mat23.js';
export default class ZPP_Mat23 {
	constructor() {
		this.next = null;
		this._invalidate = null;
		this.ty = 0.0;
		this.tx = 0.0;
		this.d = 0.0;
		this.c = 0.0;
		this.b = 0.0;
		this.a = 0.0;
		this.outer = null;
	}
	wrapper() {
		if(this.outer == null) {
			this.outer = new Mat23();
			let o = this.outer.zpp_inner;
			o.next = ZPP_Mat23.zpp_pool;
			ZPP_Mat23.zpp_pool = o;
			this.outer.zpp_inner = this;
		}
		return this.outer;
	}
	invalidate() {
		if(this._invalidate != null) {
			this._invalidate();
		}
	}
	set(m) {
		this.setas(m.a,m.b,m.c,m.d,m.tx,m.ty);
	}
	setas(a,b,c,d,tx,ty) {
		this.tx = tx;
		this.ty = ty;
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
	}
	free() {
	}
	alloc() {
	}
	static get() {
		let ret;
		if(ZPP_Mat23.zpp_pool == null) {
			ret = new ZPP_Mat23();
		} else {
			ret = ZPP_Mat23.zpp_pool;
			ZPP_Mat23.zpp_pool = ret.next;
			ret.next = null;
		}
		return ret;
	}
	static identity() {
		let ret = ZPP_Mat23.get();
		ret.setas(1,0,0,1,0,0);
		return ret;
	}
}
ZPP_Mat23.zpp_pool = null;
