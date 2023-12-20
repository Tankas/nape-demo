import ZPP_Arbiter from '../../zpp_nape/dynamics/ZPP_Arbiter.js';
import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
import Vec3 from '../geom/Vec3.js';
import PreFlag from '../callbacks/PreFlag.js';
export default class Arbiter {
	constructor() {
		this.zpp_inner = null;
		if(!ZPP_Arbiter.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate Arbiter derp!");
		}
	}
	get_isSleeping() {
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		return this.zpp_inner.sleeping;
	}
	get_type() {
		return ZPP_Arbiter.types[this.zpp_inner.type];
	}
	isCollisionArbiter() {
		return this.zpp_inner.type == ZPP_Arbiter.COL;
	}
	isFluidArbiter() {
		return this.zpp_inner.type == ZPP_Arbiter.FLUID;
	}
	isSensorArbiter() {
		return this.zpp_inner.type == ZPP_Arbiter.SENSOR;
	}
	get_collisionArbiter() {
		if(this.zpp_inner.type == ZPP_Arbiter.COL) {
			return this.zpp_inner.colarb.outer_zn;
		} else {
			return null;
		}
	}
	get_fluidArbiter() {
		if(this.zpp_inner.type == ZPP_Arbiter.FLUID) {
			return this.zpp_inner.fluidarb.outer_zn;
		} else {
			return null;
		}
	}
	get_shape1() {
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		if(this.zpp_inner.ws1.id > this.zpp_inner.ws2.id) {
			return this.zpp_inner.ws2.outer;
		} else {
			return this.zpp_inner.ws1.outer;
		}
	}
	get_shape2() {
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		if(this.zpp_inner.ws1.id > this.zpp_inner.ws2.id) {
			return this.zpp_inner.ws1.outer;
		} else {
			return this.zpp_inner.ws2.outer;
		}
	}
	get_body1() {
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		if(this.zpp_inner.ws1.id > this.zpp_inner.ws2.id) {
			return this.zpp_inner.b2.outer;
		} else {
			return this.zpp_inner.b1.outer;
		}
	}
	get_body2() {
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		if(this.zpp_inner.ws1.id > this.zpp_inner.ws2.id) {
			return this.zpp_inner.b1.outer;
		} else {
			return this.zpp_inner.b2.outer;
		}
	}
	get_state() {
		if(!this.zpp_inner.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		let _g = this.zpp_inner.immState;
		let x = _g;
		if(x == (ZPP_Flags.id_ImmState_ACCEPT | ZPP_Flags.id_ImmState_ALWAYS)) {
			if(ZPP_Flags.PreFlag_ACCEPT == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.PreFlag_ACCEPT = new PreFlag();
				ZPP_Flags.internal = false;
			}
			return ZPP_Flags.PreFlag_ACCEPT;
		} else {
			let x = _g;
			if(x == ZPP_Flags.id_ImmState_ACCEPT) {
				if(ZPP_Flags.PreFlag_ACCEPT_ONCE == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.PreFlag_ACCEPT_ONCE = new PreFlag();
					ZPP_Flags.internal = false;
				}
				return ZPP_Flags.PreFlag_ACCEPT_ONCE;
			} else {
				let x = _g;
				if(x == (ZPP_Flags.id_ImmState_IGNORE | ZPP_Flags.id_ImmState_ALWAYS)) {
					if(ZPP_Flags.PreFlag_IGNORE == null) {
						ZPP_Flags.internal = true;
						ZPP_Flags.PreFlag_IGNORE = new PreFlag();
						ZPP_Flags.internal = false;
					}
					return ZPP_Flags.PreFlag_IGNORE;
				} else {
					if(ZPP_Flags.PreFlag_IGNORE_ONCE == null) {
						ZPP_Flags.internal = true;
						ZPP_Flags.PreFlag_IGNORE_ONCE = new PreFlag();
						ZPP_Flags.internal = false;
					}
					return ZPP_Flags.PreFlag_IGNORE_ONCE;
				}
			}
		}
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
		return Vec3.get(0,0,0);
	}
	toString() {
		let ret = this.zpp_inner.type == ZPP_Arbiter.COL ? "CollisionArbiter" : this.zpp_inner.type == ZPP_Arbiter.FLUID ? "FluidArbiter" : "SensorArbiter";
		if(this.zpp_inner.cleared) {
			return ret + "(object-pooled)";
		} else {
			if(!this.zpp_inner.active) {
				throw haxe_Exception.thrown("Error: Arbiter not currently in use");
			}
			let tmp = ret + "(" + (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.ws2.outer : this.zpp_inner.ws1.outer).toString() + "|";
			if(!this.zpp_inner.active) {
				throw haxe_Exception.thrown("Error: Arbiter not currently in use");
			}
			let tmp1 = tmp + (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.ws1.outer : this.zpp_inner.ws2.outer).toString() + ")";
			let tmp2 = this.zpp_inner.type == ZPP_Arbiter.COL ? "[" + ["SD","DD"][this.zpp_inner.colarb.stat ? 0 : 1] + "]" : "";
			if(!this.zpp_inner.active) {
				throw haxe_Exception.thrown("Error: Arbiter not currently in use");
			}
			let tmp3;
			let _g = this.zpp_inner.immState;
			let x = _g;
			if(x == (ZPP_Flags.id_ImmState_ACCEPT | ZPP_Flags.id_ImmState_ALWAYS)) {
				if(ZPP_Flags.PreFlag_ACCEPT == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.PreFlag_ACCEPT = new PreFlag();
					ZPP_Flags.internal = false;
				}
				tmp3 = ZPP_Flags.PreFlag_ACCEPT;
			} else {
				let x = _g;
				if(x == ZPP_Flags.id_ImmState_ACCEPT) {
					if(ZPP_Flags.PreFlag_ACCEPT_ONCE == null) {
						ZPP_Flags.internal = true;
						ZPP_Flags.PreFlag_ACCEPT_ONCE = new PreFlag();
						ZPP_Flags.internal = false;
					}
					tmp3 = ZPP_Flags.PreFlag_ACCEPT_ONCE;
				} else {
					let x = _g;
					if(x == (ZPP_Flags.id_ImmState_IGNORE | ZPP_Flags.id_ImmState_ALWAYS)) {
						if(ZPP_Flags.PreFlag_IGNORE == null) {
							ZPP_Flags.internal = true;
							ZPP_Flags.PreFlag_IGNORE = new PreFlag();
							ZPP_Flags.internal = false;
						}
						tmp3 = ZPP_Flags.PreFlag_IGNORE;
					} else {
						if(ZPP_Flags.PreFlag_IGNORE_ONCE == null) {
							ZPP_Flags.internal = true;
							ZPP_Flags.PreFlag_IGNORE_ONCE = new PreFlag();
							ZPP_Flags.internal = false;
						}
						tmp3 = ZPP_Flags.PreFlag_IGNORE_ONCE;
					}
				}
			}
			return tmp1 + tmp2 + "<-" + tmp3.toString();
		}
	}
}
