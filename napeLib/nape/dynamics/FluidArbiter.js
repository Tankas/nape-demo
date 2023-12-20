import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import ZPP_Arbiter from '../../zpp_nape/dynamics/ZPP_Arbiter.js';
import Vec3 from '../geom/Vec3.js';
import Arbiter from './Arbiter.js';
export default class FluidArbiter extends Arbiter {
	constructor() {
		if(!ZPP_Arbiter.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate FluidArbiter derp!");
		}
		super();
	}
	get_position() {
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		if(this.zpp_inner.fluidarb.wrap_position == null) {
			this.zpp_inner.fluidarb.getposition();
		}
		return this.zpp_inner.fluidarb.wrap_position;
	}
	set_position(position) {
		if(!this.zpp_inner.fluidarb.mutable) {
			throw haxe_Exception.thrown("Error: Arbiter is mutable only within a pre-handler");
		}
		if(position == null) {
			throw haxe_Exception.thrown("Error: FluidArbiter::position cannot be null");
		}
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		if(this.zpp_inner.fluidarb.wrap_position == null) {
			this.zpp_inner.fluidarb.getposition();
		}
		let _this = this.zpp_inner.fluidarb.wrap_position;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(position != null && position.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = _this.zpp_inner;
		if(_this1._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this1._isimmutable != null) {
			_this1._isimmutable();
		}
		if(position == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
		}
		if(position != null && position.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = position.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let x = position.zpp_inner.x;
		if(position != null && position.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = position.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let y = position.zpp_inner.y;
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
		if(position.zpp_inner.weak) {
			if(position != null && position.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = position.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(position.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = position.zpp_inner;
			position.zpp_inner.outer = null;
			position.zpp_inner = null;
			let o = position;
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
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		if(this.zpp_inner.fluidarb.wrap_position == null) {
			this.zpp_inner.fluidarb.getposition();
		}
		return this.zpp_inner.fluidarb.wrap_position;
	}
	get_overlap() {
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		return this.zpp_inner.fluidarb.overlap;
	}
	set_overlap(overlap) {
		if(!this.zpp_inner.fluidarb.mutable) {
			throw haxe_Exception.thrown("Error: Arbiter is mutable only within a pre-handler");
		}
		if(overlap != overlap) {
			throw haxe_Exception.thrown("Error: FluidArbiter::overlap cannot be NaN");
		}
		if(overlap <= 0 || overlap == Infinity) {
			throw haxe_Exception.thrown("Error: FluidArbiter::overlap must be strictly positive and non infinite");
		}
		this.zpp_inner.fluidarb.overlap = overlap;
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		return this.zpp_inner.fluidarb.overlap;
	}
	buoyancyImpulse(body) {
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		let tmp;
		let tmp1;
		if(body != null) {
			if(!this.zpp_inner.active) {
				throw haxe_Exception.thrown("Error: Arbiter not currently in use");
			}
			tmp1 = body != (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.b2.outer : this.zpp_inner.b1.outer);
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			if(!this.zpp_inner.active) {
				throw haxe_Exception.thrown("Error: Arbiter not currently in use");
			}
			tmp = body != (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.b1.outer : this.zpp_inner.b2.outer);
		} else {
			tmp = false;
		}
		if(tmp) {
			throw haxe_Exception.thrown("Error: Arbiter does not relate to body");
		}
		let farb = this.zpp_inner.fluidarb;
		if(body == null) {
			return Vec3.get(farb.buoyx,farb.buoyy,0);
		} else if(body.zpp_inner == this.zpp_inner.b2) {
			return Vec3.get(farb.buoyx,farb.buoyy,farb.buoyy * farb.r2x - farb.buoyx * farb.r2y);
		} else {
			return Vec3.get(-farb.buoyx,-farb.buoyy,-(farb.buoyy * farb.r1x - farb.buoyx * farb.r1y));
		}
	}
	dragImpulse(body) {
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		let tmp;
		let tmp1;
		if(body != null) {
			if(!this.zpp_inner.active) {
				throw haxe_Exception.thrown("Error: Arbiter not currently in use");
			}
			tmp1 = body != (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.b2.outer : this.zpp_inner.b1.outer);
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			if(!this.zpp_inner.active) {
				throw haxe_Exception.thrown("Error: Arbiter not currently in use");
			}
			tmp = body != (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.b1.outer : this.zpp_inner.b2.outer);
		} else {
			tmp = false;
		}
		if(tmp) {
			throw haxe_Exception.thrown("Error: Arbiter does not relate to body");
		}
		let farb = this.zpp_inner.fluidarb;
		let scale = body == null || body.zpp_inner == this.zpp_inner.b2 ? 1 : -1;
		return Vec3.get(farb.dampx * scale,farb.dampy * scale,farb.adamp * scale);
	}
	totalImpulse(body,freshOnly) {
		if(freshOnly == null) {
			freshOnly = false;
		}
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		let tmp;
		let tmp1;
		if(body != null) {
			if(!this.zpp_inner.active) {
				throw haxe_Exception.thrown("Error: Arbiter not currently in use");
			}
			tmp1 = body != (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.b2.outer : this.zpp_inner.b1.outer);
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			if(!this.zpp_inner.active) {
				throw haxe_Exception.thrown("Error: Arbiter not currently in use");
			}
			tmp = body != (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.b1.outer : this.zpp_inner.b2.outer);
		} else {
			tmp = false;
		}
		if(tmp) {
			throw haxe_Exception.thrown("Error: Arbiter does not relate to body");
		}
		let tmp2 = this.buoyancyImpulse(body);
		let ret = this.dragImpulse(body);
		if(ret != null && ret.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this = ret.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let x = ret.zpp_inner.x;
		if(tmp2 != null && tmp2.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this1 = tmp2.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let x1 = x + tmp2.zpp_inner.x;
		if(ret != null && ret.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(ret.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: Vec3 is immutable");
		}
		ret.zpp_inner.x = x1;
		if(ret != null && ret.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this2 = ret.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		if(ret != null && ret.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this3 = ret.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let y = ret.zpp_inner.y;
		if(tmp2 != null && tmp2.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this4 = tmp2.zpp_inner;
		if(_this4._validate != null) {
			_this4._validate();
		}
		let y1 = y + tmp2.zpp_inner.y;
		if(ret != null && ret.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(ret.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: Vec3 is immutable");
		}
		ret.zpp_inner.y = y1;
		if(ret != null && ret.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this5 = ret.zpp_inner;
		if(_this5._validate != null) {
			_this5._validate();
		}
		if(ret != null && ret.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this6 = ret.zpp_inner;
		if(_this6._validate != null) {
			_this6._validate();
		}
		let z = ret.zpp_inner.z;
		if(tmp2 != null && tmp2.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this7 = tmp2.zpp_inner;
		if(_this7._validate != null) {
			_this7._validate();
		}
		let z1 = z + tmp2.zpp_inner.z;
		if(ret != null && ret.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		if(ret.zpp_inner.immutable) {
			throw haxe_Exception.thrown("Error: Vec3 is immutable");
		}
		ret.zpp_inner.z = z1;
		if(ret != null && ret.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
		}
		let _this8 = ret.zpp_inner;
		if(_this8._validate != null) {
			_this8._validate();
		}
		tmp2.dispose();
		return ret;
	}
}
