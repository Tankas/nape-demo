import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZPP_Shape from '../../zpp_nape/shape/ZPP_Shape.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import ZPP_Geom from '../../zpp_nape/geom/ZPP_Geom.js';
import ZPP_Collide from '../../zpp_nape/geom/ZPP_Collide.js';
import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
import FluidProperties from '../phys/FluidProperties.js';
import Interactor from '../phys/Interactor.js';
import Vec2 from '../geom/Vec2.js';
import Config from '../Config.js';
export default class Shape extends Interactor {
	constructor() {
		if(Interactor._hx_skip_constructor) {
			super();
			return;
		}
		Interactor._hx_skip_constructor = true;
		super();
		Interactor._hx_skip_constructor = false;
		this._hx_constructor();
	}
	_hx_constructor() {
		this.zpp_inner = null;
		Interactor.zpp_internalAlloc = true;
		super._hx_constructor();
		Interactor.zpp_internalAlloc = false;
		if(!Shape.zpp_internalAlloc) {
			throw haxe_Exception.thrown("Error: Shape cannot be instantiated derp!");
		}
	}
	get_type() {
		return ZPP_Shape.types[this.zpp_inner.type];
	}
	isCircle() {
		return this.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE;
	}
	isPolygon() {
		return this.zpp_inner.type == ZPP_Flags.id_ShapeType_POLYGON;
	}
	get_body() {
		if(this.zpp_inner.body != null) {
			return this.zpp_inner.body.outer;
		} else {
			return null;
		}
	}
	set_body(body) {
		this.zpp_inner.immutable_midstep("Shape::body");
		if((this.zpp_inner.body != null ? this.zpp_inner.body.outer : null) != body) {
			if(this.zpp_inner.body != null) {
				(this.zpp_inner.body != null ? this.zpp_inner.body.outer : null).zpp_inner.wrap_shapes.remove(this);
			}
			if(body != null) {
				let _this = body.zpp_inner.wrap_shapes;
				if(_this.zpp_inner.reverse_flag) {
					_this.push(this);
				} else {
					_this.unshift(this);
				}
			}
		}
		if(this.zpp_inner.body != null) {
			return this.zpp_inner.body.outer;
		} else {
			return null;
		}
	}
	get_castCircle() {
		if(this.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE) {
			return this.zpp_inner.circle.outer_zn;
		} else {
			return null;
		}
	}
	get_castPolygon() {
		if(this.zpp_inner.type == ZPP_Flags.id_ShapeType_POLYGON) {
			return this.zpp_inner.polygon.outer_zn;
		} else {
			return null;
		}
	}
	get_worldCOM() {
		if(this.zpp_inner.wrap_worldCOM == null) {
			let x = this.zpp_inner.worldCOMx;
			let y = this.zpp_inner.worldCOMy;
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
			this.zpp_inner.wrap_worldCOM = ret;
			this.zpp_inner.wrap_worldCOM.zpp_inner._inuse = true;
			this.zpp_inner.wrap_worldCOM.zpp_inner._immutable = true;
			this.zpp_inner.wrap_worldCOM.zpp_inner._validate = ($_=this.zpp_inner,$bind($_,$_.getworldCOM));
		}
		return this.zpp_inner.wrap_worldCOM;
	}
	get_localCOM() {
		if(this.zpp_inner.wrap_localCOM == null) {
			if(this.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE) {
				this.zpp_inner.circle.setupLocalCOM();
			} else {
				this.zpp_inner.polygon.setupLocalCOM();
			}
		}
		return this.zpp_inner.wrap_localCOM;
	}
	set_localCOM(localCOM) {
		this.zpp_inner.immutable_midstep("Body::localCOM");
		if(localCOM != null && localCOM.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.body != null && this.zpp_inner.body.space != null && this.zpp_inner.body.type == ZPP_Flags.id_BodyType_STATIC) {
			throw haxe_Exception.thrown("Error: Cannot modify Shape belonging to a static Object once inside a Space");
		}
		if(localCOM == null) {
			throw haxe_Exception.thrown("Error: Shape::localCOM cannot be null");
		}
		if(this.zpp_inner.wrap_localCOM == null) {
			if(this.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE) {
				this.zpp_inner.circle.setupLocalCOM();
			} else {
				this.zpp_inner.polygon.setupLocalCOM();
			}
		}
		let _this = this.zpp_inner.wrap_localCOM;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(localCOM != null && localCOM.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = _this.zpp_inner;
		if(_this1._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this1._isimmutable != null) {
			_this1._isimmutable();
		}
		if(localCOM == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
		}
		if(localCOM != null && localCOM.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = localCOM.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let x = localCOM.zpp_inner.x;
		if(localCOM != null && localCOM.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = localCOM.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let y = localCOM.zpp_inner.y;
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
		if(localCOM.zpp_inner.weak) {
			if(localCOM != null && localCOM.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = localCOM.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(localCOM.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = localCOM.zpp_inner;
			localCOM.zpp_inner.outer = null;
			localCOM.zpp_inner = null;
			let o = localCOM;
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
		if(this.zpp_inner.wrap_localCOM == null) {
			if(this.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE) {
				this.zpp_inner.circle.setupLocalCOM();
			} else {
				this.zpp_inner.polygon.setupLocalCOM();
			}
		}
		return this.zpp_inner.wrap_localCOM;
	}
	get_area() {
		this.zpp_inner.validate_area_inertia();
		return this.zpp_inner.area;
	}
	get_inertia() {
		this.zpp_inner.validate_area_inertia();
		return this.zpp_inner.inertia;
	}
	get_angDrag() {
		this.zpp_inner.validate_angDrag();
		return this.zpp_inner.angDrag;
	}
	get_material() {
		return this.zpp_inner.material.wrapper();
	}
	set_material(material) {
		this.zpp_inner.immutable_midstep("Shape::material");
		if(material == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null as Shape material");
		}
		this.zpp_inner.setMaterial(material.zpp_inner);
		return this.zpp_inner.material.wrapper();
	}
	get_filter() {
		return this.zpp_inner.filter.wrapper();
	}
	set_filter(filter) {
		this.zpp_inner.immutable_midstep("Shape::filter");
		if(filter == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null as Shape filter");
		}
		this.zpp_inner.setFilter(filter.zpp_inner);
		return this.zpp_inner.filter.wrapper();
	}
	get_fluidProperties() {
		this.zpp_inner.immutable_midstep("Shape::fluidProperties");
		if(this.zpp_inner.fluidProperties == null) {
			this.zpp_inner.setFluid(new FluidProperties().zpp_inner);
		}
		return this.zpp_inner.fluidProperties.wrapper();
	}
	set_fluidProperties(fluidProperties) {
		if(fluidProperties == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null as Shape fluidProperties, disable fluids by setting fluidEnabled to false");
		}
		this.zpp_inner.setFluid(fluidProperties.zpp_inner);
		this.zpp_inner.immutable_midstep("Shape::fluidProperties");
		if(this.zpp_inner.fluidProperties == null) {
			this.zpp_inner.setFluid(new FluidProperties().zpp_inner);
		}
		return this.zpp_inner.fluidProperties.wrapper();
	}
	get_fluidEnabled() {
		return this.zpp_inner.fluidEnabled;
	}
	set_fluidEnabled(fluidEnabled) {
		this.zpp_inner.immutable_midstep("Shape::fluidEnabled");
		this.zpp_inner.fluidEnabled = fluidEnabled;
		if(fluidEnabled && this.zpp_inner.fluidProperties == null) {
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
		return this.zpp_inner.fluidEnabled;
	}
	get_sensorEnabled() {
		return this.zpp_inner.sensorEnabled;
	}
	set_sensorEnabled(sensorEnabled) {
		this.zpp_inner.immutable_midstep("Shape::sensorEnabled");
		this.zpp_inner.sensorEnabled = sensorEnabled;
		this.zpp_inner.wake();
		return this.zpp_inner.sensorEnabled;
	}
	get_bounds() {
		return this.zpp_inner.aabb.wrapper();
	}
	translate(translation) {
		this.zpp_inner.immutable_midstep("Shape::translate()");
		if(translation != null && translation.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.body != null && this.zpp_inner.body.space != null && this.zpp_inner.body.type == ZPP_Flags.id_BodyType_STATIC) {
			throw haxe_Exception.thrown("Error: Cannot modify Shape belonging to a static Object once inside a Space");
		}
		if(translation == null) {
			throw haxe_Exception.thrown("Error: Cannot displace Shape by null Vec2");
		}
		if(translation.lsq() > 0) {
			if(this.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE) {
				let tmp = this.zpp_inner.circle;
				if(translation != null && translation.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = translation.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				let tmp1 = translation.zpp_inner.x;
				if(translation != null && translation.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = translation.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				tmp.__translate(tmp1,translation.zpp_inner.y);
			} else {
				let tmp = this.zpp_inner.polygon;
				if(translation != null && translation.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = translation.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				let tmp1 = translation.zpp_inner.x;
				if(translation != null && translation.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = translation.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				tmp.__translate(tmp1,translation.zpp_inner.y);
			}
		}
		if(translation.zpp_inner.weak) {
			if(translation != null && translation.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = translation.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(translation.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = translation.zpp_inner;
			translation.zpp_inner.outer = null;
			translation.zpp_inner = null;
			let o = translation;
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
	scale(scalex,scaley) {
		this.zpp_inner.immutable_midstep("Shape::scale()");
		if(this.zpp_inner.body != null && this.zpp_inner.body.space != null && this.zpp_inner.body.type == ZPP_Flags.id_BodyType_STATIC) {
			throw haxe_Exception.thrown("Error: Cannot modify Shape belonging to a static Object once inside a Space");
		}
		if(scalex != scalex || scaley != scaley) {
			throw haxe_Exception.thrown("Error: Cannot scale Shape by NaN");
		}
		if(scalex == 0 || scaley == 0) {
			throw haxe_Exception.thrown("Error: Cannot Scale shape by a factor of 0");
		}
		if(this.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE) {
			let d = scalex * scalex - scaley * scaley;
			if(d * d < Config.epsilon * Config.epsilon) {
				this.zpp_inner.circle.__scale(scalex,scaley);
			} else {
				throw haxe_Exception.thrown("Error: Cannot perform a non equal scaling on a Circle");
			}
		} else {
			this.zpp_inner.polygon.__scale(scalex,scaley);
		}
		return this;
	}
	rotate(angle) {
		this.zpp_inner.immutable_midstep("Shape::rotate()");
		if(this.zpp_inner.body != null && this.zpp_inner.body.space != null && this.zpp_inner.body.type == ZPP_Flags.id_BodyType_STATIC) {
			throw haxe_Exception.thrown("Error: Cannot modify Shape belonging to a static Object once inside a Space");
		}
		if(angle != angle) {
			throw haxe_Exception.thrown("Error: Cannot rotate Shape by NaN");
		}
		let dr = angle % (2 * Math.PI);
		if(dr != 0.0) {
			let cos = Math.cos(angle);
			let sin = Math.sin(angle);
			if(this.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE) {
				this.zpp_inner.circle.__rotate(sin,cos);
			} else {
				this.zpp_inner.polygon.__rotate(sin,cos);
			}
		}
		return this;
	}
	transform(matrix) {
		this.zpp_inner.immutable_midstep("Shape::transform()");
		if(this.zpp_inner.body != null && this.zpp_inner.body.space != null && this.zpp_inner.body.type == ZPP_Flags.id_BodyType_STATIC) {
			throw haxe_Exception.thrown("Error: Cannot modify Shape belonging to a static Object once inside a Space");
		}
		if(matrix == null) {
			throw haxe_Exception.thrown("Error: Cannot transform Shape by null matrix");
		}
		if(matrix.singular()) {
			throw haxe_Exception.thrown("Error: Cannot transform Shape by a singular matrix");
		}
		if(this.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE) {
			if(matrix.equiorthogonal()) {
				this.zpp_inner.circle.__transform(matrix);
			} else {
				throw haxe_Exception.thrown("Error: Cannot transform Circle by a non equiorthogonal matrix");
			}
		} else {
			this.zpp_inner.polygon.__transform(matrix);
		}
		return this;
	}
	contains(point) {
		if(point != null && point.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(point == null) {
			throw haxe_Exception.thrown("Cannot check null point for containment");
		}
		if((this.zpp_inner.body != null ? this.zpp_inner.body.outer : null) == null) {
			throw haxe_Exception.thrown("Error: Shape is not well defined without a Body");
		}
		ZPP_Geom.validateShape(this.zpp_inner);
		let _this = point.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let ret = ZPP_Collide.shapeContains(this.zpp_inner,point.zpp_inner);
		if(point.zpp_inner.weak) {
			if(point != null && point.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = point.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(point.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = point.zpp_inner;
			point.zpp_inner.outer = null;
			point.zpp_inner = null;
			let o = point;
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
	copy() {
		return this.zpp_inner.copy();
	}
	toString() {
		let ret = this.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE ? "Circle" : "Polygon";
		return ret + "#" + this.zpp_inner_i.id;
	}
}
Shape.zpp_internalAlloc = false;
