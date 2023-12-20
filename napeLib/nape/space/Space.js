import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZPP_Space from '../../zpp_nape/space/ZPP_Space.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import ZPP_SpaceArbiterList from '../../zpp_nape/dynamics/ZPP_SpaceArbiterList.js';
import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
import Broadphase from './Broadphase.js';
import ValidationResult from '../shape/ValidationResult.js';
import ShapeList from '../shape/ShapeList.js';
import ShapeIterator from '../shape/ShapeIterator.js';
import CompoundIterator from '../phys/CompoundIterator.js';
import BodyList from '../phys/BodyList.js';
import BodyIterator from '../phys/BodyIterator.js';
import ConstraintIterator from '../constraint/ConstraintIterator.js';
import InteractionType from '../callbacks/InteractionType.js';
export default class Space {
	constructor(gravity,broadphase) {
		this.userData = { };
		this.zpp_inner = null;
		if(gravity != null && gravity.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		this.zpp_inner = new ZPP_Space(gravity == null ? null : gravity.zpp_inner,broadphase);
		this.zpp_inner.outer = this;
		if(gravity != null) {
			if(gravity.zpp_inner.weak) {
				if(gravity != null && gravity.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = gravity.zpp_inner;
				if(_this._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this._isimmutable != null) {
					_this._isimmutable();
				}
				if(gravity.zpp_inner._inuse) {
					throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
				}
				let inner = gravity.zpp_inner;
				gravity.zpp_inner.outer = null;
				gravity.zpp_inner = null;
				let o = gravity;
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
		}
	}
	get_userData() {
		return this.userData;
	}
	get_gravity() {
		if(this.zpp_inner.wrap_gravity == null) {
			this.zpp_inner.getgravity();
		}
		return this.zpp_inner.wrap_gravity;
	}
	set_gravity(gravity) {
		if(gravity != null && gravity.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(gravity == null) {
			throw haxe_Exception.thrown("Error: Space::gravity cannot be null");
		}
		if(this.zpp_inner.wrap_gravity == null) {
			this.zpp_inner.getgravity();
		}
		let _this = this.zpp_inner.wrap_gravity;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(gravity != null && gravity.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = _this.zpp_inner;
		if(_this1._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this1._isimmutable != null) {
			_this1._isimmutable();
		}
		if(gravity == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
		}
		if(gravity != null && gravity.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = gravity.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let x = gravity.zpp_inner.x;
		if(gravity != null && gravity.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = gravity.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let y = gravity.zpp_inner.y;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = _this.zpp_inner;
		if(_this4._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this4._isimmutable != null) {
			_this4._isimmutable();
		}
		if(x != x || y != y) {
			throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
		}
		let tmp;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this5 = _this.zpp_inner;
		if(_this5._validate != null) {
			_this5._validate();
		}
		if(_this.zpp_inner.x == x) {
			if(_this != null && _this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = _this.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			tmp = _this.zpp_inner.y == y;
		} else {
			tmp = false;
		}
		if(!tmp) {
			_this.zpp_inner.x = x;
			_this.zpp_inner.y = y;
			let _this1 = _this.zpp_inner;
			if(_this1._invalidate != null) {
				_this1._invalidate(_this1);
			}
		}
		let ret = _this;
		if(gravity.zpp_inner.weak) {
			if(gravity != null && gravity.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = gravity.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(gravity.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = gravity.zpp_inner;
			gravity.zpp_inner.outer = null;
			gravity.zpp_inner = null;
			let o = gravity;
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
		if(this.zpp_inner.wrap_gravity == null) {
			this.zpp_inner.getgravity();
		}
		return this.zpp_inner.wrap_gravity;
	}
	get_broadphase() {
		if(this.zpp_inner.bphase.is_sweep) {
			if(ZPP_Flags.Broadphase_SWEEP_AND_PRUNE == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.Broadphase_SWEEP_AND_PRUNE = new Broadphase();
				ZPP_Flags.internal = false;
			}
			return ZPP_Flags.Broadphase_SWEEP_AND_PRUNE;
		} else {
			if(ZPP_Flags.Broadphase_DYNAMIC_AABB_TREE == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.Broadphase_DYNAMIC_AABB_TREE = new Broadphase();
				ZPP_Flags.internal = false;
			}
			return ZPP_Flags.Broadphase_DYNAMIC_AABB_TREE;
		}
	}
	get_sortContacts() {
		return this.zpp_inner.sortcontacts;
	}
	set_sortContacts(sortContacts) {
		this.zpp_inner.sortcontacts = sortContacts;
		return this.zpp_inner.sortcontacts;
	}
	get_worldAngularDrag() {
		return this.zpp_inner.global_ang_drag;
	}
	set_worldAngularDrag(worldAngularDrag) {
		let d = worldAngularDrag;
		if(d != d) {
			throw haxe_Exception.thrown("Error: Space::worldAngularDrag cannot be NaN");
		}
		this.zpp_inner.global_ang_drag = d;
		return this.zpp_inner.global_ang_drag;
	}
	get_worldLinearDrag() {
		return this.zpp_inner.global_lin_drag;
	}
	set_worldLinearDrag(worldLinearDrag) {
		let d = worldLinearDrag;
		if(d != d) {
			throw haxe_Exception.thrown("Error: Space::worldLinearDrag cannot be NaN");
		}
		this.zpp_inner.global_lin_drag = d;
		return this.zpp_inner.global_lin_drag;
	}
	get_compounds() {
		return this.zpp_inner.wrap_compounds;
	}
	get_bodies() {
		return this.zpp_inner.wrap_bodies;
	}
	get_liveBodies() {
		return this.zpp_inner.wrap_live;
	}
	get_constraints() {
		return this.zpp_inner.wrap_constraints;
	}
	get_liveConstraints() {
		return this.zpp_inner.wrap_livecon;
	}
	visitBodies(lambda) {
		if(lambda == null) {
			throw haxe_Exception.thrown("Error: lambda cannot be null for Space::visitBodies");
		}
		let _this = this.zpp_inner.wrap_bodies;
		_this.zpp_inner.valmod();
		let it = BodyIterator.get(_this);
		while(true) {
			it.zpp_inner.zpp_inner.valmod();
			let _this = it.zpp_inner;
			_this.zpp_inner.valmod();
			if(_this.zpp_inner.zip_length) {
				_this.zpp_inner.zip_length = false;
				_this.zpp_inner.user_length = _this.zpp_inner.inner.length;
			}
			let length = _this.zpp_inner.user_length;
			it.zpp_critical = true;
			let tmp;
			if(it.zpp_i < length) {
				tmp = true;
			} else {
				it.zpp_next = BodyIterator.zpp_pool;
				BodyIterator.zpp_pool = it;
				it.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			try {
				it.zpp_critical = false;
				lambda(it.zpp_inner.at(it.zpp_i++));
			} catch( _g ) {
				haxe_NativeStackTrace.lastError = _g;
				it.zpp_next = BodyIterator.zpp_pool;
				BodyIterator.zpp_pool = it;
				it.zpp_inner = null;
				break;
			}
		}
		let _this1 = this.zpp_inner.wrap_compounds;
		_this1.zpp_inner.valmod();
		let it1 = CompoundIterator.get(_this1);
		while(true) {
			it1.zpp_inner.zpp_inner.valmod();
			let _this = it1.zpp_inner;
			_this.zpp_inner.valmod();
			if(_this.zpp_inner.zip_length) {
				_this.zpp_inner.zip_length = false;
				_this.zpp_inner.user_length = _this.zpp_inner.inner.length;
			}
			let length = _this.zpp_inner.user_length;
			it1.zpp_critical = true;
			let tmp;
			if(it1.zpp_i < length) {
				tmp = true;
			} else {
				it1.zpp_next = CompoundIterator.zpp_pool;
				CompoundIterator.zpp_pool = it1;
				it1.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			try {
				it1.zpp_critical = false;
				it1.zpp_inner.at(it1.zpp_i++).visitBodies(lambda);
			} catch( _g ) {
				haxe_NativeStackTrace.lastError = _g;
				it1.zpp_next = CompoundIterator.zpp_pool;
				CompoundIterator.zpp_pool = it1;
				it1.zpp_inner = null;
				break;
			}
		}
	}
	visitConstraints(lambda) {
		if(lambda == null) {
			throw haxe_Exception.thrown("Error: lambda cannot be null for Space::visitConstraints");
		}
		let _this = this.zpp_inner.wrap_constraints;
		_this.zpp_inner.valmod();
		let it = ConstraintIterator.get(_this);
		while(true) {
			it.zpp_inner.zpp_inner.valmod();
			let _this = it.zpp_inner;
			_this.zpp_inner.valmod();
			if(_this.zpp_inner.zip_length) {
				_this.zpp_inner.zip_length = false;
				_this.zpp_inner.user_length = _this.zpp_inner.inner.length;
			}
			let length = _this.zpp_inner.user_length;
			it.zpp_critical = true;
			let tmp;
			if(it.zpp_i < length) {
				tmp = true;
			} else {
				it.zpp_next = ConstraintIterator.zpp_pool;
				ConstraintIterator.zpp_pool = it;
				it.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			try {
				it.zpp_critical = false;
				lambda(it.zpp_inner.at(it.zpp_i++));
			} catch( _g ) {
				haxe_NativeStackTrace.lastError = _g;
				it.zpp_next = ConstraintIterator.zpp_pool;
				ConstraintIterator.zpp_pool = it;
				it.zpp_inner = null;
				break;
			}
		}
		let _this1 = this.zpp_inner.wrap_compounds;
		_this1.zpp_inner.valmod();
		let it1 = CompoundIterator.get(_this1);
		while(true) {
			it1.zpp_inner.zpp_inner.valmod();
			let _this = it1.zpp_inner;
			_this.zpp_inner.valmod();
			if(_this.zpp_inner.zip_length) {
				_this.zpp_inner.zip_length = false;
				_this.zpp_inner.user_length = _this.zpp_inner.inner.length;
			}
			let length = _this.zpp_inner.user_length;
			it1.zpp_critical = true;
			let tmp;
			if(it1.zpp_i < length) {
				tmp = true;
			} else {
				it1.zpp_next = CompoundIterator.zpp_pool;
				CompoundIterator.zpp_pool = it1;
				it1.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			try {
				it1.zpp_critical = false;
				it1.zpp_inner.at(it1.zpp_i++).visitConstraints(lambda);
			} catch( _g ) {
				haxe_NativeStackTrace.lastError = _g;
				it1.zpp_next = CompoundIterator.zpp_pool;
				CompoundIterator.zpp_pool = it1;
				it1.zpp_inner = null;
				break;
			}
		}
	}
	visitCompounds(lambda) {
		if(lambda == null) {
			throw haxe_Exception.thrown("Error: lambda cannot be null for Space::visitCompounds");
		}
		let _this = this.zpp_inner.wrap_compounds;
		_this.zpp_inner.valmod();
		let it = CompoundIterator.get(_this);
		while(true) {
			it.zpp_inner.zpp_inner.valmod();
			let _this = it.zpp_inner;
			_this.zpp_inner.valmod();
			if(_this.zpp_inner.zip_length) {
				_this.zpp_inner.zip_length = false;
				_this.zpp_inner.user_length = _this.zpp_inner.inner.length;
			}
			let length = _this.zpp_inner.user_length;
			it.zpp_critical = true;
			let tmp;
			if(it.zpp_i < length) {
				tmp = true;
			} else {
				it.zpp_next = CompoundIterator.zpp_pool;
				CompoundIterator.zpp_pool = it;
				it.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			try {
				it.zpp_critical = false;
				let c = it.zpp_inner.at(it.zpp_i++);
				lambda(c);
				c.visitCompounds(lambda);
			} catch( _g ) {
				haxe_NativeStackTrace.lastError = _g;
				it.zpp_next = CompoundIterator.zpp_pool;
				CompoundIterator.zpp_pool = it;
				it.zpp_inner = null;
				break;
			}
		}
	}
	get_world() {
		return this.zpp_inner.__static;
	}
	get_arbiters() {
		if(this.zpp_inner.wrap_arbiters == null) {
			let ret = new ZPP_SpaceArbiterList();
			ret.space = this.zpp_inner;
			this.zpp_inner.wrap_arbiters = ret;
		}
		return this.zpp_inner.wrap_arbiters;
	}
	get_listeners() {
		return this.zpp_inner.wrap_listeners;
	}
	clear() {
		if(this.zpp_inner.midstep) {
			throw haxe_Exception.thrown("Error: Space::clear() cannot be called during space step()");
		}
		this.zpp_inner.clear();
	}
	step(deltaTime,velocityIterations,positionIterations) {
		if(positionIterations == null) {
			positionIterations = 10;
		}
		if(velocityIterations == null) {
			velocityIterations = 10;
		}
		if(deltaTime != deltaTime) {
			throw haxe_Exception.thrown("Error: deltaTime cannot be NaN");
		}
		if(deltaTime <= 0) {
			throw haxe_Exception.thrown("Error: deltaTime must be strictly positive");
		}
		if(velocityIterations <= 0) {
			throw haxe_Exception.thrown("Error: must use atleast one velocity iteration");
		}
		if(positionIterations <= 0) {
			throw haxe_Exception.thrown("Error: must use atleast one position iteration");
		}
		this.zpp_inner.step(deltaTime,velocityIterations,positionIterations);
	}
	get_timeStamp() {
		return this.zpp_inner.stamp;
	}
	get_elapsedTime() {
		return this.zpp_inner.time;
	}
	interactionType(shape1,shape2) {
		if(shape1 == null || shape2 == null) {
			throw haxe_Exception.thrown("Error: Cannot evaluate interaction type for null shapes");
		}
		if((shape1.zpp_inner.body != null ? shape1.zpp_inner.body.outer : null) == null || (shape2.zpp_inner.body != null ? shape2.zpp_inner.body.outer : null) == null) {
			throw haxe_Exception.thrown("Error: Cannot evaluate interaction type for shapes not part of a Body");
		}
		if((shape1.zpp_inner.body != null ? shape1.zpp_inner.body.outer : null).zpp_inner.type == ZPP_Flags.id_BodyType_STATIC && (shape2.zpp_inner.body != null ? shape2.zpp_inner.body.outer : null).zpp_inner.type == ZPP_Flags.id_BodyType_STATIC) {
			return null;
		}
		if((shape1.zpp_inner.body != null ? shape1.zpp_inner.body.outer : null) == (shape2.zpp_inner.body != null ? shape2.zpp_inner.body.outer : null)) {
			return null;
		}
		let s1 = shape1.zpp_inner;
		let s2 = shape2.zpp_inner;
		let _this = this.zpp_inner;
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
		let _g;
		let _g1;
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
			let _g;
			if(g1 == null) {
				_g = false;
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
					_g = false;
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
					_g = ret;
				}
			}
			_g1 = !_g;
		} else {
			_g1 = false;
		}
		if(_g1) {
			let _g1;
			if(s1.sensorEnabled || s2.sensorEnabled) {
				let _this = s1.filter;
				let x = s2.filter;
				_g1 = (_this.sensorMask & x.sensorGroup) != 0 && (x.sensorMask & _this.sensorGroup) != 0;
			} else {
				_g1 = false;
			}
			if(_g1) {
				_g = 2;
			} else {
				let _g1;
				if(s1.fluidEnabled || s2.fluidEnabled) {
					let _this = s1.filter;
					let x = s2.filter;
					_g1 = (_this.fluidMask & x.fluidGroup) != 0 && (x.fluidMask & _this.fluidGroup) != 0;
				} else {
					_g1 = false;
				}
				if(_g1 && !(b1.imass == 0 && b2.imass == 0 && b1.iinertia == 0 && b2.iinertia == 0)) {
					_g = 0;
				} else {
					let _this = s1.filter;
					let x = s2.filter;
					_g = (_this.collisionMask & x.collisionGroup) != 0 && (x.collisionMask & _this.collisionGroup) != 0 && !(b1.imass == 0 && b2.imass == 0 && b1.iinertia == 0 && b2.iinertia == 0) ? 1 : -1;
				}
			}
		} else {
			_g = -1;
		}
		switch(_g) {
		case 0:
			if(ZPP_Flags.InteractionType_FLUID == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_FLUID = new InteractionType();
				ZPP_Flags.internal = false;
			}
			return ZPP_Flags.InteractionType_FLUID;
		case 1:
			if(ZPP_Flags.InteractionType_COLLISION == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_COLLISION = new InteractionType();
				ZPP_Flags.internal = false;
			}
			return ZPP_Flags.InteractionType_COLLISION;
		case 2:
			if(ZPP_Flags.InteractionType_SENSOR == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_SENSOR = new InteractionType();
				ZPP_Flags.internal = false;
			}
			return ZPP_Flags.InteractionType_SENSOR;
		default:
			return null;
		}
	}
	shapesUnderPoint(point,filter,output) {
		if(point != null && point.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(point == null) {
			throw haxe_Exception.thrown("Error: Cannot evaluate shapes under a null point :)");
		}
		let ret = this.zpp_inner;
		if(point != null && point.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = point.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let ret1 = point.zpp_inner.x;
		if(point != null && point.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = point.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let ret2 = ret.shapesUnderPoint(ret1,point.zpp_inner.y,filter == null ? null : filter.zpp_inner,output);
		if(point.zpp_inner.weak) {
			if(point != null && point.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = point.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(point.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = point.zpp_inner;
			point.zpp_inner.outer = null;
			point.zpp_inner = null;
			let o = point;
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
		return ret2;
	}
	bodiesUnderPoint(point,filter,output) {
		if(point != null && point.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(point == null) {
			throw haxe_Exception.thrown("Error: Cannot evaluate objects under a null point :)");
		}
		let ret = this.zpp_inner;
		if(point != null && point.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = point.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let ret1 = point.zpp_inner.x;
		if(point != null && point.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = point.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let ret2 = ret.bodiesUnderPoint(ret1,point.zpp_inner.y,filter == null ? null : filter.zpp_inner,output);
		if(point.zpp_inner.weak) {
			if(point != null && point.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = point.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(point.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = point.zpp_inner;
			point.zpp_inner.outer = null;
			point.zpp_inner = null;
			let o = point;
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
		return ret2;
	}
	shapesInAABB(aabb,containment,strict,filter,output) {
		if(strict == null) {
			strict = true;
		}
		if(containment == null) {
			containment = false;
		}
		if(aabb == null) {
			throw haxe_Exception.thrown("Error: Cannot evaluate shapes in a null AABB :)");
		}
		let tmp;
		let _this = aabb.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let _this1 = aabb.zpp_inner;
		if(_this1.maxx - _this1.minx != 0) {
			let _this = aabb.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let _this1 = aabb.zpp_inner;
			tmp = _this1.maxy - _this1.miny == 0;
		} else {
			tmp = true;
		}
		if(tmp) {
			throw haxe_Exception.thrown("Error: Cannot evaluate shapes in degenerate AABB :/");
		}
		return this.zpp_inner.shapesInAABB(aabb,strict,containment,filter == null ? null : filter.zpp_inner,output);
	}
	bodiesInAABB(aabb,containment,strict,filter,output) {
		if(strict == null) {
			strict = true;
		}
		if(containment == null) {
			containment = false;
		}
		if(aabb == null) {
			throw haxe_Exception.thrown("Error: Cannot evaluate objects in a null AABB :)");
		}
		let tmp;
		let _this = aabb.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let _this1 = aabb.zpp_inner;
		if(_this1.maxx - _this1.minx != 0) {
			let _this = aabb.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let _this1 = aabb.zpp_inner;
			tmp = _this1.maxy - _this1.miny == 0;
		} else {
			tmp = true;
		}
		if(tmp) {
			throw haxe_Exception.thrown("Error: Cannot evaluate objects in degenerate AABB :/");
		}
		return this.zpp_inner.bodiesInAABB(aabb,strict,containment,filter == null ? null : filter.zpp_inner,output);
	}
	shapesInCircle(position,radius,containment,filter,output) {
		if(containment == null) {
			containment = false;
		}
		if(position != null && position.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(position == null) {
			throw haxe_Exception.thrown("Error: Cannot evaluate shapes at null circle :)");
		}
		if(radius != radius) {
			throw haxe_Exception.thrown("Error: Circle radius cannot be NaN");
		}
		if(radius <= 0) {
			throw haxe_Exception.thrown("Error: Circle radius must be strictly positive");
		}
		let ret = this.zpp_inner.shapesInCircle(position,radius,containment,filter == null ? null : filter.zpp_inner,output);
		if(position.zpp_inner.weak) {
			if(position != null && position.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = position.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(position.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = position.zpp_inner;
			position.zpp_inner.outer = null;
			position.zpp_inner = null;
			let o = position;
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
		return ret;
	}
	bodiesInCircle(position,radius,containment,filter,output) {
		if(containment == null) {
			containment = false;
		}
		if(position != null && position.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(position == null) {
			throw haxe_Exception.thrown("Error: Cannot evaluate objects at null circle :)");
		}
		if(radius != radius) {
			throw haxe_Exception.thrown("Error: Circle radius cannot be NaN");
		}
		if(radius <= 0) {
			throw haxe_Exception.thrown("Error: Circle radius must be strictly positive");
		}
		let ret = this.zpp_inner.bodiesInCircle(position,radius,containment,filter == null ? null : filter.zpp_inner,output);
		if(position.zpp_inner.weak) {
			if(position != null && position.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = position.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(position.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = position.zpp_inner;
			position.zpp_inner.outer = null;
			position.zpp_inner = null;
			let o = position;
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
		return ret;
	}
	shapesInShape(shape,containment,filter,output) {
		if(containment == null) {
			containment = false;
		}
		if(shape == null) {
			throw haxe_Exception.thrown("Error: Cannot evaluate shapes in a null shapes :)");
		}
		if((shape.zpp_inner.body != null ? shape.zpp_inner.body.outer : null) == null) {
			throw haxe_Exception.thrown("Error: Query shape needs to be inside a Body to be well defined :)");
		}
		if(shape.zpp_inner.type == ZPP_Flags.id_ShapeType_POLYGON) {
			let res = shape.zpp_inner.polygon.valid();
			if(ZPP_Flags.ValidationResult_VALID == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.ValidationResult_VALID = new ValidationResult();
				ZPP_Flags.internal = false;
			}
			if(res != ZPP_Flags.ValidationResult_VALID) {
				throw haxe_Exception.thrown("Error: Polygon query shape is invalid : " + res.toString());
			}
		}
		return this.zpp_inner.shapesInShape(shape.zpp_inner,containment,filter == null ? null : filter.zpp_inner,output);
	}
	bodiesInShape(shape,containment,filter,output) {
		if(containment == null) {
			containment = false;
		}
		if(shape == null) {
			throw haxe_Exception.thrown("Error: Cannot evaluate bodies in a null shapes :)");
		}
		if((shape.zpp_inner.body != null ? shape.zpp_inner.body.outer : null) == null) {
			throw haxe_Exception.thrown("Error: Query shape needs to be inside a Body to be well defined :)");
		}
		if(shape.zpp_inner.type == ZPP_Flags.id_ShapeType_POLYGON) {
			let res = shape.zpp_inner.polygon.valid();
			if(ZPP_Flags.ValidationResult_VALID == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.ValidationResult_VALID = new ValidationResult();
				ZPP_Flags.internal = false;
			}
			if(res != ZPP_Flags.ValidationResult_VALID) {
				throw haxe_Exception.thrown("Error: Polygon query shape is invalid : " + res.toString());
			}
		}
		return this.zpp_inner.bodiesInShape(shape.zpp_inner,containment,filter == null ? null : filter.zpp_inner,output);
	}
	shapesInBody(body,filter,output) {
		if(body == null) {
			throw haxe_Exception.thrown("Error: Cannot evaluate shapes in null body");
		}
		let ret = output == null ? new ShapeList() : output;
		let _this = body.zpp_inner.wrap_shapes;
		_this.zpp_inner.valmod();
		let _g = ShapeIterator.get(_this);
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
			let shape = _g.zpp_inner.at(_g.zpp_i++);
			let cur = this.shapesInShape(shape,false,filter,ret);
		}
		return ret;
	}
	bodiesInBody(body,filter,output) {
		if(body == null) {
			throw haxe_Exception.thrown("Error: Cannot evaluate shapes in null body");
		}
		let ret = output == null ? new BodyList() : output;
		let _this = body.zpp_inner.wrap_shapes;
		_this.zpp_inner.valmod();
		let _g = ShapeIterator.get(_this);
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
			let shape = _g.zpp_inner.at(_g.zpp_i++);
			let cur = this.bodiesInShape(shape,false,filter,ret);
		}
		return ret;
	}
	convexCast(shape,deltaTime,liveSweep,filter) {
		if(liveSweep == null) {
			liveSweep = false;
		}
		if(shape == null) {
			throw haxe_Exception.thrown("Error: Cannot cast null shape :)");
		}
		if((shape.zpp_inner.body != null ? shape.zpp_inner.body.outer : null) == null) {
			throw haxe_Exception.thrown("Error: Shape must belong to a body to be cast.");
		}
		if(deltaTime < 0 || deltaTime != deltaTime) {
			throw haxe_Exception.thrown("Error: deltaTime must be positive");
		}
		return this.zpp_inner.convexCast(shape.zpp_inner,deltaTime,filter,liveSweep);
	}
	convexMultiCast(shape,deltaTime,liveSweep,filter,output) {
		if(liveSweep == null) {
			liveSweep = false;
		}
		if(shape == null) {
			throw haxe_Exception.thrown("Error: Cannot cast null shape :)");
		}
		if((shape.zpp_inner.body != null ? shape.zpp_inner.body.outer : null) == null) {
			throw haxe_Exception.thrown("Error: Shape must belong to a body to be cast.");
		}
		if(deltaTime < 0 || deltaTime != deltaTime) {
			throw haxe_Exception.thrown("Error: deltaTime must be positive");
		}
		return this.zpp_inner.convexMultiCast(shape.zpp_inner,deltaTime,filter,liveSweep,output);
	}
	rayCast(ray,inner,filter) {
		if(inner == null) {
			inner = false;
		}
		if(ray == null) {
			throw haxe_Exception.thrown("Error: Cannot cast null ray :)");
		}
		return this.zpp_inner.rayCast(ray,inner,filter);
	}
	rayMultiCast(ray,inner,filter,output) {
		if(inner == null) {
			inner = false;
		}
		if(ray == null) {
			throw haxe_Exception.thrown("Error: Cannot cast null ray :)");
		}
		return this.zpp_inner.rayMultiCast(ray,inner,filter,output);
	}
	add(body) {
		let _this = this.zpp_inner.wrap_bodies;
		if(_this.zpp_inner.reverse_flag) {
			_this.push(body);
		} else {
			_this.unshift(body);
		}
	}
	remove(body) {
		this.zpp_inner.wrap_bodies.remove(body);
	}
	addJoint(joint) {
		let _this = this.zpp_inner.wrap_constraints;
		if(_this.zpp_inner.reverse_flag) {
			_this.push(joint);
		} else {
			_this.unshift(joint);
		}
	}
	removeJoint(joint) {
		if(this.zpp_inner.wrap_constraints.has(joint)) {
			this.zpp_inner.wrap_constraints.remove(joint);
		}
	}
}
