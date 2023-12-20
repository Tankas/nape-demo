import ZPP_UserConstraint from '../../zpp_nape/constraint/ZPP_UserConstraint.js';
import Vec3 from '../geom/Vec3.js';
import Vec2 from '../geom/Vec2.js';
import MatMN from '../geom/MatMN.js';
import Constraint from './Constraint.js';
export default class UserConstraint extends Constraint {
	constructor(dimensions,velocityOnly) {
		if(Constraint._hx_skip_constructor) {
			super();
			return;
		}
		Constraint._hx_skip_constructor = true;
		super();
		Constraint._hx_skip_constructor = false;
		this._hx_constructor(dimensions,velocityOnly);
	}
	_hx_constructor(dimensions,velocityOnly) {
		if(velocityOnly == null) {
			velocityOnly = false;
		}
		this.zpp_inner_zn = null;
		if(dimensions < 1) {
			throw haxe_Exception.thrown("Error: Constraint dimension must be at least 1");
		}
		this.zpp_inner_zn = new ZPP_UserConstraint(dimensions,velocityOnly);
		this.zpp_inner = this.zpp_inner_zn;
		this.zpp_inner.outer = this;
		this.zpp_inner_zn.outer_zn = this;
		Constraint.zpp_internalAlloc = true;
		super._hx_constructor();
		Constraint.zpp_internalAlloc = false;
	}
	__bindVec2() {
		let ret = new Vec2();
		ret.zpp_inner._inuse = true;
		ret.zpp_inner._invalidate = ($_=this.zpp_inner_zn,$bind($_,$_.bindVec2_invalidate));
		return ret;
	}
	__copy() {
		throw haxe_Exception.thrown("Error: UserConstraint::__copy must be overriden");
	}
	__broken() {
	}
	__validate() {
	}
	__draw(debug) {
	}
	__prepare() {
	}
	__position(err) {
		throw haxe_Exception.thrown("Error: UserConstraint::__position must be overriden");
	}
	__velocity(err) {
		throw haxe_Exception.thrown("Error: Userconstraint::__velocity must be overriden");
	}
	__eff_mass(eff) {
		throw haxe_Exception.thrown("Error: UserConstraint::__eff_mass must be overriden");
	}
	__clamp(jAcc) {
	}
	__impulse(imp,body,out) {
		throw haxe_Exception.thrown("Error: UserConstraint::__impulse must be overriden");
	}
	impulse() {
		let ret = new MatMN(this.zpp_inner_zn.dim,1);
		let _g = 0;
		let _g1 = this.zpp_inner_zn.dim;
		while(_g < _g1) {
			let i = _g++;
			let x = this.zpp_inner_zn.jAcc[i];
			if(i < 0 || i >= ret.zpp_inner.m || 0 >= ret.zpp_inner.n) {
				throw haxe_Exception.thrown("Error: MatMN indices out of range");
			}
			ret.zpp_inner.x[i * ret.zpp_inner.n] = x;
		}
		return ret;
	}
	bodyImpulse(body) {
		if(body == null) {
			throw haxe_Exception.thrown("Error: Cannot evaluate impulse on null body");
		}
		let found = false;
		let _g = 0;
		let _g1 = this.zpp_inner_zn.bodies;
		while(_g < _g1.length) {
			let b = _g1[_g];
			++_g;
			if(b.body == body.zpp_inner) {
				found = true;
				break;
			}
		}
		if(!found) {
			throw haxe_Exception.thrown("Error: Body is not linked to this constraint");
		}
		if(!this.zpp_inner.active) {
			return Vec3.get();
		} else {
			return this.zpp_inner_zn.bodyImpulse(body.zpp_inner);
		}
	}
	visitBodies(lambda) {
		let i = 0;
		let nbodies = this.zpp_inner_zn.bodies.length;
		while(i < nbodies) {
			let b = this.zpp_inner_zn.bodies[i];
			if(b.body != null) {
				let found = false;
				let _g = i + 1;
				let _g1 = nbodies;
				while(_g < _g1) {
					let j = _g++;
					let c = this.zpp_inner_zn.bodies[j];
					if(c.body == b.body) {
						found = true;
						break;
					}
				}
				if(!found) {
					lambda(b.body.outer);
				}
			}
			++i;
		}
	}
	__invalidate() {
		this.zpp_inner.immutable_midstep("UserConstraint::invalidate()");
		if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
			this.zpp_inner.wake();
		}
	}
	__warmStart() {
	}
	__registerBody(oldBody,newBody) {
		this.zpp_inner.immutable_midstep("UserConstraint::registerBody(..)");
		if(oldBody != newBody) {
			if(oldBody != null) {
				if(!this.zpp_inner_zn.remBody(oldBody.zpp_inner)) {
					throw haxe_Exception.thrown("Error: oldBody is not registered to the cosntraint");
				}
				if(this.zpp_inner.active && (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
					oldBody.zpp_inner.wake();
				}
			}
			if(newBody != null) {
				this.zpp_inner_zn.addBody(newBody.zpp_inner);
			}
			this.zpp_inner.wake();
			if(newBody != null) {
				newBody.zpp_inner.wake();
			}
		}
		return newBody;
	}
}
