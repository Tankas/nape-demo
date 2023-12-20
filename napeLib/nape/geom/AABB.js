import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import ZPP_AABB from '../../zpp_nape/geom/ZPP_AABB.js';
export default class AABB {
	constructor(x,y,width,height) {
		if(height == null) {
			height = 0;
		}
		if(width == null) {
			width = 0;
		}
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		this.zpp_inner = null;
		if(x != x || y != y) {
			throw haxe_Exception.thrown("Error: AABB position cannot be NaN");
		}
		if(width != width || height != height) {
			throw haxe_Exception.thrown("Error: AABB dimensions cannot be NaN");
		}
		let ret;
		if(ZPP_AABB.zpp_pool == null) {
			ret = new ZPP_AABB();
		} else {
			ret = ZPP_AABB.zpp_pool;
			ZPP_AABB.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.minx = x;
		ret.miny = y;
		ret.maxx = x + width;
		ret.maxy = y + height;
		this.zpp_inner = ret;
		this.zpp_inner.outer = this;
	}
	copy() {
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let _this1 = this.zpp_inner;
		let minx = _this1.minx;
		let miny = _this1.miny;
		let maxx = _this1.maxx;
		let maxy = _this1.maxy;
		let ret;
		if(ZPP_AABB.zpp_pool == null) {
			ret = new ZPP_AABB();
		} else {
			ret = ZPP_AABB.zpp_pool;
			ZPP_AABB.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.minx = minx;
		ret.miny = miny;
		ret.maxx = maxx;
		ret.maxy = maxy;
		return ret.wrapper();
	}
	get_min() {
		return this.zpp_inner.getmin();
	}
	set_min(min) {
		if(min != null && min.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner._immutable) {
			throw haxe_Exception.thrown("Error: AABB is immutable");
		}
		if(min == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null to AABB::" + "min");
		}
		let tmp;
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let tmp1 = this.zpp_inner.minx;
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		if(tmp1 == this.zpp_inner.minx) {
			let _this = this.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let tmp1 = this.zpp_inner.miny;
			let _this1 = this.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			tmp = tmp1 != this.zpp_inner.miny;
		} else {
			tmp = true;
		}
		if(tmp) {
			throw haxe_Exception.thrown("Error: AABB::" + "min" + " components cannot be NaN");
		}
		if(min != null && min.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = min.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let tmp2 = min.zpp_inner.x;
		let _this3 = this.zpp_inner.getmax();
		if(_this3 != null && _this3.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = _this3.zpp_inner;
		if(_this4._validate != null) {
			_this4._validate();
		}
		if(tmp2 > _this3.zpp_inner.x) {
			throw haxe_Exception.thrown("Error: Assignment would cause negative width");
		}
		if(min != null && min.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this5 = min.zpp_inner;
		if(_this5._validate != null) {
			_this5._validate();
		}
		let tmp3 = min.zpp_inner.y;
		let _this6 = this.zpp_inner.getmax();
		if(_this6 != null && _this6.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this7 = _this6.zpp_inner;
		if(_this7._validate != null) {
			_this7._validate();
		}
		if(tmp3 > _this6.zpp_inner.y) {
			throw haxe_Exception.thrown("Error: Assignment would cause negative height");
		}
		let _this8 = this.zpp_inner.getmin();
		if(_this8 != null && _this8.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(min != null && min.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this9 = _this8.zpp_inner;
		if(_this9._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this9._isimmutable != null) {
			_this9._isimmutable();
		}
		if(min == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
		}
		if(min != null && min.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this10 = min.zpp_inner;
		if(_this10._validate != null) {
			_this10._validate();
		}
		let x = min.zpp_inner.x;
		if(min != null && min.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this11 = min.zpp_inner;
		if(_this11._validate != null) {
			_this11._validate();
		}
		let y = min.zpp_inner.y;
		if(_this8 != null && _this8.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this12 = _this8.zpp_inner;
		if(_this12._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this12._isimmutable != null) {
			_this12._isimmutable();
		}
		if(x != x || y != y) {
			throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
		}
		let tmp4;
		if(_this8 != null && _this8.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this13 = _this8.zpp_inner;
		if(_this13._validate != null) {
			_this13._validate();
		}
		if(_this8.zpp_inner.x == x) {
			if(_this8 != null && _this8.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = _this8.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			tmp4 = _this8.zpp_inner.y == y;
		} else {
			tmp4 = false;
		}
		if(!tmp4) {
			_this8.zpp_inner.x = x;
			_this8.zpp_inner.y = y;
			let _this = _this8.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		let ret = _this8;
		if(min.zpp_inner.weak) {
			if(min != null && min.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = min.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(min.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = min.zpp_inner;
			min.zpp_inner.outer = null;
			min.zpp_inner = null;
			let o = min;
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
		return this.zpp_inner.getmin();
	}
	get_max() {
		return this.zpp_inner.getmax();
	}
	set_max(max) {
		if(max != null && max.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner._immutable) {
			throw haxe_Exception.thrown("Error: AABB is immutable");
		}
		if(max == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null to AABB::" + "max");
		}
		let tmp;
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let tmp1 = this.zpp_inner.minx;
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		if(tmp1 == this.zpp_inner.minx) {
			let _this = this.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let tmp1 = this.zpp_inner.miny;
			let _this1 = this.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			tmp = tmp1 != this.zpp_inner.miny;
		} else {
			tmp = true;
		}
		if(tmp) {
			throw haxe_Exception.thrown("Error: AABB::" + "max" + " components cannot be NaN");
		}
		if(max != null && max.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = max.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let tmp2 = max.zpp_inner.x;
		let _this3 = this.zpp_inner.getmin();
		if(_this3 != null && _this3.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = _this3.zpp_inner;
		if(_this4._validate != null) {
			_this4._validate();
		}
		if(tmp2 < _this3.zpp_inner.x) {
			throw haxe_Exception.thrown("Error: Assignment would cause negative width");
		}
		if(max != null && max.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this5 = max.zpp_inner;
		if(_this5._validate != null) {
			_this5._validate();
		}
		let tmp3 = max.zpp_inner.y;
		let _this6 = this.zpp_inner.getmin();
		if(_this6 != null && _this6.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this7 = _this6.zpp_inner;
		if(_this7._validate != null) {
			_this7._validate();
		}
		if(tmp3 < _this6.zpp_inner.y) {
			throw haxe_Exception.thrown("Error: Assignment would cause negative height");
		}
		let _this8 = this.zpp_inner.getmax();
		if(_this8 != null && _this8.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(max != null && max.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this9 = _this8.zpp_inner;
		if(_this9._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this9._isimmutable != null) {
			_this9._isimmutable();
		}
		if(max == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
		}
		if(max != null && max.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this10 = max.zpp_inner;
		if(_this10._validate != null) {
			_this10._validate();
		}
		let x = max.zpp_inner.x;
		if(max != null && max.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this11 = max.zpp_inner;
		if(_this11._validate != null) {
			_this11._validate();
		}
		let y = max.zpp_inner.y;
		if(_this8 != null && _this8.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this12 = _this8.zpp_inner;
		if(_this12._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this12._isimmutable != null) {
			_this12._isimmutable();
		}
		if(x != x || y != y) {
			throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
		}
		let tmp4;
		if(_this8 != null && _this8.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this13 = _this8.zpp_inner;
		if(_this13._validate != null) {
			_this13._validate();
		}
		if(_this8.zpp_inner.x == x) {
			if(_this8 != null && _this8.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = _this8.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			tmp4 = _this8.zpp_inner.y == y;
		} else {
			tmp4 = false;
		}
		if(!tmp4) {
			_this8.zpp_inner.x = x;
			_this8.zpp_inner.y = y;
			let _this = _this8.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		let ret = _this8;
		if(max.zpp_inner.weak) {
			if(max != null && max.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = max.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(max.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = max.zpp_inner;
			max.zpp_inner.outer = null;
			max.zpp_inner = null;
			let o = max;
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
		return this.zpp_inner.getmax();
	}
	get_x() {
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		return this.zpp_inner.minx;
	}
	set_x(x) {
		if(this.zpp_inner._immutable) {
			throw haxe_Exception.thrown("Error: AABB is immutable");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		if(this.zpp_inner.minx != x) {
			if(x != x) {
				throw haxe_Exception.thrown("Error: AABB::" + "x" + " cannot be NaN");
			}
			this.zpp_inner.maxx += x - this.zpp_inner.minx;
			this.zpp_inner.minx = x;
			let _this = this.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		return this.zpp_inner.minx;
	}
	get_y() {
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		return this.zpp_inner.miny;
	}
	set_y(y) {
		if(this.zpp_inner._immutable) {
			throw haxe_Exception.thrown("Error: AABB is immutable");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		if(this.zpp_inner.miny != y) {
			if(y != y) {
				throw haxe_Exception.thrown("Error: AABB::" + "y" + " cannot be NaN");
			}
			this.zpp_inner.maxy += y - this.zpp_inner.miny;
			this.zpp_inner.miny = y;
			let _this = this.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		return this.zpp_inner.miny;
	}
	get_width() {
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let _this1 = this.zpp_inner;
		return _this1.maxx - _this1.minx;
	}
	set_width(width) {
		if(this.zpp_inner._immutable) {
			throw haxe_Exception.thrown("Error: AABB is immutable");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let _this1 = this.zpp_inner;
		if(_this1.maxx - _this1.minx != width) {
			if(width != width) {
				throw haxe_Exception.thrown("Error: AABB::" + "width" + " cannot be NaN");
			}
			if(width < 0) {
				throw haxe_Exception.thrown("Error: AABB::" + "width" + " (" + width + ") must be >= 0");
			}
			let _this = this.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			this.zpp_inner.maxx = this.zpp_inner.minx + width;
			let _this1 = this.zpp_inner;
			if(_this1._invalidate != null) {
				_this1._invalidate(_this1);
			}
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let _this3 = this.zpp_inner;
		return _this3.maxx - _this3.minx;
	}
	get_height() {
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let _this1 = this.zpp_inner;
		return _this1.maxy - _this1.miny;
	}
	set_height(height) {
		if(this.zpp_inner._immutable) {
			throw haxe_Exception.thrown("Error: AABB is immutable");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let _this1 = this.zpp_inner;
		if(_this1.maxy - _this1.miny != height) {
			if(height != height) {
				throw haxe_Exception.thrown("Error: AABB::" + "height" + " cannot be NaN");
			}
			if(height < 0) {
				throw haxe_Exception.thrown("Error: AABB::" + "height" + " (" + height + ") must be >= 0");
			}
			let _this = this.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			this.zpp_inner.maxy = this.zpp_inner.miny + height;
			let _this1 = this.zpp_inner;
			if(_this1._invalidate != null) {
				_this1._invalidate(_this1);
			}
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let _this3 = this.zpp_inner;
		return _this3.maxy - _this3.miny;
	}
	toString() {
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		return this.zpp_inner.toString();
	}
}
