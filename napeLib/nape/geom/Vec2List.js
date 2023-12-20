import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZPP_Vec2List from '../../zpp_nape/util/ZPP_Vec2List.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import Vec2Iterator from './Vec2Iterator.js';
import Vec2 from './Vec2.js';
export default class Vec2List {
	constructor() {
		if(Vec2List._hx_skip_constructor) {
			return;
		}
		this._hx_constructor();
	}
	_hx_constructor() {
		this.zpp_inner = null;
		this.zpp_inner = new ZPP_Vec2List();
		this.zpp_inner.outer = this;
	}
	get_length() {
		return this.zpp_gl();
	}
	zpp_gl() {
		this.zpp_inner.valmod();
		if(this.zpp_inner.zip_length) {
			this.zpp_inner.zip_length = false;
			this.zpp_inner.user_length = this.zpp_inner.inner.length;
		}
		return this.zpp_inner.user_length;
	}
	zpp_vm() {
		this.zpp_inner.valmod();
	}
	has(obj) {
		this.zpp_vm();
		return this.zpp_inner.inner.has(obj.zpp_inner);
	}
	at(index) {
		this.zpp_vm();
		if(index < 0 || index >= this.zpp_gl()) {
			throw haxe_Exception.thrown("Error: Index out of bounds");
		}
		if(this.zpp_inner.reverse_flag) {
			index = this.zpp_gl() - 1 - index;
		}
		if(index < this.zpp_inner.at_index || this.zpp_inner.at_ite == null) {
			this.zpp_inner.at_index = index;
			this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(index);
		} else {
			while(this.zpp_inner.at_index != index) {
				this.zpp_inner.at_index++;
				this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
			}
		}
		let _this = this.zpp_inner.at_ite.elt;
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
		let cont = this.zpp_inner.adder != null ? this.zpp_inner.adder(obj) : true;
		if(cont) {
			if(this.zpp_inner.reverse_flag) {
				this.zpp_inner.inner.add(obj.zpp_inner);
			} else {
				if(this.zpp_inner.push_ite == null) {
					let tmp = this.empty() ? null : this.zpp_inner.inner.iterator_at(this.zpp_gl() - 1);
					this.zpp_inner.push_ite = tmp;
				}
				this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite,obj.zpp_inner);
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
		let cont = this.zpp_inner.adder != null ? this.zpp_inner.adder(obj) : true;
		if(cont) {
			if(this.zpp_inner.reverse_flag) {
				if(this.zpp_inner.push_ite == null) {
					let tmp = this.empty() ? null : this.zpp_inner.inner.iterator_at(this.zpp_gl() - 1);
					this.zpp_inner.push_ite = tmp;
				}
				this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite,obj.zpp_inner);
			} else {
				this.zpp_inner.inner.add(obj.zpp_inner);
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
			ret = this.zpp_inner.inner.head.elt;
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
				this.zpp_inner.inner.pop();
			}
		} else {
			if(this.zpp_inner.at_ite != null && this.zpp_inner.at_ite.next == null) {
				this.zpp_inner.at_ite = null;
			}
			let ite = this.zpp_gl() == 1 ? null : this.zpp_inner.inner.iterator_at(this.zpp_gl() - 2);
			ret = ite == null ? this.zpp_inner.inner.head.elt : ite.next.elt;
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
				this.zpp_inner.inner.erase(ite);
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
			if(this.zpp_inner.at_ite != null && this.zpp_inner.at_ite.next == null) {
				this.zpp_inner.at_ite = null;
			}
			let ite = this.zpp_gl() == 1 ? null : this.zpp_inner.inner.iterator_at(this.zpp_gl() - 2);
			ret = ite == null ? this.zpp_inner.inner.head.elt : ite.next.elt;
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
				this.zpp_inner.inner.erase(ite);
			}
		} else {
			ret = this.zpp_inner.inner.head.elt;
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
				this.zpp_inner.inner.pop();
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
	add(obj) {
		if(this.zpp_inner.reverse_flag) {
			return this.push(obj);
		} else {
			return this.unshift(obj);
		}
	}
	remove(obj) {
		if(this.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + "List is immutable");
		}
		this.zpp_inner.modify_test();
		this.zpp_vm();
		let ret;
		ret = false;
		let cx_ite = this.zpp_inner.inner.head;
		while(cx_ite != null) {
			let x = cx_ite.elt;
			if(x == obj.zpp_inner) {
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
				this.zpp_inner.inner.remove(obj.zpp_inner);
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
	empty() {
		return this.zpp_gl() == 0;
	}
	iterator() {
		this.zpp_vm();
		return Vec2Iterator.get(this);
	}
	copy(deep) {
		if(deep == null) {
			deep = false;
		}
		let ret = new Vec2List();
		let _g = this.iterator();
		while(true) {
			_g.zpp_inner.zpp_inner.valmod();
			let length = _g.zpp_inner.zpp_gl();
			_g.zpp_critical = true;
			let tmp;
			if(_g.zpp_i < length) {
				tmp = true;
			} else {
				_g.zpp_next = Vec2Iterator.zpp_pool;
				Vec2Iterator.zpp_pool = _g;
				_g.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g.zpp_critical = false;
			let i = _g.zpp_inner.at(_g.zpp_i++);
			let tmp1;
			if(deep) {
				if(i != null && i.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				if(i.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = i.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				let x = i.zpp_inner.x;
				if(i.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = i.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				let y = i.zpp_inner.y;
				let weak = false;
				if(weak == null) {
					weak = false;
				}
				if(y == null) {
					y = 0;
				}
				if(x == null) {
					x = 0;
				}
				if(x != x || y != y) {
					throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
				}
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
					ret1.x = x;
					ret1.y = y;
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
					if(x != x || y != y) {
						throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
					}
					let tmp;
					if(ret != null && ret.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this1 = ret.zpp_inner;
					if(_this1._validate != null) {
						_this1._validate();
					}
					if(ret.zpp_inner.x == x) {
						if(ret != null && ret.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = ret.zpp_inner;
						if(_this._validate != null) {
							_this._validate();
						}
						tmp = ret.zpp_inner.y == y;
					} else {
						tmp = false;
					}
					if(!tmp) {
						ret.zpp_inner.x = x;
						ret.zpp_inner.y = y;
						let _this = ret.zpp_inner;
						if(_this._invalidate != null) {
							_this._invalidate(_this);
						}
					}
				}
				ret.zpp_inner.weak = weak;
				tmp1 = ret;
			} else {
				tmp1 = i;
			}
			ret.push(tmp1);
		}
		return ret;
	}
	merge(xs) {
		if(xs == null) {
			throw haxe_Exception.thrown("Error: Cannot merge with null list");
		}
		let _g = xs.iterator();
		while(true) {
			_g.zpp_inner.zpp_inner.valmod();
			let length = _g.zpp_inner.zpp_gl();
			_g.zpp_critical = true;
			let tmp;
			if(_g.zpp_i < length) {
				tmp = true;
			} else {
				_g.zpp_next = Vec2Iterator.zpp_pool;
				Vec2Iterator.zpp_pool = _g;
				_g.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g.zpp_critical = false;
			let x = _g.zpp_inner.at(_g.zpp_i++);
			if(!this.has(x)) {
				this.add(x);
			}
		}
	}
	toString() {
		let ret = "[";
		let fst = true;
		let _g = this.iterator();
		while(true) {
			_g.zpp_inner.zpp_inner.valmod();
			let length = _g.zpp_inner.zpp_gl();
			_g.zpp_critical = true;
			let tmp;
			if(_g.zpp_i < length) {
				tmp = true;
			} else {
				_g.zpp_next = Vec2Iterator.zpp_pool;
				Vec2Iterator.zpp_pool = _g;
				_g.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g.zpp_critical = false;
			let i = _g.zpp_inner.at(_g.zpp_i++);
			if(!fst) {
				ret += ",";
			}
			ret += i == null ? "NULL" : i.toString();
			fst = false;
		}
		return ret + "]";
	}
	foreach(lambda) {
		if(lambda == null) {
			throw haxe_Exception.thrown("Error: Cannot execute null on list elements");
		}
		let it = this.iterator();
		while(true) {
			it.zpp_inner.zpp_inner.valmod();
			let length = it.zpp_inner.zpp_gl();
			it.zpp_critical = true;
			let tmp;
			if(it.zpp_i < length) {
				tmp = true;
			} else {
				it.zpp_next = Vec2Iterator.zpp_pool;
				Vec2Iterator.zpp_pool = it;
				it.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			try {
				it.zpp_critical = false;
				lambda(it.zpp_inner.at(it.zpp_i++));
			} catch( _g ) {
				haxe_NativeStackTrace.lastError = _g;
				it.zpp_next = Vec2Iterator.zpp_pool;
				Vec2Iterator.zpp_pool = it;
				it.zpp_inner = null;
				break;
			}
		}
		return this;
	}
	filter(lambda) {
		if(lambda == null) {
			throw haxe_Exception.thrown("Error: Cannot select elements of list with null");
		}
		let i = 0;
		while(i < this.zpp_gl()) {
			let x = this.at(i);
			try {
				if(lambda(x)) {
					++i;
				} else {
					this.remove(x);
				}
			} catch( _g ) {
				haxe_NativeStackTrace.lastError = _g;
				break;
			}
		}
		return this;
	}
	static fromArray(array) {
		if(array == null) {
			throw haxe_Exception.thrown("Error: Cannot convert null Array to Nape list");
		}
		let ret = new Vec2List();
		let _g = 0;
		while(_g < array.length) {
			let i = array[_g];
			++_g;
			ret.push(i);
		}
		return ret;
	}
}
Vec2List._hx_skip_constructor = false;
