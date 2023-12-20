import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZPP_ShapeList from '../../zpp_nape/util/ZPP_ShapeList.js';
import ZPP_FluidProperties from '../../zpp_nape/phys/ZPP_FluidProperties.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
export default class FluidProperties {
	constructor(density,viscosity) {
		if(viscosity == null) {
			viscosity = 1;
		}
		if(density == null) {
			density = 1;
		}
		this.zpp_inner = null;
		if(ZPP_FluidProperties.zpp_pool == null) {
			this.zpp_inner = new ZPP_FluidProperties();
		} else {
			this.zpp_inner = ZPP_FluidProperties.zpp_pool;
			ZPP_FluidProperties.zpp_pool = this.zpp_inner.next;
			this.zpp_inner.next = null;
		}
		this.zpp_inner.outer = this;
		if(density != this.zpp_inner.density * 1000) {
			if(density != density) {
				throw haxe_Exception.thrown("Error: FluidProperties::" + "density" + " cannot be NaN");
			}
			this.zpp_inner.density = density / 1000;
			this.zpp_inner.invalidate();
		}
		if(viscosity != this.zpp_inner.viscosity) {
			if(viscosity != viscosity) {
				throw haxe_Exception.thrown("Error: FluidProperties::" + "viscosity" + " cannot be NaN");
			}
			if(viscosity < 0) {
				throw haxe_Exception.thrown("Error: FluidProperties::" + "viscosity" + " (" + viscosity + ") must be >= 0");
			}
			this.zpp_inner.viscosity = viscosity / 1;
			this.zpp_inner.invalidate();
		}
	}
	get_userData() {
		if(this.zpp_inner.userData == null) {
			this.zpp_inner.userData = { };
		}
		return this.zpp_inner.userData;
	}
	get_shapes() {
		if(this.zpp_inner.wrap_shapes == null) {
			this.zpp_inner.wrap_shapes = ZPP_ShapeList.get(this.zpp_inner.shapes,true);
		}
		return this.zpp_inner.wrap_shapes;
	}
	copy() {
		let ret = new FluidProperties(this.zpp_inner.density * 1000,this.zpp_inner.viscosity);
		if(this.zpp_inner.userData != null) {
			ret.zpp_inner.userData = Reflect.copy(this.zpp_inner.userData);
		}
		let gravity = this.zpp_inner.wrap_gravity;
		if(gravity == null) {
			if(ret.zpp_inner.wrap_gravity != null) {
				ret.zpp_inner.wrap_gravity.zpp_inner._inuse = false;
				let _this = ret.zpp_inner.wrap_gravity;
				if(_this != null && _this.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = _this.zpp_inner;
				if(_this1._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this1._isimmutable != null) {
					_this1._isimmutable();
				}
				if(_this.zpp_inner._inuse) {
					throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
				}
				let inner = _this.zpp_inner;
				_this.zpp_inner.outer = null;
				_this.zpp_inner = null;
				let o = _this;
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
				ret.zpp_inner.wrap_gravity = null;
			}
		} else {
			if(gravity != null && gravity.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			if(ret.zpp_inner.wrap_gravity == null) {
				ret.zpp_inner.getgravity();
			}
			let _this = ret.zpp_inner.wrap_gravity;
			if(_this != null && _this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			if(gravity != null && gravity.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = _this.zpp_inner;
			if(_this1._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this1._isimmutable != null) {
				_this1._isimmutable();
			}
			if(gravity == null) {
				throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
			}
			if(gravity != null && gravity.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = gravity.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			let x = gravity.zpp_inner.x;
			if(gravity != null && gravity.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = gravity.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			let y = gravity.zpp_inner.y;
			if(_this != null && _this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this4 = _this.zpp_inner;
			if(_this4._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this4._isimmutable != null) {
				_this4._isimmutable();
			}
			if(x != x || y != y) {
				throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
			}
			let tmp;
			if(_this != null && _this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this5 = _this.zpp_inner;
			if(_this5._validate != null) {
				_this5._validate();
			}
			if(_this.zpp_inner.x == x) {
				if(_this != null && _this.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = _this.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				tmp = _this.zpp_inner.y == y;
			} else {
				tmp = false;
			}
			if(!tmp) {
				_this.zpp_inner.x = x;
				_this.zpp_inner.y = y;
				let _this1 = _this.zpp_inner;
				if(_this1._invalidate != null) {
					_this1._invalidate(_this1);
				}
			}
			let ret1 = _this;
			if(gravity.zpp_inner.weak) {
				if(gravity != null && gravity.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = gravity.zpp_inner;
				if(_this._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this._isimmutable != null) {
					_this._isimmutable();
				}
				if(gravity.zpp_inner._inuse) {
					throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
				}
				let inner = gravity.zpp_inner;
				gravity.zpp_inner.outer = null;
				gravity.zpp_inner = null;
				let o = gravity;
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
		}
		return ret;
	}
	get_density() {
		return this.zpp_inner.density * 1000;
	}
	set_density(density) {
		if(density != this.zpp_inner.density * 1000) {
			if(density != density) {
				throw haxe_Exception.thrown("Error: FluidProperties::" + "density" + " cannot be NaN");
			}
			this.zpp_inner.density = density / 1000;
			this.zpp_inner.invalidate();
		}
		return this.zpp_inner.density * 1000;
	}
	get_viscosity() {
		return this.zpp_inner.viscosity;
	}
	set_viscosity(viscosity) {
		if(viscosity != this.zpp_inner.viscosity) {
			if(viscosity != viscosity) {
				throw haxe_Exception.thrown("Error: FluidProperties::" + "viscosity" + " cannot be NaN");
			}
			if(viscosity < 0) {
				throw haxe_Exception.thrown("Error: FluidProperties::" + "viscosity" + " (" + viscosity + ") must be >= 0");
			}
			this.zpp_inner.viscosity = viscosity / 1;
			this.zpp_inner.invalidate();
		}
		return this.zpp_inner.viscosity;
	}
	get_gravity() {
		return this.zpp_inner.wrap_gravity;
	}
	set_gravity(gravity) {
		if(gravity == null) {
			if(this.zpp_inner.wrap_gravity != null) {
				this.zpp_inner.wrap_gravity.zpp_inner._inuse = false;
				let _this = this.zpp_inner.wrap_gravity;
				if(_this != null && _this.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = _this.zpp_inner;
				if(_this1._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this1._isimmutable != null) {
					_this1._isimmutable();
				}
				if(_this.zpp_inner._inuse) {
					throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
				}
				let inner = _this.zpp_inner;
				_this.zpp_inner.outer = null;
				_this.zpp_inner = null;
				let o = _this;
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
				this.zpp_inner.wrap_gravity = null;
			}
		} else {
			if(gravity != null && gravity.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			if(this.zpp_inner.wrap_gravity == null) {
				this.zpp_inner.getgravity();
			}
			let _this = this.zpp_inner.wrap_gravity;
			if(_this != null && _this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			if(gravity != null && gravity.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = _this.zpp_inner;
			if(_this1._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this1._isimmutable != null) {
				_this1._isimmutable();
			}
			if(gravity == null) {
				throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
			}
			if(gravity != null && gravity.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = gravity.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			let x = gravity.zpp_inner.x;
			if(gravity != null && gravity.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = gravity.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			let y = gravity.zpp_inner.y;
			if(_this != null && _this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this4 = _this.zpp_inner;
			if(_this4._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this4._isimmutable != null) {
				_this4._isimmutable();
			}
			if(x != x || y != y) {
				throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
			}
			let tmp;
			if(_this != null && _this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this5 = _this.zpp_inner;
			if(_this5._validate != null) {
				_this5._validate();
			}
			if(_this.zpp_inner.x == x) {
				if(_this != null && _this.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = _this.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				tmp = _this.zpp_inner.y == y;
			} else {
				tmp = false;
			}
			if(!tmp) {
				_this.zpp_inner.x = x;
				_this.zpp_inner.y = y;
				let _this1 = _this.zpp_inner;
				if(_this1._invalidate != null) {
					_this1._invalidate(_this1);
				}
			}
			let ret = _this;
			if(gravity.zpp_inner.weak) {
				if(gravity != null && gravity.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = gravity.zpp_inner;
				if(_this._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this._isimmutable != null) {
					_this._isimmutable();
				}
				if(gravity.zpp_inner._inuse) {
					throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
				}
				let inner = gravity.zpp_inner;
				gravity.zpp_inner.outer = null;
				gravity.zpp_inner = null;
				let o = gravity;
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
		}
		return this.zpp_inner.wrap_gravity;
	}
	toString() {
		return "{ density: " + this.zpp_inner.density * 1000 + " viscosity: " + this.zpp_inner.viscosity + " gravity: " + Std.string(this.zpp_inner.wrap_gravity) + " }";
	}
}
