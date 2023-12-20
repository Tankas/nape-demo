import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZPP_ArbiterList from '../../zpp_nape/util/ZPP_ArbiterList.js';
import ZPP_ConstraintList from '../../zpp_nape/util/ZPP_ConstraintList.js';
import ZPP_Body from '../../zpp_nape/phys/ZPP_Body.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import ZPP_Arbiter from '../../zpp_nape/dynamics/ZPP_Arbiter.js';
import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
import ZPP_CbType from '../../zpp_nape/callbacks/ZPP_CbType.js';
import ShapeIterator from '../shape/ShapeIterator.js';
import MassMode from './MassMode.js';
import InertiaMode from './InertiaMode.js';
import GravMassMode from './GravMassMode.js';
import FluidProperties from './FluidProperties.js';
import BodyType from './BodyType.js';
import Interactor from './Interactor.js';
import Vec3 from '../geom/Vec3.js';
import Vec2 from '../geom/Vec2.js';
import ArbiterIterator from '../dynamics/ArbiterIterator.js';
import ConstraintIterator from '../constraint/ConstraintIterator.js';
import InteractionType from '../callbacks/InteractionType.js';
export default class Body extends Interactor {
	constructor(type,position) {
		Interactor._hx_skip_constructor = true;
		super();
		Interactor._hx_skip_constructor = false;
		this._hx_constructor(type,position);
	}
	_hx_constructor(type,position) {
		this.debugDraw = true;
		this.zpp_inner = null;
		Interactor.zpp_internalAlloc = true;
		super._hx_constructor();
		Interactor.zpp_internalAlloc = false;
		this.zpp_inner = new ZPP_Body();
		this.zpp_inner.outer = this;
		this.zpp_inner.outer_i = this;
		this.zpp_inner_i = this.zpp_inner;
		if(position != null) {
			if(position != null && position.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			if(position != null && position.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = position.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			this.zpp_inner.posx = position.zpp_inner.x;
			if(position != null && position.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = position.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			this.zpp_inner.posy = position.zpp_inner.y;
		} else {
			this.zpp_inner.posx = 0;
			this.zpp_inner.posy = 0;
		}
		let type1;
		if(type == null) {
			if(ZPP_Flags.BodyType_DYNAMIC == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.BodyType_DYNAMIC = new BodyType();
				ZPP_Flags.internal = false;
			}
			type1 = ZPP_Flags.BodyType_DYNAMIC;
		} else {
			type1 = type;
		}
		this.zpp_inner.immutable_midstep("Body::type");
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		if(ZPP_Body.types[this.zpp_inner.type] != type1) {
			if(type1 == null) {
				throw haxe_Exception.thrown("Error: Cannot use null BodyType");
			}
			let ntype;
			if(ZPP_Flags.BodyType_DYNAMIC == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.BodyType_DYNAMIC = new BodyType();
				ZPP_Flags.internal = false;
			}
			if(type1 == ZPP_Flags.BodyType_DYNAMIC) {
				ntype = ZPP_Flags.id_BodyType_DYNAMIC;
			} else {
				if(ZPP_Flags.BodyType_KINEMATIC == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.BodyType_KINEMATIC = new BodyType();
					ZPP_Flags.internal = false;
				}
				ntype = type1 == ZPP_Flags.BodyType_KINEMATIC ? ZPP_Flags.id_BodyType_KINEMATIC : ZPP_Flags.id_BodyType_STATIC;
			}
			if(ntype == ZPP_Flags.id_BodyType_STATIC && this.zpp_inner.space != null) {
				this.zpp_inner.velx = 0;
				this.zpp_inner.vely = 0;
				this.zpp_inner.angvel = 0;
			}
			this.zpp_inner.invalidate_type();
			if(this.zpp_inner.space != null) {
				this.zpp_inner.space.transmitType(this.zpp_inner,ntype);
			} else {
				this.zpp_inner.type = ntype;
			}
		}
		if(position != null) {
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
		}
		this.zpp_inner_i.insert_cbtype(ZPP_CbType.ANY_BODY.zpp_inner);
		this.userData = Body.createDataVo();
	}
	get_type() {
		return ZPP_Body.types[this.zpp_inner.type];
	}
	set_type(type) {
		this.zpp_inner.immutable_midstep("Body::type");
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		if(ZPP_Body.types[this.zpp_inner.type] != type) {
			if(type == null) {
				throw haxe_Exception.thrown("Error: Cannot use null BodyType");
			}
			let ntype;
			if(ZPP_Flags.BodyType_DYNAMIC == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.BodyType_DYNAMIC = new BodyType();
				ZPP_Flags.internal = false;
			}
			if(type == ZPP_Flags.BodyType_DYNAMIC) {
				ntype = ZPP_Flags.id_BodyType_DYNAMIC;
			} else {
				if(ZPP_Flags.BodyType_KINEMATIC == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.BodyType_KINEMATIC = new BodyType();
					ZPP_Flags.internal = false;
				}
				ntype = type == ZPP_Flags.BodyType_KINEMATIC ? ZPP_Flags.id_BodyType_KINEMATIC : ZPP_Flags.id_BodyType_STATIC;
			}
			if(ntype == ZPP_Flags.id_BodyType_STATIC && this.zpp_inner.space != null) {
				this.zpp_inner.velx = 0;
				this.zpp_inner.vely = 0;
				this.zpp_inner.angvel = 0;
			}
			this.zpp_inner.invalidate_type();
			if(this.zpp_inner.space != null) {
				this.zpp_inner.space.transmitType(this.zpp_inner,ntype);
			} else {
				this.zpp_inner.type = ntype;
			}
		}
		return ZPP_Body.types[this.zpp_inner.type];
	}
	get_isBullet() {
		return this.zpp_inner.bulletEnabled;
	}
	set_isBullet(isBullet) {
		this.zpp_inner.bulletEnabled = isBullet;
		return this.zpp_inner.bulletEnabled;
	}
	get_disableCCD() {
		return this.zpp_inner.disableCCD;
	}
	set_disableCCD(disableCCD) {
		this.zpp_inner.disableCCD = disableCCD;
		return this.zpp_inner.disableCCD;
	}
	integrate(deltaTime) {
		if(deltaTime != deltaTime) {
			throw haxe_Exception.thrown("Cannot integrate by NaN time");
		}
		this.zpp_inner.immutable_midstep("Body::space");
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		if(deltaTime == 0) {
			return this;
		}
		let cur = this.zpp_inner;
		cur.sweepTime = 0;
		cur.sweep_angvel = cur.angvel;
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
		cur.zip_axis = true;
		let cx_ite1 = cur.shapes.head;
		while(cx_ite1 != null) {
			let s = cx_ite1.elt;
			if(s.type == ZPP_Flags.id_ShapeType_POLYGON) {
				s.polygon.invalidate_gverts();
				s.polygon.invalidate_gaxi();
			}
			s.invalidate_worldCOM();
			cx_ite1 = cx_ite1.next;
		}
		cur.zip_worldCOM = true;
		cur.sweepTime = 0;
		return this;
	}
	isStatic() {
		return this.zpp_inner.type == ZPP_Flags.id_BodyType_STATIC;
	}
	isDynamic() {
		return this.zpp_inner.type == ZPP_Flags.id_BodyType_DYNAMIC;
	}
	isKinematic() {
		return this.zpp_inner.type == ZPP_Flags.id_BodyType_KINEMATIC;
	}
	get_shapes() {
		return this.zpp_inner.wrap_shapes;
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
				(this.zpp_inner.compound == null ? null : this.zpp_inner.compound.outer).zpp_inner.wrap_bodies.remove(this);
			}
			if(compound != null) {
				let _this = compound.zpp_inner.wrap_bodies;
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
			throw haxe_Exception.thrown("Error: Cannot set the space of a Body belonging to a Compound, only the root Compound space can be set");
		}
		this.zpp_inner.immutable_midstep("Body::space");
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != space) {
			if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
				this.zpp_inner.component.woken = false;
			}
			if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
				(this.zpp_inner.space == null ? null : this.zpp_inner.space.outer).zpp_inner.wrap_bodies.remove(this);
			}
			if(space != null) {
				let _this = space.zpp_inner.wrap_bodies;
				if(_this.zpp_inner.reverse_flag) {
					_this.push(this);
				} else {
					_this.unshift(this);
				}
			}
		}
		if(this.zpp_inner.space == null) {
			return null;
		} else {
			return this.zpp_inner.space.outer;
		}
	}
	get_arbiters() {
		if(this.zpp_inner.wrap_arbiters == null) {
			this.zpp_inner.wrap_arbiters = ZPP_ArbiterList.get(this.zpp_inner.arbiters,true);
		}
		return this.zpp_inner.wrap_arbiters;
	}
	get_isSleeping() {
		if(this.zpp_inner.space == null) {
			throw haxe_Exception.thrown("Error: isSleeping makes no sense if the object is not contained within a Space");
		}
		return this.zpp_inner.component.sleeping;
	}
	get_constraints() {
		if(this.zpp_inner.wrap_constraints == null) {
			this.zpp_inner.wrap_constraints = ZPP_ConstraintList.get(this.zpp_inner.constraints,true);
		}
		return this.zpp_inner.wrap_constraints;
	}
	copy() {
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world cannot be copied");
		}
		return this.zpp_inner.copy();
	}
	get_position() {
		if(this.zpp_inner.wrap_pos == null) {
			this.zpp_inner.setupPosition();
		}
		return this.zpp_inner.wrap_pos;
	}
	set_position(position) {
		if(position != null && position.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(position == null) {
			throw haxe_Exception.thrown("Error: Body::" + "position" + " cannot be null");
		}
		if(this.zpp_inner.wrap_pos == null) {
			this.zpp_inner.setupPosition();
		}
		let _this = this.zpp_inner.wrap_pos;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(position != null && position.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = _this.zpp_inner;
		if(_this1._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this1._isimmutable != null) {
			_this1._isimmutable();
		}
		if(position == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
		}
		if(position != null && position.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = position.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let x = position.zpp_inner.x;
		if(position != null && position.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = position.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let y = position.zpp_inner.y;
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
		if(this.zpp_inner.wrap_pos == null) {
			this.zpp_inner.setupPosition();
		}
		return this.zpp_inner.wrap_pos;
	}
	get_velocity() {
		if(this.zpp_inner.wrap_vel == null) {
			this.zpp_inner.setupVelocity();
		}
		return this.zpp_inner.wrap_vel;
	}
	set_velocity(velocity) {
		if(velocity != null && velocity.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(velocity == null) {
			throw haxe_Exception.thrown("Error: Body::" + "velocity" + " cannot be null");
		}
		if(this.zpp_inner.wrap_vel == null) {
			this.zpp_inner.setupVelocity();
		}
		let _this = this.zpp_inner.wrap_vel;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(velocity != null && velocity.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = _this.zpp_inner;
		if(_this1._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this1._isimmutable != null) {
			_this1._isimmutable();
		}
		if(velocity == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
		}
		if(velocity != null && velocity.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = velocity.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let x = velocity.zpp_inner.x;
		if(velocity != null && velocity.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = velocity.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let y = velocity.zpp_inner.y;
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
		if(velocity.zpp_inner.weak) {
			if(velocity != null && velocity.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = velocity.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(velocity.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = velocity.zpp_inner;
			velocity.zpp_inner.outer = null;
			velocity.zpp_inner = null;
			let o = velocity;
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
		if(this.zpp_inner.wrap_vel == null) {
			this.zpp_inner.setupVelocity();
		}
		return this.zpp_inner.wrap_vel;
	}
	setVelocityFromTarget(targetPosition,targetRotation,deltaTime) {
		if(targetPosition != null && targetPosition.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(targetPosition == null) {
			throw haxe_Exception.thrown("Cannot set velocity for null target position");
		}
		if(deltaTime == 0) {
			throw haxe_Exception.thrown("deltaTime cannot be 0 for setVelocityFromTarget");
		}
		let idt = 1 / deltaTime;
		if(this.zpp_inner.wrap_vel == null) {
			this.zpp_inner.setupVelocity();
		}
		let _this = this.zpp_inner.wrap_vel;
		if(this.zpp_inner.wrap_pos == null) {
			this.zpp_inner.setupPosition();
		}
		let vector = targetPosition.sub(this.zpp_inner.wrap_pos,true).muleq(idt);
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = _this.zpp_inner;
		if(_this1._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this1._isimmutable != null) {
			_this1._isimmutable();
		}
		if(vector == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
		}
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = vector.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let x = vector.zpp_inner.x;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = vector.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let y = vector.zpp_inner.y;
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
		if(vector.zpp_inner.weak) {
			if(vector != null && vector.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = vector.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(vector.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = vector.zpp_inner;
			vector.zpp_inner.outer = null;
			vector.zpp_inner = null;
			let o = vector;
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
		let angularVel = (targetRotation - this.zpp_inner.rot) * idt;
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		if(this.zpp_inner.angvel != angularVel) {
			if(angularVel != angularVel) {
				throw haxe_Exception.thrown("Error: Body::angularVel cannot be NaN");
			}
			if(this.zpp_inner.type == ZPP_Flags.id_BodyType_STATIC) {
				throw haxe_Exception.thrown("Error: A static object cannot be given a velocity");
			}
			this.zpp_inner.angvel = angularVel;
			this.zpp_inner.wake();
		}
		if(targetPosition.zpp_inner.weak) {
			if(targetPosition != null && targetPosition.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = targetPosition.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(targetPosition.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = targetPosition.zpp_inner;
			targetPosition.zpp_inner.outer = null;
			targetPosition.zpp_inner = null;
			let o = targetPosition;
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
		return this;
	}
	get_kinematicVel() {
		if(this.zpp_inner.wrap_kinvel == null) {
			this.zpp_inner.setupkinvel();
		}
		return this.zpp_inner.wrap_kinvel;
	}
	set_kinematicVel(kinematicVel) {
		if(kinematicVel != null && kinematicVel.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(kinematicVel == null) {
			throw haxe_Exception.thrown("Error: Body::" + "kinematicVel" + " cannot be null");
		}
		if(this.zpp_inner.wrap_kinvel == null) {
			this.zpp_inner.setupkinvel();
		}
		let _this = this.zpp_inner.wrap_kinvel;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(kinematicVel != null && kinematicVel.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = _this.zpp_inner;
		if(_this1._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this1._isimmutable != null) {
			_this1._isimmutable();
		}
		if(kinematicVel == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
		}
		if(kinematicVel != null && kinematicVel.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = kinematicVel.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let x = kinematicVel.zpp_inner.x;
		if(kinematicVel != null && kinematicVel.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = kinematicVel.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let y = kinematicVel.zpp_inner.y;
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
		if(kinematicVel.zpp_inner.weak) {
			if(kinematicVel != null && kinematicVel.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = kinematicVel.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(kinematicVel.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = kinematicVel.zpp_inner;
			kinematicVel.zpp_inner.outer = null;
			kinematicVel.zpp_inner = null;
			let o = kinematicVel;
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
		if(this.zpp_inner.wrap_kinvel == null) {
			this.zpp_inner.setupkinvel();
		}
		return this.zpp_inner.wrap_kinvel;
	}
	get_surfaceVel() {
		if(this.zpp_inner.wrap_svel == null) {
			this.zpp_inner.setupsvel();
		}
		return this.zpp_inner.wrap_svel;
	}
	set_surfaceVel(surfaceVel) {
		if(surfaceVel != null && surfaceVel.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(surfaceVel == null) {
			throw haxe_Exception.thrown("Error: Body::" + "surfaceVel" + " cannot be null");
		}
		if(this.zpp_inner.wrap_svel == null) {
			this.zpp_inner.setupsvel();
		}
		let _this = this.zpp_inner.wrap_svel;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(surfaceVel != null && surfaceVel.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = _this.zpp_inner;
		if(_this1._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this1._isimmutable != null) {
			_this1._isimmutable();
		}
		if(surfaceVel == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
		}
		if(surfaceVel != null && surfaceVel.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = surfaceVel.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let x = surfaceVel.zpp_inner.x;
		if(surfaceVel != null && surfaceVel.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = surfaceVel.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let y = surfaceVel.zpp_inner.y;
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
		if(surfaceVel.zpp_inner.weak) {
			if(surfaceVel != null && surfaceVel.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = surfaceVel.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(surfaceVel.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = surfaceVel.zpp_inner;
			surfaceVel.zpp_inner.outer = null;
			surfaceVel.zpp_inner = null;
			let o = surfaceVel;
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
		if(this.zpp_inner.wrap_svel == null) {
			this.zpp_inner.setupsvel();
		}
		return this.zpp_inner.wrap_svel;
	}
	get_force() {
		if(this.zpp_inner.wrap_force == null) {
			this.zpp_inner.setupForce();
		}
		return this.zpp_inner.wrap_force;
	}
	set_force(force) {
		if(force != null && force.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(force == null) {
			throw haxe_Exception.thrown("Error: Body::" + "force" + " cannot be null");
		}
		if(this.zpp_inner.wrap_force == null) {
			this.zpp_inner.setupForce();
		}
		let _this = this.zpp_inner.wrap_force;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(force != null && force.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = _this.zpp_inner;
		if(_this1._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this1._isimmutable != null) {
			_this1._isimmutable();
		}
		if(force == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
		}
		if(force != null && force.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = force.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let x = force.zpp_inner.x;
		if(force != null && force.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = force.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let y = force.zpp_inner.y;
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
		if(force.zpp_inner.weak) {
			if(force != null && force.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = force.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(force.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = force.zpp_inner;
			force.zpp_inner.outer = null;
			force.zpp_inner = null;
			let o = force;
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
		if(this.zpp_inner.wrap_force == null) {
			this.zpp_inner.setupForce();
		}
		return this.zpp_inner.wrap_force;
	}
	get_constraintVelocity() {
		if(this.zpp_inner.wrapcvel == null) {
			this.zpp_inner.setup_cvel();
		}
		return this.zpp_inner.wrapcvel;
	}
	get_rotation() {
		return this.zpp_inner.rot;
	}
	set_rotation(rotation) {
		this.zpp_inner.immutable_midstep("Body::rotation");
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		if(this.zpp_inner.type == ZPP_Flags.id_BodyType_STATIC && this.zpp_inner.space != null) {
			throw haxe_Exception.thrown("Error: Static objects cannot be rotated once inside a Space");
		}
		if(this.zpp_inner.rot != rotation) {
			if(rotation != rotation) {
				throw haxe_Exception.thrown("Error: Body::rotation cannot be NaN");
			}
			this.zpp_inner.rot = rotation;
			let _this = this.zpp_inner;
			_this.zip_axis = true;
			let cx_ite = _this.shapes.head;
			while(cx_ite != null) {
				let s = cx_ite.elt;
				if(s.type == ZPP_Flags.id_ShapeType_POLYGON) {
					s.polygon.invalidate_gverts();
					s.polygon.invalidate_gaxi();
				}
				s.invalidate_worldCOM();
				cx_ite = cx_ite.next;
			}
			_this.zip_worldCOM = true;
			this.zpp_inner.wake();
		}
		return this.zpp_inner.rot;
	}
	get_angularVel() {
		return this.zpp_inner.angvel;
	}
	set_angularVel(angularVel) {
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		if(this.zpp_inner.angvel != angularVel) {
			if(angularVel != angularVel) {
				throw haxe_Exception.thrown("Error: Body::angularVel cannot be NaN");
			}
			if(this.zpp_inner.type == ZPP_Flags.id_BodyType_STATIC) {
				throw haxe_Exception.thrown("Error: A static object cannot be given a velocity");
			}
			this.zpp_inner.angvel = angularVel;
			this.zpp_inner.wake();
		}
		return this.zpp_inner.angvel;
	}
	get_kinAngVel() {
		return this.zpp_inner.kinangvel;
	}
	set_kinAngVel(kinAngVel) {
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		if(this.zpp_inner.kinangvel != kinAngVel) {
			if(kinAngVel != kinAngVel) {
				throw haxe_Exception.thrown("Error: Body::kinAngVel cannot be NaN");
			}
			this.zpp_inner.kinangvel = kinAngVel;
			this.zpp_inner.wake();
		}
		return this.zpp_inner.kinangvel;
	}
	get_torque() {
		return this.zpp_inner.torque;
	}
	set_torque(torque) {
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		if(this.zpp_inner.type != ZPP_Flags.id_BodyType_DYNAMIC) {
			throw haxe_Exception.thrown("Error: Non-dynamic body cannot have torque applied.");
		}
		if(torque != torque) {
			throw haxe_Exception.thrown("Error: Body::torque cannot be NaN");
		}
		if(this.zpp_inner.torque != torque) {
			this.zpp_inner.torque = torque;
			this.zpp_inner.wake();
		}
		return this.zpp_inner.torque;
	}
	get_bounds() {
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world has no bounds");
		}
		return this.zpp_inner.aabb.wrapper();
	}
	get_allowMovement() {
		return !this.zpp_inner.nomove;
	}
	set_allowMovement(allowMovement) {
		this.zpp_inner.immutable_midstep("Body::" + (allowMovement == null ? "null" : "" + allowMovement));
		if(!this.zpp_inner.nomove != allowMovement) {
			this.zpp_inner.nomove = !allowMovement;
			this.zpp_inner.invalidate_mass();
		}
		return !this.zpp_inner.nomove;
	}
	get_allowRotation() {
		return !this.zpp_inner.norotate;
	}
	set_allowRotation(allowRotation) {
		this.zpp_inner.immutable_midstep("Body::" + (allowRotation == null ? "null" : "" + allowRotation));
		if(!this.zpp_inner.norotate != allowRotation) {
			this.zpp_inner.norotate = !allowRotation;
			this.zpp_inner.invalidate_inertia();
		}
		return !this.zpp_inner.norotate;
	}
	get_massMode() {
		if(ZPP_Flags.MassMode_DEFAULT == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.MassMode_DEFAULT = new MassMode();
			ZPP_Flags.internal = false;
		}
		let tmp = ZPP_Flags.MassMode_DEFAULT;
		if(ZPP_Flags.MassMode_FIXED == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.MassMode_FIXED = new MassMode();
			ZPP_Flags.internal = false;
		}
		return [tmp,ZPP_Flags.MassMode_FIXED][this.zpp_inner.massMode];
	}
	set_massMode(massMode) {
		this.zpp_inner.immutable_midstep("Body::massMode");
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		if(massMode == null) {
			throw haxe_Exception.thrown("Error: cannot use null massMode");
		}
		if(ZPP_Flags.MassMode_DEFAULT == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.MassMode_DEFAULT = new MassMode();
			ZPP_Flags.internal = false;
		}
		this.zpp_inner.massMode = massMode == ZPP_Flags.MassMode_DEFAULT ? ZPP_Flags.id_MassMode_DEFAULT : ZPP_Flags.id_MassMode_FIXED;
		this.zpp_inner.invalidate_mass();
		if(ZPP_Flags.MassMode_DEFAULT == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.MassMode_DEFAULT = new MassMode();
			ZPP_Flags.internal = false;
		}
		let tmp = ZPP_Flags.MassMode_DEFAULT;
		if(ZPP_Flags.MassMode_FIXED == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.MassMode_FIXED = new MassMode();
			ZPP_Flags.internal = false;
		}
		return [tmp,ZPP_Flags.MassMode_FIXED][this.zpp_inner.massMode];
	}
	get_constraintMass() {
		if(!this.zpp_inner.world) {
			this.zpp_inner.validate_mass();
		}
		return this.zpp_inner.smass;
	}
	get_mass() {
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world has no mass");
		}
		this.zpp_inner.validate_mass();
		if(this.zpp_inner.massMode == ZPP_Flags.id_MassMode_DEFAULT && this.zpp_inner.shapes.head == null) {
			throw haxe_Exception.thrown("Error: Given current mass mode, Body::mass only makes sense if it contains shapes");
		}
		return this.zpp_inner.cmass;
	}
	set_mass(mass) {
		this.zpp_inner.immutable_midstep("Body::mass");
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		if(mass != mass) {
			throw haxe_Exception.thrown("Error: Mass cannot be NaN");
		}
		if(mass <= 0) {
			throw haxe_Exception.thrown("Error: Mass must be strictly positive");
		}
		if(mass >= Infinity) {
			throw haxe_Exception.thrown("Error: Mass cannot be infinite, use allowMovement = false instead");
		}
		this.zpp_inner.massMode = ZPP_Flags.id_MassMode_FIXED;
		this.zpp_inner.cmass = mass;
		this.zpp_inner.invalidate_mass();
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world has no mass");
		}
		this.zpp_inner.validate_mass();
		if(this.zpp_inner.massMode == ZPP_Flags.id_MassMode_DEFAULT && this.zpp_inner.shapes.head == null) {
			throw haxe_Exception.thrown("Error: Given current mass mode, Body::mass only makes sense if it contains shapes");
		}
		return this.zpp_inner.cmass;
	}
	get_gravMassMode() {
		if(ZPP_Flags.GravMassMode_DEFAULT == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.GravMassMode_DEFAULT = new GravMassMode();
			ZPP_Flags.internal = false;
		}
		let tmp = ZPP_Flags.GravMassMode_DEFAULT;
		if(ZPP_Flags.GravMassMode_FIXED == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.GravMassMode_FIXED = new GravMassMode();
			ZPP_Flags.internal = false;
		}
		let tmp1 = ZPP_Flags.GravMassMode_FIXED;
		if(ZPP_Flags.GravMassMode_SCALED == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.GravMassMode_SCALED = new GravMassMode();
			ZPP_Flags.internal = false;
		}
		return [tmp,tmp1,ZPP_Flags.GravMassMode_SCALED][this.zpp_inner.massMode];
	}
	set_gravMassMode(gravMassMode) {
		this.zpp_inner.immutable_midstep("Body::gravMassMode");
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		if(gravMassMode == null) {
			throw haxe_Exception.thrown("Error: Cannot use null gravMassMode");
		}
		let tmp;
		if(ZPP_Flags.GravMassMode_SCALED == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.GravMassMode_SCALED = new GravMassMode();
			ZPP_Flags.internal = false;
		}
		if(gravMassMode == ZPP_Flags.GravMassMode_SCALED) {
			tmp = ZPP_Flags.id_GravMassMode_SCALED;
		} else {
			if(ZPP_Flags.GravMassMode_DEFAULT == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.GravMassMode_DEFAULT = new GravMassMode();
				ZPP_Flags.internal = false;
			}
			tmp = gravMassMode == ZPP_Flags.GravMassMode_DEFAULT ? ZPP_Flags.id_GravMassMode_DEFAULT : ZPP_Flags.id_GravMassMode_FIXED;
		}
		this.zpp_inner.gravMassMode = tmp;
		this.zpp_inner.invalidate_gravMass();
		if(ZPP_Flags.GravMassMode_DEFAULT == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.GravMassMode_DEFAULT = new GravMassMode();
			ZPP_Flags.internal = false;
		}
		let tmp1 = ZPP_Flags.GravMassMode_DEFAULT;
		if(ZPP_Flags.GravMassMode_FIXED == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.GravMassMode_FIXED = new GravMassMode();
			ZPP_Flags.internal = false;
		}
		let tmp2 = ZPP_Flags.GravMassMode_FIXED;
		if(ZPP_Flags.GravMassMode_SCALED == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.GravMassMode_SCALED = new GravMassMode();
			ZPP_Flags.internal = false;
		}
		return [tmp1,tmp2,ZPP_Flags.GravMassMode_SCALED][this.zpp_inner.massMode];
	}
	get_gravMass() {
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world has no gravMass");
		}
		this.zpp_inner.validate_gravMass();
		if(this.zpp_inner.shapes.head == null) {
			if(this.zpp_inner.massMode == ZPP_Flags.id_MassMode_DEFAULT && this.zpp_inner.gravMassMode != ZPP_Flags.id_GravMassMode_FIXED) {
				throw haxe_Exception.thrown("Error: Given current mass/gravMass modes; Body::gravMass only makes sense if it contains Shapes");
			}
		}
		return this.zpp_inner.gravMass;
	}
	set_gravMass(gravMass) {
		this.zpp_inner.immutable_midstep("Body::gravMass");
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		if(gravMass != gravMass) {
			throw haxe_Exception.thrown("Error: gravMass cannot be NaN");
		}
		this.zpp_inner.gravMassMode = ZPP_Flags.id_GravMassMode_FIXED;
		this.zpp_inner.gravMass = gravMass;
		this.zpp_inner.invalidate_gravMass();
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world has no gravMass");
		}
		this.zpp_inner.validate_gravMass();
		if(this.zpp_inner.shapes.head == null) {
			if(this.zpp_inner.massMode == ZPP_Flags.id_MassMode_DEFAULT && this.zpp_inner.gravMassMode != ZPP_Flags.id_GravMassMode_FIXED) {
				throw haxe_Exception.thrown("Error: Given current mass/gravMass modes; Body::gravMass only makes sense if it contains Shapes");
			}
		}
		return this.zpp_inner.gravMass;
	}
	get_gravMassScale() {
		this.zpp_inner.validate_gravMassScale();
		if(this.zpp_inner.shapes.head == null) {
			if(this.zpp_inner.massMode == ZPP_Flags.id_MassMode_DEFAULT && this.zpp_inner.gravMassMode != ZPP_Flags.id_GravMassMode_SCALED) {
				throw haxe_Exception.thrown("Error: Given current mass/gravMass modes; Body::gravMassScale only makes sense if it contains Shapes");
			}
		}
		return this.zpp_inner.gravMassScale;
	}
	set_gravMassScale(gravMassScale) {
		this.zpp_inner.immutable_midstep("Body::gravMassScale");
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		if(gravMassScale != gravMassScale) {
			throw haxe_Exception.thrown("Error: gravMassScale cannot be NaN");
		}
		this.zpp_inner.gravMassMode = ZPP_Flags.id_GravMassMode_SCALED;
		this.zpp_inner.gravMassScale = gravMassScale;
		this.zpp_inner.invalidate_gravMassScale();
		this.zpp_inner.validate_gravMassScale();
		if(this.zpp_inner.shapes.head == null) {
			if(this.zpp_inner.massMode == ZPP_Flags.id_MassMode_DEFAULT && this.zpp_inner.gravMassMode != ZPP_Flags.id_GravMassMode_SCALED) {
				throw haxe_Exception.thrown("Error: Given current mass/gravMass modes; Body::gravMassScale only makes sense if it contains Shapes");
			}
		}
		return this.zpp_inner.gravMassScale;
	}
	get_inertiaMode() {
		if(ZPP_Flags.InertiaMode_DEFAULT == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.InertiaMode_DEFAULT = new InertiaMode();
			ZPP_Flags.internal = false;
		}
		let tmp = ZPP_Flags.InertiaMode_DEFAULT;
		if(ZPP_Flags.InertiaMode_FIXED == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.InertiaMode_FIXED = new InertiaMode();
			ZPP_Flags.internal = false;
		}
		return [tmp,ZPP_Flags.InertiaMode_FIXED][this.zpp_inner.inertiaMode];
	}
	set_inertiaMode(inertiaMode) {
		this.zpp_inner.immutable_midstep("Body::inertiaMode");
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		if(inertiaMode == null) {
			throw haxe_Exception.thrown("Error: Cannot use null InertiaMode");
		}
		if(ZPP_Flags.InertiaMode_FIXED == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.InertiaMode_FIXED = new InertiaMode();
			ZPP_Flags.internal = false;
		}
		this.zpp_inner.inertiaMode = inertiaMode == ZPP_Flags.InertiaMode_FIXED ? ZPP_Flags.id_InertiaMode_FIXED : ZPP_Flags.id_InertiaMode_DEFAULT;
		this.zpp_inner.invalidate_inertia();
		if(ZPP_Flags.InertiaMode_DEFAULT == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.InertiaMode_DEFAULT = new InertiaMode();
			ZPP_Flags.internal = false;
		}
		let tmp = ZPP_Flags.InertiaMode_DEFAULT;
		if(ZPP_Flags.InertiaMode_FIXED == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.InertiaMode_FIXED = new InertiaMode();
			ZPP_Flags.internal = false;
		}
		return [tmp,ZPP_Flags.InertiaMode_FIXED][this.zpp_inner.inertiaMode];
	}
	get_constraintInertia() {
		if(!this.zpp_inner.world) {
			this.zpp_inner.validate_inertia();
		}
		return this.zpp_inner.sinertia;
	}
	get_inertia() {
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world has no inertia");
		}
		this.zpp_inner.validate_inertia();
		let tmp;
		if(this.zpp_inner.inertiaMode == ZPP_Flags.id_InertiaMode_DEFAULT) {
			let _this = this.zpp_inner.wrap_shapes;
			tmp = _this.zpp_inner.inner.head == null;
		} else {
			tmp = false;
		}
		if(tmp) {
			throw haxe_Exception.thrown("Error: Given current inertia mode flag, Body::inertia only makes sense if Body contains Shapes");
		}
		return this.zpp_inner.cinertia;
	}
	set_inertia(inertia) {
		this.zpp_inner.immutable_midstep("Body::inertia");
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		if(inertia != inertia) {
			throw haxe_Exception.thrown("Error: Inertia cannot be NaN");
		}
		if(inertia <= 0) {
			throw haxe_Exception.thrown("Error: Inertia must be strictly positive");
		}
		if(inertia >= Infinity) {
			throw haxe_Exception.thrown("Error: Inertia cannot be infinite, use allowRotation = false instead");
		}
		this.zpp_inner.inertiaMode = ZPP_Flags.id_InertiaMode_FIXED;
		this.zpp_inner.cinertia = inertia;
		this.zpp_inner.invalidate_inertia();
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world has no inertia");
		}
		this.zpp_inner.validate_inertia();
		let tmp;
		if(this.zpp_inner.inertiaMode == ZPP_Flags.id_InertiaMode_DEFAULT) {
			let _this = this.zpp_inner.wrap_shapes;
			tmp = _this.zpp_inner.inner.head == null;
		} else {
			tmp = false;
		}
		if(tmp) {
			throw haxe_Exception.thrown("Error: Given current inertia mode flag, Body::inertia only makes sense if Body contains Shapes");
		}
		return this.zpp_inner.cinertia;
	}
	connectedBodies(depth,output) {
		if(depth == null) {
			depth = -1;
		}
		return this.zpp_inner.connectedBodies(depth,output);
	}
	interactingBodies(type,depth,output) {
		if(depth == null) {
			depth = -1;
		}
		let arbiter_type;
		if(type == null) {
			arbiter_type = ZPP_Arbiter.COL | ZPP_Arbiter.SENSOR | ZPP_Arbiter.FLUID;
		} else {
			if(ZPP_Flags.InteractionType_COLLISION == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_COLLISION = new InteractionType();
				ZPP_Flags.internal = false;
			}
			if(type == ZPP_Flags.InteractionType_COLLISION) {
				arbiter_type = ZPP_Arbiter.COL;
			} else {
				if(ZPP_Flags.InteractionType_SENSOR == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.InteractionType_SENSOR = new InteractionType();
					ZPP_Flags.internal = false;
				}
				arbiter_type = type == ZPP_Flags.InteractionType_SENSOR ? ZPP_Arbiter.SENSOR : ZPP_Arbiter.FLUID;
			}
		}
		return this.zpp_inner.interactingBodies(arbiter_type,depth,output);
	}
	crushFactor() {
		if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) == null) {
			throw haxe_Exception.thrown("Error: Makes no sense to see how much an object not taking part in a simulation is being crushed");
		}
		let msum = 0.0;
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
			ret1.x = 0;
			ret1.y = 0;
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
			let tmp;
			if(ret != null && ret.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = ret.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			if(ret.zpp_inner.x == 0) {
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = ret.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				tmp = ret.zpp_inner.y == 0;
			} else {
				tmp = false;
			}
			if(!tmp) {
				ret.zpp_inner.x = 0;
				ret.zpp_inner.y = 0;
				let _this = ret.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
		}
		ret.zpp_inner.weak = false;
		let jsum = ret;
		if(this.zpp_inner.wrap_arbiters == null) {
			this.zpp_inner.wrap_arbiters = ZPP_ArbiterList.get(this.zpp_inner.arbiters,true);
		}
		let _g = this.zpp_inner.wrap_arbiters.iterator();
		while(true) {
			_g.zpp_inner.zpp_inner.valmod();
			let length = _g.zpp_inner.zpp_gl();
			_g.zpp_critical = true;
			let tmp;
			if(_g.zpp_i < length) {
				tmp = true;
			} else {
				_g.zpp_next = ArbiterIterator.zpp_pool;
				ArbiterIterator.zpp_pool = _g;
				_g.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g.zpp_critical = false;
			let arb = _g.zpp_inner.at(_g.zpp_i++);
			let imp3 = arb.totalImpulse(this);
			let imp = imp3.xy();
			jsum.addeq(imp);
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = imp.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let msum1 = imp.zpp_inner.x;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = imp.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			let msum2 = msum1 * imp.zpp_inner.x;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = imp.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			let msum3 = imp.zpp_inner.y;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = imp.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			msum += Math.sqrt(msum2 + msum3 * imp.zpp_inner.y);
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this4 = imp.zpp_inner;
			if(_this4._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this4._isimmutable != null) {
				_this4._isimmutable();
			}
			if(imp.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = imp.zpp_inner;
			imp.zpp_inner.outer = null;
			imp.zpp_inner = null;
			let o = imp;
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
			imp3.dispose();
		}
		if(this.zpp_inner.wrap_constraints == null) {
			this.zpp_inner.wrap_constraints = ZPP_ConstraintList.get(this.zpp_inner.constraints,true);
		}
		let _this = this.zpp_inner.wrap_constraints;
		_this.zpp_inner.valmod();
		let _g1 = ConstraintIterator.get(_this);
		while(true) {
			_g1.zpp_inner.zpp_inner.valmod();
			let _this = _g1.zpp_inner;
			_this.zpp_inner.valmod();
			if(_this.zpp_inner.zip_length) {
				_this.zpp_inner.zip_length = false;
				_this.zpp_inner.user_length = _this.zpp_inner.inner.length;
			}
			let length = _this.zpp_inner.user_length;
			_g1.zpp_critical = true;
			let tmp;
			if(_g1.zpp_i < length) {
				tmp = true;
			} else {
				_g1.zpp_next = ConstraintIterator.zpp_pool;
				ConstraintIterator.zpp_pool = _g1;
				_g1.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g1.zpp_critical = false;
			let con = _g1.zpp_inner.at(_g1.zpp_i++);
			let imp3 = con.bodyImpulse(this);
			let imp = imp3.xy();
			jsum.addeq(imp);
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = imp.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			let msum1 = imp.zpp_inner.x;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = imp.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			let msum2 = msum1 * imp.zpp_inner.x;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = imp.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			let msum3 = imp.zpp_inner.y;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this4 = imp.zpp_inner;
			if(_this4._validate != null) {
				_this4._validate();
			}
			msum += Math.sqrt(msum2 + msum3 * imp.zpp_inner.y);
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this5 = imp.zpp_inner;
			if(_this5._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this5._isimmutable != null) {
				_this5._isimmutable();
			}
			if(imp.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = imp.zpp_inner;
			imp.zpp_inner.outer = null;
			imp.zpp_inner = null;
			let o = imp;
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
			imp3.dispose();
		}
		if(jsum != null && jsum.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(jsum != null && jsum.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = jsum.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let ret1 = jsum.zpp_inner.x;
		if(jsum != null && jsum.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = jsum.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let ret2 = ret1 * jsum.zpp_inner.x;
		if(jsum != null && jsum.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = jsum.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let ret3 = jsum.zpp_inner.y;
		if(jsum != null && jsum.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = jsum.zpp_inner;
		if(_this4._validate != null) {
			_this4._validate();
		}
		let ret4 = msum - Math.sqrt(ret2 + ret3 * jsum.zpp_inner.y);
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world has no mass");
		}
		this.zpp_inner.validate_mass();
		if(this.zpp_inner.massMode == ZPP_Flags.id_MassMode_DEFAULT && this.zpp_inner.shapes.head == null) {
			throw haxe_Exception.thrown("Error: Given current mass mode, Body::mass only makes sense if it contains shapes");
		}
		let ret5 = ret4 / (this.zpp_inner.cmass * (this.zpp_inner.space == null ? null : this.zpp_inner.space.outer).zpp_inner.pre_dt);
		if(jsum != null && jsum.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this5 = jsum.zpp_inner;
		if(_this5._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this5._isimmutable != null) {
			_this5._isimmutable();
		}
		if(jsum.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner = jsum.zpp_inner;
		jsum.zpp_inner.outer = null;
		jsum.zpp_inner = null;
		let o = jsum;
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
		return ret5;
	}
	localPointToWorld(point,weak) {
		if(weak == null) {
			weak = false;
		}
		if(point != null && point.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(point == null) {
			throw haxe_Exception.thrown("Error: Cannot transform null Vec2");
		}
		let _this = this.zpp_inner;
		if(_this.zip_axis) {
			_this.zip_axis = false;
			_this.axisx = Math.sin(_this.rot);
			_this.axisy = Math.cos(_this.rot);
		}
		let tempx = 0.0;
		let tempy = 0.0;
		let tempx1 = this.zpp_inner.axisy;
		if(point != null && point.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = point.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let tempx2 = tempx1 * point.zpp_inner.x;
		let tempx3 = this.zpp_inner.axisx;
		if(point != null && point.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = point.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		tempx = tempx2 - tempx3 * point.zpp_inner.y;
		if(point != null && point.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = point.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let tempy1 = point.zpp_inner.x * this.zpp_inner.axisx;
		if(point != null && point.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = point.zpp_inner;
		if(_this4._validate != null) {
			_this4._validate();
		}
		tempy = tempy1 + point.zpp_inner.y * this.zpp_inner.axisy;
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
		let x = tempx + this.zpp_inner.posx;
		let y = tempy + this.zpp_inner.posy;
		let weak1 = weak;
		if(weak1 == null) {
			weak1 = false;
		}
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
		ret.zpp_inner.weak = weak1;
		return ret;
	}
	worldPointToLocal(point,weak) {
		if(weak == null) {
			weak = false;
		}
		if(point != null && point.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(point == null) {
			throw haxe_Exception.thrown("Error: Cannot transform null Vec2");
		}
		let _this = this.zpp_inner;
		if(_this.zip_axis) {
			_this.zip_axis = false;
			_this.axisx = Math.sin(_this.rot);
			_this.axisy = Math.cos(_this.rot);
		}
		let tempx = 0.0;
		let tempy = 0.0;
		let pointx = 0.0;
		let pointy = 0.0;
		if(point != null && point.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = point.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		pointx = point.zpp_inner.x - this.zpp_inner.posx;
		if(point != null && point.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = point.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		pointy = point.zpp_inner.y - this.zpp_inner.posy;
		tempx = pointx * this.zpp_inner.axisy + pointy * this.zpp_inner.axisx;
		tempy = pointy * this.zpp_inner.axisy - pointx * this.zpp_inner.axisx;
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
		let x = tempx;
		let y = tempy;
		let weak1 = weak;
		if(weak1 == null) {
			weak1 = false;
		}
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
		ret.zpp_inner.weak = weak1;
		return ret;
	}
	localVectorToWorld(vector,weak) {
		if(weak == null) {
			weak = false;
		}
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(vector == null) {
			throw haxe_Exception.thrown("Error: Cannot transform null Vec2");
		}
		let _this = this.zpp_inner;
		if(_this.zip_axis) {
			_this.zip_axis = false;
			_this.axisx = Math.sin(_this.rot);
			_this.axisy = Math.cos(_this.rot);
		}
		let tempx = 0.0;
		let tempy = 0.0;
		let tempx1 = this.zpp_inner.axisy;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = vector.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let tempx2 = tempx1 * vector.zpp_inner.x;
		let tempx3 = this.zpp_inner.axisx;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = vector.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		tempx = tempx2 - tempx3 * vector.zpp_inner.y;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = vector.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let tempy1 = vector.zpp_inner.x * this.zpp_inner.axisx;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = vector.zpp_inner;
		if(_this4._validate != null) {
			_this4._validate();
		}
		tempy = tempy1 + vector.zpp_inner.y * this.zpp_inner.axisy;
		if(vector.zpp_inner.weak) {
			if(vector != null && vector.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = vector.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(vector.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = vector.zpp_inner;
			vector.zpp_inner.outer = null;
			vector.zpp_inner = null;
			let o = vector;
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
		let x = tempx;
		let y = tempy;
		let weak1 = weak;
		if(weak1 == null) {
			weak1 = false;
		}
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
		ret.zpp_inner.weak = weak1;
		return ret;
	}
	worldVectorToLocal(vector,weak) {
		if(weak == null) {
			weak = false;
		}
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(vector == null) {
			throw haxe_Exception.thrown("Error: Cannot transform null Vec2");
		}
		let _this = this.zpp_inner;
		if(_this.zip_axis) {
			_this.zip_axis = false;
			_this.axisx = Math.sin(_this.rot);
			_this.axisy = Math.cos(_this.rot);
		}
		let tempx = 0.0;
		let tempy = 0.0;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = vector.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let tempx1 = vector.zpp_inner.x * this.zpp_inner.axisy;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = vector.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		tempx = tempx1 + vector.zpp_inner.y * this.zpp_inner.axisx;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = vector.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let tempy1 = vector.zpp_inner.y * this.zpp_inner.axisy;
		if(vector != null && vector.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this4 = vector.zpp_inner;
		if(_this4._validate != null) {
			_this4._validate();
		}
		tempy = tempy1 - vector.zpp_inner.x * this.zpp_inner.axisx;
		if(vector.zpp_inner.weak) {
			if(vector != null && vector.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = vector.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(vector.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = vector.zpp_inner;
			vector.zpp_inner.outer = null;
			vector.zpp_inner = null;
			let o = vector;
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
		let x = tempx;
		let y = tempy;
		let weak1 = weak;
		if(weak1 == null) {
			weak1 = false;
		}
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
		ret.zpp_inner.weak = weak1;
		return ret;
	}
	applyImpulse(impulse,pos,sleepable) {
		if(sleepable == null) {
			sleepable = false;
		}
		if(impulse != null && impulse.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(pos != null && pos.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		if(impulse == null) {
			throw haxe_Exception.thrown("Error: Cannot apply null impulse to Body");
		}
		let tmp;
		if(sleepable) {
			if(this.zpp_inner.space == null) {
				throw haxe_Exception.thrown("Error: isSleeping makes no sense if the object is not contained within a Space");
			}
			tmp = this.zpp_inner.component.sleeping;
		} else {
			tmp = false;
		}
		if(tmp) {
			if(impulse.zpp_inner.weak) {
				if(impulse != null && impulse.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = impulse.zpp_inner;
				if(_this._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this._isimmutable != null) {
					_this._isimmutable();
				}
				if(impulse.zpp_inner._inuse) {
					throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
				}
				let inner = impulse.zpp_inner;
				impulse.zpp_inner.outer = null;
				impulse.zpp_inner = null;
				let o = impulse;
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
			if(pos != null) {
				if(pos.zpp_inner.weak) {
					if(pos != null && pos.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this = pos.zpp_inner;
					if(_this._immutable) {
						throw haxe_Exception.thrown("Error: Vec2 is immutable");
					}
					if(_this._isimmutable != null) {
						_this._isimmutable();
					}
					if(pos.zpp_inner._inuse) {
						throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
					}
					let inner = pos.zpp_inner;
					pos.zpp_inner.outer = null;
					pos.zpp_inner = null;
					let o = pos;
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
			return this;
		}
		this.zpp_inner.validate_mass();
		let t = this.zpp_inner.imass;
		let fh = this.zpp_inner;
		let fh1 = fh.velx;
		if(impulse != null && impulse.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = impulse.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		fh.velx = fh1 + impulse.zpp_inner.x * t;
		let fh2 = this.zpp_inner;
		let fh3 = fh2.vely;
		if(impulse != null && impulse.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = impulse.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		fh2.vely = fh3 + impulse.zpp_inner.y * t;
		if(pos != null) {
			let rx = 0.0;
			let ry = 0.0;
			if(pos != null && pos.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = pos.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			rx = pos.zpp_inner.x - this.zpp_inner.posx;
			if(pos != null && pos.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = pos.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			ry = pos.zpp_inner.y - this.zpp_inner.posy;
			this.zpp_inner.validate_inertia();
			let fh = this.zpp_inner;
			let fh1 = fh.angvel;
			if(impulse != null && impulse.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = impulse.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			let tmp = impulse.zpp_inner.y * rx;
			if(impulse != null && impulse.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = impulse.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			fh.angvel = fh1 + (tmp - impulse.zpp_inner.x * ry) * this.zpp_inner.iinertia;
			if(pos.zpp_inner.weak) {
				if(pos != null && pos.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = pos.zpp_inner;
				if(_this._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this._isimmutable != null) {
					_this._isimmutable();
				}
				if(pos.zpp_inner._inuse) {
					throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
				}
				let inner = pos.zpp_inner;
				pos.zpp_inner.outer = null;
				pos.zpp_inner = null;
				let o = pos;
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
		if(!sleepable) {
			if(this.zpp_inner.type == ZPP_Flags.id_BodyType_DYNAMIC) {
				this.zpp_inner.wake();
			}
		}
		if(impulse.zpp_inner.weak) {
			if(impulse != null && impulse.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = impulse.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(impulse.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = impulse.zpp_inner;
			impulse.zpp_inner.outer = null;
			impulse.zpp_inner = null;
			let o = impulse;
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
		return this;
	}
	applyAngularImpulse(impulse,sleepable) {
		if(sleepable == null) {
			sleepable = false;
		}
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		let tmp;
		if(sleepable) {
			if(this.zpp_inner.space == null) {
				throw haxe_Exception.thrown("Error: isSleeping makes no sense if the object is not contained within a Space");
			}
			tmp = this.zpp_inner.component.sleeping;
		} else {
			tmp = false;
		}
		if(tmp) {
			return this;
		}
		this.zpp_inner.validate_inertia();
		this.zpp_inner.angvel += impulse * this.zpp_inner.iinertia;
		if(!sleepable) {
			if(this.zpp_inner.type == ZPP_Flags.id_BodyType_DYNAMIC) {
				this.zpp_inner.wake();
			}
		}
		return this;
	}
	translateShapes(translation) {
		this.zpp_inner.immutable_midstep("Body::translateShapes()");
		if(translation != null && translation.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		if(translation == null) {
			throw haxe_Exception.thrown("Error: Cannot displace by null Vec2");
		}
		let weak = translation.zpp_inner.weak;
		translation.zpp_inner.weak = false;
		let cx_ite = this.zpp_inner.shapes.head;
		while(cx_ite != null) {
			let s = cx_ite.elt;
			s.outer.translate(translation);
			cx_ite = cx_ite.next;
		}
		translation.zpp_inner.weak = weak;
		if(translation.zpp_inner.weak) {
			if(translation != null && translation.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = translation.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(translation.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = translation.zpp_inner;
			translation.zpp_inner.outer = null;
			translation.zpp_inner = null;
			let o = translation;
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
		return this;
	}
	rotateShapes(angle) {
		this.zpp_inner.immutable_midstep("Body::rotateShapes()");
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		let cx_ite = this.zpp_inner.shapes.head;
		while(cx_ite != null) {
			let s = cx_ite.elt;
			s.outer.rotate(angle);
			cx_ite = cx_ite.next;
		}
		return this;
	}
	scaleShapes(scaleX,scaleY) {
		this.zpp_inner.immutable_midstep("Body::scaleShapes()");
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		let cx_ite = this.zpp_inner.shapes.head;
		while(cx_ite != null) {
			let s = cx_ite.elt;
			s.outer.scale(scaleX,scaleY);
			cx_ite = cx_ite.next;
		}
		return this;
	}
	transformShapes(matrix) {
		this.zpp_inner.immutable_midstep("Body::transformShapes()");
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		let cx_ite = this.zpp_inner.shapes.head;
		while(cx_ite != null) {
			let s = cx_ite.elt;
			s.outer.transform(matrix);
			cx_ite = cx_ite.next;
		}
		return this;
	}
	align() {
		this.zpp_inner.immutable_midstep("Body::align()");
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		if(this.zpp_inner.shapes.head == null) {
			throw haxe_Exception.thrown("Error: Cannot align empty Body");
		}
		this.zpp_inner.validate_localCOM();
		let x = -this.zpp_inner.localCOMx;
		let y = -this.zpp_inner.localCOMy;
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
		let dx = ret;
		this.translateShapes(dx);
		let dx2 = this.localVectorToWorld(dx);
		if(this.zpp_inner.wrap_pos == null) {
			this.zpp_inner.setupPosition();
		}
		this.zpp_inner.wrap_pos.subeq(dx2);
		if(this.zpp_inner.pre_posx < Infinity) {
			let t = 1.0;
			let fh = this.zpp_inner;
			let fh1 = fh.pre_posx;
			if(dx2 != null && dx2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = dx2.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			fh.pre_posx = fh1 - dx2.zpp_inner.x * t;
			let fh2 = this.zpp_inner;
			let fh3 = fh2.pre_posy;
			if(dx2 != null && dx2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = dx2.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			fh2.pre_posy = fh3 - dx2.zpp_inner.y * t;
		}
		if(dx != null && dx.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = dx.zpp_inner;
		if(_this._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this._isimmutable != null) {
			_this._isimmutable();
		}
		if(dx.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner = dx.zpp_inner;
		dx.zpp_inner.outer = null;
		dx.zpp_inner = null;
		let o = dx;
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
		if(dx2 != null && dx2.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = dx2.zpp_inner;
		if(_this1._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this1._isimmutable != null) {
			_this1._isimmutable();
		}
		if(dx2.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner1 = dx2.zpp_inner;
		dx2.zpp_inner.outer = null;
		dx2.zpp_inner = null;
		let o2 = dx2;
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
		return this;
	}
	rotate(centre,angle) {
		if(centre != null && centre.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(centre == null) {
			throw haxe_Exception.thrown("Error: Cannot rotate about a null Vec2");
		}
		if(angle != angle) {
			throw haxe_Exception.thrown("Error: Cannot rotate by NaN radians");
		}
		let weak = centre.zpp_inner.weak;
		centre.zpp_inner.weak = false;
		if(this.zpp_inner.wrap_pos == null) {
			this.zpp_inner.setupPosition();
		}
		let del = this.zpp_inner.wrap_pos.sub(centre);
		del.rotate(angle);
		let position = centre.add(del,true);
		if(position != null && position.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(position == null) {
			throw haxe_Exception.thrown("Error: Body::" + "position" + " cannot be null");
		}
		if(this.zpp_inner.wrap_pos == null) {
			this.zpp_inner.setupPosition();
		}
		let _this = this.zpp_inner.wrap_pos;
		if(_this != null && _this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(position != null && position.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = _this.zpp_inner;
		if(_this1._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this1._isimmutable != null) {
			_this1._isimmutable();
		}
		if(position == null) {
			throw haxe_Exception.thrown("Error: Cannot assign null Vec2");
		}
		if(position != null && position.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this2 = position.zpp_inner;
		if(_this2._validate != null) {
			_this2._validate();
		}
		let x = position.zpp_inner.x;
		if(position != null && position.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this3 = position.zpp_inner;
		if(_this3._validate != null) {
			_this3._validate();
		}
		let y = position.zpp_inner.y;
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
		if(this.zpp_inner.wrap_pos == null) {
			this.zpp_inner.setupPosition();
		}
		if(del != null && del.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this6 = del.zpp_inner;
		if(_this6._immutable) {
			throw haxe_Exception.thrown("Error: Vec2 is immutable");
		}
		if(_this6._isimmutable != null) {
			_this6._isimmutable();
		}
		if(del.zpp_inner._inuse) {
			throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
		}
		let inner = del.zpp_inner;
		del.zpp_inner.outer = null;
		del.zpp_inner = null;
		let o = del;
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
		let rotation = this.zpp_inner.rot + angle;
		this.zpp_inner.immutable_midstep("Body::rotation");
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		if(this.zpp_inner.type == ZPP_Flags.id_BodyType_STATIC && this.zpp_inner.space != null) {
			throw haxe_Exception.thrown("Error: Static objects cannot be rotated once inside a Space");
		}
		if(this.zpp_inner.rot != rotation) {
			if(rotation != rotation) {
				throw haxe_Exception.thrown("Error: Body::rotation cannot be NaN");
			}
			this.zpp_inner.rot = rotation;
			let _this = this.zpp_inner;
			_this.zip_axis = true;
			let cx_ite = _this.shapes.head;
			while(cx_ite != null) {
				let s = cx_ite.elt;
				if(s.type == ZPP_Flags.id_ShapeType_POLYGON) {
					s.polygon.invalidate_gverts();
					s.polygon.invalidate_gaxi();
				}
				s.invalidate_worldCOM();
				cx_ite = cx_ite.next;
			}
			_this.zip_worldCOM = true;
			this.zpp_inner.wake();
		}
		centre.zpp_inner.weak = weak;
		if(centre.zpp_inner.weak) {
			if(centre != null && centre.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = centre.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(centre.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = centre.zpp_inner;
			centre.zpp_inner.outer = null;
			centre.zpp_inner = null;
			let o = centre;
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
		return this;
	}
	setShapeMaterials(material) {
		this.zpp_inner.immutable_midstep("Body::setShapeMaterials()");
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		let cx_ite = this.zpp_inner.shapes.head;
		while(cx_ite != null) {
			let s = cx_ite.elt;
			let _this = s.outer;
			_this.zpp_inner.immutable_midstep("Shape::material");
			if(material == null) {
				throw haxe_Exception.thrown("Error: Cannot assign null as Shape material");
			}
			_this.zpp_inner.setMaterial(material.zpp_inner);
			_this.zpp_inner.material.wrapper();
			cx_ite = cx_ite.next;
		}
		return this;
	}
	setShapeFilters(filter) {
		this.zpp_inner.immutable_midstep("Body::setShapeFilters()");
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		let cx_ite = this.zpp_inner.shapes.head;
		while(cx_ite != null) {
			let s = cx_ite.elt;
			let _this = s.outer;
			_this.zpp_inner.immutable_midstep("Shape::filter");
			if(filter == null) {
				throw haxe_Exception.thrown("Error: Cannot assign null as Shape filter");
			}
			_this.zpp_inner.setFilter(filter.zpp_inner);
			_this.zpp_inner.filter.wrapper();
			cx_ite = cx_ite.next;
		}
		return this;
	}
	setShapeFluidProperties(fluidProperties) {
		this.zpp_inner.immutable_midstep("Body::setShapeFluidProperties()");
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world is immutable");
		}
		let cx_ite = this.zpp_inner.shapes.head;
		while(cx_ite != null) {
			let s = cx_ite.elt;
			let _this = s.outer;
			if(fluidProperties == null) {
				throw haxe_Exception.thrown("Error: Cannot assign null as Shape fluidProperties, disable fluids by setting fluidEnabled to false");
			}
			_this.zpp_inner.setFluid(fluidProperties.zpp_inner);
			_this.zpp_inner.immutable_midstep("Shape::fluidProperties");
			if(_this.zpp_inner.fluidProperties == null) {
				_this.zpp_inner.setFluid(new FluidProperties().zpp_inner);
			}
			_this.zpp_inner.fluidProperties.wrapper();
			cx_ite = cx_ite.next;
		}
		return this;
	}
	get_localCOM() {
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world has no " + "localCOM");
		}
		if(this.zpp_inner.wrap_localCOM == null) {
			let x = this.zpp_inner.localCOMx;
			let y = this.zpp_inner.localCOMy;
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
			this.zpp_inner.wrap_localCOM = ret;
			this.zpp_inner.wrap_localCOM.zpp_inner._inuse = true;
			this.zpp_inner.wrap_localCOM.zpp_inner._immutable = true;
			this.zpp_inner.wrap_localCOM.zpp_inner._validate = ($_=this.zpp_inner,$bind($_,$_.getlocalCOM));
		}
		return this.zpp_inner.wrap_localCOM;
	}
	get_worldCOM() {
		if(this.zpp_inner.world) {
			throw haxe_Exception.thrown("Error: Space::world has no " + "worldCOM");
		}
		if(this.zpp_inner.wrap_worldCOM == null) {
			let x = this.zpp_inner.worldCOMx;
			let y = this.zpp_inner.worldCOMy;
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
			this.zpp_inner.wrap_worldCOM = ret;
			this.zpp_inner.wrap_worldCOM.zpp_inner._inuse = true;
			this.zpp_inner.wrap_worldCOM.zpp_inner._immutable = true;
			this.zpp_inner.wrap_worldCOM.zpp_inner._validate = ($_=this.zpp_inner,$bind($_,$_.getworldCOM));
		}
		return this.zpp_inner.wrap_worldCOM;
	}
	normalImpulse(body,freshOnly) {
		if(freshOnly == null) {
			freshOnly = false;
		}
		let retx = 0;
		let rety = 0;
		let retz = 0;
		let arbs = this.zpp_inner.arbiters;
		if(this.zpp_inner.wrap_arbiters == null) {
			this.zpp_inner.wrap_arbiters = ZPP_ArbiterList.get(this.zpp_inner.arbiters,true);
		}
		let _g = this.zpp_inner.wrap_arbiters.iterator();
		while(true) {
			_g.zpp_inner.zpp_inner.valmod();
			let length = _g.zpp_inner.zpp_gl();
			_g.zpp_critical = true;
			let tmp;
			if(_g.zpp_i < length) {
				tmp = true;
			} else {
				_g.zpp_next = ArbiterIterator.zpp_pool;
				ArbiterIterator.zpp_pool = _g;
				_g.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g.zpp_critical = false;
			let oarb = _g.zpp_inner.at(_g.zpp_i++);
			let arb = oarb.zpp_inner;
			if(arb.type != ZPP_Arbiter.COL) {
				continue;
			}
			if(body != null && arb.b2 != body.zpp_inner && arb.b1 != body.zpp_inner) {
				continue;
			}
			let _this = arb.wrapper();
			let imp = (_this.zpp_inner.type == ZPP_Arbiter.COL ? _this.zpp_inner.colarb.outer_zn : null).normalImpulse(this,freshOnly);
			let t = 1;
			let t1 = t;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this1 = imp.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			retx += imp.zpp_inner.x * t1;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this2 = imp.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			rety += imp.zpp_inner.y * t1;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this3 = imp.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			retz += imp.zpp_inner.z * t;
			imp.dispose();
		}
		return Vec3.get(retx,rety,retz);
	}
	tangentImpulse(body,freshOnly) {
		if(freshOnly == null) {
			freshOnly = false;
		}
		let retx = 0;
		let rety = 0;
		let retz = 0;
		let arbs = this.zpp_inner.arbiters;
		if(this.zpp_inner.wrap_arbiters == null) {
			this.zpp_inner.wrap_arbiters = ZPP_ArbiterList.get(this.zpp_inner.arbiters,true);
		}
		let _g = this.zpp_inner.wrap_arbiters.iterator();
		while(true) {
			_g.zpp_inner.zpp_inner.valmod();
			let length = _g.zpp_inner.zpp_gl();
			_g.zpp_critical = true;
			let tmp;
			if(_g.zpp_i < length) {
				tmp = true;
			} else {
				_g.zpp_next = ArbiterIterator.zpp_pool;
				ArbiterIterator.zpp_pool = _g;
				_g.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g.zpp_critical = false;
			let oarb = _g.zpp_inner.at(_g.zpp_i++);
			let arb = oarb.zpp_inner;
			if(arb.type != ZPP_Arbiter.COL) {
				continue;
			}
			if(body != null && arb.b2 != body.zpp_inner && arb.b1 != body.zpp_inner) {
				continue;
			}
			let _this = arb.wrapper();
			let imp = (_this.zpp_inner.type == ZPP_Arbiter.COL ? _this.zpp_inner.colarb.outer_zn : null).tangentImpulse(this,freshOnly);
			let t = 1;
			let t1 = t;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this1 = imp.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			retx += imp.zpp_inner.x * t1;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this2 = imp.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			rety += imp.zpp_inner.y * t1;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this3 = imp.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			retz += imp.zpp_inner.z * t;
			imp.dispose();
		}
		return Vec3.get(retx,rety,retz);
	}
	totalContactsImpulse(body,freshOnly) {
		if(freshOnly == null) {
			freshOnly = false;
		}
		let retx = 0;
		let rety = 0;
		let retz = 0;
		let arbs = this.zpp_inner.arbiters;
		if(this.zpp_inner.wrap_arbiters == null) {
			this.zpp_inner.wrap_arbiters = ZPP_ArbiterList.get(this.zpp_inner.arbiters,true);
		}
		let _g = this.zpp_inner.wrap_arbiters.iterator();
		while(true) {
			_g.zpp_inner.zpp_inner.valmod();
			let length = _g.zpp_inner.zpp_gl();
			_g.zpp_critical = true;
			let tmp;
			if(_g.zpp_i < length) {
				tmp = true;
			} else {
				_g.zpp_next = ArbiterIterator.zpp_pool;
				ArbiterIterator.zpp_pool = _g;
				_g.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g.zpp_critical = false;
			let oarb = _g.zpp_inner.at(_g.zpp_i++);
			let arb = oarb.zpp_inner;
			if(arb.type != ZPP_Arbiter.COL) {
				continue;
			}
			if(body != null && arb.b2 != body.zpp_inner && arb.b1 != body.zpp_inner) {
				continue;
			}
			let _this = arb.wrapper();
			let imp = (_this.zpp_inner.type == ZPP_Arbiter.COL ? _this.zpp_inner.colarb.outer_zn : null).totalImpulse(this,freshOnly);
			let t = 1;
			let t1 = t;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this1 = imp.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			retx += imp.zpp_inner.x * t1;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this2 = imp.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			rety += imp.zpp_inner.y * t1;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this3 = imp.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			retz += imp.zpp_inner.z * t;
			imp.dispose();
		}
		return Vec3.get(retx,rety,retz);
	}
	rollingImpulse(body,freshOnly) {
		if(freshOnly == null) {
			freshOnly = false;
		}
		let ret = 0.0;
		let arbs = this.zpp_inner.arbiters;
		if(this.zpp_inner.wrap_arbiters == null) {
			this.zpp_inner.wrap_arbiters = ZPP_ArbiterList.get(this.zpp_inner.arbiters,true);
		}
		let _g = this.zpp_inner.wrap_arbiters.iterator();
		while(true) {
			_g.zpp_inner.zpp_inner.valmod();
			let length = _g.zpp_inner.zpp_gl();
			_g.zpp_critical = true;
			let tmp;
			if(_g.zpp_i < length) {
				tmp = true;
			} else {
				_g.zpp_next = ArbiterIterator.zpp_pool;
				ArbiterIterator.zpp_pool = _g;
				_g.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g.zpp_critical = false;
			let oarb = _g.zpp_inner.at(_g.zpp_i++);
			let arb = oarb.zpp_inner;
			if(arb.type != ZPP_Arbiter.COL) {
				continue;
			}
			if(body != null && arb.b2 != body.zpp_inner && arb.b1 != body.zpp_inner) {
				continue;
			}
			let _this = arb.wrapper();
			ret += (_this.zpp_inner.type == ZPP_Arbiter.COL ? _this.zpp_inner.colarb.outer_zn : null).rollingImpulse(this,freshOnly);
		}
		return ret;
	}
	buoyancyImpulse(body) {
		let retx = 0;
		let rety = 0;
		let retz = 0;
		let arbs = this.zpp_inner.arbiters;
		if(this.zpp_inner.wrap_arbiters == null) {
			this.zpp_inner.wrap_arbiters = ZPP_ArbiterList.get(this.zpp_inner.arbiters,true);
		}
		let _g = this.zpp_inner.wrap_arbiters.iterator();
		while(true) {
			_g.zpp_inner.zpp_inner.valmod();
			let length = _g.zpp_inner.zpp_gl();
			_g.zpp_critical = true;
			let tmp;
			if(_g.zpp_i < length) {
				tmp = true;
			} else {
				_g.zpp_next = ArbiterIterator.zpp_pool;
				ArbiterIterator.zpp_pool = _g;
				_g.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g.zpp_critical = false;
			let oarb = _g.zpp_inner.at(_g.zpp_i++);
			let arb = oarb.zpp_inner;
			if(arb.type != ZPP_Arbiter.FLUID) {
				continue;
			}
			if(body != null && arb.b2 != body.zpp_inner && arb.b1 != body.zpp_inner) {
				continue;
			}
			let _this = arb.wrapper();
			let imp = (_this.zpp_inner.type == ZPP_Arbiter.FLUID ? _this.zpp_inner.fluidarb.outer_zn : null).buoyancyImpulse(this);
			let t = 1;
			let t1 = t;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this1 = imp.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			retx += imp.zpp_inner.x * t1;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this2 = imp.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			rety += imp.zpp_inner.y * t1;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this3 = imp.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			retz += imp.zpp_inner.z * t;
			imp.dispose();
		}
		return Vec3.get(retx,rety,retz);
	}
	dragImpulse(body) {
		let retx = 0;
		let rety = 0;
		let retz = 0;
		let arbs = this.zpp_inner.arbiters;
		if(this.zpp_inner.wrap_arbiters == null) {
			this.zpp_inner.wrap_arbiters = ZPP_ArbiterList.get(this.zpp_inner.arbiters,true);
		}
		let _g = this.zpp_inner.wrap_arbiters.iterator();
		while(true) {
			_g.zpp_inner.zpp_inner.valmod();
			let length = _g.zpp_inner.zpp_gl();
			_g.zpp_critical = true;
			let tmp;
			if(_g.zpp_i < length) {
				tmp = true;
			} else {
				_g.zpp_next = ArbiterIterator.zpp_pool;
				ArbiterIterator.zpp_pool = _g;
				_g.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g.zpp_critical = false;
			let oarb = _g.zpp_inner.at(_g.zpp_i++);
			let arb = oarb.zpp_inner;
			if(arb.type != ZPP_Arbiter.FLUID) {
				continue;
			}
			if(body != null && arb.b2 != body.zpp_inner && arb.b1 != body.zpp_inner) {
				continue;
			}
			let _this = arb.wrapper();
			let imp = (_this.zpp_inner.type == ZPP_Arbiter.FLUID ? _this.zpp_inner.fluidarb.outer_zn : null).dragImpulse(this);
			let t = 1;
			let t1 = t;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this1 = imp.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			retx += imp.zpp_inner.x * t1;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this2 = imp.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			rety += imp.zpp_inner.y * t1;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this3 = imp.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			retz += imp.zpp_inner.z * t;
			imp.dispose();
		}
		return Vec3.get(retx,rety,retz);
	}
	totalFluidImpulse(body) {
		let retx = 0;
		let rety = 0;
		let retz = 0;
		let arbs = this.zpp_inner.arbiters;
		if(this.zpp_inner.wrap_arbiters == null) {
			this.zpp_inner.wrap_arbiters = ZPP_ArbiterList.get(this.zpp_inner.arbiters,true);
		}
		let _g = this.zpp_inner.wrap_arbiters.iterator();
		while(true) {
			_g.zpp_inner.zpp_inner.valmod();
			let length = _g.zpp_inner.zpp_gl();
			_g.zpp_critical = true;
			let tmp;
			if(_g.zpp_i < length) {
				tmp = true;
			} else {
				_g.zpp_next = ArbiterIterator.zpp_pool;
				ArbiterIterator.zpp_pool = _g;
				_g.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g.zpp_critical = false;
			let oarb = _g.zpp_inner.at(_g.zpp_i++);
			let arb = oarb.zpp_inner;
			if(arb.type != ZPP_Arbiter.FLUID) {
				continue;
			}
			if(body != null && arb.b2 != body.zpp_inner && arb.b1 != body.zpp_inner) {
				continue;
			}
			let _this = arb.wrapper();
			let imp = (_this.zpp_inner.type == ZPP_Arbiter.FLUID ? _this.zpp_inner.fluidarb.outer_zn : null).totalImpulse(this);
			let t = 1;
			let t1 = t;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this1 = imp.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			retx += imp.zpp_inner.x * t1;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this2 = imp.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			rety += imp.zpp_inner.y * t1;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this3 = imp.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			retz += imp.zpp_inner.z * t;
			imp.dispose();
		}
		return Vec3.get(retx,rety,retz);
	}
	constraintsImpulse() {
		let retx = 0;
		let rety = 0;
		let retz = 0;
		let cx_ite = this.zpp_inner.constraints.head;
		while(cx_ite != null) {
			let con = cx_ite.elt;
			let imp = con.outer.bodyImpulse(this);
			let t = 1;
			let t1 = t;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this = imp.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			retx += imp.zpp_inner.x * t1;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this1 = imp.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			rety += imp.zpp_inner.y * t1;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this2 = imp.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			retz += imp.zpp_inner.z * t;
			imp.dispose();
			cx_ite = cx_ite.next;
		}
		return Vec3.get(retx,rety,retz);
	}
	totalImpulse(body,freshOnly) {
		if(freshOnly == null) {
			freshOnly = false;
		}
		let retx = 0;
		let rety = 0;
		let retz = 0;
		let arbs = this.zpp_inner.arbiters;
		if(this.zpp_inner.wrap_arbiters == null) {
			this.zpp_inner.wrap_arbiters = ZPP_ArbiterList.get(this.zpp_inner.arbiters,true);
		}
		let _g = this.zpp_inner.wrap_arbiters.iterator();
		while(true) {
			_g.zpp_inner.zpp_inner.valmod();
			let length = _g.zpp_inner.zpp_gl();
			_g.zpp_critical = true;
			let tmp;
			if(_g.zpp_i < length) {
				tmp = true;
			} else {
				_g.zpp_next = ArbiterIterator.zpp_pool;
				ArbiterIterator.zpp_pool = _g;
				_g.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g.zpp_critical = false;
			let oarb = _g.zpp_inner.at(_g.zpp_i++);
			let arb = oarb.zpp_inner;
			if(arb.type == ZPP_Arbiter.SENSOR) {
				continue;
			}
			if(body != null && arb.b2 != body.zpp_inner && arb.b1 != body.zpp_inner) {
				continue;
			}
			let imp = arb.wrapper().totalImpulse(this,freshOnly);
			let t = 1;
			let t1 = t;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this = imp.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			retx += imp.zpp_inner.x * t1;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this1 = imp.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			rety += imp.zpp_inner.y * t1;
			if(imp != null && imp.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this2 = imp.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			retz += imp.zpp_inner.z * t;
			imp.dispose();
		}
		let cx_ite = this.zpp_inner.constraints.head;
		while(cx_ite != null) {
			let con = cx_ite.elt;
			if(con.active) {
				let imp = con.outer.bodyImpulse(this);
				let t = 1;
				let t1 = t;
				if(imp != null && imp.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this = imp.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				retx += imp.zpp_inner.x * t1;
				if(imp != null && imp.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this1 = imp.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				rety += imp.zpp_inner.y * t1;
				if(imp != null && imp.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
				}
				let _this2 = imp.zpp_inner;
				if(_this2._validate != null) {
					_this2._validate();
				}
				retz += imp.zpp_inner.z * t;
				imp.dispose();
			}
			cx_ite = cx_ite.next;
		}
		return Vec3.get(retx,rety,retz);
	}
	contains(point) {
		if(point != null && point.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(point == null) {
			throw haxe_Exception.thrown("Error: Cannot check containment of null point");
		}
		let wasWeak = point.zpp_inner.weak;
		point.zpp_inner.weak = false;
		let retvar;
		retvar = false;
		let cx_ite = this.zpp_inner.shapes.head;
		while(cx_ite != null) {
			let s = cx_ite.elt;
			if(s.outer.contains(point)) {
				retvar = true;
				break;
			}
			cx_ite = cx_ite.next;
		}
		point.zpp_inner.weak = wasWeak;
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
		return retvar;
	}
	add(shape) {
		let _this = this.zpp_inner.wrap_shapes;
		if(_this.zpp_inner.reverse_flag) {
			_this.push(shape);
		} else {
			_this.unshift(shape);
		}
	}
	remove(shape) {
		this.zpp_inner.wrap_shapes.remove(shape);
	}
	addCbType(cb) {
		if(this.zpp_inner_i.wrap_cbTypes == null) {
			this.zpp_inner_i.setupcbTypes();
		}
		let _this = this.zpp_inner_i.wrap_cbTypes;
		if(_this.zpp_inner.reverse_flag) {
			_this.push(cb);
		} else {
			_this.unshift(cb);
		}
	}
	hasCbType(ctype) {
		if(this.zpp_inner_i.wrap_cbTypes == null) {
			this.zpp_inner_i.setupcbTypes();
		}
		return this.zpp_inner_i.wrap_cbTypes.has(ctype);
	}
	shapesAt(index) {
		return this.zpp_inner.wrap_shapes.at(index);
	}
	sensorEnabled(value) {
		let _this = this.zpp_inner.wrap_shapes;
		_this.zpp_inner.valmod();
		let it = ShapeIterator.get(_this);
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
				it.zpp_next = ShapeIterator.zpp_pool;
				ShapeIterator.zpp_pool = it;
				it.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			try {
				it.zpp_critical = false;
				let shape = it.zpp_inner.at(it.zpp_i++);
				shape.zpp_inner.immutable_midstep("Shape::sensorEnabled");
				shape.zpp_inner.sensorEnabled = value;
				shape.zpp_inner.wake();
			} catch( _g ) {
				haxe_NativeStackTrace.lastError = _g;
				it.zpp_next = ShapeIterator.zpp_pool;
				ShapeIterator.zpp_pool = it;
				it.zpp_inner = null;
				break;
			}
		}
	}
	sensorEnabledAt(index,value) {
		let sp = this.zpp_inner.wrap_shapes.at(index);
		sp.zpp_inner.immutable_midstep("Shape::sensorEnabled");
		sp.zpp_inner.sensorEnabled = value;
		sp.zpp_inner.wake();
	}
	toString() {
		return (this.zpp_inner.world ? "(space::world" : "(" + (this.zpp_inner.type == ZPP_Flags.id_BodyType_DYNAMIC ? "dynamic" : this.zpp_inner.type == ZPP_Flags.id_BodyType_STATIC ? "static" : "kinematic")) + ")#" + this.zpp_inner_i.id;
	}
	static createDataVo() {
		return { };
	}
}
