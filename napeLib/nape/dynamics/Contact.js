import ZPP_Contact from '../../zpp_nape/dynamics/ZPP_Contact.js';
import ZPP_Arbiter from '../../zpp_nape/dynamics/ZPP_Arbiter.js';
import Vec3 from '../geom/Vec3.js';
export default class Contact {
	constructor() {
		this.zpp_inner = null;
		if(!ZPP_Contact.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate Contact derp!");
		}
	}
	get_arbiter() {
		if(this.zpp_inner.arbiter == null) {
			return null;
		} else {
			let _this = this.zpp_inner.arbiter.outer;
			if(_this.zpp_inner.type == ZPP_Arbiter.COL) {
				return _this.zpp_inner.colarb.outer_zn;
			} else {
				return null;
			}
		}
	}
	get_penetration() {
		if(this.zpp_inner.inactiveme()) {
			throw haxe_Exception.thrown("Error: Contact not currently in use");
		}
		return -this.zpp_inner.dist;
	}
	get_position() {
		if(this.zpp_inner.inactiveme()) {
			throw haxe_Exception.thrown("Error: Contact not currently in use");
		}
		if(this.zpp_inner.wrap_position == null) {
			this.zpp_inner.getposition();
		}
		return this.zpp_inner.wrap_position;
	}
	get_fresh() {
		if(this.zpp_inner.inactiveme()) {
			throw haxe_Exception.thrown("Error: Contact not currently in use");
		}
		return this.zpp_inner.fresh;
	}
	normalImpulse(body) {
		if(this.zpp_inner.inactiveme()) {
			throw haxe_Exception.thrown("Error: Contact not currently in use");
		}
		let colarb = this.zpp_inner.arbiter.colarb;
		let cin = this.zpp_inner.inner;
		let jnAcc = cin.jnAcc;
		if(body == null) {
			return Vec3.get(colarb.nx * jnAcc,colarb.ny * jnAcc);
		} else {
			if(body != colarb.b1.outer && body != colarb.b2.outer) {
				throw haxe_Exception.thrown("Error: Contact does not relate to the given body");
			}
			if(body == colarb.b1.outer) {
				return Vec3.get(colarb.nx * -jnAcc,colarb.ny * -jnAcc,-(colarb.ny * cin.r1x - colarb.nx * cin.r1y) * jnAcc);
			} else {
				return Vec3.get(colarb.nx * jnAcc,colarb.ny * jnAcc,(colarb.ny * cin.r2x - colarb.nx * cin.r2y) * jnAcc);
			}
		}
	}
	tangentImpulse(body) {
		if(this.zpp_inner.inactiveme()) {
			throw haxe_Exception.thrown("Error: Contact not currently in use");
		}
		let colarb = this.zpp_inner.arbiter.colarb;
		let cin = this.zpp_inner.inner;
		let jtAcc = cin.jtAcc;
		if(body == null) {
			return Vec3.get(-colarb.ny * jtAcc,colarb.nx * jtAcc);
		} else {
			if(body != colarb.b1.outer && body != colarb.b2.outer) {
				throw haxe_Exception.thrown("Error: Contact does not relate to the given body");
			}
			if(body == colarb.b1.outer) {
				return Vec3.get(colarb.ny * jtAcc,-colarb.nx * jtAcc,-(cin.r1x * colarb.nx + cin.r1y * colarb.ny) * jtAcc);
			} else {
				return Vec3.get(-colarb.ny * jtAcc,colarb.nx * jtAcc,(cin.r2x * colarb.nx + cin.r2y * colarb.ny) * jtAcc);
			}
		}
	}
	rollingImpulse(body) {
		if(this.zpp_inner.inactiveme()) {
			throw haxe_Exception.thrown("Error: Contact not currently in use");
		}
		let colarb = this.zpp_inner.arbiter.colarb;
		let jrAcc = this.zpp_inner.arbiter.colarb.jrAcc;
		if(body == null) {
			return jrAcc;
		} else {
			if(body != colarb.b1.outer && body != colarb.b2.outer) {
				throw haxe_Exception.thrown("Error: Contact does not relate to the given body");
			}
			if(body == colarb.b1.outer) {
				return -jrAcc;
			} else {
				return jrAcc;
			}
		}
	}
	totalImpulse(body) {
		if(this.zpp_inner.inactiveme()) {
			throw haxe_Exception.thrown("Error: Contact not currently in use");
		}
		let colarb = this.zpp_inner.arbiter.colarb;
		let cin = this.zpp_inner.inner;
		let jnAcc = cin.jnAcc;
		let jtAcc = cin.jtAcc;
		let jrAcc = colarb.jrAcc;
		if(body == null) {
			return Vec3.get(colarb.nx * jnAcc - colarb.ny * jtAcc,colarb.ny * jnAcc + colarb.nx * jtAcc,jrAcc);
		} else {
			if(body != colarb.b1.outer && body != colarb.b2.outer) {
				throw haxe_Exception.thrown("Error: Contact does not relate to the given body");
			}
			let jx = colarb.nx * jnAcc - colarb.ny * jtAcc;
			let jy = colarb.ny * jnAcc + colarb.nx * jtAcc;
			if(body == colarb.b1.outer) {
				return Vec3.get(-jx,-jy,-(jy * cin.r1x - jx * cin.r1y) - jrAcc);
			} else {
				return Vec3.get(jx,jy,jy * cin.r2x - jx * cin.r2y + jrAcc);
			}
		}
	}
	get_friction() {
		if(this.zpp_inner.inactiveme()) {
			throw haxe_Exception.thrown("Error: Contact not currently in use");
		}
		return this.zpp_inner.inner.friction;
	}
	toString() {
		if(this.zpp_inner.arbiter == null || this.zpp_inner.arbiter.cleared) {
			return "{object-pooled}";
		} else {
			return "{Contact}";
		}
	}
}
