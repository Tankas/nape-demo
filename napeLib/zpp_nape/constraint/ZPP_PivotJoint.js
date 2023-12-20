import ZPP_PubPool from '../util/ZPP_PubPool.js';
import ZPP_Vec2 from '../geom/ZPP_Vec2.js';
import ZPP_CopyHelper from './ZPP_CopyHelper.js';
import ZPP_Constraint from './ZPP_Constraint.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import Vec3 from '../../nape/geom/Vec3.js';
import Vec2 from '../../nape/geom/Vec2.js';
import PivotJoint from '../../nape/constraint/PivotJoint.js';
import Config from '../../nape/Config.js';
export default class ZPP_PivotJoint extends ZPP_Constraint {
	constructor() {
		ZPP_Constraint._hx_skip_constructor = true;
		super();
		ZPP_Constraint._hx_skip_constructor = false;
		this._hx_constructor();
	}
	_hx_constructor() {
		this.stepped = false;
		this.biasy = 0.0;
		this.biasx = 0.0;
		this.gamma = 0.0;
		this.jMax = 0.0;
		this.jAccy = 0.0;
		this.jAccx = 0.0;
		this.kMassc = 0.0;
		this.kMassb = 0.0;
		this.kMassa = 0.0;
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
		this.outer_zn = null;
		super._hx_constructor();
		this.stepped = false;
		this.jAccx = 0;
		this.jAccy = 0;
		this.jMax = Infinity;
		this.a1localx = 0;
		this.a1localy = 0;
		this.a1relx = 0;
		this.a1rely = 0;
		this.a2localx = 0;
		this.a2localy = 0;
		this.a2relx = 0;
		this.a2rely = 0;
	}
	bodyImpulse(b) {
		if(this.stepped) {
			if(b == this.b1) {
				return Vec3.get(-this.jAccx,-this.jAccy,-(this.jAccy * this.a1relx - this.jAccx * this.a1rely));
			} else {
				return Vec3.get(this.jAccx,this.jAccy,this.jAccy * this.a2relx - this.jAccx * this.a2rely);
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
		let ret1 = new PivotJoint(null,null,ret,_this1.zpp_inner_zn.wrap_a2);
		this.copyto(ret1);
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
				ret1.zpp_inner_zn.b1 = b.zpp_inner;
			} else {
				todo.push(ZPP_CopyHelper.todo(this.b1.id,function(b) {
					ret1.zpp_inner_zn.b1 = b.zpp_inner;
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
				ret1.zpp_inner_zn.b2 = b.zpp_inner;
			} else {
				todo.push(ZPP_CopyHelper.todo(this.b2.id,function(b) {
					ret1.zpp_inner_zn.b2 = b.zpp_inner;
				}));
			}
		}
		return ret1;
	}
	validate() {
		if(this.b1 == null || this.b2 == null) {
			throw haxe_Exception.thrown("Error: PivotJoint cannot be simulated null bodies");
		}
		if(this.b1 == this.b2) {
			throw haxe_Exception.thrown("Error: PivotJoint cannot be simulated with body1 == body2 (body1=body2=" + this.b1.outer.toString() + ")");
		}
		if(this.b1.space != this.space || this.b2.space != this.space) {
			throw haxe_Exception.thrown("Error: Constraints must have each body within the same space to which the constraint has been assigned (body1=" + this.b1.outer.toString() + ", body2=" + this.b2.outer.toString() + ")");
		}
		if(this.b1.type != ZPP_Flags.id_BodyType_DYNAMIC && this.b2.type != ZPP_Flags.id_BodyType_DYNAMIC) {
			throw haxe_Exception.thrown("Error: Constraints cannot have both bodies non-dynamic (body1=" + this.b1.outer.toString() + ", body2=" + this.b2.outer.toString() + ")");
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
		this.stepped = true;
		this.a1relx = this.b1.axisy * this.a1localx - this.b1.axisx * this.a1localy;
		this.a1rely = this.a1localx * this.b1.axisx + this.a1localy * this.b1.axisy;
		this.a2relx = this.b2.axisy * this.a2localx - this.b2.axisx * this.a2localy;
		this.a2rely = this.a2localx * this.b2.axisx + this.a2localy * this.b2.axisy;
		let m = this.b1.smass + this.b2.smass;
		this.kMassa = m;
		this.kMassb = 0;
		this.kMassc = m;
		if(this.b1.sinertia != 0) {
			let X = this.a1relx * this.b1.sinertia;
			let Y = this.a1rely * this.b1.sinertia;
			this.kMassa += Y * this.a1rely;
			this.kMassb += -Y * this.a1relx;
			this.kMassc += X * this.a1relx;
		}
		if(this.b2.sinertia != 0) {
			let X = this.a2relx * this.b2.sinertia;
			let Y = this.a2rely * this.b2.sinertia;
			this.kMassa += Y * this.a2rely;
			this.kMassb += -Y * this.a2relx;
			this.kMassc += X * this.a2relx;
		}
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
			this.biasx = this.b2.posx + this.a2relx - (this.b1.posx + this.a1relx);
			this.biasy = this.b2.posy + this.a2rely - (this.b1.posy + this.a1rely);
			if(this.breakUnderError && this.biasx * this.biasx + this.biasy * this.biasy > this.maxError * this.maxError) {
				return true;
			}
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
			this.biasx = 0;
			this.biasy = 0;
			this.gamma = 0;
		}
		let t = dtratio;
		this.jAccx *= t;
		this.jAccy *= t;
		this.jMax = this.maxForce * dt;
		return false;
	}
	warmStart() {
		let t = this.b1.imass;
		this.b1.velx -= this.jAccx * t;
		this.b1.vely -= this.jAccy * t;
		let t1 = this.b2.imass;
		this.b2.velx += this.jAccx * t1;
		this.b2.vely += this.jAccy * t1;
		this.b1.angvel -= (this.jAccy * this.a1relx - this.jAccx * this.a1rely) * this.b1.iinertia;
		this.b2.angvel += (this.jAccy * this.a2relx - this.jAccx * this.a2rely) * this.b2.iinertia;
		let dt = 0.0166666666666666664;
		let angDrag = 1 - dt * this.angVelDamping;
		this.b1.angvel *= angDrag;
		this.b2.angvel *= angDrag;
	}
	applyImpulseVel() {
		let Ex = 0.0;
		let Ey = 0.0;
		Ex = this.b2.velx + this.b2.kinvelx - this.a2rely * (this.b2.angvel + this.b2.kinangvel) - (this.b1.velx + this.b1.kinvelx - this.a1rely * (this.b1.angvel + this.b1.kinangvel));
		Ey = this.b2.vely + this.b2.kinvely + this.a2relx * (this.b2.angvel + this.b2.kinangvel) - (this.b1.vely + this.b1.kinvely + this.a1relx * (this.b1.angvel + this.b1.kinangvel));
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
		let t3 = this.b1.imass;
		this.b1.velx -= Jx * t3;
		this.b1.vely -= Jy * t3;
		let t4 = this.b2.imass;
		this.b2.velx += Jx * t4;
		this.b2.vely += Jy * t4;
		this.b1.angvel -= (Jy * this.a1relx - Jx * this.a1rely) * this.b1.iinertia;
		this.b2.angvel += (Jy * this.a2relx - Jx * this.a2rely) * this.b2.iinertia;
		return false;
	}
	applyImpulsePos() {
		let r1x = 0.0;
		let r1y = 0.0;
		r1x = this.b1.axisy * this.a1localx - this.b1.axisx * this.a1localy;
		r1y = this.a1localx * this.b1.axisx + this.a1localy * this.b1.axisy;
		let r2x = 0.0;
		let r2y = 0.0;
		r2x = this.b2.axisy * this.a2localx - this.b2.axisx * this.a2localy;
		r2y = this.a2localx * this.b2.axisx + this.a2localy * this.b2.axisy;
		let Ex = 0.0;
		let Ey = 0.0;
		Ex = this.b2.posx + r2x - (this.b1.posx + r1x);
		Ey = this.b2.posy + r2y - (this.b1.posy + r1y);
		if(this.breakUnderError && Ex * Ex + Ey * Ey > this.maxError * this.maxError) {
			return true;
		}
		if(Ex * Ex + Ey * Ey < Config.constraintLinearSlop * Config.constraintLinearSlop) {
			return false;
		}
		let t = 0.5;
		Ex *= t;
		Ey *= t;
		let Jx = 0.0;
		let Jy = 0.0;
		if(Ex * Ex + Ey * Ey > 6) {
			let k = this.b1.smass + this.b2.smass;
			if(k > Config.epsilon) {
				k = 0.75 / k;
				Jx = -Ex * k;
				Jy = -Ey * k;
				let t = 20;
				let ls = Jx * Jx + Jy * Jy;
				if(ls > t * t) {
					let t1 = t * (1.0 / Math.sqrt(ls));
					Jx *= t1;
					Jy *= t1;
				}
				let t1 = this.b1.imass;
				this.b1.posx -= Jx * t1;
				this.b1.posy -= Jy * t1;
				let t2 = this.b2.imass;
				this.b2.posx += Jx * t2;
				this.b2.posy += Jy * t2;
				Ex = this.b2.posx + r2x - (this.b1.posx + r1x);
				Ey = this.b2.posy + r2y - (this.b1.posy + r1y);
				let t3 = 0.5;
				Ex *= t3;
				Ey *= t3;
			}
		}
		let Ka = 0.0;
		let Kb = 0.0;
		let Kc = 0.0;
		let m = this.b1.smass + this.b2.smass;
		Ka = m;
		Kb = 0;
		Kc = m;
		if(this.b1.sinertia != 0) {
			let X = r1x * this.b1.sinertia;
			let Y = r1y * this.b1.sinertia;
			Ka += Y * r1y;
			Kb += -Y * r1x;
			Kc += X * r1x;
		}
		if(this.b2.sinertia != 0) {
			let X = r2x * this.b2.sinertia;
			let Y = r2y * this.b2.sinertia;
			Ka += Y * r2y;
			Kb += -Y * r2x;
			Kc += X * r2x;
		}
		Jx = -Ex;
		Jy = -Ey;
		let t1 = 6;
		let ls = Jx * Jx + Jy * Jy;
		if(ls > t1 * t1) {
			let t = t1 * (1.0 / Math.sqrt(ls));
			Jx *= t;
			Jy *= t;
		}
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
		let t2 = this.b1.imass;
		this.b1.posx -= Jx * t2;
		this.b1.posy -= Jy * t2;
		let t3 = this.b2.imass;
		this.b2.posx += Jx * t3;
		this.b2.posy += Jy * t3;
		let _this = this.b1;
		let dr = -(Jy * r1x - Jx * r1y) * this.b1.iinertia;
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
		let dr1 = (Jy * r2x - Jx * r2y) * this.b2.iinertia;
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
		if(!this.stiff) {
			let n = a21.sub(a11);
			if(n != null && n.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			if(n != null && n.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = n.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let nl = n.zpp_inner.x;
			if(n != null && n.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = n.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			let nl1 = nl * n.zpp_inner.x;
			if(n != null && n.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = n.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			let nl2 = n.zpp_inner.y;
			if(n != null && n.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = n.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			let nl3 = Math.sqrt(nl1 + nl2 * n.zpp_inner.y);
			if(nl3 != 0) {
				g.drawSpring(a11,a21,16711935);
			}
			if(n != null && n.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this4 = n.zpp_inner;
			if(_this4._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this4._isimmutable != null) {
				_this4._isimmutable();
			}
			if(n.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = n.zpp_inner;
			n.zpp_inner.outer = null;
			n.zpp_inner = null;
			let o = n;
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
		let _this = a11.zpp_inner;
		if(_this._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this._isimmutable != null) {
			_this._isimmutable();
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
		let _this1 = a21.zpp_inner;
		if(_this1._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this1._isimmutable != null) {
			_this1._isimmutable();
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
	}
}
