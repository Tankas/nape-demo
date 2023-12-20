import ZNPNode_ZPP_Arbiter from '../util/ZNPNode_ZPP_Arbiter.js';
import ZPP_Arbiter from './ZPP_Arbiter.js';
export default class ZPP_SensorArbiter extends ZPP_Arbiter {
	constructor() {
		ZPP_Arbiter._hx_skip_constructor = true;
		super();
		ZPP_Arbiter._hx_skip_constructor = false;
		this._hx_constructor();
	}
	_hx_constructor() {
		this.next = null;
		super._hx_constructor();
		this.type = ZPP_Arbiter.SENSOR;
		this.sensorarb = this;
	}
	alloc() {
	}
	free() {
	}
	assign(s1,s2,id,di) {
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
	retire() {
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
		let o = this;
		o.next = ZPP_SensorArbiter.zpp_pool;
		ZPP_SensorArbiter.zpp_pool = o;
	}
	makemutable() {
	}
	makeimmutable() {
	}
}
ZPP_SensorArbiter.zpp_pool = null;
