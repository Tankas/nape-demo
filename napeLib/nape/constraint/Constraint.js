import ZPP_CbType from '../../zpp_nape/callbacks/ZPP_CbType.js';
export default class Constraint {
	constructor() {
		if(Constraint._hx_skip_constructor) {
			return;
		}
		this._hx_constructor();
	}
	_hx_constructor() {
		this.debugDraw = true;
		this.userData = { };
		this.zpp_inner.insert_cbtype(ZPP_CbType.ANY_CONSTRAINT.zpp_inner);
		if(!Constraint.zpp_internalAlloc) {
			throw haxe_Exception.thrown("Error: Constraint cannot be instantiated derp!");
		}
	}
	get_userData() {
		return this.userData;
	}
	get_compound() {
		if(this.zpp_inner.compound == null) {
			return null;
		} else {
			return this.zpp_inner.compound.outer;
		}
	}
	set_compound(compound) {
		if((this.zpp_inner.compound == null ? null : this.zpp_inner.compound.outer) != compound) {
			if((this.zpp_inner.compound == null ? null : this.zpp_inner.compound.outer) != null) {
				(this.zpp_inner.compound == null ? null : this.zpp_inner.compound.outer).zpp_inner.wrap_constraints.remove(this);
			}
			if(compound != null) {
				let _this = compound.zpp_inner.wrap_constraints;
				if(_this.zpp_inner.reverse_flag) {
					_this.push(this);
				} else {
					_this.unshift(this);
				}
			}
		}
		if(this.zpp_inner.compound == null) {
			return null;
		} else {
			return this.zpp_inner.compound.outer;
		}
	}
	get_space() {
		if(this.zpp_inner.space == null) {
			return null;
		} else {
			return this.zpp_inner.space.outer;
		}
	}
	set_space(space) {
		if(this.zpp_inner.compound != null) {
			throw haxe_Exception.thrown("Error: Cannot set the space of a Constraint belonging to" + " a Compound, only the root Compound space can be set");
		}
		if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != space) {
			if(this.zpp_inner.component != null) {
				this.zpp_inner.component.woken = false;
			}
			this.zpp_inner.clearcache();
			if(this.zpp_inner.space != null) {
				this.zpp_inner.space.outer.zpp_inner.wrap_constraints.remove(this);
			}
			if(space != null) {
				let _this = space.zpp_inner.wrap_constraints;
				if(_this.zpp_inner.reverse_flag) {
					_this.push(this);
				} else {
					_this.unshift(this);
				}
			} else {
				this.zpp_inner.space = null;
			}
		}
		if(this.zpp_inner.space == null) {
			return null;
		} else {
			return this.zpp_inner.space.outer;
		}
	}
	get_isSleeping() {
		if(this.zpp_inner.space == null || !this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: isSleeping only makes sense if constraint is" + " active and inside a space");
		}
		return this.zpp_inner.component.sleeping;
	}
	get_active() {
		return this.zpp_inner.active;
	}
	set_active(active) {
		if(this.zpp_inner.active != active) {
			if(this.zpp_inner.component != null) {
				this.zpp_inner.component.woken = false;
			}
			this.zpp_inner.clearcache();
			if(active) {
				this.zpp_inner.active = active;
				this.zpp_inner.activate();
				if(this.zpp_inner.space != null) {
					if(this.zpp_inner.component != null) {
						this.zpp_inner.component.sleeping = true;
					}
					this.zpp_inner.space.wake_constraint(this.zpp_inner,true);
				}
			} else {
				if(this.zpp_inner.space != null) {
					this.zpp_inner.wake();
					this.zpp_inner.space.live_constraints.remove(this.zpp_inner);
				}
				this.zpp_inner.active = active;
				this.zpp_inner.deactivate();
			}
		}
		return this.zpp_inner.active;
	}
	get_ignore() {
		return this.zpp_inner.ignore;
	}
	set_ignore(ignore) {
		if(this.zpp_inner.ignore != ignore) {
			this.zpp_inner.ignore = ignore;
			this.zpp_inner.wake();
		}
		return this.zpp_inner.ignore;
	}
	get_stiff() {
		return this.zpp_inner.stiff;
	}
	set_stiff(stiff) {
		if(this.zpp_inner.stiff != stiff) {
			this.zpp_inner.stiff = stiff;
			this.zpp_inner.wake();
		}
		return this.zpp_inner.stiff;
	}
	get_frequency() {
		return this.zpp_inner.frequency;
	}
	set_frequency(frequency) {
		if(frequency != frequency) {
			throw haxe_Exception.thrown("Error: Constraint::Frequency cannot be NaN");
		}
		if(frequency <= 0) {
			throw haxe_Exception.thrown("Error: Constraint::Frequency must be >0");
		}
		if(this.zpp_inner.frequency != frequency) {
			this.zpp_inner.frequency = frequency;
			if(!this.zpp_inner.stiff) {
				this.zpp_inner.wake();
			}
		}
		return this.zpp_inner.frequency;
	}
	get_damping() {
		return this.zpp_inner.damping;
	}
	set_damping(damping) {
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
		return this.zpp_inner.damping;
	}
	get_maxForce() {
		return this.zpp_inner.maxForce;
	}
	set_maxForce(maxForce) {
		if(maxForce != maxForce) {
			throw haxe_Exception.thrown("Error: Constraint::maxForce cannot be NaN");
		}
		if(maxForce < 0) {
			throw haxe_Exception.thrown("Error: Constraint::maxForce must be >=0");
		}
		if(this.zpp_inner.maxForce != maxForce) {
			this.zpp_inner.maxForce = maxForce;
			this.zpp_inner.wake();
		}
		return this.zpp_inner.maxForce;
	}
	get_maxError() {
		return this.zpp_inner.maxError;
	}
	set_maxError(maxError) {
		if(maxError != maxError) {
			throw haxe_Exception.thrown("Error: Constraint::maxError cannot be NaN");
		}
		if(maxError < 0) {
			throw haxe_Exception.thrown("Error: Constraint::maxError must be >=0");
		}
		if(this.zpp_inner.maxError != maxError) {
			this.zpp_inner.maxError = maxError;
			this.zpp_inner.wake();
		}
		return this.zpp_inner.maxError;
	}
	get_breakUnderForce() {
		return this.zpp_inner.breakUnderForce;
	}
	set_breakUnderForce(breakUnderForce) {
		if(this.zpp_inner.breakUnderForce != breakUnderForce) {
			this.zpp_inner.breakUnderForce = breakUnderForce;
			this.zpp_inner.wake();
		}
		return this.zpp_inner.breakUnderForce;
	}
	get_breakUnderError() {
		return this.zpp_inner.breakUnderError;
	}
	set_breakUnderError(breakUnderError) {
		if(this.zpp_inner.breakUnderError != breakUnderError) {
			this.zpp_inner.breakUnderError = breakUnderError;
			this.zpp_inner.wake();
		}
		return this.zpp_inner.breakUnderError;
	}
	get_removeOnBreak() {
		return this.zpp_inner.removeOnBreak;
	}
	set_removeOnBreak(removeOnBreak) {
		this.zpp_inner.removeOnBreak = removeOnBreak;
		return this.zpp_inner.removeOnBreak;
	}
	impulse() {
		return null;
	}
	bodyImpulse(body) {
		return null;
	}
	visitBodies(lambda) {
	}
	get_cbTypes() {
		if(this.zpp_inner.wrap_cbTypes == null) {
			this.zpp_inner.setupcbTypes();
		}
		return this.zpp_inner.wrap_cbTypes;
	}
	toString() {
		return "{Constraint}";
	}
	copy() {
		return this.zpp_inner.copy();
	}
}
Constraint._hx_skip_constructor = false;
Constraint.zpp_internalAlloc = false;
