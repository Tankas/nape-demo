import ZPP_PubPool from '../util/ZPP_PubPool.js';
import ZPP_Vec2 from './ZPP_Vec2.js';
import Vec2 from '../../nape/geom/Vec2.js';
import AABB from '../../nape/geom/AABB.js';
export default class ZPP_AABB {
	constructor() {
		this.wrap_max = null;
		this.maxy = 0.0;
		this.maxx = 0.0;
		this.wrap_min = null;
		this.miny = 0.0;
		this.minx = 0.0;
		this.next = null;
		this.outer = null;
		this._immutable = false;
		this._validate = null;
		this._invalidate = null;
	}
	validate() {
		if(this._validate != null) {
			this._validate();
		}
	}
	invalidate() {
		if(this._invalidate != null) {
			this._invalidate(this);
		}
	}
	wrapper() {
		if(this.outer == null) {
			this.outer = new AABB();
			let o = this.outer.zpp_inner;
			if(o.outer != null) {
				o.outer.zpp_inner = null;
				o.outer = null;
			}
			o.wrap_min = o.wrap_max = null;
			o._invalidate = null;
			o._validate = null;
			o.next = ZPP_AABB.zpp_pool;
			ZPP_AABB.zpp_pool = o;
			this.outer.zpp_inner = this;
		}
		return this.outer;
	}
	alloc() {
	}
	free() {
		if(this.outer != null) {
			this.outer.zpp_inner = null;
			this.outer = null;
		}
		this.wrap_min = this.wrap_max = null;
		this._invalidate = null;
		this._validate = null;
	}
	copy() {
		let minx = this.minx;
		let miny = this.miny;
		let maxx = this.maxx;
		let maxy = this.maxy;
		let ret;
		if(ZPP_AABB.zpp_pool == null) {
			ret = new ZPP_AABB();
		} else {
			ret = ZPP_AABB.zpp_pool;
			ZPP_AABB.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.minx = minx;
		ret.miny = miny;
		ret.maxx = maxx;
		ret.maxy = maxy;
		return ret;
	}
	width() {
		return this.maxx - this.minx;
	}
	height() {
		return this.maxy - this.miny;
	}
	perimeter() {
		return (this.maxx - this.minx + (this.maxy - this.miny)) * 2;
	}
	getmin() {
		if(this.wrap_min == null) {
			let x = this.minx;
			let y = this.miny;
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
			this.wrap_min = ret;
			this.wrap_min.zpp_inner._inuse = true;
			if(this._immutable) {
				this.wrap_min.zpp_inner._immutable = true;
			} else {
				this.wrap_min.zpp_inner._invalidate = $bind(this,this.mod_min);
			}
			this.wrap_min.zpp_inner._validate = $bind(this,this.dom_min);
		}
		return this.wrap_min;
	}
	dom_min() {
		if(this._validate != null) {
			this._validate();
		}
		this.wrap_min.zpp_inner.x = this.minx;
		this.wrap_min.zpp_inner.y = this.miny;
	}
	mod_min(min) {
		if(min.x != this.minx || min.y != this.miny) {
			this.minx = min.x;
			this.miny = min.y;
			if(this._invalidate != null) {
				this._invalidate(this);
			}
		}
	}
	getmax() {
		if(this.wrap_max == null) {
			let x = this.maxx;
			let y = this.maxy;
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
			this.wrap_max = ret;
			this.wrap_max.zpp_inner._inuse = true;
			if(this._immutable) {
				this.wrap_max.zpp_inner._immutable = true;
			} else {
				this.wrap_max.zpp_inner._invalidate = $bind(this,this.mod_max);
			}
			this.wrap_max.zpp_inner._validate = $bind(this,this.dom_max);
		}
		return this.wrap_max;
	}
	dom_max() {
		if(this._validate != null) {
			this._validate();
		}
		this.wrap_max.zpp_inner.x = this.maxx;
		this.wrap_max.zpp_inner.y = this.maxy;
	}
	mod_max(max) {
		if(max.x != this.maxx || max.y != this.maxy) {
			this.maxx = max.x;
			this.maxy = max.y;
			if(this._invalidate != null) {
				this._invalidate(this);
			}
		}
	}
	intersectX(x) {
		return !(x.minx > this.maxx || this.minx > x.maxx);
	}
	intersectY(x) {
		return !(x.miny > this.maxy || this.miny > x.maxy);
	}
	intersect(x) {
		if(x.miny <= this.maxy && this.miny <= x.maxy && x.minx <= this.maxx) {
			return this.minx <= x.maxx;
		} else {
			return false;
		}
	}
	combine(x) {
		if(x.minx < this.minx) {
			this.minx = x.minx;
		}
		if(x.maxx > this.maxx) {
			this.maxx = x.maxx;
		}
		if(x.miny < this.miny) {
			this.miny = x.miny;
		}
		if(x.maxy > this.maxy) {
			this.maxy = x.maxy;
		}
	}
	contains(x) {
		if(x.minx >= this.minx && x.miny >= this.miny && x.maxx <= this.maxx) {
			return x.maxy <= this.maxy;
		} else {
			return false;
		}
	}
	containsPoint(v) {
		if(v.x >= this.minx && v.x <= this.maxx && v.y >= this.miny) {
			return v.y <= this.maxy;
		} else {
			return false;
		}
	}
	setCombine(a,b) {
		this.minx = a.minx < b.minx ? a.minx : b.minx;
		this.miny = a.miny < b.miny ? a.miny : b.miny;
		this.maxx = a.maxx > b.maxx ? a.maxx : b.maxx;
		this.maxy = a.maxy > b.maxy ? a.maxy : b.maxy;
	}
	setExpand(a,fatten) {
		this.minx = a.minx - fatten;
		this.miny = a.miny - fatten;
		this.maxx = a.maxx + fatten;
		this.maxy = a.maxy + fatten;
	}
	setExpandPoint(x,y) {
		if(x < this.minx) {
			this.minx = x;
		}
		if(x > this.maxx) {
			this.maxx = x;
		}
		if(y < this.miny) {
			this.miny = y;
		}
		if(y > this.maxy) {
			this.maxy = y;
		}
	}
	toString() {
		return "{ x: " + this.minx + " y: " + this.miny + " w: " + (this.maxx - this.minx) + " h: " + (this.maxy - this.miny) + " }";
	}
	static get(minx,miny,maxx,maxy) {
		let ret;
		if(ZPP_AABB.zpp_pool == null) {
			ret = new ZPP_AABB();
		} else {
			ret = ZPP_AABB.zpp_pool;
			ZPP_AABB.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.minx = minx;
		ret.miny = miny;
		ret.maxx = maxx;
		ret.maxy = maxy;
		return ret;
	}
}
ZPP_AABB.zpp_pool = null;
