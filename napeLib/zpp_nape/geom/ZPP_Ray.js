import ZPP_PubPool from '../util/ZPP_PubPool.js';
import ZNPNode_RayResult from '../util/ZNPNode_RayResult.js';
import ZPP_Vec2 from './ZPP_Vec2.js';
import ZPP_ConvexRayResult from './ZPP_ConvexRayResult.js';
import ZPP_AABB from './ZPP_AABB.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import Vec2 from '../../nape/geom/Vec2.js';
import Config from '../../nape/Config.js';
export default class ZPP_Ray {
	constructor() {
		this.zip_dir = false;
		this.absnormaly = 0.0;
		this.absnormalx = 0.0;
		this.normaly = 0.0;
		this.normalx = 0.0;
		this.idiry = 0.0;
		this.idirx = 0.0;
		this.diry = 0.0;
		this.dirx = 0.0;
		this.originy = 0.0;
		this.originx = 0.0;
		this.userData = null;
		this.maxdist = 0.0;
		this.direction = null;
		this.origin = null;
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
			ret1.x = 0;
			ret1.y = 0;
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
			let tmp;
			if(ret != null && ret.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = ret.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			if(ret.zpp_inner.x == 0) {
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = ret.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				tmp = ret.zpp_inner.y == 0;
			} else {
				tmp = false;
			}
			if(!tmp) {
				ret.zpp_inner.x = 0;
				ret.zpp_inner.y = 0;
				let _this = ret.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
		}
		ret.zpp_inner.weak = false;
		this.origin = ret;
		this.origin.zpp_inner._invalidate = $bind(this,this.origin_invalidate);
		let ret1;
		if(ZPP_PubPool.poolVec2 == null) {
			ret1 = new Vec2();
		} else {
			ret1 = ZPP_PubPool.poolVec2;
			ZPP_PubPool.poolVec2 = ret1.zpp_pool;
			ret1.zpp_pool = null;
			ret1.zpp_disp = false;
			if(ret1 == ZPP_PubPool.nextVec2) {
				ZPP_PubPool.nextVec2 = null;
			}
		}
		if(ret1.zpp_inner == null) {
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
			ret.x = 0;
			ret.y = 0;
			ret1.zpp_inner = ret;
			ret1.zpp_inner.outer = ret1;
		} else {
			if(ret1 != null && ret1.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = ret1.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			let tmp;
			if(ret1 != null && ret1.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = ret1.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			if(ret1.zpp_inner.x == 0) {
				if(ret1 != null && ret1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = ret1.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				tmp = ret1.zpp_inner.y == 0;
			} else {
				tmp = false;
			}
			if(!tmp) {
				ret1.zpp_inner.x = 0;
				ret1.zpp_inner.y = 0;
				let _this = ret1.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
		}
		ret1.zpp_inner.weak = false;
		this.direction = ret1;
		this.direction.zpp_inner._invalidate = $bind(this,this.direction_invalidate);
		this.originx = 0;
		this.originy = 0;
		this.dirx = 0;
		this.diry = 0;
		this.zip_dir = false;
	}
	origin_invalidate(x) {
		this.originx = x.x;
		this.originy = x.y;
	}
	direction_invalidate(x) {
		this.dirx = x.x;
		this.diry = x.y;
		this.zip_dir = true;
	}
	invalidate_dir() {
		this.zip_dir = true;
	}
	validate_dir() {
		if(this.zip_dir) {
			this.zip_dir = false;
			if(this.dirx * this.dirx + this.diry * this.diry < Config.epsilon) {
				throw haxe_Exception.thrown("Error: Ray::direction is degenerate");
			}
			let d = this.dirx * this.dirx + this.diry * this.diry;
			let imag = 1.0 / Math.sqrt(d);
			let t = imag;
			this.dirx *= t;
			this.diry *= t;
			this.idirx = 1 / this.dirx;
			this.idiry = 1 / this.diry;
			this.normalx = -this.diry;
			this.normaly = this.dirx;
			let x = this.normalx;
			this.absnormalx = x < 0 ? -x : x;
			let x1 = this.normaly;
			this.absnormaly = x1 < 0 ? -x1 : x1;
		}
	}
	rayAABB() {
		let x0 = this.originx;
		let x1 = x0;
		let y0 = this.originy;
		let y1 = y0;
		if(this.maxdist >= Infinity) {
			if(this.dirx > 0) {
				x1 = Infinity;
			} else if(this.dirx < 0) {
				x1 = -Infinity;
			}
			if(this.diry > 0) {
				y1 = Infinity;
			} else if(this.diry < 0) {
				y1 = -Infinity;
			}
		} else {
			x1 += this.maxdist * this.dirx;
			y1 += this.maxdist * this.diry;
		}
		if(x1 < x0) {
			let t = x0;
			x0 = x1;
			x1 = t;
		}
		if(y1 < y0) {
			let t = y0;
			y0 = y1;
			y1 = t;
		}
		let ret;
		if(ZPP_AABB.zpp_pool == null) {
			ret = new ZPP_AABB();
		} else {
			ret = ZPP_AABB.zpp_pool;
			ZPP_AABB.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.minx = x0;
		ret.miny = y0;
		ret.maxx = x1;
		ret.maxy = y1;
		let rayab = ret;
		return rayab;
	}
	aabbtest(a) {
		let dot1 = this.normalx * (this.originx - 0.5 * (a.minx + a.maxx)) + this.normaly * (this.originy - 0.5 * (a.miny + a.maxy));
		let dot2 = this.absnormalx * 0.5 * (a.maxx - a.minx) + this.absnormaly * 0.5 * (a.maxy - a.miny);
		let x = dot1;
		return (x < 0 ? -x : x) < dot2;
	}
	aabbsect(a) {
		let cx = this.originx >= a.minx && this.originx <= a.maxx;
		let cy = this.originy >= a.miny && this.originy <= a.maxy;
		if(cx && cy) {
			return 0.0;
		} else {
			let ret = -1.0;
			while(!(this.dirx >= 0 && this.originx >= a.maxx)) {
				if(this.dirx <= 0 && this.originx <= a.minx) {
					break;
				}
				if(this.diry >= 0 && this.originy >= a.maxy) {
					break;
				}
				if(this.diry <= 0 && this.originy <= a.miny) {
					break;
				}
				if(this.dirx > 0) {
					let t = (a.minx - this.originx) * this.idirx;
					if(t >= 0 && t <= this.maxdist) {
						let y = this.originy + t * this.diry;
						if(y >= a.miny && y <= a.maxy) {
							ret = t;
							break;
						}
					}
				} else if(this.dirx < 0) {
					let t = (a.maxx - this.originx) * this.idirx;
					if(t >= 0 && t <= this.maxdist) {
						let y = this.originy + t * this.diry;
						if(y >= a.miny && y <= a.maxy) {
							ret = t;
							break;
						}
					}
				}
				if(this.diry > 0) {
					let t = (a.miny - this.originy) * this.idiry;
					if(t >= 0 && t <= this.maxdist) {
						let x = this.originx + t * this.dirx;
						if(x >= a.minx && x <= a.maxx) {
							ret = t;
							break;
						}
					}
				} else if(this.diry < 0) {
					let t = (a.maxy - this.originy) * this.idiry;
					if(t >= 0 && t <= this.maxdist) {
						let x = this.originx + t * this.dirx;
						if(x >= a.minx && x <= a.maxx) {
							ret = t;
							break;
						}
					}
				}
				if(!false) {
					break;
				}
			}
			return ret;
		}
	}
	circlesect(c,inner,mint) {
		if(c.zip_worldCOM) {
			if(c.body != null) {
				c.zip_worldCOM = false;
				if(c.zip_localCOM) {
					c.zip_localCOM = false;
					if(c.type == ZPP_Flags.id_ShapeType_POLYGON) {
						let _this = c.polygon;
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
					if(c.wrap_localCOM != null) {
						c.wrap_localCOM.zpp_inner.x = c.localCOMx;
						c.wrap_localCOM.zpp_inner.y = c.localCOMy;
					}
				}
				let _this = c.body;
				if(_this.zip_axis) {
					_this.zip_axis = false;
					_this.axisx = Math.sin(_this.rot);
					_this.axisy = Math.cos(_this.rot);
				}
				c.worldCOMx = c.body.posx + (c.body.axisy * c.localCOMx - c.body.axisx * c.localCOMy);
				c.worldCOMy = c.body.posy + (c.localCOMx * c.body.axisx + c.localCOMy * c.body.axisy);
			}
		}
		let acx = 0.0;
		let acy = 0.0;
		acx = this.originx - c.worldCOMx;
		acy = this.originy - c.worldCOMy;
		let A = this.dirx * this.dirx + this.diry * this.diry;
		let B = 2 * (acx * this.dirx + acy * this.diry);
		let C = acx * acx + acy * acy - c.radius * c.radius;
		let det = B * B - 4 * A * C;
		if(det == 0) {
			let t = -B / 2 * A;
			if((!inner || C > 0) && t > 0 && t < mint && t <= this.maxdist) {
				let nx = 0.0;
				let ny = 0.0;
				nx = this.originx;
				ny = this.originy;
				let t1 = t;
				nx += this.dirx * t1;
				ny += this.diry * t1;
				let t2 = 1.0;
				nx -= c.worldCOMx * t2;
				ny -= c.worldCOMy * t2;
				let d = nx * nx + ny * ny;
				let imag = 1.0 / Math.sqrt(d);
				let t3 = imag;
				nx *= t3;
				ny *= t3;
				if(C <= 0) {
					nx = -nx;
					ny = -ny;
				}
				let x = nx;
				let y = ny;
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
					let tmp;
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
						tmp = ret.zpp_inner.y == y;
					} else {
						tmp = false;
					}
					if(!tmp) {
						ret.zpp_inner.x = x;
						ret.zpp_inner.y = y;
						let _this = ret.zpp_inner;
						if(_this._invalidate != null) {
							_this._invalidate(_this);
						}
					}
				}
				ret.zpp_inner.weak = false;
				return ZPP_ConvexRayResult.getRay(ret,t,C <= 0,c.outer);
			} else {
				return null;
			}
		} else {
			det = Math.sqrt(det);
			A = 1 / (2 * A);
			let t0 = (-B - det) * A;
			let t1 = (-B + det) * A;
			if(t0 > 0) {
				if(t0 < mint && t0 <= this.maxdist) {
					let nx = 0.0;
					let ny = 0.0;
					nx = this.originx;
					ny = this.originy;
					let t = t0;
					nx += this.dirx * t;
					ny += this.diry * t;
					let t1 = 1.0;
					nx -= c.worldCOMx * t1;
					ny -= c.worldCOMy * t1;
					let d = nx * nx + ny * ny;
					let imag = 1.0 / Math.sqrt(d);
					let t2 = imag;
					nx *= t2;
					ny *= t2;
					let x = nx;
					let y = ny;
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
						let tmp;
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
							tmp = ret.zpp_inner.y == y;
						} else {
							tmp = false;
						}
						if(!tmp) {
							ret.zpp_inner.x = x;
							ret.zpp_inner.y = y;
							let _this = ret.zpp_inner;
							if(_this._invalidate != null) {
								_this._invalidate(_this);
							}
						}
					}
					ret.zpp_inner.weak = false;
					return ZPP_ConvexRayResult.getRay(ret,t0,false,c.outer);
				} else {
					return null;
				}
			} else if(t1 > 0 && inner) {
				if(t1 < mint && t1 <= this.maxdist) {
					let nx = 0.0;
					let ny = 0.0;
					nx = this.originx;
					ny = this.originy;
					let t = t1;
					nx += this.dirx * t;
					ny += this.diry * t;
					let t2 = 1.0;
					nx -= c.worldCOMx * t2;
					ny -= c.worldCOMy * t2;
					let d = nx * nx + ny * ny;
					let imag = 1.0 / Math.sqrt(d);
					let t3 = imag;
					nx *= t3;
					ny *= t3;
					nx = -nx;
					ny = -ny;
					let x = nx;
					let y = ny;
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
						let tmp;
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
							tmp = ret.zpp_inner.y == y;
						} else {
							tmp = false;
						}
						if(!tmp) {
							ret.zpp_inner.x = x;
							ret.zpp_inner.y = y;
							let _this = ret.zpp_inner;
							if(_this._invalidate != null) {
								_this._invalidate(_this);
							}
						}
					}
					ret.zpp_inner.weak = false;
					return ZPP_ConvexRayResult.getRay(ret,t1,true,c.outer);
				} else {
					return null;
				}
			} else {
				return null;
			}
		}
	}
	circlesect2(c,inner,list) {
		if(c.zip_worldCOM) {
			if(c.body != null) {
				c.zip_worldCOM = false;
				if(c.zip_localCOM) {
					c.zip_localCOM = false;
					if(c.type == ZPP_Flags.id_ShapeType_POLYGON) {
						let _this = c.polygon;
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
					if(c.wrap_localCOM != null) {
						c.wrap_localCOM.zpp_inner.x = c.localCOMx;
						c.wrap_localCOM.zpp_inner.y = c.localCOMy;
					}
				}
				let _this = c.body;
				if(_this.zip_axis) {
					_this.zip_axis = false;
					_this.axisx = Math.sin(_this.rot);
					_this.axisy = Math.cos(_this.rot);
				}
				c.worldCOMx = c.body.posx + (c.body.axisy * c.localCOMx - c.body.axisx * c.localCOMy);
				c.worldCOMy = c.body.posy + (c.localCOMx * c.body.axisx + c.localCOMy * c.body.axisy);
			}
		}
		let acx = 0.0;
		let acy = 0.0;
		acx = this.originx - c.worldCOMx;
		acy = this.originy - c.worldCOMy;
		let A = this.dirx * this.dirx + this.diry * this.diry;
		let B = 2 * (acx * this.dirx + acy * this.diry);
		let C = acx * acx + acy * acy - c.radius * c.radius;
		let det = B * B - 4 * A * C;
		if(det == 0) {
			let t = -B / 2 * A;
			if((!inner || C > 0) && t > 0 && t <= this.maxdist) {
				let nx = 0.0;
				let ny = 0.0;
				nx = this.originx;
				ny = this.originy;
				let t1 = t;
				nx += this.dirx * t1;
				ny += this.diry * t1;
				let t2 = 1.0;
				nx -= c.worldCOMx * t2;
				ny -= c.worldCOMy * t2;
				let d = nx * nx + ny * ny;
				let imag = 1.0 / Math.sqrt(d);
				let t3 = imag;
				nx *= t3;
				ny *= t3;
				if(C <= 0) {
					nx = -nx;
					ny = -ny;
				}
				let x = nx;
				let y = ny;
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
					let res;
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
						res = ret.zpp_inner.y == y;
					} else {
						res = false;
					}
					if(!res) {
						ret.zpp_inner.x = x;
						ret.zpp_inner.y = y;
						let _this = ret.zpp_inner;
						if(_this._invalidate != null) {
							_this._invalidate(_this);
						}
					}
				}
				ret.zpp_inner.weak = false;
				let res = ZPP_ConvexRayResult.getRay(ret,t,C <= 0,c.outer);
				let pre = null;
				let cx_ite = list.zpp_inner.inner.head;
				while(cx_ite != null) {
					let j = cx_ite.elt;
					if(res.zpp_inner.next != null) {
						throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
					}
					let tmp = res.zpp_inner.toiDistance;
					if(j.zpp_inner.next != null) {
						throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
					}
					if(tmp < j.zpp_inner.toiDistance) {
						break;
					}
					pre = cx_ite;
					cx_ite = cx_ite.next;
				}
				let _this = list.zpp_inner.inner;
				let ret1;
				if(ZNPNode_RayResult.zpp_pool == null) {
					ret1 = new ZNPNode_RayResult();
				} else {
					ret1 = ZNPNode_RayResult.zpp_pool;
					ZNPNode_RayResult.zpp_pool = ret1.next;
					ret1.next = null;
				}
				ret1.elt = res;
				let temp = ret1;
				if(pre == null) {
					temp.next = _this.head;
					_this.head = temp;
				} else {
					temp.next = pre.next;
					pre.next = temp;
				}
				_this.pushmod = _this.modified = true;
				_this.length++;
			}
		} else {
			det = Math.sqrt(det);
			A = 1 / (2 * A);
			let t0 = (-B - det) * A;
			let t1 = (-B + det) * A;
			if(t0 > 0 && t0 <= this.maxdist) {
				let nx = 0.0;
				let ny = 0.0;
				nx = this.originx;
				ny = this.originy;
				let t = t0;
				nx += this.dirx * t;
				ny += this.diry * t;
				let t1 = 1.0;
				nx -= c.worldCOMx * t1;
				ny -= c.worldCOMy * t1;
				let d = nx * nx + ny * ny;
				let imag = 1.0 / Math.sqrt(d);
				let t2 = imag;
				nx *= t2;
				ny *= t2;
				let x = nx;
				let y = ny;
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
					let res;
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
						res = ret.zpp_inner.y == y;
					} else {
						res = false;
					}
					if(!res) {
						ret.zpp_inner.x = x;
						ret.zpp_inner.y = y;
						let _this = ret.zpp_inner;
						if(_this._invalidate != null) {
							_this._invalidate(_this);
						}
					}
				}
				ret.zpp_inner.weak = false;
				let res = ZPP_ConvexRayResult.getRay(ret,t0,false,c.outer);
				let pre = null;
				let cx_ite = list.zpp_inner.inner.head;
				while(cx_ite != null) {
					let j = cx_ite.elt;
					if(res.zpp_inner.next != null) {
						throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
					}
					let tmp = res.zpp_inner.toiDistance;
					if(j.zpp_inner.next != null) {
						throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
					}
					if(tmp < j.zpp_inner.toiDistance) {
						break;
					}
					pre = cx_ite;
					cx_ite = cx_ite.next;
				}
				let _this = list.zpp_inner.inner;
				let ret1;
				if(ZNPNode_RayResult.zpp_pool == null) {
					ret1 = new ZNPNode_RayResult();
				} else {
					ret1 = ZNPNode_RayResult.zpp_pool;
					ZNPNode_RayResult.zpp_pool = ret1.next;
					ret1.next = null;
				}
				ret1.elt = res;
				let temp = ret1;
				if(pre == null) {
					temp.next = _this.head;
					_this.head = temp;
				} else {
					temp.next = pre.next;
					pre.next = temp;
				}
				_this.pushmod = _this.modified = true;
				_this.length++;
			}
			if(t1 > 0 && t1 <= this.maxdist && inner) {
				let nx = 0.0;
				let ny = 0.0;
				nx = this.originx;
				ny = this.originy;
				let t = t1;
				nx += this.dirx * t;
				ny += this.diry * t;
				let t2 = 1.0;
				nx -= c.worldCOMx * t2;
				ny -= c.worldCOMy * t2;
				let d = nx * nx + ny * ny;
				let imag = 1.0 / Math.sqrt(d);
				let t3 = imag;
				nx *= t3;
				ny *= t3;
				nx = -nx;
				ny = -ny;
				let x = nx;
				let y = ny;
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
					let res;
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
						res = ret.zpp_inner.y == y;
					} else {
						res = false;
					}
					if(!res) {
						ret.zpp_inner.x = x;
						ret.zpp_inner.y = y;
						let _this = ret.zpp_inner;
						if(_this._invalidate != null) {
							_this._invalidate(_this);
						}
					}
				}
				ret.zpp_inner.weak = false;
				let res = ZPP_ConvexRayResult.getRay(ret,t1,true,c.outer);
				let pre = null;
				let cx_ite = list.zpp_inner.inner.head;
				while(cx_ite != null) {
					let j = cx_ite.elt;
					if(res.zpp_inner.next != null) {
						throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
					}
					let tmp = res.zpp_inner.toiDistance;
					if(j.zpp_inner.next != null) {
						throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
					}
					if(tmp < j.zpp_inner.toiDistance) {
						break;
					}
					pre = cx_ite;
					cx_ite = cx_ite.next;
				}
				let _this = list.zpp_inner.inner;
				let ret1;
				if(ZNPNode_RayResult.zpp_pool == null) {
					ret1 = new ZNPNode_RayResult();
				} else {
					ret1 = ZNPNode_RayResult.zpp_pool;
					ZNPNode_RayResult.zpp_pool = ret1.next;
					ret1.next = null;
				}
				ret1.elt = res;
				let temp = ret1;
				if(pre == null) {
					temp.next = _this.head;
					_this.head = temp;
				} else {
					temp.next = pre.next;
					pre.next = temp;
				}
				_this.pushmod = _this.modified = true;
				_this.length++;
			}
		}
	}
	polysect(p,inner,mint) {
		let min = mint;
		let edge = null;
		let ei = p.edges.head;
		let cx_cont = true;
		let cx_itei = p.gverts.next;
		let u = cx_itei;
		let cx_itej = cx_itei.next;
		while(cx_itej != null) {
			let v = cx_itej;
			let e = ei.elt;
			if(inner || e.gnormx * this.dirx + e.gnormy * this.diry < 0) {
				let _vx = 0.0;
				let _vy = 0.0;
				_vx = v.x - u.x;
				_vy = v.y - u.y;
				let _sx = 0.0;
				let _sy = 0.0;
				_sx = u.x - this.originx;
				_sy = u.y - this.originy;
				let den = _vy * this.dirx - _vx * this.diry;
				if(den * den > Config.epsilon) {
					den = 1 / den;
					let sxx = (_vy * _sx - _vx * _sy) * den;
					if(sxx > 0 && sxx < min && sxx <= this.maxdist) {
						let txx = (this.diry * _sx - this.dirx * _sy) * den;
						if(txx > -Config.epsilon && txx < 1 + Config.epsilon) {
							min = sxx;
							edge = ei.elt;
						}
					}
				}
			}
			ei = ei.next;
			cx_itei = cx_itej;
			u = v;
			cx_itej = cx_itej.next;
		}
		if(cx_cont) {
			while(true) {
				cx_itej = p.gverts.next;
				let v = cx_itej;
				let e = ei.elt;
				if(inner || e.gnormx * this.dirx + e.gnormy * this.diry < 0) {
					let _vx = 0.0;
					let _vy = 0.0;
					_vx = v.x - u.x;
					_vy = v.y - u.y;
					let _sx = 0.0;
					let _sy = 0.0;
					_sx = u.x - this.originx;
					_sy = u.y - this.originy;
					let den = _vy * this.dirx - _vx * this.diry;
					if(den * den > Config.epsilon) {
						den = 1 / den;
						let sxx = (_vy * _sx - _vx * _sy) * den;
						if(sxx > 0 && sxx < min && sxx <= this.maxdist) {
							let txx = (this.diry * _sx - this.dirx * _sy) * den;
							if(txx > -Config.epsilon && txx < 1 + Config.epsilon) {
								min = sxx;
								edge = ei.elt;
							}
						}
					}
				}
				ei = ei.next;
				if(!false) {
					break;
				}
			}
		}
		if(edge != null) {
			let nx = 0.0;
			let ny = 0.0;
			nx = edge.gnormx;
			ny = edge.gnormy;
			let inner = nx * this.dirx + ny * this.diry > 0;
			if(inner) {
				nx = -nx;
				ny = -ny;
			}
			let x = nx;
			let y = ny;
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
				let tmp;
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
					tmp = ret.zpp_inner.y == y;
				} else {
					tmp = false;
				}
				if(!tmp) {
					ret.zpp_inner.x = x;
					ret.zpp_inner.y = y;
					let _this = ret.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
			}
			ret.zpp_inner.weak = false;
			return ZPP_ConvexRayResult.getRay(ret,min,inner,p.outer);
		} else {
			return null;
		}
	}
	polysect2(p,inner,list) {
		let min = Infinity;
		let max = -1.0;
		let edge = null;
		let edgemax = null;
		let ei = p.edges.head;
		let cx_cont = true;
		let cx_itei = p.gverts.next;
		let u = cx_itei;
		let cx_itej = cx_itei.next;
		while(cx_itej != null) {
			let v = cx_itej;
			let e = ei.elt;
			if(inner || e.gnormx * this.dirx + e.gnormy * this.diry < 0) {
				let _vx = 0.0;
				let _vy = 0.0;
				_vx = v.x - u.x;
				_vy = v.y - u.y;
				let _sx = 0.0;
				let _sy = 0.0;
				_sx = u.x - this.originx;
				_sy = u.y - this.originy;
				let den = _vy * this.dirx - _vx * this.diry;
				if(den * den > Config.epsilon) {
					den = 1 / den;
					let sxx = (_vy * _sx - _vx * _sy) * den;
					if(sxx > 0 && sxx <= this.maxdist && (sxx < min || sxx > max)) {
						let txx = (this.diry * _sx - this.dirx * _sy) * den;
						if(txx > -Config.epsilon && txx < 1 + Config.epsilon) {
							if(sxx < min) {
								min = sxx;
								edge = ei.elt;
							}
							if(sxx > max) {
								max = sxx;
								edgemax = ei.elt;
							}
						}
					}
				}
			}
			ei = ei.next;
			cx_itei = cx_itej;
			u = v;
			cx_itej = cx_itej.next;
		}
		if(cx_cont) {
			while(true) {
				cx_itej = p.gverts.next;
				let v = cx_itej;
				let e = ei.elt;
				if(inner || e.gnormx * this.dirx + e.gnormy * this.diry < 0) {
					let _vx = 0.0;
					let _vy = 0.0;
					_vx = v.x - u.x;
					_vy = v.y - u.y;
					let _sx = 0.0;
					let _sy = 0.0;
					_sx = u.x - this.originx;
					_sy = u.y - this.originy;
					let den = _vy * this.dirx - _vx * this.diry;
					if(den * den > Config.epsilon) {
						den = 1 / den;
						let sxx = (_vy * _sx - _vx * _sy) * den;
						if(sxx > 0 && sxx <= this.maxdist && (sxx < min || sxx > max)) {
							let txx = (this.diry * _sx - this.dirx * _sy) * den;
							if(txx > -Config.epsilon && txx < 1 + Config.epsilon) {
								if(sxx < min) {
									min = sxx;
									edge = ei.elt;
								}
								if(sxx > max) {
									max = sxx;
									edgemax = ei.elt;
								}
							}
						}
					}
				}
				ei = ei.next;
				if(!false) {
					break;
				}
			}
		}
		if(edge != null) {
			let nx = 0.0;
			let ny = 0.0;
			nx = edge.gnormx;
			ny = edge.gnormy;
			let inner = nx * this.dirx + ny * this.diry > 0;
			if(inner) {
				nx = -nx;
				ny = -ny;
			}
			let x = nx;
			let y = ny;
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
				let ret1;
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
					ret1 = ret.zpp_inner.y == y;
				} else {
					ret1 = false;
				}
				if(!ret1) {
					ret.zpp_inner.x = x;
					ret.zpp_inner.y = y;
					let _this = ret.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
			}
			ret.zpp_inner.weak = false;
			let ret1 = ZPP_ConvexRayResult.getRay(ret,min,inner,p.outer);
			let pre = null;
			let cx_ite = list.zpp_inner.inner.head;
			while(cx_ite != null) {
				let j = cx_ite.elt;
				if(ret1.zpp_inner.next != null) {
					throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
				}
				let tmp = ret1.zpp_inner.toiDistance;
				if(j.zpp_inner.next != null) {
					throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
				}
				if(tmp < j.zpp_inner.toiDistance) {
					break;
				}
				pre = cx_ite;
				cx_ite = cx_ite.next;
			}
			let _this = list.zpp_inner.inner;
			let ret2;
			if(ZNPNode_RayResult.zpp_pool == null) {
				ret2 = new ZNPNode_RayResult();
			} else {
				ret2 = ZNPNode_RayResult.zpp_pool;
				ZNPNode_RayResult.zpp_pool = ret2.next;
				ret2.next = null;
			}
			ret2.elt = ret1;
			let temp = ret2;
			if(pre == null) {
				temp.next = _this.head;
				_this.head = temp;
			} else {
				temp.next = pre.next;
				pre.next = temp;
			}
			_this.pushmod = _this.modified = true;
			_this.length++;
		}
		if(edgemax != null && edge != edgemax) {
			let nx = 0.0;
			let ny = 0.0;
			nx = edgemax.gnormx;
			ny = edgemax.gnormy;
			let inner = nx * this.dirx + ny * this.diry > 0;
			if(inner) {
				nx = -nx;
				ny = -ny;
			}
			let x = nx;
			let y = ny;
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
				let ret1;
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
					ret1 = ret.zpp_inner.y == y;
				} else {
					ret1 = false;
				}
				if(!ret1) {
					ret.zpp_inner.x = x;
					ret.zpp_inner.y = y;
					let _this = ret.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
			}
			ret.zpp_inner.weak = false;
			let ret1 = ZPP_ConvexRayResult.getRay(ret,max,inner,p.outer);
			let pre = null;
			let cx_ite = list.zpp_inner.inner.head;
			while(cx_ite != null) {
				let j = cx_ite.elt;
				if(ret1.zpp_inner.next != null) {
					throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
				}
				let tmp = ret1.zpp_inner.toiDistance;
				if(j.zpp_inner.next != null) {
					throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
				}
				if(tmp < j.zpp_inner.toiDistance) {
					break;
				}
				pre = cx_ite;
				cx_ite = cx_ite.next;
			}
			let _this = list.zpp_inner.inner;
			let ret2;
			if(ZNPNode_RayResult.zpp_pool == null) {
				ret2 = new ZNPNode_RayResult();
			} else {
				ret2 = ZNPNode_RayResult.zpp_pool;
				ZNPNode_RayResult.zpp_pool = ret2.next;
				ret2.next = null;
			}
			ret2.elt = ret1;
			let temp = ret2;
			if(pre == null) {
				temp.next = _this.head;
				_this.head = temp;
			} else {
				temp.next = pre.next;
				pre.next = temp;
			}
			_this.pushmod = _this.modified = true;
			_this.length++;
		}
	}
}
ZPP_Ray.internal = false;
