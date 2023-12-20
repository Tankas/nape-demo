import ZPP_ArbiterList from '../../zpp_nape/util/ZPP_ArbiterList.js';
export default class ArbiterIterator {
	constructor() {
		this.zpp_next = null;
		this.zpp_critical = false;
		this.zpp_i = 0;
		this.zpp_inner = null;
		if(!ZPP_ArbiterList.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate " + "Arbiter" + "Iterator derp!");
		}
	}
	hasNext() {
		this.zpp_inner.zpp_inner.valmod();
		let length = this.zpp_inner.zpp_gl();
		this.zpp_critical = true;
		if(this.zpp_i < length) {
			return true;
		} else {
			this.zpp_next = ArbiterIterator.zpp_pool;
			ArbiterIterator.zpp_pool = this;
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
		if(ArbiterIterator.zpp_pool == null) {
			ZPP_ArbiterList.internal = true;
			let ret1 = new ArbiterIterator();
			ZPP_ArbiterList.internal = false;
			ret = ret1;
		} else {
			let r = ArbiterIterator.zpp_pool;
			ArbiterIterator.zpp_pool = r.zpp_next;
			ret = r;
		}
		ret.zpp_i = 0;
		ret.zpp_inner = list;
		ret.zpp_critical = false;
		return ret;
	}
}
ArbiterIterator.zpp_pool = null;
