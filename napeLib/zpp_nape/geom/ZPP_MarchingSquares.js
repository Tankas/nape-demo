import ZPP_PubPool from '../util/ZPP_PubPool.js';
import ZNPArray2_ZPP_MarchPair from '../util/ZNPArray2_ZPP_MarchPair.js';
import ZNPArray2_ZPP_GeomVert from '../util/ZNPArray2_ZPP_GeomVert.js';
import ZNPArray2_Float from '../util/ZNPArray2_Float.js';
import ZPP_Vec2 from './ZPP_Vec2.js';
import ZPP_MarchPair from './ZPP_MarchPair.js';
import ZPP_MarchSpan from './ZPP_MarchSpan.js';
import ZPP_GeomVert from './ZPP_GeomVert.js';
import GeomPoly from '../../nape/geom/GeomPoly.js';
import Config from '../../nape/Config.js';
export default class ZPP_MarchingSquares {
	constructor() {
	}
	output(ret,poly) {
		let tmp;
		if(poly == null || poly.next == poly || poly.next == poly.prev) {
			tmp = true;
		} else {
			let area = 0.0;
			let F = poly;
			let L = poly;
			if(F != null) {
				let nite = F;
				while(true) {
					let v = nite;
					area += v.x * (v.next.y - v.prev.y);
					nite = nite.next;
					if(!(nite != L)) {
						break;
					}
				}
			}
			let a = area * 0.5;
			tmp = a * a < Config.epsilon * Config.epsilon;
		}
		if(tmp) {
			while(poly != null) if(poly != null && poly.prev == poly) {
				poly.next = poly.prev = null;
				poly = null;
			} else {
				let retnodes = poly.next;
				poly.prev.next = poly.next;
				poly.next.prev = poly.prev;
				poly.next = poly.prev = null;
				poly = null;
				poly = retnodes;
			}
			return;
		}
		let gp = GeomPoly.get();
		gp.zpp_inner.vertices = poly;
		if(ret.zpp_inner.reverse_flag) {
			ret.push(gp);
		} else {
			ret.unshift(gp);
		}
	}
	linkright(poly,key) {
		let kind = key & 7;
		if(kind == 0) {
			return poly;
		} else if(kind == 3) {
			return poly.next.next;
		} else {
			return poly.next;
		}
	}
	linkleft(poly,key) {
		if((key & 1) == 0) {
			return poly.prev;
		} else {
			return poly;
		}
	}
	linkdown(poly,key) {
		if((key & 128) == 0) {
			return poly.prev;
		} else {
			return poly.prev.prev;
		}
	}
	linkup(poly,key) {
		return poly;
	}
	combLR(a,b) {
		let poly = a.pr;
		let kind = a.okeyr & 7;
		let ap = kind == 0 ? poly : kind == 3 ? poly.next.next : poly.next;
		let poly1 = b.p1;
		let bp = (b.okey1 & 1) == 0 ? poly1.prev : poly1;
		let ap2 = ap.next;
		let bp2 = bp.prev;
		if((a.keyr & 4) != 0) {
			if(b.pr == b.p1) {
				b.pr = ap.prev;
			}
			b.p1 = ap.prev;
			ap.prev.next = bp.next;
			bp.next.prev = ap.prev;
			let o = ap;
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
		} else {
			ap.next = bp.next;
			bp.next.prev = ap;
		}
		let o = bp;
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
		if((a.keyr & 16) != 0) {
			b.pd = ap2.next;
			ap2.next.prev = bp2.prev;
			bp2.prev.next = ap2.next;
			let o = ap2;
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
		} else {
			ap2.prev = bp2.prev;
			bp2.prev.next = ap2;
		}
		let o1 = bp2;
		if(o1.wrap != null) {
			o1.wrap.zpp_inner._inuse = false;
			let _this = o1.wrap;
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
			let o = _this;
			o.zpp_pool = null;
			if(ZPP_PubPool.nextVec2 != null) {
				ZPP_PubPool.nextVec2.zpp_pool = o;
			} else {
				ZPP_PubPool.poolVec2 = o;
			}
			ZPP_PubPool.nextVec2 = o;
			o.zpp_disp = true;
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
			o1.wrap = null;
		}
		o1.prev = o1.next = null;
		o1.next = ZPP_GeomVert.zpp_pool;
		ZPP_GeomVert.zpp_pool = o1;
	}
	combUD(a,b) {
		let ad = a.p2 != null && a.key2 == 56 ? a.p2 : a.p1;
		let bu = b.p2 != null && b.key2 == 14 ? b.p2 : b.p1;
		let ap = a.pd;
		let bp = bu;
		let ap2 = ap.prev;
		let bp2 = bp.next;
		bp.next = ap.next;
		ap.next.prev = bp;
		let o = ap;
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
		bp2.prev = ap2.prev;
		ap2.prev.next = bp2;
		if(ap2 == a.p1) {
			a.p1 = bp2;
		}
		let o1 = ap2;
		if(o1.wrap != null) {
			o1.wrap.zpp_inner._inuse = false;
			let _this = o1.wrap;
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
			let o = _this;
			o.zpp_pool = null;
			if(ZPP_PubPool.nextVec2 != null) {
				ZPP_PubPool.nextVec2.zpp_pool = o;
			} else {
				ZPP_PubPool.poolVec2 = o;
			}
			ZPP_PubPool.nextVec2 = o;
			o.zpp_disp = true;
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
			o1.wrap = null;
		}
		o1.prev = o1.next = null;
		o1.next = ZPP_GeomVert.zpp_pool;
		ZPP_GeomVert.zpp_pool = o1;
	}
	combUD_virtual(a,b) {
		let ad = a.p2 != null && a.key2 == 56 ? a.p2 : a.p1;
		let bu = b.p2 != null && b.key2 == 14 ? b.p2 : b.p1;
		let ap = a.pd;
		let bp = bu;
		let ap2 = ap.prev;
		let bp2 = bp.next;
		ap.forced = bp.forced = ap2.forced = bp2.forced = true;
	}
	combLeft(key) {
		let flag = key & 1 | (key & 192) >> 5;
		let cnt = 0;
		if((flag & 1) != 0) {
			++cnt;
		}
		if((flag & 2) != 0) {
			++cnt;
		}
		if((flag & 4) != 0) {
			++cnt;
		}
		return cnt >= 2;
	}
	combRight(key) {
		let flag = (key & 28) >> 2;
		let cnt = 0;
		if((flag & 1) != 0) {
			++cnt;
		}
		if((flag & 2) != 0) {
			++cnt;
		}
		if((flag & 4) != 0) {
			++cnt;
		}
		return cnt >= 2;
	}
	combUp(key) {
		let flag = key & 7;
		let cnt = 0;
		if((flag & 1) != 0) {
			++cnt;
		}
		if((flag & 2) != 0) {
			++cnt;
		}
		if((flag & 4) != 0) {
			++cnt;
		}
		return cnt >= 2;
	}
	combDown(key) {
		let flag = (key & 112) >> 4;
		let cnt = 0;
		if((flag & 1) != 0) {
			++cnt;
		}
		if((flag & 2) != 0) {
			++cnt;
		}
		if((flag & 4) != 0) {
			++cnt;
		}
		return cnt >= 2;
	}
	comb(flag) {
		let cnt = 0;
		if((flag & 1) != 0) {
			++cnt;
		}
		if((flag & 2) != 0) {
			++cnt;
		}
		if((flag & 4) != 0) {
			++cnt;
		}
		return cnt >= 2;
	}
	marchSquare(iso,isos,ints,x0,y0,x1,y1,xn,yn,fstx,fsty,sndx,sndy,quality) {
		let key = 0;
		let v0 = isos.list[yn * isos.width + xn];
		if(v0 < 0) {
			key |= 8;
		}
		let v1 = isos.list[yn * isos.width + (xn + 1)];
		if(v1 < 0) {
			key |= 4;
		}
		let v2 = isos.list[(yn + 1) * isos.width + (xn + 1)];
		if(v2 < 0) {
			key |= 2;
		}
		let v3 = isos.list[(yn + 1) * isos.width + xn];
		if(v3 < 0) {
			key |= 1;
		}
		if(key == 0) {
			return null;
		} else {
			let ret;
			if(ZPP_MarchPair.zpp_pool == null) {
				ret = new ZPP_MarchPair();
			} else {
				ret = ZPP_MarchPair.zpp_pool;
				ZPP_MarchPair.zpp_pool = ret.next;
				ret.next = null;
			}
			if(key != 10 && key != 5) {
				let val = ZPP_MarchingSquares.look_march[key];
				ret.okey1 = val;
				let _g = 0;
				while(_g < 8) {
					let i = _g++;
					if((val & 1 << i) != 0) {
						let p = null;
						if(i == 0) {
							let ret;
							if(ZPP_GeomVert.zpp_pool == null) {
								ret = new ZPP_GeomVert();
							} else {
								ret = ZPP_GeomVert.zpp_pool;
								ZPP_GeomVert.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.forced = false;
							ret.x = x0;
							ret.y = y0;
							p = ret;
							if(fstx || fsty) {
								p.forced = true;
							}
						} else if(i == 2) {
							let ret;
							if(ZPP_GeomVert.zpp_pool == null) {
								ret = new ZPP_GeomVert();
							} else {
								ret = ZPP_GeomVert.zpp_pool;
								ZPP_GeomVert.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.forced = false;
							ret.x = x1;
							ret.y = y0;
							p = ret;
							if(sndx || fsty) {
								p.forced = true;
							}
						} else if(i == 4) {
							let ret;
							if(ZPP_GeomVert.zpp_pool == null) {
								ret = new ZPP_GeomVert();
							} else {
								ret = ZPP_GeomVert.zpp_pool;
								ZPP_GeomVert.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.forced = false;
							ret.x = x1;
							ret.y = y1;
							p = ret;
							if(sndx || sndy) {
								p.forced = true;
							}
						} else if(i == 6) {
							let ret;
							if(ZPP_GeomVert.zpp_pool == null) {
								ret = new ZPP_GeomVert();
							} else {
								ret = ZPP_GeomVert.zpp_pool;
								ZPP_GeomVert.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.forced = false;
							ret.x = x0;
							ret.y = y1;
							p = ret;
							if(fstx || sndy) {
								p.forced = true;
							}
						} else if(i == 1) {
							p = ints.list[(yn << 1) * ints.width + xn];
							if(p == null) {
								let x = this.xlerp(x0,x1,y0,v0,v1,iso,quality);
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
								ret.y = y0;
								p = ret;
								ints.list[(yn << 1) * ints.width + xn] = p;
							} else {
								let x = p.x;
								let y = p.y;
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
								p = ret;
							}
							if(fsty) {
								p.forced = true;
							}
							if(p.x == x0 || p.x == x1) {
								if(p.x == x0 && (val & 1) != 0 || p.x == x1 && (val & 4) != 0) {
									val ^= 2;
								}
							}
						} else if(i == 5) {
							p = ints.list[((yn << 1) + 2) * ints.width + xn];
							if(p == null) {
								let x = this.xlerp(x0,x1,y1,v3,v2,iso,quality);
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
								ret.y = y1;
								p = ret;
								ints.list[((yn << 1) + 2) * ints.width + xn] = p;
							} else {
								let x = p.x;
								let y = p.y;
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
								p = ret;
							}
							if(sndy) {
								p.forced = true;
							}
							if(p.x == x0 || p.x == x1) {
								if(p.x == x0 && (val & 64) != 0 || p.x == x1 && (val & 16) != 0) {
									val ^= 32;
								}
							}
						} else if(i == 3) {
							p = ints.list[((yn << 1) + 1) * ints.width + (xn + 1)];
							if(p == null) {
								let y = this.ylerp(y0,y1,x1,v1,v2,iso,quality);
								let ret;
								if(ZPP_GeomVert.zpp_pool == null) {
									ret = new ZPP_GeomVert();
								} else {
									ret = ZPP_GeomVert.zpp_pool;
									ZPP_GeomVert.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.forced = false;
								ret.x = x1;
								ret.y = y;
								p = ret;
								ints.list[((yn << 1) + 1) * ints.width + (xn + 1)] = p;
							} else {
								let x = p.x;
								let y = p.y;
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
								p = ret;
							}
							if(sndx) {
								p.forced = true;
							}
							if(p.y == y0 || p.y == y1) {
								if(p.y == y0 && (val & 4) != 0 || p.y == y1 && (val & 16) != 0) {
									val ^= 8;
								}
							}
						} else {
							p = ints.list[((yn << 1) + 1) * ints.width + xn];
							if(p == null) {
								let y = this.ylerp(y0,y1,x0,v0,v3,iso,quality);
								let ret;
								if(ZPP_GeomVert.zpp_pool == null) {
									ret = new ZPP_GeomVert();
								} else {
									ret = ZPP_GeomVert.zpp_pool;
									ZPP_GeomVert.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.forced = false;
								ret.x = x0;
								ret.y = y;
								p = ret;
								ints.list[((yn << 1) + 1) * ints.width + xn] = p;
							} else {
								let x = p.x;
								let y = p.y;
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
								p = ret;
							}
							if(fstx) {
								p.forced = true;
							}
							if(p.y == y0 || p.y == y1) {
								if(p.y == y0 && (val & 1) != 0 || p.y == y1 && (val & 64) != 0) {
									val ^= 128;
								}
							}
						}
						let obj = p;
						if(ret.p1 == null) {
							ret.p1 = obj.prev = obj.next = obj;
						} else {
							obj.prev = ret.p1;
							obj.next = ret.p1.next;
							ret.p1.next.prev = obj;
							ret.p1.next = obj;
						}
						ret.p1 = obj;
					}
				}
				ret.p1 = ret.p1.next;
				ret.key1 = val;
				if(val == 1 || val == 4 || val == 16 || val == 64 || val == 3 || val == 12 || val == 48 || val == 192 || val == 129 || val == 6 || val == 24 || val == 96 || val == 5 || val == 20 || val == 80 || val == 65 || val == 17 || val == 68) {
					val = 0;
					ret.key1 = 0;
					ret.p1 = null;
				}
				if(val == 0) {
					ret = null;
				} else {
					ret.pr = ret.p1;
					ret.okeyr = ret.okey1;
					ret.keyr = ret.key1;
				}
			} else {
				let mid = iso(0.5 * (x0 + x1),0.5 * (y0 + y1)) < 0;
				if(key == 10) {
					if(mid) {
						let val = 187;
						ret.okey1 = val;
						let _g = 0;
						while(_g < 8) {
							let i = _g++;
							if((val & 1 << i) != 0) {
								let p = null;
								if(i == 0) {
									let ret;
									if(ZPP_GeomVert.zpp_pool == null) {
										ret = new ZPP_GeomVert();
									} else {
										ret = ZPP_GeomVert.zpp_pool;
										ZPP_GeomVert.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.forced = false;
									ret.x = x0;
									ret.y = y0;
									p = ret;
									if(fstx || fsty) {
										p.forced = true;
									}
								} else if(i == 2) {
									let ret;
									if(ZPP_GeomVert.zpp_pool == null) {
										ret = new ZPP_GeomVert();
									} else {
										ret = ZPP_GeomVert.zpp_pool;
										ZPP_GeomVert.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.forced = false;
									ret.x = x1;
									ret.y = y0;
									p = ret;
									if(sndx || fsty) {
										p.forced = true;
									}
								} else if(i == 4) {
									let ret;
									if(ZPP_GeomVert.zpp_pool == null) {
										ret = new ZPP_GeomVert();
									} else {
										ret = ZPP_GeomVert.zpp_pool;
										ZPP_GeomVert.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.forced = false;
									ret.x = x1;
									ret.y = y1;
									p = ret;
									if(sndx || sndy) {
										p.forced = true;
									}
								} else if(i == 6) {
									let ret;
									if(ZPP_GeomVert.zpp_pool == null) {
										ret = new ZPP_GeomVert();
									} else {
										ret = ZPP_GeomVert.zpp_pool;
										ZPP_GeomVert.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.forced = false;
									ret.x = x0;
									ret.y = y1;
									p = ret;
									if(fstx || sndy) {
										p.forced = true;
									}
								} else if(i == 1) {
									p = ints.list[(yn << 1) * ints.width + xn];
									if(p == null) {
										let x = this.xlerp(x0,x1,y0,v0,v1,iso,quality);
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
										ret.y = y0;
										p = ret;
										ints.list[(yn << 1) * ints.width + xn] = p;
									} else {
										let x = p.x;
										let y = p.y;
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
										p = ret;
									}
									if(fsty) {
										p.forced = true;
									}
									if(p.x == x0 || p.x == x1) {
										if(p.x == x0 && (val & 1) != 0 || p.x == x1 && (val & 4) != 0) {
											val ^= 2;
										}
									}
								} else if(i == 5) {
									p = ints.list[((yn << 1) + 2) * ints.width + xn];
									if(p == null) {
										let x = this.xlerp(x0,x1,y1,v3,v2,iso,quality);
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
										ret.y = y1;
										p = ret;
										ints.list[((yn << 1) + 2) * ints.width + xn] = p;
									} else {
										let x = p.x;
										let y = p.y;
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
										p = ret;
									}
									if(sndy) {
										p.forced = true;
									}
									if(p.x == x0 || p.x == x1) {
										if(p.x == x0 && (val & 64) != 0 || p.x == x1 && (val & 16) != 0) {
											val ^= 32;
										}
									}
								} else if(i == 3) {
									p = ints.list[((yn << 1) + 1) * ints.width + (xn + 1)];
									if(p == null) {
										let y = this.ylerp(y0,y1,x1,v1,v2,iso,quality);
										let ret;
										if(ZPP_GeomVert.zpp_pool == null) {
											ret = new ZPP_GeomVert();
										} else {
											ret = ZPP_GeomVert.zpp_pool;
											ZPP_GeomVert.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.forced = false;
										ret.x = x1;
										ret.y = y;
										p = ret;
										ints.list[((yn << 1) + 1) * ints.width + (xn + 1)] = p;
									} else {
										let x = p.x;
										let y = p.y;
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
										p = ret;
									}
									if(sndx) {
										p.forced = true;
									}
									if(p.y == y0 || p.y == y1) {
										if(p.y == y0 && (val & 4) != 0 || p.y == y1 && (val & 16) != 0) {
											val ^= 8;
										}
									}
								} else {
									p = ints.list[((yn << 1) + 1) * ints.width + xn];
									if(p == null) {
										let y = this.ylerp(y0,y1,x0,v0,v3,iso,quality);
										let ret;
										if(ZPP_GeomVert.zpp_pool == null) {
											ret = new ZPP_GeomVert();
										} else {
											ret = ZPP_GeomVert.zpp_pool;
											ZPP_GeomVert.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.forced = false;
										ret.x = x0;
										ret.y = y;
										p = ret;
										ints.list[((yn << 1) + 1) * ints.width + xn] = p;
									} else {
										let x = p.x;
										let y = p.y;
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
										p = ret;
									}
									if(fstx) {
										p.forced = true;
									}
									if(p.y == y0 || p.y == y1) {
										if(p.y == y0 && (val & 1) != 0 || p.y == y1 && (val & 64) != 0) {
											val ^= 128;
										}
									}
								}
								let obj = p;
								if(ret.p1 == null) {
									ret.p1 = obj.prev = obj.next = obj;
								} else {
									obj.prev = ret.p1;
									obj.next = ret.p1.next;
									ret.p1.next.prev = obj;
									ret.p1.next = obj;
								}
								ret.p1 = obj;
							}
						}
						ret.p1 = ret.p1.next;
						ret.key1 = val;
						if(val == 1 || val == 4 || val == 16 || val == 64 || val == 3 || val == 12 || val == 48 || val == 192 || val == 129 || val == 6 || val == 24 || val == 96 || val == 5 || val == 20 || val == 80 || val == 65 || val == 17 || val == 68) {
							val = 0;
							ret.key1 = 0;
							ret.p1 = null;
						}
						if(val == 0) {
							ret = null;
						} else {
							ret.pr = ret.p1;
							ret.okeyr = ret.okey1;
							ret.keyr = ret.key1;
						}
					} else {
						let val = 131;
						ret.okey1 = val;
						let _g = 0;
						while(_g < 8) {
							let i = _g++;
							if((val & 1 << i) != 0) {
								let p = null;
								if(i == 0) {
									let ret;
									if(ZPP_GeomVert.zpp_pool == null) {
										ret = new ZPP_GeomVert();
									} else {
										ret = ZPP_GeomVert.zpp_pool;
										ZPP_GeomVert.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.forced = false;
									ret.x = x0;
									ret.y = y0;
									p = ret;
									if(fstx || fsty) {
										p.forced = true;
									}
								} else if(i == 2) {
									let ret;
									if(ZPP_GeomVert.zpp_pool == null) {
										ret = new ZPP_GeomVert();
									} else {
										ret = ZPP_GeomVert.zpp_pool;
										ZPP_GeomVert.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.forced = false;
									ret.x = x1;
									ret.y = y0;
									p = ret;
									if(sndx || fsty) {
										p.forced = true;
									}
								} else if(i == 4) {
									let ret;
									if(ZPP_GeomVert.zpp_pool == null) {
										ret = new ZPP_GeomVert();
									} else {
										ret = ZPP_GeomVert.zpp_pool;
										ZPP_GeomVert.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.forced = false;
									ret.x = x1;
									ret.y = y1;
									p = ret;
									if(sndx || sndy) {
										p.forced = true;
									}
								} else if(i == 6) {
									let ret;
									if(ZPP_GeomVert.zpp_pool == null) {
										ret = new ZPP_GeomVert();
									} else {
										ret = ZPP_GeomVert.zpp_pool;
										ZPP_GeomVert.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.forced = false;
									ret.x = x0;
									ret.y = y1;
									p = ret;
									if(fstx || sndy) {
										p.forced = true;
									}
								} else if(i == 1) {
									p = ints.list[(yn << 1) * ints.width + xn];
									if(p == null) {
										let x = this.xlerp(x0,x1,y0,v0,v1,iso,quality);
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
										ret.y = y0;
										p = ret;
										ints.list[(yn << 1) * ints.width + xn] = p;
									} else {
										let x = p.x;
										let y = p.y;
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
										p = ret;
									}
									if(fsty) {
										p.forced = true;
									}
									if(p.x == x0 || p.x == x1) {
										if(p.x == x0 && (val & 1) != 0 || p.x == x1 && (val & 4) != 0) {
											val ^= 2;
										}
									}
								} else if(i == 5) {
									p = ints.list[((yn << 1) + 2) * ints.width + xn];
									if(p == null) {
										let x = this.xlerp(x0,x1,y1,v3,v2,iso,quality);
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
										ret.y = y1;
										p = ret;
										ints.list[((yn << 1) + 2) * ints.width + xn] = p;
									} else {
										let x = p.x;
										let y = p.y;
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
										p = ret;
									}
									if(sndy) {
										p.forced = true;
									}
									if(p.x == x0 || p.x == x1) {
										if(p.x == x0 && (val & 64) != 0 || p.x == x1 && (val & 16) != 0) {
											val ^= 32;
										}
									}
								} else if(i == 3) {
									p = ints.list[((yn << 1) + 1) * ints.width + (xn + 1)];
									if(p == null) {
										let y = this.ylerp(y0,y1,x1,v1,v2,iso,quality);
										let ret;
										if(ZPP_GeomVert.zpp_pool == null) {
											ret = new ZPP_GeomVert();
										} else {
											ret = ZPP_GeomVert.zpp_pool;
											ZPP_GeomVert.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.forced = false;
										ret.x = x1;
										ret.y = y;
										p = ret;
										ints.list[((yn << 1) + 1) * ints.width + (xn + 1)] = p;
									} else {
										let x = p.x;
										let y = p.y;
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
										p = ret;
									}
									if(sndx) {
										p.forced = true;
									}
									if(p.y == y0 || p.y == y1) {
										if(p.y == y0 && (val & 4) != 0 || p.y == y1 && (val & 16) != 0) {
											val ^= 8;
										}
									}
								} else {
									p = ints.list[((yn << 1) + 1) * ints.width + xn];
									if(p == null) {
										let y = this.ylerp(y0,y1,x0,v0,v3,iso,quality);
										let ret;
										if(ZPP_GeomVert.zpp_pool == null) {
											ret = new ZPP_GeomVert();
										} else {
											ret = ZPP_GeomVert.zpp_pool;
											ZPP_GeomVert.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.forced = false;
										ret.x = x0;
										ret.y = y;
										p = ret;
										ints.list[((yn << 1) + 1) * ints.width + xn] = p;
									} else {
										let x = p.x;
										let y = p.y;
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
										p = ret;
									}
									if(fstx) {
										p.forced = true;
									}
									if(p.y == y0 || p.y == y1) {
										if(p.y == y0 && (val & 1) != 0 || p.y == y1 && (val & 64) != 0) {
											val ^= 128;
										}
									}
								}
								let obj = p;
								if(ret.p1 == null) {
									ret.p1 = obj.prev = obj.next = obj;
								} else {
									obj.prev = ret.p1;
									obj.next = ret.p1.next;
									ret.p1.next.prev = obj;
									ret.p1.next = obj;
								}
								ret.p1 = obj;
							}
						}
						ret.p1 = ret.p1.next;
						ret.key1 = val;
						if(val == 1 || val == 4 || val == 16 || val == 64 || val == 3 || val == 12 || val == 48 || val == 192 || val == 129 || val == 6 || val == 24 || val == 96 || val == 5 || val == 20 || val == 80 || val == 65 || val == 17 || val == 68) {
							val = 0;
							ret.key1 = 0;
							ret.p1 = null;
						}
						if(val != 0) {
							let val = 56;
							ret.okey2 = val;
							let _g = 0;
							while(_g < 8) {
								let i = _g++;
								if((val & 1 << i) != 0) {
									let p = null;
									if(i == 0) {
										let ret;
										if(ZPP_GeomVert.zpp_pool == null) {
											ret = new ZPP_GeomVert();
										} else {
											ret = ZPP_GeomVert.zpp_pool;
											ZPP_GeomVert.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.forced = false;
										ret.x = x0;
										ret.y = y0;
										p = ret;
										if(fstx || fsty) {
											p.forced = true;
										}
									} else if(i == 2) {
										let ret;
										if(ZPP_GeomVert.zpp_pool == null) {
											ret = new ZPP_GeomVert();
										} else {
											ret = ZPP_GeomVert.zpp_pool;
											ZPP_GeomVert.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.forced = false;
										ret.x = x1;
										ret.y = y0;
										p = ret;
										if(sndx || fsty) {
											p.forced = true;
										}
									} else if(i == 4) {
										let ret;
										if(ZPP_GeomVert.zpp_pool == null) {
											ret = new ZPP_GeomVert();
										} else {
											ret = ZPP_GeomVert.zpp_pool;
											ZPP_GeomVert.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.forced = false;
										ret.x = x1;
										ret.y = y1;
										p = ret;
										if(sndx || sndy) {
											p.forced = true;
										}
									} else if(i == 6) {
										let ret;
										if(ZPP_GeomVert.zpp_pool == null) {
											ret = new ZPP_GeomVert();
										} else {
											ret = ZPP_GeomVert.zpp_pool;
											ZPP_GeomVert.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.forced = false;
										ret.x = x0;
										ret.y = y1;
										p = ret;
										if(fstx || sndy) {
											p.forced = true;
										}
									} else if(i == 1) {
										p = ints.list[(yn << 1) * ints.width + xn];
										if(p == null) {
											let x = this.xlerp(x0,x1,y0,v0,v1,iso,quality);
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
											ret.y = y0;
											p = ret;
											ints.list[(yn << 1) * ints.width + xn] = p;
										} else {
											let x = p.x;
											let y = p.y;
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
											p = ret;
										}
										if(fsty) {
											p.forced = true;
										}
										if(p.x == x0 || p.x == x1) {
											if(p.x == x0 && (val & 1) != 0 || p.x == x1 && (val & 4) != 0) {
												val ^= 2;
											}
										}
									} else if(i == 5) {
										p = ints.list[((yn << 1) + 2) * ints.width + xn];
										if(p == null) {
											let x = this.xlerp(x0,x1,y1,v3,v2,iso,quality);
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
											ret.y = y1;
											p = ret;
											ints.list[((yn << 1) + 2) * ints.width + xn] = p;
										} else {
											let x = p.x;
											let y = p.y;
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
											p = ret;
										}
										if(sndy) {
											p.forced = true;
										}
										if(p.x == x0 || p.x == x1) {
											if(p.x == x0 && (val & 64) != 0 || p.x == x1 && (val & 16) != 0) {
												val ^= 32;
											}
										}
									} else if(i == 3) {
										p = ints.list[((yn << 1) + 1) * ints.width + (xn + 1)];
										if(p == null) {
											let y = this.ylerp(y0,y1,x1,v1,v2,iso,quality);
											let ret;
											if(ZPP_GeomVert.zpp_pool == null) {
												ret = new ZPP_GeomVert();
											} else {
												ret = ZPP_GeomVert.zpp_pool;
												ZPP_GeomVert.zpp_pool = ret.next;
												ret.next = null;
											}
											ret.forced = false;
											ret.x = x1;
											ret.y = y;
											p = ret;
											ints.list[((yn << 1) + 1) * ints.width + (xn + 1)] = p;
										} else {
											let x = p.x;
											let y = p.y;
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
											p = ret;
										}
										if(sndx) {
											p.forced = true;
										}
										if(p.y == y0 || p.y == y1) {
											if(p.y == y0 && (val & 4) != 0 || p.y == y1 && (val & 16) != 0) {
												val ^= 8;
											}
										}
									} else {
										p = ints.list[((yn << 1) + 1) * ints.width + xn];
										if(p == null) {
											let y = this.ylerp(y0,y1,x0,v0,v3,iso,quality);
											let ret;
											if(ZPP_GeomVert.zpp_pool == null) {
												ret = new ZPP_GeomVert();
											} else {
												ret = ZPP_GeomVert.zpp_pool;
												ZPP_GeomVert.zpp_pool = ret.next;
												ret.next = null;
											}
											ret.forced = false;
											ret.x = x0;
											ret.y = y;
											p = ret;
											ints.list[((yn << 1) + 1) * ints.width + xn] = p;
										} else {
											let x = p.x;
											let y = p.y;
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
											p = ret;
										}
										if(fstx) {
											p.forced = true;
										}
										if(p.y == y0 || p.y == y1) {
											if(p.y == y0 && (val & 1) != 0 || p.y == y1 && (val & 64) != 0) {
												val ^= 128;
											}
										}
									}
									let obj = p;
									if(ret.p2 == null) {
										ret.p2 = obj.prev = obj.next = obj;
									} else {
										obj.prev = ret.p2;
										obj.next = ret.p2.next;
										ret.p2.next.prev = obj;
										ret.p2.next = obj;
									}
									ret.p2 = obj;
								}
							}
							ret.p2 = ret.p2.next;
							ret.key2 = val;
							if(val == 1 || val == 4 || val == 16 || val == 64 || val == 3 || val == 12 || val == 48 || val == 192 || val == 129 || val == 6 || val == 24 || val == 96 || val == 5 || val == 20 || val == 80 || val == 65 || val == 17 || val == 68) {
								val = 0;
								ret.key2 = 0;
								ret.p2 = null;
							}
							if(val == 0) {
								ret.pr = ret.p1;
								ret.okeyr = ret.okey1;
								ret.keyr = ret.key1;
							} else {
								ret.pr = ret.p2;
								ret.okeyr = ret.okey2;
								ret.keyr = ret.key2;
							}
						} else {
							let val = 56;
							ret.okey1 = val;
							let _g = 0;
							while(_g < 8) {
								let i = _g++;
								if((val & 1 << i) != 0) {
									let p = null;
									if(i == 0) {
										let ret;
										if(ZPP_GeomVert.zpp_pool == null) {
											ret = new ZPP_GeomVert();
										} else {
											ret = ZPP_GeomVert.zpp_pool;
											ZPP_GeomVert.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.forced = false;
										ret.x = x0;
										ret.y = y0;
										p = ret;
										if(fstx || fsty) {
											p.forced = true;
										}
									} else if(i == 2) {
										let ret;
										if(ZPP_GeomVert.zpp_pool == null) {
											ret = new ZPP_GeomVert();
										} else {
											ret = ZPP_GeomVert.zpp_pool;
											ZPP_GeomVert.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.forced = false;
										ret.x = x1;
										ret.y = y0;
										p = ret;
										if(sndx || fsty) {
											p.forced = true;
										}
									} else if(i == 4) {
										let ret;
										if(ZPP_GeomVert.zpp_pool == null) {
											ret = new ZPP_GeomVert();
										} else {
											ret = ZPP_GeomVert.zpp_pool;
											ZPP_GeomVert.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.forced = false;
										ret.x = x1;
										ret.y = y1;
										p = ret;
										if(sndx || sndy) {
											p.forced = true;
										}
									} else if(i == 6) {
										let ret;
										if(ZPP_GeomVert.zpp_pool == null) {
											ret = new ZPP_GeomVert();
										} else {
											ret = ZPP_GeomVert.zpp_pool;
											ZPP_GeomVert.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.forced = false;
										ret.x = x0;
										ret.y = y1;
										p = ret;
										if(fstx || sndy) {
											p.forced = true;
										}
									} else if(i == 1) {
										p = ints.list[(yn << 1) * ints.width + xn];
										if(p == null) {
											let x = this.xlerp(x0,x1,y0,v0,v1,iso,quality);
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
											ret.y = y0;
											p = ret;
											ints.list[(yn << 1) * ints.width + xn] = p;
										} else {
											let x = p.x;
											let y = p.y;
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
											p = ret;
										}
										if(fsty) {
											p.forced = true;
										}
										if(p.x == x0 || p.x == x1) {
											if(p.x == x0 && (val & 1) != 0 || p.x == x1 && (val & 4) != 0) {
												val ^= 2;
											}
										}
									} else if(i == 5) {
										p = ints.list[((yn << 1) + 2) * ints.width + xn];
										if(p == null) {
											let x = this.xlerp(x0,x1,y1,v3,v2,iso,quality);
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
											ret.y = y1;
											p = ret;
											ints.list[((yn << 1) + 2) * ints.width + xn] = p;
										} else {
											let x = p.x;
											let y = p.y;
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
											p = ret;
										}
										if(sndy) {
											p.forced = true;
										}
										if(p.x == x0 || p.x == x1) {
											if(p.x == x0 && (val & 64) != 0 || p.x == x1 && (val & 16) != 0) {
												val ^= 32;
											}
										}
									} else if(i == 3) {
										p = ints.list[((yn << 1) + 1) * ints.width + (xn + 1)];
										if(p == null) {
											let y = this.ylerp(y0,y1,x1,v1,v2,iso,quality);
											let ret;
											if(ZPP_GeomVert.zpp_pool == null) {
												ret = new ZPP_GeomVert();
											} else {
												ret = ZPP_GeomVert.zpp_pool;
												ZPP_GeomVert.zpp_pool = ret.next;
												ret.next = null;
											}
											ret.forced = false;
											ret.x = x1;
											ret.y = y;
											p = ret;
											ints.list[((yn << 1) + 1) * ints.width + (xn + 1)] = p;
										} else {
											let x = p.x;
											let y = p.y;
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
											p = ret;
										}
										if(sndx) {
											p.forced = true;
										}
										if(p.y == y0 || p.y == y1) {
											if(p.y == y0 && (val & 4) != 0 || p.y == y1 && (val & 16) != 0) {
												val ^= 8;
											}
										}
									} else {
										p = ints.list[((yn << 1) + 1) * ints.width + xn];
										if(p == null) {
											let y = this.ylerp(y0,y1,x0,v0,v3,iso,quality);
											let ret;
											if(ZPP_GeomVert.zpp_pool == null) {
												ret = new ZPP_GeomVert();
											} else {
												ret = ZPP_GeomVert.zpp_pool;
												ZPP_GeomVert.zpp_pool = ret.next;
												ret.next = null;
											}
											ret.forced = false;
											ret.x = x0;
											ret.y = y;
											p = ret;
											ints.list[((yn << 1) + 1) * ints.width + xn] = p;
										} else {
											let x = p.x;
											let y = p.y;
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
											p = ret;
										}
										if(fstx) {
											p.forced = true;
										}
										if(p.y == y0 || p.y == y1) {
											if(p.y == y0 && (val & 1) != 0 || p.y == y1 && (val & 64) != 0) {
												val ^= 128;
											}
										}
									}
									let obj = p;
									if(ret.p1 == null) {
										ret.p1 = obj.prev = obj.next = obj;
									} else {
										obj.prev = ret.p1;
										obj.next = ret.p1.next;
										ret.p1.next.prev = obj;
										ret.p1.next = obj;
									}
									ret.p1 = obj;
								}
							}
							ret.p1 = ret.p1.next;
							ret.key1 = val;
							if(val == 1 || val == 4 || val == 16 || val == 64 || val == 3 || val == 12 || val == 48 || val == 192 || val == 129 || val == 6 || val == 24 || val == 96 || val == 5 || val == 20 || val == 80 || val == 65 || val == 17 || val == 68) {
								val = 0;
								ret.key1 = 0;
								ret.p1 = null;
							}
							if(val == 0) {
								ret = null;
							} else {
								ret.pr = ret.p1;
								ret.okeyr = ret.okey1;
								ret.keyr = ret.key1;
							}
						}
					}
				} else if(mid) {
					let val = 238;
					ret.okey1 = val;
					let _g = 0;
					while(_g < 8) {
						let i = _g++;
						if((val & 1 << i) != 0) {
							let p = null;
							if(i == 0) {
								let ret;
								if(ZPP_GeomVert.zpp_pool == null) {
									ret = new ZPP_GeomVert();
								} else {
									ret = ZPP_GeomVert.zpp_pool;
									ZPP_GeomVert.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.forced = false;
								ret.x = x0;
								ret.y = y0;
								p = ret;
								if(fstx || fsty) {
									p.forced = true;
								}
							} else if(i == 2) {
								let ret;
								if(ZPP_GeomVert.zpp_pool == null) {
									ret = new ZPP_GeomVert();
								} else {
									ret = ZPP_GeomVert.zpp_pool;
									ZPP_GeomVert.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.forced = false;
								ret.x = x1;
								ret.y = y0;
								p = ret;
								if(sndx || fsty) {
									p.forced = true;
								}
							} else if(i == 4) {
								let ret;
								if(ZPP_GeomVert.zpp_pool == null) {
									ret = new ZPP_GeomVert();
								} else {
									ret = ZPP_GeomVert.zpp_pool;
									ZPP_GeomVert.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.forced = false;
								ret.x = x1;
								ret.y = y1;
								p = ret;
								if(sndx || sndy) {
									p.forced = true;
								}
							} else if(i == 6) {
								let ret;
								if(ZPP_GeomVert.zpp_pool == null) {
									ret = new ZPP_GeomVert();
								} else {
									ret = ZPP_GeomVert.zpp_pool;
									ZPP_GeomVert.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.forced = false;
								ret.x = x0;
								ret.y = y1;
								p = ret;
								if(fstx || sndy) {
									p.forced = true;
								}
							} else if(i == 1) {
								p = ints.list[(yn << 1) * ints.width + xn];
								if(p == null) {
									let x = this.xlerp(x0,x1,y0,v0,v1,iso,quality);
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
									ret.y = y0;
									p = ret;
									ints.list[(yn << 1) * ints.width + xn] = p;
								} else {
									let x = p.x;
									let y = p.y;
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
									p = ret;
								}
								if(fsty) {
									p.forced = true;
								}
								if(p.x == x0 || p.x == x1) {
									if(p.x == x0 && (val & 1) != 0 || p.x == x1 && (val & 4) != 0) {
										val ^= 2;
									}
								}
							} else if(i == 5) {
								p = ints.list[((yn << 1) + 2) * ints.width + xn];
								if(p == null) {
									let x = this.xlerp(x0,x1,y1,v3,v2,iso,quality);
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
									ret.y = y1;
									p = ret;
									ints.list[((yn << 1) + 2) * ints.width + xn] = p;
								} else {
									let x = p.x;
									let y = p.y;
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
									p = ret;
								}
								if(sndy) {
									p.forced = true;
								}
								if(p.x == x0 || p.x == x1) {
									if(p.x == x0 && (val & 64) != 0 || p.x == x1 && (val & 16) != 0) {
										val ^= 32;
									}
								}
							} else if(i == 3) {
								p = ints.list[((yn << 1) + 1) * ints.width + (xn + 1)];
								if(p == null) {
									let y = this.ylerp(y0,y1,x1,v1,v2,iso,quality);
									let ret;
									if(ZPP_GeomVert.zpp_pool == null) {
										ret = new ZPP_GeomVert();
									} else {
										ret = ZPP_GeomVert.zpp_pool;
										ZPP_GeomVert.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.forced = false;
									ret.x = x1;
									ret.y = y;
									p = ret;
									ints.list[((yn << 1) + 1) * ints.width + (xn + 1)] = p;
								} else {
									let x = p.x;
									let y = p.y;
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
									p = ret;
								}
								if(sndx) {
									p.forced = true;
								}
								if(p.y == y0 || p.y == y1) {
									if(p.y == y0 && (val & 4) != 0 || p.y == y1 && (val & 16) != 0) {
										val ^= 8;
									}
								}
							} else {
								p = ints.list[((yn << 1) + 1) * ints.width + xn];
								if(p == null) {
									let y = this.ylerp(y0,y1,x0,v0,v3,iso,quality);
									let ret;
									if(ZPP_GeomVert.zpp_pool == null) {
										ret = new ZPP_GeomVert();
									} else {
										ret = ZPP_GeomVert.zpp_pool;
										ZPP_GeomVert.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.forced = false;
									ret.x = x0;
									ret.y = y;
									p = ret;
									ints.list[((yn << 1) + 1) * ints.width + xn] = p;
								} else {
									let x = p.x;
									let y = p.y;
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
									p = ret;
								}
								if(fstx) {
									p.forced = true;
								}
								if(p.y == y0 || p.y == y1) {
									if(p.y == y0 && (val & 1) != 0 || p.y == y1 && (val & 64) != 0) {
										val ^= 128;
									}
								}
							}
							let obj = p;
							if(ret.p1 == null) {
								ret.p1 = obj.prev = obj.next = obj;
							} else {
								obj.prev = ret.p1;
								obj.next = ret.p1.next;
								ret.p1.next.prev = obj;
								ret.p1.next = obj;
							}
							ret.p1 = obj;
						}
					}
					ret.p1 = ret.p1.next;
					ret.key1 = val;
					if(val == 1 || val == 4 || val == 16 || val == 64 || val == 3 || val == 12 || val == 48 || val == 192 || val == 129 || val == 6 || val == 24 || val == 96 || val == 5 || val == 20 || val == 80 || val == 65 || val == 17 || val == 68) {
						val = 0;
						ret.key1 = 0;
						ret.p1 = null;
					}
					if(val == 0) {
						ret = null;
					} else {
						ret.pr = ret.p1;
						ret.okeyr = ret.okey1;
						ret.keyr = ret.key1;
					}
				} else {
					let val = 224;
					ret.okey1 = val;
					let _g = 0;
					while(_g < 8) {
						let i = _g++;
						if((val & 1 << i) != 0) {
							let p = null;
							if(i == 0) {
								let ret;
								if(ZPP_GeomVert.zpp_pool == null) {
									ret = new ZPP_GeomVert();
								} else {
									ret = ZPP_GeomVert.zpp_pool;
									ZPP_GeomVert.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.forced = false;
								ret.x = x0;
								ret.y = y0;
								p = ret;
								if(fstx || fsty) {
									p.forced = true;
								}
							} else if(i == 2) {
								let ret;
								if(ZPP_GeomVert.zpp_pool == null) {
									ret = new ZPP_GeomVert();
								} else {
									ret = ZPP_GeomVert.zpp_pool;
									ZPP_GeomVert.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.forced = false;
								ret.x = x1;
								ret.y = y0;
								p = ret;
								if(sndx || fsty) {
									p.forced = true;
								}
							} else if(i == 4) {
								let ret;
								if(ZPP_GeomVert.zpp_pool == null) {
									ret = new ZPP_GeomVert();
								} else {
									ret = ZPP_GeomVert.zpp_pool;
									ZPP_GeomVert.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.forced = false;
								ret.x = x1;
								ret.y = y1;
								p = ret;
								if(sndx || sndy) {
									p.forced = true;
								}
							} else if(i == 6) {
								let ret;
								if(ZPP_GeomVert.zpp_pool == null) {
									ret = new ZPP_GeomVert();
								} else {
									ret = ZPP_GeomVert.zpp_pool;
									ZPP_GeomVert.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.forced = false;
								ret.x = x0;
								ret.y = y1;
								p = ret;
								if(fstx || sndy) {
									p.forced = true;
								}
							} else if(i == 1) {
								p = ints.list[(yn << 1) * ints.width + xn];
								if(p == null) {
									let x = this.xlerp(x0,x1,y0,v0,v1,iso,quality);
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
									ret.y = y0;
									p = ret;
									ints.list[(yn << 1) * ints.width + xn] = p;
								} else {
									let x = p.x;
									let y = p.y;
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
									p = ret;
								}
								if(fsty) {
									p.forced = true;
								}
								if(p.x == x0 || p.x == x1) {
									if(p.x == x0 && (val & 1) != 0 || p.x == x1 && (val & 4) != 0) {
										val ^= 2;
									}
								}
							} else if(i == 5) {
								p = ints.list[((yn << 1) + 2) * ints.width + xn];
								if(p == null) {
									let x = this.xlerp(x0,x1,y1,v3,v2,iso,quality);
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
									ret.y = y1;
									p = ret;
									ints.list[((yn << 1) + 2) * ints.width + xn] = p;
								} else {
									let x = p.x;
									let y = p.y;
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
									p = ret;
								}
								if(sndy) {
									p.forced = true;
								}
								if(p.x == x0 || p.x == x1) {
									if(p.x == x0 && (val & 64) != 0 || p.x == x1 && (val & 16) != 0) {
										val ^= 32;
									}
								}
							} else if(i == 3) {
								p = ints.list[((yn << 1) + 1) * ints.width + (xn + 1)];
								if(p == null) {
									let y = this.ylerp(y0,y1,x1,v1,v2,iso,quality);
									let ret;
									if(ZPP_GeomVert.zpp_pool == null) {
										ret = new ZPP_GeomVert();
									} else {
										ret = ZPP_GeomVert.zpp_pool;
										ZPP_GeomVert.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.forced = false;
									ret.x = x1;
									ret.y = y;
									p = ret;
									ints.list[((yn << 1) + 1) * ints.width + (xn + 1)] = p;
								} else {
									let x = p.x;
									let y = p.y;
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
									p = ret;
								}
								if(sndx) {
									p.forced = true;
								}
								if(p.y == y0 || p.y == y1) {
									if(p.y == y0 && (val & 4) != 0 || p.y == y1 && (val & 16) != 0) {
										val ^= 8;
									}
								}
							} else {
								p = ints.list[((yn << 1) + 1) * ints.width + xn];
								if(p == null) {
									let y = this.ylerp(y0,y1,x0,v0,v3,iso,quality);
									let ret;
									if(ZPP_GeomVert.zpp_pool == null) {
										ret = new ZPP_GeomVert();
									} else {
										ret = ZPP_GeomVert.zpp_pool;
										ZPP_GeomVert.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.forced = false;
									ret.x = x0;
									ret.y = y;
									p = ret;
									ints.list[((yn << 1) + 1) * ints.width + xn] = p;
								} else {
									let x = p.x;
									let y = p.y;
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
									p = ret;
								}
								if(fstx) {
									p.forced = true;
								}
								if(p.y == y0 || p.y == y1) {
									if(p.y == y0 && (val & 1) != 0 || p.y == y1 && (val & 64) != 0) {
										val ^= 128;
									}
								}
							}
							let obj = p;
							if(ret.p1 == null) {
								ret.p1 = obj.prev = obj.next = obj;
							} else {
								obj.prev = ret.p1;
								obj.next = ret.p1.next;
								ret.p1.next.prev = obj;
								ret.p1.next = obj;
							}
							ret.p1 = obj;
						}
					}
					ret.p1 = ret.p1.next;
					ret.key1 = val;
					if(val == 1 || val == 4 || val == 16 || val == 64 || val == 3 || val == 12 || val == 48 || val == 192 || val == 129 || val == 6 || val == 24 || val == 96 || val == 5 || val == 20 || val == 80 || val == 65 || val == 17 || val == 68) {
						val = 0;
						ret.key1 = 0;
						ret.p1 = null;
					}
					if(val != 0) {
						let val = 14;
						ret.okey2 = val;
						let _g = 0;
						while(_g < 8) {
							let i = _g++;
							if((val & 1 << i) != 0) {
								let p = null;
								if(i == 0) {
									let ret;
									if(ZPP_GeomVert.zpp_pool == null) {
										ret = new ZPP_GeomVert();
									} else {
										ret = ZPP_GeomVert.zpp_pool;
										ZPP_GeomVert.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.forced = false;
									ret.x = x0;
									ret.y = y0;
									p = ret;
									if(fstx || fsty) {
										p.forced = true;
									}
								} else if(i == 2) {
									let ret;
									if(ZPP_GeomVert.zpp_pool == null) {
										ret = new ZPP_GeomVert();
									} else {
										ret = ZPP_GeomVert.zpp_pool;
										ZPP_GeomVert.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.forced = false;
									ret.x = x1;
									ret.y = y0;
									p = ret;
									if(sndx || fsty) {
										p.forced = true;
									}
								} else if(i == 4) {
									let ret;
									if(ZPP_GeomVert.zpp_pool == null) {
										ret = new ZPP_GeomVert();
									} else {
										ret = ZPP_GeomVert.zpp_pool;
										ZPP_GeomVert.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.forced = false;
									ret.x = x1;
									ret.y = y1;
									p = ret;
									if(sndx || sndy) {
										p.forced = true;
									}
								} else if(i == 6) {
									let ret;
									if(ZPP_GeomVert.zpp_pool == null) {
										ret = new ZPP_GeomVert();
									} else {
										ret = ZPP_GeomVert.zpp_pool;
										ZPP_GeomVert.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.forced = false;
									ret.x = x0;
									ret.y = y1;
									p = ret;
									if(fstx || sndy) {
										p.forced = true;
									}
								} else if(i == 1) {
									p = ints.list[(yn << 1) * ints.width + xn];
									if(p == null) {
										let x = this.xlerp(x0,x1,y0,v0,v1,iso,quality);
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
										ret.y = y0;
										p = ret;
										ints.list[(yn << 1) * ints.width + xn] = p;
									} else {
										let x = p.x;
										let y = p.y;
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
										p = ret;
									}
									if(fsty) {
										p.forced = true;
									}
									if(p.x == x0 || p.x == x1) {
										if(p.x == x0 && (val & 1) != 0 || p.x == x1 && (val & 4) != 0) {
											val ^= 2;
										}
									}
								} else if(i == 5) {
									p = ints.list[((yn << 1) + 2) * ints.width + xn];
									if(p == null) {
										let x = this.xlerp(x0,x1,y1,v3,v2,iso,quality);
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
										ret.y = y1;
										p = ret;
										ints.list[((yn << 1) + 2) * ints.width + xn] = p;
									} else {
										let x = p.x;
										let y = p.y;
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
										p = ret;
									}
									if(sndy) {
										p.forced = true;
									}
									if(p.x == x0 || p.x == x1) {
										if(p.x == x0 && (val & 64) != 0 || p.x == x1 && (val & 16) != 0) {
											val ^= 32;
										}
									}
								} else if(i == 3) {
									p = ints.list[((yn << 1) + 1) * ints.width + (xn + 1)];
									if(p == null) {
										let y = this.ylerp(y0,y1,x1,v1,v2,iso,quality);
										let ret;
										if(ZPP_GeomVert.zpp_pool == null) {
											ret = new ZPP_GeomVert();
										} else {
											ret = ZPP_GeomVert.zpp_pool;
											ZPP_GeomVert.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.forced = false;
										ret.x = x1;
										ret.y = y;
										p = ret;
										ints.list[((yn << 1) + 1) * ints.width + (xn + 1)] = p;
									} else {
										let x = p.x;
										let y = p.y;
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
										p = ret;
									}
									if(sndx) {
										p.forced = true;
									}
									if(p.y == y0 || p.y == y1) {
										if(p.y == y0 && (val & 4) != 0 || p.y == y1 && (val & 16) != 0) {
											val ^= 8;
										}
									}
								} else {
									p = ints.list[((yn << 1) + 1) * ints.width + xn];
									if(p == null) {
										let y = this.ylerp(y0,y1,x0,v0,v3,iso,quality);
										let ret;
										if(ZPP_GeomVert.zpp_pool == null) {
											ret = new ZPP_GeomVert();
										} else {
											ret = ZPP_GeomVert.zpp_pool;
											ZPP_GeomVert.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.forced = false;
										ret.x = x0;
										ret.y = y;
										p = ret;
										ints.list[((yn << 1) + 1) * ints.width + xn] = p;
									} else {
										let x = p.x;
										let y = p.y;
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
										p = ret;
									}
									if(fstx) {
										p.forced = true;
									}
									if(p.y == y0 || p.y == y1) {
										if(p.y == y0 && (val & 1) != 0 || p.y == y1 && (val & 64) != 0) {
											val ^= 128;
										}
									}
								}
								let obj = p;
								if(ret.p2 == null) {
									ret.p2 = obj.prev = obj.next = obj;
								} else {
									obj.prev = ret.p2;
									obj.next = ret.p2.next;
									ret.p2.next.prev = obj;
									ret.p2.next = obj;
								}
								ret.p2 = obj;
							}
						}
						ret.p2 = ret.p2.next;
						ret.key2 = val;
						if(val == 1 || val == 4 || val == 16 || val == 64 || val == 3 || val == 12 || val == 48 || val == 192 || val == 129 || val == 6 || val == 24 || val == 96 || val == 5 || val == 20 || val == 80 || val == 65 || val == 17 || val == 68) {
							val = 0;
							ret.key2 = 0;
							ret.p2 = null;
						}
						if(val == 0) {
							ret.pr = ret.p1;
							ret.okeyr = ret.okey1;
							ret.keyr = ret.key1;
						} else {
							ret.pr = ret.p2;
							ret.okeyr = ret.okey2;
							ret.keyr = ret.key2;
						}
					} else {
						let val = 14;
						ret.okey1 = val;
						let _g = 0;
						while(_g < 8) {
							let i = _g++;
							if((val & 1 << i) != 0) {
								let p = null;
								if(i == 0) {
									let ret;
									if(ZPP_GeomVert.zpp_pool == null) {
										ret = new ZPP_GeomVert();
									} else {
										ret = ZPP_GeomVert.zpp_pool;
										ZPP_GeomVert.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.forced = false;
									ret.x = x0;
									ret.y = y0;
									p = ret;
									if(fstx || fsty) {
										p.forced = true;
									}
								} else if(i == 2) {
									let ret;
									if(ZPP_GeomVert.zpp_pool == null) {
										ret = new ZPP_GeomVert();
									} else {
										ret = ZPP_GeomVert.zpp_pool;
										ZPP_GeomVert.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.forced = false;
									ret.x = x1;
									ret.y = y0;
									p = ret;
									if(sndx || fsty) {
										p.forced = true;
									}
								} else if(i == 4) {
									let ret;
									if(ZPP_GeomVert.zpp_pool == null) {
										ret = new ZPP_GeomVert();
									} else {
										ret = ZPP_GeomVert.zpp_pool;
										ZPP_GeomVert.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.forced = false;
									ret.x = x1;
									ret.y = y1;
									p = ret;
									if(sndx || sndy) {
										p.forced = true;
									}
								} else if(i == 6) {
									let ret;
									if(ZPP_GeomVert.zpp_pool == null) {
										ret = new ZPP_GeomVert();
									} else {
										ret = ZPP_GeomVert.zpp_pool;
										ZPP_GeomVert.zpp_pool = ret.next;
										ret.next = null;
									}
									ret.forced = false;
									ret.x = x0;
									ret.y = y1;
									p = ret;
									if(fstx || sndy) {
										p.forced = true;
									}
								} else if(i == 1) {
									p = ints.list[(yn << 1) * ints.width + xn];
									if(p == null) {
										let x = this.xlerp(x0,x1,y0,v0,v1,iso,quality);
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
										ret.y = y0;
										p = ret;
										ints.list[(yn << 1) * ints.width + xn] = p;
									} else {
										let x = p.x;
										let y = p.y;
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
										p = ret;
									}
									if(fsty) {
										p.forced = true;
									}
									if(p.x == x0 || p.x == x1) {
										if(p.x == x0 && (val & 1) != 0 || p.x == x1 && (val & 4) != 0) {
											val ^= 2;
										}
									}
								} else if(i == 5) {
									p = ints.list[((yn << 1) + 2) * ints.width + xn];
									if(p == null) {
										let x = this.xlerp(x0,x1,y1,v3,v2,iso,quality);
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
										ret.y = y1;
										p = ret;
										ints.list[((yn << 1) + 2) * ints.width + xn] = p;
									} else {
										let x = p.x;
										let y = p.y;
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
										p = ret;
									}
									if(sndy) {
										p.forced = true;
									}
									if(p.x == x0 || p.x == x1) {
										if(p.x == x0 && (val & 64) != 0 || p.x == x1 && (val & 16) != 0) {
											val ^= 32;
										}
									}
								} else if(i == 3) {
									p = ints.list[((yn << 1) + 1) * ints.width + (xn + 1)];
									if(p == null) {
										let y = this.ylerp(y0,y1,x1,v1,v2,iso,quality);
										let ret;
										if(ZPP_GeomVert.zpp_pool == null) {
											ret = new ZPP_GeomVert();
										} else {
											ret = ZPP_GeomVert.zpp_pool;
											ZPP_GeomVert.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.forced = false;
										ret.x = x1;
										ret.y = y;
										p = ret;
										ints.list[((yn << 1) + 1) * ints.width + (xn + 1)] = p;
									} else {
										let x = p.x;
										let y = p.y;
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
										p = ret;
									}
									if(sndx) {
										p.forced = true;
									}
									if(p.y == y0 || p.y == y1) {
										if(p.y == y0 && (val & 4) != 0 || p.y == y1 && (val & 16) != 0) {
											val ^= 8;
										}
									}
								} else {
									p = ints.list[((yn << 1) + 1) * ints.width + xn];
									if(p == null) {
										let y = this.ylerp(y0,y1,x0,v0,v3,iso,quality);
										let ret;
										if(ZPP_GeomVert.zpp_pool == null) {
											ret = new ZPP_GeomVert();
										} else {
											ret = ZPP_GeomVert.zpp_pool;
											ZPP_GeomVert.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.forced = false;
										ret.x = x0;
										ret.y = y;
										p = ret;
										ints.list[((yn << 1) + 1) * ints.width + xn] = p;
									} else {
										let x = p.x;
										let y = p.y;
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
										p = ret;
									}
									if(fstx) {
										p.forced = true;
									}
									if(p.y == y0 || p.y == y1) {
										if(p.y == y0 && (val & 1) != 0 || p.y == y1 && (val & 64) != 0) {
											val ^= 128;
										}
									}
								}
								let obj = p;
								if(ret.p1 == null) {
									ret.p1 = obj.prev = obj.next = obj;
								} else {
									obj.prev = ret.p1;
									obj.next = ret.p1.next;
									ret.p1.next.prev = obj;
									ret.p1.next = obj;
								}
								ret.p1 = obj;
							}
						}
						ret.p1 = ret.p1.next;
						ret.key1 = val;
						if(val == 1 || val == 4 || val == 16 || val == 64 || val == 3 || val == 12 || val == 48 || val == 192 || val == 129 || val == 6 || val == 24 || val == 96 || val == 5 || val == 20 || val == 80 || val == 65 || val == 17 || val == 68) {
							val = 0;
							ret.key1 = 0;
							ret.p1 = null;
						}
						if(val == 0) {
							ret = null;
						} else {
							ret.pr = ret.p1;
							ret.okeyr = ret.okey1;
							ret.keyr = ret.key1;
						}
					}
				}
			}
			return ret;
		}
	}
	lerp(x0,x1,v0,v1) {
		if(v0 == 0) {
			return x0;
		} else if(v1 == 0) {
			return x1;
		} else {
			let dv = v0 - v1;
			let t = dv * dv < Config.epsilon * Config.epsilon ? 0.5 : v0 / dv;
			if(t < 0) {
				t = 0;
			} else if(t > 1) {
				t = 1;
			}
			return x0 + t * (x1 - x0);
		}
	}
	xlerp(x0,x1,y,v0,v1,iso,quality) {
		let xm;
		if(v0 == 0) {
			xm = x0;
		} else if(v1 == 0) {
			xm = x1;
		} else {
			let dv = v0 - v1;
			let t = dv * dv < Config.epsilon * Config.epsilon ? 0.5 : v0 / dv;
			if(t < 0) {
				t = 0;
			} else if(t > 1) {
				t = 1;
			}
			xm = x0 + t * (x1 - x0);
		}
		while(quality-- != 0 && x0 < xm && xm < x1) {
			let vm = iso(xm,y);
			if(vm == 0) {
				break;
			}
			if(v0 * vm < 0) {
				x1 = xm;
				v1 = vm;
			} else {
				x0 = xm;
				v0 = vm;
			}
			if(v0 == 0) {
				xm = x0;
			} else if(v1 == 0) {
				xm = x1;
			} else {
				let dv = v0 - v1;
				let t = dv * dv < Config.epsilon * Config.epsilon ? 0.5 : v0 / dv;
				if(t < 0) {
					t = 0;
				} else if(t > 1) {
					t = 1;
				}
				xm = x0 + t * (x1 - x0);
			}
		}
		return xm;
	}
	ylerp(y0,y1,x,v0,v1,iso,quality) {
		let ym;
		if(v0 == 0) {
			ym = y0;
		} else if(v1 == 0) {
			ym = y1;
		} else {
			let dv = v0 - v1;
			let t = dv * dv < Config.epsilon * Config.epsilon ? 0.5 : v0 / dv;
			if(t < 0) {
				t = 0;
			} else if(t > 1) {
				t = 1;
			}
			ym = y0 + t * (y1 - y0);
		}
		while(quality-- != 0 && y0 < ym && ym < y1) {
			let vm = iso(x,ym);
			if(vm == 0) {
				break;
			}
			if(v0 * vm < 0) {
				y1 = ym;
				v1 = vm;
			} else {
				y0 = ym;
				v0 = vm;
			}
			if(v0 == 0) {
				ym = y0;
			} else if(v1 == 0) {
				ym = y1;
			} else {
				let dv = v0 - v1;
				let t = dv * dv < Config.epsilon * Config.epsilon ? 0.5 : v0 / dv;
				if(t < 0) {
					t = 0;
				} else if(t > 1) {
					t = 1;
				}
				ym = y0 + t * (y1 - y0);
			}
		}
		return ym;
	}
	static run(iso,bx0,by0,bx1,by1,cell,quality,combine,ret) {
		if(cell != null && cell.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = cell.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let xp = (bx1 - bx0) / cell.zpp_inner.x;
		let xn = xp | 0;
		if(cell != null && cell.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = cell.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let yp = (by1 - by0) / cell.zpp_inner.y;
		let yn = yp | 0;
		if(xp != xn) {
			++xn;
		}
		if(yp != yn) {
			++yn;
		}
		if(combine) {
			if(ZPP_MarchingSquares.map == null) {
				ZPP_MarchingSquares.map = new ZNPArray2_ZPP_MarchPair(xn,yn);
			} else {
				ZPP_MarchingSquares.map.resize(xn,yn,null);
			}
		}
		if(ZPP_MarchingSquares.isos == null) {
			ZPP_MarchingSquares.isos = new ZNPArray2_Float(xn + 1,yn + 1);
		} else {
			ZPP_MarchingSquares.isos.resize(xn + 1,yn + 1,0);
		}
		let _g = 0;
		let _g1 = yn + 1;
		while(_g < _g1) {
			let y = _g++;
			let yc;
			if(y == 0) {
				yc = by0;
			} else if(y <= yn) {
				if(cell != null && cell.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = cell.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				yc = by0 + cell.zpp_inner.y * y;
			} else {
				yc = by1;
			}
			let _g1 = 0;
			let _g2 = xn + 1;
			while(_g1 < _g2) {
				let x = _g1++;
				let xc;
				if(x == 0) {
					xc = bx0;
				} else if(x <= xn) {
					if(cell != null && cell.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this = cell.zpp_inner;
					if(_this._validate != null) {
						_this._validate();
					}
					xc = bx0 + cell.zpp_inner.x * x;
				} else {
					xc = bx1;
				}
				let _this = ZPP_MarchingSquares.isos;
				let obj = iso(xc,yc);
				_this.list[y * _this.width + x] = obj;
			}
		}
		if(ZPP_MarchingSquares.ints == null) {
			ZPP_MarchingSquares.ints = new ZNPArray2_ZPP_GeomVert(xn + 1,(yn << 1) + 1);
		} else {
			ZPP_MarchingSquares.ints.resize(xn + 1,(yn << 1) + 1,null);
		}
		let spans = null;
		if(combine) {
			if(ZPP_MarchSpan.zpp_pool == null) {
				spans = new ZPP_MarchSpan();
			} else {
				spans = ZPP_MarchSpan.zpp_pool;
				ZPP_MarchSpan.zpp_pool = spans.next;
				spans.next = null;
			}
			spans.out = false;
			spans.rank = 0;
		}
		let py = by0;
		let _g2 = 0;
		let _g3 = yn;
		while(_g2 < _g3) {
			let y = _g2++;
			let y0 = py;
			let y1;
			if(y == yn - 1) {
				y1 = by1;
			} else {
				if(cell != null && cell.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = cell.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				y1 = by0 + cell.zpp_inner.y * (y + 1);
			}
			py = y1;
			let px = bx0;
			let pre = null;
			let _g = 0;
			let _g1 = xn;
			while(_g < _g1) {
				let x = _g++;
				let x0 = px;
				let x1;
				if(x == xn - 1) {
					x1 = bx1;
				} else {
					if(cell != null && cell.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this = cell.zpp_inner;
					if(_this._validate != null) {
						_this._validate();
					}
					x1 = bx0 + cell.zpp_inner.x * (x + 1);
				}
				px = x1;
				let fstx = x == 0 || !combine;
				let fsty = y == 0 || !combine;
				let sndx = x == xn - 1 || !combine;
				let sndy = y == yn - 1 || !combine;
				let pp = ZPP_MarchingSquares.me.marchSquare(iso,ZPP_MarchingSquares.isos,ZPP_MarchingSquares.ints,x0,y0,x1,y1,x,y,fstx,fsty,sndx,sndy,quality);
				if(pp == null) {
					pre = null;
					continue;
				}
				if(combine) {
					let pd = pp.p2 != null && pp.okey2 != 14 ? pp.p2 : pp.p1;
					pp.pd = ((pd == pp.p2 ? pp.okey2 : pp.okey1) & 128) == 0 ? pd.prev : pd.prev.prev;
					let _this = ZPP_MarchingSquares.map;
					_this.list[y * _this.width + x] = pp;
					let tmp;
					if(pre != null) {
						let _this = ZPP_MarchingSquares.me;
						let key = pp.key1;
						let flag = key & 1 | (key & 192) >> 5;
						let cnt = 0;
						if((flag & 1) != 0) {
							++cnt;
						}
						if((flag & 2) != 0) {
							++cnt;
						}
						if((flag & 4) != 0) {
							++cnt;
						}
						tmp = cnt >= 2;
					} else {
						tmp = false;
					}
					if(tmp) {
						ZPP_MarchingSquares.me.combLR(pre,pp);
						pp.span1 = pre.spanr;
					} else {
						if(ZPP_MarchSpan.zpp_pool == null) {
							pp.span1 = new ZPP_MarchSpan();
						} else {
							pp.span1 = ZPP_MarchSpan.zpp_pool;
							ZPP_MarchSpan.zpp_pool = pp.span1.next;
							pp.span1.next = null;
						}
						let _this = pp.span1;
						_this.out = false;
						_this.rank = 0;
						pp.span1.next = spans;
						spans = pp.span1;
					}
					if(pp.p2 != null) {
						if(ZPP_MarchSpan.zpp_pool == null) {
							pp.span2 = new ZPP_MarchSpan();
						} else {
							pp.span2 = ZPP_MarchSpan.zpp_pool;
							ZPP_MarchSpan.zpp_pool = pp.span2.next;
							pp.span2.next = null;
						}
						let _this = pp.span2;
						_this.out = false;
						_this.rank = 0;
						pp.span2.next = spans;
						spans = pp.span2;
						pp.spanr = pp.span2;
					} else {
						pp.spanr = pp.span1;
					}
					let _this1 = ZPP_MarchingSquares.me;
					let flag = (pp.keyr & 28) >> 2;
					let cnt = 0;
					if((flag & 1) != 0) {
						++cnt;
					}
					if((flag & 2) != 0) {
						++cnt;
					}
					if((flag & 4) != 0) {
						++cnt;
					}
					if(cnt >= 2) {
						pre = pp;
					} else {
						pre = null;
					}
				} else {
					ZPP_MarchingSquares.me.output(ret,pp.p1);
					if(pp.p2 != null) {
						ZPP_MarchingSquares.me.output(ret,pp.p2);
					}
					let o = pp;
					o.p1 = o.p2 = o.pr = o.pd = null;
					o.span1 = o.span2 = o.spanr = null;
					o.next = ZPP_MarchPair.zpp_pool;
					ZPP_MarchPair.zpp_pool = o;
				}
			}
		}
		if(!combine) {
			return;
		}
		let _g4 = 1;
		let _g5 = yn;
		while(_g4 < _g5) {
			let y = _g4++;
			let pre = null;
			let _g = 0;
			let _g1 = xn;
			while(_g < _g1) {
				let x = _g++;
				let _this = ZPP_MarchingSquares.map;
				let b = _this.list[y * _this.width + x];
				if(b == null) {
					pre = null;
					continue;
				}
				let bkey = b.p2 != null && b.okey2 == 14 ? b.okey2 : b.okey1;
				let _this1 = ZPP_MarchingSquares.me;
				let flag = bkey & 7;
				let cnt = 0;
				if((flag & 1) != 0) {
					++cnt;
				}
				if((flag & 2) != 0) {
					++cnt;
				}
				if((flag & 4) != 0) {
					++cnt;
				}
				if(cnt < 2) {
					pre = null;
					continue;
				}
				let _this2 = ZPP_MarchingSquares.map;
				let a = _this2.list[(y - 1) * _this2.width + x];
				if(a == null) {
					pre = null;
					continue;
				}
				let akey = a.p2 != null && a.okey2 == 56 ? a.okey2 : a.okey1;
				let _this3 = ZPP_MarchingSquares.me;
				let flag1 = (akey & 112) >> 4;
				let cnt1 = 0;
				if((flag1 & 1) != 0) {
					++cnt1;
				}
				if((flag1 & 2) != 0) {
					++cnt1;
				}
				if((flag1 & 4) != 0) {
					++cnt1;
				}
				if(cnt1 < 2) {
					pre = null;
					continue;
				}
				let ad = a.p2 != null && a.okey2 == 56 ? a.span2 : a.span1;
				let bu = b.p2 != null && b.okey2 == 14 ? b.span2 : b.span1;
				let tmp;
				if(ad == ad.parent) {
					tmp = ad;
				} else {
					let obj = ad;
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
					tmp = obj;
				}
				let tmp1;
				if(bu == bu.parent) {
					tmp1 = bu;
				} else {
					let obj = bu;
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
					tmp1 = obj;
				}
				if(tmp == tmp1) {
					if(pre != bu) {
						ZPP_MarchingSquares.me.combUD_virtual(a,b);
					}
				} else {
					let xr;
					if(ad == ad.parent) {
						xr = ad;
					} else {
						let obj = ad;
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
					if(bu == bu.parent) {
						yr = bu;
					} else {
						let obj = bu;
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
					ZPP_MarchingSquares.me.combUD(a,b);
				}
				let key = bu == b.span2 ? b.okey2 : b.okey1;
				pre = (key & 4) != 0 ? bu : null;
			}
		}
		let _g6 = 0;
		let _g7 = yn;
		while(_g6 < _g7) {
			let y = _g6++;
			let _g = 0;
			let _g1 = xn;
			while(_g < _g1) {
				let x = _g++;
				let _this = ZPP_MarchingSquares.map;
				let p = _this.list[y * _this.width + x];
				if(p == null) {
					continue;
				}
				let root;
				if(p.span1 == p.span1.parent) {
					root = p.span1;
				} else {
					let obj = p.span1;
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
					root = obj;
				}
				if(!root.out) {
					root.out = true;
					ZPP_MarchingSquares.me.output(ret,p.p1);
				}
				if(p.p2 != null) {
					if(p.span2 == p.span2.parent) {
						root = p.span2;
					} else {
						let obj = p.span2;
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
						root = obj;
					}
					if(!root.out) {
						root.out = true;
						ZPP_MarchingSquares.me.output(ret,p.p2);
					}
				}
				let o = p;
				o.p1 = o.p2 = o.pr = o.pd = null;
				o.span1 = o.span2 = o.spanr = null;
				o.next = ZPP_MarchPair.zpp_pool;
				ZPP_MarchPair.zpp_pool = o;
				let _this1 = ZPP_MarchingSquares.map;
				_this1.list[y * _this1.width + x] = null;
			}
		}
		while(spans != null) {
			let t = spans;
			spans = t.next;
			let o = t;
			o.parent = o;
			o.next = ZPP_MarchSpan.zpp_pool;
			ZPP_MarchSpan.zpp_pool = o;
		}
	}
	static ISO(iso,x,y) {
		return iso(x,y);
	}
}
ZPP_MarchingSquares.isos = null;
ZPP_MarchingSquares.ints = null;
ZPP_MarchingSquares.map = null;
ZPP_MarchingSquares.me = new ZPP_MarchingSquares();
ZPP_MarchingSquares.look_march = [-1,224,56,216,14,-1,54,214,131,99,-1,91,141,109,181,85];
