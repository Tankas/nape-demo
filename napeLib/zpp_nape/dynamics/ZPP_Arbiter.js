import ZNPNode_ZPP_Arbiter from '../util/ZNPNode_ZPP_Arbiter.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import FluidArbiter from '../../nape/dynamics/FluidArbiter.js';
import CollisionArbiter from '../../nape/dynamics/CollisionArbiter.js';
import ArbiterType from '../../nape/dynamics/ArbiterType.js';
import Arbiter from '../../nape/dynamics/Arbiter.js';
export default class ZPP_Arbiter {
	constructor() {
		if(ZPP_Arbiter._hx_skip_constructor) {
			return;
		}
		this._hx_constructor();
	}
	_hx_constructor() {
		this.sensorarb = null;
		this.fluidarb = null;
		this.colarb = null;
		this.type = 0;
		this.pair = null;
		this.ws2 = null;
		this.ws1 = null;
		this.b2 = null;
		this.b1 = null;
		this.invalidated = false;
		this.immState = 0;
		this.fresh = false;
		this.continuous = false;
		this.presentable = false;
		this.intchange = false;
		this.present = 0;
		this.sleeping = false;
		this.cleared = false;
		this.active = false;
		this.endGenerated = 0;
		this.sleep_stamp = 0;
		this.up_stamp = 0;
		this.stamp = 0;
		this.di = 0;
		this.id = 0;
		this.hnext = null;
		this.outer = null;
	}
	wrapper() {
		if(this.outer == null) {
			ZPP_Arbiter.internal = true;
			if(this.type == ZPP_Arbiter.COL) {
				this.colarb.outer_zn = new CollisionArbiter();
				this.outer = this.colarb.outer_zn;
			} else if(this.type == ZPP_Arbiter.FLUID) {
				this.fluidarb.outer_zn = new FluidArbiter();
				this.outer = this.fluidarb.outer_zn;
			} else {
				this.outer = new Arbiter();
			}
			this.outer.zpp_inner = this;
			ZPP_Arbiter.internal = false;
		}
		return this.outer;
	}
	inactiveme() {
		return !this.active;
	}
	acting() {
		if(this.active) {
			return (this.immState & ZPP_Flags.id_ImmState_ACCEPT) != 0;
		} else {
			return false;
		}
	}
	swap_features() {
		let t = this.b1;
		this.b1 = this.b2;
		this.b2 = t;
		let t1 = this.ws1;
		this.ws1 = this.ws2;
		this.ws2 = t1;
		let t2 = this.colarb.s1;
		this.colarb.s1 = this.colarb.s2;
		this.colarb.s2 = t2;
	}
	lazyRetire(s,b) {
		this.cleared = true;
		if(b == null || this.b2 == b) {
			let _this = this.b1.arbiters;
			let pre = null;
			let cur = _this.head;
			let ret = false;
			while(cur != null) {
				if(cur.elt == this) {
					let old;
					let ret1;
					if(pre == null) {
						old = _this.head;
						ret1 = old.next;
						_this.head = ret1;
						if(_this.head == null) {
							_this.pushmod = true;
						}
					} else {
						old = pre.next;
						ret1 = old.next;
						pre.next = ret1;
						if(ret1 == null) {
							_this.pushmod = true;
						}
					}
					let o = old;
					o.elt = null;
					o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
					ZNPNode_ZPP_Arbiter.zpp_pool = o;
					_this.modified = true;
					_this.length--;
					_this.pushmod = true;
					ret = true;
					break;
				}
				pre = cur;
				cur = cur.next;
			}
		}
		if(b == null || this.b1 == b) {
			let _this = this.b2.arbiters;
			let pre = null;
			let cur = _this.head;
			let ret = false;
			while(cur != null) {
				if(cur.elt == this) {
					let old;
					let ret1;
					if(pre == null) {
						old = _this.head;
						ret1 = old.next;
						_this.head = ret1;
						if(_this.head == null) {
							_this.pushmod = true;
						}
					} else {
						old = pre.next;
						ret1 = old.next;
						pre.next = ret1;
						if(ret1 == null) {
							_this.pushmod = true;
						}
					}
					let o = old;
					o.elt = null;
					o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
					ZNPNode_ZPP_Arbiter.zpp_pool = o;
					_this.modified = true;
					_this.length--;
					_this.pushmod = true;
					ret = true;
					break;
				}
				pre = cur;
				cur = cur.next;
			}
		}
		if(this.pair != null) {
			this.pair.arb = null;
			this.pair = null;
		}
		this.active = false;
		s.f_arbiters.modified = true;
	}
	sup_assign(s1,s2,id,di) {
		this.b1 = s1.body;
		this.ws1 = s1;
		this.b2 = s2.body;
		this.ws2 = s2;
		this.id = id;
		this.di = di;
		let _this = this.b1.arbiters;
		let ret;
		if(ZNPNode_ZPP_Arbiter.zpp_pool == null) {
			ret = new ZNPNode_ZPP_Arbiter();
		} else {
			ret = ZNPNode_ZPP_Arbiter.zpp_pool;
			ZNPNode_ZPP_Arbiter.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.elt = this;
		let temp = ret;
		temp.next = _this.head;
		_this.head = temp;
		_this.modified = true;
		_this.length++;
		let _this1 = this.b2.arbiters;
		let ret1;
		if(ZNPNode_ZPP_Arbiter.zpp_pool == null) {
			ret1 = new ZNPNode_ZPP_Arbiter();
		} else {
			ret1 = ZNPNode_ZPP_Arbiter.zpp_pool;
			ZNPNode_ZPP_Arbiter.zpp_pool = ret1.next;
			ret1.next = null;
		}
		ret1.elt = this;
		let temp1 = ret1;
		temp1.next = _this1.head;
		_this1.head = temp1;
		_this1.modified = true;
		_this1.length++;
		this.active = true;
		this.present = 0;
		this.cleared = false;
		this.sleeping = false;
		this.fresh = false;
		this.presentable = false;
	}
	sup_retire() {
		if(!this.cleared) {
			let _this = this.b1.arbiters;
			let pre = null;
			let cur = _this.head;
			let ret = false;
			while(cur != null) {
				if(cur.elt == this) {
					let old;
					let ret1;
					if(pre == null) {
						old = _this.head;
						ret1 = old.next;
						_this.head = ret1;
						if(_this.head == null) {
							_this.pushmod = true;
						}
					} else {
						old = pre.next;
						ret1 = old.next;
						pre.next = ret1;
						if(ret1 == null) {
							_this.pushmod = true;
						}
					}
					let o = old;
					o.elt = null;
					o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
					ZNPNode_ZPP_Arbiter.zpp_pool = o;
					_this.modified = true;
					_this.length--;
					_this.pushmod = true;
					ret = true;
					break;
				}
				pre = cur;
				cur = cur.next;
			}
			let _this1 = this.b2.arbiters;
			let pre1 = null;
			let cur1 = _this1.head;
			let ret1 = false;
			while(cur1 != null) {
				if(cur1.elt == this) {
					let old;
					let ret;
					if(pre1 == null) {
						old = _this1.head;
						ret = old.next;
						_this1.head = ret;
						if(_this1.head == null) {
							_this1.pushmod = true;
						}
					} else {
						old = pre1.next;
						ret = old.next;
						pre1.next = ret;
						if(ret == null) {
							_this1.pushmod = true;
						}
					}
					let o = old;
					o.elt = null;
					o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
					ZNPNode_ZPP_Arbiter.zpp_pool = o;
					_this1.modified = true;
					_this1.length--;
					_this1.pushmod = true;
					ret1 = true;
					break;
				}
				pre1 = cur1;
				cur1 = cur1.next;
			}
			if(this.pair != null) {
				this.pair.arb = null;
				this.pair = null;
			}
		}
		this.b1 = this.b2 = null;
		this.active = false;
		this.intchange = false;
	}
}
ZPP_Arbiter._hx_skip_constructor = false;
ZPP_Arbiter.internal = false;
ZPP_Arbiter.COL = 1;
ZPP_Arbiter.FLUID = 4;
ZPP_Arbiter.SENSOR = 2;
ZPP_Arbiter.types = (function($this) {
	var $r;
	if(ZPP_Flags.ArbiterType_COLLISION == null) {
		ZPP_Flags.internal = true;
		ZPP_Flags.ArbiterType_COLLISION = new ArbiterType();
		ZPP_Flags.internal = false;
	}
	let tmp = ZPP_Flags.ArbiterType_COLLISION;
	if(ZPP_Flags.ArbiterType_SENSOR == null) {
		ZPP_Flags.internal = true;
		ZPP_Flags.ArbiterType_SENSOR = new ArbiterType();
		ZPP_Flags.internal = false;
	}
	let tmp1 = ZPP_Flags.ArbiterType_SENSOR;
	if(ZPP_Flags.ArbiterType_FLUID == null) {
		ZPP_Flags.internal = true;
		ZPP_Flags.ArbiterType_FLUID = new ArbiterType();
		ZPP_Flags.internal = false;
	}
	$r = [null,tmp,tmp1,null,ZPP_Flags.ArbiterType_FLUID];
	return $r;
}(this));
