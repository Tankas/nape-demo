import ZPP_PubPool from '../util/ZPP_PubPool.js';
import ZNPList_ZPP_Shape from '../util/ZNPList_ZPP_Shape.js';
import ZPP_Vec2 from '../geom/ZPP_Vec2.js';
import FluidProperties from '../../nape/phys/FluidProperties.js';
import Vec2 from '../../nape/geom/Vec2.js';
export default class ZPP_FluidProperties {
	constructor() {
		this.wrap_gravity = null;
		this.gravityy = 0.0;
		this.gravityx = 0.0;
		this.density = 0.0;
		this.viscosity = 0.0;
		this.wrap_shapes = null;
		this.shapes = null;
		this.outer = null;
		this.userData = null;
		this.next = null;
		this.shapes = new ZNPList_ZPP_Shape();
		this.density = this.viscosity = 1;
		this.wrap_gravity = null;
		this.gravityx = 0;
		this.gravityy = 0;
	}
	wrapper() {
		if(this.outer == null) {
			this.outer = new FluidProperties();
			let o = this.outer.zpp_inner;
			o.outer = null;
			o.next = ZPP_FluidProperties.zpp_pool;
			ZPP_FluidProperties.zpp_pool = o;
			this.outer.zpp_inner = this;
		}
		return this.outer;
	}
	free() {
		this.outer = null;
	}
	alloc() {
	}
	feature_cons() {
		this.shapes = new ZNPList_ZPP_Shape();
	}
	addShape(shape) {
		this.shapes.add(shape);
	}
	remShape(shape) {
		this.shapes.remove(shape);
	}
	copy() {
		let ret;
		if(ZPP_FluidProperties.zpp_pool == null) {
			ret = new ZPP_FluidProperties();
		} else {
			ret = ZPP_FluidProperties.zpp_pool;
			ZPP_FluidProperties.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.viscosity = this.viscosity;
		ret.density = this.density;
		return ret;
	}
	gravity_invalidate(x) {
		this.gravityx = x.x;
		this.gravityy = x.y;
		this.invalidate();
	}
	gravity_validate() {
		this.wrap_gravity.zpp_inner.x = this.gravityx;
		this.wrap_gravity.zpp_inner.y = this.gravityy;
	}
	getgravity() {
		let x = this.gravityx;
		let y = this.gravityy;
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
		ret.zpp_inner.weak = false;
		this.wrap_gravity = ret;
		this.wrap_gravity.zpp_inner._inuse = true;
		this.wrap_gravity.zpp_inner._invalidate = $bind(this,this.gravity_invalidate);
		this.wrap_gravity.zpp_inner._validate = $bind(this,this.gravity_validate);
	}
	invalidate() {
		let cx_ite = this.shapes.head;
		while(cx_ite != null) {
			let shape = cx_ite.elt;
			shape.invalidate_fluidprops();
			cx_ite = cx_ite.next;
		}
	}
}
ZPP_FluidProperties.zpp_pool = null;
