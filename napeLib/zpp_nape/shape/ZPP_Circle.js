import ZPP_PubPool from '../util/ZPP_PubPool.js';
import ZPP_Shape from './ZPP_Shape.js';
import ZPP_Interactor from '../phys/ZPP_Interactor.js';
import ZPP_Vec2 from '../geom/ZPP_Vec2.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import Circle from '../../nape/shape/Circle.js';
import Vec2 from '../../nape/geom/Vec2.js';
import Config from '../../nape/Config.js';
export default class ZPP_Circle extends ZPP_Shape {
	constructor() {
		ZPP_Interactor._hx_skip_constructor = true;
		super();
		ZPP_Interactor._hx_skip_constructor = false;
		this._hx_constructor();
	}
	_hx_constructor() {
		this.radius = 0.0;
		this.outer_zn = null;
		super._hx_constructor(ZPP_Flags.id_ShapeType_CIRCLE);
		this.circle = this;
		this.zip_localCOM = false;
	}
	__clear() {
	}
	invalidate_radius() {
		this.invalidate_area_inertia();
		this.invalidate_angDrag();
		this.zip_aabb = true;
		if(this.body != null) {
			this.body.zip_aabb = true;
		}
		if(this.body != null) {
			this.body.wake();
		}
	}
	localCOM_validate() {
		this.wrap_localCOM.zpp_inner.x = this.localCOMx;
		this.wrap_localCOM.zpp_inner.y = this.localCOMy;
	}
	localCOM_invalidate(x) {
		this.localCOMx = x.x;
		this.localCOMy = x.y;
		this.invalidate_localCOM();
		if(this.body != null) {
			this.body.wake();
		}
	}
	localCOM_immutable() {
		if(this.body != null && this.body.type == ZPP_Flags.id_BodyType_STATIC && this.body.space != null) {
			throw haxe_Exception.thrown("Error: Cannot modify localCOM of Circle added to a static Body whilst within a Space");
		}
	}
	setupLocalCOM() {
		let me = this;
		let x = this.localCOMx;
		let y = this.localCOMy;
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
		this.wrap_localCOM = ret;
		this.wrap_localCOM.zpp_inner._inuse = true;
		this.wrap_localCOM.zpp_inner._validate = $bind(this,this.localCOM_validate);
		this.wrap_localCOM.zpp_inner._invalidate = $bind(this,this.localCOM_invalidate);
		this.wrap_localCOM.zpp_inner._isimmutable = $bind(this,this.localCOM_immutable);
	}
	__validate_aabb() {
		if(this.zip_worldCOM) {
			if(this.body != null) {
				this.zip_worldCOM = false;
				if(this.zip_localCOM) {
					this.zip_localCOM = false;
					if(this.type == ZPP_Flags.id_ShapeType_POLYGON) {
						let _this = this.polygon;
						if(_this.lverts.next == null) {
							throw haxe_Exception.thrown("Error: An empty polygon has no meaningful localCOM");
						}
						if(_this.lverts.next.next == null) {
							_this.localCOMx = _this.lverts.next.x;
							_this.localCOMy = _this.lverts.next.y;
						} else if(_this.lverts.next.next.next == null) {
							_this.localCOMx = _this.lverts.next.x;
							_this.localCOMy = _this.lverts.next.y;
							let t = 1.0;
							_this.localCOMx += _this.lverts.next.next.x * t;
							_this.localCOMy += _this.lverts.next.next.y * t;
							let t1 = 0.5;
							_this.localCOMx *= t1;
							_this.localCOMy *= t1;
						} else {
							_this.localCOMx = 0;
							_this.localCOMy = 0;
							let area = 0.0;
							let cx_ite = _this.lverts.next;
							let u = cx_ite;
							cx_ite = cx_ite.next;
							let v = cx_ite;
							cx_ite = cx_ite.next;
							while(cx_ite != null) {
								let w = cx_ite;
								area += v.x * (w.y - u.y);
								let cf = w.y * v.x - w.x * v.y;
								_this.localCOMx += (v.x + w.x) * cf;
								_this.localCOMy += (v.y + w.y) * cf;
								u = v;
								v = w;
								cx_ite = cx_ite.next;
							}
							cx_ite = _this.lverts.next;
							let w = cx_ite;
							area += v.x * (w.y - u.y);
							let cf = w.y * v.x - w.x * v.y;
							_this.localCOMx += (v.x + w.x) * cf;
							_this.localCOMy += (v.y + w.y) * cf;
							u = v;
							v = w;
							cx_ite = cx_ite.next;
							let w1 = cx_ite;
							area += v.x * (w1.y - u.y);
							let cf1 = w1.y * v.x - w1.x * v.y;
							_this.localCOMx += (v.x + w1.x) * cf1;
							_this.localCOMy += (v.y + w1.y) * cf1;
							area = 1 / (3 * area);
							let t = area;
							_this.localCOMx *= t;
							_this.localCOMy *= t;
						}
					}
					if(this.wrap_localCOM != null) {
						this.wrap_localCOM.zpp_inner.x = this.localCOMx;
						this.wrap_localCOM.zpp_inner.y = this.localCOMy;
					}
				}
				let _this = this.body;
				if(_this.zip_axis) {
					_this.zip_axis = false;
					_this.axisx = Math.sin(_this.rot);
					_this.axisy = Math.cos(_this.rot);
				}
				this.worldCOMx = this.body.posx + (this.body.axisy * this.localCOMx - this.body.axisx * this.localCOMy);
				this.worldCOMy = this.body.posy + (this.localCOMx * this.body.axisx + this.localCOMy * this.body.axisy);
			}
		}
		let rx = this.radius;
		let ry = this.radius;
		this.aabb.minx = this.worldCOMx - rx;
		this.aabb.miny = this.worldCOMy - ry;
		this.aabb.maxx = this.worldCOMx + rx;
		this.aabb.maxy = this.worldCOMy + ry;
	}
	_force_validate_aabb() {
		this.worldCOMx = this.body.posx + (this.body.axisy * this.localCOMx - this.body.axisx * this.localCOMy);
		this.worldCOMy = this.body.posy + (this.localCOMx * this.body.axisx + this.localCOMy * this.body.axisy);
		this.aabb.minx = this.worldCOMx - this.radius;
		this.aabb.miny = this.worldCOMy - this.radius;
		this.aabb.maxx = this.worldCOMx + this.radius;
		this.aabb.maxy = this.worldCOMy + this.radius;
	}
	__validate_sweepRadius() {
		this.sweepCoef = Math.sqrt(this.localCOMx * this.localCOMx + this.localCOMy * this.localCOMy);
		this.sweepRadius = this.sweepCoef + this.radius;
	}
	__validate_area_inertia() {
		let r2 = this.radius * this.radius;
		this.area = r2 * Math.PI;
		this.inertia = r2 * 0.5 + (this.localCOMx * this.localCOMx + this.localCOMy * this.localCOMy);
	}
	__validate_angDrag() {
		let lc = this.localCOMx * this.localCOMx + this.localCOMy * this.localCOMy;
		let r2 = this.radius * this.radius;
		let skin = this.material.dynamicFriction * Config.fluidAngularDragFriction;
		this.angDrag = (lc + 2 * r2) * skin + 0.5 * Config.fluidAngularDrag * (1 + Config.fluidVacuumDrag) * lc;
		this.angDrag /= 2 * (lc + 0.5 * r2);
	}
	__scale(sx,sy) {
		let factor = ((sx < 0 ? -sx : sx) + (sy < 0 ? -sy : sy)) / 2;
		this.radius *= factor < 0 ? -factor : factor;
		this.invalidate_radius();
		if(this.localCOMx * this.localCOMx + this.localCOMy * this.localCOMy > 0) {
			this.localCOMx *= sx;
			this.localCOMy *= sy;
			this.invalidate_localCOM();
		}
	}
	__translate(x,y) {
		let t = 1.0;
		this.localCOMx += x * t;
		this.localCOMy += y * t;
		this.invalidate_localCOM();
	}
	__rotate(x,y) {
		if(this.localCOMx * this.localCOMx + this.localCOMy * this.localCOMy > 0) {
			let tx = 0.0;
			let ty = 0.0;
			tx = y * this.localCOMx - x * this.localCOMy;
			ty = this.localCOMx * x + this.localCOMy * y;
			this.localCOMx = tx;
			this.localCOMy = ty;
			this.invalidate_localCOM();
		}
	}
	__transform(m) {
		let det = m.zpp_inner.a * m.zpp_inner.d - m.zpp_inner.b * m.zpp_inner.c;
		if(det < 0) {
			det = -det;
		}
		this.radius *= Math.sqrt(det);
		let t = m.zpp_inner.a * this.localCOMx + m.zpp_inner.b * this.localCOMy + m.zpp_inner.tx;
		this.localCOMy = m.zpp_inner.c * this.localCOMx + m.zpp_inner.d * this.localCOMy + m.zpp_inner.ty;
		this.localCOMx = t;
		this.invalidate_radius();
		this.invalidate_localCOM();
	}
	__copy() {
		let ret = new Circle(this.radius).zpp_inner_zn;
		ret.localCOMx = this.localCOMx;
		ret.localCOMy = this.localCOMy;
		ret.zip_localCOM = false;
		return ret;
	}
}
