import ZNPNode_ZPP_ConstraintListener from './ZNPNode_ZPP_ConstraintListener.js';
export default class ZNPList_ZPP_ConstraintListener {
	constructor() {
		this.length = 0;
		this.pushmod = false;
		this.modified = false;
		this.head = null;
	}
	begin() {
		return this.head;
	}
	setbegin(i) {
		this.head = i;
		this.modified = true;
		this.pushmod = true;
	}
	add(o) {
		let ret;
		if(ZNPNode_ZPP_ConstraintListener.zpp_pool == null) {
			ret = new ZNPNode_ZPP_ConstraintListener();
		} else {
			ret = ZNPNode_ZPP_ConstraintListener.zpp_pool;
			ZNPNode_ZPP_ConstraintListener.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.elt = o;
		let temp = ret;
		temp.next = this.head;
		this.head = temp;
		this.modified = true;
		this.length++;
		return o;
	}
	inlined_add(o) {
		let ret;
		if(ZNPNode_ZPP_ConstraintListener.zpp_pool == null) {
			ret = new ZNPNode_ZPP_ConstraintListener();
		} else {
			ret = ZNPNode_ZPP_ConstraintListener.zpp_pool;
			ZNPNode_ZPP_ConstraintListener.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.elt = o;
		let temp = ret;
		temp.next = this.head;
		this.head = temp;
		this.modified = true;
		this.length++;
		return o;
	}
	addAll(x) {
		let cx_ite = x.head;
		while(cx_ite != null) {
			let i = cx_ite.elt;
			this.add(i);
			cx_ite = cx_ite.next;
		}
	}
	insert(cur,o) {
		let ret;
		if(ZNPNode_ZPP_ConstraintListener.zpp_pool == null) {
			ret = new ZNPNode_ZPP_ConstraintListener();
		} else {
			ret = ZNPNode_ZPP_ConstraintListener.zpp_pool;
			ZNPNode_ZPP_ConstraintListener.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.elt = o;
		let temp = ret;
		if(cur == null) {
			temp.next = this.head;
			this.head = temp;
		} else {
			temp.next = cur.next;
			cur.next = temp;
		}
		this.pushmod = this.modified = true;
		this.length++;
		return temp;
	}
	inlined_insert(cur,o) {
		let ret;
		if(ZNPNode_ZPP_ConstraintListener.zpp_pool == null) {
			ret = new ZNPNode_ZPP_ConstraintListener();
		} else {
			ret = ZNPNode_ZPP_ConstraintListener.zpp_pool;
			ZNPNode_ZPP_ConstraintListener.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.elt = o;
		let temp = ret;
		if(cur == null) {
			temp.next = this.head;
			this.head = temp;
		} else {
			temp.next = cur.next;
			cur.next = temp;
		}
		this.pushmod = this.modified = true;
		this.length++;
		return temp;
	}
	pop() {
		let ret = this.head;
		this.head = ret.next;
		let o = ret;
		o.elt = null;
		o.next = ZNPNode_ZPP_ConstraintListener.zpp_pool;
		ZNPNode_ZPP_ConstraintListener.zpp_pool = o;
		if(this.head == null) {
			this.pushmod = true;
		}
		this.modified = true;
		this.length--;
	}
	inlined_pop() {
		let ret = this.head;
		this.head = ret.next;
		let o = ret;
		o.elt = null;
		o.next = ZNPNode_ZPP_ConstraintListener.zpp_pool;
		ZNPNode_ZPP_ConstraintListener.zpp_pool = o;
		if(this.head == null) {
			this.pushmod = true;
		}
		this.modified = true;
		this.length--;
	}
	pop_unsafe() {
		let ret = this.head.elt;
		this.pop();
		return ret;
	}
	inlined_pop_unsafe() {
		let ret = this.head.elt;
		this.pop();
		return ret;
	}
	remove(obj) {
		let pre = null;
		let cur = this.head;
		let ret = false;
		while(cur != null) {
			if(cur.elt == obj) {
				let old;
				let ret1;
				if(pre == null) {
					old = this.head;
					ret1 = old.next;
					this.head = ret1;
					if(this.head == null) {
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
				let o = old;
				o.elt = null;
				o.next = ZNPNode_ZPP_ConstraintListener.zpp_pool;
				ZNPNode_ZPP_ConstraintListener.zpp_pool = o;
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
		let cur = this.head;
		let ret = false;
		while(cur != null) {
			if(cur.elt == obj) {
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
		let cur = this.head;
		let ret = false;
		while(cur != null) {
			if(cur.elt == obj) {
				let old;
				let ret1;
				if(pre == null) {
					old = this.head;
					ret1 = old.next;
					this.head = ret1;
					if(this.head == null) {
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
				let o = old;
				o.elt = null;
				o.next = ZNPNode_ZPP_ConstraintListener.zpp_pool;
				ZNPNode_ZPP_ConstraintListener.zpp_pool = o;
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
		let cur = this.head;
		let ret = false;
		while(cur != null) {
			if(cur.elt == obj) {
				let old;
				let ret1;
				if(pre == null) {
					old = this.head;
					ret1 = old.next;
					this.head = ret1;
					if(this.head == null) {
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
				let o = old;
				o.elt = null;
				o.next = ZNPNode_ZPP_ConstraintListener.zpp_pool;
				ZNPNode_ZPP_ConstraintListener.zpp_pool = o;
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
			old = this.head;
			ret = old.next;
			this.head = ret;
			if(this.head == null) {
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
		let o = old;
		o.elt = null;
		o.next = ZNPNode_ZPP_ConstraintListener.zpp_pool;
		ZNPNode_ZPP_ConstraintListener.zpp_pool = o;
		this.modified = true;
		this.length--;
		this.pushmod = true;
		return ret;
	}
	inlined_erase(pre) {
		let old;
		let ret;
		if(pre == null) {
			old = this.head;
			ret = old.next;
			this.head = ret;
			if(this.head == null) {
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
		let o = old;
		o.elt = null;
		o.next = ZNPNode_ZPP_ConstraintListener.zpp_pool;
		ZNPNode_ZPP_ConstraintListener.zpp_pool = o;
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
		while(this.head != null) {
			let ret = this.head;
			this.head = ret.next;
			let o = ret;
			o.elt = null;
			o.next = ZNPNode_ZPP_ConstraintListener.zpp_pool;
			ZNPNode_ZPP_ConstraintListener.zpp_pool = o;
			if(this.head == null) {
				this.pushmod = true;
			}
			this.modified = true;
			this.length--;
		}
		this.pushmod = true;
	}
	inlined_clear() {
		while(this.head != null) {
			let ret = this.head;
			this.head = ret.next;
			let o = ret;
			o.elt = null;
			o.next = ZNPNode_ZPP_ConstraintListener.zpp_pool;
			ZNPNode_ZPP_ConstraintListener.zpp_pool = o;
			if(this.head == null) {
				this.pushmod = true;
			}
			this.modified = true;
			this.length--;
		}
		this.pushmod = true;
	}
	reverse() {
		let cur = this.head;
		let pre = null;
		while(cur != null) {
			let nx = cur.next;
			cur.next = pre;
			this.head = cur;
			pre = cur;
			cur = nx;
		}
		this.modified = true;
		this.pushmod = true;
	}
	empty() {
		return this.head == null;
	}
	size() {
		return this.length;
	}
	has(obj) {
		let ret;
		ret = false;
		let cx_ite = this.head;
		while(cx_ite != null) {
			let npite = cx_ite.elt;
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
		let cx_ite = this.head;
		while(cx_ite != null) {
			let npite = cx_ite.elt;
			if(npite == obj) {
				ret = true;
				break;
			}
			cx_ite = cx_ite.next;
		}
		return ret;
	}
	front() {
		return this.head.elt;
	}
	back() {
		let ret = this.head;
		let cur = ret;
		while(cur != null) {
			ret = cur;
			cur = cur.next;
		}
		return ret.elt;
	}
	iterator_at(ind) {
		let ret = this.head;
		while(ind-- > 0 && ret != null) ret = ret.next;
		return ret;
	}
	at(ind) {
		let it = this.iterator_at(ind);
		if(it != null) {
			return it.elt;
		} else {
			return null;
		}
	}
}
