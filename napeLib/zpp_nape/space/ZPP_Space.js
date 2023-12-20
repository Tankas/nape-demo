import ZPP_PubPool from '../util/ZPP_PubPool.js';
import ZPP_ListenerList from '../util/ZPP_ListenerList.js';
import ZPP_CompoundList from '../util/ZPP_CompoundList.js';
import ZPP_BodyList from '../util/ZPP_BodyList.js';
import ZPP_ConstraintList from '../util/ZPP_ConstraintList.js';
import ZNPNode_ConvexResult from '../util/ZNPNode_ConvexResult.js';
import ZNPNode_ZPP_ColArbiter from '../util/ZNPNode_ZPP_ColArbiter.js';
import ZNPNode_ZPP_SensorArbiter from '../util/ZNPNode_ZPP_SensorArbiter.js';
import ZNPNode_ZPP_FluidArbiter from '../util/ZNPNode_ZPP_FluidArbiter.js';
import ZNPNode_ZPP_Component from '../util/ZNPNode_ZPP_Component.js';
import ZNPNode_ZPP_Arbiter from '../util/ZNPNode_ZPP_Arbiter.js';
import ZNPNode_ZPP_Interactor from '../util/ZNPNode_ZPP_Interactor.js';
import ZNPNode_ZPP_InteractionListener from '../util/ZNPNode_ZPP_InteractionListener.js';
import ZNPNode_ZPP_Constraint from '../util/ZNPNode_ZPP_Constraint.js';
import ZNPNode_ZPP_Body from '../util/ZNPNode_ZPP_Body.js';
import ZNPNode_ZPP_CallbackSet from '../util/ZNPNode_ZPP_CallbackSet.js';
import ZNPList_ZPP_ToiEvent from '../util/ZNPList_ZPP_ToiEvent.js';
import ZNPList_ZPP_Listener from '../util/ZNPList_ZPP_Listener.js';
import ZNPList_ZPP_ColArbiter from '../util/ZNPList_ZPP_ColArbiter.js';
import ZNPList_ZPP_SensorArbiter from '../util/ZNPList_ZPP_SensorArbiter.js';
import ZNPList_ZPP_FluidArbiter from '../util/ZNPList_ZPP_FluidArbiter.js';
import ZNPList_ZPP_Compound from '../util/ZNPList_ZPP_Compound.js';
import ZNPList_ZPP_Body from '../util/ZNPList_ZPP_Body.js';
import ZPP_SweepPhase from './ZPP_SweepPhase.js';
import ZPP_CbSetManager from './ZPP_CbSetManager.js';
import ZPP_CallbackSet from './ZPP_CallbackSet.js';
import ZPP_Island from './ZPP_Island.js';
import ZPP_DynAABBPhase from './ZPP_DynAABBPhase.js';
import ZPP_Body from '../phys/ZPP_Body.js';
import ZPP_Interactor from '../phys/ZPP_Interactor.js';
import ZPP_Vec2 from '../geom/ZPP_Vec2.js';
import ZPP_SweepDistance from '../geom/ZPP_SweepDistance.js';
import ZPP_ToiEvent from '../geom/ZPP_ToiEvent.js';
import ZPP_ConvexRayResult from '../geom/ZPP_ConvexRayResult.js';
import ZPP_Collide from '../geom/ZPP_Collide.js';
import ZPP_AABB from '../geom/ZPP_AABB.js';
import ZPP_Contact from '../dynamics/ZPP_Contact.js';
import ZPP_ColArbiter from '../dynamics/ZPP_ColArbiter.js';
import ZPP_FluidArbiter from '../dynamics/ZPP_FluidArbiter.js';
import ZPP_SensorArbiter from '../dynamics/ZPP_SensorArbiter.js';
import ZPP_Arbiter from '../dynamics/ZPP_Arbiter.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import ZNPList_ZPP_Interactor from '../util/ZNPList_ZPP_Interactor.js';
import ZNPList_ZPP_Constraint from '../util/ZNPList_ZPP_Constraint.js';
import ZNPList_ZPP_InteractionListener from '../util/ZNPList_ZPP_InteractionListener.js';
import ZPP_CbSetPair from '../callbacks/ZPP_CbSetPair.js';
import ZPP_CbSet from '../callbacks/ZPP_CbSet.js';
import ZPP_Callback from '../callbacks/ZPP_Callback.js';
import Broadphase from '../../nape/space/Broadphase.js';
import ValidationResult from '../../nape/shape/ValidationResult.js';
import ShapeIterator from '../../nape/shape/ShapeIterator.js';
import Vec2 from '../../nape/geom/Vec2.js';
import ConvexResultList from '../../nape/geom/ConvexResultList.js';
import PreFlag from '../../nape/callbacks/PreFlag.js';
import PreCallback from '../../nape/callbacks/PreCallback.js';
import Config from '../../nape/Config.js';
export default class ZPP_Space {
	constructor(gravity,broadphase) {
		this.prelisteners = null;
		this.precb = null;
		this.continuous = false;
		this.toiEvents = null;
		this.pre_dt = 0.0;
		this.convexShapeList = null;
		this.cbsets = null;
		this.callbackset_list = null;
		this.callbacks = null;
		this.wrap_listeners = null;
		this.listeners = null;
		this.islands = null;
		this.staticsleep = null;
		this.wrap_livecon = null;
		this.live_constraints = null;
		this.wrap_live = null;
		this.live = null;
		this.wrap_arbiters = null;
		this.s_arbiters = null;
		this.f_arbiters = null;
		this.c_arbiters_false = null;
		this.c_arbiters_true = null;
		this.sortcontacts = false;
		this.time = 0.0;
		this.midstep = false;
		this.stamp = 0;
		this.global_ang_drag = 0.0;
		this.global_lin_drag = 0.0;
		this.__static = null;
		this.bphase = null;
		this.kinematics = null;
		this.wrap_constraints = null;
		this.constraints = null;
		this.wrap_compounds = null;
		this.compounds = null;
		this.wrap_bodies = null;
		this.bodies = null;
		this.wrap_gravity = null;
		this.gravityy = 0.0;
		this.gravityx = 0.0;
		this.userData = null;
		this.outer = null;
		this.toiEvents = new ZNPList_ZPP_ToiEvent();
		this.global_lin_drag = 0.015;
		this.global_ang_drag = 0.015;
		ZPP_Callback.internal = true;
		this.precb = new PreCallback();
		this.precb.zpp_inner = new ZPP_Callback();
		ZPP_Callback.internal = false;
		this.sortcontacts = true;
		this.pre_dt = 0.0;
		let tmp;
		if(broadphase != null) {
			if(ZPP_Flags.Broadphase_DYNAMIC_AABB_TREE == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.Broadphase_DYNAMIC_AABB_TREE = new Broadphase();
				ZPP_Flags.internal = false;
			}
			tmp = broadphase == ZPP_Flags.Broadphase_DYNAMIC_AABB_TREE;
		} else {
			tmp = true;
		}
		if(tmp) {
			this.bphase = new ZPP_DynAABBPhase(this);
		} else {
			if(ZPP_Flags.Broadphase_SWEEP_AND_PRUNE == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.Broadphase_SWEEP_AND_PRUNE = new Broadphase();
				ZPP_Flags.internal = false;
			}
			if(broadphase == ZPP_Flags.Broadphase_SWEEP_AND_PRUNE) {
				this.bphase = new ZPP_SweepPhase(this);
			}
		}
		this.time = 0.0;
		let me = this;
		if(gravity != null) {
			this.gravityx = gravity.x;
			this.gravityy = gravity.y;
		} else {
			this.gravityx = 0;
			this.gravityy = 0;
		}
		this.bodies = new ZNPList_ZPP_Body();
		this.wrap_bodies = ZPP_BodyList.get(this.bodies);
		this.wrap_bodies.zpp_inner.adder = $bind(this,this.bodies_adder);
		this.wrap_bodies.zpp_inner.subber = $bind(this,this.bodies_subber);
		this.wrap_bodies.zpp_inner._modifiable = $bind(this,this.bodies_modifiable);
		this.compounds = new ZNPList_ZPP_Compound();
		this.wrap_compounds = ZPP_CompoundList.get(this.compounds);
		this.wrap_compounds.zpp_inner.adder = $bind(this,this.compounds_adder);
		this.wrap_compounds.zpp_inner.subber = $bind(this,this.compounds_subber);
		this.wrap_compounds.zpp_inner._modifiable = $bind(this,this.compounds_modifiable);
		this.kinematics = new ZNPList_ZPP_Body();
		this.c_arbiters_true = new ZNPList_ZPP_ColArbiter();
		this.c_arbiters_false = new ZNPList_ZPP_ColArbiter();
		this.f_arbiters = new ZNPList_ZPP_FluidArbiter();
		this.s_arbiters = new ZNPList_ZPP_SensorArbiter();
		this.islands = new ZPP_Island();
		this.live = new ZNPList_ZPP_Body();
		this.wrap_live = ZPP_BodyList.get(this.live,true);
		this.staticsleep = new ZNPList_ZPP_Body();
		this.constraints = new ZNPList_ZPP_Constraint();
		this.wrap_constraints = ZPP_ConstraintList.get(this.constraints);
		this.wrap_constraints.zpp_inner.adder = $bind(this,this.constraints_adder);
		this.wrap_constraints.zpp_inner.subber = $bind(this,this.constraints_subber);
		this.wrap_constraints.zpp_inner._modifiable = $bind(this,this.constraints_modifiable);
		this.live_constraints = new ZNPList_ZPP_Constraint();
		this.wrap_livecon = ZPP_ConstraintList.get(this.live_constraints,true);
		this.__static = ZPP_Body.__static();
		this.__static.zpp_inner.space = this;
		this.callbacks = new ZPP_Callback();
		this.midstep = false;
		this.listeners = new ZNPList_ZPP_Listener();
		this.wrap_listeners = ZPP_ListenerList.get(this.listeners);
		this.wrap_listeners.zpp_inner.adder = $bind(this,this.listeners_adder);
		this.wrap_listeners.zpp_inner.subber = $bind(this,this.listeners_subber);
		this.wrap_listeners.zpp_inner._modifiable = $bind(this,this.listeners_modifiable);
		this.callbackset_list = new ZPP_CallbackSet();
		this.mrca1 = new ZNPList_ZPP_Interactor();
		this.mrca2 = new ZNPList_ZPP_Interactor();
		this.prelisteners = new ZNPList_ZPP_InteractionListener();
		this.cbsets = new ZPP_CbSetManager(this);
	}
	getgravity() {
		let x = this.gravityx;
		let y = this.gravityy;
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
		this.wrap_gravity = ret;
		this.wrap_gravity.zpp_inner._inuse = true;
		this.wrap_gravity.zpp_inner._invalidate = $bind(this,this.gravity_invalidate);
		this.wrap_gravity.zpp_inner._validate = $bind(this,this.gravity_validate);
	}
	gravity_invalidate(x) {
		if(this.midstep) {
			throw haxe_Exception.thrown("Error: Space::gravity cannot be set during space step");
		}
		this.gravityx = x.x;
		this.gravityy = x.y;
		let stack = new ZNPList_ZPP_Compound();
		let cx_ite = this.bodies.head;
		while(cx_ite != null) {
			let x = cx_ite.elt;
			let o = x;
			if(!o.world) {
				o.component.waket = this.stamp + (this.midstep ? 0 : 1);
				if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
					o.kinematicDelaySleep = true;
				}
				if(o.component.sleeping) {
					this.really_wake(o,false);
				}
			}
			cx_ite = cx_ite.next;
		}
		let cx_ite1 = this.compounds.head;
		while(cx_ite1 != null) {
			let i = cx_ite1.elt;
			stack.add(i);
			cx_ite1 = cx_ite1.next;
		}
		while(stack.head != null) {
			let s = stack.pop_unsafe();
			let cx_ite = s.bodies.head;
			while(cx_ite != null) {
				let x = cx_ite.elt;
				let o = x;
				if(!o.world) {
					o.component.waket = this.stamp + (this.midstep ? 0 : 1);
					if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
						o.kinematicDelaySleep = true;
					}
					if(o.component.sleeping) {
						this.really_wake(o,false);
					}
				}
				cx_ite = cx_ite.next;
			}
			let cx_ite1 = s.compounds.head;
			while(cx_ite1 != null) {
				let i = cx_ite1.elt;
				stack.add(i);
				cx_ite1 = cx_ite1.next;
			}
		}
	}
	gravity_validate() {
		this.wrap_gravity.zpp_inner.x = this.gravityx;
		this.wrap_gravity.zpp_inner.y = this.gravityy;
	}
	clear() {
		while(this.listeners.head != null) {
			let c = this.listeners.pop_unsafe();
			this.remListener(c);
		}
		while(this.callbackset_list.next != null) {
			let c = this.callbackset_list.pop_unsafe();
			c.arbiters.clear();
			let o = c;
			o.int1 = o.int2 = null;
			o.id = o.di = -1;
			o.freed = true;
			o.next = ZPP_CallbackSet.zpp_pool;
			ZPP_CallbackSet.zpp_pool = o;
		}
		while(this.c_arbiters_true.head != null) {
			let arb = this.c_arbiters_true.pop_unsafe();
			if(!arb.cleared) {
				let _this = arb.b1.arbiters;
				let pre = null;
				let cur = _this.head;
				let ret = false;
				while(cur != null) {
					if(cur.elt == arb) {
						let old;
						let ret1;
						if(pre == null) {
							old = _this.head;
							ret1 = old.next;
							_this.head = ret1;
							if(_this.head == null) {
								_this.pushmod = true;
							}
						} else {
							old = pre.next;
							ret1 = old.next;
							pre.next = ret1;
							if(ret1 == null) {
								_this.pushmod = true;
							}
						}
						let o = old;
						o.elt = null;
						o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
						ZNPNode_ZPP_Arbiter.zpp_pool = o;
						_this.modified = true;
						_this.length--;
						_this.pushmod = true;
						ret = true;
						break;
					}
					pre = cur;
					cur = cur.next;
				}
				let _this1 = arb.b2.arbiters;
				let pre1 = null;
				let cur1 = _this1.head;
				let ret1 = false;
				while(cur1 != null) {
					if(cur1.elt == arb) {
						let old;
						let ret;
						if(pre1 == null) {
							old = _this1.head;
							ret = old.next;
							_this1.head = ret;
							if(_this1.head == null) {
								_this1.pushmod = true;
							}
						} else {
							old = pre1.next;
							ret = old.next;
							pre1.next = ret;
							if(ret == null) {
								_this1.pushmod = true;
							}
						}
						let o = old;
						o.elt = null;
						o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
						ZNPNode_ZPP_Arbiter.zpp_pool = o;
						_this1.modified = true;
						_this1.length--;
						_this1.pushmod = true;
						ret1 = true;
						break;
					}
					pre1 = cur1;
					cur1 = cur1.next;
				}
				if(arb.pair != null) {
					arb.pair.arb = null;
					arb.pair = null;
				}
			}
			arb.b1 = arb.b2 = null;
			arb.active = false;
			arb.intchange = false;
			while(arb.contacts.next != null) {
				let _this = arb.contacts;
				let ret = _this.next;
				_this.pop();
				let o = ret;
				o.arbiter = null;
				o.next = ZPP_Contact.zpp_pool;
				ZPP_Contact.zpp_pool = o;
				let _this1 = arb.innards;
				let ret1 = _this1.next;
				_this1.next = ret1.next;
				ret1._inuse = false;
				if(_this1.next == null) {
					_this1.pushmod = true;
				}
				_this1.modified = true;
				_this1.length--;
			}
			let o = arb;
			o.userdef_dyn_fric = false;
			o.userdef_stat_fric = false;
			o.userdef_restitution = false;
			o.userdef_rfric = false;
			o.__ref_edge1 = o.__ref_edge2 = null;
			o.next = ZPP_ColArbiter.zpp_pool;
			ZPP_ColArbiter.zpp_pool = o;
			arb.pre_dt = -1.0;
		}
		while(this.c_arbiters_false.head != null) {
			let arb = this.c_arbiters_false.pop_unsafe();
			if(!arb.cleared) {
				let _this = arb.b1.arbiters;
				let pre = null;
				let cur = _this.head;
				let ret = false;
				while(cur != null) {
					if(cur.elt == arb) {
						let old;
						let ret1;
						if(pre == null) {
							old = _this.head;
							ret1 = old.next;
							_this.head = ret1;
							if(_this.head == null) {
								_this.pushmod = true;
							}
						} else {
							old = pre.next;
							ret1 = old.next;
							pre.next = ret1;
							if(ret1 == null) {
								_this.pushmod = true;
							}
						}
						let o = old;
						o.elt = null;
						o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
						ZNPNode_ZPP_Arbiter.zpp_pool = o;
						_this.modified = true;
						_this.length--;
						_this.pushmod = true;
						ret = true;
						break;
					}
					pre = cur;
					cur = cur.next;
				}
				let _this1 = arb.b2.arbiters;
				let pre1 = null;
				let cur1 = _this1.head;
				let ret1 = false;
				while(cur1 != null) {
					if(cur1.elt == arb) {
						let old;
						let ret;
						if(pre1 == null) {
							old = _this1.head;
							ret = old.next;
							_this1.head = ret;
							if(_this1.head == null) {
								_this1.pushmod = true;
							}
						} else {
							old = pre1.next;
							ret = old.next;
							pre1.next = ret;
							if(ret == null) {
								_this1.pushmod = true;
							}
						}
						let o = old;
						o.elt = null;
						o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
						ZNPNode_ZPP_Arbiter.zpp_pool = o;
						_this1.modified = true;
						_this1.length--;
						_this1.pushmod = true;
						ret1 = true;
						break;
					}
					pre1 = cur1;
					cur1 = cur1.next;
				}
				if(arb.pair != null) {
					arb.pair.arb = null;
					arb.pair = null;
				}
			}
			arb.b1 = arb.b2 = null;
			arb.active = false;
			arb.intchange = false;
			while(arb.contacts.next != null) {
				let _this = arb.contacts;
				let ret = _this.next;
				_this.pop();
				let o = ret;
				o.arbiter = null;
				o.next = ZPP_Contact.zpp_pool;
				ZPP_Contact.zpp_pool = o;
				let _this1 = arb.innards;
				let ret1 = _this1.next;
				_this1.next = ret1.next;
				ret1._inuse = false;
				if(_this1.next == null) {
					_this1.pushmod = true;
				}
				_this1.modified = true;
				_this1.length--;
			}
			let o = arb;
			o.userdef_dyn_fric = false;
			o.userdef_stat_fric = false;
			o.userdef_restitution = false;
			o.userdef_rfric = false;
			o.__ref_edge1 = o.__ref_edge2 = null;
			o.next = ZPP_ColArbiter.zpp_pool;
			ZPP_ColArbiter.zpp_pool = o;
			arb.pre_dt = -1.0;
		}
		while(this.s_arbiters.head != null) {
			let arb = this.s_arbiters.pop_unsafe();
			if(!arb.cleared) {
				let _this = arb.b1.arbiters;
				let pre = null;
				let cur = _this.head;
				let ret = false;
				while(cur != null) {
					if(cur.elt == arb) {
						let old;
						let ret1;
						if(pre == null) {
							old = _this.head;
							ret1 = old.next;
							_this.head = ret1;
							if(_this.head == null) {
								_this.pushmod = true;
							}
						} else {
							old = pre.next;
							ret1 = old.next;
							pre.next = ret1;
							if(ret1 == null) {
								_this.pushmod = true;
							}
						}
						let o = old;
						o.elt = null;
						o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
						ZNPNode_ZPP_Arbiter.zpp_pool = o;
						_this.modified = true;
						_this.length--;
						_this.pushmod = true;
						ret = true;
						break;
					}
					pre = cur;
					cur = cur.next;
				}
				let _this1 = arb.b2.arbiters;
				let pre1 = null;
				let cur1 = _this1.head;
				let ret1 = false;
				while(cur1 != null) {
					if(cur1.elt == arb) {
						let old;
						let ret;
						if(pre1 == null) {
							old = _this1.head;
							ret = old.next;
							_this1.head = ret;
							if(_this1.head == null) {
								_this1.pushmod = true;
							}
						} else {
							old = pre1.next;
							ret = old.next;
							pre1.next = ret;
							if(ret == null) {
								_this1.pushmod = true;
							}
						}
						let o = old;
						o.elt = null;
						o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
						ZNPNode_ZPP_Arbiter.zpp_pool = o;
						_this1.modified = true;
						_this1.length--;
						_this1.pushmod = true;
						ret1 = true;
						break;
					}
					pre1 = cur1;
					cur1 = cur1.next;
				}
				if(arb.pair != null) {
					arb.pair.arb = null;
					arb.pair = null;
				}
			}
			arb.b1 = arb.b2 = null;
			arb.active = false;
			arb.intchange = false;
			let o = arb;
			o.next = ZPP_SensorArbiter.zpp_pool;
			ZPP_SensorArbiter.zpp_pool = o;
		}
		while(this.f_arbiters.head != null) {
			let arb = this.f_arbiters.pop_unsafe();
			if(!arb.cleared) {
				let _this = arb.b1.arbiters;
				let pre = null;
				let cur = _this.head;
				let ret = false;
				while(cur != null) {
					if(cur.elt == arb) {
						let old;
						let ret1;
						if(pre == null) {
							old = _this.head;
							ret1 = old.next;
							_this.head = ret1;
							if(_this.head == null) {
								_this.pushmod = true;
							}
						} else {
							old = pre.next;
							ret1 = old.next;
							pre.next = ret1;
							if(ret1 == null) {
								_this.pushmod = true;
							}
						}
						let o = old;
						o.elt = null;
						o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
						ZNPNode_ZPP_Arbiter.zpp_pool = o;
						_this.modified = true;
						_this.length--;
						_this.pushmod = true;
						ret = true;
						break;
					}
					pre = cur;
					cur = cur.next;
				}
				let _this1 = arb.b2.arbiters;
				let pre1 = null;
				let cur1 = _this1.head;
				let ret1 = false;
				while(cur1 != null) {
					if(cur1.elt == arb) {
						let old;
						let ret;
						if(pre1 == null) {
							old = _this1.head;
							ret = old.next;
							_this1.head = ret;
							if(_this1.head == null) {
								_this1.pushmod = true;
							}
						} else {
							old = pre1.next;
							ret = old.next;
							pre1.next = ret;
							if(ret == null) {
								_this1.pushmod = true;
							}
						}
						let o = old;
						o.elt = null;
						o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
						ZNPNode_ZPP_Arbiter.zpp_pool = o;
						_this1.modified = true;
						_this1.length--;
						_this1.pushmod = true;
						ret1 = true;
						break;
					}
					pre1 = cur1;
					cur1 = cur1.next;
				}
				if(arb.pair != null) {
					arb.pair.arb = null;
					arb.pair = null;
				}
			}
			arb.b1 = arb.b2 = null;
			arb.active = false;
			arb.intchange = false;
			let o = arb;
			o.next = ZPP_FluidArbiter.zpp_pool;
			ZPP_FluidArbiter.zpp_pool = o;
			arb.pre_dt = -1.0;
		}
		this.bphase.clear();
		while(this.bodies.head != null) {
			let b = this.bodies.pop_unsafe();
			if(b.component != null) {
				let i = b.component.island;
				if(i != null) {
					while(i.comps.head != null) {
						let c = i.comps.pop_unsafe();
						c.sleeping = false;
						c.island = null;
						c.parent = c;
						c.rank = 0;
					}
					let o = i;
					o.next = ZPP_Island.zpp_pool;
					ZPP_Island.zpp_pool = o;
				}
			}
			b.removedFromSpace();
			b.space = null;
		}
		while(this.constraints.head != null) {
			let c = this.constraints.pop_unsafe();
			if(c.component != null) {
				let i = c.component.island;
				if(i != null) {
					while(i.comps.head != null) {
						let c = i.comps.pop_unsafe();
						c.sleeping = false;
						c.island = null;
						c.parent = c;
						c.rank = 0;
					}
					let o = i;
					o.next = ZPP_Island.zpp_pool;
					ZPP_Island.zpp_pool = o;
				}
			}
			c.removedFromSpace();
			c.space = null;
		}
		this.kinematics.clear();
		let stack = new ZNPList_ZPP_Compound();
		while(this.compounds.head != null) {
			let c = this.compounds.pop_unsafe();
			stack.add(c);
		}
		while(stack.head != null) {
			let comp = stack.pop_unsafe();
			comp.removedFromSpace();
			comp.space = null;
			let cx_ite = comp.bodies.head;
			while(cx_ite != null) {
				let b = cx_ite.elt;
				if(b.component != null) {
					let i = b.component.island;
					if(i != null) {
						while(i.comps.head != null) {
							let c = i.comps.pop_unsafe();
							c.sleeping = false;
							c.island = null;
							c.parent = c;
							c.rank = 0;
						}
						let o = i;
						o.next = ZPP_Island.zpp_pool;
						ZPP_Island.zpp_pool = o;
					}
				}
				b.removedFromSpace();
				b.space = null;
				cx_ite = cx_ite.next;
			}
			let cx_ite1 = comp.constraints.head;
			while(cx_ite1 != null) {
				let c = cx_ite1.elt;
				if(c.component != null) {
					let i = c.component.island;
					if(i != null) {
						while(i.comps.head != null) {
							let c = i.comps.pop_unsafe();
							c.sleeping = false;
							c.island = null;
							c.parent = c;
							c.rank = 0;
						}
						let o = i;
						o.next = ZPP_Island.zpp_pool;
						ZPP_Island.zpp_pool = o;
					}
				}
				c.removedFromSpace();
				c.space = null;
				cx_ite1 = cx_ite1.next;
			}
			let cx_ite2 = comp.compounds.head;
			while(cx_ite2 != null) {
				let i = cx_ite2.elt;
				stack.add(i);
				cx_ite2 = cx_ite2.next;
			}
		}
		this.staticsleep.clear();
		this.live.clear();
		this.live_constraints.clear();
		this.stamp = 0;
		this.time = 0.0;
		this.mrca1.clear();
		this.mrca2.clear();
		this.prelisteners.clear();
		this.cbsets.clear();
	}
	bodies_adder(x) {
		if(x.zpp_inner.compound != null) {
			throw haxe_Exception.thrown("Error: Cannot set the space of a Body belonging to a Compound, only the root Compound space can be set");
		}
		if(x.zpp_inner.space != this) {
			if(x.zpp_inner.space != null) {
				x.zpp_inner.space.outer.zpp_inner.wrap_bodies.remove(x);
			}
			this.addBody(x.zpp_inner);
			return true;
		} else {
			return false;
		}
	}
	bodies_subber(x) {
		this.remBody(x.zpp_inner);
	}
	bodies_modifiable() {
		if(this.midstep) {
			throw haxe_Exception.thrown("Error: Space::bodies cannot be set during space step()");
		}
	}
	compounds_adder(x) {
		if(x.zpp_inner.compound != null) {
			throw haxe_Exception.thrown("Error: Cannot set the space of an inner Compound, only the root Compound space can be set");
		}
		if(x.zpp_inner.space != this) {
			if(x.zpp_inner.space != null) {
				x.zpp_inner.space.wrap_compounds.remove(x);
			}
			this.addCompound(x.zpp_inner);
			return true;
		} else {
			return false;
		}
	}
	compounds_subber(x) {
		this.remCompound(x.zpp_inner);
	}
	compounds_modifiable() {
		if(this.midstep) {
			throw haxe_Exception.thrown("Error: Space::compounds cannot be set during space step()");
		}
	}
	constraints_adder(x) {
		if(x.zpp_inner.compound != null) {
			throw haxe_Exception.thrown("Error: Cannot set the space of a Constraint belonging to a Compound, only the root Compound space can be set");
		}
		if(x.zpp_inner.space != this) {
			if(x.zpp_inner.space != null) {
				x.zpp_inner.space.outer.zpp_inner.wrap_constraints.remove(x);
			}
			this.addConstraint(x.zpp_inner);
			return true;
		} else {
			return false;
		}
	}
	constraints_subber(x) {
		this.remConstraint(x.zpp_inner);
	}
	constraints_modifiable() {
		if(this.midstep) {
			throw haxe_Exception.thrown("Error: Space::constraints cannot be set during space step()");
		}
	}
	listeners_adder(x) {
		if(x.zpp_inner.space != this) {
			if(x.zpp_inner.space != null) {
				x.zpp_inner.space.outer.zpp_inner.wrap_listeners.remove(x);
			}
			this.addListener(x.zpp_inner);
			return true;
		} else {
			return false;
		}
	}
	listeners_subber(x) {
		this.remListener(x.zpp_inner);
	}
	listeners_modifiable() {
		if(this.midstep) {
			throw haxe_Exception.thrown("Error: Space::listeners cannot be set during space step()");
		}
	}
	revoke_listener(x) {
	}
	unrevoke_listener(x) {
	}
	addListener(x) {
		x.space = this;
		x.addedToSpace();
		let tmp = x.interaction != null;
	}
	remListener(x) {
		let tmp = x.interaction != null;
		x.removedFromSpace();
		x.space = null;
	}
	add_callbackset(cb) {
		let _this = cb.int1.cbsets;
		let ret;
		if(ZNPNode_ZPP_CallbackSet.zpp_pool == null) {
			ret = new ZNPNode_ZPP_CallbackSet();
		} else {
			ret = ZNPNode_ZPP_CallbackSet.zpp_pool;
			ZNPNode_ZPP_CallbackSet.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.elt = cb;
		let temp = ret;
		temp.next = _this.head;
		_this.head = temp;
		_this.modified = true;
		_this.length++;
		let _this1 = cb.int2.cbsets;
		let ret1;
		if(ZNPNode_ZPP_CallbackSet.zpp_pool == null) {
			ret1 = new ZNPNode_ZPP_CallbackSet();
		} else {
			ret1 = ZNPNode_ZPP_CallbackSet.zpp_pool;
			ZNPNode_ZPP_CallbackSet.zpp_pool = ret1.next;
			ret1.next = null;
		}
		ret1.elt = cb;
		let temp1 = ret1;
		temp1.next = _this1.head;
		_this1.head = temp1;
		_this1.modified = true;
		_this1.length++;
		let _this2 = this.callbackset_list;
		cb._inuse = true;
		let temp2 = cb;
		temp2.next = _this2.next;
		_this2.next = temp2;
		_this2.modified = true;
		_this2.length++;
	}
	remove_callbackset(cb) {
		cb.lazydel = true;
		let _this = cb.int1.cbsets;
		let pre = null;
		let cur = _this.head;
		let ret = false;
		while(cur != null) {
			if(cur.elt == cb) {
				let old;
				let ret1;
				if(pre == null) {
					old = _this.head;
					ret1 = old.next;
					_this.head = ret1;
					if(_this.head == null) {
						_this.pushmod = true;
					}
				} else {
					old = pre.next;
					ret1 = old.next;
					pre.next = ret1;
					if(ret1 == null) {
						_this.pushmod = true;
					}
				}
				let o = old;
				o.elt = null;
				o.next = ZNPNode_ZPP_CallbackSet.zpp_pool;
				ZNPNode_ZPP_CallbackSet.zpp_pool = o;
				_this.modified = true;
				_this.length--;
				_this.pushmod = true;
				ret = true;
				break;
			}
			pre = cur;
			cur = cur.next;
		}
		let _this1 = cb.int2.cbsets;
		let pre1 = null;
		let cur1 = _this1.head;
		let ret1 = false;
		while(cur1 != null) {
			if(cur1.elt == cb) {
				let old;
				let ret;
				if(pre1 == null) {
					old = _this1.head;
					ret = old.next;
					_this1.head = ret;
					if(_this1.head == null) {
						_this1.pushmod = true;
					}
				} else {
					old = pre1.next;
					ret = old.next;
					pre1.next = ret;
					if(ret == null) {
						_this1.pushmod = true;
					}
				}
				let o = old;
				o.elt = null;
				o.next = ZNPNode_ZPP_CallbackSet.zpp_pool;
				ZNPNode_ZPP_CallbackSet.zpp_pool = o;
				_this1.modified = true;
				_this1.length--;
				_this1.pushmod = true;
				ret1 = true;
				break;
			}
			pre1 = cur1;
			cur1 = cur1.next;
		}
	}
	transmitType(p,new_type) {
		let o = p;
		if(!o.world) {
			o.component.waket = this.stamp + (this.midstep ? 0 : 1);
			if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
				o.kinematicDelaySleep = true;
			}
			if(o.component.sleeping) {
				this.really_wake(o,false);
			}
		}
		if(p.type == ZPP_Flags.id_BodyType_DYNAMIC) {
			this.live.remove(p);
		} else if(p.type == ZPP_Flags.id_BodyType_KINEMATIC) {
			this.kinematics.remove(p);
			this.staticsleep.remove(p);
		} else if(p.type == ZPP_Flags.id_BodyType_STATIC) {
			this.staticsleep.remove(p);
		}
		p.type = new_type;
		if(p.type == ZPP_Flags.id_BodyType_KINEMATIC) {
			this.kinematics.add(p);
		}
		if(p.type == ZPP_Flags.id_BodyType_STATIC) {
			this.static_validation(p);
		}
		p.component.sleeping = true;
		let o1 = p;
		if(!o1.world) {
			o1.component.waket = this.stamp + (this.midstep ? 0 : 1);
			if(o1.type == ZPP_Flags.id_BodyType_KINEMATIC) {
				o1.kinematicDelaySleep = true;
			}
			if(o1.component.sleeping) {
				this.really_wake(o1,true);
			}
		}
	}
	added_shape(s,dontwake) {
		if(dontwake == null) {
			dontwake = false;
		}
		if(!dontwake) {
			let o = s.body;
			if(!o.world) {
				o.component.waket = this.stamp + (this.midstep ? 0 : 1);
				if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
					o.kinematicDelaySleep = true;
				}
				if(o.component.sleeping) {
					this.really_wake(o,false);
				}
			}
		}
		this.bphase.insert(s);
		s.addedToSpace();
	}
	removed_shape(s,deleting) {
		if(deleting == null) {
			deleting = false;
		}
		let body = s.body;
		if(!deleting) {
			body.wake();
		}
		let pre = null;
		let _gthis = this;
		let cx_ite = body.arbiters.head;
		while(cx_ite != null) {
			let xarb = cx_ite.elt;
			let rem = xarb.ws1 == s || xarb.ws2 == s;
			if(rem) {
				if(xarb.present != 0) {
					this.MRCA_chains(xarb.ws1,xarb.ws2);
					let cx_ite = this.mrca1.head;
					while(cx_ite != null) {
						let i1 = cx_ite.elt;
						let cx_ite1 = this.mrca2.head;
						while(cx_ite1 != null) {
							let i2 = cx_ite1.elt;
							let cb1 = i1.cbSet;
							let cb2 = i2.cbSet;
							cb1.validate();
							cb2.validate();
							let _this = cb1.manager;
							let ret = null;
							let pairs = cb1.cbpairs.length < cb2.cbpairs.length ? cb1.cbpairs : cb2.cbpairs;
							let cx_ite = pairs.head;
							while(cx_ite != null) {
								let p = cx_ite.elt;
								if(p.a == cb1 && p.b == cb2 || p.a == cb2 && p.b == cb1) {
									ret = p;
									break;
								}
								cx_ite = cx_ite.next;
							}
							if(ret == null) {
								let ret1;
								if(ZPP_CbSetPair.zpp_pool == null) {
									ret1 = new ZPP_CbSetPair();
								} else {
									ret1 = ZPP_CbSetPair.zpp_pool;
									ZPP_CbSetPair.zpp_pool = ret1.next;
									ret1.next = null;
								}
								ret1.zip_listeners = true;
								if(ZPP_CbSet.setlt(cb1,cb2)) {
									ret1.a = cb1;
									ret1.b = cb2;
								} else {
									ret1.a = cb2;
									ret1.b = cb1;
								}
								ret = ret1;
								cb1.cbpairs.add(ret);
								if(cb2 != cb1) {
									cb2.cbpairs.add(ret);
								}
							}
							if(ret.zip_listeners) {
								ret.zip_listeners = false;
								ret.__validate();
							}
							if(ret.listeners.head == null) {
								cx_ite1 = cx_ite1.next;
								continue;
							}
							let callbackset = ZPP_Interactor.get(i1,i2);
							callbackset.remove_arb(xarb);
							xarb.present--;
							let event = ZPP_Flags.id_CbEvent_END;
							let _this1 = cb1.manager;
							let ret1 = null;
							let pairs1 = cb1.cbpairs.length < cb2.cbpairs.length ? cb1.cbpairs : cb2.cbpairs;
							let cx_ite2 = pairs1.head;
							while(cx_ite2 != null) {
								let p = cx_ite2.elt;
								if(p.a == cb1 && p.b == cb2 || p.a == cb2 && p.b == cb1) {
									ret1 = p;
									break;
								}
								cx_ite2 = cx_ite2.next;
							}
							if(ret1 == null) {
								let ret;
								if(ZPP_CbSetPair.zpp_pool == null) {
									ret = new ZPP_CbSetPair();
								} else {
									ret = ZPP_CbSetPair.zpp_pool;
									ZPP_CbSetPair.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.zip_listeners = true;
								if(ZPP_CbSet.setlt(cb1,cb2)) {
									ret.a = cb1;
									ret.b = cb2;
								} else {
									ret.a = cb2;
									ret.b = cb1;
								}
								ret1 = ret;
								cb1.cbpairs.add(ret1);
								if(cb2 != cb1) {
									cb2.cbpairs.add(ret1);
								}
							}
							if(ret1.zip_listeners) {
								ret1.zip_listeners = false;
								ret1.__validate();
							}
							let cx_ite3 = ret1.listeners.head;
							while(cx_ite3 != null) {
								let x = cx_ite3.elt;
								if(x.event == event) {
									if((x.itype & xarb.type) != 0 && callbackset.empty_arb(x.itype)) {
										let cb = _gthis.push_callback(x);
										cb.event = ZPP_Flags.id_CbEvent_END;
										let o1 = callbackset.int1;
										let o2 = callbackset.int2;
										let tmp;
										let _this = x.options1;
										let xs = o1.cbTypes;
										if(_this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes)) {
											let _this = x.options2;
											let xs = o2.cbTypes;
											tmp = _this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes);
										} else {
											tmp = false;
										}
										if(tmp) {
											cb.int1 = o1;
											cb.int2 = o2;
										} else {
											cb.int1 = o2;
											cb.int2 = o1;
										}
										cb.set = callbackset;
									}
								}
								cx_ite3 = cx_ite3.next;
							}
							if(callbackset.arbiters.head == null) {
								this.remove_callbackset(callbackset);
							}
							cx_ite1 = cx_ite1.next;
						}
						cx_ite = cx_ite.next;
					}
				}
				if(xarb.b1 != body && xarb.b1.type == ZPP_Flags.id_BodyType_DYNAMIC) {
					let o = xarb.b1;
					if(!o.world) {
						o.component.waket = this.stamp + (this.midstep ? 0 : 1);
						if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
							o.kinematicDelaySleep = true;
						}
						if(o.component.sleeping) {
							this.really_wake(o,false);
						}
					}
				}
				if(xarb.b2 != body && xarb.b2.type == ZPP_Flags.id_BodyType_DYNAMIC) {
					let o = xarb.b2;
					if(!o.world) {
						o.component.waket = this.stamp + (this.midstep ? 0 : 1);
						if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
							o.kinematicDelaySleep = true;
						}
						if(o.component.sleeping) {
							this.really_wake(o,false);
						}
					}
				}
				xarb.cleared = true;
				if(body == null || xarb.b2 == body) {
					let _this = xarb.b1.arbiters;
					let pre = null;
					let cur = _this.head;
					let ret = false;
					while(cur != null) {
						if(cur.elt == xarb) {
							let old;
							let ret1;
							if(pre == null) {
								old = _this.head;
								ret1 = old.next;
								_this.head = ret1;
								if(_this.head == null) {
									_this.pushmod = true;
								}
							} else {
								old = pre.next;
								ret1 = old.next;
								pre.next = ret1;
								if(ret1 == null) {
									_this.pushmod = true;
								}
							}
							let o = old;
							o.elt = null;
							o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
							ZNPNode_ZPP_Arbiter.zpp_pool = o;
							_this.modified = true;
							_this.length--;
							_this.pushmod = true;
							ret = true;
							break;
						}
						pre = cur;
						cur = cur.next;
					}
				}
				if(body == null || xarb.b1 == body) {
					let _this = xarb.b2.arbiters;
					let pre = null;
					let cur = _this.head;
					let ret = false;
					while(cur != null) {
						if(cur.elt == xarb) {
							let old;
							let ret1;
							if(pre == null) {
								old = _this.head;
								ret1 = old.next;
								_this.head = ret1;
								if(_this.head == null) {
									_this.pushmod = true;
								}
							} else {
								old = pre.next;
								ret1 = old.next;
								pre.next = ret1;
								if(ret1 == null) {
									_this.pushmod = true;
								}
							}
							let o = old;
							o.elt = null;
							o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
							ZNPNode_ZPP_Arbiter.zpp_pool = o;
							_this.modified = true;
							_this.length--;
							_this.pushmod = true;
							ret = true;
							break;
						}
						pre = cur;
						cur = cur.next;
					}
				}
				if(xarb.pair != null) {
					xarb.pair.arb = null;
					xarb.pair = null;
				}
				xarb.active = false;
				this.f_arbiters.modified = true;
				cx_ite = body.arbiters.erase(pre);
				continue;
			}
			pre = cx_ite;
			cx_ite = cx_ite.next;
		}
		this.bphase.remove(s);
		s.removedFromSpace();
	}
	addConstraint(con) {
		con.space = this;
		con.addedToSpace();
		if(con.active) {
			con.component.sleeping = true;
			this.wake_constraint(con,true);
		}
	}
	remConstraint(con) {
		if(con.active) {
			this.wake_constraint(con,true);
			this.live_constraints.remove(con);
		}
		con.removedFromSpace();
		con.space = null;
	}
	addCompound(x) {
		x.space = this;
		x.addedToSpace();
		let cx_ite = x.bodies.head;
		while(cx_ite != null) {
			let i = cx_ite.elt;
			this.addBody(i);
			cx_ite = cx_ite.next;
		}
		let cx_ite1 = x.constraints.head;
		while(cx_ite1 != null) {
			let i = cx_ite1.elt;
			this.addConstraint(i);
			cx_ite1 = cx_ite1.next;
		}
		let cx_ite2 = x.compounds.head;
		while(cx_ite2 != null) {
			let i = cx_ite2.elt;
			this.addCompound(i);
			cx_ite2 = cx_ite2.next;
		}
	}
	remCompound(x) {
		let cx_ite = x.bodies.head;
		while(cx_ite != null) {
			let i = cx_ite.elt;
			this.remBody(i);
			cx_ite = cx_ite.next;
		}
		let cx_ite1 = x.constraints.head;
		while(cx_ite1 != null) {
			let i = cx_ite1.elt;
			this.remConstraint(i);
			cx_ite1 = cx_ite1.next;
		}
		let cx_ite2 = x.compounds.head;
		while(cx_ite2 != null) {
			let i = cx_ite2.elt;
			this.remCompound(i);
			cx_ite2 = cx_ite2.next;
		}
		x.removedFromSpace();
		x.space = null;
	}
	addBody(body,flag) {
		if(flag == null) {
			flag = -1;
		}
		body.space = this;
		body.addedToSpace();
		body.component.sleeping = true;
		let o = body;
		if(!o.world) {
			o.component.waket = this.stamp + (this.midstep ? 0 : 1);
			if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
				o.kinematicDelaySleep = true;
			}
			if(o.component.sleeping) {
				this.really_wake(o,true);
			}
		}
		let cx_ite = body.shapes.head;
		while(cx_ite != null) {
			let shape = cx_ite.elt;
			let dontwake = true;
			if(dontwake == null) {
				dontwake = false;
			}
			if(!dontwake) {
				let o = shape.body;
				if(!o.world) {
					o.component.waket = this.stamp + (this.midstep ? 0 : 1);
					if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
						o.kinematicDelaySleep = true;
					}
					if(o.component.sleeping) {
						this.really_wake(o,false);
					}
				}
			}
			this.bphase.insert(shape);
			shape.addedToSpace();
			cx_ite = cx_ite.next;
		}
		if(body.type == ZPP_Flags.id_BodyType_STATIC) {
			this.static_validation(body);
		} else if(body.type != ZPP_Flags.id_BodyType_DYNAMIC) {
			if(flag != ZPP_Flags.id_BodyType_KINEMATIC) {
				this.kinematics.add(body);
			}
		}
	}
	remBody(body,flag) {
		if(flag == null) {
			flag = -1;
		}
		if(body.type == ZPP_Flags.id_BodyType_STATIC) {
			let o = body;
			if(!o.world) {
				o.component.waket = this.stamp + (this.midstep ? 0 : 1);
				if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
					o.kinematicDelaySleep = true;
				}
				if(o.component.sleeping) {
					this.really_wake(o,true);
				}
			}
			this.staticsleep.remove(body);
		} else if(body.type == ZPP_Flags.id_BodyType_DYNAMIC) {
			let o = body;
			if(!o.world) {
				o.component.waket = this.stamp + (this.midstep ? 0 : 1);
				if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
					o.kinematicDelaySleep = true;
				}
				if(o.component.sleeping) {
					this.really_wake(o,true);
				}
			}
			this.live.remove(body);
		} else {
			if(flag != ZPP_Flags.id_BodyType_KINEMATIC) {
				this.kinematics.remove(body);
			}
			let o = body;
			if(!o.world) {
				o.component.waket = this.stamp + (this.midstep ? 0 : 1);
				if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
					o.kinematicDelaySleep = true;
				}
				if(o.component.sleeping) {
					this.really_wake(o,true);
				}
			}
			this.staticsleep.remove(body);
		}
		let cx_ite = body.shapes.head;
		while(cx_ite != null) {
			let shape = cx_ite.elt;
			this.removed_shape(shape,true);
			cx_ite = cx_ite.next;
		}
		body.removedFromSpace();
		body.space = null;
	}
	shapesUnderPoint(x,y,filter,output) {
		return this.bphase.shapesUnderPoint(x,y,filter,output);
	}
	bodiesUnderPoint(x,y,filter,output) {
		return this.bphase.bodiesUnderPoint(x,y,filter,output);
	}
	shapesInAABB(aabb,strict,cont,filter,output) {
		return this.bphase.shapesInAABB(aabb.zpp_inner,strict,cont,filter,output);
	}
	bodiesInAABB(aabb,strict,cont,filter,output) {
		return this.bphase.bodiesInAABB(aabb.zpp_inner,strict,cont,filter,output);
	}
	shapesInCircle(pos,rad,cont,filter,output) {
		let tmp = this.bphase;
		if(pos != null && pos.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = pos.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let tmp1 = pos.zpp_inner.x;
		if(pos != null && pos.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = pos.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		return tmp.shapesInCircle(tmp1,pos.zpp_inner.y,rad,cont,filter,output);
	}
	bodiesInCircle(pos,rad,cont,filter,output) {
		let tmp = this.bphase;
		if(pos != null && pos.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = pos.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let tmp1 = pos.zpp_inner.x;
		if(pos != null && pos.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = pos.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		return tmp.bodiesInCircle(tmp1,pos.zpp_inner.y,rad,cont,filter,output);
	}
	shapesInShape(shape,cont,filter,output) {
		return this.bphase.shapesInShape(shape,cont,filter,output);
	}
	bodiesInShape(shape,cont,filter,output) {
		return this.bphase.bodiesInShape(shape,cont,filter,output);
	}
	rayCast(ray,inner,filter) {
		return this.bphase.rayCast(ray.zpp_inner,inner,filter == null ? null : filter.zpp_inner);
	}
	rayMultiCast(ray,inner,filter,output) {
		return this.bphase.rayMultiCast(ray.zpp_inner,inner,filter == null ? null : filter.zpp_inner,output);
	}
	convexCast(shape,deltaTime,filter,dynamics) {
		let toi;
		if(ZPP_ToiEvent.zpp_pool == null) {
			toi = new ZPP_ToiEvent();
		} else {
			toi = ZPP_ToiEvent.zpp_pool;
			ZPP_ToiEvent.zpp_pool = toi.next;
			toi.next = null;
		}
		toi.failed = false;
		toi.s1 = toi.s2 = null;
		toi.arbiter = null;
		if(shape.type == ZPP_Flags.id_ShapeType_CIRCLE) {
			let _this = shape.circle;
			if(_this.zip_worldCOM) {
				if(_this.body != null) {
					_this.zip_worldCOM = false;
					if(_this.zip_localCOM) {
						_this.zip_localCOM = false;
						if(_this.type == ZPP_Flags.id_ShapeType_POLYGON) {
							let _this1 = _this.polygon;
							if(_this1.lverts.next == null) {
								throw haxe_Exception.thrown("Error: An empty polygon has no meaningful localCOM");
							}
							if(_this1.lverts.next.next == null) {
								_this1.localCOMx = _this1.lverts.next.x;
								_this1.localCOMy = _this1.lverts.next.y;
							} else if(_this1.lverts.next.next.next == null) {
								_this1.localCOMx = _this1.lverts.next.x;
								_this1.localCOMy = _this1.lverts.next.y;
								let t = 1.0;
								_this1.localCOMx += _this1.lverts.next.next.x * t;
								_this1.localCOMy += _this1.lverts.next.next.y * t;
								let t1 = 0.5;
								_this1.localCOMx *= t1;
								_this1.localCOMy *= t1;
							} else {
								_this1.localCOMx = 0;
								_this1.localCOMy = 0;
								let area = 0.0;
								let cx_ite = _this1.lverts.next;
								let u = cx_ite;
								cx_ite = cx_ite.next;
								let v = cx_ite;
								cx_ite = cx_ite.next;
								while(cx_ite != null) {
									let w = cx_ite;
									area += v.x * (w.y - u.y);
									let cf = w.y * v.x - w.x * v.y;
									_this1.localCOMx += (v.x + w.x) * cf;
									_this1.localCOMy += (v.y + w.y) * cf;
									u = v;
									v = w;
									cx_ite = cx_ite.next;
								}
								cx_ite = _this1.lverts.next;
								let w = cx_ite;
								area += v.x * (w.y - u.y);
								let cf = w.y * v.x - w.x * v.y;
								_this1.localCOMx += (v.x + w.x) * cf;
								_this1.localCOMy += (v.y + w.y) * cf;
								u = v;
								v = w;
								cx_ite = cx_ite.next;
								let w1 = cx_ite;
								area += v.x * (w1.y - u.y);
								let cf1 = w1.y * v.x - w1.x * v.y;
								_this1.localCOMx += (v.x + w1.x) * cf1;
								_this1.localCOMy += (v.y + w1.y) * cf1;
								area = 1 / (3 * area);
								let t = area;
								_this1.localCOMx *= t;
								_this1.localCOMy *= t;
							}
						}
						if(_this.wrap_localCOM != null) {
							_this.wrap_localCOM.zpp_inner.x = _this.localCOMx;
							_this.wrap_localCOM.zpp_inner.y = _this.localCOMy;
						}
					}
					let _this1 = _this.body;
					if(_this1.zip_axis) {
						_this1.zip_axis = false;
						_this1.axisx = Math.sin(_this1.rot);
						_this1.axisy = Math.cos(_this1.rot);
					}
					_this.worldCOMx = _this.body.posx + (_this.body.axisy * _this.localCOMx - _this.body.axisx * _this.localCOMy);
					_this.worldCOMy = _this.body.posy + (_this.localCOMx * _this.body.axisx + _this.localCOMy * _this.body.axisy);
				}
			}
		} else {
			let _this = shape.polygon;
			if(_this.zip_gaxi) {
				if(_this.body != null) {
					_this.zip_gaxi = false;
					_this.validate_laxi();
					let _this1 = _this.body;
					if(_this1.zip_axis) {
						_this1.zip_axis = false;
						_this1.axisx = Math.sin(_this1.rot);
						_this1.axisy = Math.cos(_this1.rot);
					}
					if(_this.zip_gverts) {
						if(_this.body != null) {
							_this.zip_gverts = false;
							_this.validate_lverts();
							let _this1 = _this.body;
							if(_this1.zip_axis) {
								_this1.zip_axis = false;
								_this1.axisx = Math.sin(_this1.rot);
								_this1.axisy = Math.cos(_this1.rot);
							}
							let li = _this.lverts.next;
							let cx_ite = _this.gverts.next;
							while(cx_ite != null) {
								let g = cx_ite;
								let l = li;
								li = li.next;
								g.x = _this.body.posx + (_this.body.axisy * l.x - _this.body.axisx * l.y);
								g.y = _this.body.posy + (l.x * _this.body.axisx + l.y * _this.body.axisy);
								cx_ite = cx_ite.next;
							}
						}
					}
					let ite = _this.edges.head;
					let cx_ite = _this.gverts.next;
					let u = cx_ite;
					cx_ite = cx_ite.next;
					while(cx_ite != null) {
						let v = cx_ite;
						let e = ite.elt;
						ite = ite.next;
						e.gp0 = u;
						e.gp1 = v;
						e.gnormx = _this.body.axisy * e.lnormx - _this.body.axisx * e.lnormy;
						e.gnormy = e.lnormx * _this.body.axisx + e.lnormy * _this.body.axisy;
						e.gprojection = _this.body.posx * e.gnormx + _this.body.posy * e.gnormy + e.lprojection;
						if(e.wrap_gnorm != null) {
							e.wrap_gnorm.zpp_inner.x = e.gnormx;
							e.wrap_gnorm.zpp_inner.y = e.gnormy;
						}
						e.tp0 = e.gp0.y * e.gnormx - e.gp0.x * e.gnormy;
						e.tp1 = e.gp1.y * e.gnormx - e.gp1.x * e.gnormy;
						u = v;
						cx_ite = cx_ite.next;
					}
					let v = _this.gverts.next;
					let e = ite.elt;
					ite = ite.next;
					e.gp0 = u;
					e.gp1 = v;
					e.gnormx = _this.body.axisy * e.lnormx - _this.body.axisx * e.lnormy;
					e.gnormy = e.lnormx * _this.body.axisx + e.lnormy * _this.body.axisy;
					e.gprojection = _this.body.posx * e.gnormx + _this.body.posy * e.gnormy + e.lprojection;
					if(e.wrap_gnorm != null) {
						e.wrap_gnorm.zpp_inner.x = e.gnormx;
						e.wrap_gnorm.zpp_inner.y = e.gnormy;
					}
					e.tp0 = e.gp0.y * e.gnormx - e.gp0.x * e.gnormy;
					e.tp1 = e.gp1.y * e.gnormx - e.gp1.x * e.gnormy;
				}
			}
		}
		let body = shape.body;
		let prex = body.posx;
		let prey = body.posy;
		body.sweepTime = 0;
		body.sweep_angvel = body.angvel;
		let delta = deltaTime - body.sweepTime;
		if(delta != 0) {
			body.sweepTime = deltaTime;
			let t = delta;
			body.posx += body.velx * t;
			body.posy += body.vely * t;
			if(body.angvel != 0) {
				let dr = body.sweep_angvel * delta;
				body.rot += dr;
				if(dr * dr > 0.0001) {
					body.axisx = Math.sin(body.rot);
					body.axisy = Math.cos(body.rot);
				} else {
					let d2 = dr * dr;
					let p = 1 - 0.5 * d2;
					let m = 1 - d2 * d2 / 8;
					let nx = (p * body.axisx + dr * body.axisy) * m;
					body.axisy = (p * body.axisy - dr * body.axisx) * m;
					body.axisx = nx;
				}
			}
		}
		let postx = body.posx;
		let posty = body.posy;
		shape.validate_sweepRadius();
		let rad = shape.sweepRadius;
		let aabb;
		if(ZPP_AABB.zpp_pool == null) {
			aabb = new ZPP_AABB();
		} else {
			aabb = ZPP_AABB.zpp_pool;
			ZPP_AABB.zpp_pool = aabb.next;
			aabb.next = null;
		}
		let x = prex;
		let y = postx;
		aabb.minx = (x < y ? x : y) - rad;
		let x1 = prex;
		let y1 = postx;
		aabb.maxx = (x1 > y1 ? x1 : y1) + rad;
		let x2 = prey;
		let y2 = posty;
		aabb.miny = (x2 < y2 ? x2 : y2) - rad;
		let x3 = prey;
		let y3 = posty;
		aabb.maxy = (x3 > y3 ? x3 : y3) + rad;
		let list = this.convexShapeList = this.bphase.shapesInAABB(aabb,false,false,filter == null ? null : filter.zpp_inner,this.convexShapeList);
		let o = aabb;
		if(o.outer != null) {
			o.outer.zpp_inner = null;
			o.outer = null;
		}
		o.wrap_min = o.wrap_max = null;
		o._invalidate = null;
		o._validate = null;
		o.next = ZPP_AABB.zpp_pool;
		ZPP_AABB.zpp_pool = o;
		let minAxisx = 0.0;
		let minAxisy = 0.0;
		minAxisx = 0;
		minAxisy = 0;
		let minPosx = 0.0;
		let minPosy = 0.0;
		minPosx = 0;
		minPosy = 0;
		let mins = null;
		let mint = deltaTime + 1;
		list.zpp_inner.valmod();
		let _g = ShapeIterator.get(list);
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
				_g.zpp_next = ShapeIterator.zpp_pool;
				ShapeIterator.zpp_pool = _g;
				_g.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g.zpp_critical = false;
			let s = _g.zpp_inner.at(_g.zpp_i++);
			if(s != shape.outer && (s.zpp_inner.body != null ? s.zpp_inner.body.outer : null) != body.outer) {
				toi.s1 = shape;
				toi.s2 = s.zpp_inner;
				if(dynamics) {
					s.zpp_inner.validate_sweepRadius();
					(s.zpp_inner.body != null ? s.zpp_inner.body.outer : null).zpp_inner.sweep_angvel = (s.zpp_inner.body != null ? s.zpp_inner.body.outer : null).zpp_inner.angvel;
					(s.zpp_inner.body != null ? s.zpp_inner.body.outer : null).zpp_inner.sweepTime = 0;
					ZPP_SweepDistance.dynamicSweep(toi,deltaTime,0,0,true);
					let _this = (s.zpp_inner.body != null ? s.zpp_inner.body.outer : null).zpp_inner;
					let delta = 0 - _this.sweepTime;
					if(delta != 0) {
						_this.sweepTime = 0;
						let t = delta;
						_this.posx += _this.velx * t;
						_this.posy += _this.vely * t;
						if(_this.angvel != 0) {
							let dr = _this.sweep_angvel * delta;
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
						}
					}
					let _this1 = (s.zpp_inner.body != null ? s.zpp_inner.body.outer : null).zpp_inner;
					let s1 = s.zpp_inner;
					if(s1.type == ZPP_Flags.id_ShapeType_CIRCLE) {
						s1.worldCOMx = _this1.posx + (_this1.axisy * s1.localCOMx - _this1.axisx * s1.localCOMy);
						s1.worldCOMy = _this1.posy + (s1.localCOMx * _this1.axisx + s1.localCOMy * _this1.axisy);
					} else {
						let p = s1.polygon;
						let li = p.lverts.next;
						let cx_ite = p.gverts.next;
						while(cx_ite != null) {
							let g = cx_ite;
							let l = li;
							li = li.next;
							g.x = _this1.posx + (_this1.axisy * l.x - _this1.axisx * l.y);
							g.y = _this1.posy + (l.x * _this1.axisx + l.y * _this1.axisy);
							cx_ite = cx_ite.next;
						}
						let ite = p.edges.head;
						let cx_ite1 = p.gverts.next;
						let u = cx_ite1;
						cx_ite1 = cx_ite1.next;
						while(cx_ite1 != null) {
							let v = cx_ite1;
							let e = ite.elt;
							ite = ite.next;
							e.gnormx = _this1.axisy * e.lnormx - _this1.axisx * e.lnormy;
							e.gnormy = e.lnormx * _this1.axisx + e.lnormy * _this1.axisy;
							e.gprojection = _this1.posx * e.gnormx + _this1.posy * e.gnormy + e.lprojection;
							e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
							e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
							u = v;
							cx_ite1 = cx_ite1.next;
						}
						let v = p.gverts.next;
						let e = ite.elt;
						ite = ite.next;
						e.gnormx = _this1.axisy * e.lnormx - _this1.axisx * e.lnormy;
						e.gnormy = e.lnormx * _this1.axisx + e.lnormy * _this1.axisy;
						e.gprojection = _this1.posx * e.gnormx + _this1.posy * e.gnormy + e.lprojection;
						e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
						e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
					}
				} else {
					ZPP_SweepDistance.staticSweep(toi,deltaTime,0,0);
				}
				toi.toi *= deltaTime;
				if(toi.toi > 0 && toi.toi < mint) {
					mint = toi.toi;
					minAxisx = toi.axis.x;
					minAxisy = toi.axis.y;
					minPosx = toi.c2.x;
					minPosy = toi.c2.y;
					mins = s;
				}
			}
		}
		list.clear();
		let o1 = toi;
		o1.next = ZPP_ToiEvent.zpp_pool;
		ZPP_ToiEvent.zpp_pool = o1;
		let delta1 = 0 - body.sweepTime;
		if(delta1 != 0) {
			body.sweepTime = 0;
			let t = delta1;
			body.posx += body.velx * t;
			body.posy += body.vely * t;
			if(body.angvel != 0) {
				let dr = body.sweep_angvel * delta1;
				body.rot += dr;
				if(dr * dr > 0.0001) {
					body.axisx = Math.sin(body.rot);
					body.axisy = Math.cos(body.rot);
				} else {
					let d2 = dr * dr;
					let p = 1 - 0.5 * d2;
					let m = 1 - d2 * d2 / 8;
					let nx = (p * body.axisx + dr * body.axisy) * m;
					body.axisy = (p * body.axisy - dr * body.axisx) * m;
					body.axisx = nx;
				}
			}
		}
		if(shape.type == ZPP_Flags.id_ShapeType_CIRCLE) {
			shape.worldCOMx = body.posx + (body.axisy * shape.localCOMx - body.axisx * shape.localCOMy);
			shape.worldCOMy = body.posy + (shape.localCOMx * body.axisx + shape.localCOMy * body.axisy);
		} else {
			let p = shape.polygon;
			let li = p.lverts.next;
			let cx_ite = p.gverts.next;
			while(cx_ite != null) {
				let g = cx_ite;
				let l = li;
				li = li.next;
				g.x = body.posx + (body.axisy * l.x - body.axisx * l.y);
				g.y = body.posy + (l.x * body.axisx + l.y * body.axisy);
				cx_ite = cx_ite.next;
			}
			let ite = p.edges.head;
			let cx_ite1 = p.gverts.next;
			let u = cx_ite1;
			cx_ite1 = cx_ite1.next;
			while(cx_ite1 != null) {
				let v = cx_ite1;
				let e = ite.elt;
				ite = ite.next;
				e.gnormx = body.axisy * e.lnormx - body.axisx * e.lnormy;
				e.gnormy = e.lnormx * body.axisx + e.lnormy * body.axisy;
				e.gprojection = body.posx * e.gnormx + body.posy * e.gnormy + e.lprojection;
				e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
				e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
				u = v;
				cx_ite1 = cx_ite1.next;
			}
			let v = p.gverts.next;
			let e = ite.elt;
			ite = ite.next;
			e.gnormx = body.axisy * e.lnormx - body.axisx * e.lnormy;
			e.gnormy = e.lnormx * body.axisx + e.lnormy * body.axisy;
			e.gprojection = body.posx * e.gnormx + body.posy * e.gnormy + e.lprojection;
			e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
			e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
		}
		if(mint <= deltaTime) {
			let x = -minAxisx;
			let y = -minAxisy;
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
			let x1 = minPosx;
			let y1 = minPosy;
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
			return ZPP_ConvexRayResult.getConvex(ret,ret1,mint,mins);
		} else {
			return null;
		}
	}
	prepareCast(s) {
		if(s.type == ZPP_Flags.id_ShapeType_CIRCLE) {
			let _this = s.circle;
			if(_this.zip_worldCOM) {
				if(_this.body != null) {
					_this.zip_worldCOM = false;
					if(_this.zip_localCOM) {
						_this.zip_localCOM = false;
						if(_this.type == ZPP_Flags.id_ShapeType_POLYGON) {
							let _this1 = _this.polygon;
							if(_this1.lverts.next == null) {
								throw haxe_Exception.thrown("Error: An empty polygon has no meaningful localCOM");
							}
							if(_this1.lverts.next.next == null) {
								_this1.localCOMx = _this1.lverts.next.x;
								_this1.localCOMy = _this1.lverts.next.y;
							} else if(_this1.lverts.next.next.next == null) {
								_this1.localCOMx = _this1.lverts.next.x;
								_this1.localCOMy = _this1.lverts.next.y;
								let t = 1.0;
								_this1.localCOMx += _this1.lverts.next.next.x * t;
								_this1.localCOMy += _this1.lverts.next.next.y * t;
								let t1 = 0.5;
								_this1.localCOMx *= t1;
								_this1.localCOMy *= t1;
							} else {
								_this1.localCOMx = 0;
								_this1.localCOMy = 0;
								let area = 0.0;
								let cx_ite = _this1.lverts.next;
								let u = cx_ite;
								cx_ite = cx_ite.next;
								let v = cx_ite;
								cx_ite = cx_ite.next;
								while(cx_ite != null) {
									let w = cx_ite;
									area += v.x * (w.y - u.y);
									let cf = w.y * v.x - w.x * v.y;
									_this1.localCOMx += (v.x + w.x) * cf;
									_this1.localCOMy += (v.y + w.y) * cf;
									u = v;
									v = w;
									cx_ite = cx_ite.next;
								}
								cx_ite = _this1.lverts.next;
								let w = cx_ite;
								area += v.x * (w.y - u.y);
								let cf = w.y * v.x - w.x * v.y;
								_this1.localCOMx += (v.x + w.x) * cf;
								_this1.localCOMy += (v.y + w.y) * cf;
								u = v;
								v = w;
								cx_ite = cx_ite.next;
								let w1 = cx_ite;
								area += v.x * (w1.y - u.y);
								let cf1 = w1.y * v.x - w1.x * v.y;
								_this1.localCOMx += (v.x + w1.x) * cf1;
								_this1.localCOMy += (v.y + w1.y) * cf1;
								area = 1 / (3 * area);
								let t = area;
								_this1.localCOMx *= t;
								_this1.localCOMy *= t;
							}
						}
						if(_this.wrap_localCOM != null) {
							_this.wrap_localCOM.zpp_inner.x = _this.localCOMx;
							_this.wrap_localCOM.zpp_inner.y = _this.localCOMy;
						}
					}
					let _this1 = _this.body;
					if(_this1.zip_axis) {
						_this1.zip_axis = false;
						_this1.axisx = Math.sin(_this1.rot);
						_this1.axisy = Math.cos(_this1.rot);
					}
					_this.worldCOMx = _this.body.posx + (_this.body.axisy * _this.localCOMx - _this.body.axisx * _this.localCOMy);
					_this.worldCOMy = _this.body.posy + (_this.localCOMx * _this.body.axisx + _this.localCOMy * _this.body.axisy);
				}
			}
		} else {
			let _this = s.polygon;
			if(_this.zip_gaxi) {
				if(_this.body != null) {
					_this.zip_gaxi = false;
					_this.validate_laxi();
					let _this1 = _this.body;
					if(_this1.zip_axis) {
						_this1.zip_axis = false;
						_this1.axisx = Math.sin(_this1.rot);
						_this1.axisy = Math.cos(_this1.rot);
					}
					if(_this.zip_gverts) {
						if(_this.body != null) {
							_this.zip_gverts = false;
							_this.validate_lverts();
							let _this1 = _this.body;
							if(_this1.zip_axis) {
								_this1.zip_axis = false;
								_this1.axisx = Math.sin(_this1.rot);
								_this1.axisy = Math.cos(_this1.rot);
							}
							let li = _this.lverts.next;
							let cx_ite = _this.gverts.next;
							while(cx_ite != null) {
								let g = cx_ite;
								let l = li;
								li = li.next;
								g.x = _this.body.posx + (_this.body.axisy * l.x - _this.body.axisx * l.y);
								g.y = _this.body.posy + (l.x * _this.body.axisx + l.y * _this.body.axisy);
								cx_ite = cx_ite.next;
							}
						}
					}
					let ite = _this.edges.head;
					let cx_ite = _this.gverts.next;
					let u = cx_ite;
					cx_ite = cx_ite.next;
					while(cx_ite != null) {
						let v = cx_ite;
						let e = ite.elt;
						ite = ite.next;
						e.gp0 = u;
						e.gp1 = v;
						e.gnormx = _this.body.axisy * e.lnormx - _this.body.axisx * e.lnormy;
						e.gnormy = e.lnormx * _this.body.axisx + e.lnormy * _this.body.axisy;
						e.gprojection = _this.body.posx * e.gnormx + _this.body.posy * e.gnormy + e.lprojection;
						if(e.wrap_gnorm != null) {
							e.wrap_gnorm.zpp_inner.x = e.gnormx;
							e.wrap_gnorm.zpp_inner.y = e.gnormy;
						}
						e.tp0 = e.gp0.y * e.gnormx - e.gp0.x * e.gnormy;
						e.tp1 = e.gp1.y * e.gnormx - e.gp1.x * e.gnormy;
						u = v;
						cx_ite = cx_ite.next;
					}
					let v = _this.gverts.next;
					let e = ite.elt;
					ite = ite.next;
					e.gp0 = u;
					e.gp1 = v;
					e.gnormx = _this.body.axisy * e.lnormx - _this.body.axisx * e.lnormy;
					e.gnormy = e.lnormx * _this.body.axisx + e.lnormy * _this.body.axisy;
					e.gprojection = _this.body.posx * e.gnormx + _this.body.posy * e.gnormy + e.lprojection;
					if(e.wrap_gnorm != null) {
						e.wrap_gnorm.zpp_inner.x = e.gnormx;
						e.wrap_gnorm.zpp_inner.y = e.gnormy;
					}
					e.tp0 = e.gp0.y * e.gnormx - e.gp0.x * e.gnormy;
					e.tp1 = e.gp1.y * e.gnormx - e.gp1.x * e.gnormy;
				}
			}
		}
	}
	convexMultiCast(shape,deltaTime,filter,dynamics,output) {
		let toi;
		if(ZPP_ToiEvent.zpp_pool == null) {
			toi = new ZPP_ToiEvent();
		} else {
			toi = ZPP_ToiEvent.zpp_pool;
			ZPP_ToiEvent.zpp_pool = toi.next;
			toi.next = null;
		}
		toi.failed = false;
		toi.s1 = toi.s2 = null;
		toi.arbiter = null;
		if(shape.type == ZPP_Flags.id_ShapeType_CIRCLE) {
			let _this = shape.circle;
			if(_this.zip_worldCOM) {
				if(_this.body != null) {
					_this.zip_worldCOM = false;
					if(_this.zip_localCOM) {
						_this.zip_localCOM = false;
						if(_this.type == ZPP_Flags.id_ShapeType_POLYGON) {
							let _this1 = _this.polygon;
							if(_this1.lverts.next == null) {
								throw haxe_Exception.thrown("Error: An empty polygon has no meaningful localCOM");
							}
							if(_this1.lverts.next.next == null) {
								_this1.localCOMx = _this1.lverts.next.x;
								_this1.localCOMy = _this1.lverts.next.y;
							} else if(_this1.lverts.next.next.next == null) {
								_this1.localCOMx = _this1.lverts.next.x;
								_this1.localCOMy = _this1.lverts.next.y;
								let t = 1.0;
								_this1.localCOMx += _this1.lverts.next.next.x * t;
								_this1.localCOMy += _this1.lverts.next.next.y * t;
								let t1 = 0.5;
								_this1.localCOMx *= t1;
								_this1.localCOMy *= t1;
							} else {
								_this1.localCOMx = 0;
								_this1.localCOMy = 0;
								let area = 0.0;
								let cx_ite = _this1.lverts.next;
								let u = cx_ite;
								cx_ite = cx_ite.next;
								let v = cx_ite;
								cx_ite = cx_ite.next;
								while(cx_ite != null) {
									let w = cx_ite;
									area += v.x * (w.y - u.y);
									let cf = w.y * v.x - w.x * v.y;
									_this1.localCOMx += (v.x + w.x) * cf;
									_this1.localCOMy += (v.y + w.y) * cf;
									u = v;
									v = w;
									cx_ite = cx_ite.next;
								}
								cx_ite = _this1.lverts.next;
								let w = cx_ite;
								area += v.x * (w.y - u.y);
								let cf = w.y * v.x - w.x * v.y;
								_this1.localCOMx += (v.x + w.x) * cf;
								_this1.localCOMy += (v.y + w.y) * cf;
								u = v;
								v = w;
								cx_ite = cx_ite.next;
								let w1 = cx_ite;
								area += v.x * (w1.y - u.y);
								let cf1 = w1.y * v.x - w1.x * v.y;
								_this1.localCOMx += (v.x + w1.x) * cf1;
								_this1.localCOMy += (v.y + w1.y) * cf1;
								area = 1 / (3 * area);
								let t = area;
								_this1.localCOMx *= t;
								_this1.localCOMy *= t;
							}
						}
						if(_this.wrap_localCOM != null) {
							_this.wrap_localCOM.zpp_inner.x = _this.localCOMx;
							_this.wrap_localCOM.zpp_inner.y = _this.localCOMy;
						}
					}
					let _this1 = _this.body;
					if(_this1.zip_axis) {
						_this1.zip_axis = false;
						_this1.axisx = Math.sin(_this1.rot);
						_this1.axisy = Math.cos(_this1.rot);
					}
					_this.worldCOMx = _this.body.posx + (_this.body.axisy * _this.localCOMx - _this.body.axisx * _this.localCOMy);
					_this.worldCOMy = _this.body.posy + (_this.localCOMx * _this.body.axisx + _this.localCOMy * _this.body.axisy);
				}
			}
		} else {
			let _this = shape.polygon;
			if(_this.zip_gaxi) {
				if(_this.body != null) {
					_this.zip_gaxi = false;
					_this.validate_laxi();
					let _this1 = _this.body;
					if(_this1.zip_axis) {
						_this1.zip_axis = false;
						_this1.axisx = Math.sin(_this1.rot);
						_this1.axisy = Math.cos(_this1.rot);
					}
					if(_this.zip_gverts) {
						if(_this.body != null) {
							_this.zip_gverts = false;
							_this.validate_lverts();
							let _this1 = _this.body;
							if(_this1.zip_axis) {
								_this1.zip_axis = false;
								_this1.axisx = Math.sin(_this1.rot);
								_this1.axisy = Math.cos(_this1.rot);
							}
							let li = _this.lverts.next;
							let cx_ite = _this.gverts.next;
							while(cx_ite != null) {
								let g = cx_ite;
								let l = li;
								li = li.next;
								g.x = _this.body.posx + (_this.body.axisy * l.x - _this.body.axisx * l.y);
								g.y = _this.body.posy + (l.x * _this.body.axisx + l.y * _this.body.axisy);
								cx_ite = cx_ite.next;
							}
						}
					}
					let ite = _this.edges.head;
					let cx_ite = _this.gverts.next;
					let u = cx_ite;
					cx_ite = cx_ite.next;
					while(cx_ite != null) {
						let v = cx_ite;
						let e = ite.elt;
						ite = ite.next;
						e.gp0 = u;
						e.gp1 = v;
						e.gnormx = _this.body.axisy * e.lnormx - _this.body.axisx * e.lnormy;
						e.gnormy = e.lnormx * _this.body.axisx + e.lnormy * _this.body.axisy;
						e.gprojection = _this.body.posx * e.gnormx + _this.body.posy * e.gnormy + e.lprojection;
						if(e.wrap_gnorm != null) {
							e.wrap_gnorm.zpp_inner.x = e.gnormx;
							e.wrap_gnorm.zpp_inner.y = e.gnormy;
						}
						e.tp0 = e.gp0.y * e.gnormx - e.gp0.x * e.gnormy;
						e.tp1 = e.gp1.y * e.gnormx - e.gp1.x * e.gnormy;
						u = v;
						cx_ite = cx_ite.next;
					}
					let v = _this.gverts.next;
					let e = ite.elt;
					ite = ite.next;
					e.gp0 = u;
					e.gp1 = v;
					e.gnormx = _this.body.axisy * e.lnormx - _this.body.axisx * e.lnormy;
					e.gnormy = e.lnormx * _this.body.axisx + e.lnormy * _this.body.axisy;
					e.gprojection = _this.body.posx * e.gnormx + _this.body.posy * e.gnormy + e.lprojection;
					if(e.wrap_gnorm != null) {
						e.wrap_gnorm.zpp_inner.x = e.gnormx;
						e.wrap_gnorm.zpp_inner.y = e.gnormy;
					}
					e.tp0 = e.gp0.y * e.gnormx - e.gp0.x * e.gnormy;
					e.tp1 = e.gp1.y * e.gnormx - e.gp1.x * e.gnormy;
				}
			}
		}
		let body = shape.body;
		let prex = body.posx;
		let prey = body.posy;
		body.sweepTime = 0;
		body.sweep_angvel = body.angvel;
		let delta = deltaTime - body.sweepTime;
		if(delta != 0) {
			body.sweepTime = deltaTime;
			let t = delta;
			body.posx += body.velx * t;
			body.posy += body.vely * t;
			if(body.angvel != 0) {
				let dr = body.sweep_angvel * delta;
				body.rot += dr;
				if(dr * dr > 0.0001) {
					body.axisx = Math.sin(body.rot);
					body.axisy = Math.cos(body.rot);
				} else {
					let d2 = dr * dr;
					let p = 1 - 0.5 * d2;
					let m = 1 - d2 * d2 / 8;
					let nx = (p * body.axisx + dr * body.axisy) * m;
					body.axisy = (p * body.axisy - dr * body.axisx) * m;
					body.axisx = nx;
				}
			}
		}
		let postx = body.posx;
		let posty = body.posy;
		shape.validate_sweepRadius();
		let rad = shape.sweepRadius;
		let aabb;
		if(ZPP_AABB.zpp_pool == null) {
			aabb = new ZPP_AABB();
		} else {
			aabb = ZPP_AABB.zpp_pool;
			ZPP_AABB.zpp_pool = aabb.next;
			aabb.next = null;
		}
		let x = prex;
		let y = postx;
		aabb.minx = (x < y ? x : y) - rad;
		let x1 = prex;
		let y1 = postx;
		aabb.maxx = (x1 > y1 ? x1 : y1) + rad;
		let x2 = prey;
		let y2 = posty;
		aabb.miny = (x2 < y2 ? x2 : y2) - rad;
		let x3 = prey;
		let y3 = posty;
		aabb.maxy = (x3 > y3 ? x3 : y3) + rad;
		let list = this.convexShapeList = this.bphase.shapesInAABB(aabb,false,false,filter == null ? null : filter.zpp_inner,this.convexShapeList);
		let o = aabb;
		if(o.outer != null) {
			o.outer.zpp_inner = null;
			o.outer = null;
		}
		o.wrap_min = o.wrap_max = null;
		o._invalidate = null;
		o._validate = null;
		o.next = ZPP_AABB.zpp_pool;
		ZPP_AABB.zpp_pool = o;
		let ret = output == null ? new ConvexResultList() : output;
		list.zpp_inner.valmod();
		let _g = ShapeIterator.get(list);
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
				_g.zpp_next = ShapeIterator.zpp_pool;
				ShapeIterator.zpp_pool = _g;
				_g.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g.zpp_critical = false;
			let s = _g.zpp_inner.at(_g.zpp_i++);
			if(s != shape.outer && (s.zpp_inner.body != null ? s.zpp_inner.body.outer : null) != body.outer) {
				toi.s1 = shape;
				toi.s2 = s.zpp_inner;
				if(dynamics) {
					s.zpp_inner.validate_sweepRadius();
					(s.zpp_inner.body != null ? s.zpp_inner.body.outer : null).zpp_inner.sweep_angvel = (s.zpp_inner.body != null ? s.zpp_inner.body.outer : null).zpp_inner.angvel;
					(s.zpp_inner.body != null ? s.zpp_inner.body.outer : null).zpp_inner.sweepTime = 0;
					ZPP_SweepDistance.dynamicSweep(toi,deltaTime,0,0,true);
					let _this = (s.zpp_inner.body != null ? s.zpp_inner.body.outer : null).zpp_inner;
					let delta = 0 - _this.sweepTime;
					if(delta != 0) {
						_this.sweepTime = 0;
						let t = delta;
						_this.posx += _this.velx * t;
						_this.posy += _this.vely * t;
						if(_this.angvel != 0) {
							let dr = _this.sweep_angvel * delta;
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
						}
					}
					let _this1 = (s.zpp_inner.body != null ? s.zpp_inner.body.outer : null).zpp_inner;
					let s1 = s.zpp_inner;
					if(s1.type == ZPP_Flags.id_ShapeType_CIRCLE) {
						s1.worldCOMx = _this1.posx + (_this1.axisy * s1.localCOMx - _this1.axisx * s1.localCOMy);
						s1.worldCOMy = _this1.posy + (s1.localCOMx * _this1.axisx + s1.localCOMy * _this1.axisy);
					} else {
						let p = s1.polygon;
						let li = p.lverts.next;
						let cx_ite = p.gverts.next;
						while(cx_ite != null) {
							let g = cx_ite;
							let l = li;
							li = li.next;
							g.x = _this1.posx + (_this1.axisy * l.x - _this1.axisx * l.y);
							g.y = _this1.posy + (l.x * _this1.axisx + l.y * _this1.axisy);
							cx_ite = cx_ite.next;
						}
						let ite = p.edges.head;
						let cx_ite1 = p.gverts.next;
						let u = cx_ite1;
						cx_ite1 = cx_ite1.next;
						while(cx_ite1 != null) {
							let v = cx_ite1;
							let e = ite.elt;
							ite = ite.next;
							e.gnormx = _this1.axisy * e.lnormx - _this1.axisx * e.lnormy;
							e.gnormy = e.lnormx * _this1.axisx + e.lnormy * _this1.axisy;
							e.gprojection = _this1.posx * e.gnormx + _this1.posy * e.gnormy + e.lprojection;
							e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
							e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
							u = v;
							cx_ite1 = cx_ite1.next;
						}
						let v = p.gverts.next;
						let e = ite.elt;
						ite = ite.next;
						e.gnormx = _this1.axisy * e.lnormx - _this1.axisx * e.lnormy;
						e.gnormy = e.lnormx * _this1.axisx + e.lnormy * _this1.axisy;
						e.gprojection = _this1.posx * e.gnormx + _this1.posy * e.gnormy + e.lprojection;
						e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
						e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
					}
				} else {
					ZPP_SweepDistance.staticSweep(toi,deltaTime,0,0);
				}
				toi.toi *= deltaTime;
				if(toi.toi > 0) {
					let x = -toi.axis.x;
					let y = -toi.axis.y;
					if(y == null) {
						y = 0;
					}
					if(x == null) {
						x = 0;
					}
					if(x != x || y != y) {
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
						ret.x = x;
						ret.y = y;
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
						if(x != x || y != y) {
							throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
						}
						let res;
						if(ret1 != null && ret1.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = ret1.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						if(ret1.zpp_inner.x == x) {
							if(ret1 != null && ret1.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this = ret1.zpp_inner;
							if(_this._validate != null) {
								_this._validate();
							}
							res = ret1.zpp_inner.y == y;
						} else {
							res = false;
						}
						if(!res) {
							ret1.zpp_inner.x = x;
							ret1.zpp_inner.y = y;
							let _this = ret1.zpp_inner;
							if(_this._invalidate != null) {
								_this._invalidate(_this);
							}
						}
					}
					ret1.zpp_inner.weak = false;
					let x1 = toi.c2.x;
					let y1 = toi.c2.y;
					if(y1 == null) {
						y1 = 0;
					}
					if(x1 == null) {
						x1 = 0;
					}
					if(x1 != x1 || y1 != y1) {
						throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
					}
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
						ret.x = x1;
						ret.y = y1;
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
						if(x1 != x1 || y1 != y1) {
							throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
						}
						let res;
						if(ret2 != null && ret2.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = ret2.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						if(ret2.zpp_inner.x == x1) {
							if(ret2 != null && ret2.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this = ret2.zpp_inner;
							if(_this._validate != null) {
								_this._validate();
							}
							res = ret2.zpp_inner.y == y1;
						} else {
							res = false;
						}
						if(!res) {
							ret2.zpp_inner.x = x1;
							ret2.zpp_inner.y = y1;
							let _this = ret2.zpp_inner;
							if(_this._invalidate != null) {
								_this._invalidate(_this);
							}
						}
					}
					ret2.zpp_inner.weak = false;
					let res = ZPP_ConvexRayResult.getConvex(ret1,ret2,toi.toi,s);
					let pre = null;
					let cx_ite = ret.zpp_inner.inner.head;
					while(cx_ite != null) {
						let j = cx_ite.elt;
						if(res.zpp_inner.next != null) {
							throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
						}
						let tmp = res.zpp_inner.toiDistance;
						if(j.zpp_inner.next != null) {
							throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
						}
						if(tmp < j.zpp_inner.toiDistance) {
							break;
						}
						pre = cx_ite;
						cx_ite = cx_ite.next;
					}
					let _this = ret.zpp_inner.inner;
					let ret3;
					if(ZNPNode_ConvexResult.zpp_pool == null) {
						ret3 = new ZNPNode_ConvexResult();
					} else {
						ret3 = ZNPNode_ConvexResult.zpp_pool;
						ZNPNode_ConvexResult.zpp_pool = ret3.next;
						ret3.next = null;
					}
					ret3.elt = res;
					let temp = ret3;
					if(pre == null) {
						temp.next = _this.head;
						_this.head = temp;
					} else {
						temp.next = pre.next;
						pre.next = temp;
					}
					_this.pushmod = _this.modified = true;
					_this.length++;
				}
			}
		}
		list.clear();
		let o1 = toi;
		o1.next = ZPP_ToiEvent.zpp_pool;
		ZPP_ToiEvent.zpp_pool = o1;
		let delta1 = 0 - body.sweepTime;
		if(delta1 != 0) {
			body.sweepTime = 0;
			let t = delta1;
			body.posx += body.velx * t;
			body.posy += body.vely * t;
			if(body.angvel != 0) {
				let dr = body.sweep_angvel * delta1;
				body.rot += dr;
				if(dr * dr > 0.0001) {
					body.axisx = Math.sin(body.rot);
					body.axisy = Math.cos(body.rot);
				} else {
					let d2 = dr * dr;
					let p = 1 - 0.5 * d2;
					let m = 1 - d2 * d2 / 8;
					let nx = (p * body.axisx + dr * body.axisy) * m;
					body.axisy = (p * body.axisy - dr * body.axisx) * m;
					body.axisx = nx;
				}
			}
		}
		if(shape.type == ZPP_Flags.id_ShapeType_CIRCLE) {
			shape.worldCOMx = body.posx + (body.axisy * shape.localCOMx - body.axisx * shape.localCOMy);
			shape.worldCOMy = body.posy + (shape.localCOMx * body.axisx + shape.localCOMy * body.axisy);
		} else {
			let p = shape.polygon;
			let li = p.lverts.next;
			let cx_ite = p.gverts.next;
			while(cx_ite != null) {
				let g = cx_ite;
				let l = li;
				li = li.next;
				g.x = body.posx + (body.axisy * l.x - body.axisx * l.y);
				g.y = body.posy + (l.x * body.axisx + l.y * body.axisy);
				cx_ite = cx_ite.next;
			}
			let ite = p.edges.head;
			let cx_ite1 = p.gverts.next;
			let u = cx_ite1;
			cx_ite1 = cx_ite1.next;
			while(cx_ite1 != null) {
				let v = cx_ite1;
				let e = ite.elt;
				ite = ite.next;
				e.gnormx = body.axisy * e.lnormx - body.axisx * e.lnormy;
				e.gnormy = e.lnormx * body.axisx + e.lnormy * body.axisy;
				e.gprojection = body.posx * e.gnormx + body.posy * e.gnormy + e.lprojection;
				e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
				e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
				u = v;
				cx_ite1 = cx_ite1.next;
			}
			let v = p.gverts.next;
			let e = ite.elt;
			ite = ite.next;
			e.gnormx = body.axisy * e.lnormx - body.axisx * e.lnormy;
			e.gnormy = e.lnormx * body.axisx + e.lnormy * body.axisy;
			e.gprojection = body.posx * e.gnormx + body.posy * e.gnormy + e.lprojection;
			e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
			e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
		}
		return ret;
	}
	push_callback(i) {
		let cb;
		if(ZPP_Callback.zpp_pool == null) {
			cb = new ZPP_Callback();
		} else {
			cb = ZPP_Callback.zpp_pool;
			ZPP_Callback.zpp_pool = cb.next;
			cb.next = null;
		}
		this.callbacks.push(cb);
		cb.listener = i;
		return cb;
	}
	step(deltaTime,velocityIterations,positionIterations) {
		if(this.midstep) {
			throw haxe_Exception.thrown("Error: ... REALLY?? you're going to call space.step() inside of space.step()? COME ON!!");
		}
		this.time += deltaTime;
		this.pre_dt = deltaTime;
		this.midstep = true;
		this.stamp++;
		this.validation();
		this.bphase.broadphase(this,true);
		this.prestep(deltaTime);
		if(this.sortcontacts) {
			let xxlist = this.c_arbiters_false;
			if(xxlist.head != null && xxlist.head.next != null) {
				let head = xxlist.head;
				let tail = null;
				let left = null;
				let right = null;
				let nxt = null;
				let listSize = 1;
				let numMerges;
				let leftSize;
				let rightSize;
				while(true) {
					numMerges = 0;
					left = head;
					head = null;
					tail = head;
					while(left != null) {
						++numMerges;
						right = left;
						leftSize = 0;
						rightSize = listSize;
						while(right != null && leftSize < listSize) {
							++leftSize;
							right = right.next;
						}
						while(leftSize > 0 || rightSize > 0 && right != null) {
							if(leftSize == 0) {
								nxt = right;
								right = right.next;
								--rightSize;
							} else if(rightSize == 0 || right == null) {
								nxt = left;
								left = left.next;
								--leftSize;
							} else if(left.elt.active && right.elt.active ? left.elt.oc1.dist < right.elt.oc1.dist : true) {
								nxt = left;
								left = left.next;
								--leftSize;
							} else {
								nxt = right;
								right = right.next;
								--rightSize;
							}
							if(tail != null) {
								tail.next = nxt;
							} else {
								head = nxt;
							}
							tail = nxt;
						}
						left = right;
					}
					tail.next = null;
					listSize <<= 1;
					if(!(numMerges > 1)) {
						break;
					}
				}
				xxlist.head = head;
				xxlist.modified = true;
				xxlist.pushmod = true;
			}
		}
		this.updateVel(deltaTime);
		this.warmStart();
		this.iterateVel(velocityIterations);
		let cx_ite = this.kinematics.head;
		while(cx_ite != null) {
			let cur = cx_ite.elt;
			cur.pre_posx = cur.posx;
			cur.pre_posy = cur.posy;
			cur.pre_rot = cur.rot;
			cx_ite = cx_ite.next;
		}
		let cx_ite1 = this.live.head;
		while(cx_ite1 != null) {
			let cur = cx_ite1.elt;
			cur.pre_posx = cur.posx;
			cur.pre_posy = cur.posy;
			cur.pre_rot = cur.rot;
			cx_ite1 = cx_ite1.next;
		}
		this.updatePos(deltaTime);
		this.continuous = true;
		this.continuousCollisions(deltaTime);
		this.continuous = false;
		this.iteratePos(positionIterations);
		let cx_ite2 = this.kinematics.head;
		while(cx_ite2 != null) {
			let cur = cx_ite2.elt;
			let upos = !(cur.posx == cur.pre_posx && cur.posy == cur.pre_posy);
			let urot = cur.pre_rot != cur.rot;
			if(upos) {
				let cx_ite = cur.shapes.head;
				while(cx_ite != null) {
					let s = cx_ite.elt;
					if(s.type == ZPP_Flags.id_ShapeType_POLYGON) {
						s.polygon.invalidate_gverts();
						s.polygon.invalidate_gaxi();
					}
					s.invalidate_worldCOM();
					cx_ite = cx_ite.next;
				}
				cur.zip_worldCOM = true;
			}
			if(urot) {
				cur.zip_axis = true;
				let cx_ite = cur.shapes.head;
				while(cx_ite != null) {
					let s = cx_ite.elt;
					if(s.type == ZPP_Flags.id_ShapeType_POLYGON) {
						s.polygon.invalidate_gverts();
						s.polygon.invalidate_gaxi();
					}
					s.invalidate_worldCOM();
					cx_ite = cx_ite.next;
				}
				cur.zip_worldCOM = true;
			}
			cx_ite2 = cx_ite2.next;
		}
		let cx_ite3 = this.live.head;
		while(cx_ite3 != null) {
			let cur = cx_ite3.elt;
			let upos = !(cur.posx == cur.pre_posx && cur.posy == cur.pre_posy);
			let urot = cur.pre_rot != cur.rot;
			if(upos) {
				let cx_ite = cur.shapes.head;
				while(cx_ite != null) {
					let s = cx_ite.elt;
					if(s.type == ZPP_Flags.id_ShapeType_POLYGON) {
						s.polygon.invalidate_gverts();
						s.polygon.invalidate_gaxi();
					}
					s.invalidate_worldCOM();
					cx_ite = cx_ite.next;
				}
				cur.zip_worldCOM = true;
			}
			if(urot) {
				cur.zip_axis = true;
				let cx_ite = cur.shapes.head;
				while(cx_ite != null) {
					let s = cx_ite.elt;
					if(s.type == ZPP_Flags.id_ShapeType_POLYGON) {
						s.polygon.invalidate_gverts();
						s.polygon.invalidate_gaxi();
					}
					s.invalidate_worldCOM();
					cx_ite = cx_ite.next;
				}
				cur.zip_worldCOM = true;
			}
			cx_ite3 = cx_ite3.next;
		}
		let pre = null;
		let cx_ite4 = this.staticsleep.head;
		while(cx_ite4 != null) {
			let b = cx_ite4.elt;
			if(b.type != ZPP_Flags.id_BodyType_KINEMATIC || b.velx == 0 && b.vely == 0 && b.angvel == 0) {
				if(b.kinematicDelaySleep) {
					b.kinematicDelaySleep = false;
					cx_ite4 = cx_ite4.next;
					continue;
				}
				b.component.sleeping = true;
				let _this = this.staticsleep;
				let old;
				let ret;
				if(pre == null) {
					old = _this.head;
					ret = old.next;
					_this.head = ret;
					if(_this.head == null) {
						_this.pushmod = true;
					}
				} else {
					old = pre.next;
					ret = old.next;
					pre.next = ret;
					if(ret == null) {
						_this.pushmod = true;
					}
				}
				let o = old;
				o.elt = null;
				o.next = ZNPNode_ZPP_Body.zpp_pool;
				ZNPNode_ZPP_Body.zpp_pool = o;
				_this.modified = true;
				_this.length--;
				_this.pushmod = true;
				cx_ite4 = ret;
				continue;
			}
			pre = cx_ite4;
			cx_ite4 = cx_ite4.next;
		}
		this.doForests(deltaTime);
		this.sleepArbiters();
		this.midstep = false;
		let pre1 = null;
		let _gthis = this;
		let cx_ite5 = this.callbackset_list.next;
		while(cx_ite5 != null) {
			let set = cx_ite5;
			if(set.arbiters.head == null) {
				let _this = this.callbackset_list;
				let old;
				let ret;
				if(pre1 == null) {
					old = _this.next;
					ret = old.next;
					_this.next = ret;
					if(_this.next == null) {
						_this.pushmod = true;
					}
				} else {
					old = pre1.next;
					ret = old.next;
					pre1.next = ret;
					if(ret == null) {
						_this.pushmod = true;
					}
				}
				old._inuse = false;
				_this.modified = true;
				_this.length--;
				_this.pushmod = true;
				cx_ite5 = ret;
				let o = set;
				o.int1 = o.int2 = null;
				o.id = o.di = -1;
				o.freed = true;
				o.next = ZPP_CallbackSet.zpp_pool;
				ZPP_CallbackSet.zpp_pool = o;
				continue;
			}
			let ret;
			ret = true;
			let cx_ite = set.arbiters.head;
			while(cx_ite != null) {
				let x = cx_ite.elt;
				if(x.sleeping) {
					cx_ite = cx_ite.next;
					continue;
				} else {
					ret = false;
					break;
				}
			}
			let sleeping = ret;
			let a = set.int1.cbSet;
			let b = set.int2.cbSet;
			let event = ZPP_Flags.id_CbEvent_ONGOING;
			let _this = a.manager;
			let ret1 = null;
			let pairs = a.cbpairs.length < b.cbpairs.length ? a.cbpairs : b.cbpairs;
			let cx_ite1 = pairs.head;
			while(cx_ite1 != null) {
				let p = cx_ite1.elt;
				if(p.a == a && p.b == b || p.a == b && p.b == a) {
					ret1 = p;
					break;
				}
				cx_ite1 = cx_ite1.next;
			}
			if(ret1 == null) {
				let ret;
				if(ZPP_CbSetPair.zpp_pool == null) {
					ret = new ZPP_CbSetPair();
				} else {
					ret = ZPP_CbSetPair.zpp_pool;
					ZPP_CbSetPair.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.zip_listeners = true;
				if(ZPP_CbSet.setlt(a,b)) {
					ret.a = a;
					ret.b = b;
				} else {
					ret.a = b;
					ret.b = a;
				}
				ret1 = ret;
				a.cbpairs.add(ret1);
				if(b != a) {
					b.cbpairs.add(ret1);
				}
			}
			if(ret1.zip_listeners) {
				ret1.zip_listeners = false;
				ret1.__validate();
			}
			let cx_ite2 = ret1.listeners.head;
			while(cx_ite2 != null) {
				let x = cx_ite2.elt;
				if(x.event == event) {
					if((!sleeping || x.allowSleepingCallbacks) && !set.empty_arb(x.itype)) {
						let cb = _gthis.push_callback(x);
						cb.event = ZPP_Flags.id_CbEvent_ONGOING;
						let o1 = set.int1;
						let o2 = set.int2;
						let tmp;
						let _this = x.options1;
						let xs = o1.cbTypes;
						if(_this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes)) {
							let _this = x.options2;
							let xs = o2.cbTypes;
							tmp = _this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes);
						} else {
							tmp = false;
						}
						if(tmp) {
							cb.int1 = o1;
							cb.int2 = o2;
						} else {
							cb.int1 = o2;
							cb.int2 = o1;
						}
						cb.set = set;
					}
				}
				cx_ite2 = cx_ite2.next;
			}
			pre1 = cx_ite5;
			cx_ite5 = cx_ite5.next;
		}
		while(!this.callbacks.empty()) {
			let cb = this.callbacks.pop();
			if(cb.listener.type == ZPP_Flags.id_ListenerType_BODY) {
				let o = cb.listener.body;
				o.handler(cb.wrapper_body());
			} else if(cb.listener.type == ZPP_Flags.id_ListenerType_CONSTRAINT) {
				let o = cb.listener.constraint;
				o.handler(cb.wrapper_con());
			} else if(cb.listener.type == ZPP_Flags.id_ListenerType_INTERACTION) {
				let o = cb.listener.interaction;
				o.handleri(cb.wrapper_int());
			}
			let o = cb;
			o.int1 = o.int2 = null;
			o.body = null;
			o.constraint = null;
			o.listener = null;
			if(o.wrap_arbiters != null) {
				o.wrap_arbiters.zpp_inner.inner = null;
			}
			o.set = null;
			o.next = ZPP_Callback.zpp_pool;
			ZPP_Callback.zpp_pool = o;
		}
	}
	continuousCollisions(deltaTime) {
		let MAX_VEL = 2 * Math.PI / deltaTime;
		this.bphase.broadphase(this,false);
		let curTimeAlpha = 0.0;
		while(curTimeAlpha < 1 && this.toiEvents.head != null) {
			let minTOI = null;
			let minTime = 2.0;
			let minKinematic = false;
			let preMin = null;
			let pre = null;
			let cx_ite = this.toiEvents.head;
			while(cx_ite != null) {
				let toi = cx_ite.elt;
				let b1 = toi.s1.body;
				let b2 = toi.s2.body;
				if(b1.sweepFrozen && b2.sweepFrozen) {
					if(toi.toi != 0 && ZPP_Collide.testCollide_safe(toi.s1,toi.s2)) {
						toi.toi = 0;
					} else {
						cx_ite = this.toiEvents.erase(pre);
						let o = toi;
						o.next = ZPP_ToiEvent.zpp_pool;
						ZPP_ToiEvent.zpp_pool = o;
						continue;
					}
				}
				if(toi.frozen1 != b1.sweepFrozen || toi.frozen2 != b2.sweepFrozen) {
					if(!toi.kinematic) {
						toi.frozen1 = b1.sweepFrozen;
						toi.frozen2 = b2.sweepFrozen;
						if(toi.frozen1) {
							let tmp = toi.s1;
							toi.s1 = toi.s2;
							toi.s2 = tmp;
							toi.frozen1 = false;
							toi.frozen2 = true;
						}
						ZPP_SweepDistance.staticSweep(toi,deltaTime,0,Config.collisionSlopCCD);
						if(toi.toi < 0) {
							cx_ite = this.toiEvents.erase(pre);
							let o = toi;
							o.next = ZPP_ToiEvent.zpp_pool;
							ZPP_ToiEvent.zpp_pool = o;
							continue;
						}
					} else {
						cx_ite = this.toiEvents.erase(pre);
						let o = toi;
						o.next = ZPP_ToiEvent.zpp_pool;
						ZPP_ToiEvent.zpp_pool = o;
						continue;
					}
				}
				if(toi.toi >= 0 && (toi.toi < minTime || !minKinematic && toi.kinematic)) {
					minTOI = toi;
					minTime = toi.toi;
					minKinematic = toi.kinematic;
					preMin = pre;
				}
				pre = cx_ite;
				cx_ite = cx_ite.next;
			}
			if(minTOI == null) {
				break;
			}
			this.toiEvents.erase(preMin);
			curTimeAlpha = minTOI.toi;
			let b1 = minTOI.s1.body;
			let b2 = minTOI.s2.body;
			if(!b1.sweepFrozen) {
				let dt = curTimeAlpha * deltaTime;
				let delta = dt - b1.sweepTime;
				if(delta != 0) {
					b1.sweepTime = dt;
					let t = delta;
					b1.posx += b1.velx * t;
					b1.posy += b1.vely * t;
					if(b1.angvel != 0) {
						let dr = b1.sweep_angvel * delta;
						b1.rot += dr;
						if(dr * dr > 0.0001) {
							b1.axisx = Math.sin(b1.rot);
							b1.axisy = Math.cos(b1.rot);
						} else {
							let d2 = dr * dr;
							let p = 1 - 0.5 * d2;
							let m = 1 - d2 * d2 / 8;
							let nx = (p * b1.axisx + dr * b1.axisy) * m;
							b1.axisy = (p * b1.axisy - dr * b1.axisx) * m;
							b1.axisx = nx;
						}
					}
				}
				let s = minTOI.s1;
				if(s.type == ZPP_Flags.id_ShapeType_CIRCLE) {
					s.worldCOMx = b1.posx + (b1.axisy * s.localCOMx - b1.axisx * s.localCOMy);
					s.worldCOMy = b1.posy + (s.localCOMx * b1.axisx + s.localCOMy * b1.axisy);
				} else {
					let p = s.polygon;
					let li = p.lverts.next;
					let cx_ite = p.gverts.next;
					while(cx_ite != null) {
						let g = cx_ite;
						let l = li;
						li = li.next;
						g.x = b1.posx + (b1.axisy * l.x - b1.axisx * l.y);
						g.y = b1.posy + (l.x * b1.axisx + l.y * b1.axisy);
						cx_ite = cx_ite.next;
					}
					let ite = p.edges.head;
					let cx_ite1 = p.gverts.next;
					let u = cx_ite1;
					cx_ite1 = cx_ite1.next;
					while(cx_ite1 != null) {
						let v = cx_ite1;
						let e = ite.elt;
						ite = ite.next;
						e.gnormx = b1.axisy * e.lnormx - b1.axisx * e.lnormy;
						e.gnormy = e.lnormx * b1.axisx + e.lnormy * b1.axisy;
						e.gprojection = b1.posx * e.gnormx + b1.posy * e.gnormy + e.lprojection;
						e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
						e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
						u = v;
						cx_ite1 = cx_ite1.next;
					}
					let v = p.gverts.next;
					let e = ite.elt;
					ite = ite.next;
					e.gnormx = b1.axisy * e.lnormx - b1.axisx * e.lnormy;
					e.gnormy = e.lnormx * b1.axisx + e.lnormy * b1.axisy;
					e.gprojection = b1.posx * e.gnormx + b1.posy * e.gnormy + e.lprojection;
					e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
					e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
				}
			}
			if(!b2.sweepFrozen) {
				let dt = curTimeAlpha * deltaTime;
				let delta = dt - b2.sweepTime;
				if(delta != 0) {
					b2.sweepTime = dt;
					let t = delta;
					b2.posx += b2.velx * t;
					b2.posy += b2.vely * t;
					if(b2.angvel != 0) {
						let dr = b2.sweep_angvel * delta;
						b2.rot += dr;
						if(dr * dr > 0.0001) {
							b2.axisx = Math.sin(b2.rot);
							b2.axisy = Math.cos(b2.rot);
						} else {
							let d2 = dr * dr;
							let p = 1 - 0.5 * d2;
							let m = 1 - d2 * d2 / 8;
							let nx = (p * b2.axisx + dr * b2.axisy) * m;
							b2.axisy = (p * b2.axisy - dr * b2.axisx) * m;
							b2.axisx = nx;
						}
					}
				}
				let s = minTOI.s2;
				if(s.type == ZPP_Flags.id_ShapeType_CIRCLE) {
					s.worldCOMx = b2.posx + (b2.axisy * s.localCOMx - b2.axisx * s.localCOMy);
					s.worldCOMy = b2.posy + (s.localCOMx * b2.axisx + s.localCOMy * b2.axisy);
				} else {
					let p = s.polygon;
					let li = p.lverts.next;
					let cx_ite = p.gverts.next;
					while(cx_ite != null) {
						let g = cx_ite;
						let l = li;
						li = li.next;
						g.x = b2.posx + (b2.axisy * l.x - b2.axisx * l.y);
						g.y = b2.posy + (l.x * b2.axisx + l.y * b2.axisy);
						cx_ite = cx_ite.next;
					}
					let ite = p.edges.head;
					let cx_ite1 = p.gverts.next;
					let u = cx_ite1;
					cx_ite1 = cx_ite1.next;
					while(cx_ite1 != null) {
						let v = cx_ite1;
						let e = ite.elt;
						ite = ite.next;
						e.gnormx = b2.axisy * e.lnormx - b2.axisx * e.lnormy;
						e.gnormy = e.lnormx * b2.axisx + e.lnormy * b2.axisy;
						e.gprojection = b2.posx * e.gnormx + b2.posy * e.gnormy + e.lprojection;
						e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
						e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
						u = v;
						cx_ite1 = cx_ite1.next;
					}
					let v = p.gverts.next;
					let e = ite.elt;
					ite = ite.next;
					e.gnormx = b2.axisy * e.lnormx - b2.axisx * e.lnormy;
					e.gnormy = e.lnormx * b2.axisx + e.lnormy * b2.axisy;
					e.gprojection = b2.posx * e.gnormx + b2.posy * e.gnormy + e.lprojection;
					e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
					e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
				}
			}
			let wasnull = minTOI.arbiter == null;
			let arb = this.narrowPhase(minTOI.s1,minTOI.s2,true,minTOI.arbiter,true);
			if(arb == null) {
				if(minTOI.arbiter != null && minTOI.arbiter.pair != null) {
					minTOI.arbiter.pair.arb = null;
					minTOI.arbiter.pair = null;
				}
			} else if(!this.presteparb(arb,deltaTime,true)) {
				if(arb.type == ZPP_Arbiter.COL && (arb.active && (arb.immState & ZPP_Flags.id_ImmState_ACCEPT) != 0)) {
					let _this = arb.colarb;
					let jx = _this.nx * _this.c1.jnAcc - _this.ny * _this.c1.jtAcc;
					let jy = _this.ny * _this.c1.jnAcc + _this.nx * _this.c1.jtAcc;
					let t = _this.b1.imass;
					_this.b1.velx -= jx * t;
					_this.b1.vely -= jy * t;
					_this.b1.angvel -= _this.b1.iinertia * (jy * _this.c1.r1x - jx * _this.c1.r1y);
					let t1 = _this.b2.imass;
					_this.b2.velx += jx * t1;
					_this.b2.vely += jy * t1;
					_this.b2.angvel += _this.b2.iinertia * (jy * _this.c1.r2x - jx * _this.c1.r2y);
					if(_this.hc2) {
						let jx = _this.nx * _this.c2.jnAcc - _this.ny * _this.c2.jtAcc;
						let jy = _this.ny * _this.c2.jnAcc + _this.nx * _this.c2.jtAcc;
						let t = _this.b1.imass;
						_this.b1.velx -= jx * t;
						_this.b1.vely -= jy * t;
						_this.b1.angvel -= _this.b1.iinertia * (jy * _this.c2.r1x - jx * _this.c2.r1y);
						let t1 = _this.b2.imass;
						_this.b2.velx += jx * t1;
						_this.b2.vely += jy * t1;
						_this.b2.angvel += _this.b2.iinertia * (jy * _this.c2.r2x - jx * _this.c2.r2y);
					}
					_this.b2.angvel += _this.jrAcc * _this.b2.iinertia;
					_this.b1.angvel -= _this.jrAcc * _this.b1.iinertia;
					let _this1 = arb.colarb;
					let v1x = _this1.k1x + _this1.b2.velx - _this1.c1.r2y * _this1.b2.angvel - (_this1.b1.velx - _this1.c1.r1y * _this1.b1.angvel);
					let v1y = _this1.k1y + _this1.b2.vely + _this1.c1.r2x * _this1.b2.angvel - (_this1.b1.vely + _this1.c1.r1x * _this1.b1.angvel);
					let j = (v1y * _this1.nx - v1x * _this1.ny + _this1.surfacex) * _this1.c1.tMass;
					let jMax = _this1.c1.friction * _this1.c1.jnAcc;
					let jOld = _this1.c1.jtAcc;
					let cjAcc = jOld - j;
					if(cjAcc > jMax) {
						cjAcc = jMax;
					} else if(cjAcc < -jMax) {
						cjAcc = -jMax;
					}
					j = cjAcc - jOld;
					_this1.c1.jtAcc = cjAcc;
					let jx1 = -_this1.ny * j;
					let jy1 = _this1.nx * j;
					_this1.b2.velx += jx1 * _this1.b2.imass;
					_this1.b2.vely += jy1 * _this1.b2.imass;
					_this1.b1.velx -= jx1 * _this1.b1.imass;
					_this1.b1.vely -= jy1 * _this1.b1.imass;
					_this1.b2.angvel += _this1.rt1b * j * _this1.b2.iinertia;
					_this1.b1.angvel -= _this1.rt1a * j * _this1.b1.iinertia;
					if(_this1.hc2) {
						let v2x = _this1.k2x + _this1.b2.velx - _this1.c2.r2y * _this1.b2.angvel - (_this1.b1.velx - _this1.c2.r1y * _this1.b1.angvel);
						let v2y = _this1.k2y + _this1.b2.vely + _this1.c2.r2x * _this1.b2.angvel - (_this1.b1.vely + _this1.c2.r1x * _this1.b1.angvel);
						j = (v2y * _this1.nx - v2x * _this1.ny + _this1.surfacex) * _this1.c2.tMass;
						jMax = _this1.c2.friction * _this1.c2.jnAcc;
						jOld = _this1.c2.jtAcc;
						cjAcc = jOld - j;
						if(cjAcc > jMax) {
							cjAcc = jMax;
						} else if(cjAcc < -jMax) {
							cjAcc = -jMax;
						}
						j = cjAcc - jOld;
						_this1.c2.jtAcc = cjAcc;
						jx1 = -_this1.ny * j;
						jy1 = _this1.nx * j;
						_this1.b2.velx += jx1 * _this1.b2.imass;
						_this1.b2.vely += jy1 * _this1.b2.imass;
						_this1.b1.velx -= jx1 * _this1.b1.imass;
						_this1.b1.vely -= jy1 * _this1.b1.imass;
						_this1.b2.angvel += _this1.rt2b * j * _this1.b2.iinertia;
						_this1.b1.angvel -= _this1.rt2a * j * _this1.b1.iinertia;
						v1x = _this1.k1x + _this1.b2.velx - _this1.c1.r2y * _this1.b2.angvel - (_this1.b1.velx - _this1.c1.r1y * _this1.b1.angvel);
						v1y = _this1.k1y + _this1.b2.vely + _this1.c1.r2x * _this1.b2.angvel - (_this1.b1.vely + _this1.c1.r1x * _this1.b1.angvel);
						v2x = _this1.k2x + _this1.b2.velx - _this1.c2.r2y * _this1.b2.angvel - (_this1.b1.velx - _this1.c2.r1y * _this1.b1.angvel);
						v2y = _this1.k2y + _this1.b2.vely + _this1.c2.r2x * _this1.b2.angvel - (_this1.b1.vely + _this1.c2.r1x * _this1.b1.angvel);
						let ax = _this1.c1.jnAcc;
						let ay = _this1.c2.jnAcc;
						let jnx = v1x * _this1.nx + v1y * _this1.ny + _this1.surfacey + _this1.c1.bounce - (_this1.Ka * ax + _this1.Kb * ay);
						let jny = v2x * _this1.nx + v2y * _this1.ny + _this1.surfacey + _this1.c2.bounce - (_this1.Kb * ax + _this1.Kc * ay);
						let xx = -(_this1.kMassa * jnx + _this1.kMassb * jny);
						let xy = -(_this1.kMassb * jnx + _this1.kMassc * jny);
						if(xx >= 0 && xy >= 0) {
							jnx = xx - ax;
							jny = xy - ay;
							_this1.c1.jnAcc = xx;
							_this1.c2.jnAcc = xy;
						} else {
							xx = -_this1.c1.nMass * jnx;
							if(xx >= 0 && _this1.Kb * xx + jny >= 0) {
								jnx = xx - ax;
								jny = -ay;
								_this1.c1.jnAcc = xx;
								_this1.c2.jnAcc = 0;
							} else {
								xy = -_this1.c2.nMass * jny;
								if(xy >= 0 && _this1.Kb * xy + jnx >= 0) {
									jnx = -ax;
									jny = xy - ay;
									_this1.c1.jnAcc = 0;
									_this1.c2.jnAcc = xy;
								} else if(jnx >= 0 && jny >= 0) {
									jnx = -ax;
									jny = -ay;
									_this1.c1.jnAcc = _this1.c2.jnAcc = 0;
								} else {
									jnx = 0;
									jny = 0;
								}
							}
						}
						j = jnx + jny;
						jx1 = _this1.nx * j;
						jy1 = _this1.ny * j;
						_this1.b2.velx += jx1 * _this1.b2.imass;
						_this1.b2.vely += jy1 * _this1.b2.imass;
						_this1.b1.velx -= jx1 * _this1.b1.imass;
						_this1.b1.vely -= jy1 * _this1.b1.imass;
						_this1.b2.angvel += (_this1.rn1b * jnx + _this1.rn2b * jny) * _this1.b2.iinertia;
						_this1.b1.angvel -= (_this1.rn1a * jnx + _this1.rn2a * jny) * _this1.b1.iinertia;
					} else {
						if(_this1.radius != 0.0) {
							let dw = _this1.b2.angvel - _this1.b1.angvel;
							j = dw * _this1.rMass;
							jMax = _this1.rfric * _this1.c1.jnAcc;
							jOld = _this1.jrAcc;
							_this1.jrAcc -= j;
							if(_this1.jrAcc > jMax) {
								_this1.jrAcc = jMax;
							} else if(_this1.jrAcc < -jMax) {
								_this1.jrAcc = -jMax;
							}
							j = _this1.jrAcc - jOld;
							_this1.b2.angvel += j * _this1.b2.iinertia;
							_this1.b1.angvel -= j * _this1.b1.iinertia;
						}
						v1x = _this1.k1x + _this1.b2.velx - _this1.c1.r2y * _this1.b2.angvel - (_this1.b1.velx - _this1.c1.r1y * _this1.b1.angvel);
						v1y = _this1.k1y + _this1.b2.vely + _this1.c1.r2x * _this1.b2.angvel - (_this1.b1.vely + _this1.c1.r1x * _this1.b1.angvel);
						j = (_this1.c1.bounce + (_this1.nx * v1x + _this1.ny * v1y) + _this1.surfacey) * _this1.c1.nMass;
						jOld = _this1.c1.jnAcc;
						cjAcc = jOld - j;
						if(cjAcc < 0.0) {
							cjAcc = 0.0;
						}
						j = cjAcc - jOld;
						_this1.c1.jnAcc = cjAcc;
						jx1 = _this1.nx * j;
						jy1 = _this1.ny * j;
						_this1.b2.velx += jx1 * _this1.b2.imass;
						_this1.b2.vely += jy1 * _this1.b2.imass;
						_this1.b1.velx -= jx1 * _this1.b1.imass;
						_this1.b1.vely -= jy1 * _this1.b1.imass;
						_this1.b2.angvel += _this1.rn1b * j * _this1.b2.iinertia;
						_this1.b1.angvel -= _this1.rn1a * j * _this1.b1.iinertia;
					}
					let _this2 = arb.colarb;
					let v1x1 = _this2.k1x + _this2.b2.velx - _this2.c1.r2y * _this2.b2.angvel - (_this2.b1.velx - _this2.c1.r1y * _this2.b1.angvel);
					let v1y1 = _this2.k1y + _this2.b2.vely + _this2.c1.r2x * _this2.b2.angvel - (_this2.b1.vely + _this2.c1.r1x * _this2.b1.angvel);
					let j1 = (v1y1 * _this2.nx - v1x1 * _this2.ny + _this2.surfacex) * _this2.c1.tMass;
					let jMax1 = _this2.c1.friction * _this2.c1.jnAcc;
					let jOld1 = _this2.c1.jtAcc;
					let cjAcc1 = jOld1 - j1;
					if(cjAcc1 > jMax1) {
						cjAcc1 = jMax1;
					} else if(cjAcc1 < -jMax1) {
						cjAcc1 = -jMax1;
					}
					j1 = cjAcc1 - jOld1;
					_this2.c1.jtAcc = cjAcc1;
					let jx2 = -_this2.ny * j1;
					let jy2 = _this2.nx * j1;
					_this2.b2.velx += jx2 * _this2.b2.imass;
					_this2.b2.vely += jy2 * _this2.b2.imass;
					_this2.b1.velx -= jx2 * _this2.b1.imass;
					_this2.b1.vely -= jy2 * _this2.b1.imass;
					_this2.b2.angvel += _this2.rt1b * j1 * _this2.b2.iinertia;
					_this2.b1.angvel -= _this2.rt1a * j1 * _this2.b1.iinertia;
					if(_this2.hc2) {
						let v2x = _this2.k2x + _this2.b2.velx - _this2.c2.r2y * _this2.b2.angvel - (_this2.b1.velx - _this2.c2.r1y * _this2.b1.angvel);
						let v2y = _this2.k2y + _this2.b2.vely + _this2.c2.r2x * _this2.b2.angvel - (_this2.b1.vely + _this2.c2.r1x * _this2.b1.angvel);
						j1 = (v2y * _this2.nx - v2x * _this2.ny + _this2.surfacex) * _this2.c2.tMass;
						jMax1 = _this2.c2.friction * _this2.c2.jnAcc;
						jOld1 = _this2.c2.jtAcc;
						cjAcc1 = jOld1 - j1;
						if(cjAcc1 > jMax1) {
							cjAcc1 = jMax1;
						} else if(cjAcc1 < -jMax1) {
							cjAcc1 = -jMax1;
						}
						j1 = cjAcc1 - jOld1;
						_this2.c2.jtAcc = cjAcc1;
						jx2 = -_this2.ny * j1;
						jy2 = _this2.nx * j1;
						_this2.b2.velx += jx2 * _this2.b2.imass;
						_this2.b2.vely += jy2 * _this2.b2.imass;
						_this2.b1.velx -= jx2 * _this2.b1.imass;
						_this2.b1.vely -= jy2 * _this2.b1.imass;
						_this2.b2.angvel += _this2.rt2b * j1 * _this2.b2.iinertia;
						_this2.b1.angvel -= _this2.rt2a * j1 * _this2.b1.iinertia;
						v1x1 = _this2.k1x + _this2.b2.velx - _this2.c1.r2y * _this2.b2.angvel - (_this2.b1.velx - _this2.c1.r1y * _this2.b1.angvel);
						v1y1 = _this2.k1y + _this2.b2.vely + _this2.c1.r2x * _this2.b2.angvel - (_this2.b1.vely + _this2.c1.r1x * _this2.b1.angvel);
						v2x = _this2.k2x + _this2.b2.velx - _this2.c2.r2y * _this2.b2.angvel - (_this2.b1.velx - _this2.c2.r1y * _this2.b1.angvel);
						v2y = _this2.k2y + _this2.b2.vely + _this2.c2.r2x * _this2.b2.angvel - (_this2.b1.vely + _this2.c2.r1x * _this2.b1.angvel);
						let ax = _this2.c1.jnAcc;
						let ay = _this2.c2.jnAcc;
						let jnx = v1x1 * _this2.nx + v1y1 * _this2.ny + _this2.surfacey + _this2.c1.bounce - (_this2.Ka * ax + _this2.Kb * ay);
						let jny = v2x * _this2.nx + v2y * _this2.ny + _this2.surfacey + _this2.c2.bounce - (_this2.Kb * ax + _this2.Kc * ay);
						let xx = -(_this2.kMassa * jnx + _this2.kMassb * jny);
						let xy = -(_this2.kMassb * jnx + _this2.kMassc * jny);
						if(xx >= 0 && xy >= 0) {
							jnx = xx - ax;
							jny = xy - ay;
							_this2.c1.jnAcc = xx;
							_this2.c2.jnAcc = xy;
						} else {
							xx = -_this2.c1.nMass * jnx;
							if(xx >= 0 && _this2.Kb * xx + jny >= 0) {
								jnx = xx - ax;
								jny = -ay;
								_this2.c1.jnAcc = xx;
								_this2.c2.jnAcc = 0;
							} else {
								xy = -_this2.c2.nMass * jny;
								if(xy >= 0 && _this2.Kb * xy + jnx >= 0) {
									jnx = -ax;
									jny = xy - ay;
									_this2.c1.jnAcc = 0;
									_this2.c2.jnAcc = xy;
								} else if(jnx >= 0 && jny >= 0) {
									jnx = -ax;
									jny = -ay;
									_this2.c1.jnAcc = _this2.c2.jnAcc = 0;
								} else {
									jnx = 0;
									jny = 0;
								}
							}
						}
						j1 = jnx + jny;
						jx2 = _this2.nx * j1;
						jy2 = _this2.ny * j1;
						_this2.b2.velx += jx2 * _this2.b2.imass;
						_this2.b2.vely += jy2 * _this2.b2.imass;
						_this2.b1.velx -= jx2 * _this2.b1.imass;
						_this2.b1.vely -= jy2 * _this2.b1.imass;
						_this2.b2.angvel += (_this2.rn1b * jnx + _this2.rn2b * jny) * _this2.b2.iinertia;
						_this2.b1.angvel -= (_this2.rn1a * jnx + _this2.rn2a * jny) * _this2.b1.iinertia;
					} else {
						if(_this2.radius != 0.0) {
							let dw = _this2.b2.angvel - _this2.b1.angvel;
							j1 = dw * _this2.rMass;
							jMax1 = _this2.rfric * _this2.c1.jnAcc;
							jOld1 = _this2.jrAcc;
							_this2.jrAcc -= j1;
							if(_this2.jrAcc > jMax1) {
								_this2.jrAcc = jMax1;
							} else if(_this2.jrAcc < -jMax1) {
								_this2.jrAcc = -jMax1;
							}
							j1 = _this2.jrAcc - jOld1;
							_this2.b2.angvel += j1 * _this2.b2.iinertia;
							_this2.b1.angvel -= j1 * _this2.b1.iinertia;
						}
						v1x1 = _this2.k1x + _this2.b2.velx - _this2.c1.r2y * _this2.b2.angvel - (_this2.b1.velx - _this2.c1.r1y * _this2.b1.angvel);
						v1y1 = _this2.k1y + _this2.b2.vely + _this2.c1.r2x * _this2.b2.angvel - (_this2.b1.vely + _this2.c1.r1x * _this2.b1.angvel);
						j1 = (_this2.c1.bounce + (_this2.nx * v1x1 + _this2.ny * v1y1) + _this2.surfacey) * _this2.c1.nMass;
						jOld1 = _this2.c1.jnAcc;
						cjAcc1 = jOld1 - j1;
						if(cjAcc1 < 0.0) {
							cjAcc1 = 0.0;
						}
						j1 = cjAcc1 - jOld1;
						_this2.c1.jnAcc = cjAcc1;
						jx2 = _this2.nx * j1;
						jy2 = _this2.ny * j1;
						_this2.b2.velx += jx2 * _this2.b2.imass;
						_this2.b2.vely += jy2 * _this2.b2.imass;
						_this2.b1.velx -= jx2 * _this2.b1.imass;
						_this2.b1.vely -= jy2 * _this2.b1.imass;
						_this2.b2.angvel += _this2.rn1b * j1 * _this2.b2.iinertia;
						_this2.b1.angvel -= _this2.rn1a * j1 * _this2.b1.iinertia;
					}
					let _this3 = arb.colarb;
					let v1x2 = _this3.k1x + _this3.b2.velx - _this3.c1.r2y * _this3.b2.angvel - (_this3.b1.velx - _this3.c1.r1y * _this3.b1.angvel);
					let v1y2 = _this3.k1y + _this3.b2.vely + _this3.c1.r2x * _this3.b2.angvel - (_this3.b1.vely + _this3.c1.r1x * _this3.b1.angvel);
					let j2 = (v1y2 * _this3.nx - v1x2 * _this3.ny + _this3.surfacex) * _this3.c1.tMass;
					let jMax2 = _this3.c1.friction * _this3.c1.jnAcc;
					let jOld2 = _this3.c1.jtAcc;
					let cjAcc2 = jOld2 - j2;
					if(cjAcc2 > jMax2) {
						cjAcc2 = jMax2;
					} else if(cjAcc2 < -jMax2) {
						cjAcc2 = -jMax2;
					}
					j2 = cjAcc2 - jOld2;
					_this3.c1.jtAcc = cjAcc2;
					let jx3 = -_this3.ny * j2;
					let jy3 = _this3.nx * j2;
					_this3.b2.velx += jx3 * _this3.b2.imass;
					_this3.b2.vely += jy3 * _this3.b2.imass;
					_this3.b1.velx -= jx3 * _this3.b1.imass;
					_this3.b1.vely -= jy3 * _this3.b1.imass;
					_this3.b2.angvel += _this3.rt1b * j2 * _this3.b2.iinertia;
					_this3.b1.angvel -= _this3.rt1a * j2 * _this3.b1.iinertia;
					if(_this3.hc2) {
						let v2x = _this3.k2x + _this3.b2.velx - _this3.c2.r2y * _this3.b2.angvel - (_this3.b1.velx - _this3.c2.r1y * _this3.b1.angvel);
						let v2y = _this3.k2y + _this3.b2.vely + _this3.c2.r2x * _this3.b2.angvel - (_this3.b1.vely + _this3.c2.r1x * _this3.b1.angvel);
						j2 = (v2y * _this3.nx - v2x * _this3.ny + _this3.surfacex) * _this3.c2.tMass;
						jMax2 = _this3.c2.friction * _this3.c2.jnAcc;
						jOld2 = _this3.c2.jtAcc;
						cjAcc2 = jOld2 - j2;
						if(cjAcc2 > jMax2) {
							cjAcc2 = jMax2;
						} else if(cjAcc2 < -jMax2) {
							cjAcc2 = -jMax2;
						}
						j2 = cjAcc2 - jOld2;
						_this3.c2.jtAcc = cjAcc2;
						jx3 = -_this3.ny * j2;
						jy3 = _this3.nx * j2;
						_this3.b2.velx += jx3 * _this3.b2.imass;
						_this3.b2.vely += jy3 * _this3.b2.imass;
						_this3.b1.velx -= jx3 * _this3.b1.imass;
						_this3.b1.vely -= jy3 * _this3.b1.imass;
						_this3.b2.angvel += _this3.rt2b * j2 * _this3.b2.iinertia;
						_this3.b1.angvel -= _this3.rt2a * j2 * _this3.b1.iinertia;
						v1x2 = _this3.k1x + _this3.b2.velx - _this3.c1.r2y * _this3.b2.angvel - (_this3.b1.velx - _this3.c1.r1y * _this3.b1.angvel);
						v1y2 = _this3.k1y + _this3.b2.vely + _this3.c1.r2x * _this3.b2.angvel - (_this3.b1.vely + _this3.c1.r1x * _this3.b1.angvel);
						v2x = _this3.k2x + _this3.b2.velx - _this3.c2.r2y * _this3.b2.angvel - (_this3.b1.velx - _this3.c2.r1y * _this3.b1.angvel);
						v2y = _this3.k2y + _this3.b2.vely + _this3.c2.r2x * _this3.b2.angvel - (_this3.b1.vely + _this3.c2.r1x * _this3.b1.angvel);
						let ax = _this3.c1.jnAcc;
						let ay = _this3.c2.jnAcc;
						let jnx = v1x2 * _this3.nx + v1y2 * _this3.ny + _this3.surfacey + _this3.c1.bounce - (_this3.Ka * ax + _this3.Kb * ay);
						let jny = v2x * _this3.nx + v2y * _this3.ny + _this3.surfacey + _this3.c2.bounce - (_this3.Kb * ax + _this3.Kc * ay);
						let xx = -(_this3.kMassa * jnx + _this3.kMassb * jny);
						let xy = -(_this3.kMassb * jnx + _this3.kMassc * jny);
						if(xx >= 0 && xy >= 0) {
							jnx = xx - ax;
							jny = xy - ay;
							_this3.c1.jnAcc = xx;
							_this3.c2.jnAcc = xy;
						} else {
							xx = -_this3.c1.nMass * jnx;
							if(xx >= 0 && _this3.Kb * xx + jny >= 0) {
								jnx = xx - ax;
								jny = -ay;
								_this3.c1.jnAcc = xx;
								_this3.c2.jnAcc = 0;
							} else {
								xy = -_this3.c2.nMass * jny;
								if(xy >= 0 && _this3.Kb * xy + jnx >= 0) {
									jnx = -ax;
									jny = xy - ay;
									_this3.c1.jnAcc = 0;
									_this3.c2.jnAcc = xy;
								} else if(jnx >= 0 && jny >= 0) {
									jnx = -ax;
									jny = -ay;
									_this3.c1.jnAcc = _this3.c2.jnAcc = 0;
								} else {
									jnx = 0;
									jny = 0;
								}
							}
						}
						j2 = jnx + jny;
						jx3 = _this3.nx * j2;
						jy3 = _this3.ny * j2;
						_this3.b2.velx += jx3 * _this3.b2.imass;
						_this3.b2.vely += jy3 * _this3.b2.imass;
						_this3.b1.velx -= jx3 * _this3.b1.imass;
						_this3.b1.vely -= jy3 * _this3.b1.imass;
						_this3.b2.angvel += (_this3.rn1b * jnx + _this3.rn2b * jny) * _this3.b2.iinertia;
						_this3.b1.angvel -= (_this3.rn1a * jnx + _this3.rn2a * jny) * _this3.b1.iinertia;
					} else {
						if(_this3.radius != 0.0) {
							let dw = _this3.b2.angvel - _this3.b1.angvel;
							j2 = dw * _this3.rMass;
							jMax2 = _this3.rfric * _this3.c1.jnAcc;
							jOld2 = _this3.jrAcc;
							_this3.jrAcc -= j2;
							if(_this3.jrAcc > jMax2) {
								_this3.jrAcc = jMax2;
							} else if(_this3.jrAcc < -jMax2) {
								_this3.jrAcc = -jMax2;
							}
							j2 = _this3.jrAcc - jOld2;
							_this3.b2.angvel += j2 * _this3.b2.iinertia;
							_this3.b1.angvel -= j2 * _this3.b1.iinertia;
						}
						v1x2 = _this3.k1x + _this3.b2.velx - _this3.c1.r2y * _this3.b2.angvel - (_this3.b1.velx - _this3.c1.r1y * _this3.b1.angvel);
						v1y2 = _this3.k1y + _this3.b2.vely + _this3.c1.r2x * _this3.b2.angvel - (_this3.b1.vely + _this3.c1.r1x * _this3.b1.angvel);
						j2 = (_this3.c1.bounce + (_this3.nx * v1x2 + _this3.ny * v1y2) + _this3.surfacey) * _this3.c1.nMass;
						jOld2 = _this3.c1.jnAcc;
						cjAcc2 = jOld2 - j2;
						if(cjAcc2 < 0.0) {
							cjAcc2 = 0.0;
						}
						j2 = cjAcc2 - jOld2;
						_this3.c1.jnAcc = cjAcc2;
						jx3 = _this3.nx * j2;
						jy3 = _this3.ny * j2;
						_this3.b2.velx += jx3 * _this3.b2.imass;
						_this3.b2.vely += jy3 * _this3.b2.imass;
						_this3.b1.velx -= jx3 * _this3.b1.imass;
						_this3.b1.vely -= jy3 * _this3.b1.imass;
						_this3.b2.angvel += _this3.rn1b * j2 * _this3.b2.iinertia;
						_this3.b1.angvel -= _this3.rn1a * j2 * _this3.b1.iinertia;
					}
					let _this4 = arb.colarb;
					let v1x3 = _this4.k1x + _this4.b2.velx - _this4.c1.r2y * _this4.b2.angvel - (_this4.b1.velx - _this4.c1.r1y * _this4.b1.angvel);
					let v1y3 = _this4.k1y + _this4.b2.vely + _this4.c1.r2x * _this4.b2.angvel - (_this4.b1.vely + _this4.c1.r1x * _this4.b1.angvel);
					let j3 = (v1y3 * _this4.nx - v1x3 * _this4.ny + _this4.surfacex) * _this4.c1.tMass;
					let jMax3 = _this4.c1.friction * _this4.c1.jnAcc;
					let jOld3 = _this4.c1.jtAcc;
					let cjAcc3 = jOld3 - j3;
					if(cjAcc3 > jMax3) {
						cjAcc3 = jMax3;
					} else if(cjAcc3 < -jMax3) {
						cjAcc3 = -jMax3;
					}
					j3 = cjAcc3 - jOld3;
					_this4.c1.jtAcc = cjAcc3;
					let jx4 = -_this4.ny * j3;
					let jy4 = _this4.nx * j3;
					_this4.b2.velx += jx4 * _this4.b2.imass;
					_this4.b2.vely += jy4 * _this4.b2.imass;
					_this4.b1.velx -= jx4 * _this4.b1.imass;
					_this4.b1.vely -= jy4 * _this4.b1.imass;
					_this4.b2.angvel += _this4.rt1b * j3 * _this4.b2.iinertia;
					_this4.b1.angvel -= _this4.rt1a * j3 * _this4.b1.iinertia;
					if(_this4.hc2) {
						let v2x = _this4.k2x + _this4.b2.velx - _this4.c2.r2y * _this4.b2.angvel - (_this4.b1.velx - _this4.c2.r1y * _this4.b1.angvel);
						let v2y = _this4.k2y + _this4.b2.vely + _this4.c2.r2x * _this4.b2.angvel - (_this4.b1.vely + _this4.c2.r1x * _this4.b1.angvel);
						j3 = (v2y * _this4.nx - v2x * _this4.ny + _this4.surfacex) * _this4.c2.tMass;
						jMax3 = _this4.c2.friction * _this4.c2.jnAcc;
						jOld3 = _this4.c2.jtAcc;
						cjAcc3 = jOld3 - j3;
						if(cjAcc3 > jMax3) {
							cjAcc3 = jMax3;
						} else if(cjAcc3 < -jMax3) {
							cjAcc3 = -jMax3;
						}
						j3 = cjAcc3 - jOld3;
						_this4.c2.jtAcc = cjAcc3;
						jx4 = -_this4.ny * j3;
						jy4 = _this4.nx * j3;
						_this4.b2.velx += jx4 * _this4.b2.imass;
						_this4.b2.vely += jy4 * _this4.b2.imass;
						_this4.b1.velx -= jx4 * _this4.b1.imass;
						_this4.b1.vely -= jy4 * _this4.b1.imass;
						_this4.b2.angvel += _this4.rt2b * j3 * _this4.b2.iinertia;
						_this4.b1.angvel -= _this4.rt2a * j3 * _this4.b1.iinertia;
						v1x3 = _this4.k1x + _this4.b2.velx - _this4.c1.r2y * _this4.b2.angvel - (_this4.b1.velx - _this4.c1.r1y * _this4.b1.angvel);
						v1y3 = _this4.k1y + _this4.b2.vely + _this4.c1.r2x * _this4.b2.angvel - (_this4.b1.vely + _this4.c1.r1x * _this4.b1.angvel);
						v2x = _this4.k2x + _this4.b2.velx - _this4.c2.r2y * _this4.b2.angvel - (_this4.b1.velx - _this4.c2.r1y * _this4.b1.angvel);
						v2y = _this4.k2y + _this4.b2.vely + _this4.c2.r2x * _this4.b2.angvel - (_this4.b1.vely + _this4.c2.r1x * _this4.b1.angvel);
						let ax = _this4.c1.jnAcc;
						let ay = _this4.c2.jnAcc;
						let jnx = v1x3 * _this4.nx + v1y3 * _this4.ny + _this4.surfacey + _this4.c1.bounce - (_this4.Ka * ax + _this4.Kb * ay);
						let jny = v2x * _this4.nx + v2y * _this4.ny + _this4.surfacey + _this4.c2.bounce - (_this4.Kb * ax + _this4.Kc * ay);
						let xx = -(_this4.kMassa * jnx + _this4.kMassb * jny);
						let xy = -(_this4.kMassb * jnx + _this4.kMassc * jny);
						if(xx >= 0 && xy >= 0) {
							jnx = xx - ax;
							jny = xy - ay;
							_this4.c1.jnAcc = xx;
							_this4.c2.jnAcc = xy;
						} else {
							xx = -_this4.c1.nMass * jnx;
							if(xx >= 0 && _this4.Kb * xx + jny >= 0) {
								jnx = xx - ax;
								jny = -ay;
								_this4.c1.jnAcc = xx;
								_this4.c2.jnAcc = 0;
							} else {
								xy = -_this4.c2.nMass * jny;
								if(xy >= 0 && _this4.Kb * xy + jnx >= 0) {
									jnx = -ax;
									jny = xy - ay;
									_this4.c1.jnAcc = 0;
									_this4.c2.jnAcc = xy;
								} else if(jnx >= 0 && jny >= 0) {
									jnx = -ax;
									jny = -ay;
									_this4.c1.jnAcc = _this4.c2.jnAcc = 0;
								} else {
									jnx = 0;
									jny = 0;
								}
							}
						}
						j3 = jnx + jny;
						jx4 = _this4.nx * j3;
						jy4 = _this4.ny * j3;
						_this4.b2.velx += jx4 * _this4.b2.imass;
						_this4.b2.vely += jy4 * _this4.b2.imass;
						_this4.b1.velx -= jx4 * _this4.b1.imass;
						_this4.b1.vely -= jy4 * _this4.b1.imass;
						_this4.b2.angvel += (_this4.rn1b * jnx + _this4.rn2b * jny) * _this4.b2.iinertia;
						_this4.b1.angvel -= (_this4.rn1a * jnx + _this4.rn2a * jny) * _this4.b1.iinertia;
					} else {
						if(_this4.radius != 0.0) {
							let dw = _this4.b2.angvel - _this4.b1.angvel;
							j3 = dw * _this4.rMass;
							jMax3 = _this4.rfric * _this4.c1.jnAcc;
							jOld3 = _this4.jrAcc;
							_this4.jrAcc -= j3;
							if(_this4.jrAcc > jMax3) {
								_this4.jrAcc = jMax3;
							} else if(_this4.jrAcc < -jMax3) {
								_this4.jrAcc = -jMax3;
							}
							j3 = _this4.jrAcc - jOld3;
							_this4.b2.angvel += j3 * _this4.b2.iinertia;
							_this4.b1.angvel -= j3 * _this4.b1.iinertia;
						}
						v1x3 = _this4.k1x + _this4.b2.velx - _this4.c1.r2y * _this4.b2.angvel - (_this4.b1.velx - _this4.c1.r1y * _this4.b1.angvel);
						v1y3 = _this4.k1y + _this4.b2.vely + _this4.c1.r2x * _this4.b2.angvel - (_this4.b1.vely + _this4.c1.r1x * _this4.b1.angvel);
						j3 = (_this4.c1.bounce + (_this4.nx * v1x3 + _this4.ny * v1y3) + _this4.surfacey) * _this4.c1.nMass;
						jOld3 = _this4.c1.jnAcc;
						cjAcc3 = jOld3 - j3;
						if(cjAcc3 < 0.0) {
							cjAcc3 = 0.0;
						}
						j3 = cjAcc3 - jOld3;
						_this4.c1.jnAcc = cjAcc3;
						jx4 = _this4.nx * j3;
						jy4 = _this4.ny * j3;
						_this4.b2.velx += jx4 * _this4.b2.imass;
						_this4.b2.vely += jy4 * _this4.b2.imass;
						_this4.b1.velx -= jx4 * _this4.b1.imass;
						_this4.b1.vely -= jy4 * _this4.b1.imass;
						_this4.b2.angvel += _this4.rn1b * j3 * _this4.b2.iinertia;
						_this4.b1.angvel -= _this4.rn1a * j3 * _this4.b1.iinertia;
					}
					b1.sweep_angvel = b1.angvel % MAX_VEL;
					b2.sweep_angvel = b2.angvel % MAX_VEL;
				}
			}
			if(arb != null && (arb.active && (arb.immState & ZPP_Flags.id_ImmState_ACCEPT) != 0) && arb.type == ZPP_Arbiter.COL) {
				if(!b1.sweepFrozen && b1.type != ZPP_Flags.id_BodyType_KINEMATIC) {
					b1.sweepFrozen = true;
					if(minTOI.failed) {
						b1.angvel = b1.sweep_angvel = 0;
					} else if(minTOI.slipped) {
						let b11 = b1;
						b11.sweep_angvel *= Config.angularCCDSlipScale;
						b1.angvel = b11.sweep_angvel;
					} else {
						b1.angvel = b1.sweep_angvel;
					}
				}
				if(!b2.sweepFrozen && b2.type != ZPP_Flags.id_BodyType_KINEMATIC) {
					b2.sweepFrozen = true;
					if(minTOI.failed) {
						b2.angvel = b2.sweep_angvel = 0;
					} else if(minTOI.slipped) {
						let b21 = b2;
						b21.sweep_angvel *= Config.angularCCDSlipScale;
						b2.angvel = b21.sweep_angvel;
					} else {
						b2.angvel = b2.sweep_angvel;
					}
				}
			}
			let o = minTOI;
			o.next = ZPP_ToiEvent.zpp_pool;
			ZPP_ToiEvent.zpp_pool = o;
		}
		while(this.toiEvents.head != null) {
			let toi = this.toiEvents.pop_unsafe();
			let o = toi;
			o.next = ZPP_ToiEvent.zpp_pool;
			ZPP_ToiEvent.zpp_pool = o;
		}
		let cx_ite = this.kinematics.head;
		while(cx_ite != null) {
			let cur = cx_ite.elt;
			let delta = deltaTime - cur.sweepTime;
			if(delta != 0) {
				cur.sweepTime = deltaTime;
				let t = delta;
				cur.posx += cur.velx * t;
				cur.posy += cur.vely * t;
				if(cur.angvel != 0) {
					let dr = cur.sweep_angvel * delta;
					cur.rot += dr;
					if(dr * dr > 0.0001) {
						cur.axisx = Math.sin(cur.rot);
						cur.axisy = Math.cos(cur.rot);
					} else {
						let d2 = dr * dr;
						let p = 1 - 0.5 * d2;
						let m = 1 - d2 * d2 / 8;
						let nx = (p * cur.axisx + dr * cur.axisy) * m;
						cur.axisy = (p * cur.axisy - dr * cur.axisx) * m;
						cur.axisx = nx;
					}
				}
			}
			cur.sweepTime = 0;
			cx_ite = cx_ite.next;
		}
		let cx_ite1 = this.live.head;
		while(cx_ite1 != null) {
			let cur = cx_ite1.elt;
			if(!cur.sweepFrozen) {
				let delta = deltaTime - cur.sweepTime;
				if(delta != 0) {
					cur.sweepTime = deltaTime;
					let t = delta;
					cur.posx += cur.velx * t;
					cur.posy += cur.vely * t;
					if(cur.angvel != 0) {
						let dr = cur.sweep_angvel * delta;
						cur.rot += dr;
						if(dr * dr > 0.0001) {
							cur.axisx = Math.sin(cur.rot);
							cur.axisy = Math.cos(cur.rot);
						} else {
							let d2 = dr * dr;
							let p = 1 - 0.5 * d2;
							let m = 1 - d2 * d2 / 8;
							let nx = (p * cur.axisx + dr * cur.axisy) * m;
							cur.axisy = (p * cur.axisy - dr * cur.axisx) * m;
							cur.axisx = nx;
						}
					}
				}
			}
			cur.sweepTime = 0;
			cx_ite1 = cx_ite1.next;
		}
	}
	continuousEvent(s1,s2,stat,in_arb,_) {
		if(s1.body.sweepFrozen && s2.body.sweepFrozen) {
			return in_arb;
		}
		if(s1.body.disableCCD || s2.body.disableCCD) {
			return in_arb;
		}
		let tmp;
		if(!(in_arb != null && in_arb.colarb == null)) {
			let b1 = s1.body;
			let b2 = s2.body;
			let con_ignore;
			con_ignore = false;
			let cx_ite = b1.constraints.head;
			while(cx_ite != null) {
				let con = cx_ite.elt;
				if(con.ignore && con.pair_exists(b1.id,b2.id)) {
					con_ignore = true;
					break;
				}
				cx_ite = cx_ite.next;
			}
			let tmp1;
			let tmp2;
			if(!con_ignore) {
				let cur = s1;
				while(cur != null && cur.group == null) if(cur.ishape != null) {
					cur = cur.ishape.body;
				} else if(cur.icompound != null) {
					cur = cur.icompound.compound;
				} else {
					cur = cur.ibody.compound;
				}
				let g1 = cur == null ? null : cur.group;
				let tmp;
				if(g1 == null) {
					tmp = false;
				} else {
					let cur = s2;
					while(cur != null && cur.group == null) if(cur.ishape != null) {
						cur = cur.ishape.body;
					} else if(cur.icompound != null) {
						cur = cur.icompound.compound;
					} else {
						cur = cur.ibody.compound;
					}
					let g2 = cur == null ? null : cur.group;
					if(g2 == null) {
						tmp = false;
					} else {
						let ret = false;
						while(g1 != null && g2 != null) {
							if(g1 == g2) {
								ret = g1.ignore;
								break;
							}
							if(g1.depth < g2.depth) {
								g2 = g2.group;
							} else {
								g1 = g1.group;
							}
						}
						tmp = ret;
					}
				}
				tmp2 = !tmp;
			} else {
				tmp2 = false;
			}
			if(tmp2) {
				let tmp;
				if(s1.sensorEnabled || s2.sensorEnabled) {
					let _this = s1.filter;
					let x = s2.filter;
					tmp = (_this.sensorMask & x.sensorGroup) != 0 && (x.sensorMask & _this.sensorGroup) != 0;
				} else {
					tmp = false;
				}
				if(tmp) {
					tmp1 = 2;
				} else {
					let tmp;
					if(s1.fluidEnabled || s2.fluidEnabled) {
						let _this = s1.filter;
						let x = s2.filter;
						tmp = (_this.fluidMask & x.fluidGroup) != 0 && (x.fluidMask & _this.fluidGroup) != 0;
					} else {
						tmp = false;
					}
					if(tmp && !(b1.imass == 0 && b2.imass == 0 && b1.iinertia == 0 && b2.iinertia == 0)) {
						tmp1 = 0;
					} else {
						let _this = s1.filter;
						let x = s2.filter;
						tmp1 = (_this.collisionMask & x.collisionGroup) != 0 && (x.collisionMask & _this.collisionGroup) != 0 && !(b1.imass == 0 && b2.imass == 0 && b1.iinertia == 0 && b2.iinertia == 0) ? 1 : -1;
					}
				}
			} else {
				tmp1 = -1;
			}
			tmp = tmp1 <= 0;
		} else {
			tmp = true;
		}
		if(tmp) {
			return in_arb;
		}
		let b1 = s1.body;
		let b2 = s2.body;
		if(stat || b1.bullet || b2.bullet) {
			let toi;
			if(ZPP_ToiEvent.zpp_pool == null) {
				toi = new ZPP_ToiEvent();
			} else {
				toi = ZPP_ToiEvent.zpp_pool;
				ZPP_ToiEvent.zpp_pool = toi.next;
				toi.next = null;
			}
			toi.failed = false;
			toi.s1 = toi.s2 = null;
			toi.arbiter = null;
			let kin = b1.type == ZPP_Flags.id_BodyType_KINEMATIC || b2.type == ZPP_Flags.id_BodyType_KINEMATIC;
			if(stat && !kin) {
				if(s1.body.type != ZPP_Flags.id_BodyType_DYNAMIC) {
					toi.s2 = s1;
					toi.s1 = s2;
				} else {
					toi.s1 = s1;
					toi.s2 = s2;
				}
				toi.kinematic = false;
				ZPP_SweepDistance.staticSweep(toi,this.pre_dt,0,Config.collisionSlopCCD);
			} else {
				toi.s1 = s1;
				toi.s2 = s2;
				toi.kinematic = kin;
				if(toi.s1.body.sweepFrozen || toi.s2.body.sweepFrozen) {
					if(toi.s1.body.sweepFrozen) {
						let tmp = toi.s1;
						toi.s1 = toi.s2;
						toi.s2 = tmp;
						toi.frozen1 = false;
						toi.frozen2 = true;
					}
					ZPP_SweepDistance.staticSweep(toi,this.pre_dt,0,Config.collisionSlopCCD);
				} else {
					ZPP_SweepDistance.dynamicSweep(toi,this.pre_dt,0,Config.collisionSlopCCD);
				}
			}
			if(stat && toi.toi < 0 || toi.failed) {
				let o = toi;
				o.next = ZPP_ToiEvent.zpp_pool;
				ZPP_ToiEvent.zpp_pool = o;
			} else {
				this.toiEvents.add(toi);
				toi.frozen1 = toi.s1.body.sweepFrozen;
				toi.frozen2 = toi.s2.body.sweepFrozen;
				toi.arbiter = in_arb != null ? in_arb.colarb : null;
			}
		}
		return in_arb;
	}
	bodyCbWake(b) {
		if(b.type == ZPP_Flags.id_BodyType_DYNAMIC && b.cbSet != null) {
			if(this.midstep) {
				let cx_ite = b.cbSet.bodylisteners.head;
				while(cx_ite != null) {
					let i = cx_ite.elt;
					if(i.event != ZPP_Flags.id_CbEvent_WAKE) {
						cx_ite = cx_ite.next;
						continue;
					}
					let cb = this.push_callback(i);
					cb.event = ZPP_Flags.id_CbEvent_WAKE;
					cb.body = b;
					cx_ite = cx_ite.next;
				}
			} else {
				b.component.woken = true;
			}
		}
	}
	bodyCbSleep(b) {
		if(b.type == ZPP_Flags.id_BodyType_DYNAMIC && b.cbSet != null) {
			let cx_ite = b.cbSet.bodylisteners.head;
			while(cx_ite != null) {
				let i = cx_ite.elt;
				if(i.event != ZPP_Flags.id_CbEvent_SLEEP) {
					cx_ite = cx_ite.next;
					continue;
				}
				let cb = this.push_callback(i);
				cb.event = ZPP_Flags.id_CbEvent_SLEEP;
				cb.body = b;
				cx_ite = cx_ite.next;
			}
		}
	}
	constraintCbWake(con) {
		if(con.cbSet != null) {
			if(this.midstep) {
				let cx_ite = con.cbSet.conlisteners.head;
				while(cx_ite != null) {
					let i = cx_ite.elt;
					if(i.event != ZPP_Flags.id_CbEvent_WAKE) {
						cx_ite = cx_ite.next;
						continue;
					}
					let cb = this.push_callback(i);
					cb.event = ZPP_Flags.id_CbEvent_WAKE;
					cb.constraint = con;
					cx_ite = cx_ite.next;
				}
			} else {
				con.component.woken = true;
			}
		}
	}
	constraintCbSleep(con) {
		if(con.cbSet != null) {
			let cx_ite = con.cbSet.conlisteners.head;
			while(cx_ite != null) {
				let i = cx_ite.elt;
				if(i.event != ZPP_Flags.id_CbEvent_SLEEP) {
					cx_ite = cx_ite.next;
					continue;
				}
				let cb = this.push_callback(i);
				cb.event = ZPP_Flags.id_CbEvent_SLEEP;
				cb.constraint = con;
				cx_ite = cx_ite.next;
			}
		}
	}
	constraintCbBreak(con) {
		if(con.cbSet != null) {
			let cx_ite = con.cbSet.conlisteners.head;
			while(cx_ite != null) {
				let i = cx_ite.elt;
				if(i.event != ZPP_Flags.id_CbEvent_BREAK) {
					cx_ite = cx_ite.next;
					continue;
				}
				let cb = this.push_callback(i);
				cb.event = ZPP_Flags.id_CbEvent_BREAK;
				cb.constraint = con;
				cx_ite = cx_ite.next;
			}
		}
	}
	nullListenerType(cb1,cb2) {
		let stack = new ZNPList_ZPP_Interactor();
		let cx_ite = cb1.interactors.head;
		while(cx_ite != null) {
			let i = cx_ite.elt;
			stack.add(i);
			cx_ite = cx_ite.next;
		}
		if(cb1 != cb2) {
			let cx_ite = cb2.interactors.head;
			while(cx_ite != null) {
				let i = cx_ite.elt;
				stack.add(i);
				cx_ite = cx_ite.next;
			}
		}
		while(stack.head != null) {
			let intx = stack.pop_unsafe();
			if(intx.icompound != null) {
				let comp = intx.icompound;
				let cx_ite = comp.bodies.head;
				while(cx_ite != null) {
					let i = cx_ite.elt;
					stack.add(i);
					cx_ite = cx_ite.next;
				}
				let cx_ite1 = comp.compounds.head;
				while(cx_ite1 != null) {
					let i = cx_ite1.elt;
					stack.add(i);
					cx_ite1 = cx_ite1.next;
				}
			} else {
				let xbody = intx.ibody != null ? intx.ibody : intx.ishape.body;
				let xshp = intx.ishape != null ? intx.ishape : null;
				let cx_ite = xbody.arbiters.head;
				while(cx_ite != null) {
					let xarb = cx_ite.elt;
					if(xarb.present == 0) {
						cx_ite = cx_ite.next;
						continue;
					}
					if(xshp != null && !(xarb.ws1 == xshp || xarb.ws2 == xshp)) {
						cx_ite = cx_ite.next;
						continue;
					}
					this.MRCA_chains(xarb.ws1,xarb.ws2);
					let cx_ite1 = this.mrca1.head;
					while(cx_ite1 != null) {
						let i1 = cx_ite1.elt;
						if(i1.cbSet != cb1 && i1.cbSet != cb2) {
							cx_ite1 = cx_ite1.next;
							continue;
						}
						let cx_ite = this.mrca2.head;
						while(cx_ite != null) {
							let i2 = cx_ite.elt;
							if(i1.cbSet == cb1 && i2.cbSet != cb2 || i1.cbSet == cb2 && i2.cbSet != cb1) {
								cx_ite = cx_ite.next;
								continue;
							}
							let callbackset = ZPP_Interactor.get(i1,i2);
							if(callbackset != null) {
								while(callbackset.arbiters.head != null) {
									let arb = callbackset.arbiters.pop_unsafe();
									arb.present--;
								}
								this.remove_callbackset(callbackset);
							}
							cx_ite = cx_ite.next;
						}
						cx_ite1 = cx_ite1.next;
					}
					cx_ite = cx_ite.next;
				}
			}
		}
	}
	nullInteractorType(intx,me) {
		if(me == null) {
			me = intx;
		}
		if(intx.icompound != null) {
			let comp = intx.icompound;
			let cx_ite = comp.bodies.head;
			while(cx_ite != null) {
				let body = cx_ite.elt;
				this.nullInteractorType(body,me);
				cx_ite = cx_ite.next;
			}
			let cx_ite1 = comp.compounds.head;
			while(cx_ite1 != null) {
				let comp = cx_ite1.elt;
				this.nullInteractorType(comp,me);
				cx_ite1 = cx_ite1.next;
			}
		} else {
			let xbody = intx.ibody != null ? intx.ibody : intx.ishape.body;
			let xshp = intx.ishape != null ? intx.ishape : null;
			let cx_ite = xbody.arbiters.head;
			while(cx_ite != null) {
				let xarb = cx_ite.elt;
				if(xarb.present == 0) {
					cx_ite = cx_ite.next;
					continue;
				}
				if(xshp != null && !(xarb.ws1 == xshp || xarb.ws2 == xshp)) {
					cx_ite = cx_ite.next;
					continue;
				}
				this.MRCA_chains(xarb.ws1,xarb.ws2);
				let cx_ite1 = this.mrca1.head;
				while(cx_ite1 != null) {
					let i1 = cx_ite1.elt;
					let cx_ite = this.mrca2.head;
					while(cx_ite != null) {
						let i2 = cx_ite.elt;
						if(i1 != me && i2 != me) {
							cx_ite = cx_ite.next;
							continue;
						}
						let callbackset = ZPP_Interactor.get(i1,i2);
						if(callbackset != null) {
							xarb.present--;
							callbackset.remove_arb(xarb);
							if(callbackset.arbiters.head == null) {
								this.remove_callbackset(callbackset);
							}
						}
						cx_ite = cx_ite.next;
					}
					cx_ite1 = cx_ite1.next;
				}
				cx_ite = cx_ite.next;
			}
		}
	}
	freshListenerType(cb1,cb2) {
		let stack = new ZNPList_ZPP_Interactor();
		let cx_ite = cb1.interactors.head;
		while(cx_ite != null) {
			let i = cx_ite.elt;
			stack.add(i);
			cx_ite = cx_ite.next;
		}
		if(cb1 != cb2) {
			let cx_ite = cb2.interactors.head;
			while(cx_ite != null) {
				let i = cx_ite.elt;
				stack.add(i);
				cx_ite = cx_ite.next;
			}
		}
		while(stack.head != null) {
			let intx = stack.pop_unsafe();
			if(intx.icompound != null) {
				let comp = intx.icompound;
				let cx_ite = comp.bodies.head;
				while(cx_ite != null) {
					let i = cx_ite.elt;
					stack.add(i);
					cx_ite = cx_ite.next;
				}
				let cx_ite1 = comp.compounds.head;
				while(cx_ite1 != null) {
					let i = cx_ite1.elt;
					stack.add(i);
					cx_ite1 = cx_ite1.next;
				}
			} else {
				let xbody = intx.ibody != null ? intx.ibody : intx.ishape.body;
				let xshp = intx.ishape != null ? intx.ishape : null;
				let cx_ite = xbody.arbiters.head;
				while(cx_ite != null) {
					let xarb = cx_ite.elt;
					if(!xarb.presentable) {
						cx_ite = cx_ite.next;
						continue;
					}
					if(xshp != null && !(xarb.ws1 == xshp || xarb.ws2 == xshp)) {
						cx_ite = cx_ite.next;
						continue;
					}
					this.MRCA_chains(xarb.ws1,xarb.ws2);
					let cx_ite1 = this.mrca1.head;
					while(cx_ite1 != null) {
						let i1 = cx_ite1.elt;
						if(i1.cbSet != cb1 && i1.cbSet != cb2) {
							cx_ite1 = cx_ite1.next;
							continue;
						}
						let cx_ite = this.mrca2.head;
						while(cx_ite != null) {
							let i2 = cx_ite.elt;
							if(i1.cbSet == cb1 && i2.cbSet != cb2 || i1.cbSet == cb2 && i2.cbSet != cb1) {
								cx_ite = cx_ite.next;
								continue;
							}
							let callbackset = ZPP_Interactor.get(i1,i2);
							if(callbackset == null) {
								callbackset = ZPP_CallbackSet.get(i1,i2);
								this.add_callbackset(callbackset);
							}
							let tmp;
							let ret;
							ret = false;
							let cx_ite1 = callbackset.arbiters.head;
							while(cx_ite1 != null) {
								let npite = cx_ite1.elt;
								if(npite == xarb) {
									ret = true;
									break;
								}
								cx_ite1 = cx_ite1.next;
							}
							if(!ret) {
								let _this = callbackset.arbiters;
								let ret;
								if(ZNPNode_ZPP_Arbiter.zpp_pool == null) {
									ret = new ZNPNode_ZPP_Arbiter();
								} else {
									ret = ZNPNode_ZPP_Arbiter.zpp_pool;
									ZNPNode_ZPP_Arbiter.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.elt = xarb;
								let temp = ret;
								temp.next = _this.head;
								_this.head = temp;
								_this.modified = true;
								_this.length++;
								tmp = true;
							} else {
								tmp = false;
							}
							if(tmp) {
								xarb.present++;
							}
							cx_ite = cx_ite.next;
						}
						cx_ite1 = cx_ite1.next;
					}
					cx_ite = cx_ite.next;
				}
			}
		}
	}
	freshInteractorType(intx,me) {
		if(me == null) {
			me = intx;
		}
		if(intx.icompound != null) {
			let comp = intx.icompound;
			let cx_ite = comp.bodies.head;
			while(cx_ite != null) {
				let body = cx_ite.elt;
				this.freshInteractorType(body,me);
				cx_ite = cx_ite.next;
			}
			let cx_ite1 = comp.compounds.head;
			while(cx_ite1 != null) {
				let comp = cx_ite1.elt;
				this.freshInteractorType(comp,me);
				cx_ite1 = cx_ite1.next;
			}
		} else {
			let xbody = intx.ibody != null ? intx.ibody : intx.ishape.body;
			let xshp = intx.ishape != null ? intx.ishape : null;
			let cx_ite = xbody.arbiters.head;
			while(cx_ite != null) {
				let xarb = cx_ite.elt;
				if(!xarb.presentable) {
					cx_ite = cx_ite.next;
					continue;
				}
				if(xshp != null && !(xarb.ws1 == xshp || xarb.ws2 == xshp)) {
					cx_ite = cx_ite.next;
					continue;
				}
				this.MRCA_chains(xarb.ws1,xarb.ws2);
				let cx_ite1 = this.mrca1.head;
				while(cx_ite1 != null) {
					let i1 = cx_ite1.elt;
					let cx_ite = this.mrca2.head;
					while(cx_ite != null) {
						let i2 = cx_ite.elt;
						if(i1 != me && i2 != me) {
							cx_ite = cx_ite.next;
							continue;
						}
						let cb1 = i1.cbSet;
						let cb2 = i2.cbSet;
						cb1.validate();
						cb2.validate();
						let _this = cb1.manager;
						let ret = null;
						let pairs = cb1.cbpairs.length < cb2.cbpairs.length ? cb1.cbpairs : cb2.cbpairs;
						let cx_ite1 = pairs.head;
						while(cx_ite1 != null) {
							let p = cx_ite1.elt;
							if(p.a == cb1 && p.b == cb2 || p.a == cb2 && p.b == cb1) {
								ret = p;
								break;
							}
							cx_ite1 = cx_ite1.next;
						}
						if(ret == null) {
							let ret1;
							if(ZPP_CbSetPair.zpp_pool == null) {
								ret1 = new ZPP_CbSetPair();
							} else {
								ret1 = ZPP_CbSetPair.zpp_pool;
								ZPP_CbSetPair.zpp_pool = ret1.next;
								ret1.next = null;
							}
							ret1.zip_listeners = true;
							if(ZPP_CbSet.setlt(cb1,cb2)) {
								ret1.a = cb1;
								ret1.b = cb2;
							} else {
								ret1.a = cb2;
								ret1.b = cb1;
							}
							ret = ret1;
							cb1.cbpairs.add(ret);
							if(cb2 != cb1) {
								cb2.cbpairs.add(ret);
							}
						}
						if(ret.zip_listeners) {
							ret.zip_listeners = false;
							ret.__validate();
						}
						if(ret.listeners.head != null) {
							let callbackset = ZPP_Interactor.get(i1,i2);
							if(callbackset == null) {
								callbackset = ZPP_CallbackSet.get(i1,i2);
								this.add_callbackset(callbackset);
							}
							let tmp;
							let ret;
							ret = false;
							let cx_ite = callbackset.arbiters.head;
							while(cx_ite != null) {
								let npite = cx_ite.elt;
								if(npite == xarb) {
									ret = true;
									break;
								}
								cx_ite = cx_ite.next;
							}
							if(!ret) {
								let _this = callbackset.arbiters;
								let ret;
								if(ZNPNode_ZPP_Arbiter.zpp_pool == null) {
									ret = new ZNPNode_ZPP_Arbiter();
								} else {
									ret = ZNPNode_ZPP_Arbiter.zpp_pool;
									ZNPNode_ZPP_Arbiter.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.elt = xarb;
								let temp = ret;
								temp.next = _this.head;
								_this.head = temp;
								_this.modified = true;
								_this.length++;
								tmp = true;
							} else {
								tmp = false;
							}
							if(tmp) {
								xarb.present++;
							}
						}
						cx_ite = cx_ite.next;
					}
					cx_ite1 = cx_ite1.next;
				}
				cx_ite = cx_ite.next;
			}
		}
	}
	wakeCompound(x) {
		let cx_ite = x.bodies.head;
		while(cx_ite != null) {
			let y = cx_ite.elt;
			let o = y;
			if(!o.world) {
				o.component.waket = this.stamp + (this.midstep ? 0 : 1);
				if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
					o.kinematicDelaySleep = true;
				}
				if(o.component.sleeping) {
					this.really_wake(o,false);
				}
			}
			cx_ite = cx_ite.next;
		}
		let cx_ite1 = x.constraints.head;
		while(cx_ite1 != null) {
			let i = cx_ite1.elt;
			this.wake_constraint(i);
			cx_ite1 = cx_ite1.next;
		}
		let cx_ite2 = x.compounds.head;
		while(cx_ite2 != null) {
			let i = cx_ite2.elt;
			this.wakeCompound(i);
			cx_ite2 = cx_ite2.next;
		}
	}
	wakeIsland(i) {
		while(i.comps.head != null) {
			let c = i.comps.pop_unsafe();
			c.waket = this.stamp + (this.midstep ? 0 : 1);
			if(c.isBody) {
				let b = c.body;
				this.live.add(b);
				let cx_ite = b.arbiters.head;
				while(cx_ite != null) {
					let arb = cx_ite.elt;
					if(arb.sleeping) {
						arb.sleeping = false;
						arb.up_stamp += this.stamp - arb.sleep_stamp;
						if(arb.type == ZPP_Arbiter.COL) {
							let carb = arb.colarb;
							if(carb.stat) {
								let _this = this.c_arbiters_true;
								let ret;
								if(ZNPNode_ZPP_ColArbiter.zpp_pool == null) {
									ret = new ZNPNode_ZPP_ColArbiter();
								} else {
									ret = ZNPNode_ZPP_ColArbiter.zpp_pool;
									ZNPNode_ZPP_ColArbiter.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.elt = carb;
								let temp = ret;
								temp.next = _this.head;
								_this.head = temp;
								_this.modified = true;
								_this.length++;
							} else {
								let _this = this.c_arbiters_false;
								let ret;
								if(ZNPNode_ZPP_ColArbiter.zpp_pool == null) {
									ret = new ZNPNode_ZPP_ColArbiter();
								} else {
									ret = ZNPNode_ZPP_ColArbiter.zpp_pool;
									ZNPNode_ZPP_ColArbiter.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.elt = carb;
								let temp = ret;
								temp.next = _this.head;
								_this.head = temp;
								_this.modified = true;
								_this.length++;
							}
						} else if(arb.type == ZPP_Arbiter.FLUID) {
							let _this = this.f_arbiters;
							let o = arb.fluidarb;
							let ret;
							if(ZNPNode_ZPP_FluidArbiter.zpp_pool == null) {
								ret = new ZNPNode_ZPP_FluidArbiter();
							} else {
								ret = ZNPNode_ZPP_FluidArbiter.zpp_pool;
								ZNPNode_ZPP_FluidArbiter.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.elt = o;
							let temp = ret;
							temp.next = _this.head;
							_this.head = temp;
							_this.modified = true;
							_this.length++;
						} else {
							let _this = this.s_arbiters;
							let o = arb.sensorarb;
							let ret;
							if(ZNPNode_ZPP_SensorArbiter.zpp_pool == null) {
								ret = new ZNPNode_ZPP_SensorArbiter();
							} else {
								ret = ZNPNode_ZPP_SensorArbiter.zpp_pool;
								ZNPNode_ZPP_SensorArbiter.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.elt = o;
							let temp = ret;
							temp.next = _this.head;
							_this.head = temp;
							_this.modified = true;
							_this.length++;
						}
					}
					cx_ite = cx_ite.next;
				}
				this.bodyCbWake(b);
				c.sleeping = false;
				c.island = null;
				c.parent = c;
				c.rank = 0;
				if(b.type != ZPP_Flags.id_BodyType_STATIC) {
					let cx_ite = b.shapes.head;
					while(cx_ite != null) {
						let shape = cx_ite.elt;
						if(shape.node != null) {
							this.bphase.sync(shape);
						}
						cx_ite = cx_ite.next;
					}
				}
			} else {
				let con = c.constraint;
				let _this = this.live_constraints;
				let ret;
				if(ZNPNode_ZPP_Constraint.zpp_pool == null) {
					ret = new ZNPNode_ZPP_Constraint();
				} else {
					ret = ZNPNode_ZPP_Constraint.zpp_pool;
					ZNPNode_ZPP_Constraint.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.elt = con;
				let temp = ret;
				temp.next = _this.head;
				_this.head = temp;
				_this.modified = true;
				_this.length++;
				this.constraintCbWake(con);
				c.sleeping = false;
				c.island = null;
				c.parent = c;
				c.rank = 0;
			}
		}
		let o = i;
		o.next = ZPP_Island.zpp_pool;
		ZPP_Island.zpp_pool = o;
	}
	non_inlined_wake(o,fst) {
		if(fst == null) {
			fst = false;
		}
		let o1 = o;
		if(!o1.world) {
			o1.component.waket = this.stamp + (this.midstep ? 0 : 1);
			if(o1.type == ZPP_Flags.id_BodyType_KINEMATIC) {
				o1.kinematicDelaySleep = true;
			}
			if(o1.component.sleeping) {
				this.really_wake(o1,fst);
			}
		}
	}
	really_wake(o,fst) {
		if(fst == null) {
			fst = false;
		}
		if(o.component.island == null) {
			o.component.sleeping = false;
			if(o.type == ZPP_Flags.id_BodyType_KINEMATIC || o.type == ZPP_Flags.id_BodyType_STATIC) {
				let _this = this.staticsleep;
				let ret;
				if(ZNPNode_ZPP_Body.zpp_pool == null) {
					ret = new ZNPNode_ZPP_Body();
				} else {
					ret = ZNPNode_ZPP_Body.zpp_pool;
					ZNPNode_ZPP_Body.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.elt = o;
				let temp = ret;
				temp.next = _this.head;
				_this.head = temp;
				_this.modified = true;
				_this.length++;
			} else {
				let _this = this.live;
				let ret;
				if(ZNPNode_ZPP_Body.zpp_pool == null) {
					ret = new ZNPNode_ZPP_Body();
				} else {
					ret = ZNPNode_ZPP_Body.zpp_pool;
					ZNPNode_ZPP_Body.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.elt = o;
				let temp = ret;
				temp.next = _this.head;
				_this.head = temp;
				_this.modified = true;
				_this.length++;
			}
			let cx_ite = o.constraints.head;
			while(cx_ite != null) {
				let con = cx_ite.elt;
				if(con.space == this) {
					this.wake_constraint(con);
				}
				cx_ite = cx_ite.next;
			}
			let cx_ite1 = o.arbiters.head;
			while(cx_ite1 != null) {
				let arb = cx_ite1.elt;
				if(arb.sleeping) {
					arb.sleeping = false;
					arb.up_stamp += this.stamp + (this.midstep ? 0 : 1) - arb.sleep_stamp;
					if(arb.type == ZPP_Arbiter.COL) {
						let carb = arb.colarb;
						if(carb.stat) {
							let _this = this.c_arbiters_true;
							let ret;
							if(ZNPNode_ZPP_ColArbiter.zpp_pool == null) {
								ret = new ZNPNode_ZPP_ColArbiter();
							} else {
								ret = ZNPNode_ZPP_ColArbiter.zpp_pool;
								ZNPNode_ZPP_ColArbiter.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.elt = carb;
							let temp = ret;
							temp.next = _this.head;
							_this.head = temp;
							_this.modified = true;
							_this.length++;
						} else {
							let _this = this.c_arbiters_false;
							let ret;
							if(ZNPNode_ZPP_ColArbiter.zpp_pool == null) {
								ret = new ZNPNode_ZPP_ColArbiter();
							} else {
								ret = ZNPNode_ZPP_ColArbiter.zpp_pool;
								ZNPNode_ZPP_ColArbiter.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.elt = carb;
							let temp = ret;
							temp.next = _this.head;
							_this.head = temp;
							_this.modified = true;
							_this.length++;
						}
					} else if(arb.type == ZPP_Arbiter.FLUID) {
						let _this = this.f_arbiters;
						let o = arb.fluidarb;
						let ret;
						if(ZNPNode_ZPP_FluidArbiter.zpp_pool == null) {
							ret = new ZNPNode_ZPP_FluidArbiter();
						} else {
							ret = ZNPNode_ZPP_FluidArbiter.zpp_pool;
							ZNPNode_ZPP_FluidArbiter.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.elt = o;
						let temp = ret;
						temp.next = _this.head;
						_this.head = temp;
						_this.modified = true;
						_this.length++;
					} else {
						let _this = this.s_arbiters;
						let o = arb.sensorarb;
						let ret;
						if(ZNPNode_ZPP_SensorArbiter.zpp_pool == null) {
							ret = new ZNPNode_ZPP_SensorArbiter();
						} else {
							ret = ZNPNode_ZPP_SensorArbiter.zpp_pool;
							ZNPNode_ZPP_SensorArbiter.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.elt = o;
						let temp = ret;
						temp.next = _this.head;
						_this.head = temp;
						_this.modified = true;
						_this.length++;
					}
				}
				if(arb.type != ZPP_Arbiter.SENSOR && !arb.cleared && arb.up_stamp >= this.stamp && (arb.immState & ZPP_Flags.id_ImmState_ACCEPT) != 0) {
					if(arb.b1.type == ZPP_Flags.id_BodyType_DYNAMIC && arb.b1.component.sleeping) {
						let o = arb.b1;
						if(!o.world) {
							o.component.waket = this.stamp + (this.midstep ? 0 : 1);
							if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
								o.kinematicDelaySleep = true;
							}
							if(o.component.sleeping) {
								this.really_wake(o,false);
							}
						}
					}
					if(arb.b2.type == ZPP_Flags.id_BodyType_DYNAMIC && arb.b2.component.sleeping) {
						let o = arb.b2;
						if(!o.world) {
							o.component.waket = this.stamp + (this.midstep ? 0 : 1);
							if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
								o.kinematicDelaySleep = true;
							}
							if(o.component.sleeping) {
								this.really_wake(o,false);
							}
						}
					}
				}
				cx_ite1 = cx_ite1.next;
			}
			if(!fst && o.type == ZPP_Flags.id_BodyType_DYNAMIC) {
				this.bodyCbWake(o);
			}
			if(!fst && !this.bphase.is_sweep && o.type != ZPP_Flags.id_BodyType_STATIC) {
				let cx_ite = o.shapes.head;
				while(cx_ite != null) {
					let shape = cx_ite.elt;
					if(shape.node != null) {
						this.bphase.sync(shape);
					}
					cx_ite = cx_ite.next;
				}
			}
		} else {
			this.wakeIsland(o.component.island);
		}
	}
	wake_constraint(con,fst) {
		if(fst == null) {
			fst = false;
		}
		if(con.active) {
			con.component.waket = this.stamp + (this.midstep ? 0 : 1);
			if(con.component.sleeping) {
				if(con.component.island == null) {
					con.component.sleeping = false;
					let _this = this.live_constraints;
					let ret;
					if(ZNPNode_ZPP_Constraint.zpp_pool == null) {
						ret = new ZNPNode_ZPP_Constraint();
					} else {
						ret = ZNPNode_ZPP_Constraint.zpp_pool;
						ZNPNode_ZPP_Constraint.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = con;
					let temp = ret;
					temp.next = _this.head;
					_this.head = temp;
					_this.modified = true;
					_this.length++;
					con.wake_connected();
					if(!fst) {
						this.constraintCbWake(con);
					}
				} else {
					this.wakeIsland(con.component.island);
				}
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	doForests(dt) {
		let cx_ite = this.c_arbiters_false.head;
		while(cx_ite != null) {
			let arb = cx_ite.elt;
			if(!arb.cleared && arb.up_stamp == this.stamp && (arb.immState & ZPP_Flags.id_ImmState_ACCEPT) != 0) {
				if(arb.b1.type == ZPP_Flags.id_BodyType_DYNAMIC && arb.b2.type == ZPP_Flags.id_BodyType_DYNAMIC) {
					let xr;
					if(arb.b1.component == arb.b1.component.parent) {
						xr = arb.b1.component;
					} else {
						let obj = arb.b1.component;
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
					if(arb.b2.component == arb.b2.component.parent) {
						yr = arb.b2.component;
					} else {
						let obj = arb.b2.component;
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
			cx_ite = cx_ite.next;
		}
		let cx_ite1 = this.f_arbiters.head;
		while(cx_ite1 != null) {
			let arb = cx_ite1.elt;
			if(!arb.cleared && arb.up_stamp == this.stamp && (arb.immState & ZPP_Flags.id_ImmState_ACCEPT) != 0) {
				if(arb.b1.type == ZPP_Flags.id_BodyType_DYNAMIC && arb.b2.type == ZPP_Flags.id_BodyType_DYNAMIC) {
					let xr;
					if(arb.b1.component == arb.b1.component.parent) {
						xr = arb.b1.component;
					} else {
						let obj = arb.b1.component;
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
					if(arb.b2.component == arb.b2.component.parent) {
						yr = arb.b2.component;
					} else {
						let obj = arb.b2.component;
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
			cx_ite1 = cx_ite1.next;
		}
		let cx_ite2 = this.live_constraints.head;
		while(cx_ite2 != null) {
			let con = cx_ite2.elt;
			con.forest();
			cx_ite2 = cx_ite2.next;
		}
		while(this.live.head != null) {
			let _this = this.live;
			let ret = _this.head.elt;
			_this.pop();
			let o = ret;
			let oc = o.component;
			let root;
			if(oc == oc.parent) {
				root = oc;
			} else {
				let obj = oc;
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
				root = obj;
			}
			if(root.island == null) {
				if(ZPP_Island.zpp_pool == null) {
					root.island = new ZPP_Island();
				} else {
					root.island = ZPP_Island.zpp_pool;
					ZPP_Island.zpp_pool = root.island.next;
					root.island.next = null;
				}
				root.island.waket = 0;
				let _this = this.islands;
				let o = root.island;
				o._inuse = true;
				let temp = o;
				temp.next = _this.next;
				_this.next = temp;
				_this.modified = true;
				_this.length++;
				root.island.sleep = true;
			}
			oc.island = root.island;
			let _this1 = oc.island.comps;
			let ret1;
			if(ZNPNode_ZPP_Component.zpp_pool == null) {
				ret1 = new ZNPNode_ZPP_Component();
			} else {
				ret1 = ZNPNode_ZPP_Component.zpp_pool;
				ZNPNode_ZPP_Component.zpp_pool = ret1.next;
				ret1.next = null;
			}
			ret1.elt = oc;
			let temp = ret1;
			temp.next = _this1.head;
			_this1.head = temp;
			_this1.modified = true;
			_this1.length++;
			let rest = o.atRest(dt);
			oc.island.sleep = oc.island.sleep && rest;
			if(oc.waket > oc.island.waket) {
				oc.island.waket = oc.waket;
			}
		}
		while(this.live_constraints.head != null) {
			let _this = this.live_constraints;
			let ret = _this.head.elt;
			_this.pop();
			let o = ret;
			let oc = o.component;
			let root;
			if(oc == oc.parent) {
				root = oc;
			} else {
				let obj = oc;
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
				root = obj;
			}
			oc.island = root.island;
			let _this1 = oc.island.comps;
			let ret1;
			if(ZNPNode_ZPP_Component.zpp_pool == null) {
				ret1 = new ZNPNode_ZPP_Component();
			} else {
				ret1 = ZNPNode_ZPP_Component.zpp_pool;
				ZNPNode_ZPP_Component.zpp_pool = ret1.next;
				ret1.next = null;
			}
			ret1.elt = oc;
			let temp = ret1;
			temp.next = _this1.head;
			_this1.head = temp;
			_this1.modified = true;
			_this1.length++;
			if(oc.waket > oc.island.waket) {
				oc.island.waket = oc.waket;
			}
		}
		while(this.islands.next != null) {
			let _this = this.islands;
			let ret = _this.next;
			_this.pop();
			let i = ret;
			if(i.sleep) {
				let cx_ite = i.comps.head;
				while(cx_ite != null) {
					let c = cx_ite.elt;
					if(c.isBody) {
						let b = c.body;
						b.velx = 0;
						b.vely = 0;
						b.angvel = 0;
						c.sleeping = true;
						let cx_ite = b.shapes.head;
						while(cx_ite != null) {
							let shape = cx_ite.elt;
							this.bphase.sync(shape);
							cx_ite = cx_ite.next;
						}
						this.bodyCbSleep(b);
					} else {
						let con = c.constraint;
						this.constraintCbSleep(con);
						c.sleeping = true;
					}
					cx_ite = cx_ite.next;
				}
			} else {
				while(i.comps.head != null) {
					let _this = i.comps;
					let ret = _this.head.elt;
					_this.pop();
					let c = ret;
					c.waket = i.waket;
					if(c.isBody) {
						let _this = this.live;
						let o = c.body;
						let ret;
						if(ZNPNode_ZPP_Body.zpp_pool == null) {
							ret = new ZNPNode_ZPP_Body();
						} else {
							ret = ZNPNode_ZPP_Body.zpp_pool;
							ZNPNode_ZPP_Body.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.elt = o;
						let temp = ret;
						temp.next = _this.head;
						_this.head = temp;
						_this.modified = true;
						_this.length++;
					} else {
						let _this = this.live_constraints;
						let o = c.constraint;
						let ret;
						if(ZNPNode_ZPP_Constraint.zpp_pool == null) {
							ret = new ZNPNode_ZPP_Constraint();
						} else {
							ret = ZNPNode_ZPP_Constraint.zpp_pool;
							ZNPNode_ZPP_Constraint.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.elt = o;
						let temp = ret;
						temp.next = _this.head;
						_this.head = temp;
						_this.modified = true;
						_this.length++;
					}
					c.sleeping = false;
					c.island = null;
					c.parent = c;
					c.rank = 0;
				}
				let o = i;
				o.next = ZPP_Island.zpp_pool;
				ZPP_Island.zpp_pool = o;
			}
		}
	}
	sleepArbiters() {
		let pre = null;
		let arbs = this.c_arbiters_true;
		let arbite = arbs.head;
		let fst = this.c_arbiters_false != null;
		if(fst && arbite == null) {
			fst = false;
			arbite = this.c_arbiters_false.head;
			arbs = this.c_arbiters_false;
			pre = null;
		}
		while(arbite != null) {
			let arb = arbite.elt;
			if(arb.b1.component.sleeping && arb.b2.component.sleeping) {
				arb.sleep_stamp = this.stamp;
				arb.sleeping = true;
				let old;
				let ret;
				if(pre == null) {
					old = arbs.head;
					ret = old.next;
					arbs.head = ret;
					if(arbs.head == null) {
						arbs.pushmod = true;
					}
				} else {
					old = pre.next;
					ret = old.next;
					pre.next = ret;
					if(ret == null) {
						arbs.pushmod = true;
					}
				}
				let o = old;
				o.elt = null;
				o.next = ZNPNode_ZPP_ColArbiter.zpp_pool;
				ZNPNode_ZPP_ColArbiter.zpp_pool = o;
				arbs.modified = true;
				arbs.length--;
				arbs.pushmod = true;
				arbite = ret;
				if(fst && arbite == null) {
					fst = false;
					arbite = this.c_arbiters_false.head;
					arbs = this.c_arbiters_false;
					pre = null;
				}
				continue;
			}
			pre = arbite;
			arbite = arbite.next;
			if(fst && arbite == null) {
				fst = false;
				arbite = this.c_arbiters_false.head;
				arbs = this.c_arbiters_false;
				pre = null;
			}
		}
		let pre1 = null;
		let arbs1 = this.f_arbiters;
		let arbite1 = arbs1.head;
		let fst1 = false;
		if(fst1 && arbite1 == null) {
			fst1 = false;
			arbs1 = null;
			pre1 = null;
		}
		while(arbite1 != null) {
			let arb = arbite1.elt;
			if(arb.b1.component.sleeping && arb.b2.component.sleeping) {
				arb.sleep_stamp = this.stamp;
				arb.sleeping = true;
				let old;
				let ret;
				if(pre1 == null) {
					old = arbs1.head;
					ret = old.next;
					arbs1.head = ret;
					if(arbs1.head == null) {
						arbs1.pushmod = true;
					}
				} else {
					old = pre1.next;
					ret = old.next;
					pre1.next = ret;
					if(ret == null) {
						arbs1.pushmod = true;
					}
				}
				let o = old;
				o.elt = null;
				o.next = ZNPNode_ZPP_FluidArbiter.zpp_pool;
				ZNPNode_ZPP_FluidArbiter.zpp_pool = o;
				arbs1.modified = true;
				arbs1.length--;
				arbs1.pushmod = true;
				arbite1 = ret;
				if(fst1 && arbite1 == null) {
					fst1 = false;
					arbs1 = null;
					pre1 = null;
				}
				continue;
			}
			pre1 = arbite1;
			arbite1 = arbite1.next;
			if(fst1 && arbite1 == null) {
				fst1 = false;
				arbs1 = null;
				pre1 = null;
			}
		}
		let pre2 = null;
		let arbs2 = this.s_arbiters;
		let arbite2 = arbs2.head;
		let fst2 = false;
		if(fst2 && arbite2 == null) {
			fst2 = false;
			arbs2 = null;
			pre2 = null;
		}
		while(arbite2 != null) {
			let arb = arbite2.elt;
			if(arb.b1.component.sleeping && arb.b2.component.sleeping) {
				arb.sleep_stamp = this.stamp;
				arb.sleeping = true;
				let old;
				let ret;
				if(pre2 == null) {
					old = arbs2.head;
					ret = old.next;
					arbs2.head = ret;
					if(arbs2.head == null) {
						arbs2.pushmod = true;
					}
				} else {
					old = pre2.next;
					ret = old.next;
					pre2.next = ret;
					if(ret == null) {
						arbs2.pushmod = true;
					}
				}
				let o = old;
				o.elt = null;
				o.next = ZNPNode_ZPP_SensorArbiter.zpp_pool;
				ZNPNode_ZPP_SensorArbiter.zpp_pool = o;
				arbs2.modified = true;
				arbs2.length--;
				arbs2.pushmod = true;
				arbite2 = ret;
				if(fst2 && arbite2 == null) {
					fst2 = false;
					arbs2 = null;
					pre2 = null;
				}
				continue;
			}
			pre2 = arbite2;
			arbite2 = arbite2.next;
			if(fst2 && arbite2 == null) {
				fst2 = false;
				arbs2 = null;
				pre2 = null;
			}
		}
	}
	static_validation(body) {
		if(body.shapes.head != null) {
			if(body.shapes.head == null) {
				throw haxe_Exception.thrown("Error: Body bounds only makes sense if it contains shapes");
			}
			if(body.zip_aabb) {
				body.zip_aabb = false;
				body.aabb.minx = Infinity;
				body.aabb.miny = Infinity;
				body.aabb.maxx = -Infinity;
				body.aabb.maxy = -Infinity;
				let cx_ite = body.shapes.head;
				while(cx_ite != null) {
					let s = cx_ite.elt;
					if(s.zip_aabb) {
						if(s.body != null) {
							s.zip_aabb = false;
							if(s.type == ZPP_Flags.id_ShapeType_CIRCLE) {
								let _this = s.circle;
								if(_this.zip_worldCOM) {
									if(_this.body != null) {
										_this.zip_worldCOM = false;
										if(_this.zip_localCOM) {
											_this.zip_localCOM = false;
											if(_this.type == ZPP_Flags.id_ShapeType_POLYGON) {
												let _this1 = _this.polygon;
												if(_this1.lverts.next == null) {
													throw haxe_Exception.thrown("Error: An empty polygon has no meaningful localCOM");
												}
												if(_this1.lverts.next.next == null) {
													_this1.localCOMx = _this1.lverts.next.x;
													_this1.localCOMy = _this1.lverts.next.y;
												} else if(_this1.lverts.next.next.next == null) {
													_this1.localCOMx = _this1.lverts.next.x;
													_this1.localCOMy = _this1.lverts.next.y;
													let t = 1.0;
													_this1.localCOMx += _this1.lverts.next.next.x * t;
													_this1.localCOMy += _this1.lverts.next.next.y * t;
													let t1 = 0.5;
													_this1.localCOMx *= t1;
													_this1.localCOMy *= t1;
												} else {
													_this1.localCOMx = 0;
													_this1.localCOMy = 0;
													let area = 0.0;
													let cx_ite = _this1.lverts.next;
													let u = cx_ite;
													cx_ite = cx_ite.next;
													let v = cx_ite;
													cx_ite = cx_ite.next;
													while(cx_ite != null) {
														let w = cx_ite;
														area += v.x * (w.y - u.y);
														let cf = w.y * v.x - w.x * v.y;
														_this1.localCOMx += (v.x + w.x) * cf;
														_this1.localCOMy += (v.y + w.y) * cf;
														u = v;
														v = w;
														cx_ite = cx_ite.next;
													}
													cx_ite = _this1.lverts.next;
													let w = cx_ite;
													area += v.x * (w.y - u.y);
													let cf = w.y * v.x - w.x * v.y;
													_this1.localCOMx += (v.x + w.x) * cf;
													_this1.localCOMy += (v.y + w.y) * cf;
													u = v;
													v = w;
													cx_ite = cx_ite.next;
													let w1 = cx_ite;
													area += v.x * (w1.y - u.y);
													let cf1 = w1.y * v.x - w1.x * v.y;
													_this1.localCOMx += (v.x + w1.x) * cf1;
													_this1.localCOMy += (v.y + w1.y) * cf1;
													area = 1 / (3 * area);
													let t = area;
													_this1.localCOMx *= t;
													_this1.localCOMy *= t;
												}
											}
											if(_this.wrap_localCOM != null) {
												_this.wrap_localCOM.zpp_inner.x = _this.localCOMx;
												_this.wrap_localCOM.zpp_inner.y = _this.localCOMy;
											}
										}
										let _this1 = _this.body;
										if(_this1.zip_axis) {
											_this1.zip_axis = false;
											_this1.axisx = Math.sin(_this1.rot);
											_this1.axisy = Math.cos(_this1.rot);
										}
										_this.worldCOMx = _this.body.posx + (_this.body.axisy * _this.localCOMx - _this.body.axisx * _this.localCOMy);
										_this.worldCOMy = _this.body.posy + (_this.localCOMx * _this.body.axisx + _this.localCOMy * _this.body.axisy);
									}
								}
								let rx = _this.radius;
								let ry = _this.radius;
								_this.aabb.minx = _this.worldCOMx - rx;
								_this.aabb.miny = _this.worldCOMy - ry;
								_this.aabb.maxx = _this.worldCOMx + rx;
								_this.aabb.maxy = _this.worldCOMy + ry;
							} else {
								let _this = s.polygon;
								if(_this.zip_gverts) {
									if(_this.body != null) {
										_this.zip_gverts = false;
										_this.validate_lverts();
										let _this1 = _this.body;
										if(_this1.zip_axis) {
											_this1.zip_axis = false;
											_this1.axisx = Math.sin(_this1.rot);
											_this1.axisy = Math.cos(_this1.rot);
										}
										let li = _this.lverts.next;
										let cx_ite = _this.gverts.next;
										while(cx_ite != null) {
											let g = cx_ite;
											let l = li;
											li = li.next;
											g.x = _this.body.posx + (_this.body.axisy * l.x - _this.body.axisx * l.y);
											g.y = _this.body.posy + (l.x * _this.body.axisx + l.y * _this.body.axisy);
											cx_ite = cx_ite.next;
										}
									}
								}
								if(_this.lverts.next == null) {
									throw haxe_Exception.thrown("Error: An empty polygon has no meaningful bounds");
								}
								let p0 = _this.gverts.next;
								_this.aabb.minx = p0.x;
								_this.aabb.miny = p0.y;
								_this.aabb.maxx = p0.x;
								_this.aabb.maxy = p0.y;
								let cx_ite = _this.gverts.next.next;
								while(cx_ite != null) {
									let p = cx_ite;
									if(p.x < _this.aabb.minx) {
										_this.aabb.minx = p.x;
									}
									if(p.x > _this.aabb.maxx) {
										_this.aabb.maxx = p.x;
									}
									if(p.y < _this.aabb.miny) {
										_this.aabb.miny = p.y;
									}
									if(p.y > _this.aabb.maxy) {
										_this.aabb.maxy = p.y;
									}
									cx_ite = cx_ite.next;
								}
							}
						}
					}
					let _this = body.aabb;
					let x = s.aabb;
					if(x.minx < _this.minx) {
						_this.minx = x.minx;
					}
					if(x.maxx > _this.maxx) {
						_this.maxx = x.maxx;
					}
					if(x.miny < _this.miny) {
						_this.miny = x.miny;
					}
					if(x.maxy > _this.maxy) {
						_this.maxy = x.maxy;
					}
					cx_ite = cx_ite.next;
				}
			}
		}
		body.validate_mass();
		body.validate_inertia();
		if(body.velx != 0 || body.vely != 0 || body.angvel != 0) {
			throw haxe_Exception.thrown("Error: Static body cannot have any real velocity, only kinematic or surface velocities");
		}
		let cx_ite = body.shapes.head;
		while(cx_ite != null) {
			let s = cx_ite.elt;
			if(s.type == ZPP_Flags.id_ShapeType_POLYGON) {
				let _this = s.polygon;
				if(_this.zip_sanitation) {
					_this.zip_sanitation = false;
					_this.splice_collinear_real();
				}
				let res = s.polygon.valid();
				if(ZPP_Flags.ValidationResult_VALID == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.ValidationResult_VALID = new ValidationResult();
					ZPP_Flags.internal = false;
				}
				if(res != ZPP_Flags.ValidationResult_VALID) {
					throw haxe_Exception.thrown("Error: Cannot simulate with an invalid Polygon : " + s.polygon.outer.toString() + " is invalid : " + res.toString());
				}
				let _this1 = s.polygon;
				if(_this1.zip_gaxi) {
					if(_this1.body != null) {
						_this1.zip_gaxi = false;
						_this1.validate_laxi();
						let _this = _this1.body;
						if(_this.zip_axis) {
							_this.zip_axis = false;
							_this.axisx = Math.sin(_this.rot);
							_this.axisy = Math.cos(_this.rot);
						}
						if(_this1.zip_gverts) {
							if(_this1.body != null) {
								_this1.zip_gverts = false;
								_this1.validate_lverts();
								let _this = _this1.body;
								if(_this.zip_axis) {
									_this.zip_axis = false;
									_this.axisx = Math.sin(_this.rot);
									_this.axisy = Math.cos(_this.rot);
								}
								let li = _this1.lverts.next;
								let cx_ite = _this1.gverts.next;
								while(cx_ite != null) {
									let g = cx_ite;
									let l = li;
									li = li.next;
									g.x = _this1.body.posx + (_this1.body.axisy * l.x - _this1.body.axisx * l.y);
									g.y = _this1.body.posy + (l.x * _this1.body.axisx + l.y * _this1.body.axisy);
									cx_ite = cx_ite.next;
								}
							}
						}
						let ite = _this1.edges.head;
						let cx_ite = _this1.gverts.next;
						let u = cx_ite;
						cx_ite = cx_ite.next;
						while(cx_ite != null) {
							let v = cx_ite;
							let e = ite.elt;
							ite = ite.next;
							e.gp0 = u;
							e.gp1 = v;
							e.gnormx = _this1.body.axisy * e.lnormx - _this1.body.axisx * e.lnormy;
							e.gnormy = e.lnormx * _this1.body.axisx + e.lnormy * _this1.body.axisy;
							e.gprojection = _this1.body.posx * e.gnormx + _this1.body.posy * e.gnormy + e.lprojection;
							if(e.wrap_gnorm != null) {
								e.wrap_gnorm.zpp_inner.x = e.gnormx;
								e.wrap_gnorm.zpp_inner.y = e.gnormy;
							}
							e.tp0 = e.gp0.y * e.gnormx - e.gp0.x * e.gnormy;
							e.tp1 = e.gp1.y * e.gnormx - e.gp1.x * e.gnormy;
							u = v;
							cx_ite = cx_ite.next;
						}
						let v = _this1.gverts.next;
						let e = ite.elt;
						ite = ite.next;
						e.gp0 = u;
						e.gp1 = v;
						e.gnormx = _this1.body.axisy * e.lnormx - _this1.body.axisx * e.lnormy;
						e.gnormy = e.lnormx * _this1.body.axisx + e.lnormy * _this1.body.axisy;
						e.gprojection = _this1.body.posx * e.gnormx + _this1.body.posy * e.gnormy + e.lprojection;
						if(e.wrap_gnorm != null) {
							e.wrap_gnorm.zpp_inner.x = e.gnormx;
							e.wrap_gnorm.zpp_inner.y = e.gnormy;
						}
						e.tp0 = e.gp0.y * e.gnormx - e.gp0.x * e.gnormy;
						e.tp1 = e.gp1.y * e.gnormx - e.gp1.x * e.gnormy;
					}
				}
			}
			cx_ite = cx_ite.next;
		}
		body.sweepFrozen = true;
	}
	validation() {
		let _this = this.cbsets;
		if(!_this.cbsets.empty()) {
			let set_ite = _this.cbsets.parent;
			while(set_ite.prev != null) set_ite = set_ite.prev;
			while(set_ite != null) {
				let cb = set_ite.data;
				cb.validate();
				if(set_ite.next != null) {
					set_ite = set_ite.next;
					while(set_ite.prev != null) set_ite = set_ite.prev;
				} else {
					while(set_ite.parent != null && set_ite == set_ite.parent.next) set_ite = set_ite.parent;
					set_ite = set_ite.parent;
				}
			}
		}
		let cx_ite = this.live.head;
		while(cx_ite != null) {
			let cur = cx_ite.elt;
			cur.sweepRadius = 0;
			let cx_ite1 = cur.shapes.head;
			while(cx_ite1 != null) {
				let s = cx_ite1.elt;
				if(s.type == ZPP_Flags.id_ShapeType_POLYGON) {
					let _this = s.polygon;
					if(_this.zip_sanitation) {
						_this.zip_sanitation = false;
						_this.splice_collinear_real();
					}
					let res = s.polygon.valid();
					if(ZPP_Flags.ValidationResult_VALID == null) {
						ZPP_Flags.internal = true;
						ZPP_Flags.ValidationResult_VALID = new ValidationResult();
						ZPP_Flags.internal = false;
					}
					if(res != ZPP_Flags.ValidationResult_VALID) {
						throw haxe_Exception.thrown("Error: Cannot simulate with an invalid Polygon : " + s.polygon.outer.toString() + " is invalid : " + res.toString());
					}
					let _this1 = s.polygon;
					if(_this1.zip_gaxi) {
						if(_this1.body != null) {
							_this1.zip_gaxi = false;
							_this1.validate_laxi();
							let _this = _this1.body;
							if(_this.zip_axis) {
								_this.zip_axis = false;
								_this.axisx = Math.sin(_this.rot);
								_this.axisy = Math.cos(_this.rot);
							}
							if(_this1.zip_gverts) {
								if(_this1.body != null) {
									_this1.zip_gverts = false;
									_this1.validate_lverts();
									let _this = _this1.body;
									if(_this.zip_axis) {
										_this.zip_axis = false;
										_this.axisx = Math.sin(_this.rot);
										_this.axisy = Math.cos(_this.rot);
									}
									let li = _this1.lverts.next;
									let cx_ite = _this1.gverts.next;
									while(cx_ite != null) {
										let g = cx_ite;
										let l = li;
										li = li.next;
										g.x = _this1.body.posx + (_this1.body.axisy * l.x - _this1.body.axisx * l.y);
										g.y = _this1.body.posy + (l.x * _this1.body.axisx + l.y * _this1.body.axisy);
										cx_ite = cx_ite.next;
									}
								}
							}
							let ite = _this1.edges.head;
							let cx_ite = _this1.gverts.next;
							let u = cx_ite;
							cx_ite = cx_ite.next;
							while(cx_ite != null) {
								let v = cx_ite;
								let e = ite.elt;
								ite = ite.next;
								e.gp0 = u;
								e.gp1 = v;
								e.gnormx = _this1.body.axisy * e.lnormx - _this1.body.axisx * e.lnormy;
								e.gnormy = e.lnormx * _this1.body.axisx + e.lnormy * _this1.body.axisy;
								e.gprojection = _this1.body.posx * e.gnormx + _this1.body.posy * e.gnormy + e.lprojection;
								if(e.wrap_gnorm != null) {
									e.wrap_gnorm.zpp_inner.x = e.gnormx;
									e.wrap_gnorm.zpp_inner.y = e.gnormy;
								}
								e.tp0 = e.gp0.y * e.gnormx - e.gp0.x * e.gnormy;
								e.tp1 = e.gp1.y * e.gnormx - e.gp1.x * e.gnormy;
								u = v;
								cx_ite = cx_ite.next;
							}
							let v = _this1.gverts.next;
							let e = ite.elt;
							ite = ite.next;
							e.gp0 = u;
							e.gp1 = v;
							e.gnormx = _this1.body.axisy * e.lnormx - _this1.body.axisx * e.lnormy;
							e.gnormy = e.lnormx * _this1.body.axisx + e.lnormy * _this1.body.axisy;
							e.gprojection = _this1.body.posx * e.gnormx + _this1.body.posy * e.gnormy + e.lprojection;
							if(e.wrap_gnorm != null) {
								e.wrap_gnorm.zpp_inner.x = e.gnormx;
								e.wrap_gnorm.zpp_inner.y = e.gnormy;
							}
							e.tp0 = e.gp0.y * e.gnormx - e.gp0.x * e.gnormy;
							e.tp1 = e.gp1.y * e.gnormx - e.gp1.x * e.gnormy;
						}
					}
				}
				s.validate_sweepRadius();
				if(s.sweepRadius > cur.sweepRadius) {
					cur.sweepRadius = s.sweepRadius;
				}
				cx_ite1 = cx_ite1.next;
			}
			cur.validate_mass();
			cur.validate_inertia();
			if(cur.shapes.head != null) {
				if(cur.shapes.head == null) {
					throw haxe_Exception.thrown("Error: Body bounds only makes sense if it contains shapes");
				}
				if(cur.zip_aabb) {
					cur.zip_aabb = false;
					cur.aabb.minx = Infinity;
					cur.aabb.miny = Infinity;
					cur.aabb.maxx = -Infinity;
					cur.aabb.maxy = -Infinity;
					let cx_ite = cur.shapes.head;
					while(cx_ite != null) {
						let s = cx_ite.elt;
						if(s.zip_aabb) {
							if(s.body != null) {
								s.zip_aabb = false;
								if(s.type == ZPP_Flags.id_ShapeType_CIRCLE) {
									let _this = s.circle;
									if(_this.zip_worldCOM) {
										if(_this.body != null) {
											_this.zip_worldCOM = false;
											if(_this.zip_localCOM) {
												_this.zip_localCOM = false;
												if(_this.type == ZPP_Flags.id_ShapeType_POLYGON) {
													let _this1 = _this.polygon;
													if(_this1.lverts.next == null) {
														throw haxe_Exception.thrown("Error: An empty polygon has no meaningful localCOM");
													}
													if(_this1.lverts.next.next == null) {
														_this1.localCOMx = _this1.lverts.next.x;
														_this1.localCOMy = _this1.lverts.next.y;
													} else if(_this1.lverts.next.next.next == null) {
														_this1.localCOMx = _this1.lverts.next.x;
														_this1.localCOMy = _this1.lverts.next.y;
														let t = 1.0;
														_this1.localCOMx += _this1.lverts.next.next.x * t;
														_this1.localCOMy += _this1.lverts.next.next.y * t;
														let t1 = 0.5;
														_this1.localCOMx *= t1;
														_this1.localCOMy *= t1;
													} else {
														_this1.localCOMx = 0;
														_this1.localCOMy = 0;
														let area = 0.0;
														let cx_ite = _this1.lverts.next;
														let u = cx_ite;
														cx_ite = cx_ite.next;
														let v = cx_ite;
														cx_ite = cx_ite.next;
														while(cx_ite != null) {
															let w = cx_ite;
															area += v.x * (w.y - u.y);
															let cf = w.y * v.x - w.x * v.y;
															_this1.localCOMx += (v.x + w.x) * cf;
															_this1.localCOMy += (v.y + w.y) * cf;
															u = v;
															v = w;
															cx_ite = cx_ite.next;
														}
														cx_ite = _this1.lverts.next;
														let w = cx_ite;
														area += v.x * (w.y - u.y);
														let cf = w.y * v.x - w.x * v.y;
														_this1.localCOMx += (v.x + w.x) * cf;
														_this1.localCOMy += (v.y + w.y) * cf;
														u = v;
														v = w;
														cx_ite = cx_ite.next;
														let w1 = cx_ite;
														area += v.x * (w1.y - u.y);
														let cf1 = w1.y * v.x - w1.x * v.y;
														_this1.localCOMx += (v.x + w1.x) * cf1;
														_this1.localCOMy += (v.y + w1.y) * cf1;
														area = 1 / (3 * area);
														let t = area;
														_this1.localCOMx *= t;
														_this1.localCOMy *= t;
													}
												}
												if(_this.wrap_localCOM != null) {
													_this.wrap_localCOM.zpp_inner.x = _this.localCOMx;
													_this.wrap_localCOM.zpp_inner.y = _this.localCOMy;
												}
											}
											let _this1 = _this.body;
											if(_this1.zip_axis) {
												_this1.zip_axis = false;
												_this1.axisx = Math.sin(_this1.rot);
												_this1.axisy = Math.cos(_this1.rot);
											}
											_this.worldCOMx = _this.body.posx + (_this.body.axisy * _this.localCOMx - _this.body.axisx * _this.localCOMy);
											_this.worldCOMy = _this.body.posy + (_this.localCOMx * _this.body.axisx + _this.localCOMy * _this.body.axisy);
										}
									}
									let rx = _this.radius;
									let ry = _this.radius;
									_this.aabb.minx = _this.worldCOMx - rx;
									_this.aabb.miny = _this.worldCOMy - ry;
									_this.aabb.maxx = _this.worldCOMx + rx;
									_this.aabb.maxy = _this.worldCOMy + ry;
								} else {
									let _this = s.polygon;
									if(_this.zip_gverts) {
										if(_this.body != null) {
											_this.zip_gverts = false;
											_this.validate_lverts();
											let _this1 = _this.body;
											if(_this1.zip_axis) {
												_this1.zip_axis = false;
												_this1.axisx = Math.sin(_this1.rot);
												_this1.axisy = Math.cos(_this1.rot);
											}
											let li = _this.lverts.next;
											let cx_ite = _this.gverts.next;
											while(cx_ite != null) {
												let g = cx_ite;
												let l = li;
												li = li.next;
												g.x = _this.body.posx + (_this.body.axisy * l.x - _this.body.axisx * l.y);
												g.y = _this.body.posy + (l.x * _this.body.axisx + l.y * _this.body.axisy);
												cx_ite = cx_ite.next;
											}
										}
									}
									if(_this.lverts.next == null) {
										throw haxe_Exception.thrown("Error: An empty polygon has no meaningful bounds");
									}
									let p0 = _this.gverts.next;
									_this.aabb.minx = p0.x;
									_this.aabb.miny = p0.y;
									_this.aabb.maxx = p0.x;
									_this.aabb.maxy = p0.y;
									let cx_ite = _this.gverts.next.next;
									while(cx_ite != null) {
										let p = cx_ite;
										if(p.x < _this.aabb.minx) {
											_this.aabb.minx = p.x;
										}
										if(p.x > _this.aabb.maxx) {
											_this.aabb.maxx = p.x;
										}
										if(p.y < _this.aabb.miny) {
											_this.aabb.miny = p.y;
										}
										if(p.y > _this.aabb.maxy) {
											_this.aabb.maxy = p.y;
										}
										cx_ite = cx_ite.next;
									}
								}
							}
						}
						let _this = cur.aabb;
						let x = s.aabb;
						if(x.minx < _this.minx) {
							_this.minx = x.minx;
						}
						if(x.maxx > _this.maxx) {
							_this.maxx = x.maxx;
						}
						if(x.miny < _this.miny) {
							_this.miny = x.miny;
						}
						if(x.maxy > _this.maxy) {
							_this.maxy = x.maxy;
						}
						cx_ite = cx_ite.next;
					}
				}
				cur.validate_worldCOM();
			}
			cur.validate_gravMass();
			if(cur.zip_axis) {
				cur.zip_axis = false;
				cur.axisx = Math.sin(cur.rot);
				cur.axisy = Math.cos(cur.rot);
			}
			if(!cur.nomove && cur.type == ZPP_Flags.id_BodyType_DYNAMIC && cur.mass == 0) {
				throw haxe_Exception.thrown("Error: Dynamic Body cannot be simulated with 0 mass unless allowMovement is false");
			}
			if(!cur.norotate && cur.type == ZPP_Flags.id_BodyType_DYNAMIC && cur.inertia == 0) {
				throw haxe_Exception.thrown("Error: Dynamic Body cannot be simulated with 0 inertia unless allowRotation is false");
			}
			if(cur.component.woken && cur.cbSet != null) {
				let cx_ite = cur.cbSet.bodylisteners.head;
				while(cx_ite != null) {
					let i = cx_ite.elt;
					if(i.event != ZPP_Flags.id_CbEvent_WAKE) {
						cx_ite = cx_ite.next;
						continue;
					}
					let cb = this.push_callback(i);
					cb.event = ZPP_Flags.id_CbEvent_WAKE;
					cb.body = cur;
					cx_ite = cx_ite.next;
				}
			}
			cur.component.woken = false;
			let cx_ite2 = cur.shapes.head;
			while(cx_ite2 != null) {
				let shape = cx_ite2.elt;
				this.bphase.sync(shape);
				cx_ite2 = cx_ite2.next;
			}
			cx_ite = cx_ite.next;
		}
		let cx_ite1 = this.kinematics.head;
		while(cx_ite1 != null) {
			let cur = cx_ite1.elt;
			cur.sweepRadius = 0;
			let cx_ite = cur.shapes.head;
			while(cx_ite != null) {
				let s = cx_ite.elt;
				if(s.type == ZPP_Flags.id_ShapeType_POLYGON) {
					let _this = s.polygon;
					if(_this.zip_sanitation) {
						_this.zip_sanitation = false;
						_this.splice_collinear_real();
					}
					let res = s.polygon.valid();
					if(ZPP_Flags.ValidationResult_VALID == null) {
						ZPP_Flags.internal = true;
						ZPP_Flags.ValidationResult_VALID = new ValidationResult();
						ZPP_Flags.internal = false;
					}
					if(res != ZPP_Flags.ValidationResult_VALID) {
						throw haxe_Exception.thrown("Error: Cannot simulate with an invalid Polygon : " + s.polygon.outer.toString() + " is invalid : " + res.toString());
					}
					let _this1 = s.polygon;
					if(_this1.zip_gaxi) {
						if(_this1.body != null) {
							_this1.zip_gaxi = false;
							_this1.validate_laxi();
							let _this = _this1.body;
							if(_this.zip_axis) {
								_this.zip_axis = false;
								_this.axisx = Math.sin(_this.rot);
								_this.axisy = Math.cos(_this.rot);
							}
							if(_this1.zip_gverts) {
								if(_this1.body != null) {
									_this1.zip_gverts = false;
									_this1.validate_lverts();
									let _this = _this1.body;
									if(_this.zip_axis) {
										_this.zip_axis = false;
										_this.axisx = Math.sin(_this.rot);
										_this.axisy = Math.cos(_this.rot);
									}
									let li = _this1.lverts.next;
									let cx_ite = _this1.gverts.next;
									while(cx_ite != null) {
										let g = cx_ite;
										let l = li;
										li = li.next;
										g.x = _this1.body.posx + (_this1.body.axisy * l.x - _this1.body.axisx * l.y);
										g.y = _this1.body.posy + (l.x * _this1.body.axisx + l.y * _this1.body.axisy);
										cx_ite = cx_ite.next;
									}
								}
							}
							let ite = _this1.edges.head;
							let cx_ite = _this1.gverts.next;
							let u = cx_ite;
							cx_ite = cx_ite.next;
							while(cx_ite != null) {
								let v = cx_ite;
								let e = ite.elt;
								ite = ite.next;
								e.gp0 = u;
								e.gp1 = v;
								e.gnormx = _this1.body.axisy * e.lnormx - _this1.body.axisx * e.lnormy;
								e.gnormy = e.lnormx * _this1.body.axisx + e.lnormy * _this1.body.axisy;
								e.gprojection = _this1.body.posx * e.gnormx + _this1.body.posy * e.gnormy + e.lprojection;
								if(e.wrap_gnorm != null) {
									e.wrap_gnorm.zpp_inner.x = e.gnormx;
									e.wrap_gnorm.zpp_inner.y = e.gnormy;
								}
								e.tp0 = e.gp0.y * e.gnormx - e.gp0.x * e.gnormy;
								e.tp1 = e.gp1.y * e.gnormx - e.gp1.x * e.gnormy;
								u = v;
								cx_ite = cx_ite.next;
							}
							let v = _this1.gverts.next;
							let e = ite.elt;
							ite = ite.next;
							e.gp0 = u;
							e.gp1 = v;
							e.gnormx = _this1.body.axisy * e.lnormx - _this1.body.axisx * e.lnormy;
							e.gnormy = e.lnormx * _this1.body.axisx + e.lnormy * _this1.body.axisy;
							e.gprojection = _this1.body.posx * e.gnormx + _this1.body.posy * e.gnormy + e.lprojection;
							if(e.wrap_gnorm != null) {
								e.wrap_gnorm.zpp_inner.x = e.gnormx;
								e.wrap_gnorm.zpp_inner.y = e.gnormy;
							}
							e.tp0 = e.gp0.y * e.gnormx - e.gp0.x * e.gnormy;
							e.tp1 = e.gp1.y * e.gnormx - e.gp1.x * e.gnormy;
						}
					}
				}
				s.validate_sweepRadius();
				if(s.sweepRadius > cur.sweepRadius) {
					cur.sweepRadius = s.sweepRadius;
				}
				cx_ite = cx_ite.next;
			}
			cur.validate_mass();
			cur.validate_inertia();
			if(cur.shapes.head != null) {
				if(cur.shapes.head == null) {
					throw haxe_Exception.thrown("Error: Body bounds only makes sense if it contains shapes");
				}
				if(cur.zip_aabb) {
					cur.zip_aabb = false;
					cur.aabb.minx = Infinity;
					cur.aabb.miny = Infinity;
					cur.aabb.maxx = -Infinity;
					cur.aabb.maxy = -Infinity;
					let cx_ite = cur.shapes.head;
					while(cx_ite != null) {
						let s = cx_ite.elt;
						if(s.zip_aabb) {
							if(s.body != null) {
								s.zip_aabb = false;
								if(s.type == ZPP_Flags.id_ShapeType_CIRCLE) {
									let _this = s.circle;
									if(_this.zip_worldCOM) {
										if(_this.body != null) {
											_this.zip_worldCOM = false;
											if(_this.zip_localCOM) {
												_this.zip_localCOM = false;
												if(_this.type == ZPP_Flags.id_ShapeType_POLYGON) {
													let _this1 = _this.polygon;
													if(_this1.lverts.next == null) {
														throw haxe_Exception.thrown("Error: An empty polygon has no meaningful localCOM");
													}
													if(_this1.lverts.next.next == null) {
														_this1.localCOMx = _this1.lverts.next.x;
														_this1.localCOMy = _this1.lverts.next.y;
													} else if(_this1.lverts.next.next.next == null) {
														_this1.localCOMx = _this1.lverts.next.x;
														_this1.localCOMy = _this1.lverts.next.y;
														let t = 1.0;
														_this1.localCOMx += _this1.lverts.next.next.x * t;
														_this1.localCOMy += _this1.lverts.next.next.y * t;
														let t1 = 0.5;
														_this1.localCOMx *= t1;
														_this1.localCOMy *= t1;
													} else {
														_this1.localCOMx = 0;
														_this1.localCOMy = 0;
														let area = 0.0;
														let cx_ite = _this1.lverts.next;
														let u = cx_ite;
														cx_ite = cx_ite.next;
														let v = cx_ite;
														cx_ite = cx_ite.next;
														while(cx_ite != null) {
															let w = cx_ite;
															area += v.x * (w.y - u.y);
															let cf = w.y * v.x - w.x * v.y;
															_this1.localCOMx += (v.x + w.x) * cf;
															_this1.localCOMy += (v.y + w.y) * cf;
															u = v;
															v = w;
															cx_ite = cx_ite.next;
														}
														cx_ite = _this1.lverts.next;
														let w = cx_ite;
														area += v.x * (w.y - u.y);
														let cf = w.y * v.x - w.x * v.y;
														_this1.localCOMx += (v.x + w.x) * cf;
														_this1.localCOMy += (v.y + w.y) * cf;
														u = v;
														v = w;
														cx_ite = cx_ite.next;
														let w1 = cx_ite;
														area += v.x * (w1.y - u.y);
														let cf1 = w1.y * v.x - w1.x * v.y;
														_this1.localCOMx += (v.x + w1.x) * cf1;
														_this1.localCOMy += (v.y + w1.y) * cf1;
														area = 1 / (3 * area);
														let t = area;
														_this1.localCOMx *= t;
														_this1.localCOMy *= t;
													}
												}
												if(_this.wrap_localCOM != null) {
													_this.wrap_localCOM.zpp_inner.x = _this.localCOMx;
													_this.wrap_localCOM.zpp_inner.y = _this.localCOMy;
												}
											}
											let _this1 = _this.body;
											if(_this1.zip_axis) {
												_this1.zip_axis = false;
												_this1.axisx = Math.sin(_this1.rot);
												_this1.axisy = Math.cos(_this1.rot);
											}
											_this.worldCOMx = _this.body.posx + (_this.body.axisy * _this.localCOMx - _this.body.axisx * _this.localCOMy);
											_this.worldCOMy = _this.body.posy + (_this.localCOMx * _this.body.axisx + _this.localCOMy * _this.body.axisy);
										}
									}
									let rx = _this.radius;
									let ry = _this.radius;
									_this.aabb.minx = _this.worldCOMx - rx;
									_this.aabb.miny = _this.worldCOMy - ry;
									_this.aabb.maxx = _this.worldCOMx + rx;
									_this.aabb.maxy = _this.worldCOMy + ry;
								} else {
									let _this = s.polygon;
									if(_this.zip_gverts) {
										if(_this.body != null) {
											_this.zip_gverts = false;
											_this.validate_lverts();
											let _this1 = _this.body;
											if(_this1.zip_axis) {
												_this1.zip_axis = false;
												_this1.axisx = Math.sin(_this1.rot);
												_this1.axisy = Math.cos(_this1.rot);
											}
											let li = _this.lverts.next;
											let cx_ite = _this.gverts.next;
											while(cx_ite != null) {
												let g = cx_ite;
												let l = li;
												li = li.next;
												g.x = _this.body.posx + (_this.body.axisy * l.x - _this.body.axisx * l.y);
												g.y = _this.body.posy + (l.x * _this.body.axisx + l.y * _this.body.axisy);
												cx_ite = cx_ite.next;
											}
										}
									}
									if(_this.lverts.next == null) {
										throw haxe_Exception.thrown("Error: An empty polygon has no meaningful bounds");
									}
									let p0 = _this.gverts.next;
									_this.aabb.minx = p0.x;
									_this.aabb.miny = p0.y;
									_this.aabb.maxx = p0.x;
									_this.aabb.maxy = p0.y;
									let cx_ite = _this.gverts.next.next;
									while(cx_ite != null) {
										let p = cx_ite;
										if(p.x < _this.aabb.minx) {
											_this.aabb.minx = p.x;
										}
										if(p.x > _this.aabb.maxx) {
											_this.aabb.maxx = p.x;
										}
										if(p.y < _this.aabb.miny) {
											_this.aabb.miny = p.y;
										}
										if(p.y > _this.aabb.maxy) {
											_this.aabb.maxy = p.y;
										}
										cx_ite = cx_ite.next;
									}
								}
							}
						}
						let _this = cur.aabb;
						let x = s.aabb;
						if(x.minx < _this.minx) {
							_this.minx = x.minx;
						}
						if(x.maxx > _this.maxx) {
							_this.maxx = x.maxx;
						}
						if(x.miny < _this.miny) {
							_this.miny = x.miny;
						}
						if(x.maxy > _this.maxy) {
							_this.maxy = x.maxy;
						}
						cx_ite = cx_ite.next;
					}
				}
				cur.validate_worldCOM();
			}
			cur.validate_gravMass();
			if(cur.zip_axis) {
				cur.zip_axis = false;
				cur.axisx = Math.sin(cur.rot);
				cur.axisy = Math.cos(cur.rot);
			}
			if(!cur.nomove && cur.type == ZPP_Flags.id_BodyType_DYNAMIC && cur.mass == 0) {
				throw haxe_Exception.thrown("Error: Dynamic Body cannot be simulated with 0 mass unless allowMovement is false");
			}
			if(!cur.norotate && cur.type == ZPP_Flags.id_BodyType_DYNAMIC && cur.inertia == 0) {
				throw haxe_Exception.thrown("Error: Dynamic Body cannot be simulated with 0 inertia unless allowRotation is false");
			}
			let cx_ite2 = cur.shapes.head;
			while(cx_ite2 != null) {
				let shape = cx_ite2.elt;
				this.bphase.sync(shape);
				cx_ite2 = cx_ite2.next;
			}
			cx_ite1 = cx_ite1.next;
		}
		let cx_ite2 = this.live_constraints.head;
		while(cx_ite2 != null) {
			let con = cx_ite2.elt;
			if(con.active) {
				con.validate();
				if(con.component.woken && con.cbSet != null) {
					let cx_ite = con.cbSet.conlisteners.head;
					while(cx_ite != null) {
						let i = cx_ite.elt;
						if(i.event != ZPP_Flags.id_CbEvent_WAKE) {
							cx_ite = cx_ite.next;
							continue;
						}
						let cb = this.push_callback(i);
						cb.event = ZPP_Flags.id_CbEvent_WAKE;
						cb.constraint = con;
						cx_ite = cx_ite.next;
					}
				}
				con.component.woken = false;
			}
			cx_ite2 = cx_ite2.next;
		}
	}
	updateVel(dt) {
		let pre = null;
		let linDrag = 1 - dt * this.global_lin_drag;
		let angDrag = 1 - dt * this.global_ang_drag;
		let cx_ite = this.live.head;
		while(cx_ite != null) {
			let cur = cx_ite.elt;
			if(cur.smass != 0.0) {
				let time = dt * cur.imass;
				cur.velx = linDrag * cur.velx + (cur.forcex + this.gravityx * cur.gravMass) * time;
				cur.vely = linDrag * cur.vely + (cur.forcey + this.gravityy * cur.gravMass) * time;
			}
			if(cur.sinertia != 0.0) {
				let dpx = 0.0;
				let dpy = 0.0;
				dpx = cur.worldCOMx - cur.posx;
				dpy = cur.worldCOMy - cur.posy;
				let torque = cur.torque + (this.gravityy * dpx - this.gravityx * dpy) * cur.gravMass;
				cur.angvel = angDrag * cur.angvel + torque * dt * cur.iinertia;
			}
			pre = cx_ite;
			cx_ite = cx_ite.next;
		}
	}
	updatePos(dt) {
		let MAX_VEL = 2 * Math.PI / dt;
		let cx_ite = this.live.head;
		while(cx_ite != null) {
			let cur = cx_ite.elt;
			cur.pre_posx = cur.posx;
			cur.pre_posy = cur.posy;
			cur.pre_rot = cur.rot;
			cur.sweepTime = 0;
			cur.sweep_angvel = cur.angvel % MAX_VEL;
			let delta = dt - cur.sweepTime;
			if(delta != 0) {
				cur.sweepTime = dt;
				let t = delta;
				cur.posx += cur.velx * t;
				cur.posy += cur.vely * t;
				if(cur.angvel != 0) {
					let dr = cur.sweep_angvel * delta;
					cur.rot += dr;
					if(dr * dr > 0.0001) {
						cur.axisx = Math.sin(cur.rot);
						cur.axisy = Math.cos(cur.rot);
					} else {
						let d2 = dr * dr;
						let p = 1 - 0.5 * d2;
						let m = 1 - d2 * d2 / 8;
						let nx = (p * cur.axisx + dr * cur.axisy) * m;
						cur.axisy = (p * cur.axisy - dr * cur.axisx) * m;
						cur.axisx = nx;
					}
				}
			}
			if(!cur.disableCCD) {
				let linThreshold = Config.staticCCDLinearThreshold * cur.sweepRadius;
				let angThreshold = Config.staticCCDAngularThreshold;
				if((cur.velx * cur.velx + cur.vely * cur.vely) * dt * dt > linThreshold * linThreshold || cur.angvel * cur.angvel * dt * dt > angThreshold * angThreshold || cur.type == ZPP_Flags.id_BodyType_KINEMATIC) {
					let angvel = cur.sweep_angvel;
					if(angvel < 0) {
						angvel = -angvel;
					}
					let iangvel = 1 / angvel;
					let cx_ite = cur.shapes.head;
					while(cx_ite != null) {
						let s = cx_ite.elt;
						let aabb = s.aabb;
						let minx = aabb.minx;
						let miny = aabb.miny;
						let maxx = aabb.maxx;
						let maxy = aabb.maxy;
						let count = angvel * dt * s.sweepCoef * 0.00833333333333333322 | 0;
						if(count > 8) {
							count = 8;
						}
						let anginc = angvel * dt / count;
						let delta = dt - cur.sweepTime;
						if(delta != 0) {
							cur.sweepTime = dt;
							let t = delta;
							cur.posx += cur.velx * t;
							cur.posy += cur.vely * t;
							if(cur.angvel != 0) {
								let dr = cur.sweep_angvel * delta;
								cur.rot += dr;
								if(dr * dr > 0.0001) {
									cur.axisx = Math.sin(cur.rot);
									cur.axisy = Math.cos(cur.rot);
								} else {
									let d2 = dr * dr;
									let p = 1 - 0.5 * d2;
									let m = 1 - d2 * d2 / 8;
									let nx = (p * cur.axisx + dr * cur.axisy) * m;
									cur.axisy = (p * cur.axisy - dr * cur.axisx) * m;
									cur.axisx = nx;
								}
							}
						}
						if(s.type == ZPP_Flags.id_ShapeType_CIRCLE) {
							let _this = s.circle;
							_this.worldCOMx = _this.body.posx + (_this.body.axisy * _this.localCOMx - _this.body.axisx * _this.localCOMy);
							_this.worldCOMy = _this.body.posy + (_this.localCOMx * _this.body.axisx + _this.localCOMy * _this.body.axisy);
							_this.aabb.minx = _this.worldCOMx - _this.radius;
							_this.aabb.miny = _this.worldCOMy - _this.radius;
							_this.aabb.maxx = _this.worldCOMx + _this.radius;
							_this.aabb.maxy = _this.worldCOMy + _this.radius;
						} else {
							let _this = s.polygon;
							let li = _this.lverts.next;
							let p0 = _this.gverts.next;
							let l = li;
							li = li.next;
							p0.x = _this.body.posx + (_this.body.axisy * l.x - _this.body.axisx * l.y);
							p0.y = _this.body.posy + (l.x * _this.body.axisx + l.y * _this.body.axisy);
							_this.aabb.minx = p0.x;
							_this.aabb.miny = p0.y;
							_this.aabb.maxx = p0.x;
							_this.aabb.maxy = p0.y;
							let cx_ite = _this.gverts.next.next;
							while(cx_ite != null) {
								let p = cx_ite;
								let l = li;
								li = li.next;
								p.x = _this.body.posx + (_this.body.axisy * l.x - _this.body.axisx * l.y);
								p.y = _this.body.posy + (l.x * _this.body.axisx + l.y * _this.body.axisy);
								if(p.x < _this.aabb.minx) {
									_this.aabb.minx = p.x;
								}
								if(p.x > _this.aabb.maxx) {
									_this.aabb.maxx = p.x;
								}
								if(p.y < _this.aabb.miny) {
									_this.aabb.miny = p.y;
								}
								if(p.y > _this.aabb.maxy) {
									_this.aabb.maxy = p.y;
								}
								cx_ite = cx_ite.next;
							}
						}
						if(minx < aabb.minx) {
							aabb.minx = minx;
						} else {
							minx = aabb.minx;
						}
						if(miny < aabb.miny) {
							aabb.miny = miny;
						} else {
							miny = aabb.miny;
						}
						if(maxx > aabb.maxx) {
							aabb.maxx = maxx;
						} else {
							maxx = aabb.maxx;
						}
						if(maxy > aabb.maxy) {
							aabb.maxy = maxy;
						} else {
							maxy = aabb.maxy;
						}
						let _g = 1;
						let _g1 = count;
						while(_g < _g1) {
							let i = _g++;
							let dt = anginc * i * iangvel;
							let delta = dt - cur.sweepTime;
							if(delta != 0) {
								cur.sweepTime = dt;
								let t = delta;
								cur.posx += cur.velx * t;
								cur.posy += cur.vely * t;
								if(cur.angvel != 0) {
									let dr = cur.sweep_angvel * delta;
									cur.rot += dr;
									if(dr * dr > 0.0001) {
										cur.axisx = Math.sin(cur.rot);
										cur.axisy = Math.cos(cur.rot);
									} else {
										let d2 = dr * dr;
										let p = 1 - 0.5 * d2;
										let m = 1 - d2 * d2 / 8;
										let nx = (p * cur.axisx + dr * cur.axisy) * m;
										cur.axisy = (p * cur.axisy - dr * cur.axisx) * m;
										cur.axisx = nx;
									}
								}
							}
							if(s.type == ZPP_Flags.id_ShapeType_CIRCLE) {
								let _this = s.circle;
								_this.worldCOMx = _this.body.posx + (_this.body.axisy * _this.localCOMx - _this.body.axisx * _this.localCOMy);
								_this.worldCOMy = _this.body.posy + (_this.localCOMx * _this.body.axisx + _this.localCOMy * _this.body.axisy);
								_this.aabb.minx = _this.worldCOMx - _this.radius;
								_this.aabb.miny = _this.worldCOMy - _this.radius;
								_this.aabb.maxx = _this.worldCOMx + _this.radius;
								_this.aabb.maxy = _this.worldCOMy + _this.radius;
							} else {
								let _this = s.polygon;
								let li = _this.lverts.next;
								let p0 = _this.gverts.next;
								let l = li;
								li = li.next;
								p0.x = _this.body.posx + (_this.body.axisy * l.x - _this.body.axisx * l.y);
								p0.y = _this.body.posy + (l.x * _this.body.axisx + l.y * _this.body.axisy);
								_this.aabb.minx = p0.x;
								_this.aabb.miny = p0.y;
								_this.aabb.maxx = p0.x;
								_this.aabb.maxy = p0.y;
								let cx_ite = _this.gverts.next.next;
								while(cx_ite != null) {
									let p = cx_ite;
									let l = li;
									li = li.next;
									p.x = _this.body.posx + (_this.body.axisy * l.x - _this.body.axisx * l.y);
									p.y = _this.body.posy + (l.x * _this.body.axisx + l.y * _this.body.axisy);
									if(p.x < _this.aabb.minx) {
										_this.aabb.minx = p.x;
									}
									if(p.x > _this.aabb.maxx) {
										_this.aabb.maxx = p.x;
									}
									if(p.y < _this.aabb.miny) {
										_this.aabb.miny = p.y;
									}
									if(p.y > _this.aabb.maxy) {
										_this.aabb.maxy = p.y;
									}
									cx_ite = cx_ite.next;
								}
							}
							if(minx < aabb.minx) {
								aabb.minx = minx;
							} else {
								minx = aabb.minx;
							}
							if(miny < aabb.miny) {
								aabb.miny = miny;
							} else {
								miny = aabb.miny;
							}
							if(maxx > aabb.maxx) {
								aabb.maxx = maxx;
							} else {
								maxx = aabb.maxx;
							}
							if(maxy > aabb.maxy) {
								aabb.maxy = maxy;
							} else {
								maxy = aabb.maxy;
							}
						}
						this.bphase.sync(s);
						cx_ite = cx_ite.next;
					}
					cur.sweepFrozen = false;
					if(cur.type == ZPP_Flags.id_BodyType_DYNAMIC && cur.bulletEnabled) {
						let linThreshold2 = Config.bulletCCDLinearThreshold * cur.sweepRadius;
						let angThreshold2 = Config.bulletCCDAngularThreshold;
						if((cur.velx * cur.velx + cur.vely * cur.vely) * dt * dt > linThreshold2 * linThreshold2 || cur.angvel * cur.angvel * dt * dt > angThreshold2 * angThreshold2) {
							cur.bullet = true;
						}
					}
				} else {
					cur.sweepFrozen = true;
					cur.bullet = false;
				}
			} else {
				cur.sweepFrozen = true;
				cur.bullet = false;
			}
			cx_ite = cx_ite.next;
		}
		let cx_ite1 = this.kinematics.head;
		while(cx_ite1 != null) {
			let cur = cx_ite1.elt;
			cur.pre_posx = cur.posx;
			cur.pre_posy = cur.posy;
			cur.pre_rot = cur.rot;
			cur.sweepTime = 0;
			cur.sweep_angvel = cur.angvel % MAX_VEL;
			let delta = dt - cur.sweepTime;
			if(delta != 0) {
				cur.sweepTime = dt;
				let t = delta;
				cur.posx += cur.velx * t;
				cur.posy += cur.vely * t;
				if(cur.angvel != 0) {
					let dr = cur.sweep_angvel * delta;
					cur.rot += dr;
					if(dr * dr > 0.0001) {
						cur.axisx = Math.sin(cur.rot);
						cur.axisy = Math.cos(cur.rot);
					} else {
						let d2 = dr * dr;
						let p = 1 - 0.5 * d2;
						let m = 1 - d2 * d2 / 8;
						let nx = (p * cur.axisx + dr * cur.axisy) * m;
						cur.axisy = (p * cur.axisy - dr * cur.axisx) * m;
						cur.axisx = nx;
					}
				}
			}
			if(!cur.disableCCD) {
				let linThreshold = Config.staticCCDLinearThreshold * cur.sweepRadius;
				let angThreshold = Config.staticCCDAngularThreshold;
				if((cur.velx * cur.velx + cur.vely * cur.vely) * dt * dt > linThreshold * linThreshold || cur.angvel * cur.angvel * dt * dt > angThreshold * angThreshold || cur.type == ZPP_Flags.id_BodyType_KINEMATIC) {
					let angvel = cur.sweep_angvel;
					if(angvel < 0) {
						angvel = -angvel;
					}
					let iangvel = 1 / angvel;
					let cx_ite = cur.shapes.head;
					while(cx_ite != null) {
						let s = cx_ite.elt;
						let aabb = s.aabb;
						let minx = aabb.minx;
						let miny = aabb.miny;
						let maxx = aabb.maxx;
						let maxy = aabb.maxy;
						let count = angvel * dt * s.sweepCoef * 0.00833333333333333322 | 0;
						if(count > 8) {
							count = 8;
						}
						let anginc = angvel * dt / count;
						let delta = dt - cur.sweepTime;
						if(delta != 0) {
							cur.sweepTime = dt;
							let t = delta;
							cur.posx += cur.velx * t;
							cur.posy += cur.vely * t;
							if(cur.angvel != 0) {
								let dr = cur.sweep_angvel * delta;
								cur.rot += dr;
								if(dr * dr > 0.0001) {
									cur.axisx = Math.sin(cur.rot);
									cur.axisy = Math.cos(cur.rot);
								} else {
									let d2 = dr * dr;
									let p = 1 - 0.5 * d2;
									let m = 1 - d2 * d2 / 8;
									let nx = (p * cur.axisx + dr * cur.axisy) * m;
									cur.axisy = (p * cur.axisy - dr * cur.axisx) * m;
									cur.axisx = nx;
								}
							}
						}
						if(s.type == ZPP_Flags.id_ShapeType_CIRCLE) {
							let _this = s.circle;
							_this.worldCOMx = _this.body.posx + (_this.body.axisy * _this.localCOMx - _this.body.axisx * _this.localCOMy);
							_this.worldCOMy = _this.body.posy + (_this.localCOMx * _this.body.axisx + _this.localCOMy * _this.body.axisy);
							_this.aabb.minx = _this.worldCOMx - _this.radius;
							_this.aabb.miny = _this.worldCOMy - _this.radius;
							_this.aabb.maxx = _this.worldCOMx + _this.radius;
							_this.aabb.maxy = _this.worldCOMy + _this.radius;
						} else {
							let _this = s.polygon;
							let li = _this.lverts.next;
							let p0 = _this.gverts.next;
							let l = li;
							li = li.next;
							p0.x = _this.body.posx + (_this.body.axisy * l.x - _this.body.axisx * l.y);
							p0.y = _this.body.posy + (l.x * _this.body.axisx + l.y * _this.body.axisy);
							_this.aabb.minx = p0.x;
							_this.aabb.miny = p0.y;
							_this.aabb.maxx = p0.x;
							_this.aabb.maxy = p0.y;
							let cx_ite = _this.gverts.next.next;
							while(cx_ite != null) {
								let p = cx_ite;
								let l = li;
								li = li.next;
								p.x = _this.body.posx + (_this.body.axisy * l.x - _this.body.axisx * l.y);
								p.y = _this.body.posy + (l.x * _this.body.axisx + l.y * _this.body.axisy);
								if(p.x < _this.aabb.minx) {
									_this.aabb.minx = p.x;
								}
								if(p.x > _this.aabb.maxx) {
									_this.aabb.maxx = p.x;
								}
								if(p.y < _this.aabb.miny) {
									_this.aabb.miny = p.y;
								}
								if(p.y > _this.aabb.maxy) {
									_this.aabb.maxy = p.y;
								}
								cx_ite = cx_ite.next;
							}
						}
						if(minx < aabb.minx) {
							aabb.minx = minx;
						} else {
							minx = aabb.minx;
						}
						if(miny < aabb.miny) {
							aabb.miny = miny;
						} else {
							miny = aabb.miny;
						}
						if(maxx > aabb.maxx) {
							aabb.maxx = maxx;
						} else {
							maxx = aabb.maxx;
						}
						if(maxy > aabb.maxy) {
							aabb.maxy = maxy;
						} else {
							maxy = aabb.maxy;
						}
						let _g = 1;
						let _g1 = count;
						while(_g < _g1) {
							let i = _g++;
							let dt = anginc * i * iangvel;
							let delta = dt - cur.sweepTime;
							if(delta != 0) {
								cur.sweepTime = dt;
								let t = delta;
								cur.posx += cur.velx * t;
								cur.posy += cur.vely * t;
								if(cur.angvel != 0) {
									let dr = cur.sweep_angvel * delta;
									cur.rot += dr;
									if(dr * dr > 0.0001) {
										cur.axisx = Math.sin(cur.rot);
										cur.axisy = Math.cos(cur.rot);
									} else {
										let d2 = dr * dr;
										let p = 1 - 0.5 * d2;
										let m = 1 - d2 * d2 / 8;
										let nx = (p * cur.axisx + dr * cur.axisy) * m;
										cur.axisy = (p * cur.axisy - dr * cur.axisx) * m;
										cur.axisx = nx;
									}
								}
							}
							if(s.type == ZPP_Flags.id_ShapeType_CIRCLE) {
								let _this = s.circle;
								_this.worldCOMx = _this.body.posx + (_this.body.axisy * _this.localCOMx - _this.body.axisx * _this.localCOMy);
								_this.worldCOMy = _this.body.posy + (_this.localCOMx * _this.body.axisx + _this.localCOMy * _this.body.axisy);
								_this.aabb.minx = _this.worldCOMx - _this.radius;
								_this.aabb.miny = _this.worldCOMy - _this.radius;
								_this.aabb.maxx = _this.worldCOMx + _this.radius;
								_this.aabb.maxy = _this.worldCOMy + _this.radius;
							} else {
								let _this = s.polygon;
								let li = _this.lverts.next;
								let p0 = _this.gverts.next;
								let l = li;
								li = li.next;
								p0.x = _this.body.posx + (_this.body.axisy * l.x - _this.body.axisx * l.y);
								p0.y = _this.body.posy + (l.x * _this.body.axisx + l.y * _this.body.axisy);
								_this.aabb.minx = p0.x;
								_this.aabb.miny = p0.y;
								_this.aabb.maxx = p0.x;
								_this.aabb.maxy = p0.y;
								let cx_ite = _this.gverts.next.next;
								while(cx_ite != null) {
									let p = cx_ite;
									let l = li;
									li = li.next;
									p.x = _this.body.posx + (_this.body.axisy * l.x - _this.body.axisx * l.y);
									p.y = _this.body.posy + (l.x * _this.body.axisx + l.y * _this.body.axisy);
									if(p.x < _this.aabb.minx) {
										_this.aabb.minx = p.x;
									}
									if(p.x > _this.aabb.maxx) {
										_this.aabb.maxx = p.x;
									}
									if(p.y < _this.aabb.miny) {
										_this.aabb.miny = p.y;
									}
									if(p.y > _this.aabb.maxy) {
										_this.aabb.maxy = p.y;
									}
									cx_ite = cx_ite.next;
								}
							}
							if(minx < aabb.minx) {
								aabb.minx = minx;
							} else {
								minx = aabb.minx;
							}
							if(miny < aabb.miny) {
								aabb.miny = miny;
							} else {
								miny = aabb.miny;
							}
							if(maxx > aabb.maxx) {
								aabb.maxx = maxx;
							} else {
								maxx = aabb.maxx;
							}
							if(maxy > aabb.maxy) {
								aabb.maxy = maxy;
							} else {
								maxy = aabb.maxy;
							}
						}
						this.bphase.sync(s);
						cx_ite = cx_ite.next;
					}
					cur.sweepFrozen = false;
					if(cur.type == ZPP_Flags.id_BodyType_DYNAMIC && cur.bulletEnabled) {
						let linThreshold2 = Config.bulletCCDLinearThreshold * cur.sweepRadius;
						let angThreshold2 = Config.bulletCCDAngularThreshold;
						if((cur.velx * cur.velx + cur.vely * cur.vely) * dt * dt > linThreshold2 * linThreshold2 || cur.angvel * cur.angvel * dt * dt > angThreshold2 * angThreshold2) {
							cur.bullet = true;
						}
					}
				} else {
					cur.sweepFrozen = true;
					cur.bullet = false;
				}
			} else {
				cur.sweepFrozen = true;
				cur.bullet = false;
			}
			cx_ite1 = cx_ite1.next;
		}
	}
	presteparb(arb,dt,cont) {
		if(cont == null) {
			cont = false;
		}
		if(!arb.cleared && (arb.b1.component.sleeping && arb.b2.component.sleeping)) {
			arb.sleep_stamp = this.stamp;
			arb.sleeping = true;
			return true;
		}
		let _gthis = this;
		if(!arb.cleared || arb.present != 0 || arb.intchange) {
			let endcb = !cont && arb.up_stamp == this.stamp - 1 && !arb.cleared && !arb.intchange;
			let begcb = arb.fresh && !arb.cleared && !arb.intchange;
			if(endcb) {
				arb.endGenerated = this.stamp;
			}
			if(begcb || endcb || arb.cleared || arb.intchange) {
				let s1 = arb.ws1;
				let s2 = arb.ws2;
				let _this = this.mrca1;
				while(_this.head != null) {
					let ret = _this.head;
					_this.head = ret.next;
					let o = ret;
					o.elt = null;
					o.next = ZNPNode_ZPP_Interactor.zpp_pool;
					ZNPNode_ZPP_Interactor.zpp_pool = o;
					if(_this.head == null) {
						_this.pushmod = true;
					}
					_this.modified = true;
					_this.length--;
				}
				_this.pushmod = true;
				let _this1 = this.mrca2;
				while(_this1.head != null) {
					let ret = _this1.head;
					_this1.head = ret.next;
					let o = ret;
					o.elt = null;
					o.next = ZNPNode_ZPP_Interactor.zpp_pool;
					ZNPNode_ZPP_Interactor.zpp_pool = o;
					if(_this1.head == null) {
						_this1.pushmod = true;
					}
					_this1.modified = true;
					_this1.length--;
				}
				_this1.pushmod = true;
				if(s1.cbSet != null) {
					let _this = this.mrca1;
					let ret;
					if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
						ret = new ZNPNode_ZPP_Interactor();
					} else {
						ret = ZNPNode_ZPP_Interactor.zpp_pool;
						ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = s1;
					let temp = ret;
					temp.next = _this.head;
					_this.head = temp;
					_this.modified = true;
					_this.length++;
				}
				if(s1.body.cbSet != null) {
					let _this = this.mrca1;
					let o = s1.body;
					let ret;
					if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
						ret = new ZNPNode_ZPP_Interactor();
					} else {
						ret = ZNPNode_ZPP_Interactor.zpp_pool;
						ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = o;
					let temp = ret;
					temp.next = _this.head;
					_this.head = temp;
					_this.modified = true;
					_this.length++;
				}
				if(s2.cbSet != null) {
					let _this = this.mrca2;
					let ret;
					if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
						ret = new ZNPNode_ZPP_Interactor();
					} else {
						ret = ZNPNode_ZPP_Interactor.zpp_pool;
						ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = s2;
					let temp = ret;
					temp.next = _this.head;
					_this.head = temp;
					_this.modified = true;
					_this.length++;
				}
				if(s2.body.cbSet != null) {
					let _this = this.mrca2;
					let o = s2.body;
					let ret;
					if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
						ret = new ZNPNode_ZPP_Interactor();
					} else {
						ret = ZNPNode_ZPP_Interactor.zpp_pool;
						ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = o;
					let temp = ret;
					temp.next = _this.head;
					_this.head = temp;
					_this.modified = true;
					_this.length++;
				}
				let c1 = s1.body.compound;
				let c2 = s2.body.compound;
				while(c1 != c2) {
					let d1 = c1 == null ? 0 : c1.depth;
					let d2 = c2 == null ? 0 : c2.depth;
					if(d1 < d2) {
						if(c2.cbSet != null) {
							let _this = this.mrca2;
							let ret;
							if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
								ret = new ZNPNode_ZPP_Interactor();
							} else {
								ret = ZNPNode_ZPP_Interactor.zpp_pool;
								ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.elt = c2;
							let temp = ret;
							temp.next = _this.head;
							_this.head = temp;
							_this.modified = true;
							_this.length++;
						}
						c2 = c2.compound;
					} else {
						if(c1.cbSet != null) {
							let _this = this.mrca1;
							let ret;
							if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
								ret = new ZNPNode_ZPP_Interactor();
							} else {
								ret = ZNPNode_ZPP_Interactor.zpp_pool;
								ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.elt = c1;
							let temp = ret;
							temp.next = _this.head;
							_this.head = temp;
							_this.modified = true;
							_this.length++;
						}
						c1 = c1.compound;
					}
				}
				let cx_ite = this.mrca1.head;
				while(cx_ite != null) {
					let i1 = cx_ite.elt;
					let cx_ite1 = this.mrca2.head;
					while(cx_ite1 != null) {
						let i2 = cx_ite1.elt;
						let cb1 = i1.cbSet;
						let cb2 = i2.cbSet;
						let _this = cb1.manager;
						let ret = null;
						let pairs = cb1.cbpairs.length < cb2.cbpairs.length ? cb1.cbpairs : cb2.cbpairs;
						let cx_ite = pairs.head;
						while(cx_ite != null) {
							let p = cx_ite.elt;
							if(p.a == cb1 && p.b == cb2 || p.a == cb2 && p.b == cb1) {
								ret = p;
								break;
							}
							cx_ite = cx_ite.next;
						}
						if(ret == null) {
							let ret1;
							if(ZPP_CbSetPair.zpp_pool == null) {
								ret1 = new ZPP_CbSetPair();
							} else {
								ret1 = ZPP_CbSetPair.zpp_pool;
								ZPP_CbSetPair.zpp_pool = ret1.next;
								ret1.next = null;
							}
							ret1.zip_listeners = true;
							if(ZPP_CbSet.setlt(cb1,cb2)) {
								ret1.a = cb1;
								ret1.b = cb2;
							} else {
								ret1.a = cb2;
								ret1.b = cb1;
							}
							ret = ret1;
							cb1.cbpairs.add(ret);
							if(cb2 != cb1) {
								cb2.cbpairs.add(ret);
							}
						}
						if(ret.zip_listeners) {
							ret.zip_listeners = false;
							ret.__validate();
						}
						if(ret.listeners.head == null) {
							cx_ite1 = cx_ite1.next;
							continue;
						}
						let callbackset = ZPP_Interactor.get(i1,i2);
						if(begcb || arb.intchange) {
							if(callbackset == null) {
								callbackset = ZPP_CallbackSet.get(i1,i2);
								this.add_callbackset(callbackset);
							}
							let event = ZPP_Flags.id_CbEvent_BEGIN;
							let _this = cb1.manager;
							let ret = null;
							let pairs = cb1.cbpairs.length < cb2.cbpairs.length ? cb1.cbpairs : cb2.cbpairs;
							let cx_ite = pairs.head;
							while(cx_ite != null) {
								let p = cx_ite.elt;
								if(p.a == cb1 && p.b == cb2 || p.a == cb2 && p.b == cb1) {
									ret = p;
									break;
								}
								cx_ite = cx_ite.next;
							}
							if(ret == null) {
								let ret1;
								if(ZPP_CbSetPair.zpp_pool == null) {
									ret1 = new ZPP_CbSetPair();
								} else {
									ret1 = ZPP_CbSetPair.zpp_pool;
									ZPP_CbSetPair.zpp_pool = ret1.next;
									ret1.next = null;
								}
								ret1.zip_listeners = true;
								if(ZPP_CbSet.setlt(cb1,cb2)) {
									ret1.a = cb1;
									ret1.b = cb2;
								} else {
									ret1.a = cb2;
									ret1.b = cb1;
								}
								ret = ret1;
								cb1.cbpairs.add(ret);
								if(cb2 != cb1) {
									cb2.cbpairs.add(ret);
								}
							}
							if(ret.zip_listeners) {
								ret.zip_listeners = false;
								ret.__validate();
							}
							let cx_ite1 = ret.listeners.head;
							while(cx_ite1 != null) {
								let x = cx_ite1.elt;
								if(x.event == event) {
									if((x.itype & arb.type) != 0 && callbackset.empty_arb(x.itype)) {
										let cb = _gthis.push_callback(x);
										cb.event = ZPP_Flags.id_CbEvent_BEGIN;
										let o1 = callbackset.int1;
										let o2 = callbackset.int2;
										let tmp;
										let _this = x.options1;
										let xs = o1.cbTypes;
										if(_this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes)) {
											let _this = x.options2;
											let xs = o2.cbTypes;
											tmp = _this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes);
										} else {
											tmp = false;
										}
										if(tmp) {
											cb.int1 = o1;
											cb.int2 = o2;
										} else {
											cb.int1 = o2;
											cb.int2 = o1;
										}
										cb.set = callbackset;
									}
								}
								cx_ite1 = cx_ite1.next;
							}
							let tmp;
							let ret1;
							ret1 = false;
							let cx_ite2 = callbackset.arbiters.head;
							while(cx_ite2 != null) {
								let npite = cx_ite2.elt;
								if(npite == arb) {
									ret1 = true;
									break;
								}
								cx_ite2 = cx_ite2.next;
							}
							if(!ret1) {
								let _this = callbackset.arbiters;
								let ret;
								if(ZNPNode_ZPP_Arbiter.zpp_pool == null) {
									ret = new ZNPNode_ZPP_Arbiter();
								} else {
									ret = ZNPNode_ZPP_Arbiter.zpp_pool;
									ZNPNode_ZPP_Arbiter.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.elt = arb;
								let temp = ret;
								temp.next = _this.head;
								_this.head = temp;
								_this.modified = true;
								_this.length++;
								tmp = true;
							} else {
								tmp = false;
							}
							if(tmp) {
								arb.present++;
							}
						} else {
							arb.present--;
							callbackset.remove_arb(arb);
							let event = ZPP_Flags.id_CbEvent_END;
							let _this = cb1.manager;
							let ret = null;
							let pairs = cb1.cbpairs.length < cb2.cbpairs.length ? cb1.cbpairs : cb2.cbpairs;
							let cx_ite = pairs.head;
							while(cx_ite != null) {
								let p = cx_ite.elt;
								if(p.a == cb1 && p.b == cb2 || p.a == cb2 && p.b == cb1) {
									ret = p;
									break;
								}
								cx_ite = cx_ite.next;
							}
							if(ret == null) {
								let ret1;
								if(ZPP_CbSetPair.zpp_pool == null) {
									ret1 = new ZPP_CbSetPair();
								} else {
									ret1 = ZPP_CbSetPair.zpp_pool;
									ZPP_CbSetPair.zpp_pool = ret1.next;
									ret1.next = null;
								}
								ret1.zip_listeners = true;
								if(ZPP_CbSet.setlt(cb1,cb2)) {
									ret1.a = cb1;
									ret1.b = cb2;
								} else {
									ret1.a = cb2;
									ret1.b = cb1;
								}
								ret = ret1;
								cb1.cbpairs.add(ret);
								if(cb2 != cb1) {
									cb2.cbpairs.add(ret);
								}
							}
							if(ret.zip_listeners) {
								ret.zip_listeners = false;
								ret.__validate();
							}
							let cx_ite1 = ret.listeners.head;
							while(cx_ite1 != null) {
								let x = cx_ite1.elt;
								if(x.event == event) {
									if((x.itype & arb.type) != 0 && callbackset.empty_arb(x.itype)) {
										let cb = _gthis.push_callback(x);
										cb.event = ZPP_Flags.id_CbEvent_END;
										let o1 = callbackset.int1;
										let o2 = callbackset.int2;
										let tmp;
										let _this = x.options1;
										let xs = o1.cbTypes;
										if(_this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes)) {
											let _this = x.options2;
											let xs = o2.cbTypes;
											tmp = _this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes);
										} else {
											tmp = false;
										}
										if(tmp) {
											cb.int1 = o1;
											cb.int2 = o2;
										} else {
											cb.int1 = o2;
											cb.int2 = o1;
										}
										cb.set = callbackset;
									}
								}
								cx_ite1 = cx_ite1.next;
							}
							if(callbackset.arbiters.head == null) {
								this.remove_callbackset(callbackset);
							}
						}
						cx_ite1 = cx_ite1.next;
					}
					cx_ite = cx_ite.next;
				}
			}
			arb.fresh = false;
			arb.intchange = false;
		}
		if(arb.cleared || arb.up_stamp + (arb.type == ZPP_Arbiter.COL ? Config.arbiterExpirationDelay : 0) < this.stamp) {
			if(arb.type == ZPP_Arbiter.SENSOR) {
				let _this = arb.sensorarb;
				if(!_this.cleared) {
					let _this1 = _this.b1.arbiters;
					let pre = null;
					let cur = _this1.head;
					let ret = false;
					while(cur != null) {
						if(cur.elt == _this) {
							let old;
							let ret1;
							if(pre == null) {
								old = _this1.head;
								ret1 = old.next;
								_this1.head = ret1;
								if(_this1.head == null) {
									_this1.pushmod = true;
								}
							} else {
								old = pre.next;
								ret1 = old.next;
								pre.next = ret1;
								if(ret1 == null) {
									_this1.pushmod = true;
								}
							}
							let o = old;
							o.elt = null;
							o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
							ZNPNode_ZPP_Arbiter.zpp_pool = o;
							_this1.modified = true;
							_this1.length--;
							_this1.pushmod = true;
							ret = true;
							break;
						}
						pre = cur;
						cur = cur.next;
					}
					let _this2 = _this.b2.arbiters;
					let pre1 = null;
					let cur1 = _this2.head;
					let ret1 = false;
					while(cur1 != null) {
						if(cur1.elt == _this) {
							let old;
							let ret;
							if(pre1 == null) {
								old = _this2.head;
								ret = old.next;
								_this2.head = ret;
								if(_this2.head == null) {
									_this2.pushmod = true;
								}
							} else {
								old = pre1.next;
								ret = old.next;
								pre1.next = ret;
								if(ret == null) {
									_this2.pushmod = true;
								}
							}
							let o = old;
							o.elt = null;
							o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
							ZNPNode_ZPP_Arbiter.zpp_pool = o;
							_this2.modified = true;
							_this2.length--;
							_this2.pushmod = true;
							ret1 = true;
							break;
						}
						pre1 = cur1;
						cur1 = cur1.next;
					}
					if(_this.pair != null) {
						_this.pair.arb = null;
						_this.pair = null;
					}
				}
				_this.b1 = _this.b2 = null;
				_this.active = false;
				_this.intchange = false;
				let o = _this;
				o.next = ZPP_SensorArbiter.zpp_pool;
				ZPP_SensorArbiter.zpp_pool = o;
			} else if(arb.type == ZPP_Arbiter.FLUID) {
				let _this = arb.fluidarb;
				if(!_this.cleared) {
					let _this1 = _this.b1.arbiters;
					let pre = null;
					let cur = _this1.head;
					let ret = false;
					while(cur != null) {
						if(cur.elt == _this) {
							let old;
							let ret1;
							if(pre == null) {
								old = _this1.head;
								ret1 = old.next;
								_this1.head = ret1;
								if(_this1.head == null) {
									_this1.pushmod = true;
								}
							} else {
								old = pre.next;
								ret1 = old.next;
								pre.next = ret1;
								if(ret1 == null) {
									_this1.pushmod = true;
								}
							}
							let o = old;
							o.elt = null;
							o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
							ZNPNode_ZPP_Arbiter.zpp_pool = o;
							_this1.modified = true;
							_this1.length--;
							_this1.pushmod = true;
							ret = true;
							break;
						}
						pre = cur;
						cur = cur.next;
					}
					let _this2 = _this.b2.arbiters;
					let pre1 = null;
					let cur1 = _this2.head;
					let ret1 = false;
					while(cur1 != null) {
						if(cur1.elt == _this) {
							let old;
							let ret;
							if(pre1 == null) {
								old = _this2.head;
								ret = old.next;
								_this2.head = ret;
								if(_this2.head == null) {
									_this2.pushmod = true;
								}
							} else {
								old = pre1.next;
								ret = old.next;
								pre1.next = ret;
								if(ret == null) {
									_this2.pushmod = true;
								}
							}
							let o = old;
							o.elt = null;
							o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
							ZNPNode_ZPP_Arbiter.zpp_pool = o;
							_this2.modified = true;
							_this2.length--;
							_this2.pushmod = true;
							ret1 = true;
							break;
						}
						pre1 = cur1;
						cur1 = cur1.next;
					}
					if(_this.pair != null) {
						_this.pair.arb = null;
						_this.pair = null;
					}
				}
				_this.b1 = _this.b2 = null;
				_this.active = false;
				_this.intchange = false;
				let o = _this;
				o.next = ZPP_FluidArbiter.zpp_pool;
				ZPP_FluidArbiter.zpp_pool = o;
				_this.pre_dt = -1.0;
			} else {
				let _this = arb.colarb;
				if(!_this.cleared) {
					let _this1 = _this.b1.arbiters;
					let pre = null;
					let cur = _this1.head;
					let ret = false;
					while(cur != null) {
						if(cur.elt == _this) {
							let old;
							let ret1;
							if(pre == null) {
								old = _this1.head;
								ret1 = old.next;
								_this1.head = ret1;
								if(_this1.head == null) {
									_this1.pushmod = true;
								}
							} else {
								old = pre.next;
								ret1 = old.next;
								pre.next = ret1;
								if(ret1 == null) {
									_this1.pushmod = true;
								}
							}
							let o = old;
							o.elt = null;
							o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
							ZNPNode_ZPP_Arbiter.zpp_pool = o;
							_this1.modified = true;
							_this1.length--;
							_this1.pushmod = true;
							ret = true;
							break;
						}
						pre = cur;
						cur = cur.next;
					}
					let _this2 = _this.b2.arbiters;
					let pre1 = null;
					let cur1 = _this2.head;
					let ret1 = false;
					while(cur1 != null) {
						if(cur1.elt == _this) {
							let old;
							let ret;
							if(pre1 == null) {
								old = _this2.head;
								ret = old.next;
								_this2.head = ret;
								if(_this2.head == null) {
									_this2.pushmod = true;
								}
							} else {
								old = pre1.next;
								ret = old.next;
								pre1.next = ret;
								if(ret == null) {
									_this2.pushmod = true;
								}
							}
							let o = old;
							o.elt = null;
							o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
							ZNPNode_ZPP_Arbiter.zpp_pool = o;
							_this2.modified = true;
							_this2.length--;
							_this2.pushmod = true;
							ret1 = true;
							break;
						}
						pre1 = cur1;
						cur1 = cur1.next;
					}
					if(_this.pair != null) {
						_this.pair.arb = null;
						_this.pair = null;
					}
				}
				_this.b1 = _this.b2 = null;
				_this.active = false;
				_this.intchange = false;
				while(_this.contacts.next != null) {
					let _this1 = _this.contacts;
					let ret = _this1.next;
					_this1.pop();
					let o = ret;
					o.arbiter = null;
					o.next = ZPP_Contact.zpp_pool;
					ZPP_Contact.zpp_pool = o;
					let _this2 = _this.innards;
					let ret1 = _this2.next;
					_this2.next = ret1.next;
					ret1._inuse = false;
					if(_this2.next == null) {
						_this2.pushmod = true;
					}
					_this2.modified = true;
					_this2.length--;
				}
				let o = _this;
				o.userdef_dyn_fric = false;
				o.userdef_stat_fric = false;
				o.userdef_restitution = false;
				o.userdef_rfric = false;
				o.__ref_edge1 = o.__ref_edge2 = null;
				o.next = ZPP_ColArbiter.zpp_pool;
				ZPP_ColArbiter.zpp_pool = o;
				_this.pre_dt = -1.0;
			}
			return true;
		}
		let pact = arb.active;
		arb.active = arb.presentable = arb.up_stamp == this.stamp;
		if((arb.immState & ZPP_Flags.id_ImmState_ACCEPT) != 0) {
			if(arb.active && arb.type != ZPP_Arbiter.SENSOR) {
				if(arb.colarb != null) {
					let _this = arb.colarb;
					if(_this.invalidated) {
						_this.invalidated = false;
						if(!_this.userdef_restitution) {
							if(_this.s1.material.elasticity <= -Infinity || _this.s2.material.elasticity <= -Infinity) {
								_this.restitution = 0;
							} else if(_this.s1.material.elasticity >= Infinity || _this.s2.material.elasticity >= Infinity) {
								_this.restitution = 1;
							} else {
								_this.restitution = (_this.s1.material.elasticity + _this.s2.material.elasticity) / 2;
							}
							if(_this.restitution < 0) {
								_this.restitution = 0;
							}
							if(_this.restitution > 1) {
								_this.restitution = 1;
							}
						}
						if(!_this.userdef_dyn_fric) {
							_this.dyn_fric = Math.sqrt(_this.s1.material.dynamicFriction * _this.s2.material.dynamicFriction);
						}
						if(!_this.userdef_stat_fric) {
							_this.stat_fric = Math.sqrt(_this.s1.material.staticFriction * _this.s2.material.staticFriction);
						}
						if(!_this.userdef_rfric) {
							_this.rfric = Math.sqrt(_this.s1.material.rollingFriction * _this.s2.material.rollingFriction);
						}
					}
					if(_this.pre_dt == -1.0) {
						_this.pre_dt = dt;
					}
					let dtratio = dt / _this.pre_dt;
					_this.pre_dt = dt;
					let mass_sum = _this.b1.smass + _this.b2.smass;
					_this.hc2 = false;
					let fst = true;
					let statType = _this.b1.type != ZPP_Flags.id_BodyType_DYNAMIC || _this.b2.type != ZPP_Flags.id_BodyType_DYNAMIC;
					let bias = statType ? _this.continuous ? Config.contactContinuousStaticBiasCoef : Config.contactStaticBiasCoef : _this.continuous ? Config.contactContinuousBiasCoef : Config.contactBiasCoef;
					_this.biasCoef = bias;
					_this.continuous = false;
					let pre = null;
					let prei = null;
					let cx_itei = _this.innards.next;
					let cx_ite = _this.contacts.next;
					while(cx_ite != null) {
						let c = cx_ite;
						if(c.stamp + Config.arbiterExpirationDelay < _this.stamp) {
							let _this1 = _this.contacts;
							let old;
							let ret;
							if(pre == null) {
								old = _this1.next;
								ret = old.next;
								_this1.next = ret;
								if(_this1.next == null) {
									_this1.pushmod = true;
								}
							} else {
								old = pre.next;
								ret = old.next;
								pre.next = ret;
								if(ret == null) {
									_this1.pushmod = true;
								}
							}
							old._inuse = false;
							_this1.modified = true;
							_this1.length--;
							_this1.pushmod = true;
							cx_ite = ret;
							let _this2 = _this.innards;
							let old1;
							let ret1;
							if(prei == null) {
								old1 = _this2.next;
								ret1 = old1.next;
								_this2.next = ret1;
								if(_this2.next == null) {
									_this2.pushmod = true;
								}
							} else {
								old1 = prei.next;
								ret1 = old1.next;
								prei.next = ret1;
								if(ret1 == null) {
									_this2.pushmod = true;
								}
							}
							old1._inuse = false;
							_this2.modified = true;
							_this2.length--;
							_this2.pushmod = true;
							cx_itei = ret1;
							let o = c;
							o.arbiter = null;
							o.next = ZPP_Contact.zpp_pool;
							ZPP_Contact.zpp_pool = o;
							continue;
						}
						let ci = c.inner;
						let pact = c.active;
						c.active = c.stamp == _this.stamp;
						if(c.active) {
							if(fst) {
								fst = false;
								_this.c1 = ci;
								_this.oc1 = c;
							} else {
								_this.hc2 = true;
								_this.c2 = ci;
								_this.oc2 = c;
							}
							ci.r2x = c.px - _this.b2.posx;
							ci.r2y = c.py - _this.b2.posy;
							ci.r1x = c.px - _this.b1.posx;
							ci.r1y = c.py - _this.b1.posy;
							let x = ci.r2x * _this.nx + ci.r2y * _this.ny;
							let kt = mass_sum + _this.b2.sinertia * (x * x);
							let x1 = ci.r1x * _this.nx + ci.r1y * _this.ny;
							kt += _this.b1.sinertia * (x1 * x1);
							ci.tMass = kt < Config.epsilon * Config.epsilon ? 0 : 1.0 / kt;
							let x2 = _this.ny * ci.r2x - _this.nx * ci.r2y;
							let nt = mass_sum + _this.b2.sinertia * (x2 * x2);
							let x3 = _this.ny * ci.r1x - _this.nx * ci.r1y;
							nt += _this.b1.sinertia * (x3 * x3);
							ci.nMass = nt < Config.epsilon * Config.epsilon ? 0 : 1.0 / nt;
							let vrx = 0.0;
							let vry = 0.0;
							let ang = _this.b2.angvel + _this.b2.kinangvel;
							vrx = _this.b2.velx + _this.b2.kinvelx - ci.r2y * ang;
							vry = _this.b2.vely + _this.b2.kinvely + ci.r2x * ang;
							ang = _this.b1.angvel + _this.b1.kinangvel;
							vrx -= _this.b1.velx + _this.b1.kinvelx - ci.r1y * ang;
							vry -= _this.b1.vely + _this.b1.kinvely + ci.r1x * ang;
							let vdot = _this.nx * vrx + _this.ny * vry;
							c.elasticity = _this.restitution;
							ci.bounce = vdot * c.elasticity;
							if(ci.bounce > -Config.elasticThreshold) {
								ci.bounce = 0;
							}
							vdot = vry * _this.nx - vrx * _this.ny;
							let thr = Config.staticFrictionThreshold;
							if(vdot * vdot > thr * thr) {
								ci.friction = _this.dyn_fric;
							} else {
								ci.friction = _this.stat_fric;
							}
							ci.jnAcc *= dtratio;
							ci.jtAcc *= dtratio;
						}
						if(pact != c.active) {
							_this.contacts.modified = true;
						}
						pre = cx_ite;
						prei = cx_itei;
						cx_itei = cx_itei.next;
						cx_ite = cx_ite.next;
					}
					if(_this.hc2) {
						_this.hpc2 = true;
						if(_this.oc1.posOnly) {
							let tmp = _this.c1;
							_this.c1 = _this.c2;
							_this.c2 = tmp;
							let tmp2 = _this.oc1;
							_this.oc1 = _this.oc2;
							_this.oc2 = tmp2;
							_this.hc2 = false;
						} else if(_this.oc2.posOnly) {
							_this.hc2 = false;
						}
						if(_this.oc1.posOnly) {
							fst = true;
						}
					} else {
						_this.hpc2 = false;
					}
					_this.jrAcc *= dtratio;
					if(!fst) {
						_this.rn1a = _this.ny * _this.c1.r1x - _this.nx * _this.c1.r1y;
						_this.rt1a = _this.c1.r1x * _this.nx + _this.c1.r1y * _this.ny;
						_this.rn1b = _this.ny * _this.c1.r2x - _this.nx * _this.c1.r2y;
						_this.rt1b = _this.c1.r2x * _this.nx + _this.c1.r2y * _this.ny;
						_this.k1x = _this.b2.kinvelx - _this.c1.r2y * _this.b2.kinangvel - (_this.b1.kinvelx - _this.c1.r1y * _this.b1.kinangvel);
						_this.k1y = _this.b2.kinvely + _this.c1.r2x * _this.b2.kinangvel - (_this.b1.kinvely + _this.c1.r1x * _this.b1.kinangvel);
					}
					if(_this.hc2) {
						_this.rn2a = _this.ny * _this.c2.r1x - _this.nx * _this.c2.r1y;
						_this.rt2a = _this.c2.r1x * _this.nx + _this.c2.r1y * _this.ny;
						_this.rn2b = _this.ny * _this.c2.r2x - _this.nx * _this.c2.r2y;
						_this.rt2b = _this.c2.r2x * _this.nx + _this.c2.r2y * _this.ny;
						_this.k2x = _this.b2.kinvelx - _this.c2.r2y * _this.b2.kinangvel - (_this.b1.kinvelx - _this.c2.r1y * _this.b1.kinangvel);
						_this.k2y = _this.b2.kinvely + _this.c2.r2x * _this.b2.kinangvel - (_this.b1.kinvely + _this.c2.r1x * _this.b1.kinangvel);
						_this.kMassa = mass_sum + _this.b1.sinertia * _this.rn1a * _this.rn1a + _this.b2.sinertia * _this.rn1b * _this.rn1b;
						_this.kMassb = mass_sum + _this.b1.sinertia * _this.rn1a * _this.rn2a + _this.b2.sinertia * _this.rn1b * _this.rn2b;
						_this.kMassc = mass_sum + _this.b1.sinertia * _this.rn2a * _this.rn2a + _this.b2.sinertia * _this.rn2b * _this.rn2b;
						let norm = _this.kMassa * _this.kMassa + 2 * _this.kMassb * _this.kMassb + _this.kMassc * _this.kMassc;
						if(norm < Config.illConditionedThreshold * (_this.kMassa * _this.kMassc - _this.kMassb * _this.kMassb)) {
							_this.Ka = _this.kMassa;
							_this.Kb = _this.kMassb;
							_this.Kc = _this.kMassc;
							let det = _this.kMassa * _this.kMassc - _this.kMassb * _this.kMassb;
							if(det != det) {
								_this.kMassa = _this.kMassb = _this.kMassc = 0;
							} else if(det == 0) {
								let flag = 0;
								if(_this.kMassa != 0) {
									_this.kMassa = 1 / _this.kMassa;
								} else {
									_this.kMassa = 0;
									flag |= 1;
								}
								if(_this.kMassc != 0) {
									_this.kMassc = 1 / _this.kMassc;
								} else {
									_this.kMassc = 0;
									flag |= 2;
								}
								_this.kMassb = 0;
							} else {
								det = 1 / det;
								let t = _this.kMassc * det;
								_this.kMassc = _this.kMassa * det;
								_this.kMassa = t;
								_this.kMassb *= -det;
							}
						} else {
							_this.hc2 = false;
							if(_this.oc2.dist < _this.oc1.dist) {
								let t = _this.c1;
								_this.c1 = _this.c2;
								_this.c2 = t;
							}
							_this.oc2.active = false;
							_this.contacts.modified = true;
						}
					}
					_this.surfacex = _this.b2.svelx;
					_this.surfacey = _this.b2.svely;
					let t = 1.0;
					_this.surfacex += _this.b1.svelx * t;
					_this.surfacey += _this.b1.svely * t;
					_this.surfacex = -_this.surfacex;
					_this.surfacey = -_this.surfacey;
					_this.rMass = _this.b1.sinertia + _this.b2.sinertia;
					if(_this.rMass != 0) {
						_this.rMass = 1 / _this.rMass;
					}
					if(fst) {
						arb.active = false;
					}
				} else {
					let _this = arb.fluidarb;
					if(_this.pre_dt == -1.0) {
						_this.pre_dt = dt;
					}
					let dtratio = dt / _this.pre_dt;
					_this.pre_dt = dt;
					_this.r1x = _this.centroidx - _this.b1.posx;
					_this.r1y = _this.centroidy - _this.b1.posy;
					_this.r2x = _this.centroidx - _this.b2.posx;
					_this.r2y = _this.centroidy - _this.b2.posy;
					let g1x = 0.0;
					let g1y = 0.0;
					if(_this.ws1.fluidEnabled && _this.ws1.fluidProperties.wrap_gravity != null) {
						g1x = _this.ws1.fluidProperties.gravityx;
						g1y = _this.ws1.fluidProperties.gravityy;
					} else {
						g1x = this.gravityx;
						g1y = this.gravityy;
					}
					let g2x = 0.0;
					let g2y = 0.0;
					if(_this.ws2.fluidEnabled && _this.ws2.fluidProperties.wrap_gravity != null) {
						g2x = _this.ws2.fluidProperties.gravityx;
						g2y = _this.ws2.fluidProperties.gravityy;
					} else {
						g2x = this.gravityx;
						g2y = this.gravityy;
					}
					let buoyx = 0;
					let buoyy = 0;
					if(_this.ws1.fluidEnabled && _this.ws2.fluidEnabled) {
						let mass1 = _this.overlap * _this.ws1.fluidProperties.density;
						let mass2 = _this.overlap * _this.ws2.fluidProperties.density;
						if(mass1 > mass2) {
							let t = mass1 + mass2;
							buoyx -= g1x * t;
							buoyy -= g1y * t;
						} else if(mass1 < mass2) {
							let t = mass1 + mass2;
							buoyx += g2x * t;
							buoyy += g2y * t;
						} else {
							let gx = 0.0;
							let gy = 0.0;
							gx = g1x + g2x;
							gy = g1y + g2y;
							let t = 0.5;
							gx *= t;
							gy *= t;
							if(_this.ws1.worldCOMx * gx + _this.ws1.worldCOMy * gy > _this.ws2.worldCOMx * gx + _this.ws2.worldCOMy * gy) {
								let t = mass1 + mass2;
								buoyx -= gx * t;
								buoyy -= gy * t;
							} else {
								let t = mass1 + mass2;
								buoyx += gx * t;
								buoyy += gy * t;
							}
						}
					} else if(_this.ws1.fluidEnabled) {
						let mass = _this.overlap * _this.ws1.fluidProperties.density;
						let t = mass;
						buoyx -= g1x * t;
						buoyy -= g1y * t;
					} else if(_this.ws2.fluidEnabled) {
						let mass = _this.overlap * _this.ws2.fluidProperties.density;
						let t = mass;
						buoyx += g2x * t;
						buoyy += g2y * t;
					}
					let t = dt;
					buoyx *= t;
					buoyy *= t;
					_this.buoyx = buoyx;
					_this.buoyy = buoyy;
					if(_this.b1.type == ZPP_Flags.id_BodyType_DYNAMIC) {
						let t = _this.b1.imass;
						_this.b1.velx -= buoyx * t;
						_this.b1.vely -= buoyy * t;
						_this.b1.angvel -= (buoyy * _this.r1x - buoyx * _this.r1y) * _this.b1.iinertia;
					}
					if(_this.b2.type == ZPP_Flags.id_BodyType_DYNAMIC) {
						let t = _this.b2.imass;
						_this.b2.velx += buoyx * t;
						_this.b2.vely += buoyy * t;
						_this.b2.angvel += (buoyy * _this.r2x - buoyx * _this.r2y) * _this.b2.iinertia;
					}
					if((!_this.ws1.fluidEnabled || _this.ws1.fluidProperties.viscosity == 0) && (!_this.ws2.fluidEnabled || _this.ws2.fluidProperties.viscosity == 0)) {
						_this.nodrag = true;
						_this.dampx = 0;
						_this.dampy = 0;
						_this.adamp = 0;
					} else {
						_this.nodrag = false;
						let tViscosity = 0.0;
						if(_this.ws1.fluidEnabled) {
							_this.ws2.validate_angDrag();
							tViscosity += _this.ws1.fluidProperties.viscosity * _this.ws2.angDrag * _this.overlap / _this.ws2.area;
						}
						if(_this.ws2.fluidEnabled) {
							_this.ws1.validate_angDrag();
							tViscosity += _this.ws2.fluidProperties.viscosity * _this.ws1.angDrag * _this.overlap / _this.ws1.area;
						}
						if(tViscosity != 0) {
							let iSum = _this.b1.sinertia + _this.b2.sinertia;
							if(iSum != 0) {
								_this.wMass = 1 / iSum;
							} else {
								_this.wMass = 0.0;
							}
							tViscosity *= 0.0004;
							let omega = 2 * Math.PI * tViscosity;
							_this.agamma = 1 / (dt * omega * (2 + omega * dt));
							let ig = 1 / (1 + _this.agamma);
							let biasCoef = dt * omega * omega * _this.agamma;
							_this.agamma *= ig;
							_this.wMass *= ig;
						} else {
							_this.wMass = 0.0;
							_this.agamma = 0.0;
						}
						let vrnx = _this.b2.velx + _this.b2.kinvelx - _this.r2y * (_this.b2.angvel + _this.b2.kinangvel) - (_this.b1.velx + _this.b1.kinvelx - _this.r1y * (_this.b2.angvel + _this.b2.kinangvel));
						let vrny = _this.b2.vely + _this.b2.kinvely + _this.r2x * (_this.b2.angvel + _this.b2.kinangvel) - (_this.b1.vely + _this.b1.kinvely + _this.r1x * (_this.b1.angvel + _this.b1.kinangvel));
						if(!(vrnx * vrnx + vrny * vrny < Config.epsilon * Config.epsilon)) {
							let d = vrnx * vrnx + vrny * vrny;
							let imag = 1.0 / Math.sqrt(d);
							let t = imag;
							vrnx *= t;
							vrny *= t;
							_this.nx = vrnx;
							_this.ny = vrny;
						}
						let tViscosity1 = 0.0;
						if(_this.ws1.fluidEnabled) {
							let f = -_this.ws1.fluidProperties.viscosity * _this.overlap / _this.ws2.area;
							if(_this.ws2.type == ZPP_Flags.id_ShapeType_CIRCLE) {
								tViscosity1 -= f * _this.ws2.circle.radius * Config.fluidLinearDrag / (2 * _this.ws2.circle.radius * Math.PI);
							} else {
								let poly = _this.ws2.polygon;
								let bord = 0.0;
								let acc = 0.0;
								let cx_ite = poly.edges.head;
								while(cx_ite != null) {
									let ex = cx_ite.elt;
									bord += ex.length;
									let fact = f * ex.length * (ex.gnormx * _this.nx + ex.gnormy * _this.ny);
									if(fact > 0) {
										fact *= -Config.fluidVacuumDrag;
									}
									acc -= fact * 0.5 * Config.fluidLinearDrag;
									cx_ite = cx_ite.next;
								}
								tViscosity1 += acc / bord;
							}
						}
						if(_this.ws2.fluidEnabled) {
							let f = -_this.ws2.fluidProperties.viscosity * _this.overlap / _this.ws1.area;
							if(_this.ws1.type == ZPP_Flags.id_ShapeType_CIRCLE) {
								tViscosity1 -= f * _this.ws1.circle.radius * Config.fluidLinearDrag / (2 * _this.ws1.circle.radius * Math.PI);
							} else {
								let poly = _this.ws1.polygon;
								let bord = 0.0;
								let acc = 0.0;
								let cx_ite = poly.edges.head;
								while(cx_ite != null) {
									let ex = cx_ite.elt;
									bord += ex.length;
									let fact = f * ex.length * (ex.gnormx * _this.nx + ex.gnormy * _this.ny);
									if(fact > 0) {
										fact *= -Config.fluidVacuumDrag;
									}
									acc -= fact * 0.5 * Config.fluidLinearDrag;
									cx_ite = cx_ite.next;
								}
								tViscosity1 += acc / bord;
							}
						}
						if(tViscosity1 != 0) {
							let m = _this.b1.smass + _this.b2.smass;
							let Ka = 0.0;
							let Kb = 0.0;
							let Kc = 0.0;
							Ka = m;
							Kb = 0;
							Kc = m;
							if(_this.b1.sinertia != 0) {
								let X = _this.r1x * _this.b1.sinertia;
								let Y = _this.r1y * _this.b1.sinertia;
								Ka += Y * _this.r1y;
								Kb += -Y * _this.r1x;
								Kc += X * _this.r1x;
							}
							if(_this.b2.sinertia != 0) {
								let X = _this.r2x * _this.b2.sinertia;
								let Y = _this.r2y * _this.b2.sinertia;
								Ka += Y * _this.r2y;
								Kb += -Y * _this.r2x;
								Kc += X * _this.r2x;
							}
							let det = Ka * Kc - Kb * Kb;
							if(det != det) {
								Kc = 0;
								Kb = Kc;
								Ka = Kb;
							} else if(det == 0) {
								let flag = 0;
								if(Ka != 0) {
									Ka = 1 / Ka;
								} else {
									Ka = 0;
									flag |= 1;
								}
								if(Kc != 0) {
									Kc = 1 / Kc;
								} else {
									Kc = 0;
									flag |= 2;
								}
								Kb = 0;
							} else {
								det = 1 / det;
								let t = Kc * det;
								Kc = Ka * det;
								Ka = t;
								Kb *= -det;
							}
							_this.vMassa = Ka;
							_this.vMassb = Kb;
							_this.vMassc = Kc;
							let biasCoef;
							let omega = 2 * Math.PI * tViscosity1;
							_this.lgamma = 1 / (dt * omega * (2 + omega * dt));
							let ig = 1 / (1 + _this.lgamma);
							biasCoef = dt * omega * omega * _this.lgamma;
							_this.lgamma *= ig;
							let X = ig;
							_this.vMassa *= X;
							_this.vMassb *= X;
							_this.vMassc *= X;
						} else {
							_this.vMassa = 0;
							_this.vMassb = 0;
							_this.vMassc = 0;
							_this.lgamma = 0.0;
						}
					}
					let t1 = dtratio;
					_this.dampx *= t1;
					_this.dampy *= t1;
					_this.adamp *= dtratio;
				}
			}
		} else if(arb.colarb != null) {
			let _this = arb.colarb;
			let fst = true;
			let pre = null;
			let prei = null;
			let cx_itei = _this.innards.next;
			_this.hc2 = false;
			let cx_ite = _this.contacts.next;
			while(cx_ite != null) {
				let c = cx_ite;
				if(c.stamp + Config.arbiterExpirationDelay < _this.stamp) {
					let _this1 = _this.contacts;
					let old;
					let ret;
					if(pre == null) {
						old = _this1.next;
						ret = old.next;
						_this1.next = ret;
						if(_this1.next == null) {
							_this1.pushmod = true;
						}
					} else {
						old = pre.next;
						ret = old.next;
						pre.next = ret;
						if(ret == null) {
							_this1.pushmod = true;
						}
					}
					old._inuse = false;
					_this1.modified = true;
					_this1.length--;
					_this1.pushmod = true;
					cx_ite = ret;
					let _this2 = _this.innards;
					let old1;
					let ret1;
					if(prei == null) {
						old1 = _this2.next;
						ret1 = old1.next;
						_this2.next = ret1;
						if(_this2.next == null) {
							_this2.pushmod = true;
						}
					} else {
						old1 = prei.next;
						ret1 = old1.next;
						prei.next = ret1;
						if(ret1 == null) {
							_this2.pushmod = true;
						}
					}
					old1._inuse = false;
					_this2.modified = true;
					_this2.length--;
					_this2.pushmod = true;
					cx_itei = ret1;
					let o = c;
					o.arbiter = null;
					o.next = ZPP_Contact.zpp_pool;
					ZPP_Contact.zpp_pool = o;
					continue;
				}
				let ci = c.inner;
				let pact = c.active;
				c.active = c.stamp == _this.stamp;
				if(c.active) {
					if(fst) {
						fst = false;
						_this.c1 = ci;
						_this.oc1 = c;
					} else {
						_this.hc2 = true;
						_this.c2 = ci;
						_this.oc2 = c;
					}
				}
				if(pact != c.active) {
					_this.contacts.modified = true;
				}
				pre = cx_ite;
				prei = cx_itei;
				cx_itei = cx_itei.next;
				cx_ite = cx_ite.next;
			}
			if(_this.hc2) {
				_this.hpc2 = true;
				if(_this.oc1.posOnly) {
					let tmp = _this.c1;
					_this.c1 = _this.c2;
					_this.c2 = tmp;
					let tmp2 = _this.oc1;
					_this.oc1 = _this.oc2;
					_this.oc2 = tmp2;
					_this.hc2 = false;
				} else if(_this.oc2.posOnly) {
					_this.hc2 = false;
				}
				if(_this.oc1.posOnly) {
					fst = true;
				}
			} else {
				_this.hpc2 = false;
			}
			if(fst) {
				arb.active = false;
			}
		}
		if(pact != arb.active) {
			arb.b1.arbiters.modified = true;
			arb.b2.arbiters.modified = true;
			this.c_arbiters_true.modified = this.c_arbiters_false.modified = true;
			this.s_arbiters.modified = this.f_arbiters.modified = true;
		}
		return false;
	}
	prestep(dt) {
		let pre = null;
		let cx_ite = this.live_constraints.head;
		while(cx_ite != null) {
			let con = cx_ite.elt;
			if(con.preStep(dt)) {
				cx_ite = this.live_constraints.erase(pre);
				con.broken();
				this.constraintCbBreak(con);
				if(con.removeOnBreak) {
					con.component.sleeping = true;
					this.midstep = false;
					if(con.compound != null) {
						con.compound.wrap_constraints.remove(con.outer);
					} else {
						this.wrap_constraints.remove(con.outer);
					}
					this.midstep = true;
				} else {
					con.active = false;
				}
				con.clearcache();
				continue;
			}
			pre = cx_ite;
			cx_ite = cx_ite.next;
		}
		let pre1 = null;
		let arbs = this.c_arbiters_true;
		let arbite = arbs.head;
		let fst = this.c_arbiters_false != null;
		if(fst && arbite == null) {
			fst = false;
			arbite = this.c_arbiters_false.head;
			arbs = this.c_arbiters_false;
			pre1 = null;
		}
		while(arbite != null) {
			let arb = arbite.elt;
			if(this.presteparb(arb,dt)) {
				let old;
				let ret;
				if(pre1 == null) {
					old = arbs.head;
					ret = old.next;
					arbs.head = ret;
					if(arbs.head == null) {
						arbs.pushmod = true;
					}
				} else {
					old = pre1.next;
					ret = old.next;
					pre1.next = ret;
					if(ret == null) {
						arbs.pushmod = true;
					}
				}
				let o = old;
				o.elt = null;
				o.next = ZNPNode_ZPP_ColArbiter.zpp_pool;
				ZNPNode_ZPP_ColArbiter.zpp_pool = o;
				arbs.modified = true;
				arbs.length--;
				arbs.pushmod = true;
				arbite = ret;
				if(fst && arbite == null) {
					fst = false;
					arbite = this.c_arbiters_false.head;
					arbs = this.c_arbiters_false;
					pre1 = null;
				}
				continue;
			}
			pre1 = arbite;
			arbite = arbite.next;
			if(fst && arbite == null) {
				fst = false;
				arbite = this.c_arbiters_false.head;
				arbs = this.c_arbiters_false;
				pre1 = null;
			}
		}
		let pre2 = null;
		let arbs1 = this.f_arbiters;
		let arbite1 = arbs1.head;
		let fst1 = false;
		if(fst1 && arbite1 == null) {
			fst1 = false;
			arbs1 = null;
			pre2 = null;
		}
		while(arbite1 != null) {
			let arb = arbite1.elt;
			if(this.presteparb(arb,dt)) {
				let old;
				let ret;
				if(pre2 == null) {
					old = arbs1.head;
					ret = old.next;
					arbs1.head = ret;
					if(arbs1.head == null) {
						arbs1.pushmod = true;
					}
				} else {
					old = pre2.next;
					ret = old.next;
					pre2.next = ret;
					if(ret == null) {
						arbs1.pushmod = true;
					}
				}
				let o = old;
				o.elt = null;
				o.next = ZNPNode_ZPP_FluidArbiter.zpp_pool;
				ZNPNode_ZPP_FluidArbiter.zpp_pool = o;
				arbs1.modified = true;
				arbs1.length--;
				arbs1.pushmod = true;
				arbite1 = ret;
				if(fst1 && arbite1 == null) {
					fst1 = false;
					arbs1 = null;
					pre2 = null;
				}
				continue;
			}
			pre2 = arbite1;
			arbite1 = arbite1.next;
			if(fst1 && arbite1 == null) {
				fst1 = false;
				arbs1 = null;
				pre2 = null;
			}
		}
		let pre3 = null;
		let arbs2 = this.s_arbiters;
		let arbite2 = arbs2.head;
		let fst2 = false;
		if(fst2 && arbite2 == null) {
			fst2 = false;
			arbs2 = null;
			pre3 = null;
		}
		while(arbite2 != null) {
			let arb = arbite2.elt;
			if(this.presteparb(arb,dt)) {
				let old;
				let ret;
				if(pre3 == null) {
					old = arbs2.head;
					ret = old.next;
					arbs2.head = ret;
					if(arbs2.head == null) {
						arbs2.pushmod = true;
					}
				} else {
					old = pre3.next;
					ret = old.next;
					pre3.next = ret;
					if(ret == null) {
						arbs2.pushmod = true;
					}
				}
				let o = old;
				o.elt = null;
				o.next = ZNPNode_ZPP_SensorArbiter.zpp_pool;
				ZNPNode_ZPP_SensorArbiter.zpp_pool = o;
				arbs2.modified = true;
				arbs2.length--;
				arbs2.pushmod = true;
				arbite2 = ret;
				if(fst2 && arbite2 == null) {
					fst2 = false;
					arbs2 = null;
					pre3 = null;
				}
				continue;
			}
			pre3 = arbite2;
			arbite2 = arbite2.next;
			if(fst2 && arbite2 == null) {
				fst2 = false;
				arbs2 = null;
				pre3 = null;
			}
		}
	}
	warmStart() {
		let cx_ite = this.f_arbiters.head;
		while(cx_ite != null) {
			let arb = cx_ite.elt;
			if(arb.active && (arb.immState & ZPP_Flags.id_ImmState_ACCEPT) != 0) {
				let t = arb.b1.imass;
				arb.b1.velx -= arb.dampx * t;
				arb.b1.vely -= arb.dampy * t;
				let t1 = arb.b2.imass;
				arb.b2.velx += arb.dampx * t1;
				arb.b2.vely += arb.dampy * t1;
				arb.b1.angvel -= arb.b1.iinertia * (arb.dampy * arb.r1x - arb.dampx * arb.r1y);
				arb.b2.angvel += arb.b2.iinertia * (arb.dampy * arb.r2x - arb.dampx * arb.r2y);
				arb.b1.angvel -= arb.adamp * arb.b1.iinertia;
				arb.b2.angvel += arb.adamp * arb.b2.iinertia;
			}
			cx_ite = cx_ite.next;
		}
		let arbi = this.c_arbiters_false.head;
		let fst = true;
		if(arbi == null) {
			arbi = this.c_arbiters_true.head;
			fst = false;
		}
		while(arbi != null) {
			let arb = arbi.elt;
			if(arb.active && (arb.immState & ZPP_Flags.id_ImmState_ACCEPT) != 0) {
				let jx = arb.nx * arb.c1.jnAcc - arb.ny * arb.c1.jtAcc;
				let jy = arb.ny * arb.c1.jnAcc + arb.nx * arb.c1.jtAcc;
				let t = arb.b1.imass;
				arb.b1.velx -= jx * t;
				arb.b1.vely -= jy * t;
				arb.b1.angvel -= arb.b1.iinertia * (jy * arb.c1.r1x - jx * arb.c1.r1y);
				let t1 = arb.b2.imass;
				arb.b2.velx += jx * t1;
				arb.b2.vely += jy * t1;
				arb.b2.angvel += arb.b2.iinertia * (jy * arb.c1.r2x - jx * arb.c1.r2y);
				if(arb.hc2) {
					let jx = arb.nx * arb.c2.jnAcc - arb.ny * arb.c2.jtAcc;
					let jy = arb.ny * arb.c2.jnAcc + arb.nx * arb.c2.jtAcc;
					let t = arb.b1.imass;
					arb.b1.velx -= jx * t;
					arb.b1.vely -= jy * t;
					arb.b1.angvel -= arb.b1.iinertia * (jy * arb.c2.r1x - jx * arb.c2.r1y);
					let t1 = arb.b2.imass;
					arb.b2.velx += jx * t1;
					arb.b2.vely += jy * t1;
					arb.b2.angvel += arb.b2.iinertia * (jy * arb.c2.r2x - jx * arb.c2.r2y);
				}
				arb.b2.angvel += arb.jrAcc * arb.b2.iinertia;
				arb.b1.angvel -= arb.jrAcc * arb.b1.iinertia;
			}
			arbi = arbi.next;
			if(fst && arbi == null) {
				arbi = this.c_arbiters_true.head;
				fst = false;
			}
		}
		let cx_ite1 = this.live_constraints.head;
		while(cx_ite1 != null) {
			let con = cx_ite1.elt;
			con.warmStart();
			cx_ite1 = cx_ite1.next;
		}
	}
	iterateVel(times) {
		let _g = 0;
		let _g1 = times;
		while(_g < _g1) {
			let i = _g++;
			let cx_ite = this.f_arbiters.head;
			while(cx_ite != null) {
				let arb = cx_ite.elt;
				if(arb.active && (arb.immState & ZPP_Flags.id_ImmState_ACCEPT) != 0) {
					if(!arb.nodrag) {
						let w1 = arb.b1.angvel + arb.b1.kinangvel;
						let w2 = arb.b2.angvel + arb.b2.kinangvel;
						let jx = arb.b1.velx + arb.b1.kinvelx - arb.r1y * w1 - (arb.b2.velx + arb.b2.kinvelx - arb.r2y * w2);
						let jy = arb.b1.vely + arb.b1.kinvely + arb.r1x * w1 - (arb.b2.vely + arb.b2.kinvely + arb.r2x * w2);
						let t = arb.vMassa * jx + arb.vMassb * jy;
						jy = arb.vMassb * jx + arb.vMassc * jy;
						jx = t;
						let t1 = arb.lgamma;
						jx -= arb.dampx * t1;
						jy -= arb.dampy * t1;
						let t2 = 1.0;
						arb.dampx += jx * t2;
						arb.dampy += jy * t2;
						let t3 = arb.b1.imass;
						arb.b1.velx -= jx * t3;
						arb.b1.vely -= jy * t3;
						let t4 = arb.b2.imass;
						arb.b2.velx += jx * t4;
						arb.b2.vely += jy * t4;
						arb.b1.angvel -= arb.b1.iinertia * (jy * arb.r1x - jx * arb.r1y);
						arb.b2.angvel += arb.b2.iinertia * (jy * arb.r2x - jx * arb.r2y);
						let j_damp = (w1 - w2) * arb.wMass - arb.adamp * arb.agamma;
						arb.adamp += j_damp;
						arb.b1.angvel -= j_damp * arb.b1.iinertia;
						arb.b2.angvel += j_damp * arb.b2.iinertia;
					}
				}
				cx_ite = cx_ite.next;
			}
			let pre = null;
			let cx_ite1 = this.live_constraints.head;
			while(cx_ite1 != null) {
				let con = cx_ite1.elt;
				if(con.applyImpulseVel()) {
					cx_ite1 = this.live_constraints.erase(pre);
					con.broken();
					this.constraintCbBreak(con);
					if(con.removeOnBreak) {
						con.component.sleeping = true;
						this.midstep = false;
						if(con.compound != null) {
							con.compound.wrap_constraints.remove(con.outer);
						} else {
							this.wrap_constraints.remove(con.outer);
						}
						this.midstep = true;
					} else {
						con.active = false;
					}
					con.clearcache();
					continue;
				}
				pre = cx_ite1;
				cx_ite1 = cx_ite1.next;
			}
			let arbi = this.c_arbiters_false.head;
			let fst = true;
			if(arbi == null) {
				arbi = this.c_arbiters_true.head;
				fst = false;
			}
			while(arbi != null) {
				let arb = arbi.elt;
				if(arb.active && (arb.immState & ZPP_Flags.id_ImmState_ACCEPT) != 0) {
					let v1x = arb.k1x + arb.b2.velx - arb.c1.r2y * arb.b2.angvel - (arb.b1.velx - arb.c1.r1y * arb.b1.angvel);
					let v1y = arb.k1y + arb.b2.vely + arb.c1.r2x * arb.b2.angvel - (arb.b1.vely + arb.c1.r1x * arb.b1.angvel);
					let j = (v1y * arb.nx - v1x * arb.ny + arb.surfacex) * arb.c1.tMass;
					let jMax = arb.c1.friction * arb.c1.jnAcc;
					let jOld = arb.c1.jtAcc;
					let cjAcc = jOld - j;
					if(cjAcc > jMax) {
						cjAcc = jMax;
					} else if(cjAcc < -jMax) {
						cjAcc = -jMax;
					}
					j = cjAcc - jOld;
					arb.c1.jtAcc = cjAcc;
					let jx = -arb.ny * j;
					let jy = arb.nx * j;
					arb.b2.velx += jx * arb.b2.imass;
					arb.b2.vely += jy * arb.b2.imass;
					arb.b1.velx -= jx * arb.b1.imass;
					arb.b1.vely -= jy * arb.b1.imass;
					arb.b2.angvel += arb.rt1b * j * arb.b2.iinertia;
					arb.b1.angvel -= arb.rt1a * j * arb.b1.iinertia;
					if(arb.hc2) {
						let v2x = arb.k2x + arb.b2.velx - arb.c2.r2y * arb.b2.angvel - (arb.b1.velx - arb.c2.r1y * arb.b1.angvel);
						let v2y = arb.k2y + arb.b2.vely + arb.c2.r2x * arb.b2.angvel - (arb.b1.vely + arb.c2.r1x * arb.b1.angvel);
						j = (v2y * arb.nx - v2x * arb.ny + arb.surfacex) * arb.c2.tMass;
						jMax = arb.c2.friction * arb.c2.jnAcc;
						jOld = arb.c2.jtAcc;
						cjAcc = jOld - j;
						if(cjAcc > jMax) {
							cjAcc = jMax;
						} else if(cjAcc < -jMax) {
							cjAcc = -jMax;
						}
						j = cjAcc - jOld;
						arb.c2.jtAcc = cjAcc;
						jx = -arb.ny * j;
						jy = arb.nx * j;
						arb.b2.velx += jx * arb.b2.imass;
						arb.b2.vely += jy * arb.b2.imass;
						arb.b1.velx -= jx * arb.b1.imass;
						arb.b1.vely -= jy * arb.b1.imass;
						arb.b2.angvel += arb.rt2b * j * arb.b2.iinertia;
						arb.b1.angvel -= arb.rt2a * j * arb.b1.iinertia;
						v1x = arb.k1x + arb.b2.velx - arb.c1.r2y * arb.b2.angvel - (arb.b1.velx - arb.c1.r1y * arb.b1.angvel);
						v1y = arb.k1y + arb.b2.vely + arb.c1.r2x * arb.b2.angvel - (arb.b1.vely + arb.c1.r1x * arb.b1.angvel);
						v2x = arb.k2x + arb.b2.velx - arb.c2.r2y * arb.b2.angvel - (arb.b1.velx - arb.c2.r1y * arb.b1.angvel);
						v2y = arb.k2y + arb.b2.vely + arb.c2.r2x * arb.b2.angvel - (arb.b1.vely + arb.c2.r1x * arb.b1.angvel);
						let ax = arb.c1.jnAcc;
						let ay = arb.c2.jnAcc;
						let jnx = v1x * arb.nx + v1y * arb.ny + arb.surfacey + arb.c1.bounce - (arb.Ka * ax + arb.Kb * ay);
						let jny = v2x * arb.nx + v2y * arb.ny + arb.surfacey + arb.c2.bounce - (arb.Kb * ax + arb.Kc * ay);
						let xx = -(arb.kMassa * jnx + arb.kMassb * jny);
						let xy = -(arb.kMassb * jnx + arb.kMassc * jny);
						if(xx >= 0 && xy >= 0) {
							jnx = xx - ax;
							jny = xy - ay;
							arb.c1.jnAcc = xx;
							arb.c2.jnAcc = xy;
						} else {
							xx = -arb.c1.nMass * jnx;
							if(xx >= 0 && arb.Kb * xx + jny >= 0) {
								jnx = xx - ax;
								jny = -ay;
								arb.c1.jnAcc = xx;
								arb.c2.jnAcc = 0;
							} else {
								xy = -arb.c2.nMass * jny;
								if(xy >= 0 && arb.Kb * xy + jnx >= 0) {
									jnx = -ax;
									jny = xy - ay;
									arb.c1.jnAcc = 0;
									arb.c2.jnAcc = xy;
								} else if(jnx >= 0 && jny >= 0) {
									jnx = -ax;
									jny = -ay;
									arb.c1.jnAcc = arb.c2.jnAcc = 0;
								} else {
									jnx = 0;
									jny = 0;
								}
							}
						}
						j = jnx + jny;
						jx = arb.nx * j;
						jy = arb.ny * j;
						arb.b2.velx += jx * arb.b2.imass;
						arb.b2.vely += jy * arb.b2.imass;
						arb.b1.velx -= jx * arb.b1.imass;
						arb.b1.vely -= jy * arb.b1.imass;
						arb.b2.angvel += (arb.rn1b * jnx + arb.rn2b * jny) * arb.b2.iinertia;
						arb.b1.angvel -= (arb.rn1a * jnx + arb.rn2a * jny) * arb.b1.iinertia;
					} else {
						if(arb.radius != 0.0) {
							let dw = arb.b2.angvel - arb.b1.angvel;
							j = dw * arb.rMass;
							jMax = arb.rfric * arb.c1.jnAcc;
							jOld = arb.jrAcc;
							arb.jrAcc -= j;
							if(arb.jrAcc > jMax) {
								arb.jrAcc = jMax;
							} else if(arb.jrAcc < -jMax) {
								arb.jrAcc = -jMax;
							}
							j = arb.jrAcc - jOld;
							arb.b2.angvel += j * arb.b2.iinertia;
							arb.b1.angvel -= j * arb.b1.iinertia;
						}
						v1x = arb.k1x + arb.b2.velx - arb.c1.r2y * arb.b2.angvel - (arb.b1.velx - arb.c1.r1y * arb.b1.angvel);
						v1y = arb.k1y + arb.b2.vely + arb.c1.r2x * arb.b2.angvel - (arb.b1.vely + arb.c1.r1x * arb.b1.angvel);
						j = (arb.c1.bounce + (arb.nx * v1x + arb.ny * v1y) + arb.surfacey) * arb.c1.nMass;
						jOld = arb.c1.jnAcc;
						cjAcc = jOld - j;
						if(cjAcc < 0.0) {
							cjAcc = 0.0;
						}
						j = cjAcc - jOld;
						arb.c1.jnAcc = cjAcc;
						jx = arb.nx * j;
						jy = arb.ny * j;
						arb.b2.velx += jx * arb.b2.imass;
						arb.b2.vely += jy * arb.b2.imass;
						arb.b1.velx -= jx * arb.b1.imass;
						arb.b1.vely -= jy * arb.b1.imass;
						arb.b2.angvel += arb.rn1b * j * arb.b2.iinertia;
						arb.b1.angvel -= arb.rn1a * j * arb.b1.iinertia;
					}
				}
				arbi = arbi.next;
				if(fst && arbi == null) {
					arbi = this.c_arbiters_true.head;
					fst = false;
				}
			}
		}
	}
	iteratePos(times) {
		let _g = 0;
		let _g1 = times;
		while(_g < _g1) {
			let i = _g++;
			let pre = null;
			let cx_ite = this.live_constraints.head;
			while(cx_ite != null) {
				let con = cx_ite.elt;
				if(!con.__velocity && con.stiff) {
					if(con.applyImpulsePos()) {
						cx_ite = this.live_constraints.erase(pre);
						con.broken();
						this.constraintCbBreak(con);
						if(con.removeOnBreak) {
							con.component.sleeping = true;
							this.midstep = false;
							if(con.compound != null) {
								con.compound.wrap_constraints.remove(con.outer);
							} else {
								this.wrap_constraints.remove(con.outer);
							}
							this.midstep = true;
						} else {
							con.active = false;
						}
						con.clearcache();
						continue;
					}
				}
				pre = cx_ite;
				cx_ite = cx_ite.next;
			}
			let arbi = this.c_arbiters_false.head;
			let fst = true;
			if(arbi == null) {
				arbi = this.c_arbiters_true.head;
				fst = false;
			}
			while(arbi != null) {
				let arb = arbi.elt;
				if(arb.active && (arb.immState & ZPP_Flags.id_ImmState_ACCEPT) != 0) {
					if(arb.ptype == 2) {
						let c = arb.c1;
						let r2x = 0.0;
						let r2y = 0.0;
						r2x = arb.b2.axisy * c.lr2x - arb.b2.axisx * c.lr2y;
						r2y = c.lr2x * arb.b2.axisx + c.lr2y * arb.b2.axisy;
						let t = 1.0;
						r2x += arb.b2.posx * t;
						r2y += arb.b2.posy * t;
						let r1x = 0.0;
						let r1y = 0.0;
						r1x = arb.b1.axisy * c.lr1x - arb.b1.axisx * c.lr1y;
						r1y = c.lr1x * arb.b1.axisx + c.lr1y * arb.b1.axisy;
						let t1 = 1.0;
						r1x += arb.b1.posx * t1;
						r1y += arb.b1.posy * t1;
						let dx = 0.0;
						let dy = 0.0;
						dx = r2x - r1x;
						dy = r2y - r1y;
						let dl = Math.sqrt(dx * dx + dy * dy);
						let r = arb.radius - Config.collisionSlop;
						let err = dl - r;
						if(dx * arb.nx + dy * arb.ny < 0) {
							dx = -dx;
							dy = -dy;
							err -= arb.radius;
						}
						if(err < 0) {
							if(dl < Config.epsilon) {
								if(arb.b1.smass != 0.0) {
									arb.b1.posx += Config.epsilon * 10;
								} else {
									arb.b2.posx += Config.epsilon * 10;
								}
							} else {
								let t = 1.0 / dl;
								dx *= t;
								dy *= t;
								let px = 0.5 * (r1x + r2x);
								let py = 0.5 * (r1y + r2y);
								let pen = dl - r;
								r1x = px - arb.b1.posx;
								r1y = py - arb.b1.posy;
								r2x = px - arb.b2.posx;
								r2y = py - arb.b2.posy;
								let rn1 = dy * r1x - dx * r1y;
								let rn2 = dy * r2x - dx * r2y;
								let K = arb.b2.smass + rn2 * rn2 * arb.b2.sinertia + arb.b1.smass + rn1 * rn1 * arb.b1.sinertia;
								if(K != 0) {
									let jn = -arb.biasCoef * pen / K;
									let Jx = 0.0;
									let Jy = 0.0;
									let t = jn;
									Jx = dx * t;
									Jy = dy * t;
									let t1 = arb.b1.imass;
									arb.b1.posx -= Jx * t1;
									arb.b1.posy -= Jy * t1;
									let _this = arb.b1;
									let dr = -rn1 * arb.b1.iinertia * jn;
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
									let t2 = arb.b2.imass;
									arb.b2.posx += Jx * t2;
									arb.b2.posy += Jy * t2;
									let _this1 = arb.b2;
									let dr1 = rn2 * arb.b2.iinertia * jn;
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
						}
					} else {
						let gnormx = 0.0;
						let gnormy = 0.0;
						let gproj;
						let clip1x = 0.0;
						let clip1y = 0.0;
						let clip2x = 0;
						let clip2y = 0;
						if(arb.ptype == 0) {
							gnormx = arb.b1.axisy * arb.lnormx - arb.b1.axisx * arb.lnormy;
							gnormy = arb.lnormx * arb.b1.axisx + arb.lnormy * arb.b1.axisy;
							gproj = arb.lproj + (gnormx * arb.b1.posx + gnormy * arb.b1.posy);
							clip1x = arb.b2.axisy * arb.c1.lr1x - arb.b2.axisx * arb.c1.lr1y;
							clip1y = arb.c1.lr1x * arb.b2.axisx + arb.c1.lr1y * arb.b2.axisy;
							let t = 1.0;
							clip1x += arb.b2.posx * t;
							clip1y += arb.b2.posy * t;
							if(arb.hpc2) {
								clip2x = arb.b2.axisy * arb.c2.lr1x - arb.b2.axisx * arb.c2.lr1y;
								clip2y = arb.c2.lr1x * arb.b2.axisx + arb.c2.lr1y * arb.b2.axisy;
								let t = 1.0;
								clip2x += arb.b2.posx * t;
								clip2y += arb.b2.posy * t;
							}
						} else {
							gnormx = arb.b2.axisy * arb.lnormx - arb.b2.axisx * arb.lnormy;
							gnormy = arb.lnormx * arb.b2.axisx + arb.lnormy * arb.b2.axisy;
							gproj = arb.lproj + (gnormx * arb.b2.posx + gnormy * arb.b2.posy);
							clip1x = arb.b1.axisy * arb.c1.lr1x - arb.b1.axisx * arb.c1.lr1y;
							clip1y = arb.c1.lr1x * arb.b1.axisx + arb.c1.lr1y * arb.b1.axisy;
							let t = 1.0;
							clip1x += arb.b1.posx * t;
							clip1y += arb.b1.posy * t;
							if(arb.hpc2) {
								clip2x = arb.b1.axisy * arb.c2.lr1x - arb.b1.axisx * arb.c2.lr1y;
								clip2y = arb.c2.lr1x * arb.b1.axisx + arb.c2.lr1y * arb.b1.axisy;
								let t = 1.0;
								clip2x += arb.b1.posx * t;
								clip2y += arb.b1.posy * t;
							}
						}
						let err1 = clip1x * gnormx + clip1y * gnormy - gproj - arb.radius;
						err1 += Config.collisionSlop;
						let err2 = 0.0;
						if(arb.hpc2) {
							err2 = clip2x * gnormx + clip2y * gnormy - gproj - arb.radius;
							err2 += Config.collisionSlop;
						}
						if(err1 < 0 || err2 < 0) {
							if(arb.rev) {
								gnormx = -gnormx;
								gnormy = -gnormy;
							}
							let c1r1x = 0.0;
							let c1r1y = 0.0;
							c1r1x = clip1x - arb.b1.posx;
							c1r1y = clip1y - arb.b1.posy;
							let c1r2x = 0.0;
							let c1r2y = 0.0;
							c1r2x = clip1x - arb.b2.posx;
							c1r2y = clip1y - arb.b2.posy;
							let c2r1x = 0;
							let c2r1y = 0;
							let c2r2x = 0;
							let c2r2y = 0;
							if(arb.hpc2) {
								c2r1x = clip2x - arb.b1.posx;
								c2r1y = clip2y - arb.b1.posy;
								c2r2x = clip2x - arb.b2.posx;
								c2r2y = clip2y - arb.b2.posy;
								let rn1a = gnormy * c1r1x - gnormx * c1r1y;
								let rn1b = gnormy * c1r2x - gnormx * c1r2y;
								let rn2a = gnormy * c2r1x - gnormx * c2r1y;
								let rn2b = gnormy * c2r2x - gnormx * c2r2y;
								let mass_sum = arb.b1.smass + arb.b2.smass;
								arb.kMassa = mass_sum + arb.b1.sinertia * rn1a * rn1a + arb.b2.sinertia * rn1b * rn1b;
								arb.kMassb = mass_sum + arb.b1.sinertia * rn1a * rn2a + arb.b2.sinertia * rn1b * rn2b;
								arb.kMassc = mass_sum + arb.b1.sinertia * rn2a * rn2a + arb.b2.sinertia * rn2b * rn2b;
								let Ka = 0.0;
								let Kb = 0.0;
								let Kc = 0.0;
								Ka = arb.kMassa;
								Kb = arb.kMassb;
								Kc = arb.kMassc;
								let bx = err1 * arb.biasCoef;
								let by = err2 * arb.biasCoef;
								while(true) {
									let xx = 0.0;
									let xy = 0.0;
									xx = bx;
									xy = by;
									xx = -xx;
									xy = -xy;
									let det = arb.kMassa * arb.kMassc - arb.kMassb * arb.kMassb;
									if(det != det) {
										xy = 0;
										xx = xy;
									} else if(det == 0) {
										if(arb.kMassa != 0) {
											xx /= arb.kMassa;
										} else {
											xx = 0;
										}
										if(arb.kMassc != 0) {
											xy /= arb.kMassc;
										} else {
											xy = 0;
										}
									} else {
										det = 1 / det;
										let t = det * (arb.kMassc * xx - arb.kMassb * xy);
										xy = det * (arb.kMassa * xy - arb.kMassb * xx);
										xx = t;
									}
									if(xx >= 0 && xy >= 0) {
										let t = (xx + xy) * arb.b1.imass;
										arb.b1.posx -= gnormx * t;
										arb.b1.posy -= gnormy * t;
										let _this = arb.b1;
										let dr = -arb.b1.iinertia * (rn1a * xx + rn2a * xy);
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
										let t1 = (xx + xy) * arb.b2.imass;
										arb.b2.posx += gnormx * t1;
										arb.b2.posy += gnormy * t1;
										let _this1 = arb.b2;
										let dr1 = arb.b2.iinertia * (rn1b * xx + rn2b * xy);
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
										break;
									}
									xx = -bx / Ka;
									xy = 0;
									let vn2 = Kb * xx + by;
									if(xx >= 0 && vn2 >= 0) {
										let t = (xx + xy) * arb.b1.imass;
										arb.b1.posx -= gnormx * t;
										arb.b1.posy -= gnormy * t;
										let _this = arb.b1;
										let dr = -arb.b1.iinertia * (rn1a * xx + rn2a * xy);
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
										let t1 = (xx + xy) * arb.b2.imass;
										arb.b2.posx += gnormx * t1;
										arb.b2.posy += gnormy * t1;
										let _this1 = arb.b2;
										let dr1 = arb.b2.iinertia * (rn1b * xx + rn2b * xy);
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
										break;
									}
									xx = 0;
									xy = -by / Kc;
									let vn1 = Kb * xy + bx;
									if(xy >= 0 && vn1 >= 0) {
										let t = (xx + xy) * arb.b1.imass;
										arb.b1.posx -= gnormx * t;
										arb.b1.posy -= gnormy * t;
										let _this = arb.b1;
										let dr = -arb.b1.iinertia * (rn1a * xx + rn2a * xy);
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
										let t1 = (xx + xy) * arb.b2.imass;
										arb.b2.posx += gnormx * t1;
										arb.b2.posy += gnormy * t1;
										let _this1 = arb.b2;
										let dr1 = arb.b2.iinertia * (rn1b * xx + rn2b * xy);
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
										break;
									}
									if(!false) {
										break;
									}
								}
							} else {
								let rn1 = gnormy * c1r1x - gnormx * c1r1y;
								let rn2 = gnormy * c1r2x - gnormx * c1r2y;
								let K = arb.b2.smass + rn2 * rn2 * arb.b2.sinertia + arb.b1.smass + rn1 * rn1 * arb.b1.sinertia;
								if(K != 0) {
									let jn = -arb.biasCoef * err1 / K;
									let Jx = 0.0;
									let Jy = 0.0;
									let t = jn;
									Jx = gnormx * t;
									Jy = gnormy * t;
									let t1 = arb.b1.imass;
									arb.b1.posx -= Jx * t1;
									arb.b1.posy -= Jy * t1;
									let _this = arb.b1;
									let dr = -rn1 * arb.b1.iinertia * jn;
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
									let t2 = arb.b2.imass;
									arb.b2.posx += Jx * t2;
									arb.b2.posy += Jy * t2;
									let _this1 = arb.b2;
									let dr1 = rn2 * arb.b2.iinertia * jn;
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
						}
					}
				}
				arbi = arbi.next;
				if(fst && arbi == null) {
					arbi = this.c_arbiters_true.head;
					fst = false;
				}
			}
		}
	}
	group_ignore(s1,s2) {
		let cur = s1;
		while(cur != null && cur.group == null) if(cur.ishape != null) {
			cur = cur.ishape.body;
		} else if(cur.icompound != null) {
			cur = cur.icompound.compound;
		} else {
			cur = cur.ibody.compound;
		}
		let g1 = cur == null ? null : cur.group;
		if(g1 == null) {
			return false;
		} else {
			let cur = s2;
			while(cur != null && cur.group == null) if(cur.ishape != null) {
				cur = cur.ishape.body;
			} else if(cur.icompound != null) {
				cur = cur.icompound.compound;
			} else {
				cur = cur.ibody.compound;
			}
			let g2 = cur == null ? null : cur.group;
			if(g2 == null) {
				return false;
			} else {
				let ret = false;
				while(g1 != null && g2 != null) {
					if(g1 == g2) {
						ret = g1.ignore;
						break;
					}
					if(g1.depth < g2.depth) {
						g2 = g2.group;
					} else {
						g1 = g1.group;
					}
				}
				return ret;
			}
		}
	}
	interactionType(s1,s2,b1,b2) {
		let con_ignore;
		con_ignore = false;
		let cx_ite = b1.constraints.head;
		while(cx_ite != null) {
			let con = cx_ite.elt;
			if(con.ignore && con.pair_exists(b1.id,b2.id)) {
				con_ignore = true;
				break;
			}
			cx_ite = cx_ite.next;
		}
		let tmp;
		if(!con_ignore) {
			let cur = s1;
			while(cur != null && cur.group == null) if(cur.ishape != null) {
				cur = cur.ishape.body;
			} else if(cur.icompound != null) {
				cur = cur.icompound.compound;
			} else {
				cur = cur.ibody.compound;
			}
			let g1 = cur == null ? null : cur.group;
			let tmp1;
			if(g1 == null) {
				tmp1 = false;
			} else {
				let cur = s2;
				while(cur != null && cur.group == null) if(cur.ishape != null) {
					cur = cur.ishape.body;
				} else if(cur.icompound != null) {
					cur = cur.icompound.compound;
				} else {
					cur = cur.ibody.compound;
				}
				let g2 = cur == null ? null : cur.group;
				if(g2 == null) {
					tmp1 = false;
				} else {
					let ret = false;
					while(g1 != null && g2 != null) {
						if(g1 == g2) {
							ret = g1.ignore;
							break;
						}
						if(g1.depth < g2.depth) {
							g2 = g2.group;
						} else {
							g1 = g1.group;
						}
					}
					tmp1 = ret;
				}
			}
			tmp = !tmp1;
		} else {
			tmp = false;
		}
		if(tmp) {
			let tmp;
			if(s1.sensorEnabled || s2.sensorEnabled) {
				let _this = s1.filter;
				let x = s2.filter;
				tmp = (_this.sensorMask & x.sensorGroup) != 0 && (x.sensorMask & _this.sensorGroup) != 0;
			} else {
				tmp = false;
			}
			if(tmp) {
				return 2;
			} else {
				let tmp;
				if(s1.fluidEnabled || s2.fluidEnabled) {
					let _this = s1.filter;
					let x = s2.filter;
					tmp = (_this.fluidMask & x.fluidGroup) != 0 && (x.fluidMask & _this.fluidGroup) != 0;
				} else {
					tmp = false;
				}
				if(tmp && !(b1.imass == 0 && b2.imass == 0 && b1.iinertia == 0 && b2.iinertia == 0)) {
					return 0;
				} else {
					let _this = s1.filter;
					let x = s2.filter;
					if((_this.collisionMask & x.collisionGroup) != 0 && (x.collisionMask & _this.collisionGroup) != 0 && !(b1.imass == 0 && b2.imass == 0 && b1.iinertia == 0 && b2.iinertia == 0)) {
						return 1;
					} else {
						return -1;
					}
				}
			}
		} else {
			return -1;
		}
	}
	narrowPhase(s1,s2,stat,in_arb,continuous) {
		let ret = null;
		let b1 = s1.body;
		let b2 = s2.body;
		let con_ignore;
		con_ignore = false;
		let cx_ite = b1.constraints.head;
		while(cx_ite != null) {
			let con = cx_ite.elt;
			if(con.ignore && con.pair_exists(b1.id,b2.id)) {
				con_ignore = true;
				break;
			}
			cx_ite = cx_ite.next;
		}
		let itype;
		let itype1;
		if(!con_ignore) {
			let cur = s1;
			while(cur != null && cur.group == null) if(cur.ishape != null) {
				cur = cur.ishape.body;
			} else if(cur.icompound != null) {
				cur = cur.icompound.compound;
			} else {
				cur = cur.ibody.compound;
			}
			let g1 = cur == null ? null : cur.group;
			let itype;
			if(g1 == null) {
				itype = false;
			} else {
				let cur = s2;
				while(cur != null && cur.group == null) if(cur.ishape != null) {
					cur = cur.ishape.body;
				} else if(cur.icompound != null) {
					cur = cur.icompound.compound;
				} else {
					cur = cur.ibody.compound;
				}
				let g2 = cur == null ? null : cur.group;
				if(g2 == null) {
					itype = false;
				} else {
					let ret = false;
					while(g1 != null && g2 != null) {
						if(g1 == g2) {
							ret = g1.ignore;
							break;
						}
						if(g1.depth < g2.depth) {
							g2 = g2.group;
						} else {
							g1 = g1.group;
						}
					}
					itype = ret;
				}
			}
			itype1 = !itype;
		} else {
			itype1 = false;
		}
		if(itype1) {
			let itype1;
			if(s1.sensorEnabled || s2.sensorEnabled) {
				let _this = s1.filter;
				let x = s2.filter;
				itype1 = (_this.sensorMask & x.sensorGroup) != 0 && (x.sensorMask & _this.sensorGroup) != 0;
			} else {
				itype1 = false;
			}
			if(itype1) {
				itype = 2;
			} else {
				let itype1;
				if(s1.fluidEnabled || s2.fluidEnabled) {
					let _this = s1.filter;
					let x = s2.filter;
					itype1 = (_this.fluidMask & x.fluidGroup) != 0 && (x.fluidMask & _this.fluidGroup) != 0;
				} else {
					itype1 = false;
				}
				if(itype1 && !(b1.imass == 0 && b2.imass == 0 && b1.iinertia == 0 && b2.iinertia == 0)) {
					itype = 0;
				} else {
					let _this = s1.filter;
					let x = s2.filter;
					itype = (_this.collisionMask & x.collisionGroup) != 0 && (x.collisionMask & _this.collisionGroup) != 0 && !(b1.imass == 0 && b2.imass == 0 && b1.iinertia == 0 && b2.iinertia == 0) ? 1 : -1;
				}
			}
		} else {
			itype = -1;
		}
		let _gthis = this;
		if(itype != -1) {
			let sa;
			let sb;
			if(s1.type > s2.type) {
				sa = s2;
				sb = s1;
			} else if(s1.type == s2.type) {
				if(s1.id < s2.id) {
					sa = s1;
					sb = s2;
				} else {
					sb = s1;
					sa = s2;
				}
			} else {
				sa = s1;
				sb = s2;
			}
			let reverse = sa == s2;
			if(itype == 0) {
				let xarb;
				if(in_arb == null) {
					let ret = null;
					let b = b1.arbiters.length < b2.arbiters.length ? b1 : b2;
					let cx_ite = b.arbiters.head;
					while(cx_ite != null) {
						let arb = cx_ite.elt;
						if(arb.id == sa.id && arb.di == sb.id) {
							ret = arb;
							break;
						}
						cx_ite = cx_ite.next;
					}
					xarb = ret;
				} else {
					xarb = in_arb;
				}
				let first = xarb == null;
				let arb;
				let swapped = false;
				if(first) {
					if(ZPP_FluidArbiter.zpp_pool == null) {
						arb = new ZPP_FluidArbiter();
					} else {
						arb = ZPP_FluidArbiter.zpp_pool;
						ZPP_FluidArbiter.zpp_pool = arb.next;
						arb.next = null;
					}
				} else if(xarb.fluidarb == null) {
					let b = null;
					xarb.cleared = true;
					if(b == null || xarb.b2 == b) {
						let _this = xarb.b1.arbiters;
						let pre = null;
						let cur = _this.head;
						let ret = false;
						while(cur != null) {
							if(cur.elt == xarb) {
								let old;
								let ret1;
								if(pre == null) {
									old = _this.head;
									ret1 = old.next;
									_this.head = ret1;
									if(_this.head == null) {
										_this.pushmod = true;
									}
								} else {
									old = pre.next;
									ret1 = old.next;
									pre.next = ret1;
									if(ret1 == null) {
										_this.pushmod = true;
									}
								}
								let o = old;
								o.elt = null;
								o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
								ZNPNode_ZPP_Arbiter.zpp_pool = o;
								_this.modified = true;
								_this.length--;
								_this.pushmod = true;
								ret = true;
								break;
							}
							pre = cur;
							cur = cur.next;
						}
					}
					if(b == null || xarb.b1 == b) {
						let _this = xarb.b2.arbiters;
						let pre = null;
						let cur = _this.head;
						let ret = false;
						while(cur != null) {
							if(cur.elt == xarb) {
								let old;
								let ret1;
								if(pre == null) {
									old = _this.head;
									ret1 = old.next;
									_this.head = ret1;
									if(_this.head == null) {
										_this.pushmod = true;
									}
								} else {
									old = pre.next;
									ret1 = old.next;
									pre.next = ret1;
									if(ret1 == null) {
										_this.pushmod = true;
									}
								}
								let o = old;
								o.elt = null;
								o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
								ZNPNode_ZPP_Arbiter.zpp_pool = o;
								_this.modified = true;
								_this.length--;
								_this.pushmod = true;
								ret = true;
								break;
							}
							pre = cur;
							cur = cur.next;
						}
					}
					if(xarb.pair != null) {
						xarb.pair.arb = null;
						xarb.pair = null;
					}
					xarb.active = false;
					this.f_arbiters.modified = true;
					if(ZPP_FluidArbiter.zpp_pool == null) {
						arb = new ZPP_FluidArbiter();
					} else {
						arb = ZPP_FluidArbiter.zpp_pool;
						ZPP_FluidArbiter.zpp_pool = arb.next;
						arb.next = null;
					}
					arb.intchange = true;
					first = true;
					swapped = true;
				} else {
					arb = xarb.fluidarb;
				}
				let inttype = ZPP_Flags.id_InteractionType_FLUID;
				if(first || arb.stamp != this.stamp || continuous) {
					arb.stamp = this.stamp;
					if(ZPP_Collide.flowCollide(sa,sb,arb)) {
						if(first) {
							let di = sb.id;
							arb.b1 = s1.body;
							arb.ws1 = s1;
							arb.b2 = s2.body;
							arb.ws2 = s2;
							arb.id = sa.id;
							arb.di = di;
							let _this = arb.b1.arbiters;
							let ret;
							if(ZNPNode_ZPP_Arbiter.zpp_pool == null) {
								ret = new ZNPNode_ZPP_Arbiter();
							} else {
								ret = ZNPNode_ZPP_Arbiter.zpp_pool;
								ZNPNode_ZPP_Arbiter.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.elt = arb;
							let temp = ret;
							temp.next = _this.head;
							_this.head = temp;
							_this.modified = true;
							_this.length++;
							let _this1 = arb.b2.arbiters;
							let ret1;
							if(ZNPNode_ZPP_Arbiter.zpp_pool == null) {
								ret1 = new ZNPNode_ZPP_Arbiter();
							} else {
								ret1 = ZNPNode_ZPP_Arbiter.zpp_pool;
								ZNPNode_ZPP_Arbiter.zpp_pool = ret1.next;
								ret1.next = null;
							}
							ret1.elt = arb;
							let temp1 = ret1;
							temp1.next = _this1.head;
							_this1.head = temp1;
							_this1.modified = true;
							_this1.length++;
							arb.active = true;
							arb.present = 0;
							arb.cleared = false;
							arb.sleeping = false;
							arb.fresh = false;
							arb.presentable = false;
							arb.nx = 0;
							arb.ny = 1;
							arb.dampx = 0;
							arb.dampy = 0;
							arb.adamp = 0.0;
							let _this2 = this.f_arbiters;
							let ret2;
							if(ZNPNode_ZPP_FluidArbiter.zpp_pool == null) {
								ret2 = new ZNPNode_ZPP_FluidArbiter();
							} else {
								ret2 = ZNPNode_ZPP_FluidArbiter.zpp_pool;
								ZNPNode_ZPP_FluidArbiter.zpp_pool = ret2.next;
								ret2.next = null;
							}
							ret2.elt = arb;
							let temp2 = ret2;
							temp2.next = _this2.head;
							_this2.head = temp2;
							_this2.modified = true;
							_this2.length++;
							arb.fresh = !swapped;
						} else {
							arb.fresh = arb.up_stamp < this.stamp - 1 || arb.endGenerated == this.stamp && continuous;
						}
						arb.up_stamp = arb.stamp;
						if(arb.fresh || (arb.immState & ZPP_Flags.id_ImmState_ALWAYS) == 0) {
							arb.immState = ZPP_Flags.id_ImmState_ACCEPT;
							let anyimpure = false;
							let arbs1 = arb.ws1.id > arb.ws2.id ? arb.ws2 : arb.ws1;
							let arbs2 = arb.ws1.id > arb.ws2.id ? arb.ws1 : arb.ws2;
							let _this = this.mrca1;
							while(_this.head != null) {
								let ret = _this.head;
								_this.head = ret.next;
								let o = ret;
								o.elt = null;
								o.next = ZNPNode_ZPP_Interactor.zpp_pool;
								ZNPNode_ZPP_Interactor.zpp_pool = o;
								if(_this.head == null) {
									_this.pushmod = true;
								}
								_this.modified = true;
								_this.length--;
							}
							_this.pushmod = true;
							let _this1 = this.mrca2;
							while(_this1.head != null) {
								let ret = _this1.head;
								_this1.head = ret.next;
								let o = ret;
								o.elt = null;
								o.next = ZNPNode_ZPP_Interactor.zpp_pool;
								ZNPNode_ZPP_Interactor.zpp_pool = o;
								if(_this1.head == null) {
									_this1.pushmod = true;
								}
								_this1.modified = true;
								_this1.length--;
							}
							_this1.pushmod = true;
							if(arbs1.cbSet != null) {
								let _this = this.mrca1;
								let ret;
								if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
									ret = new ZNPNode_ZPP_Interactor();
								} else {
									ret = ZNPNode_ZPP_Interactor.zpp_pool;
									ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.elt = arbs1;
								let temp = ret;
								temp.next = _this.head;
								_this.head = temp;
								_this.modified = true;
								_this.length++;
							}
							if(arbs1.body.cbSet != null) {
								let _this = this.mrca1;
								let o = arbs1.body;
								let ret;
								if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
									ret = new ZNPNode_ZPP_Interactor();
								} else {
									ret = ZNPNode_ZPP_Interactor.zpp_pool;
									ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.elt = o;
								let temp = ret;
								temp.next = _this.head;
								_this.head = temp;
								_this.modified = true;
								_this.length++;
							}
							if(arbs2.cbSet != null) {
								let _this = this.mrca2;
								let ret;
								if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
									ret = new ZNPNode_ZPP_Interactor();
								} else {
									ret = ZNPNode_ZPP_Interactor.zpp_pool;
									ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.elt = arbs2;
								let temp = ret;
								temp.next = _this.head;
								_this.head = temp;
								_this.modified = true;
								_this.length++;
							}
							if(arbs2.body.cbSet != null) {
								let _this = this.mrca2;
								let o = arbs2.body;
								let ret;
								if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
									ret = new ZNPNode_ZPP_Interactor();
								} else {
									ret = ZNPNode_ZPP_Interactor.zpp_pool;
									ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.elt = o;
								let temp = ret;
								temp.next = _this.head;
								_this.head = temp;
								_this.modified = true;
								_this.length++;
							}
							let c1 = arbs1.body.compound;
							let c2 = arbs2.body.compound;
							while(c1 != c2) {
								let d1 = c1 == null ? 0 : c1.depth;
								let d2 = c2 == null ? 0 : c2.depth;
								if(d1 < d2) {
									if(c2.cbSet != null) {
										let _this = this.mrca2;
										let ret;
										if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
											ret = new ZNPNode_ZPP_Interactor();
										} else {
											ret = ZNPNode_ZPP_Interactor.zpp_pool;
											ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.elt = c2;
										let temp = ret;
										temp.next = _this.head;
										_this.head = temp;
										_this.modified = true;
										_this.length++;
									}
									c2 = c2.compound;
								} else {
									if(c1.cbSet != null) {
										let _this = this.mrca1;
										let ret;
										if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
											ret = new ZNPNode_ZPP_Interactor();
										} else {
											ret = ZNPNode_ZPP_Interactor.zpp_pool;
											ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.elt = c1;
										let temp = ret;
										temp.next = _this.head;
										_this.head = temp;
										_this.modified = true;
										_this.length++;
									}
									c1 = c1.compound;
								}
							}
							let cx_ite = this.mrca1.head;
							while(cx_ite != null) {
								let i1 = cx_ite.elt;
								let cx_ite1 = this.mrca2.head;
								while(cx_ite1 != null) {
									let i2 = cx_ite1.elt;
									let cb1 = i1.cbSet;
									let cb2 = i2.cbSet;
									let _this = cb1.manager;
									let ret = null;
									let pairs = cb1.cbpairs.length < cb2.cbpairs.length ? cb1.cbpairs : cb2.cbpairs;
									let cx_ite = pairs.head;
									while(cx_ite != null) {
										let p = cx_ite.elt;
										if(p.a == cb1 && p.b == cb2 || p.a == cb2 && p.b == cb1) {
											ret = p;
											break;
										}
										cx_ite = cx_ite.next;
									}
									if(ret == null) {
										let ret1;
										if(ZPP_CbSetPair.zpp_pool == null) {
											ret1 = new ZPP_CbSetPair();
										} else {
											ret1 = ZPP_CbSetPair.zpp_pool;
											ZPP_CbSetPair.zpp_pool = ret1.next;
											ret1.next = null;
										}
										ret1.zip_listeners = true;
										if(ZPP_CbSet.setlt(cb1,cb2)) {
											ret1.a = cb1;
											ret1.b = cb2;
										} else {
											ret1.a = cb2;
											ret1.b = cb1;
										}
										ret = ret1;
										cb1.cbpairs.add(ret);
										if(cb2 != cb1) {
											cb2.cbpairs.add(ret);
										}
									}
									if(ret.zip_listeners) {
										ret.zip_listeners = false;
										ret.__validate();
									}
									if(ret.listeners.head == null) {
										cx_ite1 = cx_ite1.next;
										continue;
									}
									let callbackset = null;
									let ncallbackset = null;
									let _this1 = this.prelisteners;
									while(_this1.head != null) {
										let ret = _this1.head;
										_this1.head = ret.next;
										let o = ret;
										o.elt = null;
										o.next = ZNPNode_ZPP_InteractionListener.zpp_pool;
										ZNPNode_ZPP_InteractionListener.zpp_pool = o;
										if(_this1.head == null) {
											_this1.pushmod = true;
										}
										_this1.modified = true;
										_this1.length--;
									}
									_this1.pushmod = true;
									let lite = null;
									let event = ZPP_Flags.id_CbEvent_PRE;
									let _this2 = cb1.manager;
									let ret1 = null;
									let pairs1 = cb1.cbpairs.length < cb2.cbpairs.length ? cb1.cbpairs : cb2.cbpairs;
									let cx_ite2 = pairs1.head;
									while(cx_ite2 != null) {
										let p = cx_ite2.elt;
										if(p.a == cb1 && p.b == cb2 || p.a == cb2 && p.b == cb1) {
											ret1 = p;
											break;
										}
										cx_ite2 = cx_ite2.next;
									}
									if(ret1 == null) {
										let ret;
										if(ZPP_CbSetPair.zpp_pool == null) {
											ret = new ZPP_CbSetPair();
										} else {
											ret = ZPP_CbSetPair.zpp_pool;
											ZPP_CbSetPair.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.zip_listeners = true;
										if(ZPP_CbSet.setlt(cb1,cb2)) {
											ret.a = cb1;
											ret.b = cb2;
										} else {
											ret.a = cb2;
											ret.b = cb1;
										}
										ret1 = ret;
										cb1.cbpairs.add(ret1);
										if(cb2 != cb1) {
											cb2.cbpairs.add(ret1);
										}
									}
									if(ret1.zip_listeners) {
										ret1.zip_listeners = false;
										ret1.__validate();
									}
									let cx_ite3 = ret1.listeners.head;
									while(cx_ite3 != null) {
										let x = cx_ite3.elt;
										if(x.event == event) {
											if((x.itype & inttype) != 0) {
												let _this = _gthis.prelisteners;
												let ret;
												if(ZNPNode_ZPP_InteractionListener.zpp_pool == null) {
													ret = new ZNPNode_ZPP_InteractionListener();
												} else {
													ret = ZNPNode_ZPP_InteractionListener.zpp_pool;
													ZNPNode_ZPP_InteractionListener.zpp_pool = ret.next;
													ret.next = null;
												}
												ret.elt = x;
												let temp = ret;
												if(lite == null) {
													temp.next = _this.head;
													_this.head = temp;
												} else {
													temp.next = lite.next;
													lite.next = temp;
												}
												_this.pushmod = _this.modified = true;
												_this.length++;
												lite = temp;
												anyimpure = anyimpure || !x.pure;
											}
										}
										cx_ite3 = cx_ite3.next;
									}
									if(this.prelisteners.head == null) {
										cx_ite1 = cx_ite1.next;
										continue;
									}
									callbackset = ZPP_Interactor.get(i1,i2);
									if(callbackset == null) {
										ncallbackset = ZPP_CallbackSet.get(i1,i2);
										this.add_callbackset(ncallbackset);
									}
									if(callbackset == null || (callbackset.FLUIDstamp != this.stamp || continuous) && (callbackset.FLUIDstate & ZPP_Flags.id_ImmState_ALWAYS) == 0) {
										if(ncallbackset != null) {
											callbackset = ncallbackset;
										}
										if(callbackset != null) {
											let cx_ite = this.prelisteners.head;
											while(cx_ite != null) {
												let listener = cx_ite.elt;
												if(listener.itype == ZPP_Flags.id_InteractionType_ANY) {
													callbackset.COLLISIONstamp = this.stamp;
													callbackset.SENSORstamp = this.stamp;
													callbackset.FLUIDstamp = this.stamp;
												} else {
													callbackset.FLUIDstamp = this.stamp;
												}
												cx_ite = cx_ite.next;
											}
										}
										arb.mutable = true;
										if(arb.wrap_position != null) {
											arb.wrap_position.zpp_inner._immutable = false;
										}
										let pact = arb.active;
										arb.active = true;
										let emptycontacts = false;
										this.precb.zpp_inner.pre_arbiter = arb;
										this.precb.zpp_inner.set = callbackset;
										let cx_ite = this.prelisteners.head;
										while(cx_ite != null) {
											let listener = cx_ite.elt;
											this.precb.zpp_inner.listener = listener;
											let cb = this.precb.zpp_inner;
											let o1 = callbackset.int1;
											let o2 = callbackset.int2;
											let ret;
											let _this = listener.options1;
											let xs = o1.cbTypes;
											if(_this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes)) {
												let _this = listener.options2;
												let xs = o2.cbTypes;
												ret = _this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes);
											} else {
												ret = false;
											}
											if(ret) {
												cb.int1 = o1;
												cb.int2 = o2;
											} else {
												cb.int1 = o2;
												cb.int2 = o1;
											}
											this.precb.zpp_inner.pre_swapped = i1 != this.precb.zpp_inner.int1;
											let ret1 = listener.handlerp(this.precb);
											if(ret1 != null) {
												let ret;
												if(ZPP_Flags.PreFlag_ACCEPT == null) {
													ZPP_Flags.internal = true;
													ZPP_Flags.PreFlag_ACCEPT = new PreFlag();
													ZPP_Flags.internal = false;
												}
												if(ret1 == ZPP_Flags.PreFlag_ACCEPT) {
													ret = ZPP_Flags.id_ImmState_ACCEPT | ZPP_Flags.id_ImmState_ALWAYS;
												} else {
													if(ZPP_Flags.PreFlag_ACCEPT_ONCE == null) {
														ZPP_Flags.internal = true;
														ZPP_Flags.PreFlag_ACCEPT_ONCE = new PreFlag();
														ZPP_Flags.internal = false;
													}
													if(ret1 == ZPP_Flags.PreFlag_ACCEPT_ONCE) {
														ret = ZPP_Flags.id_ImmState_ACCEPT;
													} else {
														if(ZPP_Flags.PreFlag_IGNORE == null) {
															ZPP_Flags.internal = true;
															ZPP_Flags.PreFlag_IGNORE = new PreFlag();
															ZPP_Flags.internal = false;
														}
														ret = ret1 == ZPP_Flags.PreFlag_IGNORE ? ZPP_Flags.id_ImmState_IGNORE | ZPP_Flags.id_ImmState_ALWAYS : ZPP_Flags.id_ImmState_IGNORE;
													}
												}
												arb.immState = ret;
											}
											cx_ite = cx_ite.next;
										}
										arb.mutable = false;
										if(arb.wrap_position != null) {
											arb.wrap_position.zpp_inner._immutable = true;
										}
										arb.active = pact;
										if(callbackset != null) {
											let cx_ite = this.prelisteners.head;
											while(cx_ite != null) {
												let listener = cx_ite.elt;
												if(listener.itype == ZPP_Flags.id_InteractionType_ANY) {
													callbackset.COLLISIONstate = arb.immState;
													callbackset.SENSORstate = arb.immState;
													callbackset.FLUIDstate = arb.immState;
												} else {
													callbackset.FLUIDstate = arb.immState;
												}
												cx_ite = cx_ite.next;
											}
										}
									} else if(callbackset == null) {
										if((arb.immState & ZPP_Flags.id_ImmState_ALWAYS) == 0) {
											arb.immState = ZPP_Flags.id_ImmState_ACCEPT;
										}
									} else {
										arb.immState = callbackset.FLUIDstate;
									}
									cx_ite1 = cx_ite1.next;
								}
								cx_ite = cx_ite.next;
							}
							if(anyimpure && (arb.immState & ZPP_Flags.id_ImmState_ALWAYS) == 0) {
								if(arb.b1.type == ZPP_Flags.id_BodyType_DYNAMIC) {
									let o = arb.b1;
									if(!o.world) {
										o.component.waket = this.stamp + (this.midstep ? 0 : 1);
										if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
											o.kinematicDelaySleep = true;
										}
										if(o.component.sleeping) {
											this.really_wake(o,false);
										}
									}
								}
								if(arb.b1.type == ZPP_Flags.id_BodyType_DYNAMIC) {
									let o = arb.b2;
									if(!o.world) {
										o.component.waket = this.stamp + (this.midstep ? 0 : 1);
										if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
											o.kinematicDelaySleep = true;
										}
										if(o.component.sleeping) {
											this.really_wake(o,false);
										}
									}
								}
							}
						}
						if((arb.immState & ZPP_Flags.id_ImmState_ACCEPT) != 0) {
							if(arb.b1.type == ZPP_Flags.id_BodyType_DYNAMIC && arb.b1.component.sleeping) {
								let o = arb.b1;
								if(!o.world) {
									o.component.waket = this.stamp + (this.midstep ? 0 : 1);
									if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
										o.kinematicDelaySleep = true;
									}
									if(o.component.sleeping) {
										this.really_wake(o,false);
									}
								}
							}
							if(arb.b2.type == ZPP_Flags.id_BodyType_DYNAMIC && arb.b2.component.sleeping) {
								let o = arb.b2;
								if(!o.world) {
									o.component.waket = this.stamp + (this.midstep ? 0 : 1);
									if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
										o.kinematicDelaySleep = true;
									}
									if(o.component.sleeping) {
										this.really_wake(o,false);
									}
								}
							}
						}
						if(arb.sleeping) {
							arb.sleeping = false;
							let _this = this.f_arbiters;
							let ret;
							if(ZNPNode_ZPP_FluidArbiter.zpp_pool == null) {
								ret = new ZNPNode_ZPP_FluidArbiter();
							} else {
								ret = ZNPNode_ZPP_FluidArbiter.zpp_pool;
								ZNPNode_ZPP_FluidArbiter.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.elt = arb;
							let temp = ret;
							temp.next = _this.head;
							_this.head = temp;
							_this.modified = true;
							_this.length++;
						}
						ret = arb;
					} else if(first) {
						let o = arb;
						o.next = ZPP_FluidArbiter.zpp_pool;
						ZPP_FluidArbiter.zpp_pool = o;
						ret = null;
					} else {
						ret = arb;
					}
				} else {
					ret = arb;
				}
			} else if(itype == 1) {
				let carbs = stat ? this.c_arbiters_true : this.c_arbiters_false;
				let xarb;
				if(in_arb == null) {
					let ret = null;
					let b = b1.arbiters.length < b2.arbiters.length ? b1 : b2;
					let cx_ite = b.arbiters.head;
					while(cx_ite != null) {
						let arb = cx_ite.elt;
						if(arb.id == sa.id && arb.di == sb.id) {
							ret = arb;
							break;
						}
						cx_ite = cx_ite.next;
					}
					xarb = ret;
				} else {
					xarb = in_arb;
				}
				let first = xarb == null;
				let arb;
				let swapped = false;
				if(first) {
					if(ZPP_ColArbiter.zpp_pool == null) {
						arb = new ZPP_ColArbiter();
					} else {
						arb = ZPP_ColArbiter.zpp_pool;
						ZPP_ColArbiter.zpp_pool = arb.next;
						arb.next = null;
					}
					arb.stat = stat;
				} else if(xarb.colarb == null) {
					let b = null;
					xarb.cleared = true;
					if(b == null || xarb.b2 == b) {
						let _this = xarb.b1.arbiters;
						let pre = null;
						let cur = _this.head;
						let ret = false;
						while(cur != null) {
							if(cur.elt == xarb) {
								let old;
								let ret1;
								if(pre == null) {
									old = _this.head;
									ret1 = old.next;
									_this.head = ret1;
									if(_this.head == null) {
										_this.pushmod = true;
									}
								} else {
									old = pre.next;
									ret1 = old.next;
									pre.next = ret1;
									if(ret1 == null) {
										_this.pushmod = true;
									}
								}
								let o = old;
								o.elt = null;
								o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
								ZNPNode_ZPP_Arbiter.zpp_pool = o;
								_this.modified = true;
								_this.length--;
								_this.pushmod = true;
								ret = true;
								break;
							}
							pre = cur;
							cur = cur.next;
						}
					}
					if(b == null || xarb.b1 == b) {
						let _this = xarb.b2.arbiters;
						let pre = null;
						let cur = _this.head;
						let ret = false;
						while(cur != null) {
							if(cur.elt == xarb) {
								let old;
								let ret1;
								if(pre == null) {
									old = _this.head;
									ret1 = old.next;
									_this.head = ret1;
									if(_this.head == null) {
										_this.pushmod = true;
									}
								} else {
									old = pre.next;
									ret1 = old.next;
									pre.next = ret1;
									if(ret1 == null) {
										_this.pushmod = true;
									}
								}
								let o = old;
								o.elt = null;
								o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
								ZNPNode_ZPP_Arbiter.zpp_pool = o;
								_this.modified = true;
								_this.length--;
								_this.pushmod = true;
								ret = true;
								break;
							}
							pre = cur;
							cur = cur.next;
						}
					}
					if(xarb.pair != null) {
						xarb.pair.arb = null;
						xarb.pair = null;
					}
					xarb.active = false;
					this.f_arbiters.modified = true;
					if(ZPP_ColArbiter.zpp_pool == null) {
						arb = new ZPP_ColArbiter();
					} else {
						arb = ZPP_ColArbiter.zpp_pool;
						ZPP_ColArbiter.zpp_pool = arb.next;
						arb.next = null;
					}
					arb.intchange = true;
					arb.stat = stat;
					first = true;
					swapped = true;
				} else {
					arb = xarb.colarb;
					reverse = sa != arb.s1;
					if(arb.stat != stat) {
						arb.stat = stat;
						if(!arb.sleeping) {
							(stat ? this.c_arbiters_false : this.c_arbiters_true).remove(arb);
							carbs.add(arb);
						}
					}
				}
				let inttype = ZPP_Flags.id_InteractionType_COLLISION;
				if(first || arb.stamp != this.stamp || continuous) {
					arb.stamp = this.stamp;
					if(ZPP_Collide.contactCollide(sa,sb,arb,reverse)) {
						if(first) {
							let di = sb.id;
							arb.b1 = s1.body;
							arb.ws1 = s1;
							arb.b2 = s2.body;
							arb.ws2 = s2;
							arb.id = sa.id;
							arb.di = di;
							let _this = arb.b1.arbiters;
							let ret;
							if(ZNPNode_ZPP_Arbiter.zpp_pool == null) {
								ret = new ZNPNode_ZPP_Arbiter();
							} else {
								ret = ZNPNode_ZPP_Arbiter.zpp_pool;
								ZNPNode_ZPP_Arbiter.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.elt = arb;
							let temp = ret;
							temp.next = _this.head;
							_this.head = temp;
							_this.modified = true;
							_this.length++;
							let _this1 = arb.b2.arbiters;
							let ret1;
							if(ZNPNode_ZPP_Arbiter.zpp_pool == null) {
								ret1 = new ZNPNode_ZPP_Arbiter();
							} else {
								ret1 = ZNPNode_ZPP_Arbiter.zpp_pool;
								ZNPNode_ZPP_Arbiter.zpp_pool = ret1.next;
								ret1.next = null;
							}
							ret1.elt = arb;
							let temp1 = ret1;
							temp1.next = _this1.head;
							_this1.head = temp1;
							_this1.modified = true;
							_this1.length++;
							arb.active = true;
							arb.present = 0;
							arb.cleared = false;
							arb.sleeping = false;
							arb.fresh = false;
							arb.presentable = false;
							arb.s1 = s1;
							arb.s2 = s2;
							if(!arb.userdef_restitution) {
								if(arb.s1.material.elasticity <= -Infinity || arb.s2.material.elasticity <= -Infinity) {
									arb.restitution = 0;
								} else if(arb.s1.material.elasticity >= Infinity || arb.s2.material.elasticity >= Infinity) {
									arb.restitution = 1;
								} else {
									arb.restitution = (arb.s1.material.elasticity + arb.s2.material.elasticity) / 2;
								}
								if(arb.restitution < 0) {
									arb.restitution = 0;
								}
								if(arb.restitution > 1) {
									arb.restitution = 1;
								}
							}
							if(!arb.userdef_dyn_fric) {
								arb.dyn_fric = Math.sqrt(arb.s1.material.dynamicFriction * arb.s2.material.dynamicFriction);
							}
							if(!arb.userdef_stat_fric) {
								arb.stat_fric = Math.sqrt(arb.s1.material.staticFriction * arb.s2.material.staticFriction);
							}
							if(!arb.userdef_rfric) {
								arb.rfric = Math.sqrt(arb.s1.material.rollingFriction * arb.s2.material.rollingFriction);
							}
							let ret2;
							if(ZNPNode_ZPP_ColArbiter.zpp_pool == null) {
								ret2 = new ZNPNode_ZPP_ColArbiter();
							} else {
								ret2 = ZNPNode_ZPP_ColArbiter.zpp_pool;
								ZNPNode_ZPP_ColArbiter.zpp_pool = ret2.next;
								ret2.next = null;
							}
							ret2.elt = arb;
							let temp2 = ret2;
							temp2.next = carbs.head;
							carbs.head = temp2;
							carbs.modified = true;
							carbs.length++;
							arb.fresh = !swapped;
						} else {
							arb.fresh = arb.up_stamp < this.stamp - 1 || arb.endGenerated == this.stamp && continuous;
						}
						arb.up_stamp = arb.stamp;
						if(arb.fresh || (arb.immState & ZPP_Flags.id_ImmState_ALWAYS) == 0) {
							arb.immState = ZPP_Flags.id_ImmState_ACCEPT;
							let anyimpure = false;
							let arbs1 = arb.ws1.id > arb.ws2.id ? arb.ws2 : arb.ws1;
							let arbs2 = arb.ws1.id > arb.ws2.id ? arb.ws1 : arb.ws2;
							let _this = this.mrca1;
							while(_this.head != null) {
								let ret = _this.head;
								_this.head = ret.next;
								let o = ret;
								o.elt = null;
								o.next = ZNPNode_ZPP_Interactor.zpp_pool;
								ZNPNode_ZPP_Interactor.zpp_pool = o;
								if(_this.head == null) {
									_this.pushmod = true;
								}
								_this.modified = true;
								_this.length--;
							}
							_this.pushmod = true;
							let _this1 = this.mrca2;
							while(_this1.head != null) {
								let ret = _this1.head;
								_this1.head = ret.next;
								let o = ret;
								o.elt = null;
								o.next = ZNPNode_ZPP_Interactor.zpp_pool;
								ZNPNode_ZPP_Interactor.zpp_pool = o;
								if(_this1.head == null) {
									_this1.pushmod = true;
								}
								_this1.modified = true;
								_this1.length--;
							}
							_this1.pushmod = true;
							if(arbs1.cbSet != null) {
								let _this = this.mrca1;
								let ret;
								if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
									ret = new ZNPNode_ZPP_Interactor();
								} else {
									ret = ZNPNode_ZPP_Interactor.zpp_pool;
									ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.elt = arbs1;
								let temp = ret;
								temp.next = _this.head;
								_this.head = temp;
								_this.modified = true;
								_this.length++;
							}
							if(arbs1.body.cbSet != null) {
								let _this = this.mrca1;
								let o = arbs1.body;
								let ret;
								if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
									ret = new ZNPNode_ZPP_Interactor();
								} else {
									ret = ZNPNode_ZPP_Interactor.zpp_pool;
									ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.elt = o;
								let temp = ret;
								temp.next = _this.head;
								_this.head = temp;
								_this.modified = true;
								_this.length++;
							}
							if(arbs2.cbSet != null) {
								let _this = this.mrca2;
								let ret;
								if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
									ret = new ZNPNode_ZPP_Interactor();
								} else {
									ret = ZNPNode_ZPP_Interactor.zpp_pool;
									ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.elt = arbs2;
								let temp = ret;
								temp.next = _this.head;
								_this.head = temp;
								_this.modified = true;
								_this.length++;
							}
							if(arbs2.body.cbSet != null) {
								let _this = this.mrca2;
								let o = arbs2.body;
								let ret;
								if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
									ret = new ZNPNode_ZPP_Interactor();
								} else {
									ret = ZNPNode_ZPP_Interactor.zpp_pool;
									ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.elt = o;
								let temp = ret;
								temp.next = _this.head;
								_this.head = temp;
								_this.modified = true;
								_this.length++;
							}
							let c1 = arbs1.body.compound;
							let c2 = arbs2.body.compound;
							while(c1 != c2) {
								let d1 = c1 == null ? 0 : c1.depth;
								let d2 = c2 == null ? 0 : c2.depth;
								if(d1 < d2) {
									if(c2.cbSet != null) {
										let _this = this.mrca2;
										let ret;
										if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
											ret = new ZNPNode_ZPP_Interactor();
										} else {
											ret = ZNPNode_ZPP_Interactor.zpp_pool;
											ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.elt = c2;
										let temp = ret;
										temp.next = _this.head;
										_this.head = temp;
										_this.modified = true;
										_this.length++;
									}
									c2 = c2.compound;
								} else {
									if(c1.cbSet != null) {
										let _this = this.mrca1;
										let ret;
										if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
											ret = new ZNPNode_ZPP_Interactor();
										} else {
											ret = ZNPNode_ZPP_Interactor.zpp_pool;
											ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.elt = c1;
										let temp = ret;
										temp.next = _this.head;
										_this.head = temp;
										_this.modified = true;
										_this.length++;
									}
									c1 = c1.compound;
								}
							}
							let cx_ite = this.mrca1.head;
							while(cx_ite != null) {
								let i1 = cx_ite.elt;
								let cx_ite1 = this.mrca2.head;
								while(cx_ite1 != null) {
									let i2 = cx_ite1.elt;
									let cb1 = i1.cbSet;
									let cb2 = i2.cbSet;
									let _this = cb1.manager;
									let ret = null;
									let pairs = cb1.cbpairs.length < cb2.cbpairs.length ? cb1.cbpairs : cb2.cbpairs;
									let cx_ite = pairs.head;
									while(cx_ite != null) {
										let p = cx_ite.elt;
										if(p.a == cb1 && p.b == cb2 || p.a == cb2 && p.b == cb1) {
											ret = p;
											break;
										}
										cx_ite = cx_ite.next;
									}
									if(ret == null) {
										let ret1;
										if(ZPP_CbSetPair.zpp_pool == null) {
											ret1 = new ZPP_CbSetPair();
										} else {
											ret1 = ZPP_CbSetPair.zpp_pool;
											ZPP_CbSetPair.zpp_pool = ret1.next;
											ret1.next = null;
										}
										ret1.zip_listeners = true;
										if(ZPP_CbSet.setlt(cb1,cb2)) {
											ret1.a = cb1;
											ret1.b = cb2;
										} else {
											ret1.a = cb2;
											ret1.b = cb1;
										}
										ret = ret1;
										cb1.cbpairs.add(ret);
										if(cb2 != cb1) {
											cb2.cbpairs.add(ret);
										}
									}
									if(ret.zip_listeners) {
										ret.zip_listeners = false;
										ret.__validate();
									}
									if(ret.listeners.head == null) {
										cx_ite1 = cx_ite1.next;
										continue;
									}
									let callbackset = null;
									let ncallbackset = null;
									let _this1 = this.prelisteners;
									while(_this1.head != null) {
										let ret = _this1.head;
										_this1.head = ret.next;
										let o = ret;
										o.elt = null;
										o.next = ZNPNode_ZPP_InteractionListener.zpp_pool;
										ZNPNode_ZPP_InteractionListener.zpp_pool = o;
										if(_this1.head == null) {
											_this1.pushmod = true;
										}
										_this1.modified = true;
										_this1.length--;
									}
									_this1.pushmod = true;
									let lite = null;
									let event = ZPP_Flags.id_CbEvent_PRE;
									let _this2 = cb1.manager;
									let ret1 = null;
									let pairs1 = cb1.cbpairs.length < cb2.cbpairs.length ? cb1.cbpairs : cb2.cbpairs;
									let cx_ite2 = pairs1.head;
									while(cx_ite2 != null) {
										let p = cx_ite2.elt;
										if(p.a == cb1 && p.b == cb2 || p.a == cb2 && p.b == cb1) {
											ret1 = p;
											break;
										}
										cx_ite2 = cx_ite2.next;
									}
									if(ret1 == null) {
										let ret;
										if(ZPP_CbSetPair.zpp_pool == null) {
											ret = new ZPP_CbSetPair();
										} else {
											ret = ZPP_CbSetPair.zpp_pool;
											ZPP_CbSetPair.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.zip_listeners = true;
										if(ZPP_CbSet.setlt(cb1,cb2)) {
											ret.a = cb1;
											ret.b = cb2;
										} else {
											ret.a = cb2;
											ret.b = cb1;
										}
										ret1 = ret;
										cb1.cbpairs.add(ret1);
										if(cb2 != cb1) {
											cb2.cbpairs.add(ret1);
										}
									}
									if(ret1.zip_listeners) {
										ret1.zip_listeners = false;
										ret1.__validate();
									}
									let cx_ite3 = ret1.listeners.head;
									while(cx_ite3 != null) {
										let x = cx_ite3.elt;
										if(x.event == event) {
											if((x.itype & inttype) != 0) {
												let _this = _gthis.prelisteners;
												let ret;
												if(ZNPNode_ZPP_InteractionListener.zpp_pool == null) {
													ret = new ZNPNode_ZPP_InteractionListener();
												} else {
													ret = ZNPNode_ZPP_InteractionListener.zpp_pool;
													ZNPNode_ZPP_InteractionListener.zpp_pool = ret.next;
													ret.next = null;
												}
												ret.elt = x;
												let temp = ret;
												if(lite == null) {
													temp.next = _this.head;
													_this.head = temp;
												} else {
													temp.next = lite.next;
													lite.next = temp;
												}
												_this.pushmod = _this.modified = true;
												_this.length++;
												lite = temp;
												anyimpure = anyimpure || !x.pure;
											}
										}
										cx_ite3 = cx_ite3.next;
									}
									if(this.prelisteners.head == null) {
										cx_ite1 = cx_ite1.next;
										continue;
									}
									callbackset = ZPP_Interactor.get(i1,i2);
									if(callbackset == null) {
										ncallbackset = ZPP_CallbackSet.get(i1,i2);
										this.add_callbackset(ncallbackset);
									}
									if(callbackset == null || (callbackset.COLLISIONstamp != this.stamp || continuous) && (callbackset.COLLISIONstate & ZPP_Flags.id_ImmState_ALWAYS) == 0) {
										if(ncallbackset != null) {
											callbackset = ncallbackset;
										}
										if(callbackset != null) {
											let cx_ite = this.prelisteners.head;
											while(cx_ite != null) {
												let listener = cx_ite.elt;
												if(listener.itype == ZPP_Flags.id_InteractionType_ANY) {
													callbackset.COLLISIONstamp = this.stamp;
													callbackset.SENSORstamp = this.stamp;
													callbackset.FLUIDstamp = this.stamp;
												} else {
													callbackset.COLLISIONstamp = this.stamp;
												}
												cx_ite = cx_ite.next;
											}
										}
										arb.mutable = true;
										if(arb.wrap_normal != null) {
											arb.wrap_normal.zpp_inner._immutable = false;
										}
										if(arb.wrap_contacts != null) {
											arb.wrap_contacts.zpp_inner.immutable = false;
										}
										let pact = arb.active;
										arb.active = true;
										let emptycontacts = false;
										let fst = true;
										let pre = null;
										let prei = null;
										let cx_itei = arb.innards.next;
										arb.hc2 = false;
										let cx_ite = arb.contacts.next;
										while(cx_ite != null) {
											let c = cx_ite;
											if(c.stamp + Config.arbiterExpirationDelay < arb.stamp) {
												let _this = arb.contacts;
												let old;
												let ret;
												if(pre == null) {
													old = _this.next;
													ret = old.next;
													_this.next = ret;
													if(_this.next == null) {
														_this.pushmod = true;
													}
												} else {
													old = pre.next;
													ret = old.next;
													pre.next = ret;
													if(ret == null) {
														_this.pushmod = true;
													}
												}
												old._inuse = false;
												_this.modified = true;
												_this.length--;
												_this.pushmod = true;
												cx_ite = ret;
												let _this1 = arb.innards;
												let old1;
												let ret1;
												if(prei == null) {
													old1 = _this1.next;
													ret1 = old1.next;
													_this1.next = ret1;
													if(_this1.next == null) {
														_this1.pushmod = true;
													}
												} else {
													old1 = prei.next;
													ret1 = old1.next;
													prei.next = ret1;
													if(ret1 == null) {
														_this1.pushmod = true;
													}
												}
												old1._inuse = false;
												_this1.modified = true;
												_this1.length--;
												_this1.pushmod = true;
												cx_itei = ret1;
												let o = c;
												o.arbiter = null;
												o.next = ZPP_Contact.zpp_pool;
												ZPP_Contact.zpp_pool = o;
												continue;
											}
											let ci = c.inner;
											let pact = c.active;
											c.active = c.stamp == arb.stamp;
											if(c.active) {
												if(fst) {
													fst = false;
													arb.c1 = ci;
													arb.oc1 = c;
												} else {
													arb.hc2 = true;
													arb.c2 = ci;
													arb.oc2 = c;
												}
											}
											if(pact != c.active) {
												arb.contacts.modified = true;
											}
											pre = cx_ite;
											prei = cx_itei;
											cx_itei = cx_itei.next;
											cx_ite = cx_ite.next;
										}
										if(arb.hc2) {
											arb.hpc2 = true;
											if(arb.oc1.posOnly) {
												let tmp = arb.c1;
												arb.c1 = arb.c2;
												arb.c2 = tmp;
												let tmp2 = arb.oc1;
												arb.oc1 = arb.oc2;
												arb.oc2 = tmp2;
												arb.hc2 = false;
											} else if(arb.oc2.posOnly) {
												arb.hc2 = false;
											}
											if(arb.oc1.posOnly) {
												fst = true;
											}
										} else {
											arb.hpc2 = false;
										}
										this.precb.zpp_inner.pre_arbiter = arb;
										this.precb.zpp_inner.set = callbackset;
										let cx_ite1 = this.prelisteners.head;
										while(cx_ite1 != null) {
											let listener = cx_ite1.elt;
											this.precb.zpp_inner.listener = listener;
											let cb = this.precb.zpp_inner;
											let o1 = callbackset.int1;
											let o2 = callbackset.int2;
											let ret;
											let _this = listener.options1;
											let xs = o1.cbTypes;
											if(_this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes)) {
												let _this = listener.options2;
												let xs = o2.cbTypes;
												ret = _this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes);
											} else {
												ret = false;
											}
											if(ret) {
												cb.int1 = o1;
												cb.int2 = o2;
											} else {
												cb.int1 = o2;
												cb.int2 = o1;
											}
											this.precb.zpp_inner.pre_swapped = i1 != this.precb.zpp_inner.int1;
											let ret1 = listener.handlerp(this.precb);
											if(ret1 != null) {
												let ret;
												if(ZPP_Flags.PreFlag_ACCEPT == null) {
													ZPP_Flags.internal = true;
													ZPP_Flags.PreFlag_ACCEPT = new PreFlag();
													ZPP_Flags.internal = false;
												}
												if(ret1 == ZPP_Flags.PreFlag_ACCEPT) {
													ret = ZPP_Flags.id_ImmState_ACCEPT | ZPP_Flags.id_ImmState_ALWAYS;
												} else {
													if(ZPP_Flags.PreFlag_ACCEPT_ONCE == null) {
														ZPP_Flags.internal = true;
														ZPP_Flags.PreFlag_ACCEPT_ONCE = new PreFlag();
														ZPP_Flags.internal = false;
													}
													if(ret1 == ZPP_Flags.PreFlag_ACCEPT_ONCE) {
														ret = ZPP_Flags.id_ImmState_ACCEPT;
													} else {
														if(ZPP_Flags.PreFlag_IGNORE == null) {
															ZPP_Flags.internal = true;
															ZPP_Flags.PreFlag_IGNORE = new PreFlag();
															ZPP_Flags.internal = false;
														}
														ret = ret1 == ZPP_Flags.PreFlag_IGNORE ? ZPP_Flags.id_ImmState_IGNORE | ZPP_Flags.id_ImmState_ALWAYS : ZPP_Flags.id_ImmState_IGNORE;
													}
												}
												arb.immState = ret;
											}
											cx_ite1 = cx_ite1.next;
										}
										arb.mutable = false;
										if(arb.wrap_normal != null) {
											arb.wrap_normal.zpp_inner._immutable = true;
										}
										if(arb.wrap_contacts != null) {
											arb.wrap_contacts.zpp_inner.immutable = true;
										}
										arb.active = pact;
										if(callbackset != null) {
											let cx_ite = this.prelisteners.head;
											while(cx_ite != null) {
												let listener = cx_ite.elt;
												if(listener.itype == ZPP_Flags.id_InteractionType_ANY) {
													callbackset.COLLISIONstate = arb.immState;
													callbackset.SENSORstate = arb.immState;
													callbackset.FLUIDstate = arb.immState;
												} else {
													callbackset.COLLISIONstate = arb.immState;
												}
												cx_ite = cx_ite.next;
											}
										}
									} else if(callbackset == null) {
										if((arb.immState & ZPP_Flags.id_ImmState_ALWAYS) == 0) {
											arb.immState = ZPP_Flags.id_ImmState_ACCEPT;
										}
									} else {
										arb.immState = callbackset.COLLISIONstate;
									}
									cx_ite1 = cx_ite1.next;
								}
								cx_ite = cx_ite.next;
							}
							if(anyimpure && (arb.immState & ZPP_Flags.id_ImmState_ALWAYS) == 0) {
								if(arb.b1.type == ZPP_Flags.id_BodyType_DYNAMIC) {
									let o = arb.b1;
									if(!o.world) {
										o.component.waket = this.stamp + (this.midstep ? 0 : 1);
										if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
											o.kinematicDelaySleep = true;
										}
										if(o.component.sleeping) {
											this.really_wake(o,false);
										}
									}
								}
								if(arb.b1.type == ZPP_Flags.id_BodyType_DYNAMIC) {
									let o = arb.b2;
									if(!o.world) {
										o.component.waket = this.stamp + (this.midstep ? 0 : 1);
										if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
											o.kinematicDelaySleep = true;
										}
										if(o.component.sleeping) {
											this.really_wake(o,false);
										}
									}
								}
							}
						}
						if((arb.immState & ZPP_Flags.id_ImmState_ACCEPT) != 0) {
							if(arb.b1.type == ZPP_Flags.id_BodyType_DYNAMIC && arb.b1.component.sleeping) {
								let o = arb.b1;
								if(!o.world) {
									o.component.waket = this.stamp + (this.midstep ? 0 : 1);
									if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
										o.kinematicDelaySleep = true;
									}
									if(o.component.sleeping) {
										this.really_wake(o,false);
									}
								}
							}
							if(arb.b2.type == ZPP_Flags.id_BodyType_DYNAMIC && arb.b2.component.sleeping) {
								let o = arb.b2;
								if(!o.world) {
									o.component.waket = this.stamp + (this.midstep ? 0 : 1);
									if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
										o.kinematicDelaySleep = true;
									}
									if(o.component.sleeping) {
										this.really_wake(o,false);
									}
								}
							}
						}
						if(arb.sleeping) {
							arb.sleeping = false;
							let ret;
							if(ZNPNode_ZPP_ColArbiter.zpp_pool == null) {
								ret = new ZNPNode_ZPP_ColArbiter();
							} else {
								ret = ZNPNode_ZPP_ColArbiter.zpp_pool;
								ZNPNode_ZPP_ColArbiter.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.elt = arb;
							let temp = ret;
							temp.next = carbs.head;
							carbs.head = temp;
							carbs.modified = true;
							carbs.length++;
						}
						ret = arb;
					} else if(first) {
						let o = arb;
						o.userdef_dyn_fric = false;
						o.userdef_stat_fric = false;
						o.userdef_restitution = false;
						o.userdef_rfric = false;
						o.__ref_edge1 = o.__ref_edge2 = null;
						o.next = ZPP_ColArbiter.zpp_pool;
						ZPP_ColArbiter.zpp_pool = o;
						ret = null;
					} else {
						ret = arb;
					}
				} else {
					ret = arb;
				}
			} else {
				let xarb;
				if(in_arb == null) {
					let ret = null;
					let b = b1.arbiters.length < b2.arbiters.length ? b1 : b2;
					let cx_ite = b.arbiters.head;
					while(cx_ite != null) {
						let arb = cx_ite.elt;
						if(arb.id == sa.id && arb.di == sb.id) {
							ret = arb;
							break;
						}
						cx_ite = cx_ite.next;
					}
					xarb = ret;
				} else {
					xarb = in_arb;
				}
				let first = xarb == null;
				let arb;
				let swapped = false;
				if(first) {
					if(ZPP_SensorArbiter.zpp_pool == null) {
						arb = new ZPP_SensorArbiter();
					} else {
						arb = ZPP_SensorArbiter.zpp_pool;
						ZPP_SensorArbiter.zpp_pool = arb.next;
						arb.next = null;
					}
				} else if(xarb.sensorarb == null) {
					let b = null;
					xarb.cleared = true;
					if(b == null || xarb.b2 == b) {
						let _this = xarb.b1.arbiters;
						let pre = null;
						let cur = _this.head;
						let ret = false;
						while(cur != null) {
							if(cur.elt == xarb) {
								let old;
								let ret1;
								if(pre == null) {
									old = _this.head;
									ret1 = old.next;
									_this.head = ret1;
									if(_this.head == null) {
										_this.pushmod = true;
									}
								} else {
									old = pre.next;
									ret1 = old.next;
									pre.next = ret1;
									if(ret1 == null) {
										_this.pushmod = true;
									}
								}
								let o = old;
								o.elt = null;
								o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
								ZNPNode_ZPP_Arbiter.zpp_pool = o;
								_this.modified = true;
								_this.length--;
								_this.pushmod = true;
								ret = true;
								break;
							}
							pre = cur;
							cur = cur.next;
						}
					}
					if(b == null || xarb.b1 == b) {
						let _this = xarb.b2.arbiters;
						let pre = null;
						let cur = _this.head;
						let ret = false;
						while(cur != null) {
							if(cur.elt == xarb) {
								let old;
								let ret1;
								if(pre == null) {
									old = _this.head;
									ret1 = old.next;
									_this.head = ret1;
									if(_this.head == null) {
										_this.pushmod = true;
									}
								} else {
									old = pre.next;
									ret1 = old.next;
									pre.next = ret1;
									if(ret1 == null) {
										_this.pushmod = true;
									}
								}
								let o = old;
								o.elt = null;
								o.next = ZNPNode_ZPP_Arbiter.zpp_pool;
								ZNPNode_ZPP_Arbiter.zpp_pool = o;
								_this.modified = true;
								_this.length--;
								_this.pushmod = true;
								ret = true;
								break;
							}
							pre = cur;
							cur = cur.next;
						}
					}
					if(xarb.pair != null) {
						xarb.pair.arb = null;
						xarb.pair = null;
					}
					xarb.active = false;
					this.f_arbiters.modified = true;
					if(ZPP_SensorArbiter.zpp_pool == null) {
						arb = new ZPP_SensorArbiter();
					} else {
						arb = ZPP_SensorArbiter.zpp_pool;
						ZPP_SensorArbiter.zpp_pool = arb.next;
						arb.next = null;
					}
					arb.intchange = true;
					first = true;
					swapped = true;
				} else {
					arb = xarb.sensorarb;
				}
				let inttype = ZPP_Flags.id_InteractionType_SENSOR;
				if(first || arb.stamp != this.stamp || continuous) {
					arb.stamp = this.stamp;
					if(ZPP_Collide.testCollide(sa,sb)) {
						if(first) {
							let di = sb.id;
							arb.b1 = s1.body;
							arb.ws1 = s1;
							arb.b2 = s2.body;
							arb.ws2 = s2;
							arb.id = sa.id;
							arb.di = di;
							let _this = arb.b1.arbiters;
							let ret;
							if(ZNPNode_ZPP_Arbiter.zpp_pool == null) {
								ret = new ZNPNode_ZPP_Arbiter();
							} else {
								ret = ZNPNode_ZPP_Arbiter.zpp_pool;
								ZNPNode_ZPP_Arbiter.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.elt = arb;
							let temp = ret;
							temp.next = _this.head;
							_this.head = temp;
							_this.modified = true;
							_this.length++;
							let _this1 = arb.b2.arbiters;
							let ret1;
							if(ZNPNode_ZPP_Arbiter.zpp_pool == null) {
								ret1 = new ZNPNode_ZPP_Arbiter();
							} else {
								ret1 = ZNPNode_ZPP_Arbiter.zpp_pool;
								ZNPNode_ZPP_Arbiter.zpp_pool = ret1.next;
								ret1.next = null;
							}
							ret1.elt = arb;
							let temp1 = ret1;
							temp1.next = _this1.head;
							_this1.head = temp1;
							_this1.modified = true;
							_this1.length++;
							arb.active = true;
							arb.present = 0;
							arb.cleared = false;
							arb.sleeping = false;
							arb.fresh = false;
							arb.presentable = false;
							let _this2 = this.s_arbiters;
							let ret2;
							if(ZNPNode_ZPP_SensorArbiter.zpp_pool == null) {
								ret2 = new ZNPNode_ZPP_SensorArbiter();
							} else {
								ret2 = ZNPNode_ZPP_SensorArbiter.zpp_pool;
								ZNPNode_ZPP_SensorArbiter.zpp_pool = ret2.next;
								ret2.next = null;
							}
							ret2.elt = arb;
							let temp2 = ret2;
							temp2.next = _this2.head;
							_this2.head = temp2;
							_this2.modified = true;
							_this2.length++;
							arb.fresh = !swapped;
						} else {
							arb.fresh = arb.up_stamp < this.stamp - 1 || arb.endGenerated == this.stamp && continuous;
						}
						arb.up_stamp = arb.stamp;
						if(arb.fresh || (arb.immState & ZPP_Flags.id_ImmState_ALWAYS) == 0) {
							arb.immState = ZPP_Flags.id_ImmState_ACCEPT;
							let anyimpure = false;
							let arbs1 = arb.ws1.id > arb.ws2.id ? arb.ws2 : arb.ws1;
							let arbs2 = arb.ws1.id > arb.ws2.id ? arb.ws1 : arb.ws2;
							let _this = this.mrca1;
							while(_this.head != null) {
								let ret = _this.head;
								_this.head = ret.next;
								let o = ret;
								o.elt = null;
								o.next = ZNPNode_ZPP_Interactor.zpp_pool;
								ZNPNode_ZPP_Interactor.zpp_pool = o;
								if(_this.head == null) {
									_this.pushmod = true;
								}
								_this.modified = true;
								_this.length--;
							}
							_this.pushmod = true;
							let _this1 = this.mrca2;
							while(_this1.head != null) {
								let ret = _this1.head;
								_this1.head = ret.next;
								let o = ret;
								o.elt = null;
								o.next = ZNPNode_ZPP_Interactor.zpp_pool;
								ZNPNode_ZPP_Interactor.zpp_pool = o;
								if(_this1.head == null) {
									_this1.pushmod = true;
								}
								_this1.modified = true;
								_this1.length--;
							}
							_this1.pushmod = true;
							if(arbs1.cbSet != null) {
								let _this = this.mrca1;
								let ret;
								if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
									ret = new ZNPNode_ZPP_Interactor();
								} else {
									ret = ZNPNode_ZPP_Interactor.zpp_pool;
									ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.elt = arbs1;
								let temp = ret;
								temp.next = _this.head;
								_this.head = temp;
								_this.modified = true;
								_this.length++;
							}
							if(arbs1.body.cbSet != null) {
								let _this = this.mrca1;
								let o = arbs1.body;
								let ret;
								if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
									ret = new ZNPNode_ZPP_Interactor();
								} else {
									ret = ZNPNode_ZPP_Interactor.zpp_pool;
									ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.elt = o;
								let temp = ret;
								temp.next = _this.head;
								_this.head = temp;
								_this.modified = true;
								_this.length++;
							}
							if(arbs2.cbSet != null) {
								let _this = this.mrca2;
								let ret;
								if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
									ret = new ZNPNode_ZPP_Interactor();
								} else {
									ret = ZNPNode_ZPP_Interactor.zpp_pool;
									ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.elt = arbs2;
								let temp = ret;
								temp.next = _this.head;
								_this.head = temp;
								_this.modified = true;
								_this.length++;
							}
							if(arbs2.body.cbSet != null) {
								let _this = this.mrca2;
								let o = arbs2.body;
								let ret;
								if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
									ret = new ZNPNode_ZPP_Interactor();
								} else {
									ret = ZNPNode_ZPP_Interactor.zpp_pool;
									ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
									ret.next = null;
								}
								ret.elt = o;
								let temp = ret;
								temp.next = _this.head;
								_this.head = temp;
								_this.modified = true;
								_this.length++;
							}
							let c1 = arbs1.body.compound;
							let c2 = arbs2.body.compound;
							while(c1 != c2) {
								let d1 = c1 == null ? 0 : c1.depth;
								let d2 = c2 == null ? 0 : c2.depth;
								if(d1 < d2) {
									if(c2.cbSet != null) {
										let _this = this.mrca2;
										let ret;
										if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
											ret = new ZNPNode_ZPP_Interactor();
										} else {
											ret = ZNPNode_ZPP_Interactor.zpp_pool;
											ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.elt = c2;
										let temp = ret;
										temp.next = _this.head;
										_this.head = temp;
										_this.modified = true;
										_this.length++;
									}
									c2 = c2.compound;
								} else {
									if(c1.cbSet != null) {
										let _this = this.mrca1;
										let ret;
										if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
											ret = new ZNPNode_ZPP_Interactor();
										} else {
											ret = ZNPNode_ZPP_Interactor.zpp_pool;
											ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.elt = c1;
										let temp = ret;
										temp.next = _this.head;
										_this.head = temp;
										_this.modified = true;
										_this.length++;
									}
									c1 = c1.compound;
								}
							}
							let cx_ite = this.mrca1.head;
							while(cx_ite != null) {
								let i1 = cx_ite.elt;
								let cx_ite1 = this.mrca2.head;
								while(cx_ite1 != null) {
									let i2 = cx_ite1.elt;
									let cb1 = i1.cbSet;
									let cb2 = i2.cbSet;
									let _this = cb1.manager;
									let ret = null;
									let pairs = cb1.cbpairs.length < cb2.cbpairs.length ? cb1.cbpairs : cb2.cbpairs;
									let cx_ite = pairs.head;
									while(cx_ite != null) {
										let p = cx_ite.elt;
										if(p.a == cb1 && p.b == cb2 || p.a == cb2 && p.b == cb1) {
											ret = p;
											break;
										}
										cx_ite = cx_ite.next;
									}
									if(ret == null) {
										let ret1;
										if(ZPP_CbSetPair.zpp_pool == null) {
											ret1 = new ZPP_CbSetPair();
										} else {
											ret1 = ZPP_CbSetPair.zpp_pool;
											ZPP_CbSetPair.zpp_pool = ret1.next;
											ret1.next = null;
										}
										ret1.zip_listeners = true;
										if(ZPP_CbSet.setlt(cb1,cb2)) {
											ret1.a = cb1;
											ret1.b = cb2;
										} else {
											ret1.a = cb2;
											ret1.b = cb1;
										}
										ret = ret1;
										cb1.cbpairs.add(ret);
										if(cb2 != cb1) {
											cb2.cbpairs.add(ret);
										}
									}
									if(ret.zip_listeners) {
										ret.zip_listeners = false;
										ret.__validate();
									}
									if(ret.listeners.head == null) {
										cx_ite1 = cx_ite1.next;
										continue;
									}
									let callbackset = null;
									let ncallbackset = null;
									let _this1 = this.prelisteners;
									while(_this1.head != null) {
										let ret = _this1.head;
										_this1.head = ret.next;
										let o = ret;
										o.elt = null;
										o.next = ZNPNode_ZPP_InteractionListener.zpp_pool;
										ZNPNode_ZPP_InteractionListener.zpp_pool = o;
										if(_this1.head == null) {
											_this1.pushmod = true;
										}
										_this1.modified = true;
										_this1.length--;
									}
									_this1.pushmod = true;
									let lite = null;
									let event = ZPP_Flags.id_CbEvent_PRE;
									let _this2 = cb1.manager;
									let ret1 = null;
									let pairs1 = cb1.cbpairs.length < cb2.cbpairs.length ? cb1.cbpairs : cb2.cbpairs;
									let cx_ite2 = pairs1.head;
									while(cx_ite2 != null) {
										let p = cx_ite2.elt;
										if(p.a == cb1 && p.b == cb2 || p.a == cb2 && p.b == cb1) {
											ret1 = p;
											break;
										}
										cx_ite2 = cx_ite2.next;
									}
									if(ret1 == null) {
										let ret;
										if(ZPP_CbSetPair.zpp_pool == null) {
											ret = new ZPP_CbSetPair();
										} else {
											ret = ZPP_CbSetPair.zpp_pool;
											ZPP_CbSetPair.zpp_pool = ret.next;
											ret.next = null;
										}
										ret.zip_listeners = true;
										if(ZPP_CbSet.setlt(cb1,cb2)) {
											ret.a = cb1;
											ret.b = cb2;
										} else {
											ret.a = cb2;
											ret.b = cb1;
										}
										ret1 = ret;
										cb1.cbpairs.add(ret1);
										if(cb2 != cb1) {
											cb2.cbpairs.add(ret1);
										}
									}
									if(ret1.zip_listeners) {
										ret1.zip_listeners = false;
										ret1.__validate();
									}
									let cx_ite3 = ret1.listeners.head;
									while(cx_ite3 != null) {
										let x = cx_ite3.elt;
										if(x.event == event) {
											if((x.itype & inttype) != 0) {
												let _this = _gthis.prelisteners;
												let ret;
												if(ZNPNode_ZPP_InteractionListener.zpp_pool == null) {
													ret = new ZNPNode_ZPP_InteractionListener();
												} else {
													ret = ZNPNode_ZPP_InteractionListener.zpp_pool;
													ZNPNode_ZPP_InteractionListener.zpp_pool = ret.next;
													ret.next = null;
												}
												ret.elt = x;
												let temp = ret;
												if(lite == null) {
													temp.next = _this.head;
													_this.head = temp;
												} else {
													temp.next = lite.next;
													lite.next = temp;
												}
												_this.pushmod = _this.modified = true;
												_this.length++;
												lite = temp;
												anyimpure = anyimpure || !x.pure;
											}
										}
										cx_ite3 = cx_ite3.next;
									}
									if(this.prelisteners.head == null) {
										cx_ite1 = cx_ite1.next;
										continue;
									}
									callbackset = ZPP_Interactor.get(i1,i2);
									if(callbackset == null) {
										ncallbackset = ZPP_CallbackSet.get(i1,i2);
										this.add_callbackset(ncallbackset);
									}
									if(callbackset == null || (callbackset.SENSORstamp != this.stamp || continuous) && (callbackset.SENSORstate & ZPP_Flags.id_ImmState_ALWAYS) == 0) {
										if(ncallbackset != null) {
											callbackset = ncallbackset;
										}
										if(callbackset != null) {
											let cx_ite = this.prelisteners.head;
											while(cx_ite != null) {
												let listener = cx_ite.elt;
												if(listener.itype == ZPP_Flags.id_InteractionType_ANY) {
													callbackset.COLLISIONstamp = this.stamp;
													callbackset.SENSORstamp = this.stamp;
													callbackset.FLUIDstamp = this.stamp;
												} else {
													callbackset.SENSORstamp = this.stamp;
												}
												cx_ite = cx_ite.next;
											}
										}
										let pact = arb.active;
										arb.active = true;
										let emptycontacts = false;
										this.precb.zpp_inner.pre_arbiter = arb;
										this.precb.zpp_inner.set = callbackset;
										let cx_ite = this.prelisteners.head;
										while(cx_ite != null) {
											let listener = cx_ite.elt;
											this.precb.zpp_inner.listener = listener;
											let cb = this.precb.zpp_inner;
											let o1 = callbackset.int1;
											let o2 = callbackset.int2;
											let ret;
											let _this = listener.options1;
											let xs = o1.cbTypes;
											if(_this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes)) {
												let _this = listener.options2;
												let xs = o2.cbTypes;
												ret = _this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes);
											} else {
												ret = false;
											}
											if(ret) {
												cb.int1 = o1;
												cb.int2 = o2;
											} else {
												cb.int1 = o2;
												cb.int2 = o1;
											}
											this.precb.zpp_inner.pre_swapped = i1 != this.precb.zpp_inner.int1;
											let ret1 = listener.handlerp(this.precb);
											if(ret1 != null) {
												let ret;
												if(ZPP_Flags.PreFlag_ACCEPT == null) {
													ZPP_Flags.internal = true;
													ZPP_Flags.PreFlag_ACCEPT = new PreFlag();
													ZPP_Flags.internal = false;
												}
												if(ret1 == ZPP_Flags.PreFlag_ACCEPT) {
													ret = ZPP_Flags.id_ImmState_ACCEPT | ZPP_Flags.id_ImmState_ALWAYS;
												} else {
													if(ZPP_Flags.PreFlag_ACCEPT_ONCE == null) {
														ZPP_Flags.internal = true;
														ZPP_Flags.PreFlag_ACCEPT_ONCE = new PreFlag();
														ZPP_Flags.internal = false;
													}
													if(ret1 == ZPP_Flags.PreFlag_ACCEPT_ONCE) {
														ret = ZPP_Flags.id_ImmState_ACCEPT;
													} else {
														if(ZPP_Flags.PreFlag_IGNORE == null) {
															ZPP_Flags.internal = true;
															ZPP_Flags.PreFlag_IGNORE = new PreFlag();
															ZPP_Flags.internal = false;
														}
														ret = ret1 == ZPP_Flags.PreFlag_IGNORE ? ZPP_Flags.id_ImmState_IGNORE | ZPP_Flags.id_ImmState_ALWAYS : ZPP_Flags.id_ImmState_IGNORE;
													}
												}
												arb.immState = ret;
											}
											cx_ite = cx_ite.next;
										}
										arb.active = pact;
										if(callbackset != null) {
											let cx_ite = this.prelisteners.head;
											while(cx_ite != null) {
												let listener = cx_ite.elt;
												if(listener.itype == ZPP_Flags.id_InteractionType_ANY) {
													callbackset.COLLISIONstate = arb.immState;
													callbackset.SENSORstate = arb.immState;
													callbackset.FLUIDstate = arb.immState;
												} else {
													callbackset.SENSORstate = arb.immState;
												}
												cx_ite = cx_ite.next;
											}
										}
									} else if(callbackset == null) {
										if((arb.immState & ZPP_Flags.id_ImmState_ALWAYS) == 0) {
											arb.immState = ZPP_Flags.id_ImmState_ACCEPT;
										}
									} else {
										arb.immState = callbackset.SENSORstate;
									}
									cx_ite1 = cx_ite1.next;
								}
								cx_ite = cx_ite.next;
							}
							if(anyimpure && (arb.immState & ZPP_Flags.id_ImmState_ALWAYS) == 0) {
								if(arb.b1.type != ZPP_Flags.id_BodyType_STATIC) {
									let o = arb.b1;
									if(!o.world) {
										o.component.waket = this.stamp + (this.midstep ? 0 : 1);
										if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
											o.kinematicDelaySleep = true;
										}
										if(o.component.sleeping) {
											this.really_wake(o,false);
										}
									}
								}
								if(arb.b2.type != ZPP_Flags.id_BodyType_STATIC) {
									let o = arb.b2;
									if(!o.world) {
										o.component.waket = this.stamp + (this.midstep ? 0 : 1);
										if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
											o.kinematicDelaySleep = true;
										}
										if(o.component.sleeping) {
											this.really_wake(o,false);
										}
									}
								}
							}
						}
						if(arb.sleeping) {
							arb.sleeping = false;
							let _this = this.s_arbiters;
							let ret;
							if(ZNPNode_ZPP_SensorArbiter.zpp_pool == null) {
								ret = new ZNPNode_ZPP_SensorArbiter();
							} else {
								ret = ZNPNode_ZPP_SensorArbiter.zpp_pool;
								ZNPNode_ZPP_SensorArbiter.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.elt = arb;
							let temp = ret;
							temp.next = _this.head;
							_this.head = temp;
							_this.modified = true;
							_this.length++;
						}
						ret = arb;
					} else if(first) {
						let o = arb;
						o.next = ZPP_SensorArbiter.zpp_pool;
						ZPP_SensorArbiter.zpp_pool = o;
						ret = null;
					} else {
						ret = arb;
					}
				} else {
					ret = arb;
				}
			}
		}
		return ret;
	}
	MRCA_chains(s1,s2) {
		let _this = this.mrca1;
		while(_this.head != null) {
			let ret = _this.head;
			_this.head = ret.next;
			let o = ret;
			o.elt = null;
			o.next = ZNPNode_ZPP_Interactor.zpp_pool;
			ZNPNode_ZPP_Interactor.zpp_pool = o;
			if(_this.head == null) {
				_this.pushmod = true;
			}
			_this.modified = true;
			_this.length--;
		}
		_this.pushmod = true;
		let _this1 = this.mrca2;
		while(_this1.head != null) {
			let ret = _this1.head;
			_this1.head = ret.next;
			let o = ret;
			o.elt = null;
			o.next = ZNPNode_ZPP_Interactor.zpp_pool;
			ZNPNode_ZPP_Interactor.zpp_pool = o;
			if(_this1.head == null) {
				_this1.pushmod = true;
			}
			_this1.modified = true;
			_this1.length--;
		}
		_this1.pushmod = true;
		if(s1.cbSet != null) {
			let _this = this.mrca1;
			let ret;
			if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
				ret = new ZNPNode_ZPP_Interactor();
			} else {
				ret = ZNPNode_ZPP_Interactor.zpp_pool;
				ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = s1;
			let temp = ret;
			temp.next = _this.head;
			_this.head = temp;
			_this.modified = true;
			_this.length++;
		}
		if(s1.body.cbSet != null) {
			let _this = this.mrca1;
			let o = s1.body;
			let ret;
			if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
				ret = new ZNPNode_ZPP_Interactor();
			} else {
				ret = ZNPNode_ZPP_Interactor.zpp_pool;
				ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = o;
			let temp = ret;
			temp.next = _this.head;
			_this.head = temp;
			_this.modified = true;
			_this.length++;
		}
		if(s2.cbSet != null) {
			let _this = this.mrca2;
			let ret;
			if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
				ret = new ZNPNode_ZPP_Interactor();
			} else {
				ret = ZNPNode_ZPP_Interactor.zpp_pool;
				ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = s2;
			let temp = ret;
			temp.next = _this.head;
			_this.head = temp;
			_this.modified = true;
			_this.length++;
		}
		if(s2.body.cbSet != null) {
			let _this = this.mrca2;
			let o = s2.body;
			let ret;
			if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
				ret = new ZNPNode_ZPP_Interactor();
			} else {
				ret = ZNPNode_ZPP_Interactor.zpp_pool;
				ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = o;
			let temp = ret;
			temp.next = _this.head;
			_this.head = temp;
			_this.modified = true;
			_this.length++;
		}
		let c1 = s1.body.compound;
		let c2 = s2.body.compound;
		while(c1 != c2) {
			let d1 = c1 == null ? 0 : c1.depth;
			let d2 = c2 == null ? 0 : c2.depth;
			if(d1 < d2) {
				if(c2.cbSet != null) {
					let _this = this.mrca2;
					let ret;
					if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
						ret = new ZNPNode_ZPP_Interactor();
					} else {
						ret = ZNPNode_ZPP_Interactor.zpp_pool;
						ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = c2;
					let temp = ret;
					temp.next = _this.head;
					_this.head = temp;
					_this.modified = true;
					_this.length++;
				}
				c2 = c2.compound;
			} else {
				if(c1.cbSet != null) {
					let _this = this.mrca1;
					let ret;
					if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
						ret = new ZNPNode_ZPP_Interactor();
					} else {
						ret = ZNPNode_ZPP_Interactor.zpp_pool;
						ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = c1;
					let temp = ret;
					temp.next = _this.head;
					_this.head = temp;
					_this.modified = true;
					_this.length++;
				}
				c1 = c1.compound;
			}
		}
	}
	inlined_MRCA_chains(s1,s2) {
		let _this = this.mrca1;
		while(_this.head != null) {
			let ret = _this.head;
			_this.head = ret.next;
			let o = ret;
			o.elt = null;
			o.next = ZNPNode_ZPP_Interactor.zpp_pool;
			ZNPNode_ZPP_Interactor.zpp_pool = o;
			if(_this.head == null) {
				_this.pushmod = true;
			}
			_this.modified = true;
			_this.length--;
		}
		_this.pushmod = true;
		let _this1 = this.mrca2;
		while(_this1.head != null) {
			let ret = _this1.head;
			_this1.head = ret.next;
			let o = ret;
			o.elt = null;
			o.next = ZNPNode_ZPP_Interactor.zpp_pool;
			ZNPNode_ZPP_Interactor.zpp_pool = o;
			if(_this1.head == null) {
				_this1.pushmod = true;
			}
			_this1.modified = true;
			_this1.length--;
		}
		_this1.pushmod = true;
		if(s1.cbSet != null) {
			let _this = this.mrca1;
			let ret;
			if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
				ret = new ZNPNode_ZPP_Interactor();
			} else {
				ret = ZNPNode_ZPP_Interactor.zpp_pool;
				ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = s1;
			let temp = ret;
			temp.next = _this.head;
			_this.head = temp;
			_this.modified = true;
			_this.length++;
		}
		if(s1.body.cbSet != null) {
			let _this = this.mrca1;
			let o = s1.body;
			let ret;
			if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
				ret = new ZNPNode_ZPP_Interactor();
			} else {
				ret = ZNPNode_ZPP_Interactor.zpp_pool;
				ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = o;
			let temp = ret;
			temp.next = _this.head;
			_this.head = temp;
			_this.modified = true;
			_this.length++;
		}
		if(s2.cbSet != null) {
			let _this = this.mrca2;
			let ret;
			if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
				ret = new ZNPNode_ZPP_Interactor();
			} else {
				ret = ZNPNode_ZPP_Interactor.zpp_pool;
				ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = s2;
			let temp = ret;
			temp.next = _this.head;
			_this.head = temp;
			_this.modified = true;
			_this.length++;
		}
		if(s2.body.cbSet != null) {
			let _this = this.mrca2;
			let o = s2.body;
			let ret;
			if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
				ret = new ZNPNode_ZPP_Interactor();
			} else {
				ret = ZNPNode_ZPP_Interactor.zpp_pool;
				ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = o;
			let temp = ret;
			temp.next = _this.head;
			_this.head = temp;
			_this.modified = true;
			_this.length++;
		}
		let c1 = s1.body.compound;
		let c2 = s2.body.compound;
		while(c1 != c2) {
			let d1 = c1 == null ? 0 : c1.depth;
			let d2 = c2 == null ? 0 : c2.depth;
			if(d1 < d2) {
				if(c2.cbSet != null) {
					let _this = this.mrca2;
					let ret;
					if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
						ret = new ZNPNode_ZPP_Interactor();
					} else {
						ret = ZNPNode_ZPP_Interactor.zpp_pool;
						ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = c2;
					let temp = ret;
					temp.next = _this.head;
					_this.head = temp;
					_this.modified = true;
					_this.length++;
				}
				c2 = c2.compound;
			} else {
				if(c1.cbSet != null) {
					let _this = this.mrca1;
					let ret;
					if(ZNPNode_ZPP_Interactor.zpp_pool == null) {
						ret = new ZNPNode_ZPP_Interactor();
					} else {
						ret = ZNPNode_ZPP_Interactor.zpp_pool;
						ZNPNode_ZPP_Interactor.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = c1;
					let temp = ret;
					temp.next = _this.head;
					_this.head = temp;
					_this.modified = true;
					_this.length++;
				}
				c1 = c1.compound;
			}
		}
	}
}
