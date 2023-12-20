import ZNPNode_ZPP_ConstraintListener from '../util/ZNPNode_ZPP_ConstraintListener.js';
import ZNPNode_ZPP_BodyListener from '../util/ZNPNode_ZPP_BodyListener.js';
import ZNPNode_ZPP_InteractionListener from '../util/ZNPNode_ZPP_InteractionListener.js';
import ZNPList_ZPP_CbSet from '../util/ZNPList_ZPP_CbSet.js';
import ZNPList_ZPP_Interactor from '../util/ZNPList_ZPP_Interactor.js';
import ZNPList_ZPP_Constraint from '../util/ZNPList_ZPP_Constraint.js';
import ZNPList_ZPP_ConstraintListener from '../util/ZNPList_ZPP_ConstraintListener.js';
import ZNPList_ZPP_BodyListener from '../util/ZNPList_ZPP_BodyListener.js';
import ZNPList_ZPP_InteractionListener from '../util/ZNPList_ZPP_InteractionListener.js';
import ZPP_ID from '../ZPP_ID.js';
import CbType from '../../nape/callbacks/CbType.js';
export default class ZPP_CbType {
	constructor() {
		this.conlisteners = null;
		this.bodylisteners = null;
		this.listeners = null;
		this.cbsets = null;
		this.id = 0;
		this.userData = null;
		this.outer = null;
		this.id = ZPP_ID.CbType();
		this.listeners = new ZNPList_ZPP_InteractionListener();
		this.bodylisteners = new ZNPList_ZPP_BodyListener();
		this.conlisteners = new ZNPList_ZPP_ConstraintListener();
		this.constraints = new ZNPList_ZPP_Constraint();
		this.interactors = new ZNPList_ZPP_Interactor();
		this.cbsets = new ZNPList_ZPP_CbSet();
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
	addint(x) {
		let pre = null;
		let cx_ite = this.listeners.head;
		while(cx_ite != null) {
			let j = cx_ite.elt;
			if(x.precedence > j.precedence || x.precedence == j.precedence && x.id > j.id) {
				break;
			}
			pre = cx_ite;
			cx_ite = cx_ite.next;
		}
		let _this = this.listeners;
		let ret;
		if(ZNPNode_ZPP_InteractionListener.zpp_pool == null) {
			ret = new ZNPNode_ZPP_InteractionListener();
		} else {
			ret = ZNPNode_ZPP_InteractionListener.zpp_pool;
			ZNPNode_ZPP_InteractionListener.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.elt = x;
		let temp = ret;
		if(pre == null) {
			temp.next = _this.head;
			_this.head = temp;
		} else {
			temp.next = pre.next;
			pre.next = temp;
		}
		_this.pushmod = _this.modified = true;
		_this.length++;
		let cx_ite1 = this.cbsets.head;
		while(cx_ite1 != null) {
			let cb = cx_ite1.elt;
			cb.zip_listeners = true;
			cb.invalidate_pairs();
			cx_ite1 = cx_ite1.next;
		}
	}
	removeint(x) {
		this.listeners.remove(x);
		let cx_ite = this.cbsets.head;
		while(cx_ite != null) {
			let cb = cx_ite.elt;
			cb.zip_listeners = true;
			cb.invalidate_pairs();
			cx_ite = cx_ite.next;
		}
	}
	invalidateint() {
		let cx_ite = this.cbsets.head;
		while(cx_ite != null) {
			let cb = cx_ite.elt;
			cb.zip_listeners = true;
			cb.invalidate_pairs();
			cx_ite = cx_ite.next;
		}
	}
	addbody(x) {
		let pre = null;
		let cx_ite = this.bodylisteners.head;
		while(cx_ite != null) {
			let j = cx_ite.elt;
			if(x.precedence > j.precedence || x.precedence == j.precedence && x.id > j.id) {
				break;
			}
			pre = cx_ite;
			cx_ite = cx_ite.next;
		}
		let _this = this.bodylisteners;
		let ret;
		if(ZNPNode_ZPP_BodyListener.zpp_pool == null) {
			ret = new ZNPNode_ZPP_BodyListener();
		} else {
			ret = ZNPNode_ZPP_BodyListener.zpp_pool;
			ZNPNode_ZPP_BodyListener.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.elt = x;
		let temp = ret;
		if(pre == null) {
			temp.next = _this.head;
			_this.head = temp;
		} else {
			temp.next = pre.next;
			pre.next = temp;
		}
		_this.pushmod = _this.modified = true;
		_this.length++;
		let cx_ite1 = this.cbsets.head;
		while(cx_ite1 != null) {
			let cb = cx_ite1.elt;
			cb.zip_bodylisteners = true;
			cx_ite1 = cx_ite1.next;
		}
	}
	removebody(x) {
		this.bodylisteners.remove(x);
		let cx_ite = this.cbsets.head;
		while(cx_ite != null) {
			let cb = cx_ite.elt;
			cb.zip_bodylisteners = true;
			cx_ite = cx_ite.next;
		}
	}
	invalidatebody() {
		let cx_ite = this.cbsets.head;
		while(cx_ite != null) {
			let cb = cx_ite.elt;
			cb.zip_bodylisteners = true;
			cx_ite = cx_ite.next;
		}
	}
	addconstraint(x) {
		let pre = null;
		let cx_ite = this.conlisteners.head;
		while(cx_ite != null) {
			let j = cx_ite.elt;
			if(x.precedence > j.precedence || x.precedence == j.precedence && x.id > j.id) {
				break;
			}
			pre = cx_ite;
			cx_ite = cx_ite.next;
		}
		let _this = this.conlisteners;
		let ret;
		if(ZNPNode_ZPP_ConstraintListener.zpp_pool == null) {
			ret = new ZNPNode_ZPP_ConstraintListener();
		} else {
			ret = ZNPNode_ZPP_ConstraintListener.zpp_pool;
			ZNPNode_ZPP_ConstraintListener.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.elt = x;
		let temp = ret;
		if(pre == null) {
			temp.next = _this.head;
			_this.head = temp;
		} else {
			temp.next = pre.next;
			pre.next = temp;
		}
		_this.pushmod = _this.modified = true;
		_this.length++;
		let cx_ite1 = this.cbsets.head;
		while(cx_ite1 != null) {
			let cb = cx_ite1.elt;
			cb.zip_conlisteners = true;
			cx_ite1 = cx_ite1.next;
		}
	}
	removeconstraint(x) {
		this.conlisteners.remove(x);
		let cx_ite = this.cbsets.head;
		while(cx_ite != null) {
			let cb = cx_ite.elt;
			cb.zip_conlisteners = true;
			cx_ite = cx_ite.next;
		}
	}
	invalidateconstraint() {
		let cx_ite = this.cbsets.head;
		while(cx_ite != null) {
			let cb = cx_ite.elt;
			cb.zip_conlisteners = true;
			cx_ite = cx_ite.next;
		}
	}
	static setlt(a,b) {
		return a.id < b.id;
	}
}
ZPP_CbType.ANY_SHAPE = new CbType();
ZPP_CbType.ANY_BODY = new CbType();
ZPP_CbType.ANY_COMPOUND = new CbType();
ZPP_CbType.ANY_CONSTRAINT = new CbType();
