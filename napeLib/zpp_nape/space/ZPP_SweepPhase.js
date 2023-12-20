import ZPP_SweepData from './ZPP_SweepData.js';
import ZPP_Broadphase from './ZPP_Broadphase.js';
import ZPP_Vec2 from '../geom/ZPP_Vec2.js';
import ZPP_Collide from '../geom/ZPP_Collide.js';
import ZPP_AABB from '../geom/ZPP_AABB.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import ShapeList from '../../nape/shape/ShapeList.js';
import BodyList from '../../nape/phys/BodyList.js';
import RayResultList from '../../nape/geom/RayResultList.js';
export default class ZPP_SweepPhase extends ZPP_Broadphase {
	constructor(space) {
		ZPP_Broadphase._hx_skip_constructor = true;
		super();
		ZPP_Broadphase._hx_skip_constructor = false;
		this._hx_constructor(space);
	}
	_hx_constructor(space) {
		this.failed = null;
		this.list = null;
		super._hx_constructor();
		this.space = space;
		this.is_sweep = true;
		this.sweep = this;
	}
	__insert(shape) {
		let dat;
		if(ZPP_SweepData.zpp_pool == null) {
			dat = new ZPP_SweepData();
		} else {
			dat = ZPP_SweepData.zpp_pool;
			ZPP_SweepData.zpp_pool = dat.next;
			dat.next = null;
		}
		shape.sweep = dat;
		dat.shape = shape;
		dat.aabb = shape.aabb;
		dat.next = this.list;
		if(this.list != null) {
			this.list.prev = dat;
		}
		this.list = dat;
	}
	__remove(shape) {
		let dat = shape.sweep;
		if(dat.prev == null) {
			this.list = dat.next;
		} else {
			dat.prev.next = dat.next;
		}
		if(dat.next != null) {
			dat.next.prev = dat.prev;
		}
		shape.sweep = null;
		let o = dat;
		o.prev = null;
		o.shape = null;
		o.aabb = null;
		o.next = ZPP_SweepData.zpp_pool;
		ZPP_SweepData.zpp_pool = o;
	}
	__sync(shape) {
		if(!this.space.continuous) {
			if(shape.zip_aabb) {
				if(shape.body != null) {
					shape.zip_aabb = false;
					if(shape.type == ZPP_Flags.id_ShapeType_CIRCLE) {
						let _this = shape.circle;
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
						let _this = shape.polygon;
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
	}
	sync_broadphase() {
		this.space.validation();
		if(this.list != null) {
			let a = this.list.next;
			while(a != null) {
				let n = a.next;
				let b = a.prev;
				if(a.aabb.minx > b.aabb.minx) {
					a = n;
					continue;
				}
				while(b.prev != null && b.prev.aabb.minx > a.aabb.minx) b = b.prev;
				let prev = a.prev;
				prev.next = a.next;
				if(a.next != null) {
					a.next.prev = prev;
				}
				if(b.prev == null) {
					a.prev = null;
					this.list = a;
					a.next = b;
					b.prev = a;
				} else {
					a.prev = b.prev;
					b.prev = a;
					a.prev.next = a;
					a.next = b;
				}
				a = n;
			}
		}
	}
	sync_broadphase_fast() {
		let a = this.list.next;
		while(a != null) {
			let n = a.next;
			let b = a.prev;
			if(a.aabb.minx > b.aabb.minx) {
				a = n;
				continue;
			}
			while(b.prev != null && b.prev.aabb.minx > a.aabb.minx) b = b.prev;
			let prev = a.prev;
			prev.next = a.next;
			if(a.next != null) {
				a.next.prev = prev;
			}
			if(b.prev == null) {
				a.prev = null;
				this.list = a;
				a.next = b;
				b.prev = a;
			} else {
				a.prev = b.prev;
				b.prev = a;
				a.prev.next = a;
				a.next = b;
			}
			a = n;
		}
	}
	broadphase(space,discrete) {
		if(this.list != null) {
			let a = this.list.next;
			while(a != null) {
				let n = a.next;
				let b = a.prev;
				if(a.aabb.minx > b.aabb.minx) {
					a = n;
					continue;
				}
				while(b.prev != null && b.prev.aabb.minx > a.aabb.minx) b = b.prev;
				let prev = a.prev;
				prev.next = a.next;
				if(a.next != null) {
					a.next.prev = prev;
				}
				if(b.prev == null) {
					a.prev = null;
					this.list = a;
					a.next = b;
					b.prev = a;
				} else {
					a.prev = b.prev;
					b.prev = a;
					a.prev.next = a;
					a.next = b;
				}
				a = n;
			}
			let d1 = this.list;
			while(d1 != null) {
				let d2 = d1.next;
				let s1 = d1.shape;
				let b1 = s1.body;
				let bottom = d1.aabb.maxx;
				while(d2 != null) {
					if(d2.aabb.minx > bottom) {
						break;
					}
					let s2 = d2.shape;
					let b2 = s2.body;
					if(b2 == b1) {
						d2 = d2.next;
						continue;
					}
					if(b1.type == ZPP_Flags.id_BodyType_STATIC && b2.type == ZPP_Flags.id_BodyType_STATIC) {
						d2 = d2.next;
						continue;
					}
					if(b1.component.sleeping && b2.component.sleeping) {
						d2 = d2.next;
						continue;
					}
					let _this = s1.aabb;
					let x = s2.aabb;
					if(!(x.miny > _this.maxy || _this.miny > x.maxy)) {
						if(discrete) {
							space.narrowPhase(s1,s2,b1.type != ZPP_Flags.id_BodyType_DYNAMIC || b2.type != ZPP_Flags.id_BodyType_DYNAMIC,null,false);
						} else {
							space.continuousEvent(s1,s2,b1.type != ZPP_Flags.id_BodyType_DYNAMIC || b2.type != ZPP_Flags.id_BodyType_DYNAMIC,null,false);
						}
					}
					d2 = d2.next;
				}
				d1 = d1.next;
			}
		}
	}
	clear() {
		while(this.list != null) {
			this.list.shape.removedFromSpace();
			this.__remove(this.list.shape);
		}
	}
	shapesUnderPoint(x,y,filter,output) {
		this.sync_broadphase();
		let ret;
		if(ZPP_Vec2.zpp_pool == null) {
			ret = new ZPP_Vec2();
		} else {
			ret = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.weak = false;
		ret._immutable = false;
		ret.x = x;
		ret.y = y;
		let v = ret;
		let ret1 = output == null ? new ShapeList() : output;
		let a = this.list;
		while(a != null && a.aabb.minx > x) a = a.next;
		while(a != null && a.aabb.minx <= x) {
			if(a.aabb.maxx >= x && a.aabb.miny <= y && a.aabb.maxy >= y) {
				let shape = a.shape;
				let tmp;
				if(filter != null) {
					let _this = shape.filter;
					tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
				} else {
					tmp = true;
				}
				if(tmp) {
					if(shape.type == ZPP_Flags.id_ShapeType_CIRCLE) {
						if(ZPP_Collide.circleContains(shape.circle,v)) {
							ret1.push(shape.outer);
						}
					} else if(ZPP_Collide.polyContains(shape.polygon,v)) {
						ret1.push(shape.outer);
					}
				}
			}
			a = a.next;
		}
		let o = v;
		if(o.outer != null) {
			o.outer.zpp_inner = null;
			o.outer = null;
		}
		o._isimmutable = null;
		o._validate = null;
		o._invalidate = null;
		o.next = ZPP_Vec2.zpp_pool;
		ZPP_Vec2.zpp_pool = o;
		return ret1;
	}
	bodiesUnderPoint(x,y,filter,output) {
		this.sync_broadphase();
		let ret;
		if(ZPP_Vec2.zpp_pool == null) {
			ret = new ZPP_Vec2();
		} else {
			ret = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.weak = false;
		ret._immutable = false;
		ret.x = x;
		ret.y = y;
		let v = ret;
		let ret1 = output == null ? new BodyList() : output;
		let a = this.list;
		while(a != null && a.aabb.minx > x) a = a.next;
		while(a != null && a.aabb.minx <= x) {
			if(a.aabb.maxx >= x && a.aabb.miny <= y && a.aabb.maxy >= y) {
				let shape = a.shape;
				let body = shape.body.outer;
				if(!ret1.has(body)) {
					let tmp;
					if(filter != null) {
						let _this = shape.filter;
						tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
					} else {
						tmp = true;
					}
					if(tmp) {
						if(shape.type == ZPP_Flags.id_ShapeType_CIRCLE) {
							if(ZPP_Collide.circleContains(shape.circle,v)) {
								ret1.push(body);
							}
						} else if(ZPP_Collide.polyContains(shape.polygon,v)) {
							ret1.push(body);
						}
					}
				}
			}
			a = a.next;
		}
		let o = v;
		if(o.outer != null) {
			o.outer.zpp_inner = null;
			o.outer = null;
		}
		o._isimmutable = null;
		o._validate = null;
		o._invalidate = null;
		o.next = ZPP_Vec2.zpp_pool;
		ZPP_Vec2.zpp_pool = o;
		return ret1;
	}
	shapesInAABB(aabb,strict,containment,filter,output) {
		this.sync_broadphase();
		this.updateAABBShape(aabb);
		let ab = this.aabbShape.zpp_inner.aabb;
		let ret = output == null ? new ShapeList() : output;
		let a = this.list;
		while(a != null && a.aabb.maxx < ab.minx) a = a.next;
		while(a != null && a.aabb.minx <= ab.maxx) {
			let shape = a.shape;
			let tmp;
			if(filter != null) {
				let _this = shape.filter;
				tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
			} else {
				tmp = true;
			}
			if(tmp) {
				if(strict) {
					if(containment) {
						if(ZPP_Collide.containTest(this.aabbShape.zpp_inner,shape)) {
							ret.push(shape.outer);
						}
					} else {
						let x = a.aabb;
						if(x.minx >= ab.minx && x.miny >= ab.miny && x.maxx <= ab.maxx && x.maxy <= ab.maxy) {
							ret.push(shape.outer);
						} else {
							let _this = a.aabb;
							if(ab.miny <= _this.maxy && _this.miny <= ab.maxy && ab.minx <= _this.maxx && _this.minx <= ab.maxx) {
								if(ZPP_Collide.testCollide_safe(shape,this.aabbShape.zpp_inner)) {
									ret.push(shape.outer);
								}
							}
						}
					}
				} else {
					let tmp;
					if(containment) {
						let x = a.aabb;
						tmp = x.minx >= ab.minx && x.miny >= ab.miny && x.maxx <= ab.maxx && x.maxy <= ab.maxy;
					} else {
						let _this = a.aabb;
						tmp = ab.miny <= _this.maxy && _this.miny <= ab.maxy && ab.minx <= _this.maxx && _this.minx <= ab.maxx;
					}
					if(tmp) {
						ret.push(shape.outer);
					}
				}
			}
			a = a.next;
		}
		return ret;
	}
	bodiesInAABB(aabb,strict,containment,filter,output) {
		this.sync_broadphase();
		this.updateAABBShape(aabb);
		let ab = this.aabbShape.zpp_inner.aabb;
		let ret = output == null ? new BodyList() : output;
		if(this.failed == null) {
			this.failed = new BodyList();
		}
		let a = this.list;
		while(a != null && a.aabb.maxx < ab.minx) a = a.next;
		while(a != null && a.aabb.minx <= ab.maxx) {
			let shape = a.shape;
			let body = shape.body.outer;
			let _this = a.aabb;
			if(ab.miny <= _this.maxy && _this.miny <= ab.maxy && ab.minx <= _this.maxx && _this.minx <= ab.maxx) {
				let tmp;
				if(filter != null) {
					let _this = shape.filter;
					tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
				} else {
					tmp = true;
				}
				if(tmp) {
					if(strict) {
						if(containment) {
							if(!this.failed.has(body)) {
								let col = ZPP_Collide.containTest(this.aabbShape.zpp_inner,shape);
								if(!ret.has(body) && col) {
									ret.push(body);
								} else if(!col) {
									ret.remove(body);
									this.failed.push(body);
								}
							}
						} else if(!ret.has(body) && ZPP_Collide.testCollide_safe(shape,this.aabbShape.zpp_inner)) {
							ret.push(body);
						}
					} else if(containment) {
						if(!this.failed.has(body)) {
							let x = shape.aabb;
							let col = x.minx >= ab.minx && x.miny >= ab.miny && x.maxx <= ab.maxx && x.maxy <= ab.maxy;
							if(!ret.has(body) && col) {
								ret.push(body);
							} else if(!col) {
								ret.remove(body);
								this.failed.push(body);
							}
						}
					} else {
						let tmp;
						if(!ret.has(body)) {
							let x = shape.aabb;
							tmp = x.minx >= ab.minx && x.miny >= ab.miny && x.maxx <= ab.maxx && x.maxy <= ab.maxy;
						} else {
							tmp = false;
						}
						if(tmp) {
							ret.push(body);
						}
					}
				}
			}
			a = a.next;
		}
		this.failed.clear();
		return ret;
	}
	shapesInCircle(x,y,r,containment,filter,output) {
		this.sync_broadphase();
		this.updateCircShape(x,y,r);
		let ab = this.circShape.zpp_inner.aabb;
		let ret = output == null ? new ShapeList() : output;
		let a = this.list;
		while(a != null && a.aabb.maxx < ab.minx) a = a.next;
		while(a != null && a.aabb.minx <= ab.maxx) {
			let _this = a.aabb;
			if(ab.miny <= _this.maxy && _this.miny <= ab.maxy && ab.minx <= _this.maxx && _this.minx <= ab.maxx) {
				let shape = a.shape;
				let tmp;
				if(filter != null) {
					let _this = shape.filter;
					tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
				} else {
					tmp = true;
				}
				if(tmp) {
					if(containment) {
						if(ZPP_Collide.containTest(this.circShape.zpp_inner,shape)) {
							ret.push(shape.outer);
						}
					} else if(ZPP_Collide.testCollide_safe(shape,this.circShape.zpp_inner)) {
						ret.push(shape.outer);
					}
				}
			}
			a = a.next;
		}
		return ret;
	}
	bodiesInCircle(x,y,r,containment,filter,output) {
		this.sync_broadphase();
		this.updateCircShape(x,y,r);
		let ab = this.circShape.zpp_inner.aabb;
		let ret = output == null ? new BodyList() : output;
		if(this.failed == null) {
			this.failed = new BodyList();
		}
		let a = this.list;
		while(a != null && a.aabb.maxx < ab.minx) a = a.next;
		while(a != null && a.aabb.minx <= ab.maxx) {
			let _this = a.aabb;
			if(ab.miny <= _this.maxy && _this.miny <= ab.maxy && ab.minx <= _this.maxx && _this.minx <= ab.maxx) {
				let shape = a.shape;
				let body = shape.body.outer;
				let tmp;
				if(filter != null) {
					let _this = shape.filter;
					tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
				} else {
					tmp = true;
				}
				if(tmp) {
					if(containment) {
						if(!this.failed.has(body)) {
							let col = ZPP_Collide.containTest(this.circShape.zpp_inner,shape);
							if(!ret.has(body) && col) {
								ret.push(body);
							} else if(!col) {
								ret.remove(body);
								this.failed.push(body);
							}
						}
					} else if(!ret.has(body) && ZPP_Collide.testCollide_safe(shape,this.circShape.zpp_inner)) {
						ret.push(body);
					}
				}
			}
			a = a.next;
		}
		this.failed.clear();
		return ret;
	}
	shapesInShape(shape,containment,filter,output) {
		this.sync_broadphase();
		this.validateShape(shape);
		let ab = shape.aabb;
		let ret = output == null ? new ShapeList() : output;
		let a = this.list;
		while(a != null && a.aabb.maxx < ab.minx) a = a.next;
		while(a != null && a.aabb.minx <= ab.maxx) {
			let _this = a.aabb;
			if(ab.miny <= _this.maxy && _this.miny <= ab.maxy && ab.minx <= _this.maxx && _this.minx <= ab.maxx) {
				let shape2 = a.shape;
				let tmp;
				if(filter != null) {
					let _this = shape2.filter;
					tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
				} else {
					tmp = true;
				}
				if(tmp) {
					if(containment) {
						if(ZPP_Collide.containTest(shape,shape2)) {
							ret.push(shape2.outer);
						}
					} else if(ZPP_Collide.testCollide_safe(shape2,shape)) {
						ret.push(shape2.outer);
					}
				}
			}
			a = a.next;
		}
		return ret;
	}
	bodiesInShape(shape,containment,filter,output) {
		this.sync_broadphase();
		this.validateShape(shape);
		let ab = shape.aabb;
		let ret = output == null ? new BodyList() : output;
		if(this.failed == null) {
			this.failed = new BodyList();
		}
		let a = this.list;
		while(a != null && a.aabb.maxx < ab.minx) a = a.next;
		while(a != null && a.aabb.minx <= ab.maxx) {
			let _this = a.aabb;
			if(ab.miny <= _this.maxy && _this.miny <= ab.maxy && ab.minx <= _this.maxx && _this.minx <= ab.maxx) {
				let shape2 = a.shape;
				let body = shape2.body.outer;
				let tmp;
				if(filter != null) {
					let _this = shape2.filter;
					tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
				} else {
					tmp = true;
				}
				if(tmp) {
					if(containment) {
						if(!this.failed.has(body)) {
							let col = ZPP_Collide.containTest(shape,shape2);
							if(!ret.has(body) && col) {
								ret.push(body);
							} else if(!col) {
								ret.remove(body);
								this.failed.push(body);
							}
						}
					} else if(!ret.has(body) && ZPP_Collide.testCollide_safe(shape,shape2)) {
						ret.push(body);
					}
				}
			}
			a = a.next;
		}
		this.failed.clear();
		return ret;
	}
	rayCast(ray,inner,filter) {
		this.sync_broadphase();
		ray.validate_dir();
		let rayab = ray.rayAABB();
		let mint = ray.maxdist;
		let minres = null;
		if(ray.dirx == 0) {
			let a = this.list;
			while(a != null && a.aabb.minx <= rayab.minx) {
				let tmp;
				let _this = a.aabb;
				if(rayab.miny <= _this.maxy && _this.miny <= rayab.maxy && rayab.minx <= _this.maxx && _this.minx <= rayab.maxx) {
					if(filter != null) {
						let _this = a.shape.filter;
						tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
					} else {
						tmp = true;
					}
				} else {
					tmp = false;
				}
				if(tmp) {
					let t = ray.aabbsect(a.aabb);
					if(t >= 0 && t < mint) {
						let result = a.shape.type == ZPP_Flags.id_ShapeType_CIRCLE ? ray.circlesect(a.shape.circle,inner,mint) : ray.polysect(a.shape.polygon,inner,mint);
						if(result != null) {
							if(result.zpp_inner.next != null) {
								throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
							}
							mint = result.zpp_inner.toiDistance;
							if(minres != null) {
								if(minres.zpp_inner.next != null) {
									throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
								}
								minres.zpp_inner.free();
							}
							minres = result;
						}
					}
				}
				a = a.next;
			}
		} else if(ray.dirx < 0) {
			let a = this.list;
			let b = null;
			while(a != null && a.aabb.minx <= rayab.maxx) {
				b = a;
				a = a.next;
			}
			a = b;
			while(a != null) {
				let tmp;
				let _this = a.aabb;
				if(rayab.miny <= _this.maxy && _this.miny <= rayab.maxy && rayab.minx <= _this.maxx && _this.minx <= rayab.maxx) {
					if(filter != null) {
						let _this = a.shape.filter;
						tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
					} else {
						tmp = true;
					}
				} else {
					tmp = false;
				}
				if(tmp) {
					let t = ray.aabbsect(a.aabb);
					if(t >= 0 && t < mint) {
						let result = a.shape.type == ZPP_Flags.id_ShapeType_CIRCLE ? ray.circlesect(a.shape.circle,inner,mint) : ray.polysect(a.shape.polygon,inner,mint);
						if(result != null) {
							if(result.zpp_inner.next != null) {
								throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
							}
							mint = result.zpp_inner.toiDistance;
							if(minres != null) {
								if(minres.zpp_inner.next != null) {
									throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
								}
								minres.zpp_inner.free();
							}
							minres = result;
						}
					}
				}
				a = a.prev;
			}
		} else {
			let a = this.list;
			while(a != null && a.aabb.minx <= rayab.maxx && a.aabb.minx < ray.originx + ray.dirx * mint) {
				let tmp;
				let _this = a.aabb;
				if(rayab.miny <= _this.maxy && _this.miny <= rayab.maxy && rayab.minx <= _this.maxx && _this.minx <= rayab.maxx) {
					if(filter != null) {
						let _this = a.shape.filter;
						tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
					} else {
						tmp = true;
					}
				} else {
					tmp = false;
				}
				if(tmp) {
					let t = ray.aabbsect(a.aabb);
					if(t >= 0 && t < mint) {
						let result = a.shape.type == ZPP_Flags.id_ShapeType_CIRCLE ? ray.circlesect(a.shape.circle,inner,mint) : ray.polysect(a.shape.polygon,inner,mint);
						if(result != null) {
							if(result.zpp_inner.next != null) {
								throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
							}
							mint = result.zpp_inner.toiDistance;
							if(minres != null) {
								if(minres.zpp_inner.next != null) {
									throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
								}
								minres.zpp_inner.free();
							}
							minres = result;
						}
					}
				}
				a = a.next;
			}
		}
		let o = rayab;
		if(o.outer != null) {
			o.outer.zpp_inner = null;
			o.outer = null;
		}
		o.wrap_min = o.wrap_max = null;
		o._invalidate = null;
		o._validate = null;
		o.next = ZPP_AABB.zpp_pool;
		ZPP_AABB.zpp_pool = o;
		return minres;
	}
	rayMultiCast(ray,inner,filter,output) {
		this.sync_broadphase();
		ray.validate_dir();
		let rayab = ray.rayAABB();
		let ret = output == null ? new RayResultList() : output;
		if(ray.dirx == 0) {
			let a = this.list;
			while(a != null && a.aabb.minx <= rayab.minx) {
				let tmp;
				let _this = a.aabb;
				if(rayab.miny <= _this.maxy && _this.miny <= rayab.maxy && rayab.minx <= _this.maxx && _this.minx <= rayab.maxx) {
					if(filter != null) {
						let _this = a.shape.filter;
						tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
					} else {
						tmp = true;
					}
				} else {
					tmp = false;
				}
				if(tmp) {
					let t = ray.aabbsect(a.aabb);
					if(t >= 0) {
						if(a.shape.type == ZPP_Flags.id_ShapeType_CIRCLE) {
							ray.circlesect2(a.shape.circle,inner,ret);
						} else {
							ray.polysect2(a.shape.polygon,inner,ret);
						}
					}
				}
				a = a.next;
			}
		} else if(ray.dirx < 0) {
			let a = this.list;
			let b = null;
			while(a != null && a.aabb.minx <= rayab.maxx) {
				b = a;
				a = a.next;
			}
			a = b;
			while(a != null) {
				let tmp;
				let _this = a.aabb;
				if(rayab.miny <= _this.maxy && _this.miny <= rayab.maxy && rayab.minx <= _this.maxx && _this.minx <= rayab.maxx) {
					if(filter != null) {
						let _this = a.shape.filter;
						tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
					} else {
						tmp = true;
					}
				} else {
					tmp = false;
				}
				if(tmp) {
					let t = ray.aabbsect(a.aabb);
					if(t >= 0) {
						if(a.shape.type == ZPP_Flags.id_ShapeType_CIRCLE) {
							ray.circlesect2(a.shape.circle,inner,ret);
						} else {
							ray.polysect2(a.shape.polygon,inner,ret);
						}
					}
				}
				a = a.prev;
			}
		} else {
			let a = this.list;
			while(a != null && a.aabb.minx <= rayab.maxx) {
				let tmp;
				let _this = a.aabb;
				if(rayab.miny <= _this.maxy && _this.miny <= rayab.maxy && rayab.minx <= _this.maxx && _this.minx <= rayab.maxx) {
					if(filter != null) {
						let _this = a.shape.filter;
						tmp = (_this.collisionMask & filter.collisionGroup) != 0 && (filter.collisionMask & _this.collisionGroup) != 0;
					} else {
						tmp = true;
					}
				} else {
					tmp = false;
				}
				if(tmp) {
					let t = ray.aabbsect(a.aabb);
					if(t >= 0) {
						if(a.shape.type == ZPP_Flags.id_ShapeType_CIRCLE) {
							ray.circlesect2(a.shape.circle,inner,ret);
						} else {
							ray.polysect2(a.shape.polygon,inner,ret);
						}
					}
				}
				a = a.next;
			}
		}
		let o = rayab;
		if(o.outer != null) {
			o.outer.zpp_inner = null;
			o.outer = null;
		}
		o.wrap_min = o.wrap_max = null;
		o._invalidate = null;
		o._validate = null;
		o.next = ZPP_AABB.zpp_pool;
		ZPP_AABB.zpp_pool = o;
		return ret;
	}
}
