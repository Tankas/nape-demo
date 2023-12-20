import ZPP_PubPool from '../util/ZPP_PubPool.js';
import ZPP_Vec2 from '../geom/ZPP_Vec2.js';
import ZPP_CopyHelper from './ZPP_CopyHelper.js';
import ZPP_Constraint from './ZPP_Constraint.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import Vec3 from '../../nape/geom/Vec3.js';
import Vec2 from '../../nape/geom/Vec2.js';
import DistanceJoint from '../../nape/constraint/DistanceJoint.js';
import Config from '../../nape/Config.js';
export default class ZPP_DistanceJoint extends ZPP_Constraint {
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
		this.cx2 = 0.0;
		this.cx1 = 0.0;
		this.ny = 0.0;
		this.nx = 0.0;
		this.equal = false;
		this.slack = false;
		this.jointMax = 0.0;
		this.jointMin = 0.0;
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
		this.jAcc = 0;
		this.jMax = Infinity;
		this.stepped = false;
		this.cx1 = this.cx2 = 0;
	}
	is_slack() {
		let slack;
		this.a1relx = this.b1.axisy * this.a1localx - this.b1.axisx * this.a1localy;
		this.a1rely = this.a1localx * this.b1.axisx + this.a1localy * this.b1.axisy;
		this.a2relx = this.b2.axisy * this.a2localx - this.b2.axisx * this.a2localy;
		this.a2rely = this.a2localx * this.b2.axisx + this.a2localy * this.b2.axisy;
		let nx = 0.0;
		let ny = 0.0;
		nx = this.b2.posx + this.a2relx - (this.b1.posx + this.a1relx);
		ny = this.b2.posy + this.a2rely - (this.b1.posy + this.a1rely);
		let C = nx * nx + ny * ny;
		if(C < Config.epsilon) {
			nx = 0;
			ny = 0;
			C = 0;
			slack = true;
		} else {
			C = Math.sqrt(C);
			let t = 1.0 / C;
			nx *= t;
			ny *= t;
			if(this.equal) {
				C -= this.jointMax;
				slack = false;
			} else if(C < this.jointMin) {
				C = this.jointMin - C;
				nx = -nx;
				ny = -ny;
				slack = false;
			} else if(C > this.jointMax) {
				C -= this.jointMax;
				slack = false;
			} else {
				nx = 0;
				ny = 0;
				C = 0;
				slack = true;
			}
		}
		return slack;
	}
	bodyImpulse(b) {
		if(this.stepped) {
			if(b == this.b1) {
				return Vec3.get(-this.jAcc * this.nx,-this.jAcc * this.ny,-this.cx1 * this.jAcc);
			} else {
				return Vec3.get(this.jAcc * this.nx,this.jAcc * this.ny,this.cx2 * this.jAcc);
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
		let ret1 = new DistanceJoint(null,null,ret,_this1.zpp_inner_zn.wrap_a2,this.jointMin,this.jointMax);
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
			throw haxe_Exception.thrown("Error: DistanceJoint cannot be simulated null bodies");
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
		this.nx = this.b2.posx + this.a2relx - (this.b1.posx + this.a1relx);
		this.ny = this.b2.posy + this.a2rely - (this.b1.posy + this.a1rely);
		let C = this.nx * this.nx + this.ny * this.ny;
		if(C < Config.epsilon) {
			this.nx = 0;
			this.ny = 0;
			C = 0;
			this.slack = true;
		} else {
			C = Math.sqrt(C);
			let t = 1.0 / C;
			this.nx *= t;
			this.ny *= t;
			if(this.equal) {
				C -= this.jointMax;
				this.slack = false;
			} else if(C < this.jointMin) {
				C = this.jointMin - C;
				this.nx = -this.nx;
				this.ny = -this.ny;
				this.slack = false;
			} else if(C > this.jointMax) {
				C -= this.jointMax;
				this.slack = false;
			} else {
				this.nx = 0;
				this.ny = 0;
				C = 0;
				this.slack = true;
			}
		}
		let C1 = C;
		if(!this.slack) {
			this.cx1 = this.ny * this.a1relx - this.nx * this.a1rely;
			this.cx2 = this.ny * this.a2relx - this.nx * this.a2rely;
			this.kMass = this.b1.smass + this.b2.smass + this.cx1 * this.cx1 * this.b1.sinertia + this.cx2 * this.cx2 * this.b2.sinertia;
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
			this.b1.velx -= this.nx * t;
			this.b1.vely -= this.ny * t;
			let t1 = this.b2.imass * this.jAcc;
			this.b2.velx += this.nx * t1;
			this.b2.vely += this.ny * t1;
			this.b1.angvel -= this.cx1 * this.b1.iinertia * this.jAcc;
			this.b2.angvel += this.cx2 * this.b2.iinertia * this.jAcc;
			let dt = 0.0166666666666666664;
			let damp = 1 - dt * this.angVelDamping;
			this.b1.angvel *= damp;
			this.b2.angvel *= damp;
			this.b1.velx *= damp;
			this.b1.vely *= damp;
			this.b2.velx *= damp;
			this.b2.vely *= damp;
		}
	}
	dampingValue(value) {
		let da1 = value * value * this.angVelDamping;
		if(da1 > Math.abs(value)) {
			da1 = Math.abs(value);
		}
		if(value < 0.0) {
			da1 *= -1;
		}
		return value - da1;
	}
	applyImpulseVel() {
		if(this.slack) {
			return false;
		}
		let E = this.nx * (this.b2.velx + this.b2.kinvelx - this.b1.velx - this.b1.kinvelx) + this.ny * (this.b2.vely + this.b2.kinvely - this.b1.vely - this.b1.kinvely) + (this.b2.angvel + this.b2.kinangvel) * this.cx2 - (this.b1.angvel + this.b1.kinangvel) * this.cx1;
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
		this.b1.velx -= this.nx * t;
		this.b1.vely -= this.ny * t;
		let t1 = this.b2.imass * j;
		this.b2.velx += this.nx * t1;
		this.b2.vely += this.ny * t1;
		this.b1.angvel -= this.cx1 * this.b1.iinertia * j;
		this.b2.angvel += this.cx2 * this.b2.iinertia * j;
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
		let slack;
		let nx = 0.0;
		let ny = 0.0;
		nx = this.b2.posx + r2x - (this.b1.posx + r1x);
		ny = this.b2.posy + r2y - (this.b1.posy + r1y);
		let C = nx * nx + ny * ny;
		if(C < Config.epsilon) {
			nx = 0;
			ny = 0;
			C = 0;
			slack = true;
		} else {
			C = Math.sqrt(C);
			let t = 1.0 / C;
			nx *= t;
			ny *= t;
			if(this.equal) {
				C -= this.jointMax;
				slack = false;
			} else if(C < this.jointMin) {
				C = this.jointMin - C;
				nx = -nx;
				ny = -ny;
				slack = false;
			} else if(C > this.jointMax) {
				C -= this.jointMax;
				slack = false;
			} else {
				nx = 0;
				ny = 0;
				C = 0;
				slack = true;
			}
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
						this.b1.posx -= nx * t;
						this.b1.posy -= ny * t;
						let t1 = j * this.b2.imass;
						this.b2.posx += nx * t1;
						this.b2.posy += ny * t1;
						nx = this.b2.posx + r2x - (this.b1.posx + r1x);
						ny = this.b2.posy + r2y - (this.b1.posy + r1y);
						let C = nx * nx + ny * ny;
						if(C < Config.epsilon) {
							nx = 0;
							ny = 0;
							C = 0;
							slack = true;
						} else {
							C = Math.sqrt(C);
							let t = 1.0 / C;
							nx *= t;
							ny *= t;
							if(this.equal) {
								C -= this.jointMax;
								slack = false;
							} else if(C < this.jointMin) {
								C = this.jointMin - C;
								nx = -nx;
								ny = -ny;
								slack = false;
							} else if(C > this.jointMax) {
								C -= this.jointMax;
								slack = false;
							} else {
								nx = 0;
								ny = 0;
								C = 0;
								slack = true;
							}
						}
						E = C;
						E *= 0.5;
					}
				}
			}
			let cx1 = ny * r1x - nx * r1y;
			let cx2 = ny * r2x - nx * r2y;
			let k = this.b1.smass + this.b2.smass + cx1 * cx1 * this.b1.sinertia + cx2 * cx2 * this.b2.sinertia;
			if(k != 0) {
				k = 1 / k;
			}
			j = -E * k;
			if(this.equal || j < 0) {
				let t = this.b1.imass * j;
				this.b1.posx -= nx * t;
				this.b1.posy -= ny * t;
				let t1 = this.b2.imass * j;
				this.b2.posx += nx * t1;
				this.b2.posy += ny * t1;
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
			n.muleq(1 / nl3);
			let mid = a11.add(a21).muleq(0.5);
			let min1 = mid.sub(n.mul(this.jointMin * 0.5,true));
			let min2 = mid.add(n.mul(this.jointMin * 0.5,true));
			let max1 = mid.sub(n.mul(this.jointMax * 0.5,true));
			let max2 = mid.add(n.mul(this.jointMax * 0.5,true));
			g.drawLine(min1,min2,16776960);
			g.drawLine(max1,min1,65535);
			g.drawLine(max2,min2,65535);
			if(!this.stiff) {
				if(nl3 > this.jointMax) {
					g.drawSpring(max1,a11,65535);
					g.drawSpring(max2,a21,65535);
				} else if(nl3 < this.jointMin) {
					g.drawSpring(min1,a11,16776960);
					g.drawSpring(min2,a21,16776960);
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
		g.drawFilledCircle(a11,2,255);
		g.drawFilledCircle(a21,2,16711680);
		if(a11 != null && a11.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = a11.zpp_inner;
		if(_this4._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this4._isimmutable != null) {
			_this4._isimmutable();
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
		let _this5 = a21.zpp_inner;
		if(_this5._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this5._isimmutable != null) {
			_this5._isimmutable();
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
		if(n != null && n.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this6 = n.zpp_inner;
		if(_this6._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this6._isimmutable != null) {
			_this6._isimmutable();
		}
		if(n.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner2 = n.zpp_inner;
		n.zpp_inner.outer = null;
		n.zpp_inner = null;
		let o4 = n;
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
