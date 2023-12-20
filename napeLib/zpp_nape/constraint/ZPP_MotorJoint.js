import ZPP_CopyHelper from './ZPP_CopyHelper.js';
import ZPP_Constraint from './ZPP_Constraint.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import Vec3 from '../../nape/geom/Vec3.js';
import MotorJoint from '../../nape/constraint/MotorJoint.js';
export default class ZPP_MotorJoint extends ZPP_Constraint {
	constructor() {
		ZPP_Constraint._hx_skip_constructor = true;
		super();
		ZPP_Constraint._hx_skip_constructor = false;
		this._hx_constructor();
	}
	_hx_constructor() {
		this.stepped = false;
		this.jMax = 0.0;
		this.jAcc = 0.0;
		this.kMass = 0.0;
		this.b2 = null;
		this.b1 = null;
		this.rate = 0.0;
		this.ratio = 0.0;
		this.outer_zn = null;
		super._hx_constructor();
		this.jAcc = 0;
		this.stepped = false;
		this.__velocity = true;
	}
	bodyImpulse(b) {
		if(this.stepped) {
			if(b == this.b1) {
				return Vec3.get(0,0,-this.jAcc);
			} else {
				return Vec3.get(0,0,this.ratio * this.jAcc);
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
	copy(dict,todo) {
		let ret = new MotorJoint(null,null,this.rate,this.ratio);
		this.copyto(ret);
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
				ret.zpp_inner_zn.b1 = b.zpp_inner;
			} else {
				todo.push(ZPP_CopyHelper.todo(this.b1.id,function(b) {
					ret.zpp_inner_zn.b1 = b.zpp_inner;
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
				ret.zpp_inner_zn.b2 = b.zpp_inner;
			} else {
				todo.push(ZPP_CopyHelper.todo(this.b2.id,function(b) {
					ret.zpp_inner_zn.b2 = b.zpp_inner;
				}));
			}
		}
		return ret;
	}
	validate() {
		if(this.b1 == null || this.b2 == null) {
			throw haxe_Exception.thrown("Error: AngleJoint cannot be simulated null bodies");
		}
		if(this.b1 == this.b2) {
			throw haxe_Exception.thrown("Error: MotorJoint cannot be simulated with body1 == body2");
		}
		if(this.b1.space != this.space || this.b2.space != this.space) {
			throw haxe_Exception.thrown("Error: Constraints must have each body within the same space to which the constraint has been assigned");
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
		this.kMass = this.b1.sinertia + this.ratio * this.ratio * this.b2.sinertia;
		this.kMass = 1.0 / this.kMass;
		this.jAcc *= dtratio;
		this.jMax = this.maxForce * dt;
		return false;
	}
	warmStart() {
		this.b1.angvel -= this.b1.iinertia * this.jAcc;
		this.b2.angvel += this.ratio * this.b2.iinertia * this.jAcc;
	}
	applyImpulseVel() {
		let E = this.ratio * (this.b2.angvel + this.b2.kinangvel) - this.b1.angvel - this.b1.kinangvel - this.rate;
		let j = -this.kMass * E;
		let jOld = this.jAcc;
		this.jAcc += j;
		if(this.breakUnderForce) {
			if(this.jAcc > this.jMax || this.jAcc < -this.jMax) {
				return true;
			}
		} else if(this.jAcc < -this.jMax) {
			this.jAcc = -this.jMax;
		} else if(this.jAcc > this.jMax) {
			this.jAcc = this.jMax;
		}
		j = this.jAcc - jOld;
		this.b1.angvel -= this.b1.iinertia * j;
		this.b2.angvel += this.ratio * this.b2.iinertia * j;
		return false;
	}
	applyImpulsePos() {
		return false;
	}
}
