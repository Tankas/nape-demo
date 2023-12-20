import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZPP_Vec3 from '../../zpp_nape/geom/ZPP_Vec3.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import Vec2 from './Vec2.js';
export default class Vec3 {
	constructor(x,y,z) {
		if(z == null) {
			z = 0;
		}
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		this.zpp_pool = null;
		this.zpp_inner = null;
		this.zpp_inner = new ZPP_Vec3();
		this.zpp_inner.outer = this;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: Vec3 is immutable");
		}
		this.zpp_inner.x = x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: Vec3 is immutable");
		}
		this.zpp_inner.y = y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: Vec3 is immutable");
		}
		this.zpp_inner.z = z;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
	}
	get_x() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		return this.zpp_inner.x;
	}
	set_x(x) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: Vec3 is immutable");
		}
		this.zpp_inner.x = x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		return this.zpp_inner.x;
	}
	get_y() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		return this.zpp_inner.y;
	}
	set_y(y) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: Vec3 is immutable");
		}
		this.zpp_inner.y = y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		return this.zpp_inner.y;
	}
	get_z() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		return this.zpp_inner.z;
	}
	set_z(z) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: Vec3 is immutable");
		}
		this.zpp_inner.z = z;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		return this.zpp_inner.z;
	}
	dispose() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: This Vec3 is not disposable");
		}
		let o = this;
		o.zpp_pool = null;
		if(ZPP_PubPool.nextVec3 != null) {
			ZPP_PubPool.nextVec3.zpp_pool = o;
		} else {
			ZPP_PubPool.poolVec3 = o;
		}
		ZPP_PubPool.nextVec3 = o;
		o.zpp_disp = true;
	}
	get_length() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let tmp = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let tmp1 = tmp * this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let tmp2 = this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this3 = this.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let tmp3 = tmp1 + tmp2 * this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this4 = this.zpp_inner;
		if(_this4._validate != null) {
			_this4._validate();
		}
		let tmp4 = this.zpp_inner.z;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this5 = this.zpp_inner;
		if(_this5._validate != null) {
			_this5._validate();
		}
		return Math.sqrt(tmp3 + tmp4 * this.zpp_inner.z);
	}
	set_length(length) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(length != length) {
			throw haxe_Exception.thrown("Error: Vec3::length cannot be NaN");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let tmp = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let tmp1 = tmp * this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let tmp2 = this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this3 = this.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let tmp3 = tmp1 + tmp2 * this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this4 = this.zpp_inner;
		if(_this4._validate != null) {
			_this4._validate();
		}
		let tmp4 = this.zpp_inner.z;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this5 = this.zpp_inner;
		if(_this5._validate != null) {
			_this5._validate();
		}
		if(tmp3 + tmp4 * this.zpp_inner.z == 0) {
			throw haxe_Exception.thrown("Error: Cannot set length of a zero vector");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this6 = this.zpp_inner;
		if(_this6._validate != null) {
			_this6._validate();
		}
		let t = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this7 = this.zpp_inner;
		if(_this7._validate != null) {
			_this7._validate();
		}
		let t1 = t * this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this8 = this.zpp_inner;
		if(_this8._validate != null) {
			_this8._validate();
		}
		let t2 = this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this9 = this.zpp_inner;
		if(_this9._validate != null) {
			_this9._validate();
		}
		let t3 = t1 + t2 * this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this10 = this.zpp_inner;
		if(_this10._validate != null) {
			_this10._validate();
		}
		let t4 = this.zpp_inner.z;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this11 = this.zpp_inner;
		if(_this11._validate != null) {
			_this11._validate();
		}
		let t5 = length / Math.sqrt(t3 + t4 * this.zpp_inner.z);
		let t6 = t5;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this12 = this.zpp_inner;
		if(_this12._validate != null) {
			_this12._validate();
		}
		let x = this.zpp_inner.x * t6;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: Vec3 is immutable");
		}
		this.zpp_inner.x = x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this13 = this.zpp_inner;
		if(_this13._validate != null) {
			_this13._validate();
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this14 = this.zpp_inner;
		if(_this14._validate != null) {
			_this14._validate();
		}
		let y = this.zpp_inner.y * t6;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: Vec3 is immutable");
		}
		this.zpp_inner.y = y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this15 = this.zpp_inner;
		if(_this15._validate != null) {
			_this15._validate();
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this16 = this.zpp_inner;
		if(_this16._validate != null) {
			_this16._validate();
		}
		let z = this.zpp_inner.z * t5;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: Vec3 is immutable");
		}
		this.zpp_inner.z = z;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this17 = this.zpp_inner;
		if(_this17._validate != null) {
			_this17._validate();
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this18 = this.zpp_inner;
		if(_this18._validate != null) {
			_this18._validate();
		}
		let tmp5 = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this19 = this.zpp_inner;
		if(_this19._validate != null) {
			_this19._validate();
		}
		let tmp6 = tmp5 * this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this20 = this.zpp_inner;
		if(_this20._validate != null) {
			_this20._validate();
		}
		let tmp7 = this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this21 = this.zpp_inner;
		if(_this21._validate != null) {
			_this21._validate();
		}
		let tmp8 = tmp6 + tmp7 * this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this22 = this.zpp_inner;
		if(_this22._validate != null) {
			_this22._validate();
		}
		let tmp9 = this.zpp_inner.z;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this23 = this.zpp_inner;
		if(_this23._validate != null) {
			_this23._validate();
		}
		return Math.sqrt(tmp8 + tmp9 * this.zpp_inner.z);
	}
	lsq() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let tmp = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let tmp1 = tmp * this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let tmp2 = this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this3 = this.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let tmp3 = tmp1 + tmp2 * this.zpp_inner.y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this4 = this.zpp_inner;
		if(_this4._validate != null) {
			_this4._validate();
		}
		let tmp4 = this.zpp_inner.z;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this5 = this.zpp_inner;
		if(_this5._validate != null) {
			_this5._validate();
		}
		return tmp3 + tmp4 * this.zpp_inner.z;
	}
	set(vector) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(vector == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec3");
		}
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this = vector.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let tmp = vector.zpp_inner.x;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this1 = vector.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let tmp1 = vector.zpp_inner.y;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this2 = vector.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		return this.setxyz(tmp,tmp1,vector.zpp_inner.z);
	}
	setxyz(x,y,z) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: Vec3 is immutable");
		}
		this.zpp_inner.x = x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: Vec3 is immutable");
		}
		this.zpp_inner.y = y;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: Vec3 is immutable");
		}
		this.zpp_inner.z = z;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		return this;
	}
	xy(weak) {
		if(weak == null) {
			weak = false;
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let x = this.zpp_inner.x;
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
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
	toString() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this = this.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let tmp = "{ x: " + this.zpp_inner.x + " y: ";
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this1 = this.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let tmp1 = tmp + this.zpp_inner.y + " z: ";
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this2 = this.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		return tmp1 + this.zpp_inner.z + " }";
	}
	static get(x,y,z) {
		if(z == null) {
			z = 0;
		}
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		let ret;
		if(ZPP_PubPool.poolVec3 == null) {
			ret = new Vec3();
		} else {
			ret = ZPP_PubPool.poolVec3;
			ZPP_PubPool.poolVec3 = ret.zpp_pool;
			ret.zpp_pool = null;
			ret.zpp_disp = false;
			if(ret == ZPP_PubPool.nextVec3) {
				ZPP_PubPool.nextVec3 = null;
			}
		}
		ret.setxyz(x,y,z);
		ret.zpp_inner.immutable = false;
		ret.zpp_inner._validate = null;
		return ret;
	}
}
