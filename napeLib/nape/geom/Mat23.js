import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import ZPP_Mat23 from '../../zpp_nape/geom/ZPP_Mat23.js';
import Vec2 from './Vec2.js';
import Config from '../Config.js';
export default class Mat23 {
	constructor(a,b,c,d,tx,ty) {
		if(ty == null) {
			ty = 0.0;
		}
		if(tx == null) {
			tx = 0.0;
		}
		if(d == null) {
			d = 1.0;
		}
		if(c == null) {
			c = 0.0;
		}
		if(b == null) {
			b = 0.0;
		}
		if(a == null) {
			a = 1.0;
		}
		this.zpp_inner = null;
		this.zpp_inner = ZPP_Mat23.get();
		this.zpp_inner.outer = this;
		if(a != a) {
			throw haxe_Exception.thrown("Error: Mat23::" + "a" + " cannot be NaN");
		}
		this.zpp_inner.a = a;
		let _this = this.zpp_inner;
		if(_this._invalidate != null) {
			_this._invalidate();
		}
		if(b != b) {
			throw haxe_Exception.thrown("Error: Mat23::" + "b" + " cannot be NaN");
		}
		this.zpp_inner.b = b;
		let _this1 = this.zpp_inner;
		if(_this1._invalidate != null) {
			_this1._invalidate();
		}
		if(tx != tx) {
			throw haxe_Exception.thrown("Error: Mat23::" + "tx" + " cannot be NaN");
		}
		this.zpp_inner.tx = tx;
		let _this2 = this.zpp_inner;
		if(_this2._invalidate != null) {
			_this2._invalidate();
		}
		if(c != c) {
			throw haxe_Exception.thrown("Error: Mat23::" + "c" + " cannot be NaN");
		}
		this.zpp_inner.c = c;
		let _this3 = this.zpp_inner;
		if(_this3._invalidate != null) {
			_this3._invalidate();
		}
		if(d != d) {
			throw haxe_Exception.thrown("Error: Mat23::" + "d" + " cannot be NaN");
		}
		this.zpp_inner.d = d;
		let _this4 = this.zpp_inner;
		if(_this4._invalidate != null) {
			_this4._invalidate();
		}
		if(ty != ty) {
			throw haxe_Exception.thrown("Error: Mat23::" + "ty" + " cannot be NaN");
		}
		this.zpp_inner.ty = ty;
		let _this5 = this.zpp_inner;
		if(_this5._invalidate != null) {
			_this5._invalidate();
		}
	}
	get_a() {
		return this.zpp_inner.a;
	}
	set_a(a) {
		if(a != a) {
			throw haxe_Exception.thrown("Error: Mat23::" + "a" + " cannot be NaN");
		}
		this.zpp_inner.a = a;
		let _this = this.zpp_inner;
		if(_this._invalidate != null) {
			_this._invalidate();
		}
		return this.zpp_inner.a;
	}
	get_b() {
		return this.zpp_inner.b;
	}
	set_b(b) {
		if(b != b) {
			throw haxe_Exception.thrown("Error: Mat23::" + "b" + " cannot be NaN");
		}
		this.zpp_inner.b = b;
		let _this = this.zpp_inner;
		if(_this._invalidate != null) {
			_this._invalidate();
		}
		return this.zpp_inner.b;
	}
	get_c() {
		return this.zpp_inner.c;
	}
	set_c(c) {
		if(c != c) {
			throw haxe_Exception.thrown("Error: Mat23::" + "c" + " cannot be NaN");
		}
		this.zpp_inner.c = c;
		let _this = this.zpp_inner;
		if(_this._invalidate != null) {
			_this._invalidate();
		}
		return this.zpp_inner.c;
	}
	get_d() {
		return this.zpp_inner.d;
	}
	set_d(d) {
		if(d != d) {
			throw haxe_Exception.thrown("Error: Mat23::" + "d" + " cannot be NaN");
		}
		this.zpp_inner.d = d;
		let _this = this.zpp_inner;
		if(_this._invalidate != null) {
			_this._invalidate();
		}
		return this.zpp_inner.d;
	}
	get_tx() {
		return this.zpp_inner.tx;
	}
	set_tx(tx) {
		if(tx != tx) {
			throw haxe_Exception.thrown("Error: Mat23::" + "tx" + " cannot be NaN");
		}
		this.zpp_inner.tx = tx;
		let _this = this.zpp_inner;
		if(_this._invalidate != null) {
			_this._invalidate();
		}
		return this.zpp_inner.tx;
	}
	get_ty() {
		return this.zpp_inner.ty;
	}
	set_ty(ty) {
		if(ty != ty) {
			throw haxe_Exception.thrown("Error: Mat23::" + "ty" + " cannot be NaN");
		}
		this.zpp_inner.ty = ty;
		let _this = this.zpp_inner;
		if(_this._invalidate != null) {
			_this._invalidate();
		}
		return this.zpp_inner.ty;
	}
	copy() {
		return new Mat23(this.zpp_inner.a,this.zpp_inner.b,this.zpp_inner.c,this.zpp_inner.d,this.zpp_inner.tx,this.zpp_inner.ty);
	}
	set(matrix) {
		if(matrix == null) {
			throw haxe_Exception.thrown("Error: Cannot set form null matrix");
		}
		let m = matrix.zpp_inner;
		this.zpp_inner.setas(m.a,m.b,m.c,m.d,m.tx,m.ty);
		let _this = this.zpp_inner;
		if(_this._invalidate != null) {
			_this._invalidate();
		}
		return this;
	}
	setAs(a,b,c,d,tx,ty) {
		if(ty == null) {
			ty = 0.0;
		}
		if(tx == null) {
			tx = 0.0;
		}
		if(d == null) {
			d = 1.0;
		}
		if(c == null) {
			c = 0.0;
		}
		if(b == null) {
			b = 0.0;
		}
		if(a == null) {
			a = 1.0;
		}
		this.zpp_inner.setas(a,b,c,d,tx,ty);
		let _this = this.zpp_inner;
		if(_this._invalidate != null) {
			_this._invalidate();
		}
		return this;
	}
	reset() {
		return this.setAs();
	}
	get_determinant() {
		return this.zpp_inner.a * this.zpp_inner.d - this.zpp_inner.b * this.zpp_inner.c;
	}
	singular() {
		let norm = this.zpp_inner.a * this.zpp_inner.a + this.zpp_inner.b * this.zpp_inner.b + this.zpp_inner.c * this.zpp_inner.c + this.zpp_inner.d * this.zpp_inner.d;
		let limit = this.zpp_inner.a * this.zpp_inner.d - this.zpp_inner.b * this.zpp_inner.c;
		if(limit < 0) {
			limit = -limit;
		}
		return norm > Config.illConditionedThreshold * limit;
	}
	inverse() {
		if(this.singular()) {
			throw haxe_Exception.thrown("Error: Matrix is singular and cannot be inverted");
		}
		let idet = 1.0 / (this.zpp_inner.a * this.zpp_inner.d - this.zpp_inner.b * this.zpp_inner.c);
		return new Mat23(this.zpp_inner.d * idet,-this.zpp_inner.b * idet,-this.zpp_inner.c * idet,this.zpp_inner.a * idet,(this.zpp_inner.b * this.zpp_inner.ty - this.zpp_inner.d * this.zpp_inner.tx) * idet,(this.zpp_inner.c * this.zpp_inner.tx - this.zpp_inner.a * this.zpp_inner.ty) * idet);
	}
	transpose() {
		return new Mat23(this.zpp_inner.a,this.zpp_inner.c,this.zpp_inner.b,this.zpp_inner.d,-this.zpp_inner.a * this.zpp_inner.tx - this.zpp_inner.c * this.zpp_inner.ty,-this.zpp_inner.b * this.zpp_inner.tx - this.zpp_inner.d * this.zpp_inner.ty);
	}
	concat(matrix) {
		let m = matrix;
		if(m == null) {
			throw haxe_Exception.thrown("Error: Cannot concatenate with null Mat23");
		}
		return new Mat23(m.zpp_inner.a * this.zpp_inner.a + m.zpp_inner.b * this.zpp_inner.c,m.zpp_inner.a * this.zpp_inner.b + m.zpp_inner.b * this.zpp_inner.d,m.zpp_inner.c * this.zpp_inner.a + m.zpp_inner.d * this.zpp_inner.c,m.zpp_inner.c * this.zpp_inner.b + m.zpp_inner.d * this.zpp_inner.d,m.zpp_inner.a * this.zpp_inner.tx + m.zpp_inner.b * this.zpp_inner.ty + m.zpp_inner.tx,m.zpp_inner.c * this.zpp_inner.tx + m.zpp_inner.d * this.zpp_inner.ty + m.zpp_inner.ty);
	}
	transform(point,noTranslation,weak) {
		if(weak == null) {
			weak = false;
		}
		if(noTranslation == null) {
			noTranslation = false;
		}
		if(point != null && point.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(point == null) {
			throw haxe_Exception.thrown("Error: Cannot transform null Vec2");
		}
		let ret;
		if(noTranslation) {
			if(point != null && point.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = point.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let x = point.zpp_inner.x * this.zpp_inner.a;
			if(point != null && point.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = point.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			let x1 = x + point.zpp_inner.y * this.zpp_inner.b;
			if(point != null && point.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = point.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			let y = point.zpp_inner.x * this.zpp_inner.c;
			if(point != null && point.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = point.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			let y1 = y + point.zpp_inner.y * this.zpp_inner.d;
			let weak1 = weak;
			if(weak1 == null) {
				weak1 = false;
			}
			if(y1 == null) {
				y1 = 0;
			}
			if(x1 == null) {
				x1 = 0;
			}
			if(x1 != x1 || y1 != y1) {
				throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
			}
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
				ret.x = x1;
				ret.y = y1;
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
				if(x1 != x1 || y1 != y1) {
					throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
				}
				let ret;
				if(ret1 != null && ret1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = ret1.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				if(ret1.zpp_inner.x == x1) {
					if(ret1 != null && ret1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this = ret1.zpp_inner;
					if(_this._validate != null) {
						_this._validate();
					}
					ret = ret1.zpp_inner.y == y1;
				} else {
					ret = false;
				}
				if(!ret) {
					ret1.zpp_inner.x = x1;
					ret1.zpp_inner.y = y1;
					let _this = ret1.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
			}
			ret1.zpp_inner.weak = weak1;
			ret = ret1;
		} else {
			if(point != null && point.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = point.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let x = point.zpp_inner.x * this.zpp_inner.a;
			if(point != null && point.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = point.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			let x1 = x + point.zpp_inner.y * this.zpp_inner.b + this.zpp_inner.tx;
			if(point != null && point.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = point.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			let y = point.zpp_inner.x * this.zpp_inner.c;
			if(point != null && point.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = point.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			let y1 = y + point.zpp_inner.y * this.zpp_inner.d + this.zpp_inner.ty;
			let weak1 = weak;
			if(weak1 == null) {
				weak1 = false;
			}
			if(y1 == null) {
				y1 = 0;
			}
			if(x1 == null) {
				x1 = 0;
			}
			if(x1 != x1 || y1 != y1) {
				throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
			}
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
				ret.x = x1;
				ret.y = y1;
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
				if(x1 != x1 || y1 != y1) {
					throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
				}
				let ret;
				if(ret1 != null && ret1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = ret1.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				if(ret1.zpp_inner.x == x1) {
					if(ret1 != null && ret1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this = ret1.zpp_inner;
					if(_this._validate != null) {
						_this._validate();
					}
					ret = ret1.zpp_inner.y == y1;
				} else {
					ret = false;
				}
				if(!ret) {
					ret1.zpp_inner.x = x1;
					ret1.zpp_inner.y = y1;
					let _this = ret1.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
			}
			ret1.zpp_inner.weak = weak1;
			ret = ret1;
		}
		if(point.zpp_inner.weak) {
			if(point != null && point.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = point.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(point.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = point.zpp_inner;
			point.zpp_inner.outer = null;
			point.zpp_inner = null;
			let o = point;
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
		}
		return ret;
	}
	inverseTransform(point,noTranslation,weak) {
		if(weak == null) {
			weak = false;
		}
		if(noTranslation == null) {
			noTranslation = false;
		}
		if(point != null && point.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(point == null) {
			throw haxe_Exception.thrown("Error: Cannot transform null Vec2");
		}
		if(this.singular()) {
			throw haxe_Exception.thrown("Error: Matrix is singular and inverse transformation cannot be performed");
		}
		let idet = 1.0 / (this.zpp_inner.a * this.zpp_inner.d - this.zpp_inner.b * this.zpp_inner.c);
		let ret;
		if(noTranslation) {
			if(point != null && point.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = point.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let x = point.zpp_inner.x * this.zpp_inner.d;
			if(point != null && point.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = point.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			let x1 = (x - point.zpp_inner.y * this.zpp_inner.b) * idet;
			if(point != null && point.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = point.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			let y = point.zpp_inner.y * this.zpp_inner.a;
			if(point != null && point.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = point.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			let y1 = (y - point.zpp_inner.x * this.zpp_inner.c) * idet;
			let weak1 = weak;
			if(weak1 == null) {
				weak1 = false;
			}
			if(y1 == null) {
				y1 = 0;
			}
			if(x1 == null) {
				x1 = 0;
			}
			if(x1 != x1 || y1 != y1) {
				throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
			}
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
				ret.x = x1;
				ret.y = y1;
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
				if(x1 != x1 || y1 != y1) {
					throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
				}
				let ret;
				if(ret1 != null && ret1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = ret1.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				if(ret1.zpp_inner.x == x1) {
					if(ret1 != null && ret1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this = ret1.zpp_inner;
					if(_this._validate != null) {
						_this._validate();
					}
					ret = ret1.zpp_inner.y == y1;
				} else {
					ret = false;
				}
				if(!ret) {
					ret1.zpp_inner.x = x1;
					ret1.zpp_inner.y = y1;
					let _this = ret1.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
			}
			ret1.zpp_inner.weak = weak1;
			ret = ret1;
		} else {
			if(point != null && point.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = point.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let dx = point.zpp_inner.x - this.zpp_inner.tx;
			if(point != null && point.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = point.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			let dy = point.zpp_inner.y - this.zpp_inner.ty;
			let x = (dx * this.zpp_inner.d - dy * this.zpp_inner.b) * idet;
			let y = (dy * this.zpp_inner.a - dx * this.zpp_inner.c) * idet;
			let weak1 = weak;
			if(weak1 == null) {
				weak1 = false;
			}
			if(y == null) {
				y = 0;
			}
			if(x == null) {
				x = 0;
			}
			if(x != x || y != y) {
				throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
			}
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
				ret.x = x;
				ret.y = y;
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
				if(x != x || y != y) {
					throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
				}
				let ret;
				if(ret1 != null && ret1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = ret1.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				if(ret1.zpp_inner.x == x) {
					if(ret1 != null && ret1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this = ret1.zpp_inner;
					if(_this._validate != null) {
						_this._validate();
					}
					ret = ret1.zpp_inner.y == y;
				} else {
					ret = false;
				}
				if(!ret) {
					ret1.zpp_inner.x = x;
					ret1.zpp_inner.y = y;
					let _this = ret1.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
			}
			ret1.zpp_inner.weak = weak1;
			ret = ret1;
		}
		if(point.zpp_inner.weak) {
			if(point != null && point.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = point.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(point.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = point.zpp_inner;
			point.zpp_inner.outer = null;
			point.zpp_inner = null;
			let o = point;
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
		}
		return ret;
	}
	toString() {
		return "{ a: " + this.zpp_inner.a + " b: " + this.zpp_inner.b + " c: " + this.zpp_inner.c + " d: " + this.zpp_inner.d + " tx: " + this.zpp_inner.tx + " ty: " + this.zpp_inner.ty + " }";
	}
	equiorthogonal() {
		if(this.singular()) {
			return false;
		} else {
			let x = this.zpp_inner.a * this.zpp_inner.b + this.zpp_inner.c * this.zpp_inner.d;
			if(x * x < Config.epsilon) {
				let y = this.zpp_inner.a * this.zpp_inner.a + this.zpp_inner.b * this.zpp_inner.b - this.zpp_inner.c * this.zpp_inner.c - this.zpp_inner.d * this.zpp_inner.d;
				return y * y < Config.epsilon;
			} else {
				return false;
			}
		}
	}
	orthogonal() {
		let x = this.zpp_inner.a * this.zpp_inner.b + this.zpp_inner.c * this.zpp_inner.d;
		if(x * x < Config.epsilon) {
			let y = this.zpp_inner.a * this.zpp_inner.a + this.zpp_inner.b * this.zpp_inner.b - 1;
			let z = this.zpp_inner.c * this.zpp_inner.c + this.zpp_inner.d * this.zpp_inner.d - 1;
			if(y * y < Config.epsilon) {
				return z * z < Config.epsilon;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	equiorthogonalise() {
		if(!this.equiorthogonal()) {
			let k1 = Math.sqrt(this.zpp_inner.a * this.zpp_inner.a + this.zpp_inner.c * this.zpp_inner.c);
			let k2 = Math.sqrt(this.zpp_inner.b * this.zpp_inner.b + this.zpp_inner.d * this.zpp_inner.d);
			if(k1 * k1 < Config.epsilon || k2 * k2 < Config.epsilon) {
				throw haxe_Exception.thrown("Error: Matrix is singular and cannot be " + "equiorthogonal" + "ised");
			}
			let k = (k1 + k2) / 2;
			k1 = k / k1;
			k2 = k / k2;
			let a = this.zpp_inner.a * k1;
			if(a != a) {
				throw haxe_Exception.thrown("Error: Mat23::" + "a" + " cannot be NaN");
			}
			this.zpp_inner.a = a;
			let _this = this.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate();
			}
			let c = this.zpp_inner.c * k1;
			if(c != c) {
				throw haxe_Exception.thrown("Error: Mat23::" + "c" + " cannot be NaN");
			}
			this.zpp_inner.c = c;
			let _this1 = this.zpp_inner;
			if(_this1._invalidate != null) {
				_this1._invalidate();
			}
			let b = this.zpp_inner.b * k2;
			if(b != b) {
				throw haxe_Exception.thrown("Error: Mat23::" + "b" + " cannot be NaN");
			}
			this.zpp_inner.b = b;
			let _this2 = this.zpp_inner;
			if(_this2._invalidate != null) {
				_this2._invalidate();
			}
			let d = this.zpp_inner.d * k2;
			if(d != d) {
				throw haxe_Exception.thrown("Error: Mat23::" + "d" + " cannot be NaN");
			}
			this.zpp_inner.d = d;
			let _this3 = this.zpp_inner;
			if(_this3._invalidate != null) {
				_this3._invalidate();
			}
			let dot = this.zpp_inner.a * this.zpp_inner.b + this.zpp_inner.c * this.zpp_inner.d;
			let ang = 0.25 * Math.PI - 0.5 * Math.acos(dot / (k * k));
			if(this.zpp_inner.a * this.zpp_inner.d - this.zpp_inner.b * this.zpp_inner.c > 0) {
				ang = -ang;
			}
			let sin = Math.sin(ang);
			let cos = Math.cos(ang);
			let a2 = this.zpp_inner.a * cos - this.zpp_inner.c * sin;
			let b2 = this.zpp_inner.b * cos + this.zpp_inner.d * sin;
			let c1 = this.zpp_inner.c * cos + this.zpp_inner.a * sin;
			if(c1 != c1) {
				throw haxe_Exception.thrown("Error: Mat23::" + "c" + " cannot be NaN");
			}
			this.zpp_inner.c = c1;
			let _this4 = this.zpp_inner;
			if(_this4._invalidate != null) {
				_this4._invalidate();
			}
			if(a2 != a2) {
				throw haxe_Exception.thrown("Error: Mat23::" + "a" + " cannot be NaN");
			}
			this.zpp_inner.a = a2;
			let _this5 = this.zpp_inner;
			if(_this5._invalidate != null) {
				_this5._invalidate();
			}
			let d1 = this.zpp_inner.d * cos - this.zpp_inner.b * sin;
			if(d1 != d1) {
				throw haxe_Exception.thrown("Error: Mat23::" + "d" + " cannot be NaN");
			}
			this.zpp_inner.d = d1;
			let _this6 = this.zpp_inner;
			if(_this6._invalidate != null) {
				_this6._invalidate();
			}
			if(b2 != b2) {
				throw haxe_Exception.thrown("Error: Mat23::" + "b" + " cannot be NaN");
			}
			this.zpp_inner.b = b2;
			let _this7 = this.zpp_inner;
			if(_this7._invalidate != null) {
				_this7._invalidate();
			}
			let _this8 = this.zpp_inner;
			if(_this8._invalidate != null) {
				_this8._invalidate();
			}
		}
		return this;
	}
	orthogonalise() {
		if(!this.orthogonal()) {
			let k1 = Math.sqrt(this.zpp_inner.a * this.zpp_inner.a + this.zpp_inner.c * this.zpp_inner.c);
			let k2 = Math.sqrt(this.zpp_inner.b * this.zpp_inner.b + this.zpp_inner.d * this.zpp_inner.d);
			if(k1 * k1 < Config.epsilon || k2 * k2 < Config.epsilon) {
				throw haxe_Exception.thrown("Error: Matrix is singular and cannot be " + "orthogonal" + "ised");
			}
			let k = 1;
			k1 = k / k1;
			k2 = k / k2;
			let a = this.zpp_inner.a * k1;
			if(a != a) {
				throw haxe_Exception.thrown("Error: Mat23::" + "a" + " cannot be NaN");
			}
			this.zpp_inner.a = a;
			let _this = this.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate();
			}
			let c = this.zpp_inner.c * k1;
			if(c != c) {
				throw haxe_Exception.thrown("Error: Mat23::" + "c" + " cannot be NaN");
			}
			this.zpp_inner.c = c;
			let _this1 = this.zpp_inner;
			if(_this1._invalidate != null) {
				_this1._invalidate();
			}
			let b = this.zpp_inner.b * k2;
			if(b != b) {
				throw haxe_Exception.thrown("Error: Mat23::" + "b" + " cannot be NaN");
			}
			this.zpp_inner.b = b;
			let _this2 = this.zpp_inner;
			if(_this2._invalidate != null) {
				_this2._invalidate();
			}
			let d = this.zpp_inner.d * k2;
			if(d != d) {
				throw haxe_Exception.thrown("Error: Mat23::" + "d" + " cannot be NaN");
			}
			this.zpp_inner.d = d;
			let _this3 = this.zpp_inner;
			if(_this3._invalidate != null) {
				_this3._invalidate();
			}
			let dot = this.zpp_inner.a * this.zpp_inner.b + this.zpp_inner.c * this.zpp_inner.d;
			let ang = 0.25 * Math.PI - 0.5 * Math.acos(dot / (k * k));
			if(this.zpp_inner.a * this.zpp_inner.d - this.zpp_inner.b * this.zpp_inner.c > 0) {
				ang = -ang;
			}
			let sin = Math.sin(ang);
			let cos = Math.cos(ang);
			let a2 = this.zpp_inner.a * cos - this.zpp_inner.c * sin;
			let b2 = this.zpp_inner.b * cos + this.zpp_inner.d * sin;
			let c1 = this.zpp_inner.c * cos + this.zpp_inner.a * sin;
			if(c1 != c1) {
				throw haxe_Exception.thrown("Error: Mat23::" + "c" + " cannot be NaN");
			}
			this.zpp_inner.c = c1;
			let _this4 = this.zpp_inner;
			if(_this4._invalidate != null) {
				_this4._invalidate();
			}
			if(a2 != a2) {
				throw haxe_Exception.thrown("Error: Mat23::" + "a" + " cannot be NaN");
			}
			this.zpp_inner.a = a2;
			let _this5 = this.zpp_inner;
			if(_this5._invalidate != null) {
				_this5._invalidate();
			}
			let d1 = this.zpp_inner.d * cos - this.zpp_inner.b * sin;
			if(d1 != d1) {
				throw haxe_Exception.thrown("Error: Mat23::" + "d" + " cannot be NaN");
			}
			this.zpp_inner.d = d1;
			let _this6 = this.zpp_inner;
			if(_this6._invalidate != null) {
				_this6._invalidate();
			}
			if(b2 != b2) {
				throw haxe_Exception.thrown("Error: Mat23::" + "b" + " cannot be NaN");
			}
			this.zpp_inner.b = b2;
			let _this7 = this.zpp_inner;
			if(_this7._invalidate != null) {
				_this7._invalidate();
			}
			let _this8 = this.zpp_inner;
			if(_this8._invalidate != null) {
				_this8._invalidate();
			}
		}
		return this;
	}
	static rotation(angle) {
		if(angle != angle) {
			throw haxe_Exception.thrown("Error: Cannot create rotation matrix with NaN angle");
		}
		let cos = Math.cos(angle);
		let sin = Math.sin(angle);
		return new Mat23(cos,-sin,sin,cos,0,0);
	}
	static translation(tx,ty) {
		return new Mat23(1,0,0,1,tx,ty);
	}
	static scale(sx,sy) {
		return new Mat23(sx,0,0,sy,0,0);
	}
}
