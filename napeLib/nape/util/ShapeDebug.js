import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZPP_ShapeDebug from '../../zpp_nape/util/ZPP_ShapeDebug.js';
import ZPP_Debug from '../../zpp_nape/util/ZPP_Debug.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import Debug from './Debug.js';
import Space from '../space/Space.js';
import Shape from '../shape/Shape.js';
import Compound from '../phys/Compound.js';
import Body from '../phys/Body.js';
import Vec2List from '../geom/Vec2List.js';
import Vec2Iterator from '../geom/Vec2Iterator.js';
import Vec2 from '../geom/Vec2.js';
import GeomPoly from '../geom/GeomPoly.js';
import Geom from '../geom/Geom.js';
import Constraint from '../constraint/Constraint.js';
export default class ShapeDebug extends Debug {
	constructor(width,height,bgColour) {
		Debug._hx_skip_constructor = true;
		super();
		Debug._hx_skip_constructor = false;
		this._hx_constructor(width,height,bgColour);
	}
	_hx_constructor(width,height,bgColour) {
		if(bgColour == null) {
			bgColour = 3355443;
		}
		this.thickness = 0.0;
		this.zpp_inner_zn = null;
		if(width <= 0) {
			throw haxe_Exception.thrown("Error: Debug width must be > 0");
		}
		if(height <= 0) {
			throw haxe_Exception.thrown("Error: Debug height must be > 0");
		}
		ZPP_Debug.internal = true;
		super._hx_constructor();
		ZPP_Debug.internal = false;
		this.zpp_inner_zn = new ZPP_ShapeDebug(width,height);
		this.zpp_inner_zn.outer_zn = this;
		this.zpp_inner = this.zpp_inner_zn;
		this.zpp_inner.outer = this;
		this.zpp_inner.d_shape.setbg(bgColour);
		this.thickness = 2;
	}
	clear() {
		this.zpp_inner_zn.graphics.clear();
	}
	drawLine(start,end,colour) {
		if(this.zpp_inner.xform != null && !this.zpp_inner.xform.outer.equiorthogonal()) {
			throw haxe_Exception.thrown("Error: Debug draw can only operate with an equiorthogonal transform!");
		}
		if(start != null && start.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(end != null && end.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(start == null) {
			throw haxe_Exception.thrown("Error: drawLine::start cannot be null");
		}
		if(end == null) {
			throw haxe_Exception.thrown("Error: drawLine::end cannot be null");
		}
		let g = this.zpp_inner_zn.graphics;
		g.lineStyle(this.thickness,colour & 16777215,1);
		if(this.zpp_inner.xnull) {
			if(start != null && start.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = start.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let tmp = start.zpp_inner.x;
			if(start != null && start.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = start.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			g.moveTo(tmp,start.zpp_inner.y);
			if(end != null && end.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = end.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			let tmp1 = end.zpp_inner.x;
			if(end != null && end.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = end.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			g.lineTo(tmp1,end.zpp_inner.y);
			if(start.zpp_inner.weak) {
				if(start != null && start.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = start.zpp_inner;
				if(_this._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this._isimmutable != null) {
					_this._isimmutable();
				}
				if(start.zpp_inner._inuse) {
					throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
				}
				let inner = start.zpp_inner;
				start.zpp_inner.outer = null;
				start.zpp_inner = null;
				let o = start;
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
			if(end.zpp_inner.weak) {
				if(end != null && end.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = end.zpp_inner;
				if(_this._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this._isimmutable != null) {
					_this._isimmutable();
				}
				if(end.zpp_inner._inuse) {
					throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
				}
				let inner = end.zpp_inner;
				end.zpp_inner.outer = null;
				end.zpp_inner = null;
				let o = end;
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
		} else {
			let v = this.zpp_inner.xform.outer.transform(start);
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = v.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let tmp = v.zpp_inner.x;
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = v.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			g.moveTo(tmp,v.zpp_inner.y);
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = v.zpp_inner;
			if(_this2._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this2._isimmutable != null) {
				_this2._isimmutable();
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
			v = this.zpp_inner.xform.outer.transform(end);
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = v.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			let tmp1 = v.zpp_inner.x;
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this4 = v.zpp_inner;
			if(_this4._validate != null) {
				_this4._validate();
			}
			g.lineTo(tmp1,v.zpp_inner.y);
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this5 = v.zpp_inner;
			if(_this5._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this5._isimmutable != null) {
				_this5._isimmutable();
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
		}
	}
	drawCurve(start,control,end,colour) {
		if(this.zpp_inner.xform != null && !this.zpp_inner.xform.outer.equiorthogonal()) {
			throw haxe_Exception.thrown("Error: Debug draw can only operate with an equiorthogonal transform!");
		}
		if(start != null && start.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(control != null && control.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(end != null && end.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(start == null) {
			throw haxe_Exception.thrown("Error: drawCurve::start cannot be null");
		}
		if(control == null) {
			throw haxe_Exception.thrown("Error: drawCurve::control cannot be null");
		}
		if(end == null) {
			throw haxe_Exception.thrown("Error: drawCurve::end cannot be null");
		}
		let g = this.zpp_inner_zn.graphics;
		g.lineStyle(this.thickness,colour & 16777215,1);
		if(this.zpp_inner.xnull) {
			if(start != null && start.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = start.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let tmp = start.zpp_inner.x;
			if(start != null && start.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = start.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			g.moveTo(tmp,start.zpp_inner.y);
			if(control != null && control.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = control.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			let tmp1 = control.zpp_inner.x;
			if(control != null && control.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = control.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			let tmp2 = control.zpp_inner.y;
			if(end != null && end.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this4 = end.zpp_inner;
			if(_this4._validate != null) {
				_this4._validate();
			}
			let tmp3 = end.zpp_inner.x;
			if(end != null && end.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this5 = end.zpp_inner;
			if(_this5._validate != null) {
				_this5._validate();
			}
			g.quadraticCurveTo(tmp1,tmp2,tmp3,end.zpp_inner.y);
			if(start.zpp_inner.weak) {
				if(start != null && start.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = start.zpp_inner;
				if(_this._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this._isimmutable != null) {
					_this._isimmutable();
				}
				if(start.zpp_inner._inuse) {
					throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
				}
				let inner = start.zpp_inner;
				start.zpp_inner.outer = null;
				start.zpp_inner = null;
				let o = start;
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
			if(control.zpp_inner.weak) {
				if(control != null && control.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = control.zpp_inner;
				if(_this._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this._isimmutable != null) {
					_this._isimmutable();
				}
				if(control.zpp_inner._inuse) {
					throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
				}
				let inner = control.zpp_inner;
				control.zpp_inner.outer = null;
				control.zpp_inner = null;
				let o = control;
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
			if(end.zpp_inner.weak) {
				if(end != null && end.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = end.zpp_inner;
				if(_this._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this._isimmutable != null) {
					_this._isimmutable();
				}
				if(end.zpp_inner._inuse) {
					throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
				}
				let inner = end.zpp_inner;
				end.zpp_inner.outer = null;
				end.zpp_inner = null;
				let o = end;
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
		} else {
			let u = this.zpp_inner.xform.outer.transform(start);
			let v = this.zpp_inner.xform.outer.transform(control);
			let q = this.zpp_inner.xform.outer.transform(end);
			if(u != null && u.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = u.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let tmp = u.zpp_inner.x;
			if(u != null && u.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = u.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			g.moveTo(tmp,u.zpp_inner.y);
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = v.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			let tmp1 = v.zpp_inner.x;
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = v.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			let tmp2 = v.zpp_inner.y;
			if(q != null && q.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this4 = q.zpp_inner;
			if(_this4._validate != null) {
				_this4._validate();
			}
			let tmp3 = q.zpp_inner.x;
			if(q != null && q.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this5 = q.zpp_inner;
			if(_this5._validate != null) {
				_this5._validate();
			}
			g.quadraticCurveTo(tmp1,tmp2,tmp3,q.zpp_inner.y);
			if(u != null && u.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this6 = u.zpp_inner;
			if(_this6._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this6._isimmutable != null) {
				_this6._isimmutable();
			}
			if(u.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = u.zpp_inner;
			u.zpp_inner.outer = null;
			u.zpp_inner = null;
			let o = u;
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
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this7 = v.zpp_inner;
			if(_this7._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this7._isimmutable != null) {
				_this7._isimmutable();
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
			if(q != null && q.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this8 = q.zpp_inner;
			if(_this8._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this8._isimmutable != null) {
				_this8._isimmutable();
			}
			if(q.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner2 = q.zpp_inner;
			q.zpp_inner.outer = null;
			q.zpp_inner = null;
			let o4 = q;
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
	drawCircle(position,radius,colour) {
		if(this.zpp_inner.xform != null && !this.zpp_inner.xform.outer.equiorthogonal()) {
			throw haxe_Exception.thrown("Error: Debug draw can only operate with an equiorthogonal transform!");
		}
		if(position != null && position.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(position == null) {
			throw haxe_Exception.thrown("Error: drawCircle::position cannot be null");
		}
		if(radius != radius || radius < 0) {
			throw haxe_Exception.thrown("Error: drawCircle::radius must be >=0");
		}
		let g = this.zpp_inner_zn.graphics;
		g.lineStyle(this.thickness,colour & 16777215,1);
		if(this.zpp_inner.xnull) {
			if(position != null && position.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = position.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let tmp = position.zpp_inner.x;
			if(position != null && position.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = position.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			g.drawCircle(tmp,position.zpp_inner.y,radius);
			if(position.zpp_inner.weak) {
				if(position != null && position.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = position.zpp_inner;
				if(_this._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this._isimmutable != null) {
					_this._isimmutable();
				}
				if(position.zpp_inner._inuse) {
					throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
				}
				let inner = position.zpp_inner;
				position.zpp_inner.outer = null;
				position.zpp_inner = null;
				let o = position;
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
		} else {
			let v = this.zpp_inner.xform.outer.transform(position);
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = v.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let tmp = v.zpp_inner.x;
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = v.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			g.drawCircle(tmp,v.zpp_inner.y,radius * this.zpp_inner.xdet);
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = v.zpp_inner;
			if(_this2._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this2._isimmutable != null) {
				_this2._isimmutable();
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
		}
	}
	drawAABB(aabb,colour) {
		if(this.zpp_inner.xform != null && !this.zpp_inner.xform.outer.equiorthogonal()) {
			throw haxe_Exception.thrown("Error: Debug draw can only operate with an equiorthogonal transform!");
		}
		if(aabb == null) {
			throw haxe_Exception.thrown("Error: drawAABB::aabb cannot be null");
		}
		let g = this.zpp_inner_zn.graphics;
		g.lineStyle(this.thickness,colour & 16777215,1);
		if(this.zpp_inner.xnull) {
			let _this = aabb.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let tmp = aabb.zpp_inner.minx;
			let _this1 = aabb.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			let tmp1 = aabb.zpp_inner.miny;
			let _this2 = aabb.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			let _this3 = aabb.zpp_inner;
			let tmp2 = _this3.maxx - _this3.minx;
			let _this4 = aabb.zpp_inner;
			if(_this4._validate != null) {
				_this4._validate();
			}
			let _this5 = aabb.zpp_inner;
			g.drawRect(tmp,tmp1,tmp2,_this5.maxy - _this5.miny);
		} else {
			let v = this.zpp_inner.xform.outer.transform(aabb.zpp_inner.getmin());
			let _this = aabb.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let _this1 = aabb.zpp_inner;
			let x = _this1.maxx - _this1.minx;
			let y = 0;
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
			let w = ret;
			let w2 = this.zpp_inner.xform.outer.transform(w,true);
			let x1 = 0;
			let _this2 = aabb.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			let _this3 = aabb.zpp_inner;
			let y1 = _this3.maxy - _this3.miny;
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
				let tmp;
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
					tmp = ret1.zpp_inner.y == y1;
				} else {
					tmp = false;
				}
				if(!tmp) {
					ret1.zpp_inner.x = x1;
					ret1.zpp_inner.y = y1;
					let _this = ret1.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
			}
			ret1.zpp_inner.weak = false;
			let h = ret1;
			let h2 = this.zpp_inner.xform.outer.transform(h,true);
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
			g.moveTo(tmp,v.zpp_inner.y);
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this6 = v.zpp_inner;
			if(_this6._validate != null) {
				_this6._validate();
			}
			let tmp1 = v.zpp_inner.x;
			if(w2 != null && w2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this7 = w2.zpp_inner;
			if(_this7._validate != null) {
				_this7._validate();
			}
			let tmp2 = tmp1 + w2.zpp_inner.x;
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this8 = v.zpp_inner;
			if(_this8._validate != null) {
				_this8._validate();
			}
			let tmp3 = v.zpp_inner.y;
			if(w2 != null && w2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this9 = w2.zpp_inner;
			if(_this9._validate != null) {
				_this9._validate();
			}
			g.lineTo(tmp2,tmp3 + w2.zpp_inner.y);
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this10 = v.zpp_inner;
			if(_this10._validate != null) {
				_this10._validate();
			}
			let tmp4 = v.zpp_inner.x;
			if(w2 != null && w2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this11 = w2.zpp_inner;
			if(_this11._validate != null) {
				_this11._validate();
			}
			let tmp5 = tmp4 + w2.zpp_inner.x;
			if(h2 != null && h2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this12 = h2.zpp_inner;
			if(_this12._validate != null) {
				_this12._validate();
			}
			let tmp6 = tmp5 + h2.zpp_inner.x;
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this13 = v.zpp_inner;
			if(_this13._validate != null) {
				_this13._validate();
			}
			let tmp7 = v.zpp_inner.y;
			if(w2 != null && w2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this14 = w2.zpp_inner;
			if(_this14._validate != null) {
				_this14._validate();
			}
			let tmp8 = tmp7 + w2.zpp_inner.y;
			if(h2 != null && h2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this15 = h2.zpp_inner;
			if(_this15._validate != null) {
				_this15._validate();
			}
			g.lineTo(tmp6,tmp8 + h2.zpp_inner.y);
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this16 = v.zpp_inner;
			if(_this16._validate != null) {
				_this16._validate();
			}
			let tmp9 = v.zpp_inner.x;
			if(h2 != null && h2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this17 = h2.zpp_inner;
			if(_this17._validate != null) {
				_this17._validate();
			}
			let tmp10 = tmp9 + h2.zpp_inner.x;
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this18 = v.zpp_inner;
			if(_this18._validate != null) {
				_this18._validate();
			}
			let tmp11 = v.zpp_inner.y;
			if(h2 != null && h2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this19 = h2.zpp_inner;
			if(_this19._validate != null) {
				_this19._validate();
			}
			g.lineTo(tmp10,tmp11 + h2.zpp_inner.y);
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this20 = v.zpp_inner;
			if(_this20._validate != null) {
				_this20._validate();
			}
			let tmp12 = v.zpp_inner.x;
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this21 = v.zpp_inner;
			if(_this21._validate != null) {
				_this21._validate();
			}
			g.lineTo(tmp12,v.zpp_inner.y);
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this22 = v.zpp_inner;
			if(_this22._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this22._isimmutable != null) {
				_this22._isimmutable();
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
			if(w != null && w.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this23 = w.zpp_inner;
			if(_this23._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this23._isimmutable != null) {
				_this23._isimmutable();
			}
			if(w.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner1 = w.zpp_inner;
			w.zpp_inner.outer = null;
			w.zpp_inner = null;
			let o2 = w;
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
			if(w2 != null && w2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this24 = w2.zpp_inner;
			if(_this24._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this24._isimmutable != null) {
				_this24._isimmutable();
			}
			if(w2.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner2 = w2.zpp_inner;
			w2.zpp_inner.outer = null;
			w2.zpp_inner = null;
			let o4 = w2;
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
			if(h != null && h.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this25 = h.zpp_inner;
			if(_this25._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this25._isimmutable != null) {
				_this25._isimmutable();
			}
			if(h.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner3 = h.zpp_inner;
			h.zpp_inner.outer = null;
			h.zpp_inner = null;
			let o6 = h;
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
			if(h2 != null && h2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this26 = h2.zpp_inner;
			if(_this26._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this26._isimmutable != null) {
				_this26._isimmutable();
			}
			if(h2.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner4 = h2.zpp_inner;
			h2.zpp_inner.outer = null;
			h2.zpp_inner = null;
			let o8 = h2;
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
	drawFilledTriangle(p0,p1,p2,colour) {
		if(this.zpp_inner.xform != null && !this.zpp_inner.xform.outer.equiorthogonal()) {
			throw haxe_Exception.thrown("Error: Debug draw can only operate with an equiorthogonal transform!");
		}
		if(p0 != null && p0.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(p1 != null && p1.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(p2 != null && p2.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(p0 == null || p1 == null || p2 == null) {
			throw haxe_Exception.thrown("Error: drawFilledTriangle can't use null points");
		}
		let g = this.zpp_inner_zn.graphics;
		g.lineStyle(0,0,0);
		g.beginFill(colour & 16777215,1);
		if(this.zpp_inner.xnull) {
			if(p0 != null && p0.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = p0.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let tmp = p0.zpp_inner.x;
			if(p0 != null && p0.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = p0.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			g.moveTo(tmp,p0.zpp_inner.y);
			if(p1 != null && p1.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = p1.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			let tmp1 = p1.zpp_inner.x;
			if(p1 != null && p1.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = p1.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			g.lineTo(tmp1,p1.zpp_inner.y);
			if(p2 != null && p2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this4 = p2.zpp_inner;
			if(_this4._validate != null) {
				_this4._validate();
			}
			let tmp2 = p2.zpp_inner.x;
			if(p2 != null && p2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this5 = p2.zpp_inner;
			if(_this5._validate != null) {
				_this5._validate();
			}
			g.lineTo(tmp2,p2.zpp_inner.y);
			if(p0.zpp_inner.weak) {
				if(p0 != null && p0.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = p0.zpp_inner;
				if(_this._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this._isimmutable != null) {
					_this._isimmutable();
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
			}
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
			if(p2.zpp_inner.weak) {
				if(p2 != null && p2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = p2.zpp_inner;
				if(_this._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this._isimmutable != null) {
					_this._isimmutable();
				}
				if(p2.zpp_inner._inuse) {
					throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
				}
				let inner = p2.zpp_inner;
				p2.zpp_inner.outer = null;
				p2.zpp_inner = null;
				let o = p2;
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
		} else {
			let v = this.zpp_inner.xform.outer.transform(p0);
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = v.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let tmp = v.zpp_inner.x;
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = v.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			g.moveTo(tmp,v.zpp_inner.y);
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = v.zpp_inner;
			if(_this2._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this2._isimmutable != null) {
				_this2._isimmutable();
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
			v = this.zpp_inner.xform.outer.transform(p1);
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = v.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			let tmp1 = v.zpp_inner.x;
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this4 = v.zpp_inner;
			if(_this4._validate != null) {
				_this4._validate();
			}
			g.lineTo(tmp1,v.zpp_inner.y);
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this5 = v.zpp_inner;
			if(_this5._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this5._isimmutable != null) {
				_this5._isimmutable();
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
			v = this.zpp_inner.xform.outer.transform(p2);
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this6 = v.zpp_inner;
			if(_this6._validate != null) {
				_this6._validate();
			}
			let tmp2 = v.zpp_inner.x;
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this7 = v.zpp_inner;
			if(_this7._validate != null) {
				_this7._validate();
			}
			g.lineTo(tmp2,v.zpp_inner.y);
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this8 = v.zpp_inner;
			if(_this8._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this8._isimmutable != null) {
				_this8._isimmutable();
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
		}
		g.endFill();
	}
	drawFilledCircle(position,radius,colour) {
		if(this.zpp_inner.xform != null && !this.zpp_inner.xform.outer.equiorthogonal()) {
			throw haxe_Exception.thrown("Error: Debug draw can only operate with an equiorthogonal transform!");
		}
		if(position != null && position.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(position == null) {
			throw haxe_Exception.thrown("Error: drawFilledCircle::position cannot be null");
		}
		if(radius != radius || radius < 0) {
			throw haxe_Exception.thrown("Error: drawFilledCircle::radius must be >=0");
		}
		let g = this.zpp_inner_zn.graphics;
		g.lineStyle(0,0,0);
		g.beginFill(colour & 16777215,1);
		if(this.zpp_inner.xnull) {
			if(position != null && position.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = position.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let tmp = position.zpp_inner.x;
			if(position != null && position.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = position.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			g.drawCircle(tmp,position.zpp_inner.y,radius);
			if(position.zpp_inner.weak) {
				if(position != null && position.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = position.zpp_inner;
				if(_this._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this._isimmutable != null) {
					_this._isimmutable();
				}
				if(position.zpp_inner._inuse) {
					throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
				}
				let inner = position.zpp_inner;
				position.zpp_inner.outer = null;
				position.zpp_inner = null;
				let o = position;
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
		} else {
			let v = this.zpp_inner.xform.outer.transform(position);
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = v.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let tmp = v.zpp_inner.x;
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = v.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			g.drawCircle(tmp,v.zpp_inner.y,radius * this.zpp_inner.xdet);
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = v.zpp_inner;
			if(_this2._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this2._isimmutable != null) {
				_this2._isimmutable();
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
		}
		g.endFill();
	}
	drawPolygon(polygon,colour) {
		if(this.zpp_inner.xform != null && !this.zpp_inner.xform.outer.equiorthogonal()) {
			throw haxe_Exception.thrown("Error: Debug draw can only operate with an equiorthogonal transform!");
		}
		if(polygon == null) {
			throw haxe_Exception.thrown("Error: Cannot draw null polygon");
		}
		let g = this.zpp_inner_zn.graphics;
		g.lineStyle(this.thickness,colour & 16777215,1.0);
		let fst = null;
		let fsttime = true;
		if(this.zpp_inner.xnull) {
			if(((polygon) instanceof Array)) {
				let lv = polygon;
				let _g = 0;
				while(_g < lv.length) {
					let vite = lv[_g];
					++_g;
					if(vite == null) {
						throw haxe_Exception.thrown("Error: Array<Vec2> contains null objects");
					}
					if(!((vite) instanceof Vec2)) {
						throw haxe_Exception.thrown("Error: Array<Vec2> contains non Vec2 objects");
					}
					let p = vite;
					if(p != null && p.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					if(fsttime) {
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						if(p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = p.zpp_inner;
						if(_this._validate != null) {
							_this._validate();
						}
						let x = p.zpp_inner.x;
						if(p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = p.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						let y = p.zpp_inner.y;
						let weak = false;
						if(weak == null) {
							weak = false;
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
							let fst;
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
								fst = ret.zpp_inner.y == y;
							} else {
								fst = false;
							}
							if(!fst) {
								ret.zpp_inner.x = x;
								ret.zpp_inner.y = y;
								let _this = ret.zpp_inner;
								if(_this._invalidate != null) {
									_this._invalidate(_this);
								}
							}
						}
						ret.zpp_inner.weak = weak;
						fst = ret;
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this2 = p.zpp_inner;
						if(_this2._validate != null) {
							_this2._validate();
						}
						let tmp = p.zpp_inner.x;
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this3 = p.zpp_inner;
						if(_this3._validate != null) {
							_this3._validate();
						}
						g.moveTo(tmp,p.zpp_inner.y);
					} else {
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = p.zpp_inner;
						if(_this._validate != null) {
							_this._validate();
						}
						let tmp = p.zpp_inner.x;
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = p.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						g.lineTo(tmp,p.zpp_inner.y);
					}
					fsttime = false;
				}
			} else if(((polygon) instanceof Vec2List)) {
				let lv = polygon;
				let _g = lv.iterator();
				while(true) {
					_g.zpp_inner.zpp_inner.valmod();
					let length = _g.zpp_inner.zpp_gl();
					_g.zpp_critical = true;
					let tmp;
					if(_g.zpp_i < length) {
						tmp = true;
					} else {
						_g.zpp_next = Vec2Iterator.zpp_pool;
						Vec2Iterator.zpp_pool = _g;
						_g.zpp_inner = null;
						tmp = false;
					}
					if(!tmp) {
						break;
					}
					_g.zpp_critical = false;
					let p = _g.zpp_inner.at(_g.zpp_i++);
					if(p == null) {
						throw haxe_Exception.thrown("Error: Vec2List contains null objects");
					}
					if(p != null && p.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					if(fsttime) {
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						if(p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = p.zpp_inner;
						if(_this._validate != null) {
							_this._validate();
						}
						let x = p.zpp_inner.x;
						if(p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = p.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						let y = p.zpp_inner.y;
						let weak = false;
						if(weak == null) {
							weak = false;
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
							let fst;
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
								fst = ret.zpp_inner.y == y;
							} else {
								fst = false;
							}
							if(!fst) {
								ret.zpp_inner.x = x;
								ret.zpp_inner.y = y;
								let _this = ret.zpp_inner;
								if(_this._invalidate != null) {
									_this._invalidate(_this);
								}
							}
						}
						ret.zpp_inner.weak = weak;
						fst = ret;
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this2 = p.zpp_inner;
						if(_this2._validate != null) {
							_this2._validate();
						}
						let tmp = p.zpp_inner.x;
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this3 = p.zpp_inner;
						if(_this3._validate != null) {
							_this3._validate();
						}
						g.moveTo(tmp,p.zpp_inner.y);
					} else {
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = p.zpp_inner;
						if(_this._validate != null) {
							_this._validate();
						}
						let tmp = p.zpp_inner.x;
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = p.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						g.lineTo(tmp,p.zpp_inner.y);
					}
					fsttime = false;
				}
			} else if(((polygon) instanceof GeomPoly)) {
				let lv = polygon;
				if(lv != null && lv.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
				}
				let verts = lv.zpp_inner.vertices;
				if(verts != null) {
					let vite = verts;
					while(true) {
						let x = vite.x;
						let y = vite.y;
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
						let p = ret;
						vite = vite.next;
						if(fsttime) {
							if(p != null && p.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							if(p.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this = p.zpp_inner;
							if(_this._validate != null) {
								_this._validate();
							}
							let x = p.zpp_inner.x;
							if(p.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this1 = p.zpp_inner;
							if(_this1._validate != null) {
								_this1._validate();
							}
							let y = p.zpp_inner.y;
							let weak = false;
							if(weak == null) {
								weak = false;
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
								let fst;
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
									fst = ret.zpp_inner.y == y;
								} else {
									fst = false;
								}
								if(!fst) {
									ret.zpp_inner.x = x;
									ret.zpp_inner.y = y;
									let _this = ret.zpp_inner;
									if(_this._invalidate != null) {
										_this._invalidate(_this);
									}
								}
							}
							ret.zpp_inner.weak = weak;
							fst = ret;
							if(p != null && p.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this2 = p.zpp_inner;
							if(_this2._validate != null) {
								_this2._validate();
							}
							let tmp = p.zpp_inner.x;
							if(p != null && p.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this3 = p.zpp_inner;
							if(_this3._validate != null) {
								_this3._validate();
							}
							g.moveTo(tmp,p.zpp_inner.y);
						} else {
							if(p != null && p.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this = p.zpp_inner;
							if(_this._validate != null) {
								_this._validate();
							}
							let tmp = p.zpp_inner.x;
							if(p != null && p.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this1 = p.zpp_inner;
							if(_this1._validate != null) {
								_this1._validate();
							}
							g.lineTo(tmp,p.zpp_inner.y);
						}
						fsttime = false;
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = p.zpp_inner;
						if(_this._immutable) {
							throw haxe_Exception.thrown("Error: Vec2 is immutable");
						}
						if(_this._isimmutable != null) {
							_this._isimmutable();
						}
						if(p.zpp_inner._inuse) {
							throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
						}
						let inner = p.zpp_inner;
						p.zpp_inner.outer = null;
						p.zpp_inner = null;
						let o = p;
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
						if(!(vite != verts)) {
							break;
						}
					}
				}
			} else {
				throw haxe_Exception.thrown("Error: Invalid type for polygon object, should be Array<Vec2>, Vec2List, GeomPoly or for flash10+ flash.Vector<Vec2>");
			}
			if(fst != null && fst.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = fst.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let tmp = fst.zpp_inner.x;
			if(fst != null && fst.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = fst.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			g.lineTo(tmp,fst.zpp_inner.y);
			if(fst != null && fst.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = fst.zpp_inner;
			if(_this2._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this2._isimmutable != null) {
				_this2._isimmutable();
			}
			if(fst.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = fst.zpp_inner;
			fst.zpp_inner.outer = null;
			fst.zpp_inner = null;
			let o = fst;
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
		} else {
			if(((polygon) instanceof Array)) {
				let lv = polygon;
				let _g = 0;
				while(_g < lv.length) {
					let vite = lv[_g];
					++_g;
					if(vite == null) {
						throw haxe_Exception.thrown("Error: Array<Vec2> contains null objects");
					}
					if(!((vite) instanceof Vec2)) {
						throw haxe_Exception.thrown("Error: Array<Vec2> contains non Vec2 objects");
					}
					let p = vite;
					if(p != null && p.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let v = this.zpp_inner.xform.outer.transform(p);
					if(fsttime) {
						fst = v;
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = v.zpp_inner;
						if(_this._validate != null) {
							_this._validate();
						}
						let tmp = v.zpp_inner.x;
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = v.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						g.moveTo(tmp,v.zpp_inner.y);
					} else {
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = v.zpp_inner;
						if(_this._validate != null) {
							_this._validate();
						}
						let tmp = v.zpp_inner.x;
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = v.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						g.lineTo(tmp,v.zpp_inner.y);
					}
					if(!fsttime) {
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = v.zpp_inner;
						if(_this._immutable) {
							throw haxe_Exception.thrown("Error: Vec2 is immutable");
						}
						if(_this._isimmutable != null) {
							_this._isimmutable();
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
					}
					fsttime = false;
				}
			} else if(((polygon) instanceof Vec2List)) {
				let lv = polygon;
				let _g = lv.iterator();
				while(true) {
					_g.zpp_inner.zpp_inner.valmod();
					let length = _g.zpp_inner.zpp_gl();
					_g.zpp_critical = true;
					let tmp;
					if(_g.zpp_i < length) {
						tmp = true;
					} else {
						_g.zpp_next = Vec2Iterator.zpp_pool;
						Vec2Iterator.zpp_pool = _g;
						_g.zpp_inner = null;
						tmp = false;
					}
					if(!tmp) {
						break;
					}
					_g.zpp_critical = false;
					let p = _g.zpp_inner.at(_g.zpp_i++);
					if(p == null) {
						throw haxe_Exception.thrown("Error: Vec2List contains null objects");
					}
					if(p != null && p.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let v = this.zpp_inner.xform.outer.transform(p);
					if(fsttime) {
						fst = v;
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = v.zpp_inner;
						if(_this._validate != null) {
							_this._validate();
						}
						let tmp = v.zpp_inner.x;
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = v.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						g.moveTo(tmp,v.zpp_inner.y);
					} else {
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = v.zpp_inner;
						if(_this._validate != null) {
							_this._validate();
						}
						let tmp = v.zpp_inner.x;
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = v.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						g.lineTo(tmp,v.zpp_inner.y);
					}
					if(!fsttime) {
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = v.zpp_inner;
						if(_this._immutable) {
							throw haxe_Exception.thrown("Error: Vec2 is immutable");
						}
						if(_this._isimmutable != null) {
							_this._isimmutable();
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
					}
					fsttime = false;
				}
			} else if(((polygon) instanceof GeomPoly)) {
				let lv = polygon;
				if(lv != null && lv.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
				}
				let verts = lv.zpp_inner.vertices;
				if(verts != null) {
					let vite = verts;
					while(true) {
						let x = vite.x;
						let y = vite.y;
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
						let p = ret;
						vite = vite.next;
						let v = this.zpp_inner.xform.outer.transform(p);
						if(fsttime) {
							fst = v;
							if(v != null && v.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this = v.zpp_inner;
							if(_this._validate != null) {
								_this._validate();
							}
							let tmp = v.zpp_inner.x;
							if(v != null && v.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this1 = v.zpp_inner;
							if(_this1._validate != null) {
								_this1._validate();
							}
							g.moveTo(tmp,v.zpp_inner.y);
						} else {
							if(v != null && v.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this = v.zpp_inner;
							if(_this._validate != null) {
								_this._validate();
							}
							let tmp = v.zpp_inner.x;
							if(v != null && v.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this1 = v.zpp_inner;
							if(_this1._validate != null) {
								_this1._validate();
							}
							g.lineTo(tmp,v.zpp_inner.y);
						}
						if(!fsttime) {
							if(v != null && v.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this = v.zpp_inner;
							if(_this._immutable) {
								throw haxe_Exception.thrown("Error: Vec2 is immutable");
							}
							if(_this._isimmutable != null) {
								_this._isimmutable();
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
						}
						fsttime = false;
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = p.zpp_inner;
						if(_this._immutable) {
							throw haxe_Exception.thrown("Error: Vec2 is immutable");
						}
						if(_this._isimmutable != null) {
							_this._isimmutable();
						}
						if(p.zpp_inner._inuse) {
							throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
						}
						let inner = p.zpp_inner;
						p.zpp_inner.outer = null;
						p.zpp_inner = null;
						let o = p;
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
						if(!(vite != verts)) {
							break;
						}
					}
				}
			} else {
				throw haxe_Exception.thrown("Error: Invalid type for polygon object, should be Array<Vec2>, Vec2List, GeomPoly or for flash10+ flash.Vector<Vec2>");
			}
			if(fst != null && fst.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = fst.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let tmp = fst.zpp_inner.x;
			if(fst != null && fst.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = fst.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			g.lineTo(tmp,fst.zpp_inner.y);
			if(fst != null && fst.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = fst.zpp_inner;
			if(_this2._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this2._isimmutable != null) {
				_this2._isimmutable();
			}
			if(fst.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = fst.zpp_inner;
			fst.zpp_inner.outer = null;
			fst.zpp_inner = null;
			let o = fst;
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
		if(((polygon) instanceof Array)) {
			let lv = polygon;
			let i = 0;
			while(i < lv.length) {
				let cur = lv[i];
				let tmp;
				if(cur.zpp_inner.weak) {
					if(cur != null && cur.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this = cur.zpp_inner;
					if(_this._immutable) {
						throw haxe_Exception.thrown("Error: Vec2 is immutable");
					}
					if(_this._isimmutable != null) {
						_this._isimmutable();
					}
					if(cur.zpp_inner._inuse) {
						throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
					}
					let inner = cur.zpp_inner;
					cur.zpp_inner.outer = null;
					cur.zpp_inner = null;
					let o = cur;
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
					tmp = true;
				} else {
					tmp = false;
				}
				if(tmp) {
					lv.splice(i,1);
					continue;
				}
				++i;
			}
		} else if(((polygon) instanceof Vec2List)) {
			let lv = polygon;
			if(lv.zpp_inner._validate != null) {
				lv.zpp_inner._validate();
			}
			let ins = lv.zpp_inner.inner;
			let pre = null;
			let cur = ins.head;
			while(cur != null) {
				let x = cur.elt;
				if(x.outer.zpp_inner.weak) {
					cur = ins.erase(pre);
					if(x.outer.zpp_inner.weak) {
						let _this = x.outer;
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
					}
				} else {
					pre = cur;
					cur = cur.next;
				}
			}
		}
	}
	drawFilledPolygon(polygon,colour) {
		if(this.zpp_inner.xform != null && !this.zpp_inner.xform.outer.equiorthogonal()) {
			throw haxe_Exception.thrown("Error: Debug draw can only operate with an equiorthogonal transform!");
		}
		if(polygon == null) {
			throw haxe_Exception.thrown("Error: Cannot draw null polygon!");
		}
		let g = this.zpp_inner_zn.graphics;
		g.beginFill(colour & 16777215,1.0);
		g.lineStyle(0,0,0);
		let fst = null;
		let fsttime = true;
		if(this.zpp_inner.xnull) {
			if(((polygon) instanceof Array)) {
				let lv = polygon;
				let _g = 0;
				while(_g < lv.length) {
					let vite = lv[_g];
					++_g;
					if(vite == null) {
						throw haxe_Exception.thrown("Error: Array<Vec2> contains null objects");
					}
					if(!((vite) instanceof Vec2)) {
						throw haxe_Exception.thrown("Error: Array<Vec2> contains non Vec2 objects");
					}
					let p = vite;
					if(p != null && p.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					if(fsttime) {
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						if(p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = p.zpp_inner;
						if(_this._validate != null) {
							_this._validate();
						}
						let x = p.zpp_inner.x;
						if(p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = p.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						let y = p.zpp_inner.y;
						let weak = false;
						if(weak == null) {
							weak = false;
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
							let fst;
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
								fst = ret.zpp_inner.y == y;
							} else {
								fst = false;
							}
							if(!fst) {
								ret.zpp_inner.x = x;
								ret.zpp_inner.y = y;
								let _this = ret.zpp_inner;
								if(_this._invalidate != null) {
									_this._invalidate(_this);
								}
							}
						}
						ret.zpp_inner.weak = weak;
						fst = ret;
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this2 = p.zpp_inner;
						if(_this2._validate != null) {
							_this2._validate();
						}
						let tmp = p.zpp_inner.x;
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this3 = p.zpp_inner;
						if(_this3._validate != null) {
							_this3._validate();
						}
						g.moveTo(tmp,p.zpp_inner.y);
					} else {
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = p.zpp_inner;
						if(_this._validate != null) {
							_this._validate();
						}
						let tmp = p.zpp_inner.x;
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = p.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						g.lineTo(tmp,p.zpp_inner.y);
					}
					fsttime = false;
				}
			} else if(((polygon) instanceof Vec2List)) {
				let lv = polygon;
				let _g = lv.iterator();
				while(true) {
					_g.zpp_inner.zpp_inner.valmod();
					let length = _g.zpp_inner.zpp_gl();
					_g.zpp_critical = true;
					let tmp;
					if(_g.zpp_i < length) {
						tmp = true;
					} else {
						_g.zpp_next = Vec2Iterator.zpp_pool;
						Vec2Iterator.zpp_pool = _g;
						_g.zpp_inner = null;
						tmp = false;
					}
					if(!tmp) {
						break;
					}
					_g.zpp_critical = false;
					let p = _g.zpp_inner.at(_g.zpp_i++);
					if(p == null) {
						throw haxe_Exception.thrown("Error: Vec2List contains null objects");
					}
					if(p != null && p.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					if(fsttime) {
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						if(p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = p.zpp_inner;
						if(_this._validate != null) {
							_this._validate();
						}
						let x = p.zpp_inner.x;
						if(p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = p.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						let y = p.zpp_inner.y;
						let weak = false;
						if(weak == null) {
							weak = false;
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
							let fst;
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
								fst = ret.zpp_inner.y == y;
							} else {
								fst = false;
							}
							if(!fst) {
								ret.zpp_inner.x = x;
								ret.zpp_inner.y = y;
								let _this = ret.zpp_inner;
								if(_this._invalidate != null) {
									_this._invalidate(_this);
								}
							}
						}
						ret.zpp_inner.weak = weak;
						fst = ret;
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this2 = p.zpp_inner;
						if(_this2._validate != null) {
							_this2._validate();
						}
						let tmp = p.zpp_inner.x;
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this3 = p.zpp_inner;
						if(_this3._validate != null) {
							_this3._validate();
						}
						g.moveTo(tmp,p.zpp_inner.y);
					} else {
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = p.zpp_inner;
						if(_this._validate != null) {
							_this._validate();
						}
						let tmp = p.zpp_inner.x;
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = p.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						g.lineTo(tmp,p.zpp_inner.y);
					}
					fsttime = false;
				}
			} else if(((polygon) instanceof GeomPoly)) {
				let lv = polygon;
				if(lv != null && lv.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
				}
				let verts = lv.zpp_inner.vertices;
				if(verts != null) {
					let vite = verts;
					while(true) {
						let x = vite.x;
						let y = vite.y;
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
						let p = ret;
						vite = vite.next;
						if(fsttime) {
							if(p != null && p.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							if(p.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this = p.zpp_inner;
							if(_this._validate != null) {
								_this._validate();
							}
							let x = p.zpp_inner.x;
							if(p.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this1 = p.zpp_inner;
							if(_this1._validate != null) {
								_this1._validate();
							}
							let y = p.zpp_inner.y;
							let weak = false;
							if(weak == null) {
								weak = false;
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
								let fst;
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
									fst = ret.zpp_inner.y == y;
								} else {
									fst = false;
								}
								if(!fst) {
									ret.zpp_inner.x = x;
									ret.zpp_inner.y = y;
									let _this = ret.zpp_inner;
									if(_this._invalidate != null) {
										_this._invalidate(_this);
									}
								}
							}
							ret.zpp_inner.weak = weak;
							fst = ret;
							if(p != null && p.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this2 = p.zpp_inner;
							if(_this2._validate != null) {
								_this2._validate();
							}
							let tmp = p.zpp_inner.x;
							if(p != null && p.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this3 = p.zpp_inner;
							if(_this3._validate != null) {
								_this3._validate();
							}
							g.moveTo(tmp,p.zpp_inner.y);
						} else {
							if(p != null && p.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this = p.zpp_inner;
							if(_this._validate != null) {
								_this._validate();
							}
							let tmp = p.zpp_inner.x;
							if(p != null && p.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this1 = p.zpp_inner;
							if(_this1._validate != null) {
								_this1._validate();
							}
							g.lineTo(tmp,p.zpp_inner.y);
						}
						fsttime = false;
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = p.zpp_inner;
						if(_this._immutable) {
							throw haxe_Exception.thrown("Error: Vec2 is immutable");
						}
						if(_this._isimmutable != null) {
							_this._isimmutable();
						}
						if(p.zpp_inner._inuse) {
							throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
						}
						let inner = p.zpp_inner;
						p.zpp_inner.outer = null;
						p.zpp_inner = null;
						let o = p;
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
						if(!(vite != verts)) {
							break;
						}
					}
				}
			} else {
				throw haxe_Exception.thrown("Error: Invalid type for polygon object, should be Array<Vec2>, Vec2List, GeomPoly or for flash10+ flash.Vector<Vec2>");
			}
			if(fst != null && fst.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = fst.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let tmp = fst.zpp_inner.x;
			if(fst != null && fst.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = fst.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			g.lineTo(tmp,fst.zpp_inner.y);
			if(fst != null && fst.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = fst.zpp_inner;
			if(_this2._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this2._isimmutable != null) {
				_this2._isimmutable();
			}
			if(fst.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = fst.zpp_inner;
			fst.zpp_inner.outer = null;
			fst.zpp_inner = null;
			let o = fst;
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
		} else {
			if(((polygon) instanceof Array)) {
				let lv = polygon;
				let _g = 0;
				while(_g < lv.length) {
					let vite = lv[_g];
					++_g;
					if(vite == null) {
						throw haxe_Exception.thrown("Error: Array<Vec2> contains null objects");
					}
					if(!((vite) instanceof Vec2)) {
						throw haxe_Exception.thrown("Error: Array<Vec2> contains non Vec2 objects");
					}
					let p = vite;
					if(p != null && p.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let v = this.zpp_inner.xform.outer.transform(p);
					if(fsttime) {
						fst = v;
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = v.zpp_inner;
						if(_this._validate != null) {
							_this._validate();
						}
						let tmp = v.zpp_inner.x;
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = v.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						g.moveTo(tmp,v.zpp_inner.y);
					} else {
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = v.zpp_inner;
						if(_this._validate != null) {
							_this._validate();
						}
						let tmp = v.zpp_inner.x;
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = v.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						g.lineTo(tmp,v.zpp_inner.y);
					}
					if(!fsttime) {
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = v.zpp_inner;
						if(_this._immutable) {
							throw haxe_Exception.thrown("Error: Vec2 is immutable");
						}
						if(_this._isimmutable != null) {
							_this._isimmutable();
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
					}
					fsttime = false;
				}
			} else if(((polygon) instanceof Vec2List)) {
				let lv = polygon;
				let _g = lv.iterator();
				while(true) {
					_g.zpp_inner.zpp_inner.valmod();
					let length = _g.zpp_inner.zpp_gl();
					_g.zpp_critical = true;
					let tmp;
					if(_g.zpp_i < length) {
						tmp = true;
					} else {
						_g.zpp_next = Vec2Iterator.zpp_pool;
						Vec2Iterator.zpp_pool = _g;
						_g.zpp_inner = null;
						tmp = false;
					}
					if(!tmp) {
						break;
					}
					_g.zpp_critical = false;
					let p = _g.zpp_inner.at(_g.zpp_i++);
					if(p == null) {
						throw haxe_Exception.thrown("Error: Vec2List contains null objects");
					}
					if(p != null && p.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let v = this.zpp_inner.xform.outer.transform(p);
					if(fsttime) {
						fst = v;
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = v.zpp_inner;
						if(_this._validate != null) {
							_this._validate();
						}
						let tmp = v.zpp_inner.x;
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = v.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						g.moveTo(tmp,v.zpp_inner.y);
					} else {
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = v.zpp_inner;
						if(_this._validate != null) {
							_this._validate();
						}
						let tmp = v.zpp_inner.x;
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = v.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						g.lineTo(tmp,v.zpp_inner.y);
					}
					if(!fsttime) {
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = v.zpp_inner;
						if(_this._immutable) {
							throw haxe_Exception.thrown("Error: Vec2 is immutable");
						}
						if(_this._isimmutable != null) {
							_this._isimmutable();
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
					}
					fsttime = false;
				}
			} else if(((polygon) instanceof GeomPoly)) {
				let lv = polygon;
				if(lv != null && lv.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
				}
				let verts = lv.zpp_inner.vertices;
				if(verts != null) {
					let vite = verts;
					while(true) {
						let x = vite.x;
						let y = vite.y;
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
						let p = ret;
						vite = vite.next;
						let v = this.zpp_inner.xform.outer.transform(p);
						if(fsttime) {
							fst = v;
							if(v != null && v.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this = v.zpp_inner;
							if(_this._validate != null) {
								_this._validate();
							}
							let tmp = v.zpp_inner.x;
							if(v != null && v.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this1 = v.zpp_inner;
							if(_this1._validate != null) {
								_this1._validate();
							}
							g.moveTo(tmp,v.zpp_inner.y);
						} else {
							if(v != null && v.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this = v.zpp_inner;
							if(_this._validate != null) {
								_this._validate();
							}
							let tmp = v.zpp_inner.x;
							if(v != null && v.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this1 = v.zpp_inner;
							if(_this1._validate != null) {
								_this1._validate();
							}
							g.lineTo(tmp,v.zpp_inner.y);
						}
						if(!fsttime) {
							if(v != null && v.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this = v.zpp_inner;
							if(_this._immutable) {
								throw haxe_Exception.thrown("Error: Vec2 is immutable");
							}
							if(_this._isimmutable != null) {
								_this._isimmutable();
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
						}
						fsttime = false;
						if(p != null && p.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = p.zpp_inner;
						if(_this._immutable) {
							throw haxe_Exception.thrown("Error: Vec2 is immutable");
						}
						if(_this._isimmutable != null) {
							_this._isimmutable();
						}
						if(p.zpp_inner._inuse) {
							throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
						}
						let inner = p.zpp_inner;
						p.zpp_inner.outer = null;
						p.zpp_inner = null;
						let o = p;
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
						if(!(vite != verts)) {
							break;
						}
					}
				}
			} else {
				throw haxe_Exception.thrown("Error: Invalid type for polygon object, should be Array<Vec2>, Vec2List, GeomPoly or for flash10+ flash.Vector<Vec2>");
			}
			if(fst != null && fst.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = fst.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let tmp = fst.zpp_inner.x;
			if(fst != null && fst.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = fst.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			g.lineTo(tmp,fst.zpp_inner.y);
			if(fst != null && fst.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = fst.zpp_inner;
			if(_this2._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this2._isimmutable != null) {
				_this2._isimmutable();
			}
			if(fst.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = fst.zpp_inner;
			fst.zpp_inner.outer = null;
			fst.zpp_inner = null;
			let o = fst;
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
		g.endFill();
		if(((polygon) instanceof Array)) {
			let lv = polygon;
			let i = 0;
			while(i < lv.length) {
				let cur = lv[i];
				let tmp;
				if(cur.zpp_inner.weak) {
					if(cur != null && cur.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this = cur.zpp_inner;
					if(_this._immutable) {
						throw haxe_Exception.thrown("Error: Vec2 is immutable");
					}
					if(_this._isimmutable != null) {
						_this._isimmutable();
					}
					if(cur.zpp_inner._inuse) {
						throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
					}
					let inner = cur.zpp_inner;
					cur.zpp_inner.outer = null;
					cur.zpp_inner = null;
					let o = cur;
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
					tmp = true;
				} else {
					tmp = false;
				}
				if(tmp) {
					lv.splice(i,1);
					continue;
				}
				++i;
			}
		} else if(((polygon) instanceof Vec2List)) {
			let lv = polygon;
			if(lv.zpp_inner._validate != null) {
				lv.zpp_inner._validate();
			}
			let ins = lv.zpp_inner.inner;
			let pre = null;
			let cur = ins.head;
			while(cur != null) {
				let x = cur.elt;
				if(x.outer.zpp_inner.weak) {
					cur = ins.erase(pre);
					if(x.outer.zpp_inner.weak) {
						let _this = x.outer;
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
					}
				} else {
					pre = cur;
					cur = cur.next;
				}
			}
		}
	}
	draw(object) {
		if(this.zpp_inner.xform != null && !this.zpp_inner.xform.outer.equiorthogonal()) {
			throw haxe_Exception.thrown("Error: Debug draw can only operate with an equiorthogonal transform!");
		}
		if(this.zpp_inner.xnull) {
			if(((object) instanceof Space)) {
				this.zpp_inner_zn.draw_space((js_Boot.__cast(object , Space)).zpp_inner,null,1.0,true);
			} else if(((object) instanceof Compound)) {
				this.zpp_inner_zn.draw_compound((js_Boot.__cast(object , Compound)).zpp_inner,null,1.0,true);
			} else if(((object) instanceof Body)) {
				this.zpp_inner_zn.draw_body((js_Boot.__cast(object , Body)).zpp_inner,null,1.0,true);
			} else if(((object) instanceof Shape)) {
				this.zpp_inner_zn.draw_shape((js_Boot.__cast(object , Shape)).zpp_inner,null,1.0,true);
			} else if(((object) instanceof Constraint)) {
				(js_Boot.__cast(object , Constraint)).zpp_inner.draw(this);
			} else {
				throw haxe_Exception.thrown("Error: Unhandled object type for Debug draw");
			}
		} else if(((object) instanceof Space)) {
			this.zpp_inner_zn.draw_space((js_Boot.__cast(object , Space)).zpp_inner,this.zpp_inner.xform,this.zpp_inner.xdet,false);
		} else if(((object) instanceof Body)) {
			this.zpp_inner_zn.draw_body((js_Boot.__cast(object , Body)).zpp_inner,this.zpp_inner.xform,this.zpp_inner.xdet,false);
		} else if(((object) instanceof Shape)) {
			this.zpp_inner_zn.draw_shape((js_Boot.__cast(object , Shape)).zpp_inner,this.zpp_inner.xform,this.zpp_inner.xdet,false);
		} else if(((object) instanceof Constraint)) {
			(js_Boot.__cast(object , Constraint)).zpp_inner.draw(this);
		} else {
			throw haxe_Exception.thrown("Error: Unhandled object type for Debug draw");
		}
	}
	drawSpring(start,end,colour,coils,radius) {
		if(radius == null) {
			radius = 3.0;
		}
		if(coils == null) {
			coils = 3;
		}
		if(start != null && start.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(end != null && end.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(start == null) {
			throw haxe_Exception.thrown("Error: drawCurve::start cannot be null");
		}
		if(end == null) {
			throw haxe_Exception.thrown("Error: drawCurve::end cannot be null");
		}
		if(coils < 0) {
			throw haxe_Exception.thrown("Error: drawCurve::coils must be >= 0");
		}
		if(coils == 0) {
			this.drawLine(start,end,colour);
		} else {
			if(end != null && end.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = end.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let dx = end.zpp_inner.x;
			if(start != null && start.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = start.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			let dx1 = dx - start.zpp_inner.x;
			if(end != null && end.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = end.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			let dy = end.zpp_inner.y;
			if(start != null && start.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = start.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			let dy1 = dy - start.zpp_inner.y;
			let t = 1.0 / (coils * 4);
			dx1 *= t;
			dy1 *= t;
			let nx = 0.0;
			let ny = 0.0;
			nx = dx1;
			ny = dy1;
			if(nx * nx + ny * ny < 0.1) {
				return;
			}
			let d = nx * nx + ny * ny;
			let imag = 1.0 / Math.sqrt(d);
			let t1 = imag;
			nx *= t1;
			ny *= t1;
			let t2 = nx;
			nx = -ny;
			ny = t2;
			let t3 = radius * 2;
			nx *= t3;
			ny *= t3;
			if(start != null && start.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			if(start.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this4 = start.zpp_inner;
			if(_this4._validate != null) {
				_this4._validate();
			}
			let x = start.zpp_inner.x;
			if(start.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this5 = start.zpp_inner;
			if(_this5._validate != null) {
				_this5._validate();
			}
			let y = start.zpp_inner.y;
			let weak = false;
			if(weak == null) {
				weak = false;
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
			ret.zpp_inner.weak = weak;
			let u = ret;
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
			let v = ret1;
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
			let q = ret2;
			let _g = 0;
			let _g1 = coils;
			while(_g < _g1) {
				let i = _g++;
				if(u != null && u.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = u.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				let x = u.zpp_inner.x + dx1 + nx;
				if(v != null && v.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = v.zpp_inner;
				if(_this1._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this1._isimmutable != null) {
					_this1._isimmutable();
				}
				if(v != null && v.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this2 = v.zpp_inner;
				if(_this2._validate != null) {
					_this2._validate();
				}
				if(v.zpp_inner.x != x) {
					if(x != x) {
						throw haxe_Exception.thrown("Error: Vec2::" + "x" + " cannot be NaN");
					}
					v.zpp_inner.x = x;
					let _this = v.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
				if(v != null && v.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this3 = v.zpp_inner;
				if(_this3._validate != null) {
					_this3._validate();
				}
				if(u != null && u.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this4 = u.zpp_inner;
				if(_this4._validate != null) {
					_this4._validate();
				}
				let y = u.zpp_inner.y + dy1 + ny;
				if(v != null && v.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this5 = v.zpp_inner;
				if(_this5._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this5._isimmutable != null) {
					_this5._isimmutable();
				}
				if(v != null && v.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this6 = v.zpp_inner;
				if(_this6._validate != null) {
					_this6._validate();
				}
				if(v.zpp_inner.y != y) {
					if(y != y) {
						throw haxe_Exception.thrown("Error: Vec2::" + "y" + " cannot be NaN");
					}
					v.zpp_inner.y = y;
					let _this = v.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
				if(v != null && v.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this7 = v.zpp_inner;
				if(_this7._validate != null) {
					_this7._validate();
				}
				if(u != null && u.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this8 = u.zpp_inner;
				if(_this8._validate != null) {
					_this8._validate();
				}
				let x1 = u.zpp_inner.x + dx1 * 2;
				if(q != null && q.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this9 = q.zpp_inner;
				if(_this9._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this9._isimmutable != null) {
					_this9._isimmutable();
				}
				if(q != null && q.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this10 = q.zpp_inner;
				if(_this10._validate != null) {
					_this10._validate();
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
				let _this11 = q.zpp_inner;
				if(_this11._validate != null) {
					_this11._validate();
				}
				if(u != null && u.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this12 = u.zpp_inner;
				if(_this12._validate != null) {
					_this12._validate();
				}
				let y1 = u.zpp_inner.y + dy1 * 2;
				if(q != null && q.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this13 = q.zpp_inner;
				if(_this13._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this13._isimmutable != null) {
					_this13._isimmutable();
				}
				if(q != null && q.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this14 = q.zpp_inner;
				if(_this14._validate != null) {
					_this14._validate();
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
				let _this15 = q.zpp_inner;
				if(_this15._validate != null) {
					_this15._validate();
				}
				this.drawCurve(u,v,q,colour);
				if(q != null && q.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this16 = q.zpp_inner;
				if(_this16._validate != null) {
					_this16._validate();
				}
				let x2 = q.zpp_inner.x;
				if(u != null && u.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this17 = u.zpp_inner;
				if(_this17._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this17._isimmutable != null) {
					_this17._isimmutable();
				}
				if(u != null && u.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this18 = u.zpp_inner;
				if(_this18._validate != null) {
					_this18._validate();
				}
				if(u.zpp_inner.x != x2) {
					if(x2 != x2) {
						throw haxe_Exception.thrown("Error: Vec2::" + "x" + " cannot be NaN");
					}
					u.zpp_inner.x = x2;
					let _this = u.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
				if(u != null && u.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this19 = u.zpp_inner;
				if(_this19._validate != null) {
					_this19._validate();
				}
				if(q != null && q.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this20 = q.zpp_inner;
				if(_this20._validate != null) {
					_this20._validate();
				}
				let y2 = q.zpp_inner.y;
				if(u != null && u.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this21 = u.zpp_inner;
				if(_this21._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this21._isimmutable != null) {
					_this21._isimmutable();
				}
				if(u != null && u.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this22 = u.zpp_inner;
				if(_this22._validate != null) {
					_this22._validate();
				}
				if(u.zpp_inner.y != y2) {
					if(y2 != y2) {
						throw haxe_Exception.thrown("Error: Vec2::" + "y" + " cannot be NaN");
					}
					u.zpp_inner.y = y2;
					let _this = u.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
				if(u != null && u.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this23 = u.zpp_inner;
				if(_this23._validate != null) {
					_this23._validate();
				}
				if(u != null && u.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this24 = u.zpp_inner;
				if(_this24._validate != null) {
					_this24._validate();
				}
				let x3 = u.zpp_inner.x + dx1 - nx;
				if(v != null && v.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this25 = v.zpp_inner;
				if(_this25._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this25._isimmutable != null) {
					_this25._isimmutable();
				}
				if(v != null && v.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this26 = v.zpp_inner;
				if(_this26._validate != null) {
					_this26._validate();
				}
				if(v.zpp_inner.x != x3) {
					if(x3 != x3) {
						throw haxe_Exception.thrown("Error: Vec2::" + "x" + " cannot be NaN");
					}
					v.zpp_inner.x = x3;
					let _this = v.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
				if(v != null && v.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this27 = v.zpp_inner;
				if(_this27._validate != null) {
					_this27._validate();
				}
				if(u != null && u.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this28 = u.zpp_inner;
				if(_this28._validate != null) {
					_this28._validate();
				}
				let y3 = u.zpp_inner.y + dy1 - ny;
				if(v != null && v.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this29 = v.zpp_inner;
				if(_this29._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this29._isimmutable != null) {
					_this29._isimmutable();
				}
				if(v != null && v.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this30 = v.zpp_inner;
				if(_this30._validate != null) {
					_this30._validate();
				}
				if(v.zpp_inner.y != y3) {
					if(y3 != y3) {
						throw haxe_Exception.thrown("Error: Vec2::" + "y" + " cannot be NaN");
					}
					v.zpp_inner.y = y3;
					let _this = v.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
				if(v != null && v.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this31 = v.zpp_inner;
				if(_this31._validate != null) {
					_this31._validate();
				}
				if(u != null && u.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this32 = u.zpp_inner;
				if(_this32._validate != null) {
					_this32._validate();
				}
				let x4 = u.zpp_inner.x + dx1 * 2;
				if(q != null && q.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this33 = q.zpp_inner;
				if(_this33._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this33._isimmutable != null) {
					_this33._isimmutable();
				}
				if(q != null && q.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this34 = q.zpp_inner;
				if(_this34._validate != null) {
					_this34._validate();
				}
				if(q.zpp_inner.x != x4) {
					if(x4 != x4) {
						throw haxe_Exception.thrown("Error: Vec2::" + "x" + " cannot be NaN");
					}
					q.zpp_inner.x = x4;
					let _this = q.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
				if(q != null && q.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this35 = q.zpp_inner;
				if(_this35._validate != null) {
					_this35._validate();
				}
				if(u != null && u.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this36 = u.zpp_inner;
				if(_this36._validate != null) {
					_this36._validate();
				}
				let y4 = u.zpp_inner.y + dy1 * 2;
				if(q != null && q.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this37 = q.zpp_inner;
				if(_this37._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this37._isimmutable != null) {
					_this37._isimmutable();
				}
				if(q != null && q.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this38 = q.zpp_inner;
				if(_this38._validate != null) {
					_this38._validate();
				}
				if(q.zpp_inner.y != y4) {
					if(y4 != y4) {
						throw haxe_Exception.thrown("Error: Vec2::" + "y" + " cannot be NaN");
					}
					q.zpp_inner.y = y4;
					let _this = q.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
				if(q != null && q.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this39 = q.zpp_inner;
				if(_this39._validate != null) {
					_this39._validate();
				}
				this.drawCurve(u,v,q,colour);
				if(q != null && q.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this40 = q.zpp_inner;
				if(_this40._validate != null) {
					_this40._validate();
				}
				let x5 = q.zpp_inner.x;
				if(u != null && u.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this41 = u.zpp_inner;
				if(_this41._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this41._isimmutable != null) {
					_this41._isimmutable();
				}
				if(u != null && u.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this42 = u.zpp_inner;
				if(_this42._validate != null) {
					_this42._validate();
				}
				if(u.zpp_inner.x != x5) {
					if(x5 != x5) {
						throw haxe_Exception.thrown("Error: Vec2::" + "x" + " cannot be NaN");
					}
					u.zpp_inner.x = x5;
					let _this = u.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
				if(u != null && u.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this43 = u.zpp_inner;
				if(_this43._validate != null) {
					_this43._validate();
				}
				if(q != null && q.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this44 = q.zpp_inner;
				if(_this44._validate != null) {
					_this44._validate();
				}
				let y5 = q.zpp_inner.y;
				if(u != null && u.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this45 = u.zpp_inner;
				if(_this45._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this45._isimmutable != null) {
					_this45._isimmutable();
				}
				if(u != null && u.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this46 = u.zpp_inner;
				if(_this46._validate != null) {
					_this46._validate();
				}
				if(u.zpp_inner.y != y5) {
					if(y5 != y5) {
						throw haxe_Exception.thrown("Error: Vec2::" + "y" + " cannot be NaN");
					}
					u.zpp_inner.y = y5;
					let _this = u.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
				if(u != null && u.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this47 = u.zpp_inner;
				if(_this47._validate != null) {
					_this47._validate();
				}
			}
			if(u != null && u.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this6 = u.zpp_inner;
			if(_this6._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this6._isimmutable != null) {
				_this6._isimmutable();
			}
			if(u.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = u.zpp_inner;
			u.zpp_inner.outer = null;
			u.zpp_inner = null;
			let o = u;
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
			if(v != null && v.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this7 = v.zpp_inner;
			if(_this7._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this7._isimmutable != null) {
				_this7._isimmutable();
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
			if(q != null && q.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this8 = q.zpp_inner;
			if(_this8._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this8._isimmutable != null) {
				_this8._isimmutable();
			}
			if(q.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner2 = q.zpp_inner;
			q.zpp_inner.outer = null;
			q.zpp_inner = null;
			let o4 = q;
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
		if(start.zpp_inner.weak) {
			if(start != null && start.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = start.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(start.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = start.zpp_inner;
			start.zpp_inner.outer = null;
			start.zpp_inner = null;
			let o = start;
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
		if(end.zpp_inner.weak) {
			if(end != null && end.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = end.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(end.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = end.zpp_inner;
			end.zpp_inner.outer = null;
			end.zpp_inner = null;
			let o = end;
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
}
