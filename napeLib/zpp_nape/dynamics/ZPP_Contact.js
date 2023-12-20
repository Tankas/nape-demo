import ZPP_PubPool from '../util/ZPP_PubPool.js';
import ZPP_Vec2 from '../geom/ZPP_Vec2.js';
import ZPP_IContact from './ZPP_IContact.js';
import Vec2 from '../../nape/geom/Vec2.js';
import Contact from '../../nape/dynamics/Contact.js';
export default class ZPP_Contact {
	constructor() {
		this.length = 0;
		this.pushmod = false;
		this.modified = false;
		this._inuse = false;
		this.next = null;
		this.elasticity = 0.0;
		this.dist = 0.0;
		this.fresh = false;
		this.hash = 0;
		this.stamp = 0;
		this.posOnly = false;
		this.active = false;
		this.inner = null;
		this.arbiter = null;
		this.wrap_position = null;
		this.py = 0.0;
		this.px = 0.0;
		this.outer = null;
		this.inner = new ZPP_IContact();
	}
	wrapper() {
		if(this.outer == null) {
			ZPP_Contact.internal = true;
			this.outer = new Contact();
			ZPP_Contact.internal = false;
			this.outer.zpp_inner = this;
		}
		return this.outer;
	}
	position_validate() {
		if(this.inactiveme()) {
			throw haxe_Exception.thrown("Error: Contact not currently in use");
		}
		this.wrap_position.zpp_inner.x = this.px;
		this.wrap_position.zpp_inner.y = this.py;
	}
	getposition() {
		let me = this;
		let ret;
		if(ZPP_PubPool.poolVec2 == null) {
			ret = new Vec2();
		} else {
			ret = ZPP_PubPool.poolVec2;
			ZPP_PubPool.poolVec2 = ret.zpp_pool;
			ret.zpp_pool = null;
			ret.zpp_disp = false;
			if(ret == ZPP_PubPool.nextVec2) {
				ZPP_PubPool.nextVec2 = null;
			}
		}
		if(ret.zpp_inner == null) {
			let ret1;
			if(ZPP_Vec2.zpp_pool == null) {
				ret1 = new ZPP_Vec2();
			} else {
				ret1 = ZPP_Vec2.zpp_pool;
				ZPP_Vec2.zpp_pool = ret1.next;
				ret1.next = null;
			}
			ret1.weak = false;
			ret1._immutable = false;
			ret1.x = 0;
			ret1.y = 0;
			ret.zpp_inner = ret1;
			ret.zpp_inner.outer = ret;
		} else {
			if(ret != null && ret.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = ret.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			let tmp;
			if(ret != null && ret.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = ret.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			if(ret.zpp_inner.x == 0) {
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = ret.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				tmp = ret.zpp_inner.y == 0;
			} else {
				tmp = false;
			}
			if(!tmp) {
				ret.zpp_inner.x = 0;
				ret.zpp_inner.y = 0;
				let _this = ret.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
		}
		ret.zpp_inner.weak = false;
		this.wrap_position = ret;
		this.wrap_position.zpp_inner._inuse = true;
		this.wrap_position.zpp_inner._immutable = true;
		this.wrap_position.zpp_inner._validate = $bind(this,this.position_validate);
	}
	inactiveme() {
		return !(this.active && this.arbiter != null && this.arbiter.active);
	}
	free() {
		this.arbiter = null;
	}
	alloc() {
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
}
ZPP_Contact.internal = false;
ZPP_Contact.zpp_pool = null;
