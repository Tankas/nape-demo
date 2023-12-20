import ZPP_ArbiterList from '../util/ZPP_ArbiterList.js';
import InteractionCallback from '../../nape/callbacks/InteractionCallback.js';
import ConstraintCallback from '../../nape/callbacks/ConstraintCallback.js';
import BodyCallback from '../../nape/callbacks/BodyCallback.js';
export default class ZPP_Callback {
	constructor() {
		this.constraint = null;
		this.body = null;
		this.pre_swapped = false;
		this.pre_arbiter = null;
		this.wrap_arbiters = null;
		this.set = null;
		this.int2 = null;
		this.int1 = null;
		this.length = 0;
		this.prev = null;
		this.next = null;
		this.index = 0;
		this.space = null;
		this.listener = null;
		this.event = 0;
		this.outer_int = null;
		this.outer_con = null;
		this.outer_body = null;
		this.length = 0;
	}
	wrapper_body() {
		if(this.outer_body == null) {
			ZPP_Callback.internal = true;
			this.outer_body = new BodyCallback();
			ZPP_Callback.internal = false;
			this.outer_body.zpp_inner = this;
		}
		return this.outer_body;
	}
	wrapper_con() {
		if(this.outer_con == null) {
			ZPP_Callback.internal = true;
			this.outer_con = new ConstraintCallback();
			ZPP_Callback.internal = false;
			this.outer_con.zpp_inner = this;
		}
		return this.outer_con;
	}
	wrapper_int() {
		if(this.outer_int == null) {
			ZPP_Callback.internal = true;
			this.outer_int = new InteractionCallback();
			ZPP_Callback.internal = false;
			this.outer_int.zpp_inner = this;
		}
		if(this.wrap_arbiters == null) {
			this.wrap_arbiters = ZPP_ArbiterList.get(this.set.arbiters,true);
		} else {
			this.wrap_arbiters.zpp_inner.inner = this.set.arbiters;
		}
		this.wrap_arbiters.zpp_inner.zip_length = true;
		this.wrap_arbiters.zpp_inner.at_ite = null;
		return this.outer_int;
	}
	push(obj) {
		if(this.prev != null) {
			this.prev.next = obj;
		} else {
			this.next = obj;
		}
		obj.prev = this.prev;
		obj.next = null;
		this.prev = obj;
		this.length++;
	}
	push_rev(obj) {
		if(this.next != null) {
			this.next.prev = obj;
		} else {
			this.prev = obj;
		}
		obj.next = this.next;
		obj.prev = null;
		this.next = obj;
		this.length++;
	}
	pop() {
		let ret = this.next;
		this.next = ret.next;
		if(this.next == null) {
			this.prev = null;
		} else {
			this.next.prev = null;
		}
		this.length--;
		return ret;
	}
	pop_rev() {
		let ret = this.prev;
		this.prev = ret.prev;
		if(this.prev == null) {
			this.next = null;
		} else {
			this.prev.next = null;
		}
		this.length--;
		return ret;
	}
	empty() {
		return this.next == null;
	}
	clear() {
		while(!this.empty()) this.pop();
	}
	splice(o) {
		let ret = o.next;
		if(o.prev == null) {
			this.next = o.next;
			if(this.next != null) {
				this.next.prev = null;
			} else {
				this.prev = null;
			}
		} else {
			o.prev.next = o.next;
			if(o.next != null) {
				o.next.prev = o.prev;
			} else {
				this.prev = o.prev;
			}
		}
		this.length--;
		return ret;
	}
	rotateL() {
		this.push(this.pop());
	}
	rotateR() {
		this.push_rev(this.pop_rev());
	}
	cycleNext(o) {
		if(o.next == null) {
			return this.next;
		} else {
			return o.next;
		}
	}
	cyclePrev(o) {
		if(o.prev == null) {
			return this.prev;
		} else {
			return o.prev;
		}
	}
	at(i) {
		let ret = this.next;
		while(i-- != 0) ret = ret.next;
		return ret;
	}
	rev_at(i) {
		let ret = this.prev;
		while(i-- != 0) ret = ret.prev;
		return ret;
	}
	free() {
		this.int1 = this.int2 = null;
		this.body = null;
		this.constraint = null;
		this.listener = null;
		if(this.wrap_arbiters != null) {
			this.wrap_arbiters.zpp_inner.inner = null;
		}
		this.set = null;
	}
	alloc() {
	}
	genarbs() {
		if(this.wrap_arbiters == null) {
			this.wrap_arbiters = ZPP_ArbiterList.get(this.set.arbiters,true);
		} else {
			this.wrap_arbiters.zpp_inner.inner = this.set.arbiters;
		}
		this.wrap_arbiters.zpp_inner.zip_length = true;
		this.wrap_arbiters.zpp_inner.at_ite = null;
	}
}
ZPP_Callback.internal = false;
ZPP_Callback.zpp_pool = null;
