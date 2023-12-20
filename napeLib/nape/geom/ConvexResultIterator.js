import ZPP_ConvexResultList from '../../zpp_nape/util/ZPP_ConvexResultList.js';
export default class ConvexResultIterator {
	constructor() {
		this.zpp_next = null;
		this.zpp_critical = false;
		this.zpp_i = 0;
		this.zpp_inner = null;
		if(!ZPP_ConvexResultList.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate " + "ConvexResult" + "Iterator derp!");
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
			this.zpp_next = ConvexResultIterator.zpp_pool;
			ConvexResultIterator.zpp_pool = this;
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
		if(ConvexResultIterator.zpp_pool == null) {
			ZPP_ConvexResultList.internal = true;
			let ret1 = new ConvexResultIterator();
			ZPP_ConvexResultList.internal = false;
			ret = ret1;
		} else {
			let r = ConvexResultIterator.zpp_pool;
			ConvexResultIterator.zpp_pool = r.zpp_next;
			ret = r;
		}
		ret.zpp_i = 0;
		ret.zpp_inner = list;
		ret.zpp_critical = false;
		return ret;
	}
}
ConvexResultIterator.zpp_pool = null;
