import ZPP_Set_ZPP_CbSet from '../util/ZPP_Set_ZPP_CbSet.js';
import ZPP_CbSetPair from '../callbacks/ZPP_CbSetPair.js';
import ZPP_CbSet from '../callbacks/ZPP_CbSet.js';
export default class ZPP_CbSetManager {
	constructor(space) {
		this.space = null;
		this.cbsets = null;
		if(ZPP_Set_ZPP_CbSet.zpp_pool == null) {
			this.cbsets = new ZPP_Set_ZPP_CbSet();
		} else {
			this.cbsets = ZPP_Set_ZPP_CbSet.zpp_pool;
			ZPP_Set_ZPP_CbSet.zpp_pool = this.cbsets.next;
			this.cbsets.next = null;
		}
		this.cbsets.lt = ZPP_CbSet.setlt;
		this.space = space;
	}
	get(cbTypes) {
		if(cbTypes.head == null) {
			return null;
		}
		let fake;
		if(ZPP_CbSet.zpp_pool == null) {
			fake = new ZPP_CbSet();
		} else {
			fake = ZPP_CbSet.zpp_pool;
			ZPP_CbSet.zpp_pool = fake.next;
			fake.next = null;
		}
		let faketypes = fake.cbTypes;
		fake.cbTypes = cbTypes;
		let res = this.cbsets.find_weak(fake);
		let ret;
		if(res != null) {
			ret = res.data;
		} else {
			let set = ZPP_CbSet.get(cbTypes);
			this.cbsets.insert(set);
			set.manager = this;
			ret = set;
		}
		fake.cbTypes = faketypes;
		let o = fake;
		o.listeners.clear();
		o.zip_listeners = true;
		o.bodylisteners.clear();
		o.zip_bodylisteners = true;
		o.conlisteners.clear();
		o.zip_conlisteners = true;
		while(o.cbTypes.head != null) {
			let cb = o.cbTypes.pop_unsafe();
			cb.cbsets.remove(o);
		}
		o.next = ZPP_CbSet.zpp_pool;
		ZPP_CbSet.zpp_pool = o;
		return ret;
	}
	remove(set) {
		this.cbsets.remove(set);
		while(set.cbpairs.head != null) {
			let pair = set.cbpairs.pop_unsafe();
			if(pair.a != pair.b) {
				if(set == pair.a) {
					pair.b.cbpairs.remove(pair);
				} else {
					pair.a.cbpairs.remove(pair);
				}
			}
			let o = pair;
			o.a = o.b = null;
			o.listeners.clear();
			o.next = ZPP_CbSetPair.zpp_pool;
			ZPP_CbSetPair.zpp_pool = o;
		}
		set.manager = null;
	}
	clear() {
	}
	validate() {
		if(!this.cbsets.empty()) {
			let set_ite = this.cbsets.parent;
			while(set_ite.prev != null) set_ite = set_ite.prev;
			while(set_ite != null) {
				let cb = set_ite.data;
				cb.validate();
				if(set_ite.next != null) {
					set_ite = set_ite.next;
					while(set_ite.prev != null) set_ite = set_ite.prev;
				} else {
					while(set_ite.parent != null && set_ite == set_ite.parent.next) set_ite = set_ite.parent;
					set_ite = set_ite.parent;
				}
			}
		}
	}
	pair(a,b) {
		let ret = null;
		let pairs = a.cbpairs.length < b.cbpairs.length ? a.cbpairs : b.cbpairs;
		let cx_ite = pairs.head;
		while(cx_ite != null) {
			let p = cx_ite.elt;
			if(p.a == a && p.b == b || p.a == b && p.b == a) {
				ret = p;
				break;
			}
			cx_ite = cx_ite.next;
		}
		if(ret == null) {
			let ret1;
			if(ZPP_CbSetPair.zpp_pool == null) {
				ret1 = new ZPP_CbSetPair();
			} else {
				ret1 = ZPP_CbSetPair.zpp_pool;
				ZPP_CbSetPair.zpp_pool = ret1.next;
				ret1.next = null;
			}
			ret1.zip_listeners = true;
			if(ZPP_CbSet.setlt(a,b)) {
				ret1.a = a;
				ret1.b = b;
			} else {
				ret1.a = b;
				ret1.b = a;
			}
			ret = ret1;
			a.cbpairs.add(ret);
			if(b != a) {
				b.cbpairs.add(ret);
			}
		}
		if(ret.zip_listeners) {
			ret.zip_listeners = false;
			ret.__validate();
		}
		return ret;
	}
	valid_listener(i) {
		return i.space == this.space;
	}
}
