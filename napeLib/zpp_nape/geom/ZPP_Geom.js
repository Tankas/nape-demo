import ZPP_Flags from '../util/ZPP_Flags.js';
export default class ZPP_Geom {
	static validateShape(s) {
		if(s.type == ZPP_Flags.id_ShapeType_POLYGON) {
			let _this = s.polygon;
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
		}
		if(s.zip_aabb) {
			if(s.body != null) {
				s.zip_aabb = false;
				if(s.type == ZPP_Flags.id_ShapeType_CIRCLE) {
					let _this = s.circle;
					if(_this.zip_worldCOM) {
						if(_this.body != null) {
							_this.zip_worldCOM = false;
							if(_this.zip_localCOM) {
								_this.zip_localCOM = false;
								if(_this.type == ZPP_Flags.id_ShapeType_POLYGON) {
									let _this1 = _this.polygon;
									if(_this1.lverts.next == null) {
										throw haxe_Exception.thrown("Error: An empty polygon has no meaningful localCOM");
									}
									if(_this1.lverts.next.next == null) {
										_this1.localCOMx = _this1.lverts.next.x;
										_this1.localCOMy = _this1.lverts.next.y;
									} else if(_this1.lverts.next.next.next == null) {
										_this1.localCOMx = _this1.lverts.next.x;
										_this1.localCOMy = _this1.lverts.next.y;
										let t = 1.0;
										_this1.localCOMx += _this1.lverts.next.next.x * t;
										_this1.localCOMy += _this1.lverts.next.next.y * t;
										let t1 = 0.5;
										_this1.localCOMx *= t1;
										_this1.localCOMy *= t1;
									} else {
										_this1.localCOMx = 0;
										_this1.localCOMy = 0;
										let area = 0.0;
										let cx_ite = _this1.lverts.next;
										let u = cx_ite;
										cx_ite = cx_ite.next;
										let v = cx_ite;
										cx_ite = cx_ite.next;
										while(cx_ite != null) {
											let w = cx_ite;
											area += v.x * (w.y - u.y);
											let cf = w.y * v.x - w.x * v.y;
											_this1.localCOMx += (v.x + w.x) * cf;
											_this1.localCOMy += (v.y + w.y) * cf;
											u = v;
											v = w;
											cx_ite = cx_ite.next;
										}
										cx_ite = _this1.lverts.next;
										let w = cx_ite;
										area += v.x * (w.y - u.y);
										let cf = w.y * v.x - w.x * v.y;
										_this1.localCOMx += (v.x + w.x) * cf;
										_this1.localCOMy += (v.y + w.y) * cf;
										u = v;
										v = w;
										cx_ite = cx_ite.next;
										let w1 = cx_ite;
										area += v.x * (w1.y - u.y);
										let cf1 = w1.y * v.x - w1.x * v.y;
										_this1.localCOMx += (v.x + w1.x) * cf1;
										_this1.localCOMy += (v.y + w1.y) * cf1;
										area = 1 / (3 * area);
										let t = area;
										_this1.localCOMx *= t;
										_this1.localCOMy *= t;
									}
								}
								if(_this.wrap_localCOM != null) {
									_this.wrap_localCOM.zpp_inner.x = _this.localCOMx;
									_this.wrap_localCOM.zpp_inner.y = _this.localCOMy;
								}
							}
							let _this1 = _this.body;
							if(_this1.zip_axis) {
								_this1.zip_axis = false;
								_this1.axisx = Math.sin(_this1.rot);
								_this1.axisy = Math.cos(_this1.rot);
							}
							_this.worldCOMx = _this.body.posx + (_this.body.axisy * _this.localCOMx - _this.body.axisx * _this.localCOMy);
							_this.worldCOMy = _this.body.posy + (_this.localCOMx * _this.body.axisx + _this.localCOMy * _this.body.axisy);
						}
					}
					let rx = _this.radius;
					let ry = _this.radius;
					_this.aabb.minx = _this.worldCOMx - rx;
					_this.aabb.miny = _this.worldCOMy - ry;
					_this.aabb.maxx = _this.worldCOMx + rx;
					_this.aabb.maxy = _this.worldCOMy + ry;
				} else {
					let _this = s.polygon;
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
					if(_this.lverts.next == null) {
						throw haxe_Exception.thrown("Error: An empty polygon has no meaningful bounds");
					}
					let p0 = _this.gverts.next;
					_this.aabb.minx = p0.x;
					_this.aabb.miny = p0.y;
					_this.aabb.maxx = p0.x;
					_this.aabb.maxy = p0.y;
					let cx_ite = _this.gverts.next.next;
					while(cx_ite != null) {
						let p = cx_ite;
						if(p.x < _this.aabb.minx) {
							_this.aabb.minx = p.x;
						}
						if(p.x > _this.aabb.maxx) {
							_this.aabb.maxx = p.x;
						}
						if(p.y < _this.aabb.miny) {
							_this.aabb.miny = p.y;
						}
						if(p.y > _this.aabb.maxy) {
							_this.aabb.maxy = p.y;
						}
						cx_ite = cx_ite.next;
					}
				}
			}
		}
		if(s.zip_worldCOM) {
			if(s.body != null) {
				s.zip_worldCOM = false;
				if(s.zip_localCOM) {
					s.zip_localCOM = false;
					if(s.type == ZPP_Flags.id_ShapeType_POLYGON) {
						let _this = s.polygon;
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
					if(s.wrap_localCOM != null) {
						s.wrap_localCOM.zpp_inner.x = s.localCOMx;
						s.wrap_localCOM.zpp_inner.y = s.localCOMy;
					}
				}
				let _this = s.body;
				if(_this.zip_axis) {
					_this.zip_axis = false;
					_this.axisx = Math.sin(_this.rot);
					_this.axisy = Math.cos(_this.rot);
				}
				s.worldCOMx = s.body.posx + (s.body.axisy * s.localCOMx - s.body.axisx * s.localCOMy);
				s.worldCOMy = s.body.posy + (s.localCOMx * s.body.axisx + s.localCOMy * s.body.axisy);
			}
		}
	}
}
