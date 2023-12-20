import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import Polygon from './Polygon.js';
import FluidProperties from '../phys/FluidProperties.js';
export default class LiquidShape extends Polygon {
	constructor(localVerts,material,filter) {
		super(localVerts,material,filter);
		this.zpp_inner.immutable_midstep("Shape::fluidEnabled");
		this.zpp_inner.fluidEnabled = true;
		if(this.zpp_inner.fluidProperties == null) {
			let fluidProperties = new FluidProperties();
			if(fluidProperties == null) {
				throw haxe_Exception.thrown("Error: Cannot assign null as Shape fluidProperties, disable fluids by setting fluidEnabled to false");
			}
			this.zpp_inner.setFluid(fluidProperties.zpp_inner);
			this.zpp_inner.immutable_midstep("Shape::fluidProperties");
			if(this.zpp_inner.fluidProperties == null) {
				this.zpp_inner.setFluid(new FluidProperties().zpp_inner);
			}
			this.zpp_inner.fluidProperties.wrapper();
		}
		this.zpp_inner.wake();
	}
	get_density() {
		this.zpp_inner.immutable_midstep("Shape::fluidProperties");
		if(this.zpp_inner.fluidProperties == null) {
			this.zpp_inner.setFluid(new FluidProperties().zpp_inner);
		}
		let fp = this.zpp_inner.fluidProperties.wrapper();
		return fp.zpp_inner.density * 1000;
	}
	set_density(value) {
		this.zpp_inner.immutable_midstep("Shape::fluidProperties");
		if(this.zpp_inner.fluidProperties == null) {
			this.zpp_inner.setFluid(new FluidProperties().zpp_inner);
		}
		let fp = this.zpp_inner.fluidProperties.wrapper();
		if(value != fp.zpp_inner.density * 1000) {
			if(value != value) {
				throw haxe_Exception.thrown("Error: FluidProperties::" + "density" + " cannot be NaN");
			}
			fp.zpp_inner.density = value / 1000;
			fp.zpp_inner.invalidate();
		}
		return value;
	}
	get_viscosity() {
		this.zpp_inner.immutable_midstep("Shape::fluidProperties");
		if(this.zpp_inner.fluidProperties == null) {
			this.zpp_inner.setFluid(new FluidProperties().zpp_inner);
		}
		let fp = this.zpp_inner.fluidProperties.wrapper();
		return fp.zpp_inner.viscosity;
	}
	set_viscosity(value) {
		this.zpp_inner.immutable_midstep("Shape::fluidProperties");
		if(this.zpp_inner.fluidProperties == null) {
			this.zpp_inner.setFluid(new FluidProperties().zpp_inner);
		}
		let fp = this.zpp_inner.fluidProperties.wrapper();
		if(value != fp.zpp_inner.viscosity) {
			if(value != value) {
				throw haxe_Exception.thrown("Error: FluidProperties::" + "viscosity" + " cannot be NaN");
			}
			if(value < 0) {
				throw haxe_Exception.thrown("Error: FluidProperties::" + "viscosity" + " (" + value + ") must be >= 0");
			}
			fp.zpp_inner.viscosity = value / 1;
			fp.zpp_inner.invalidate();
		}
		return value;
	}
	get_gravity() {
		this.zpp_inner.immutable_midstep("Shape::fluidProperties");
		if(this.zpp_inner.fluidProperties == null) {
			this.zpp_inner.setFluid(new FluidProperties().zpp_inner);
		}
		let fp = this.zpp_inner.fluidProperties.wrapper();
		return fp.zpp_inner.wrap_gravity;
	}
	set_gravity(value) {
		this.zpp_inner.immutable_midstep("Shape::fluidProperties");
		if(this.zpp_inner.fluidProperties == null) {
			this.zpp_inner.setFluid(new FluidProperties().zpp_inner);
		}
		let fp = this.zpp_inner.fluidProperties.wrapper();
		if(value == null) {
			if(fp.zpp_inner.wrap_gravity != null) {
				fp.zpp_inner.wrap_gravity.zpp_inner._inuse = false;
				let _this = fp.zpp_inner.wrap_gravity;
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
				fp.zpp_inner.wrap_gravity = null;
			}
		} else {
			if(value != null && value.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			if(fp.zpp_inner.wrap_gravity == null) {
				fp.zpp_inner.getgravity();
			}
			let _this = fp.zpp_inner.wrap_gravity;
			if(_this != null && _this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			if(value != null && value.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = _this.zpp_inner;
			if(_this1._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this1._isimmutable != null) {
				_this1._isimmutable();
			}
			if(value == null) {
				throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
			}
			if(value != null && value.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = value.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			let x = value.zpp_inner.x;
			if(value != null && value.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = value.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			let y = value.zpp_inner.y;
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
			if(value.zpp_inner.weak) {
				if(value != null && value.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = value.zpp_inner;
				if(_this._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this._isimmutable != null) {
					_this._isimmutable();
				}
				if(value.zpp_inner._inuse) {
					throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
				}
				let inner = value.zpp_inner;
				value.zpp_inner.outer = null;
				value.zpp_inner = null;
				let o = value;
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
		return value;
	}
	addCbtype(cbtype) {
		if(this.zpp_inner_i.wrap_cbTypes == null) {
			this.zpp_inner_i.setupcbTypes();
		}
		let _this = this.zpp_inner_i.wrap_cbTypes;
		if(_this.zpp_inner.reverse_flag) {
			_this.push(cbtype);
		} else {
			_this.unshift(cbtype);
		}
	}
}
