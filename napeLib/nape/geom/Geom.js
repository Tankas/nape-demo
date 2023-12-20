import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import ZPP_SweepDistance from '../../zpp_nape/geom/ZPP_SweepDistance.js';
import ZPP_Geom from '../../zpp_nape/geom/ZPP_Geom.js';
import ZPP_Collide from '../../zpp_nape/geom/ZPP_Collide.js';
import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
import Config from '../Config.js';
export default class Geom {
	static distanceBody(body1,body2,out1,out2) {
		if(out1 != null && out1.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(out2 != null && out2.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = out1.zpp_inner;
		if(_this._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this._isimmutable != null) {
			_this._isimmutable();
		}
		let _this1 = out2.zpp_inner;
		if(_this1._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this1._isimmutable != null) {
			_this1._isimmutable();
		}
		let tmp;
		let _this2 = body1.zpp_inner.wrap_shapes;
		if(_this2.zpp_inner.inner.head != null) {
			let _this = body2.zpp_inner.wrap_shapes;
			tmp = _this.zpp_inner.inner.head == null;
		} else {
			tmp = true;
		}
		if(tmp) {
			throw haxe_Exception.thrown("Error: Bodies cannot be empty in calculating distances");
		}
		let cx_ite = body1.zpp_inner.shapes.head;
		while(cx_ite != null) {
			let i = cx_ite.elt;
			ZPP_Geom.validateShape(i);
			cx_ite = cx_ite.next;
		}
		let cx_ite1 = body2.zpp_inner.shapes.head;
		while(cx_ite1 != null) {
			let i = cx_ite1.elt;
			ZPP_Geom.validateShape(i);
			cx_ite1 = cx_ite1.next;
		}
		return ZPP_SweepDistance.distanceBody(body1.zpp_inner,body2.zpp_inner,out1.zpp_inner,out2.zpp_inner);
	}
	static distance(shape1,shape2,out1,out2) {
		if(out1 != null && out1.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(out2 != null && out2.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = out1.zpp_inner;
		if(_this._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this._isimmutable != null) {
			_this._isimmutable();
		}
		let _this1 = out2.zpp_inner;
		if(_this1._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this1._isimmutable != null) {
			_this1._isimmutable();
		}
		if((shape1.zpp_inner.body != null ? shape1.zpp_inner.body.outer : null) == null || (shape2.zpp_inner.body != null ? shape2.zpp_inner.body.outer : null) == null) {
			throw haxe_Exception.thrown("Error: Shape must be part of a Body to calculate distances");
		}
		ZPP_Geom.validateShape(shape1.zpp_inner);
		ZPP_Geom.validateShape(shape2.zpp_inner);
		let tmp;
		if(ZPP_Vec2.zpp_pool == null) {
			tmp = new ZPP_Vec2();
		} else {
			tmp = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = tmp.next;
			tmp.next = null;
		}
		tmp.weak = false;
		let s1 = shape1.zpp_inner;
		let s2 = shape2.zpp_inner;
		let w1 = out1.zpp_inner;
		let w2 = out2.zpp_inner;
		let upperBound = 1e100;
		if(upperBound == null) {
			upperBound = 1e100;
		}
		let ret;
		if(s1.type == ZPP_Flags.id_ShapeType_CIRCLE && s2.type == ZPP_Flags.id_ShapeType_CIRCLE) {
			let c1 = s1.circle;
			let c2 = s2.circle;
			let dist;
			let nx = 0.0;
			let ny = 0.0;
			nx = c2.worldCOMx - c1.worldCOMx;
			ny = c2.worldCOMy - c1.worldCOMy;
			let len = Math.sqrt(nx * nx + ny * ny);
			dist = len - (c1.radius + c2.radius);
			if(dist < upperBound) {
				if(len == 0) {
					nx = 1;
					ny = 0;
				} else {
					let t = 1.0 / len;
					nx *= t;
					ny *= t;
				}
				let t = c1.radius;
				w1.x = c1.worldCOMx + nx * t;
				w1.y = c1.worldCOMy + ny * t;
				let t1 = -c2.radius;
				w2.x = c2.worldCOMx + nx * t1;
				w2.y = c2.worldCOMy + ny * t1;
				tmp.x = nx;
				tmp.y = ny;
			}
			ret = dist;
		} else {
			let swapped = false;
			if(s1.type == ZPP_Flags.id_ShapeType_CIRCLE && s2.type == ZPP_Flags.id_ShapeType_POLYGON) {
				let tmp = s1;
				s1 = s2;
				s2 = tmp;
				let tmp2 = w1;
				w1 = w2;
				w2 = tmp2;
				swapped = true;
			}
			if(s1.type == ZPP_Flags.id_ShapeType_POLYGON && s2.type == ZPP_Flags.id_ShapeType_CIRCLE) {
				let poly = s1.polygon;
				let circle = s2.circle;
				let best = -1e+100;
				let a0 = null;
				let cx_ite = poly.edges.head;
				while(cx_ite != null) {
					let a = cx_ite.elt;
					let dist = a.gnormx * circle.worldCOMx + a.gnormy * circle.worldCOMy - a.gprojection - circle.radius;
					if(dist > upperBound) {
						best = dist;
						break;
					}
					if(dist > 0) {
						if(dist > best) {
							best = dist;
							a0 = a;
						}
					} else if(best < 0 && dist > best) {
						best = dist;
						a0 = a;
					}
					cx_ite = cx_ite.next;
				}
				if(best < upperBound) {
					let v0 = a0.gp0;
					let v1 = a0.gp1;
					let dt = circle.worldCOMy * a0.gnormx - circle.worldCOMx * a0.gnormy;
					if(dt <= v0.y * a0.gnormx - v0.x * a0.gnormy) {
						let nx = 0.0;
						let ny = 0.0;
						nx = circle.worldCOMx - v0.x;
						ny = circle.worldCOMy - v0.y;
						let len = Math.sqrt(nx * nx + ny * ny);
						best = len - circle.radius;
						if(best < upperBound) {
							if(len == 0) {
								nx = 1;
								ny = 0;
							} else {
								let t = 1.0 / len;
								nx *= t;
								ny *= t;
							}
							let t = 0;
							w1.x = v0.x + nx * t;
							w1.y = v0.y + ny * t;
							let t1 = -circle.radius;
							w2.x = circle.worldCOMx + nx * t1;
							w2.y = circle.worldCOMy + ny * t1;
							tmp.x = nx;
							tmp.y = ny;
						}
					} else if(dt >= v1.y * a0.gnormx - v1.x * a0.gnormy) {
						let nx = 0.0;
						let ny = 0.0;
						nx = circle.worldCOMx - v1.x;
						ny = circle.worldCOMy - v1.y;
						let len = Math.sqrt(nx * nx + ny * ny);
						best = len - circle.radius;
						if(best < upperBound) {
							if(len == 0) {
								nx = 1;
								ny = 0;
							} else {
								let t = 1.0 / len;
								nx *= t;
								ny *= t;
							}
							let t = 0;
							w1.x = v1.x + nx * t;
							w1.y = v1.y + ny * t;
							let t1 = -circle.radius;
							w2.x = circle.worldCOMx + nx * t1;
							w2.y = circle.worldCOMy + ny * t1;
							tmp.x = nx;
							tmp.y = ny;
						}
					} else {
						let t = -circle.radius;
						w2.x = circle.worldCOMx + a0.gnormx * t;
						w2.y = circle.worldCOMy + a0.gnormy * t;
						let t1 = -best;
						w1.x = w2.x + a0.gnormx * t1;
						w1.y = w2.y + a0.gnormy * t1;
						tmp.x = a0.gnormx;
						tmp.y = a0.gnormy;
					}
				}
				if(swapped) {
					tmp.x = -tmp.x;
					tmp.y = -tmp.y;
				}
				ret = best;
			} else {
				let p1 = s1.polygon;
				let p2 = s2.polygon;
				let best = -1e+100;
				let a1 = null;
				let a2 = null;
				let besti = 0;
				let cx_ite = p1.edges.head;
				while(cx_ite != null) {
					let a = cx_ite.elt;
					let min = 1e100;
					let cx_ite1 = p2.gverts.next;
					while(cx_ite1 != null) {
						let v = cx_ite1;
						let k = a.gnormx * v.x + a.gnormy * v.y;
						if(k < min) {
							min = k;
						}
						cx_ite1 = cx_ite1.next;
					}
					min -= a.gprojection;
					if(min > upperBound) {
						best = min;
						break;
					}
					if(min > 0) {
						if(min > best) {
							best = min;
							a1 = a;
							besti = 1;
						}
					} else if(best < 0 && min > best) {
						best = min;
						a1 = a;
						besti = 1;
					}
					cx_ite = cx_ite.next;
				}
				if(best < upperBound) {
					let cx_ite = p2.edges.head;
					while(cx_ite != null) {
						let a = cx_ite.elt;
						let min = 1e100;
						let cx_ite1 = p1.gverts.next;
						while(cx_ite1 != null) {
							let v = cx_ite1;
							let k = a.gnormx * v.x + a.gnormy * v.y;
							if(k < min) {
								min = k;
							}
							cx_ite1 = cx_ite1.next;
						}
						min -= a.gprojection;
						if(min > upperBound) {
							best = min;
							break;
						}
						if(min > 0) {
							if(min > best) {
								best = min;
								a2 = a;
								besti = 2;
							}
						} else if(best < 0 && min > best) {
							best = min;
							a2 = a;
							besti = 2;
						}
						cx_ite = cx_ite.next;
					}
					if(best < upperBound) {
						let q1;
						let q2;
						let ax;
						if(besti == 1) {
							q1 = p1;
							q2 = p2;
							ax = a1;
						} else {
							q1 = p2;
							q2 = p1;
							ax = a2;
							let tmp = w1;
							w1 = w2;
							w2 = tmp;
							swapped = !swapped;
						}
						let ay = null;
						let min = 1e100;
						let cx_ite = q2.edges.head;
						while(cx_ite != null) {
							let a = cx_ite.elt;
							let k = ax.gnormx * a.gnormx + ax.gnormy * a.gnormy;
							if(k < min) {
								min = k;
								ay = a;
							}
							cx_ite = cx_ite.next;
						}
						if(swapped) {
							tmp.x = -ax.gnormx;
							tmp.y = -ax.gnormy;
						} else {
							tmp.x = ax.gnormx;
							tmp.y = ax.gnormy;
						}
						if(best >= 0) {
							let v0 = ax.gp0;
							let v1 = ax.gp1;
							let q0 = ay.gp0;
							let q1 = ay.gp1;
							let vx = 0.0;
							let vy = 0.0;
							let qx = 0.0;
							let qy = 0.0;
							vx = v1.x - v0.x;
							vy = v1.y - v0.y;
							qx = q1.x - q0.x;
							qy = q1.y - q0.y;
							let vdot = 1 / (vx * vx + vy * vy);
							let qdot = 1 / (qx * qx + qy * qy);
							let t1 = -(vx * (v0.x - q0.x) + vy * (v0.y - q0.y)) * vdot;
							let t2 = -(vx * (v0.x - q1.x) + vy * (v0.y - q1.y)) * vdot;
							let s1 = -(qx * (q0.x - v0.x) + qy * (q0.y - v0.y)) * qdot;
							let s2 = -(qx * (q0.x - v1.x) + qy * (q0.y - v1.y)) * qdot;
							if(t1 < 0) {
								t1 = 0;
							} else if(t1 > 1) {
								t1 = 1;
							}
							if(t2 < 0) {
								t2 = 0;
							} else if(t2 > 1) {
								t2 = 1;
							}
							if(s1 < 0) {
								s1 = 0;
							} else if(s1 > 1) {
								s1 = 1;
							}
							if(s2 < 0) {
								s2 = 0;
							} else if(s2 > 1) {
								s2 = 1;
							}
							let f1x = 0.0;
							let f1y = 0.0;
							let t = t1;
							f1x = v0.x + vx * t;
							f1y = v0.y + vy * t;
							let f2x = 0.0;
							let f2y = 0.0;
							let t3 = t2;
							f2x = v0.x + vx * t3;
							f2y = v0.y + vy * t3;
							let g1x = 0.0;
							let g1y = 0.0;
							let t4 = s1;
							g1x = q0.x + qx * t4;
							g1y = q0.y + qy * t4;
							let g2x = 0.0;
							let g2y = 0.0;
							let t5 = s2;
							g2x = q0.x + qx * t5;
							g2y = q0.y + qy * t5;
							let dx = 0.0;
							let dy = 0.0;
							dx = f1x - q0.x;
							dy = f1y - q0.y;
							let d1 = dx * dx + dy * dy;
							let dx1 = 0.0;
							let dy1 = 0.0;
							dx1 = f2x - q1.x;
							dy1 = f2y - q1.y;
							let d2 = dx1 * dx1 + dy1 * dy1;
							let dx2 = 0.0;
							let dy2 = 0.0;
							dx2 = g1x - v0.x;
							dy2 = g1y - v0.y;
							let e1 = dx2 * dx2 + dy2 * dy2;
							let dx3 = 0.0;
							let dy3 = 0.0;
							dx3 = g2x - v1.x;
							dy3 = g2y - v1.y;
							let e2 = dx3 * dx3 + dy3 * dy3;
							let minfx = 0.0;
							let minfy = 0.0;
							let minq = null;
							if(d1 < d2) {
								minfx = f1x;
								minfy = f1y;
								minq = q0;
							} else {
								minfx = f2x;
								minfy = f2y;
								minq = q1;
								d1 = d2;
							}
							let mingx = 0.0;
							let mingy = 0.0;
							let minv = null;
							if(e1 < e2) {
								mingx = g1x;
								mingy = g1y;
								minv = v0;
							} else {
								mingx = g2x;
								mingy = g2y;
								minv = v1;
								e1 = e2;
							}
							if(d1 < e1) {
								w1.x = minfx;
								w1.y = minfy;
								w2.x = minq.x;
								w2.y = minq.y;
								best = Math.sqrt(d1);
							} else {
								w2.x = mingx;
								w2.y = mingy;
								w1.x = minv.x;
								w1.y = minv.y;
								best = Math.sqrt(e1);
							}
							if(best != 0) {
								tmp.x = w2.x - w1.x;
								tmp.y = w2.y - w1.y;
								let t = 1.0 / best;
								tmp.x *= t;
								tmp.y *= t;
								if(swapped) {
									tmp.x = -tmp.x;
									tmp.y = -tmp.y;
								}
							}
							ret = best;
						} else {
							let c0x = 0.0;
							let c0y = 0.0;
							c0x = ay.gp0.x;
							c0y = ay.gp0.y;
							let c1x = 0.0;
							let c1y = 0.0;
							c1x = ay.gp1.x;
							c1y = ay.gp1.y;
							let dvx = 0.0;
							let dvy = 0.0;
							dvx = c1x - c0x;
							dvy = c1y - c0y;
							let d0 = ax.gnormy * c0x - ax.gnormx * c0y;
							let d1 = ax.gnormy * c1x - ax.gnormx * c1y;
							let den = 1 / (d1 - d0);
							let t = (-ax.tp1 - d0) * den;
							if(t > Config.epsilon) {
								let t1 = t;
								c0x += dvx * t1;
								c0y += dvy * t1;
							}
							let t1 = (-ax.tp0 - d1) * den;
							if(t1 < -Config.epsilon) {
								let t = t1;
								c1x += dvx * t;
								c1y += dvy * t;
							}
							let c0d = c0x * ax.gnormx + c0y * ax.gnormy - ax.gprojection;
							let c1d = c1x * ax.gnormx + c1y * ax.gnormy - ax.gprojection;
							if(c0d < c1d) {
								w2.x = c0x;
								w2.y = c0y;
								let t = -c0d;
								w1.x = w2.x + ax.gnormx * t;
								w1.y = w2.y + ax.gnormy * t;
								ret = c0d;
							} else {
								w2.x = c1x;
								w2.y = c1y;
								let t = -c1d;
								w1.x = w2.x + ax.gnormx * t;
								w1.y = w2.y + ax.gnormy * t;
								ret = c1d;
							}
						}
					} else {
						ret = upperBound;
					}
				} else {
					ret = upperBound;
				}
			}
		}
		let o = tmp;
		if(o.outer != null) {
			o.outer.zpp_inner = null;
			o.outer = null;
		}
		o._isimmutable = null;
		o._validate = null;
		o._invalidate = null;
		o.next = ZPP_Vec2.zpp_pool;
		ZPP_Vec2.zpp_pool = o;
		return ret;
	}
	static intersectsBody(body1,body2) {
		let tmp;
		let _this = body1.zpp_inner.wrap_shapes;
		if(_this.zpp_inner.inner.head != null) {
			let _this = body2.zpp_inner.wrap_shapes;
			tmp = _this.zpp_inner.inner.head == null;
		} else {
			tmp = true;
		}
		if(tmp) {
			throw haxe_Exception.thrown("Error: Bodies must have shapes to test for intersection.");
		}
		let cx_ite = body1.zpp_inner.shapes.head;
		while(cx_ite != null) {
			let i = cx_ite.elt;
			ZPP_Geom.validateShape(i);
			cx_ite = cx_ite.next;
		}
		let cx_ite1 = body2.zpp_inner.shapes.head;
		while(cx_ite1 != null) {
			let i = cx_ite1.elt;
			ZPP_Geom.validateShape(i);
			cx_ite1 = cx_ite1.next;
		}
		let _this1 = body1.zpp_inner.aabb;
		let x = body2.zpp_inner.aabb;
		if(!(x.miny <= _this1.maxy && _this1.miny <= x.maxy && x.minx <= _this1.maxx && _this1.minx <= x.maxx)) {
			return false;
		} else {
			let cx_ite = body1.zpp_inner.shapes.head;
			while(cx_ite != null) {
				let s1 = cx_ite.elt;
				let cx_ite1 = body2.zpp_inner.shapes.head;
				while(cx_ite1 != null) {
					let s2 = cx_ite1.elt;
					if(ZPP_Collide.testCollide_safe(s1,s2)) {
						return true;
					}
					cx_ite1 = cx_ite1.next;
				}
				cx_ite = cx_ite.next;
			}
			return false;
		}
	}
	static intersects(shape1,shape2) {
		if((shape1.zpp_inner.body != null ? shape1.zpp_inner.body.outer : null) == null || (shape2.zpp_inner.body != null ? shape2.zpp_inner.body.outer : null) == null) {
			throw haxe_Exception.thrown("Error: Shape must be part of a Body to calculate intersection");
		}
		ZPP_Geom.validateShape(shape1.zpp_inner);
		ZPP_Geom.validateShape(shape2.zpp_inner);
		let _this = shape1.zpp_inner.aabb;
		let x = shape2.zpp_inner.aabb;
		if(x.miny <= _this.maxy && _this.miny <= x.maxy && x.minx <= _this.maxx && _this.minx <= x.maxx) {
			return ZPP_Collide.testCollide_safe(shape1.zpp_inner,shape2.zpp_inner);
		} else {
			return false;
		}
	}
	static contains(shape1,shape2) {
		if((shape1.zpp_inner.body != null ? shape1.zpp_inner.body.outer : null) == null || (shape2.zpp_inner.body != null ? shape2.zpp_inner.body.outer : null) == null) {
			throw haxe_Exception.thrown("Error: Shape must be part of a Body to calculate containment");
		}
		ZPP_Geom.validateShape(shape1.zpp_inner);
		ZPP_Geom.validateShape(shape2.zpp_inner);
		return ZPP_Collide.containTest(shape1.zpp_inner,shape2.zpp_inner);
	}
}
