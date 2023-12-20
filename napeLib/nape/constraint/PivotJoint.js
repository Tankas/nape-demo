import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import ZPP_PivotJoint from '../../zpp_nape/constraint/ZPP_PivotJoint.js';
import Vec3 from '../geom/Vec3.js';
import MatMN from '../geom/MatMN.js';
import Constraint from './Constraint.js';
export default class PivotJoint extends Constraint {
	constructor(body1,body2,anchor1,anchor2) {
		Constraint._hx_skip_constructor = true;
		super();
		Constraint._hx_skip_constructor = false;
		this._hx_constructor(body1,body2,anchor1,anchor2);
	}
	_hx_constructor(body1,body2,anchor1,anchor2) {
		this.zpp_inner_zn = null;
		this.zpp_inner_zn = new ZPP_PivotJoint();
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
				if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && this.zpp_inner_zn.b2 != this.zpp_inner_zn.b1) {
					if(this.zpp_inner_zn.b1 != null) {
						this.zpp_inner_zn.b1.constraints.remove(this.zpp_inner);
					}
				}
				if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
					this.zpp_inner_zn.b1.wake();
				}
			}
			this.zpp_inner_zn.b1 = inbody1;
			if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && inbody1 != null && this.zpp_inner_zn.b2 != inbody1) {
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
				if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && this.zpp_inner_zn.b1 != this.zpp_inner_zn.b2) {
					if(this.zpp_inner_zn.b2 != null) {
						this.zpp_inner_zn.b2.constraints.remove(this.zpp_inner);
					}
				}
				if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
					this.zpp_inner_zn.b2.wake();
				}
			}
			this.zpp_inner_zn.b2 = inbody2;
			if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && inbody2 != null && this.zpp_inner_zn.b1 != inbody2) {
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
		let tmp2;
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
			tmp2 = _this.zpp_inner.y == y;
		} else {
			tmp2 = false;
		}
		if(!tmp2) {
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
		let tmp3;
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
			tmp3 = _this6.zpp_inner.y == y1;
		} else {
			tmp3 = false;
		}
		if(!tmp3) {
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
	}
	get_angVelDamping() {
		return this.zpp_inner.angVelDamping;
	}
	set_angVelDamping(damping) {
		if(this.zpp_inner.angVelDamping != damping) {
			this.zpp_inner.angVelDamping = damping;
		}
		return this.zpp_inner.angVelDamping;
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
				if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && this.zpp_inner_zn.b2 != this.zpp_inner_zn.b1) {
					if(this.zpp_inner_zn.b1 != null) {
						this.zpp_inner_zn.b1.constraints.remove(this.zpp_inner);
					}
				}
				if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
					this.zpp_inner_zn.b1.wake();
				}
			}
			this.zpp_inner_zn.b1 = inbody1;
			if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && inbody1 != null && this.zpp_inner_zn.b2 != inbody1) {
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
				if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && this.zpp_inner_zn.b1 != this.zpp_inner_zn.b2) {
					if(this.zpp_inner_zn.b2 != null) {
						this.zpp_inner_zn.b2.constraints.remove(this.zpp_inner);
					}
				}
				if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
					this.zpp_inner_zn.b2.wake();
				}
			}
			this.zpp_inner_zn.b2 = inbody2;
			if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null && inbody2 != null && this.zpp_inner_zn.b1 != inbody2) {
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
	impulse() {
		let ret = new MatMN(2,1);
		let x = this.zpp_inner_zn.jAccx;
		if(0 >= ret.zpp_inner.m || 0 >= ret.zpp_inner.n) {
			throw haxe_Exception.thrown("Error: MatMN indices out of range");
		}
		ret.zpp_inner.x[0 * ret.zpp_inner.n] = x;
		let x1 = this.zpp_inner_zn.jAccy;
		if(1 >= ret.zpp_inner.m || 0 >= ret.zpp_inner.n) {
			throw haxe_Exception.thrown("Error: MatMN indices out of range");
		}
		ret.zpp_inner.x[ret.zpp_inner.n] = x1;
		return ret;
	}
	bodyImpulse(body) {
		if(body == null) {
			throw haxe_Exception.thrown("Error: Cannot evaluate impulse on null body");
		}
		if(body != (this.zpp_inner_zn.b1 == null ? null : this.zpp_inner_zn.b1.outer) && body != (this.zpp_inner_zn.b2 == null ? null : this.zpp_inner_zn.b2.outer)) {
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
	}
}
