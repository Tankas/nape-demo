import ZPP_Vec2List from '../../zpp_nape/util/ZPP_Vec2List.js';
export default class Vec2Iterator {
	constructor() {
		this.zpp_next = null;
		this.zpp_critical = false;
		this.zpp_i = 0;
		this.zpp_inner = null;
		if(!ZPP_Vec2List.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate " + "Vec2" + "Iterator derp!");
		}
	}
	hasNext() {
		this.zpp_inner.zpp_inner.valmod();
		let length = this.zpp_inner.zpp_gl();
		this.zpp_critical = true;
		if(this.zpp_i < length) {
			return true;
		} else {
			this.zpp_next = Vec2Iterator.zpp_pool;
			Vec2Iterator.zpp_pool = this;
			this.zpp_inner = null;
			return false;
		}
	}
	next() {
		this.zpp_critical = false;
		return this.zpp_inner.at(this.zpp_i++);
	}
	static get(list) {
		let ret;
		if(Vec2Iterator.zpp_pool == null) {
			ZPP_Vec2List.internal = true;
			let ret1 = new Vec2Iterator();
			ZPP_Vec2List.internal = false;
			ret = ret1;
		} else {
			let r = Vec2Iterator.zpp_pool;
			Vec2Iterator.zpp_pool = r.zpp_next;
			ret = r;
		}
		ret.zpp_i = 0;
		ret.zpp_inner = list;
		ret.zpp_critical = false;
		return ret;
	}
}
Vec2Iterator.zpp_pool = null;
