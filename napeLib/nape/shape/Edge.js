import ZPP_Edge from '../../zpp_nape/shape/ZPP_Edge.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import Vec2 from '../geom/Vec2.js';
export default class Edge {
	constructor() {
		this.zpp_inner = null;
		if(!ZPP_Edge.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate an Edge derp!");
		}
	}
	get_polygon() {
		if(this.zpp_inner.polygon == null) {
			throw haxe_Exception.thrown("Error: Edge not current in use");
		}
		return this.zpp_inner.polygon.outer_zn;
	}
	get_localNormal() {
		if(this.zpp_inner.polygon == null) {
			throw haxe_Exception.thrown("Error: Edge not current in use");
		}
		if(this.zpp_inner.wrap_lnorm == null) {
			this.zpp_inner.getlnorm();
		}
		return this.zpp_inner.wrap_lnorm;
	}
	get_worldNormal() {
		if(this.zpp_inner.polygon == null) {
			throw haxe_Exception.thrown("Error: Edge not current in use");
		}
		if(this.zpp_inner.wrap_gnorm == null) {
			this.zpp_inner.getgnorm();
		}
		return this.zpp_inner.wrap_gnorm;
	}
	get_length() {
		if(this.zpp_inner.polygon == null) {
			throw haxe_Exception.thrown("Error: Edge not current in use");
		}
		this.zpp_inner.polygon.validate_laxi();
		return this.zpp_inner.length;
	}
	get_localProjection() {
		if(this.zpp_inner.polygon == null) {
			throw haxe_Exception.thrown("Error: Edge not current in use");
		}
		this.zpp_inner.polygon.validate_laxi();
		return this.zpp_inner.lprojection;
	}
	get_worldProjection() {
		if(this.zpp_inner.polygon == null) {
			throw haxe_Exception.thrown("Error: Edge not current in use");
		}
		if(this.zpp_inner.polygon.body == null) {
			throw haxe_Exception.thrown("Error: Edge world projection only makes sense for Polygons contained within a rigid body");
		}
		let _this = this.zpp_inner.polygon;
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
		return this.zpp_inner.gprojection;
	}
	get_localVertex1() {
		if(this.zpp_inner.polygon == null) {
			throw haxe_Exception.thrown("Error: Edge not current in use");
		}
		this.zpp_inner.polygon.validate_laxi();
		let _this = this.zpp_inner.lp0;
		if(_this.outer == null) {
			_this.outer = new Vec2();
			let o = _this.outer.zpp_inner;
			if(o.outer != null) {
				o.outer.zpp_inner = null;
				o.outer = null;
			}
			o._isimmutable = null;
			o._validate = null;
			o._invalidate = null;
			o.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o;
			_this.outer.zpp_inner = _this;
		}
		return _this.outer;
	}
	get_localVertex2() {
		if(this.zpp_inner.polygon == null) {
			throw haxe_Exception.thrown("Error: Edge not current in use");
		}
		this.zpp_inner.polygon.validate_laxi();
		let _this = this.zpp_inner.lp1;
		if(_this.outer == null) {
			_this.outer = new Vec2();
			let o = _this.outer.zpp_inner;
			if(o.outer != null) {
				o.outer.zpp_inner = null;
				o.outer = null;
			}
			o._isimmutable = null;
			o._validate = null;
			o._invalidate = null;
			o.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o;
			_this.outer.zpp_inner = _this;
		}
		return _this.outer;
	}
	get_worldVertex1() {
		if(this.zpp_inner.polygon == null) {
			throw haxe_Exception.thrown("Error: Edge not current in use");
		}
		let _this = this.zpp_inner.polygon;
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
		let _this1 = this.zpp_inner.gp0;
		if(_this1.outer == null) {
			_this1.outer = new Vec2();
			let o = _this1.outer.zpp_inner;
			if(o.outer != null) {
				o.outer.zpp_inner = null;
				o.outer = null;
			}
			o._isimmutable = null;
			o._validate = null;
			o._invalidate = null;
			o.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o;
			_this1.outer.zpp_inner = _this1;
		}
		return _this1.outer;
	}
	get_worldVertex2() {
		if(this.zpp_inner.polygon == null) {
			throw haxe_Exception.thrown("Error: Edge not current in use");
		}
		let _this = this.zpp_inner.polygon;
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
		let _this1 = this.zpp_inner.gp1;
		if(_this1.outer == null) {
			_this1.outer = new Vec2();
			let o = _this1.outer.zpp_inner;
			if(o.outer != null) {
				o.outer.zpp_inner = null;
				o.outer = null;
			}
			o._isimmutable = null;
			o._validate = null;
			o._invalidate = null;
			o.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o;
			_this1.outer.zpp_inner = _this1;
		}
		return _this1.outer;
	}
	toString() {
		if(this.zpp_inner.polygon == null) {
			return "Edge(object-pooled)";
		} else if(this.zpp_inner.polygon.body == null) {
			this.zpp_inner.polygon.validate_laxi();
			return "{ localNormal : " + ("{ x: " + this.zpp_inner.lnormx + " y: " + this.zpp_inner.lnormy + " }") + " }";
		} else {
			let _this = this.zpp_inner.polygon;
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
			return "{ localNormal : " + ("{ x: " + this.zpp_inner.lnormx + " y: " + this.zpp_inner.lnormy + " }") + " worldNormal : " + ("{ x: " + this.zpp_inner.gnormx + " y: " + this.zpp_inner.gnormy + " }") + " }";
		}
	}
}
