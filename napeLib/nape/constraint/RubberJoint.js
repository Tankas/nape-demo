import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import UserConstraint from './UserConstraint.js';
import Constraint from './Constraint.js';
export default class RubberJoint extends UserConstraint {
	constructor(body1,body2,anchor1,anchor2,length) {
		Constraint._hx_skip_constructor = true;
		super();
		Constraint._hx_skip_constructor = false;
		this._hx_constructor(body1,body2,anchor1,anchor2,length);
	}
	_hx_constructor(body1,body2,anchor1,anchor2,length) {
		this.DEFAULT_DAMPING = 0.2;
		this.DEFAULT_LEN = 100;
		this.SPRING_FORCE_SCALE = 108.156;
		this.DAMPING_K = 0.14;
		super._hx_constructor(2);
		this.body1 = this.__registerBody(this.body1,body1);
		this.body2 = this.__registerBody(this.body2,body2);
		if(this.anchor1 == null) {
			this.anchor1 = this.__bindVec2();
		}
		let _this = this.anchor1;
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
		if(this.anchor2 == null) {
			this.anchor2 = this.__bindVec2();
		}
		let _this6 = this.anchor2;
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
		let tmp1;
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
			tmp1 = _this6.zpp_inner.y == y1;
		} else {
			tmp1 = false;
		}
		if(!tmp1) {
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
		this.length = length;
		let damping = this.DEFAULT_DAMPING;
		if(damping != damping) {
			throw haxe_Exception.thrown("Error: Constraint::Damping cannot be Nan");
		}
		if(damping < 0) {
			throw haxe_Exception.thrown("Error: Constraint::Damping must be >=0");
		}
		if(this.zpp_inner.damping != damping) {
			this.zpp_inner.damping = damping;
			if(!this.zpp_inner.stiff) {
				this.zpp_inner.wake();
			}
		}
	}
	set_body1(body1) {
		return this.body1 = this.__registerBody(this.body1,body1);
	}
	get_body1() {
		return this.body1;
	}
	set_body2(body2) {
		return this.body2 = this.__registerBody(this.body2,body2);
	}
	get_body2() {
		return this.body2;
	}
	set_anchor1(anchor1) {
		if(this.anchor1 == null) {
			this.anchor1 = this.__bindVec2();
		}
		let _this = this.anchor1;
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
		return ret;
	}
	get_anchor1() {
		return this.anchor1;
	}
	set_anchor2(anchor2) {
		if(this.anchor2 == null) {
			this.anchor2 = this.__bindVec2();
		}
		let _this = this.anchor2;
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
		return ret;
	}
	get_anchor2() {
		return this.anchor2;
	}
	set_length(value) {
		this.length = value;
		return value;
	}
	__copy() {
		return new RubberJoint(this.body1,this.body2,this.anchor1,this.anchor2,this.length);
	}
	__validate() {
		if(this.body1 == null || this.body2 == null) {
			throw haxe_Exception.thrown("Error : joint cannot be simulated with null bodies ! ");
		}
		if(this.zpp_inner.damping < 0 || this.zpp_inner.damping > 2) {
			throw haxe_Exception.thrown("Error : The value of damping must be between 0 and 2");
		}
	}
	__warmStart() {
		this.__spji();
	}
	__spji() {
		if(this.body1 == null || this.body2 == null) {
			throw haxe_Exception.thrown("Error : joint cannot be simulated with null bodies ! ");
		}
		if(this.zpp_inner.damping < 0 || this.zpp_inner.damping > 2) {
			throw haxe_Exception.thrown("Error : The value of damping must be between 0 and 2");
		}
		let globalAnchor1 = this.body1.localPointToWorld(this.anchor1);
		let globalAnchor2 = this.body2.localPointToWorld(this.anchor2);
		let k = this.zpp_inner.frequency;
		let l = this.length;
		let v = globalAnchor1.sub(globalAnchor2);
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = v.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let dis = v.zpp_inner.x;
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = v.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let dis1 = dis * v.zpp_inner.x;
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = v.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let dis2 = v.zpp_inner.y;
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = v.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let dis3 = Math.sqrt(dis1 + dis2 * v.zpp_inner.y);
		let dl = dis3 - l;
		let damp = this.zpp_inner.damping;
		if(dl > 0) {
			let F = k * dl * this.SPRING_FORCE_SCALE * (1 - damp);
			let _this = this.body1;
			if(this.body1 != (_this.zpp_inner.space == null ? null : _this.zpp_inner.space.outer).zpp_inner.__static) {
				let out1 = globalAnchor2.sub(globalAnchor1).unit();
				if(out1 != null && out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = out1.zpp_inner;
				if(_this._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this._isimmutable != null) {
					_this._isimmutable();
				}
				if(F != F) {
					throw haxe_Exception.thrown("Error: Vec2::length cannot be NaN");
				}
				if(out1 != null && out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = out1.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				let tmp = out1.zpp_inner.x;
				if(out1 != null && out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this2 = out1.zpp_inner;
				if(_this2._validate != null) {
					_this2._validate();
				}
				let tmp1 = tmp * out1.zpp_inner.x;
				if(out1 != null && out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this3 = out1.zpp_inner;
				if(_this3._validate != null) {
					_this3._validate();
				}
				let tmp2 = out1.zpp_inner.y;
				if(out1 != null && out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this4 = out1.zpp_inner;
				if(_this4._validate != null) {
					_this4._validate();
				}
				if(tmp1 + tmp2 * out1.zpp_inner.y == 0) {
					throw haxe_Exception.thrown("Error: Cannot set length of a zero vector");
				}
				if(out1 != null && out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this5 = out1.zpp_inner;
				if(_this5._validate != null) {
					_this5._validate();
				}
				let t = out1.zpp_inner.x;
				if(out1 != null && out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this6 = out1.zpp_inner;
				if(_this6._validate != null) {
					_this6._validate();
				}
				let t1 = t * out1.zpp_inner.x;
				if(out1 != null && out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this7 = out1.zpp_inner;
				if(_this7._validate != null) {
					_this7._validate();
				}
				let t2 = out1.zpp_inner.y;
				if(out1 != null && out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this8 = out1.zpp_inner;
				if(_this8._validate != null) {
					_this8._validate();
				}
				let t3 = F / Math.sqrt(t1 + t2 * out1.zpp_inner.y);
				if(out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this9 = out1.zpp_inner;
				if(_this9._validate != null) {
					_this9._validate();
				}
				let x = out1.zpp_inner.x * t3;
				if(out1 != null && out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this10 = out1.zpp_inner;
				if(_this10._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this10._isimmutable != null) {
					_this10._isimmutable();
				}
				if(out1 != null && out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this11 = out1.zpp_inner;
				if(_this11._validate != null) {
					_this11._validate();
				}
				if(out1.zpp_inner.x != x) {
					if(x != x) {
						throw haxe_Exception.thrown("Error: Vec2::" + "x" + " cannot be NaN");
					}
					out1.zpp_inner.x = x;
					let _this = out1.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
				if(out1 != null && out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this12 = out1.zpp_inner;
				if(_this12._validate != null) {
					_this12._validate();
				}
				if(out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this13 = out1.zpp_inner;
				if(_this13._validate != null) {
					_this13._validate();
				}
				let y = out1.zpp_inner.y * t3;
				if(out1 != null && out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this14 = out1.zpp_inner;
				if(_this14._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this14._isimmutable != null) {
					_this14._isimmutable();
				}
				if(out1 != null && out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this15 = out1.zpp_inner;
				if(_this15._validate != null) {
					_this15._validate();
				}
				if(out1.zpp_inner.y != y) {
					if(y != y) {
						throw haxe_Exception.thrown("Error: Vec2::" + "y" + " cannot be NaN");
					}
					out1.zpp_inner.y = y;
					let _this = out1.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
				if(out1 != null && out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this16 = out1.zpp_inner;
				if(_this16._validate != null) {
					_this16._validate();
				}
				let _this17 = out1.zpp_inner;
				if(_this17._invalidate != null) {
					_this17._invalidate(_this17);
				}
				if(out1 != null && out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				if(out1 != null && out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this18 = out1.zpp_inner;
				if(_this18._validate != null) {
					_this18._validate();
				}
				let tmp3 = out1.zpp_inner.x;
				if(out1 != null && out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this19 = out1.zpp_inner;
				if(_this19._validate != null) {
					_this19._validate();
				}
				let tmp4 = tmp3 * out1.zpp_inner.x;
				if(out1 != null && out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this20 = out1.zpp_inner;
				if(_this20._validate != null) {
					_this20._validate();
				}
				let tmp5 = out1.zpp_inner.y;
				if(out1 != null && out1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this21 = out1.zpp_inner;
				if(_this21._validate != null) {
					_this21._validate();
				}
				let tmp6 = tmp4 + tmp5 * out1.zpp_inner.y;
				this.body1.applyImpulse(out1,globalAnchor1);
			}
			let _this1 = this.body2;
			if(this.body2 != (_this1.zpp_inner.space == null ? null : _this1.zpp_inner.space.outer).zpp_inner.__static) {
				let out2 = v.unit();
				if(out2 != null && out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = out2.zpp_inner;
				if(_this._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this._isimmutable != null) {
					_this._isimmutable();
				}
				if(F != F) {
					throw haxe_Exception.thrown("Error: Vec2::length cannot be NaN");
				}
				if(out2 != null && out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = out2.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				let tmp = out2.zpp_inner.x;
				if(out2 != null && out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this2 = out2.zpp_inner;
				if(_this2._validate != null) {
					_this2._validate();
				}
				let tmp1 = tmp * out2.zpp_inner.x;
				if(out2 != null && out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this3 = out2.zpp_inner;
				if(_this3._validate != null) {
					_this3._validate();
				}
				let tmp2 = out2.zpp_inner.y;
				if(out2 != null && out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this4 = out2.zpp_inner;
				if(_this4._validate != null) {
					_this4._validate();
				}
				if(tmp1 + tmp2 * out2.zpp_inner.y == 0) {
					throw haxe_Exception.thrown("Error: Cannot set length of a zero vector");
				}
				if(out2 != null && out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this5 = out2.zpp_inner;
				if(_this5._validate != null) {
					_this5._validate();
				}
				let t = out2.zpp_inner.x;
				if(out2 != null && out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this6 = out2.zpp_inner;
				if(_this6._validate != null) {
					_this6._validate();
				}
				let t1 = t * out2.zpp_inner.x;
				if(out2 != null && out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this7 = out2.zpp_inner;
				if(_this7._validate != null) {
					_this7._validate();
				}
				let t2 = out2.zpp_inner.y;
				if(out2 != null && out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this8 = out2.zpp_inner;
				if(_this8._validate != null) {
					_this8._validate();
				}
				let t3 = F / Math.sqrt(t1 + t2 * out2.zpp_inner.y);
				if(out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this9 = out2.zpp_inner;
				if(_this9._validate != null) {
					_this9._validate();
				}
				let x = out2.zpp_inner.x * t3;
				if(out2 != null && out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this10 = out2.zpp_inner;
				if(_this10._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this10._isimmutable != null) {
					_this10._isimmutable();
				}
				if(out2 != null && out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this11 = out2.zpp_inner;
				if(_this11._validate != null) {
					_this11._validate();
				}
				if(out2.zpp_inner.x != x) {
					if(x != x) {
						throw haxe_Exception.thrown("Error: Vec2::" + "x" + " cannot be NaN");
					}
					out2.zpp_inner.x = x;
					let _this = out2.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
				if(out2 != null && out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this12 = out2.zpp_inner;
				if(_this12._validate != null) {
					_this12._validate();
				}
				if(out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this13 = out2.zpp_inner;
				if(_this13._validate != null) {
					_this13._validate();
				}
				let y = out2.zpp_inner.y * t3;
				if(out2 != null && out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this14 = out2.zpp_inner;
				if(_this14._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this14._isimmutable != null) {
					_this14._isimmutable();
				}
				if(out2 != null && out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this15 = out2.zpp_inner;
				if(_this15._validate != null) {
					_this15._validate();
				}
				if(out2.zpp_inner.y != y) {
					if(y != y) {
						throw haxe_Exception.thrown("Error: Vec2::" + "y" + " cannot be NaN");
					}
					out2.zpp_inner.y = y;
					let _this = out2.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
				if(out2 != null && out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this16 = out2.zpp_inner;
				if(_this16._validate != null) {
					_this16._validate();
				}
				let _this17 = out2.zpp_inner;
				if(_this17._invalidate != null) {
					_this17._invalidate(_this17);
				}
				if(out2 != null && out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				if(out2 != null && out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this18 = out2.zpp_inner;
				if(_this18._validate != null) {
					_this18._validate();
				}
				let tmp3 = out2.zpp_inner.x;
				if(out2 != null && out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this19 = out2.zpp_inner;
				if(_this19._validate != null) {
					_this19._validate();
				}
				let tmp4 = tmp3 * out2.zpp_inner.x;
				if(out2 != null && out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this20 = out2.zpp_inner;
				if(_this20._validate != null) {
					_this20._validate();
				}
				let tmp5 = out2.zpp_inner.y;
				if(out2 != null && out2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this21 = out2.zpp_inner;
				if(_this21._validate != null) {
					_this21._validate();
				}
				let tmp6 = tmp4 + tmp5 * out2.zpp_inner.y;
				this.body2.applyImpulse(out2,globalAnchor2);
			}
		}
	}
	__prepare() {
	}
	__position(err) {
	}
	__velocity(err) {
	}
	__eff_mass(eff) {
	}
	__impulse(imp,body,out) {
	}
}
