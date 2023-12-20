import ZPP_PubPool from '../util/ZPP_PubPool.js';
import ZNPNode_ZPP_Arbiter from '../util/ZNPNode_ZPP_Arbiter.js';
import ZPP_Vec2 from '../geom/ZPP_Vec2.js';
import ZPP_Arbiter from './ZPP_Arbiter.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import Vec2 from '../../nape/geom/Vec2.js';
import Config from '../../nape/Config.js';
export default class ZPP_FluidArbiter extends ZPP_Arbiter {
	constructor() {
		ZPP_Arbiter._hx_skip_constructor = true;
		super();
		ZPP_Arbiter._hx_skip_constructor = false;
		this._hx_constructor();
	}
	_hx_constructor() {
		this.pre_dt = 0.0;
		this.mutable = false;
		this.wrap_position = null;
		this.buoyy = 0.0;
		this.buoyx = 0.0;
		this.ny = 0.0;
		this.nx = 0.0;
		this.lgamma = 0.0;
		this.dampy = 0.0;
		this.dampx = 0.0;
		this.vMassc = 0.0;
		this.vMassb = 0.0;
		this.vMassa = 0.0;
		this.agamma = 0.0;
		this.adamp = 0.0;
		this.wMass = 0.0;
		this.nodrag = false;
		this.r2y = 0.0;
		this.r2x = 0.0;
		this.r1y = 0.0;
		this.r1x = 0.0;
		this.overlap = 0.0;
		this.centroidy = 0.0;
		this.centroidx = 0.0;
		this.next = null;
		this.outer_zn = null;
		super._hx_constructor();
		this.type = ZPP_Arbiter.FLUID;
		this.fluidarb = this;
		this.buoyx = 0;
		this.buoyy = 0;
		this.pre_dt = -1.0;
	}
	alloc() {
	}
	free() {
	}
	position_validate() {
		if(!this.active) {
			throw haxe_Exception.thrown("Error: Arbiter not currently in use");
		}
		this.wrap_position.zpp_inner.x = this.centroidx;
		this.wrap_position.zpp_inner.y = this.centroidy;
	}
	position_invalidate(x) {
		this.centroidx = x.x;
		this.centroidy = x.y;
	}
	getposition() {
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
		this.wrap_position = ret;
		this.wrap_position.zpp_inner._inuse = true;
		this.wrap_position.zpp_inner._immutable = !this.mutable;
		this.wrap_position.zpp_inner._validate = $bind(this,this.position_validate);
		this.wrap_position.zpp_inner._invalidate = $bind(this,this.position_invalidate);
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
		this.nx = 0;
		this.ny = 1;
		this.dampx = 0;
		this.dampy = 0;
		this.adamp = 0.0;
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
		let o = this;
		o.next = ZPP_FluidArbiter.zpp_pool;
		ZPP_FluidArbiter.zpp_pool = o;
		this.pre_dt = -1.0;
	}
	makemutable() {
		this.mutable = true;
		if(this.wrap_position != null) {
			this.wrap_position.zpp_inner._immutable = false;
		}
	}
	makeimmutable() {
		this.mutable = false;
		if(this.wrap_position != null) {
			this.wrap_position.zpp_inner._immutable = true;
		}
	}
	inject(area,cx,cy) {
		this.overlap = area;
		this.centroidx = cx;
		this.centroidy = cy;
	}
	preStep(s,dt) {
		if(this.pre_dt == -1.0) {
			this.pre_dt = dt;
		}
		let dtratio = dt / this.pre_dt;
		this.pre_dt = dt;
		this.r1x = this.centroidx - this.b1.posx;
		this.r1y = this.centroidy - this.b1.posy;
		this.r2x = this.centroidx - this.b2.posx;
		this.r2y = this.centroidy - this.b2.posy;
		let g1x = 0.0;
		let g1y = 0.0;
		if(this.ws1.fluidEnabled && this.ws1.fluidProperties.wrap_gravity != null) {
			g1x = this.ws1.fluidProperties.gravityx;
			g1y = this.ws1.fluidProperties.gravityy;
		} else {
			g1x = s.gravityx;
			g1y = s.gravityy;
		}
		let g2x = 0.0;
		let g2y = 0.0;
		if(this.ws2.fluidEnabled && this.ws2.fluidProperties.wrap_gravity != null) {
			g2x = this.ws2.fluidProperties.gravityx;
			g2y = this.ws2.fluidProperties.gravityy;
		} else {
			g2x = s.gravityx;
			g2y = s.gravityy;
		}
		let buoyx = 0;
		let buoyy = 0;
		if(this.ws1.fluidEnabled && this.ws2.fluidEnabled) {
			let mass1 = this.overlap * this.ws1.fluidProperties.density;
			let mass2 = this.overlap * this.ws2.fluidProperties.density;
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
				if(this.ws1.worldCOMx * gx + this.ws1.worldCOMy * gy > this.ws2.worldCOMx * gx + this.ws2.worldCOMy * gy) {
					let t = mass1 + mass2;
					buoyx -= gx * t;
					buoyy -= gy * t;
				} else {
					let t = mass1 + mass2;
					buoyx += gx * t;
					buoyy += gy * t;
				}
			}
		} else if(this.ws1.fluidEnabled) {
			let mass = this.overlap * this.ws1.fluidProperties.density;
			let t = mass;
			buoyx -= g1x * t;
			buoyy -= g1y * t;
		} else if(this.ws2.fluidEnabled) {
			let mass = this.overlap * this.ws2.fluidProperties.density;
			let t = mass;
			buoyx += g2x * t;
			buoyy += g2y * t;
		}
		let t = dt;
		buoyx *= t;
		buoyy *= t;
		this.buoyx = buoyx;
		this.buoyy = buoyy;
		if(this.b1.type == ZPP_Flags.id_BodyType_DYNAMIC) {
			let t = this.b1.imass;
			this.b1.velx -= buoyx * t;
			this.b1.vely -= buoyy * t;
			this.b1.angvel -= (buoyy * this.r1x - buoyx * this.r1y) * this.b1.iinertia;
		}
		if(this.b2.type == ZPP_Flags.id_BodyType_DYNAMIC) {
			let t = this.b2.imass;
			this.b2.velx += buoyx * t;
			this.b2.vely += buoyy * t;
			this.b2.angvel += (buoyy * this.r2x - buoyx * this.r2y) * this.b2.iinertia;
		}
		if((!this.ws1.fluidEnabled || this.ws1.fluidProperties.viscosity == 0) && (!this.ws2.fluidEnabled || this.ws2.fluidProperties.viscosity == 0)) {
			this.nodrag = true;
			this.dampx = 0;
			this.dampy = 0;
			this.adamp = 0;
		} else {
			this.nodrag = false;
			let tViscosity = 0.0;
			if(this.ws1.fluidEnabled) {
				this.ws2.validate_angDrag();
				tViscosity += this.ws1.fluidProperties.viscosity * this.ws2.angDrag * this.overlap / this.ws2.area;
			}
			if(this.ws2.fluidEnabled) {
				this.ws1.validate_angDrag();
				tViscosity += this.ws2.fluidProperties.viscosity * this.ws1.angDrag * this.overlap / this.ws1.area;
			}
			if(tViscosity != 0) {
				let iSum = this.b1.sinertia + this.b2.sinertia;
				if(iSum != 0) {
					this.wMass = 1 / iSum;
				} else {
					this.wMass = 0.0;
				}
				tViscosity *= 0.0004;
				let omega = 2 * Math.PI * tViscosity;
				this.agamma = 1 / (dt * omega * (2 + omega * dt));
				let ig = 1 / (1 + this.agamma);
				let biasCoef = dt * omega * omega * this.agamma;
				this.agamma *= ig;
				this.wMass *= ig;
			} else {
				this.wMass = 0.0;
				this.agamma = 0.0;
			}
			let vrnx = this.b2.velx + this.b2.kinvelx - this.r2y * (this.b2.angvel + this.b2.kinangvel) - (this.b1.velx + this.b1.kinvelx - this.r1y * (this.b2.angvel + this.b2.kinangvel));
			let vrny = this.b2.vely + this.b2.kinvely + this.r2x * (this.b2.angvel + this.b2.kinangvel) - (this.b1.vely + this.b1.kinvely + this.r1x * (this.b1.angvel + this.b1.kinangvel));
			if(!(vrnx * vrnx + vrny * vrny < Config.epsilon * Config.epsilon)) {
				let d = vrnx * vrnx + vrny * vrny;
				let imag = 1.0 / Math.sqrt(d);
				let t = imag;
				vrnx *= t;
				vrny *= t;
				this.nx = vrnx;
				this.ny = vrny;
			}
			let tViscosity1 = 0.0;
			if(this.ws1.fluidEnabled) {
				let f = -this.ws1.fluidProperties.viscosity * this.overlap / this.ws2.area;
				if(this.ws2.type == ZPP_Flags.id_ShapeType_CIRCLE) {
					tViscosity1 -= f * this.ws2.circle.radius * Config.fluidLinearDrag / (2 * this.ws2.circle.radius * Math.PI);
				} else {
					let poly = this.ws2.polygon;
					let bord = 0.0;
					let acc = 0.0;
					let cx_ite = poly.edges.head;
					while(cx_ite != null) {
						let ex = cx_ite.elt;
						bord += ex.length;
						let fact = f * ex.length * (ex.gnormx * this.nx + ex.gnormy * this.ny);
						if(fact > 0) {
							fact *= -Config.fluidVacuumDrag;
						}
						acc -= fact * 0.5 * Config.fluidLinearDrag;
						cx_ite = cx_ite.next;
					}
					tViscosity1 += acc / bord;
				}
			}
			if(this.ws2.fluidEnabled) {
				let f = -this.ws2.fluidProperties.viscosity * this.overlap / this.ws1.area;
				if(this.ws1.type == ZPP_Flags.id_ShapeType_CIRCLE) {
					tViscosity1 -= f * this.ws1.circle.radius * Config.fluidLinearDrag / (2 * this.ws1.circle.radius * Math.PI);
				} else {
					let poly = this.ws1.polygon;
					let bord = 0.0;
					let acc = 0.0;
					let cx_ite = poly.edges.head;
					while(cx_ite != null) {
						let ex = cx_ite.elt;
						bord += ex.length;
						let fact = f * ex.length * (ex.gnormx * this.nx + ex.gnormy * this.ny);
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
				let m = this.b1.smass + this.b2.smass;
				let Ka = 0.0;
				let Kb = 0.0;
				let Kc = 0.0;
				Ka = m;
				Kb = 0;
				Kc = m;
				if(this.b1.sinertia != 0) {
					let X = this.r1x * this.b1.sinertia;
					let Y = this.r1y * this.b1.sinertia;
					Ka += Y * this.r1y;
					Kb += -Y * this.r1x;
					Kc += X * this.r1x;
				}
				if(this.b2.sinertia != 0) {
					let X = this.r2x * this.b2.sinertia;
					let Y = this.r2y * this.b2.sinertia;
					Ka += Y * this.r2y;
					Kb += -Y * this.r2x;
					Kc += X * this.r2x;
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
				this.vMassa = Ka;
				this.vMassb = Kb;
				this.vMassc = Kc;
				let biasCoef;
				let omega = 2 * Math.PI * tViscosity1;
				this.lgamma = 1 / (dt * omega * (2 + omega * dt));
				let ig = 1 / (1 + this.lgamma);
				biasCoef = dt * omega * omega * this.lgamma;
				this.lgamma *= ig;
				let X = ig;
				this.vMassa *= X;
				this.vMassb *= X;
				this.vMassc *= X;
			} else {
				this.vMassa = 0;
				this.vMassb = 0;
				this.vMassc = 0;
				this.lgamma = 0.0;
			}
		}
		let t1 = dtratio;
		this.dampx *= t1;
		this.dampy *= t1;
		this.adamp *= dtratio;
	}
	warmStart() {
		let t = this.b1.imass;
		this.b1.velx -= this.dampx * t;
		this.b1.vely -= this.dampy * t;
		let t1 = this.b2.imass;
		this.b2.velx += this.dampx * t1;
		this.b2.vely += this.dampy * t1;
		this.b1.angvel -= this.b1.iinertia * (this.dampy * this.r1x - this.dampx * this.r1y);
		this.b2.angvel += this.b2.iinertia * (this.dampy * this.r2x - this.dampx * this.r2y);
		this.b1.angvel -= this.adamp * this.b1.iinertia;
		this.b2.angvel += this.adamp * this.b2.iinertia;
	}
	applyImpulseVel() {
		if(!this.nodrag) {
			let w1 = this.b1.angvel + this.b1.kinangvel;
			let w2 = this.b2.angvel + this.b2.kinangvel;
			let jx = this.b1.velx + this.b1.kinvelx - this.r1y * w1 - (this.b2.velx + this.b2.kinvelx - this.r2y * w2);
			let jy = this.b1.vely + this.b1.kinvely + this.r1x * w1 - (this.b2.vely + this.b2.kinvely + this.r2x * w2);
			let t = this.vMassa * jx + this.vMassb * jy;
			jy = this.vMassb * jx + this.vMassc * jy;
			jx = t;
			let t1 = this.lgamma;
			jx -= this.dampx * t1;
			jy -= this.dampy * t1;
			let t2 = 1.0;
			this.dampx += jx * t2;
			this.dampy += jy * t2;
			let t3 = this.b1.imass;
			this.b1.velx -= jx * t3;
			this.b1.vely -= jy * t3;
			let t4 = this.b2.imass;
			this.b2.velx += jx * t4;
			this.b2.vely += jy * t4;
			this.b1.angvel -= this.b1.iinertia * (jy * this.r1x - jx * this.r1y);
			this.b2.angvel += this.b2.iinertia * (jy * this.r2x - jx * this.r2y);
			let j_damp = (w1 - w2) * this.wMass - this.adamp * this.agamma;
			this.adamp += j_damp;
			this.b1.angvel -= j_damp * this.b1.iinertia;
			this.b2.angvel += j_damp * this.b2.iinertia;
		}
	}
}
ZPP_FluidArbiter.zpp_pool = null;
