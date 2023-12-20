import ZPP_PubPool from '../util/ZPP_PubPool.js';
import ZPP_Vec2 from '../geom/ZPP_Vec2.js';
import ZPP_CopyHelper from './ZPP_CopyHelper.js';
import ZPP_Constraint from './ZPP_Constraint.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import Vec3 from '../../nape/geom/Vec3.js';
import Vec2 from '../../nape/geom/Vec2.js';
import PulleyJoint from '../../nape/constraint/PulleyJoint.js';
import Config from '../../nape/Config.js';
export default class ZPP_PulleyJoint extends ZPP_Constraint {
	constructor() {
		ZPP_Constraint._hx_skip_constructor = true;
		super();
		ZPP_Constraint._hx_skip_constructor = false;
		this._hx_constructor();
	}
	_hx_constructor() {
		this.stepped = false;
		this.bias = 0.0;
		this.gamma = 0.0;
		this.jMax = 0.0;
		this.jAcc = 0.0;
		this.kMass = 0.0;
		this.wrap_a4 = null;
		this.a4rely = 0.0;
		this.a4relx = 0.0;
		this.a4localy = 0.0;
		this.a4localx = 0.0;
		this.b4 = null;
		this.wrap_a3 = null;
		this.a3rely = 0.0;
		this.a3relx = 0.0;
		this.a3localy = 0.0;
		this.a3localx = 0.0;
		this.b3 = null;
		this.wrap_a2 = null;
		this.a2rely = 0.0;
		this.a2relx = 0.0;
		this.a2localy = 0.0;
		this.a2localx = 0.0;
		this.b2 = null;
		this.wrap_a1 = null;
		this.a1rely = 0.0;
		this.a1relx = 0.0;
		this.a1localy = 0.0;
		this.a1localx = 0.0;
		this.b1 = null;
		this.cx4 = 0.0;
		this.cx3 = 0.0;
		this.cx2 = 0.0;
		this.cx1 = 0.0;
		this.n34y = 0.0;
		this.n34x = 0.0;
		this.n12y = 0.0;
		this.n12x = 0.0;
		this.equal = false;
		this.slack = false;
		this.jointMax = 0.0;
		this.jointMin = 0.0;
		this.ratio = 1.0;
		this.outer_zn = null;
		super._hx_constructor();
		this.a1localx = 0;
		this.a1localy = 0;
		this.a1relx = 0;
		this.a1rely = 0;
		this.a2localx = 0;
		this.a2localy = 0;
		this.a2relx = 0;
		this.a2rely = 0;
		this.a3localx = 0;
		this.a3localy = 0;
		this.a3relx = 0;
		this.a3rely = 0;
		this.a4localx = 0;
		this.a4localy = 0;
		this.a4relx = 0;
		this.a4rely = 0;
		this.n12x = 1;
		this.n12y = 0;
		this.n34x = 1;
		this.n34y = 0;
		this.jAcc = 0;
		this.jMax = Infinity;
		this.stepped = false;
		this.cx1 = this.cx2 = this.cx3 = this.cx4 = 0;
	}
	is_slack() {
		let slack;
		this.a1relx = this.b1.axisy * this.a1localx - this.b1.axisx * this.a1localy;
		this.a1rely = this.a1localx * this.b1.axisx + this.a1localy * this.b1.axisy;
		this.a2relx = this.b2.axisy * this.a2localx - this.b2.axisx * this.a2localy;
		this.a2rely = this.a2localx * this.b2.axisx + this.a2localy * this.b2.axisy;
		this.a3relx = this.b3.axisy * this.a3localx - this.b3.axisx * this.a3localy;
		this.a3rely = this.a3localx * this.b3.axisx + this.a3localy * this.b3.axisy;
		this.a4relx = this.b4.axisy * this.a4localx - this.b4.axisx * this.a4localy;
		this.a4rely = this.a4localx * this.b4.axisx + this.a4localy * this.b4.axisy;
		let n12x = 0.0;
		let n12y = 0.0;
		let n34x = 0.0;
		let n34y = 0.0;
		let t12x = 0.0;
		let t12y = 0.0;
		let t34x = 0.0;
		let t34y = 0.0;
		t12x = this.b2.posx + this.a2relx - (this.b1.posx + this.a1relx);
		t12y = this.b2.posy + this.a2rely - (this.b1.posy + this.a1rely);
		t34x = this.b4.posx + this.a4relx - (this.b3.posx + this.a3relx);
		t34y = this.b4.posy + this.a4rely - (this.b3.posy + this.a3rely);
		let C12 = Math.sqrt(t12x * t12x + t12y * t12y);
		let C34 = Math.sqrt(t34x * t34x + t34y * t34y);
		if(C12 != 0) {
			let t = 1.0 / C12;
			n12x = t12x * t;
			n12y = t12y * t;
		}
		if(C34 != 0) {
			let t = 1.0 / C34;
			n34x = t34x * t;
			n34y = t34y * t;
			let t1 = this.ratio;
			n34x *= t1;
			n34y *= t1;
		} else {
			let t = this.ratio / Math.sqrt(n34x * n34x + n34y * n34y);
			n34x *= t;
			n34y *= t;
		}
		let C = C12 + this.ratio * C34;
		if(this.equal) {
			C -= this.jointMax;
			slack = false;
		} else if(C < this.jointMin) {
			C = this.jointMin - C;
			n12x = -n12x;
			n12y = -n12y;
			n34x = -n34x;
			n34y = -n34y;
			slack = false;
		} else if(C > this.jointMax) {
			C -= this.jointMax;
			slack = false;
		} else {
			n12x = 0;
			n12y = 0;
			n34x = 0;
			n34y = 0;
			C = 0;
			slack = true;
		}
		return slack;
	}
	bodyImpulse(b) {
		if(this.stepped) {
			let ret = Vec3.get();
			if(b == this.b1) {
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this = ret.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				let x = ret.zpp_inner.x - this.jAcc * this.n12x;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				if(ret.zpp_inner.immutable) {
					throw haxe_Exception.thrown("Error: Vec3 is immutable");
				}
				ret.zpp_inner.x = x;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this1 = ret.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this2 = ret.zpp_inner;
				if(_this2._validate != null) {
					_this2._validate();
				}
				let y = ret.zpp_inner.y - this.jAcc * this.n12y;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				if(ret.zpp_inner.immutable) {
					throw haxe_Exception.thrown("Error: Vec3 is immutable");
				}
				ret.zpp_inner.y = y;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this3 = ret.zpp_inner;
				if(_this3._validate != null) {
					_this3._validate();
				}
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this4 = ret.zpp_inner;
				if(_this4._validate != null) {
					_this4._validate();
				}
				let z = ret.zpp_inner.z - this.cx1 * this.jAcc;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				if(ret.zpp_inner.immutable) {
					throw haxe_Exception.thrown("Error: Vec3 is immutable");
				}
				ret.zpp_inner.z = z;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this5 = ret.zpp_inner;
				if(_this5._validate != null) {
					_this5._validate();
				}
			}
			if(b == this.b2) {
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this = ret.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				let x = ret.zpp_inner.x + this.jAcc * this.n12x;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				if(ret.zpp_inner.immutable) {
					throw haxe_Exception.thrown("Error: Vec3 is immutable");
				}
				ret.zpp_inner.x = x;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this1 = ret.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this2 = ret.zpp_inner;
				if(_this2._validate != null) {
					_this2._validate();
				}
				let y = ret.zpp_inner.y + this.jAcc * this.n12y;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				if(ret.zpp_inner.immutable) {
					throw haxe_Exception.thrown("Error: Vec3 is immutable");
				}
				ret.zpp_inner.y = y;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this3 = ret.zpp_inner;
				if(_this3._validate != null) {
					_this3._validate();
				}
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this4 = ret.zpp_inner;
				if(_this4._validate != null) {
					_this4._validate();
				}
				let z = ret.zpp_inner.z + this.cx2 * this.jAcc;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				if(ret.zpp_inner.immutable) {
					throw haxe_Exception.thrown("Error: Vec3 is immutable");
				}
				ret.zpp_inner.z = z;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this5 = ret.zpp_inner;
				if(_this5._validate != null) {
					_this5._validate();
				}
			}
			if(b == this.b3) {
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this = ret.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				let x = ret.zpp_inner.x - this.jAcc * this.n34x;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				if(ret.zpp_inner.immutable) {
					throw haxe_Exception.thrown("Error: Vec3 is immutable");
				}
				ret.zpp_inner.x = x;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this1 = ret.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this2 = ret.zpp_inner;
				if(_this2._validate != null) {
					_this2._validate();
				}
				let y = ret.zpp_inner.y - this.jAcc * this.n34y;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				if(ret.zpp_inner.immutable) {
					throw haxe_Exception.thrown("Error: Vec3 is immutable");
				}
				ret.zpp_inner.y = y;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this3 = ret.zpp_inner;
				if(_this3._validate != null) {
					_this3._validate();
				}
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this4 = ret.zpp_inner;
				if(_this4._validate != null) {
					_this4._validate();
				}
				let z = ret.zpp_inner.z - this.cx3 * this.jAcc;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				if(ret.zpp_inner.immutable) {
					throw haxe_Exception.thrown("Error: Vec3 is immutable");
				}
				ret.zpp_inner.z = z;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this5 = ret.zpp_inner;
				if(_this5._validate != null) {
					_this5._validate();
				}
			}
			if(b == this.b4) {
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this = ret.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				let x = ret.zpp_inner.x + this.jAcc * this.n34x;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				if(ret.zpp_inner.immutable) {
					throw haxe_Exception.thrown("Error: Vec3 is immutable");
				}
				ret.zpp_inner.x = x;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this1 = ret.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this2 = ret.zpp_inner;
				if(_this2._validate != null) {
					_this2._validate();
				}
				let y = ret.zpp_inner.y + this.jAcc * this.n34y;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				if(ret.zpp_inner.immutable) {
					throw haxe_Exception.thrown("Error: Vec3 is immutable");
				}
				ret.zpp_inner.y = y;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this3 = ret.zpp_inner;
				if(_this3._validate != null) {
					_this3._validate();
				}
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this4 = ret.zpp_inner;
				if(_this4._validate != null) {
					_this4._validate();
				}
				let z = ret.zpp_inner.z + this.cx4 * this.jAcc;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				if(ret.zpp_inner.immutable) {
					throw haxe_Exception.thrown("Error: Vec3 is immutable");
				}
				ret.zpp_inner.z = z;
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this5 = ret.zpp_inner;
				if(_this5._validate != null) {
					_this5._validate();
				}
			}
			return ret;
		} else {
			return Vec3.get(0,0,0);
		}
	}
	activeBodies() {
		if(this.b1 != null) {
			this.b1.constraints.add(this);
		}
		if(this.b2 != this.b1) {
			if(this.b2 != null) {
				this.b2.constraints.add(this);
			}
		}
		if(this.b3 != this.b1 && this.b3 != this.b2) {
			if(this.b3 != null) {
				this.b3.constraints.add(this);
			}
		}
		if(this.b4 != this.b1 && this.b4 != this.b2 && this.b4 != this.b3) {
			if(this.b4 != null) {
				this.b4.constraints.add(this);
			}
		}
	}
	inactiveBodies() {
		if(this.b1 != null) {
			this.b1.constraints.remove(this);
		}
		if(this.b2 != this.b1) {
			if(this.b2 != null) {
				this.b2.constraints.remove(this);
			}
		}
		if(this.b3 != this.b1 && this.b3 != this.b2) {
			if(this.b3 != null) {
				this.b3.constraints.remove(this);
			}
		}
		if(this.b4 != this.b1 && this.b4 != this.b2 && this.b4 != this.b3) {
			if(this.b4 != null) {
				this.b4.constraints.remove(this);
			}
		}
	}
	validate_a1() {
		this.wrap_a1.zpp_inner.x = this.a1localx;
		this.wrap_a1.zpp_inner.y = this.a1localy;
	}
	invalidate_a1(x) {
		this.immutable_midstep("Constraint::" + "a1");
		this.a1localx = x.x;
		this.a1localy = x.y;
		this.wake();
	}
	setup_a1() {
		let x = this.a1localx;
		let y = this.a1localy;
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
		this.wrap_a1 = ret;
		this.wrap_a1.zpp_inner._inuse = true;
		this.wrap_a1.zpp_inner._validate = $bind(this,this.validate_a1);
		this.wrap_a1.zpp_inner._invalidate = $bind(this,this.invalidate_a1);
	}
	validate_a2() {
		this.wrap_a2.zpp_inner.x = this.a2localx;
		this.wrap_a2.zpp_inner.y = this.a2localy;
	}
	invalidate_a2(x) {
		this.immutable_midstep("Constraint::" + "a2");
		this.a2localx = x.x;
		this.a2localy = x.y;
		this.wake();
	}
	setup_a2() {
		let x = this.a2localx;
		let y = this.a2localy;
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
		this.wrap_a2 = ret;
		this.wrap_a2.zpp_inner._inuse = true;
		this.wrap_a2.zpp_inner._validate = $bind(this,this.validate_a2);
		this.wrap_a2.zpp_inner._invalidate = $bind(this,this.invalidate_a2);
	}
	validate_a3() {
		this.wrap_a3.zpp_inner.x = this.a3localx;
		this.wrap_a3.zpp_inner.y = this.a3localy;
	}
	invalidate_a3(x) {
		this.immutable_midstep("Constraint::" + "a3");
		this.a3localx = x.x;
		this.a3localy = x.y;
		this.wake();
	}
	setup_a3() {
		let x = this.a3localx;
		let y = this.a3localy;
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
		this.wrap_a3 = ret;
		this.wrap_a3.zpp_inner._inuse = true;
		this.wrap_a3.zpp_inner._validate = $bind(this,this.validate_a3);
		this.wrap_a3.zpp_inner._invalidate = $bind(this,this.invalidate_a3);
	}
	validate_a4() {
		this.wrap_a4.zpp_inner.x = this.a4localx;
		this.wrap_a4.zpp_inner.y = this.a4localy;
	}
	invalidate_a4(x) {
		this.immutable_midstep("Constraint::" + "a4");
		this.a4localx = x.x;
		this.a4localy = x.y;
		this.wake();
	}
	setup_a4() {
		let x = this.a4localx;
		let y = this.a4localy;
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
		this.wrap_a4 = ret;
		this.wrap_a4.zpp_inner._inuse = true;
		this.wrap_a4.zpp_inner._validate = $bind(this,this.validate_a4);
		this.wrap_a4.zpp_inner._invalidate = $bind(this,this.invalidate_a4);
	}
	copy(dict,todo) {
		let _this = this.outer_zn;
		if(_this.zpp_inner_zn.wrap_a1 == null) {
			_this.zpp_inner_zn.setup_a1();
		}
		let ret = _this.zpp_inner_zn.wrap_a1;
		let _this1 = this.outer_zn;
		if(_this1.zpp_inner_zn.wrap_a2 == null) {
			_this1.zpp_inner_zn.setup_a2();
		}
		let ret1 = _this1.zpp_inner_zn.wrap_a2;
		let _this2 = this.outer_zn;
		if(_this2.zpp_inner_zn.wrap_a3 == null) {
			_this2.zpp_inner_zn.setup_a3();
		}
		let ret2 = _this2.zpp_inner_zn.wrap_a3;
		let _this3 = this.outer_zn;
		if(_this3.zpp_inner_zn.wrap_a4 == null) {
			_this3.zpp_inner_zn.setup_a4();
		}
		let ret3 = new PulleyJoint(null,null,null,null,ret,ret1,ret2,_this3.zpp_inner_zn.wrap_a4,this.jointMin,this.jointMax,this.ratio);
		this.copyto(ret3);
		if(dict != null && this.b1 != null) {
			let b = null;
			let _g = 0;
			while(_g < dict.length) {
				let idc = dict[_g];
				++_g;
				if(idc.id == this.b1.id) {
					b = idc.bc;
					break;
				}
			}
			if(b != null) {
				ret3.zpp_inner_zn.b1 = b.zpp_inner;
			} else {
				todo.push(ZPP_CopyHelper.todo(this.b1.id,function(b) {
					ret3.zpp_inner_zn.b1 = b.zpp_inner;
				}));
			}
		}
		if(dict != null && this.b2 != null) {
			let b = null;
			let _g = 0;
			while(_g < dict.length) {
				let idc = dict[_g];
				++_g;
				if(idc.id == this.b2.id) {
					b = idc.bc;
					break;
				}
			}
			if(b != null) {
				ret3.zpp_inner_zn.b2 = b.zpp_inner;
			} else {
				todo.push(ZPP_CopyHelper.todo(this.b2.id,function(b) {
					ret3.zpp_inner_zn.b2 = b.zpp_inner;
				}));
			}
		}
		if(dict != null && this.b3 != null) {
			let b = null;
			let _g = 0;
			while(_g < dict.length) {
				let idc = dict[_g];
				++_g;
				if(idc.id == this.b3.id) {
					b = idc.bc;
					break;
				}
			}
			if(b != null) {
				ret3.zpp_inner_zn.b3 = b.zpp_inner;
			} else {
				todo.push(ZPP_CopyHelper.todo(this.b3.id,function(b) {
					ret3.zpp_inner_zn.b3 = b.zpp_inner;
				}));
			}
		}
		if(dict != null && this.b4 != null) {
			let b = null;
			let _g = 0;
			while(_g < dict.length) {
				let idc = dict[_g];
				++_g;
				if(idc.id == this.b4.id) {
					b = idc.bc;
					break;
				}
			}
			if(b != null) {
				ret3.zpp_inner_zn.b4 = b.zpp_inner;
			} else {
				todo.push(ZPP_CopyHelper.todo(this.b4.id,function(b) {
					ret3.zpp_inner_zn.b4 = b.zpp_inner;
				}));
			}
		}
		return ret3;
	}
	validate() {
		if(this.b1 == null || this.b2 == null || this.b3 == null || this.b4 == null) {
			throw haxe_Exception.thrown("Error: PulleyJoint cannot be simulated with null bodies");
		}
		if(this.b1 == this.b2 || this.b3 == this.b4) {
			throw haxe_Exception.thrown("Error: PulleyJoint cannot have body1==body2 or body3==body4");
		}
		if(this.b1.space != this.space || this.b2.space != this.space || this.b3.space != this.space || this.b4.space != this.space) {
			throw haxe_Exception.thrown("Error: Constraints must have each body within the same space to which the constraint has been assigned");
		}
		if(this.jointMin > this.jointMax) {
			throw haxe_Exception.thrown("Error: PulleyJoint must have jointMin <= jointMax");
		}
		if(this.b1.type != ZPP_Flags.id_BodyType_DYNAMIC && this.b2.type != ZPP_Flags.id_BodyType_DYNAMIC) {
			throw haxe_Exception.thrown("Error: PulleyJoint cannot have both bodies in a linked pair non-dynamic");
		}
		if(this.b3.type != ZPP_Flags.id_BodyType_DYNAMIC && this.b4.type != ZPP_Flags.id_BodyType_DYNAMIC) {
			throw haxe_Exception.thrown("Error: PulleyJoint cannot have both bodies in a linked pair non-dynamic");
		}
	}
	wake_connected() {
		if(this.b1 != null && this.b1.type == ZPP_Flags.id_BodyType_DYNAMIC) {
			this.b1.wake();
		}
		if(this.b2 != null && this.b2.type == ZPP_Flags.id_BodyType_DYNAMIC) {
			this.b2.wake();
		}
		if(this.b3 != null && this.b3.type == ZPP_Flags.id_BodyType_DYNAMIC) {
			this.b3.wake();
		}
		if(this.b4 != null && this.b4.type == ZPP_Flags.id_BodyType_DYNAMIC) {
			this.b4.wake();
		}
	}
	forest() {
		if(this.b1.type == ZPP_Flags.id_BodyType_DYNAMIC) {
			let xr;
			if(this.b1.component == this.b1.component.parent) {
				xr = this.b1.component;
			} else {
				let obj = this.b1.component;
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
			if(this.component == this.component.parent) {
				yr = this.component;
			} else {
				let obj = this.component;
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
		if(this.b2.type == ZPP_Flags.id_BodyType_DYNAMIC) {
			let xr;
			if(this.b2.component == this.b2.component.parent) {
				xr = this.b2.component;
			} else {
				let obj = this.b2.component;
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
			if(this.component == this.component.parent) {
				yr = this.component;
			} else {
				let obj = this.component;
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
		if(this.b3.type == ZPP_Flags.id_BodyType_DYNAMIC) {
			let xr;
			if(this.b3.component == this.b3.component.parent) {
				xr = this.b3.component;
			} else {
				let obj = this.b3.component;
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
			if(this.component == this.component.parent) {
				yr = this.component;
			} else {
				let obj = this.component;
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
		if(this.b4.type == ZPP_Flags.id_BodyType_DYNAMIC) {
			let xr;
			if(this.b4.component == this.b4.component.parent) {
				xr = this.b4.component;
			} else {
				let obj = this.b4.component;
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
			if(this.component == this.component.parent) {
				yr = this.component;
			} else {
				let obj = this.component;
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
	}
	pair_exists(id,di) {
		if(!(this.b1.id == id && (this.b2.id == di || this.b3.id == di || this.b4.id == di) || this.b2.id == id && (this.b3.id == di || this.b4.id == di || this.b1.id == di) || this.b3.id == id && (this.b4.id == di || this.b1.id == di || this.b2.id == di))) {
			if(this.b4.id == id) {
				if(!(this.b1.id == di || this.b2.id == di)) {
					return this.b3.id == di;
				} else {
					return true;
				}
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	clearcache() {
		this.jAcc = 0;
		this.pre_dt = -1.0;
	}
	preStep(dt) {
		if(this.pre_dt == -1.0) {
			this.pre_dt = dt;
		}
		let dtratio = dt / this.pre_dt;
		this.pre_dt = dt;
		this.stepped = true;
		this.equal = this.jointMin == this.jointMax;
		this.a1relx = this.b1.axisy * this.a1localx - this.b1.axisx * this.a1localy;
		this.a1rely = this.a1localx * this.b1.axisx + this.a1localy * this.b1.axisy;
		this.a2relx = this.b2.axisy * this.a2localx - this.b2.axisx * this.a2localy;
		this.a2rely = this.a2localx * this.b2.axisx + this.a2localy * this.b2.axisy;
		this.a3relx = this.b3.axisy * this.a3localx - this.b3.axisx * this.a3localy;
		this.a3rely = this.a3localx * this.b3.axisx + this.a3localy * this.b3.axisy;
		this.a4relx = this.b4.axisy * this.a4localx - this.b4.axisx * this.a4localy;
		this.a4rely = this.a4localx * this.b4.axisx + this.a4localy * this.b4.axisy;
		let t12x = 0.0;
		let t12y = 0.0;
		let t34x = 0.0;
		let t34y = 0.0;
		t12x = this.b2.posx + this.a2relx - (this.b1.posx + this.a1relx);
		t12y = this.b2.posy + this.a2rely - (this.b1.posy + this.a1rely);
		t34x = this.b4.posx + this.a4relx - (this.b3.posx + this.a3relx);
		t34y = this.b4.posy + this.a4rely - (this.b3.posy + this.a3rely);
		let C12 = Math.sqrt(t12x * t12x + t12y * t12y);
		let C34 = Math.sqrt(t34x * t34x + t34y * t34y);
		if(C12 != 0) {
			let t = 1.0 / C12;
			this.n12x = t12x * t;
			this.n12y = t12y * t;
		}
		if(C34 != 0) {
			let t = 1.0 / C34;
			this.n34x = t34x * t;
			this.n34y = t34y * t;
			let t1 = this.ratio;
			this.n34x *= t1;
			this.n34y *= t1;
		} else {
			let t = this.ratio / Math.sqrt(this.n34x * this.n34x + this.n34y * this.n34y);
			this.n34x *= t;
			this.n34y *= t;
		}
		let C = C12 + this.ratio * C34;
		if(this.equal) {
			C -= this.jointMax;
			this.slack = false;
		} else if(C < this.jointMin) {
			C = this.jointMin - C;
			this.n12x = -this.n12x;
			this.n12y = -this.n12y;
			this.n34x = -this.n34x;
			this.n34y = -this.n34y;
			this.slack = false;
		} else if(C > this.jointMax) {
			C -= this.jointMax;
			this.slack = false;
		} else {
			this.n12x = 0;
			this.n12y = 0;
			this.n34x = 0;
			this.n34y = 0;
			C = 0;
			this.slack = true;
		}
		let C1 = C;
		if(!this.slack) {
			this.cx1 = this.n12y * this.a1relx - this.n12x * this.a1rely;
			this.cx2 = this.n12y * this.a2relx - this.n12x * this.a2rely;
			this.cx3 = this.n34y * this.a3relx - this.n34x * this.a3rely;
			this.cx4 = this.n34y * this.a4relx - this.n34x * this.a4rely;
			let ratioSq = this.ratio * this.ratio;
			let K = this.b1.smass + this.b2.smass + ratioSq * (this.b3.smass + this.b4.smass) + this.b1.sinertia * this.cx1 * this.cx1 + this.b2.sinertia * this.cx2 * this.cx2 + this.b3.sinertia * this.cx3 * this.cx3 + this.b4.sinertia * this.cx4 * this.cx4;
			if(this.b1 == this.b4) {
				K -= 2 * ((this.n12x * this.n34x + this.n12y * this.n34y) * this.b1.smass + this.cx1 * this.cx4 * this.b1.sinertia);
			}
			if(this.b1 == this.b3) {
				K += 2 * ((this.n12x * this.n34x + this.n12y * this.n34y) * this.b1.smass + this.cx1 * this.cx3 * this.b1.sinertia);
			}
			if(this.b2 == this.b3) {
				K -= 2 * ((this.n12x * this.n34x + this.n12y * this.n34y) * this.b2.smass + this.cx2 * this.cx3 * this.b2.sinertia);
			}
			if(this.b2 == this.b4) {
				K += 2 * ((this.n12x * this.n34x + this.n12y * this.n34y) * this.b2.smass + this.cx2 * this.cx4 * this.b2.sinertia);
			}
			this.kMass = K;
			if(this.kMass != 0) {
				this.kMass = 1 / this.kMass;
			} else {
				this.jAcc = 0;
			}
			if(!this.stiff) {
				if(this.breakUnderError && C1 * C1 > this.maxError * this.maxError) {
					return true;
				}
				let omega = 2 * Math.PI * this.frequency;
				this.gamma = 1 / (dt * omega * (2 * this.damping + omega * dt));
				let ig = 1 / (1 + this.gamma);
				let biasCoef = dt * omega * omega * this.gamma;
				this.gamma *= ig;
				this.kMass *= ig;
				this.bias = -C1 * biasCoef;
				if(this.bias < -this.maxError) {
					this.bias = -this.maxError;
				} else if(this.bias > this.maxError) {
					this.bias = this.maxError;
				}
			} else {
				this.bias = 0;
				this.gamma = 0;
			}
			this.jAcc *= dtratio;
			this.jMax = this.maxForce * dt;
		}
		return false;
	}
	warmStart() {
		if(!this.slack) {
			let t = this.b1.imass * this.jAcc;
			this.b1.velx -= this.n12x * t;
			this.b1.vely -= this.n12y * t;
			let t1 = this.b2.imass * this.jAcc;
			this.b2.velx += this.n12x * t1;
			this.b2.vely += this.n12y * t1;
			let t2 = this.b3.imass * this.jAcc;
			this.b3.velx -= this.n34x * t2;
			this.b3.vely -= this.n34y * t2;
			let t3 = this.b4.imass * this.jAcc;
			this.b4.velx += this.n34x * t3;
			this.b4.vely += this.n34y * t3;
			this.b1.angvel -= this.cx1 * this.b1.iinertia * this.jAcc;
			this.b2.angvel += this.cx2 * this.b2.iinertia * this.jAcc;
			this.b3.angvel -= this.cx3 * this.b3.iinertia * this.jAcc;
			this.b4.angvel += this.cx4 * this.b4.iinertia * this.jAcc;
		}
	}
	applyImpulseVel() {
		if(this.slack) {
			return false;
		}
		let E = this.n12x * (this.b2.velx + this.b2.kinvelx - this.b1.velx - this.b1.kinvelx) + this.n12y * (this.b2.vely + this.b2.kinvely - this.b1.vely - this.b1.kinvely) + this.n34x * (this.b4.velx + this.b4.kinvelx - this.b3.velx - this.b3.kinvelx) + this.n34y * (this.b4.vely + this.b4.kinvely - this.b3.vely - this.b3.kinvely) + (this.b2.angvel + this.b2.kinangvel) * this.cx2 - (this.b1.angvel + this.b1.kinangvel) * this.cx1 + (this.b4.angvel + this.b4.kinangvel) * this.cx4 - (this.b3.angvel + this.b3.kinangvel) * this.cx3;
		let j = this.kMass * (this.bias - E) - this.jAcc * this.gamma;
		let jOld = this.jAcc;
		this.jAcc += j;
		if(!this.equal && this.jAcc > 0) {
			this.jAcc = 0;
		}
		if(this.breakUnderForce && this.jAcc < -this.jMax) {
			return true;
		}
		if(!this.stiff) {
			if(this.jAcc < -this.jMax) {
				this.jAcc = -this.jMax;
			}
		}
		j = this.jAcc - jOld;
		let t = this.b1.imass * j;
		this.b1.velx -= this.n12x * t;
		this.b1.vely -= this.n12y * t;
		let t1 = this.b2.imass * j;
		this.b2.velx += this.n12x * t1;
		this.b2.vely += this.n12y * t1;
		let t2 = this.b3.imass * j;
		this.b3.velx -= this.n34x * t2;
		this.b3.vely -= this.n34y * t2;
		let t3 = this.b4.imass * j;
		this.b4.velx += this.n34x * t3;
		this.b4.vely += this.n34y * t3;
		this.b1.angvel -= this.cx1 * this.b1.iinertia * j;
		this.b2.angvel += this.cx2 * this.b2.iinertia * j;
		this.b3.angvel -= this.cx3 * this.b3.iinertia * j;
		this.b4.angvel += this.cx4 * this.b4.iinertia * j;
		return false;
	}
	applyImpulsePos() {
		let j;
		let r1x = 0.0;
		let r1y = 0.0;
		r1x = this.b1.axisy * this.a1localx - this.b1.axisx * this.a1localy;
		r1y = this.a1localx * this.b1.axisx + this.a1localy * this.b1.axisy;
		let r2x = 0.0;
		let r2y = 0.0;
		r2x = this.b2.axisy * this.a2localx - this.b2.axisx * this.a2localy;
		r2y = this.a2localx * this.b2.axisx + this.a2localy * this.b2.axisy;
		let r3x = 0.0;
		let r3y = 0.0;
		r3x = this.b3.axisy * this.a3localx - this.b3.axisx * this.a3localy;
		r3y = this.a3localx * this.b3.axisx + this.a3localy * this.b3.axisy;
		let r4x = 0.0;
		let r4y = 0.0;
		r4x = this.b4.axisy * this.a4localx - this.b4.axisx * this.a4localy;
		r4y = this.a4localx * this.b4.axisx + this.a4localy * this.b4.axisy;
		let slack;
		let n12x = 0.0;
		let n12y = 0.0;
		let n34x = 0.0;
		let n34y = 0.0;
		n12x = this.n12x;
		n12y = this.n12y;
		n34x = this.n34x;
		n34y = this.n34y;
		let t12x = 0.0;
		let t12y = 0.0;
		let t34x = 0.0;
		let t34y = 0.0;
		t12x = this.b2.posx + r2x - (this.b1.posx + r1x);
		t12y = this.b2.posy + r2y - (this.b1.posy + r1y);
		t34x = this.b4.posx + r4x - (this.b3.posx + r3x);
		t34y = this.b4.posy + r4y - (this.b3.posy + r3y);
		let C12 = Math.sqrt(t12x * t12x + t12y * t12y);
		let C34 = Math.sqrt(t34x * t34x + t34y * t34y);
		if(C12 != 0) {
			let t = 1.0 / C12;
			n12x = t12x * t;
			n12y = t12y * t;
		}
		if(C34 != 0) {
			let t = 1.0 / C34;
			n34x = t34x * t;
			n34y = t34y * t;
			let t1 = this.ratio;
			n34x *= t1;
			n34y *= t1;
		} else {
			let t = this.ratio / Math.sqrt(n34x * n34x + n34y * n34y);
			n34x *= t;
			n34y *= t;
		}
		let C = C12 + this.ratio * C34;
		if(this.equal) {
			C -= this.jointMax;
			slack = false;
		} else if(C < this.jointMin) {
			C = this.jointMin - C;
			n12x = -n12x;
			n12y = -n12y;
			n34x = -n34x;
			n34y = -n34y;
			slack = false;
		} else if(C > this.jointMax) {
			C -= this.jointMax;
			slack = false;
		} else {
			n12x = 0;
			n12y = 0;
			n34x = 0;
			n34y = 0;
			C = 0;
			slack = true;
		}
		let E = C;
		if(!slack) {
			if(this.breakUnderError && E * E > this.maxError * this.maxError) {
				return true;
			}
			if(E * E < Config.constraintLinearSlop * Config.constraintLinearSlop) {
				return false;
			}
			E *= 0.5;
			if(E * E > 6) {
				let k = this.b1.smass + this.b2.smass;
				if(k > Config.epsilon) {
					k = 0.75 / k;
					j = -E * k;
					if(this.equal || j < 0) {
						let t = j * this.b1.imass;
						this.b1.posx -= n12x * t;
						this.b1.posy -= n12y * t;
						let t1 = j * this.b2.imass;
						this.b2.posx += n12x * t1;
						this.b2.posy += n12y * t1;
						let t2 = j * this.b3.imass;
						this.b3.posx -= n34x * t2;
						this.b3.posy -= n34y * t2;
						let t3 = j * this.b4.imass;
						this.b4.posx += n34x * t3;
						this.b4.posy += n34y * t3;
						let t12x = 0.0;
						let t12y = 0.0;
						let t34x = 0.0;
						let t34y = 0.0;
						t12x = this.b2.posx + r2x - (this.b1.posx + r1x);
						t12y = this.b2.posy + r2y - (this.b1.posy + r1y);
						t34x = this.b4.posx + r4x - (this.b3.posx + r3x);
						t34y = this.b4.posy + r4y - (this.b3.posy + r3y);
						let C12 = Math.sqrt(t12x * t12x + t12y * t12y);
						let C34 = Math.sqrt(t34x * t34x + t34y * t34y);
						if(C12 != 0) {
							let t = 1.0 / C12;
							n12x = t12x * t;
							n12y = t12y * t;
						}
						if(C34 != 0) {
							let t = 1.0 / C34;
							n34x = t34x * t;
							n34y = t34y * t;
							let t1 = this.ratio;
							n34x *= t1;
							n34y *= t1;
						} else {
							let t = this.ratio / Math.sqrt(n34x * n34x + n34y * n34y);
							n34x *= t;
							n34y *= t;
						}
						let C = C12 + this.ratio * C34;
						if(this.equal) {
							C -= this.jointMax;
							slack = false;
						} else if(C < this.jointMin) {
							C = this.jointMin - C;
							n12x = -n12x;
							n12y = -n12y;
							n34x = -n34x;
							n34y = -n34y;
							slack = false;
						} else if(C > this.jointMax) {
							C -= this.jointMax;
							slack = false;
						} else {
							n12x = 0;
							n12y = 0;
							n34x = 0;
							n34y = 0;
							C = 0;
							slack = true;
						}
						E = C;
						E *= 0.5;
					}
				}
			}
			let cx1 = n12y * r1x - n12x * r1y;
			let cx2 = n12y * r2x - n12x * r2y;
			let cx3 = n34y * r3x - n34x * r3y;
			let cx4 = n34y * r4x - n34x * r4y;
			let ratioSq = this.ratio * this.ratio;
			let K = this.b1.smass + this.b2.smass + ratioSq * (this.b3.smass + this.b4.smass) + this.b1.sinertia * cx1 * cx1 + this.b2.sinertia * cx2 * cx2 + this.b3.sinertia * cx3 * cx3 + this.b4.sinertia * cx4 * cx4;
			if(this.b1 == this.b4) {
				K -= 2 * ((n12x * n34x + n12y * n34y) * this.b1.smass + cx1 * cx4 * this.b1.sinertia);
			}
			if(this.b1 == this.b3) {
				K += 2 * ((n12x * n34x + n12y * n34y) * this.b1.smass + cx1 * cx3 * this.b1.sinertia);
			}
			if(this.b2 == this.b3) {
				K -= 2 * ((n12x * n34x + n12y * n34y) * this.b2.smass + cx2 * cx3 * this.b2.sinertia);
			}
			if(this.b2 == this.b4) {
				K += 2 * ((n12x * n34x + n12y * n34y) * this.b2.smass + cx2 * cx4 * this.b2.sinertia);
			}
			let k = K;
			if(k != 0) {
				k = 1 / k;
			}
			j = -E * k;
			if(this.equal || j < 0) {
				let t = this.b1.imass * j;
				this.b1.posx -= n12x * t;
				this.b1.posy -= n12y * t;
				let t1 = this.b2.imass * j;
				this.b2.posx += n12x * t1;
				this.b2.posy += n12y * t1;
				let t2 = this.b3.imass * j;
				this.b3.posx -= n34x * t2;
				this.b3.posy -= n34y * t2;
				let t3 = this.b4.imass * j;
				this.b4.posx += n34x * t3;
				this.b4.posy += n34y * t3;
				let _this = this.b1;
				let dr = -cx1 * this.b1.iinertia * j;
				_this.rot += dr;
				if(dr * dr > 0.0001) {
					_this.axisx = Math.sin(_this.rot);
					_this.axisy = Math.cos(_this.rot);
				} else {
					let d2 = dr * dr;
					let p = 1 - 0.5 * d2;
					let m = 1 - d2 * d2 / 8;
					let nx = (p * _this.axisx + dr * _this.axisy) * m;
					_this.axisy = (p * _this.axisy - dr * _this.axisx) * m;
					_this.axisx = nx;
				}
				let _this1 = this.b2;
				let dr1 = cx2 * this.b2.iinertia * j;
				_this1.rot += dr1;
				if(dr1 * dr1 > 0.0001) {
					_this1.axisx = Math.sin(_this1.rot);
					_this1.axisy = Math.cos(_this1.rot);
				} else {
					let d2 = dr1 * dr1;
					let p = 1 - 0.5 * d2;
					let m = 1 - d2 * d2 / 8;
					let nx = (p * _this1.axisx + dr1 * _this1.axisy) * m;
					_this1.axisy = (p * _this1.axisy - dr1 * _this1.axisx) * m;
					_this1.axisx = nx;
				}
				let _this2 = this.b3;
				let dr2 = -cx3 * this.b3.iinertia * j;
				_this2.rot += dr2;
				if(dr2 * dr2 > 0.0001) {
					_this2.axisx = Math.sin(_this2.rot);
					_this2.axisy = Math.cos(_this2.rot);
				} else {
					let d2 = dr2 * dr2;
					let p = 1 - 0.5 * d2;
					let m = 1 - d2 * d2 / 8;
					let nx = (p * _this2.axisx + dr2 * _this2.axisy) * m;
					_this2.axisy = (p * _this2.axisy - dr2 * _this2.axisx) * m;
					_this2.axisx = nx;
				}
				let _this3 = this.b4;
				let dr3 = cx4 * this.b4.iinertia * j;
				_this3.rot += dr3;
				if(dr3 * dr3 > 0.0001) {
					_this3.axisx = Math.sin(_this3.rot);
					_this3.axisy = Math.cos(_this3.rot);
				} else {
					let d2 = dr3 * dr3;
					let p = 1 - 0.5 * d2;
					let m = 1 - d2 * d2 / 8;
					let nx = (p * _this3.axisx + dr3 * _this3.axisy) * m;
					_this3.axisy = (p * _this3.axisy - dr3 * _this3.axisx) * m;
					_this3.axisx = nx;
				}
			}
		}
		return false;
	}
	draw(g) {
		let me = this.outer_zn;
		let a1 = me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer;
		if(me.zpp_inner_zn.wrap_a1 == null) {
			me.zpp_inner_zn.setup_a1();
		}
		let a11 = a1.localPointToWorld(me.zpp_inner_zn.wrap_a1);
		let a2 = me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer;
		if(me.zpp_inner_zn.wrap_a2 == null) {
			me.zpp_inner_zn.setup_a2();
		}
		let a21 = a2.localPointToWorld(me.zpp_inner_zn.wrap_a2);
		let a3 = me.zpp_inner_zn.b3 == null ? null : me.zpp_inner_zn.b3.outer;
		if(me.zpp_inner_zn.wrap_a3 == null) {
			me.zpp_inner_zn.setup_a3();
		}
		let a31 = a3.localPointToWorld(me.zpp_inner_zn.wrap_a3);
		let a4 = me.zpp_inner_zn.b4 == null ? null : me.zpp_inner_zn.b4.outer;
		if(me.zpp_inner_zn.wrap_a4 == null) {
			me.zpp_inner_zn.setup_a4();
		}
		let a41 = a4.localPointToWorld(me.zpp_inner_zn.wrap_a4);
		let n12 = a21.sub(a11);
		let n34 = a41.sub(a31);
		if(n12 != null && n12.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(n12 != null && n12.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = n12.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let nl12 = n12.zpp_inner.x;
		if(n12 != null && n12.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = n12.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let nl121 = nl12 * n12.zpp_inner.x;
		if(n12 != null && n12.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = n12.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let nl122 = n12.zpp_inner.y;
		if(n12 != null && n12.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = n12.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let nl123 = Math.sqrt(nl121 + nl122 * n12.zpp_inner.y);
		if(n34 != null && n34.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(n34 != null && n34.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = n34.zpp_inner;
		if(_this4._validate != null) {
			_this4._validate();
		}
		let nl34 = n34.zpp_inner.x;
		if(n34 != null && n34.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this5 = n34.zpp_inner;
		if(_this5._validate != null) {
			_this5._validate();
		}
		let nl341 = nl34 * n34.zpp_inner.x;
		if(n34 != null && n34.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this6 = n34.zpp_inner;
		if(_this6._validate != null) {
			_this6._validate();
		}
		let nl342 = n34.zpp_inner.y;
		if(n34 != null && n34.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this7 = n34.zpp_inner;
		if(_this7._validate != null) {
			_this7._validate();
		}
		let nl343 = Math.sqrt(nl341 + nl342 * n34.zpp_inner.y);
		this.drawLink(g,a11,a21,n12,nl123,nl343 * this.ratio,1.0,16776960,65535);
		this.drawLink(g,a31,a41,n34,nl343,nl123,1 / this.ratio,65535,16711935);
		g.drawFilledCircle(a11,2,255);
		g.drawFilledCircle(a21,2,16711680);
		g.drawFilledCircle(a31,2,65280);
		g.drawFilledCircle(a41,2,16711935);
		if(a11 != null && a11.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this8 = a11.zpp_inner;
		if(_this8._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this8._isimmutable != null) {
			_this8._isimmutable();
		}
		if(a11.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner = a11.zpp_inner;
		a11.zpp_inner.outer = null;
		a11.zpp_inner = null;
		let o = a11;
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
		if(a21 != null && a21.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this9 = a21.zpp_inner;
		if(_this9._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this9._isimmutable != null) {
			_this9._isimmutable();
		}
		if(a21.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner1 = a21.zpp_inner;
		a21.zpp_inner.outer = null;
		a21.zpp_inner = null;
		let o2 = a21;
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
		if(a31 != null && a31.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this10 = a31.zpp_inner;
		if(_this10._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this10._isimmutable != null) {
			_this10._isimmutable();
		}
		if(a31.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner2 = a31.zpp_inner;
		a31.zpp_inner.outer = null;
		a31.zpp_inner = null;
		let o4 = a31;
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
		if(a41 != null && a41.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this11 = a41.zpp_inner;
		if(_this11._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this11._isimmutable != null) {
			_this11._isimmutable();
		}
		if(a41.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner3 = a41.zpp_inner;
		a41.zpp_inner.outer = null;
		a41.zpp_inner = null;
		let o6 = a41;
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
		if(n12 != null && n12.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this12 = n12.zpp_inner;
		if(_this12._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this12._isimmutable != null) {
			_this12._isimmutable();
		}
		if(n12.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner4 = n12.zpp_inner;
		n12.zpp_inner.outer = null;
		n12.zpp_inner = null;
		let o8 = n12;
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
		if(n34 != null && n34.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this13 = n34.zpp_inner;
		if(_this13._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this13._isimmutable != null) {
			_this13._isimmutable();
		}
		if(n34.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner5 = n34.zpp_inner;
		n34.zpp_inner.outer = null;
		n34.zpp_inner = null;
		let o10 = n34;
		o10.zpp_pool = null;
		if(ZPP_PubPool.nextVec2 != null) {
			ZPP_PubPool.nextVec2.zpp_pool = o10;
		} else {
			ZPP_PubPool.poolVec2 = o10;
		}
		ZPP_PubPool.nextVec2 = o10;
		o10.zpp_disp = true;
		let o11 = inner5;
		if(o11.outer != null) {
			o11.outer.zpp_inner = null;
			o11.outer = null;
		}
		o11._isimmutable = null;
		o11._validate = null;
		o11._invalidate = null;
		o11.next = ZPP_Vec2.zpp_pool;
		ZPP_Vec2.zpp_pool = o11;
	}
	drawLink(g,a1,a2,n,nl,bias,scale,ca,cb) {
		if(nl != 0) {
			n.muleq(1 / nl);
			let mid = a1.add(a2).muleq(0.5);
			let cmin = (this.jointMin - bias) * scale;
			if(cmin < 0) {
				cmin = 0;
			}
			let cmax = (this.jointMax - bias) * scale;
			if(cmax < 0) {
				cmax = 0;
			}
			let min1 = mid.sub(n.mul(cmin * 0.5,true));
			let min2 = mid.add(n.mul(cmin * 0.5,true));
			let max1 = mid.sub(n.mul(cmax * 0.5,true));
			let max2 = mid.add(n.mul(cmax * 0.5,true));
			g.drawLine(min1,min2,ca);
			g.drawLine(max1,min1,cb);
			g.drawLine(max2,min2,cb);
			if(!this.stiff) {
				if(nl > cmax) {
					g.drawSpring(max1,a1,cb);
					g.drawSpring(max2,a2,cb);
				} else if(nl < cmin) {
					g.drawSpring(min1,a1,ca);
					g.drawSpring(min2,a2,ca);
				}
			}
			if(mid != null && mid.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = mid.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(mid.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = mid.zpp_inner;
			mid.zpp_inner.outer = null;
			mid.zpp_inner = null;
			let o = mid;
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
			if(min1 != null && min1.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = min1.zpp_inner;
			if(_this1._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this1._isimmutable != null) {
				_this1._isimmutable();
			}
			if(min1.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner1 = min1.zpp_inner;
			min1.zpp_inner.outer = null;
			min1.zpp_inner = null;
			let o2 = min1;
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
			if(min2 != null && min2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = min2.zpp_inner;
			if(_this2._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this2._isimmutable != null) {
				_this2._isimmutable();
			}
			if(min2.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner2 = min2.zpp_inner;
			min2.zpp_inner.outer = null;
			min2.zpp_inner = null;
			let o4 = min2;
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
			if(max1 != null && max1.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = max1.zpp_inner;
			if(_this3._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this3._isimmutable != null) {
				_this3._isimmutable();
			}
			if(max1.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner3 = max1.zpp_inner;
			max1.zpp_inner.outer = null;
			max1.zpp_inner = null;
			let o6 = max1;
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
			if(max2 != null && max2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this4 = max2.zpp_inner;
			if(_this4._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this4._isimmutable != null) {
				_this4._isimmutable();
			}
			if(max2.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner4 = max2.zpp_inner;
			max2.zpp_inner.outer = null;
			max2.zpp_inner = null;
			let o8 = max2;
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
	}
}
