import ZPP_ShapeList from '../../zpp_nape/util/ZPP_ShapeList.js';
export default class ShapeIterator {
	constructor() {
		this.zpp_next = null;
		this.zpp_critical = false;
		this.zpp_i = 0;
		this.zpp_inner = null;
		if(!ZPP_ShapeList.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate " + "Shape" + "Iterator derp!");
		}
	}
	hasNext() {
		this.zpp_inner.zpp_inner.valmod();
		let _this = this.zpp_inner;
		_this.zpp_inner.valmod();
		if(_this.zpp_inner.zip_length) {
			_this.zpp_inner.zip_length = false;
			_this.zpp_inner.user_length = _this.zpp_inner.inner.length;
		}
		let length = _this.zpp_inner.user_length;
		this.zpp_critical = true;
		if(this.zpp_i < length) {
			return true;
		} else {
			this.zpp_next = ShapeIterator.zpp_pool;
			ShapeIterator.zpp_pool = this;
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
		if(ShapeIterator.zpp_pool == null) {
			ZPP_ShapeList.internal = true;
			let ret1 = new ShapeIterator();
			ZPP_ShapeList.internal = false;
			ret = ret1;
		} else {
			let r = ShapeIterator.zpp_pool;
			ShapeIterator.zpp_pool = r.zpp_next;
			ret = r;
		}
		ret.zpp_i = 0;
		ret.zpp_inner = list;
		ret.zpp_critical = false;
		return ret;
	}
}
ShapeIterator.zpp_pool = null;
