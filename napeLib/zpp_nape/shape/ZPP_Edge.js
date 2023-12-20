import ZPP_PubPool from '../util/ZPP_PubPool.js';
import ZPP_Vec2 from '../geom/ZPP_Vec2.js';
import Edge from '../../nape/shape/Edge.js';
import Vec2 from '../../nape/geom/Vec2.js';
export default class ZPP_Edge {
	constructor() {
		this.tp1 = 0.0;
		this.tp0 = 0.0;
		this.gp1 = null;
		this.lp1 = null;
		this.gp0 = null;
		this.lp0 = null;
		this.gprojection = 0.0;
		this.lprojection = 0.0;
		this.length = 0.0;
		this.wrap_gnorm = null;
		this.gnormy = 0.0;
		this.gnormx = 0.0;
		this.wrap_lnorm = null;
		this.lnormy = 0.0;
		this.lnormx = 0.0;
		this.outer = null;
		this.polygon = null;
		this.next = null;
		this.lnormx = 0;
		this.lnormy = 0;
		this.gnormx = 0;
		this.gnormy = 0;
		this.length = 0;
		this.lprojection = 0;
		this.gprojection = 0;
	}
	free() {
		this.polygon = null;
	}
	alloc() {
	}
	wrapper() {
		if(this.outer == null) {
			ZPP_Edge.internal = true;
			this.outer = new Edge();
			ZPP_Edge.internal = false;
			this.outer.zpp_inner = this;
		}
		return this.outer;
	}
	lnorm_validate() {
		if(this.polygon == null) {
			throw haxe_Exception.thrown("Error: Edge not currently in use");
		}
		this.polygon.validate_laxi();
		this.wrap_lnorm.zpp_inner.x = this.lnormx;
		this.wrap_lnorm.zpp_inner.y = this.lnormy;
	}
	gnorm_validate() {
		if(this.polygon == null) {
			throw haxe_Exception.thrown("Error: Edge not currently in use");
		}
		if(this.polygon.body == null) {
			throw haxe_Exception.thrown("Error: Edge worldNormal only makes sense if the parent Polygon is contained within a rigid body");
		}
		let _this = this.polygon;
		if(_this.zip_gaxi) {
			if(_this.body != null) {
				_this.zip_gaxi = false;
				_this.validate_laxi();
				let _this1 = _this.body;
				if(_this1.zip_axis) {
					_this1.zip_axis = false;
					_this1.axisx = Math.sin(_this1.rot);
					_this1.axisy = Math.cos(_this1.rot);
				}
				if(_this.zip_gverts) {
					if(_this.body != null) {
						_this.zip_gverts = false;
						_this.validate_lverts();
						let _this1 = _this.body;
						if(_this1.zip_axis) {
							_this1.zip_axis = false;
							_this1.axisx = Math.sin(_this1.rot);
							_this1.axisy = Math.cos(_this1.rot);
						}
						let li = _this.lverts.next;
						let cx_ite = _this.gverts.next;
						while(cx_ite != null) {
							let g = cx_ite;
							let l = li;
							li = li.next;
							g.x = _this.body.posx + (_this.body.axisy * l.x - _this.body.axisx * l.y);
							g.y = _this.body.posy + (l.x * _this.body.axisx + l.y * _this.body.axisy);
							cx_ite = cx_ite.next;
						}
					}
				}
				let ite = _this.edges.head;
				let cx_ite = _this.gverts.next;
				let u = cx_ite;
				cx_ite = cx_ite.next;
				while(cx_ite != null) {
					let v = cx_ite;
					let e = ite.elt;
					ite = ite.next;
					e.gp0 = u;
					e.gp1 = v;
					e.gnormx = _this.body.axisy * e.lnormx - _this.body.axisx * e.lnormy;
					e.gnormy = e.lnormx * _this.body.axisx + e.lnormy * _this.body.axisy;
					e.gprojection = _this.body.posx * e.gnormx + _this.body.posy * e.gnormy + e.lprojection;
					if(e.wrap_gnorm != null) {
						e.wrap_gnorm.zpp_inner.x = e.gnormx;
						e.wrap_gnorm.zpp_inner.y = e.gnormy;
					}
					e.tp0 = e.gp0.y * e.gnormx - e.gp0.x * e.gnormy;
					e.tp1 = e.gp1.y * e.gnormx - e.gp1.x * e.gnormy;
					u = v;
					cx_ite = cx_ite.next;
				}
				let v = _this.gverts.next;
				let e = ite.elt;
				ite = ite.next;
				e.gp0 = u;
				e.gp1 = v;
				e.gnormx = _this.body.axisy * e.lnormx - _this.body.axisx * e.lnormy;
				e.gnormy = e.lnormx * _this.body.axisx + e.lnormy * _this.body.axisy;
				e.gprojection = _this.body.posx * e.gnormx + _this.body.posy * e.gnormy + e.lprojection;
				if(e.wrap_gnorm != null) {
					e.wrap_gnorm.zpp_inner.x = e.gnormx;
					e.wrap_gnorm.zpp_inner.y = e.gnormy;
				}
				e.tp0 = e.gp0.y * e.gnormx - e.gp0.x * e.gnormy;
				e.tp1 = e.gp1.y * e.gnormx - e.gp1.x * e.gnormy;
			}
		}
		this.wrap_gnorm.zpp_inner.x = this.gnormx;
		this.wrap_gnorm.zpp_inner.y = this.gnormy;
	}
	getlnorm() {
		let x = this.lnormx;
		let y = this.lnormy;
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
		this.wrap_lnorm = ret;
		this.wrap_lnorm.zpp_inner._immutable = true;
		this.wrap_lnorm.zpp_inner._validate = $bind(this,this.lnorm_validate);
	}
	getgnorm() {
		let x = this.gnormx;
		let y = this.gnormy;
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
		this.wrap_gnorm = ret;
		this.wrap_gnorm.zpp_inner._immutable = true;
		this.wrap_gnorm.zpp_inner._validate = $bind(this,this.gnorm_validate);
	}
}
ZPP_Edge.zpp_pool = null;
ZPP_Edge.internal = false;
