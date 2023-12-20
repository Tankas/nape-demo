import ZPP_Vec2 from '../geom/ZPP_Vec2.js';
import Vec2List from '../../nape/geom/Vec2List.js';
import Vec2 from '../../nape/geom/Vec2.js';
export default class ZPP_MixVec2List extends Vec2List {
	constructor() {
		Vec2List._hx_skip_constructor = true;
		super();
		Vec2List._hx_skip_constructor = false;
		this._hx_constructor();
	}
	_hx_constructor() {
		this.at_index = 0;
		this.at_ite = null;
		this.zip_length = false;
		this._length = 0;
		this.inner = null;
		super._hx_constructor();
		this.at_ite = null;
		this.at_index = 0;
		this.zip_length = true;
		this._length = 0;
	}
	zpp_gl() {
		this.zpp_vm();
		if(this.zip_length) {
			this._length = 0;
			let cx_ite = this.inner.next;
			while(cx_ite != null) {
				let i = cx_ite;
				this._length++;
				cx_ite = cx_ite.next;
			}
			this.zip_length = false;
		}
		return this._length;
	}
	zpp_vm() {
		this.zpp_inner.validate();
		if(this.inner.modified) {
			this.zip_length = true;
			this._length = 0;
			this.at_ite = null;
		}
	}
	at(index) {
		this.zpp_vm();
		if(index < 0 || index >= this.zpp_gl()) {
			throw haxe_Exception.thrown("Error: Index out of bounds");
		}
		if(this.zpp_inner.reverse_flag) {
			index = this.zpp_gl() - 1 - index;
		}
		if(index < this.at_index || this.at_ite == null) {
			this.at_index = 0;
			this.at_ite = this.inner.next;
			while(true) {
				let x = this.at_ite;
				break;
			}
		}
		while(this.at_index != index) {
			this.at_index++;
			this.at_ite = this.at_ite.next;
			while(true) {
				let x = this.at_ite;
				break;
			}
		}
		let _this = this.at_ite;
		if(_this.outer == null) {
			_this.outer = new Vec2();
			let o = _this.outer.zpp_inner;
			if(o.outer != null) {
				o.outer.zpp_inner = null;
				o.outer = null;
			}
			o._isimmutable = null;
			o._validate = null;
			o._invalidate = null;
			o.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o;
			_this.outer.zpp_inner = _this;
		}
		return _this.outer;
	}
	push(obj) {
		if(this.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + "List is immutable");
		}
		this.zpp_inner.modify_test();
		this.zpp_vm();
		if(obj.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " is already in use");
		}
		let cont = this.zpp_inner.adder != null ? this.zpp_inner.adder(obj) : true;
		if(cont) {
			if(this.zpp_inner.reverse_flag) {
				this.inner.add(obj.zpp_inner);
			} else {
				let ite = this.inner.iterator_at(this.zpp_gl() - 1);
				this.inner.insert(ite,obj.zpp_inner);
			}
			this.zpp_inner.invalidate();
			if(this.zpp_inner.post_adder != null) {
				this.zpp_inner.post_adder(obj);
			}
		}
		return cont;
	}
	unshift(obj) {
		if(this.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + "List is immutable");
		}
		this.zpp_inner.modify_test();
		this.zpp_vm();
		if(obj.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " is already in use");
		}
		let cont = this.zpp_inner.adder != null ? this.zpp_inner.adder(obj) : true;
		if(cont) {
			if(this.zpp_inner.reverse_flag) {
				let ite = this.inner.iterator_at(this.zpp_gl() - 1);
				this.inner.insert(ite,obj.zpp_inner);
			} else {
				this.inner.add(obj.zpp_inner);
			}
			this.zpp_inner.invalidate();
			if(this.zpp_inner.post_adder != null) {
				this.zpp_inner.post_adder(obj);
			}
		}
		return cont;
	}
	pop() {
		if(this.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + "List is immutable");
		}
		this.zpp_inner.modify_test();
		if(this.empty()) {
			throw haxe_Exception.thrown("Error: Cannot remove from empty list");
		}
		this.zpp_vm();
		let ret = null;
		if(this.zpp_inner.reverse_flag) {
			ret = this.inner.next;
			if(ret.outer == null) {
				ret.outer = new Vec2();
				let o = ret.outer.zpp_inner;
				if(o.outer != null) {
					o.outer.zpp_inner = null;
					o.outer = null;
				}
				o._isimmutable = null;
				o._validate = null;
				o._invalidate = null;
				o.next = ZPP_Vec2.zpp_pool;
				ZPP_Vec2.zpp_pool = o;
				ret.outer.zpp_inner = ret;
			}
			let retx = ret.outer;
			if(this.zpp_inner.subber != null) {
				this.zpp_inner.subber(retx);
			}
			if(!this.zpp_inner.dontremove) {
				this.inner.pop();
			}
		} else {
			if(this.at_ite != null && this.at_ite.next == null) {
				this.at_ite = null;
			}
			let ite = this.zpp_gl() == 1 ? null : this.inner.iterator_at(this.zpp_gl() - 2);
			ret = ite == null ? this.inner.next : ite.next;
			if(ret.outer == null) {
				ret.outer = new Vec2();
				let o = ret.outer.zpp_inner;
				if(o.outer != null) {
					o.outer.zpp_inner = null;
					o.outer = null;
				}
				o._isimmutable = null;
				o._validate = null;
				o._invalidate = null;
				o.next = ZPP_Vec2.zpp_pool;
				ZPP_Vec2.zpp_pool = o;
				ret.outer.zpp_inner = ret;
			}
			let retx = ret.outer;
			if(this.zpp_inner.subber != null) {
				this.zpp_inner.subber(retx);
			}
			if(!this.zpp_inner.dontremove) {
				this.inner.erase(ite);
			}
		}
		this.zpp_inner.invalidate();
		if(ret.outer == null) {
			ret.outer = new Vec2();
			let o = ret.outer.zpp_inner;
			if(o.outer != null) {
				o.outer.zpp_inner = null;
				o.outer = null;
			}
			o._isimmutable = null;
			o._validate = null;
			o._invalidate = null;
			o.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o;
			ret.outer.zpp_inner = ret;
		}
		let retx = ret.outer;
		return retx;
	}
	shift() {
		if(this.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + "List is immutable");
		}
		this.zpp_inner.modify_test();
		if(this.empty()) {
			throw haxe_Exception.thrown("Error: Cannot remove from empty list");
		}
		this.zpp_vm();
		let ret = null;
		if(this.zpp_inner.reverse_flag) {
			if(this.at_ite != null && this.at_ite.next == null) {
				this.at_ite = null;
			}
			let ite = this.zpp_gl() == 1 ? null : this.inner.iterator_at(this.zpp_gl() - 2);
			ret = ite == null ? this.inner.next : ite.next;
			if(ret.outer == null) {
				ret.outer = new Vec2();
				let o = ret.outer.zpp_inner;
				if(o.outer != null) {
					o.outer.zpp_inner = null;
					o.outer = null;
				}
				o._isimmutable = null;
				o._validate = null;
				o._invalidate = null;
				o.next = ZPP_Vec2.zpp_pool;
				ZPP_Vec2.zpp_pool = o;
				ret.outer.zpp_inner = ret;
			}
			let retx = ret.outer;
			if(this.zpp_inner.subber != null) {
				this.zpp_inner.subber(retx);
			}
			if(!this.zpp_inner.dontremove) {
				this.inner.erase(ite);
			}
		} else {
			ret = this.inner.next;
			if(ret.outer == null) {
				ret.outer = new Vec2();
				let o = ret.outer.zpp_inner;
				if(o.outer != null) {
					o.outer.zpp_inner = null;
					o.outer = null;
				}
				o._isimmutable = null;
				o._validate = null;
				o._invalidate = null;
				o.next = ZPP_Vec2.zpp_pool;
				ZPP_Vec2.zpp_pool = o;
				ret.outer.zpp_inner = ret;
			}
			let retx = ret.outer;
			if(this.zpp_inner.subber != null) {
				this.zpp_inner.subber(retx);
			}
			if(!this.zpp_inner.dontremove) {
				this.inner.pop();
			}
		}
		this.zpp_inner.invalidate();
		if(ret.outer == null) {
			ret.outer = new Vec2();
			let o = ret.outer.zpp_inner;
			if(o.outer != null) {
				o.outer.zpp_inner = null;
				o.outer = null;
			}
			o._isimmutable = null;
			o._validate = null;
			o._invalidate = null;
			o.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o;
			ret.outer.zpp_inner = ret;
		}
		let retx = ret.outer;
		return retx;
	}
	remove(obj) {
		if(this.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + "List is immutable");
		}
		this.zpp_inner.modify_test();
		this.zpp_vm();
		let ret;
		ret = false;
		let cx_ite = this.inner.next;
		while(cx_ite != null) {
			let x = cx_ite;
			if(obj.zpp_inner == x) {
				ret = true;
				break;
			}
			cx_ite = cx_ite.next;
		}
		if(ret) {
			if(this.zpp_inner.subber != null) {
				this.zpp_inner.subber(obj);
			}
			if(!this.zpp_inner.dontremove) {
				this.inner.remove(obj.zpp_inner);
			}
			this.zpp_inner.invalidate();
		}
		return ret;
	}
	clear() {
		if(this.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + "List is immutable");
		}
		if(this.zpp_inner.reverse_flag) {
			while(!this.empty()) this.pop();
		} else {
			while(!this.empty()) this.shift();
		}
	}
	static get(list,immutable) {
		if(immutable == null) {
			immutable = false;
		}
		let ret = new ZPP_MixVec2List();
		ret.inner = list;
		ret.zpp_inner.immutable = immutable;
		return ret;
	}
}
