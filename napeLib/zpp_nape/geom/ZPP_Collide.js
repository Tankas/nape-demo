import ZPP_Vec2 from './ZPP_Vec2.js';
import ZNPList_ZPP_Vec2 from '../util/ZNPList_ZPP_Vec2.js';
import ZPP_Contact from '../dynamics/ZPP_Contact.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import Config from '../../nape/Config.js';
export default class ZPP_Collide {
	static circleContains(c,p) {
		let dx = 0.0;
		let dy = 0.0;
		dx = p.x - c.worldCOMx;
		dy = p.y - c.worldCOMy;
		return dx * dx + dy * dy < c.radius * c.radius;
	}
	static polyContains(s,p) {
		let retvar;
		retvar = true;
		let cx_ite = s.edges.head;
		while(cx_ite != null) {
			let a = cx_ite.elt;
			if(a.gnormx * p.x + a.gnormy * p.y <= a.gprojection) {
				cx_ite = cx_ite.next;
				continue;
			} else {
				retvar = false;
				break;
			}
		}
		return retvar;
	}
	static shapeContains(s,p) {
		if(s.type == ZPP_Flags.id_ShapeType_CIRCLE) {
			return ZPP_Collide.circleContains(s.circle,p);
		} else {
			return ZPP_Collide.polyContains(s.polygon,p);
		}
	}
	static bodyContains(b,p) {
		let retvar;
		retvar = false;
		let cx_ite = b.shapes.head;
		while(cx_ite != null) {
			let s = cx_ite.elt;
			if(ZPP_Collide.shapeContains(s,p)) {
				retvar = true;
				break;
			}
			cx_ite = cx_ite.next;
		}
		return retvar;
	}
	static containTest(s1,s2) {
		let _this = s1.aabb;
		let x = s2.aabb;
		if(x.minx >= _this.minx && x.miny >= _this.miny && x.maxx <= _this.maxx && x.maxy <= _this.maxy) {
			if(s1.type == ZPP_Flags.id_ShapeType_CIRCLE) {
				if(s2.type == ZPP_Flags.id_ShapeType_CIRCLE) {
					let minDist = s1.circle.radius + -s2.circle.radius;
					let px = 0.0;
					let py = 0.0;
					px = s2.circle.worldCOMx - s1.circle.worldCOMx;
					py = s2.circle.worldCOMy - s1.circle.worldCOMy;
					let distSqr = px * px + py * py;
					return distSqr <= minDist * minDist;
				} else {
					let retvar;
					retvar = true;
					let cx_ite = s2.polygon.gverts.next;
					while(cx_ite != null) {
						let p = cx_ite;
						let minDist = s1.circle.radius;
						let px = 0.0;
						let py = 0.0;
						px = p.x - s1.circle.worldCOMx;
						py = p.y - s1.circle.worldCOMy;
						let distSqr = px * px + py * py;
						if(distSqr <= minDist * minDist) {
							cx_ite = cx_ite.next;
							continue;
						} else {
							retvar = false;
							break;
						}
					}
					return retvar;
				}
			} else if(s2.type == ZPP_Flags.id_ShapeType_CIRCLE) {
				let retvar;
				retvar = true;
				let cx_ite = s1.polygon.edges.head;
				while(cx_ite != null) {
					let a = cx_ite.elt;
					if(a.gnormx * s2.circle.worldCOMx + a.gnormy * s2.circle.worldCOMy + s2.circle.radius <= a.gprojection) {
						cx_ite = cx_ite.next;
						continue;
					} else {
						retvar = false;
						break;
					}
				}
				return retvar;
			} else {
				let retvar;
				retvar = true;
				let cx_ite = s1.polygon.edges.head;
				while(cx_ite != null) {
					let a = cx_ite.elt;
					let max = -1e+100;
					let cx_ite1 = s2.polygon.gverts.next;
					while(cx_ite1 != null) {
						let v = cx_ite1;
						let k = a.gnormx * v.x + a.gnormy * v.y;
						if(k > max) {
							max = k;
						}
						cx_ite1 = cx_ite1.next;
					}
					if(max <= a.gprojection) {
						cx_ite = cx_ite.next;
						continue;
					} else {
						retvar = false;
						break;
					}
				}
				return retvar;
			}
		} else {
			return false;
		}
	}
	static contactCollide(s1,s2,arb,rev) {
		if(s2.type == ZPP_Flags.id_ShapeType_POLYGON) {
			if(s1.type == ZPP_Flags.id_ShapeType_POLYGON) {
				let cont = true;
				let max = -1e+100;
				let maxmin = -1e+100;
				let maxi = -1;
				let axis1 = null;
				let axis2 = null;
				let cx_ite = s1.polygon.edges.head;
				while(cx_ite != null) {
					let ax = cx_ite.elt;
					let min = 1e100;
					let cx_ite1 = s2.polygon.gverts.next;
					while(cx_ite1 != null) {
						let v = cx_ite1;
						let k = ax.gnormx * v.x + ax.gnormy * v.y;
						if(k < min) {
							min = k;
						}
						if(min - ax.gprojection <= max) {
							break;
						}
						cx_ite1 = cx_ite1.next;
					}
					min -= ax.gprojection;
					if(min >= 0) {
						cont = false;
						break;
					}
					if(min > max) {
						max = min;
						axis1 = ax;
						maxi = 1;
					}
					cx_ite = cx_ite.next;
				}
				if(cont) {
					let cx_ite = s2.polygon.edges.head;
					while(cx_ite != null) {
						let ax = cx_ite.elt;
						let min = 1e100;
						let cx_ite1 = s1.polygon.gverts.next;
						while(cx_ite1 != null) {
							let v = cx_ite1;
							let k = ax.gnormx * v.x + ax.gnormy * v.y;
							if(k < min) {
								min = k;
							}
							if(min - ax.gprojection <= max) {
								break;
							}
							cx_ite1 = cx_ite1.next;
						}
						min -= ax.gprojection;
						if(min >= 0) {
							cont = false;
							break;
						}
						if(min > max) {
							max = min;
							axis2 = ax;
							maxi = 2;
						}
						cx_ite = cx_ite.next;
					}
					if(!cont) {
						return false;
					} else {
						let q1;
						let q2;
						let ax;
						let scale;
						if(maxi == 1) {
							q1 = s1.polygon;
							q2 = s2.polygon;
							ax = axis1;
							scale = 1.0;
						} else {
							q1 = s2.polygon;
							q2 = s1.polygon;
							ax = axis2;
							scale = -1.0;
						}
						let ay = null;
						let min = 1e100;
						let cx_ite = q2.edges.head;
						while(cx_ite != null) {
							let axis = cx_ite.elt;
							let k = ax.gnormx * axis.gnormx + ax.gnormy * axis.gnormy;
							if(k < min) {
								min = k;
								ay = axis;
							}
							cx_ite = cx_ite.next;
						}
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
						let nx = 0.0;
						let ny = 0.0;
						let t2 = scale;
						nx = ax.gnormx * t2;
						ny = ax.gnormy * t2;
						arb.lnormx = ax.lnormx;
						arb.lnormy = ax.lnormy;
						arb.lproj = ax.lprojection;
						arb.radius = 0;
						arb.rev = rev != (scale == -1);
						arb.ptype = arb.rev ? 1 : 0;
						let c0d = c0x * ax.gnormx + c0y * ax.gnormy - ax.gprojection;
						let c1d = c1x * ax.gnormx + c1y * ax.gnormy - ax.gprojection;
						if(c0d > 0 && c1d > 0) {
							return false;
						} else {
							if(rev) {
								nx = -nx;
								ny = -ny;
							}
							let px = c0x - ax.gnormx * c0d * 0.5;
							let py = c0y - ax.gnormy * c0d * 0.5;
							let hash = arb.rev ? 1 : 0;
							let posOnly = c0d > 0;
							if(posOnly == null) {
								posOnly = false;
							}
							let c = null;
							let cx_ite = arb.contacts.next;
							while(cx_ite != null) {
								let cur = cx_ite;
								if(hash == cur.hash) {
									c = cur;
									break;
								}
								cx_ite = cx_ite.next;
							}
							if(c == null) {
								if(ZPP_Contact.zpp_pool == null) {
									c = new ZPP_Contact();
								} else {
									c = ZPP_Contact.zpp_pool;
									ZPP_Contact.zpp_pool = c.next;
									c.next = null;
								}
								let ci = c.inner;
								ci.jnAcc = ci.jtAcc = 0;
								c.hash = hash;
								c.fresh = true;
								c.arbiter = arb;
								arb.jrAcc = 0;
								let _this = arb.contacts;
								c._inuse = true;
								let temp = c;
								temp.next = _this.next;
								_this.next = temp;
								_this.modified = true;
								_this.length++;
								arb.innards.add(ci);
							} else {
								c.fresh = false;
							}
							c.px = px;
							c.py = py;
							arb.nx = nx;
							arb.ny = ny;
							c.dist = c0d;
							c.stamp = arb.stamp;
							c.posOnly = posOnly;
							let con = c;
							let t = 1.0;
							c0x -= q2.body.posx * t;
							c0y -= q2.body.posy * t;
							con.inner.lr1x = c0x * q2.body.axisy + c0y * q2.body.axisx;
							con.inner.lr1y = c0y * q2.body.axisy - c0x * q2.body.axisx;
							let px1 = c1x - ax.gnormx * c1d * 0.5;
							let py1 = c1y - ax.gnormy * c1d * 0.5;
							let hash1 = arb.rev ? 0 : 1;
							let posOnly1 = c1d > 0;
							if(posOnly1 == null) {
								posOnly1 = false;
							}
							let c1 = null;
							let cx_ite1 = arb.contacts.next;
							while(cx_ite1 != null) {
								let cur = cx_ite1;
								if(hash1 == cur.hash) {
									c1 = cur;
									break;
								}
								cx_ite1 = cx_ite1.next;
							}
							if(c1 == null) {
								if(ZPP_Contact.zpp_pool == null) {
									c1 = new ZPP_Contact();
								} else {
									c1 = ZPP_Contact.zpp_pool;
									ZPP_Contact.zpp_pool = c1.next;
									c1.next = null;
								}
								let ci = c1.inner;
								ci.jnAcc = ci.jtAcc = 0;
								c1.hash = hash1;
								c1.fresh = true;
								c1.arbiter = arb;
								arb.jrAcc = 0;
								let _this = arb.contacts;
								c1._inuse = true;
								let temp = c1;
								temp.next = _this.next;
								_this.next = temp;
								_this.modified = true;
								_this.length++;
								arb.innards.add(ci);
							} else {
								c1.fresh = false;
							}
							c1.px = px1;
							c1.py = py1;
							arb.nx = nx;
							arb.ny = ny;
							c1.dist = c1d;
							c1.stamp = arb.stamp;
							c1.posOnly = posOnly1;
							con = c1;
							let t1 = 1.0;
							c1x -= q2.body.posx * t1;
							c1y -= q2.body.posy * t1;
							con.inner.lr1x = c1x * q2.body.axisy + c1y * q2.body.axisx;
							con.inner.lr1y = c1y * q2.body.axisy - c1x * q2.body.axisx;
							if(maxi == 1) {
								arb.__ref_edge1 = ax;
								arb.__ref_edge2 = ay;
							} else {
								arb.__ref_edge2 = ax;
								arb.__ref_edge1 = ay;
							}
							return true;
						}
					}
				} else {
					return false;
				}
			} else {
				let max = -1e+100;
				let minmax = -1e+100;
				let cont = true;
				let a0 = null;
				let vi = null;
				let vite = s2.polygon.gverts.next;
				let cx_ite = s2.polygon.edges.head;
				while(cx_ite != null) {
					let a = cx_ite.elt;
					let dist = a.gnormx * s1.circle.worldCOMx + a.gnormy * s1.circle.worldCOMy - a.gprojection - s1.circle.radius;
					if(dist > 0) {
						cont = false;
						break;
					}
					if(dist > max) {
						max = dist;
						a0 = a;
						vi = vite;
					}
					vite = vite.next;
					cx_ite = cx_ite.next;
				}
				if(cont) {
					let v0 = vi;
					let v1 = vi.next == null ? s2.polygon.gverts.next : vi.next;
					let dt = s1.circle.worldCOMy * a0.gnormx - s1.circle.worldCOMx * a0.gnormy;
					if(dt <= v0.y * a0.gnormx - v0.x * a0.gnormy) {
						let minDist = s1.circle.radius;
						let px = 0.0;
						let py = 0.0;
						px = v0.x - s1.circle.worldCOMx;
						py = v0.y - s1.circle.worldCOMy;
						let distSqr = px * px + py * py;
						let co;
						if(distSqr > minDist * minDist) {
							co = null;
						} else if(distSqr < Config.epsilon * Config.epsilon) {
							let px = s1.circle.worldCOMx;
							let py = s1.circle.worldCOMy;
							let c = null;
							let cx_ite = arb.contacts.next;
							while(cx_ite != null) {
								let cur = cx_ite;
								if(0 == cur.hash) {
									c = cur;
									break;
								}
								cx_ite = cx_ite.next;
							}
							if(c == null) {
								if(ZPP_Contact.zpp_pool == null) {
									c = new ZPP_Contact();
								} else {
									c = ZPP_Contact.zpp_pool;
									ZPP_Contact.zpp_pool = c.next;
									c.next = null;
								}
								let ci = c.inner;
								ci.jnAcc = ci.jtAcc = 0;
								c.hash = 0;
								c.fresh = true;
								c.arbiter = arb;
								arb.jrAcc = 0;
								let _this = arb.contacts;
								c._inuse = true;
								let temp = c;
								temp.next = _this.next;
								_this.next = temp;
								_this.modified = true;
								_this.length++;
								arb.innards.add(ci);
							} else {
								c.fresh = false;
							}
							c.px = px;
							c.py = py;
							arb.nx = 1;
							arb.ny = 0;
							c.dist = -minDist;
							c.stamp = arb.stamp;
							c.posOnly = false;
							co = c;
						} else {
							let invDist = 1.0 / Math.sqrt(distSqr);
							let dist = invDist < Config.epsilon ? 1e100 : 1.0 / invDist;
							let df = 0.5 + (s1.circle.radius - 0.5 * minDist) * invDist;
							if(rev) {
								let px1 = s1.circle.worldCOMx + px * df;
								let py1 = s1.circle.worldCOMy + py * df;
								let c = null;
								let cx_ite = arb.contacts.next;
								while(cx_ite != null) {
									let cur = cx_ite;
									if(0 == cur.hash) {
										c = cur;
										break;
									}
									cx_ite = cx_ite.next;
								}
								if(c == null) {
									if(ZPP_Contact.zpp_pool == null) {
										c = new ZPP_Contact();
									} else {
										c = ZPP_Contact.zpp_pool;
										ZPP_Contact.zpp_pool = c.next;
										c.next = null;
									}
									let ci = c.inner;
									ci.jnAcc = ci.jtAcc = 0;
									c.hash = 0;
									c.fresh = true;
									c.arbiter = arb;
									arb.jrAcc = 0;
									let _this = arb.contacts;
									c._inuse = true;
									let temp = c;
									temp.next = _this.next;
									_this.next = temp;
									_this.modified = true;
									_this.length++;
									arb.innards.add(ci);
								} else {
									c.fresh = false;
								}
								c.px = px1;
								c.py = py1;
								arb.nx = -px * invDist;
								arb.ny = -py * invDist;
								c.dist = dist - minDist;
								c.stamp = arb.stamp;
								c.posOnly = false;
								co = c;
							} else {
								let px1 = s1.circle.worldCOMx + px * df;
								let py1 = s1.circle.worldCOMy + py * df;
								let c = null;
								let cx_ite = arb.contacts.next;
								while(cx_ite != null) {
									let cur = cx_ite;
									if(0 == cur.hash) {
										c = cur;
										break;
									}
									cx_ite = cx_ite.next;
								}
								if(c == null) {
									if(ZPP_Contact.zpp_pool == null) {
										c = new ZPP_Contact();
									} else {
										c = ZPP_Contact.zpp_pool;
										ZPP_Contact.zpp_pool = c.next;
										c.next = null;
									}
									let ci = c.inner;
									ci.jnAcc = ci.jtAcc = 0;
									c.hash = 0;
									c.fresh = true;
									c.arbiter = arb;
									arb.jrAcc = 0;
									let _this = arb.contacts;
									c._inuse = true;
									let temp = c;
									temp.next = _this.next;
									_this.next = temp;
									_this.modified = true;
									_this.length++;
									arb.innards.add(ci);
								} else {
									c.fresh = false;
								}
								c.px = px1;
								c.py = py1;
								arb.nx = px * invDist;
								arb.ny = py * invDist;
								c.dist = dist - minDist;
								c.stamp = arb.stamp;
								c.posOnly = false;
								co = c;
							}
						}
						if(co != null) {
							let con = co.inner;
							arb.ptype = 2;
							let vx = 0.0;
							let vy = 0.0;
							vx = v0.x - s2.polygon.body.posx;
							vy = v0.y - s2.polygon.body.posy;
							arb.__ref_edge1 = a0;
							arb.__ref_vertex = -1;
							if(rev) {
								con.lr1x = vx * s2.polygon.body.axisy + vy * s2.polygon.body.axisx;
								con.lr1y = vy * s2.polygon.body.axisy - vx * s2.polygon.body.axisx;
								con.lr2x = s1.circle.localCOMx;
								con.lr2y = s1.circle.localCOMy;
							} else {
								con.lr2x = vx * s2.polygon.body.axisy + vy * s2.polygon.body.axisx;
								con.lr2y = vy * s2.polygon.body.axisy - vx * s2.polygon.body.axisx;
								con.lr1x = s1.circle.localCOMx;
								con.lr1y = s1.circle.localCOMy;
							}
							arb.radius = s1.circle.radius;
						}
						return co != null;
					} else if(dt >= v1.y * a0.gnormx - v1.x * a0.gnormy) {
						let minDist = s1.circle.radius;
						let px = 0.0;
						let py = 0.0;
						px = v1.x - s1.circle.worldCOMx;
						py = v1.y - s1.circle.worldCOMy;
						let distSqr = px * px + py * py;
						let co;
						if(distSqr > minDist * minDist) {
							co = null;
						} else if(distSqr < Config.epsilon * Config.epsilon) {
							let px = s1.circle.worldCOMx;
							let py = s1.circle.worldCOMy;
							let c = null;
							let cx_ite = arb.contacts.next;
							while(cx_ite != null) {
								let cur = cx_ite;
								if(0 == cur.hash) {
									c = cur;
									break;
								}
								cx_ite = cx_ite.next;
							}
							if(c == null) {
								if(ZPP_Contact.zpp_pool == null) {
									c = new ZPP_Contact();
								} else {
									c = ZPP_Contact.zpp_pool;
									ZPP_Contact.zpp_pool = c.next;
									c.next = null;
								}
								let ci = c.inner;
								ci.jnAcc = ci.jtAcc = 0;
								c.hash = 0;
								c.fresh = true;
								c.arbiter = arb;
								arb.jrAcc = 0;
								let _this = arb.contacts;
								c._inuse = true;
								let temp = c;
								temp.next = _this.next;
								_this.next = temp;
								_this.modified = true;
								_this.length++;
								arb.innards.add(ci);
							} else {
								c.fresh = false;
							}
							c.px = px;
							c.py = py;
							arb.nx = 1;
							arb.ny = 0;
							c.dist = -minDist;
							c.stamp = arb.stamp;
							c.posOnly = false;
							co = c;
						} else {
							let invDist = 1.0 / Math.sqrt(distSqr);
							let dist = invDist < Config.epsilon ? 1e100 : 1.0 / invDist;
							let df = 0.5 + (s1.circle.radius - 0.5 * minDist) * invDist;
							if(rev) {
								let px1 = s1.circle.worldCOMx + px * df;
								let py1 = s1.circle.worldCOMy + py * df;
								let c = null;
								let cx_ite = arb.contacts.next;
								while(cx_ite != null) {
									let cur = cx_ite;
									if(0 == cur.hash) {
										c = cur;
										break;
									}
									cx_ite = cx_ite.next;
								}
								if(c == null) {
									if(ZPP_Contact.zpp_pool == null) {
										c = new ZPP_Contact();
									} else {
										c = ZPP_Contact.zpp_pool;
										ZPP_Contact.zpp_pool = c.next;
										c.next = null;
									}
									let ci = c.inner;
									ci.jnAcc = ci.jtAcc = 0;
									c.hash = 0;
									c.fresh = true;
									c.arbiter = arb;
									arb.jrAcc = 0;
									let _this = arb.contacts;
									c._inuse = true;
									let temp = c;
									temp.next = _this.next;
									_this.next = temp;
									_this.modified = true;
									_this.length++;
									arb.innards.add(ci);
								} else {
									c.fresh = false;
								}
								c.px = px1;
								c.py = py1;
								arb.nx = -px * invDist;
								arb.ny = -py * invDist;
								c.dist = dist - minDist;
								c.stamp = arb.stamp;
								c.posOnly = false;
								co = c;
							} else {
								let px1 = s1.circle.worldCOMx + px * df;
								let py1 = s1.circle.worldCOMy + py * df;
								let c = null;
								let cx_ite = arb.contacts.next;
								while(cx_ite != null) {
									let cur = cx_ite;
									if(0 == cur.hash) {
										c = cur;
										break;
									}
									cx_ite = cx_ite.next;
								}
								if(c == null) {
									if(ZPP_Contact.zpp_pool == null) {
										c = new ZPP_Contact();
									} else {
										c = ZPP_Contact.zpp_pool;
										ZPP_Contact.zpp_pool = c.next;
										c.next = null;
									}
									let ci = c.inner;
									ci.jnAcc = ci.jtAcc = 0;
									c.hash = 0;
									c.fresh = true;
									c.arbiter = arb;
									arb.jrAcc = 0;
									let _this = arb.contacts;
									c._inuse = true;
									let temp = c;
									temp.next = _this.next;
									_this.next = temp;
									_this.modified = true;
									_this.length++;
									arb.innards.add(ci);
								} else {
									c.fresh = false;
								}
								c.px = px1;
								c.py = py1;
								arb.nx = px * invDist;
								arb.ny = py * invDist;
								c.dist = dist - minDist;
								c.stamp = arb.stamp;
								c.posOnly = false;
								co = c;
							}
						}
						if(co != null) {
							let con = co.inner;
							arb.ptype = 2;
							let vx = 0.0;
							let vy = 0.0;
							vx = v1.x - s2.polygon.body.posx;
							vy = v1.y - s2.polygon.body.posy;
							arb.__ref_edge1 = a0;
							arb.__ref_vertex = 1;
							if(rev) {
								con.lr1x = vx * s2.polygon.body.axisy + vy * s2.polygon.body.axisx;
								con.lr1y = vy * s2.polygon.body.axisy - vx * s2.polygon.body.axisx;
								con.lr2x = s1.circle.localCOMx;
								con.lr2y = s1.circle.localCOMy;
							} else {
								con.lr2x = vx * s2.polygon.body.axisy + vy * s2.polygon.body.axisx;
								con.lr2y = vy * s2.polygon.body.axisy - vx * s2.polygon.body.axisx;
								con.lr1x = s1.circle.localCOMx;
								con.lr1y = s1.circle.localCOMy;
							}
							arb.radius = s1.circle.radius;
						}
						return co != null;
					} else {
						let nx = 0.0;
						let ny = 0.0;
						let t = s1.circle.radius + max * 0.5;
						nx = a0.gnormx * t;
						ny = a0.gnormy * t;
						let px = 0.0;
						let py = 0.0;
						px = s1.circle.worldCOMx - nx;
						py = s1.circle.worldCOMy - ny;
						let con;
						if(rev) {
							let nx = a0.gnormx;
							let ny = a0.gnormy;
							let c = null;
							let cx_ite = arb.contacts.next;
							while(cx_ite != null) {
								let cur = cx_ite;
								if(0 == cur.hash) {
									c = cur;
									break;
								}
								cx_ite = cx_ite.next;
							}
							if(c == null) {
								if(ZPP_Contact.zpp_pool == null) {
									c = new ZPP_Contact();
								} else {
									c = ZPP_Contact.zpp_pool;
									ZPP_Contact.zpp_pool = c.next;
									c.next = null;
								}
								let ci = c.inner;
								ci.jnAcc = ci.jtAcc = 0;
								c.hash = 0;
								c.fresh = true;
								c.arbiter = arb;
								arb.jrAcc = 0;
								let _this = arb.contacts;
								c._inuse = true;
								let temp = c;
								temp.next = _this.next;
								_this.next = temp;
								_this.modified = true;
								_this.length++;
								arb.innards.add(ci);
							} else {
								c.fresh = false;
							}
							c.px = px;
							c.py = py;
							arb.nx = nx;
							arb.ny = ny;
							c.dist = max;
							c.stamp = arb.stamp;
							c.posOnly = false;
							con = c;
						} else {
							let nx = -a0.gnormx;
							let ny = -a0.gnormy;
							let c = null;
							let cx_ite = arb.contacts.next;
							while(cx_ite != null) {
								let cur = cx_ite;
								if(0 == cur.hash) {
									c = cur;
									break;
								}
								cx_ite = cx_ite.next;
							}
							if(c == null) {
								if(ZPP_Contact.zpp_pool == null) {
									c = new ZPP_Contact();
								} else {
									c = ZPP_Contact.zpp_pool;
									ZPP_Contact.zpp_pool = c.next;
									c.next = null;
								}
								let ci = c.inner;
								ci.jnAcc = ci.jtAcc = 0;
								c.hash = 0;
								c.fresh = true;
								c.arbiter = arb;
								arb.jrAcc = 0;
								let _this = arb.contacts;
								c._inuse = true;
								let temp = c;
								temp.next = _this.next;
								_this.next = temp;
								_this.modified = true;
								_this.length++;
								arb.innards.add(ci);
							} else {
								c.fresh = false;
							}
							c.px = px;
							c.py = py;
							arb.nx = nx;
							arb.ny = ny;
							c.dist = max;
							c.stamp = arb.stamp;
							c.posOnly = false;
							con = c;
						}
						arb.ptype = rev ? 0 : 1;
						arb.lnormx = a0.lnormx;
						arb.lnormy = a0.lnormy;
						arb.rev = !rev;
						arb.lproj = a0.lprojection;
						arb.radius = s1.circle.radius;
						con.inner.lr1x = s1.circle.localCOMx;
						con.inner.lr1y = s1.circle.localCOMy;
						arb.__ref_edge1 = a0;
						arb.__ref_vertex = 0;
						return true;
					}
				} else {
					return false;
				}
			}
		} else {
			let minDist = s1.circle.radius + s2.circle.radius;
			let px = 0.0;
			let py = 0.0;
			px = s2.circle.worldCOMx - s1.circle.worldCOMx;
			py = s2.circle.worldCOMy - s1.circle.worldCOMy;
			let distSqr = px * px + py * py;
			let co;
			if(distSqr > minDist * minDist) {
				co = null;
			} else if(distSqr < Config.epsilon * Config.epsilon) {
				let px = s1.circle.worldCOMx;
				let py = s1.circle.worldCOMy;
				let c = null;
				let cx_ite = arb.contacts.next;
				while(cx_ite != null) {
					let cur = cx_ite;
					if(0 == cur.hash) {
						c = cur;
						break;
					}
					cx_ite = cx_ite.next;
				}
				if(c == null) {
					if(ZPP_Contact.zpp_pool == null) {
						c = new ZPP_Contact();
					} else {
						c = ZPP_Contact.zpp_pool;
						ZPP_Contact.zpp_pool = c.next;
						c.next = null;
					}
					let ci = c.inner;
					ci.jnAcc = ci.jtAcc = 0;
					c.hash = 0;
					c.fresh = true;
					c.arbiter = arb;
					arb.jrAcc = 0;
					let _this = arb.contacts;
					c._inuse = true;
					let temp = c;
					temp.next = _this.next;
					_this.next = temp;
					_this.modified = true;
					_this.length++;
					arb.innards.add(ci);
				} else {
					c.fresh = false;
				}
				c.px = px;
				c.py = py;
				arb.nx = 1;
				arb.ny = 0;
				c.dist = -minDist;
				c.stamp = arb.stamp;
				c.posOnly = false;
				co = c;
			} else {
				let invDist = 1.0 / Math.sqrt(distSqr);
				let dist = invDist < Config.epsilon ? 1e100 : 1.0 / invDist;
				let df = 0.5 + (s1.circle.radius - 0.5 * minDist) * invDist;
				if(rev) {
					let px1 = s1.circle.worldCOMx + px * df;
					let py1 = s1.circle.worldCOMy + py * df;
					let c = null;
					let cx_ite = arb.contacts.next;
					while(cx_ite != null) {
						let cur = cx_ite;
						if(0 == cur.hash) {
							c = cur;
							break;
						}
						cx_ite = cx_ite.next;
					}
					if(c == null) {
						if(ZPP_Contact.zpp_pool == null) {
							c = new ZPP_Contact();
						} else {
							c = ZPP_Contact.zpp_pool;
							ZPP_Contact.zpp_pool = c.next;
							c.next = null;
						}
						let ci = c.inner;
						ci.jnAcc = ci.jtAcc = 0;
						c.hash = 0;
						c.fresh = true;
						c.arbiter = arb;
						arb.jrAcc = 0;
						let _this = arb.contacts;
						c._inuse = true;
						let temp = c;
						temp.next = _this.next;
						_this.next = temp;
						_this.modified = true;
						_this.length++;
						arb.innards.add(ci);
					} else {
						c.fresh = false;
					}
					c.px = px1;
					c.py = py1;
					arb.nx = -px * invDist;
					arb.ny = -py * invDist;
					c.dist = dist - minDist;
					c.stamp = arb.stamp;
					c.posOnly = false;
					co = c;
				} else {
					let px1 = s1.circle.worldCOMx + px * df;
					let py1 = s1.circle.worldCOMy + py * df;
					let c = null;
					let cx_ite = arb.contacts.next;
					while(cx_ite != null) {
						let cur = cx_ite;
						if(0 == cur.hash) {
							c = cur;
							break;
						}
						cx_ite = cx_ite.next;
					}
					if(c == null) {
						if(ZPP_Contact.zpp_pool == null) {
							c = new ZPP_Contact();
						} else {
							c = ZPP_Contact.zpp_pool;
							ZPP_Contact.zpp_pool = c.next;
							c.next = null;
						}
						let ci = c.inner;
						ci.jnAcc = ci.jtAcc = 0;
						c.hash = 0;
						c.fresh = true;
						c.arbiter = arb;
						arb.jrAcc = 0;
						let _this = arb.contacts;
						c._inuse = true;
						let temp = c;
						temp.next = _this.next;
						_this.next = temp;
						_this.modified = true;
						_this.length++;
						arb.innards.add(ci);
					} else {
						c.fresh = false;
					}
					c.px = px1;
					c.py = py1;
					arb.nx = px * invDist;
					arb.ny = py * invDist;
					c.dist = dist - minDist;
					c.stamp = arb.stamp;
					c.posOnly = false;
					co = c;
				}
			}
			if(co != null) {
				let con = co.inner;
				if(rev) {
					con.lr1x = s2.circle.localCOMx;
					con.lr1y = s2.circle.localCOMy;
					con.lr2x = s1.circle.localCOMx;
					con.lr2y = s1.circle.localCOMy;
				} else {
					con.lr1x = s1.circle.localCOMx;
					con.lr1y = s1.circle.localCOMy;
					con.lr2x = s2.circle.localCOMx;
					con.lr2y = s2.circle.localCOMy;
				}
				arb.radius = s1.circle.radius + s2.circle.radius;
				arb.ptype = 2;
				return true;
			} else {
				return false;
			}
		}
	}
	static testCollide_safe(s1,s2) {
		if(s2.type == ZPP_Flags.id_ShapeType_CIRCLE) {
			let t = s1;
			s1 = s2;
			s2 = t;
		}
		return ZPP_Collide.testCollide(s1,s2);
	}
	static testCollide(s1,s2) {
		if(s2.type == ZPP_Flags.id_ShapeType_POLYGON) {
			if(s1.type == ZPP_Flags.id_ShapeType_POLYGON) {
				let cont = true;
				let cx_ite = s1.polygon.edges.head;
				while(cx_ite != null) {
					let ax = cx_ite.elt;
					let min = 1e100;
					let cx_ite1 = s2.polygon.gverts.next;
					while(cx_ite1 != null) {
						let v = cx_ite1;
						let k = ax.gnormx * v.x + ax.gnormy * v.y;
						if(k < min) {
							min = k;
						}
						cx_ite1 = cx_ite1.next;
					}
					min -= ax.gprojection;
					if(min > 0) {
						cont = false;
						break;
					}
					cx_ite = cx_ite.next;
				}
				if(cont) {
					let cx_ite = s2.polygon.edges.head;
					while(cx_ite != null) {
						let ax = cx_ite.elt;
						let min = 1e100;
						let cx_ite1 = s1.polygon.gverts.next;
						while(cx_ite1 != null) {
							let v = cx_ite1;
							let k = ax.gnormx * v.x + ax.gnormy * v.y;
							if(k < min) {
								min = k;
							}
							cx_ite1 = cx_ite1.next;
						}
						min -= ax.gprojection;
						if(min > 0) {
							cont = false;
							break;
						}
						cx_ite = cx_ite.next;
					}
					return cont;
				} else {
					return false;
				}
			} else {
				let a0 = null;
				let vi = null;
				let cont = true;
				let max = -1e+100;
				let vite = s2.polygon.gverts.next;
				let cx_ite = s2.polygon.edges.head;
				while(cx_ite != null) {
					let a = cx_ite.elt;
					let dist = a.gnormx * s1.circle.worldCOMx + a.gnormy * s1.circle.worldCOMy - a.gprojection - s1.circle.radius;
					if(dist > 0) {
						cont = false;
						break;
					}
					if(dist > max) {
						max = dist;
						a0 = a;
						vi = vite;
					}
					vite = vite.next;
					cx_ite = cx_ite.next;
				}
				if(cont) {
					let v0 = vi;
					let v1 = vi.next == null ? s2.polygon.gverts.next : vi.next;
					let dt = s1.circle.worldCOMy * a0.gnormx - s1.circle.worldCOMx * a0.gnormy;
					if(dt <= v0.y * a0.gnormx - v0.x * a0.gnormy) {
						let minDist = s1.circle.radius;
						let px = 0.0;
						let py = 0.0;
						px = v0.x - s1.circle.worldCOMx;
						py = v0.y - s1.circle.worldCOMy;
						let distSqr = px * px + py * py;
						return distSqr <= minDist * minDist;
					} else if(dt >= v1.y * a0.gnormx - v1.x * a0.gnormy) {
						let minDist = s1.circle.radius;
						let px = 0.0;
						let py = 0.0;
						px = v1.x - s1.circle.worldCOMx;
						py = v1.y - s1.circle.worldCOMy;
						let distSqr = px * px + py * py;
						return distSqr <= minDist * minDist;
					} else {
						return true;
					}
				} else {
					return false;
				}
			}
		} else {
			let minDist = s1.circle.radius + s2.circle.radius;
			let px = 0.0;
			let py = 0.0;
			px = s2.circle.worldCOMx - s1.circle.worldCOMx;
			py = s2.circle.worldCOMy - s1.circle.worldCOMy;
			let distSqr = px * px + py * py;
			return distSqr <= minDist * minDist;
		}
	}
	static flowCollide(s1,s2,arb) {
		if(s2.type == ZPP_Flags.id_ShapeType_POLYGON) {
			if(s1.type == ZPP_Flags.id_ShapeType_POLYGON) {
				let out1 = [];
				let out2 = [];
				let cont = true;
				let total = true;
				let cx_ite = s1.polygon.edges.head;
				while(cx_ite != null) {
					let ax = cx_ite.elt;
					let min = 1e100;
					let ind = 0;
					let cx_ite1 = s2.polygon.gverts.next;
					while(cx_ite1 != null) {
						let v = cx_ite1;
						let k = ax.gnormx * v.x + ax.gnormy * v.y;
						if(k < min) {
							min = k;
						}
						if(k >= ax.gprojection + Config.epsilon) {
							out2[ind] = true;
							total = false;
						}
						++ind;
						cx_ite1 = cx_ite1.next;
					}
					min -= ax.gprojection;
					if(min > 0) {
						cont = false;
						break;
					}
					cx_ite = cx_ite.next;
				}
				if(total) {
					let _this = s2.polygon;
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
					arb.overlap = s2.polygon.area;
					arb.centroidx = s2.polygon.worldCOMx;
					arb.centroidy = s2.polygon.worldCOMy;
					return true;
				} else if(cont) {
					total = true;
					let cx_ite = s2.polygon.edges.head;
					while(cx_ite != null) {
						let ax = cx_ite.elt;
						let min = 1e100;
						let ind = 0;
						let cx_ite1 = s1.polygon.gverts.next;
						while(cx_ite1 != null) {
							let v = cx_ite1;
							let k = ax.gnormx * v.x + ax.gnormy * v.y;
							if(k < min) {
								min = k;
							}
							if(k >= ax.gprojection + Config.epsilon) {
								out1[ind] = true;
								total = false;
							}
							++ind;
							cx_ite1 = cx_ite1.next;
						}
						min -= ax.gprojection;
						if(min > 0) {
							cont = false;
							break;
						}
						cx_ite = cx_ite.next;
					}
					if(total) {
						let _this = s1.polygon;
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
						arb.overlap = s1.polygon.area;
						arb.centroidx = s1.polygon.worldCOMx;
						arb.centroidy = s1.polygon.worldCOMy;
						return true;
					} else if(cont) {
						while(ZPP_Collide.flowpoly.head != null) {
							let p = ZPP_Collide.flowpoly.pop_unsafe();
							if(!p._inuse) {
								let o = p;
								if(o.outer != null) {
									o.outer.zpp_inner = null;
									o.outer = null;
								}
								o._isimmutable = null;
								o._validate = null;
								o._invalidate = null;
								o.next = ZPP_Vec2.zpp_pool;
								ZPP_Vec2.zpp_pool = o;
							}
						}
						let fst_vert = null;
						let poly1 = false;
						let ite1 = s1.polygon.gverts.next;
						let ind1 = 0;
						let ite2 = s2.polygon.gverts.next;
						let ind2 = 0;
						let _g = 0;
						let _g1 = s2.polygon.edgeCnt;
						while(_g < _g1) {
							let i = _g++;
							if(!out2[i]) {
								ind2 = i;
								break;
							} else {
								ite2 = ite2.next;
							}
						}
						if(ite2 == null) {
							ite2 = s2.polygon.gverts.next;
							poly1 = true;
							let _g = 0;
							let _g1 = s1.polygon.edgeCnt;
							while(_g < _g1) {
								let i = _g++;
								if(!out1[i]) {
									ind1 = i;
									break;
								} else {
									ite1 = ite1.next;
								}
							}
							if(ite1 == null) {
								ite1 = s1.polygon.gverts.next;
							} else {
								ZPP_Collide.flowpoly.add(ite1);
								fst_vert = ZPP_Collide.flowpoly.head.elt;
							}
						} else {
							ZPP_Collide.flowpoly.add(ite2);
							fst_vert = ZPP_Collide.flowpoly.head.elt;
						}
						let cnt = 1;
						if(ZPP_Collide.flowpoly.head == null) {
							let cx_cont = true;
							let cx_itei = s1.polygon.gverts.next;
							let u = cx_itei;
							let cx_itej = cx_itei.next;
							while(cx_itej != null) {
								let v = cx_itej;
								let min = 2.0;
								let cx_cont1 = true;
								let cx_itei1 = s2.polygon.gverts.next;
								let a = cx_itei1;
								let cx_itej1 = cx_itei1.next;
								while(cx_itej1 != null) {
									let b = cx_itej1;
									let t = 0.0;
									let _sx = 0.0;
									let _sy = 0.0;
									_sx = u.x - a.x;
									_sy = u.y - a.y;
									let _vx = 0.0;
									let _vy = 0.0;
									_vx = v.x - u.x;
									_vy = v.y - u.y;
									let _qx = 0.0;
									let _qy = 0.0;
									_qx = b.x - a.x;
									_qy = b.y - a.y;
									let den = _vy * _qx - _vx * _qy;
									let tmp;
									if(den * den > Config.epsilon * Config.epsilon) {
										den = 1 / den;
										let txx = (_qy * _sx - _qx * _sy) * den;
										if(txx > Config.epsilon && txx < 1 - Config.epsilon) {
											let sxx = (_vy * _sx - _vx * _sy) * den;
											if(sxx > Config.epsilon && sxx < 1 - Config.epsilon) {
												t = txx;
												tmp = true;
											} else {
												tmp = false;
											}
										} else {
											tmp = false;
										}
									} else {
										tmp = false;
									}
									if(tmp) {
										if(t < min) {
											min = t;
											ite2 = cx_itei1;
										}
									}
									cx_itei1 = cx_itej1;
									a = b;
									cx_itej1 = cx_itej1.next;
								}
								if(cx_cont1) {
									while(true) {
										cx_itej1 = s2.polygon.gverts.next;
										let b = cx_itej1;
										let t = 0.0;
										let _sx = 0.0;
										let _sy = 0.0;
										_sx = u.x - a.x;
										_sy = u.y - a.y;
										let _vx = 0.0;
										let _vy = 0.0;
										_vx = v.x - u.x;
										_vy = v.y - u.y;
										let _qx = 0.0;
										let _qy = 0.0;
										_qx = b.x - a.x;
										_qy = b.y - a.y;
										let den = _vy * _qx - _vx * _qy;
										let tmp;
										if(den * den > Config.epsilon * Config.epsilon) {
											den = 1 / den;
											let txx = (_qy * _sx - _qx * _sy) * den;
											if(txx > Config.epsilon && txx < 1 - Config.epsilon) {
												let sxx = (_vy * _sx - _vx * _sy) * den;
												if(sxx > Config.epsilon && sxx < 1 - Config.epsilon) {
													t = txx;
													tmp = true;
												} else {
													tmp = false;
												}
											} else {
												tmp = false;
											}
										} else {
											tmp = false;
										}
										if(tmp) {
											if(t < min) {
												min = t;
												ite2 = cx_itei1;
											}
										}
										if(!false) {
											break;
										}
									}
								}
								if(min != 2.0) {
									let cx = 0.0;
									let cy = 0.0;
									let T = min;
									cx = u.x + (v.x - u.x) * T;
									cy = u.y + (v.y - u.y) * T;
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
									ret.x = cx;
									ret.y = cy;
									fst_vert = ret;
									ZPP_Collide.flowpoly.add(fst_vert);
									poly1 = true;
									ite1 = cx_itei;
									cx_cont = false;
									break;
								}
								cx_itei = cx_itej;
								u = v;
								cx_itej = cx_itej.next;
							}
							if(cx_cont) {
								while(true) {
									cx_itej = s1.polygon.gverts.next;
									let v = cx_itej;
									let min = 2.0;
									let cx_cont = true;
									let cx_itei1 = s2.polygon.gverts.next;
									let a = cx_itei1;
									let cx_itej1 = cx_itei1.next;
									while(cx_itej1 != null) {
										let b = cx_itej1;
										let t = 0.0;
										let _sx = 0.0;
										let _sy = 0.0;
										_sx = u.x - a.x;
										_sy = u.y - a.y;
										let _vx = 0.0;
										let _vy = 0.0;
										_vx = v.x - u.x;
										_vy = v.y - u.y;
										let _qx = 0.0;
										let _qy = 0.0;
										_qx = b.x - a.x;
										_qy = b.y - a.y;
										let den = _vy * _qx - _vx * _qy;
										let tmp;
										if(den * den > Config.epsilon * Config.epsilon) {
											den = 1 / den;
											let txx = (_qy * _sx - _qx * _sy) * den;
											if(txx > Config.epsilon && txx < 1 - Config.epsilon) {
												let sxx = (_vy * _sx - _vx * _sy) * den;
												if(sxx > Config.epsilon && sxx < 1 - Config.epsilon) {
													t = txx;
													tmp = true;
												} else {
													tmp = false;
												}
											} else {
												tmp = false;
											}
										} else {
											tmp = false;
										}
										if(tmp) {
											if(t < min) {
												min = t;
												ite2 = cx_itei1;
											}
										}
										cx_itei1 = cx_itej1;
										a = b;
										cx_itej1 = cx_itej1.next;
									}
									if(cx_cont) {
										while(true) {
											cx_itej1 = s2.polygon.gverts.next;
											let b = cx_itej1;
											let t = 0.0;
											let _sx = 0.0;
											let _sy = 0.0;
											_sx = u.x - a.x;
											_sy = u.y - a.y;
											let _vx = 0.0;
											let _vy = 0.0;
											_vx = v.x - u.x;
											_vy = v.y - u.y;
											let _qx = 0.0;
											let _qy = 0.0;
											_qx = b.x - a.x;
											_qy = b.y - a.y;
											let den = _vy * _qx - _vx * _qy;
											let tmp;
											if(den * den > Config.epsilon * Config.epsilon) {
												den = 1 / den;
												let txx = (_qy * _sx - _qx * _sy) * den;
												if(txx > Config.epsilon && txx < 1 - Config.epsilon) {
													let sxx = (_vy * _sx - _vx * _sy) * den;
													if(sxx > Config.epsilon && sxx < 1 - Config.epsilon) {
														t = txx;
														tmp = true;
													} else {
														tmp = false;
													}
												} else {
													tmp = false;
												}
											} else {
												tmp = false;
											}
											if(tmp) {
												if(t < min) {
													min = t;
													ite2 = cx_itei1;
												}
											}
											if(!false) {
												break;
											}
										}
									}
									if(min != 2.0) {
										let cx = 0.0;
										let cy = 0.0;
										let T = min;
										cx = u.x + (v.x - u.x) * T;
										cy = u.y + (v.y - u.y) * T;
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
										ret.x = cx;
										ret.y = cy;
										fst_vert = ret;
										ZPP_Collide.flowpoly.add(fst_vert);
										poly1 = true;
										ite1 = cx_itei;
										break;
									}
									if(!false) {
										break;
									}
								}
							}
							cnt = 2;
						}
						while(true) if(poly1) {
							ite1 = ite1.next;
							++ind1;
							if(ite1 == null) {
								ite1 = s1.polygon.gverts.next;
								ind1 = 0;
							}
							if(!out1[ind1]) {
								let ex = ite1;
								let tmp;
								if(fst_vert != null) {
									let dx = 0.0;
									let dy = 0.0;
									dx = ex.x - fst_vert.x;
									dy = ex.y - fst_vert.y;
									tmp = dx * dx + dy * dy < Config.epsilon;
								} else {
									tmp = false;
								}
								if(tmp) {
									break;
								}
								ZPP_Collide.flowpoly.add(ex);
								if(fst_vert == null) {
									fst_vert = ZPP_Collide.flowpoly.head.elt;
								}
								cnt = 1;
							} else {
								let a = ZPP_Collide.flowpoly.head.elt;
								let b = ite1;
								let u = ite2;
								let itm = ite2.next;
								if(itm == null) {
									itm = s2.polygon.gverts.next;
								}
								let max = -1.0;
								let itmo = null;
								let indo = 0;
								let icnt = 0;
								let beg_ite = itm;
								let cx_ite = itm;
								while(true) {
									let v = cx_ite;
									let t = 0.0;
									let _sx = 0.0;
									let _sy = 0.0;
									_sx = u.x - a.x;
									_sy = u.y - a.y;
									let _vx = 0.0;
									let _vy = 0.0;
									_vx = v.x - u.x;
									_vy = v.y - u.y;
									let _qx = 0.0;
									let _qy = 0.0;
									_qx = b.x - a.x;
									_qy = b.y - a.y;
									let den = _vy * _qx - _vx * _qy;
									let tmp;
									if(den * den > Config.epsilon * Config.epsilon) {
										den = 1 / den;
										let txx = (_qy * _sx - _qx * _sy) * den;
										if(txx > Config.epsilon && txx < 1 - Config.epsilon) {
											let sxx = (_vy * _sx - _vx * _sy) * den;
											if(sxx > Config.epsilon && sxx < 1 - Config.epsilon) {
												t = txx;
												tmp = true;
											} else {
												tmp = false;
											}
										} else {
											tmp = false;
										}
									} else {
										tmp = false;
									}
									if(tmp) {
										if(t >= max) {
											itmo = ite2;
											indo = ind2;
											if(++icnt == cnt) {
												max = t;
												cx_ite = beg_ite;
												break;
											} else {
												max = t;
											}
										}
									}
									u = v;
									ite2 = cx_ite;
									++ind2;
									if(ind2 >= s2.polygon.edgeCnt) {
										ind2 = 0;
									}
									cx_ite = cx_ite.next;
									if(cx_ite == null) {
										cx_ite = s2.polygon.gverts.next;
									}
									if(!false) {
										break;
									}
								}
								while(cx_ite != beg_ite) {
									let v = cx_ite;
									let t = 0.0;
									let _sx = 0.0;
									let _sy = 0.0;
									_sx = u.x - a.x;
									_sy = u.y - a.y;
									let _vx = 0.0;
									let _vy = 0.0;
									_vx = v.x - u.x;
									_vy = v.y - u.y;
									let _qx = 0.0;
									let _qy = 0.0;
									_qx = b.x - a.x;
									_qy = b.y - a.y;
									let den = _vy * _qx - _vx * _qy;
									let tmp;
									if(den * den > Config.epsilon * Config.epsilon) {
										den = 1 / den;
										let txx = (_qy * _sx - _qx * _sy) * den;
										if(txx > Config.epsilon && txx < 1 - Config.epsilon) {
											let sxx = (_vy * _sx - _vx * _sy) * den;
											if(sxx > Config.epsilon && sxx < 1 - Config.epsilon) {
												t = txx;
												tmp = true;
											} else {
												tmp = false;
											}
										} else {
											tmp = false;
										}
									} else {
										tmp = false;
									}
									if(tmp) {
										if(t >= max) {
											itmo = ite2;
											indo = ind2;
											if(++icnt == cnt) {
												max = t;
												cx_ite = beg_ite;
												break;
											} else {
												max = t;
											}
										}
									}
									u = v;
									ite2 = cx_ite;
									++ind2;
									if(ind2 >= s2.polygon.edgeCnt) {
										ind2 = 0;
									}
									cx_ite = cx_ite.next;
									if(cx_ite == null) {
										cx_ite = s2.polygon.gverts.next;
									}
								}
								if(itmo == null) {
									break;
								}
								let u1 = itmo;
								let itm2 = itmo.next;
								if(itm2 == null) {
									itm2 = s2.polygon.gverts.next;
								}
								let v = itm2;
								let cx = 0.0;
								let cy = 0.0;
								let T = max;
								cx = u1.x + (v.x - u1.x) * T;
								cy = u1.y + (v.y - u1.y) * T;
								let tmp;
								if(fst_vert != null) {
									let dx = 0.0;
									let dy = 0.0;
									dx = cx - fst_vert.x;
									dy = cy - fst_vert.y;
									tmp = dx * dx + dy * dy < Config.epsilon;
								} else {
									tmp = false;
								}
								if(tmp) {
									break;
								}
								let tmp1 = ZPP_Collide.flowpoly;
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
								ret.x = cx;
								ret.y = cy;
								tmp1.add(ret);
								if(fst_vert == null) {
									fst_vert = ZPP_Collide.flowpoly.head.elt;
								}
								ite2 = itmo;
								ind2 = indo;
								poly1 = !poly1;
								cnt = 2;
							}
						} else {
							ite2 = ite2.next;
							++ind2;
							if(ite2 == null) {
								ite2 = s2.polygon.gverts.next;
								ind2 = 0;
							}
							if(!out2[ind2]) {
								let ex = ite2;
								let tmp;
								if(fst_vert != null) {
									let dx = 0.0;
									let dy = 0.0;
									dx = ex.x - fst_vert.x;
									dy = ex.y - fst_vert.y;
									tmp = dx * dx + dy * dy < Config.epsilon;
								} else {
									tmp = false;
								}
								if(tmp) {
									break;
								}
								ZPP_Collide.flowpoly.add(ex);
								if(fst_vert == null) {
									fst_vert = ZPP_Collide.flowpoly.head.elt;
								}
								cnt = 1;
							} else {
								let a = ZPP_Collide.flowpoly.head.elt;
								let b = ite2;
								let u = ite1;
								let itm = ite1.next;
								if(itm == null) {
									itm = s1.polygon.gverts.next;
								}
								let max = -1.0;
								let itmo = null;
								let indo = 0;
								let icnt = 0;
								let beg_ite = itm;
								let cx_ite = itm;
								while(true) {
									let v = cx_ite;
									let t = 0.0;
									let _sx = 0.0;
									let _sy = 0.0;
									_sx = u.x - a.x;
									_sy = u.y - a.y;
									let _vx = 0.0;
									let _vy = 0.0;
									_vx = v.x - u.x;
									_vy = v.y - u.y;
									let _qx = 0.0;
									let _qy = 0.0;
									_qx = b.x - a.x;
									_qy = b.y - a.y;
									let den = _vy * _qx - _vx * _qy;
									let tmp;
									if(den * den > Config.epsilon * Config.epsilon) {
										den = 1 / den;
										let txx = (_qy * _sx - _qx * _sy) * den;
										if(txx > Config.epsilon && txx < 1 - Config.epsilon) {
											let sxx = (_vy * _sx - _vx * _sy) * den;
											if(sxx > Config.epsilon && sxx < 1 - Config.epsilon) {
												t = txx;
												tmp = true;
											} else {
												tmp = false;
											}
										} else {
											tmp = false;
										}
									} else {
										tmp = false;
									}
									if(tmp) {
										if(t >= max) {
											itmo = ite1;
											indo = ind1;
											if(++icnt == cnt) {
												max = t;
												cx_ite = beg_ite;
												break;
											} else {
												max = t;
											}
										}
									}
									u = v;
									ite1 = cx_ite;
									++ind1;
									if(ind1 >= s1.polygon.edgeCnt) {
										ind1 = 0;
									}
									cx_ite = cx_ite.next;
									if(cx_ite == null) {
										cx_ite = s1.polygon.gverts.next;
									}
									if(!false) {
										break;
									}
								}
								while(cx_ite != beg_ite) {
									let v = cx_ite;
									let t = 0.0;
									let _sx = 0.0;
									let _sy = 0.0;
									_sx = u.x - a.x;
									_sy = u.y - a.y;
									let _vx = 0.0;
									let _vy = 0.0;
									_vx = v.x - u.x;
									_vy = v.y - u.y;
									let _qx = 0.0;
									let _qy = 0.0;
									_qx = b.x - a.x;
									_qy = b.y - a.y;
									let den = _vy * _qx - _vx * _qy;
									let tmp;
									if(den * den > Config.epsilon * Config.epsilon) {
										den = 1 / den;
										let txx = (_qy * _sx - _qx * _sy) * den;
										if(txx > Config.epsilon && txx < 1 - Config.epsilon) {
											let sxx = (_vy * _sx - _vx * _sy) * den;
											if(sxx > Config.epsilon && sxx < 1 - Config.epsilon) {
												t = txx;
												tmp = true;
											} else {
												tmp = false;
											}
										} else {
											tmp = false;
										}
									} else {
										tmp = false;
									}
									if(tmp) {
										if(t >= max) {
											itmo = ite1;
											indo = ind1;
											if(++icnt == cnt) {
												max = t;
												cx_ite = beg_ite;
												break;
											} else {
												max = t;
											}
										}
									}
									u = v;
									ite1 = cx_ite;
									++ind1;
									if(ind1 >= s1.polygon.edgeCnt) {
										ind1 = 0;
									}
									cx_ite = cx_ite.next;
									if(cx_ite == null) {
										cx_ite = s1.polygon.gverts.next;
									}
								}
								if(itmo == null) {
									break;
								}
								let u1 = itmo;
								let itm2 = itmo.next;
								if(itm2 == null) {
									itm2 = s1.polygon.gverts.next;
								}
								let v = itm2;
								let cx = 0.0;
								let cy = 0.0;
								let T = max;
								cx = u1.x + (v.x - u1.x) * T;
								cy = u1.y + (v.y - u1.y) * T;
								let tmp;
								if(fst_vert != null) {
									let dx = 0.0;
									let dy = 0.0;
									dx = cx - fst_vert.x;
									dy = cy - fst_vert.y;
									tmp = dx * dx + dy * dy < Config.epsilon;
								} else {
									tmp = false;
								}
								if(tmp) {
									break;
								}
								let tmp1 = ZPP_Collide.flowpoly;
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
								ret.x = cx;
								ret.y = cy;
								tmp1.add(ret);
								if(fst_vert == null) {
									fst_vert = ZPP_Collide.flowpoly.head.elt;
								}
								ite1 = itmo;
								ind1 = indo;
								poly1 = !poly1;
								cnt = 2;
							}
						}
						if(ZPP_Collide.flowpoly.head != null && ZPP_Collide.flowpoly.head.next != null && ZPP_Collide.flowpoly.head.next.next != null) {
							let area = 0.0;
							let COMx = 0.0;
							let COMy = 0.0;
							COMx = 0;
							COMy = 0;
							area = 0.0;
							let cx_ite = ZPP_Collide.flowpoly.head;
							let u = cx_ite.elt;
							cx_ite = cx_ite.next;
							let v = cx_ite.elt;
							cx_ite = cx_ite.next;
							while(cx_ite != null) {
								let w = cx_ite.elt;
								area += v.x * (w.y - u.y);
								let cf = w.y * v.x - w.x * v.y;
								COMx += (v.x + w.x) * cf;
								COMy += (v.y + w.y) * cf;
								u = v;
								v = w;
								cx_ite = cx_ite.next;
							}
							cx_ite = ZPP_Collide.flowpoly.head;
							let w = cx_ite.elt;
							area += v.x * (w.y - u.y);
							let cf = w.y * v.x - w.x * v.y;
							COMx += (v.x + w.x) * cf;
							COMy += (v.y + w.y) * cf;
							u = v;
							v = w;
							cx_ite = cx_ite.next;
							let w1 = cx_ite.elt;
							area += v.x * (w1.y - u.y);
							let cf1 = w1.y * v.x - w1.x * v.y;
							COMx += (v.x + w1.x) * cf1;
							COMy += (v.y + w1.y) * cf1;
							area *= 0.5;
							let ia = 1 / (6 * area);
							let t = ia;
							COMx *= t;
							COMy *= t;
							arb.overlap = -area;
							arb.centroidx = COMx;
							arb.centroidy = COMy;
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}
				} else {
					return false;
				}
			} else {
				let inte = [];
				let total = true;
				let a0 = null;
				let vi = null;
				let max = -1e+100;
				let cont = true;
				let vite = s2.polygon.gverts.next;
				let ind = 0;
				let cx_ite = s2.polygon.edges.head;
				while(cx_ite != null) {
					let a = cx_ite.elt;
					let dist = a.gnormx * s1.circle.worldCOMx + a.gnormy * s1.circle.worldCOMy;
					if(dist > a.gprojection + s1.circle.radius) {
						cont = false;
						break;
					} else if(dist + s1.circle.radius > a.gprojection + Config.epsilon) {
						total = false;
						inte[ind] = true;
					}
					dist -= a.gprojection + s1.circle.radius;
					if(dist > max) {
						max = dist;
						a0 = a;
						vi = vite;
					}
					vite = vite.next;
					++ind;
					cx_ite = cx_ite.next;
				}
				if(cont) {
					if(total) {
						arb.overlap = s1.circle.area;
						arb.centroidx = s1.circle.worldCOMx;
						arb.centroidy = s1.circle.worldCOMy;
						return true;
					} else {
						let v0 = vi;
						let v1 = vi.next == null ? s2.polygon.gverts.next : vi.next;
						let dt = s1.circle.worldCOMy * a0.gnormx - s1.circle.worldCOMx * a0.gnormy;
						let tmp;
						if(dt <= v0.y * a0.gnormx - v0.x * a0.gnormy) {
							let minDist = s1.circle.radius;
							let px = 0.0;
							let py = 0.0;
							px = v0.x - s1.circle.worldCOMx;
							py = v0.y - s1.circle.worldCOMy;
							let distSqr = px * px + py * py;
							tmp = distSqr <= minDist * minDist;
						} else if(dt >= v1.y * a0.gnormx - v1.x * a0.gnormy) {
							let minDist = s1.circle.radius;
							let px = 0.0;
							let py = 0.0;
							px = v1.x - s1.circle.worldCOMx;
							py = v1.y - s1.circle.worldCOMy;
							let distSqr = px * px + py * py;
							tmp = distSqr <= minDist * minDist;
						} else {
							tmp = true;
						}
						if(tmp) {
							let ins = [];
							let ind = 0;
							let total = true;
							let vi = null;
							let vind = 0;
							let cx_ite = s2.polygon.gverts.next;
							while(cx_ite != null) {
								let v = cx_ite;
								let dx = 0.0;
								let dy = 0.0;
								dx = v.x - s1.circle.worldCOMx;
								dy = v.y - s1.circle.worldCOMy;
								let dist = dx * dx + dy * dy;
								if(!(ins[ind] = dist <= s1.circle.radius * s1.circle.radius)) {
									total = false;
								} else {
									vind = ind;
									vi = cx_ite;
								}
								++ind;
								cx_ite = cx_ite.next;
							}
							if(total) {
								let _this = s2.polygon;
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
								arb.overlap = s2.polygon.area;
								arb.centroidx = s2.polygon.worldCOMx;
								arb.centroidy = s2.polygon.worldCOMy;
								return true;
							} else {
								while(ZPP_Collide.flowpoly.head != null) {
									let p = ZPP_Collide.flowpoly.pop_unsafe();
									if(!p._inuse) {
										let o = p;
										if(o.outer != null) {
											o.outer.zpp_inner = null;
											o.outer = null;
										}
										o._isimmutable = null;
										o._validate = null;
										o._invalidate = null;
										o.next = ZPP_Vec2.zpp_pool;
										ZPP_Vec2.zpp_pool = o;
									}
								}
								ZPP_Collide.flowsegs.clear();
								let fst_vert = null;
								let state = 1;
								if(vi == null) {
									vi = s2.polygon.gverts.next;
									state = 2;
								} else {
									fst_vert = vi;
									ZPP_Collide.flowpoly.add(fst_vert);
								}
								while(state != 0) if(state == 1) {
									vi = vi.next;
									if(vi == null) {
										vi = s2.polygon.gverts.next;
									}
									++vind;
									if(vind >= s2.polygon.edgeCnt) {
										vind = 0;
									}
									if(ins[vind]) {
										let dx = 0.0;
										let dy = 0.0;
										dx = fst_vert.x - vi.x;
										dy = fst_vert.y - vi.y;
										if(dx * dx + dy * dy < Config.epsilon) {
											break;
										}
										ZPP_Collide.flowpoly.add(vi);
									} else {
										let u = ZPP_Collide.flowpoly.head.elt;
										let v = vi;
										let vx = 0.0;
										let vy = 0.0;
										vx = v.x - u.x;
										vy = v.y - u.y;
										let qx = 0.0;
										let qy = 0.0;
										qx = u.x - s1.circle.worldCOMx;
										qy = u.y - s1.circle.worldCOMy;
										let A = vx * vx + vy * vy;
										let B = 2 * (qx * vx + qy * vy);
										let C = qx * qx + qy * qy - s1.circle.radius * s1.circle.radius;
										let D = Math.sqrt(B * B - 4 * A * C);
										A = 1 / (2 * A);
										let t = (-B - D) * A;
										let tval = t < Config.epsilon ? (-B + D) * A : t;
										let cx = 0.0;
										let cy = 0.0;
										let T = tval;
										cx = u.x + (v.x - u.x) * T;
										cy = u.y + (v.y - u.y) * T;
										let dx = 0.0;
										let dy = 0.0;
										dx = fst_vert.x - cx;
										dy = fst_vert.y - cy;
										if(dx * dx + dy * dy < Config.epsilon) {
											break;
										}
										let tmp = ZPP_Collide.flowpoly;
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
										ret.x = cx;
										ret.y = cy;
										tmp.add(ret);
										state = 2;
									}
								} else if(state == 2) {
									let vi2 = vi.next;
									if(vi2 == null) {
										vi2 = s2.polygon.gverts.next;
									}
									let u = vi;
									state = 0;
									let beg_ite = vi2;
									let cx_ite = vi2;
									while(true) {
										let v = cx_ite;
										let vind2 = vind + 1;
										if(vind2 == s2.polygon.edgeCnt) {
											vind2 = 0;
										}
										if(inte[vind]) {
											if(ins[vind2]) {
												let vx = 0.0;
												let vy = 0.0;
												vx = v.x - u.x;
												vy = v.y - u.y;
												let qx = 0.0;
												let qy = 0.0;
												qx = u.x - s1.circle.worldCOMx;
												qy = u.y - s1.circle.worldCOMy;
												let A = vx * vx + vy * vy;
												let B = 2 * (qx * vx + qy * vy);
												let C = qx * qx + qy * qy - s1.circle.radius * s1.circle.radius;
												let D = Math.sqrt(B * B - 4 * A * C);
												A = 1 / (2 * A);
												let t = (-B - D) * A;
												let tval = t < Config.epsilon ? (-B + D) * A : t;
												let cx = 0.0;
												let cy = 0.0;
												let T = tval;
												cx = u.x + (v.x - u.x) * T;
												cy = u.y + (v.y - u.y) * T;
												let dx = 0.0;
												let dy = 0.0;
												dx = fst_vert.x - cx;
												dy = fst_vert.y - cy;
												if(dx * dx + dy * dy < Config.epsilon) {
													state = 0;
													cx_ite = beg_ite;
													break;
												}
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
												ret.x = cx;
												ret.y = cy;
												let cp = ret;
												ZPP_Collide.flowsegs.add(ZPP_Collide.flowpoly.head.elt);
												ZPP_Collide.flowsegs.add(cp);
												ZPP_Collide.flowpoly.add(cp);
												state = 1;
												cx_ite = beg_ite;
												break;
											} else {
												let t0 = 0.0;
												let t1 = 0.0;
												let vx = 0.0;
												let vy = 0.0;
												vx = v.x - u.x;
												vy = v.y - u.y;
												let qx = 0.0;
												let qy = 0.0;
												qx = u.x - s1.circle.worldCOMx;
												qy = u.y - s1.circle.worldCOMy;
												let A = vx * vx + vy * vy;
												let B = 2 * (qx * vx + qy * vy);
												let C = qx * qx + qy * qy - s1.circle.radius * s1.circle.radius;
												let D = B * B - 4 * A * C;
												let two;
												if(D * D < Config.epsilon) {
													if(D < 0) {
														t0 = 10.0;
													} else {
														t1 = -B / (2 * A);
														t0 = t1;
													}
													two = false;
												} else {
													D = Math.sqrt(D);
													A = 1 / (2 * A);
													t0 = (-B - D) * A;
													t1 = (-B + D) * A;
													two = true;
												}
												if(t0 < 1 - Config.epsilon && t1 > Config.epsilon) {
													let cx = 0.0;
													let cy = 0.0;
													let T = t0;
													cx = u.x + (v.x - u.x) * T;
													cy = u.y + (v.y - u.y) * T;
													let tmp;
													if(fst_vert != null) {
														let dx = 0.0;
														let dy = 0.0;
														dx = fst_vert.x - cx;
														dy = fst_vert.y - cy;
														tmp = dx * dx + dy * dy < Config.epsilon;
													} else {
														tmp = false;
													}
													if(tmp) {
														state = 0;
														cx_ite = beg_ite;
														break;
													}
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
													ret.x = cx;
													ret.y = cy;
													let cp = ret;
													if(ZPP_Collide.flowpoly.head != null) {
														ZPP_Collide.flowsegs.add(ZPP_Collide.flowpoly.head.elt);
														ZPP_Collide.flowsegs.add(cp);
													}
													ZPP_Collide.flowpoly.add(cp);
													if(fst_vert == null) {
														fst_vert = ZPP_Collide.flowpoly.head.elt;
													}
													if(two) {
														let cx = 0.0;
														let cy = 0.0;
														let T = t1;
														cx = u.x + (v.x - u.x) * T;
														cy = u.y + (v.y - u.y) * T;
														let tmp = ZPP_Collide.flowpoly;
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
														ret.x = cx;
														ret.y = cy;
														tmp.add(ret);
													}
												}
											}
										}
										u = v;
										vi = cx_ite;
										vind = vind2;
										cx_ite = cx_ite.next;
										if(cx_ite == null) {
											cx_ite = s2.polygon.gverts.next;
										}
										if(!false) {
											break;
										}
									}
									while(cx_ite != beg_ite) {
										let v = cx_ite;
										let vind2 = vind + 1;
										if(vind2 == s2.polygon.edgeCnt) {
											vind2 = 0;
										}
										if(inte[vind]) {
											if(ins[vind2]) {
												let vx = 0.0;
												let vy = 0.0;
												vx = v.x - u.x;
												vy = v.y - u.y;
												let qx = 0.0;
												let qy = 0.0;
												qx = u.x - s1.circle.worldCOMx;
												qy = u.y - s1.circle.worldCOMy;
												let A = vx * vx + vy * vy;
												let B = 2 * (qx * vx + qy * vy);
												let C = qx * qx + qy * qy - s1.circle.radius * s1.circle.radius;
												let D = Math.sqrt(B * B - 4 * A * C);
												A = 1 / (2 * A);
												let t = (-B - D) * A;
												let tval = t < Config.epsilon ? (-B + D) * A : t;
												let cx = 0.0;
												let cy = 0.0;
												let T = tval;
												cx = u.x + (v.x - u.x) * T;
												cy = u.y + (v.y - u.y) * T;
												let dx = 0.0;
												let dy = 0.0;
												dx = fst_vert.x - cx;
												dy = fst_vert.y - cy;
												if(dx * dx + dy * dy < Config.epsilon) {
													state = 0;
													cx_ite = beg_ite;
													break;
												}
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
												ret.x = cx;
												ret.y = cy;
												let cp = ret;
												ZPP_Collide.flowsegs.add(ZPP_Collide.flowpoly.head.elt);
												ZPP_Collide.flowsegs.add(cp);
												ZPP_Collide.flowpoly.add(cp);
												state = 1;
												cx_ite = beg_ite;
												break;
											} else {
												let t0 = 0.0;
												let t1 = 0.0;
												let vx = 0.0;
												let vy = 0.0;
												vx = v.x - u.x;
												vy = v.y - u.y;
												let qx = 0.0;
												let qy = 0.0;
												qx = u.x - s1.circle.worldCOMx;
												qy = u.y - s1.circle.worldCOMy;
												let A = vx * vx + vy * vy;
												let B = 2 * (qx * vx + qy * vy);
												let C = qx * qx + qy * qy - s1.circle.radius * s1.circle.radius;
												let D = B * B - 4 * A * C;
												let two;
												if(D * D < Config.epsilon) {
													if(D < 0) {
														t0 = 10.0;
													} else {
														t1 = -B / (2 * A);
														t0 = t1;
													}
													two = false;
												} else {
													D = Math.sqrt(D);
													A = 1 / (2 * A);
													t0 = (-B - D) * A;
													t1 = (-B + D) * A;
													two = true;
												}
												if(t0 < 1 - Config.epsilon && t1 > Config.epsilon) {
													let cx = 0.0;
													let cy = 0.0;
													let T = t0;
													cx = u.x + (v.x - u.x) * T;
													cy = u.y + (v.y - u.y) * T;
													let tmp;
													if(fst_vert != null) {
														let dx = 0.0;
														let dy = 0.0;
														dx = fst_vert.x - cx;
														dy = fst_vert.y - cy;
														tmp = dx * dx + dy * dy < Config.epsilon;
													} else {
														tmp = false;
													}
													if(tmp) {
														state = 0;
														cx_ite = beg_ite;
														break;
													}
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
													ret.x = cx;
													ret.y = cy;
													let cp = ret;
													if(ZPP_Collide.flowpoly.head != null) {
														ZPP_Collide.flowsegs.add(ZPP_Collide.flowpoly.head.elt);
														ZPP_Collide.flowsegs.add(cp);
													}
													ZPP_Collide.flowpoly.add(cp);
													if(fst_vert == null) {
														fst_vert = ZPP_Collide.flowpoly.head.elt;
													}
													if(two) {
														let cx = 0.0;
														let cy = 0.0;
														let T = t1;
														cx = u.x + (v.x - u.x) * T;
														cy = u.y + (v.y - u.y) * T;
														let tmp = ZPP_Collide.flowpoly;
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
														ret.x = cx;
														ret.y = cy;
														tmp.add(ret);
													}
												}
											}
										}
										u = v;
										vi = cx_ite;
										vind = vind2;
										cx_ite = cx_ite.next;
										if(cx_ite == null) {
											cx_ite = s2.polygon.gverts.next;
										}
									}
								}
								if(ZPP_Collide.flowpoly.head == null) {
									return false;
								} else if(ZPP_Collide.flowpoly.head.next == null) {
									let all = true;
									let cx_ite = s2.polygon.edges.head;
									while(cx_ite != null) {
										let e = cx_ite.elt;
										let dist = e.gnormx * s1.circle.worldCOMx + e.gnormy * s1.circle.worldCOMy;
										if(dist > e.gprojection) {
											all = false;
											break;
										}
										cx_ite = cx_ite.next;
									}
									if(all) {
										arb.overlap = s1.circle.area;
										arb.centroidx = s1.circle.worldCOMx;
										arb.centroidy = s1.circle.worldCOMy;
										return true;
									} else {
										return false;
									}
								} else {
									let COMx = 0;
									let COMy = 0;
									let area = 0.0;
									if(ZPP_Collide.flowpoly.head.next.next != null) {
										let parea = 0.0;
										let pCOMx = 0.0;
										let pCOMy = 0.0;
										pCOMx = 0;
										pCOMy = 0;
										parea = 0.0;
										let cx_ite = ZPP_Collide.flowpoly.head;
										let u = cx_ite.elt;
										cx_ite = cx_ite.next;
										let v = cx_ite.elt;
										cx_ite = cx_ite.next;
										while(cx_ite != null) {
											let w = cx_ite.elt;
											parea += v.x * (w.y - u.y);
											let cf = w.y * v.x - w.x * v.y;
											pCOMx += (v.x + w.x) * cf;
											pCOMy += (v.y + w.y) * cf;
											u = v;
											v = w;
											cx_ite = cx_ite.next;
										}
										cx_ite = ZPP_Collide.flowpoly.head;
										let w = cx_ite.elt;
										parea += v.x * (w.y - u.y);
										let cf = w.y * v.x - w.x * v.y;
										pCOMx += (v.x + w.x) * cf;
										pCOMy += (v.y + w.y) * cf;
										u = v;
										v = w;
										cx_ite = cx_ite.next;
										let w1 = cx_ite.elt;
										parea += v.x * (w1.y - u.y);
										let cf1 = w1.y * v.x - w1.x * v.y;
										pCOMx += (v.x + w1.x) * cf1;
										pCOMy += (v.y + w1.y) * cf1;
										parea *= 0.5;
										let ia = 1 / (6 * parea);
										let t = ia;
										pCOMx *= t;
										pCOMy *= t;
										let t1 = -parea;
										COMx += pCOMx * t1;
										COMy += pCOMy * t1;
										area -= parea;
									} else {
										ZPP_Collide.flowsegs.add(ZPP_Collide.flowpoly.head.elt);
										ZPP_Collide.flowsegs.add(ZPP_Collide.flowpoly.head.next.elt);
									}
									while(ZPP_Collide.flowsegs.head != null) {
										let u = ZPP_Collide.flowsegs.pop_unsafe();
										let v = ZPP_Collide.flowsegs.pop_unsafe();
										let dx = 0.0;
										let dy = 0.0;
										dx = v.x - u.x;
										dy = v.y - u.y;
										let nx = 0.0;
										let ny = 0.0;
										nx = dx;
										ny = dy;
										let d = nx * nx + ny * ny;
										let imag = 1.0 / Math.sqrt(d);
										let t = imag;
										nx *= t;
										ny *= t;
										let t1 = nx;
										nx = -ny;
										ny = t1;
										let cx = 0.0;
										let cy = 0.0;
										cx = u.x + v.x;
										cy = u.y + v.y;
										let t2 = 0.5;
										cx *= t2;
										cy *= t2;
										let t3 = 1.0;
										cx -= s1.circle.worldCOMx * t3;
										cy -= s1.circle.worldCOMy * t3;
										let xd = nx * cx + ny * cy;
										let carea = 0.0;
										let ccom = 0.0;
										let X = xd;
										let cos = X / s1.circle.radius;
										let sin = Math.sqrt(1 - cos * cos);
										let theta = Math.acos(cos);
										carea = s1.circle.radius * (s1.circle.radius * theta - X * sin);
										ccom = 0.66666666666666663 * s1.circle.radius * sin * sin * sin / (theta - cos * sin);
										cx = s1.circle.worldCOMx;
										cy = s1.circle.worldCOMy;
										let t4 = ccom;
										cx += nx * t4;
										cy += ny * t4;
										let t5 = carea;
										COMx += cx * t5;
										COMy += cy * t5;
										area += carea;
									}
									let t = 1.0 / area;
									COMx *= t;
									COMy *= t;
									arb.overlap = area;
									arb.centroidx = COMx;
									arb.centroidy = COMy;
									return true;
								}
							}
						} else {
							return false;
						}
					}
				} else {
					return false;
				}
			}
		} else {
			let c1 = s1.circle;
			let c2 = s2.circle;
			let deltax = 0.0;
			let deltay = 0.0;
			deltax = c2.worldCOMx - c1.worldCOMx;
			deltay = c2.worldCOMy - c1.worldCOMy;
			let cr = c1.radius + c2.radius;
			let ds = deltax * deltax + deltay * deltay;
			if(ds > cr * cr) {
				return false;
			} else if(ds < Config.epsilon * Config.epsilon) {
				if(c1.radius < c2.radius) {
					arb.overlap = c1.area;
					arb.centroidx = c1.worldCOMx;
					arb.centroidy = c1.worldCOMy;
				} else {
					arb.overlap = c2.area;
					arb.centroidx = c2.worldCOMx;
					arb.centroidy = c2.worldCOMy;
				}
				return true;
			} else {
				let d = Math.sqrt(ds);
				let id = 1 / d;
				let x1 = 0.5 * (d - (c2.radius * c2.radius - c1.radius * c1.radius) * id);
				if(x1 <= -c1.radius) {
					arb.overlap = c1.area;
					arb.centroidx = c1.worldCOMx;
					arb.centroidy = c1.worldCOMy;
				} else {
					let x2 = d - x1;
					if(x2 <= -c2.radius) {
						arb.overlap = c2.area;
						arb.centroidx = c2.worldCOMx;
						arb.centroidy = c2.worldCOMy;
					} else {
						let area1 = 0.0;
						let y1 = 0.0;
						let area2 = 0.0;
						let y2 = 0.0;
						let X = x1;
						let cos = X / c1.radius;
						let sin = Math.sqrt(1 - cos * cos);
						let theta = Math.acos(cos);
						area1 = c1.radius * (c1.radius * theta - X * sin);
						y1 = 0.66666666666666663 * c1.radius * sin * sin * sin / (theta - cos * sin);
						let X1 = x2;
						let cos1 = X1 / c2.radius;
						let sin1 = Math.sqrt(1 - cos1 * cos1);
						let theta1 = Math.acos(cos1);
						area2 = c2.radius * (c2.radius * theta1 - X1 * sin1);
						y2 = 0.66666666666666663 * c2.radius * sin1 * sin1 * sin1 / (theta1 - cos1 * sin1);
						let tarea = area1 + area2;
						let ya = (y1 * area1 + (d - y2) * area2) / tarea * id;
						arb.overlap = tarea;
						arb.centroidx = c1.worldCOMx + deltax * ya;
						arb.centroidy = c1.worldCOMy + deltay * ya;
					}
				}
				return true;
			}
		}
	}
}
ZPP_Collide.flowpoly = new ZNPList_ZPP_Vec2();
ZPP_Collide.flowsegs = new ZNPList_ZPP_Vec2();
