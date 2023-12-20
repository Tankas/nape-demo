import Vec2 from '../../nape/geom/Vec2.js';
export default class ZPP_Vec2 {
	constructor() {
		this.y = 0.0;
		this.x = 0.0;
		this.length = 0;
		this.pushmod = false;
		this.modified = false;
		this._inuse = false;
		this.next = null;
		this.weak = false;
		this.outer = null;
		this._isimmutable = null;
		this._immutable = false;
		this._validate = null;
		this._invalidate = null;
	}
	validate() {
		if(this._validate != null) {
			this._validate();
		}
	}
	invalidate() {
		if(this._invalidate != null) {
			this._invalidate(this);
		}
	}
	immutable() {
		if(this._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(this._isimmutable != null) {
			this._isimmutable();
		}
	}
	wrapper() {
		if(this.outer == null) {
			this.outer = new Vec2();
			let o = this.outer.zpp_inner;
			if(o.outer != null) {
				o.outer.zpp_inner = null;
				o.outer = null;
			}
			o._isimmutable = null;
			o._validate = null;
			o._invalidate = null;
			o.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o;
			this.outer.zpp_inner = this;
		}
		return this.outer;
	}
	free() {
		if(this.outer != null) {
			this.outer.zpp_inner = null;
			this.outer = null;
		}
		this._isimmutable = null;
		this._validate = null;
		this._invalidate = null;
	}
	alloc() {
		this.weak = false;
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
	copy() {
		let x = this.x;
		let y = this.y;
		let ret;
		if(ZPP_Vec2.zpp_pool == null) {
			ret = new ZPP_Vec2();
		} else {
			ret = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.weak = false;
		ret._immutable = false;
		ret.x = x;
		ret.y = y;
		return ret;
	}
	toString() {
		return "{ x: " + this.x + " y: " + this.y + " }";
	}
	static get(x,y,immutable) {
		if(immutable == null) {
			immutable = false;
		}
		let ret;
		if(ZPP_Vec2.zpp_pool == null) {
			ret = new ZPP_Vec2();
		} else {
			ret = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.weak = false;
		ret._immutable = immutable;
		ret.x = x;
		ret.y = y;
		return ret;
	}
}
ZPP_Vec2.zpp_pool = null;
