import ZNPNode_ZPP_BodyListener from '../util/ZNPNode_ZPP_BodyListener.js';
import ZNPNode_ZPP_CbType from '../util/ZNPNode_ZPP_CbType.js';
import ZPP_Listener from './ZPP_Listener.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
export default class ZPP_BodyListener extends ZPP_Listener {
	constructor(options,event,handler) {
		ZPP_Listener._hx_skip_constructor = true;
		super();
		ZPP_Listener._hx_skip_constructor = false;
		this._hx_constructor(options,event,handler);
	}
	_hx_constructor(options,event,handler) {
		this.handler = null;
		this.options = null;
		this.outer_zn = null;
		super._hx_constructor();
		this.event = event;
		this.handler = handler;
		this.body = this;
		this.type = ZPP_Flags.id_ListenerType_BODY;
		this.options = options.zpp_inner;
	}
	immutable_options() {
		if(this.space != null && this.space.midstep) {
			throw haxe_Exception.thrown("Error: Cannot change listener type options during space.step()");
		}
	}
	addedToSpace() {
		this.options.handler = $bind(this,this.cbtype_change);
		let cx_ite = this.options.includes.head;
		while(cx_ite != null) {
			let cb = cx_ite.elt;
			let pre = null;
			let cx_ite1 = cb.bodylisteners.head;
			while(cx_ite1 != null) {
				let j = cx_ite1.elt;
				if(this.precedence > j.precedence || this.precedence == j.precedence && this.id > j.id) {
					break;
				}
				pre = cx_ite1;
				cx_ite1 = cx_ite1.next;
			}
			let _this = cb.bodylisteners;
			let ret;
			if(ZNPNode_ZPP_BodyListener.zpp_pool == null) {
				ret = new ZNPNode_ZPP_BodyListener();
			} else {
				ret = ZNPNode_ZPP_BodyListener.zpp_pool;
				ZNPNode_ZPP_BodyListener.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = this;
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
			let cx_ite2 = cb.cbsets.head;
			while(cx_ite2 != null) {
				let cb = cx_ite2.elt;
				cb.zip_bodylisteners = true;
				cx_ite2 = cx_ite2.next;
			}
			cx_ite = cx_ite.next;
		}
	}
	removedFromSpace() {
		let cx_ite = this.options.includes.head;
		while(cx_ite != null) {
			let cb = cx_ite.elt;
			cb.bodylisteners.remove(this);
			let cx_ite1 = cb.cbsets.head;
			while(cx_ite1 != null) {
				let cb = cx_ite1.elt;
				cb.zip_bodylisteners = true;
				cx_ite1 = cx_ite1.next;
			}
			cx_ite = cx_ite.next;
		}
		this.options.handler = null;
	}
	cbtype_change(cb,included,added) {
		this.removedFromSpace();
		let _this = this.options;
		if(included) {
			if(added) {
				let pre = null;
				let cx_ite = _this.includes.head;
				while(cx_ite != null) {
					let j = cx_ite.elt;
					if(cb.id < j.id) {
						break;
					}
					pre = cx_ite;
					cx_ite = cx_ite.next;
				}
				let _this1 = _this.includes;
				let ret;
				if(ZNPNode_ZPP_CbType.zpp_pool == null) {
					ret = new ZNPNode_ZPP_CbType();
				} else {
					ret = ZNPNode_ZPP_CbType.zpp_pool;
					ZNPNode_ZPP_CbType.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.elt = cb;
				let temp = ret;
				if(pre == null) {
					temp.next = _this1.head;
					_this1.head = temp;
				} else {
					temp.next = pre.next;
					pre.next = temp;
				}
				_this1.pushmod = _this1.modified = true;
				_this1.length++;
			} else {
				_this.includes.remove(cb);
			}
		} else if(added) {
			let pre = null;
			let cx_ite = _this.excludes.head;
			while(cx_ite != null) {
				let j = cx_ite.elt;
				if(cb.id < j.id) {
					break;
				}
				pre = cx_ite;
				cx_ite = cx_ite.next;
			}
			let _this1 = _this.excludes;
			let ret;
			if(ZNPNode_ZPP_CbType.zpp_pool == null) {
				ret = new ZNPNode_ZPP_CbType();
			} else {
				ret = ZNPNode_ZPP_CbType.zpp_pool;
				ZNPNode_ZPP_CbType.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = cb;
			let temp = ret;
			if(pre == null) {
				temp.next = _this1.head;
				_this1.head = temp;
			} else {
				temp.next = pre.next;
				pre.next = temp;
			}
			_this1.pushmod = _this1.modified = true;
			_this1.length++;
		} else {
			_this.excludes.remove(cb);
		}
		this.addedToSpace();
	}
	invalidate_precedence() {
		if(this.space != null) {
			this.removedFromSpace();
			this.addedToSpace();
		}
	}
	swapEvent(newev) {
		if(newev != ZPP_Flags.id_CbEvent_WAKE && newev != ZPP_Flags.id_CbEvent_SLEEP) {
			throw haxe_Exception.thrown("Error: BodyListener event must be either WAKE or SLEEP only");
		}
		this.removedFromSpace();
		this.event = newev;
		this.addedToSpace();
	}
}
