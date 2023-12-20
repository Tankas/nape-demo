import ZNPList_ZPP_InteractionListener from '../util/ZNPList_ZPP_InteractionListener.js';
import ZPP_CbSet from './ZPP_CbSet.js';
export default class ZPP_CbSetPair {
	constructor() {
		this.listeners = null;
		this.zip_listeners = false;
		this.next = null;
		this.b = null;
		this.a = null;
		this.listeners = new ZNPList_ZPP_InteractionListener();
	}
	free() {
		this.a = this.b = null;
		this.listeners.clear();
	}
	alloc() {
		this.zip_listeners = true;
	}
	compatible(i) {
		let tmp;
		let _this = i.options1;
		let xs = this.a.cbTypes;
		if(_this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes)) {
			let _this = i.options2;
			let xs = this.b.cbTypes;
			tmp = _this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes);
		} else {
			tmp = false;
		}
		if(!tmp) {
			let _this = i.options2;
			let xs = this.a.cbTypes;
			if(_this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes)) {
				let _this = i.options1;
				let xs = this.b.cbTypes;
				if(_this.nonemptyintersection(xs,_this.includes)) {
					return !_this.nonemptyintersection(xs,_this.excludes);
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	invalidate() {
		this.zip_listeners = true;
	}
	validate() {
		if(this.zip_listeners) {
			this.zip_listeners = false;
			this.__validate();
		}
	}
	__validate() {
		this.listeners.clear();
		let aite = this.a.listeners.head;
		let bite = this.b.listeners.head;
		while(aite != null && bite != null) {
			let ax = aite.elt;
			let bx = bite.elt;
			if(ax == bx) {
				let tmp;
				let tmp1;
				let _this = ax.options1;
				let xs = this.a.cbTypes;
				if(_this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes)) {
					let _this = ax.options2;
					let xs = this.b.cbTypes;
					tmp1 = _this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes);
				} else {
					tmp1 = false;
				}
				if(!tmp1) {
					let _this = ax.options2;
					let xs = this.a.cbTypes;
					if(_this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes)) {
						let _this = ax.options1;
						let xs = this.b.cbTypes;
						tmp = _this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes);
					} else {
						tmp = false;
					}
				} else {
					tmp = true;
				}
				if(tmp) {
					this.listeners.add(ax);
				}
				aite = aite.next;
				bite = bite.next;
			} else if(ax.precedence > bx.precedence || ax.precedence == bx.precedence && ax.id > bx.id) {
				aite = aite.next;
			} else {
				bite = bite.next;
			}
		}
	}
	empty_intersection() {
		return this.listeners.head == null;
	}
	single_intersection(i) {
		let ite = this.listeners.head;
		if(ite != null && ite.elt == i) {
			return ite.next == null;
		} else {
			return false;
		}
	}
	forall(event,cb) {
		let cx_ite = this.listeners.head;
		while(cx_ite != null) {
			let x = cx_ite.elt;
			if(x.event == event) {
				cb(x);
			}
			cx_ite = cx_ite.next;
		}
	}
	static get(a,b) {
		let ret;
		if(ZPP_CbSetPair.zpp_pool == null) {
			ret = new ZPP_CbSetPair();
		} else {
			ret = ZPP_CbSetPair.zpp_pool;
			ZPP_CbSetPair.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.zip_listeners = true;
		if(ZPP_CbSet.setlt(a,b)) {
			ret.a = a;
			ret.b = b;
		} else {
			ret.a = b;
			ret.b = a;
		}
		return ret;
	}
	static setlt(x,y) {
		if(!ZPP_CbSet.setlt(x.a,y.a)) {
			if(x.a == y.a) {
				return ZPP_CbSet.setlt(x.b,y.b);
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
}
ZPP_CbSetPair.zpp_pool = null;
