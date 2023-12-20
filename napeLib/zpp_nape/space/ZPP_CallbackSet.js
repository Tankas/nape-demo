import ZNPNode_ZPP_Arbiter from '../util/ZNPNode_ZPP_Arbiter.js';
import ZNPList_ZPP_Arbiter from '../util/ZNPList_ZPP_Arbiter.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
export default class ZPP_CallbackSet {
	constructor() {
		this.lazydel = false;
		this.freed = false;
		this.length = 0;
		this.pushmod = false;
		this.modified = false;
		this._inuse = false;
		this.next = null;
		this.int2 = null;
		this.int1 = null;
		this.di = 0;
		this.id = 0;
		this.arbiters = new ZNPList_ZPP_Arbiter();
	}
	elem() {
		return this;
	}
	begin() {
		return this.next;
	}
	setbegin(i) {
		this.next = i;
		this.modified = true;
		this.pushmod = true;
	}
	add(o) {
		o._inuse = true;
		let temp = o;
		temp.next = this.next;
		this.next = temp;
		this.modified = true;
		this.length++;
		return o;
	}
	inlined_add(o) {
		o._inuse = true;
		let temp = o;
		temp.next = this.next;
		this.next = temp;
		this.modified = true;
		this.length++;
		return o;
	}
	addAll(x) {
		let cx_ite = x.next;
		while(cx_ite != null) {
			let i = cx_ite;
			this.add(i);
			cx_ite = cx_ite.next;
		}
	}
	insert(cur,o) {
		o._inuse = true;
		let temp = o;
		if(cur == null) {
			temp.next = this.next;
			this.next = temp;
		} else {
			temp.next = cur.next;
			cur.next = temp;
		}
		this.pushmod = this.modified = true;
		this.length++;
		return temp;
	}
	inlined_insert(cur,o) {
		o._inuse = true;
		let temp = o;
		if(cur == null) {
			temp.next = this.next;
			this.next = temp;
		} else {
			temp.next = cur.next;
			cur.next = temp;
		}
		this.pushmod = this.modified = true;
		this.length++;
		return temp;
	}
	pop() {
		let ret = this.next;
		this.next = ret.next;
		ret._inuse = false;
		if(this.next == null) {
			this.pushmod = true;
		}
		this.modified = true;
		this.length--;
	}
	inlined_pop() {
		let ret = this.next;
		this.next = ret.next;
		ret._inuse = false;
		if(this.next == null) {
			this.pushmod = true;
		}
		this.modified = true;
		this.length--;
	}
	pop_unsafe() {
		let ret = this.next;
		this.pop();
		return ret;
	}
	inlined_pop_unsafe() {
		let ret = this.next;
		this.pop();
		return ret;
	}
	remove(obj) {
		let pre = null;
		let cur = this.next;
		let ret = false;
		while(cur != null) {
			if(cur == obj) {
				let old;
				let ret1;
				if(pre == null) {
					old = this.next;
					ret1 = old.next;
					this.next = ret1;
					if(this.next == null) {
						this.pushmod = true;
					}
				} else {
					old = pre.next;
					ret1 = old.next;
					pre.next = ret1;
					if(ret1 == null) {
						this.pushmod = true;
					}
				}
				old._inuse = false;
				this.modified = true;
				this.length--;
				this.pushmod = true;
				ret = true;
				break;
			}
			pre = cur;
			cur = cur.next;
		}
	}
	try_remove(obj) {
		let pre = null;
		let cur = this.next;
		let ret = false;
		while(cur != null) {
			if(cur == obj) {
				this.erase(pre);
				ret = true;
				break;
			}
			pre = cur;
			cur = cur.next;
		}
		return ret;
	}
	inlined_remove(obj) {
		let pre = null;
		let cur = this.next;
		let ret = false;
		while(cur != null) {
			if(cur == obj) {
				let old;
				let ret1;
				if(pre == null) {
					old = this.next;
					ret1 = old.next;
					this.next = ret1;
					if(this.next == null) {
						this.pushmod = true;
					}
				} else {
					old = pre.next;
					ret1 = old.next;
					pre.next = ret1;
					if(ret1 == null) {
						this.pushmod = true;
					}
				}
				old._inuse = false;
				this.modified = true;
				this.length--;
				this.pushmod = true;
				ret = true;
				break;
			}
			pre = cur;
			cur = cur.next;
		}
	}
	inlined_try_remove(obj) {
		let pre = null;
		let cur = this.next;
		let ret = false;
		while(cur != null) {
			if(cur == obj) {
				let old;
				let ret1;
				if(pre == null) {
					old = this.next;
					ret1 = old.next;
					this.next = ret1;
					if(this.next == null) {
						this.pushmod = true;
					}
				} else {
					old = pre.next;
					ret1 = old.next;
					pre.next = ret1;
					if(ret1 == null) {
						this.pushmod = true;
					}
				}
				old._inuse = false;
				this.modified = true;
				this.length--;
				this.pushmod = true;
				ret = true;
				break;
			}
			pre = cur;
			cur = cur.next;
		}
		return ret;
	}
	erase(pre) {
		let old;
		let ret;
		if(pre == null) {
			old = this.next;
			ret = old.next;
			this.next = ret;
			if(this.next == null) {
				this.pushmod = true;
			}
		} else {
			old = pre.next;
			ret = old.next;
			pre.next = ret;
			if(ret == null) {
				this.pushmod = true;
			}
		}
		old._inuse = false;
		this.modified = true;
		this.length--;
		this.pushmod = true;
		return ret;
	}
	inlined_erase(pre) {
		let old;
		let ret;
		if(pre == null) {
			old = this.next;
			ret = old.next;
			this.next = ret;
			if(this.next == null) {
				this.pushmod = true;
			}
		} else {
			old = pre.next;
			ret = old.next;
			pre.next = ret;
			if(ret == null) {
				this.pushmod = true;
			}
		}
		old._inuse = false;
		this.modified = true;
		this.length--;
		this.pushmod = true;
		return ret;
	}
	splice(pre,n) {
		while(n-- > 0 && pre.next != null) this.erase(pre);
		return pre.next;
	}
	clear() {
	}
	inlined_clear() {
	}
	reverse() {
		let cur = this.next;
		let pre = null;
		while(cur != null) {
			let nx = cur.next;
			cur.next = pre;
			this.next = cur;
			pre = cur;
			cur = nx;
		}
		this.modified = true;
		this.pushmod = true;
	}
	empty() {
		return this.next == null;
	}
	size() {
		return this.length;
	}
	has(obj) {
		let ret;
		ret = false;
		let cx_ite = this.next;
		while(cx_ite != null) {
			let npite = cx_ite;
			if(npite == obj) {
				ret = true;
				break;
			}
			cx_ite = cx_ite.next;
		}
		return ret;
	}
	inlined_has(obj) {
		let ret;
		ret = false;
		let cx_ite = this.next;
		while(cx_ite != null) {
			let npite = cx_ite;
			if(npite == obj) {
				ret = true;
				break;
			}
			cx_ite = cx_ite.next;
		}
		return ret;
	}
	front() {
		return this.next;
	}
	back() {
		let ret = this.next;
		let cur = ret;
		while(cur != null) {
			ret = cur;
			cur = cur.next;
		}
		return ret;
	}
	iterator_at(ind) {
		let ret = this.next;
		while(ind-- > 0 && ret != null) ret = ret.next;
		return ret;
	}
	at(ind) {
		let it = this.iterator_at(ind);
		if(it != null) {
			return it;
		} else {
			return null;
		}
	}
	free() {
		this.int1 = this.int2 = null;
		this.id = this.di = -1;
		this.freed = true;
	}
	alloc() {
		this.freed = false;
		this.lazydel = false;
		this.COLLISIONstate = ZPP_Flags.id_PreFlag_ACCEPT;
		this.COLLISIONstamp = 0;
		this.SENSORstate = ZPP_Flags.id_PreFlag_ACCEPT;
		this.SENSORstamp = 0;
		this.FLUIDstate = ZPP_Flags.id_PreFlag_ACCEPT;
		this.FLUIDstamp = 0;
	}
	add_arb(x) {
		let ret;
		ret = false;
		let cx_ite = this.arbiters.head;
		while(cx_ite != null) {
			let npite = cx_ite.elt;
			if(npite == x) {
				ret = true;
				break;
			}
			cx_ite = cx_ite.next;
		}
		if(!ret) {
			let _this = this.arbiters;
			let ret;
			if(ZNPNode_ZPP_Arbiter.zpp_pool == null) {
				ret = new ZNPNode_ZPP_Arbiter();
			} else {
				ret = ZNPNode_ZPP_Arbiter.zpp_pool;
				ZNPNode_ZPP_Arbiter.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = x;
			let temp = ret;
			temp.next = _this.head;
			_this.head = temp;
			_this.modified = true;
			_this.length++;
			return true;
		} else {
			return false;
		}
	}
	try_remove_arb(x) {
		let _this = this.arbiters;
		let pre = null;
		let cur = _this.head;
		let ret = false;
		while(cur != null) {
			if(cur.elt == x) {
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
		return ret;
	}
	remove_arb(x) {
		let _this = this.arbiters;
		let pre = null;
		let cur = _this.head;
		let ret = false;
		while(cur != null) {
			if(cur.elt == x) {
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
	empty_arb(type) {
		let retvar;
		retvar = true;
		let cx_ite = this.arbiters.head;
		while(cx_ite != null) {
			let x = cx_ite.elt;
			if((x.type & type) == 0) {
				cx_ite = cx_ite.next;
				continue;
			} else {
				retvar = false;
				break;
			}
		}
		return retvar;
	}
	really_empty() {
		return this.arbiters.head == null;
	}
	sleeping() {
		let ret;
		ret = true;
		let cx_ite = this.arbiters.head;
		while(cx_ite != null) {
			let x = cx_ite.elt;
			if(x.sleeping) {
				cx_ite = cx_ite.next;
				continue;
			} else {
				ret = false;
				break;
			}
		}
		return ret;
	}
	static get(i1,i2) {
		let ret;
		if(ZPP_CallbackSet.zpp_pool == null) {
			ret = new ZPP_CallbackSet();
		} else {
			ret = ZPP_CallbackSet.zpp_pool;
			ZPP_CallbackSet.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.freed = false;
		ret.lazydel = false;
		ret.COLLISIONstate = ZPP_Flags.id_PreFlag_ACCEPT;
		ret.COLLISIONstamp = 0;
		ret.SENSORstate = ZPP_Flags.id_PreFlag_ACCEPT;
		ret.SENSORstamp = 0;
		ret.FLUIDstate = ZPP_Flags.id_PreFlag_ACCEPT;
		ret.FLUIDstamp = 0;
		if(i1.id < i2.id) {
			ret.int1 = i1;
			ret.int2 = i2;
		} else {
			ret.int1 = i2;
			ret.int2 = i1;
		}
		ret.id = ret.int1.id;
		ret.di = ret.int2.id;
		return ret;
	}
}
ZPP_CallbackSet.zpp_pool = null;
