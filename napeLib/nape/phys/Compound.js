import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZPP_Compound from '../../zpp_nape/phys/ZPP_Compound.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
import ZPP_CbType from '../../zpp_nape/callbacks/ZPP_CbType.js';
import CompoundIterator from './CompoundIterator.js';
import BodyIterator from './BodyIterator.js';
import Interactor from './Interactor.js';
import Vec2 from '../geom/Vec2.js';
import ConstraintIterator from '../constraint/ConstraintIterator.js';
export default class Compound extends Interactor {
	constructor() {
		Interactor._hx_skip_constructor = true;
		super();
		Interactor._hx_skip_constructor = false;
		this._hx_constructor();
	}
	_hx_constructor() {
		this.zpp_inner = null;
		Interactor.zpp_internalAlloc = true;
		super._hx_constructor();
		Interactor.zpp_internalAlloc = false;
		this.zpp_inner = new ZPP_Compound();
		this.zpp_inner.outer = this;
		this.zpp_inner.outer_i = this;
		this.zpp_inner_i = this.zpp_inner;
		this.zpp_inner.insert_cbtype(ZPP_CbType.ANY_COMPOUND.zpp_inner);
	}
	get_bodies() {
		return this.zpp_inner.wrap_bodies;
	}
	get_constraints() {
		return this.zpp_inner.wrap_constraints;
	}
	get_compounds() {
		return this.zpp_inner.wrap_compounds;
	}
	get_compound() {
		if(this.zpp_inner.compound == null) {
			return null;
		} else {
			return this.zpp_inner.compound.outer;
		}
	}
	set_compound(compound) {
		this.zpp_inner.immutable_midstep("Compound::compound");
		if((this.zpp_inner.compound == null ? null : this.zpp_inner.compound.outer) != compound) {
			if((this.zpp_inner.compound == null ? null : this.zpp_inner.compound.outer) != null) {
				(this.zpp_inner.compound == null ? null : this.zpp_inner.compound.outer).zpp_inner.wrap_compounds.remove(this);
			}
			if(compound != null) {
				let _this = compound.zpp_inner.wrap_compounds;
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
			throw haxe_Exception.thrown("Error: Cannot set the space of an inner Compound, only the root Compound space can be set");
		}
		this.zpp_inner.immutable_midstep("Compound::space");
		if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != space) {
			if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != null) {
				(this.zpp_inner.space == null ? null : this.zpp_inner.space.outer).zpp_inner.wrap_compounds.remove(this);
			}
			if(space != null) {
				let _this = space.zpp_inner.wrap_compounds;
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
	toString() {
		return "Compound" + this.zpp_inner_i.id;
	}
	copy() {
		return this.zpp_inner.copy();
	}
	breakApart() {
		this.zpp_inner.breakApart();
	}
	visitBodies(lambda) {
		if(lambda == null) {
			throw haxe_Exception.thrown("Error: lambda cannot be null for Compound::visitBodies");
		}
		let _this = this.zpp_inner.wrap_bodies;
		_this.zpp_inner.valmod();
		let _g = BodyIterator.get(_this);
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
				_g.zpp_next = BodyIterator.zpp_pool;
				BodyIterator.zpp_pool = _g;
				_g.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g.zpp_critical = false;
			let b = _g.zpp_inner.at(_g.zpp_i++);
			lambda(b);
		}
		let _this1 = this.zpp_inner.wrap_compounds;
		_this1.zpp_inner.valmod();
		let _g1 = CompoundIterator.get(_this1);
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
				_g1.zpp_next = CompoundIterator.zpp_pool;
				CompoundIterator.zpp_pool = _g1;
				_g1.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g1.zpp_critical = false;
			let c = _g1.zpp_inner.at(_g1.zpp_i++);
			c.visitBodies(lambda);
		}
	}
	visitConstraints(lambda) {
		if(lambda == null) {
			throw haxe_Exception.thrown("Error: lambda cannot be null for Compound::visitConstraints");
		}
		let _this = this.zpp_inner.wrap_constraints;
		_this.zpp_inner.valmod();
		let _g = ConstraintIterator.get(_this);
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
				_g.zpp_next = ConstraintIterator.zpp_pool;
				ConstraintIterator.zpp_pool = _g;
				_g.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g.zpp_critical = false;
			let c = _g.zpp_inner.at(_g.zpp_i++);
			lambda(c);
		}
		let _this1 = this.zpp_inner.wrap_compounds;
		_this1.zpp_inner.valmod();
		let _g1 = CompoundIterator.get(_this1);
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
				_g1.zpp_next = CompoundIterator.zpp_pool;
				CompoundIterator.zpp_pool = _g1;
				_g1.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g1.zpp_critical = false;
			let c = _g1.zpp_inner.at(_g1.zpp_i++);
			c.visitConstraints(lambda);
		}
	}
	visitCompounds(lambda) {
		if(lambda == null) {
			throw haxe_Exception.thrown("Error: lambda cannot be null for Compound::visitConstraints");
		}
		let _this = this.zpp_inner.wrap_compounds;
		_this.zpp_inner.valmod();
		let _g = CompoundIterator.get(_this);
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
				_g.zpp_next = CompoundIterator.zpp_pool;
				CompoundIterator.zpp_pool = _g;
				_g.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g.zpp_critical = false;
			let c = _g.zpp_inner.at(_g.zpp_i++);
			lambda(c);
			c.visitCompounds(lambda);
		}
	}
	COM(weak) {
		if(weak == null) {
			weak = false;
		}
		let x = 0;
		let y = 0;
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
		let ret1 = ret;
		let total = 0.0;
		this.visitBodies(function(b) {
			let _this = b.zpp_inner.wrap_shapes;
			if(_this.zpp_inner.inner.head != null) {
				let ret = ret1;
				if(b.zpp_inner.world) {
					throw haxe_Exception.thrown("Error: Space::world has no " + "worldCOM");
				}
				if(b.zpp_inner.wrap_worldCOM == null) {
					let x = b.zpp_inner.worldCOMx;
					let y = b.zpp_inner.worldCOMy;
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
					b.zpp_inner.wrap_worldCOM = ret;
					b.zpp_inner.wrap_worldCOM.zpp_inner._inuse = true;
					b.zpp_inner.wrap_worldCOM.zpp_inner._immutable = true;
					b.zpp_inner.wrap_worldCOM.zpp_inner._validate = ($_=b.zpp_inner,$bind($_,$_.getworldCOM));
				}
				let tmp = b.zpp_inner.wrap_worldCOM;
				if(b.zpp_inner.world) {
					throw haxe_Exception.thrown("Error: Space::world has no mass");
				}
				b.zpp_inner.validate_mass();
				if(b.zpp_inner.massMode == ZPP_Flags.id_MassMode_DEFAULT && b.zpp_inner.shapes.head == null) {
					throw haxe_Exception.thrown("Error: Given current mass mode, Body::mass only makes sense if it contains shapes");
				}
				ret.addeq(tmp.mul(b.zpp_inner.cmass,true));
				let total1 = total;
				if(b.zpp_inner.world) {
					throw haxe_Exception.thrown("Error: Space::world has no mass");
				}
				b.zpp_inner.validate_mass();
				if(b.zpp_inner.massMode == ZPP_Flags.id_MassMode_DEFAULT && b.zpp_inner.shapes.head == null) {
					throw haxe_Exception.thrown("Error: Given current mass mode, Body::mass only makes sense if it contains shapes");
				}
				total = total1 + b.zpp_inner.cmass;
			}
		});
		if(total == 0.0) {
			throw haxe_Exception.thrown("Error: COM of an empty Compound is undefined silly");
		}
		ret1.muleq(1 / total);
		return ret1;
	}
	translate(translation) {
		if(translation != null && translation.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(translation == null) {
			throw haxe_Exception.thrown("Error: Cannot translate by null Vec2");
		}
		let weak = translation.zpp_inner.weak;
		translation.zpp_inner.weak = false;
		this.visitBodies(function(b) {
			if(b.zpp_inner.wrap_pos == null) {
				b.zpp_inner.setupPosition();
			}
			b.zpp_inner.wrap_pos.addeq(translation);
		});
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
		this.visitBodies(function(b) {
			b.rotate(centre,angle);
		});
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
}
