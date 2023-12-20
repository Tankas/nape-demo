import ZPP_PubPool from './ZPP_PubPool.js';
import ZPP_Vec2 from '../geom/ZPP_Vec2.js';
import ZPP_AABB from '../geom/ZPP_AABB.js';
import Vec2 from '../../nape/geom/Vec2.js';
import Mat23 from '../../nape/geom/Mat23.js';
export default class ZPP_Debug {
	constructor(width,height) {
		if(ZPP_Debug._hx_skip_constructor) {
			return;
		}
		this._hx_constructor(width,height);
	}
	_hx_constructor(width,height) {
		this.tmpab = null;
		this.iport = null;
		this.viewport = null;
		this.height = 0;
		this.width = 0;
		this.xdet = 0.0;
		this.xnull = false;
		this.xform = null;
		this.bg_col = 0;
		this.bg_b = 0.0;
		this.bg_g = 0.0;
		this.bg_r = 0.0;
		this.d_shape = null;
		this.isbmp = false;
		this.outer = null;
		this.xnull = true;
		this.xdet = 1.0;
		this.width = width;
		this.height = height;
		let ret;
		if(ZPP_AABB.zpp_pool == null) {
			ret = new ZPP_AABB();
		} else {
			ret = ZPP_AABB.zpp_pool;
			ZPP_AABB.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.minx = 0;
		ret.miny = 0;
		ret.maxx = width;
		ret.maxy = height;
		this.viewport = ret;
		let ret1;
		if(ZPP_AABB.zpp_pool == null) {
			ret1 = new ZPP_AABB();
		} else {
			ret1 = ZPP_AABB.zpp_pool;
			ZPP_AABB.zpp_pool = ret1.next;
			ret1.next = null;
		}
		ret1.minx = 0;
		ret1.miny = 0;
		ret1.maxx = width;
		ret1.maxy = height;
		this.iport = ret1;
		this.tmpab = new ZPP_AABB();
	}
	xform_invalidate() {
		let _this = this.xform.outer;
		let x = _this.zpp_inner.a * _this.zpp_inner.d - _this.zpp_inner.b * _this.zpp_inner.c;
		this.xdet = Math.sqrt(x < 0 ? -x : x);
		this.xnull = this.xform.a == 1.0 && this.xform.b == 0.0 && this.xform.c == 0.0 && this.xform.d == 1.0 && this.xform.tx == 0.0 && this.xform.ty == 0.0;
		let qmat = this.xform.outer.inverse();
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
		let q = ret;
		let v = qmat.transform(q);
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = v.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		this.iport.minx = v.zpp_inner.x;
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = v.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		this.iport.miny = v.zpp_inner.y;
		this.iport.maxx = this.iport.minx;
		this.iport.maxy = this.iport.miny;
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = v.zpp_inner;
		if(_this3._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this3._isimmutable != null) {
			_this3._isimmutable();
		}
		if(v.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner = v.zpp_inner;
		v.zpp_inner.outer = null;
		v.zpp_inner = null;
		let o = v;
		o.zpp_pool = null;
		if(ZPP_PubPool.nextVec2 != null) {
			ZPP_PubPool.nextVec2.zpp_pool = o;
		} else {
			ZPP_PubPool.poolVec2 = o;
		}
		ZPP_PubPool.nextVec2 = o;
		o.zpp_disp = true;
		let o1 = inner;
		if(o1.outer != null) {
			o1.outer.zpp_inner = null;
			o1.outer = null;
		}
		o1._isimmutable = null;
		o1._validate = null;
		o1._invalidate = null;
		o1.next = ZPP_Vec2.zpp_pool;
		ZPP_Vec2.zpp_pool = o1;
		let x1 = this.width;
		if(q != null && q.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = q.zpp_inner;
		if(_this4._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this4._isimmutable != null) {
			_this4._isimmutable();
		}
		if(q != null && q.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this5 = q.zpp_inner;
		if(_this5._validate != null) {
			_this5._validate();
		}
		if(q.zpp_inner.x != x1) {
			if(x1 != x1) {
				throw haxe_Exception.thrown("Error: Vec2::" + "x" + " cannot be NaN");
			}
			q.zpp_inner.x = x1;
			let _this = q.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		if(q != null && q.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this6 = q.zpp_inner;
		if(_this6._validate != null) {
			_this6._validate();
		}
		v = qmat.transform(q);
		let _this7 = this.iport;
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this8 = v.zpp_inner;
		if(_this8._validate != null) {
			_this8._validate();
		}
		let x2 = v.zpp_inner.x;
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this9 = v.zpp_inner;
		if(_this9._validate != null) {
			_this9._validate();
		}
		let y = v.zpp_inner.y;
		if(x2 < _this7.minx) {
			_this7.minx = x2;
		}
		if(x2 > _this7.maxx) {
			_this7.maxx = x2;
		}
		if(y < _this7.miny) {
			_this7.miny = y;
		}
		if(y > _this7.maxy) {
			_this7.maxy = y;
		}
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this10 = v.zpp_inner;
		if(_this10._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this10._isimmutable != null) {
			_this10._isimmutable();
		}
		if(v.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner1 = v.zpp_inner;
		v.zpp_inner.outer = null;
		v.zpp_inner = null;
		let o2 = v;
		o2.zpp_pool = null;
		if(ZPP_PubPool.nextVec2 != null) {
			ZPP_PubPool.nextVec2.zpp_pool = o2;
		} else {
			ZPP_PubPool.poolVec2 = o2;
		}
		ZPP_PubPool.nextVec2 = o2;
		o2.zpp_disp = true;
		let o3 = inner1;
		if(o3.outer != null) {
			o3.outer.zpp_inner = null;
			o3.outer = null;
		}
		o3._isimmutable = null;
		o3._validate = null;
		o3._invalidate = null;
		o3.next = ZPP_Vec2.zpp_pool;
		ZPP_Vec2.zpp_pool = o3;
		let y1 = this.height;
		if(q != null && q.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this11 = q.zpp_inner;
		if(_this11._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this11._isimmutable != null) {
			_this11._isimmutable();
		}
		if(q != null && q.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this12 = q.zpp_inner;
		if(_this12._validate != null) {
			_this12._validate();
		}
		if(q.zpp_inner.y != y1) {
			if(y1 != y1) {
				throw haxe_Exception.thrown("Error: Vec2::" + "y" + " cannot be NaN");
			}
			q.zpp_inner.y = y1;
			let _this = q.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		if(q != null && q.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this13 = q.zpp_inner;
		if(_this13._validate != null) {
			_this13._validate();
		}
		v = qmat.transform(q);
		let _this14 = this.iport;
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this15 = v.zpp_inner;
		if(_this15._validate != null) {
			_this15._validate();
		}
		let x3 = v.zpp_inner.x;
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this16 = v.zpp_inner;
		if(_this16._validate != null) {
			_this16._validate();
		}
		let y2 = v.zpp_inner.y;
		if(x3 < _this14.minx) {
			_this14.minx = x3;
		}
		if(x3 > _this14.maxx) {
			_this14.maxx = x3;
		}
		if(y2 < _this14.miny) {
			_this14.miny = y2;
		}
		if(y2 > _this14.maxy) {
			_this14.maxy = y2;
		}
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this17 = v.zpp_inner;
		if(_this17._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this17._isimmutable != null) {
			_this17._isimmutable();
		}
		if(v.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner2 = v.zpp_inner;
		v.zpp_inner.outer = null;
		v.zpp_inner = null;
		let o4 = v;
		o4.zpp_pool = null;
		if(ZPP_PubPool.nextVec2 != null) {
			ZPP_PubPool.nextVec2.zpp_pool = o4;
		} else {
			ZPP_PubPool.poolVec2 = o4;
		}
		ZPP_PubPool.nextVec2 = o4;
		o4.zpp_disp = true;
		let o5 = inner2;
		if(o5.outer != null) {
			o5.outer.zpp_inner = null;
			o5.outer = null;
		}
		o5._isimmutable = null;
		o5._validate = null;
		o5._invalidate = null;
		o5.next = ZPP_Vec2.zpp_pool;
		ZPP_Vec2.zpp_pool = o5;
		if(q != null && q.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this18 = q.zpp_inner;
		if(_this18._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this18._isimmutable != null) {
			_this18._isimmutable();
		}
		if(q != null && q.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this19 = q.zpp_inner;
		if(_this19._validate != null) {
			_this19._validate();
		}
		if(q.zpp_inner.x != 0) {
			q.zpp_inner.x = 0;
			let _this = q.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		if(q != null && q.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this20 = q.zpp_inner;
		if(_this20._validate != null) {
			_this20._validate();
		}
		v = qmat.transform(q);
		let _this21 = this.iport;
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this22 = v.zpp_inner;
		if(_this22._validate != null) {
			_this22._validate();
		}
		let x4 = v.zpp_inner.x;
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this23 = v.zpp_inner;
		if(_this23._validate != null) {
			_this23._validate();
		}
		let y3 = v.zpp_inner.y;
		if(x4 < _this21.minx) {
			_this21.minx = x4;
		}
		if(x4 > _this21.maxx) {
			_this21.maxx = x4;
		}
		if(y3 < _this21.miny) {
			_this21.miny = y3;
		}
		if(y3 > _this21.maxy) {
			_this21.maxy = y3;
		}
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this24 = v.zpp_inner;
		if(_this24._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this24._isimmutable != null) {
			_this24._isimmutable();
		}
		if(v.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner3 = v.zpp_inner;
		v.zpp_inner.outer = null;
		v.zpp_inner = null;
		let o6 = v;
		o6.zpp_pool = null;
		if(ZPP_PubPool.nextVec2 != null) {
			ZPP_PubPool.nextVec2.zpp_pool = o6;
		} else {
			ZPP_PubPool.poolVec2 = o6;
		}
		ZPP_PubPool.nextVec2 = o6;
		o6.zpp_disp = true;
		let o7 = inner3;
		if(o7.outer != null) {
			o7.outer.zpp_inner = null;
			o7.outer = null;
		}
		o7._isimmutable = null;
		o7._validate = null;
		o7._invalidate = null;
		o7.next = ZPP_Vec2.zpp_pool;
		ZPP_Vec2.zpp_pool = o7;
		if(q != null && q.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this25 = q.zpp_inner;
		if(_this25._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this25._isimmutable != null) {
			_this25._isimmutable();
		}
		if(q.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner4 = q.zpp_inner;
		q.zpp_inner.outer = null;
		q.zpp_inner = null;
		let o8 = q;
		o8.zpp_pool = null;
		if(ZPP_PubPool.nextVec2 != null) {
			ZPP_PubPool.nextVec2.zpp_pool = o8;
		} else {
			ZPP_PubPool.poolVec2 = o8;
		}
		ZPP_PubPool.nextVec2 = o8;
		o8.zpp_disp = true;
		let o9 = inner4;
		if(o9.outer != null) {
			o9.outer.zpp_inner = null;
			o9.outer = null;
		}
		o9._isimmutable = null;
		o9._validate = null;
		o9._invalidate = null;
		o9.next = ZPP_Vec2.zpp_pool;
		ZPP_Vec2.zpp_pool = o9;
	}
	setform() {
		this.xform = new Mat23().zpp_inner;
		this.xform._invalidate = $bind(this,this.xform_invalidate);
	}
	cull(aabb) {
		if(this.xnull) {
			let x = this.viewport;
			if(x.miny <= aabb.maxy && aabb.miny <= x.maxy && x.minx <= aabb.maxx) {
				return aabb.minx <= x.maxx;
			} else {
				return false;
			}
		} else {
			let qx = 0.0;
			let qy = 0.0;
			let vx = 0.0;
			let vy = 0.0;
			vx = aabb.minx;
			vy = aabb.miny;
			this.tmpab.minx = this.xform.a * vx + this.xform.b * vy + this.xform.tx;
			this.tmpab.miny = this.xform.c * vx + this.xform.d * vy + this.xform.ty;
			this.tmpab.maxx = this.tmpab.minx;
			this.tmpab.maxy = this.tmpab.miny;
			vx = aabb.maxx;
			qx = this.xform.a * vx + this.xform.b * vy + this.xform.tx;
			qy = this.xform.c * vx + this.xform.d * vy + this.xform.ty;
			let _this = this.tmpab;
			if(qx < _this.minx) {
				_this.minx = qx;
			}
			if(qx > _this.maxx) {
				_this.maxx = qx;
			}
			if(qy < _this.miny) {
				_this.miny = qy;
			}
			if(qy > _this.maxy) {
				_this.maxy = qy;
			}
			vy = aabb.maxy;
			qx = this.xform.a * vx + this.xform.b * vy + this.xform.tx;
			qy = this.xform.c * vx + this.xform.d * vy + this.xform.ty;
			let _this1 = this.tmpab;
			if(qx < _this1.minx) {
				_this1.minx = qx;
			}
			if(qx > _this1.maxx) {
				_this1.maxx = qx;
			}
			if(qy < _this1.miny) {
				_this1.miny = qy;
			}
			if(qy > _this1.maxy) {
				_this1.maxy = qy;
			}
			vx = aabb.minx;
			qx = this.xform.a * vx + this.xform.b * vy + this.xform.tx;
			qy = this.xform.c * vx + this.xform.d * vy + this.xform.ty;
			let _this2 = this.tmpab;
			if(qx < _this2.minx) {
				_this2.minx = qx;
			}
			if(qx > _this2.maxx) {
				_this2.maxx = qx;
			}
			if(qy < _this2.miny) {
				_this2.miny = qy;
			}
			if(qy > _this2.maxy) {
				_this2.maxy = qy;
			}
			let _this3 = this.tmpab;
			let x = this.viewport;
			if(x.miny <= _this3.maxy && _this3.miny <= x.maxy && x.minx <= _this3.maxx) {
				return _this3.minx <= x.maxx;
			} else {
				return false;
			}
		}
	}
	sup_setbg(bgcol) {
		this.bg_r = bgcol >> 16 & 255;
		this.bg_g = bgcol >> 8 & 255;
		this.bg_b = bgcol & 255;
		this.bg_col = bgcol;
	}
}
ZPP_Debug._hx_skip_constructor = false;
ZPP_Debug.internal = false;
