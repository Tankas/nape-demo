import ZPP_PubPool from '../util/ZPP_PubPool.js';
import ZPP_Vec2 from '../geom/ZPP_Vec2.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import Polygon from '../../nape/shape/Polygon.js';
import Circle from '../../nape/shape/Circle.js';
import BodyType from '../../nape/phys/BodyType.js';
import Body from '../../nape/phys/Body.js';
import Vec2 from '../../nape/geom/Vec2.js';
import Mat23 from '../../nape/geom/Mat23.js';
export default class ZPP_Broadphase {
	constructor() {
		if(ZPP_Broadphase._hx_skip_constructor) {
			return;
		}
		this._hx_constructor();
	}
	_hx_constructor() {
		this.circShape = null;
		this.matrix = null;
		this.aabbShape = null;
		this.dynab = null;
		this.sweep = null;
		this.is_sweep = false;
		this.space = null;
	}
	insert(shape) {
		if(this.is_sweep) {
			this.sweep.__insert(shape);
		} else {
			this.dynab.__insert(shape);
		}
	}
	remove(shape) {
		if(this.is_sweep) {
			this.sweep.__remove(shape);
		} else {
			this.dynab.__remove(shape);
		}
	}
	sync(shape) {
		if(this.is_sweep) {
			if(!this.sweep.space.continuous) {
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
		} else {
			let _this = this.dynab;
			let node = shape.node;
			if(!node.synced) {
				if(!_this.space.continuous) {
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
				let sync;
				if(node.dyn == (shape.body.type == ZPP_Flags.id_BodyType_STATIC ? false : !shape.body.component.sleeping)) {
					let _this = node.aabb;
					let x = shape.aabb;
					sync = !(x.minx >= _this.minx && x.miny >= _this.miny && x.maxx <= _this.maxx && x.maxy <= _this.maxy);
				} else {
					sync = true;
				}
				if(sync) {
					node.synced = true;
					node.snext = _this.syncs;
					_this.syncs = node;
				}
			}
		}
	}
	broadphase(space,discrete) {
	}
	clear() {
	}
	shapesUnderPoint(x,y,filter,output) {
		return null;
	}
	bodiesUnderPoint(x,y,filter,output) {
		return null;
	}
	updateAABBShape(aabb) {
		if(this.aabbShape == null) {
			if(ZPP_Flags.BodyType_STATIC == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.BodyType_STATIC = new BodyType();
				ZPP_Flags.internal = false;
			}
			let body = new Body(ZPP_Flags.BodyType_STATIC);
			let _this = body.zpp_inner.wrap_shapes;
			let obj = this.aabbShape = new Polygon(Polygon.rect(aabb.minx,aabb.miny,aabb.maxx - aabb.minx,aabb.maxy - aabb.miny));
			if(_this.zpp_inner.reverse_flag) {
				_this.push(obj);
			} else {
				_this.unshift(obj);
			}
		} else {
			let ab = this.aabbShape.zpp_inner.aabb;
			let sx = (aabb.maxx - aabb.minx) / (ab.maxx - ab.minx);
			let sy = (aabb.maxy - aabb.miny) / (ab.maxy - ab.miny);
			if(this.matrix == null) {
				this.matrix = new Mat23();
			}
			let _this = this.matrix;
			if(sx != sx) {
				throw haxe_Exception.thrown("Error: Mat23::" + "a" + " cannot be NaN");
			}
			_this.zpp_inner.a = sx;
			let _this1 = _this.zpp_inner;
			if(_this1._invalidate != null) {
				_this1._invalidate();
			}
			let _this2 = this.matrix;
			let _this3 = this.matrix;
			_this3.zpp_inner.c = 0;
			let _this4 = _this3.zpp_inner;
			if(_this4._invalidate != null) {
				_this4._invalidate();
			}
			let b = _this3.zpp_inner.c;
			if(b != b) {
				throw haxe_Exception.thrown("Error: Mat23::" + "b" + " cannot be NaN");
			}
			_this2.zpp_inner.b = b;
			let _this5 = _this2.zpp_inner;
			if(_this5._invalidate != null) {
				_this5._invalidate();
			}
			let _this6 = this.matrix;
			if(sy != sy) {
				throw haxe_Exception.thrown("Error: Mat23::" + "d" + " cannot be NaN");
			}
			_this6.zpp_inner.d = sy;
			let _this7 = _this6.zpp_inner;
			if(_this7._invalidate != null) {
				_this7._invalidate();
			}
			let _this8 = this.matrix;
			let tx = aabb.minx - sx * ab.minx;
			if(tx != tx) {
				throw haxe_Exception.thrown("Error: Mat23::" + "tx" + " cannot be NaN");
			}
			_this8.zpp_inner.tx = tx;
			let _this9 = _this8.zpp_inner;
			if(_this9._invalidate != null) {
				_this9._invalidate();
			}
			let _this10 = this.matrix;
			let ty = aabb.miny - sy * ab.miny;
			if(ty != ty) {
				throw haxe_Exception.thrown("Error: Mat23::" + "ty" + " cannot be NaN");
			}
			_this10.zpp_inner.ty = ty;
			let _this11 = _this10.zpp_inner;
			if(_this11._invalidate != null) {
				_this11._invalidate();
			}
			this.aabbShape.transform(this.matrix);
		}
		let _this = this.aabbShape.zpp_inner;
		if(_this.zip_aabb) {
			if(_this.body != null) {
				_this.zip_aabb = false;
				if(_this.type == ZPP_Flags.id_ShapeType_CIRCLE) {
					let _this1 = _this.circle;
					if(_this1.zip_worldCOM) {
						if(_this1.body != null) {
							_this1.zip_worldCOM = false;
							if(_this1.zip_localCOM) {
								_this1.zip_localCOM = false;
								if(_this1.type == ZPP_Flags.id_ShapeType_POLYGON) {
									let _this = _this1.polygon;
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
								if(_this1.wrap_localCOM != null) {
									_this1.wrap_localCOM.zpp_inner.x = _this1.localCOMx;
									_this1.wrap_localCOM.zpp_inner.y = _this1.localCOMy;
								}
							}
							let _this = _this1.body;
							if(_this.zip_axis) {
								_this.zip_axis = false;
								_this.axisx = Math.sin(_this.rot);
								_this.axisy = Math.cos(_this.rot);
							}
							_this1.worldCOMx = _this1.body.posx + (_this1.body.axisy * _this1.localCOMx - _this1.body.axisx * _this1.localCOMy);
							_this1.worldCOMy = _this1.body.posy + (_this1.localCOMx * _this1.body.axisx + _this1.localCOMy * _this1.body.axisy);
						}
					}
					let rx = _this1.radius;
					let ry = _this1.radius;
					_this1.aabb.minx = _this1.worldCOMx - rx;
					_this1.aabb.miny = _this1.worldCOMy - ry;
					_this1.aabb.maxx = _this1.worldCOMx + rx;
					_this1.aabb.maxy = _this1.worldCOMy + ry;
				} else {
					let _this1 = _this.polygon;
					if(_this1.zip_gverts) {
						if(_this1.body != null) {
							_this1.zip_gverts = false;
							_this1.validate_lverts();
							let _this = _this1.body;
							if(_this.zip_axis) {
								_this.zip_axis = false;
								_this.axisx = Math.sin(_this.rot);
								_this.axisy = Math.cos(_this.rot);
							}
							let li = _this1.lverts.next;
							let cx_ite = _this1.gverts.next;
							while(cx_ite != null) {
								let g = cx_ite;
								let l = li;
								li = li.next;
								g.x = _this1.body.posx + (_this1.body.axisy * l.x - _this1.body.axisx * l.y);
								g.y = _this1.body.posy + (l.x * _this1.body.axisx + l.y * _this1.body.axisy);
								cx_ite = cx_ite.next;
							}
						}
					}
					if(_this1.lverts.next == null) {
						throw haxe_Exception.thrown("Error: An empty polygon has no meaningful bounds");
					}
					let p0 = _this1.gverts.next;
					_this1.aabb.minx = p0.x;
					_this1.aabb.miny = p0.y;
					_this1.aabb.maxx = p0.x;
					_this1.aabb.maxy = p0.y;
					let cx_ite = _this1.gverts.next.next;
					while(cx_ite != null) {
						let p = cx_ite;
						if(p.x < _this1.aabb.minx) {
							_this1.aabb.minx = p.x;
						}
						if(p.x > _this1.aabb.maxx) {
							_this1.aabb.maxx = p.x;
						}
						if(p.y < _this1.aabb.miny) {
							_this1.aabb.miny = p.y;
						}
						if(p.y > _this1.aabb.maxy) {
							_this1.aabb.maxy = p.y;
						}
						cx_ite = cx_ite.next;
					}
				}
			}
		}
		let _this1 = this.aabbShape.zpp_inner.polygon;
		if(_this1.zip_gaxi) {
			if(_this1.body != null) {
				_this1.zip_gaxi = false;
				_this1.validate_laxi();
				let _this = _this1.body;
				if(_this.zip_axis) {
					_this.zip_axis = false;
					_this.axisx = Math.sin(_this.rot);
					_this.axisy = Math.cos(_this.rot);
				}
				if(_this1.zip_gverts) {
					if(_this1.body != null) {
						_this1.zip_gverts = false;
						_this1.validate_lverts();
						let _this = _this1.body;
						if(_this.zip_axis) {
							_this.zip_axis = false;
							_this.axisx = Math.sin(_this.rot);
							_this.axisy = Math.cos(_this.rot);
						}
						let li = _this1.lverts.next;
						let cx_ite = _this1.gverts.next;
						while(cx_ite != null) {
							let g = cx_ite;
							let l = li;
							li = li.next;
							g.x = _this1.body.posx + (_this1.body.axisy * l.x - _this1.body.axisx * l.y);
							g.y = _this1.body.posy + (l.x * _this1.body.axisx + l.y * _this1.body.axisy);
							cx_ite = cx_ite.next;
						}
					}
				}
				let ite = _this1.edges.head;
				let cx_ite = _this1.gverts.next;
				let u = cx_ite;
				cx_ite = cx_ite.next;
				while(cx_ite != null) {
					let v = cx_ite;
					let e = ite.elt;
					ite = ite.next;
					e.gp0 = u;
					e.gp1 = v;
					e.gnormx = _this1.body.axisy * e.lnormx - _this1.body.axisx * e.lnormy;
					e.gnormy = e.lnormx * _this1.body.axisx + e.lnormy * _this1.body.axisy;
					e.gprojection = _this1.body.posx * e.gnormx + _this1.body.posy * e.gnormy + e.lprojection;
					if(e.wrap_gnorm != null) {
						e.wrap_gnorm.zpp_inner.x = e.gnormx;
						e.wrap_gnorm.zpp_inner.y = e.gnormy;
					}
					e.tp0 = e.gp0.y * e.gnormx - e.gp0.x * e.gnormy;
					e.tp1 = e.gp1.y * e.gnormx - e.gp1.x * e.gnormy;
					u = v;
					cx_ite = cx_ite.next;
				}
				let v = _this1.gverts.next;
				let e = ite.elt;
				ite = ite.next;
				e.gp0 = u;
				e.gp1 = v;
				e.gnormx = _this1.body.axisy * e.lnormx - _this1.body.axisx * e.lnormy;
				e.gnormy = e.lnormx * _this1.body.axisx + e.lnormy * _this1.body.axisy;
				e.gprojection = _this1.body.posx * e.gnormx + _this1.body.posy * e.gnormy + e.lprojection;
				if(e.wrap_gnorm != null) {
					e.wrap_gnorm.zpp_inner.x = e.gnormx;
					e.wrap_gnorm.zpp_inner.y = e.gnormy;
				}
				e.tp0 = e.gp0.y * e.gnormx - e.gp0.x * e.gnormy;
				e.tp1 = e.gp1.y * e.gnormx - e.gp1.x * e.gnormy;
			}
		}
	}
	shapesInAABB(aabb,strict,containment,filter,output) {
		return null;
	}
	bodiesInAABB(aabb,strict,containment,filter,output) {
		return null;
	}
	updateCircShape(x,y,r) {
		if(this.circShape == null) {
			if(ZPP_Flags.BodyType_STATIC == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.BodyType_STATIC = new BodyType();
				ZPP_Flags.internal = false;
			}
			let body = new Body(ZPP_Flags.BodyType_STATIC);
			let _this = body.zpp_inner.wrap_shapes;
			let x1 = x;
			let y1 = y;
			if(y1 == null) {
				y1 = 0;
			}
			if(x1 == null) {
				x1 = 0;
			}
			if(x1 != x1 || y1 != y1) {
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
				ret1.x = x1;
				ret1.y = y1;
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
				if(x1 != x1 || y1 != y1) {
					throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
				}
				let obj;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = ret.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				if(ret.zpp_inner.x == x1) {
					if(ret != null && ret.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this = ret.zpp_inner;
					if(_this._validate != null) {
						_this._validate();
					}
					obj = ret.zpp_inner.y == y1;
				} else {
					obj = false;
				}
				if(!obj) {
					ret.zpp_inner.x = x1;
					ret.zpp_inner.y = y1;
					let _this = ret.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
			}
			ret.zpp_inner.weak = false;
			let obj = this.circShape = new Circle(r,ret);
			if(_this.zpp_inner.reverse_flag) {
				_this.push(obj);
			} else {
				_this.unshift(obj);
			}
		} else {
			let ci = this.circShape.zpp_inner.circle;
			let ss = r / ci.radius;
			if(this.matrix == null) {
				this.matrix = new Mat23();
			}
			let _this = this.matrix;
			let _this1 = this.matrix;
			if(ss != ss) {
				throw haxe_Exception.thrown("Error: Mat23::" + "d" + " cannot be NaN");
			}
			_this1.zpp_inner.d = ss;
			let _this2 = _this1.zpp_inner;
			if(_this2._invalidate != null) {
				_this2._invalidate();
			}
			let a = _this1.zpp_inner.d;
			if(a != a) {
				throw haxe_Exception.thrown("Error: Mat23::" + "a" + " cannot be NaN");
			}
			_this.zpp_inner.a = a;
			let _this3 = _this.zpp_inner;
			if(_this3._invalidate != null) {
				_this3._invalidate();
			}
			let _this4 = this.matrix;
			let _this5 = this.matrix;
			_this5.zpp_inner.c = 0;
			let _this6 = _this5.zpp_inner;
			if(_this6._invalidate != null) {
				_this6._invalidate();
			}
			let b = _this5.zpp_inner.c;
			if(b != b) {
				throw haxe_Exception.thrown("Error: Mat23::" + "b" + " cannot be NaN");
			}
			_this4.zpp_inner.b = b;
			let _this7 = _this4.zpp_inner;
			if(_this7._invalidate != null) {
				_this7._invalidate();
			}
			let _this8 = this.matrix;
			let tx = x - ss * ci.localCOMx;
			if(tx != tx) {
				throw haxe_Exception.thrown("Error: Mat23::" + "tx" + " cannot be NaN");
			}
			_this8.zpp_inner.tx = tx;
			let _this9 = _this8.zpp_inner;
			if(_this9._invalidate != null) {
				_this9._invalidate();
			}
			let _this10 = this.matrix;
			let ty = y - ss * ci.localCOMy;
			if(ty != ty) {
				throw haxe_Exception.thrown("Error: Mat23::" + "ty" + " cannot be NaN");
			}
			_this10.zpp_inner.ty = ty;
			let _this11 = _this10.zpp_inner;
			if(_this11._invalidate != null) {
				_this11._invalidate();
			}
			this.circShape.transform(this.matrix);
		}
		let _this = this.circShape.zpp_inner;
		if(_this.zip_aabb) {
			if(_this.body != null) {
				_this.zip_aabb = false;
				if(_this.type == ZPP_Flags.id_ShapeType_CIRCLE) {
					let _this1 = _this.circle;
					if(_this1.zip_worldCOM) {
						if(_this1.body != null) {
							_this1.zip_worldCOM = false;
							if(_this1.zip_localCOM) {
								_this1.zip_localCOM = false;
								if(_this1.type == ZPP_Flags.id_ShapeType_POLYGON) {
									let _this = _this1.polygon;
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
								if(_this1.wrap_localCOM != null) {
									_this1.wrap_localCOM.zpp_inner.x = _this1.localCOMx;
									_this1.wrap_localCOM.zpp_inner.y = _this1.localCOMy;
								}
							}
							let _this = _this1.body;
							if(_this.zip_axis) {
								_this.zip_axis = false;
								_this.axisx = Math.sin(_this.rot);
								_this.axisy = Math.cos(_this.rot);
							}
							_this1.worldCOMx = _this1.body.posx + (_this1.body.axisy * _this1.localCOMx - _this1.body.axisx * _this1.localCOMy);
							_this1.worldCOMy = _this1.body.posy + (_this1.localCOMx * _this1.body.axisx + _this1.localCOMy * _this1.body.axisy);
						}
					}
					let rx = _this1.radius;
					let ry = _this1.radius;
					_this1.aabb.minx = _this1.worldCOMx - rx;
					_this1.aabb.miny = _this1.worldCOMy - ry;
					_this1.aabb.maxx = _this1.worldCOMx + rx;
					_this1.aabb.maxy = _this1.worldCOMy + ry;
				} else {
					let _this1 = _this.polygon;
					if(_this1.zip_gverts) {
						if(_this1.body != null) {
							_this1.zip_gverts = false;
							_this1.validate_lverts();
							let _this = _this1.body;
							if(_this.zip_axis) {
								_this.zip_axis = false;
								_this.axisx = Math.sin(_this.rot);
								_this.axisy = Math.cos(_this.rot);
							}
							let li = _this1.lverts.next;
							let cx_ite = _this1.gverts.next;
							while(cx_ite != null) {
								let g = cx_ite;
								let l = li;
								li = li.next;
								g.x = _this1.body.posx + (_this1.body.axisy * l.x - _this1.body.axisx * l.y);
								g.y = _this1.body.posy + (l.x * _this1.body.axisx + l.y * _this1.body.axisy);
								cx_ite = cx_ite.next;
							}
						}
					}
					if(_this1.lverts.next == null) {
						throw haxe_Exception.thrown("Error: An empty polygon has no meaningful bounds");
					}
					let p0 = _this1.gverts.next;
					_this1.aabb.minx = p0.x;
					_this1.aabb.miny = p0.y;
					_this1.aabb.maxx = p0.x;
					_this1.aabb.maxy = p0.y;
					let cx_ite = _this1.gverts.next.next;
					while(cx_ite != null) {
						let p = cx_ite;
						if(p.x < _this1.aabb.minx) {
							_this1.aabb.minx = p.x;
						}
						if(p.x > _this1.aabb.maxx) {
							_this1.aabb.maxx = p.x;
						}
						if(p.y < _this1.aabb.miny) {
							_this1.aabb.miny = p.y;
						}
						if(p.y > _this1.aabb.maxy) {
							_this1.aabb.maxy = p.y;
						}
						cx_ite = cx_ite.next;
					}
				}
			}
		}
	}
	shapesInCircle(x,y,r,containment,filter,output) {
		return null;
	}
	bodiesInCircle(x,y,r,containment,filter,output) {
		return null;
	}
	validateShape(s) {
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
	shapesInShape(shape,containment,filter,output) {
		return null;
	}
	bodiesInShape(shape,containment,filter,output) {
		return null;
	}
	rayCast(ray,inner,filter) {
		return null;
	}
	rayMultiCast(ray,inner,filter,output) {
		return null;
	}
}
ZPP_Broadphase._hx_skip_constructor = false;
