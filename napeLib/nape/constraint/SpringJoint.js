import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import Vec2 from '../geom/Vec2.js';
import UserConstraint from './UserConstraint.js';
import Constraint from './Constraint.js';
export default class SpringJoint extends UserConstraint {
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
		return new SpringJoint(this.body1,this.body2,this.anchor1,this.anchor2,this.length);
	}
	__warmStart() {
		this.__spji();
	}
	__validate() {
		if(this.body1 == null || this.body2 == null) {
			throw haxe_Exception.thrown("Error : joint cannot be simulated with null bodies ! ");
		}
		if(this.zpp_inner.damping < 0 || this.zpp_inner.damping > 2) {
			throw haxe_Exception.thrown("Error : The value of damping must be between 0 and 2");
		}
	}
	__spji() {
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
		let dl = l - dis3;
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = v.zpp_inner;
		if(_this4._validate != null) {
			_this4._validate();
		}
		let tmp = v.zpp_inner.x;
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this5 = v.zpp_inner;
		if(_this5._validate != null) {
			_this5._validate();
		}
		let tmp1 = tmp * v.zpp_inner.x;
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this6 = v.zpp_inner;
		if(_this6._validate != null) {
			_this6._validate();
		}
		let tmp2 = v.zpp_inner.y;
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this7 = v.zpp_inner;
		if(_this7._validate != null) {
			_this7._validate();
		}
		if(Math.sqrt(tmp1 + tmp2 * v.zpp_inner.y) == 0) {
			return;
		}
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this8 = v.zpp_inner;
		if(_this8._validate != null) {
			_this8._validate();
		}
		let unitVec = v.zpp_inner.x;
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this9 = v.zpp_inner;
		if(_this9._validate != null) {
			_this9._validate();
		}
		let unitVec1 = unitVec * v.zpp_inner.x;
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this10 = v.zpp_inner;
		if(_this10._validate != null) {
			_this10._validate();
		}
		let unitVec2 = v.zpp_inner.y;
		if(v != null && v.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this11 = v.zpp_inner;
		if(_this11._validate != null) {
			_this11._validate();
		}
		let unitVec3 = v.mul(1 / Math.sqrt(unitVec1 + unitVec2 * v.zpp_inner.y));
		let bodyAry = [this.body1,this.body2];
		let anchor;
		let bd;
		let _g = 0;
		while(_g < bodyAry.length) {
			let bd = bodyAry[_g];
			++_g;
			let body = bd;
			if(body == (body.zpp_inner.space == null ? null : body.zpp_inner.space.outer).zpp_inner.__static) {
				continue;
			}
			let out = new Vec2();
			let velocity;
			let _v;
			if(body == this.body1) {
				let _this = this.body1;
				if(_this.zpp_inner.wrap_vel == null) {
					_this.zpp_inner.setupVelocity();
				}
				let velocity1 = _this.zpp_inner.wrap_vel;
				let _this1 = this.body2;
				if(_this1.zpp_inner.wrap_vel == null) {
					_this1.zpp_inner.setupVelocity();
				}
				velocity = velocity1.sub(_this1.zpp_inner.wrap_vel);
			} else {
				let _this = this.body2;
				if(_this.zpp_inner.wrap_vel == null) {
					_this.zpp_inner.setupVelocity();
				}
				let velocity1 = _this.zpp_inner.wrap_vel;
				let _this1 = this.body1;
				if(_this1.zpp_inner.wrap_vel == null) {
					_this1.zpp_inner.setupVelocity();
				}
				velocity = velocity1.sub(_this1.zpp_inner.wrap_vel);
			}
			let _this = globalAnchor1.sub(globalAnchor2);
			if(_this != null && _this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			if(_this != null && _this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = _this.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			let spring_max_length = _this.zpp_inner.x;
			if(_this != null && _this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = _this.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			let spring_max_length1 = spring_max_length * _this.zpp_inner.x;
			if(_this != null && _this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = _this.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			let spring_max_length2 = _this.zpp_inner.y;
			if(_this != null && _this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this4 = _this.zpp_inner;
			if(_this4._validate != null) {
				_this4._validate();
			}
			let spring_max_length3 = Math.sqrt(spring_max_length1 + spring_max_length2 * _this.zpp_inner.y);
			if(velocity != null && velocity.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			if(velocity != null && velocity.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this5 = velocity.zpp_inner;
			if(_this5._validate != null) {
				_this5._validate();
			}
			let tmp = velocity.zpp_inner.x;
			if(velocity != null && velocity.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this6 = velocity.zpp_inner;
			if(_this6._validate != null) {
				_this6._validate();
			}
			let tmp1 = tmp * velocity.zpp_inner.x;
			if(velocity != null && velocity.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this7 = velocity.zpp_inner;
			if(_this7._validate != null) {
				_this7._validate();
			}
			let tmp2 = velocity.zpp_inner.y;
			if(velocity != null && velocity.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this8 = velocity.zpp_inner;
			if(_this8._validate != null) {
				_this8._validate();
			}
			if(Math.sqrt(tmp1 + tmp2 * velocity.zpp_inner.y) > spring_max_length3) {
				if(velocity != null && velocity.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				if(velocity != null && velocity.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = velocity.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				let velocity1 = velocity.zpp_inner.x;
				if(velocity != null && velocity.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = velocity.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				let velocity2 = velocity1 * velocity.zpp_inner.x;
				if(velocity != null && velocity.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this2 = velocity.zpp_inner;
				if(_this2._validate != null) {
					_this2._validate();
				}
				let velocity3 = velocity.zpp_inner.y;
				if(velocity != null && velocity.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this3 = velocity.zpp_inner;
				if(_this3._validate != null) {
					_this3._validate();
				}
				velocity = velocity.mul(spring_max_length3 / Math.sqrt(velocity2 + velocity3 * velocity.zpp_inner.y));
			}
			let tmp3;
			if(velocity != null && velocity.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			if(velocity != null && velocity.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this9 = velocity.zpp_inner;
			if(_this9._validate != null) {
				_this9._validate();
			}
			let tmp4 = velocity.zpp_inner.x;
			if(velocity != null && velocity.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this10 = velocity.zpp_inner;
			if(_this10._validate != null) {
				_this10._validate();
			}
			let tmp5 = tmp4 * velocity.zpp_inner.x;
			if(velocity != null && velocity.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this11 = velocity.zpp_inner;
			if(_this11._validate != null) {
				_this11._validate();
			}
			let tmp6 = velocity.zpp_inner.y;
			if(velocity != null && velocity.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this12 = velocity.zpp_inner;
			if(_this12._validate != null) {
				_this12._validate();
			}
			if(Math.sqrt(tmp5 + tmp6 * velocity.zpp_inner.y) != 0) {
				if(unitVec3 != null && unitVec3.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				if(unitVec3 != null && unitVec3.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = unitVec3.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				let tmp = unitVec3.zpp_inner.x;
				if(unitVec3 != null && unitVec3.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = unitVec3.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				let tmp1 = tmp * unitVec3.zpp_inner.x;
				if(unitVec3 != null && unitVec3.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this2 = unitVec3.zpp_inner;
				if(_this2._validate != null) {
					_this2._validate();
				}
				let tmp2 = unitVec3.zpp_inner.y;
				if(unitVec3 != null && unitVec3.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this3 = unitVec3.zpp_inner;
				if(_this3._validate != null) {
					_this3._validate();
				}
				tmp3 = Math.sqrt(tmp1 + tmp2 * unitVec3.zpp_inner.y) != 0;
			} else {
				tmp3 = false;
			}
			if(tmp3) {
				let dotValue = velocity.dot(unitVec3);
				_v = this.project(velocity,unitVec3);
			} else {
				_v = new Vec2();
			}
			if(_v != null && _v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this13 = _v.zpp_inner;
			if(_this13._validate != null) {
				_this13._validate();
			}
			let dvx = _v.zpp_inner.x * this.zpp_inner.damping * this.DAMPING_K;
			if(_v != null && _v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this14 = _v.zpp_inner;
			if(_this14._validate != null) {
				_this14._validate();
			}
			let dvy = _v.zpp_inner.y * this.zpp_inner.damping * this.DAMPING_K;
			if(body == this.body1) {
				if(unitVec3 != null && unitVec3.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = unitVec3.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				let x = unitVec3.zpp_inner.x * dl * k;
				if(out != null && out.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = out.zpp_inner;
				if(_this1._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this1._isimmutable != null) {
					_this1._isimmutable();
				}
				if(out != null && out.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this2 = out.zpp_inner;
				if(_this2._validate != null) {
					_this2._validate();
				}
				if(out.zpp_inner.x != x) {
					if(x != x) {
						throw haxe_Exception.thrown("Error: Vec2::" + "x" + " cannot be NaN");
					}
					out.zpp_inner.x = x;
					let _this = out.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
				if(out != null && out.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this3 = out.zpp_inner;
				if(_this3._validate != null) {
					_this3._validate();
				}
				if(unitVec3 != null && unitVec3.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this4 = unitVec3.zpp_inner;
				if(_this4._validate != null) {
					_this4._validate();
				}
				let y = unitVec3.zpp_inner.y * dl * k;
				if(out != null && out.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this5 = out.zpp_inner;
				if(_this5._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this5._isimmutable != null) {
					_this5._isimmutable();
				}
				if(out != null && out.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this6 = out.zpp_inner;
				if(_this6._validate != null) {
					_this6._validate();
				}
				if(out.zpp_inner.y != y) {
					if(y != y) {
						throw haxe_Exception.thrown("Error: Vec2::" + "y" + " cannot be NaN");
					}
					out.zpp_inner.y = y;
					let _this = out.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
				if(out != null && out.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this7 = out.zpp_inner;
				if(_this7._validate != null) {
					_this7._validate();
				}
				anchor = globalAnchor1;
			} else if(body == this.body2) {
				if(unitVec3 != null && unitVec3.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = unitVec3.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				let x = unitVec3.zpp_inner.x * dl * -1 * k;
				if(out != null && out.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = out.zpp_inner;
				if(_this1._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this1._isimmutable != null) {
					_this1._isimmutable();
				}
				if(out != null && out.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this2 = out.zpp_inner;
				if(_this2._validate != null) {
					_this2._validate();
				}
				if(out.zpp_inner.x != x) {
					if(x != x) {
						throw haxe_Exception.thrown("Error: Vec2::" + "x" + " cannot be NaN");
					}
					out.zpp_inner.x = x;
					let _this = out.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
				if(out != null && out.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this3 = out.zpp_inner;
				if(_this3._validate != null) {
					_this3._validate();
				}
				if(unitVec3 != null && unitVec3.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this4 = unitVec3.zpp_inner;
				if(_this4._validate != null) {
					_this4._validate();
				}
				let y = unitVec3.zpp_inner.y * dl * -1 * k;
				if(out != null && out.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this5 = out.zpp_inner;
				if(_this5._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this5._isimmutable != null) {
					_this5._isimmutable();
				}
				if(out != null && out.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this6 = out.zpp_inner;
				if(_this6._validate != null) {
					_this6._validate();
				}
				if(out.zpp_inner.y != y) {
					if(y != y) {
						throw haxe_Exception.thrown("Error: Vec2::" + "y" + " cannot be NaN");
					}
					out.zpp_inner.y = y;
					let _this = out.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
				if(out != null && out.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this7 = out.zpp_inner;
				if(_this7._validate != null) {
					_this7._validate();
				}
				anchor = globalAnchor2;
			}
			if(out != null && out.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this15 = out.zpp_inner;
			if(_this15._validate != null) {
				_this15._validate();
			}
			let x = out.zpp_inner.x - dvx;
			if(out != null && out.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this16 = out.zpp_inner;
			if(_this16._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this16._isimmutable != null) {
				_this16._isimmutable();
			}
			if(out != null && out.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this17 = out.zpp_inner;
			if(_this17._validate != null) {
				_this17._validate();
			}
			if(out.zpp_inner.x != x) {
				if(x != x) {
					throw haxe_Exception.thrown("Error: Vec2::" + "x" + " cannot be NaN");
				}
				out.zpp_inner.x = x;
				let _this = out.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
			if(out != null && out.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this18 = out.zpp_inner;
			if(_this18._validate != null) {
				_this18._validate();
			}
			if(out != null && out.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this19 = out.zpp_inner;
			if(_this19._validate != null) {
				_this19._validate();
			}
			let y = out.zpp_inner.y - dvy;
			if(out != null && out.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this20 = out.zpp_inner;
			if(_this20._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this20._isimmutable != null) {
				_this20._isimmutable();
			}
			if(out != null && out.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this21 = out.zpp_inner;
			if(_this21._validate != null) {
				_this21._validate();
			}
			if(out.zpp_inner.y != y) {
				if(y != y) {
					throw haxe_Exception.thrown("Error: Vec2::" + "y" + " cannot be NaN");
				}
				out.zpp_inner.y = y;
				let _this = out.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
			if(out != null && out.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this22 = out.zpp_inner;
			if(_this22._validate != null) {
				_this22._validate();
			}
			if(this.body1 != (body.zpp_inner.space == null ? null : body.zpp_inner.space.outer).zpp_inner.__static && this.body2 != (body.zpp_inner.space == null ? null : body.zpp_inner.space.outer).zpp_inner.__static) {
				this.body1.applyImpulse(out.mul(this.SPRING_FORCE_SCALE),globalAnchor1);
				this.body2.applyImpulse(out.mul(this.SPRING_FORCE_SCALE * -1),globalAnchor2);
			} else if(this.body1 == (body.zpp_inner.space == null ? null : body.zpp_inner.space.outer).zpp_inner.__static) {
				this.body2.applyImpulse(out.mul(this.SPRING_FORCE_SCALE),globalAnchor2);
			} else if(this.body2 == (body.zpp_inner.space == null ? null : body.zpp_inner.space.outer).zpp_inner.__static) {
				this.body1.applyImpulse(out.mul(this.SPRING_FORCE_SCALE),globalAnchor1);
			}
			break;
		}
	}
	project(v1,v2) {
		let dp1 = this.dotProduct(v1,v2);
		let normal2 = v2.unit();
		if(normal2 != null && normal2.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = normal2.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let vx = dp1 * normal2.zpp_inner.x;
		if(normal2 != null && normal2.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = normal2.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let vy = dp1 * normal2.zpp_inner.y;
		let x = vx;
		let y = vy;
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
		let projectionVector = ret;
		return projectionVector;
	}
	dotProduct(v1,v2) {
		let n2 = v2.unit();
		if(v1 != null && v1.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = v1.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let tmp = v1.zpp_inner.x;
		if(n2 != null && n2.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = n2.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let tmp1 = tmp * n2.zpp_inner.x;
		if(v1 != null && v1.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = v1.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let tmp2 = v1.zpp_inner.y;
		if(n2 != null && n2.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = n2.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		return tmp1 + tmp2 * n2.zpp_inner.y;
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
