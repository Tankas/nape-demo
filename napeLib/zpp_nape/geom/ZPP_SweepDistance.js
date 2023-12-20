import ZPP_Vec2 from './ZPP_Vec2.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import Config from '../../nape/Config.js';
export default class ZPP_SweepDistance {
	static dynamicSweep(toi,timeStep,lowerBound,negRadius,userAPI) {
		if(userAPI == null) {
			userAPI = false;
		}
		let s1 = toi.s1;
		let s2 = toi.s2;
		let b1 = s1.body;
		let b2 = s2.body;
		let deltax = 0.0;
		let deltay = 0.0;
		deltax = b2.velx - b1.velx;
		deltay = b2.vely - b1.vely;
		let ang1 = b1.angvel;
		if(ang1 < 0) {
			ang1 = -ang1;
		}
		let ang2 = b2.angvel;
		if(ang2 < 0) {
			ang2 = -ang2;
		}
		let angBias = s1.sweepCoef * ang1 + s2.sweepCoef * ang2;
		if(!userAPI && !toi.kinematic && deltax * deltax + deltay * deltay < Config.dynamicSweepLinearThreshold * Config.dynamicSweepLinearThreshold && angBias < Config.dynamicSweepAngularThreshold) {
			toi.toi = -1;
			toi.failed = true;
			return;
		}
		let c1 = toi.c1;
		let c2 = toi.c2;
		let axis = toi.axis;
		let curTOI = lowerBound;
		let curIter = 0;
		while(true) {
			let dt = curTOI * timeStep;
			let delta = dt - b1.sweepTime;
			if(delta != 0) {
				b1.sweepTime = dt;
				let t = delta;
				b1.posx += b1.velx * t;
				b1.posy += b1.vely * t;
				if(b1.angvel != 0) {
					let dr = b1.sweep_angvel * delta;
					b1.rot += dr;
					if(dr * dr > 0.0001) {
						b1.axisx = Math.sin(b1.rot);
						b1.axisy = Math.cos(b1.rot);
					} else {
						let d2 = dr * dr;
						let p = 1 - 0.5 * d2;
						let m = 1 - d2 * d2 / 8;
						let nx = (p * b1.axisx + dr * b1.axisy) * m;
						b1.axisy = (p * b1.axisy - dr * b1.axisx) * m;
						b1.axisx = nx;
					}
				}
			}
			if(s1.type == ZPP_Flags.id_ShapeType_CIRCLE) {
				s1.worldCOMx = b1.posx + (b1.axisy * s1.localCOMx - b1.axisx * s1.localCOMy);
				s1.worldCOMy = b1.posy + (s1.localCOMx * b1.axisx + s1.localCOMy * b1.axisy);
			} else {
				let p = s1.polygon;
				let li = p.lverts.next;
				let cx_ite = p.gverts.next;
				while(cx_ite != null) {
					let g = cx_ite;
					let l = li;
					li = li.next;
					g.x = b1.posx + (b1.axisy * l.x - b1.axisx * l.y);
					g.y = b1.posy + (l.x * b1.axisx + l.y * b1.axisy);
					cx_ite = cx_ite.next;
				}
				let ite = p.edges.head;
				let cx_ite1 = p.gverts.next;
				let u = cx_ite1;
				cx_ite1 = cx_ite1.next;
				while(cx_ite1 != null) {
					let v = cx_ite1;
					let e = ite.elt;
					ite = ite.next;
					e.gnormx = b1.axisy * e.lnormx - b1.axisx * e.lnormy;
					e.gnormy = e.lnormx * b1.axisx + e.lnormy * b1.axisy;
					e.gprojection = b1.posx * e.gnormx + b1.posy * e.gnormy + e.lprojection;
					e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
					e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
					u = v;
					cx_ite1 = cx_ite1.next;
				}
				let v = p.gverts.next;
				let e = ite.elt;
				ite = ite.next;
				e.gnormx = b1.axisy * e.lnormx - b1.axisx * e.lnormy;
				e.gnormy = e.lnormx * b1.axisx + e.lnormy * b1.axisy;
				e.gprojection = b1.posx * e.gnormx + b1.posy * e.gnormy + e.lprojection;
				e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
				e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
			}
			let dt1 = curTOI * timeStep;
			let delta1 = dt1 - b2.sweepTime;
			if(delta1 != 0) {
				b2.sweepTime = dt1;
				let t = delta1;
				b2.posx += b2.velx * t;
				b2.posy += b2.vely * t;
				if(b2.angvel != 0) {
					let dr = b2.sweep_angvel * delta1;
					b2.rot += dr;
					if(dr * dr > 0.0001) {
						b2.axisx = Math.sin(b2.rot);
						b2.axisy = Math.cos(b2.rot);
					} else {
						let d2 = dr * dr;
						let p = 1 - 0.5 * d2;
						let m = 1 - d2 * d2 / 8;
						let nx = (p * b2.axisx + dr * b2.axisy) * m;
						b2.axisy = (p * b2.axisy - dr * b2.axisx) * m;
						b2.axisx = nx;
					}
				}
			}
			if(s2.type == ZPP_Flags.id_ShapeType_CIRCLE) {
				s2.worldCOMx = b2.posx + (b2.axisy * s2.localCOMx - b2.axisx * s2.localCOMy);
				s2.worldCOMy = b2.posy + (s2.localCOMx * b2.axisx + s2.localCOMy * b2.axisy);
			} else {
				let p = s2.polygon;
				let li = p.lverts.next;
				let cx_ite = p.gverts.next;
				while(cx_ite != null) {
					let g = cx_ite;
					let l = li;
					li = li.next;
					g.x = b2.posx + (b2.axisy * l.x - b2.axisx * l.y);
					g.y = b2.posy + (l.x * b2.axisx + l.y * b2.axisy);
					cx_ite = cx_ite.next;
				}
				let ite = p.edges.head;
				let cx_ite1 = p.gverts.next;
				let u = cx_ite1;
				cx_ite1 = cx_ite1.next;
				while(cx_ite1 != null) {
					let v = cx_ite1;
					let e = ite.elt;
					ite = ite.next;
					e.gnormx = b2.axisy * e.lnormx - b2.axisx * e.lnormy;
					e.gnormy = e.lnormx * b2.axisx + e.lnormy * b2.axisy;
					e.gprojection = b2.posx * e.gnormx + b2.posy * e.gnormy + e.lprojection;
					e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
					e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
					u = v;
					cx_ite1 = cx_ite1.next;
				}
				let v = p.gverts.next;
				let e = ite.elt;
				ite = ite.next;
				e.gnormx = b2.axisy * e.lnormx - b2.axisx * e.lnormy;
				e.gnormy = e.lnormx * b2.axisx + e.lnormy * b2.axisy;
				e.gprojection = b2.posx * e.gnormx + b2.posy * e.gnormy + e.lprojection;
				e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
				e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
			}
			let s11 = s1;
			let s21 = s2;
			let w1 = c1;
			let w2 = c2;
			let sep;
			if(s11.type == ZPP_Flags.id_ShapeType_CIRCLE && s21.type == ZPP_Flags.id_ShapeType_CIRCLE) {
				let c1 = s11.circle;
				let c2 = s21.circle;
				let dist;
				let nx = 0.0;
				let ny = 0.0;
				nx = c2.worldCOMx - c1.worldCOMx;
				ny = c2.worldCOMy - c1.worldCOMy;
				let len = Math.sqrt(nx * nx + ny * ny);
				dist = len - (c1.radius + c2.radius);
				if(dist < 1e100) {
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
					axis.x = nx;
					axis.y = ny;
				}
				sep = dist;
			} else {
				let swapped = false;
				if(s11.type == ZPP_Flags.id_ShapeType_CIRCLE && s21.type == ZPP_Flags.id_ShapeType_POLYGON) {
					let tmp = s11;
					s11 = s21;
					s21 = tmp;
					let tmp2 = w1;
					w1 = w2;
					w2 = tmp2;
					swapped = true;
				}
				if(s11.type == ZPP_Flags.id_ShapeType_POLYGON && s21.type == ZPP_Flags.id_ShapeType_CIRCLE) {
					let poly = s11.polygon;
					let circle = s21.circle;
					let best = -1e+100;
					let a0 = null;
					let cx_ite = poly.edges.head;
					while(cx_ite != null) {
						let a = cx_ite.elt;
						let dist = a.gnormx * circle.worldCOMx + a.gnormy * circle.worldCOMy - a.gprojection - circle.radius;
						if(dist > 1e100) {
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
					if(best < 1e100) {
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
							if(best < 1e100) {
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
								axis.x = nx;
								axis.y = ny;
							}
						} else if(dt >= v1.y * a0.gnormx - v1.x * a0.gnormy) {
							let nx = 0.0;
							let ny = 0.0;
							nx = circle.worldCOMx - v1.x;
							ny = circle.worldCOMy - v1.y;
							let len = Math.sqrt(nx * nx + ny * ny);
							best = len - circle.radius;
							if(best < 1e100) {
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
								axis.x = nx;
								axis.y = ny;
							}
						} else {
							let t = -circle.radius;
							w2.x = circle.worldCOMx + a0.gnormx * t;
							w2.y = circle.worldCOMy + a0.gnormy * t;
							let t1 = -best;
							w1.x = w2.x + a0.gnormx * t1;
							w1.y = w2.y + a0.gnormy * t1;
							axis.x = a0.gnormx;
							axis.y = a0.gnormy;
						}
					}
					if(swapped) {
						axis.x = -axis.x;
						axis.y = -axis.y;
					}
					sep = best;
				} else {
					let p1 = s11.polygon;
					let p2 = s21.polygon;
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
						if(min > 1e100) {
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
					if(best < 1e100) {
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
							if(min > 1e100) {
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
						if(best < 1e100) {
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
								axis.x = -ax.gnormx;
								axis.y = -ax.gnormy;
							} else {
								axis.x = ax.gnormx;
								axis.y = ax.gnormy;
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
									axis.x = w2.x - w1.x;
									axis.y = w2.y - w1.y;
									let t = 1.0 / best;
									axis.x *= t;
									axis.y *= t;
									if(swapped) {
										axis.x = -axis.x;
										axis.y = -axis.y;
									}
								}
								sep = best;
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
									sep = c0d;
								} else {
									w2.x = c1x;
									w2.y = c1y;
									let t = -c1d;
									w1.x = w2.x + ax.gnormx * t;
									w1.y = w2.y + ax.gnormy * t;
									sep = c1d;
								}
							}
						} else {
							sep = 1e100;
						}
					} else {
						sep = 1e100;
					}
				}
			}
			let sep1 = sep + negRadius;
			let dot = deltax * axis.x + deltay * axis.y;
			if(sep1 < Config.distanceThresholdCCD) {
				if(userAPI) {
					break;
				}
				let d1x = 0.0;
				let d1y = 0.0;
				d1x = c1.x - b1.posx;
				d1y = c1.y - b1.posy;
				let d2x = 0.0;
				let d2y = 0.0;
				d2x = c2.x - b2.posx;
				d2y = c2.y - b2.posy;
				let proj = dot - b1.sweep_angvel * (axis.y * d1x - axis.x * d1y) + b2.sweep_angvel * (axis.y * d2x - axis.x * d2y);
				if(proj > 0) {
					toi.slipped = true;
				}
				if(proj <= 0 || sep1 < Config.distanceThresholdCCD * 0.5) {
					break;
				}
			}
			let denom = (angBias - dot) * timeStep;
			if(denom <= 0) {
				curTOI = -1;
				break;
			}
			let delta2 = sep1 / denom;
			if(delta2 < 1e-6) {
				delta2 = 1e-6;
			}
			curTOI += delta2;
			if(curTOI >= 1) {
				curTOI = 1;
				let dt = curTOI * timeStep;
				let delta = dt - b1.sweepTime;
				if(delta != 0) {
					b1.sweepTime = dt;
					let t = delta;
					b1.posx += b1.velx * t;
					b1.posy += b1.vely * t;
					if(b1.angvel != 0) {
						let dr = b1.sweep_angvel * delta;
						b1.rot += dr;
						if(dr * dr > 0.0001) {
							b1.axisx = Math.sin(b1.rot);
							b1.axisy = Math.cos(b1.rot);
						} else {
							let d2 = dr * dr;
							let p = 1 - 0.5 * d2;
							let m = 1 - d2 * d2 / 8;
							let nx = (p * b1.axisx + dr * b1.axisy) * m;
							b1.axisy = (p * b1.axisy - dr * b1.axisx) * m;
							b1.axisx = nx;
						}
					}
				}
				if(s1.type == ZPP_Flags.id_ShapeType_CIRCLE) {
					s1.worldCOMx = b1.posx + (b1.axisy * s1.localCOMx - b1.axisx * s1.localCOMy);
					s1.worldCOMy = b1.posy + (s1.localCOMx * b1.axisx + s1.localCOMy * b1.axisy);
				} else {
					let p = s1.polygon;
					let li = p.lverts.next;
					let cx_ite = p.gverts.next;
					while(cx_ite != null) {
						let g = cx_ite;
						let l = li;
						li = li.next;
						g.x = b1.posx + (b1.axisy * l.x - b1.axisx * l.y);
						g.y = b1.posy + (l.x * b1.axisx + l.y * b1.axisy);
						cx_ite = cx_ite.next;
					}
					let ite = p.edges.head;
					let cx_ite1 = p.gverts.next;
					let u = cx_ite1;
					cx_ite1 = cx_ite1.next;
					while(cx_ite1 != null) {
						let v = cx_ite1;
						let e = ite.elt;
						ite = ite.next;
						e.gnormx = b1.axisy * e.lnormx - b1.axisx * e.lnormy;
						e.gnormy = e.lnormx * b1.axisx + e.lnormy * b1.axisy;
						e.gprojection = b1.posx * e.gnormx + b1.posy * e.gnormy + e.lprojection;
						e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
						e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
						u = v;
						cx_ite1 = cx_ite1.next;
					}
					let v = p.gverts.next;
					let e = ite.elt;
					ite = ite.next;
					e.gnormx = b1.axisy * e.lnormx - b1.axisx * e.lnormy;
					e.gnormy = e.lnormx * b1.axisx + e.lnormy * b1.axisy;
					e.gprojection = b1.posx * e.gnormx + b1.posy * e.gnormy + e.lprojection;
					e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
					e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
				}
				let dt1 = curTOI * timeStep;
				let delta1 = dt1 - b2.sweepTime;
				if(delta1 != 0) {
					b2.sweepTime = dt1;
					let t = delta1;
					b2.posx += b2.velx * t;
					b2.posy += b2.vely * t;
					if(b2.angvel != 0) {
						let dr = b2.sweep_angvel * delta1;
						b2.rot += dr;
						if(dr * dr > 0.0001) {
							b2.axisx = Math.sin(b2.rot);
							b2.axisy = Math.cos(b2.rot);
						} else {
							let d2 = dr * dr;
							let p = 1 - 0.5 * d2;
							let m = 1 - d2 * d2 / 8;
							let nx = (p * b2.axisx + dr * b2.axisy) * m;
							b2.axisy = (p * b2.axisy - dr * b2.axisx) * m;
							b2.axisx = nx;
						}
					}
				}
				if(s2.type == ZPP_Flags.id_ShapeType_CIRCLE) {
					s2.worldCOMx = b2.posx + (b2.axisy * s2.localCOMx - b2.axisx * s2.localCOMy);
					s2.worldCOMy = b2.posy + (s2.localCOMx * b2.axisx + s2.localCOMy * b2.axisy);
				} else {
					let p = s2.polygon;
					let li = p.lverts.next;
					let cx_ite = p.gverts.next;
					while(cx_ite != null) {
						let g = cx_ite;
						let l = li;
						li = li.next;
						g.x = b2.posx + (b2.axisy * l.x - b2.axisx * l.y);
						g.y = b2.posy + (l.x * b2.axisx + l.y * b2.axisy);
						cx_ite = cx_ite.next;
					}
					let ite = p.edges.head;
					let cx_ite1 = p.gverts.next;
					let u = cx_ite1;
					cx_ite1 = cx_ite1.next;
					while(cx_ite1 != null) {
						let v = cx_ite1;
						let e = ite.elt;
						ite = ite.next;
						e.gnormx = b2.axisy * e.lnormx - b2.axisx * e.lnormy;
						e.gnormy = e.lnormx * b2.axisx + e.lnormy * b2.axisy;
						e.gprojection = b2.posx * e.gnormx + b2.posy * e.gnormy + e.lprojection;
						e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
						e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
						u = v;
						cx_ite1 = cx_ite1.next;
					}
					let v = p.gverts.next;
					let e = ite.elt;
					ite = ite.next;
					e.gnormx = b2.axisy * e.lnormx - b2.axisx * e.lnormy;
					e.gnormy = e.lnormx * b2.axisx + e.lnormy * b2.axisy;
					e.gprojection = b2.posx * e.gnormx + b2.posy * e.gnormy + e.lprojection;
					e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
					e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
				}
				let s11 = s1;
				let s21 = s2;
				let w1 = c1;
				let w2 = c2;
				let sep;
				if(s11.type == ZPP_Flags.id_ShapeType_CIRCLE && s21.type == ZPP_Flags.id_ShapeType_CIRCLE) {
					let c1 = s11.circle;
					let c2 = s21.circle;
					let dist;
					let nx = 0.0;
					let ny = 0.0;
					nx = c2.worldCOMx - c1.worldCOMx;
					ny = c2.worldCOMy - c1.worldCOMy;
					let len = Math.sqrt(nx * nx + ny * ny);
					dist = len - (c1.radius + c2.radius);
					if(dist < 1e100) {
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
						axis.x = nx;
						axis.y = ny;
					}
					sep = dist;
				} else {
					let swapped = false;
					if(s11.type == ZPP_Flags.id_ShapeType_CIRCLE && s21.type == ZPP_Flags.id_ShapeType_POLYGON) {
						let tmp = s11;
						s11 = s21;
						s21 = tmp;
						let tmp2 = w1;
						w1 = w2;
						w2 = tmp2;
						swapped = true;
					}
					if(s11.type == ZPP_Flags.id_ShapeType_POLYGON && s21.type == ZPP_Flags.id_ShapeType_CIRCLE) {
						let poly = s11.polygon;
						let circle = s21.circle;
						let best = -1e+100;
						let a0 = null;
						let cx_ite = poly.edges.head;
						while(cx_ite != null) {
							let a = cx_ite.elt;
							let dist = a.gnormx * circle.worldCOMx + a.gnormy * circle.worldCOMy - a.gprojection - circle.radius;
							if(dist > 1e100) {
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
						if(best < 1e100) {
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
								if(best < 1e100) {
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
									axis.x = nx;
									axis.y = ny;
								}
							} else if(dt >= v1.y * a0.gnormx - v1.x * a0.gnormy) {
								let nx = 0.0;
								let ny = 0.0;
								nx = circle.worldCOMx - v1.x;
								ny = circle.worldCOMy - v1.y;
								let len = Math.sqrt(nx * nx + ny * ny);
								best = len - circle.radius;
								if(best < 1e100) {
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
									axis.x = nx;
									axis.y = ny;
								}
							} else {
								let t = -circle.radius;
								w2.x = circle.worldCOMx + a0.gnormx * t;
								w2.y = circle.worldCOMy + a0.gnormy * t;
								let t1 = -best;
								w1.x = w2.x + a0.gnormx * t1;
								w1.y = w2.y + a0.gnormy * t1;
								axis.x = a0.gnormx;
								axis.y = a0.gnormy;
							}
						}
						if(swapped) {
							axis.x = -axis.x;
							axis.y = -axis.y;
						}
						sep = best;
					} else {
						let p1 = s11.polygon;
						let p2 = s21.polygon;
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
							if(min > 1e100) {
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
						if(best < 1e100) {
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
								if(min > 1e100) {
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
							if(best < 1e100) {
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
									axis.x = -ax.gnormx;
									axis.y = -ax.gnormy;
								} else {
									axis.x = ax.gnormx;
									axis.y = ax.gnormy;
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
										axis.x = w2.x - w1.x;
										axis.y = w2.y - w1.y;
										let t = 1.0 / best;
										axis.x *= t;
										axis.y *= t;
										if(swapped) {
											axis.x = -axis.x;
											axis.y = -axis.y;
										}
									}
									sep = best;
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
										sep = c0d;
									} else {
										w2.x = c1x;
										w2.y = c1y;
										let t = -c1d;
										w1.x = w2.x + ax.gnormx * t;
										w1.y = w2.y + ax.gnormy * t;
										sep = c1d;
									}
								}
							} else {
								sep = 1e100;
							}
						} else {
							sep = 1e100;
						}
					}
				}
				let sep1 = sep + negRadius;
				let dot = deltax * axis.x + deltay * axis.y;
				if(sep1 < Config.distanceThresholdCCD) {
					if(userAPI) {
						break;
					}
					let d1x = 0.0;
					let d1y = 0.0;
					d1x = c1.x - b1.posx;
					d1y = c1.y - b1.posy;
					let d2x = 0.0;
					let d2y = 0.0;
					d2x = c2.x - b2.posx;
					d2y = c2.y - b2.posy;
					let proj = dot - b1.sweep_angvel * (axis.y * d1x - axis.x * d1y) + b2.sweep_angvel * (axis.y * d2x - axis.x * d2y);
					if(proj > 0) {
						toi.slipped = true;
					}
					if(proj <= 0 || sep1 < Config.distanceThresholdCCD * 0.5) {
						break;
					}
				}
				curTOI = -1;
				break;
			}
			if(++curIter >= 40) {
				if(sep1 > negRadius) {
					toi.failed = true;
				}
				break;
			}
		}
		toi.toi = curTOI;
	}
	static staticSweep(toi,timeStep,lowerBound,negRadius) {
		let s1 = toi.s1;
		let s2 = toi.s2;
		let b1 = s1.body;
		let b2 = s2.body;
		let deltax = 0.0;
		let deltay = 0.0;
		deltax = -b1.velx;
		deltay = -b1.vely;
		let ang1 = b1.sweep_angvel;
		if(ang1 < 0) {
			ang1 = -ang1;
		}
		let angBias = s1.sweepCoef * ang1;
		let c1 = toi.c1;
		let c2 = toi.c2;
		let axis = toi.axis;
		let curTOI = lowerBound;
		let curIter = 0;
		while(true) {
			let dt = curTOI * timeStep;
			let delta = dt - b1.sweepTime;
			if(delta != 0) {
				b1.sweepTime = dt;
				let t = delta;
				b1.posx += b1.velx * t;
				b1.posy += b1.vely * t;
				if(b1.angvel != 0) {
					let dr = b1.sweep_angvel * delta;
					b1.rot += dr;
					if(dr * dr > 0.0001) {
						b1.axisx = Math.sin(b1.rot);
						b1.axisy = Math.cos(b1.rot);
					} else {
						let d2 = dr * dr;
						let p = 1 - 0.5 * d2;
						let m = 1 - d2 * d2 / 8;
						let nx = (p * b1.axisx + dr * b1.axisy) * m;
						b1.axisy = (p * b1.axisy - dr * b1.axisx) * m;
						b1.axisx = nx;
					}
				}
			}
			if(s1.type == ZPP_Flags.id_ShapeType_CIRCLE) {
				s1.worldCOMx = b1.posx + (b1.axisy * s1.localCOMx - b1.axisx * s1.localCOMy);
				s1.worldCOMy = b1.posy + (s1.localCOMx * b1.axisx + s1.localCOMy * b1.axisy);
			} else {
				let p = s1.polygon;
				let li = p.lverts.next;
				let cx_ite = p.gverts.next;
				while(cx_ite != null) {
					let g = cx_ite;
					let l = li;
					li = li.next;
					g.x = b1.posx + (b1.axisy * l.x - b1.axisx * l.y);
					g.y = b1.posy + (l.x * b1.axisx + l.y * b1.axisy);
					cx_ite = cx_ite.next;
				}
				let ite = p.edges.head;
				let cx_ite1 = p.gverts.next;
				let u = cx_ite1;
				cx_ite1 = cx_ite1.next;
				while(cx_ite1 != null) {
					let v = cx_ite1;
					let e = ite.elt;
					ite = ite.next;
					e.gnormx = b1.axisy * e.lnormx - b1.axisx * e.lnormy;
					e.gnormy = e.lnormx * b1.axisx + e.lnormy * b1.axisy;
					e.gprojection = b1.posx * e.gnormx + b1.posy * e.gnormy + e.lprojection;
					e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
					e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
					u = v;
					cx_ite1 = cx_ite1.next;
				}
				let v = p.gverts.next;
				let e = ite.elt;
				ite = ite.next;
				e.gnormx = b1.axisy * e.lnormx - b1.axisx * e.lnormy;
				e.gnormy = e.lnormx * b1.axisx + e.lnormy * b1.axisy;
				e.gprojection = b1.posx * e.gnormx + b1.posy * e.gnormy + e.lprojection;
				e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
				e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
			}
			let s11 = s1;
			let s21 = s2;
			let w1 = c1;
			let w2 = c2;
			let sep;
			if(s11.type == ZPP_Flags.id_ShapeType_CIRCLE && s21.type == ZPP_Flags.id_ShapeType_CIRCLE) {
				let c1 = s11.circle;
				let c2 = s21.circle;
				let dist;
				let nx = 0.0;
				let ny = 0.0;
				nx = c2.worldCOMx - c1.worldCOMx;
				ny = c2.worldCOMy - c1.worldCOMy;
				let len = Math.sqrt(nx * nx + ny * ny);
				dist = len - (c1.radius + c2.radius);
				if(dist < 1e100) {
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
					axis.x = nx;
					axis.y = ny;
				}
				sep = dist;
			} else {
				let swapped = false;
				if(s11.type == ZPP_Flags.id_ShapeType_CIRCLE && s21.type == ZPP_Flags.id_ShapeType_POLYGON) {
					let tmp = s11;
					s11 = s21;
					s21 = tmp;
					let tmp2 = w1;
					w1 = w2;
					w2 = tmp2;
					swapped = true;
				}
				if(s11.type == ZPP_Flags.id_ShapeType_POLYGON && s21.type == ZPP_Flags.id_ShapeType_CIRCLE) {
					let poly = s11.polygon;
					let circle = s21.circle;
					let best = -1e+100;
					let a0 = null;
					let cx_ite = poly.edges.head;
					while(cx_ite != null) {
						let a = cx_ite.elt;
						let dist = a.gnormx * circle.worldCOMx + a.gnormy * circle.worldCOMy - a.gprojection - circle.radius;
						if(dist > 1e100) {
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
					if(best < 1e100) {
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
							if(best < 1e100) {
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
								axis.x = nx;
								axis.y = ny;
							}
						} else if(dt >= v1.y * a0.gnormx - v1.x * a0.gnormy) {
							let nx = 0.0;
							let ny = 0.0;
							nx = circle.worldCOMx - v1.x;
							ny = circle.worldCOMy - v1.y;
							let len = Math.sqrt(nx * nx + ny * ny);
							best = len - circle.radius;
							if(best < 1e100) {
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
								axis.x = nx;
								axis.y = ny;
							}
						} else {
							let t = -circle.radius;
							w2.x = circle.worldCOMx + a0.gnormx * t;
							w2.y = circle.worldCOMy + a0.gnormy * t;
							let t1 = -best;
							w1.x = w2.x + a0.gnormx * t1;
							w1.y = w2.y + a0.gnormy * t1;
							axis.x = a0.gnormx;
							axis.y = a0.gnormy;
						}
					}
					if(swapped) {
						axis.x = -axis.x;
						axis.y = -axis.y;
					}
					sep = best;
				} else {
					let p1 = s11.polygon;
					let p2 = s21.polygon;
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
						if(min > 1e100) {
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
					if(best < 1e100) {
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
							if(min > 1e100) {
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
						if(best < 1e100) {
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
								axis.x = -ax.gnormx;
								axis.y = -ax.gnormy;
							} else {
								axis.x = ax.gnormx;
								axis.y = ax.gnormy;
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
									axis.x = w2.x - w1.x;
									axis.y = w2.y - w1.y;
									let t = 1.0 / best;
									axis.x *= t;
									axis.y *= t;
									if(swapped) {
										axis.x = -axis.x;
										axis.y = -axis.y;
									}
								}
								sep = best;
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
									sep = c0d;
								} else {
									w2.x = c1x;
									w2.y = c1y;
									let t = -c1d;
									w1.x = w2.x + ax.gnormx * t;
									w1.y = w2.y + ax.gnormy * t;
									sep = c1d;
								}
							}
						} else {
							sep = 1e100;
						}
					} else {
						sep = 1e100;
					}
				}
			}
			let sep1 = sep + negRadius;
			let dot = deltax * axis.x + deltay * axis.y;
			if(sep1 < Config.distanceThresholdCCD) {
				let d1x = 0.0;
				let d1y = 0.0;
				d1x = c1.x - b1.posx;
				d1y = c1.y - b1.posy;
				let proj = dot - b1.sweep_angvel * (axis.y * d1x - axis.x * d1y);
				if(proj > 0) {
					toi.slipped = true;
				}
				if(proj <= 0 || sep1 < Config.distanceThresholdCCD * 0.5) {
					break;
				}
			}
			let denom = (angBias - dot) * timeStep;
			if(denom <= 0) {
				curTOI = -1;
				break;
			}
			let delta1 = sep1 / denom;
			if(delta1 < 1e-6) {
				delta1 = 1e-6;
			}
			curTOI += delta1;
			if(curTOI >= 1) {
				curTOI = 1;
				let dt = curTOI * timeStep;
				let delta = dt - b1.sweepTime;
				if(delta != 0) {
					b1.sweepTime = dt;
					let t = delta;
					b1.posx += b1.velx * t;
					b1.posy += b1.vely * t;
					if(b1.angvel != 0) {
						let dr = b1.sweep_angvel * delta;
						b1.rot += dr;
						if(dr * dr > 0.0001) {
							b1.axisx = Math.sin(b1.rot);
							b1.axisy = Math.cos(b1.rot);
						} else {
							let d2 = dr * dr;
							let p = 1 - 0.5 * d2;
							let m = 1 - d2 * d2 / 8;
							let nx = (p * b1.axisx + dr * b1.axisy) * m;
							b1.axisy = (p * b1.axisy - dr * b1.axisx) * m;
							b1.axisx = nx;
						}
					}
				}
				if(s1.type == ZPP_Flags.id_ShapeType_CIRCLE) {
					s1.worldCOMx = b1.posx + (b1.axisy * s1.localCOMx - b1.axisx * s1.localCOMy);
					s1.worldCOMy = b1.posy + (s1.localCOMx * b1.axisx + s1.localCOMy * b1.axisy);
				} else {
					let p = s1.polygon;
					let li = p.lverts.next;
					let cx_ite = p.gverts.next;
					while(cx_ite != null) {
						let g = cx_ite;
						let l = li;
						li = li.next;
						g.x = b1.posx + (b1.axisy * l.x - b1.axisx * l.y);
						g.y = b1.posy + (l.x * b1.axisx + l.y * b1.axisy);
						cx_ite = cx_ite.next;
					}
					let ite = p.edges.head;
					let cx_ite1 = p.gverts.next;
					let u = cx_ite1;
					cx_ite1 = cx_ite1.next;
					while(cx_ite1 != null) {
						let v = cx_ite1;
						let e = ite.elt;
						ite = ite.next;
						e.gnormx = b1.axisy * e.lnormx - b1.axisx * e.lnormy;
						e.gnormy = e.lnormx * b1.axisx + e.lnormy * b1.axisy;
						e.gprojection = b1.posx * e.gnormx + b1.posy * e.gnormy + e.lprojection;
						e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
						e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
						u = v;
						cx_ite1 = cx_ite1.next;
					}
					let v = p.gverts.next;
					let e = ite.elt;
					ite = ite.next;
					e.gnormx = b1.axisy * e.lnormx - b1.axisx * e.lnormy;
					e.gnormy = e.lnormx * b1.axisx + e.lnormy * b1.axisy;
					e.gprojection = b1.posx * e.gnormx + b1.posy * e.gnormy + e.lprojection;
					e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
					e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
				}
				let s11 = s1;
				let s21 = s2;
				let w1 = c1;
				let w2 = c2;
				let sep;
				if(s11.type == ZPP_Flags.id_ShapeType_CIRCLE && s21.type == ZPP_Flags.id_ShapeType_CIRCLE) {
					let c1 = s11.circle;
					let c2 = s21.circle;
					let dist;
					let nx = 0.0;
					let ny = 0.0;
					nx = c2.worldCOMx - c1.worldCOMx;
					ny = c2.worldCOMy - c1.worldCOMy;
					let len = Math.sqrt(nx * nx + ny * ny);
					dist = len - (c1.radius + c2.radius);
					if(dist < 1e100) {
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
						axis.x = nx;
						axis.y = ny;
					}
					sep = dist;
				} else {
					let swapped = false;
					if(s11.type == ZPP_Flags.id_ShapeType_CIRCLE && s21.type == ZPP_Flags.id_ShapeType_POLYGON) {
						let tmp = s11;
						s11 = s21;
						s21 = tmp;
						let tmp2 = w1;
						w1 = w2;
						w2 = tmp2;
						swapped = true;
					}
					if(s11.type == ZPP_Flags.id_ShapeType_POLYGON && s21.type == ZPP_Flags.id_ShapeType_CIRCLE) {
						let poly = s11.polygon;
						let circle = s21.circle;
						let best = -1e+100;
						let a0 = null;
						let cx_ite = poly.edges.head;
						while(cx_ite != null) {
							let a = cx_ite.elt;
							let dist = a.gnormx * circle.worldCOMx + a.gnormy * circle.worldCOMy - a.gprojection - circle.radius;
							if(dist > 1e100) {
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
						if(best < 1e100) {
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
								if(best < 1e100) {
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
									axis.x = nx;
									axis.y = ny;
								}
							} else if(dt >= v1.y * a0.gnormx - v1.x * a0.gnormy) {
								let nx = 0.0;
								let ny = 0.0;
								nx = circle.worldCOMx - v1.x;
								ny = circle.worldCOMy - v1.y;
								let len = Math.sqrt(nx * nx + ny * ny);
								best = len - circle.radius;
								if(best < 1e100) {
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
									axis.x = nx;
									axis.y = ny;
								}
							} else {
								let t = -circle.radius;
								w2.x = circle.worldCOMx + a0.gnormx * t;
								w2.y = circle.worldCOMy + a0.gnormy * t;
								let t1 = -best;
								w1.x = w2.x + a0.gnormx * t1;
								w1.y = w2.y + a0.gnormy * t1;
								axis.x = a0.gnormx;
								axis.y = a0.gnormy;
							}
						}
						if(swapped) {
							axis.x = -axis.x;
							axis.y = -axis.y;
						}
						sep = best;
					} else {
						let p1 = s11.polygon;
						let p2 = s21.polygon;
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
							if(min > 1e100) {
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
						if(best < 1e100) {
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
								if(min > 1e100) {
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
							if(best < 1e100) {
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
									axis.x = -ax.gnormx;
									axis.y = -ax.gnormy;
								} else {
									axis.x = ax.gnormx;
									axis.y = ax.gnormy;
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
										axis.x = w2.x - w1.x;
										axis.y = w2.y - w1.y;
										let t = 1.0 / best;
										axis.x *= t;
										axis.y *= t;
										if(swapped) {
											axis.x = -axis.x;
											axis.y = -axis.y;
										}
									}
									sep = best;
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
										sep = c0d;
									} else {
										w2.x = c1x;
										w2.y = c1y;
										let t = -c1d;
										w1.x = w2.x + ax.gnormx * t;
										w1.y = w2.y + ax.gnormy * t;
										sep = c1d;
									}
								}
							} else {
								sep = 1e100;
							}
						} else {
							sep = 1e100;
						}
					}
				}
				let sep1 = sep + negRadius;
				let dot = deltax * axis.x + deltay * axis.y;
				if(sep1 < Config.distanceThresholdCCD) {
					let d1x = 0.0;
					let d1y = 0.0;
					d1x = c1.x - b1.posx;
					d1y = c1.y - b1.posy;
					let proj = dot - b1.sweep_angvel * (axis.y * d1x - axis.x * d1y);
					if(proj > 0) {
						toi.slipped = true;
					}
					if(proj <= 0 || sep1 < Config.distanceThresholdCCD * 0.5) {
						break;
					}
				}
				curTOI = -1;
				break;
			}
			if(++curIter >= 40) {
				if(sep1 > negRadius) {
					toi.failed = true;
				}
				break;
			}
		}
		toi.toi = curTOI;
	}
	static distanceBody(b1,b2,w1,w2) {
		let t1;
		if(ZPP_Vec2.zpp_pool == null) {
			t1 = new ZPP_Vec2();
		} else {
			t1 = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = t1.next;
			t1.next = null;
		}
		t1.weak = false;
		let t2;
		if(ZPP_Vec2.zpp_pool == null) {
			t2 = new ZPP_Vec2();
		} else {
			t2 = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = t2.next;
			t2.next = null;
		}
		t2.weak = false;
		let ax;
		if(ZPP_Vec2.zpp_pool == null) {
			ax = new ZPP_Vec2();
		} else {
			ax = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = ax.next;
			ax.next = null;
		}
		ax.weak = false;
		let min = 1e100;
		let cx_ite = b1.shapes.head;
		while(cx_ite != null) {
			let s1 = cx_ite.elt;
			let cx_ite1 = b2.shapes.head;
			while(cx_ite1 != null) {
				let s2 = cx_ite1.elt;
				let s11 = s1;
				let s21 = s2;
				let w11 = t1;
				let w21 = t2;
				let upperBound = min;
				if(upperBound == null) {
					upperBound = 1e100;
				}
				let dist;
				if(s11.type == ZPP_Flags.id_ShapeType_CIRCLE && s21.type == ZPP_Flags.id_ShapeType_CIRCLE) {
					let c1 = s11.circle;
					let c2 = s21.circle;
					let dist1;
					let nx = 0.0;
					let ny = 0.0;
					nx = c2.worldCOMx - c1.worldCOMx;
					ny = c2.worldCOMy - c1.worldCOMy;
					let len = Math.sqrt(nx * nx + ny * ny);
					dist1 = len - (c1.radius + c2.radius);
					if(dist1 < upperBound) {
						if(len == 0) {
							nx = 1;
							ny = 0;
						} else {
							let t = 1.0 / len;
							nx *= t;
							ny *= t;
						}
						let t = c1.radius;
						w11.x = c1.worldCOMx + nx * t;
						w11.y = c1.worldCOMy + ny * t;
						let t1 = -c2.radius;
						w21.x = c2.worldCOMx + nx * t1;
						w21.y = c2.worldCOMy + ny * t1;
						ax.x = nx;
						ax.y = ny;
					}
					dist = dist1;
				} else {
					let swapped = false;
					if(s11.type == ZPP_Flags.id_ShapeType_CIRCLE && s21.type == ZPP_Flags.id_ShapeType_POLYGON) {
						let tmp = s11;
						s11 = s21;
						s21 = tmp;
						let tmp2 = w11;
						w11 = w21;
						w21 = tmp2;
						swapped = true;
					}
					if(s11.type == ZPP_Flags.id_ShapeType_POLYGON && s21.type == ZPP_Flags.id_ShapeType_CIRCLE) {
						let poly = s11.polygon;
						let circle = s21.circle;
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
									w11.x = v0.x + nx * t;
									w11.y = v0.y + ny * t;
									let t1 = -circle.radius;
									w21.x = circle.worldCOMx + nx * t1;
									w21.y = circle.worldCOMy + ny * t1;
									ax.x = nx;
									ax.y = ny;
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
									w11.x = v1.x + nx * t;
									w11.y = v1.y + ny * t;
									let t1 = -circle.radius;
									w21.x = circle.worldCOMx + nx * t1;
									w21.y = circle.worldCOMy + ny * t1;
									ax.x = nx;
									ax.y = ny;
								}
							} else {
								let t = -circle.radius;
								w21.x = circle.worldCOMx + a0.gnormx * t;
								w21.y = circle.worldCOMy + a0.gnormy * t;
								let t1 = -best;
								w11.x = w21.x + a0.gnormx * t1;
								w11.y = w21.y + a0.gnormy * t1;
								ax.x = a0.gnormx;
								ax.y = a0.gnormy;
							}
						}
						if(swapped) {
							ax.x = -ax.x;
							ax.y = -ax.y;
						}
						dist = best;
					} else {
						let p1 = s11.polygon;
						let p2 = s21.polygon;
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
								let ax1;
								if(besti == 1) {
									q1 = p1;
									q2 = p2;
									ax1 = a1;
								} else {
									q1 = p2;
									q2 = p1;
									ax1 = a2;
									let tmp = w11;
									w11 = w21;
									w21 = tmp;
									swapped = !swapped;
								}
								let ay = null;
								let min = 1e100;
								let cx_ite = q2.edges.head;
								while(cx_ite != null) {
									let a = cx_ite.elt;
									let k = ax1.gnormx * a.gnormx + ax1.gnormy * a.gnormy;
									if(k < min) {
										min = k;
										ay = a;
									}
									cx_ite = cx_ite.next;
								}
								if(swapped) {
									ax.x = -ax1.gnormx;
									ax.y = -ax1.gnormy;
								} else {
									ax.x = ax1.gnormx;
									ax.y = ax1.gnormy;
								}
								if(best >= 0) {
									let v0 = ax1.gp0;
									let v1 = ax1.gp1;
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
										w11.x = minfx;
										w11.y = minfy;
										w21.x = minq.x;
										w21.y = minq.y;
										best = Math.sqrt(d1);
									} else {
										w21.x = mingx;
										w21.y = mingy;
										w11.x = minv.x;
										w11.y = minv.y;
										best = Math.sqrt(e1);
									}
									if(best != 0) {
										ax.x = w21.x - w11.x;
										ax.y = w21.y - w11.y;
										let t = 1.0 / best;
										ax.x *= t;
										ax.y *= t;
										if(swapped) {
											ax.x = -ax.x;
											ax.y = -ax.y;
										}
									}
									dist = best;
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
									let d0 = ax1.gnormy * c0x - ax1.gnormx * c0y;
									let d1 = ax1.gnormy * c1x - ax1.gnormx * c1y;
									let den = 1 / (d1 - d0);
									let t = (-ax1.tp1 - d0) * den;
									if(t > Config.epsilon) {
										let t1 = t;
										c0x += dvx * t1;
										c0y += dvy * t1;
									}
									let t1 = (-ax1.tp0 - d1) * den;
									if(t1 < -Config.epsilon) {
										let t = t1;
										c1x += dvx * t;
										c1y += dvy * t;
									}
									let c0d = c0x * ax1.gnormx + c0y * ax1.gnormy - ax1.gprojection;
									let c1d = c1x * ax1.gnormx + c1y * ax1.gnormy - ax1.gprojection;
									if(c0d < c1d) {
										w21.x = c0x;
										w21.y = c0y;
										let t = -c0d;
										w11.x = w21.x + ax1.gnormx * t;
										w11.y = w21.y + ax1.gnormy * t;
										dist = c0d;
									} else {
										w21.x = c1x;
										w21.y = c1y;
										let t = -c1d;
										w11.x = w21.x + ax1.gnormx * t;
										w11.y = w21.y + ax1.gnormy * t;
										dist = c1d;
									}
								}
							} else {
								dist = upperBound;
							}
						} else {
							dist = upperBound;
						}
					}
				}
				if(dist < min) {
					min = dist;
					w1.x = t1.x;
					w1.y = t1.y;
					w2.x = t2.x;
					w2.y = t2.y;
				}
				cx_ite1 = cx_ite1.next;
			}
			cx_ite = cx_ite.next;
		}
		let o = t1;
		if(o.outer != null) {
			o.outer.zpp_inner = null;
			o.outer = null;
		}
		o._isimmutable = null;
		o._validate = null;
		o._invalidate = null;
		o.next = ZPP_Vec2.zpp_pool;
		ZPP_Vec2.zpp_pool = o;
		let o1 = t2;
		if(o1.outer != null) {
			o1.outer.zpp_inner = null;
			o1.outer = null;
		}
		o1._isimmutable = null;
		o1._validate = null;
		o1._invalidate = null;
		o1.next = ZPP_Vec2.zpp_pool;
		ZPP_Vec2.zpp_pool = o1;
		let o2 = ax;
		if(o2.outer != null) {
			o2.outer.zpp_inner = null;
			o2.outer = null;
		}
		o2._isimmutable = null;
		o2._validate = null;
		o2._invalidate = null;
		o2.next = ZPP_Vec2.zpp_pool;
		ZPP_Vec2.zpp_pool = o2;
		return min;
	}
	static distance(s1,s2,w1,w2,axis,upperBound) {
		if(upperBound == null) {
			upperBound = 1e100;
		}
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
				axis.x = nx;
				axis.y = ny;
			}
			return dist;
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
							axis.x = nx;
							axis.y = ny;
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
							axis.x = nx;
							axis.y = ny;
						}
					} else {
						let t = -circle.radius;
						w2.x = circle.worldCOMx + a0.gnormx * t;
						w2.y = circle.worldCOMy + a0.gnormy * t;
						let t1 = -best;
						w1.x = w2.x + a0.gnormx * t1;
						w1.y = w2.y + a0.gnormy * t1;
						axis.x = a0.gnormx;
						axis.y = a0.gnormy;
					}
				}
				if(swapped) {
					axis.x = -axis.x;
					axis.y = -axis.y;
				}
				return best;
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
							axis.x = -ax.gnormx;
							axis.y = -ax.gnormy;
						} else {
							axis.x = ax.gnormx;
							axis.y = ax.gnormy;
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
								axis.x = w2.x - w1.x;
								axis.y = w2.y - w1.y;
								let t = 1.0 / best;
								axis.x *= t;
								axis.y *= t;
								if(swapped) {
									axis.x = -axis.x;
									axis.y = -axis.y;
								}
							}
							return best;
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
								return c0d;
							} else {
								w2.x = c1x;
								w2.y = c1y;
								let t = -c1d;
								w1.x = w2.x + ax.gnormx * t;
								w1.y = w2.y + ax.gnormy * t;
								return c1d;
							}
						}
					} else {
						return upperBound;
					}
				} else {
					return upperBound;
				}
			}
		}
	}
}
