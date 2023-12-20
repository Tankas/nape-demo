import ZPP_MotorJoint from '../../zpp_nape/constraint/ZPP_MotorJoint.js';
import Vec3 from '../geom/Vec3.js';
import MatMN from '../geom/MatMN.js';
import Constraint from './Constraint.js';
export default class MotorJoint extends Constraint {
	constructor(body1,body2,rate,ratio) {
		Constraint._hx_skip_constructor = true;
		super();
		Constraint._hx_skip_constructor = false;
		this._hx_constructor(body1,body2,rate,ratio);
	}
	_hx_constructor(body1,body2,rate,ratio) {
		if(ratio == null) {
			ratio = 1.0;
		}
		if(rate == null) {
			rate = 0.0;
		}
		this.zpp_inner_zn = null;
		this.zpp_inner_zn = new ZPP_MotorJoint();
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
		this.zpp_inner.immutable_midstep("MotorJoint::rate");
		if(rate != rate) {
			throw haxe_Exception.thrown("Error: MotorJoint::rate cannot be NaN");
		}
		if(this.zpp_inner_zn.rate != rate) {
			this.zpp_inner_zn.rate = rate;
			this.zpp_inner.wake();
		}
		this.zpp_inner.immutable_midstep("MotorJoint::ratio");
		if(ratio != ratio) {
			throw haxe_Exception.thrown("Error: MotorJoint::ratio cannot be NaN");
		}
		if(this.zpp_inner_zn.ratio != ratio) {
			this.zpp_inner_zn.ratio = ratio;
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
	get_ratio() {
		return this.zpp_inner_zn.ratio;
	}
	set_ratio(ratio) {
		this.zpp_inner.immutable_midstep("MotorJoint::ratio");
		if(ratio != ratio) {
			throw haxe_Exception.thrown("Error: MotorJoint::ratio cannot be NaN");
		}
		if(this.zpp_inner_zn.ratio != ratio) {
			this.zpp_inner_zn.ratio = ratio;
			this.zpp_inner.wake();
		}
		return this.zpp_inner_zn.ratio;
	}
	get_rate() {
		return this.zpp_inner_zn.rate;
	}
	set_rate(rate) {
		this.zpp_inner.immutable_midstep("MotorJoint::rate");
		if(rate != rate) {
			throw haxe_Exception.thrown("Error: MotorJoint::rate cannot be NaN");
		}
		if(this.zpp_inner_zn.rate != rate) {
			this.zpp_inner_zn.rate = rate;
			this.zpp_inner.wake();
		}
		return this.zpp_inner_zn.rate;
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
