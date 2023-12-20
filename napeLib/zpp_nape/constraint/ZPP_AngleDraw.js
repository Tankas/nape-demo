import ZPP_PubPool from '../util/ZPP_PubPool.js';
import ZPP_Vec2 from '../geom/ZPP_Vec2.js';
import Vec2 from '../../nape/geom/Vec2.js';
import Config from '../../nape/Config.js';
export default class ZPP_AngleDraw {
	static indicator(g,c,ang,rad,col) {
		let x = Math.cos(ang);
		let y = Math.sin(ang);
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
		let dir = ret;
		g.drawFilledCircle(c.add(dir.mul(rad,true),true),2,col);
		if(dir != null && dir.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = dir.zpp_inner;
		if(_this._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this._isimmutable != null) {
			_this._isimmutable();
		}
		if(dir.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner = dir.zpp_inner;
		dir.zpp_inner.outer = null;
		dir.zpp_inner = null;
		let o = dir;
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
	static drawSpiralSpring(g,c,a0,a1,r0,r1,col,coils) {
		if(coils == null) {
			coils = 4;
		}
		if(a0 > a1) {
			let t = a0;
			a0 = a1;
			a1 = t;
			let t1 = r0;
			r0 = r1;
			r1 = t1;
		}
		if(a0 == a1) {
			return;
		}
		let dr = r1 - r0;
		let da = a1 - a0;
		let x = 2 * Math.PI * dr / da;
		let Delta = x < 0 ? -x : x;
		let x1 = Math.ceil(da / ZPP_AngleDraw.maxarc * 3);
		let y = 4 * coils;
		let dcnt = x1 > y ? x1 : y;
		let drad = dr / dcnt;
		let dang = da / dcnt;
		let dtime = 1 / dcnt;
		let c0 = Math.cos(a0);
		let s0 = Math.sin(a0);
		let p = r0 + dr * 0;
		let R0 = p + 0.75 * Delta * Math.sin(2 * coils * Math.PI * 0);
		if(c != null && c.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = c.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let x2 = c.zpp_inner.x + R0 * c0;
		if(c != null && c.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = c.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let y1 = c.zpp_inner.y + R0 * s0;
		if(y1 == null) {
			y1 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		if(x2 != x2 || y1 != y1) {
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
			ret1.x = x2;
			ret1.y = y1;
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
			if(x2 != x2 || y1 != y1) {
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
			if(ret.zpp_inner.x == x2) {
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = ret.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				tmp = ret.zpp_inner.y == y1;
			} else {
				tmp = false;
			}
			if(!tmp) {
				ret.zpp_inner.x = x2;
				ret.zpp_inner.y = y1;
				let _this = ret.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
		}
		ret.zpp_inner.weak = false;
		let p0 = ret;
		let DR = dr + 1.5 * coils * Delta * Math.PI * Math.cos(2 * coils * Math.PI * 0);
		let ux = DR * c0 - R0 * da * s0;
		let uy = DR * s0 + R0 * da * c0;
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
		let p1 = ret1;
		let ret2;
		if(ZPP_PubPool.poolVec2 == null) {
			ret2 = new Vec2();
		} else {
			ret2 = ZPP_PubPool.poolVec2;
			ZPP_PubPool.poolVec2 = ret2.zpp_pool;
			ret2.zpp_pool = null;
			ret2.zpp_disp = false;
			if(ret2 == ZPP_PubPool.nextVec2) {
				ZPP_PubPool.nextVec2 = null;
			}
		}
		if(ret2.zpp_inner == null) {
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
			ret2.zpp_inner = ret;
			ret2.zpp_inner.outer = ret2;
		} else {
			if(ret2 != null && ret2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = ret2.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			let tmp;
			if(ret2 != null && ret2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = ret2.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			if(ret2.zpp_inner.x == 0) {
				if(ret2 != null && ret2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = ret2.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				tmp = ret2.zpp_inner.y == 0;
			} else {
				tmp = false;
			}
			if(!tmp) {
				ret2.zpp_inner.x = 0;
				ret2.zpp_inner.y = 0;
				let _this = ret2.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
		}
		ret2.zpp_inner.weak = false;
		let ct = ret2;
		let _g = 0;
		let _g1 = dcnt;
		while(_g < _g1) {
			let i = _g++;
			let a1 = a0 + dang;
			let c1 = Math.cos(a1);
			let s1 = Math.sin(a1);
			let p = r0 + dr * (i + 1) * dtime;
			let R1 = p + 0.75 * Delta * Math.sin(2 * coils * Math.PI * (i + 1) * dtime);
			if(c != null && c.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = c.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let x = c.zpp_inner.x + R1 * c1;
			if(c != null && c.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = c.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			let y = c.zpp_inner.y + R1 * s1;
			if(p1 != null && p1.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = p1.zpp_inner;
			if(_this2._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this2._isimmutable != null) {
				_this2._isimmutable();
			}
			if(x != x || y != y) {
				throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
			}
			let tmp;
			if(p1 != null && p1.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = p1.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			if(p1.zpp_inner.x == x) {
				if(p1 != null && p1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = p1.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				tmp = p1.zpp_inner.y == y;
			} else {
				tmp = false;
			}
			if(!tmp) {
				p1.zpp_inner.x = x;
				p1.zpp_inner.y = y;
				let _this = p1.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
			let DR = dr + 1.5 * coils * Delta * Math.PI * Math.cos(2 * coils * Math.PI * (i + 1) * dtime);
			let vx = DR * c1 - R1 * da * s1;
			let vy = DR * s1 + R1 * da * c1;
			let den = ux * vy - uy * vx;
			if(den * den < Config.epsilon || ux * vx + uy * vy <= 0 || ux * vx + uy * vy > 0.999) {
				g.drawLine(p0,p1,col);
			} else {
				if(p1 != null && p1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = p1.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				let t = p1.zpp_inner.x;
				if(p0 != null && p0.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = p0.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				let t1 = (t - p0.zpp_inner.x) * vy;
				if(p0 != null && p0.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this2 = p0.zpp_inner;
				if(_this2._validate != null) {
					_this2._validate();
				}
				let t2 = p0.zpp_inner.y;
				if(p1 != null && p1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this3 = p1.zpp_inner;
				if(_this3._validate != null) {
					_this3._validate();
				}
				let t3 = (t1 + (t2 - p1.zpp_inner.y) * vx) / den;
				if(t3 <= 0) {
					g.drawLine(p0,p1,col);
				} else {
					if(p0 != null && p0.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this = p0.zpp_inner;
					if(_this._validate != null) {
						_this._validate();
					}
					let x = p0.zpp_inner.x + ux * t3;
					if(ct != null && ct.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this1 = ct.zpp_inner;
					if(_this1._immutable) {
						throw haxe_Exception.thrown("Error: Vec2 is immutable");
					}
					if(_this1._isimmutable != null) {
						_this1._isimmutable();
					}
					if(ct != null && ct.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this2 = ct.zpp_inner;
					if(_this2._validate != null) {
						_this2._validate();
					}
					if(ct.zpp_inner.x != x) {
						if(x != x) {
							throw haxe_Exception.thrown("Error: Vec2::" + "x" + " cannot be NaN");
						}
						ct.zpp_inner.x = x;
						let _this = ct.zpp_inner;
						if(_this._invalidate != null) {
							_this._invalidate(_this);
						}
					}
					if(ct != null && ct.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this3 = ct.zpp_inner;
					if(_this3._validate != null) {
						_this3._validate();
					}
					if(p0 != null && p0.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this4 = p0.zpp_inner;
					if(_this4._validate != null) {
						_this4._validate();
					}
					let y = p0.zpp_inner.y + uy * t3;
					if(ct != null && ct.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this5 = ct.zpp_inner;
					if(_this5._immutable) {
						throw haxe_Exception.thrown("Error: Vec2 is immutable");
					}
					if(_this5._isimmutable != null) {
						_this5._isimmutable();
					}
					if(ct != null && ct.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this6 = ct.zpp_inner;
					if(_this6._validate != null) {
						_this6._validate();
					}
					if(ct.zpp_inner.y != y) {
						if(y != y) {
							throw haxe_Exception.thrown("Error: Vec2::" + "y" + " cannot be NaN");
						}
						ct.zpp_inner.y = y;
						let _this = ct.zpp_inner;
						if(_this._invalidate != null) {
							_this._invalidate(_this);
						}
					}
					if(ct != null && ct.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this7 = ct.zpp_inner;
					if(_this7._validate != null) {
						_this7._validate();
					}
					g.drawCurve(p0,ct,p1,col);
				}
			}
			a0 = a1;
			c0 = c1;
			s0 = s1;
			ux = vx;
			uy = vy;
			if(p0 != null && p0.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			if(p1 != null && p1.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this4 = p0.zpp_inner;
			if(_this4._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this4._isimmutable != null) {
				_this4._isimmutable();
			}
			if(p1 == null) {
				throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
			}
			if(p1 != null && p1.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this5 = p1.zpp_inner;
			if(_this5._validate != null) {
				_this5._validate();
			}
			let x1 = p1.zpp_inner.x;
			if(p1 != null && p1.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this6 = p1.zpp_inner;
			if(_this6._validate != null) {
				_this6._validate();
			}
			let y1 = p1.zpp_inner.y;
			if(p0 != null && p0.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this7 = p0.zpp_inner;
			if(_this7._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this7._isimmutable != null) {
				_this7._isimmutable();
			}
			if(x1 != x1 || y1 != y1) {
				throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
			}
			let tmp1;
			if(p0 != null && p0.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this8 = p0.zpp_inner;
			if(_this8._validate != null) {
				_this8._validate();
			}
			if(p0.zpp_inner.x == x1) {
				if(p0 != null && p0.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = p0.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				tmp1 = p0.zpp_inner.y == y1;
			} else {
				tmp1 = false;
			}
			if(!tmp1) {
				p0.zpp_inner.x = x1;
				p0.zpp_inner.y = y1;
				let _this = p0.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
			let ret = p0;
			if(p1.zpp_inner.weak) {
				if(p1 != null && p1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = p1.zpp_inner;
				if(_this._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this._isimmutable != null) {
					_this._isimmutable();
				}
				if(p1.zpp_inner._inuse) {
					throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
				}
				let inner = p1.zpp_inner;
				p1.zpp_inner.outer = null;
				p1.zpp_inner = null;
				let o = p1;
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
		}
		if(p0 != null && p0.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = p0.zpp_inner;
		if(_this2._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this2._isimmutable != null) {
			_this2._isimmutable();
		}
		if(p0.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner = p0.zpp_inner;
		p0.zpp_inner.outer = null;
		p0.zpp_inner = null;
		let o = p0;
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
		if(p1 != null && p1.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = p1.zpp_inner;
		if(_this3._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this3._isimmutable != null) {
			_this3._isimmutable();
		}
		if(p1.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner1 = p1.zpp_inner;
		p1.zpp_inner.outer = null;
		p1.zpp_inner = null;
		let o2 = p1;
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
		if(ct != null && ct.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = ct.zpp_inner;
		if(_this4._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this4._isimmutable != null) {
			_this4._isimmutable();
		}
		if(ct.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner2 = ct.zpp_inner;
		ct.zpp_inner.outer = null;
		ct.zpp_inner = null;
		let o4 = ct;
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
	}
	static drawSpiral(g,c,a0,a1,r0,r1,col) {
		if(a0 > a1) {
			let t = a0;
			a0 = a1;
			a1 = t;
			let t1 = r0;
			r0 = r1;
			r1 = t1;
		}
		if(a0 == a1) {
			return;
		}
		let dr = r1 - r0;
		let da = a1 - a0;
		let dcnt = Math.ceil(da / ZPP_AngleDraw.maxarc);
		let drad = dr / dcnt;
		let dang = da / dcnt;
		let c0 = Math.cos(a0);
		let s0 = Math.sin(a0);
		if(c != null && c.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = c.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let x = c.zpp_inner.x + r0 * c0;
		if(c != null && c.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = c.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let y = c.zpp_inner.y + r0 * s0;
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
		let p0 = ret;
		let ux = dr * c0 - r0 * da * s0;
		let uy = dr * s0 + r0 * da * c0;
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
		let p1 = ret1;
		let ret2;
		if(ZPP_PubPool.poolVec2 == null) {
			ret2 = new Vec2();
		} else {
			ret2 = ZPP_PubPool.poolVec2;
			ZPP_PubPool.poolVec2 = ret2.zpp_pool;
			ret2.zpp_pool = null;
			ret2.zpp_disp = false;
			if(ret2 == ZPP_PubPool.nextVec2) {
				ZPP_PubPool.nextVec2 = null;
			}
		}
		if(ret2.zpp_inner == null) {
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
			ret2.zpp_inner = ret;
			ret2.zpp_inner.outer = ret2;
		} else {
			if(ret2 != null && ret2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = ret2.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			let tmp;
			if(ret2 != null && ret2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = ret2.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			if(ret2.zpp_inner.x == 0) {
				if(ret2 != null && ret2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = ret2.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				tmp = ret2.zpp_inner.y == 0;
			} else {
				tmp = false;
			}
			if(!tmp) {
				ret2.zpp_inner.x = 0;
				ret2.zpp_inner.y = 0;
				let _this = ret2.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
		}
		ret2.zpp_inner.weak = false;
		let ct = ret2;
		let _g = 0;
		let _g1 = dcnt;
		while(_g < _g1) {
			let i = _g++;
			let r1 = r0 + drad;
			let a1 = a0 + dang;
			let c1 = Math.cos(a1);
			let s1 = Math.sin(a1);
			if(c != null && c.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = c.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let x = c.zpp_inner.x + r1 * c1;
			if(c != null && c.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = c.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			let y = c.zpp_inner.y + r1 * s1;
			if(p1 != null && p1.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = p1.zpp_inner;
			if(_this2._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this2._isimmutable != null) {
				_this2._isimmutable();
			}
			if(x != x || y != y) {
				throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
			}
			let tmp;
			if(p1 != null && p1.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = p1.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			if(p1.zpp_inner.x == x) {
				if(p1 != null && p1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = p1.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				tmp = p1.zpp_inner.y == y;
			} else {
				tmp = false;
			}
			if(!tmp) {
				p1.zpp_inner.x = x;
				p1.zpp_inner.y = y;
				let _this = p1.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
			let vx = dr * c1 - r1 * da * s1;
			let vy = dr * s1 + r1 * da * c1;
			let den = ux * vy - uy * vx;
			if(den * den < Config.epsilon) {
				g.drawLine(p0,p1,col);
			} else {
				if(p1 != null && p1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = p1.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				let t = p1.zpp_inner.x;
				if(p0 != null && p0.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = p0.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				let t1 = (t - p0.zpp_inner.x) * vy;
				if(p0 != null && p0.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this2 = p0.zpp_inner;
				if(_this2._validate != null) {
					_this2._validate();
				}
				let t2 = p0.zpp_inner.y;
				if(p1 != null && p1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this3 = p1.zpp_inner;
				if(_this3._validate != null) {
					_this3._validate();
				}
				let t3 = (t1 + (t2 - p1.zpp_inner.y) * vx) / den;
				if(t3 <= 0) {
					g.drawLine(p0,p1,col);
				} else {
					if(p0 != null && p0.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this = p0.zpp_inner;
					if(_this._validate != null) {
						_this._validate();
					}
					let x = p0.zpp_inner.x + ux * t3;
					if(ct != null && ct.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this1 = ct.zpp_inner;
					if(_this1._immutable) {
						throw haxe_Exception.thrown("Error: Vec2 is immutable");
					}
					if(_this1._isimmutable != null) {
						_this1._isimmutable();
					}
					if(ct != null && ct.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this2 = ct.zpp_inner;
					if(_this2._validate != null) {
						_this2._validate();
					}
					if(ct.zpp_inner.x != x) {
						if(x != x) {
							throw haxe_Exception.thrown("Error: Vec2::" + "x" + " cannot be NaN");
						}
						ct.zpp_inner.x = x;
						let _this = ct.zpp_inner;
						if(_this._invalidate != null) {
							_this._invalidate(_this);
						}
					}
					if(ct != null && ct.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this3 = ct.zpp_inner;
					if(_this3._validate != null) {
						_this3._validate();
					}
					if(p0 != null && p0.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this4 = p0.zpp_inner;
					if(_this4._validate != null) {
						_this4._validate();
					}
					let y = p0.zpp_inner.y + uy * t3;
					if(ct != null && ct.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this5 = ct.zpp_inner;
					if(_this5._immutable) {
						throw haxe_Exception.thrown("Error: Vec2 is immutable");
					}
					if(_this5._isimmutable != null) {
						_this5._isimmutable();
					}
					if(ct != null && ct.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this6 = ct.zpp_inner;
					if(_this6._validate != null) {
						_this6._validate();
					}
					if(ct.zpp_inner.y != y) {
						if(y != y) {
							throw haxe_Exception.thrown("Error: Vec2::" + "y" + " cannot be NaN");
						}
						ct.zpp_inner.y = y;
						let _this = ct.zpp_inner;
						if(_this._invalidate != null) {
							_this._invalidate(_this);
						}
					}
					if(ct != null && ct.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this7 = ct.zpp_inner;
					if(_this7._validate != null) {
						_this7._validate();
					}
					g.drawCurve(p0,ct,p1,col);
				}
			}
			r0 = r1;
			a0 = a1;
			c0 = c1;
			s0 = s1;
			ux = vx;
			uy = vy;
			if(p0 != null && p0.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			if(p1 != null && p1.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this4 = p0.zpp_inner;
			if(_this4._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this4._isimmutable != null) {
				_this4._isimmutable();
			}
			if(p1 == null) {
				throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
			}
			if(p1 != null && p1.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this5 = p1.zpp_inner;
			if(_this5._validate != null) {
				_this5._validate();
			}
			let x1 = p1.zpp_inner.x;
			if(p1 != null && p1.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this6 = p1.zpp_inner;
			if(_this6._validate != null) {
				_this6._validate();
			}
			let y1 = p1.zpp_inner.y;
			if(p0 != null && p0.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this7 = p0.zpp_inner;
			if(_this7._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this7._isimmutable != null) {
				_this7._isimmutable();
			}
			if(x1 != x1 || y1 != y1) {
				throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
			}
			let tmp1;
			if(p0 != null && p0.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this8 = p0.zpp_inner;
			if(_this8._validate != null) {
				_this8._validate();
			}
			if(p0.zpp_inner.x == x1) {
				if(p0 != null && p0.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = p0.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				tmp1 = p0.zpp_inner.y == y1;
			} else {
				tmp1 = false;
			}
			if(!tmp1) {
				p0.zpp_inner.x = x1;
				p0.zpp_inner.y = y1;
				let _this = p0.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
			let ret = p0;
			if(p1.zpp_inner.weak) {
				if(p1 != null && p1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = p1.zpp_inner;
				if(_this._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this._isimmutable != null) {
					_this._isimmutable();
				}
				if(p1.zpp_inner._inuse) {
					throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
				}
				let inner = p1.zpp_inner;
				p1.zpp_inner.outer = null;
				p1.zpp_inner = null;
				let o = p1;
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
		}
		if(p0 != null && p0.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = p0.zpp_inner;
		if(_this2._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this2._isimmutable != null) {
			_this2._isimmutable();
		}
		if(p0.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner = p0.zpp_inner;
		p0.zpp_inner.outer = null;
		p0.zpp_inner = null;
		let o = p0;
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
		if(p1 != null && p1.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = p1.zpp_inner;
		if(_this3._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this3._isimmutable != null) {
			_this3._isimmutable();
		}
		if(p1.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner1 = p1.zpp_inner;
		p1.zpp_inner.outer = null;
		p1.zpp_inner = null;
		let o2 = p1;
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
		if(ct != null && ct.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = ct.zpp_inner;
		if(_this4._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this4._isimmutable != null) {
			_this4._isimmutable();
		}
		if(ct.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner2 = ct.zpp_inner;
		ct.zpp_inner.outer = null;
		ct.zpp_inner = null;
		let o4 = ct;
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
	}
}
ZPP_AngleDraw.maxarc = Math.PI / 4;
