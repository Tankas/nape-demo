import ZPP_CbTypeList from '../util/ZPP_CbTypeList.js';
import ZNPNode_ZPP_CbType from '../util/ZNPNode_ZPP_CbType.js';
import ZPP_Component from '../space/ZPP_Component.js';
import ZNPList_ZPP_CbType from '../util/ZNPList_ZPP_CbType.js';
import ZPP_CbSet from '../callbacks/ZPP_CbSet.js';
import ZPP_ID from '../ZPP_ID.js';
import CbTypeIterator from '../../nape/callbacks/CbTypeIterator.js';
export default class ZPP_Constraint {
	constructor() {
		if(ZPP_Constraint._hx_skip_constructor) {
			return;
		}
		this._hx_constructor();
	}
	_hx_constructor() {
		this.pre_dt = 0.0;
		this.wrap_cbTypes = null;
		this.cbSet = null;
		this.cbTypes = null;
		this.angVelDamping = 0.0;
		this.__velocity = false;
		this.ignore = false;
		this.component = null;
		this.removeOnBreak = false;
		this.breakUnderError = false;
		this.breakUnderForce = false;
		this.maxError = 0.0;
		this.maxForce = 0.0;
		this.damping = 0.0;
		this.frequency = 0.0;
		this.stiff = false;
		this.active = false;
		this.space = null;
		this.compound = null;
		this.userData = null;
		this.id = 0;
		this.outer = null;
		this.__velocity = false;
		this.id = ZPP_ID.Constraint();
		this.stiff = true;
		this.active = true;
		this.ignore = false;
		this.frequency = 10;
		this.damping = 1;
		this.maxForce = Infinity;
		this.maxError = Infinity;
		this.breakUnderForce = false;
		this.removeOnBreak = true;
		this.pre_dt = -1.0;
		this.cbTypes = new ZNPList_ZPP_CbType();
	}
	clear() {
	}
	immutable_midstep(name) {
		if(this.space != null && this.space.midstep) {
			throw haxe_Exception.thrown("Error: Constraint::" + name + " cannot be set during space step()");
		}
	}
	setupcbTypes() {
		this.wrap_cbTypes = ZPP_CbTypeList.get(this.cbTypes);
		this.wrap_cbTypes.zpp_inner.adder = $bind(this,this.wrap_cbTypes_adder);
		this.wrap_cbTypes.zpp_inner.subber = $bind(this,this.wrap_cbTypes_subber);
		this.wrap_cbTypes.zpp_inner.dontremove = true;
		this.wrap_cbTypes.zpp_inner._modifiable = $bind(this,this.immutable_cbTypes);
	}
	immutable_cbTypes() {
		this.immutable_midstep("Constraint::cbTypes");
	}
	wrap_cbTypes_subber(pcb) {
		let cb = pcb.zpp_inner;
		if(this.cbTypes.has(cb)) {
			if(this.space != null) {
				this.dealloc_cbSet();
				cb.constraints.remove(this);
			}
			this.cbTypes.remove(cb);
			if(this.space != null) {
				this.alloc_cbSet();
				this.wake();
			}
		}
	}
	wrap_cbTypes_adder(cb) {
		this.insert_cbtype(cb.zpp_inner);
		return false;
	}
	insert_cbtype(cb) {
		if(!this.cbTypes.has(cb)) {
			if(this.space != null) {
				this.dealloc_cbSet();
				cb.constraints.add(this);
			}
			let pre = null;
			let cx_ite = this.cbTypes.head;
			while(cx_ite != null) {
				let j = cx_ite.elt;
				if(cb.id < j.id) {
					break;
				}
				pre = cx_ite;
				cx_ite = cx_ite.next;
			}
			let _this = this.cbTypes;
			let ret;
			if(ZNPNode_ZPP_CbType.zpp_pool == null) {
				ret = new ZNPNode_ZPP_CbType();
			} else {
				ret = ZNPNode_ZPP_CbType.zpp_pool;
				ZNPNode_ZPP_CbType.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = cb;
			let temp = ret;
			if(pre == null) {
				temp.next = _this.head;
				_this.head = temp;
			} else {
				temp.next = pre.next;
				pre.next = temp;
			}
			_this.pushmod = _this.modified = true;
			_this.length++;
			if(this.space != null) {
				this.alloc_cbSet();
				this.wake();
			}
		}
	}
	alloc_cbSet() {
		if((this.cbSet = this.space.cbsets.get(this.cbTypes)) != null) {
			this.cbSet.count++;
			this.cbSet.constraints.add(this);
		}
	}
	dealloc_cbSet() {
		if(this.cbSet != null) {
			this.cbSet.constraints.remove(this);
			if(--this.cbSet.count == 0) {
				this.space.cbsets.remove(this.cbSet);
				let o = this.cbSet;
				o.listeners.clear();
				o.zip_listeners = true;
				o.bodylisteners.clear();
				o.zip_bodylisteners = true;
				o.conlisteners.clear();
				o.zip_conlisteners = true;
				while(o.cbTypes.head != null) {
					let cb = o.cbTypes.pop_unsafe();
					cb.cbsets.remove(o);
				}
				o.next = ZPP_CbSet.zpp_pool;
				ZPP_CbSet.zpp_pool = o;
			}
			this.cbSet = null;
		}
	}
	activate() {
		if(this.space != null) {
			this.activeInSpace();
		}
	}
	deactivate() {
		if(this.space != null) {
			this.inactiveOrOutSpace();
		}
	}
	addedToSpace() {
		if(this.active) {
			this.activeInSpace();
		}
		this.activeBodies();
		let cx_ite = this.cbTypes.head;
		while(cx_ite != null) {
			let cb = cx_ite.elt;
			cb.constraints.add(this);
			cx_ite = cx_ite.next;
		}
	}
	removedFromSpace() {
		if(this.active) {
			this.inactiveOrOutSpace();
		}
		this.inactiveBodies();
		let cx_ite = this.cbTypes.head;
		while(cx_ite != null) {
			let cb = cx_ite.elt;
			cb.constraints.remove(this);
			cx_ite = cx_ite.next;
		}
	}
	activeInSpace() {
		this.alloc_cbSet();
		if(ZPP_Component.zpp_pool == null) {
			this.component = new ZPP_Component();
		} else {
			this.component = ZPP_Component.zpp_pool;
			ZPP_Component.zpp_pool = this.component.next;
			this.component.next = null;
		}
		this.component.isBody = false;
		this.component.constraint = this;
	}
	inactiveOrOutSpace() {
		this.dealloc_cbSet();
		let o = this.component;
		o.body = null;
		o.constraint = null;
		o.next = ZPP_Component.zpp_pool;
		ZPP_Component.zpp_pool = o;
		this.component = null;
	}
	activeBodies() {
	}
	inactiveBodies() {
	}
	clearcache() {
	}
	validate() {
	}
	wake_connected() {
	}
	forest() {
	}
	pair_exists(id,di) {
		return false;
	}
	broken() {
	}
	warmStart() {
	}
	preStep(dt) {
		return false;
	}
	applyImpulseVel() {
		return false;
	}
	applyImpulsePos() {
		return false;
	}
	wake() {
		if(this.space != null) {
			this.space.wake_constraint(this);
		}
	}
	draw(g) {
	}
	copy(dict,todo) {
		return null;
	}
	copyto(ret) {
		let me = this.outer;
		if(me.zpp_inner.wrap_cbTypes == null) {
			me.zpp_inner.setupcbTypes();
		}
		let _this = me.zpp_inner.wrap_cbTypes;
		_this.zpp_inner.valmod();
		let _g = CbTypeIterator.get(_this);
		while(true) {
			_g.zpp_inner.zpp_inner.valmod();
			let _this = _g.zpp_inner;
			_this.zpp_inner.valmod();
			if(_this.zpp_inner.zip_length) {
				_this.zpp_inner.zip_length = false;
				_this.zpp_inner.user_length = _this.zpp_inner.inner.length;
			}
			let length = _this.zpp_inner.user_length;
			_g.zpp_critical = true;
			let tmp;
			if(_g.zpp_i < length) {
				tmp = true;
			} else {
				_g.zpp_next = CbTypeIterator.zpp_pool;
				CbTypeIterator.zpp_pool = _g;
				_g.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g.zpp_critical = false;
			let cb = _g.zpp_inner.at(_g.zpp_i++);
			if(ret.zpp_inner.wrap_cbTypes == null) {
				ret.zpp_inner.setupcbTypes();
			}
			let _this1 = ret.zpp_inner.wrap_cbTypes;
			if(_this1.zpp_inner.reverse_flag) {
				_this1.push(cb);
			} else {
				_this1.unshift(cb);
			}
		}
		ret.zpp_inner.removeOnBreak = me.zpp_inner.removeOnBreak;
		let breakUnderError = me.zpp_inner.breakUnderError;
		if(ret.zpp_inner.breakUnderError != breakUnderError) {
			ret.zpp_inner.breakUnderError = breakUnderError;
			ret.zpp_inner.wake();
		}
		let breakUnderForce = me.zpp_inner.breakUnderForce;
		if(ret.zpp_inner.breakUnderForce != breakUnderForce) {
			ret.zpp_inner.breakUnderForce = breakUnderForce;
			ret.zpp_inner.wake();
		}
		let maxError = me.zpp_inner.maxError;
		if(maxError != maxError) {
			throw haxe_Exception.thrown("Error: Constraint::maxError cannot be NaN");
		}
		if(maxError < 0) {
			throw haxe_Exception.thrown("Error: Constraint::maxError must be >=0");
		}
		if(ret.zpp_inner.maxError != maxError) {
			ret.zpp_inner.maxError = maxError;
			ret.zpp_inner.wake();
		}
		let maxForce = me.zpp_inner.maxForce;
		if(maxForce != maxForce) {
			throw haxe_Exception.thrown("Error: Constraint::maxForce cannot be NaN");
		}
		if(maxForce < 0) {
			throw haxe_Exception.thrown("Error: Constraint::maxForce must be >=0");
		}
		if(ret.zpp_inner.maxForce != maxForce) {
			ret.zpp_inner.maxForce = maxForce;
			ret.zpp_inner.wake();
		}
		let damping = me.zpp_inner.damping;
		if(damping != damping) {
			throw haxe_Exception.thrown("Error: Constraint::Damping cannot be Nan");
		}
		if(damping < 0) {
			throw haxe_Exception.thrown("Error: Constraint::Damping must be >=0");
		}
		if(ret.zpp_inner.damping != damping) {
			ret.zpp_inner.damping = damping;
			if(!ret.zpp_inner.stiff) {
				ret.zpp_inner.wake();
			}
		}
		let frequency = me.zpp_inner.frequency;
		if(frequency != frequency) {
			throw haxe_Exception.thrown("Error: Constraint::Frequency cannot be NaN");
		}
		if(frequency <= 0) {
			throw haxe_Exception.thrown("Error: Constraint::Frequency must be >0");
		}
		if(ret.zpp_inner.frequency != frequency) {
			ret.zpp_inner.frequency = frequency;
			if(!ret.zpp_inner.stiff) {
				ret.zpp_inner.wake();
			}
		}
		let stiff = me.zpp_inner.stiff;
		if(ret.zpp_inner.stiff != stiff) {
			ret.zpp_inner.stiff = stiff;
			ret.zpp_inner.wake();
		}
		let ignore = me.zpp_inner.ignore;
		if(ret.zpp_inner.ignore != ignore) {
			ret.zpp_inner.ignore = ignore;
			ret.zpp_inner.wake();
		}
		let active = me.zpp_inner.active;
		if(ret.zpp_inner.active != active) {
			if(ret.zpp_inner.component != null) {
				ret.zpp_inner.component.woken = false;
			}
			ret.zpp_inner.clearcache();
			if(active) {
				ret.zpp_inner.active = active;
				ret.zpp_inner.activate();
				if(ret.zpp_inner.space != null) {
					if(ret.zpp_inner.component != null) {
						ret.zpp_inner.component.sleeping = true;
					}
					ret.zpp_inner.space.wake_constraint(ret.zpp_inner,true);
				}
			} else {
				if(ret.zpp_inner.space != null) {
					ret.zpp_inner.wake();
					ret.zpp_inner.space.live_constraints.remove(ret.zpp_inner);
				}
				ret.zpp_inner.active = active;
				ret.zpp_inner.deactivate();
			}
		}
	}
}
ZPP_Constraint._hx_skip_constructor = false;
