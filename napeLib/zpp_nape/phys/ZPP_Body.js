import ZPP_Set_ZPP_Body from '../util/ZPP_Set_ZPP_Body.js';
import ZPP_PubPool from '../util/ZPP_PubPool.js';
import ZPP_ShapeList from '../util/ZPP_ShapeList.js';
import ZNPNode_ZPP_Arbiter from '../util/ZNPNode_ZPP_Arbiter.js';
import ZNPList_ZPP_Arbiter from '../util/ZNPList_ZPP_Arbiter.js';
import ZNPList_ZPP_Body from '../util/ZNPList_ZPP_Body.js';
import ZNPList_ZPP_Shape from '../util/ZNPList_ZPP_Shape.js';
import ZPP_Component from '../space/ZPP_Component.js';
import ZPP_Interactor from './ZPP_Interactor.js';
import ZPP_Vec2 from '../geom/ZPP_Vec2.js';
import ZPP_AABB from '../geom/ZPP_AABB.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import ZNPList_ZPP_Constraint from '../util/ZNPList_ZPP_Constraint.js';
import BodyType from '../../nape/phys/BodyType.js';
import BodyList from '../../nape/phys/BodyList.js';
import Body from '../../nape/phys/Body.js';
import Vec3 from '../../nape/geom/Vec3.js';
import Vec2 from '../../nape/geom/Vec2.js';
import Config from '../../nape/Config.js';
export default class ZPP_Body extends ZPP_Interactor {
	constructor() {
		ZPP_Interactor._hx_skip_constructor = true;
		super();
		ZPP_Interactor._hx_skip_constructor = false;
		this._hx_constructor();
	}
	_hx_constructor() {
		this.wrap_worldCOM = null;
		this.wrap_localCOM = null;
		this.zip_worldCOM = false;
		this.worldCOMy = 0.0;
		this.worldCOMx = 0.0;
		this.zip_localCOM = false;
		this.localCOMy = 0.0;
		this.localCOMx = 0.0;
		this.zip_aabb = false;
		this.aabb = null;
		this.norotate = false;
		this.sinertia = 0.0;
		this.iinertia = 0.0;
		this.cinertia = 0.0;
		this.zip_inertia = false;
		this.inertia = 0.0;
		this.inertiaMode = 0;
		this.zip_gravMassScale = false;
		this.gravMassScale = 0.0;
		this.gravMassMode = 0;
		this.zip_gravMass = false;
		this.gravMass = 0.0;
		this.nomove = false;
		this.cmass = 0.0;
		this.smass = 0.0;
		this.imass = 0.0;
		this.massMode = 0;
		this.zip_mass = false;
		this.mass = 0.0;
		this.zip_axis = false;
		this.axisy = 0.0;
		this.axisx = 0.0;
		this.rot = 0.0;
		this.pre_rot = 0.0;
		this.kinangvel = 0.0;
		this.torque = 0.0;
		this.angvel = 0.0;
		this.wrapcvel = null;
		this.wrap_svel = null;
		this.svely = 0.0;
		this.svelx = 0.0;
		this.wrap_kinvel = null;
		this.kinvely = 0.0;
		this.kinvelx = 0.0;
		this.wrap_force = null;
		this.forcey = 0.0;
		this.forcex = 0.0;
		this.wrap_vel = null;
		this.vely = 0.0;
		this.velx = 0.0;
		this.wrap_pos = null;
		this.posy = 0.0;
		this.posx = 0.0;
		this.pre_posy = 0.0;
		this.pre_posx = 0.0;
		this.disableCCD = false;
		this.bulletEnabled = false;
		this.bullet = false;
		this.sweepRadius = 0.0;
		this.sweepFrozen = false;
		this.sweep_angvel = 0.0;
		this.sweepTime = 0.0;
		this.graph_depth = 0;
		this.component = null;
		this.wrap_constraints = null;
		this.constraints = null;
		this.wrap_arbiters = null;
		this.arbiters = null;
		this.space = null;
		this.wrap_shapes = null;
		this.shapes = null;
		this.compound = null;
		this.type = 0;
		this.world = false;
		this.outer = null;
		super._hx_constructor();
		this.ibody = this;
		this.world = false;
		this.bulletEnabled = false;
		this.sweepTime = 0;
		this.sweep_angvel = 0;
		this.norotate = this.nomove = false;
		this.disableCCD = false;
		this.posx = 0;
		this.posy = 0;
		this.rot = 0;
		this.axisx = 0;
		this.axisy = 1;
		this.svelx = 0;
		this.svely = 0;
		this.velx = 0;
		this.vely = 0;
		this.kinvelx = 0;
		this.kinvely = 0;
		this.forcex = 0;
		this.forcey = 0;
		this.torque = this.angvel = this.kinangvel = 0;
		this.pre_posx = Infinity;
		this.pre_posy = Infinity;
		this.pre_rot = Infinity;
		this.localCOMx = 0;
		this.localCOMy = 0;
		this.worldCOMx = 0;
		this.worldCOMy = 0;
		this.zip_aabb = true;
		let ret;
		if(ZPP_AABB.zpp_pool == null) {
			ret = new ZPP_AABB();
		} else {
			ret = ZPP_AABB.zpp_pool;
			ZPP_AABB.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.minx = 0;
		ret.miny = 0;
		ret.maxx = 0;
		ret.maxy = 0;
		this.aabb = ret;
		this.aabb._immutable = true;
		let me = this;
		this.aabb._validate = $bind(this,this.aabb_validate);
		this.massMode = ZPP_Flags.id_MassMode_DEFAULT;
		this.gravMassMode = ZPP_Flags.id_GravMassMode_DEFAULT;
		this.gravMassScale = 1.0;
		this.inertiaMode = ZPP_Flags.id_InertiaMode_DEFAULT;
		this.arbiters = new ZNPList_ZPP_Arbiter();
		this.constraints = new ZNPList_ZPP_Constraint();
		this.shapes = new ZNPList_ZPP_Shape();
		this.wrap_shapes = ZPP_ShapeList.get(this.shapes);
		this.wrap_shapes.zpp_inner.adder = $bind(this,this.shapes_adder);
		this.wrap_shapes.zpp_inner.subber = $bind(this,this.shapes_subber);
		this.wrap_shapes.zpp_inner._invalidate = $bind(this,this.shapes_invalidate);
		this.wrap_shapes.zpp_inner._modifiable = $bind(this,this.shapes_modifiable);
		this.kinematicDelaySleep = false;
	}
	isStatic() {
		return this.type == ZPP_Flags.id_BodyType_STATIC;
	}
	isDynamic() {
		return this.type == ZPP_Flags.id_BodyType_DYNAMIC;
	}
	isKinematic() {
		return this.type == ZPP_Flags.id_BodyType_KINEMATIC;
	}
	invalidate_type() {
		this.invalidate_mass();
		this.invalidate_inertia();
	}
	invalidate_shapes() {
		this.zip_aabb = true;
		this.zip_localCOM = true;
		this.zip_worldCOM = true;
		this.invalidate_mass();
		this.invalidate_inertia();
	}
	init_bodysetlist() {
		if(ZPP_Body.bodyset == null) {
			ZPP_Body.bodyset = new ZPP_Set_ZPP_Body();
			ZPP_Body.bodyset.lt = ZPP_Body.bodysetlt;
			ZPP_Body.bodystack = new ZNPList_ZPP_Body();
		}
	}
	connectedBodies_cont(b) {
		if(b == b.zpp_inner.space.__static) {
			return;
		}
		if(ZPP_Body.bodyset.try_insert_bool(b.zpp_inner)) {
			ZPP_Body.bodystack.add(b.zpp_inner);
			b.zpp_inner.graph_depth = ZPP_Body.cur_graph_depth + 1;
		}
	}
	connectedBodies(depth,output) {
		if(ZPP_Body.bodyset == null) {
			ZPP_Body.bodyset = new ZPP_Set_ZPP_Body();
			ZPP_Body.bodyset.lt = ZPP_Body.bodysetlt;
			ZPP_Body.bodystack = new ZNPList_ZPP_Body();
		}
		let ret = output == null ? new BodyList() : output;
		ZPP_Body.bodystack.add(this);
		ZPP_Body.bodyset.insert(this);
		this.graph_depth = 0;
		while(ZPP_Body.bodystack.head != null) {
			let cur = ZPP_Body.bodystack.pop_unsafe();
			if(cur.graph_depth == depth) {
				continue;
			}
			ZPP_Body.cur_graph_depth = cur.graph_depth;
			let cx_ite = cur.constraints.head;
			while(cx_ite != null) {
				let c = cx_ite.elt;
				c.outer.visitBodies($bind(this,this.connectedBodies_cont));
				cx_ite = cx_ite.next;
			}
		}
		let _gthis = this;
		let _this = ZPP_Body.bodyset;
		if(_this.parent != null) {
			let cur = _this.parent;
			while(cur != null) if(cur.prev != null) {
				cur = cur.prev;
			} else if(cur.next != null) {
				cur = cur.next;
			} else {
				let b = cur.data;
				if(b != _gthis) {
					let obj = b.outer;
					if(ret.zpp_inner.reverse_flag) {
						ret.push(obj);
					} else {
						ret.unshift(obj);
					}
				}
				let ret1 = cur.parent;
				if(ret1 != null) {
					if(cur == ret1.prev) {
						ret1.prev = null;
					} else {
						ret1.next = null;
					}
					cur.parent = null;
				}
				let o = cur;
				o.data = null;
				o.lt = null;
				o.swapped = null;
				o.next = ZPP_Set_ZPP_Body.zpp_pool;
				ZPP_Set_ZPP_Body.zpp_pool = o;
				cur = ret1;
			}
			_this.parent = null;
		}
		return ret;
	}
	interactingBodies(arbiter_type,depth,output) {
		if(ZPP_Body.bodyset == null) {
			ZPP_Body.bodyset = new ZPP_Set_ZPP_Body();
			ZPP_Body.bodyset.lt = ZPP_Body.bodysetlt;
			ZPP_Body.bodystack = new ZNPList_ZPP_Body();
		}
		let ret = output == null ? new BodyList() : output;
		ZPP_Body.bodyset.insert(this);
		ZPP_Body.bodystack.add(this);
		this.graph_depth = 0;
		while(ZPP_Body.bodystack.head != null) {
			let cur = ZPP_Body.bodystack.pop_unsafe();
			if(cur.graph_depth == depth) {
				continue;
			}
			let cx_ite = cur.arbiters.head;
			while(cx_ite != null) {
				let arb = cx_ite.elt;
				if((arb.type & arbiter_type) != 0) {
					let other = arb.b1 == cur ? arb.b2 : arb.b1;
					if(ZPP_Body.bodyset.try_insert_bool(other)) {
						ZPP_Body.bodystack.add(other);
						other.graph_depth = cur.graph_depth + 1;
					}
				}
				cx_ite = cx_ite.next;
			}
		}
		let _gthis = this;
		let _this = ZPP_Body.bodyset;
		if(_this.parent != null) {
			let cur = _this.parent;
			while(cur != null) if(cur.prev != null) {
				cur = cur.prev;
			} else if(cur.next != null) {
				cur = cur.next;
			} else {
				let b = cur.data;
				if(b != _gthis) {
					let obj = b.outer;
					if(ret.zpp_inner.reverse_flag) {
						ret.push(obj);
					} else {
						ret.unshift(obj);
					}
				}
				let ret1 = cur.parent;
				if(ret1 != null) {
					if(cur == ret1.prev) {
						ret1.prev = null;
					} else {
						ret1.next = null;
					}
					cur.parent = null;
				}
				let o = cur;
				o.data = null;
				o.lt = null;
				o.swapped = null;
				o.next = ZPP_Set_ZPP_Body.zpp_pool;
				ZPP_Set_ZPP_Body.zpp_pool = o;
				cur = ret1;
			}
			_this.parent = null;
		}
		return ret;
	}
	atRest(dt) {
		if(this.type != ZPP_Flags.id_BodyType_DYNAMIC) {
			return this.component.sleeping;
		} else {
			let linSq = Config.linearSleepThreshold;
			linSq *= linSq;
			let cansleep;
			if(this.velx * this.velx + this.vely * this.vely > linSq) {
				cansleep = false;
			} else {
				let dx = 0.0;
				let dy = 0.0;
				dx = this.posx - this.pre_posx;
				dy = this.posy - this.pre_posy;
				if(dx * dx + dy * dy > 0.25 * linSq * dt * dt) {
					cansleep = false;
				} else {
					let dx = 0.0;
					let dy = 0.0;
					dx = this.aabb.maxx - this.aabb.minx;
					dy = this.aabb.maxy - this.aabb.miny;
					let idl = dx * dx + dy * dy;
					let angSq = Config.angularSleepThreshold;
					angSq *= angSq;
					if(4 * this.angvel * this.angvel * idl > angSq) {
						cansleep = false;
					} else {
						let dr = this.rot - this.pre_rot;
						cansleep = dr * dr * idl > angSq * dt * dt ? false : true;
					}
				}
			}
			if(!cansleep) {
				this.component.waket = this.space.stamp;
			}
			return this.component.waket + Config.sleepDelay < this.space.stamp;
		}
	}
	refreshArbiters() {
		let cx_ite = this.arbiters.head;
		while(cx_ite != null) {
			let arb = cx_ite.elt;
			arb.invalidated = true;
			cx_ite = cx_ite.next;
		}
	}
	sweepIntegrate(dt) {
		let delta = dt - this.sweepTime;
		if(delta != 0) {
			this.sweepTime = dt;
			let t = delta;
			this.posx += this.velx * t;
			this.posy += this.vely * t;
			if(this.angvel != 0) {
				let dr = this.sweep_angvel * delta;
				this.rot += dr;
				if(dr * dr > 0.0001) {
					this.axisx = Math.sin(this.rot);
					this.axisy = Math.cos(this.rot);
				} else {
					let d2 = dr * dr;
					let p = 1 - 0.5 * d2;
					let m = 1 - d2 * d2 / 8;
					let nx = (p * this.axisx + dr * this.axisy) * m;
					this.axisy = (p * this.axisy - dr * this.axisx) * m;
					this.axisx = nx;
				}
			}
		}
	}
	sweepValidate(s) {
		if(s.type == ZPP_Flags.id_ShapeType_CIRCLE) {
			s.worldCOMx = this.posx + (this.axisy * s.localCOMx - this.axisx * s.localCOMy);
			s.worldCOMy = this.posy + (s.localCOMx * this.axisx + s.localCOMy * this.axisy);
		} else {
			let p = s.polygon;
			let li = p.lverts.next;
			let cx_ite = p.gverts.next;
			while(cx_ite != null) {
				let g = cx_ite;
				let l = li;
				li = li.next;
				g.x = this.posx + (this.axisy * l.x - this.axisx * l.y);
				g.y = this.posy + (l.x * this.axisx + l.y * this.axisy);
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
				e.gnormx = this.axisy * e.lnormx - this.axisx * e.lnormy;
				e.gnormy = e.lnormx * this.axisx + e.lnormy * this.axisy;
				e.gprojection = this.posx * e.gnormx + this.posy * e.gnormy + e.lprojection;
				e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
				e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
				u = v;
				cx_ite1 = cx_ite1.next;
			}
			let v = p.gverts.next;
			let e = ite.elt;
			ite = ite.next;
			e.gnormx = this.axisy * e.lnormx - this.axisx * e.lnormy;
			e.gnormy = e.lnormx * this.axisx + e.lnormy * this.axisy;
			e.gprojection = this.posx * e.gnormx + this.posy * e.gnormy + e.lprojection;
			e.tp0 = u.y * e.gnormx - u.x * e.gnormy;
			e.tp1 = v.y * e.gnormx - v.x * e.gnormy;
		}
	}
	invalidate_pos() {
		let cx_ite = this.shapes.head;
		while(cx_ite != null) {
			let s = cx_ite.elt;
			if(s.type == ZPP_Flags.id_ShapeType_POLYGON) {
				s.polygon.invalidate_gverts();
				s.polygon.invalidate_gaxi();
			}
			s.invalidate_worldCOM();
			cx_ite = cx_ite.next;
		}
		this.zip_worldCOM = true;
	}
	pos_invalidate(pos) {
		this.immutable_midstep("Body::position");
		if(this.type == ZPP_Flags.id_BodyType_STATIC && this.space != null) {
			throw haxe_Exception.thrown("Error: Cannot move a static object once inside a Space");
		}
		if(!(this.posx == pos.x && this.posy == pos.y)) {
			this.posx = pos.x;
			this.posy = pos.y;
			let cx_ite = this.shapes.head;
			while(cx_ite != null) {
				let s = cx_ite.elt;
				if(s.type == ZPP_Flags.id_ShapeType_POLYGON) {
					s.polygon.invalidate_gverts();
					s.polygon.invalidate_gaxi();
				}
				s.invalidate_worldCOM();
				cx_ite = cx_ite.next;
			}
			this.zip_worldCOM = true;
			this.wake();
		}
	}
	pos_validate() {
		this.wrap_pos.zpp_inner.x = this.posx;
		this.wrap_pos.zpp_inner.y = this.posy;
	}
	vel_invalidate(vel) {
		if(this.type == ZPP_Flags.id_BodyType_STATIC) {
			throw haxe_Exception.thrown("Error: Static body cannot have its velocity set.");
		}
		this.velx = vel.x;
		this.vely = vel.y;
		this.wake();
	}
	vel_validate() {
		this.wrap_vel.zpp_inner.x = this.velx;
		this.wrap_vel.zpp_inner.y = this.vely;
	}
	kinvel_invalidate(vel) {
		this.kinvelx = vel.x;
		this.kinvely = vel.y;
		this.wake();
	}
	kinvel_validate() {
		this.wrap_kinvel.zpp_inner.x = this.kinvelx;
		this.wrap_kinvel.zpp_inner.y = this.kinvely;
	}
	svel_invalidate(vel) {
		this.svelx = vel.x;
		this.svely = vel.y;
		this.wake();
	}
	svel_validate() {
		this.wrap_svel.zpp_inner.x = this.svelx;
		this.wrap_svel.zpp_inner.y = this.svely;
	}
	force_invalidate(force) {
		if(this.type != ZPP_Flags.id_BodyType_DYNAMIC) {
			throw haxe_Exception.thrown("Error: Non-dynamic body cannot have force applied.");
		}
		this.forcex = force.x;
		this.forcey = force.y;
		this.wake();
	}
	force_validate() {
		this.wrap_force.zpp_inner.x = this.forcex;
		this.wrap_force.zpp_inner.y = this.forcey;
	}
	setupPosition() {
		let x = this.posx;
		let y = this.posy;
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
		this.wrap_pos = ret;
		this.wrap_pos.zpp_inner._inuse = true;
		if(this.world) {
			this.wrap_pos.zpp_inner._immutable = true;
		} else {
			this.wrap_pos.zpp_inner._invalidate = $bind(this,this.pos_invalidate);
			this.wrap_pos.zpp_inner._validate = $bind(this,this.pos_validate);
		}
	}
	setupVelocity() {
		let x = this.velx;
		let y = this.vely;
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
		this.wrap_vel = ret;
		this.wrap_vel.zpp_inner._inuse = true;
		if(this.world) {
			this.wrap_vel.zpp_inner._immutable = true;
		} else {
			this.wrap_vel.zpp_inner._invalidate = $bind(this,this.vel_invalidate);
			this.wrap_vel.zpp_inner._validate = $bind(this,this.vel_validate);
		}
	}
	setupkinvel() {
		let x = this.kinvelx;
		let y = this.kinvely;
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
		this.wrap_kinvel = ret;
		this.wrap_kinvel.zpp_inner._inuse = true;
		if(this.world) {
			this.wrap_kinvel.zpp_inner._immutable = true;
		} else {
			this.wrap_kinvel.zpp_inner._invalidate = $bind(this,this.kinvel_invalidate);
			this.wrap_kinvel.zpp_inner._validate = $bind(this,this.kinvel_validate);
		}
	}
	setupsvel() {
		let x = this.svelx;
		let y = this.svely;
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
		this.wrap_svel = ret;
		this.wrap_svel.zpp_inner._inuse = true;
		if(this.world) {
			this.wrap_svel.zpp_inner._immutable = true;
		} else {
			this.wrap_svel.zpp_inner._invalidate = $bind(this,this.svel_invalidate);
			this.wrap_svel.zpp_inner._validate = $bind(this,this.svel_validate);
		}
	}
	setupForce() {
		let x = this.forcex;
		let y = this.forcey;
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
		this.wrap_force = ret;
		this.wrap_force.zpp_inner._inuse = true;
		if(this.world) {
			this.wrap_force.zpp_inner._immutable = true;
		} else {
			this.wrap_force.zpp_inner._invalidate = $bind(this,this.force_invalidate);
			this.wrap_force.zpp_inner._validate = $bind(this,this.force_validate);
		}
	}
	cvel_validate() {
		this.wrapcvel.zpp_inner.x = this.velx + this.kinvelx;
		this.wrapcvel.zpp_inner.y = this.vely + this.kinvely;
		this.wrapcvel.zpp_inner.z = this.angvel + this.kinangvel;
	}
	setup_cvel() {
		let me = this;
		this.wrapcvel = Vec3.get();
		this.wrapcvel.zpp_inner.immutable = true;
		this.wrapcvel.zpp_inner._validate = $bind(this,this.cvel_validate);
	}
	invalidate_rot() {
		this.zip_axis = true;
		let cx_ite = this.shapes.head;
		while(cx_ite != null) {
			let s = cx_ite.elt;
			if(s.type == ZPP_Flags.id_ShapeType_POLYGON) {
				s.polygon.invalidate_gverts();
				s.polygon.invalidate_gaxi();
			}
			s.invalidate_worldCOM();
			cx_ite = cx_ite.next;
		}
		this.zip_worldCOM = true;
	}
	validate_axis() {
		if(this.zip_axis) {
			this.zip_axis = false;
			this.axisx = Math.sin(this.rot);
			this.axisy = Math.cos(this.rot);
		}
	}
	quick_validate_axis() {
		this.axisx = Math.sin(this.rot);
		this.axisy = Math.cos(this.rot);
	}
	delta_rot(dr) {
		this.rot += dr;
		if(dr * dr > 0.0001) {
			this.axisx = Math.sin(this.rot);
			this.axisy = Math.cos(this.rot);
		} else {
			let d2 = dr * dr;
			let p = 1 - 0.5 * d2;
			let m = 1 - d2 * d2 / 8;
			let nx = (p * this.axisx + dr * this.axisy) * m;
			this.axisy = (p * this.axisy - dr * this.axisx) * m;
			this.axisx = nx;
		}
	}
	invalidate_mass() {
		this.zip_mass = true;
		this.invalidate_gravMass();
	}
	validate_mass() {
		let exist = false;
		if(this.zip_mass || this.massMode == ZPP_Flags.id_MassMode_DEFAULT && exist) {
			this.zip_mass = false;
			if(this.massMode == ZPP_Flags.id_MassMode_DEFAULT) {
				this.cmass = 0;
				let cx_ite = this.shapes.head;
				while(cx_ite != null) {
					let s = cx_ite.elt;
					s.refmaterial.density = s.material.density;
					s.validate_area_inertia();
					this.cmass += s.area * s.material.density;
					cx_ite = cx_ite.next;
				}
			}
			if(this.type == ZPP_Flags.id_BodyType_DYNAMIC && !this.nomove) {
				this.mass = this.cmass;
				this.imass = this.smass = 1.0 / this.mass;
			} else {
				this.mass = Infinity;
				this.imass = this.smass = 0.0;
			}
			if(exist) {
				this.invalidate_inertia();
			}
		}
	}
	invalidate_gravMass() {
		if(this.gravMassMode != ZPP_Flags.id_GravMassMode_FIXED) {
			this.zip_gravMass = true;
		}
		if(this.gravMassMode != ZPP_Flags.id_GravMassMode_SCALED) {
			this.zip_gravMassScale = true;
		}
		this.wake();
	}
	validate_gravMass() {
		if(this.zip_gravMass) {
			this.zip_gravMass = false;
			this.validate_mass();
			if(this.gravMassMode == ZPP_Flags.id_GravMassMode_DEFAULT) {
				this.validate_mass();
				this.gravMass = this.cmass;
			} else if(this.gravMassMode == ZPP_Flags.id_GravMassMode_SCALED) {
				this.validate_mass();
				this.gravMass = this.cmass * this.gravMassScale;
			}
		}
	}
	invalidate_gravMassScale() {
		if(this.gravMassMode != ZPP_Flags.id_GravMassMode_SCALED) {
			this.zip_gravMassScale = true;
		} else {
			this.invalidate_gravMass();
		}
	}
	validate_gravMassScale() {
		if(this.zip_gravMassScale) {
			this.zip_gravMassScale = false;
			if(this.gravMassMode == ZPP_Flags.id_GravMassMode_DEFAULT) {
				this.gravMassScale = 1.0;
			} else if(this.gravMassMode == ZPP_Flags.id_GravMassMode_FIXED) {
				this.validate_mass();
				this.gravMassScale = this.gravMass / this.cmass;
			}
		}
	}
	invalidate_inertia() {
		this.zip_inertia = true;
		this.wake();
	}
	validate_inertia() {
		let exist = false;
		if(this.zip_inertia || this.inertiaMode == ZPP_Flags.id_InertiaMode_DEFAULT && exist) {
			this.zip_inertia = false;
			if(this.inertiaMode == ZPP_Flags.id_InertiaMode_DEFAULT) {
				this.cinertia = 0;
				let cx_ite = this.shapes.head;
				while(cx_ite != null) {
					let s = cx_ite.elt;
					s.refmaterial.density = s.material.density;
					s.validate_area_inertia();
					this.cinertia += s.inertia * s.area * s.material.density;
					cx_ite = cx_ite.next;
				}
			}
			if(this.type == ZPP_Flags.id_BodyType_DYNAMIC && !this.norotate) {
				this.inertia = this.cinertia;
				this.sinertia = this.iinertia = 1.0 / this.inertia;
			} else {
				this.inertia = Infinity;
				this.sinertia = this.iinertia = 0;
			}
			if(exist) {
				this.invalidate_inertia();
			}
		}
	}
	invalidate_wake() {
		this.wake();
	}
	validate_aabb() {
		if(this.shapes.head == null) {
			throw haxe_Exception.thrown("Error: Body bounds only makes sense if it contains shapes");
		}
		if(this.zip_aabb) {
			this.zip_aabb = false;
			this.aabb.minx = Infinity;
			this.aabb.miny = Infinity;
			this.aabb.maxx = -Infinity;
			this.aabb.maxy = -Infinity;
			let cx_ite = this.shapes.head;
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
				let _this = this.aabb;
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
	invalidate_aabb() {
		this.zip_aabb = true;
	}
	invalidate_localCOM() {
		this.zip_localCOM = true;
		this.zip_worldCOM = true;
	}
	invalidate_worldCOM() {
		this.zip_worldCOM = true;
	}
	validate_localCOM() {
		if(this.zip_localCOM) {
			this.zip_localCOM = false;
			let tempx = 0;
			let tempy = 0;
			let msum = 0.0;
			let cx_ite = this.shapes.head;
			while(cx_ite != null) {
				let s = cx_ite.elt;
				if(s.zip_localCOM) {
					s.zip_localCOM = false;
					if(s.type == ZPP_Flags.id_ShapeType_POLYGON) {
						let _this = s.polygon;
						if(_this.lverts.next == null) {
							throw haxe_Exception.thrown("Error: An empty polygon has no meaningful localCOM");
						}
						if(_this.lverts.next.next == null) {
							_this.localCOMx = _this.lverts.next.x;
							_this.localCOMy = _this.lverts.next.y;
						} else if(_this.lverts.next.next.next == null) {
							_this.localCOMx = _this.lverts.next.x;
							_this.localCOMy = _this.lverts.next.y;
							let t = 1.0;
							_this.localCOMx += _this.lverts.next.next.x * t;
							_this.localCOMy += _this.lverts.next.next.y * t;
							let t1 = 0.5;
							_this.localCOMx *= t1;
							_this.localCOMy *= t1;
						} else {
							_this.localCOMx = 0;
							_this.localCOMy = 0;
							let area = 0.0;
							let cx_ite = _this.lverts.next;
							let u = cx_ite;
							cx_ite = cx_ite.next;
							let v = cx_ite;
							cx_ite = cx_ite.next;
							while(cx_ite != null) {
								let w = cx_ite;
								area += v.x * (w.y - u.y);
								let cf = w.y * v.x - w.x * v.y;
								_this.localCOMx += (v.x + w.x) * cf;
								_this.localCOMy += (v.y + w.y) * cf;
								u = v;
								v = w;
								cx_ite = cx_ite.next;
							}
							cx_ite = _this.lverts.next;
							let w = cx_ite;
							area += v.x * (w.y - u.y);
							let cf = w.y * v.x - w.x * v.y;
							_this.localCOMx += (v.x + w.x) * cf;
							_this.localCOMy += (v.y + w.y) * cf;
							u = v;
							v = w;
							cx_ite = cx_ite.next;
							let w1 = cx_ite;
							area += v.x * (w1.y - u.y);
							let cf1 = w1.y * v.x - w1.x * v.y;
							_this.localCOMx += (v.x + w1.x) * cf1;
							_this.localCOMy += (v.y + w1.y) * cf1;
							area = 1 / (3 * area);
							let t = area;
							_this.localCOMx *= t;
							_this.localCOMy *= t;
						}
					}
					if(s.wrap_localCOM != null) {
						s.wrap_localCOM.zpp_inner.x = s.localCOMx;
						s.wrap_localCOM.zpp_inner.y = s.localCOMy;
					}
				}
				s.validate_area_inertia();
				let t = s.area * s.material.density;
				tempx += s.localCOMx * t;
				tempy += s.localCOMy * t;
				msum += s.area * s.material.density;
				cx_ite = cx_ite.next;
			}
			if(msum != 0) {
				let t = 1.0 / msum;
				this.localCOMx = tempx * t;
				this.localCOMy = tempy * t;
			}
			if(this.wrap_localCOM != null) {
				this.wrap_localCOM.zpp_inner.x = this.localCOMx;
				this.wrap_localCOM.zpp_inner.y = this.localCOMy;
			}
			if(this.zip_mass && this.massMode == ZPP_Flags.id_MassMode_DEFAULT) {
				this.zip_mass = false;
				this.cmass = msum;
				if(this.type == ZPP_Flags.id_BodyType_DYNAMIC) {
					this.mass = this.cmass;
					this.imass = this.smass = 1.0 / this.mass;
				} else {
					this.mass = Infinity;
					this.imass = this.smass = 0.0;
				}
			}
		}
	}
	validate_worldCOM() {
		if(this.zip_worldCOM) {
			this.zip_worldCOM = false;
			this.validate_localCOM();
			if(this.zip_axis) {
				this.zip_axis = false;
				this.axisx = Math.sin(this.rot);
				this.axisy = Math.cos(this.rot);
			}
			this.worldCOMx = this.posx + (this.axisy * this.localCOMx - this.axisx * this.localCOMy);
			this.worldCOMy = this.posy + (this.localCOMx * this.axisx + this.localCOMy * this.axisy);
			if(this.wrap_worldCOM != null) {
				this.wrap_worldCOM.zpp_inner.x = this.worldCOMx;
				this.wrap_worldCOM.zpp_inner.y = this.worldCOMy;
			}
		}
	}
	getlocalCOM() {
		if(this.shapes.head == null) {
			throw haxe_Exception.thrown("Error: localCOM only makes sense when Body has Shapes");
		}
		this.validate_localCOM();
	}
	getworldCOM() {
		if(this.shapes.head == null) {
			throw haxe_Exception.thrown("Error: worldCOM only makes sense when Body has Shapes");
		}
		this.validate_worldCOM();
	}
	__immutable_midstep(name) {
		if(this.space != null && this.space.midstep) {
			throw haxe_Exception.thrown("Error: " + name + " cannot be set during a space step()");
		}
	}
	clear() {
		if(this.space != null) {
			throw haxe_Exception.thrown("Error: Cannot clear a Body if it is currently being used by a Space!");
		}
		if(this.constraints.head != null) {
			throw haxe_Exception.thrown("Error: Cannot clear a Body if it is currently being used by a constraint!");
		}
		while(this.shapes.head != null) {
			let s = this.shapes.pop_unsafe();
			s.removedFromBody();
			s.body = null;
		}
		this.invalidate_shapes();
		this.pre_posx = 0;
		this.pre_posy = 0;
		this.posx = 0;
		this.posy = 0;
		this.velx = 0;
		this.vely = 0;
		this.forcex = 0;
		this.forcey = 0;
		this.kinvelx = 0;
		this.kinvely = 0;
		this.svelx = 0;
		this.svely = 0;
		this.angvel = this.torque = this.kinangvel = this.pre_rot = this.rot = 0;
		let cx_ite = this.shapes.head;
		while(cx_ite != null) {
			let s = cx_ite.elt;
			if(s.type == ZPP_Flags.id_ShapeType_POLYGON) {
				s.polygon.invalidate_gverts();
				s.polygon.invalidate_gaxi();
			}
			s.invalidate_worldCOM();
			cx_ite = cx_ite.next;
		}
		this.zip_worldCOM = true;
		this.zip_axis = true;
		let cx_ite1 = this.shapes.head;
		while(cx_ite1 != null) {
			let s = cx_ite1.elt;
			if(s.type == ZPP_Flags.id_ShapeType_POLYGON) {
				s.polygon.invalidate_gverts();
				s.polygon.invalidate_gaxi();
			}
			s.invalidate_worldCOM();
			cx_ite1 = cx_ite1.next;
		}
		this.zip_worldCOM = true;
		this.axisx = 0;
		this.axisy = 1;
		this.zip_axis = false;
		this.massMode = ZPP_Flags.id_MassMode_DEFAULT;
		this.gravMassMode = ZPP_Flags.id_GravMassMode_DEFAULT;
		this.gravMassScale = 1.0;
		this.inertiaMode = ZPP_Flags.id_InertiaMode_DEFAULT;
		this.norotate = false;
		this.nomove = false;
	}
	aabb_validate() {
		if(this.shapes.head == null) {
			throw haxe_Exception.thrown("Error: bounds only makes sense when Body has shapes");
		}
		if(this.shapes.head == null) {
			throw haxe_Exception.thrown("Error: Body bounds only makes sense if it contains shapes");
		}
		if(this.zip_aabb) {
			this.zip_aabb = false;
			this.aabb.minx = Infinity;
			this.aabb.miny = Infinity;
			this.aabb.maxx = -Infinity;
			this.aabb.maxy = -Infinity;
			let cx_ite = this.shapes.head;
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
				let _this = this.aabb;
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
	shapes_adder(s) {
		if(s.zpp_inner.body != this) {
			if(s.zpp_inner.body != null) {
				s.zpp_inner.body.wrap_shapes.remove(s);
			}
			s.zpp_inner.body = this;
			s.zpp_inner.addedToBody();
			if(this.space != null) {
				let _this = this.space;
				let s1 = s.zpp_inner;
				let o = s1.body;
				if(!o.world) {
					o.component.waket = _this.stamp + (_this.midstep ? 0 : 1);
					if(o.type == ZPP_Flags.id_BodyType_KINEMATIC) {
						o.kinematicDelaySleep = true;
					}
					if(o.component.sleeping) {
						_this.really_wake(o,false);
					}
				}
				_this.bphase.insert(s1);
				s1.addedToSpace();
			}
			if(s.zpp_inner.type == ZPP_Flags.id_ShapeType_POLYGON) {
				s.zpp_inner.polygon.invalidate_gaxi();
				s.zpp_inner.polygon.invalidate_gverts();
			}
			return true;
		} else {
			return false;
		}
	}
	shapes_subber(s) {
		if(this.space != null) {
			this.space.removed_shape(s.zpp_inner);
		}
		s.zpp_inner.body = null;
		s.zpp_inner.removedFromBody();
	}
	shapes_invalidate(_) {
		this.invalidate_shapes();
	}
	shapes_modifiable() {
		this.immutable_midstep("Body::shapes");
		if(this.type == ZPP_Flags.id_BodyType_STATIC && this.space != null) {
			throw haxe_Exception.thrown("Error: Cannot modifiy shapes of static object once added to Space");
		}
	}
	addedToSpace() {
		if(ZPP_Component.zpp_pool == null) {
			this.component = new ZPP_Component();
		} else {
			this.component = ZPP_Component.zpp_pool;
			ZPP_Component.zpp_pool = this.component.next;
			this.component.next = null;
		}
		this.component.isBody = true;
		this.component.body = this;
		this.__iaddedToSpace();
	}
	removedFromSpace() {
		while(this.arbiters.head != null) {
			let arb = this.arbiters.pop_unsafe();
			let s = this.space;
			arb.cleared = true;
			if(arb.b2 == this) {
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
			}
			if(arb.b1 == this) {
				let _this = arb.b2.arbiters;
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
			}
			if(arb.pair != null) {
				arb.pair.arb = null;
				arb.pair = null;
			}
			arb.active = false;
			s.f_arbiters.modified = true;
		}
		let o = this.component;
		o.body = null;
		o.constraint = null;
		o.next = ZPP_Component.zpp_pool;
		ZPP_Component.zpp_pool = o;
		this.component = null;
		this.__iremovedFromSpace();
	}
	copy() {
		let ret = new Body().zpp_inner;
		ret.type = this.type;
		ret.bulletEnabled = this.bulletEnabled;
		ret.disableCCD = this.disableCCD;
		let cx_ite = this.shapes.head;
		while(cx_ite != null) {
			let s = cx_ite.elt;
			let _this = ret.outer.zpp_inner.wrap_shapes;
			let obj = s.outer.copy();
			if(_this.zpp_inner.reverse_flag) {
				_this.push(obj);
			} else {
				_this.unshift(obj);
			}
			cx_ite = cx_ite.next;
		}
		ret.posx = this.posx;
		ret.posy = this.posy;
		ret.velx = this.velx;
		ret.vely = this.vely;
		ret.forcex = this.forcex;
		ret.forcey = this.forcey;
		ret.rot = this.rot;
		ret.angvel = this.angvel;
		ret.torque = this.torque;
		ret.kinvelx = this.kinvelx;
		ret.kinvely = this.kinvely;
		ret.kinangvel = this.kinangvel;
		ret.svelx = this.svelx;
		ret.svely = this.svely;
		if(!this.zip_axis) {
			ret.axisx = this.axisx;
			ret.axisy = this.axisy;
		} else {
			ret.zip_axis = true;
			let cx_ite = ret.shapes.head;
			while(cx_ite != null) {
				let s = cx_ite.elt;
				if(s.type == ZPP_Flags.id_ShapeType_POLYGON) {
					s.polygon.invalidate_gverts();
					s.polygon.invalidate_gaxi();
				}
				s.invalidate_worldCOM();
				cx_ite = cx_ite.next;
			}
			ret.zip_worldCOM = true;
		}
		ret.rot = this.rot;
		ret.massMode = this.massMode;
		ret.gravMassMode = this.gravMassMode;
		ret.inertiaMode = this.inertiaMode;
		ret.norotate = this.norotate;
		ret.nomove = this.nomove;
		ret.cmass = this.cmass;
		ret.cinertia = this.cinertia;
		if(!this.zip_mass) {
			ret.mass = this.mass;
		} else {
			ret.invalidate_mass();
		}
		if(!this.zip_gravMass) {
			ret.gravMass = this.gravMass;
		} else {
			ret.invalidate_gravMass();
		}
		if(!this.zip_gravMassScale) {
			ret.gravMassScale = this.gravMassScale;
		} else {
			ret.invalidate_gravMassScale();
		}
		if(!this.zip_inertia) {
			ret.inertia = this.inertia;
		} else {
			ret.invalidate_inertia();
		}
		if(!this.zip_aabb) {
			ret.aabb.minx = this.aabb.minx;
			ret.aabb.miny = this.aabb.miny;
			ret.aabb.maxx = this.aabb.maxx;
			ret.aabb.maxy = this.aabb.maxy;
		} else {
			ret.zip_aabb = true;
		}
		if(!this.zip_localCOM) {
			ret.localCOMx = this.localCOMx;
			ret.localCOMy = this.localCOMy;
		} else {
			ret.zip_localCOM = true;
			ret.zip_worldCOM = true;
		}
		if(!this.zip_worldCOM) {
			ret.worldCOMx = this.worldCOMx;
			ret.worldCOMy = this.worldCOMy;
		} else {
			ret.zip_worldCOM = true;
		}
		this.copyto(ret.outer);
		return ret.outer;
	}
	static bodysetlt(a,b) {
		return a.id < b.id;
	}
	static __static() {
		if(ZPP_Flags.BodyType_STATIC == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.BodyType_STATIC = new BodyType();
			ZPP_Flags.internal = false;
		}
		let ret = new Body(ZPP_Flags.BodyType_STATIC);
		let si = ret.zpp_inner;
		si.world = true;
		si.wrap_shapes.zpp_inner.immutable = true;
		si.smass = si.imass = si.cmass = si.mass = si.gravMass = 0.0;
		si.sinertia = si.iinertia = si.cinertia = si.inertia = 0.0;
		si.cbTypes.clear();
		return ret;
	}
}
ZPP_Body.bodystack = null;
ZPP_Body.bodyset = null;
ZPP_Body.cur_graph_depth = 0;
ZPP_Body.types = (function($this) {
	var $r;
	if(ZPP_Flags.BodyType_STATIC == null) {
		ZPP_Flags.internal = true;
		ZPP_Flags.BodyType_STATIC = new BodyType();
		ZPP_Flags.internal = false;
	}
	let tmp = ZPP_Flags.BodyType_STATIC;
	if(ZPP_Flags.BodyType_DYNAMIC == null) {
		ZPP_Flags.internal = true;
		ZPP_Flags.BodyType_DYNAMIC = new BodyType();
		ZPP_Flags.internal = false;
	}
	let tmp1 = ZPP_Flags.BodyType_DYNAMIC;
	if(ZPP_Flags.BodyType_KINEMATIC == null) {
		ZPP_Flags.internal = true;
		ZPP_Flags.BodyType_KINEMATIC = new BodyType();
		ZPP_Flags.internal = false;
	}
	$r = [null,tmp,tmp1,ZPP_Flags.BodyType_KINEMATIC];
	return $r;
}(this));
