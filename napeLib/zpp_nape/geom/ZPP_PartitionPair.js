export default class ZPP_PartitionPair {
	constructor() {
		this.node = null;
		this.di = 0;
		this.id = 0;
		this.b = null;
		this.a = null;
		this.length = 0;
		this.pushmod = false;
		this.modified = false;
		this._inuse = false;
		this.next = null;
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
		this.a = this.b = null;
		this.node = null;
	}
	alloc() {
	}
	static get(a,b) {
		let ret;
		if(ZPP_PartitionPair.zpp_pool == null) {
			ret = new ZPP_PartitionPair();
		} else {
			ret = ZPP_PartitionPair.zpp_pool;
			ZPP_PartitionPair.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.a = a;
		ret.b = b;
		if(a.id < b.id) {
			ret.id = a.id;
			ret.di = b.id;
		} else {
			ret.id = b.id;
			ret.di = a.id;
		}
		return ret;
	}
	static edge_swap(a,b) {
		let t = a.node;
		a.node = b.node;
		b.node = t;
	}
	static edge_lt(a,b) {
		if(a.id >= b.id) {
			if(a.id == b.id) {
				return a.di < b.di;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
}
ZPP_PartitionPair.zpp_pool = null;
