import ZPP_CopyHelper from './ZPP_CopyHelper.js';
import ZPP_AngleDraw from './ZPP_AngleDraw.js';
import ZPP_Constraint from './ZPP_Constraint.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import Vec3 from '../../nape/geom/Vec3.js';
import AngleJoint from '../../nape/constraint/AngleJoint.js';
export default class ZPP_AngleJoint extends ZPP_Constraint {
	constructor() {
		ZPP_Constraint._hx_skip_constructor = true;
		super();
		ZPP_Constraint._hx_skip_constructor = false;
		this._hx_constructor();
	}
	_hx_constructor() {
		this.stepped = false;
		this.bias = 0.0;
		this.gamma = 0.0;
		this.jMax = 0.0;
		this.jAcc = 0.0;
		this.kMass = 0.0;
		this.b2 = null;
		this.b1 = null;
		this.scale = 0.0;
		this.equal = false;
		this.slack = false;
		this.jointMax = 0.0;
		this.jointMin = 0.0;
		this.ratio = 0.0;
		this.outer_zn = null;
		super._hx_constructor();
		this.ratio = 1;
		this.jAcc = 0;
		this.slack = false;
		this.jMax = Infinity;
		this.stepped = false;
	}
	is_slack() {
		let slack;
		let C = this.ratio * this.b2.rot - this.b1.rot;
		if(this.equal) {
			C -= this.jointMax;
			slack = false;
			this.scale = 1.0;
		} else if(C < this.jointMin) {
			C = this.jointMin - C;
			this.scale = -1.0;
			slack = false;
		} else if(C > this.jointMax) {
			C -= this.jointMax;
			this.scale = 1.0;
			slack = false;
		} else {
			this.scale = 0.0;
			C = 0;
			slack = true;
		}
		return slack;
	}
	bodyImpulse(b) {
		if(this.stepped) {
			if(b == this.b1) {
				return Vec3.get(0,0,-this.scale * this.jAcc);
			} else {
				return Vec3.get(0,0,this.ratio * this.scale * this.jAcc);
			}
		} else {
			return Vec3.get(0,0,0);
		}
	}
	activeBodies() {
		if(this.b1 != null) {
			this.b1.constraints.add(this);
		}
		if(this.b2 != this.b1) {
			if(this.b2 != null) {
				this.b2.constraints.add(this);
			}
		}
	}
	inactiveBodies() {
		if(this.b1 != null) {
			this.b1.constraints.remove(this);
		}
		if(this.b2 != this.b1) {
			if(this.b2 != null) {
				this.b2.constraints.remove(this);
			}
		}
	}
	copy(dict,todo) {
		let ret = new AngleJoint(null,null,this.jointMin,this.jointMax,this.ratio);
		this.copyto(ret);
		if(dict != null && this.b1 != null) {
			let b = null;
			let _g = 0;
			while(_g < dict.length) {
				let idc = dict[_g];
				++_g;
				if(idc.id == this.b1.id) {
					b = idc.bc;
					break;
				}
			}
			if(b != null) {
				ret.zpp_inner_zn.b1 = b.zpp_inner;
			} else {
				todo.push(ZPP_CopyHelper.todo(this.b1.id,function(b) {
					ret.zpp_inner_zn.b1 = b.zpp_inner;
				}));
			}
		}
		if(dict != null && this.b2 != null) {
			let b = null;
			let _g = 0;
			while(_g < dict.length) {
				let idc = dict[_g];
				++_g;
				if(idc.id == this.b2.id) {
					b = idc.bc;
					break;
				}
			}
			if(b != null) {
				ret.zpp_inner_zn.b2 = b.zpp_inner;
			} else {
				todo.push(ZPP_CopyHelper.todo(this.b2.id,function(b) {
					ret.zpp_inner_zn.b2 = b.zpp_inner;
				}));
			}
		}
		return ret;
	}
	validate() {
		if(this.b1 == null || this.b2 == null) {
			throw haxe_Exception.thrown("Error: AngleJoint cannot be simulated null bodies");
		}
		if(this.b1 == this.b2) {
			throw haxe_Exception.thrown("Error: AngleJoint cannot be simulated with body1 == body2");
		}
		if(this.b1.space != this.space || this.b2.space != this.space) {
			throw haxe_Exception.thrown("Error: Constraints must have each body within the same space to which the constraint has been assigned");
		}
		if(this.jointMin > this.jointMax) {
			throw haxe_Exception.thrown("Error: AngleJoint must have jointMin <= jointMax");
		}
		if(this.b1.type != ZPP_Flags.id_BodyType_DYNAMIC && this.b2.type != ZPP_Flags.id_BodyType_DYNAMIC) {
			throw haxe_Exception.thrown("Error: Constraints cannot have both bodies non-dynamic");
		}
	}
	wake_connected() {
		if(this.b1 != null && this.b1.type == ZPP_Flags.id_BodyType_DYNAMIC) {
			this.b1.wake();
		}
		if(this.b2 != null && this.b2.type == ZPP_Flags.id_BodyType_DYNAMIC) {
			this.b2.wake();
		}
	}
	forest() {
		if(this.b1.type == ZPP_Flags.id_BodyType_DYNAMIC) {
			let xr;
			if(this.b1.component == this.b1.component.parent) {
				xr = this.b1.component;
			} else {
				let obj = this.b1.component;
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
			if(this.component == this.component.parent) {
				yr = this.component;
			} else {
				let obj = this.component;
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
		if(this.b2.type == ZPP_Flags.id_BodyType_DYNAMIC) {
			let xr;
			if(this.b2.component == this.b2.component.parent) {
				xr = this.b2.component;
			} else {
				let obj = this.b2.component;
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
			if(this.component == this.component.parent) {
				yr = this.component;
			} else {
				let obj = this.component;
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
	pair_exists(id,di) {
		if(!(this.b1.id == id && this.b2.id == di)) {
			if(this.b1.id == di) {
				return this.b2.id == id;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	clearcache() {
		this.jAcc = 0;
		this.pre_dt = -1.0;
		this.slack = false;
	}
	preStep(dt) {
		if(this.pre_dt == -1.0) {
			this.pre_dt = dt;
		}
		let dtratio = dt / this.pre_dt;
		this.pre_dt = dt;
		this.stepped = true;
		this.equal = this.jointMin == this.jointMax;
		let C = this.ratio * this.b2.rot - this.b1.rot;
		if(this.equal) {
			C -= this.jointMax;
			this.slack = false;
			this.scale = 1.0;
		} else if(C < this.jointMin) {
			C = this.jointMin - C;
			this.scale = -1.0;
			this.slack = false;
		} else if(C > this.jointMax) {
			C -= this.jointMax;
			this.scale = 1.0;
			this.slack = false;
		} else {
			this.scale = 0.0;
			C = 0;
			this.slack = true;
		}
		let C1 = C;
		if(!this.slack) {
			this.kMass = this.b1.sinertia + this.ratio * this.ratio * this.b2.sinertia;
			if(this.kMass != 0) {
				this.kMass = 1 / this.kMass;
			} else {
				this.jAcc = 0;
			}
			if(!this.stiff) {
				if(this.breakUnderError && C1 * C1 > this.maxError * this.maxError) {
					return true;
				}
				let omega = 2 * Math.PI * this.frequency;
				this.gamma = 1 / (dt * omega * (2 * this.damping + omega * dt));
				let ig = 1 / (1 + this.gamma);
				let biasCoef = dt * omega * omega * this.gamma;
				this.gamma *= ig;
				this.kMass *= ig;
				this.bias = -C1 * biasCoef;
				if(this.bias < -this.maxError) {
					this.bias = -this.maxError;
				} else if(this.bias > this.maxError) {
					this.bias = this.maxError;
				}
			} else {
				this.bias = 0;
				this.gamma = 0;
			}
			this.jAcc *= dtratio;
			this.jMax = this.maxForce * dt;
		}
		return false;
	}
	warmStart() {
		if(!this.slack) {
			this.b1.angvel -= this.scale * this.b1.iinertia * this.jAcc;
			this.b2.angvel += this.ratio * this.scale * this.b2.iinertia * this.jAcc;
		}
	}
	applyImpulseVel() {
		if(this.slack) {
			return false;
		}
		let E = this.scale * (this.ratio * (this.b2.angvel + this.b2.kinangvel) - this.b1.angvel - this.b1.kinangvel);
		let j = this.kMass * (this.bias - E) - this.jAcc * this.gamma;
		let jOld = this.jAcc;
		this.jAcc += j;
		if(!this.equal && this.jAcc > 0) {
			this.jAcc = 0;
		}
		if(this.breakUnderForce && (this.jAcc > this.jMax || this.jAcc < -this.jMax)) {
			return true;
		}
		if(!this.stiff) {
			if(this.jAcc > this.jMax) {
				this.jAcc = this.jMax;
			} else if(this.jAcc < -this.jMax) {
				this.jAcc = -this.jMax;
			}
		}
		j = this.jAcc - jOld;
		this.b1.angvel -= this.scale * this.b1.iinertia * j;
		this.b2.angvel += this.ratio * this.scale * this.b2.iinertia * j;
		return false;
	}
	applyImpulsePos() {
		let j;
		let slack;
		let C = this.ratio * this.b2.rot - this.b1.rot;
		if(this.equal) {
			C -= this.jointMax;
			slack = false;
			this.scale = 1.0;
		} else if(C < this.jointMin) {
			C = this.jointMin - C;
			this.scale = -1.0;
			slack = false;
		} else if(C > this.jointMax) {
			C -= this.jointMax;
			this.scale = 1.0;
			slack = false;
		} else {
			this.scale = 0.0;
			C = 0;
			slack = true;
		}
		let E = C;
		if(!slack) {
			if(this.breakUnderError && E * E > this.maxError * this.maxError) {
				return true;
			}
			E *= 0.5;
			j = -E * this.kMass;
			if(this.equal || j < 0) {
				let _this = this.b1;
				let dr = -this.scale * j * this.b1.iinertia;
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
				let _this1 = this.b2;
				let dr1 = this.ratio * this.scale * j * this.b2.iinertia;
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
		return false;
	}
	draw(g) {
		let me = this.outer_zn;
		let minrad = 10;
		let delrad = 5 / Math.PI / 2;
		let _this = me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer;
		if((me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer) != (_this.zpp_inner.space == null ? null : _this.zpp_inner.space.outer).zpp_inner.__static) {
			let min = me.zpp_inner_zn.ratio * (me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer).zpp_inner.rot - this.jointMin;
			let max = me.zpp_inner_zn.ratio * (me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer).zpp_inner.rot - this.jointMax;
			if(min > max) {
				let t = min;
				min = max;
				max = t;
			}
			if((me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer).zpp_inner.rot > min) {
				let x = (me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer).zpp_inner.rot;
				let y = max;
				let dr = x < y ? x : y;
				let _this = me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer;
				if(_this.zpp_inner.wrap_pos == null) {
					_this.zpp_inner.setupPosition();
				}
				ZPP_AngleDraw.drawSpiral(g,_this.zpp_inner.wrap_pos,min,dr,minrad + (min - min) * delrad,minrad + (dr - min) * delrad,16776960);
			} else if(!this.stiff && (me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer).zpp_inner.rot < min) {
				let _this = me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer;
				if(_this.zpp_inner.wrap_pos == null) {
					_this.zpp_inner.setupPosition();
				}
				ZPP_AngleDraw.drawSpiralSpring(g,_this.zpp_inner.wrap_pos,(me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer).zpp_inner.rot,min,minrad + ((me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer).zpp_inner.rot - min) * delrad,minrad + (min - min) * delrad,16776960);
			}
			if((me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer).zpp_inner.rot < max) {
				let x = (me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer).zpp_inner.rot;
				let y = min;
				let dr = x > y ? x : y;
				let _this = me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer;
				if(_this.zpp_inner.wrap_pos == null) {
					_this.zpp_inner.setupPosition();
				}
				ZPP_AngleDraw.drawSpiral(g,_this.zpp_inner.wrap_pos,dr,max,minrad + (dr - min) * delrad,minrad + (max - min) * delrad,65535);
			} else if(!this.stiff && (me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer).zpp_inner.rot > max) {
				let _this = me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer;
				if(_this.zpp_inner.wrap_pos == null) {
					_this.zpp_inner.setupPosition();
				}
				ZPP_AngleDraw.drawSpiralSpring(g,_this.zpp_inner.wrap_pos,(me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer).zpp_inner.rot,max,minrad + ((me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer).zpp_inner.rot - min) * delrad,minrad + (max - min) * delrad,65535);
			}
			let _this = me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer;
			if(_this.zpp_inner.wrap_pos == null) {
				_this.zpp_inner.setupPosition();
			}
			ZPP_AngleDraw.indicator(g,_this.zpp_inner.wrap_pos,(me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer).zpp_inner.rot,minrad + ((me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer).zpp_inner.rot - min) * delrad,255);
		}
		let _this1 = me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer;
		if((me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer) != (_this1.zpp_inner.space == null ? null : _this1.zpp_inner.space.outer).zpp_inner.__static) {
			let min = (this.jointMin + (me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer).zpp_inner.rot) / me.zpp_inner_zn.ratio;
			let max = (this.jointMax + (me.zpp_inner_zn.b1 == null ? null : me.zpp_inner_zn.b1.outer).zpp_inner.rot) / me.zpp_inner_zn.ratio;
			if(min > max) {
				let t = min;
				min = max;
				max = t;
			}
			if((me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer).zpp_inner.rot > min) {
				let x = (me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer).zpp_inner.rot;
				let y = max;
				let dr = x < y ? x : y;
				let _this = me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer;
				if(_this.zpp_inner.wrap_pos == null) {
					_this.zpp_inner.setupPosition();
				}
				ZPP_AngleDraw.drawSpiral(g,_this.zpp_inner.wrap_pos,min,dr,minrad + (min - min) * delrad,minrad + (dr - min) * delrad,16776960);
			} else if(!this.stiff && (me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer).zpp_inner.rot < min) {
				let _this = me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer;
				if(_this.zpp_inner.wrap_pos == null) {
					_this.zpp_inner.setupPosition();
				}
				ZPP_AngleDraw.drawSpiralSpring(g,_this.zpp_inner.wrap_pos,(me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer).zpp_inner.rot,min,minrad + ((me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer).zpp_inner.rot - min) * delrad,minrad + (min - min) * delrad,16776960);
			}
			if((me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer).zpp_inner.rot < max) {
				let x = (me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer).zpp_inner.rot;
				let y = min;
				let dr = x > y ? x : y;
				let _this = me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer;
				if(_this.zpp_inner.wrap_pos == null) {
					_this.zpp_inner.setupPosition();
				}
				ZPP_AngleDraw.drawSpiral(g,_this.zpp_inner.wrap_pos,dr,max,minrad + (dr - min) * delrad,minrad + (max - min) * delrad,65535);
			} else if(!this.stiff && (me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer).zpp_inner.rot > max) {
				let _this = me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer;
				if(_this.zpp_inner.wrap_pos == null) {
					_this.zpp_inner.setupPosition();
				}
				ZPP_AngleDraw.drawSpiralSpring(g,_this.zpp_inner.wrap_pos,(me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer).zpp_inner.rot,max,minrad + ((me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer).zpp_inner.rot - min) * delrad,minrad + (max - min) * delrad,65535);
			}
			let _this = me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer;
			if(_this.zpp_inner.wrap_pos == null) {
				_this.zpp_inner.setupPosition();
			}
			ZPP_AngleDraw.indicator(g,_this.zpp_inner.wrap_pos,(me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer).zpp_inner.rot,minrad + ((me.zpp_inner_zn.b2 == null ? null : me.zpp_inner_zn.b2.outer).zpp_inner.rot - min) * delrad,16711680);
		}
	}
}
