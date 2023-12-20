import ZPP_CompoundList from '../util/ZPP_CompoundList.js';
import ZPP_BodyList from '../util/ZPP_BodyList.js';
import ZPP_ConstraintList from '../util/ZPP_ConstraintList.js';
import ZNPList_ZPP_Compound from '../util/ZNPList_ZPP_Compound.js';
import ZNPList_ZPP_Body from '../util/ZNPList_ZPP_Body.js';
import ZPP_Interactor from './ZPP_Interactor.js';
import ZPP_CopyHelper from '../constraint/ZPP_CopyHelper.js';
import ZNPList_ZPP_Constraint from '../util/ZNPList_ZPP_Constraint.js';
import Compound from '../../nape/phys/Compound.js';
export default class ZPP_Compound extends ZPP_Interactor {
	constructor() {
		ZPP_Interactor._hx_skip_constructor = true;
		super();
		ZPP_Interactor._hx_skip_constructor = false;
		this._hx_constructor();
	}
	_hx_constructor() {
		this.space = null;
		this.compound = null;
		this.depth = 0;
		this.wrap_compounds = null;
		this.wrap_constraints = null;
		this.wrap_bodies = null;
		this.compounds = null;
		this.constraints = null;
		this.bodies = null;
		this.outer = null;
		super._hx_constructor();
		this.icompound = this;
		this.depth = 1;
		let me = this;
		this.bodies = new ZNPList_ZPP_Body();
		this.wrap_bodies = ZPP_BodyList.get(this.bodies);
		this.wrap_bodies.zpp_inner.adder = $bind(this,this.bodies_adder);
		this.wrap_bodies.zpp_inner.subber = $bind(this,this.bodies_subber);
		this.wrap_bodies.zpp_inner._modifiable = $bind(this,this.bodies_modifiable);
		this.constraints = new ZNPList_ZPP_Constraint();
		this.wrap_constraints = ZPP_ConstraintList.get(this.constraints);
		this.wrap_constraints.zpp_inner.adder = $bind(this,this.constraints_adder);
		this.wrap_constraints.zpp_inner.subber = $bind(this,this.constraints_subber);
		this.wrap_constraints.zpp_inner._modifiable = $bind(this,this.constraints_modifiable);
		this.compounds = new ZNPList_ZPP_Compound();
		this.wrap_compounds = ZPP_CompoundList.get(this.compounds);
		this.wrap_compounds.zpp_inner.adder = $bind(this,this.compounds_adder);
		this.wrap_compounds.zpp_inner.subber = $bind(this,this.compounds_subber);
		this.wrap_compounds.zpp_inner._modifiable = $bind(this,this.compounds_modifiable);
	}
	__imutable_midstep(name) {
		if(this.space != null && this.space.midstep) {
			throw haxe_Exception.thrown("Error: " + name + " cannot be set during space step()");
		}
	}
	addedToSpace() {
		this.__iaddedToSpace();
	}
	removedFromSpace() {
		this.__iremovedFromSpace();
	}
	breakApart() {
		if(this.space != null) {
			this.__iremovedFromSpace();
			this.space.nullInteractorType(this);
		}
		if(this.compound != null) {
			this.compound.compounds.remove(this);
		} else if(this.space != null) {
			this.space.compounds.remove(this);
		}
		while(this.bodies.head != null) {
			let b = this.bodies.pop_unsafe();
			if((b.compound = this.compound) != null) {
				this.compound.bodies.add(b);
			} else if(this.space != null) {
				this.space.bodies.add(b);
			}
			if(this.space != null) {
				this.space.freshInteractorType(b);
			}
		}
		while(this.constraints.head != null) {
			let c = this.constraints.pop_unsafe();
			if((c.compound = this.compound) != null) {
				this.compound.constraints.add(c);
			} else if(this.space != null) {
				this.space.constraints.add(c);
			}
		}
		while(this.compounds.head != null) {
			let c = this.compounds.pop_unsafe();
			if((c.compound = this.compound) != null) {
				this.compound.compounds.add(c);
			} else if(this.space != null) {
				this.space.compounds.add(c);
			}
			if(this.space != null) {
				this.space.freshInteractorType(c);
			}
		}
		this.compound = null;
		this.space = null;
	}
	bodies_adder(x) {
		if(x.zpp_inner.compound != this) {
			if(x.zpp_inner.compound != null) {
				x.zpp_inner.compound.wrap_bodies.remove(x);
			} else if(x.zpp_inner.space != null) {
				x.zpp_inner.space.wrap_bodies.remove(x);
			}
			x.zpp_inner.compound = this;
			if(this.space != null) {
				this.space.addBody(x.zpp_inner);
			}
			return true;
		} else {
			return false;
		}
	}
	bodies_subber(x) {
		x.zpp_inner.compound = null;
		if(this.space != null) {
			this.space.remBody(x.zpp_inner);
		}
	}
	bodies_modifiable() {
		this.immutable_midstep("Compound::" + "bodies");
	}
	constraints_adder(x) {
		if(x.zpp_inner.compound != this) {
			if(x.zpp_inner.compound != null) {
				x.zpp_inner.compound.wrap_constraints.remove(x);
			} else if(x.zpp_inner.space != null) {
				x.zpp_inner.space.wrap_constraints.remove(x);
			}
			x.zpp_inner.compound = this;
			if(this.space != null) {
				this.space.addConstraint(x.zpp_inner);
			}
			return true;
		} else {
			return false;
		}
	}
	constraints_subber(x) {
		x.zpp_inner.compound = null;
		if(this.space != null) {
			this.space.remConstraint(x.zpp_inner);
		}
	}
	constraints_modifiable() {
		this.immutable_midstep("Compound::" + "constraints");
	}
	compounds_adder(x) {
		let cur = this;
		while(cur != null && cur != x.zpp_inner) cur = cur.compound;
		if(cur == x.zpp_inner) {
			throw haxe_Exception.thrown("Error: Assignment would cause a cycle in the Compound tree: assigning " + x.toString() + ".compound = " + this.outer.toString());
		}
		if(x.zpp_inner.compound != this) {
			if(x.zpp_inner.compound != null) {
				x.zpp_inner.compound.wrap_compounds.remove(x);
			} else if(x.zpp_inner.space != null) {
				x.zpp_inner.space.wrap_compounds.remove(x);
			}
			x.zpp_inner.compound = this;
			x.zpp_inner.depth = this.depth + 1;
			if(this.space != null) {
				this.space.addCompound(x.zpp_inner);
			}
			return true;
		} else {
			return false;
		}
	}
	compounds_subber(x) {
		x.zpp_inner.compound = null;
		x.zpp_inner.depth = 1;
		if(this.space != null) {
			this.space.remCompound(x.zpp_inner);
		}
	}
	compounds_modifiable() {
		this.immutable_midstep("Compound::" + "compounds");
	}
	copy(dict,todo) {
		let root = dict == null;
		if(dict == null) {
			dict = [];
		}
		if(todo == null) {
			todo = [];
		}
		let ret = new Compound();
		let cx_ite = this.compounds.head;
		while(cx_ite != null) {
			let c = cx_ite.elt;
			let cc = c.copy(dict,todo);
			cc.zpp_inner.immutable_midstep("Compound::compound");
			if((cc.zpp_inner.compound == null ? null : cc.zpp_inner.compound.outer) != ret) {
				if((cc.zpp_inner.compound == null ? null : cc.zpp_inner.compound.outer) != null) {
					(cc.zpp_inner.compound == null ? null : cc.zpp_inner.compound.outer).zpp_inner.wrap_compounds.remove(cc);
				}
				if(ret != null) {
					let _this = ret.zpp_inner.wrap_compounds;
					if(_this.zpp_inner.reverse_flag) {
						_this.push(cc);
					} else {
						_this.unshift(cc);
					}
				}
			}
			let tmp = cc.zpp_inner.compound == null;
			cx_ite = cx_ite.next;
		}
		let cx_ite1 = this.bodies.head;
		while(cx_ite1 != null) {
			let b = cx_ite1.elt;
			let bc = b.outer.copy();
			dict.push(ZPP_CopyHelper.dict(b.id,bc));
			if((bc.zpp_inner.compound == null ? null : bc.zpp_inner.compound.outer) != ret) {
				if((bc.zpp_inner.compound == null ? null : bc.zpp_inner.compound.outer) != null) {
					(bc.zpp_inner.compound == null ? null : bc.zpp_inner.compound.outer).zpp_inner.wrap_bodies.remove(bc);
				}
				if(ret != null) {
					let _this = ret.zpp_inner.wrap_bodies;
					if(_this.zpp_inner.reverse_flag) {
						_this.push(bc);
					} else {
						_this.unshift(bc);
					}
				}
			}
			let tmp = bc.zpp_inner.compound == null;
			cx_ite1 = cx_ite1.next;
		}
		let cx_ite2 = this.constraints.head;
		while(cx_ite2 != null) {
			let c = cx_ite2.elt;
			let cc = c.copy(dict,todo);
			if((cc.zpp_inner.compound == null ? null : cc.zpp_inner.compound.outer) != ret) {
				if((cc.zpp_inner.compound == null ? null : cc.zpp_inner.compound.outer) != null) {
					(cc.zpp_inner.compound == null ? null : cc.zpp_inner.compound.outer).zpp_inner.wrap_constraints.remove(cc);
				}
				if(ret != null) {
					let _this = ret.zpp_inner.wrap_constraints;
					if(_this.zpp_inner.reverse_flag) {
						_this.push(cc);
					} else {
						_this.unshift(cc);
					}
				}
			}
			let tmp = cc.zpp_inner.compound == null;
			cx_ite2 = cx_ite2.next;
		}
		if(root) {
			while(todo.length > 0) {
				let xcb = todo.pop();
				let _g = 0;
				while(_g < dict.length) {
					let idc = dict[_g];
					++_g;
					if(idc.id == xcb.id) {
						xcb.cb(idc.bc);
						break;
					}
				}
			}
		}
		this.copyto(ret);
		return ret;
	}
}
