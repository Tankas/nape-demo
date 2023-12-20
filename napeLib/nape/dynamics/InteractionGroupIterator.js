import ZPP_InteractionGroupList from '../../zpp_nape/util/ZPP_InteractionGroupList.js';
export default class InteractionGroupIterator {
	constructor() {
		this.zpp_next = null;
		this.zpp_critical = false;
		this.zpp_i = 0;
		this.zpp_inner = null;
		if(!ZPP_InteractionGroupList.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate " + "InteractionGroup" + "Iterator derp!");
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
			this.zpp_next = InteractionGroupIterator.zpp_pool;
			InteractionGroupIterator.zpp_pool = this;
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
		if(InteractionGroupIterator.zpp_pool == null) {
			ZPP_InteractionGroupList.internal = true;
			let ret1 = new InteractionGroupIterator();
			ZPP_InteractionGroupList.internal = false;
			ret = ret1;
		} else {
			let r = InteractionGroupIterator.zpp_pool;
			InteractionGroupIterator.zpp_pool = r.zpp_next;
			ret = r;
		}
		ret.zpp_i = 0;
		ret.zpp_inner = list;
		ret.zpp_critical = false;
		return ret;
	}
}
InteractionGroupIterator.zpp_pool = null;
