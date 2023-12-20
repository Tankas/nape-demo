import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import ZPP_GeomVertexIterator from '../../zpp_nape/geom/ZPP_GeomVertexIterator.js';
import Vec2 from './Vec2.js';
export default class GeomVertexIterator {
	constructor() {
		if(!ZPP_GeomVertexIterator.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate GeomVertexIterator");
		}
	}
	hasNext() {
		if(this.zpp_inner == null) {
			throw haxe_Exception.thrown("Error: Iterator has been disposed");
		}
		let ret = this.zpp_inner.ptr != this.zpp_inner.start || this.zpp_inner.first;
		this.zpp_inner.first = false;
		if(!ret) {
			let o = this.zpp_inner;
			o.outer.zpp_inner = null;
			o.ptr = o.start = null;
			o.next = ZPP_GeomVertexIterator.zpp_pool;
			ZPP_GeomVertexIterator.zpp_pool = o;
		}
		return ret;
	}
	next() {
		if(this.zpp_inner == null) {
			throw haxe_Exception.thrown("Error: Iterator has been disposed");
		}
		let _this = this.zpp_inner.ptr;
		if(_this.wrap == null) {
			let x = _this.x;
			let y = _this.y;
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
			_this.wrap = ret;
			_this.wrap.zpp_inner._inuse = true;
			_this.wrap.zpp_inner._invalidate = $bind(_this,_this.modwrap);
			_this.wrap.zpp_inner._validate = $bind(_this,_this.getwrap);
		}
		let ret = _this.wrap;
		this.zpp_inner.ptr = this.zpp_inner.forward ? this.zpp_inner.ptr.next : this.zpp_inner.ptr.prev;
		return ret;
	}
}
