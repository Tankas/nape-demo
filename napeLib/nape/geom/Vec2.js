import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
export default class Vec2 {
	constructor(x,y) {
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		this.zpp_pool = null;
		this.zpp_inner = null;
		if(x != x || y != y) {
			throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
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
		ret._immutable = false;
		ret.x = x;
		ret.y = y;
		this.zpp_inner = ret;
		this.zpp_inner.outer = this;
	}
	dispose() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this._isimmutable != null) {
			_this._isimmutable();
		}
		if(this.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner = this.zpp_inner;
		this.zpp_inner.outer = null;
		this.zpp_inner = null;
		let o = this;
		o.zpp_pool = null;
		if(ZPP_PubPool.nextVec2 != null) {
			ZPP_PubPool.nextVec2.zpp_pool = o;
		} else {
			ZPP_PubPool.poolVec2 = o;
		}
		ZPP_PubPool.nextVec2 = o;
		o.zpp_disp = true;
		let o1 = inner;
		if(o1.outer != null) {
			o1.outer.zpp_inner = null;
			o1.outer = null;
		}
		o1._isimmutable = null;
		o1._validate = null;
		o1._invalidate = null;
		o1.next = ZPP_Vec2.zpp_pool;
		ZPP_Vec2.zpp_pool = o1;
	}
	copy(weak) {
		if(weak == null) {
			weak = false;
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let x = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let y = this.zpp_inner.y;
		let weak1 = weak;
		if(weak1 == null) {
			weak1 = false;
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
		ret.zpp_inner.weak = weak1;
		return ret;
	}
	toPoint(output) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(output == null) {
			output = { x : 0.0, y : 0.0};
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		output.x = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		output.y = this.zpp_inner.y;
		return output;
	}
	get_x() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		return this.zpp_inner.x;
	}
	set_x(x) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this._isimmutable != null) {
			_this._isimmutable();
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		if(this.zpp_inner.x != x) {
			if(x != x) {
				throw haxe_Exception.thrown("Error: Vec2::" + "x" + " cannot be NaN");
			}
			this.zpp_inner.x = x;
			let _this = this.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		return this.zpp_inner.x;
	}
	get_y() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		return this.zpp_inner.y;
	}
	set_y(y) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this._isimmutable != null) {
			_this._isimmutable();
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		if(this.zpp_inner.y != y) {
			if(y != y) {
				throw haxe_Exception.thrown("Error: Vec2::" + "y" + " cannot be NaN");
			}
			this.zpp_inner.y = y;
			let _this = this.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		return this.zpp_inner.y;
	}
	get_length() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let tmp = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let tmp1 = tmp * this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let tmp2 = this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = this.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		return Math.sqrt(tmp1 + tmp2 * this.zpp_inner.y);
	}
	set_length(length) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this._isimmutable != null) {
			_this._isimmutable();
		}
		if(length != length) {
			throw haxe_Exception.thrown("Error: Vec2::length cannot be NaN");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let tmp = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let tmp1 = tmp * this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = this.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let tmp2 = this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = this.zpp_inner;
		if(_this4._validate != null) {
			_this4._validate();
		}
		if(tmp1 + tmp2 * this.zpp_inner.y == 0) {
			throw haxe_Exception.thrown("Error: Cannot set length of a zero vector");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this5 = this.zpp_inner;
		if(_this5._validate != null) {
			_this5._validate();
		}
		let t = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this6 = this.zpp_inner;
		if(_this6._validate != null) {
			_this6._validate();
		}
		let t1 = t * this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this7 = this.zpp_inner;
		if(_this7._validate != null) {
			_this7._validate();
		}
		let t2 = this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this8 = this.zpp_inner;
		if(_this8._validate != null) {
			_this8._validate();
		}
		let t3 = length / Math.sqrt(t1 + t2 * this.zpp_inner.y);
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this9 = this.zpp_inner;
		if(_this9._validate != null) {
			_this9._validate();
		}
		let x = this.zpp_inner.x * t3;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this10 = this.zpp_inner;
		if(_this10._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this10._isimmutable != null) {
			_this10._isimmutable();
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this11 = this.zpp_inner;
		if(_this11._validate != null) {
			_this11._validate();
		}
		if(this.zpp_inner.x != x) {
			if(x != x) {
				throw haxe_Exception.thrown("Error: Vec2::" + "x" + " cannot be NaN");
			}
			this.zpp_inner.x = x;
			let _this = this.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this12 = this.zpp_inner;
		if(_this12._validate != null) {
			_this12._validate();
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this13 = this.zpp_inner;
		if(_this13._validate != null) {
			_this13._validate();
		}
		let y = this.zpp_inner.y * t3;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this14 = this.zpp_inner;
		if(_this14._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this14._isimmutable != null) {
			_this14._isimmutable();
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this15 = this.zpp_inner;
		if(_this15._validate != null) {
			_this15._validate();
		}
		if(this.zpp_inner.y != y) {
			if(y != y) {
				throw haxe_Exception.thrown("Error: Vec2::" + "y" + " cannot be NaN");
			}
			this.zpp_inner.y = y;
			let _this = this.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this16 = this.zpp_inner;
		if(_this16._validate != null) {
			_this16._validate();
		}
		let _this17 = this.zpp_inner;
		if(_this17._invalidate != null) {
			_this17._invalidate(_this17);
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this18 = this.zpp_inner;
		if(_this18._validate != null) {
			_this18._validate();
		}
		let tmp3 = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this19 = this.zpp_inner;
		if(_this19._validate != null) {
			_this19._validate();
		}
		let tmp4 = tmp3 * this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this20 = this.zpp_inner;
		if(_this20._validate != null) {
			_this20._validate();
		}
		let tmp5 = this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this21 = this.zpp_inner;
		if(_this21._validate != null) {
			_this21._validate();
		}
		return Math.sqrt(tmp4 + tmp5 * this.zpp_inner.y);
	}
	lsq() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let tmp = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let tmp1 = tmp * this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let tmp2 = this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = this.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		return tmp1 + tmp2 * this.zpp_inner.y;
	}
	set(vector) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this._isimmutable != null) {
			_this._isimmutable();
		}
		if(vector == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
		}
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = vector.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let x = vector.zpp_inner.x;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = vector.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let y = vector.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = this.zpp_inner;
		if(_this3._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this3._isimmutable != null) {
			_this3._isimmutable();
		}
		if(x != x || y != y) {
			throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
		}
		let tmp;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = this.zpp_inner;
		if(_this4._validate != null) {
			_this4._validate();
		}
		if(this.zpp_inner.x == x) {
			if(this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = this.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			tmp = this.zpp_inner.y == y;
		} else {
			tmp = false;
		}
		if(!tmp) {
			this.zpp_inner.x = x;
			this.zpp_inner.y = y;
			let _this = this.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		let ret = this;
		if(vector.zpp_inner.weak) {
			if(vector != null && vector.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = vector.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(vector.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = vector.zpp_inner;
			vector.zpp_inner.outer = null;
			vector.zpp_inner = null;
			let o = vector;
			o.zpp_pool = null;
			if(ZPP_PubPool.nextVec2 != null) {
				ZPP_PubPool.nextVec2.zpp_pool = o;
			} else {
				ZPP_PubPool.poolVec2 = o;
			}
			ZPP_PubPool.nextVec2 = o;
			o.zpp_disp = true;
			let o1 = inner;
			if(o1.outer != null) {
				o1.outer.zpp_inner = null;
				o1.outer = null;
			}
			o1._isimmutable = null;
			o1._validate = null;
			o1._invalidate = null;
			o1.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o1;
		}
		return ret;
	}
	setxy(x,y) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
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
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		if(this.zpp_inner.x == x) {
			if(this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = this.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			tmp = this.zpp_inner.y == y;
		} else {
			tmp = false;
		}
		if(!tmp) {
			this.zpp_inner.x = x;
			this.zpp_inner.y = y;
			let _this = this.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		return this;
	}
	get_angle() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let tmp;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let tmp1 = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		if(tmp1 == this.zpp_inner.y) {
			if(this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = this.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			tmp = this.zpp_inner.x == 0;
		} else {
			tmp = false;
		}
		if(tmp) {
			return 0.0;
		} else {
			if(this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = this.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let tmp = this.zpp_inner.y;
			if(this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = this.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			return Math.atan2(tmp,this.zpp_inner.x);
		}
	}
	set_angle(angle) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this._isimmutable != null) {
			_this._isimmutable();
		}
		if(angle != angle) {
			throw haxe_Exception.thrown("Error: Vec2::angle cannot be NaN");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let l = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let l1 = l * this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = this.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let l2 = this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = this.zpp_inner;
		if(_this4._validate != null) {
			_this4._validate();
		}
		let l3 = Math.sqrt(l1 + l2 * this.zpp_inner.y);
		let x = l3 * Math.cos(angle);
		let y = l3 * Math.sin(angle);
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this5 = this.zpp_inner;
		if(_this5._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this5._isimmutable != null) {
			_this5._isimmutable();
		}
		if(x != x || y != y) {
			throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
		}
		let tmp;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this6 = this.zpp_inner;
		if(_this6._validate != null) {
			_this6._validate();
		}
		if(this.zpp_inner.x == x) {
			if(this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = this.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			tmp = this.zpp_inner.y == y;
		} else {
			tmp = false;
		}
		if(!tmp) {
			this.zpp_inner.x = x;
			this.zpp_inner.y = y;
			let _this = this.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let tmp1;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this7 = this.zpp_inner;
		if(_this7._validate != null) {
			_this7._validate();
		}
		let tmp2 = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this8 = this.zpp_inner;
		if(_this8._validate != null) {
			_this8._validate();
		}
		if(tmp2 == this.zpp_inner.y) {
			if(this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = this.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			tmp1 = this.zpp_inner.x == 0;
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			return 0.0;
		} else {
			if(this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = this.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let tmp = this.zpp_inner.y;
			if(this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = this.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			return Math.atan2(tmp,this.zpp_inner.x);
		}
	}
	rotate(angle) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this._isimmutable != null) {
			_this._isimmutable();
		}
		if(angle != angle) {
			throw haxe_Exception.thrown("Error: Cannot rotate Vec2 by NaN");
		}
		if(angle % (Math.PI * 2) != 0) {
			let ax = Math.sin(angle);
			let ay = Math.cos(angle);
			let t = ay * this.zpp_inner.x - ax * this.zpp_inner.y;
			this.zpp_inner.y = this.zpp_inner.x * ax + this.zpp_inner.y * ay;
			this.zpp_inner.x = t;
			let _this = this.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		return this;
	}
	reflect(vec,weak) {
		if(weak == null) {
			weak = false;
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(vec != null && vec.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let tmp = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let tmp1 = tmp * this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let tmp2 = this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = this.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		if(Math.sqrt(tmp1 + tmp2 * this.zpp_inner.y) == 0) {
			throw haxe_Exception.thrown("Error: Cannot reflect in zero vector");
		}
		let weak1 = true;
		if(weak1 == null) {
			weak1 = false;
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = this.zpp_inner;
		if(_this4._validate != null) {
			_this4._validate();
		}
		let x = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this5 = this.zpp_inner;
		if(_this5._validate != null) {
			_this5._validate();
		}
		let y = this.zpp_inner.y;
		let weak2 = weak1;
		if(weak2 == null) {
			weak2 = false;
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
			let normal;
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
				normal = ret.zpp_inner.y == y;
			} else {
				normal = false;
			}
			if(!normal) {
				ret.zpp_inner.x = x;
				ret.zpp_inner.y = y;
				let _this = ret.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
		}
		ret.zpp_inner.weak = weak2;
		let normal = ret.normalise();
		let ret1 = vec.sub(normal.muleq(2 * normal.dot(vec)),weak);
		if(vec.zpp_inner.weak) {
			if(vec != null && vec.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = vec.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(vec.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = vec.zpp_inner;
			vec.zpp_inner.outer = null;
			vec.zpp_inner = null;
			let o = vec;
			o.zpp_pool = null;
			if(ZPP_PubPool.nextVec2 != null) {
				ZPP_PubPool.nextVec2.zpp_pool = o;
			} else {
				ZPP_PubPool.poolVec2 = o;
			}
			ZPP_PubPool.nextVec2 = o;
			o.zpp_disp = true;
			let o1 = inner;
			if(o1.outer != null) {
				o1.outer.zpp_inner = null;
				o1.outer = null;
			}
			o1._isimmutable = null;
			o1._validate = null;
			o1._invalidate = null;
			o1.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o1;
		}
		return ret1;
	}
	normalise() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this._isimmutable != null) {
			_this._isimmutable();
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let tmp = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let tmp1 = tmp * this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = this.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let tmp2 = this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = this.zpp_inner;
		if(_this4._validate != null) {
			_this4._validate();
		}
		if(Math.sqrt(tmp1 + tmp2 * this.zpp_inner.y) == 0) {
			throw haxe_Exception.thrown("Error: Cannot normalise vector of length 0");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this5 = this.zpp_inner;
		if(_this5._validate != null) {
			_this5._validate();
		}
		let d = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this6 = this.zpp_inner;
		if(_this6._validate != null) {
			_this6._validate();
		}
		let d1 = d * this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this7 = this.zpp_inner;
		if(_this7._validate != null) {
			_this7._validate();
		}
		let d2 = this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this8 = this.zpp_inner;
		if(_this8._validate != null) {
			_this8._validate();
		}
		let d3 = d1 + d2 * this.zpp_inner.y;
		let imag = 1.0 / Math.sqrt(d3);
		let t = imag;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this9 = this.zpp_inner;
		if(_this9._validate != null) {
			_this9._validate();
		}
		let x = this.zpp_inner.x * t;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this10 = this.zpp_inner;
		if(_this10._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this10._isimmutable != null) {
			_this10._isimmutable();
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this11 = this.zpp_inner;
		if(_this11._validate != null) {
			_this11._validate();
		}
		if(this.zpp_inner.x != x) {
			if(x != x) {
				throw haxe_Exception.thrown("Error: Vec2::" + "x" + " cannot be NaN");
			}
			this.zpp_inner.x = x;
			let _this = this.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this12 = this.zpp_inner;
		if(_this12._validate != null) {
			_this12._validate();
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this13 = this.zpp_inner;
		if(_this13._validate != null) {
			_this13._validate();
		}
		let y = this.zpp_inner.y * t;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this14 = this.zpp_inner;
		if(_this14._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this14._isimmutable != null) {
			_this14._isimmutable();
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this15 = this.zpp_inner;
		if(_this15._validate != null) {
			_this15._validate();
		}
		if(this.zpp_inner.y != y) {
			if(y != y) {
				throw haxe_Exception.thrown("Error: Vec2::" + "y" + " cannot be NaN");
			}
			this.zpp_inner.y = y;
			let _this = this.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this16 = this.zpp_inner;
		if(_this16._validate != null) {
			_this16._validate();
		}
		let _this17 = this.zpp_inner;
		if(_this17._invalidate != null) {
			_this17._invalidate(_this17);
		}
		return this;
	}
	unit(weak) {
		if(weak == null) {
			weak = false;
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let tmp = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let tmp1 = tmp * this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let tmp2 = this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = this.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		if(Math.sqrt(tmp1 + tmp2 * this.zpp_inner.y) == 0) {
			throw haxe_Exception.thrown("Error: Cannot normalise vector of length 0");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = this.zpp_inner;
		if(_this4._validate != null) {
			_this4._validate();
		}
		let x = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this5 = this.zpp_inner;
		if(_this5._validate != null) {
			_this5._validate();
		}
		let x1 = x * this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this6 = this.zpp_inner;
		if(_this6._validate != null) {
			_this6._validate();
		}
		let x2 = this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this7 = this.zpp_inner;
		if(_this7._validate != null) {
			_this7._validate();
		}
		let scale = 1 / Math.sqrt(x1 + x2 * this.zpp_inner.y);
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this8 = this.zpp_inner;
		if(_this8._validate != null) {
			_this8._validate();
		}
		let x3 = this.zpp_inner.x * scale;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this9 = this.zpp_inner;
		if(_this9._validate != null) {
			_this9._validate();
		}
		let y = this.zpp_inner.y * scale;
		let weak1 = weak;
		if(weak1 == null) {
			weak1 = false;
		}
		if(y == null) {
			y = 0;
		}
		if(x3 == null) {
			x3 = 0;
		}
		if(x3 != x3 || y != y) {
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
			ret1.x = x3;
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
			if(x3 != x3 || y != y) {
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
			if(ret.zpp_inner.x == x3) {
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
				ret.zpp_inner.x = x3;
				ret.zpp_inner.y = y;
				let _this = ret.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
		}
		ret.zpp_inner.weak = weak1;
		return ret;
	}
	add(vector,weak) {
		if(weak == null) {
			weak = false;
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(vector == null) {
			throw haxe_Exception.thrown("Error: Cannot add null vectors");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let x = this.zpp_inner.x;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = vector.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let x1 = x + vector.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let y = this.zpp_inner.y;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = vector.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let y1 = y + vector.zpp_inner.y;
		let weak1 = weak;
		if(weak1 == null) {
			weak1 = false;
		}
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		if(x1 != x1 || y1 != y1) {
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
			ret1.x = x1;
			ret1.y = y1;
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
			if(x1 != x1 || y1 != y1) {
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
			if(ret.zpp_inner.x == x1) {
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = ret.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				tmp = ret.zpp_inner.y == y1;
			} else {
				tmp = false;
			}
			if(!tmp) {
				ret.zpp_inner.x = x1;
				ret.zpp_inner.y = y1;
				let _this = ret.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
		}
		ret.zpp_inner.weak = weak1;
		let ret1 = ret;
		if(vector.zpp_inner.weak) {
			if(vector != null && vector.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = vector.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(vector.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = vector.zpp_inner;
			vector.zpp_inner.outer = null;
			vector.zpp_inner = null;
			let o = vector;
			o.zpp_pool = null;
			if(ZPP_PubPool.nextVec2 != null) {
				ZPP_PubPool.nextVec2.zpp_pool = o;
			} else {
				ZPP_PubPool.poolVec2 = o;
			}
			ZPP_PubPool.nextVec2 = o;
			o.zpp_disp = true;
			let o1 = inner;
			if(o1.outer != null) {
				o1.outer.zpp_inner = null;
				o1.outer = null;
			}
			o1._isimmutable = null;
			o1._validate = null;
			o1._invalidate = null;
			o1.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o1;
		}
		return ret1;
	}
	addMul(vector,scalar,weak) {
		if(weak == null) {
			weak = false;
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(vector == null) {
			throw haxe_Exception.thrown("Error: Cannot add null vectors");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let x = this.zpp_inner.x;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = vector.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let x1 = x + vector.zpp_inner.x * scalar;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let y = this.zpp_inner.y;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = vector.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let y1 = y + vector.zpp_inner.y * scalar;
		let weak1 = weak;
		if(weak1 == null) {
			weak1 = false;
		}
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		if(x1 != x1 || y1 != y1) {
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
			ret1.x = x1;
			ret1.y = y1;
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
			if(x1 != x1 || y1 != y1) {
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
			if(ret.zpp_inner.x == x1) {
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = ret.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				tmp = ret.zpp_inner.y == y1;
			} else {
				tmp = false;
			}
			if(!tmp) {
				ret.zpp_inner.x = x1;
				ret.zpp_inner.y = y1;
				let _this = ret.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
		}
		ret.zpp_inner.weak = weak1;
		let ret1 = ret;
		if(vector.zpp_inner.weak) {
			if(vector != null && vector.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = vector.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(vector.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = vector.zpp_inner;
			vector.zpp_inner.outer = null;
			vector.zpp_inner = null;
			let o = vector;
			o.zpp_pool = null;
			if(ZPP_PubPool.nextVec2 != null) {
				ZPP_PubPool.nextVec2.zpp_pool = o;
			} else {
				ZPP_PubPool.poolVec2 = o;
			}
			ZPP_PubPool.nextVec2 = o;
			o.zpp_disp = true;
			let o1 = inner;
			if(o1.outer != null) {
				o1.outer.zpp_inner = null;
				o1.outer = null;
			}
			o1._isimmutable = null;
			o1._validate = null;
			o1._invalidate = null;
			o1.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o1;
		}
		return ret1;
	}
	sub(vector,weak) {
		if(weak == null) {
			weak = false;
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(vector == null) {
			throw haxe_Exception.thrown("Error: Cannot subtract null vectors");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let x = this.zpp_inner.x;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = vector.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let x1 = x - vector.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let y = this.zpp_inner.y;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = vector.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let y1 = y - vector.zpp_inner.y;
		let weak1 = weak;
		if(weak1 == null) {
			weak1 = false;
		}
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		if(x1 != x1 || y1 != y1) {
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
			ret1.x = x1;
			ret1.y = y1;
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
			if(x1 != x1 || y1 != y1) {
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
			if(ret.zpp_inner.x == x1) {
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = ret.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				tmp = ret.zpp_inner.y == y1;
			} else {
				tmp = false;
			}
			if(!tmp) {
				ret.zpp_inner.x = x1;
				ret.zpp_inner.y = y1;
				let _this = ret.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
		}
		ret.zpp_inner.weak = weak1;
		let ret1 = ret;
		if(vector.zpp_inner.weak) {
			if(vector != null && vector.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = vector.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(vector.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = vector.zpp_inner;
			vector.zpp_inner.outer = null;
			vector.zpp_inner = null;
			let o = vector;
			o.zpp_pool = null;
			if(ZPP_PubPool.nextVec2 != null) {
				ZPP_PubPool.nextVec2.zpp_pool = o;
			} else {
				ZPP_PubPool.poolVec2 = o;
			}
			ZPP_PubPool.nextVec2 = o;
			o.zpp_disp = true;
			let o1 = inner;
			if(o1.outer != null) {
				o1.outer.zpp_inner = null;
				o1.outer = null;
			}
			o1._isimmutable = null;
			o1._validate = null;
			o1._invalidate = null;
			o1.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o1;
		}
		return ret1;
	}
	mul(scalar,weak) {
		if(weak == null) {
			weak = false;
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(scalar != scalar) {
			throw haxe_Exception.thrown("Error: Cannot multiply with NaN");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let x = this.zpp_inner.x * scalar;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let y = this.zpp_inner.y * scalar;
		let weak1 = weak;
		if(weak1 == null) {
			weak1 = false;
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
		ret.zpp_inner.weak = weak1;
		return ret;
	}
	addeq(vector) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this._isimmutable != null) {
			_this._isimmutable();
		}
		if(vector == null) {
			throw haxe_Exception.thrown("Error: Cannot add null vectors");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let x = this.zpp_inner.x;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = vector.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let x1 = x + vector.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = this.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let y = this.zpp_inner.y;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = vector.zpp_inner;
		if(_this4._validate != null) {
			_this4._validate();
		}
		let y1 = y + vector.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this5 = this.zpp_inner;
		if(_this5._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this5._isimmutable != null) {
			_this5._isimmutable();
		}
		if(x1 != x1 || y1 != y1) {
			throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
		}
		let tmp;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this6 = this.zpp_inner;
		if(_this6._validate != null) {
			_this6._validate();
		}
		if(this.zpp_inner.x == x1) {
			if(this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = this.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			tmp = this.zpp_inner.y == y1;
		} else {
			tmp = false;
		}
		if(!tmp) {
			this.zpp_inner.x = x1;
			this.zpp_inner.y = y1;
			let _this = this.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		if(vector.zpp_inner.weak) {
			if(vector != null && vector.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = vector.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(vector.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = vector.zpp_inner;
			vector.zpp_inner.outer = null;
			vector.zpp_inner = null;
			let o = vector;
			o.zpp_pool = null;
			if(ZPP_PubPool.nextVec2 != null) {
				ZPP_PubPool.nextVec2.zpp_pool = o;
			} else {
				ZPP_PubPool.poolVec2 = o;
			}
			ZPP_PubPool.nextVec2 = o;
			o.zpp_disp = true;
			let o1 = inner;
			if(o1.outer != null) {
				o1.outer.zpp_inner = null;
				o1.outer = null;
			}
			o1._isimmutable = null;
			o1._validate = null;
			o1._invalidate = null;
			o1.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o1;
		}
		return this;
	}
	subeq(vector) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this._isimmutable != null) {
			_this._isimmutable();
		}
		if(vector == null) {
			throw haxe_Exception.thrown("Error: Cannot subtract null vectors");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let x = this.zpp_inner.x;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = vector.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let x1 = x - vector.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = this.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let y = this.zpp_inner.y;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = vector.zpp_inner;
		if(_this4._validate != null) {
			_this4._validate();
		}
		let y1 = y - vector.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this5 = this.zpp_inner;
		if(_this5._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this5._isimmutable != null) {
			_this5._isimmutable();
		}
		if(x1 != x1 || y1 != y1) {
			throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
		}
		let tmp;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this6 = this.zpp_inner;
		if(_this6._validate != null) {
			_this6._validate();
		}
		if(this.zpp_inner.x == x1) {
			if(this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = this.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			tmp = this.zpp_inner.y == y1;
		} else {
			tmp = false;
		}
		if(!tmp) {
			this.zpp_inner.x = x1;
			this.zpp_inner.y = y1;
			let _this = this.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		if(vector.zpp_inner.weak) {
			if(vector != null && vector.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = vector.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(vector.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = vector.zpp_inner;
			vector.zpp_inner.outer = null;
			vector.zpp_inner = null;
			let o = vector;
			o.zpp_pool = null;
			if(ZPP_PubPool.nextVec2 != null) {
				ZPP_PubPool.nextVec2.zpp_pool = o;
			} else {
				ZPP_PubPool.poolVec2 = o;
			}
			ZPP_PubPool.nextVec2 = o;
			o.zpp_disp = true;
			let o1 = inner;
			if(o1.outer != null) {
				o1.outer.zpp_inner = null;
				o1.outer = null;
			}
			o1._isimmutable = null;
			o1._validate = null;
			o1._invalidate = null;
			o1.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o1;
		}
		return this;
	}
	muleq(scalar) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this._isimmutable != null) {
			_this._isimmutable();
		}
		if(scalar != scalar) {
			throw haxe_Exception.thrown("Error: Cannot multiply with NaN");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let x = this.zpp_inner.x * scalar;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let y = this.zpp_inner.y * scalar;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = this.zpp_inner;
		if(_this3._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this3._isimmutable != null) {
			_this3._isimmutable();
		}
		if(x != x || y != y) {
			throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
		}
		let tmp;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = this.zpp_inner;
		if(_this4._validate != null) {
			_this4._validate();
		}
		if(this.zpp_inner.x == x) {
			if(this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = this.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			tmp = this.zpp_inner.y == y;
		} else {
			tmp = false;
		}
		if(!tmp) {
			this.zpp_inner.x = x;
			this.zpp_inner.y = y;
			let _this = this.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		return this;
	}
	dot(vector) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(vector == null) {
			throw haxe_Exception.thrown("Error: Cannot take dot product with null vector");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let ret = this.zpp_inner.x;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = vector.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let ret1 = ret * vector.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let ret2 = this.zpp_inner.y;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = vector.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let ret3 = ret1 + ret2 * vector.zpp_inner.y;
		if(vector.zpp_inner.weak) {
			if(vector != null && vector.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = vector.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(vector.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = vector.zpp_inner;
			vector.zpp_inner.outer = null;
			vector.zpp_inner = null;
			let o = vector;
			o.zpp_pool = null;
			if(ZPP_PubPool.nextVec2 != null) {
				ZPP_PubPool.nextVec2.zpp_pool = o;
			} else {
				ZPP_PubPool.poolVec2 = o;
			}
			ZPP_PubPool.nextVec2 = o;
			o.zpp_disp = true;
			let o1 = inner;
			if(o1.outer != null) {
				o1.outer.zpp_inner = null;
				o1.outer = null;
			}
			o1._isimmutable = null;
			o1._validate = null;
			o1._invalidate = null;
			o1.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o1;
		}
		return ret3;
	}
	cross(vector) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(vector == null) {
			throw haxe_Exception.thrown("Error: Cannot take cross product with null vector");
		}
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = vector.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let ret = vector.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let ret1 = ret * this.zpp_inner.x;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = vector.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let ret2 = vector.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = this.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let ret3 = ret1 - ret2 * this.zpp_inner.y;
		if(vector.zpp_inner.weak) {
			if(vector != null && vector.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = vector.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(vector.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = vector.zpp_inner;
			vector.zpp_inner.outer = null;
			vector.zpp_inner = null;
			let o = vector;
			o.zpp_pool = null;
			if(ZPP_PubPool.nextVec2 != null) {
				ZPP_PubPool.nextVec2.zpp_pool = o;
			} else {
				ZPP_PubPool.poolVec2 = o;
			}
			ZPP_PubPool.nextVec2 = o;
			o.zpp_disp = true;
			let o1 = inner;
			if(o1.outer != null) {
				o1.outer.zpp_inner = null;
				o1.outer = null;
			}
			o1._isimmutable = null;
			o1._validate = null;
			o1._invalidate = null;
			o1.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o1;
		}
		return ret3;
	}
	perp(weak) {
		if(weak == null) {
			weak = false;
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let x = -this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let y = this.zpp_inner.x;
		let weak1 = weak;
		if(weak1 == null) {
			weak1 = false;
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
		ret.zpp_inner.weak = weak1;
		return ret;
	}
	toString() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		return this.zpp_inner.toString();
	}
	static weak(x,y) {
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		let x1 = x;
		let y1 = y;
		let weak = true;
		if(weak == null) {
			weak = false;
		}
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		if(x1 != x1 || y1 != y1) {
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
			ret1.x = x1;
			ret1.y = y1;
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
			if(x1 != x1 || y1 != y1) {
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
			if(ret.zpp_inner.x == x1) {
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = ret.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				tmp = ret.zpp_inner.y == y1;
			} else {
				tmp = false;
			}
			if(!tmp) {
				ret.zpp_inner.x = x1;
				ret.zpp_inner.y = y1;
				let _this = ret.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
		}
		ret.zpp_inner.weak = weak;
		return ret;
	}
	static get(x,y,weak) {
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
		return ret;
	}
	static fromPoint(point,weak) {
		if(weak == null) {
			weak = false;
		}
		if(point == null) {
			throw haxe_Exception.thrown("Error: Cannot create Vec2 from null Point object");
		}
		if(point.x != point.x || point.y != point.y) {
			throw haxe_Exception.thrown("Error: Error: Vec2 components cannot be NaN");
		}
		let x = point.x;
		let y = point.y;
		let weak1 = weak;
		if(weak1 == null) {
			weak1 = false;
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
		ret.zpp_inner.weak = weak1;
		return ret;
	}
	static fromPolar(length,angle,weak) {
		if(weak == null) {
			weak = false;
		}
		if(length != length) {
			throw haxe_Exception.thrown("Error: Vec2::length cannot be NaN");
		}
		if(angle != angle) {
			throw haxe_Exception.thrown("Error: Vec2::angle cannot be NaN");
		}
		let x = length * Math.cos(angle);
		let y = length * Math.sin(angle);
		let weak1 = weak;
		if(weak1 == null) {
			weak1 = false;
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
		ret.zpp_inner.weak = weak1;
		return ret;
	}
	static dsq(a,b) {
		if(a != null && a.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(b != null && b.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(a == null || b == null) {
			throw haxe_Exception.thrown("Error: Cannot compute squared distance between null Vec2");
		}
		if(a != null && a.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = a.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let ax = a.zpp_inner.x;
		if(a != null && a.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = a.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let ay = a.zpp_inner.y;
		if(b != null && b.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = b.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let bx = b.zpp_inner.x;
		if(b != null && b.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = b.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let dx = 0.0;
		let dy = 0.0;
		dx = ax - bx;
		dy = ay - b.zpp_inner.y;
		let ret = dx * dx + dy * dy;
		if(a.zpp_inner.weak) {
			if(a != null && a.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = a.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(a.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = a.zpp_inner;
			a.zpp_inner.outer = null;
			a.zpp_inner = null;
			let o = a;
			o.zpp_pool = null;
			if(ZPP_PubPool.nextVec2 != null) {
				ZPP_PubPool.nextVec2.zpp_pool = o;
			} else {
				ZPP_PubPool.poolVec2 = o;
			}
			ZPP_PubPool.nextVec2 = o;
			o.zpp_disp = true;
			let o1 = inner;
			if(o1.outer != null) {
				o1.outer.zpp_inner = null;
				o1.outer = null;
			}
			o1._isimmutable = null;
			o1._validate = null;
			o1._invalidate = null;
			o1.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o1;
		}
		if(b.zpp_inner.weak) {
			if(b != null && b.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = b.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(b.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = b.zpp_inner;
			b.zpp_inner.outer = null;
			b.zpp_inner = null;
			let o = b;
			o.zpp_pool = null;
			if(ZPP_PubPool.nextVec2 != null) {
				ZPP_PubPool.nextVec2.zpp_pool = o;
			} else {
				ZPP_PubPool.poolVec2 = o;
			}
			ZPP_PubPool.nextVec2 = o;
			o.zpp_disp = true;
			let o1 = inner;
			if(o1.outer != null) {
				o1.outer.zpp_inner = null;
				o1.outer = null;
			}
			o1._isimmutable = null;
			o1._validate = null;
			o1._invalidate = null;
			o1.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o1;
		}
		return ret;
	}
	static distance(a,b) {
		if(a != null && a.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(b != null && b.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(a == null || b == null) {
			throw haxe_Exception.thrown("Error: Cannot compute squared distance between null Vec2");
		}
		if(a != null && a.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = a.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let ax = a.zpp_inner.x;
		if(a != null && a.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = a.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let ay = a.zpp_inner.y;
		if(b != null && b.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = b.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let bx = b.zpp_inner.x;
		if(b != null && b.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = b.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let dx = 0.0;
		let dy = 0.0;
		dx = ax - bx;
		dy = ay - b.zpp_inner.y;
		let ret = Math.sqrt(dx * dx + dy * dy);
		if(a.zpp_inner.weak) {
			if(a != null && a.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = a.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(a.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = a.zpp_inner;
			a.zpp_inner.outer = null;
			a.zpp_inner = null;
			let o = a;
			o.zpp_pool = null;
			if(ZPP_PubPool.nextVec2 != null) {
				ZPP_PubPool.nextVec2.zpp_pool = o;
			} else {
				ZPP_PubPool.poolVec2 = o;
			}
			ZPP_PubPool.nextVec2 = o;
			o.zpp_disp = true;
			let o1 = inner;
			if(o1.outer != null) {
				o1.outer.zpp_inner = null;
				o1.outer = null;
			}
			o1._isimmutable = null;
			o1._validate = null;
			o1._invalidate = null;
			o1.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o1;
		}
		if(b.zpp_inner.weak) {
			if(b != null && b.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = b.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(b.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = b.zpp_inner;
			b.zpp_inner.outer = null;
			b.zpp_inner = null;
			let o = b;
			o.zpp_pool = null;
			if(ZPP_PubPool.nextVec2 != null) {
				ZPP_PubPool.nextVec2.zpp_pool = o;
			} else {
				ZPP_PubPool.poolVec2 = o;
			}
			ZPP_PubPool.nextVec2 = o;
			o.zpp_disp = true;
			let o1 = inner;
			if(o1.outer != null) {
				o1.outer.zpp_inner = null;
				o1.outer = null;
			}
			o1._isimmutable = null;
			o1._validate = null;
			o1._invalidate = null;
			o1.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o1;
		}
		return ret;
	}
}
