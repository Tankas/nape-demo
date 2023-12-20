import ZPP_PubPool from '../util/ZPP_PubPool.js';
import ZPP_Vec2 from '../geom/ZPP_Vec2.js';
import ZPP_CopyHelper from './ZPP_CopyHelper.js';
import ZPP_Constraint from './ZPP_Constraint.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import Vec3 from '../../nape/geom/Vec3.js';
import Vec2 from '../../nape/geom/Vec2.js';
import LineJoint from '../../nape/constraint/LineJoint.js';
import Config from '../../nape/Config.js';
export default class ZPP_LineJoint extends ZPP_Constraint {
	constructor() {
		ZPP_Constraint._hx_skip_constructor = true;
		super();
		ZPP_Constraint._hx_skip_constructor = false;
		this._hx_constructor();
	}
	_hx_constructor() {
		this.biasy = 0.0;
		this.biasx = 0.0;
		this.jAccy = 0.0;
		this.jAccx = 0.0;
		this.kMassc = 0.0;
		this.kMassb = 0.0;
		this.kMassa = 0.0;
		this.wrap_n = null;
		this.nrely = 0.0;
		this.nrelx = 0.0;
		this.nlocaly = 0.0;
		this.nlocalx = 0.0;
		this.wrap_a2 = null;
		this.a2rely = 0.0;
		this.a2relx = 0.0;
		this.a2localy = 0.0;
		this.a2localx = 0.0;
		this.wrap_a1 = null;
		this.a1rely = 0.0;
		this.a1relx = 0.0;
		this.a1localy = 0.0;
		this.a1localx = 0.0;
		this.cx2 = 0.0;
		this.cx1 = 0.0;
		this.dot2 = 0.0;
		this.dot1 = 0.0;
		this.equal = false;
		this.jointMax = 0.0;
		this.jointMin = 0.0;
		this.scale = 0.0;
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
		this.nlocalx = 0;
		this.nlocaly = 0;
		this.nrelx = 0;
		this.nrely = 0;
		this.jAccx = 0;
		this.jAccy = 0;
		this.jMax = Infinity;
		this.jointMin = -Infinity;
		this.jointMax = Infinity;
		this.stepped = false;
	}
	bodyImpulse(b) {
		if(this.stepped) {
			let jx = this.scale * this.nrelx * this.jAccy - this.nrely * this.jAccx;
			let jy = this.nrelx * this.jAccx + this.scale * this.nrely * this.jAccy;
			if(b == this.b1) {
				return Vec3.get(-jx,-jy,this.scale * this.cx1 * jy - this.dot1 * jx);
			} else {
				return Vec3.get(jx,jy,this.scale * this.cx1 * jy - this.dot1 * jx);
			}
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
	validate_n() {
		this.wrap_n.zpp_inner.x = this.nlocalx;
		this.wrap_n.zpp_inner.y = this.nlocaly;
	}
	invalidate_n(x) {
		this.immutable_midstep("Constraint::" + "n");
		this.nlocalx = x.x;
		this.nlocaly = x.y;
		this.zip_n = true;
		this.wake();
	}
	setup_n() {
		let x = this.nlocalx;
		let y = this.nlocaly;
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
		this.wrap_n = ret;
		this.wrap_n.zpp_inner._inuse = true;
		this.wrap_n.zpp_inner._validate = $bind(this,this.validate_n);
		this.wrap_n.zpp_inner._invalidate = $bind(this,this.invalidate_n);
	}
	validate_norm() {
		if(this.zip_n) {
			this.zip_n = false;
			let d = this.nlocalx * this.nlocalx + this.nlocaly * this.nlocaly;
			let imag = 1.0 / Math.sqrt(d);
			let t = imag;
			this.nlocalx *= t;
			this.nlocaly *= t;
		}
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
		if(_this2.zpp_inner_zn.wrap_n == null) {
			_this2.zpp_inner_zn.setup_n();
		}
		let ret2 = new LineJoint(null,null,ret,ret1,_this2.zpp_inner_zn.wrap_n,this.jointMin,this.jointMax);
		this.copyto(ret2);
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
				ret2.zpp_inner_zn.b1 = b.zpp_inner;
			} else {
				todo.push(ZPP_CopyHelper.todo(this.b1.id,function(b) {
					ret2.zpp_inner_zn.b1 = b.zpp_inner;
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
				ret2.zpp_inner_zn.b2 = b.zpp_inner;
			} else {
				todo.push(ZPP_CopyHelper.todo(this.b2.id,function(b) {
					ret2.zpp_inner_zn.b2 = b.zpp_inner;
				}));
			}
		}
		return ret2;
	}
	validate() {
		if(this.b1 == null || this.b2 == null) {
			throw haxe_Exception.thrown("Error: AngleJoint cannot be simulated null bodies");
		}
		if(this.b1 == this.b2) {
			throw haxe_Exception.thrown("Error: DistanceJoint cannot be simulated with body1 == body2");
		}
		if(this.b1.space != this.space || this.b2.space != this.space) {
			throw haxe_Exception.thrown("Error: Constraints must have each body within the same space to which the constraint has been assigned");
		}
		if(this.jointMin > this.jointMax) {
			throw haxe_Exception.thrown("Error: DistanceJoint must have jointMin <= jointMax");
		}
		if(this.nlocalx * this.nlocalx + this.nlocaly * this.nlocaly < Config.epsilon) {
			throw haxe_Exception.thrown("Error: DistanceJoint direction must be non-degenerate");
		}
		if(this.b1.type != ZPP_Flags.id_BodyType_DYNAMIC && this.b2.type != ZPP_Flags.id_BodyType_DYNAMIC) {
			throw haxe_Exception.thrown("Error: Constraints cannot have both bodies non-dynamic");
		}
	}
	wake_connected() {
		if(this.b1 != null && this.b1.type == ZPP_Flags.id_BodyType_DYNAMIC) {
			this.b1.wake();
		}
		if(this.b2 != null && this.b2.type == ZPP_Flags.id_BodyType_DYNAMIC) {
			this.b2.wake();
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
	}
	pair_exists(id,di) {
		if(!(this.b1.id == id && this.b2.id == di)) {
			if(this.b1.id == di) {
				return this.b2.id == id;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	clearcache() {
		this.jAccx = 0;
		this.jAccy = 0;
		this.pre_dt = -1.0;
	}
	preStep(dt) {
		if(this.pre_dt == -1.0) {
			this.pre_dt = dt;
		}
		let dtratio = dt / this.pre_dt;
		this.pre_dt = dt;
		this.equal = this.jointMin == this.jointMax;
		this.stepped = true;
		this.validate_norm();
		this.a1relx = this.b1.axisy * this.a1localx - this.b1.axisx * this.a1localy;
		this.a1rely = this.a1localx * this.b1.axisx + this.a1localy * this.b1.axisy;
		this.nrelx = this.b1.axisy * this.nlocalx - this.b1.axisx * this.nlocaly;
		this.nrely = this.nlocalx * this.b1.axisx + this.nlocaly * this.b1.axisy;
		this.a2relx = this.b2.axisy * this.a2localx - this.b2.axisx * this.a2localy;
		this.a2rely = this.a2localx * this.b2.axisx + this.a2localy * this.b2.axisy;
		let dx = 0.0;
		let dy = 0.0;
		let Cx = 0.0;
		let Cy = 0.0;
		dx = this.b2.posx + this.a2relx - this.b1.posx - this.a1relx;
		dy = this.b2.posy + this.a2rely - this.b1.posy - this.a1rely;
		Cx = dy * this.nrelx - dx * this.nrely;
		Cy = this.nrelx * dx + this.nrely * dy;
		if(this.equal) {
			Cy -= this.jointMin;
			this.scale = 1.0;
		} else if(Cy > this.jointMax) {
			Cy -= this.jointMax;
			this.scale = 1.0;
		} else if(Cy < this.jointMin) {
			Cy = this.jointMin - Cy;
			this.scale = -1.0;
		} else {
			Cy = 0;
			this.scale = 0;
		}
		let drx = 0.0;
		let dry = 0.0;
		drx = dx + this.a1relx;
		dry = dy + this.a1rely;
		this.dot1 = this.nrelx * drx + this.nrely * dry;
		this.cx1 = dry * this.nrelx - drx * this.nrely;
		this.dot2 = this.nrelx * this.a2relx + this.nrely * this.a2rely;
		this.cx2 = this.a2rely * this.nrelx - this.a2relx * this.nrely;
		this.kMassa = this.b1.smass + this.b2.smass + this.dot1 * this.dot1 * this.b1.sinertia + this.dot2 * this.dot2 * this.b2.sinertia;
		this.kMassb = -this.scale * (this.dot1 * this.cx1 * this.b1.sinertia + this.dot2 * this.cx2 * this.b2.sinertia);
		this.kMassc = this.scale * this.scale * (this.b1.smass + this.b2.smass + this.cx1 * this.cx1 * this.b1.sinertia + this.cx2 * this.cx2 * this.b2.sinertia);
		let det = this.kMassa * this.kMassc - this.kMassb * this.kMassb;
		let flag;
		if(det != det) {
			this.kMassa = this.kMassb = this.kMassc = 0;
			flag = 3;
		} else if(det == 0) {
			let flag1 = 0;
			if(this.kMassa != 0) {
				this.kMassa = 1 / this.kMassa;
			} else {
				this.kMassa = 0;
				flag1 |= 1;
			}
			if(this.kMassc != 0) {
				this.kMassc = 1 / this.kMassc;
			} else {
				this.kMassc = 0;
				flag1 |= 2;
			}
			this.kMassb = 0;
			flag = flag1;
		} else {
			det = 1 / det;
			let t = this.kMassc * det;
			this.kMassc = this.kMassa * det;
			this.kMassa = t;
			this.kMassb *= -det;
			flag = 0;
		}
		if((flag & 1) != 0) {
			this.jAccx = 0;
		}
		if((flag & 2) != 0) {
			this.jAccy = 0;
		}
		if(!this.stiff) {
			if(this.breakUnderError && Cx * Cx + Cy * Cy > this.maxError * this.maxError) {
				return true;
			}
			let biasCoef;
			let omega = 2 * Math.PI * this.frequency;
			this.gamma = 1 / (dt * omega * (2 * this.damping + omega * dt));
			let ig = 1 / (1 + this.gamma);
			biasCoef = dt * omega * omega * this.gamma;
			this.gamma *= ig;
			let X = ig;
			this.kMassa *= X;
			this.kMassb *= X;
			this.kMassc *= X;
			this.biasx = Cx;
			this.biasy = Cy;
			let t = -biasCoef;
			this.biasx *= t;
			this.biasy *= t;
			let t1 = this.maxError;
			let ls = this.biasx * this.biasx + this.biasy * this.biasy;
			if(ls > t1 * t1) {
				let t = t1 * (1.0 / Math.sqrt(ls));
				this.biasx *= t;
				this.biasy *= t;
			}
		} else {
			this.gamma = 0;
			this.biasx = 0;
			this.biasy = 0;
		}
		let t = dtratio;
		this.jAccx *= t;
		this.jAccy *= t;
		this.jMax = this.maxForce * dt;
		return false;
	}
	warmStart() {
		let J2x = this.scale * this.nrelx * this.jAccy - this.nrely * this.jAccx;
		let J2y = this.nrelx * this.jAccx + this.scale * this.nrely * this.jAccy;
		let t = this.b1.imass;
		this.b1.velx -= J2x * t;
		this.b1.vely -= J2y * t;
		let t1 = this.b2.imass;
		this.b2.velx += J2x * t1;
		this.b2.vely += J2y * t1;
		this.b1.angvel += (this.scale * this.cx1 * this.jAccy - this.dot1 * this.jAccx) * this.b1.iinertia;
		this.b2.angvel += (this.dot2 * this.jAccx - this.scale * this.cx2 * this.jAccy) * this.b2.iinertia;
	}
	applyImpulseVel() {
		let Ex = 0.0;
		let Ey = 0.0;
		let dvx = 0.0;
		let dvy = 0.0;
		dvx = this.b2.velx - this.b1.velx;
		dvy = this.b2.vely - this.b1.vely;
		dvx += this.b2.kinvelx - this.b1.kinvelx;
		dvy += this.b2.kinvely - this.b1.kinvely;
		Ex = dvy * this.nrelx - dvx * this.nrely + (this.b2.angvel + this.b2.kinangvel) * this.dot2 - (this.b1.angvel + this.b1.kinangvel) * this.dot1;
		Ey = this.scale * (this.nrelx * dvx + this.nrely * dvy - (this.b2.angvel + this.b2.kinangvel) * this.cx2 + (this.b1.angvel + this.b1.kinangvel) * this.cx1);
		let Jx = 0.0;
		let Jy = 0.0;
		Jx = this.biasx - Ex;
		Jy = this.biasy - Ey;
		let t = this.kMassa * Jx + this.kMassb * Jy;
		Jy = this.kMassb * Jx + this.kMassc * Jy;
		Jx = t;
		let t1 = this.gamma;
		Jx -= this.jAccx * t1;
		Jy -= this.jAccy * t1;
		let jOldx = 0.0;
		let jOldy = 0.0;
		jOldx = this.jAccx;
		jOldy = this.jAccy;
		let t2 = 1.0;
		this.jAccx += Jx * t2;
		this.jAccy += Jy * t2;
		if(this.jAccy > 0) {
			this.jAccy = 0;
		}
		if(this.breakUnderForce) {
			if(this.jAccx * this.jAccx + this.jAccy * this.jAccy > this.jMax * this.jMax) {
				return true;
			}
		} else if(!this.stiff) {
			let t = this.jMax;
			let ls = this.jAccx * this.jAccx + this.jAccy * this.jAccy;
			if(ls > t * t) {
				let t1 = t * (1.0 / Math.sqrt(ls));
				this.jAccx *= t1;
				this.jAccy *= t1;
			}
		}
		Jx = this.jAccx - jOldx;
		Jy = this.jAccy - jOldy;
		let J2x = this.scale * this.nrelx * Jy - this.nrely * Jx;
		let J2y = this.nrelx * Jx + this.scale * this.nrely * Jy;
		let t3 = this.b1.imass;
		this.b1.velx -= J2x * t3;
		this.b1.vely -= J2y * t3;
		let t4 = this.b2.imass;
		this.b2.velx += J2x * t4;
		this.b2.vely += J2y * t4;
		this.b1.angvel += (this.scale * this.cx1 * Jy - this.dot1 * Jx) * this.b1.iinertia;
		this.b2.angvel += (this.dot2 * Jx - this.scale * this.cx2 * Jy) * this.b2.iinertia;
		return false;
	}
	applyImpulsePos() {
		let nx = 0.0;
		let ny = 0.0;
		nx = this.b1.axisy * this.nlocalx - this.b1.axisx * this.nlocaly;
		ny = this.nlocalx * this.b1.axisx + this.nlocaly * this.b1.axisy;
		let r1x = 0.0;
		let r1y = 0.0;
		r1x = this.b1.axisy * this.a1localx - this.b1.axisx * this.a1localy;
		r1y = this.a1localx * this.b1.axisx + this.a1localy * this.b1.axisy;
		let r2x = 0.0;
		let r2y = 0.0;
		r2x = this.b2.axisy * this.a2localx - this.b2.axisx * this.a2localy;
		r2y = this.a2localx * this.b2.axisx + this.a2localy * this.b2.axisy;
		let dx = 0.0;
		let dy = 0.0;
		let scale;
		let Ex = 0.0;
		let Ey = 0.0;
		dx = this.b2.posx + r2x - this.b1.posx - r1x;
		dy = this.b2.posy + r2y - this.b1.posy - r1y;
		Ex = dy * nx - dx * ny;
		Ey = nx * dx + ny * dy;
		if(this.equal) {
			Ey -= this.jointMin;
			scale = 1.0;
		} else if(Ey > this.jointMax) {
			Ey -= this.jointMax;
			scale = 1.0;
		} else if(Ey < this.jointMin) {
			Ey = this.jointMin - Ey;
			scale = -1.0;
		} else {
			Ey = 0;
			scale = 0;
		}
		if(this.breakUnderError && Ex * Ex + Ey * Ey > this.maxError * this.maxError) {
			return true;
		}
		if(Ex * Ex + Ey * Ey < Config.constraintLinearSlop * Config.constraintLinearSlop) {
			return false;
		}
		let Jx = 0.0;
		let Jy = 0.0;
		let t = 0.5;
		Ex *= t;
		Ey *= t;
		if(Ex * Ex + Ey * Ey > 6) {
			let k = this.b1.smass + this.b2.smass;
			if(k > Config.epsilon) {
				k = 0.8 / k;
				let Jx = k * (ny * Ex - scale * nx * Ey);
				let Jy = k * (nx * Ex * scale - ny * Ex);
				let t = this.b1.imass;
				this.b1.posx -= Jx * t;
				this.b1.posy -= Jy * t;
				let t1 = this.b2.imass;
				this.b2.posx += Jx * t1;
				this.b2.posy += Jy * t1;
				dx = this.b2.posx + r2x - this.b1.posx - r1x;
				dy = this.b2.posy + r2y - this.b1.posy - r1y;
				Ex = dy * nx - dx * ny;
				Ey = nx * dx + ny * dy;
				if(this.equal) {
					Ey -= this.jointMin;
					scale = 1.0;
				} else if(Ey > this.jointMax) {
					Ey -= this.jointMax;
					scale = 1.0;
				} else if(Ey < this.jointMin) {
					Ey = this.jointMin - Ey;
					scale = -1.0;
				} else {
					Ey = 0;
					scale = 0;
				}
				let t2 = 0.5;
				Ex *= t2;
				Ey *= t2;
			}
		}
		let dot1;
		let dot2;
		let cx1;
		let cx2;
		let Ka = 0.0;
		let Kb = 0.0;
		let Kc = 0.0;
		let drx = 0.0;
		let dry = 0.0;
		drx = dx + r1x;
		dry = dy + r1y;
		dot1 = nx * drx + ny * dry;
		cx1 = dry * nx - drx * ny;
		dot2 = nx * r2x + ny * r2y;
		cx2 = r2y * nx - r2x * ny;
		Ka = this.b1.smass + this.b2.smass + dot1 * dot1 * this.b1.sinertia + dot2 * dot2 * this.b2.sinertia;
		Kb = -scale * (dot1 * cx1 * this.b1.sinertia + dot2 * cx2 * this.b2.sinertia);
		Kc = scale * scale * (this.b1.smass + this.b2.smass + cx1 * cx1 * this.b1.sinertia + cx2 * cx2 * this.b2.sinertia);
		Jx = -Ex;
		Jy = -Ey;
		let det = Ka * Kc - Kb * Kb;
		if(det != det) {
			Jy = 0;
			Jx = Jy;
		} else if(det == 0) {
			if(Ka != 0) {
				Jx /= Ka;
			} else {
				Jx = 0;
			}
			if(Kc != 0) {
				Jy /= Kc;
			} else {
				Jy = 0;
			}
		} else {
			det = 1 / det;
			let t = det * (Kc * Jx - Kb * Jy);
			Jy = det * (Ka * Jy - Kb * Jx);
			Jx = t;
		}
		if(Jy > 0) {
			Jy = 0;
		}
		let J2x = scale * nx * Jy - ny * Jx;
		let J2y = nx * Jx + scale * ny * Jy;
		let t1 = this.b1.imass;
		this.b1.posx -= J2x * t1;
		this.b1.posy -= J2y * t1;
		let t2 = this.b2.imass;
		this.b2.posx += J2x * t2;
		this.b2.posy += J2y * t2;
		let _this = this.b1;
		let dr = (scale * cx1 * Jy - dot1 * Jx) * this.b1.iinertia;
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
		let dr1 = (dot2 * Jx - scale * cx2 * Jy) * this.b2.iinertia;
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
		let dir = me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer;
		if(me.zpp_inner_zn.wrap_n == null) {
			me.zpp_inner_zn.setup_n();
		}
		let dir1 = dir.localVectorToWorld(me.zpp_inner_zn.wrap_n);
		if(dir1 != null && dir1.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(dir1 != null && dir1.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = dir1.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let tmp = dir1.zpp_inner.x;
		if(dir1 != null && dir1.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = dir1.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let tmp1 = tmp * dir1.zpp_inner.x;
		if(dir1 != null && dir1.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = dir1.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let tmp2 = dir1.zpp_inner.y;
		if(dir1 != null && dir1.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = dir1.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		dir1.muleq(1 / Math.sqrt(tmp1 + tmp2 * dir1.zpp_inner.y));
		let min = me.zpp_inner_zn.jointMin;
		let max = me.zpp_inner_zn.jointMax;
		if(min <= -Infinity) {
			min = -1000;
		}
		if(max >= Infinity) {
			max = 1000;
		}
		let del = a21.sub(a11);
		let pn = del.dot(dir1);
		if(del != null && del.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = del.zpp_inner;
		if(_this4._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this4._isimmutable != null) {
			_this4._isimmutable();
		}
		if(del.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner = del.zpp_inner;
		del.zpp_inner.outer = null;
		del.zpp_inner = null;
		let o = del;
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
		let e1 = a11.add(dir1.mul(min,true));
		let e2 = a11.add(dir1.mul(max,true));
		if(pn > min) {
			let x = pn;
			let y = max;
			g.drawLine(e1,a11.add(dir1.mul(x < y ? x : y,true),true),16776960);
		}
		if(pn < max) {
			let x = pn;
			let y = min;
			g.drawLine(a11.add(dir1.mul(x > y ? x : y,true),true),e2,65535);
		}
		if(!this.stiff) {
			let anch;
			if(pn < this.jointMin) {
				if(e1 != null && e1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				if(e1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = e1.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				let x = e1.zpp_inner.x;
				if(e1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = e1.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				let y = e1.zpp_inner.y;
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
					let anch;
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
						anch = ret.zpp_inner.y == y;
					} else {
						anch = false;
					}
					if(!anch) {
						ret.zpp_inner.x = x;
						ret.zpp_inner.y = y;
						let _this = ret.zpp_inner;
						if(_this._invalidate != null) {
							_this._invalidate(_this);
						}
					}
				}
				ret.zpp_inner.weak = weak;
				anch = ret;
			} else if(pn > this.jointMax) {
				if(e2 != null && e2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				if(e2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = e2.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				let x = e2.zpp_inner.x;
				if(e2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = e2.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				let y = e2.zpp_inner.y;
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
					let anch;
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
						anch = ret.zpp_inner.y == y;
					} else {
						anch = false;
					}
					if(!anch) {
						ret.zpp_inner.x = x;
						ret.zpp_inner.y = y;
						let _this = ret.zpp_inner;
						if(_this._invalidate != null) {
							_this._invalidate(_this);
						}
					}
				}
				ret.zpp_inner.weak = weak;
				anch = ret;
			} else {
				anch = a11.add(dir1.mul(pn,true));
			}
			g.drawSpring(anch,a21,16711935);
			if(anch != null && anch.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = anch.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(anch.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = anch.zpp_inner;
			anch.zpp_inner.outer = null;
			anch.zpp_inner = null;
			let o = anch;
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
		g.drawFilledCircle(a11,2,255);
		g.drawFilledCircle(a21,2,16711680);
		if(a11 != null && a11.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this5 = a11.zpp_inner;
		if(_this5._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this5._isimmutable != null) {
			_this5._isimmutable();
		}
		if(a11.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner1 = a11.zpp_inner;
		a11.zpp_inner.outer = null;
		a11.zpp_inner = null;
		let o2 = a11;
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
		if(a21 != null && a21.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this6 = a21.zpp_inner;
		if(_this6._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this6._isimmutable != null) {
			_this6._isimmutable();
		}
		if(a21.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner2 = a21.zpp_inner;
		a21.zpp_inner.outer = null;
		a21.zpp_inner = null;
		let o4 = a21;
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
		if(e1 != null && e1.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this7 = e1.zpp_inner;
		if(_this7._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this7._isimmutable != null) {
			_this7._isimmutable();
		}
		if(e1.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner3 = e1.zpp_inner;
		e1.zpp_inner.outer = null;
		e1.zpp_inner = null;
		let o6 = e1;
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
		if(e2 != null && e2.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this8 = e2.zpp_inner;
		if(_this8._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this8._isimmutable != null) {
			_this8._isimmutable();
		}
		if(e2.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner4 = e2.zpp_inner;
		e2.zpp_inner.outer = null;
		e2.zpp_inner = null;
		let o8 = e2;
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
