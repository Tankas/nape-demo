import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import ZPP_PulleyJoint from '../../zpp_nape/constraint/ZPP_PulleyJoint.js';
import Vec3 from '../geom/Vec3.js';
import MatMN from '../geom/MatMN.js';
import Constraint from './Constraint.js';
export default class PulleyJoint extends Constraint {
	constructor(body1,body2,body3,body4,anchor1,anchor2,anchor3,anchor4,jointMin,jointMax,ratio) {
		Constraint._hx_skip_constructor = true;
		super();
		Constraint._hx_skip_constructor = false;
		this._hx_constructor(body1,body2,body3,body4,anchor1,anchor2,anchor3,anchor4,jointMin,jointMax,ratio);
	}
	_hx_constructor(body1,body2,body3,body4,anchor1,anchor2,anchor3,anchor4,jointMin,jointMax,ratio) {
		if(ratio == null) {
			ratio = 1.0;
		}
		this.zpp_inner_zn = null;
		this.zpp_inner_zn = new ZPP_PulleyJoint();
		this.zpp_inner = this.zpp_inner_zn;
		this.zpp_inner.outer = this;
		this.zpp_inner_zn.outer_zn = this;
		Constraint.zpp_internalAlloc = true;
		super._hx_constructor();
		Constraint.zpp_internalAlloc = false;
		this.zpp_inner.immutable_midstep("Constraint::" + "body1");
		let inbody1 = body1 == null ? null : body1.zpp_inner;
		if(inbody1 != this.zpp_inner_zn.b1) {
			if(this.zpp_inner_zn.b1 != null) {
				if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && this.zpp_inner_zn.b2 != this.zpp_inner_zn.b1 && this.zpp_inner_zn.b3 != this.zpp_inner_zn.b1 && this.zpp_inner_zn.b4 != this.zpp_inner_zn.b1) {
					if(this.zpp_inner_zn.b1 != null) {
						this.zpp_inner_zn.b1.constraints.remove(this.zpp_inner);
					}
				}
				if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
					this.zpp_inner_zn.b1.wake();
				}
			}
			this.zpp_inner_zn.b1 = inbody1;
			if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && inbody1 != null && this.zpp_inner_zn.b2 != inbody1 && this.zpp_inner_zn.b3 != inbody1 && this.zpp_inner_zn.b4 != inbody1) {
				if(inbody1 != null) {
					inbody1.constraints.add(this.zpp_inner);
				}
			}
			if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
				this.zpp_inner.wake();
				if(inbody1 != null) {
					inbody1.wake();
				}
			}
		}
		let tmp = this.zpp_inner_zn.b1 == null;
		this.zpp_inner.immutable_midstep("Constraint::" + "body2");
		let inbody2 = body2 == null ? null : body2.zpp_inner;
		if(inbody2 != this.zpp_inner_zn.b2) {
			if(this.zpp_inner_zn.b2 != null) {
				if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && this.zpp_inner_zn.b1 != this.zpp_inner_zn.b2 && this.zpp_inner_zn.b3 != this.zpp_inner_zn.b2 && this.zpp_inner_zn.b4 != this.zpp_inner_zn.b2) {
					if(this.zpp_inner_zn.b2 != null) {
						this.zpp_inner_zn.b2.constraints.remove(this.zpp_inner);
					}
				}
				if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
					this.zpp_inner_zn.b2.wake();
				}
			}
			this.zpp_inner_zn.b2 = inbody2;
			if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && inbody2 != null && this.zpp_inner_zn.b1 != inbody2 && this.zpp_inner_zn.b3 != inbody2 && this.zpp_inner_zn.b4 != inbody2) {
				if(inbody2 != null) {
					inbody2.constraints.add(this.zpp_inner);
				}
			}
			if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
				this.zpp_inner.wake();
				if(inbody2 != null) {
					inbody2.wake();
				}
			}
		}
		let tmp1 = this.zpp_inner_zn.b2 == null;
		this.zpp_inner.immutable_midstep("Constraint::" + "body3");
		let inbody3 = body3 == null ? null : body3.zpp_inner;
		if(inbody3 != this.zpp_inner_zn.b3) {
			if(this.zpp_inner_zn.b3 != null) {
				if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && this.zpp_inner_zn.b1 != this.zpp_inner_zn.b3 && this.zpp_inner_zn.b2 != this.zpp_inner_zn.b3 && this.zpp_inner_zn.b4 != this.zpp_inner_zn.b3) {
					if(this.zpp_inner_zn.b3 != null) {
						this.zpp_inner_zn.b3.constraints.remove(this.zpp_inner);
					}
				}
				if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
					this.zpp_inner_zn.b3.wake();
				}
			}
			this.zpp_inner_zn.b3 = inbody3;
			if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && inbody3 != null && this.zpp_inner_zn.b1 != inbody3 && this.zpp_inner_zn.b2 != inbody3 && this.zpp_inner_zn.b4 != inbody3) {
				if(inbody3 != null) {
					inbody3.constraints.add(this.zpp_inner);
				}
			}
			if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
				this.zpp_inner.wake();
				if(inbody3 != null) {
					inbody3.wake();
				}
			}
		}
		let tmp2 = this.zpp_inner_zn.b3 == null;
		this.zpp_inner.immutable_midstep("Constraint::" + "body4");
		let inbody4 = body4 == null ? null : body4.zpp_inner;
		if(inbody4 != this.zpp_inner_zn.b4) {
			if(this.zpp_inner_zn.b4 != null) {
				if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && this.zpp_inner_zn.b1 != this.zpp_inner_zn.b4 && this.zpp_inner_zn.b2 != this.zpp_inner_zn.b4 && this.zpp_inner_zn.b3 != this.zpp_inner_zn.b4) {
					if(this.zpp_inner_zn.b4 != null) {
						this.zpp_inner_zn.b4.constraints.remove(this.zpp_inner);
					}
				}
				if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
					this.zpp_inner_zn.b4.wake();
				}
			}
			this.zpp_inner_zn.b4 = inbody4;
			if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && inbody4 != null && this.zpp_inner_zn.b1 != inbody4 && this.zpp_inner_zn.b2 != inbody4 && this.zpp_inner_zn.b3 != inbody4) {
				if(inbody4 != null) {
					inbody4.constraints.add(this.zpp_inner);
				}
			}
			if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
				this.zpp_inner.wake();
				if(inbody4 != null) {
					inbody4.wake();
				}
			}
		}
		let tmp3 = this.zpp_inner_zn.b4 == null;
		if(anchor1 != null && anchor1.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(anchor1 == null) {
			throw haxe_Exception.thrown("Error: Constraint::" + "anchor1" + " cannot be null");
		}
		if(this.zpp_inner_zn.wrap_a1 == null) {
			this.zpp_inner_zn.setup_a1();
		}
		let _this = this.zpp_inner_zn.wrap_a1;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(anchor1 != null && anchor1.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = _this.zpp_inner;
		if(_this1._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this1._isimmutable != null) {
			_this1._isimmutable();
		}
		if(anchor1 == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
		}
		if(anchor1 != null && anchor1.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = anchor1.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let x = anchor1.zpp_inner.x;
		if(anchor1 != null && anchor1.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = anchor1.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let y = anchor1.zpp_inner.y;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = _this.zpp_inner;
		if(_this4._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this4._isimmutable != null) {
			_this4._isimmutable();
		}
		if(x != x || y != y) {
			throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
		}
		let tmp4;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this5 = _this.zpp_inner;
		if(_this5._validate != null) {
			_this5._validate();
		}
		if(_this.zpp_inner.x == x) {
			if(_this != null && _this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = _this.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			tmp4 = _this.zpp_inner.y == y;
		} else {
			tmp4 = false;
		}
		if(!tmp4) {
			_this.zpp_inner.x = x;
			_this.zpp_inner.y = y;
			let _this1 = _this.zpp_inner;
			if(_this1._invalidate != null) {
				_this1._invalidate(_this1);
			}
		}
		let ret = _this;
		if(anchor1.zpp_inner.weak) {
			if(anchor1 != null && anchor1.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = anchor1.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(anchor1.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = anchor1.zpp_inner;
			anchor1.zpp_inner.outer = null;
			anchor1.zpp_inner = null;
			let o = anchor1;
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
		if(this.zpp_inner_zn.wrap_a1 == null) {
			this.zpp_inner_zn.setup_a1();
		}
		if(anchor2 != null && anchor2.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(anchor2 == null) {
			throw haxe_Exception.thrown("Error: Constraint::" + "anchor2" + " cannot be null");
		}
		if(this.zpp_inner_zn.wrap_a2 == null) {
			this.zpp_inner_zn.setup_a2();
		}
		let _this6 = this.zpp_inner_zn.wrap_a2;
		if(_this6 != null && _this6.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(anchor2 != null && anchor2.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this7 = _this6.zpp_inner;
		if(_this7._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this7._isimmutable != null) {
			_this7._isimmutable();
		}
		if(anchor2 == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
		}
		if(anchor2 != null && anchor2.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this8 = anchor2.zpp_inner;
		if(_this8._validate != null) {
			_this8._validate();
		}
		let x1 = anchor2.zpp_inner.x;
		if(anchor2 != null && anchor2.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this9 = anchor2.zpp_inner;
		if(_this9._validate != null) {
			_this9._validate();
		}
		let y1 = anchor2.zpp_inner.y;
		if(_this6 != null && _this6.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this10 = _this6.zpp_inner;
		if(_this10._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this10._isimmutable != null) {
			_this10._isimmutable();
		}
		if(x1 != x1 || y1 != y1) {
			throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
		}
		let tmp5;
		if(_this6 != null && _this6.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this11 = _this6.zpp_inner;
		if(_this11._validate != null) {
			_this11._validate();
		}
		if(_this6.zpp_inner.x == x1) {
			if(_this6 != null && _this6.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = _this6.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			tmp5 = _this6.zpp_inner.y == y1;
		} else {
			tmp5 = false;
		}
		if(!tmp5) {
			_this6.zpp_inner.x = x1;
			_this6.zpp_inner.y = y1;
			let _this = _this6.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		let ret1 = _this6;
		if(anchor2.zpp_inner.weak) {
			if(anchor2 != null && anchor2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = anchor2.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(anchor2.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = anchor2.zpp_inner;
			anchor2.zpp_inner.outer = null;
			anchor2.zpp_inner = null;
			let o = anchor2;
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
		if(this.zpp_inner_zn.wrap_a2 == null) {
			this.zpp_inner_zn.setup_a2();
		}
		if(anchor3 != null && anchor3.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(anchor3 == null) {
			throw haxe_Exception.thrown("Error: Constraint::" + "anchor3" + " cannot be null");
		}
		if(this.zpp_inner_zn.wrap_a3 == null) {
			this.zpp_inner_zn.setup_a3();
		}
		let _this12 = this.zpp_inner_zn.wrap_a3;
		if(_this12 != null && _this12.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(anchor3 != null && anchor3.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this13 = _this12.zpp_inner;
		if(_this13._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this13._isimmutable != null) {
			_this13._isimmutable();
		}
		if(anchor3 == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
		}
		if(anchor3 != null && anchor3.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this14 = anchor3.zpp_inner;
		if(_this14._validate != null) {
			_this14._validate();
		}
		let x2 = anchor3.zpp_inner.x;
		if(anchor3 != null && anchor3.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this15 = anchor3.zpp_inner;
		if(_this15._validate != null) {
			_this15._validate();
		}
		let y2 = anchor3.zpp_inner.y;
		if(_this12 != null && _this12.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this16 = _this12.zpp_inner;
		if(_this16._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this16._isimmutable != null) {
			_this16._isimmutable();
		}
		if(x2 != x2 || y2 != y2) {
			throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
		}
		let tmp6;
		if(_this12 != null && _this12.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this17 = _this12.zpp_inner;
		if(_this17._validate != null) {
			_this17._validate();
		}
		if(_this12.zpp_inner.x == x2) {
			if(_this12 != null && _this12.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = _this12.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			tmp6 = _this12.zpp_inner.y == y2;
		} else {
			tmp6 = false;
		}
		if(!tmp6) {
			_this12.zpp_inner.x = x2;
			_this12.zpp_inner.y = y2;
			let _this = _this12.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		let ret2 = _this12;
		if(anchor3.zpp_inner.weak) {
			if(anchor3 != null && anchor3.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = anchor3.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(anchor3.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = anchor3.zpp_inner;
			anchor3.zpp_inner.outer = null;
			anchor3.zpp_inner = null;
			let o = anchor3;
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
		if(this.zpp_inner_zn.wrap_a3 == null) {
			this.zpp_inner_zn.setup_a3();
		}
		if(anchor4 != null && anchor4.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(anchor4 == null) {
			throw haxe_Exception.thrown("Error: Constraint::" + "anchor4" + " cannot be null");
		}
		if(this.zpp_inner_zn.wrap_a4 == null) {
			this.zpp_inner_zn.setup_a4();
		}
		let _this18 = this.zpp_inner_zn.wrap_a4;
		if(_this18 != null && _this18.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(anchor4 != null && anchor4.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this19 = _this18.zpp_inner;
		if(_this19._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this19._isimmutable != null) {
			_this19._isimmutable();
		}
		if(anchor4 == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
		}
		if(anchor4 != null && anchor4.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this20 = anchor4.zpp_inner;
		if(_this20._validate != null) {
			_this20._validate();
		}
		let x3 = anchor4.zpp_inner.x;
		if(anchor4 != null && anchor4.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this21 = anchor4.zpp_inner;
		if(_this21._validate != null) {
			_this21._validate();
		}
		let y3 = anchor4.zpp_inner.y;
		if(_this18 != null && _this18.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this22 = _this18.zpp_inner;
		if(_this22._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this22._isimmutable != null) {
			_this22._isimmutable();
		}
		if(x3 != x3 || y3 != y3) {
			throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
		}
		let tmp7;
		if(_this18 != null && _this18.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this23 = _this18.zpp_inner;
		if(_this23._validate != null) {
			_this23._validate();
		}
		if(_this18.zpp_inner.x == x3) {
			if(_this18 != null && _this18.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = _this18.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			tmp7 = _this18.zpp_inner.y == y3;
		} else {
			tmp7 = false;
		}
		if(!tmp7) {
			_this18.zpp_inner.x = x3;
			_this18.zpp_inner.y = y3;
			let _this = _this18.zpp_inner;
			if(_this._invalidate != null) {
				_this._invalidate(_this);
			}
		}
		let ret3 = _this18;
		if(anchor4.zpp_inner.weak) {
			if(anchor4 != null && anchor4.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = anchor4.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(anchor4.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = anchor4.zpp_inner;
			anchor4.zpp_inner.outer = null;
			anchor4.zpp_inner = null;
			let o = anchor4;
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
		if(this.zpp_inner_zn.wrap_a4 == null) {
			this.zpp_inner_zn.setup_a4();
		}
		this.zpp_inner.immutable_midstep("PulleyJoint::ratio");
		if(ratio != ratio) {
			throw haxe_Exception.thrown("Error: PulleyJoint::ratio cannot be NaN");
		}
		if(this.zpp_inner_zn.ratio != ratio) {
			this.zpp_inner_zn.ratio = ratio;
			this.zpp_inner.wake();
		}
		this.zpp_inner.immutable_midstep("PulleyJoint::jointMin");
		if(jointMin != jointMin) {
			throw haxe_Exception.thrown("Error: PulleyJoint::jointMin cannot be NaN");
		}
		if(jointMin < 0) {
			throw haxe_Exception.thrown("Error: PulleyJoint::jointMin must be >= 0");
		}
		if(this.zpp_inner_zn.jointMin != jointMin) {
			this.zpp_inner_zn.jointMin = jointMin;
			this.zpp_inner.wake();
		}
		this.zpp_inner.immutable_midstep("PulleyJoint::jointMax");
		if(jointMax != jointMax) {
			throw haxe_Exception.thrown("Error: PulleyJoint::jointMax cannot be NaN");
		}
		if(jointMax < 0) {
			throw haxe_Exception.thrown("Error: PulleyJoint::jointMax must be >= 0");
		}
		if(this.zpp_inner_zn.jointMax != jointMax) {
			this.zpp_inner_zn.jointMax = jointMax;
			this.zpp_inner.wake();
		}
	}
	get_body1() {
		if(this.zpp_inner_zn.b1 == null) {
			return null;
		} else {
			return this.zpp_inner_zn.b1.outer;
		}
	}
	set_body1(body1) {
		this.zpp_inner.immutable_midstep("Constraint::" + "body1");
		let inbody1 = body1 == null ? null : body1.zpp_inner;
		if(inbody1 != this.zpp_inner_zn.b1) {
			if(this.zpp_inner_zn.b1 != null) {
				if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && this.zpp_inner_zn.b2 != this.zpp_inner_zn.b1 && this.zpp_inner_zn.b3 != this.zpp_inner_zn.b1 && this.zpp_inner_zn.b4 != this.zpp_inner_zn.b1) {
					if(this.zpp_inner_zn.b1 != null) {
						this.zpp_inner_zn.b1.constraints.remove(this.zpp_inner);
					}
				}
				if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
					this.zpp_inner_zn.b1.wake();
				}
			}
			this.zpp_inner_zn.b1 = inbody1;
			if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && inbody1 != null && this.zpp_inner_zn.b2 != inbody1 && this.zpp_inner_zn.b3 != inbody1 && this.zpp_inner_zn.b4 != inbody1) {
				if(inbody1 != null) {
					inbody1.constraints.add(this.zpp_inner);
				}
			}
			if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
				this.zpp_inner.wake();
				if(inbody1 != null) {
					inbody1.wake();
				}
			}
		}
		if(this.zpp_inner_zn.b1 == null) {
			return null;
		} else {
			return this.zpp_inner_zn.b1.outer;
		}
	}
	get_body2() {
		if(this.zpp_inner_zn.b2 == null) {
			return null;
		} else {
			return this.zpp_inner_zn.b2.outer;
		}
	}
	set_body2(body2) {
		this.zpp_inner.immutable_midstep("Constraint::" + "body2");
		let inbody2 = body2 == null ? null : body2.zpp_inner;
		if(inbody2 != this.zpp_inner_zn.b2) {
			if(this.zpp_inner_zn.b2 != null) {
				if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && this.zpp_inner_zn.b1 != this.zpp_inner_zn.b2 && this.zpp_inner_zn.b3 != this.zpp_inner_zn.b2 && this.zpp_inner_zn.b4 != this.zpp_inner_zn.b2) {
					if(this.zpp_inner_zn.b2 != null) {
						this.zpp_inner_zn.b2.constraints.remove(this.zpp_inner);
					}
				}
				if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
					this.zpp_inner_zn.b2.wake();
				}
			}
			this.zpp_inner_zn.b2 = inbody2;
			if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && inbody2 != null && this.zpp_inner_zn.b1 != inbody2 && this.zpp_inner_zn.b3 != inbody2 && this.zpp_inner_zn.b4 != inbody2) {
				if(inbody2 != null) {
					inbody2.constraints.add(this.zpp_inner);
				}
			}
			if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
				this.zpp_inner.wake();
				if(inbody2 != null) {
					inbody2.wake();
				}
			}
		}
		if(this.zpp_inner_zn.b2 == null) {
			return null;
		} else {
			return this.zpp_inner_zn.b2.outer;
		}
	}
	get_body3() {
		if(this.zpp_inner_zn.b3 == null) {
			return null;
		} else {
			return this.zpp_inner_zn.b3.outer;
		}
	}
	set_body3(body3) {
		this.zpp_inner.immutable_midstep("Constraint::" + "body3");
		let inbody3 = body3 == null ? null : body3.zpp_inner;
		if(inbody3 != this.zpp_inner_zn.b3) {
			if(this.zpp_inner_zn.b3 != null) {
				if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && this.zpp_inner_zn.b1 != this.zpp_inner_zn.b3 && this.zpp_inner_zn.b2 != this.zpp_inner_zn.b3 && this.zpp_inner_zn.b4 != this.zpp_inner_zn.b3) {
					if(this.zpp_inner_zn.b3 != null) {
						this.zpp_inner_zn.b3.constraints.remove(this.zpp_inner);
					}
				}
				if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
					this.zpp_inner_zn.b3.wake();
				}
			}
			this.zpp_inner_zn.b3 = inbody3;
			if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && inbody3 != null && this.zpp_inner_zn.b1 != inbody3 && this.zpp_inner_zn.b2 != inbody3 && this.zpp_inner_zn.b4 != inbody3) {
				if(inbody3 != null) {
					inbody3.constraints.add(this.zpp_inner);
				}
			}
			if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
				this.zpp_inner.wake();
				if(inbody3 != null) {
					inbody3.wake();
				}
			}
		}
		if(this.zpp_inner_zn.b3 == null) {
			return null;
		} else {
			return this.zpp_inner_zn.b3.outer;
		}
	}
	get_body4() {
		if(this.zpp_inner_zn.b4 == null) {
			return null;
		} else {
			return this.zpp_inner_zn.b4.outer;
		}
	}
	set_body4(body4) {
		this.zpp_inner.immutable_midstep("Constraint::" + "body4");
		let inbody4 = body4 == null ? null : body4.zpp_inner;
		if(inbody4 != this.zpp_inner_zn.b4) {
			if(this.zpp_inner_zn.b4 != null) {
				if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && this.zpp_inner_zn.b1 != this.zpp_inner_zn.b4 && this.zpp_inner_zn.b2 != this.zpp_inner_zn.b4 && this.zpp_inner_zn.b3 != this.zpp_inner_zn.b4) {
					if(this.zpp_inner_zn.b4 != null) {
						this.zpp_inner_zn.b4.constraints.remove(this.zpp_inner);
					}
				}
				if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
					this.zpp_inner_zn.b4.wake();
				}
			}
			this.zpp_inner_zn.b4 = inbody4;
			if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && inbody4 != null && this.zpp_inner_zn.b1 != inbody4 && this.zpp_inner_zn.b2 != inbody4 && this.zpp_inner_zn.b3 != inbody4) {
				if(inbody4 != null) {
					inbody4.constraints.add(this.zpp_inner);
				}
			}
			if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
				this.zpp_inner.wake();
				if(inbody4 != null) {
					inbody4.wake();
				}
			}
		}
		if(this.zpp_inner_zn.b4 == null) {
			return null;
		} else {
			return this.zpp_inner_zn.b4.outer;
		}
	}
	get_anchor1() {
		if(this.zpp_inner_zn.wrap_a1 == null) {
			this.zpp_inner_zn.setup_a1();
		}
		return this.zpp_inner_zn.wrap_a1;
	}
	set_anchor1(anchor1) {
		if(anchor1 != null && anchor1.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(anchor1 == null) {
			throw haxe_Exception.thrown("Error: Constraint::" + "anchor1" + " cannot be null");
		}
		if(this.zpp_inner_zn.wrap_a1 == null) {
			this.zpp_inner_zn.setup_a1();
		}
		let _this = this.zpp_inner_zn.wrap_a1;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(anchor1 != null && anchor1.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = _this.zpp_inner;
		if(_this1._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this1._isimmutable != null) {
			_this1._isimmutable();
		}
		if(anchor1 == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
		}
		if(anchor1 != null && anchor1.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = anchor1.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let x = anchor1.zpp_inner.x;
		if(anchor1 != null && anchor1.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = anchor1.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let y = anchor1.zpp_inner.y;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = _this.zpp_inner;
		if(_this4._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this4._isimmutable != null) {
			_this4._isimmutable();
		}
		if(x != x || y != y) {
			throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
		}
		let tmp;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this5 = _this.zpp_inner;
		if(_this5._validate != null) {
			_this5._validate();
		}
		if(_this.zpp_inner.x == x) {
			if(_this != null && _this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = _this.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			tmp = _this.zpp_inner.y == y;
		} else {
			tmp = false;
		}
		if(!tmp) {
			_this.zpp_inner.x = x;
			_this.zpp_inner.y = y;
			let _this1 = _this.zpp_inner;
			if(_this1._invalidate != null) {
				_this1._invalidate(_this1);
			}
		}
		let ret = _this;
		if(anchor1.zpp_inner.weak) {
			if(anchor1 != null && anchor1.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = anchor1.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(anchor1.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = anchor1.zpp_inner;
			anchor1.zpp_inner.outer = null;
			anchor1.zpp_inner = null;
			let o = anchor1;
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
		if(this.zpp_inner_zn.wrap_a1 == null) {
			this.zpp_inner_zn.setup_a1();
		}
		return this.zpp_inner_zn.wrap_a1;
	}
	get_anchor2() {
		if(this.zpp_inner_zn.wrap_a2 == null) {
			this.zpp_inner_zn.setup_a2();
		}
		return this.zpp_inner_zn.wrap_a2;
	}
	set_anchor2(anchor2) {
		if(anchor2 != null && anchor2.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(anchor2 == null) {
			throw haxe_Exception.thrown("Error: Constraint::" + "anchor2" + " cannot be null");
		}
		if(this.zpp_inner_zn.wrap_a2 == null) {
			this.zpp_inner_zn.setup_a2();
		}
		let _this = this.zpp_inner_zn.wrap_a2;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(anchor2 != null && anchor2.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = _this.zpp_inner;
		if(_this1._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this1._isimmutable != null) {
			_this1._isimmutable();
		}
		if(anchor2 == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
		}
		if(anchor2 != null && anchor2.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = anchor2.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let x = anchor2.zpp_inner.x;
		if(anchor2 != null && anchor2.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = anchor2.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let y = anchor2.zpp_inner.y;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = _this.zpp_inner;
		if(_this4._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this4._isimmutable != null) {
			_this4._isimmutable();
		}
		if(x != x || y != y) {
			throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
		}
		let tmp;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this5 = _this.zpp_inner;
		if(_this5._validate != null) {
			_this5._validate();
		}
		if(_this.zpp_inner.x == x) {
			if(_this != null && _this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = _this.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			tmp = _this.zpp_inner.y == y;
		} else {
			tmp = false;
		}
		if(!tmp) {
			_this.zpp_inner.x = x;
			_this.zpp_inner.y = y;
			let _this1 = _this.zpp_inner;
			if(_this1._invalidate != null) {
				_this1._invalidate(_this1);
			}
		}
		let ret = _this;
		if(anchor2.zpp_inner.weak) {
			if(anchor2 != null && anchor2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = anchor2.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(anchor2.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = anchor2.zpp_inner;
			anchor2.zpp_inner.outer = null;
			anchor2.zpp_inner = null;
			let o = anchor2;
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
		if(this.zpp_inner_zn.wrap_a2 == null) {
			this.zpp_inner_zn.setup_a2();
		}
		return this.zpp_inner_zn.wrap_a2;
	}
	get_anchor3() {
		if(this.zpp_inner_zn.wrap_a3 == null) {
			this.zpp_inner_zn.setup_a3();
		}
		return this.zpp_inner_zn.wrap_a3;
	}
	set_anchor3(anchor3) {
		if(anchor3 != null && anchor3.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(anchor3 == null) {
			throw haxe_Exception.thrown("Error: Constraint::" + "anchor3" + " cannot be null");
		}
		if(this.zpp_inner_zn.wrap_a3 == null) {
			this.zpp_inner_zn.setup_a3();
		}
		let _this = this.zpp_inner_zn.wrap_a3;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(anchor3 != null && anchor3.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = _this.zpp_inner;
		if(_this1._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this1._isimmutable != null) {
			_this1._isimmutable();
		}
		if(anchor3 == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
		}
		if(anchor3 != null && anchor3.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = anchor3.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let x = anchor3.zpp_inner.x;
		if(anchor3 != null && anchor3.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = anchor3.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let y = anchor3.zpp_inner.y;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = _this.zpp_inner;
		if(_this4._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this4._isimmutable != null) {
			_this4._isimmutable();
		}
		if(x != x || y != y) {
			throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
		}
		let tmp;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this5 = _this.zpp_inner;
		if(_this5._validate != null) {
			_this5._validate();
		}
		if(_this.zpp_inner.x == x) {
			if(_this != null && _this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = _this.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			tmp = _this.zpp_inner.y == y;
		} else {
			tmp = false;
		}
		if(!tmp) {
			_this.zpp_inner.x = x;
			_this.zpp_inner.y = y;
			let _this1 = _this.zpp_inner;
			if(_this1._invalidate != null) {
				_this1._invalidate(_this1);
			}
		}
		let ret = _this;
		if(anchor3.zpp_inner.weak) {
			if(anchor3 != null && anchor3.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = anchor3.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(anchor3.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = anchor3.zpp_inner;
			anchor3.zpp_inner.outer = null;
			anchor3.zpp_inner = null;
			let o = anchor3;
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
		if(this.zpp_inner_zn.wrap_a3 == null) {
			this.zpp_inner_zn.setup_a3();
		}
		return this.zpp_inner_zn.wrap_a3;
	}
	get_anchor4() {
		if(this.zpp_inner_zn.wrap_a4 == null) {
			this.zpp_inner_zn.setup_a4();
		}
		return this.zpp_inner_zn.wrap_a4;
	}
	set_anchor4(anchor4) {
		if(anchor4 != null && anchor4.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(anchor4 == null) {
			throw haxe_Exception.thrown("Error: Constraint::" + "anchor4" + " cannot be null");
		}
		if(this.zpp_inner_zn.wrap_a4 == null) {
			this.zpp_inner_zn.setup_a4();
		}
		let _this = this.zpp_inner_zn.wrap_a4;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(anchor4 != null && anchor4.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = _this.zpp_inner;
		if(_this1._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this1._isimmutable != null) {
			_this1._isimmutable();
		}
		if(anchor4 == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
		}
		if(anchor4 != null && anchor4.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = anchor4.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let x = anchor4.zpp_inner.x;
		if(anchor4 != null && anchor4.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = anchor4.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let y = anchor4.zpp_inner.y;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = _this.zpp_inner;
		if(_this4._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this4._isimmutable != null) {
			_this4._isimmutable();
		}
		if(x != x || y != y) {
			throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
		}
		let tmp;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this5 = _this.zpp_inner;
		if(_this5._validate != null) {
			_this5._validate();
		}
		if(_this.zpp_inner.x == x) {
			if(_this != null && _this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = _this.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			tmp = _this.zpp_inner.y == y;
		} else {
			tmp = false;
		}
		if(!tmp) {
			_this.zpp_inner.x = x;
			_this.zpp_inner.y = y;
			let _this1 = _this.zpp_inner;
			if(_this1._invalidate != null) {
				_this1._invalidate(_this1);
			}
		}
		let ret = _this;
		if(anchor4.zpp_inner.weak) {
			if(anchor4 != null && anchor4.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = anchor4.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(anchor4.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = anchor4.zpp_inner;
			anchor4.zpp_inner.outer = null;
			anchor4.zpp_inner = null;
			let o = anchor4;
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
		if(this.zpp_inner_zn.wrap_a4 == null) {
			this.zpp_inner_zn.setup_a4();
		}
		return this.zpp_inner_zn.wrap_a4;
	}
	get_jointMin() {
		return this.zpp_inner_zn.jointMin;
	}
	set_jointMin(jointMin) {
		this.zpp_inner.immutable_midstep("PulleyJoint::jointMin");
		if(jointMin != jointMin) {
			throw haxe_Exception.thrown("Error: PulleyJoint::jointMin cannot be NaN");
		}
		if(jointMin < 0) {
			throw haxe_Exception.thrown("Error: PulleyJoint::jointMin must be >= 0");
		}
		if(this.zpp_inner_zn.jointMin != jointMin) {
			this.zpp_inner_zn.jointMin = jointMin;
			this.zpp_inner.wake();
		}
		return this.zpp_inner_zn.jointMin;
	}
	get_jointMax() {
		return this.zpp_inner_zn.jointMax;
	}
	set_jointMax(jointMax) {
		this.zpp_inner.immutable_midstep("PulleyJoint::jointMax");
		if(jointMax != jointMax) {
			throw haxe_Exception.thrown("Error: PulleyJoint::jointMax cannot be NaN");
		}
		if(jointMax < 0) {
			throw haxe_Exception.thrown("Error: PulleyJoint::jointMax must be >= 0");
		}
		if(this.zpp_inner_zn.jointMax != jointMax) {
			this.zpp_inner_zn.jointMax = jointMax;
			this.zpp_inner.wake();
		}
		return this.zpp_inner_zn.jointMax;
	}
	get_ratio() {
		return this.zpp_inner_zn.ratio;
	}
	set_ratio(ratio) {
		this.zpp_inner.immutable_midstep("PulleyJoint::ratio");
		if(ratio != ratio) {
			throw haxe_Exception.thrown("Error: PulleyJoint::ratio cannot be NaN");
		}
		if(this.zpp_inner_zn.ratio != ratio) {
			this.zpp_inner_zn.ratio = ratio;
			this.zpp_inner.wake();
		}
		return this.zpp_inner_zn.ratio;
	}
	isSlack() {
		if((this.zpp_inner_zn.b1 == null ? null : this.zpp_inner_zn.b1.outer) == null || (this.zpp_inner_zn.b2 == null ? null : this.zpp_inner_zn.b2.outer) == null || (this.zpp_inner_zn.b3 == null ? null : this.zpp_inner_zn.b3.outer) == null || (this.zpp_inner_zn.b4 == null ? null : this.zpp_inner_zn.b4.outer) == null) {
			throw haxe_Exception.thrown("Error: Cannot compute slack for PulleyJoint if either body is null.");
		}
		return this.zpp_inner_zn.slack;
	}
	impulse() {
		let ret = new MatMN(1,1);
		let x = this.zpp_inner_zn.jAcc;
		if(0 >= ret.zpp_inner.m || 0 >= ret.zpp_inner.n) {
			throw haxe_Exception.thrown("Error: MatMN indices out of range");
		}
		ret.zpp_inner.x[0 * ret.zpp_inner.n] = x;
		return ret;
	}
	bodyImpulse(body) {
		if(body == null) {
			throw haxe_Exception.thrown("Error: Cannot evaluate impulse on null body");
		}
		if(body != (this.zpp_inner_zn.b1 == null ? null : this.zpp_inner_zn.b1.outer) && body != (this.zpp_inner_zn.b2 == null ? null : this.zpp_inner_zn.b2.outer) && body != (this.zpp_inner_zn.b3 == null ? null : this.zpp_inner_zn.b3.outer) && body != (this.zpp_inner_zn.b4 == null ? null : this.zpp_inner_zn.b4.outer)) {
			throw haxe_Exception.thrown("Error: Body is not linked to this constraint");
		}
		if(!this.zpp_inner.active) {
			return Vec3.get();
		} else {
			return this.zpp_inner_zn.bodyImpulse(body.zpp_inner);
		}
	}
	visitBodies(lambda) {
		if((this.zpp_inner_zn.b1 == null ? null : this.zpp_inner_zn.b1.outer) != null) {
			lambda(this.zpp_inner_zn.b1 == null ? null : this.zpp_inner_zn.b1.outer);
		}
		if((this.zpp_inner_zn.b2 == null ? null : this.zpp_inner_zn.b2.outer) != null && (this.zpp_inner_zn.b2 == null ? null : this.zpp_inner_zn.b2.outer) != (this.zpp_inner_zn.b1 == null ? null : this.zpp_inner_zn.b1.outer)) {
			lambda(this.zpp_inner_zn.b2 == null ? null : this.zpp_inner_zn.b2.outer);
		}
		if((this.zpp_inner_zn.b3 == null ? null : this.zpp_inner_zn.b3.outer) != null && (this.zpp_inner_zn.b3 == null ? null : this.zpp_inner_zn.b3.outer) != (this.zpp_inner_zn.b1 == null ? null : this.zpp_inner_zn.b1.outer) && (this.zpp_inner_zn.b3 == null ? null : this.zpp_inner_zn.b3.outer) != (this.zpp_inner_zn.b2 == null ? null : this.zpp_inner_zn.b2.outer)) {
			lambda(this.zpp_inner_zn.b3 == null ? null : this.zpp_inner_zn.b3.outer);
		}
		if((this.zpp_inner_zn.b4 == null ? null : this.zpp_inner_zn.b4.outer) != null && (this.zpp_inner_zn.b4 == null ? null : this.zpp_inner_zn.b4.outer) != (this.zpp_inner_zn.b1 == null ? null : this.zpp_inner_zn.b1.outer) && (this.zpp_inner_zn.b4 == null ? null : this.zpp_inner_zn.b4.outer) != (this.zpp_inner_zn.b2 == null ? null : this.zpp_inner_zn.b2.outer) && (this.zpp_inner_zn.b4 == null ? null : this.zpp_inner_zn.b4.outer) != (this.zpp_inner_zn.b3 == null ? null : this.zpp_inner_zn.b3.outer)) {
			lambda(this.zpp_inner_zn.b4 == null ? null : this.zpp_inner_zn.b4.outer);
		}
	}
}
