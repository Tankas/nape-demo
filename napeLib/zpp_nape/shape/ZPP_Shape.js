import ZNPList_ZPP_AABBPair from '../util/ZNPList_ZPP_AABBPair.js';
import ZPP_Material from '../phys/ZPP_Material.js';
import ZPP_Interactor from '../phys/ZPP_Interactor.js';
import ZPP_AABB from '../geom/ZPP_AABB.js';
import ZPP_InteractionFilter from '../dynamics/ZPP_InteractionFilter.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import ShapeType from '../../nape/shape/ShapeType.js';
export default class ZPP_Shape extends ZPP_Interactor {
	constructor(type) {
		if(ZPP_Interactor._hx_skip_constructor) {
			super();
			return;
		}
		ZPP_Interactor._hx_skip_constructor = true;
		super();
		ZPP_Interactor._hx_skip_constructor = false;
		this._hx_constructor(type);
	}
	_hx_constructor(type) {
		this.zip_aabb = false;
		this.aabb = null;
		this.pairs = null;
		this.node = null;
		this.sweep = null;
		this.sensorEnabled = false;
		this.fluidEnabled = false;
		this.fluidProperties = null;
		this.filter = null;
		this.material = null;
		this.refmaterial = null;
		this.polygon = null;
		this.circle = null;
		this.sweepCoef = 0.0;
		this.zip_sweepRadius = false;
		this.sweepRadius = 0.0;
		this.wrap_worldCOM = null;
		this.wrap_localCOM = null;
		this.zip_worldCOM = false;
		this.worldCOMy = 0.0;
		this.worldCOMx = 0.0;
		this.zip_localCOM = false;
		this.localCOMy = 0.0;
		this.localCOMx = 0.0;
		this.zip_angDrag = false;
		this.angDrag = 0.0;
		this.inertia = 0.0;
		this.zip_area_inertia = false;
		this.area = 0.0;
		this.type = 0;
		this.body = null;
		this.outer = null;
		super._hx_constructor();
		this.pairs = new ZNPList_ZPP_AABBPair();
		this.ishape = this;
		this.type = type;
		let ret;
		if(ZPP_AABB.zpp_pool == null) {
			ret = new ZPP_AABB();
		} else {
			ret = ZPP_AABB.zpp_pool;
			ZPP_AABB.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.minx = 0;
		ret.miny = 0;
		ret.maxx = 0;
		ret.maxy = 0;
		this.aabb = ret;
		this.aabb._immutable = true;
		let me = this;
		this.aabb._validate = $bind(this,this.aabb_validate);
		this.zip_area_inertia = this.zip_angDrag = this.zip_localCOM = this.zip_sweepRadius = true;
		this.localCOMx = 0;
		this.localCOMy = 0;
		this.worldCOMx = 0;
		this.worldCOMy = 0;
		this.fluidEnabled = false;
		this.sensorEnabled = false;
		this.fluidProperties = null;
		this.body = null;
		this.refmaterial = new ZPP_Material();
		this.sweepRadius = this.sweepCoef = 0;
	}
	isCircle() {
		return this.type == ZPP_Flags.id_ShapeType_CIRCLE;
	}
	isPolygon() {
		return this.type == ZPP_Flags.id_ShapeType_POLYGON;
	}
	invalidate_sweepRadius() {
		this.zip_sweepRadius = true;
	}
	validate_sweepRadius() {
		if(this.zip_sweepRadius) {
			this.zip_sweepRadius = false;
			if(this.type == ZPP_Flags.id_ShapeType_CIRCLE) {
				this.circle.__validate_sweepRadius();
			} else {
				this.polygon.__validate_sweepRadius();
			}
		}
	}
	clear() {
		if(this.type == ZPP_Flags.id_ShapeType_CIRCLE) {
			this.circle.__clear();
		} else {
			this.polygon.__clear();
		}
	}
	validate_aabb() {
		if(this.zip_aabb) {
			if(this.body != null) {
				this.zip_aabb = false;
				if(this.type == ZPP_Flags.id_ShapeType_CIRCLE) {
					let _this = this.circle;
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
					let _this = this.polygon;
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
	}
	force_validate_aabb() {
		if(this.type == ZPP_Flags.id_ShapeType_CIRCLE) {
			let _this = this.circle;
			_this.worldCOMx = _this.body.posx + (_this.body.axisy * _this.localCOMx - _this.body.axisx * _this.localCOMy);
			_this.worldCOMy = _this.body.posy + (_this.localCOMx * _this.body.axisx + _this.localCOMy * _this.body.axisy);
			_this.aabb.minx = _this.worldCOMx - _this.radius;
			_this.aabb.miny = _this.worldCOMy - _this.radius;
			_this.aabb.maxx = _this.worldCOMx + _this.radius;
			_this.aabb.maxy = _this.worldCOMy + _this.radius;
		} else {
			let _this = this.polygon;
			let li = _this.lverts.next;
			let p0 = _this.gverts.next;
			let l = li;
			li = li.next;
			p0.x = _this.body.posx + (_this.body.axisy * l.x - _this.body.axisx * l.y);
			p0.y = _this.body.posy + (l.x * _this.body.axisx + l.y * _this.body.axisy);
			_this.aabb.minx = p0.x;
			_this.aabb.miny = p0.y;
			_this.aabb.maxx = p0.x;
			_this.aabb.maxy = p0.y;
			let cx_ite = _this.gverts.next.next;
			while(cx_ite != null) {
				let p = cx_ite;
				let l = li;
				li = li.next;
				p.x = _this.body.posx + (_this.body.axisy * l.x - _this.body.axisx * l.y);
				p.y = _this.body.posy + (l.x * _this.body.axisx + l.y * _this.body.axisy);
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
	invalidate_aabb() {
		this.zip_aabb = true;
		if(this.body != null) {
			this.body.zip_aabb = true;
		}
	}
	validate_area_inertia() {
		if(this.zip_area_inertia) {
			this.zip_area_inertia = false;
			if(this.type == ZPP_Flags.id_ShapeType_CIRCLE) {
				this.circle.__validate_area_inertia();
			} else {
				this.polygon.__validate_area_inertia();
			}
		}
	}
	validate_angDrag() {
		if(this.zip_angDrag || this.refmaterial.dynamicFriction != this.material.dynamicFriction) {
			this.zip_angDrag = false;
			this.refmaterial.dynamicFriction = this.material.dynamicFriction;
			if(this.type == ZPP_Flags.id_ShapeType_CIRCLE) {
				this.circle.__validate_angDrag();
			} else {
				this.polygon.__validate_angDrag();
			}
		}
	}
	validate_localCOM() {
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
	}
	validate_worldCOM() {
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
	}
	getworldCOM() {
		if(this.body == null) {
			throw haxe_Exception.thrown("Error: worldCOM only makes sense when Shape belongs to a Body");
		}
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
		this.wrap_worldCOM.zpp_inner.x = this.worldCOMx;
		this.wrap_worldCOM.zpp_inner.y = this.worldCOMy;
	}
	invalidate_area_inertia() {
		this.zip_area_inertia = true;
		if(this.body != null) {
			let _this = this.body;
			_this.zip_localCOM = true;
			_this.zip_worldCOM = true;
			this.body.invalidate_mass();
			this.body.invalidate_inertia();
		}
	}
	invalidate_angDrag() {
		this.zip_angDrag = true;
	}
	invalidate_localCOM() {
		this.zip_localCOM = true;
		this.invalidate_area_inertia();
		if(this.type == ZPP_Flags.id_ShapeType_CIRCLE) {
			this.zip_sweepRadius = true;
		}
		this.invalidate_angDrag();
		this.invalidate_worldCOM();
		if(this.body != null) {
			let _this = this.body;
			_this.zip_localCOM = true;
			_this.zip_worldCOM = true;
		}
	}
	invalidate_worldCOM() {
		this.zip_worldCOM = true;
		this.zip_aabb = true;
		if(this.body != null) {
			this.body.zip_aabb = true;
		}
	}
	invalidate_material(flags) {
		if((flags & ZPP_Material.WAKE) != 0) {
			this.wake();
		}
		if((flags & ZPP_Material.ARBITERS) != 0) {
			if(this.body != null) {
				this.body.refreshArbiters();
			}
		}
		if((flags & ZPP_Material.PROPS) != 0) {
			if(this.body != null) {
				let _this = this.body;
				_this.zip_localCOM = true;
				_this.zip_worldCOM = true;
				this.body.invalidate_mass();
				this.body.invalidate_inertia();
			}
		}
		if((flags & ZPP_Material.ANGDRAG) != 0) {
			this.invalidate_angDrag();
		}
		this.refmaterial.set(this.material);
	}
	invalidate_filter() {
		this.wake();
	}
	invalidate_fluidprops() {
		if(this.fluidEnabled) {
			this.wake();
		}
	}
	aabb_validate() {
		if(this.body == null) {
			throw haxe_Exception.thrown("Error: bounds only makes sense when Shape belongs to a Body");
		}
		if(this.zip_aabb) {
			if(this.body != null) {
				this.zip_aabb = false;
				if(this.type == ZPP_Flags.id_ShapeType_CIRCLE) {
					let _this = this.circle;
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
					let _this = this.polygon;
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
	}
	setMaterial(material) {
		if(this.material != material) {
			if(this.body != null && this.body.space != null) {
				if(this.material != null) {
					this.material.shapes.remove(this);
				}
			}
			this.material = material;
			if(this.body != null && this.body.space != null) {
				material.shapes.add(this);
			}
			this.wake();
			if(this.body != null) {
				this.body.refreshArbiters();
			}
		}
	}
	setFilter(filter) {
		if(this.filter != filter) {
			if(this.body != null && this.body.space != null) {
				if(this.filter != null) {
					this.filter.shapes.remove(this);
				}
			}
			this.filter = filter;
			if(this.body != null && this.body.space != null) {
				filter.shapes.add(this);
			}
			this.wake();
		}
	}
	setFluid(fluid) {
		if(this.fluidProperties != fluid) {
			if(this.body != null && this.body.space != null) {
				if(this.fluidProperties != null) {
					this.fluidProperties.shapes.remove(this);
				}
			}
			this.fluidProperties = fluid;
			if(this.body != null && this.body.space != null) {
				fluid.shapes.add(this);
			}
			if(this.fluidEnabled) {
				this.wake();
			}
		}
	}
	__immutable_midstep(name) {
		if(this.body != null && this.body.space != null && this.body.space.midstep) {
			throw haxe_Exception.thrown("Error: " + name + " cannot be set during a space step()");
		}
	}
	addedToBody() {
		this.invalidate_worldCOM();
		this.zip_aabb = true;
		if(this.body != null) {
			this.body.zip_aabb = true;
		}
	}
	removedFromBody() {
	}
	addedToSpace() {
		this.__iaddedToSpace();
		this.material.shapes.add(this);
		this.filter.shapes.add(this);
		if(this.fluidProperties != null) {
			this.fluidProperties.shapes.add(this);
		}
	}
	removedFromSpace() {
		this.__iremovedFromSpace();
		this.material.shapes.remove(this);
		this.filter.shapes.remove(this);
		if(this.fluidProperties != null) {
			this.fluidProperties.shapes.remove(this);
		}
	}
	copy() {
		let ret = null;
		if(this.type == ZPP_Flags.id_ShapeType_CIRCLE) {
			ret = this.circle.__copy();
		} else {
			ret = this.polygon.__copy();
		}
		if(!this.zip_area_inertia) {
			ret.area = this.area;
			ret.inertia = this.inertia;
		} else {
			ret.invalidate_area_inertia();
		}
		if(!this.zip_sweepRadius) {
			ret.sweepRadius = this.sweepRadius;
			ret.sweepCoef = this.sweepCoef;
		} else {
			ret.zip_sweepRadius = true;
		}
		if(!this.zip_angDrag) {
			ret.angDrag = this.angDrag;
		} else {
			ret.invalidate_angDrag();
		}
		if(!this.zip_aabb) {
			ret.aabb.minx = this.aabb.minx;
			ret.aabb.miny = this.aabb.miny;
			ret.aabb.maxx = this.aabb.maxx;
			ret.aabb.maxy = this.aabb.maxy;
		} else {
			ret.zip_aabb = true;
			if(ret.body != null) {
				ret.body.zip_aabb = true;
			}
		}
		let o = ret.material;
		o.outer = null;
		o.next = ZPP_Material.zpp_pool;
		ZPP_Material.zpp_pool = o;
		let o1 = ret.filter;
		o1.outer = null;
		o1.next = ZPP_InteractionFilter.zpp_pool;
		ZPP_InteractionFilter.zpp_pool = o1;
		ret.material = this.material;
		ret.filter = this.filter;
		if(this.fluidProperties != null) {
			ret.fluidProperties = this.fluidProperties;
		}
		ret.fluidEnabled = this.fluidEnabled;
		ret.sensorEnabled = this.sensorEnabled;
		if(this.userData != null) {
			ret.userData = Reflect.copy(this.userData);
		}
		this.copyto(ret.outer);
		return ret.outer;
	}
}
ZPP_Shape.types = (function($this) {
	var $r;
	if(ZPP_Flags.ShapeType_CIRCLE == null) {
		ZPP_Flags.internal = true;
		ZPP_Flags.ShapeType_CIRCLE = new ShapeType();
		ZPP_Flags.internal = false;
	}
	let tmp = ZPP_Flags.ShapeType_CIRCLE;
	if(ZPP_Flags.ShapeType_POLYGON == null) {
		ZPP_Flags.internal = true;
		ZPP_Flags.ShapeType_POLYGON = new ShapeType();
		ZPP_Flags.internal = false;
	}
	$r = [tmp,ZPP_Flags.ShapeType_POLYGON];
	return $r;
}(this));
