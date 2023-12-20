import ZPP_PubPool from './ZPP_PubPool.js';
import ZNPList_ZPP_Compound from './ZNPList_ZPP_Compound.js';
import ZPP_Debug from './ZPP_Debug.js';
import ZPP_Vec2 from '../geom/ZPP_Vec2.js';
import ZPP_SpaceArbiterList from '../dynamics/ZPP_SpaceArbiterList.js';
import ZPP_Arbiter from '../dynamics/ZPP_Arbiter.js';
import ZPP_Flags from './ZPP_Flags.js';
import Vec2 from '../../nape/geom/Vec2.js';
import ArbiterIterator from '../../nape/dynamics/ArbiterIterator.js';
import Graphics from '../../nape/debug/Graphics.js';
export default class ZPP_ShapeDebug extends ZPP_Debug {
	constructor(width,height) {
		ZPP_Debug._hx_skip_constructor = true;
		super();
		ZPP_Debug._hx_skip_constructor = false;
		this._hx_constructor(width,height);
	}
	_hx_constructor(width,height) {
		this.bodyList = null;
		this.shapeList = null;
		this.compoundstack = null;
		this.graphics = null;
		this.shape = null;
		this.outer_zn = null;
		super._hx_constructor(width,height);
		this.shape = Graphics.createGraphics();
		this.graphics = this.shape;
		this.isbmp = false;
		this.d_shape = this;
	}
	setbg(bgColor) {
		this.sup_setbg(bgColor);
	}
	draw_compound(compound,xform,xdet,xnull) {
		let cx_ite = compound.compounds.head;
		while(cx_ite != null) {
			let c = cx_ite.elt;
			this.draw_compound(c,xform,xdet,xnull);
			cx_ite = cx_ite.next;
		}
		let cx_ite1 = compound.bodies.head;
		while(cx_ite1 != null) {
			let b = cx_ite1.elt;
			if(b.outer.debugDraw) {
				this.draw_body(b,xform,xdet,xnull);
			}
			cx_ite1 = cx_ite1.next;
		}
		let cx_ite2 = compound.constraints.head;
		while(cx_ite2 != null) {
			let c = cx_ite2.elt;
			if(c.active && c.outer.debugDraw) {
				c.draw(this.outer);
			}
			cx_ite2 = cx_ite2.next;
		}
	}
	draw_space(space,xform,xdet,xnull) {
		if(this.outer.cullingEnabled) {
			if(this.outer.drawBodies) {
				if(this.outer.drawBodyDetail) {
					let bods = this.bodyList = space.bphase.bodiesInAABB(this.iport,false,false,null,this.bodyList);
					while(bods.zpp_inner.inner.head != null) {
						let b = bods.shift();
						if(b.debugDraw) {
							this.draw_body(b.zpp_inner,xform,xdet,xnull);
						}
					}
				} else {
					let shapes = this.shapeList = space.bphase.shapesInAABB(this.iport,false,false,null,this.shapeList);
					while(shapes.zpp_inner.inner.head != null) {
						let s = shapes.shift();
						if((s.zpp_inner.body != null ? s.zpp_inner.body.outer : null).debugDraw) {
							this.draw_shape(s.zpp_inner,xform,xdet,xnull);
						}
					}
				}
			}
		} else if(this.outer.drawBodies) {
			if(this.compoundstack == null) {
				this.compoundstack = new ZNPList_ZPP_Compound();
			}
			let cx_ite = space.bodies.head;
			while(cx_ite != null) {
				let b = cx_ite.elt;
				if(b.outer.debugDraw) {
					this.draw_body(b,xform,xdet,xnull);
				}
				cx_ite = cx_ite.next;
			}
			let cx_ite1 = space.compounds.head;
			while(cx_ite1 != null) {
				let c = cx_ite1.elt;
				this.compoundstack.add(c);
				cx_ite1 = cx_ite1.next;
			}
			while(this.compoundstack.head != null) {
				let x = this.compoundstack.pop_unsafe();
				let cx_ite = x.bodies.head;
				while(cx_ite != null) {
					let b = cx_ite.elt;
					if(b.outer.debugDraw) {
						this.draw_body(b,xform,xdet,xnull);
					}
					cx_ite = cx_ite.next;
				}
				let cx_ite1 = x.compounds.head;
				while(cx_ite1 != null) {
					let c = cx_ite1.elt;
					this.compoundstack.add(c);
					cx_ite1 = cx_ite1.next;
				}
			}
		}
		if(this.outer.drawCollisionArbiters || this.outer.drawFluidArbiters || this.outer.drawSensorArbiters) {
			let _this = space.outer;
			if(_this.zpp_inner.wrap_arbiters == null) {
				let ret = new ZPP_SpaceArbiterList();
				ret.space = _this.zpp_inner;
				_this.zpp_inner.wrap_arbiters = ret;
			}
			let _g = _this.zpp_inner.wrap_arbiters.iterator();
			while(true) {
				_g.zpp_inner.zpp_inner.valmod();
				let length = _g.zpp_inner.zpp_gl();
				_g.zpp_critical = true;
				let tmp;
				if(_g.zpp_i < length) {
					tmp = true;
				} else {
					_g.zpp_next = ArbiterIterator.zpp_pool;
					ArbiterIterator.zpp_pool = _g;
					_g.zpp_inner = null;
					tmp = false;
				}
				if(!tmp) {
					break;
				}
				_g.zpp_critical = false;
				let arb = _g.zpp_inner.at(_g.zpp_i++);
				this.draw_arbiter(arb.zpp_inner,xform,xdet,xnull);
			}
		}
		if(this.outer.drawConstraints) {
			if(this.compoundstack == null) {
				this.compoundstack = new ZNPList_ZPP_Compound();
			}
			let cx_ite = space.constraints.head;
			while(cx_ite != null) {
				let c = cx_ite.elt;
				if(c.active && c.outer.debugDraw) {
					c.draw(this.outer);
				}
				cx_ite = cx_ite.next;
			}
			let cx_ite1 = space.compounds.head;
			while(cx_ite1 != null) {
				let c = cx_ite1.elt;
				this.compoundstack.add(c);
				cx_ite1 = cx_ite1.next;
			}
			while(this.compoundstack.head != null) {
				let x = this.compoundstack.pop_unsafe();
				let cx_ite = x.constraints.head;
				while(cx_ite != null) {
					let c = cx_ite.elt;
					if(c.active && c.outer.debugDraw) {
						c.draw(this.outer);
					}
					cx_ite = cx_ite.next;
				}
				let cx_ite1 = x.compounds.head;
				while(cx_ite1 != null) {
					let c = cx_ite1.elt;
					this.compoundstack.add(c);
					cx_ite1 = cx_ite1.next;
				}
			}
		}
	}
	draw_body(body,xform,xdet,xnull) {
		let cx_ite = body.shapes.head;
		while(cx_ite != null) {
			let s = cx_ite.elt;
			this.draw_shape(s,xform,xdet,xnull);
			cx_ite = cx_ite.next;
		}
		if(this.outer.drawBodyDetail) {
			let idc;
			if(this.outer.colour == null) {
				idc = 16777215 * Math.exp(-(body.id % 500) / 1500) | 0;
			} else {
				idc = this.outer.colour(body.id);
			}
			let _r = ((idc & 16711680) >> 16) * 0.7;
			let _g = ((idc & 65280) >> 8) * 0.7;
			let _b = (idc & 255) * 0.7;
			let tmp;
			if(body.space != null) {
				let _this = body.outer;
				if(_this.zpp_inner.space == null) {
					throw haxe_Exception.thrown("Error: isSleeping makes no sense if the object is not contained within a Space");
				}
				tmp = _this.zpp_inner.component.sleeping;
			} else {
				tmp = false;
			}
			if(tmp) {
				_r = 0.4 * _r + 0.6 * this.bg_r;
				_g = 0.4 * _g + 0.6 * this.bg_g;
				_b = 0.4 * _b + 0.6 * this.bg_b;
			}
			let col = -16777216 | (_r | 0) << 16 | (_g | 0) << 8 | (_b | 0);
			let col1 = col;
			let ncol = 16711680;
			let f = 0.8;
			let _r1 = (col1 >> 16 & 255) * f + (ncol >> 16 & 255) * (1 - f) | 0;
			let _g1 = (col1 >> 8 & 255) * f + (ncol >> 8 & 255) * (1 - f) | 0;
			let _b1 = (col1 & 255) * f + (ncol & 255) * (1 - f) | 0;
			this.graphics.lineStyle(this.outer_zn.thickness,-16777216 | _r1 << 16 | _g1 << 8 | _b1,1);
			let px = 0.0;
			let py = 0.0;
			let qx = 0.0;
			let qy = 0.0;
			if(body.shapes.head != null) {
				body.validate_worldCOM();
				if(xnull) {
					px = body.worldCOMx;
					py = body.worldCOMy;
				} else {
					px = xform.a * body.worldCOMx + xform.b * body.worldCOMy + xform.tx;
					py = xform.c * body.worldCOMx + xform.d * body.worldCOMy + xform.ty;
				}
				this.graphics.drawCircle(px,py,1);
				if(body.shapes.head == null) {
					throw haxe_Exception.thrown("Error: Body bounds only makes sense if it contains shapes");
				}
				if(body.zip_aabb) {
					body.zip_aabb = false;
					body.aabb.minx = Infinity;
					body.aabb.miny = Infinity;
					body.aabb.maxx = -Infinity;
					body.aabb.maxy = -Infinity;
					let cx_ite = body.shapes.head;
					while(cx_ite != null) {
						let s = cx_ite.elt;
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
						let _this = body.aabb;
						let x = s.aabb;
						if(x.minx < _this.minx) {
							_this.minx = x.minx;
						}
						if(x.maxx > _this.maxx) {
							_this.maxx = x.maxx;
						}
						if(x.miny < _this.miny) {
							_this.miny = x.miny;
						}
						if(x.maxy > _this.maxy) {
							_this.maxy = x.maxy;
						}
						cx_ite = cx_ite.next;
					}
				}
				if(xnull) {
					let _this = body.aabb;
					let _this1 = body.aabb;
					this.graphics.drawRect(body.aabb.minx,body.aabb.miny,_this.maxx - _this.minx,_this1.maxy - _this1.miny);
				} else {
					let ox = 0.0;
					let oy = 0.0;
					ox = xform.a * body.aabb.minx + xform.b * body.aabb.miny + xform.tx;
					oy = xform.c * body.aabb.minx + xform.d * body.aabb.miny + xform.ty;
					let _this = body.aabb;
					let wx = _this.maxx - _this.minx;
					let wy = 0;
					let t = xform.a * wx + xform.b * wy;
					wy = xform.c * wx + xform.d * wy;
					wx = t;
					let hx = 0;
					let _this1 = body.aabb;
					let hy = _this1.maxy - _this1.miny;
					let t1 = xform.a * hx + xform.b * hy;
					hy = xform.c * hx + xform.d * hy;
					hx = t1;
					this.graphics.moveTo(ox,oy);
					this.graphics.lineTo(ox + wx,oy + wy);
					this.graphics.lineTo(ox + wx + hx,oy + wy + hy);
					this.graphics.lineTo(ox + hx,oy + hy);
					this.graphics.lineTo(ox,oy);
				}
			}
			if(xnull) {
				qx = body.pre_posx;
				qy = body.pre_posy;
			} else {
				qx = xform.a * body.pre_posx + xform.b * body.pre_posy + xform.tx;
				qy = xform.c * body.pre_posx + xform.d * body.pre_posy + xform.ty;
			}
			if(xnull) {
				px = body.posx;
				py = body.posy;
			} else {
				px = xform.a * body.posx + xform.b * body.posy + xform.tx;
				py = xform.c * body.posx + xform.d * body.posy + xform.ty;
			}
			this.graphics.moveTo(qx,qy);
			this.graphics.lineTo(px,py);
			this.graphics.drawCircle(px,py,1);
		}
	}
	draw_shape(shape,xform,xdet,xnull) {
		let idc;
		if(this.outer.colour == null) {
			idc = 16777215 * Math.exp(-(shape.id % 500) / 1500) | 0;
		} else {
			idc = this.outer.colour(shape.id);
		}
		let _r = ((idc & 16711680) >> 16) * 0.7;
		let _g = ((idc & 65280) >> 8) * 0.7;
		let _b = (idc & 255) * 0.7;
		let col = -16777216 | (_r | 0) << 16 | (_g | 0) << 8 | (_b | 0);
		let body = shape.body;
		if(body != null) {
			let idc;
			if(this.outer.colour == null) {
				idc = 16777215 * Math.exp(-(body.id % 500) / 1500) | 0;
			} else {
				idc = this.outer.colour(body.id);
			}
			let _r = ((idc & 16711680) >> 16) * 0.7;
			let _g = ((idc & 65280) >> 8) * 0.7;
			let _b = (idc & 255) * 0.7;
			let tmp;
			if(body.space != null) {
				let _this = body.outer;
				if(_this.zpp_inner.space == null) {
					throw haxe_Exception.thrown("Error: isSleeping makes no sense if the object is not contained within a Space");
				}
				tmp = _this.zpp_inner.component.sleeping;
			} else {
				tmp = false;
			}
			if(tmp) {
				_r = 0.4 * _r + 0.6 * this.bg_r;
				_g = 0.4 * _g + 0.6 * this.bg_g;
				_b = 0.4 * _b + 0.6 * this.bg_b;
			}
			let bcol = -16777216 | (_r | 0) << 16 | (_g | 0) << 8 | (_b | 0);
			let col1 = col;
			let ncol = bcol;
			let f = 0.2;
			let _r1 = (col1 >> 16 & 255) * f + (ncol >> 16 & 255) * (1 - f) | 0;
			let _g1 = (col1 >> 8 & 255) * f + (ncol >> 8 & 255) * (1 - f) | 0;
			let _b1 = (col1 & 255) * f + (ncol & 255) * (1 - f) | 0;
			col = -16777216 | _r1 << 16 | _g1 << 8 | _b1;
			this.graphics.lineStyle(this.outer_zn.thickness,col,1.0);
			if(shape.type == ZPP_Flags.id_ShapeType_CIRCLE) {
				let circ = shape.circle;
				if(circ.zip_worldCOM) {
					if(circ.body != null) {
						circ.zip_worldCOM = false;
						if(circ.zip_localCOM) {
							circ.zip_localCOM = false;
							if(circ.type == ZPP_Flags.id_ShapeType_POLYGON) {
								let _this = circ.polygon;
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
							if(circ.wrap_localCOM != null) {
								circ.wrap_localCOM.zpp_inner.x = circ.localCOMx;
								circ.wrap_localCOM.zpp_inner.y = circ.localCOMy;
							}
						}
						let _this = circ.body;
						if(_this.zip_axis) {
							_this.zip_axis = false;
							_this.axisx = Math.sin(_this.rot);
							_this.axisy = Math.cos(_this.rot);
						}
						circ.worldCOMx = circ.body.posx + (circ.body.axisy * circ.localCOMx - circ.body.axisx * circ.localCOMy);
						circ.worldCOMy = circ.body.posy + (circ.localCOMx * circ.body.axisx + circ.localCOMy * circ.body.axisy);
					}
				}
				let vx = circ.worldCOMx;
				let vy = circ.worldCOMy;
				if(!xnull) {
					let t = xform.a * vx + xform.b * vy + xform.tx;
					vy = xform.c * vx + xform.d * vy + xform.ty;
					vx = t;
				}
				this.graphics.drawCircle(vx,vy,circ.radius * xdet);
				if(this.outer.drawShapeAngleIndicators) {
					let v0x = circ.worldCOMx + 0.3 * circ.radius * body.axisy;
					let v0y = circ.worldCOMy + 0.3 * circ.radius * body.axisx;
					let v1x = circ.worldCOMx + circ.radius * body.axisy;
					let v1y = circ.worldCOMy + circ.radius * body.axisx;
					if(!xnull) {
						let t = xform.a * v0x + xform.b * v0y + xform.tx;
						v0y = xform.c * v0x + xform.d * v0y + xform.ty;
						v0x = t;
					}
					if(!xnull) {
						let t = xform.a * v1x + xform.b * v1y + xform.tx;
						v1y = xform.c * v1x + xform.d * v1y + xform.ty;
						v1x = t;
					}
					this.graphics.moveTo(v0x,v0y);
					this.graphics.lineTo(v1x,v1y);
				}
			} else {
				let poly = shape.polygon;
				if(poly.zip_gverts) {
					if(poly.body != null) {
						poly.zip_gverts = false;
						poly.validate_lverts();
						let _this = poly.body;
						if(_this.zip_axis) {
							_this.zip_axis = false;
							_this.axisx = Math.sin(_this.rot);
							_this.axisy = Math.cos(_this.rot);
						}
						let li = poly.lverts.next;
						let cx_ite = poly.gverts.next;
						while(cx_ite != null) {
							let g = cx_ite;
							let l = li;
							li = li.next;
							g.x = poly.body.posx + (poly.body.axisy * l.x - poly.body.axisx * l.y);
							g.y = poly.body.posy + (l.x * poly.body.axisx + l.y * poly.body.axisy);
							cx_ite = cx_ite.next;
						}
					}
				}
				let u = poly.gverts.next;
				let vx = u.x;
				let vy = u.y;
				if(!xnull) {
					let t = xform.a * vx + xform.b * vy + xform.tx;
					vy = xform.c * vx + xform.d * vy + xform.ty;
					vx = t;
				}
				this.graphics.moveTo(vx,vy);
				let vox = vx;
				let voy = vy;
				let cx_ite = poly.gverts.next.next;
				while(cx_ite != null) {
					let u = cx_ite;
					vx = u.x;
					vy = u.y;
					if(!xnull) {
						let t = xform.a * vx + xform.b * vy + xform.tx;
						vy = xform.c * vx + xform.d * vy + xform.ty;
						vx = t;
					}
					this.graphics.lineTo(vx,vy);
					cx_ite = cx_ite.next;
				}
				this.graphics.lineTo(vox,voy);
				if(this.outer.drawShapeAngleIndicators) {
					if(poly.zip_worldCOM) {
						if(poly.body != null) {
							poly.zip_worldCOM = false;
							if(poly.zip_localCOM) {
								poly.zip_localCOM = false;
								if(poly.type == ZPP_Flags.id_ShapeType_POLYGON) {
									let _this = poly.polygon;
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
								if(poly.wrap_localCOM != null) {
									poly.wrap_localCOM.zpp_inner.x = poly.localCOMx;
									poly.wrap_localCOM.zpp_inner.y = poly.localCOMy;
								}
							}
							let _this = poly.body;
							if(_this.zip_axis) {
								_this.zip_axis = false;
								_this.axisx = Math.sin(_this.rot);
								_this.axisy = Math.cos(_this.rot);
							}
							poly.worldCOMx = poly.body.posx + (poly.body.axisy * poly.localCOMx - poly.body.axisx * poly.localCOMy);
							poly.worldCOMy = poly.body.posy + (poly.localCOMx * poly.body.axisx + poly.localCOMy * poly.body.axisy);
						}
					}
					if(xnull) {
						vx = poly.worldCOMx;
						vy = poly.worldCOMy;
					} else {
						vx = xform.a * poly.worldCOMx + xform.b * poly.worldCOMy + xform.tx;
						vy = xform.c * poly.worldCOMx + xform.d * poly.worldCOMy + xform.ty;
					}
					this.graphics.moveTo(vx,vy);
					this.graphics.lineTo(vox,voy);
				}
			}
			if(this.outer.drawShapeDetail) {
				if(shape.zip_worldCOM) {
					if(shape.body != null) {
						shape.zip_worldCOM = false;
						if(shape.zip_localCOM) {
							shape.zip_localCOM = false;
							if(shape.type == ZPP_Flags.id_ShapeType_POLYGON) {
								let _this = shape.polygon;
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
							if(shape.wrap_localCOM != null) {
								shape.wrap_localCOM.zpp_inner.x = shape.localCOMx;
								shape.wrap_localCOM.zpp_inner.y = shape.localCOMy;
							}
						}
						let _this = shape.body;
						if(_this.zip_axis) {
							_this.zip_axis = false;
							_this.axisx = Math.sin(_this.rot);
							_this.axisy = Math.cos(_this.rot);
						}
						shape.worldCOMx = shape.body.posx + (shape.body.axisy * shape.localCOMx - shape.body.axisx * shape.localCOMy);
						shape.worldCOMy = shape.body.posy + (shape.localCOMx * shape.body.axisx + shape.localCOMy * shape.body.axisy);
					}
				}
				let col1 = col;
				let ncol = 16711680;
				let f = 0.8;
				let _r = (col1 >> 16 & 255) * f + (ncol >> 16 & 255) * (1 - f) | 0;
				let _g = (col1 >> 8 & 255) * f + (ncol >> 8 & 255) * (1 - f) | 0;
				let _b = (col1 & 255) * f + (ncol & 255) * (1 - f) | 0;
				this.graphics.lineStyle(this.outer_zn.thickness,-16777216 | _r << 16 | _g << 8 | _b,1);
				let vx = 0.0;
				let vy = 0.0;
				if(xnull) {
					vx = shape.worldCOMx;
					vy = shape.worldCOMy;
				} else {
					vx = xform.a * shape.worldCOMx + xform.b * shape.worldCOMy + xform.tx;
					vy = xform.c * shape.worldCOMx + xform.d * shape.worldCOMy + xform.ty;
				}
				this.graphics.drawCircle(vx,vy,1);
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
				if(xnull) {
					let _this = shape.aabb;
					let _this1 = shape.aabb;
					this.graphics.drawRect(shape.aabb.minx,shape.aabb.miny,_this.maxx - _this.minx,_this1.maxy - _this1.miny);
				} else {
					let ox = 0.0;
					let oy = 0.0;
					ox = xform.a * shape.aabb.minx + xform.b * shape.aabb.miny + xform.tx;
					oy = xform.c * shape.aabb.minx + xform.d * shape.aabb.miny + xform.ty;
					let _this = shape.aabb;
					let wx = _this.maxx - _this.minx;
					let wy = 0;
					let t = xform.a * wx + xform.b * wy;
					wy = xform.c * wx + xform.d * wy;
					wx = t;
					let hx = 0;
					let _this1 = shape.aabb;
					let hy = _this1.maxy - _this1.miny;
					let t1 = xform.a * hx + xform.b * hy;
					hy = xform.c * hx + xform.d * hy;
					hx = t1;
					this.graphics.moveTo(ox,oy);
					this.graphics.lineTo(ox + wx,oy + wy);
					this.graphics.lineTo(ox + wx + hx,oy + wy + hy);
					this.graphics.lineTo(ox + hx,oy + hy);
					this.graphics.lineTo(ox,oy);
				}
			}
		}
	}
	draw_arbiter(arb,xform,xdet,xnull) {
		let vx = 0.0;
		let vy = 0.0;
		if(arb.outer.zpp_inner.type == ZPP_Arbiter.SENSOR) {
			if(this.outer.drawSensorArbiters) {
				let sarb = arb.outer;
				let col = 65280;
				let ncol = ~this.bg_col;
				let f = 0.7;
				let _r = (col >> 16 & 255) * f + (ncol >> 16 & 255) * (1 - f) | 0;
				let _g = (col >> 8 & 255) * f + (ncol >> 8 & 255) * (1 - f) | 0;
				let _b = (col & 255) * f + (ncol & 255) * (1 - f) | 0;
				this.graphics.lineStyle(this.outer_zn.thickness,-16777216 | _r << 16 | _g << 8 | _b,1);
				if(xnull) {
					if(!sarb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					let _this = sarb.zpp_inner.ws1.id > sarb.zpp_inner.ws2.id ? sarb.zpp_inner.ws2.outer : sarb.zpp_inner.ws1.outer;
					if(_this.zpp_inner.wrap_worldCOM == null) {
						let x = _this.zpp_inner.worldCOMx;
						let y = _this.zpp_inner.worldCOMy;
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
							let vx;
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
								vx = ret.zpp_inner.y == y;
							} else {
								vx = false;
							}
							if(!vx) {
								ret.zpp_inner.x = x;
								ret.zpp_inner.y = y;
								let _this = ret.zpp_inner;
								if(_this._invalidate != null) {
									_this._invalidate(_this);
								}
							}
						}
						ret.zpp_inner.weak = false;
						_this.zpp_inner.wrap_worldCOM = ret;
						_this.zpp_inner.wrap_worldCOM.zpp_inner._inuse = true;
						_this.zpp_inner.wrap_worldCOM.zpp_inner._immutable = true;
						_this.zpp_inner.wrap_worldCOM.zpp_inner._validate = ($_=_this.zpp_inner,$bind($_,$_.getworldCOM));
					}
					let _this1 = _this.zpp_inner.wrap_worldCOM;
					if(_this1 != null && _this1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this2 = _this1.zpp_inner;
					if(_this2._validate != null) {
						_this2._validate();
					}
					vx = _this1.zpp_inner.x;
					if(!sarb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					let _this3 = sarb.zpp_inner.ws1.id > sarb.zpp_inner.ws2.id ? sarb.zpp_inner.ws2.outer : sarb.zpp_inner.ws1.outer;
					if(_this3.zpp_inner.wrap_worldCOM == null) {
						let x = _this3.zpp_inner.worldCOMx;
						let y = _this3.zpp_inner.worldCOMy;
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
							let vy;
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
								vy = ret.zpp_inner.y == y;
							} else {
								vy = false;
							}
							if(!vy) {
								ret.zpp_inner.x = x;
								ret.zpp_inner.y = y;
								let _this = ret.zpp_inner;
								if(_this._invalidate != null) {
									_this._invalidate(_this);
								}
							}
						}
						ret.zpp_inner.weak = false;
						_this3.zpp_inner.wrap_worldCOM = ret;
						_this3.zpp_inner.wrap_worldCOM.zpp_inner._inuse = true;
						_this3.zpp_inner.wrap_worldCOM.zpp_inner._immutable = true;
						_this3.zpp_inner.wrap_worldCOM.zpp_inner._validate = ($_=_this3.zpp_inner,$bind($_,$_.getworldCOM));
					}
					let _this4 = _this3.zpp_inner.wrap_worldCOM;
					if(_this4 != null && _this4.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this5 = _this4.zpp_inner;
					if(_this5._validate != null) {
						_this5._validate();
					}
					vy = _this4.zpp_inner.y;
				} else {
					let xform1 = xform.a;
					if(!sarb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					let _this = sarb.zpp_inner.ws1.id > sarb.zpp_inner.ws2.id ? sarb.zpp_inner.ws2.outer : sarb.zpp_inner.ws1.outer;
					if(_this.zpp_inner.wrap_worldCOM == null) {
						let x = _this.zpp_inner.worldCOMx;
						let y = _this.zpp_inner.worldCOMy;
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
							let vx;
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
								vx = ret.zpp_inner.y == y;
							} else {
								vx = false;
							}
							if(!vx) {
								ret.zpp_inner.x = x;
								ret.zpp_inner.y = y;
								let _this = ret.zpp_inner;
								if(_this._invalidate != null) {
									_this._invalidate(_this);
								}
							}
						}
						ret.zpp_inner.weak = false;
						_this.zpp_inner.wrap_worldCOM = ret;
						_this.zpp_inner.wrap_worldCOM.zpp_inner._inuse = true;
						_this.zpp_inner.wrap_worldCOM.zpp_inner._immutable = true;
						_this.zpp_inner.wrap_worldCOM.zpp_inner._validate = ($_=_this.zpp_inner,$bind($_,$_.getworldCOM));
					}
					let _this1 = _this.zpp_inner.wrap_worldCOM;
					if(_this1 != null && _this1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this2 = _this1.zpp_inner;
					if(_this2._validate != null) {
						_this2._validate();
					}
					let vx1 = xform1 * _this1.zpp_inner.x;
					let xform2 = xform.b;
					if(!sarb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					let _this3 = sarb.zpp_inner.ws1.id > sarb.zpp_inner.ws2.id ? sarb.zpp_inner.ws2.outer : sarb.zpp_inner.ws1.outer;
					if(_this3.zpp_inner.wrap_worldCOM == null) {
						let x = _this3.zpp_inner.worldCOMx;
						let y = _this3.zpp_inner.worldCOMy;
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
							let vx;
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
								vx = ret.zpp_inner.y == y;
							} else {
								vx = false;
							}
							if(!vx) {
								ret.zpp_inner.x = x;
								ret.zpp_inner.y = y;
								let _this = ret.zpp_inner;
								if(_this._invalidate != null) {
									_this._invalidate(_this);
								}
							}
						}
						ret.zpp_inner.weak = false;
						_this3.zpp_inner.wrap_worldCOM = ret;
						_this3.zpp_inner.wrap_worldCOM.zpp_inner._inuse = true;
						_this3.zpp_inner.wrap_worldCOM.zpp_inner._immutable = true;
						_this3.zpp_inner.wrap_worldCOM.zpp_inner._validate = ($_=_this3.zpp_inner,$bind($_,$_.getworldCOM));
					}
					let _this4 = _this3.zpp_inner.wrap_worldCOM;
					if(_this4 != null && _this4.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this5 = _this4.zpp_inner;
					if(_this5._validate != null) {
						_this5._validate();
					}
					vx = vx1 + xform2 * _this4.zpp_inner.y + xform.tx;
					let xform3 = xform.c;
					if(!sarb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					let _this6 = sarb.zpp_inner.ws1.id > sarb.zpp_inner.ws2.id ? sarb.zpp_inner.ws2.outer : sarb.zpp_inner.ws1.outer;
					if(_this6.zpp_inner.wrap_worldCOM == null) {
						let x = _this6.zpp_inner.worldCOMx;
						let y = _this6.zpp_inner.worldCOMy;
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
							let vy;
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
								vy = ret.zpp_inner.y == y;
							} else {
								vy = false;
							}
							if(!vy) {
								ret.zpp_inner.x = x;
								ret.zpp_inner.y = y;
								let _this = ret.zpp_inner;
								if(_this._invalidate != null) {
									_this._invalidate(_this);
								}
							}
						}
						ret.zpp_inner.weak = false;
						_this6.zpp_inner.wrap_worldCOM = ret;
						_this6.zpp_inner.wrap_worldCOM.zpp_inner._inuse = true;
						_this6.zpp_inner.wrap_worldCOM.zpp_inner._immutable = true;
						_this6.zpp_inner.wrap_worldCOM.zpp_inner._validate = ($_=_this6.zpp_inner,$bind($_,$_.getworldCOM));
					}
					let _this7 = _this6.zpp_inner.wrap_worldCOM;
					if(_this7 != null && _this7.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this8 = _this7.zpp_inner;
					if(_this8._validate != null) {
						_this8._validate();
					}
					let vy1 = xform3 * _this7.zpp_inner.x;
					let xform4 = xform.d;
					if(!sarb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					let _this9 = sarb.zpp_inner.ws1.id > sarb.zpp_inner.ws2.id ? sarb.zpp_inner.ws2.outer : sarb.zpp_inner.ws1.outer;
					if(_this9.zpp_inner.wrap_worldCOM == null) {
						let x = _this9.zpp_inner.worldCOMx;
						let y = _this9.zpp_inner.worldCOMy;
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
							let vy;
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
								vy = ret.zpp_inner.y == y;
							} else {
								vy = false;
							}
							if(!vy) {
								ret.zpp_inner.x = x;
								ret.zpp_inner.y = y;
								let _this = ret.zpp_inner;
								if(_this._invalidate != null) {
									_this._invalidate(_this);
								}
							}
						}
						ret.zpp_inner.weak = false;
						_this9.zpp_inner.wrap_worldCOM = ret;
						_this9.zpp_inner.wrap_worldCOM.zpp_inner._inuse = true;
						_this9.zpp_inner.wrap_worldCOM.zpp_inner._immutable = true;
						_this9.zpp_inner.wrap_worldCOM.zpp_inner._validate = ($_=_this9.zpp_inner,$bind($_,$_.getworldCOM));
					}
					let _this10 = _this9.zpp_inner.wrap_worldCOM;
					if(_this10 != null && _this10.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this11 = _this10.zpp_inner;
					if(_this11._validate != null) {
						_this11._validate();
					}
					vy = vy1 + xform4 * _this10.zpp_inner.y + xform.ty;
				}
				this.graphics.moveTo(vx,vy);
				if(xnull) {
					if(!sarb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					let _this = sarb.zpp_inner.ws1.id > sarb.zpp_inner.ws2.id ? sarb.zpp_inner.ws1.outer : sarb.zpp_inner.ws2.outer;
					if(_this.zpp_inner.wrap_worldCOM == null) {
						let x = _this.zpp_inner.worldCOMx;
						let y = _this.zpp_inner.worldCOMy;
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
							let vx;
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
								vx = ret.zpp_inner.y == y;
							} else {
								vx = false;
							}
							if(!vx) {
								ret.zpp_inner.x = x;
								ret.zpp_inner.y = y;
								let _this = ret.zpp_inner;
								if(_this._invalidate != null) {
									_this._invalidate(_this);
								}
							}
						}
						ret.zpp_inner.weak = false;
						_this.zpp_inner.wrap_worldCOM = ret;
						_this.zpp_inner.wrap_worldCOM.zpp_inner._inuse = true;
						_this.zpp_inner.wrap_worldCOM.zpp_inner._immutable = true;
						_this.zpp_inner.wrap_worldCOM.zpp_inner._validate = ($_=_this.zpp_inner,$bind($_,$_.getworldCOM));
					}
					let _this1 = _this.zpp_inner.wrap_worldCOM;
					if(_this1 != null && _this1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this2 = _this1.zpp_inner;
					if(_this2._validate != null) {
						_this2._validate();
					}
					vx = _this1.zpp_inner.x;
					if(!sarb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					let _this3 = sarb.zpp_inner.ws1.id > sarb.zpp_inner.ws2.id ? sarb.zpp_inner.ws1.outer : sarb.zpp_inner.ws2.outer;
					if(_this3.zpp_inner.wrap_worldCOM == null) {
						let x = _this3.zpp_inner.worldCOMx;
						let y = _this3.zpp_inner.worldCOMy;
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
							let vy;
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
								vy = ret.zpp_inner.y == y;
							} else {
								vy = false;
							}
							if(!vy) {
								ret.zpp_inner.x = x;
								ret.zpp_inner.y = y;
								let _this = ret.zpp_inner;
								if(_this._invalidate != null) {
									_this._invalidate(_this);
								}
							}
						}
						ret.zpp_inner.weak = false;
						_this3.zpp_inner.wrap_worldCOM = ret;
						_this3.zpp_inner.wrap_worldCOM.zpp_inner._inuse = true;
						_this3.zpp_inner.wrap_worldCOM.zpp_inner._immutable = true;
						_this3.zpp_inner.wrap_worldCOM.zpp_inner._validate = ($_=_this3.zpp_inner,$bind($_,$_.getworldCOM));
					}
					let _this4 = _this3.zpp_inner.wrap_worldCOM;
					if(_this4 != null && _this4.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this5 = _this4.zpp_inner;
					if(_this5._validate != null) {
						_this5._validate();
					}
					vy = _this4.zpp_inner.y;
				} else {
					let xform1 = xform.a;
					if(!sarb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					let _this = sarb.zpp_inner.ws1.id > sarb.zpp_inner.ws2.id ? sarb.zpp_inner.ws1.outer : sarb.zpp_inner.ws2.outer;
					if(_this.zpp_inner.wrap_worldCOM == null) {
						let x = _this.zpp_inner.worldCOMx;
						let y = _this.zpp_inner.worldCOMy;
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
							let vx;
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
								vx = ret.zpp_inner.y == y;
							} else {
								vx = false;
							}
							if(!vx) {
								ret.zpp_inner.x = x;
								ret.zpp_inner.y = y;
								let _this = ret.zpp_inner;
								if(_this._invalidate != null) {
									_this._invalidate(_this);
								}
							}
						}
						ret.zpp_inner.weak = false;
						_this.zpp_inner.wrap_worldCOM = ret;
						_this.zpp_inner.wrap_worldCOM.zpp_inner._inuse = true;
						_this.zpp_inner.wrap_worldCOM.zpp_inner._immutable = true;
						_this.zpp_inner.wrap_worldCOM.zpp_inner._validate = ($_=_this.zpp_inner,$bind($_,$_.getworldCOM));
					}
					let _this1 = _this.zpp_inner.wrap_worldCOM;
					if(_this1 != null && _this1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this2 = _this1.zpp_inner;
					if(_this2._validate != null) {
						_this2._validate();
					}
					let vx1 = xform1 * _this1.zpp_inner.x;
					let xform2 = xform.b;
					if(!sarb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					let _this3 = sarb.zpp_inner.ws1.id > sarb.zpp_inner.ws2.id ? sarb.zpp_inner.ws1.outer : sarb.zpp_inner.ws2.outer;
					if(_this3.zpp_inner.wrap_worldCOM == null) {
						let x = _this3.zpp_inner.worldCOMx;
						let y = _this3.zpp_inner.worldCOMy;
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
							let vx;
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
								vx = ret.zpp_inner.y == y;
							} else {
								vx = false;
							}
							if(!vx) {
								ret.zpp_inner.x = x;
								ret.zpp_inner.y = y;
								let _this = ret.zpp_inner;
								if(_this._invalidate != null) {
									_this._invalidate(_this);
								}
							}
						}
						ret.zpp_inner.weak = false;
						_this3.zpp_inner.wrap_worldCOM = ret;
						_this3.zpp_inner.wrap_worldCOM.zpp_inner._inuse = true;
						_this3.zpp_inner.wrap_worldCOM.zpp_inner._immutable = true;
						_this3.zpp_inner.wrap_worldCOM.zpp_inner._validate = ($_=_this3.zpp_inner,$bind($_,$_.getworldCOM));
					}
					let _this4 = _this3.zpp_inner.wrap_worldCOM;
					if(_this4 != null && _this4.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this5 = _this4.zpp_inner;
					if(_this5._validate != null) {
						_this5._validate();
					}
					vx = vx1 + xform2 * _this4.zpp_inner.y + xform.tx;
					let xform3 = xform.c;
					if(!sarb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					let _this6 = sarb.zpp_inner.ws1.id > sarb.zpp_inner.ws2.id ? sarb.zpp_inner.ws1.outer : sarb.zpp_inner.ws2.outer;
					if(_this6.zpp_inner.wrap_worldCOM == null) {
						let x = _this6.zpp_inner.worldCOMx;
						let y = _this6.zpp_inner.worldCOMy;
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
							let vy;
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
								vy = ret.zpp_inner.y == y;
							} else {
								vy = false;
							}
							if(!vy) {
								ret.zpp_inner.x = x;
								ret.zpp_inner.y = y;
								let _this = ret.zpp_inner;
								if(_this._invalidate != null) {
									_this._invalidate(_this);
								}
							}
						}
						ret.zpp_inner.weak = false;
						_this6.zpp_inner.wrap_worldCOM = ret;
						_this6.zpp_inner.wrap_worldCOM.zpp_inner._inuse = true;
						_this6.zpp_inner.wrap_worldCOM.zpp_inner._immutable = true;
						_this6.zpp_inner.wrap_worldCOM.zpp_inner._validate = ($_=_this6.zpp_inner,$bind($_,$_.getworldCOM));
					}
					let _this7 = _this6.zpp_inner.wrap_worldCOM;
					if(_this7 != null && _this7.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this8 = _this7.zpp_inner;
					if(_this8._validate != null) {
						_this8._validate();
					}
					let vy1 = xform3 * _this7.zpp_inner.x;
					let xform4 = xform.d;
					if(!sarb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					let _this9 = sarb.zpp_inner.ws1.id > sarb.zpp_inner.ws2.id ? sarb.zpp_inner.ws1.outer : sarb.zpp_inner.ws2.outer;
					if(_this9.zpp_inner.wrap_worldCOM == null) {
						let x = _this9.zpp_inner.worldCOMx;
						let y = _this9.zpp_inner.worldCOMy;
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
							let vy;
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
								vy = ret.zpp_inner.y == y;
							} else {
								vy = false;
							}
							if(!vy) {
								ret.zpp_inner.x = x;
								ret.zpp_inner.y = y;
								let _this = ret.zpp_inner;
								if(_this._invalidate != null) {
									_this._invalidate(_this);
								}
							}
						}
						ret.zpp_inner.weak = false;
						_this9.zpp_inner.wrap_worldCOM = ret;
						_this9.zpp_inner.wrap_worldCOM.zpp_inner._inuse = true;
						_this9.zpp_inner.wrap_worldCOM.zpp_inner._immutable = true;
						_this9.zpp_inner.wrap_worldCOM.zpp_inner._validate = ($_=_this9.zpp_inner,$bind($_,$_.getworldCOM));
					}
					let _this10 = _this9.zpp_inner.wrap_worldCOM;
					if(_this10 != null && _this10.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this11 = _this10.zpp_inner;
					if(_this11._validate != null) {
						_this11._validate();
					}
					vy = vy1 + xform4 * _this10.zpp_inner.y + xform.ty;
				}
				this.graphics.lineTo(vx,vy);
			}
		} else if(arb.outer.zpp_inner.type == ZPP_Arbiter.FLUID) {
			if(this.outer.drawFluidArbiters) {
				let _this = arb.outer;
				let farb = _this.zpp_inner.type == ZPP_Arbiter.FLUID ? _this.zpp_inner.fluidarb.outer_zn : null;
				let col = 255;
				let ncol = ~this.bg_col;
				let f = 0.7;
				let _r = (col >> 16 & 255) * f + (ncol >> 16 & 255) * (1 - f) | 0;
				let _g = (col >> 8 & 255) * f + (ncol >> 8 & 255) * (1 - f) | 0;
				let _b = (col & 255) * f + (ncol & 255) * (1 - f) | 0;
				this.graphics.lineStyle(this.outer_zn.thickness,-16777216 | _r << 16 | _g << 8 | _b,1);
				if(xnull) {
					if(!farb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					if(farb.zpp_inner.fluidarb.wrap_position == null) {
						farb.zpp_inner.fluidarb.getposition();
					}
					let _this = farb.zpp_inner.fluidarb.wrap_position;
					if(_this != null && _this.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this1 = _this.zpp_inner;
					if(_this1._validate != null) {
						_this1._validate();
					}
					vx = _this.zpp_inner.x;
					if(!farb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					if(farb.zpp_inner.fluidarb.wrap_position == null) {
						farb.zpp_inner.fluidarb.getposition();
					}
					let _this2 = farb.zpp_inner.fluidarb.wrap_position;
					if(_this2 != null && _this2.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this3 = _this2.zpp_inner;
					if(_this3._validate != null) {
						_this3._validate();
					}
					vy = _this2.zpp_inner.y;
				} else {
					let xform1 = xform.a;
					if(!farb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					if(farb.zpp_inner.fluidarb.wrap_position == null) {
						farb.zpp_inner.fluidarb.getposition();
					}
					let _this = farb.zpp_inner.fluidarb.wrap_position;
					if(_this != null && _this.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this1 = _this.zpp_inner;
					if(_this1._validate != null) {
						_this1._validate();
					}
					let vx1 = xform1 * _this.zpp_inner.x;
					let xform2 = xform.b;
					if(!farb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					if(farb.zpp_inner.fluidarb.wrap_position == null) {
						farb.zpp_inner.fluidarb.getposition();
					}
					let _this2 = farb.zpp_inner.fluidarb.wrap_position;
					if(_this2 != null && _this2.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this3 = _this2.zpp_inner;
					if(_this3._validate != null) {
						_this3._validate();
					}
					vx = vx1 + xform2 * _this2.zpp_inner.y + xform.tx;
					let xform3 = xform.c;
					if(!farb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					if(farb.zpp_inner.fluidarb.wrap_position == null) {
						farb.zpp_inner.fluidarb.getposition();
					}
					let _this4 = farb.zpp_inner.fluidarb.wrap_position;
					if(_this4 != null && _this4.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this5 = _this4.zpp_inner;
					if(_this5._validate != null) {
						_this5._validate();
					}
					let vy1 = xform3 * _this4.zpp_inner.x;
					let xform4 = xform.d;
					if(!farb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					if(farb.zpp_inner.fluidarb.wrap_position == null) {
						farb.zpp_inner.fluidarb.getposition();
					}
					let _this6 = farb.zpp_inner.fluidarb.wrap_position;
					if(_this6 != null && _this6.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this7 = _this6.zpp_inner;
					if(_this7._validate != null) {
						_this7._validate();
					}
					vy = vy1 + xform4 * _this6.zpp_inner.y + xform.ty;
				}
				this.graphics.drawCircle(vx,vy,0.75);
			}
		} else if(this.outer.drawCollisionArbiters) {
			let _this = arb.outer;
			let carb = _this.zpp_inner.type == ZPP_Arbiter.COL ? _this.zpp_inner.colarb.outer_zn : null;
			if(!carb.zpp_inner.active) {
				throw haxe_Exception.thrown("Error: Arbiter not currently in use");
			}
			if(carb.zpp_inner.colarb.wrap_contacts == null) {
				carb.zpp_inner.colarb.setupcontacts();
			}
			let _this1 = carb.zpp_inner.colarb.wrap_contacts;
			_this1.zpp_inner.valmod();
			if(_this1.zpp_inner.zip_length) {
				_this1.zpp_inner.zip_length = false;
				_this1.zpp_inner.user_length = 0;
				let cx_ite = _this1.zpp_inner.inner.next;
				while(cx_ite != null) {
					let i = cx_ite;
					if(i.active && i.arbiter.active) {
						_this1.zpp_inner.user_length++;
					}
					cx_ite = cx_ite.next;
				}
			}
			if(_this1.zpp_inner.user_length != 0) {
				let px = 0.0;
				let py = 0.0;
				if(!carb.zpp_inner.active) {
					throw haxe_Exception.thrown("Error: Arbiter not currently in use");
				}
				if(carb.zpp_inner.colarb.wrap_contacts == null) {
					carb.zpp_inner.colarb.setupcontacts();
				}
				let _this = carb.zpp_inner.colarb.wrap_contacts;
				_this.zpp_inner.valmod();
				if(_this.zpp_inner.zip_length) {
					_this.zpp_inner.zip_length = false;
					_this.zpp_inner.user_length = 0;
					let cx_ite = _this.zpp_inner.inner.next;
					while(cx_ite != null) {
						let i = cx_ite;
						if(i.active && i.arbiter.active) {
							_this.zpp_inner.user_length++;
						}
						cx_ite = cx_ite.next;
					}
				}
				if(_this.zpp_inner.user_length == 2) {
					if(!carb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					if(carb.zpp_inner.colarb.wrap_contacts == null) {
						carb.zpp_inner.colarb.setupcontacts();
					}
					let _this = carb.zpp_inner.colarb.wrap_contacts.at(0);
					if(_this.zpp_inner.inactiveme()) {
						throw haxe_Exception.thrown("Error: Contact not currently in use");
					}
					if(_this.zpp_inner.wrap_position == null) {
						_this.zpp_inner.getposition();
					}
					let c1 = _this.zpp_inner.wrap_position;
					if(!carb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					if(carb.zpp_inner.colarb.wrap_contacts == null) {
						carb.zpp_inner.colarb.setupcontacts();
					}
					let _this1 = carb.zpp_inner.colarb.wrap_contacts.at(1);
					if(_this1.zpp_inner.inactiveme()) {
						throw haxe_Exception.thrown("Error: Contact not currently in use");
					}
					if(_this1.zpp_inner.wrap_position == null) {
						_this1.zpp_inner.getposition();
					}
					let c2 = _this1.zpp_inner.wrap_position;
					if(!carb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					if(carb.zpp_inner.colarb.wrap_normal == null) {
						carb.zpp_inner.colarb.getnormal();
					}
					let n = carb.zpp_inner.colarb.wrap_normal;
					let x = 0.661437828;
					let y = 0.75;
					if(n != null && n.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this2 = n.zpp_inner;
					if(_this2._validate != null) {
						_this2._validate();
					}
					let tmp = n.zpp_inner.y;
					if(c1 != null && c1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this3 = c1.zpp_inner;
					if(_this3._validate != null) {
						_this3._validate();
					}
					let tmp1 = tmp * c1.zpp_inner.x;
					if(n != null && n.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this4 = n.zpp_inner;
					if(_this4._validate != null) {
						_this4._validate();
					}
					let tmp2 = n.zpp_inner.x;
					if(c1 != null && c1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this5 = c1.zpp_inner;
					if(_this5._validate != null) {
						_this5._validate();
					}
					let tmp3 = tmp1 - tmp2 * c1.zpp_inner.y;
					if(n != null && n.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this6 = n.zpp_inner;
					if(_this6._validate != null) {
						_this6._validate();
					}
					let tmp4 = n.zpp_inner.y;
					if(c2 != null && c2.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this7 = c2.zpp_inner;
					if(_this7._validate != null) {
						_this7._validate();
					}
					let tmp5 = tmp4 * c2.zpp_inner.x;
					if(n != null && n.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this8 = n.zpp_inner;
					if(_this8._validate != null) {
						_this8._validate();
					}
					let tmp6 = n.zpp_inner.x;
					if(c2 != null && c2.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this9 = c2.zpp_inner;
					if(_this9._validate != null) {
						_this9._validate();
					}
					if(tmp3 < tmp5 - tmp6 * c2.zpp_inner.y) {
						x = -x;
						y = -y;
					}
					let col = 255;
					let ncol = ~this.bg_col;
					let f = 0.7;
					let _r = (col >> 16 & 255) * f + (ncol >> 16 & 255) * (1 - f) | 0;
					let _g = (col >> 8 & 255) * f + (ncol >> 8 & 255) * (1 - f) | 0;
					let _b = (col & 255) * f + (ncol & 255) * (1 - f) | 0;
					this.graphics.lineStyle(this.outer_zn.thickness,-16777216 | _r << 16 | _g << 8 | _b,1);
					if(c1 != null && c1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this10 = c1.zpp_inner;
					if(_this10._validate != null) {
						_this10._validate();
					}
					let vx1 = c1.zpp_inner.x;
					if(n != null && n.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this11 = n.zpp_inner;
					if(_this11._validate != null) {
						_this11._validate();
					}
					let vx2 = vx1 + n.zpp_inner.x * y;
					if(n != null && n.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this12 = n.zpp_inner;
					if(_this12._validate != null) {
						_this12._validate();
					}
					vx = vx2 - n.zpp_inner.y * x;
					if(c1 != null && c1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this13 = c1.zpp_inner;
					if(_this13._validate != null) {
						_this13._validate();
					}
					let vy1 = c1.zpp_inner.y;
					if(n != null && n.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this14 = n.zpp_inner;
					if(_this14._validate != null) {
						_this14._validate();
					}
					let vy2 = vy1 + n.zpp_inner.y * y;
					if(n != null && n.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this15 = n.zpp_inner;
					if(_this15._validate != null) {
						_this15._validate();
					}
					vy = vy2 + n.zpp_inner.x * x;
					if(!xnull) {
						let t = xform.a * vx + xform.b * vy + xform.tx;
						vy = xform.c * vx + xform.d * vy + xform.ty;
						vx = t;
					}
					this.graphics.moveTo(vx,vy);
					if(c2 != null && c2.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this16 = c2.zpp_inner;
					if(_this16._validate != null) {
						_this16._validate();
					}
					let vx3 = c2.zpp_inner.x;
					if(n != null && n.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this17 = n.zpp_inner;
					if(_this17._validate != null) {
						_this17._validate();
					}
					let vx4 = vx3 + n.zpp_inner.x * y;
					if(n != null && n.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this18 = n.zpp_inner;
					if(_this18._validate != null) {
						_this18._validate();
					}
					vx = vx4 + n.zpp_inner.y * x;
					if(c2 != null && c2.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this19 = c2.zpp_inner;
					if(_this19._validate != null) {
						_this19._validate();
					}
					let vy3 = c2.zpp_inner.y;
					if(n != null && n.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this20 = n.zpp_inner;
					if(_this20._validate != null) {
						_this20._validate();
					}
					let vy4 = vy3 + n.zpp_inner.y * y;
					if(n != null && n.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this21 = n.zpp_inner;
					if(_this21._validate != null) {
						_this21._validate();
					}
					vy = vy4 - n.zpp_inner.x * x;
					if(!xnull) {
						let t = xform.a * vx + xform.b * vy + xform.tx;
						vy = xform.c * vx + xform.d * vy + xform.ty;
						vx = t;
					}
					this.graphics.lineTo(vx,vy);
					let col1 = 16711680;
					let ncol1 = ~this.bg_col;
					let f1 = 0.7;
					let _r1 = (col1 >> 16 & 255) * f1 + (ncol1 >> 16 & 255) * (1 - f1) | 0;
					let _g1 = (col1 >> 8 & 255) * f1 + (ncol1 >> 8 & 255) * (1 - f1) | 0;
					let _b1 = (col1 & 255) * f1 + (ncol1 & 255) * (1 - f1) | 0;
					this.graphics.lineStyle(this.outer_zn.thickness,-16777216 | _r1 << 16 | _g1 << 8 | _b1,1);
					if(c1 != null && c1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this22 = c1.zpp_inner;
					if(_this22._validate != null) {
						_this22._validate();
					}
					let vx5 = c1.zpp_inner.x;
					if(n != null && n.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this23 = n.zpp_inner;
					if(_this23._validate != null) {
						_this23._validate();
					}
					let vx6 = vx5 - n.zpp_inner.x * y;
					if(n != null && n.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this24 = n.zpp_inner;
					if(_this24._validate != null) {
						_this24._validate();
					}
					vx = vx6 - n.zpp_inner.y * x;
					if(c1 != null && c1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this25 = c1.zpp_inner;
					if(_this25._validate != null) {
						_this25._validate();
					}
					let vy5 = c1.zpp_inner.y;
					if(n != null && n.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this26 = n.zpp_inner;
					if(_this26._validate != null) {
						_this26._validate();
					}
					let vy6 = vy5 - n.zpp_inner.y * y;
					if(n != null && n.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this27 = n.zpp_inner;
					if(_this27._validate != null) {
						_this27._validate();
					}
					vy = vy6 + n.zpp_inner.x * x;
					if(!xnull) {
						let t = xform.a * vx + xform.b * vy + xform.tx;
						vy = xform.c * vx + xform.d * vy + xform.ty;
						vx = t;
					}
					this.graphics.moveTo(vx,vy);
					if(c2 != null && c2.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this28 = c2.zpp_inner;
					if(_this28._validate != null) {
						_this28._validate();
					}
					let vx7 = c2.zpp_inner.x;
					if(n != null && n.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this29 = n.zpp_inner;
					if(_this29._validate != null) {
						_this29._validate();
					}
					let vx8 = vx7 - n.zpp_inner.x * y;
					if(n != null && n.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this30 = n.zpp_inner;
					if(_this30._validate != null) {
						_this30._validate();
					}
					vx = vx8 + n.zpp_inner.y * x;
					if(c2 != null && c2.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this31 = c2.zpp_inner;
					if(_this31._validate != null) {
						_this31._validate();
					}
					let vy7 = c2.zpp_inner.y;
					if(n != null && n.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this32 = n.zpp_inner;
					if(_this32._validate != null) {
						_this32._validate();
					}
					let vy8 = vy7 - n.zpp_inner.y * y;
					if(n != null && n.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this33 = n.zpp_inner;
					if(_this33._validate != null) {
						_this33._validate();
					}
					vy = vy8 - n.zpp_inner.x * x;
					if(!xnull) {
						let t = xform.a * vx + xform.b * vy + xform.tx;
						vy = xform.c * vx + xform.d * vy + xform.ty;
						vx = t;
					}
					this.graphics.lineTo(vx,vy);
					if(c1 != null && c1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this34 = c1.zpp_inner;
					if(_this34._validate != null) {
						_this34._validate();
					}
					let px1 = c1.zpp_inner.x;
					if(c2 != null && c2.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this35 = c2.zpp_inner;
					if(_this35._validate != null) {
						_this35._validate();
					}
					px = 0.5 * (px1 + c2.zpp_inner.x);
					if(c1 != null && c1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this36 = c1.zpp_inner;
					if(_this36._validate != null) {
						_this36._validate();
					}
					let py1 = c1.zpp_inner.y;
					if(c2 != null && c2.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this37 = c2.zpp_inner;
					if(_this37._validate != null) {
						_this37._validate();
					}
					py = 0.5 * (py1 + c2.zpp_inner.y);
					if(!xnull) {
						let t = xform.a * px + xform.b * py + xform.tx;
						py = xform.c * px + xform.d * py + xform.ty;
						px = t;
					}
				} else {
					if(!carb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					if(carb.zpp_inner.colarb.wrap_contacts == null) {
						carb.zpp_inner.colarb.setupcontacts();
					}
					let _this = carb.zpp_inner.colarb.wrap_contacts.at(0);
					if(_this.zpp_inner.inactiveme()) {
						throw haxe_Exception.thrown("Error: Contact not currently in use");
					}
					if(_this.zpp_inner.wrap_position == null) {
						_this.zpp_inner.getposition();
					}
					let _this1 = _this.zpp_inner.wrap_position;
					if(_this1 != null && _this1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this2 = _this1.zpp_inner;
					if(_this2._validate != null) {
						_this2._validate();
					}
					px = _this1.zpp_inner.x;
					if(!carb.zpp_inner.active) {
						throw haxe_Exception.thrown("Error: Arbiter not currently in use");
					}
					if(carb.zpp_inner.colarb.wrap_contacts == null) {
						carb.zpp_inner.colarb.setupcontacts();
					}
					let _this3 = carb.zpp_inner.colarb.wrap_contacts.at(0);
					if(_this3.zpp_inner.inactiveme()) {
						throw haxe_Exception.thrown("Error: Contact not currently in use");
					}
					if(_this3.zpp_inner.wrap_position == null) {
						_this3.zpp_inner.getposition();
					}
					let _this4 = _this3.zpp_inner.wrap_position;
					if(_this4 != null && _this4.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this5 = _this4.zpp_inner;
					if(_this5._validate != null) {
						_this5._validate();
					}
					py = _this4.zpp_inner.y;
					if(!xnull) {
						let t = xform.a * px + xform.b * py + xform.tx;
						py = xform.c * px + xform.d * py + xform.ty;
						px = t;
					}
					let col = 16711935;
					let ncol = ~this.bg_col;
					let f = 0.7;
					let _r = (col >> 16 & 255) * f + (ncol >> 16 & 255) * (1 - f) | 0;
					let _g = (col >> 8 & 255) * f + (ncol >> 8 & 255) * (1 - f) | 0;
					let _b = (col & 255) * f + (ncol & 255) * (1 - f) | 0;
					this.graphics.lineStyle(this.outer_zn.thickness,-16777216 | _r << 16 | _g << 8 | _b,1);
					this.graphics.drawCircle(px,py,1);
				}
				let col = ~this.bg_col;
				let ncol = this.bg_col;
				let f = 0.7;
				let _r = (col >> 16 & 255) * f + (ncol >> 16 & 255) * (1 - f) | 0;
				let _g = (col >> 8 & 255) * f + (ncol >> 8 & 255) * (1 - f) | 0;
				let _b = (col & 255) * f + (ncol & 255) * (1 - f) | 0;
				this.graphics.lineStyle(this.outer_zn.thickness,-16777216 | _r << 16 | _g << 8 | _b,1);
				this.graphics.moveTo(px,py);
				if(!carb.zpp_inner.active) {
					throw haxe_Exception.thrown("Error: Arbiter not currently in use");
				}
				if(carb.zpp_inner.colarb.wrap_normal == null) {
					carb.zpp_inner.colarb.getnormal();
				}
				let _this1 = carb.zpp_inner.colarb.wrap_normal;
				if(_this1 != null && _this1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this2 = _this1.zpp_inner;
				if(_this2._validate != null) {
					_this2._validate();
				}
				vx = _this1.zpp_inner.x * 5;
				if(!carb.zpp_inner.active) {
					throw haxe_Exception.thrown("Error: Arbiter not currently in use");
				}
				if(carb.zpp_inner.colarb.wrap_normal == null) {
					carb.zpp_inner.colarb.getnormal();
				}
				let _this3 = carb.zpp_inner.colarb.wrap_normal;
				if(_this3 != null && _this3.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this4 = _this3.zpp_inner;
				if(_this4._validate != null) {
					_this4._validate();
				}
				vy = _this3.zpp_inner.y * 5;
				if(!xnull) {
					let t = xform.a * vx + xform.b * vy;
					vy = xform.c * vx + xform.d * vy;
					vx = t;
				}
				this.graphics.lineTo(px + vx,py + vy);
			}
		}
	}
}
