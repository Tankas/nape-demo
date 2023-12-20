import ZPP_InteractorList from '../../zpp_nape/util/ZPP_InteractorList.js';
export default class InteractorIterator {
	constructor() {
		this.zpp_next = null;
		this.zpp_critical = false;
		this.zpp_i = 0;
		this.zpp_inner = null;
		if(!ZPP_InteractorList.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate " + "Interactor" + "Iterator derp!");
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
			this.zpp_next = InteractorIterator.zpp_pool;
			InteractorIterator.zpp_pool = this;
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
		if(InteractorIterator.zpp_pool == null) {
			ZPP_InteractorList.internal = true;
			let ret1 = new InteractorIterator();
			ZPP_InteractorList.internal = false;
			ret = ret1;
		} else {
			let r = InteractorIterator.zpp_pool;
			InteractorIterator.zpp_pool = r.zpp_next;
			ret = r;
		}
		ret.zpp_i = 0;
		ret.zpp_inner = list;
		ret.zpp_critical = false;
		return ret;
	}
}
InteractorIterator.zpp_pool = null;
