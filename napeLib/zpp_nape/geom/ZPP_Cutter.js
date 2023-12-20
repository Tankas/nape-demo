import ZPP_PubPool from '../util/ZPP_PubPool.js';
import ZNPList_ZPP_CutVert from '../util/ZNPList_ZPP_CutVert.js';
import ZNPList_ZPP_CutInt from '../util/ZNPList_ZPP_CutInt.js';
import ZPP_Vec2 from './ZPP_Vec2.js';
import ZPP_GeomVert from './ZPP_GeomVert.js';
import ZPP_CutInt from './ZPP_CutInt.js';
import ZPP_CutVert from './ZPP_CutVert.js';
import GeomPolyList from '../../nape/geom/GeomPolyList.js';
import GeomPoly from '../../nape/geom/GeomPoly.js';
export default class ZPP_Cutter {
	static run(P,_start,_end,bstart,bend,output) {
		let px = 0.0;
		let py = 0.0;
		if(_start != null && _start.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = _start.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		px = _start.zpp_inner.x;
		if(_start != null && _start.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = _start.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		py = _start.zpp_inner.y;
		let dx = 0.0;
		let dy = 0.0;
		if(_end != null && _end.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = _end.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		dx = _end.zpp_inner.x - px;
		if(_end != null && _end.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = _end.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		dy = _end.zpp_inner.y - py;
		let min = bstart ? 0 : -Infinity;
		let max = bend ? 1 : Infinity;
		let crx = -(py * dx - px * dy);
		let verts = null;
		let clashes = false;
		let p = P;
		while(true) {
			let c;
			if(ZPP_CutVert.zpp_pool == null) {
				c = new ZPP_CutVert();
			} else {
				c = ZPP_CutVert.zpp_pool;
				ZPP_CutVert.zpp_pool = c.next;
				c.next = null;
			}
			c.vert = p;
			c.posx = c.vert.x;
			c.posy = c.vert.y;
			c.value = c.posy * dx - c.posx * dy + crx;
			c.positive = c.value > 0;
			if(c.value == 0) {
				clashes = true;
			}
			let obj = c;
			if(verts == null) {
				verts = obj.prev = obj.next = obj;
			} else {
				obj.prev = verts;
				obj.next = verts.next;
				verts.next.prev = obj;
				verts.next = obj;
			}
			verts = obj;
			p = p.next;
			if(!(p != P)) {
				break;
			}
		}
		if(clashes) {
			let start = null;
			let F = verts;
			let L = verts;
			if(F != null) {
				let nite = F;
				while(true) {
					let p = nite;
					if(p.value != 0.0) {
						start = p;
						break;
					}
					nite = nite.next;
					if(!(nite != L)) {
						break;
					}
				}
			}
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
			let pre = null;
			let p = start;
			while(true) {
				if(p.value != 0.0 && (pre == null || p == pre.next)) {
					pre = p;
					p = p.next;
					if(!(p != start)) {
						break;
					} else {
						continue;
					}
				}
				let prod = pre.value * p.value;
				if(prod == 0) {
					p = p.next;
					if(!(p != start)) {
						break;
					} else {
						continue;
					}
				}
				let a = pre.next;
				let positive;
				if(prod > 0) {
					positive = pre.positive;
				} else {
					let b = a.next;
					let midx = 0.0;
					let midy = 0.0;
					midx = a.posx + b.posx;
					midy = a.posy + b.posy;
					let t = 0.5;
					midx *= t;
					midy *= t;
					let x = midx + nx * 1e-8;
					let y = midy + ny * 1e-8;
					let ret = false;
					let F = P;
					let L = P;
					if(F != null) {
						let nite = F;
						while(true) {
							let p = nite;
							let q = p.prev;
							if((p.y < y && q.y >= y || q.y < y && p.y >= y) && (p.x <= x || q.x <= x)) {
								if(p.x + (y - p.y) / (q.y - p.y) * (q.x - p.x) < x) {
									ret = !ret;
								}
							}
							nite = nite.next;
							if(!(nite != L)) {
								break;
							}
						}
					}
					positive = ret;
				}
				let F = a;
				let L = p;
				if(F != null) {
					let nite = F;
					while(true) {
						let q = nite;
						q.positive = positive;
						nite = nite.next;
						if(!(nite != L)) {
							break;
						}
					}
				}
				pre = p;
				p = p.next;
				if(!(p != start)) {
					break;
				}
			}
			while(true) {
				if(p.value != 0.0 && (pre == null || p == pre.next)) {
					pre = p;
					p = p.next;
					if(!false) {
						break;
					} else {
						continue;
					}
				}
				let prod = pre.value * p.value;
				if(prod == 0) {
					p = p.next;
					if(!false) {
						break;
					} else {
						continue;
					}
				}
				let a = pre.next;
				let positive;
				if(prod > 0) {
					positive = pre.positive;
				} else {
					let b = a.next;
					let midx = 0.0;
					let midy = 0.0;
					midx = a.posx + b.posx;
					midy = a.posy + b.posy;
					let t = 0.5;
					midx *= t;
					midy *= t;
					let x = midx + nx * 1e-8;
					let y = midy + ny * 1e-8;
					let ret = false;
					let F = P;
					let L = P;
					if(F != null) {
						let nite = F;
						while(true) {
							let p = nite;
							let q = p.prev;
							if((p.y < y && q.y >= y || q.y < y && p.y >= y) && (p.x <= x || q.x <= x)) {
								if(p.x + (y - p.y) / (q.y - p.y) * (q.x - p.x) < x) {
									ret = !ret;
								}
							}
							nite = nite.next;
							if(!(nite != L)) {
								break;
							}
						}
					}
					positive = ret;
				}
				let F = a;
				let L = p;
				if(F != null) {
					let nite = F;
					while(true) {
						let q = nite;
						q.positive = positive;
						nite = nite.next;
						if(!(nite != L)) {
							break;
						}
					}
				}
				pre = p;
				p = p.next;
				if(!false) {
					break;
				}
			}
		}
		if(ZPP_Cutter.ints == null) {
			ZPP_Cutter.ints = new ZNPList_ZPP_CutInt();
		}
		if(ZPP_Cutter.paths == null) {
			ZPP_Cutter.paths = new ZNPList_ZPP_CutVert();
		}
		let start = null;
		let x = verts.posx;
		let y = verts.posy;
		let ret;
		if(ZPP_GeomVert.zpp_pool == null) {
			ret = new ZPP_GeomVert();
		} else {
			ret = ZPP_GeomVert.zpp_pool;
			ZPP_GeomVert.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.forced = false;
		ret.x = x;
		ret.y = y;
		let obj = ret;
		if(start == null) {
			start = obj.prev = obj.next = obj;
		} else {
			obj.next = start;
			obj.prev = start.prev;
			start.prev.next = obj;
			start.prev = obj;
		}
		let origin = start;
		let ret1;
		if(ZPP_CutVert.zpp_pool == null) {
			ret1 = new ZPP_CutVert();
		} else {
			ret1 = ZPP_CutVert.zpp_pool;
			ZPP_CutVert.zpp_pool = ret1.next;
			ret1.next = null;
		}
		ret1.vert = start;
		ret1.parent = ret1;
		ret1.rank = 0;
		ret1.used = false;
		let firstpath = ret1;
		ZPP_Cutter.paths.add(firstpath);
		let i = verts;
		while(true) {
			let j = i.next;
			let x = j.posx;
			let y = j.posy;
			let ret;
			if(ZPP_GeomVert.zpp_pool == null) {
				ret = new ZPP_GeomVert();
			} else {
				ret = ZPP_GeomVert.zpp_pool;
				ZPP_GeomVert.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.forced = false;
			ret.x = x;
			ret.y = y;
			let pj = ret;
			if(i.positive == j.positive) {
				let obj = pj;
				if(start == null) {
					start = obj.prev = obj.next = obj;
				} else {
					obj.next = start;
					obj.prev = start.prev;
					start.prev.next = obj;
					start.prev = obj;
				}
			} else {
				let ux = 0.0;
				let uy = 0.0;
				ux = j.posx - i.posx;
				uy = j.posy - i.posy;
				let denom = dy * ux - dx * uy;
				denom = 1 / denom;
				let pax = 0.0;
				let pay = 0.0;
				pax = px - i.posx;
				pay = py - i.posy;
				let s = (uy * pax - ux * pay) * denom;
				if(s < min || s > max) {
					let tmp = ZPP_Cutter.ints;
					let virtualint = true;
					if(virtualint == null) {
						virtualint = false;
					}
					let ret;
					if(ZPP_CutInt.zpp_pool == null) {
						ret = new ZPP_CutInt();
					} else {
						ret = ZPP_CutInt.zpp_pool;
						ZPP_CutInt.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.virtualint = virtualint;
					ret.end = null;
					ret.start = null;
					ret.path0 = null;
					ret.path1 = null;
					ret.time = s;
					ret.vertex = false;
					tmp.add(ret);
					let obj = pj;
					if(start == null) {
						start = obj.prev = obj.next = obj;
					} else {
						obj.next = start;
						obj.prev = start.prev;
						start.prev.next = obj;
						start.prev = obj;
					}
				} else if(i.value == 0) {
					let endof = start.prev;
					start = null;
					let x = endof.x;
					let y = endof.y;
					let ret;
					if(ZPP_GeomVert.zpp_pool == null) {
						ret = new ZPP_GeomVert();
					} else {
						ret = ZPP_GeomVert.zpp_pool;
						ZPP_GeomVert.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.forced = false;
					ret.x = x;
					ret.y = y;
					let obj = ret;
					if(start == null) {
						start = obj.prev = obj.next = obj;
					} else {
						obj.next = start;
						obj.prev = start.prev;
						start.prev.next = obj;
						start.prev = obj;
					}
					let obj1 = pj;
					if(start == null) {
						start = obj1.prev = obj1.next = obj1;
					} else {
						obj1.next = start;
						obj1.prev = start.prev;
						start.prev.next = obj1;
						start.prev = obj1;
					}
					let prepath = ZPP_Cutter.paths.head.elt;
					let tmp = ZPP_Cutter.paths;
					let ret1;
					if(ZPP_CutVert.zpp_pool == null) {
						ret1 = new ZPP_CutVert();
					} else {
						ret1 = ZPP_CutVert.zpp_pool;
						ZPP_CutVert.zpp_pool = ret1.next;
						ret1.next = null;
					}
					ret1.vert = start;
					ret1.parent = ret1;
					ret1.rank = 0;
					ret1.used = false;
					tmp.add(ret1);
					let postpath = ZPP_Cutter.paths.head.elt;
					let tmp1 = ZPP_Cutter.ints;
					let virtualint = true;
					if(virtualint == null) {
						virtualint = false;
					}
					let ret2;
					if(ZPP_CutInt.zpp_pool == null) {
						ret2 = new ZPP_CutInt();
					} else {
						ret2 = ZPP_CutInt.zpp_pool;
						ZPP_CutInt.zpp_pool = ret2.next;
						ret2.next = null;
					}
					ret2.virtualint = virtualint;
					ret2.end = endof;
					ret2.start = start;
					ret2.path0 = prepath;
					ret2.path1 = postpath;
					ret2.time = s;
					ret2.vertex = false;
					tmp1.add(ret2);
				} else if(j.value == 0) {
					let obj = pj;
					if(start == null) {
						start = obj.prev = obj.next = obj;
					} else {
						obj.next = start;
						obj.prev = start.prev;
						start.prev.next = obj;
						start.prev = obj;
					}
					let endof = start.prev;
					start = null;
					let x = j.posx;
					let y = j.posy;
					let ret;
					if(ZPP_GeomVert.zpp_pool == null) {
						ret = new ZPP_GeomVert();
					} else {
						ret = ZPP_GeomVert.zpp_pool;
						ZPP_GeomVert.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.forced = false;
					ret.x = x;
					ret.y = y;
					let obj1 = ret;
					if(start == null) {
						start = obj1.prev = obj1.next = obj1;
					} else {
						obj1.next = start;
						obj1.prev = start.prev;
						start.prev.next = obj1;
						start.prev = obj1;
					}
					let prepath = ZPP_Cutter.paths.head.elt;
					let tmp = ZPP_Cutter.paths;
					let ret1;
					if(ZPP_CutVert.zpp_pool == null) {
						ret1 = new ZPP_CutVert();
					} else {
						ret1 = ZPP_CutVert.zpp_pool;
						ZPP_CutVert.zpp_pool = ret1.next;
						ret1.next = null;
					}
					ret1.vert = start;
					ret1.parent = ret1;
					ret1.rank = 0;
					ret1.used = false;
					tmp.add(ret1);
					let postpath = ZPP_Cutter.paths.head.elt;
					let tmp1 = ZPP_Cutter.ints;
					let virtualint = true;
					if(virtualint == null) {
						virtualint = false;
					}
					let ret2;
					if(ZPP_CutInt.zpp_pool == null) {
						ret2 = new ZPP_CutInt();
					} else {
						ret2 = ZPP_CutInt.zpp_pool;
						ZPP_CutInt.zpp_pool = ret2.next;
						ret2.next = null;
					}
					ret2.virtualint = virtualint;
					ret2.end = endof;
					ret2.start = start;
					ret2.path0 = prepath;
					ret2.path1 = postpath;
					ret2.time = s;
					ret2.vertex = false;
					tmp1.add(ret2);
				} else {
					let t = (dy * pax - dx * pay) * denom;
					let qx = 0.0;
					let qy = 0.0;
					qx = i.posx;
					qy = i.posy;
					let t1 = t;
					qx += ux * t1;
					qy += uy * t1;
					let ret;
					if(ZPP_GeomVert.zpp_pool == null) {
						ret = new ZPP_GeomVert();
					} else {
						ret = ZPP_GeomVert.zpp_pool;
						ZPP_GeomVert.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.forced = false;
					ret.x = qx;
					ret.y = qy;
					let obj = ret;
					if(start == null) {
						start = obj.prev = obj.next = obj;
					} else {
						obj.next = start;
						obj.prev = start.prev;
						start.prev.next = obj;
						start.prev = obj;
					}
					let endof = start.prev;
					start = null;
					let ret1;
					if(ZPP_GeomVert.zpp_pool == null) {
						ret1 = new ZPP_GeomVert();
					} else {
						ret1 = ZPP_GeomVert.zpp_pool;
						ZPP_GeomVert.zpp_pool = ret1.next;
						ret1.next = null;
					}
					ret1.forced = false;
					ret1.x = qx;
					ret1.y = qy;
					let obj1 = ret1;
					if(start == null) {
						start = obj1.prev = obj1.next = obj1;
					} else {
						obj1.next = start;
						obj1.prev = start.prev;
						start.prev.next = obj1;
						start.prev = obj1;
					}
					let obj2 = pj;
					if(start == null) {
						start = obj2.prev = obj2.next = obj2;
					} else {
						obj2.next = start;
						obj2.prev = start.prev;
						start.prev.next = obj2;
						start.prev = obj2;
					}
					let prepath = ZPP_Cutter.paths.head.elt;
					let tmp = ZPP_Cutter.paths;
					let ret2;
					if(ZPP_CutVert.zpp_pool == null) {
						ret2 = new ZPP_CutVert();
					} else {
						ret2 = ZPP_CutVert.zpp_pool;
						ZPP_CutVert.zpp_pool = ret2.next;
						ret2.next = null;
					}
					ret2.vert = start;
					ret2.parent = ret2;
					ret2.rank = 0;
					ret2.used = false;
					tmp.add(ret2);
					let postpath = ZPP_Cutter.paths.head.elt;
					let tmp1 = ZPP_Cutter.ints;
					let virtualint = false;
					if(virtualint == null) {
						virtualint = false;
					}
					let ret3;
					if(ZPP_CutInt.zpp_pool == null) {
						ret3 = new ZPP_CutInt();
					} else {
						ret3 = ZPP_CutInt.zpp_pool;
						ZPP_CutInt.zpp_pool = ret3.next;
						ret3.next = null;
					}
					ret3.virtualint = virtualint;
					ret3.end = endof;
					ret3.start = start;
					ret3.path0 = prepath;
					ret3.path1 = postpath;
					ret3.time = s;
					ret3.vertex = false;
					tmp1.add(ret3);
				}
			}
			i = i.next;
			if(!(i != verts)) {
				break;
			}
		}
		let endof = start.prev;
		endof.next.prev = origin.prev;
		origin.prev.next = endof.next;
		endof.next = origin;
		origin.prev = endof;
		let lastpath = ZPP_Cutter.paths.head.elt;
		let xr;
		if(firstpath == firstpath.parent) {
			xr = firstpath;
		} else {
			let obj = firstpath;
			let stack = null;
			while(obj != obj.parent) {
				let nxt = obj.parent;
				obj.parent = stack;
				stack = obj;
				obj = nxt;
			}
			while(stack != null) {
				let nxt = stack.parent;
				stack.parent = obj;
				stack = nxt;
			}
			xr = obj;
		}
		let yr;
		if(lastpath == lastpath.parent) {
			yr = lastpath;
		} else {
			let obj = lastpath;
			let stack = null;
			while(obj != obj.parent) {
				let nxt = obj.parent;
				obj.parent = stack;
				stack = obj;
				obj = nxt;
			}
			while(stack != null) {
				let nxt = stack.parent;
				stack.parent = obj;
				stack = nxt;
			}
			yr = obj;
		}
		if(xr != yr) {
			if(xr.rank < yr.rank) {
				xr.parent = yr;
			} else if(xr.rank > yr.rank) {
				yr.parent = xr;
			} else {
				yr.parent = xr;
				xr.rank++;
			}
		}
		let xxlist = ZPP_Cutter.ints;
		if(xxlist.head != null && xxlist.head.next != null) {
			let head = xxlist.head;
			let tail = null;
			let left = null;
			let right = null;
			let nxt = null;
			let listSize = 1;
			let numMerges;
			let leftSize;
			let rightSize;
			while(true) {
				numMerges = 0;
				left = head;
				head = null;
				tail = head;
				while(left != null) {
					++numMerges;
					right = left;
					leftSize = 0;
					rightSize = listSize;
					while(right != null && leftSize < listSize) {
						++leftSize;
						right = right.next;
					}
					while(leftSize > 0 || rightSize > 0 && right != null) {
						if(leftSize == 0) {
							nxt = right;
							right = right.next;
							--rightSize;
						} else if(rightSize == 0 || right == null) {
							nxt = left;
							left = left.next;
							--leftSize;
						} else if(left.elt.time < right.elt.time) {
							nxt = left;
							left = left.next;
							--leftSize;
						} else {
							nxt = right;
							right = right.next;
							--rightSize;
						}
						if(tail != null) {
							tail.next = nxt;
						} else {
							head = nxt;
						}
						tail = nxt;
					}
					left = right;
				}
				tail.next = null;
				listSize <<= 1;
				if(!(numMerges > 1)) {
					break;
				}
			}
			xxlist.head = head;
			xxlist.modified = true;
			xxlist.pushmod = true;
		}
		while(ZPP_Cutter.ints.head != null) {
			let i = ZPP_Cutter.ints.pop_unsafe();
			let j = ZPP_Cutter.ints.pop_unsafe();
			if(!i.virtualint && !j.virtualint) {
				i.end.next.prev = j.start.prev;
				j.start.prev.next = i.end.next;
				i.end.next = j.start;
				j.start.prev = i.end;
				j.end.next.prev = i.start.prev;
				i.start.prev.next = j.end.next;
				j.end.next = i.start;
				i.start.prev = j.end;
				let xr;
				if(i.path0 == i.path0.parent) {
					xr = i.path0;
				} else {
					let obj = i.path0;
					let stack = null;
					while(obj != obj.parent) {
						let nxt = obj.parent;
						obj.parent = stack;
						stack = obj;
						obj = nxt;
					}
					while(stack != null) {
						let nxt = stack.parent;
						stack.parent = obj;
						stack = nxt;
					}
					xr = obj;
				}
				let yr;
				if(j.path1 == j.path1.parent) {
					yr = j.path1;
				} else {
					let obj = j.path1;
					let stack = null;
					while(obj != obj.parent) {
						let nxt = obj.parent;
						obj.parent = stack;
						stack = obj;
						obj = nxt;
					}
					while(stack != null) {
						let nxt = stack.parent;
						stack.parent = obj;
						stack = nxt;
					}
					yr = obj;
				}
				if(xr != yr) {
					if(xr.rank < yr.rank) {
						xr.parent = yr;
					} else if(xr.rank > yr.rank) {
						yr.parent = xr;
					} else {
						yr.parent = xr;
						xr.rank++;
					}
				}
				let xr1;
				if(i.path1 == i.path1.parent) {
					xr1 = i.path1;
				} else {
					let obj = i.path1;
					let stack = null;
					while(obj != obj.parent) {
						let nxt = obj.parent;
						obj.parent = stack;
						stack = obj;
						obj = nxt;
					}
					while(stack != null) {
						let nxt = stack.parent;
						stack.parent = obj;
						stack = nxt;
					}
					xr1 = obj;
				}
				let yr1;
				if(j.path0 == j.path0.parent) {
					yr1 = j.path0;
				} else {
					let obj = j.path0;
					let stack = null;
					while(obj != obj.parent) {
						let nxt = obj.parent;
						obj.parent = stack;
						stack = obj;
						obj = nxt;
					}
					while(stack != null) {
						let nxt = stack.parent;
						stack.parent = obj;
						stack = nxt;
					}
					yr1 = obj;
				}
				if(xr1 != yr1) {
					if(xr1.rank < yr1.rank) {
						xr1.parent = yr1;
					} else if(xr1.rank > yr1.rank) {
						yr1.parent = xr1;
					} else {
						yr1.parent = xr1;
						xr1.rank++;
					}
				}
			} else if(i.virtualint && !j.virtualint) {
				let tmp;
				if(j.end != null && j.end.prev == j.end) {
					j.end.next = j.end.prev = null;
					let o = j.end;
					if(o.wrap != null) {
						o.wrap.zpp_inner._inuse = false;
						let _this = o.wrap;
						if(_this != null && _this.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = _this.zpp_inner;
						if(_this1._immutable) {
							throw haxe_Exception.thrown("Error: Vec2 is immutable");
						}
						if(_this1._isimmutable != null) {
							_this1._isimmutable();
						}
						if(_this.zpp_inner._inuse) {
							throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
						}
						let inner = _this.zpp_inner;
						_this.zpp_inner.outer = null;
						_this.zpp_inner = null;
						let o1 = _this;
						o1.zpp_pool = null;
						if(ZPP_PubPool.nextVec2 != null) {
							ZPP_PubPool.nextVec2.zpp_pool = o1;
						} else {
							ZPP_PubPool.poolVec2 = o1;
						}
						ZPP_PubPool.nextVec2 = o1;
						o1.zpp_disp = true;
						let o2 = inner;
						if(o2.outer != null) {
							o2.outer.zpp_inner = null;
							o2.outer = null;
						}
						o2._isimmutable = null;
						o2._validate = null;
						o2._invalidate = null;
						o2.next = ZPP_Vec2.zpp_pool;
						ZPP_Vec2.zpp_pool = o2;
						o.wrap = null;
					}
					o.prev = o.next = null;
					o.next = ZPP_GeomVert.zpp_pool;
					ZPP_GeomVert.zpp_pool = o;
					tmp = null;
				} else {
					let retnodes = j.end.prev;
					j.end.prev.next = j.end.next;
					j.end.next.prev = j.end.prev;
					j.end.next = j.end.prev = null;
					let o = j.end;
					if(o.wrap != null) {
						o.wrap.zpp_inner._inuse = false;
						let _this = o.wrap;
						if(_this != null && _this.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = _this.zpp_inner;
						if(_this1._immutable) {
							throw haxe_Exception.thrown("Error: Vec2 is immutable");
						}
						if(_this1._isimmutable != null) {
							_this1._isimmutable();
						}
						if(_this.zpp_inner._inuse) {
							throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
						}
						let inner = _this.zpp_inner;
						_this.zpp_inner.outer = null;
						_this.zpp_inner = null;
						let o1 = _this;
						o1.zpp_pool = null;
						if(ZPP_PubPool.nextVec2 != null) {
							ZPP_PubPool.nextVec2.zpp_pool = o1;
						} else {
							ZPP_PubPool.poolVec2 = o1;
						}
						ZPP_PubPool.nextVec2 = o1;
						o1.zpp_disp = true;
						let o2 = inner;
						if(o2.outer != null) {
							o2.outer.zpp_inner = null;
							o2.outer = null;
						}
						o2._isimmutable = null;
						o2._validate = null;
						o2._invalidate = null;
						o2.next = ZPP_Vec2.zpp_pool;
						ZPP_Vec2.zpp_pool = o2;
						o.wrap = null;
					}
					o.prev = o.next = null;
					o.next = ZPP_GeomVert.zpp_pool;
					ZPP_GeomVert.zpp_pool = o;
					j.end = null;
					tmp = retnodes;
				}
				j.end = tmp;
				if(!j.vertex) {
					if(j.end != j.path0.vert) {
						j.start.x = j.end.x;
						j.start.y = j.end.y;
						let tmp;
						if(j.end != null && j.end.prev == j.end) {
							j.end.next = j.end.prev = null;
							let o = j.end;
							if(o.wrap != null) {
								o.wrap.zpp_inner._inuse = false;
								let _this = o.wrap;
								if(_this != null && _this.zpp_disp) {
									throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
								}
								let _this1 = _this.zpp_inner;
								if(_this1._immutable) {
									throw haxe_Exception.thrown("Error: Vec2 is immutable");
								}
								if(_this1._isimmutable != null) {
									_this1._isimmutable();
								}
								if(_this.zpp_inner._inuse) {
									throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
								}
								let inner = _this.zpp_inner;
								_this.zpp_inner.outer = null;
								_this.zpp_inner = null;
								let o1 = _this;
								o1.zpp_pool = null;
								if(ZPP_PubPool.nextVec2 != null) {
									ZPP_PubPool.nextVec2.zpp_pool = o1;
								} else {
									ZPP_PubPool.poolVec2 = o1;
								}
								ZPP_PubPool.nextVec2 = o1;
								o1.zpp_disp = true;
								let o2 = inner;
								if(o2.outer != null) {
									o2.outer.zpp_inner = null;
									o2.outer = null;
								}
								o2._isimmutable = null;
								o2._validate = null;
								o2._invalidate = null;
								o2.next = ZPP_Vec2.zpp_pool;
								ZPP_Vec2.zpp_pool = o2;
								o.wrap = null;
							}
							o.prev = o.next = null;
							o.next = ZPP_GeomVert.zpp_pool;
							ZPP_GeomVert.zpp_pool = o;
							tmp = null;
						} else {
							let retnodes = j.end.prev;
							j.end.prev.next = j.end.next;
							j.end.next.prev = j.end.prev;
							j.end.next = j.end.prev = null;
							let o = j.end;
							if(o.wrap != null) {
								o.wrap.zpp_inner._inuse = false;
								let _this = o.wrap;
								if(_this != null && _this.zpp_disp) {
									throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
								}
								let _this1 = _this.zpp_inner;
								if(_this1._immutable) {
									throw haxe_Exception.thrown("Error: Vec2 is immutable");
								}
								if(_this1._isimmutable != null) {
									_this1._isimmutable();
								}
								if(_this.zpp_inner._inuse) {
									throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
								}
								let inner = _this.zpp_inner;
								_this.zpp_inner.outer = null;
								_this.zpp_inner = null;
								let o1 = _this;
								o1.zpp_pool = null;
								if(ZPP_PubPool.nextVec2 != null) {
									ZPP_PubPool.nextVec2.zpp_pool = o1;
								} else {
									ZPP_PubPool.poolVec2 = o1;
								}
								ZPP_PubPool.nextVec2 = o1;
								o1.zpp_disp = true;
								let o2 = inner;
								if(o2.outer != null) {
									o2.outer.zpp_inner = null;
									o2.outer = null;
								}
								o2._isimmutable = null;
								o2._validate = null;
								o2._invalidate = null;
								o2.next = ZPP_Vec2.zpp_pool;
								ZPP_Vec2.zpp_pool = o2;
								o.wrap = null;
							}
							o.prev = o.next = null;
							o.next = ZPP_GeomVert.zpp_pool;
							ZPP_GeomVert.zpp_pool = o;
							j.end = null;
							tmp = retnodes;
						}
						j.end = tmp;
					} else {
						let n = j.start.next;
						j.start.x = n.x;
						j.start.y = n.y;
						if(n != null && n.prev == n) {
							n.next = n.prev = null;
							let o = n;
							if(o.wrap != null) {
								o.wrap.zpp_inner._inuse = false;
								let _this = o.wrap;
								if(_this != null && _this.zpp_disp) {
									throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
								}
								let _this1 = _this.zpp_inner;
								if(_this1._immutable) {
									throw haxe_Exception.thrown("Error: Vec2 is immutable");
								}
								if(_this1._isimmutable != null) {
									_this1._isimmutable();
								}
								if(_this.zpp_inner._inuse) {
									throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
								}
								let inner = _this.zpp_inner;
								_this.zpp_inner.outer = null;
								_this.zpp_inner = null;
								let o1 = _this;
								o1.zpp_pool = null;
								if(ZPP_PubPool.nextVec2 != null) {
									ZPP_PubPool.nextVec2.zpp_pool = o1;
								} else {
									ZPP_PubPool.poolVec2 = o1;
								}
								ZPP_PubPool.nextVec2 = o1;
								o1.zpp_disp = true;
								let o2 = inner;
								if(o2.outer != null) {
									o2.outer.zpp_inner = null;
									o2.outer = null;
								}
								o2._isimmutable = null;
								o2._validate = null;
								o2._invalidate = null;
								o2.next = ZPP_Vec2.zpp_pool;
								ZPP_Vec2.zpp_pool = o2;
								o.wrap = null;
							}
							o.prev = o.next = null;
							o.next = ZPP_GeomVert.zpp_pool;
							ZPP_GeomVert.zpp_pool = o;
							n = null;
						} else {
							n.prev.next = n.next;
							n.next.prev = n.prev;
							n.next = n.prev = null;
							let o = n;
							if(o.wrap != null) {
								o.wrap.zpp_inner._inuse = false;
								let _this = o.wrap;
								if(_this != null && _this.zpp_disp) {
									throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
								}
								let _this1 = _this.zpp_inner;
								if(_this1._immutable) {
									throw haxe_Exception.thrown("Error: Vec2 is immutable");
								}
								if(_this1._isimmutable != null) {
									_this1._isimmutable();
								}
								if(_this.zpp_inner._inuse) {
									throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
								}
								let inner = _this.zpp_inner;
								_this.zpp_inner.outer = null;
								_this.zpp_inner = null;
								let o1 = _this;
								o1.zpp_pool = null;
								if(ZPP_PubPool.nextVec2 != null) {
									ZPP_PubPool.nextVec2.zpp_pool = o1;
								} else {
									ZPP_PubPool.poolVec2 = o1;
								}
								ZPP_PubPool.nextVec2 = o1;
								o1.zpp_disp = true;
								let o2 = inner;
								if(o2.outer != null) {
									o2.outer.zpp_inner = null;
									o2.outer = null;
								}
								o2._isimmutable = null;
								o2._validate = null;
								o2._invalidate = null;
								o2.next = ZPP_Vec2.zpp_pool;
								ZPP_Vec2.zpp_pool = o2;
								o.wrap = null;
							}
							o.prev = o.next = null;
							o.next = ZPP_GeomVert.zpp_pool;
							ZPP_GeomVert.zpp_pool = o;
						}
					}
				}
				j.end.next.prev = j.start.prev;
				j.start.prev.next = j.end.next;
				j.end.next = j.start;
				j.start.prev = j.end;
				let xr;
				if(j.path0 == j.path0.parent) {
					xr = j.path0;
				} else {
					let obj = j.path0;
					let stack = null;
					while(obj != obj.parent) {
						let nxt = obj.parent;
						obj.parent = stack;
						stack = obj;
						obj = nxt;
					}
					while(stack != null) {
						let nxt = stack.parent;
						stack.parent = obj;
						stack = nxt;
					}
					xr = obj;
				}
				let yr;
				if(j.path1 == j.path1.parent) {
					yr = j.path1;
				} else {
					let obj = j.path1;
					let stack = null;
					while(obj != obj.parent) {
						let nxt = obj.parent;
						obj.parent = stack;
						stack = obj;
						obj = nxt;
					}
					while(stack != null) {
						let nxt = stack.parent;
						stack.parent = obj;
						stack = nxt;
					}
					yr = obj;
				}
				if(xr != yr) {
					if(xr.rank < yr.rank) {
						xr.parent = yr;
					} else if(xr.rank > yr.rank) {
						yr.parent = xr;
					} else {
						yr.parent = xr;
						xr.rank++;
					}
				}
			} else if(j.virtualint && !i.virtualint) {
				let tmp;
				if(i.end != null && i.end.prev == i.end) {
					i.end.next = i.end.prev = null;
					let o = i.end;
					if(o.wrap != null) {
						o.wrap.zpp_inner._inuse = false;
						let _this = o.wrap;
						if(_this != null && _this.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = _this.zpp_inner;
						if(_this1._immutable) {
							throw haxe_Exception.thrown("Error: Vec2 is immutable");
						}
						if(_this1._isimmutable != null) {
							_this1._isimmutable();
						}
						if(_this.zpp_inner._inuse) {
							throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
						}
						let inner = _this.zpp_inner;
						_this.zpp_inner.outer = null;
						_this.zpp_inner = null;
						let o1 = _this;
						o1.zpp_pool = null;
						if(ZPP_PubPool.nextVec2 != null) {
							ZPP_PubPool.nextVec2.zpp_pool = o1;
						} else {
							ZPP_PubPool.poolVec2 = o1;
						}
						ZPP_PubPool.nextVec2 = o1;
						o1.zpp_disp = true;
						let o2 = inner;
						if(o2.outer != null) {
							o2.outer.zpp_inner = null;
							o2.outer = null;
						}
						o2._isimmutable = null;
						o2._validate = null;
						o2._invalidate = null;
						o2.next = ZPP_Vec2.zpp_pool;
						ZPP_Vec2.zpp_pool = o2;
						o.wrap = null;
					}
					o.prev = o.next = null;
					o.next = ZPP_GeomVert.zpp_pool;
					ZPP_GeomVert.zpp_pool = o;
					tmp = null;
				} else {
					let retnodes = i.end.prev;
					i.end.prev.next = i.end.next;
					i.end.next.prev = i.end.prev;
					i.end.next = i.end.prev = null;
					let o = i.end;
					if(o.wrap != null) {
						o.wrap.zpp_inner._inuse = false;
						let _this = o.wrap;
						if(_this != null && _this.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = _this.zpp_inner;
						if(_this1._immutable) {
							throw haxe_Exception.thrown("Error: Vec2 is immutable");
						}
						if(_this1._isimmutable != null) {
							_this1._isimmutable();
						}
						if(_this.zpp_inner._inuse) {
							throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
						}
						let inner = _this.zpp_inner;
						_this.zpp_inner.outer = null;
						_this.zpp_inner = null;
						let o1 = _this;
						o1.zpp_pool = null;
						if(ZPP_PubPool.nextVec2 != null) {
							ZPP_PubPool.nextVec2.zpp_pool = o1;
						} else {
							ZPP_PubPool.poolVec2 = o1;
						}
						ZPP_PubPool.nextVec2 = o1;
						o1.zpp_disp = true;
						let o2 = inner;
						if(o2.outer != null) {
							o2.outer.zpp_inner = null;
							o2.outer = null;
						}
						o2._isimmutable = null;
						o2._validate = null;
						o2._invalidate = null;
						o2.next = ZPP_Vec2.zpp_pool;
						ZPP_Vec2.zpp_pool = o2;
						o.wrap = null;
					}
					o.prev = o.next = null;
					o.next = ZPP_GeomVert.zpp_pool;
					ZPP_GeomVert.zpp_pool = o;
					i.end = null;
					tmp = retnodes;
				}
				i.end = tmp;
				if(!i.vertex) {
					if(i.end != i.path0.vert) {
						i.start.x = i.end.x;
						i.start.y = i.end.y;
						let tmp;
						if(i.end != null && i.end.prev == i.end) {
							i.end.next = i.end.prev = null;
							let o = i.end;
							if(o.wrap != null) {
								o.wrap.zpp_inner._inuse = false;
								let _this = o.wrap;
								if(_this != null && _this.zpp_disp) {
									throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
								}
								let _this1 = _this.zpp_inner;
								if(_this1._immutable) {
									throw haxe_Exception.thrown("Error: Vec2 is immutable");
								}
								if(_this1._isimmutable != null) {
									_this1._isimmutable();
								}
								if(_this.zpp_inner._inuse) {
									throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
								}
								let inner = _this.zpp_inner;
								_this.zpp_inner.outer = null;
								_this.zpp_inner = null;
								let o1 = _this;
								o1.zpp_pool = null;
								if(ZPP_PubPool.nextVec2 != null) {
									ZPP_PubPool.nextVec2.zpp_pool = o1;
								} else {
									ZPP_PubPool.poolVec2 = o1;
								}
								ZPP_PubPool.nextVec2 = o1;
								o1.zpp_disp = true;
								let o2 = inner;
								if(o2.outer != null) {
									o2.outer.zpp_inner = null;
									o2.outer = null;
								}
								o2._isimmutable = null;
								o2._validate = null;
								o2._invalidate = null;
								o2.next = ZPP_Vec2.zpp_pool;
								ZPP_Vec2.zpp_pool = o2;
								o.wrap = null;
							}
							o.prev = o.next = null;
							o.next = ZPP_GeomVert.zpp_pool;
							ZPP_GeomVert.zpp_pool = o;
							tmp = null;
						} else {
							let retnodes = i.end.prev;
							i.end.prev.next = i.end.next;
							i.end.next.prev = i.end.prev;
							i.end.next = i.end.prev = null;
							let o = i.end;
							if(o.wrap != null) {
								o.wrap.zpp_inner._inuse = false;
								let _this = o.wrap;
								if(_this != null && _this.zpp_disp) {
									throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
								}
								let _this1 = _this.zpp_inner;
								if(_this1._immutable) {
									throw haxe_Exception.thrown("Error: Vec2 is immutable");
								}
								if(_this1._isimmutable != null) {
									_this1._isimmutable();
								}
								if(_this.zpp_inner._inuse) {
									throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
								}
								let inner = _this.zpp_inner;
								_this.zpp_inner.outer = null;
								_this.zpp_inner = null;
								let o1 = _this;
								o1.zpp_pool = null;
								if(ZPP_PubPool.nextVec2 != null) {
									ZPP_PubPool.nextVec2.zpp_pool = o1;
								} else {
									ZPP_PubPool.poolVec2 = o1;
								}
								ZPP_PubPool.nextVec2 = o1;
								o1.zpp_disp = true;
								let o2 = inner;
								if(o2.outer != null) {
									o2.outer.zpp_inner = null;
									o2.outer = null;
								}
								o2._isimmutable = null;
								o2._validate = null;
								o2._invalidate = null;
								o2.next = ZPP_Vec2.zpp_pool;
								ZPP_Vec2.zpp_pool = o2;
								o.wrap = null;
							}
							o.prev = o.next = null;
							o.next = ZPP_GeomVert.zpp_pool;
							ZPP_GeomVert.zpp_pool = o;
							i.end = null;
							tmp = retnodes;
						}
						i.end = tmp;
					} else {
						let n = i.start.next;
						i.start.x = n.x;
						i.start.y = n.y;
						if(n != null && n.prev == n) {
							n.next = n.prev = null;
							let o = n;
							if(o.wrap != null) {
								o.wrap.zpp_inner._inuse = false;
								let _this = o.wrap;
								if(_this != null && _this.zpp_disp) {
									throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
								}
								let _this1 = _this.zpp_inner;
								if(_this1._immutable) {
									throw haxe_Exception.thrown("Error: Vec2 is immutable");
								}
								if(_this1._isimmutable != null) {
									_this1._isimmutable();
								}
								if(_this.zpp_inner._inuse) {
									throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
								}
								let inner = _this.zpp_inner;
								_this.zpp_inner.outer = null;
								_this.zpp_inner = null;
								let o1 = _this;
								o1.zpp_pool = null;
								if(ZPP_PubPool.nextVec2 != null) {
									ZPP_PubPool.nextVec2.zpp_pool = o1;
								} else {
									ZPP_PubPool.poolVec2 = o1;
								}
								ZPP_PubPool.nextVec2 = o1;
								o1.zpp_disp = true;
								let o2 = inner;
								if(o2.outer != null) {
									o2.outer.zpp_inner = null;
									o2.outer = null;
								}
								o2._isimmutable = null;
								o2._validate = null;
								o2._invalidate = null;
								o2.next = ZPP_Vec2.zpp_pool;
								ZPP_Vec2.zpp_pool = o2;
								o.wrap = null;
							}
							o.prev = o.next = null;
							o.next = ZPP_GeomVert.zpp_pool;
							ZPP_GeomVert.zpp_pool = o;
							n = null;
						} else {
							n.prev.next = n.next;
							n.next.prev = n.prev;
							n.next = n.prev = null;
							let o = n;
							if(o.wrap != null) {
								o.wrap.zpp_inner._inuse = false;
								let _this = o.wrap;
								if(_this != null && _this.zpp_disp) {
									throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
								}
								let _this1 = _this.zpp_inner;
								if(_this1._immutable) {
									throw haxe_Exception.thrown("Error: Vec2 is immutable");
								}
								if(_this1._isimmutable != null) {
									_this1._isimmutable();
								}
								if(_this.zpp_inner._inuse) {
									throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
								}
								let inner = _this.zpp_inner;
								_this.zpp_inner.outer = null;
								_this.zpp_inner = null;
								let o1 = _this;
								o1.zpp_pool = null;
								if(ZPP_PubPool.nextVec2 != null) {
									ZPP_PubPool.nextVec2.zpp_pool = o1;
								} else {
									ZPP_PubPool.poolVec2 = o1;
								}
								ZPP_PubPool.nextVec2 = o1;
								o1.zpp_disp = true;
								let o2 = inner;
								if(o2.outer != null) {
									o2.outer.zpp_inner = null;
									o2.outer = null;
								}
								o2._isimmutable = null;
								o2._validate = null;
								o2._invalidate = null;
								o2.next = ZPP_Vec2.zpp_pool;
								ZPP_Vec2.zpp_pool = o2;
								o.wrap = null;
							}
							o.prev = o.next = null;
							o.next = ZPP_GeomVert.zpp_pool;
							ZPP_GeomVert.zpp_pool = o;
						}
					}
				}
				i.end.next.prev = i.start.prev;
				i.start.prev.next = i.end.next;
				i.end.next = i.start;
				i.start.prev = i.end;
				let xr;
				if(i.path0 == i.path0.parent) {
					xr = i.path0;
				} else {
					let obj = i.path0;
					let stack = null;
					while(obj != obj.parent) {
						let nxt = obj.parent;
						obj.parent = stack;
						stack = obj;
						obj = nxt;
					}
					while(stack != null) {
						let nxt = stack.parent;
						stack.parent = obj;
						stack = nxt;
					}
					xr = obj;
				}
				let yr;
				if(i.path1 == i.path1.parent) {
					yr = i.path1;
				} else {
					let obj = i.path1;
					let stack = null;
					while(obj != obj.parent) {
						let nxt = obj.parent;
						obj.parent = stack;
						stack = obj;
						obj = nxt;
					}
					while(stack != null) {
						let nxt = stack.parent;
						stack.parent = obj;
						stack = nxt;
					}
					yr = obj;
				}
				if(xr != yr) {
					if(xr.rank < yr.rank) {
						xr.parent = yr;
					} else if(xr.rank > yr.rank) {
						yr.parent = xr;
					} else {
						yr.parent = xr;
						xr.rank++;
					}
				}
			}
			let o = i;
			o.end = o.start = null;
			o.path0 = o.path1 = null;
			o.next = ZPP_CutInt.zpp_pool;
			ZPP_CutInt.zpp_pool = o;
			let o1 = j;
			o1.end = o1.start = null;
			o1.path0 = o1.path1 = null;
			o1.next = ZPP_CutInt.zpp_pool;
			ZPP_CutInt.zpp_pool = o1;
		}
		let ret2 = output == null ? new GeomPolyList() : output;
		let cx_ite = ZPP_Cutter.paths.head;
		while(cx_ite != null) {
			let p = cx_ite.elt;
			let poly;
			if(p == p.parent) {
				poly = p;
			} else {
				let obj = p;
				let stack = null;
				while(obj != obj.parent) {
					let nxt = obj.parent;
					obj.parent = stack;
					stack = obj;
					obj = nxt;
				}
				while(stack != null) {
					let nxt = stack.parent;
					stack.parent = obj;
					stack = nxt;
				}
				poly = obj;
			}
			if(poly.used) {
				cx_ite = cx_ite.next;
				continue;
			}
			poly.used = true;
			let p1 = poly.vert;
			let skip = true;
			while(poly.vert != null && (skip || p1 != poly.vert)) {
				skip = false;
				if(p1.x == p1.next.x && p1.y == p1.next.y) {
					if(p1 == poly.vert) {
						poly.vert = p1.next == p1 ? null : p1.next;
						skip = true;
					}
					if(p1 != null && p1.prev == p1) {
						p1.next = p1.prev = null;
						p1 = null;
					} else {
						let retnodes = p1.next;
						p1.prev.next = p1.next;
						p1.next.prev = p1.prev;
						p1.next = p1.prev = null;
						p1 = null;
						p1 = retnodes;
					}
				} else {
					p1 = p1.next;
				}
			}
			if(poly.vert != null) {
				let gp = GeomPoly.get();
				gp.zpp_inner.vertices = poly.vert;
				if(ret2.zpp_inner.reverse_flag) {
					ret2.push(gp);
				} else {
					ret2.unshift(gp);
				}
			}
			cx_ite = cx_ite.next;
		}
		while(ZPP_Cutter.paths.head != null) {
			let p = ZPP_Cutter.paths.pop_unsafe();
			let o = p;
			o.vert = null;
			o.parent = null;
			o.next = ZPP_CutVert.zpp_pool;
			ZPP_CutVert.zpp_pool = o;
		}
		while(verts != null) if(verts != null && verts.prev == verts) {
			verts.next = verts.prev = null;
			let o = verts;
			o.vert = null;
			o.parent = null;
			o.next = ZPP_CutVert.zpp_pool;
			ZPP_CutVert.zpp_pool = o;
			verts = null;
		} else {
			let retnodes = verts.next;
			verts.prev.next = verts.next;
			verts.next.prev = verts.prev;
			verts.next = verts.prev = null;
			let o = verts;
			o.vert = null;
			o.parent = null;
			o.next = ZPP_CutVert.zpp_pool;
			ZPP_CutVert.zpp_pool = o;
			verts = null;
			verts = retnodes;
		}
		return ret2;
	}
}
ZPP_Cutter.ints = null;
ZPP_Cutter.paths = null;
