import ZPP_Arbiter from '../../zpp_nape/dynamics/ZPP_Arbiter.js';
import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
import Vec3 from '../geom/Vec3.js';
import Arbiter from './Arbiter.js';
export default class CollisionArbiter extends Arbiter {
	constructor() {
		if(!ZPP_Arbiter.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate CollisionArbiter derp!");
		}
		super();
	}
	get_contacts() {
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		if(this.zpp_inner.colarb.wrap_contacts == null) {
			this.zpp_inner.colarb.setupcontacts();
		}
		return this.zpp_inner.colarb.wrap_contacts;
	}
	get_normal() {
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		if(this.zpp_inner.colarb.wrap_normal == null) {
			this.zpp_inner.colarb.getnormal();
		}
		return this.zpp_inner.colarb.wrap_normal;
	}
	get_radius() {
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		return this.zpp_inner.colarb.radius;
	}
	get_referenceEdge1() {
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		let edge = this.zpp_inner.colarb.__ref_edge1;
		let tmp;
		if(edge != null) {
			if(!this.zpp_inner.active) {
				throw haxe_Exception.thrown("Error: Arbiter not currently in use");
			}
			if((this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.ws2.outer : this.zpp_inner.ws1.outer).zpp_inner.type == ZPP_Flags.id_ShapeType_POLYGON) {
				if(!this.zpp_inner.active) {
					throw haxe_Exception.thrown("Error: Arbiter not currently in use");
				}
				tmp = (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.ws2.outer : this.zpp_inner.ws1.outer).zpp_inner != edge.polygon;
			} else {
				tmp = true;
			}
		} else {
			tmp = false;
		}
		if(tmp) {
			edge = this.zpp_inner.colarb.__ref_edge2;
		}
		if(edge == null) {
			return null;
		} else {
			return edge.wrapper();
		}
	}
	get_referenceEdge2() {
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		let edge = this.zpp_inner.colarb.__ref_edge1;
		let tmp;
		if(edge != null) {
			if(!this.zpp_inner.active) {
				throw haxe_Exception.thrown("Error: Arbiter not currently in use");
			}
			if((this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.ws1.outer : this.zpp_inner.ws2.outer).zpp_inner.type == ZPP_Flags.id_ShapeType_POLYGON) {
				if(!this.zpp_inner.active) {
					throw haxe_Exception.thrown("Error: Arbiter not currently in use");
				}
				tmp = (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.ws1.outer : this.zpp_inner.ws2.outer).zpp_inner != edge.polygon;
			} else {
				tmp = true;
			}
		} else {
			tmp = false;
		}
		if(tmp) {
			edge = this.zpp_inner.colarb.__ref_edge2;
		}
		if(edge == null) {
			return null;
		} else {
			return edge.wrapper();
		}
	}
	firstVertex() {
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		let poly2circle = this.zpp_inner.colarb.__ref_edge1 != null != (this.zpp_inner.colarb.__ref_edge2 != null);
		if(poly2circle) {
			return this.zpp_inner.colarb.__ref_vertex == -1;
		} else {
			return false;
		}
	}
	secondVertex() {
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		let poly2circle = this.zpp_inner.colarb.__ref_edge1 != null != (this.zpp_inner.colarb.__ref_edge2 != null);
		if(poly2circle) {
			return this.zpp_inner.colarb.__ref_vertex == 1;
		} else {
			return false;
		}
	}
	normalImpulse(body,freshOnly) {
		if(freshOnly == null) {
			freshOnly = false;
		}
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		let tmp;
		let tmp1;
		if(body != null) {
			if(!this.zpp_inner.active) {
				throw haxe_Exception.thrown("Error: Arbiter not currently in use");
			}
			tmp1 = body != (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.b2.outer : this.zpp_inner.b1.outer);
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			if(!this.zpp_inner.active) {
				throw haxe_Exception.thrown("Error: Arbiter not currently in use");
			}
			tmp = body != (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.b1.outer : this.zpp_inner.b2.outer);
		} else {
			tmp = false;
		}
		if(tmp) {
			throw haxe_Exception.thrown("Error: Arbiter does not relate to body");
		}
		let retx = 0;
		let rety = 0;
		let retz = 0;
		let colarb = this.zpp_inner.colarb;
		if(!freshOnly || colarb.oc1.fresh) {
			let imp = colarb.oc1.wrapper().normalImpulse(body);
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
		if(colarb.hc2) {
			if(!freshOnly || colarb.oc2.fresh) {
				let imp = colarb.oc2.wrapper().normalImpulse(body);
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
		}
		return Vec3.get(retx,rety,retz);
	}
	tangentImpulse(body,freshOnly) {
		if(freshOnly == null) {
			freshOnly = false;
		}
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		let tmp;
		let tmp1;
		if(body != null) {
			if(!this.zpp_inner.active) {
				throw haxe_Exception.thrown("Error: Arbiter not currently in use");
			}
			tmp1 = body != (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.b2.outer : this.zpp_inner.b1.outer);
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			if(!this.zpp_inner.active) {
				throw haxe_Exception.thrown("Error: Arbiter not currently in use");
			}
			tmp = body != (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.b1.outer : this.zpp_inner.b2.outer);
		} else {
			tmp = false;
		}
		if(tmp) {
			throw haxe_Exception.thrown("Error: Arbiter does not relate to body");
		}
		let retx = 0;
		let rety = 0;
		let retz = 0;
		let colarb = this.zpp_inner.colarb;
		if(!freshOnly || colarb.oc1.fresh) {
			let imp = colarb.oc1.wrapper().tangentImpulse(body);
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
		if(colarb.hc2) {
			if(!freshOnly || colarb.oc2.fresh) {
				let imp = colarb.oc2.wrapper().tangentImpulse(body);
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
		}
		return Vec3.get(retx,rety,retz);
	}
	totalImpulse(body,freshOnly) {
		if(freshOnly == null) {
			freshOnly = false;
		}
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		let tmp;
		let tmp1;
		if(body != null) {
			if(!this.zpp_inner.active) {
				throw haxe_Exception.thrown("Error: Arbiter not currently in use");
			}
			tmp1 = body != (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.b2.outer : this.zpp_inner.b1.outer);
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			if(!this.zpp_inner.active) {
				throw haxe_Exception.thrown("Error: Arbiter not currently in use");
			}
			tmp = body != (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.b1.outer : this.zpp_inner.b2.outer);
		} else {
			tmp = false;
		}
		if(tmp) {
			throw haxe_Exception.thrown("Error: Arbiter does not relate to body");
		}
		let retx = 0;
		let rety = 0;
		let retz = 0;
		let colarb = this.zpp_inner.colarb;
		if(!freshOnly || colarb.oc1.fresh) {
			let imp = colarb.oc1.wrapper().totalImpulse(body);
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
		if(colarb.hc2) {
			if(!freshOnly || colarb.oc2.fresh) {
				let imp = colarb.oc2.wrapper().totalImpulse(body);
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
		}
		return Vec3.get(retx,rety,retz);
	}
	rollingImpulse(body,freshOnly) {
		if(freshOnly == null) {
			freshOnly = false;
		}
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		let tmp;
		let tmp1;
		if(body != null) {
			if(!this.zpp_inner.active) {
				throw haxe_Exception.thrown("Error: Arbiter not currently in use");
			}
			tmp1 = body != (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.b2.outer : this.zpp_inner.b1.outer);
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			if(!this.zpp_inner.active) {
				throw haxe_Exception.thrown("Error: Arbiter not currently in use");
			}
			tmp = body != (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.b1.outer : this.zpp_inner.b2.outer);
		} else {
			tmp = false;
		}
		if(tmp) {
			throw haxe_Exception.thrown("Error: Arbiter does not relate to body");
		}
		let colarb = this.zpp_inner.colarb;
		if(!freshOnly || colarb.oc1.fresh) {
			return colarb.oc1.wrapper().rollingImpulse(body);
		} else {
			return 0.0;
		}
	}
	get_elasticity() {
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		let colarb = this.zpp_inner.colarb;
		if(colarb.invalidated) {
			colarb.invalidated = false;
			if(!colarb.userdef_restitution) {
				if(colarb.s1.material.elasticity <= -Infinity || colarb.s2.material.elasticity <= -Infinity) {
					colarb.restitution = 0;
				} else if(colarb.s1.material.elasticity >= Infinity || colarb.s2.material.elasticity >= Infinity) {
					colarb.restitution = 1;
				} else {
					colarb.restitution = (colarb.s1.material.elasticity + colarb.s2.material.elasticity) / 2;
				}
				if(colarb.restitution < 0) {
					colarb.restitution = 0;
				}
				if(colarb.restitution > 1) {
					colarb.restitution = 1;
				}
			}
			if(!colarb.userdef_dyn_fric) {
				colarb.dyn_fric = Math.sqrt(colarb.s1.material.dynamicFriction * colarb.s2.material.dynamicFriction);
			}
			if(!colarb.userdef_stat_fric) {
				colarb.stat_fric = Math.sqrt(colarb.s1.material.staticFriction * colarb.s2.material.staticFriction);
			}
			if(!colarb.userdef_rfric) {
				colarb.rfric = Math.sqrt(colarb.s1.material.rollingFriction * colarb.s2.material.rollingFriction);
			}
		}
		return colarb.restitution;
	}
	set_elasticity(elasticity) {
		if(!this.zpp_inner.colarb.mutable) {
			throw haxe_Exception.thrown("Error: CollisionArbiter::" + "elasticity" + " is only mutable during a pre-handler");
		}
		if(elasticity != elasticity) {
			throw haxe_Exception.thrown("Error: CollisionArbiter::" + "elasticity" + " cannot be NaN");
		}
		if(elasticity < 0) {
			throw haxe_Exception.thrown("Error: CollisionArbiter::" + "elasticity" + " cannot be negative");
		}
		let colarb = this.zpp_inner.colarb;
		colarb.restitution = elasticity;
		colarb.userdef_restitution = true;
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		let colarb1 = this.zpp_inner.colarb;
		if(colarb1.invalidated) {
			colarb1.invalidated = false;
			if(!colarb1.userdef_restitution) {
				if(colarb1.s1.material.elasticity <= -Infinity || colarb1.s2.material.elasticity <= -Infinity) {
					colarb1.restitution = 0;
				} else if(colarb1.s1.material.elasticity >= Infinity || colarb1.s2.material.elasticity >= Infinity) {
					colarb1.restitution = 1;
				} else {
					colarb1.restitution = (colarb1.s1.material.elasticity + colarb1.s2.material.elasticity) / 2;
				}
				if(colarb1.restitution < 0) {
					colarb1.restitution = 0;
				}
				if(colarb1.restitution > 1) {
					colarb1.restitution = 1;
				}
			}
			if(!colarb1.userdef_dyn_fric) {
				colarb1.dyn_fric = Math.sqrt(colarb1.s1.material.dynamicFriction * colarb1.s2.material.dynamicFriction);
			}
			if(!colarb1.userdef_stat_fric) {
				colarb1.stat_fric = Math.sqrt(colarb1.s1.material.staticFriction * colarb1.s2.material.staticFriction);
			}
			if(!colarb1.userdef_rfric) {
				colarb1.rfric = Math.sqrt(colarb1.s1.material.rollingFriction * colarb1.s2.material.rollingFriction);
			}
		}
		return colarb1.restitution;
	}
	get_dynamicFriction() {
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		let colarb = this.zpp_inner.colarb;
		if(colarb.invalidated) {
			colarb.invalidated = false;
			if(!colarb.userdef_restitution) {
				if(colarb.s1.material.elasticity <= -Infinity || colarb.s2.material.elasticity <= -Infinity) {
					colarb.restitution = 0;
				} else if(colarb.s1.material.elasticity >= Infinity || colarb.s2.material.elasticity >= Infinity) {
					colarb.restitution = 1;
				} else {
					colarb.restitution = (colarb.s1.material.elasticity + colarb.s2.material.elasticity) / 2;
				}
				if(colarb.restitution < 0) {
					colarb.restitution = 0;
				}
				if(colarb.restitution > 1) {
					colarb.restitution = 1;
				}
			}
			if(!colarb.userdef_dyn_fric) {
				colarb.dyn_fric = Math.sqrt(colarb.s1.material.dynamicFriction * colarb.s2.material.dynamicFriction);
			}
			if(!colarb.userdef_stat_fric) {
				colarb.stat_fric = Math.sqrt(colarb.s1.material.staticFriction * colarb.s2.material.staticFriction);
			}
			if(!colarb.userdef_rfric) {
				colarb.rfric = Math.sqrt(colarb.s1.material.rollingFriction * colarb.s2.material.rollingFriction);
			}
		}
		return colarb.dyn_fric;
	}
	set_dynamicFriction(dynamicFriction) {
		if(!this.zpp_inner.colarb.mutable) {
			throw haxe_Exception.thrown("Error: CollisionArbiter::" + "dynamicFriction" + " is only mutable during a pre-handler");
		}
		if(dynamicFriction != dynamicFriction) {
			throw haxe_Exception.thrown("Error: CollisionArbiter::" + "dynamicFriction" + " cannot be NaN");
		}
		if(dynamicFriction < 0) {
			throw haxe_Exception.thrown("Error: CollisionArbiter::" + "dynamicFriction" + " cannot be negative");
		}
		let colarb = this.zpp_inner.colarb;
		colarb.dyn_fric = dynamicFriction;
		colarb.userdef_dyn_fric = true;
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		let colarb1 = this.zpp_inner.colarb;
		if(colarb1.invalidated) {
			colarb1.invalidated = false;
			if(!colarb1.userdef_restitution) {
				if(colarb1.s1.material.elasticity <= -Infinity || colarb1.s2.material.elasticity <= -Infinity) {
					colarb1.restitution = 0;
				} else if(colarb1.s1.material.elasticity >= Infinity || colarb1.s2.material.elasticity >= Infinity) {
					colarb1.restitution = 1;
				} else {
					colarb1.restitution = (colarb1.s1.material.elasticity + colarb1.s2.material.elasticity) / 2;
				}
				if(colarb1.restitution < 0) {
					colarb1.restitution = 0;
				}
				if(colarb1.restitution > 1) {
					colarb1.restitution = 1;
				}
			}
			if(!colarb1.userdef_dyn_fric) {
				colarb1.dyn_fric = Math.sqrt(colarb1.s1.material.dynamicFriction * colarb1.s2.material.dynamicFriction);
			}
			if(!colarb1.userdef_stat_fric) {
				colarb1.stat_fric = Math.sqrt(colarb1.s1.material.staticFriction * colarb1.s2.material.staticFriction);
			}
			if(!colarb1.userdef_rfric) {
				colarb1.rfric = Math.sqrt(colarb1.s1.material.rollingFriction * colarb1.s2.material.rollingFriction);
			}
		}
		return colarb1.dyn_fric;
	}
	get_staticFriction() {
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		let colarb = this.zpp_inner.colarb;
		if(colarb.invalidated) {
			colarb.invalidated = false;
			if(!colarb.userdef_restitution) {
				if(colarb.s1.material.elasticity <= -Infinity || colarb.s2.material.elasticity <= -Infinity) {
					colarb.restitution = 0;
				} else if(colarb.s1.material.elasticity >= Infinity || colarb.s2.material.elasticity >= Infinity) {
					colarb.restitution = 1;
				} else {
					colarb.restitution = (colarb.s1.material.elasticity + colarb.s2.material.elasticity) / 2;
				}
				if(colarb.restitution < 0) {
					colarb.restitution = 0;
				}
				if(colarb.restitution > 1) {
					colarb.restitution = 1;
				}
			}
			if(!colarb.userdef_dyn_fric) {
				colarb.dyn_fric = Math.sqrt(colarb.s1.material.dynamicFriction * colarb.s2.material.dynamicFriction);
			}
			if(!colarb.userdef_stat_fric) {
				colarb.stat_fric = Math.sqrt(colarb.s1.material.staticFriction * colarb.s2.material.staticFriction);
			}
			if(!colarb.userdef_rfric) {
				colarb.rfric = Math.sqrt(colarb.s1.material.rollingFriction * colarb.s2.material.rollingFriction);
			}
		}
		return colarb.stat_fric;
	}
	set_staticFriction(staticFriction) {
		if(!this.zpp_inner.colarb.mutable) {
			throw haxe_Exception.thrown("Error: CollisionArbiter::" + "staticFriction" + " is only mutable during a pre-handler");
		}
		if(staticFriction != staticFriction) {
			throw haxe_Exception.thrown("Error: CollisionArbiter::" + "staticFriction" + " cannot be NaN");
		}
		if(staticFriction < 0) {
			throw haxe_Exception.thrown("Error: CollisionArbiter::" + "staticFriction" + " cannot be negative");
		}
		let colarb = this.zpp_inner.colarb;
		colarb.stat_fric = staticFriction;
		colarb.userdef_stat_fric = true;
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		let colarb1 = this.zpp_inner.colarb;
		if(colarb1.invalidated) {
			colarb1.invalidated = false;
			if(!colarb1.userdef_restitution) {
				if(colarb1.s1.material.elasticity <= -Infinity || colarb1.s2.material.elasticity <= -Infinity) {
					colarb1.restitution = 0;
				} else if(colarb1.s1.material.elasticity >= Infinity || colarb1.s2.material.elasticity >= Infinity) {
					colarb1.restitution = 1;
				} else {
					colarb1.restitution = (colarb1.s1.material.elasticity + colarb1.s2.material.elasticity) / 2;
				}
				if(colarb1.restitution < 0) {
					colarb1.restitution = 0;
				}
				if(colarb1.restitution > 1) {
					colarb1.restitution = 1;
				}
			}
			if(!colarb1.userdef_dyn_fric) {
				colarb1.dyn_fric = Math.sqrt(colarb1.s1.material.dynamicFriction * colarb1.s2.material.dynamicFriction);
			}
			if(!colarb1.userdef_stat_fric) {
				colarb1.stat_fric = Math.sqrt(colarb1.s1.material.staticFriction * colarb1.s2.material.staticFriction);
			}
			if(!colarb1.userdef_rfric) {
				colarb1.rfric = Math.sqrt(colarb1.s1.material.rollingFriction * colarb1.s2.material.rollingFriction);
			}
		}
		return colarb1.stat_fric;
	}
	get_rollingFriction() {
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		let colarb = this.zpp_inner.colarb;
		if(colarb.invalidated) {
			colarb.invalidated = false;
			if(!colarb.userdef_restitution) {
				if(colarb.s1.material.elasticity <= -Infinity || colarb.s2.material.elasticity <= -Infinity) {
					colarb.restitution = 0;
				} else if(colarb.s1.material.elasticity >= Infinity || colarb.s2.material.elasticity >= Infinity) {
					colarb.restitution = 1;
				} else {
					colarb.restitution = (colarb.s1.material.elasticity + colarb.s2.material.elasticity) / 2;
				}
				if(colarb.restitution < 0) {
					colarb.restitution = 0;
				}
				if(colarb.restitution > 1) {
					colarb.restitution = 1;
				}
			}
			if(!colarb.userdef_dyn_fric) {
				colarb.dyn_fric = Math.sqrt(colarb.s1.material.dynamicFriction * colarb.s2.material.dynamicFriction);
			}
			if(!colarb.userdef_stat_fric) {
				colarb.stat_fric = Math.sqrt(colarb.s1.material.staticFriction * colarb.s2.material.staticFriction);
			}
			if(!colarb.userdef_rfric) {
				colarb.rfric = Math.sqrt(colarb.s1.material.rollingFriction * colarb.s2.material.rollingFriction);
			}
		}
		return colarb.rfric;
	}
	set_rollingFriction(rollingFriction) {
		if(!this.zpp_inner.colarb.mutable) {
			throw haxe_Exception.thrown("Error: CollisionArbiter::" + "rollingFriction" + " is only mutable during a pre-handler");
		}
		if(rollingFriction != rollingFriction) {
			throw haxe_Exception.thrown("Error: CollisionArbiter::" + "rollingFriction" + " cannot be NaN");
		}
		if(rollingFriction < 0) {
			throw haxe_Exception.thrown("Error: CollisionArbiter::" + "rollingFriction" + " cannot be negative");
		}
		let colarb = this.zpp_inner.colarb;
		colarb.rfric = rollingFriction;
		colarb.userdef_rfric = true;
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		let colarb1 = this.zpp_inner.colarb;
		if(colarb1.invalidated) {
			colarb1.invalidated = false;
			if(!colarb1.userdef_restitution) {
				if(colarb1.s1.material.elasticity <= -Infinity || colarb1.s2.material.elasticity <= -Infinity) {
					colarb1.restitution = 0;
				} else if(colarb1.s1.material.elasticity >= Infinity || colarb1.s2.material.elasticity >= Infinity) {
					colarb1.restitution = 1;
				} else {
					colarb1.restitution = (colarb1.s1.material.elasticity + colarb1.s2.material.elasticity) / 2;
				}
				if(colarb1.restitution < 0) {
					colarb1.restitution = 0;
				}
				if(colarb1.restitution > 1) {
					colarb1.restitution = 1;
				}
			}
			if(!colarb1.userdef_dyn_fric) {
				colarb1.dyn_fric = Math.sqrt(colarb1.s1.material.dynamicFriction * colarb1.s2.material.dynamicFriction);
			}
			if(!colarb1.userdef_stat_fric) {
				colarb1.stat_fric = Math.sqrt(colarb1.s1.material.staticFriction * colarb1.s2.material.staticFriction);
			}
			if(!colarb1.userdef_rfric) {
				colarb1.rfric = Math.sqrt(colarb1.s1.material.rollingFriction * colarb1.s2.material.rollingFriction);
			}
		}
		return colarb1.rfric;
	}
}
