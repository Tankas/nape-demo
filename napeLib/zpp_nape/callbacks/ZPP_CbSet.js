import ZNPNode_ZPP_ConstraintListener from '../util/ZNPNode_ZPP_ConstraintListener.js';
import ZNPNode_ZPP_BodyListener from '../util/ZNPNode_ZPP_BodyListener.js';
import ZNPNode_ZPP_InteractionListener from '../util/ZNPNode_ZPP_InteractionListener.js';
import ZNPList_ZPP_CbSetPair from '../util/ZNPList_ZPP_CbSetPair.js';
import ZNPList_ZPP_CbType from '../util/ZNPList_ZPP_CbType.js';
import ZNPList_ZPP_Interactor from '../util/ZNPList_ZPP_Interactor.js';
import ZNPList_ZPP_Constraint from '../util/ZNPList_ZPP_Constraint.js';
import ZNPList_ZPP_ConstraintListener from '../util/ZNPList_ZPP_ConstraintListener.js';
import ZNPList_ZPP_BodyListener from '../util/ZNPList_ZPP_BodyListener.js';
import ZNPList_ZPP_InteractionListener from '../util/ZNPList_ZPP_InteractionListener.js';
import ZPP_CbSetPair from './ZPP_CbSetPair.js';
import ZPP_ID from '../ZPP_ID.js';
export default class ZPP_CbSet {
	constructor() {
		this.wrap_constraints = null;
		this.constraints = null;
		this.wrap_interactors = null;
		this.interactors = null;
		this.zip_conlisteners = false;
		this.conlisteners = null;
		this.zip_bodylisteners = false;
		this.bodylisteners = null;
		this.zip_listeners = false;
		this.listeners = null;
		this.cbpairs = null;
		this.manager = null;
		this.id = 0;
		this.next = null;
		this.count = 0;
		this.cbTypes = null;
		this.cbTypes = new ZNPList_ZPP_CbType();
		this.listeners = new ZNPList_ZPP_InteractionListener();
		this.zip_listeners = true;
		this.bodylisteners = new ZNPList_ZPP_BodyListener();
		this.zip_bodylisteners = true;
		this.conlisteners = new ZNPList_ZPP_ConstraintListener();
		this.zip_conlisteners = true;
		this.constraints = new ZNPList_ZPP_Constraint();
		this.interactors = new ZNPList_ZPP_Interactor();
		this.id = ZPP_ID.CbSet();
		this.cbpairs = new ZNPList_ZPP_CbSetPair();
	}
	increment() {
		this.count++;
	}
	decrement() {
		return --this.count == 0;
	}
	invalidate_pairs() {
		let cx_ite = this.cbpairs.head;
		while(cx_ite != null) {
			let cb = cx_ite.elt;
			cb.zip_listeners = true;
			cx_ite = cx_ite.next;
		}
	}
	invalidate_listeners() {
		this.zip_listeners = true;
		this.invalidate_pairs();
	}
	validate_listeners() {
		if(this.zip_listeners) {
			this.zip_listeners = false;
			this.realvalidate_listeners();
		}
	}
	realvalidate_listeners() {
		this.listeners.clear();
		let cx_ite = this.cbTypes.head;
		while(cx_ite != null) {
			let cb = cx_ite.elt;
			let npre = null;
			let nite = this.listeners.head;
			let cite = cb.listeners.head;
			while(cite != null) {
				let cx = cite.elt;
				if(nite != null && nite.elt == cx) {
					cite = cite.next;
					npre = nite;
					nite = nite.next;
				} else {
					let tmp;
					if(nite != null) {
						let b = nite.elt;
						tmp = cx.precedence > b.precedence || cx.precedence == b.precedence && cx.id > b.id;
					} else {
						tmp = true;
					}
					if(tmp) {
						if(cx.space == this.manager.space) {
							let _this = this.listeners;
							let ret;
							if(ZNPNode_ZPP_InteractionListener.zpp_pool == null) {
								ret = new ZNPNode_ZPP_InteractionListener();
							} else {
								ret = ZNPNode_ZPP_InteractionListener.zpp_pool;
								ZNPNode_ZPP_InteractionListener.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.elt = cx;
							let temp = ret;
							if(npre == null) {
								temp.next = _this.head;
								_this.head = temp;
							} else {
								temp.next = npre.next;
								npre.next = temp;
							}
							_this.pushmod = _this.modified = true;
							_this.length++;
							npre = temp;
						}
						cite = cite.next;
					} else {
						npre = nite;
						nite = nite.next;
					}
				}
			}
			cx_ite = cx_ite.next;
		}
	}
	invalidate_bodylisteners() {
		this.zip_bodylisteners = true;
	}
	validate_bodylisteners() {
		if(this.zip_bodylisteners) {
			this.zip_bodylisteners = false;
			this.realvalidate_bodylisteners();
		}
	}
	realvalidate_bodylisteners() {
		this.bodylisteners.clear();
		let cx_ite = this.cbTypes.head;
		while(cx_ite != null) {
			let cb = cx_ite.elt;
			let npre = null;
			let nite = this.bodylisteners.head;
			let cite = cb.bodylisteners.head;
			while(cite != null) {
				let cx = cite.elt;
				if(nite != null && nite.elt == cx) {
					cite = cite.next;
					npre = nite;
					nite = nite.next;
				} else {
					let tmp;
					if(nite != null) {
						let b = nite.elt;
						tmp = cx.precedence > b.precedence || cx.precedence == b.precedence && cx.id > b.id;
					} else {
						tmp = true;
					}
					if(tmp) {
						let _this = cx.options;
						if(!_this.nonemptyintersection(this.cbTypes,_this.excludes) && cx.space == this.manager.space) {
							let _this = this.bodylisteners;
							let ret;
							if(ZNPNode_ZPP_BodyListener.zpp_pool == null) {
								ret = new ZNPNode_ZPP_BodyListener();
							} else {
								ret = ZNPNode_ZPP_BodyListener.zpp_pool;
								ZNPNode_ZPP_BodyListener.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.elt = cx;
							let temp = ret;
							if(npre == null) {
								temp.next = _this.head;
								_this.head = temp;
							} else {
								temp.next = npre.next;
								npre.next = temp;
							}
							_this.pushmod = _this.modified = true;
							_this.length++;
							npre = temp;
						}
						cite = cite.next;
					} else {
						npre = nite;
						nite = nite.next;
					}
				}
			}
			cx_ite = cx_ite.next;
		}
	}
	invalidate_conlisteners() {
		this.zip_conlisteners = true;
	}
	validate_conlisteners() {
		if(this.zip_conlisteners) {
			this.zip_conlisteners = false;
			this.realvalidate_conlisteners();
		}
	}
	realvalidate_conlisteners() {
		this.conlisteners.clear();
		let cx_ite = this.cbTypes.head;
		while(cx_ite != null) {
			let cb = cx_ite.elt;
			let npre = null;
			let nite = this.conlisteners.head;
			let cite = cb.conlisteners.head;
			while(cite != null) {
				let cx = cite.elt;
				if(nite != null && nite.elt == cx) {
					cite = cite.next;
					npre = nite;
					nite = nite.next;
				} else {
					let tmp;
					if(nite != null) {
						let b = nite.elt;
						tmp = cx.precedence > b.precedence || cx.precedence == b.precedence && cx.id > b.id;
					} else {
						tmp = true;
					}
					if(tmp) {
						let _this = cx.options;
						if(!_this.nonemptyintersection(this.cbTypes,_this.excludes) && cx.space == this.manager.space) {
							let _this = this.conlisteners;
							let ret;
							if(ZNPNode_ZPP_ConstraintListener.zpp_pool == null) {
								ret = new ZNPNode_ZPP_ConstraintListener();
							} else {
								ret = ZNPNode_ZPP_ConstraintListener.zpp_pool;
								ZNPNode_ZPP_ConstraintListener.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.elt = cx;
							let temp = ret;
							if(npre == null) {
								temp.next = _this.head;
								_this.head = temp;
							} else {
								temp.next = npre.next;
								npre.next = temp;
							}
							_this.pushmod = _this.modified = true;
							_this.length++;
							npre = temp;
						}
						cite = cite.next;
					} else {
						npre = nite;
						nite = nite.next;
					}
				}
			}
			cx_ite = cx_ite.next;
		}
	}
	validate() {
		if(this.zip_listeners) {
			this.zip_listeners = false;
			this.realvalidate_listeners();
		}
		if(this.zip_bodylisteners) {
			this.zip_bodylisteners = false;
			this.realvalidate_bodylisteners();
		}
		if(this.zip_conlisteners) {
			this.zip_conlisteners = false;
			this.realvalidate_conlisteners();
		}
	}
	addConstraint(con) {
		this.constraints.add(con);
	}
	addInteractor(intx) {
		this.interactors.add(intx);
	}
	remConstraint(con) {
		this.constraints.remove(con);
	}
	remInteractor(intx) {
		this.interactors.remove(intx);
	}
	free() {
		this.listeners.clear();
		this.zip_listeners = true;
		this.bodylisteners.clear();
		this.zip_bodylisteners = true;
		this.conlisteners.clear();
		this.zip_conlisteners = true;
		while(this.cbTypes.head != null) {
			let cb = this.cbTypes.pop_unsafe();
			cb.cbsets.remove(this);
		}
	}
	alloc() {
	}
	static setlt(a,b) {
		let i = a.cbTypes.head;
		let j = b.cbTypes.head;
		while(i != null && j != null) {
			let ca = i.elt;
			let cb = j.elt;
			if(ca.id < cb.id) {
				return true;
			}
			if(cb.id < ca.id) {
				return false;
			} else {
				i = i.next;
				j = j.next;
			}
		}
		if(j != null) {
			return i == null;
		} else {
			return false;
		}
	}
	static get(cbTypes) {
		let ret;
		if(ZPP_CbSet.zpp_pool == null) {
			ret = new ZPP_CbSet();
		} else {
			ret = ZPP_CbSet.zpp_pool;
			ZPP_CbSet.zpp_pool = ret.next;
			ret.next = null;
		}
		let ite = null;
		let cx_ite = cbTypes.head;
		while(cx_ite != null) {
			let cb = cx_ite.elt;
			ite = ret.cbTypes.insert(ite,cb);
			cb.cbsets.add(ret);
			cx_ite = cx_ite.next;
		}
		return ret;
	}
	static compatible(i,a,b) {
		let tmp;
		let _this = i.options1;
		let xs = a.cbTypes;
		if(_this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes)) {
			let _this = i.options2;
			let xs = b.cbTypes;
			tmp = _this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes);
		} else {
			tmp = false;
		}
		if(!tmp) {
			let _this = i.options2;
			let xs = a.cbTypes;
			if(_this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes)) {
				let _this = i.options1;
				let xs = b.cbTypes;
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
	static empty_intersection(a,b) {
		let _this = a.manager;
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
		return ret.listeners.head == null;
	}
	static single_intersection(a,b,i) {
		let _this = a.manager;
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
		let ite = ret.listeners.head;
		if(ite != null && ite.elt == i) {
			return ite.next == null;
		} else {
			return false;
		}
	}
	static find_all(a,b,event,cb) {
		let _this = a.manager;
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
		let cx_ite1 = ret.listeners.head;
		while(cx_ite1 != null) {
			let x = cx_ite1.elt;
			if(x.event == event) {
				cb(x);
			}
			cx_ite1 = cx_ite1.next;
		}
	}
}
ZPP_CbSet.zpp_pool = null;
