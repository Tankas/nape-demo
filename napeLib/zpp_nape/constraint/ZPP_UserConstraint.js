import ZPP_UserBody from './ZPP_UserBody.js';
import ZPP_Constraint from './ZPP_Constraint.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import Vec3 from '../../nape/geom/Vec3.js';
import Config from '../../nape/Config.js';
export default class ZPP_UserConstraint extends ZPP_Constraint {
	constructor(dim,velonly) {
		ZPP_Constraint._hx_skip_constructor = true;
		super();
		ZPP_Constraint._hx_skip_constructor = false;
		this._hx_constructor(dim,velonly);
	}
	_hx_constructor(dim,velonly) {
		this.jOld = null;
		this.J = null;
		this.vec3 = null;
		this.Keff = null;
		this.jMax = 0.0;
		this.velonly = false;
		this.gamma = 0.0;
		this.soft = 0.0;
		this.y = null;
		this.L = null;
		this.stepped = false;
		this.bias = null;
		this.jAcc = null;
		this.dim = 0;
		this.bodies = null;
		this.outer_zn = null;
		super._hx_constructor();
		this.bodies = [];
		this.dim = dim;
		this.velonly = velonly;
		this.jAcc = [];
		this.bias = [];
		this.L = [];
		this.J = [];
		this.jOld = [];
		this.y = [];
		this.Keff = [];
		this.vec3 = Vec3.get(0,0,0);
		let _g = 0;
		let _g1 = dim;
		while(_g < _g1) {
			let i = _g++;
			let tmp = this.bias[i] = this.J[i] = this.jOld[i] = this.y[i] = 0.0;
			this.jAcc[i] = tmp;
			let _g1 = 0;
			let _g2 = dim;
			while(_g1 < _g2) {
				let j = _g1++;
				this.L[i * dim + j] = 0.0;
			}
		}
		this.stepped = false;
	}
	bindVec2_invalidate(_) {
		this.outer_zn.__invalidate();
	}
	addBody(b) {
		let match = null;
		let _g = 0;
		let _g1 = this.bodies;
		while(_g < _g1.length) {
			let x = _g1[_g];
			++_g;
			if(x.body == b) {
				match = x;
				break;
			}
		}
		if(match == null) {
			this.bodies.push(new ZPP_UserBody(1,b));
			if(this.active && this.space != null) {
				if(b != null) {
					b.constraints.add(this);
				}
			}
		} else {
			match.cnt++;
		}
	}
	remBody(b) {
		let match = null;
		let bl = this.bodies.length | 0;
		let i = 0;
		while(i < bl) {
			let x = this.bodies[i];
			if(x.body == b) {
				x.cnt--;
				if(x.cnt == 0) {
					if(bl > 0) {
						this.bodies[i] = this.bodies[bl - 1];
					}
					this.bodies.pop();
					if(this.active && this.space != null) {
						if(b != null) {
							b.constraints.remove(this);
						}
					}
				}
				match = x;
				break;
			}
			++i;
		}
		return match != null;
	}
	bodyImpulse(b) {
		let _g = 0;
		let _g1 = this.dim;
		while(_g < _g1) {
			let i = _g++;
			this.J[i] = this.jAcc[i];
		}
		let ret = Vec3.get(0,0,0);
		if(this.stepped) {
			this.outer_zn.__impulse(this.J,b.outer,ret);
		}
		return ret;
	}
	activeBodies() {
		let _g = 0;
		let _g1 = this.bodies;
		while(_g < _g1.length) {
			let b = _g1[_g];
			++_g;
			if(b.body != null) {
				b.body.constraints.add(this);
			}
		}
	}
	inactiveBodies() {
		let _g = 0;
		let _g1 = this.bodies;
		while(_g < _g1.length) {
			let b = _g1[_g];
			++_g;
			if(b.body != null) {
				b.body.constraints.remove(this);
			}
		}
	}
	copy(dict,todo) {
		let ret = this.outer_zn.__copy();
		this.copyto(ret);
		throw haxe_Exception.thrown("not done yet");
	}
	validate() {
		let _g = 0;
		let _g1 = this.bodies;
		while(_g < _g1.length) {
			let b = _g1[_g];
			++_g;
			if(b.body.space != this.space) {
				throw haxe_Exception.thrown("Error: Constraints must have each body within the same sapce to which the constraint has been assigned");
			}
		}
		this.outer_zn.__validate();
	}
	wake_connected() {
		let _g = 0;
		let _g1 = this.bodies;
		while(_g < _g1.length) {
			let b = _g1[_g];
			++_g;
			if(b.body.type == ZPP_Flags.id_BodyType_DYNAMIC) {
				b.body.wake();
			}
		}
	}
	forest() {
		let _g = 0;
		let _g1 = this.bodies;
		while(_g < _g1.length) {
			let b = _g1[_g];
			++_g;
			if(b.body.type == ZPP_Flags.id_BodyType_DYNAMIC) {
				let xr;
				if(b.body.component == b.body.component.parent) {
					xr = b.body.component;
				} else {
					let obj = b.body.component;
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
	}
	pair_exists(id,di) {
		let ret = false;
		let bl = this.bodies.length | 0;
		let _g = 0;
		let _g1 = bl;
		while(_g < _g1) {
			let bi = _g++;
			let b = this.bodies[bi].body;
			let _g1 = bi + 1;
			let _g2 = bl;
			while(_g1 < _g2) {
				let ci = _g1++;
				let c = this.bodies[ci].body;
				if(b.id == id && c.id == di || b.id == di && c.id == id) {
					ret = true;
					break;
				}
			}
			if(ret) {
				break;
			}
		}
		return ret;
	}
	broken() {
		this.outer_zn.__broken();
	}
	clearcache() {
		let _g = 0;
		let _g1 = this.dim;
		while(_g < _g1) {
			let i = _g++;
			this.jAcc[i] = 0.0;
		}
		this.pre_dt = -1.0;
	}
	lsq(v) {
		let sum = 0.0;
		let _g = 0;
		let _g1 = this.dim;
		while(_g < _g1) {
			let i = _g++;
			sum += v[i] * v[i];
		}
		return sum;
	}
	_clamp(v,max) {
		let x = this.lsq(v);
		if(x > max * max) {
			let scale = max / Math.sqrt(x);
			let _g = 0;
			let _g1 = this.dim;
			while(_g < _g1) {
				let i = _g++;
				v[i] *= scale;
			}
		}
	}
	solve(m) {
		let ind = 0;
		let _g = 0;
		let _g1 = this.dim;
		while(_g < _g1) {
			let j = _g++;
			let sum = 0.0;
			let _g1 = 0;
			let _g2 = j - 1;
			while(_g1 < _g2) {
				let k = _g1++;
				sum += this.L[j * this.dim + k] * this.L[j * this.dim + k];
			}
			let rec = Math.sqrt(m[ind++] - sum);
			this.L[j * this.dim + j] = rec;
			if(rec != 0) {
				rec = 1.0 / rec;
				let _g = j + 1;
				let _g1 = this.dim;
				while(_g < _g1) {
					let i = _g++;
					let sum = 0.0;
					let _g1 = 0;
					let _g2 = j - 1;
					while(_g1 < _g2) {
						let k = _g1++;
						sum += this.L[i * this.dim + k] * this.L[j * this.dim + k];
					}
					this.L[i * this.dim + j] = rec * (m[ind++] - sum);
				}
			} else {
				let _g = j + 1;
				let _g1 = this.dim;
				while(_g < _g1) {
					let i = _g++;
					this.L[i * this.dim + j] = 0.0;
				}
				ind += this.dim - j - 1;
			}
		}
		return this.L;
	}
	transform(L,x) {
		let _g = 0;
		let _g1 = this.dim;
		while(_g < _g1) {
			let i = _g++;
			let sum = x[i];
			let lii = L[i * this.dim + i];
			if(lii != 0) {
				let _g = 0;
				let _g1 = i;
				while(_g < _g1) {
					let k = _g++;
					sum -= L[i * this.dim + k] * this.y[k];
				}
				this.y[i] = sum / lii;
			} else {
				this.y[i] = 0.0;
			}
		}
		let _g2 = 0;
		let _g3 = this.dim;
		while(_g2 < _g3) {
			let ix = _g2++;
			let i = this.dim - 1 - ix;
			let lii = L[i * this.dim + i];
			if(lii != 0) {
				let sum = this.y[i];
				let _g = i + 1;
				let _g1 = this.dim;
				while(_g < _g1) {
					let k = _g++;
					sum -= L[k * this.dim + i] * x[k];
				}
				x[i] = sum / lii;
			} else {
				x[i] = 0.0;
			}
		}
	}
	preStep(dt) {
		if(this.pre_dt == -1.0) {
			this.pre_dt = dt;
		}
		let dtratio = dt / this.pre_dt;
		this.pre_dt = dt;
		this.stepped = true;
		this.outer_zn.__prepare();
		this.outer_zn.__eff_mass(this.Keff);
		this.L = this.solve(this.Keff);
		if(!this.stiff && !this.velonly) {
			let omega = 2 * Math.PI * this.frequency;
			this.gamma = 1 / (dt * omega * (2 * this.damping + omega * dt));
			let ig = 1 / (1 + this.gamma);
			let biasCoef = dt * omega * omega * this.gamma;
			this.gamma *= ig;
			this.soft = ig;
			this.outer_zn.__position(this.bias);
			if(this.breakUnderError && this.lsq(this.bias) > this.maxError * this.maxError) {
				return true;
			}
			let _g = 0;
			let _g1 = this.dim;
			while(_g < _g1) {
				let i = _g++;
				this.bias[i] *= -biasCoef;
			}
			this._clamp(this.bias,this.maxError);
		} else {
			let _g = 0;
			let _g1 = this.dim;
			while(_g < _g1) {
				let i = _g++;
				this.bias[i] = 0.0;
			}
			this.gamma = 0.0;
			this.soft = 1.0;
		}
		let _g = 0;
		let _g1 = this.dim;
		while(_g < _g1) {
			let i = _g++;
			this.jAcc[i] *= dtratio;
		}
		this.jMax = this.maxForce * dt;
		return false;
	}
	warmStart() {
		let _g = 0;
		let _g1 = this.bodies;
		while(_g < _g1.length) {
			let bs = _g1[_g];
			++_g;
			let b = bs.body;
			this.outer_zn.__impulse(this.jAcc,b.outer,this.vec3);
			let t = b.imass;
			let b1 = b;
			let b2 = b1.velx;
			let _this = this.vec3;
			if(_this != null && _this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this1 = _this.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			b1.velx = b2 + _this.zpp_inner.x * t;
			let b3 = b;
			let b4 = b3.vely;
			let _this2 = this.vec3;
			if(_this2 != null && _this2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this3 = _this2.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			b3.vely = b4 + _this2.zpp_inner.y * t;
			let b5 = b;
			let b6 = b5.angvel;
			let _this4 = this.vec3;
			if(_this4 != null && _this4.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this5 = _this4.zpp_inner;
			if(_this5._validate != null) {
				_this5._validate();
			}
			b5.angvel = b6 + _this4.zpp_inner.z * b.iinertia;
		}
		this.outer_zn.__warmStart();
	}
	applyImpulseVel() {
		this.outer_zn.__velocity(this.J);
		let _g = 0;
		let _g1 = this.dim;
		while(_g < _g1) {
			let i = _g++;
			this.J[i] = this.bias[i] - this.J[i];
		}
		this.transform(this.L,this.J);
		let _g2 = 0;
		let _g3 = this.dim;
		while(_g2 < _g3) {
			let i = _g2++;
			this.jOld[i] = this.jAcc[i];
			this.jAcc[i] += this.J[i] = this.J[i] * this.soft - this.jAcc[i] * this.gamma;
		}
		this.outer_zn.__clamp(this.jAcc);
		if((this.breakUnderForce || !this.stiff) && this.lsq(this.jAcc) > this.jMax * this.jMax) {
			if(this.breakUnderForce) {
				return true;
			} else if(!this.stiff) {
				this._clamp(this.jAcc,this.jMax);
			}
		}
		let _g4 = 0;
		let _g5 = this.dim;
		while(_g4 < _g5) {
			let i = _g4++;
			this.J[i] = this.jAcc[i] - this.jOld[i];
		}
		let _g6 = 0;
		let _g7 = this.bodies;
		while(_g6 < _g7.length) {
			let bs = _g7[_g6];
			++_g6;
			let b = bs.body;
			this.outer_zn.__impulse(this.J,b.outer,this.vec3);
			let t = b.imass;
			let b1 = b;
			let b2 = b1.velx;
			let _this = this.vec3;
			if(_this != null && _this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this1 = _this.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			b1.velx = b2 + _this.zpp_inner.x * t;
			let b3 = b;
			let b4 = b3.vely;
			let _this2 = this.vec3;
			if(_this2 != null && _this2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this3 = _this2.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			b3.vely = b4 + _this2.zpp_inner.y * t;
			let b5 = b;
			let b6 = b5.angvel;
			let _this4 = this.vec3;
			if(_this4 != null && _this4.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this5 = _this4.zpp_inner;
			if(_this5._validate != null) {
				_this5._validate();
			}
			b5.angvel = b6 + _this4.zpp_inner.z * b.iinertia;
		}
		return false;
	}
	applyImpulsePos() {
		if(this.velonly) {
			return false;
		}
		this.outer_zn.__prepare();
		this.outer_zn.__position(this.J);
		let lj = this.lsq(this.J);
		if(this.breakUnderError && lj > this.maxError * this.maxError) {
			return true;
		} else if(lj < Config.constraintLinearSlop * Config.constraintLinearSlop) {
			return false;
		}
		let _g = 0;
		let _g1 = this.dim;
		while(_g < _g1) {
			let i = _g++;
			this.J[i] *= -1;
		}
		this.outer_zn.__eff_mass(this.Keff);
		this.transform(this.solve(this.Keff),this.J);
		this.outer_zn.__clamp(this.J);
		let _g2 = 0;
		let _g3 = this.bodies;
		while(_g2 < _g3.length) {
			let bs = _g3[_g2];
			++_g2;
			let b = bs.body;
			this.outer_zn.__impulse(this.J,b.outer,this.vec3);
			let t = b.imass;
			let b1 = b;
			let b2 = b1.posx;
			let _this = this.vec3;
			if(_this != null && _this.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this1 = _this.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			b1.posx = b2 + _this.zpp_inner.x * t;
			let b3 = b;
			let b4 = b3.posy;
			let _this2 = this.vec3;
			if(_this2 != null && _this2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this3 = _this2.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			b3.posy = b4 + _this2.zpp_inner.y * t;
			let _this4 = this.vec3;
			if(_this4 != null && _this4.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec3" + " has been disposed and cannot be used!");
			}
			let _this5 = _this4.zpp_inner;
			if(_this5._validate != null) {
				_this5._validate();
			}
			let dr = _this4.zpp_inner.z * b.iinertia;
			b.rot += dr;
			if(dr * dr > 0.0001) {
				b.axisx = Math.sin(b.rot);
				b.axisy = Math.cos(b.rot);
			} else {
				let d2 = dr * dr;
				let p = 1 - 0.5 * d2;
				let m = 1 - d2 * d2 / 8;
				let nx = (p * b.axisx + dr * b.axisy) * m;
				b.axisy = (p * b.axisy - dr * b.axisx) * m;
				b.axisx = nx;
			}
		}
		return false;
	}
	draw(g) {
		this.outer_zn.__draw(g);
	}
}
