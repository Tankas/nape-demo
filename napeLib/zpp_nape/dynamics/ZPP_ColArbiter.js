import ZPP_PubPool from '../util/ZPP_PubPool.js';
import ZPP_ContactList from '../util/ZPP_ContactList.js';
import ZNPNode_ZPP_Arbiter from '../util/ZNPNode_ZPP_Arbiter.js';
import ZPP_Vec2 from '../geom/ZPP_Vec2.js';
import ZPP_IContact from './ZPP_IContact.js';
import ZPP_Contact from './ZPP_Contact.js';
import ZPP_Arbiter from './ZPP_Arbiter.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import Vec2 from '../../nape/geom/Vec2.js';
import Config from '../../nape/Config.js';
export default class ZPP_ColArbiter extends ZPP_Arbiter {
	constructor() {
		ZPP_Arbiter._hx_skip_constructor = true;
		super();
		ZPP_Arbiter._hx_skip_constructor = false;
		this._hx_constructor();
	}
	_hx_constructor() {
		this.pre_dt = 0.0;
		this.mutable = false;
		this.stat = false;
		this.next = null;
		this.hpc2 = false;
		this.hc2 = false;
		this.oc2 = null;
		this.c2 = null;
		this.oc1 = null;
		this.c1 = null;
		this.__ref_vertex = 0;
		this.__ref_edge2 = null;
		this.__ref_edge1 = null;
		this.biasCoef = 0.0;
		this.rev = false;
		this.radius = 0.0;
		this.lproj = 0.0;
		this.lnormy = 0.0;
		this.lnormx = 0.0;
		this.surfacey = 0.0;
		this.surfacex = 0.0;
		this.k2y = 0.0;
		this.k2x = 0.0;
		this.k1y = 0.0;
		this.k1x = 0.0;
		this.rt2b = 0.0;
		this.rn2b = 0.0;
		this.rt2a = 0.0;
		this.rn2a = 0.0;
		this.rt1b = 0.0;
		this.rn1b = 0.0;
		this.rt1a = 0.0;
		this.rn1a = 0.0;
		this.jrAcc = 0.0;
		this.rMass = 0.0;
		this.Kc = 0.0;
		this.Kb = 0.0;
		this.Ka = 0.0;
		this.kMassc = 0.0;
		this.kMassb = 0.0;
		this.kMassa = 0.0;
		this.wrap_normal = null;
		this.ny = 0.0;
		this.nx = 0.0;
		this.innards = null;
		this.wrap_contacts = null;
		this.contacts = null;
		this.s2 = null;
		this.s1 = null;
		this.userdef_rfric = false;
		this.userdef_restitution = false;
		this.userdef_stat_fric = false;
		this.userdef_dyn_fric = false;
		this.rfric = 0.0;
		this.restitution = 0.0;
		this.stat_fric = 0.0;
		this.dyn_fric = 0.0;
		this.outer_zn = null;
		super._hx_constructor();
		this.pre_dt = -1.0;
		this.contacts = new ZPP_Contact();
		this.innards = new ZPP_IContact();
		this.type = ZPP_Arbiter.COL;
		this.colarb = this;
	}
	normal_validate() {
		if(this.cleared) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		this.wrap_normal.zpp_inner.x = this.nx;
		this.wrap_normal.zpp_inner.y = this.ny;
		if(this.ws1.id > this.ws2.id) {
			this.wrap_normal.zpp_inner.x = -this.wrap_normal.zpp_inner.x;
			this.wrap_normal.zpp_inner.y = -this.wrap_normal.zpp_inner.y;
		}
	}
	getnormal() {
		let x = 0;
		let y = 0;
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
		this.wrap_normal = ret;
		this.wrap_normal.zpp_inner._immutable = true;
		this.wrap_normal.zpp_inner._inuse = true;
		this.wrap_normal.zpp_inner._validate = $bind(this,this.normal_validate);
	}
	alloc() {
	}
	free() {
		this.userdef_dyn_fric = false;
		this.userdef_stat_fric = false;
		this.userdef_restitution = false;
		this.userdef_rfric = false;
		this.__ref_edge1 = this.__ref_edge2 = null;
	}
	injectContact(px,py,nx,ny,dist,hash,posOnly) {
		if(posOnly == null) {
			posOnly = false;
		}
		let c = null;
		let cx_ite = this.contacts.next;
		while(cx_ite != null) {
			let cur = cx_ite;
			if(hash == cur.hash) {
				c = cur;
				break;
			}
			cx_ite = cx_ite.next;
		}
		if(c == null) {
			if(ZPP_Contact.zpp_pool == null) {
				c = new ZPP_Contact();
			} else {
				c = ZPP_Contact.zpp_pool;
				ZPP_Contact.zpp_pool = c.next;
				c.next = null;
			}
			let ci = c.inner;
			ci.jnAcc = ci.jtAcc = 0;
			c.hash = hash;
			c.fresh = true;
			c.arbiter = this;
			this.jrAcc = 0;
			let _this = this.contacts;
			c._inuse = true;
			let temp = c;
			temp.next = _this.next;
			_this.next = temp;
			_this.modified = true;
			_this.length++;
			this.innards.add(ci);
		} else {
			c.fresh = false;
		}
		c.px = px;
		c.py = py;
		this.nx = nx;
		this.ny = ny;
		c.dist = dist;
		c.stamp = this.stamp;
		c.posOnly = posOnly;
		return c;
	}
	assign(s1,s2,id,di) {
		this.b1 = s1.body;
		this.ws1 = s1;
		this.b2 = s2.body;
		this.ws2 = s2;
		this.id = id;
		this.di = di;
		let _this = this.b1.arbiters;
		let ret;
		if(ZNPNode_ZPP_Arbiter.zpp_pool == null) {
			ret = new ZNPNode_ZPP_Arbiter();
		} else {
			ret = ZNPNode_ZPP_Arbiter.zpp_pool;
			ZNPNode_ZPP_Arbiter.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.elt = this;
		let temp = ret;
		temp.next = _this.head;
		_this.head = temp;
		_this.modified = true;
		_this.length++;
		let _this1 = this.b2.arbiters;
		let ret1;
		if(ZNPNode_ZPP_Arbiter.zpp_pool == null) {
			ret1 = new ZNPNode_ZPP_Arbiter();
		} else {
			ret1 = ZNPNode_ZPP_Arbiter.zpp_pool;
			ZNPNode_ZPP_Arbiter.zpp_pool = ret1.next;
			ret1.next = null;
		}
		ret1.elt = this;
		let temp1 = ret1;
		temp1.next = _this1.head;
		_this1.head = temp1;
		_this1.modified = true;
		_this1.length++;
		this.active = true;
		this.present = 0;
		this.cleared = false;
		this.sleeping = false;
		this.fresh = false;
		this.presentable = false;
		this.s1 = s1;
		this.s2 = s2;
		if(!this.userdef_restitution) {
			if(this.s1.material.elasticity <= -Infinity || this.s2.material.elasticity <= -Infinity) {
				this.restitution = 0;
			} else if(this.s1.material.elasticity >= Infinity || this.s2.material.elasticity >= Infinity) {
				this.restitution = 1;
			} else {
				this.restitution = (this.s1.material.elasticity + this.s2.material.elasticity) / 2;
			}
			if(this.restitution < 0) {
				this.restitution = 0;
			}
			if(this.restitution > 1) {
				this.restitution = 1;
			}
		}
		if(!this.userdef_dyn_fric) {
			this.dyn_fric = Math.sqrt(this.s1.material.dynamicFriction * this.s2.material.dynamicFriction);
		}
		if(!this.userdef_stat_fric) {
			this.stat_fric = Math.sqrt(this.s1.material.staticFriction * this.s2.material.staticFriction);
		}
		if(!this.userdef_rfric) {
			this.rfric = Math.sqrt(this.s1.material.rollingFriction * this.s2.material.rollingFriction);
		}
	}
	calcProperties() {
		if(!this.userdef_restitution) {
			if(this.s1.material.elasticity <= -Infinity || this.s2.material.elasticity <= -Infinity) {
				this.restitution = 0;
			} else if(this.s1.material.elasticity >= Infinity || this.s2.material.elasticity >= Infinity) {
				this.restitution = 1;
			} else {
				this.restitution = (this.s1.material.elasticity + this.s2.material.elasticity) / 2;
			}
			if(this.restitution < 0) {
				this.restitution = 0;
			}
			if(this.restitution > 1) {
				this.restitution = 1;
			}
		}
		if(!this.userdef_dyn_fric) {
			this.dyn_fric = Math.sqrt(this.s1.material.dynamicFriction * this.s2.material.dynamicFriction);
		}
		if(!this.userdef_stat_fric) {
			this.stat_fric = Math.sqrt(this.s1.material.staticFriction * this.s2.material.staticFriction);
		}
		if(!this.userdef_rfric) {
			this.rfric = Math.sqrt(this.s1.material.rollingFriction * this.s2.material.rollingFriction);
		}
	}
	validate_props() {
		if(this.invalidated) {
			this.invalidated = false;
			if(!this.userdef_restitution) {
				if(this.s1.material.elasticity <= -Infinity || this.s2.material.elasticity <= -Infinity) {
					this.restitution = 0;
				} else if(this.s1.material.elasticity >= Infinity || this.s2.material.elasticity >= Infinity) {
					this.restitution = 1;
				} else {
					this.restitution = (this.s1.material.elasticity + this.s2.material.elasticity) / 2;
				}
				if(this.restitution < 0) {
					this.restitution = 0;
				}
				if(this.restitution > 1) {
					this.restitution = 1;
				}
			}
			if(!this.userdef_dyn_fric) {
				this.dyn_fric = Math.sqrt(this.s1.material.dynamicFriction * this.s2.material.dynamicFriction);
			}
			if(!this.userdef_stat_fric) {
				this.stat_fric = Math.sqrt(this.s1.material.staticFriction * this.s2.material.staticFriction);
			}
			if(!this.userdef_rfric) {
				this.rfric = Math.sqrt(this.s1.material.rollingFriction * this.s2.material.rollingFriction);
			}
		}
	}
	retire() {
		if(!this.cleared) {
			let _this = this.b1.arbiters;
			let pre = null;
			let cur = _this.head;
			let ret = false;
			while(cur != null) {
				if(cur.elt == this) {
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
			let _this1 = this.b2.arbiters;
			let pre1 = null;
			let cur1 = _this1.head;
			let ret1 = false;
			while(cur1 != null) {
				if(cur1.elt == this) {
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
			if(this.pair != null) {
				this.pair.arb = null;
				this.pair = null;
			}
		}
		this.b1 = this.b2 = null;
		this.active = false;
		this.intchange = false;
		while(this.contacts.next != null) {
			let _this = this.contacts;
			let ret = _this.next;
			_this.pop();
			let o = ret;
			o.arbiter = null;
			o.next = ZPP_Contact.zpp_pool;
			ZPP_Contact.zpp_pool = o;
			let _this1 = this.innards;
			let ret1 = _this1.next;
			_this1.next = ret1.next;
			ret1._inuse = false;
			if(_this1.next == null) {
				_this1.pushmod = true;
			}
			_this1.modified = true;
			_this1.length--;
		}
		let o = this;
		o.userdef_dyn_fric = false;
		o.userdef_stat_fric = false;
		o.userdef_restitution = false;
		o.userdef_rfric = false;
		o.__ref_edge1 = o.__ref_edge2 = null;
		o.next = ZPP_ColArbiter.zpp_pool;
		ZPP_ColArbiter.zpp_pool = o;
		this.pre_dt = -1.0;
	}
	makemutable() {
		this.mutable = true;
		if(this.wrap_normal != null) {
			this.wrap_normal.zpp_inner._immutable = false;
		}
		if(this.wrap_contacts != null) {
			this.wrap_contacts.zpp_inner.immutable = false;
		}
	}
	makeimmutable() {
		this.mutable = false;
		if(this.wrap_normal != null) {
			this.wrap_normal.zpp_inner._immutable = true;
		}
		if(this.wrap_contacts != null) {
			this.wrap_contacts.zpp_inner.immutable = true;
		}
	}
	contacts_adder(x) {
		throw haxe_Exception.thrown("Error: Cannot add new contacts, information required is far too specific and detailed :)");
	}
	contacts_subber(x) {
		let pre = null;
		let prei = null;
		let cx_itei = this.innards.next;
		let cx_ite = this.contacts.next;
		while(cx_ite != null) {
			let c = cx_ite;
			if(c == x.zpp_inner) {
				this.contacts.erase(pre);
				this.innards.erase(prei);
				let o = c;
				o.arbiter = null;
				o.next = ZPP_Contact.zpp_pool;
				ZPP_Contact.zpp_pool = o;
				break;
			}
			pre = cx_ite;
			prei = cx_itei;
			cx_itei = cx_itei.next;
			cx_ite = cx_ite.next;
		}
	}
	setupcontacts() {
		this.wrap_contacts = ZPP_ContactList.get(this.contacts,true);
		this.wrap_contacts.zpp_inner.immutable = !this.mutable;
		this.wrap_contacts.zpp_inner.adder = $bind(this,this.contacts_adder);
		this.wrap_contacts.zpp_inner.dontremove = true;
		this.wrap_contacts.zpp_inner.subber = $bind(this,this.contacts_subber);
	}
	cleanupContacts() {
		let fst = true;
		let pre = null;
		let prei = null;
		let cx_itei = this.innards.next;
		this.hc2 = false;
		let cx_ite = this.contacts.next;
		while(cx_ite != null) {
			let c = cx_ite;
			if(c.stamp + Config.arbiterExpirationDelay < this.stamp) {
				let _this = this.contacts;
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
				let _this1 = this.innards;
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
			c.active = c.stamp == this.stamp;
			if(c.active) {
				if(fst) {
					fst = false;
					this.c1 = ci;
					this.oc1 = c;
				} else {
					this.hc2 = true;
					this.c2 = ci;
					this.oc2 = c;
				}
			}
			if(pact != c.active) {
				this.contacts.modified = true;
			}
			pre = cx_ite;
			prei = cx_itei;
			cx_itei = cx_itei.next;
			cx_ite = cx_ite.next;
		}
		if(this.hc2) {
			this.hpc2 = true;
			if(this.oc1.posOnly) {
				let tmp = this.c1;
				this.c1 = this.c2;
				this.c2 = tmp;
				let tmp2 = this.oc1;
				this.oc1 = this.oc2;
				this.oc2 = tmp2;
				this.hc2 = false;
			} else if(this.oc2.posOnly) {
				this.hc2 = false;
			}
			if(this.oc1.posOnly) {
				fst = true;
			}
		} else {
			this.hpc2 = false;
		}
		return fst;
	}
	preStep(dt) {
		if(this.invalidated) {
			this.invalidated = false;
			if(!this.userdef_restitution) {
				if(this.s1.material.elasticity <= -Infinity || this.s2.material.elasticity <= -Infinity) {
					this.restitution = 0;
				} else if(this.s1.material.elasticity >= Infinity || this.s2.material.elasticity >= Infinity) {
					this.restitution = 1;
				} else {
					this.restitution = (this.s1.material.elasticity + this.s2.material.elasticity) / 2;
				}
				if(this.restitution < 0) {
					this.restitution = 0;
				}
				if(this.restitution > 1) {
					this.restitution = 1;
				}
			}
			if(!this.userdef_dyn_fric) {
				this.dyn_fric = Math.sqrt(this.s1.material.dynamicFriction * this.s2.material.dynamicFriction);
			}
			if(!this.userdef_stat_fric) {
				this.stat_fric = Math.sqrt(this.s1.material.staticFriction * this.s2.material.staticFriction);
			}
			if(!this.userdef_rfric) {
				this.rfric = Math.sqrt(this.s1.material.rollingFriction * this.s2.material.rollingFriction);
			}
		}
		if(this.pre_dt == -1.0) {
			this.pre_dt = dt;
		}
		let dtratio = dt / this.pre_dt;
		this.pre_dt = dt;
		let mass_sum = this.b1.smass + this.b2.smass;
		this.hc2 = false;
		let fst = true;
		let statType = this.b1.type != ZPP_Flags.id_BodyType_DYNAMIC || this.b2.type != ZPP_Flags.id_BodyType_DYNAMIC;
		let bias = statType ? this.continuous ? Config.contactContinuousStaticBiasCoef : Config.contactStaticBiasCoef : this.continuous ? Config.contactContinuousBiasCoef : Config.contactBiasCoef;
		this.biasCoef = bias;
		this.continuous = false;
		let pre = null;
		let prei = null;
		let cx_itei = this.innards.next;
		let cx_ite = this.contacts.next;
		while(cx_ite != null) {
			let c = cx_ite;
			if(c.stamp + Config.arbiterExpirationDelay < this.stamp) {
				let _this = this.contacts;
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
				let _this1 = this.innards;
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
			c.active = c.stamp == this.stamp;
			if(c.active) {
				if(fst) {
					fst = false;
					this.c1 = ci;
					this.oc1 = c;
				} else {
					this.hc2 = true;
					this.c2 = ci;
					this.oc2 = c;
				}
				ci.r2x = c.px - this.b2.posx;
				ci.r2y = c.py - this.b2.posy;
				ci.r1x = c.px - this.b1.posx;
				ci.r1y = c.py - this.b1.posy;
				let x = ci.r2x * this.nx + ci.r2y * this.ny;
				let kt = mass_sum + this.b2.sinertia * (x * x);
				let x1 = ci.r1x * this.nx + ci.r1y * this.ny;
				kt += this.b1.sinertia * (x1 * x1);
				ci.tMass = kt < Config.epsilon * Config.epsilon ? 0 : 1.0 / kt;
				let x2 = this.ny * ci.r2x - this.nx * ci.r2y;
				let nt = mass_sum + this.b2.sinertia * (x2 * x2);
				let x3 = this.ny * ci.r1x - this.nx * ci.r1y;
				nt += this.b1.sinertia * (x3 * x3);
				ci.nMass = nt < Config.epsilon * Config.epsilon ? 0 : 1.0 / nt;
				let vrx = 0.0;
				let vry = 0.0;
				let ang = this.b2.angvel + this.b2.kinangvel;
				vrx = this.b2.velx + this.b2.kinvelx - ci.r2y * ang;
				vry = this.b2.vely + this.b2.kinvely + ci.r2x * ang;
				ang = this.b1.angvel + this.b1.kinangvel;
				vrx -= this.b1.velx + this.b1.kinvelx - ci.r1y * ang;
				vry -= this.b1.vely + this.b1.kinvely + ci.r1x * ang;
				let vdot = this.nx * vrx + this.ny * vry;
				c.elasticity = this.restitution;
				ci.bounce = vdot * c.elasticity;
				if(ci.bounce > -Config.elasticThreshold) {
					ci.bounce = 0;
				}
				vdot = vry * this.nx - vrx * this.ny;
				let thr = Config.staticFrictionThreshold;
				if(vdot * vdot > thr * thr) {
					ci.friction = this.dyn_fric;
				} else {
					ci.friction = this.stat_fric;
				}
				ci.jnAcc *= dtratio;
				ci.jtAcc *= dtratio;
			}
			if(pact != c.active) {
				this.contacts.modified = true;
			}
			pre = cx_ite;
			prei = cx_itei;
			cx_itei = cx_itei.next;
			cx_ite = cx_ite.next;
		}
		if(this.hc2) {
			this.hpc2 = true;
			if(this.oc1.posOnly) {
				let tmp = this.c1;
				this.c1 = this.c2;
				this.c2 = tmp;
				let tmp2 = this.oc1;
				this.oc1 = this.oc2;
				this.oc2 = tmp2;
				this.hc2 = false;
			} else if(this.oc2.posOnly) {
				this.hc2 = false;
			}
			if(this.oc1.posOnly) {
				fst = true;
			}
		} else {
			this.hpc2 = false;
		}
		this.jrAcc *= dtratio;
		if(!fst) {
			this.rn1a = this.ny * this.c1.r1x - this.nx * this.c1.r1y;
			this.rt1a = this.c1.r1x * this.nx + this.c1.r1y * this.ny;
			this.rn1b = this.ny * this.c1.r2x - this.nx * this.c1.r2y;
			this.rt1b = this.c1.r2x * this.nx + this.c1.r2y * this.ny;
			this.k1x = this.b2.kinvelx - this.c1.r2y * this.b2.kinangvel - (this.b1.kinvelx - this.c1.r1y * this.b1.kinangvel);
			this.k1y = this.b2.kinvely + this.c1.r2x * this.b2.kinangvel - (this.b1.kinvely + this.c1.r1x * this.b1.kinangvel);
		}
		if(this.hc2) {
			this.rn2a = this.ny * this.c2.r1x - this.nx * this.c2.r1y;
			this.rt2a = this.c2.r1x * this.nx + this.c2.r1y * this.ny;
			this.rn2b = this.ny * this.c2.r2x - this.nx * this.c2.r2y;
			this.rt2b = this.c2.r2x * this.nx + this.c2.r2y * this.ny;
			this.k2x = this.b2.kinvelx - this.c2.r2y * this.b2.kinangvel - (this.b1.kinvelx - this.c2.r1y * this.b1.kinangvel);
			this.k2y = this.b2.kinvely + this.c2.r2x * this.b2.kinangvel - (this.b1.kinvely + this.c2.r1x * this.b1.kinangvel);
			this.kMassa = mass_sum + this.b1.sinertia * this.rn1a * this.rn1a + this.b2.sinertia * this.rn1b * this.rn1b;
			this.kMassb = mass_sum + this.b1.sinertia * this.rn1a * this.rn2a + this.b2.sinertia * this.rn1b * this.rn2b;
			this.kMassc = mass_sum + this.b1.sinertia * this.rn2a * this.rn2a + this.b2.sinertia * this.rn2b * this.rn2b;
			let norm = this.kMassa * this.kMassa + 2 * this.kMassb * this.kMassb + this.kMassc * this.kMassc;
			if(norm < Config.illConditionedThreshold * (this.kMassa * this.kMassc - this.kMassb * this.kMassb)) {
				this.Ka = this.kMassa;
				this.Kb = this.kMassb;
				this.Kc = this.kMassc;
				let det = this.kMassa * this.kMassc - this.kMassb * this.kMassb;
				if(det != det) {
					this.kMassa = this.kMassb = this.kMassc = 0;
				} else if(det == 0) {
					let flag = 0;
					if(this.kMassa != 0) {
						this.kMassa = 1 / this.kMassa;
					} else {
						this.kMassa = 0;
						flag |= 1;
					}
					if(this.kMassc != 0) {
						this.kMassc = 1 / this.kMassc;
					} else {
						this.kMassc = 0;
						flag |= 2;
					}
					this.kMassb = 0;
				} else {
					det = 1 / det;
					let t = this.kMassc * det;
					this.kMassc = this.kMassa * det;
					this.kMassa = t;
					this.kMassb *= -det;
				}
			} else {
				this.hc2 = false;
				if(this.oc2.dist < this.oc1.dist) {
					let t = this.c1;
					this.c1 = this.c2;
					this.c2 = t;
				}
				this.oc2.active = false;
				this.contacts.modified = true;
			}
		}
		this.surfacex = this.b2.svelx;
		this.surfacey = this.b2.svely;
		let t = 1.0;
		this.surfacex += this.b1.svelx * t;
		this.surfacey += this.b1.svely * t;
		this.surfacex = -this.surfacex;
		this.surfacey = -this.surfacey;
		this.rMass = this.b1.sinertia + this.b2.sinertia;
		if(this.rMass != 0) {
			this.rMass = 1 / this.rMass;
		}
		return fst;
	}
	warmStart() {
		let jx = this.nx * this.c1.jnAcc - this.ny * this.c1.jtAcc;
		let jy = this.ny * this.c1.jnAcc + this.nx * this.c1.jtAcc;
		let t = this.b1.imass;
		this.b1.velx -= jx * t;
		this.b1.vely -= jy * t;
		this.b1.angvel -= this.b1.iinertia * (jy * this.c1.r1x - jx * this.c1.r1y);
		let t1 = this.b2.imass;
		this.b2.velx += jx * t1;
		this.b2.vely += jy * t1;
		this.b2.angvel += this.b2.iinertia * (jy * this.c1.r2x - jx * this.c1.r2y);
		if(this.hc2) {
			let jx = this.nx * this.c2.jnAcc - this.ny * this.c2.jtAcc;
			let jy = this.ny * this.c2.jnAcc + this.nx * this.c2.jtAcc;
			let t = this.b1.imass;
			this.b1.velx -= jx * t;
			this.b1.vely -= jy * t;
			this.b1.angvel -= this.b1.iinertia * (jy * this.c2.r1x - jx * this.c2.r1y);
			let t1 = this.b2.imass;
			this.b2.velx += jx * t1;
			this.b2.vely += jy * t1;
			this.b2.angvel += this.b2.iinertia * (jy * this.c2.r2x - jx * this.c2.r2y);
		}
		this.b2.angvel += this.jrAcc * this.b2.iinertia;
		this.b1.angvel -= this.jrAcc * this.b1.iinertia;
	}
	applyImpulseVel() {
		let v1x = this.k1x + this.b2.velx - this.c1.r2y * this.b2.angvel - (this.b1.velx - this.c1.r1y * this.b1.angvel);
		let v1y = this.k1y + this.b2.vely + this.c1.r2x * this.b2.angvel - (this.b1.vely + this.c1.r1x * this.b1.angvel);
		let j = (v1y * this.nx - v1x * this.ny + this.surfacex) * this.c1.tMass;
		let jMax = this.c1.friction * this.c1.jnAcc;
		let jOld = this.c1.jtAcc;
		let cjAcc = jOld - j;
		if(cjAcc > jMax) {
			cjAcc = jMax;
		} else if(cjAcc < -jMax) {
			cjAcc = -jMax;
		}
		j = cjAcc - jOld;
		this.c1.jtAcc = cjAcc;
		let jx = -this.ny * j;
		let jy = this.nx * j;
		this.b2.velx += jx * this.b2.imass;
		this.b2.vely += jy * this.b2.imass;
		this.b1.velx -= jx * this.b1.imass;
		this.b1.vely -= jy * this.b1.imass;
		this.b2.angvel += this.rt1b * j * this.b2.iinertia;
		this.b1.angvel -= this.rt1a * j * this.b1.iinertia;
		if(this.hc2) {
			let v2x = this.k2x + this.b2.velx - this.c2.r2y * this.b2.angvel - (this.b1.velx - this.c2.r1y * this.b1.angvel);
			let v2y = this.k2y + this.b2.vely + this.c2.r2x * this.b2.angvel - (this.b1.vely + this.c2.r1x * this.b1.angvel);
			j = (v2y * this.nx - v2x * this.ny + this.surfacex) * this.c2.tMass;
			jMax = this.c2.friction * this.c2.jnAcc;
			jOld = this.c2.jtAcc;
			cjAcc = jOld - j;
			if(cjAcc > jMax) {
				cjAcc = jMax;
			} else if(cjAcc < -jMax) {
				cjAcc = -jMax;
			}
			j = cjAcc - jOld;
			this.c2.jtAcc = cjAcc;
			jx = -this.ny * j;
			jy = this.nx * j;
			this.b2.velx += jx * this.b2.imass;
			this.b2.vely += jy * this.b2.imass;
			this.b1.velx -= jx * this.b1.imass;
			this.b1.vely -= jy * this.b1.imass;
			this.b2.angvel += this.rt2b * j * this.b2.iinertia;
			this.b1.angvel -= this.rt2a * j * this.b1.iinertia;
			v1x = this.k1x + this.b2.velx - this.c1.r2y * this.b2.angvel - (this.b1.velx - this.c1.r1y * this.b1.angvel);
			v1y = this.k1y + this.b2.vely + this.c1.r2x * this.b2.angvel - (this.b1.vely + this.c1.r1x * this.b1.angvel);
			v2x = this.k2x + this.b2.velx - this.c2.r2y * this.b2.angvel - (this.b1.velx - this.c2.r1y * this.b1.angvel);
			v2y = this.k2y + this.b2.vely + this.c2.r2x * this.b2.angvel - (this.b1.vely + this.c2.r1x * this.b1.angvel);
			let ax = this.c1.jnAcc;
			let ay = this.c2.jnAcc;
			let jnx = v1x * this.nx + v1y * this.ny + this.surfacey + this.c1.bounce - (this.Ka * ax + this.Kb * ay);
			let jny = v2x * this.nx + v2y * this.ny + this.surfacey + this.c2.bounce - (this.Kb * ax + this.Kc * ay);
			let xx = -(this.kMassa * jnx + this.kMassb * jny);
			let xy = -(this.kMassb * jnx + this.kMassc * jny);
			if(xx >= 0 && xy >= 0) {
				jnx = xx - ax;
				jny = xy - ay;
				this.c1.jnAcc = xx;
				this.c2.jnAcc = xy;
			} else {
				xx = -this.c1.nMass * jnx;
				if(xx >= 0 && this.Kb * xx + jny >= 0) {
					jnx = xx - ax;
					jny = -ay;
					this.c1.jnAcc = xx;
					this.c2.jnAcc = 0;
				} else {
					xy = -this.c2.nMass * jny;
					if(xy >= 0 && this.Kb * xy + jnx >= 0) {
						jnx = -ax;
						jny = xy - ay;
						this.c1.jnAcc = 0;
						this.c2.jnAcc = xy;
					} else if(jnx >= 0 && jny >= 0) {
						jnx = -ax;
						jny = -ay;
						this.c1.jnAcc = this.c2.jnAcc = 0;
					} else {
						jnx = 0;
						jny = 0;
					}
				}
			}
			j = jnx + jny;
			jx = this.nx * j;
			jy = this.ny * j;
			this.b2.velx += jx * this.b2.imass;
			this.b2.vely += jy * this.b2.imass;
			this.b1.velx -= jx * this.b1.imass;
			this.b1.vely -= jy * this.b1.imass;
			this.b2.angvel += (this.rn1b * jnx + this.rn2b * jny) * this.b2.iinertia;
			this.b1.angvel -= (this.rn1a * jnx + this.rn2a * jny) * this.b1.iinertia;
		} else {
			if(this.radius != 0.0) {
				let dw = this.b2.angvel - this.b1.angvel;
				j = dw * this.rMass;
				jMax = this.rfric * this.c1.jnAcc;
				jOld = this.jrAcc;
				this.jrAcc -= j;
				if(this.jrAcc > jMax) {
					this.jrAcc = jMax;
				} else if(this.jrAcc < -jMax) {
					this.jrAcc = -jMax;
				}
				j = this.jrAcc - jOld;
				this.b2.angvel += j * this.b2.iinertia;
				this.b1.angvel -= j * this.b1.iinertia;
			}
			v1x = this.k1x + this.b2.velx - this.c1.r2y * this.b2.angvel - (this.b1.velx - this.c1.r1y * this.b1.angvel);
			v1y = this.k1y + this.b2.vely + this.c1.r2x * this.b2.angvel - (this.b1.vely + this.c1.r1x * this.b1.angvel);
			j = (this.c1.bounce + (this.nx * v1x + this.ny * v1y) + this.surfacey) * this.c1.nMass;
			jOld = this.c1.jnAcc;
			cjAcc = jOld - j;
			if(cjAcc < 0.0) {
				cjAcc = 0.0;
			}
			j = cjAcc - jOld;
			this.c1.jnAcc = cjAcc;
			jx = this.nx * j;
			jy = this.ny * j;
			this.b2.velx += jx * this.b2.imass;
			this.b2.vely += jy * this.b2.imass;
			this.b1.velx -= jx * this.b1.imass;
			this.b1.vely -= jy * this.b1.imass;
			this.b2.angvel += this.rn1b * j * this.b2.iinertia;
			this.b1.angvel -= this.rn1a * j * this.b1.iinertia;
		}
	}
	applyImpulsePos() {
		if(this.ptype == 2) {
			let c = this.c1;
			let dx = 0.0;
			let dy = 0.0;
			let r2x = 0.0;
			let r2y = 0.0;
			r2x = this.b2.axisy * c.lr2x - this.b2.axisx * c.lr2y;
			r2y = c.lr2x * this.b2.axisx + c.lr2y * this.b2.axisy;
			let t = 1.0;
			r2x += this.b2.posx * t;
			r2y += this.b2.posy * t;
			let r1x = 0.0;
			let r1y = 0.0;
			r1x = this.b1.axisy * c.lr1x - this.b1.axisx * c.lr1y;
			r1y = c.lr1x * this.b1.axisx + c.lr1y * this.b1.axisy;
			let t1 = 1.0;
			r1x += this.b1.posx * t1;
			r1y += this.b1.posy * t1;
			let dx1 = 0.0;
			let dy1 = 0.0;
			dx1 = r2x - r1x;
			dy1 = r2y - r1y;
			let dl = Math.sqrt(dx1 * dx1 + dy1 * dy1);
			let r = this.radius - Config.collisionSlop;
			let err = dl - r;
			if(dx1 * this.nx + dy1 * this.ny < 0) {
				dx1 = -dx1;
				dy1 = -dy1;
				err -= this.radius;
			}
			if(err < 0) {
				if(dl < Config.epsilon) {
					if(this.b1.smass != 0.0) {
						this.b1.posx += Config.epsilon * 10;
					} else {
						this.b2.posx += Config.epsilon * 10;
					}
				} else {
					let t = 1.0 / dl;
					dx1 *= t;
					dy1 *= t;
					let px = 0.5 * (r1x + r2x);
					let py = 0.5 * (r1y + r2y);
					let pen = dl - r;
					r1x = px - this.b1.posx;
					r1y = py - this.b1.posy;
					r2x = px - this.b2.posx;
					r2y = py - this.b2.posy;
					let rn1 = dy1 * r1x - dx1 * r1y;
					let rn2 = dy1 * r2x - dx1 * r2y;
					let K = this.b2.smass + rn2 * rn2 * this.b2.sinertia + this.b1.smass + rn1 * rn1 * this.b1.sinertia;
					if(K != 0) {
						let jn = -this.biasCoef * pen / K;
						let Jx = 0.0;
						let Jy = 0.0;
						let t = jn;
						Jx = dx1 * t;
						Jy = dy1 * t;
						let t1 = this.b1.imass;
						this.b1.posx -= Jx * t1;
						this.b1.posy -= Jy * t1;
						let _this = this.b1;
						let dr = -rn1 * this.b1.iinertia * jn;
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
						let t2 = this.b2.imass;
						this.b2.posx += Jx * t2;
						this.b2.posy += Jy * t2;
						let _this1 = this.b2;
						let dr1 = rn2 * this.b2.iinertia * jn;
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
			if(this.ptype == 0) {
				gnormx = this.b1.axisy * this.lnormx - this.b1.axisx * this.lnormy;
				gnormy = this.lnormx * this.b1.axisx + this.lnormy * this.b1.axisy;
				gproj = this.lproj + (gnormx * this.b1.posx + gnormy * this.b1.posy);
				clip1x = this.b2.axisy * this.c1.lr1x - this.b2.axisx * this.c1.lr1y;
				clip1y = this.c1.lr1x * this.b2.axisx + this.c1.lr1y * this.b2.axisy;
				let t = 1.0;
				clip1x += this.b2.posx * t;
				clip1y += this.b2.posy * t;
				if(this.hpc2) {
					clip2x = this.b2.axisy * this.c2.lr1x - this.b2.axisx * this.c2.lr1y;
					clip2y = this.c2.lr1x * this.b2.axisx + this.c2.lr1y * this.b2.axisy;
					let t = 1.0;
					clip2x += this.b2.posx * t;
					clip2y += this.b2.posy * t;
				}
			} else {
				gnormx = this.b2.axisy * this.lnormx - this.b2.axisx * this.lnormy;
				gnormy = this.lnormx * this.b2.axisx + this.lnormy * this.b2.axisy;
				gproj = this.lproj + (gnormx * this.b2.posx + gnormy * this.b2.posy);
				clip1x = this.b1.axisy * this.c1.lr1x - this.b1.axisx * this.c1.lr1y;
				clip1y = this.c1.lr1x * this.b1.axisx + this.c1.lr1y * this.b1.axisy;
				let t = 1.0;
				clip1x += this.b1.posx * t;
				clip1y += this.b1.posy * t;
				if(this.hpc2) {
					clip2x = this.b1.axisy * this.c2.lr1x - this.b1.axisx * this.c2.lr1y;
					clip2y = this.c2.lr1x * this.b1.axisx + this.c2.lr1y * this.b1.axisy;
					let t = 1.0;
					clip2x += this.b1.posx * t;
					clip2y += this.b1.posy * t;
				}
			}
			let err1 = clip1x * gnormx + clip1y * gnormy - gproj - this.radius;
			err1 += Config.collisionSlop;
			let err2 = 0.0;
			if(this.hpc2) {
				err2 = clip2x * gnormx + clip2y * gnormy - gproj - this.radius;
				err2 += Config.collisionSlop;
			}
			if(err1 < 0 || err2 < 0) {
				if(this.rev) {
					gnormx = -gnormx;
					gnormy = -gnormy;
				}
				let c1r1x = 0.0;
				let c1r1y = 0.0;
				c1r1x = clip1x - this.b1.posx;
				c1r1y = clip1y - this.b1.posy;
				let c1r2x = 0.0;
				let c1r2y = 0.0;
				c1r2x = clip1x - this.b2.posx;
				c1r2y = clip1y - this.b2.posy;
				let c2r1x = 0;
				let c2r1y = 0;
				let c2r2x = 0;
				let c2r2y = 0;
				if(this.hpc2) {
					c2r1x = clip2x - this.b1.posx;
					c2r1y = clip2y - this.b1.posy;
					c2r2x = clip2x - this.b2.posx;
					c2r2y = clip2y - this.b2.posy;
					let rn1a = gnormy * c1r1x - gnormx * c1r1y;
					let rn1b = gnormy * c1r2x - gnormx * c1r2y;
					let rn2a = gnormy * c2r1x - gnormx * c2r1y;
					let rn2b = gnormy * c2r2x - gnormx * c2r2y;
					let mass_sum = this.b1.smass + this.b2.smass;
					this.kMassa = mass_sum + this.b1.sinertia * rn1a * rn1a + this.b2.sinertia * rn1b * rn1b;
					this.kMassb = mass_sum + this.b1.sinertia * rn1a * rn2a + this.b2.sinertia * rn1b * rn2b;
					this.kMassc = mass_sum + this.b1.sinertia * rn2a * rn2a + this.b2.sinertia * rn2b * rn2b;
					let Ka = 0.0;
					let Kb = 0.0;
					let Kc = 0.0;
					Ka = this.kMassa;
					Kb = this.kMassb;
					Kc = this.kMassc;
					let bx = err1 * this.biasCoef;
					let by = err2 * this.biasCoef;
					while(true) {
						let xx = 0.0;
						let xy = 0.0;
						xx = bx;
						xy = by;
						xx = -xx;
						xy = -xy;
						let det = this.kMassa * this.kMassc - this.kMassb * this.kMassb;
						if(det != det) {
							xy = 0;
							xx = xy;
						} else if(det == 0) {
							if(this.kMassa != 0) {
								xx /= this.kMassa;
							} else {
								xx = 0;
							}
							if(this.kMassc != 0) {
								xy /= this.kMassc;
							} else {
								xy = 0;
							}
						} else {
							det = 1 / det;
							let t = det * (this.kMassc * xx - this.kMassb * xy);
							xy = det * (this.kMassa * xy - this.kMassb * xx);
							xx = t;
						}
						if(xx >= 0 && xy >= 0) {
							let t = (xx + xy) * this.b1.imass;
							this.b1.posx -= gnormx * t;
							this.b1.posy -= gnormy * t;
							let _this = this.b1;
							let dr = -this.b1.iinertia * (rn1a * xx + rn2a * xy);
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
							let t1 = (xx + xy) * this.b2.imass;
							this.b2.posx += gnormx * t1;
							this.b2.posy += gnormy * t1;
							let _this1 = this.b2;
							let dr1 = this.b2.iinertia * (rn1b * xx + rn2b * xy);
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
							let t = (xx + xy) * this.b1.imass;
							this.b1.posx -= gnormx * t;
							this.b1.posy -= gnormy * t;
							let _this = this.b1;
							let dr = -this.b1.iinertia * (rn1a * xx + rn2a * xy);
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
							let t1 = (xx + xy) * this.b2.imass;
							this.b2.posx += gnormx * t1;
							this.b2.posy += gnormy * t1;
							let _this1 = this.b2;
							let dr1 = this.b2.iinertia * (rn1b * xx + rn2b * xy);
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
							let t = (xx + xy) * this.b1.imass;
							this.b1.posx -= gnormx * t;
							this.b1.posy -= gnormy * t;
							let _this = this.b1;
							let dr = -this.b1.iinertia * (rn1a * xx + rn2a * xy);
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
							let t1 = (xx + xy) * this.b2.imass;
							this.b2.posx += gnormx * t1;
							this.b2.posy += gnormy * t1;
							let _this1 = this.b2;
							let dr1 = this.b2.iinertia * (rn1b * xx + rn2b * xy);
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
					let K = this.b2.smass + rn2 * rn2 * this.b2.sinertia + this.b1.smass + rn1 * rn1 * this.b1.sinertia;
					if(K != 0) {
						let jn = -this.biasCoef * err1 / K;
						let Jx = 0.0;
						let Jy = 0.0;
						let t = jn;
						Jx = gnormx * t;
						Jy = gnormy * t;
						let t1 = this.b1.imass;
						this.b1.posx -= Jx * t1;
						this.b1.posy -= Jy * t1;
						let _this = this.b1;
						let dr = -rn1 * this.b1.iinertia * jn;
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
						let t2 = this.b2.imass;
						this.b2.posx += Jx * t2;
						this.b2.posy += Jy * t2;
						let _this1 = this.b2;
						let dr1 = rn2 * this.b2.iinertia * jn;
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
}
ZPP_ColArbiter.FACE1 = 0;
ZPP_ColArbiter.FACE2 = 1;
ZPP_ColArbiter.CIRCLE = 2;
ZPP_ColArbiter.zpp_pool = null;
