import ZPP_PubPool from '../util/ZPP_PubPool.js';
import ZPP_Vec2 from './ZPP_Vec2.js';
import Vec2 from '../../nape/geom/Vec2.js';
export default class ZPP_GeomVert {
	constructor() {
		this.forced = false;
		this.wrap = null;
		this.next = null;
		this.prev = null;
		this.y = 0.0;
		this.x = 0.0;
	}
	free() {
		if(this.wrap != null) {
			this.wrap.zpp_inner._inuse = false;
			let _this = this.wrap;
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
			this.wrap = null;
		}
		this.prev = this.next = null;
	}
	alloc() {
		this.forced = false;
	}
	wrapper() {
		if(this.wrap == null) {
			let x = this.x;
			let y = this.y;
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
			this.wrap = ret;
			this.wrap.zpp_inner._inuse = true;
			this.wrap.zpp_inner._invalidate = $bind(this,this.modwrap);
			this.wrap.zpp_inner._validate = $bind(this,this.getwrap);
		}
		return this.wrap;
	}
	modwrap(n) {
		this.x = n.x;
		this.y = n.y;
	}
	getwrap() {
		this.wrap.zpp_inner.x = this.x;
		this.wrap.zpp_inner.y = this.y;
	}
	static get(x,y) {
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
		return ret;
	}
}
ZPP_GeomVert.zpp_pool = null;
