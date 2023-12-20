import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZPP_Polygon from '../../zpp_nape/shape/ZPP_Polygon.js';
import ZPP_Material from '../../zpp_nape/phys/ZPP_Material.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import ZPP_InteractionFilter from '../../zpp_nape/dynamics/ZPP_InteractionFilter.js';
import ZPP_CbType from '../../zpp_nape/callbacks/ZPP_CbType.js';
import Shape from './Shape.js';
import Interactor from '../phys/Interactor.js';
import Vec2List from '../geom/Vec2List.js';
import Vec2Iterator from '../geom/Vec2Iterator.js';
import Vec2 from '../geom/Vec2.js';
import GeomPoly from '../geom/GeomPoly.js';
import Geom from '../geom/Geom.js';
export default class Polygon extends Shape {
	constructor(localVerts,material,filter) {
		Interactor._hx_skip_constructor = true;
		super();
		Interactor._hx_skip_constructor = false;
		this._hx_constructor(localVerts,material,filter);
	}
	_hx_constructor(localVerts,material,filter) {
		this.zpp_inner_zn = null;
		Shape.zpp_internalAlloc = true;
		super._hx_constructor();
		Shape.zpp_internalAlloc = false;
		if(localVerts == null) {
			throw haxe_Exception.thrown("Error: localVerts cannot be null");
		}
		this.zpp_inner_zn = new ZPP_Polygon();
		this.zpp_inner_zn.outer = this;
		this.zpp_inner_zn.outer_zn = this;
		this.zpp_inner = this.zpp_inner_zn;
		this.zpp_inner_i = this.zpp_inner;
		this.zpp_inner_i.outer_i = this;
		if(((localVerts) instanceof Array)) {
			let lv = localVerts;
			let _g = 0;
			while(_g < lv.length) {
				let vite = lv[_g];
				++_g;
				if(vite == null) {
					throw haxe_Exception.thrown("Error: Array<Vec2> contains null objects");
				}
				if(!((vite) instanceof Vec2)) {
					throw haxe_Exception.thrown("Error: Array<Vec2> contains non Vec2 objects");
				}
				let x = vite;
				if(x != null && x.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				if(this.zpp_inner_zn.wrap_lverts == null) {
					this.zpp_inner_zn.getlverts();
				}
				let tmp = this.zpp_inner_zn.wrap_lverts;
				if(x != null && x.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				if(x.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = x.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				let x1 = x.zpp_inner.x;
				if(x.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = x.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				let y = x.zpp_inner.y;
				let weak = false;
				if(weak == null) {
					weak = false;
				}
				if(y == null) {
					y = 0;
				}
				if(x1 == null) {
					x1 = 0;
				}
				if(x1 != x1 || y != y) {
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
					ret1.x = x1;
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
					if(x1 != x1 || y != y) {
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
					if(ret.zpp_inner.x == x1) {
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
						ret.zpp_inner.x = x1;
						ret.zpp_inner.y = y;
						let _this = ret.zpp_inner;
						if(_this._invalidate != null) {
							_this._invalidate(_this);
						}
					}
				}
				ret.zpp_inner.weak = weak;
				tmp.push(ret);
			}
		} else if(((localVerts) instanceof Vec2List)) {
			let lv = localVerts;
			let _g = lv.iterator();
			while(true) {
				_g.zpp_inner.zpp_inner.valmod();
				let length = _g.zpp_inner.zpp_gl();
				_g.zpp_critical = true;
				let tmp;
				if(_g.zpp_i < length) {
					tmp = true;
				} else {
					_g.zpp_next = Vec2Iterator.zpp_pool;
					Vec2Iterator.zpp_pool = _g;
					_g.zpp_inner = null;
					tmp = false;
				}
				if(!tmp) {
					break;
				}
				_g.zpp_critical = false;
				let x = _g.zpp_inner.at(_g.zpp_i++);
				if(x == null) {
					throw haxe_Exception.thrown("Error: Vec2List contains null objects");
				}
				if(x != null && x.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				if(this.zpp_inner_zn.wrap_lverts == null) {
					this.zpp_inner_zn.getlverts();
				}
				let tmp1 = this.zpp_inner_zn.wrap_lverts;
				if(x != null && x.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				if(x.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = x.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				let x1 = x.zpp_inner.x;
				if(x.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = x.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				let y = x.zpp_inner.y;
				let weak = false;
				if(weak == null) {
					weak = false;
				}
				if(y == null) {
					y = 0;
				}
				if(x1 == null) {
					x1 = 0;
				}
				if(x1 != x1 || y != y) {
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
					ret1.x = x1;
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
					if(x1 != x1 || y != y) {
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
					if(ret.zpp_inner.x == x1) {
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
						ret.zpp_inner.x = x1;
						ret.zpp_inner.y = y;
						let _this = ret.zpp_inner;
						if(_this._invalidate != null) {
							_this._invalidate(_this);
						}
					}
				}
				ret.zpp_inner.weak = weak;
				tmp1.push(ret);
			}
		} else if(((localVerts) instanceof GeomPoly)) {
			let lv = localVerts;
			if(lv != null && lv.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
			}
			let verts = lv.zpp_inner.vertices;
			if(verts != null) {
				let vite = verts;
				while(true) {
					let x = vite.x;
					let y = vite.y;
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
					let x1 = ret;
					vite = vite.next;
					if(this.zpp_inner_zn.wrap_lverts == null) {
						this.zpp_inner_zn.getlverts();
					}
					let tmp = this.zpp_inner_zn.wrap_lverts;
					if(x1 != null && x1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					if(x1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this = x1.zpp_inner;
					if(_this._validate != null) {
						_this._validate();
					}
					let x2 = x1.zpp_inner.x;
					if(x1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this1 = x1.zpp_inner;
					if(_this1._validate != null) {
						_this1._validate();
					}
					let y1 = x1.zpp_inner.y;
					let weak = false;
					if(weak == null) {
						weak = false;
					}
					if(y1 == null) {
						y1 = 0;
					}
					if(x2 == null) {
						x2 = 0;
					}
					if(x2 != x2 || y1 != y1) {
						throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
					}
					let ret1;
					if(ZPP_PubPool.poolVec2 == null) {
						ret1 = new Vec2();
					} else {
						ret1 = ZPP_PubPool.poolVec2;
						ZPP_PubPool.poolVec2 = ret1.zpp_pool;
						ret1.zpp_pool = null;
						ret1.zpp_disp = false;
						if(ret1 == ZPP_PubPool.nextVec2) {
							ZPP_PubPool.nextVec2 = null;
						}
					}
					if(ret1.zpp_inner == null) {
						let ret;
						if(ZPP_Vec2.zpp_pool == null) {
							ret = new ZPP_Vec2();
						} else {
							ret = ZPP_Vec2.zpp_pool;
							ZPP_Vec2.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.weak = false;
						ret._immutable = false;
						ret.x = x2;
						ret.y = y1;
						ret1.zpp_inner = ret;
						ret1.zpp_inner.outer = ret1;
					} else {
						if(ret1 != null && ret1.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = ret1.zpp_inner;
						if(_this._immutable) {
							throw haxe_Exception.thrown("Error: Vec2 is immutable");
						}
						if(_this._isimmutable != null) {
							_this._isimmutable();
						}
						if(x2 != x2 || y1 != y1) {
							throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
						}
						let tmp;
						if(ret1 != null && ret1.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = ret1.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						if(ret1.zpp_inner.x == x2) {
							if(ret1 != null && ret1.zpp_disp) {
								throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
							}
							let _this = ret1.zpp_inner;
							if(_this._validate != null) {
								_this._validate();
							}
							tmp = ret1.zpp_inner.y == y1;
						} else {
							tmp = false;
						}
						if(!tmp) {
							ret1.zpp_inner.x = x2;
							ret1.zpp_inner.y = y1;
							let _this = ret1.zpp_inner;
							if(_this._invalidate != null) {
								_this._invalidate(_this);
							}
						}
					}
					ret1.zpp_inner.weak = weak;
					tmp.push(ret1);
					if(x1 != null && x1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this2 = x1.zpp_inner;
					if(_this2._immutable) {
						throw haxe_Exception.thrown("Error: Vec2 is immutable");
					}
					if(_this2._isimmutable != null) {
						_this2._isimmutable();
					}
					if(x1.zpp_inner._inuse) {
						throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
					}
					let inner = x1.zpp_inner;
					x1.zpp_inner.outer = null;
					x1.zpp_inner = null;
					let o = x1;
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
					if(vite == verts) {
						break;
					}
				}
			}
		} else {
			throw haxe_Exception.thrown("Error: Invalid type for polygon object, should be Array<Vec2>, Vec2List, GeomPoly or for flash10+ flash.Vector<Vec2>");
		}
		if(((localVerts) instanceof Array)) {
			let lv = localVerts;
			let i = 0;
			while(i < lv.length) {
				let cur = lv[i];
				let tmp;
				if(cur.zpp_inner.weak) {
					if(cur != null && cur.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this = cur.zpp_inner;
					if(_this._immutable) {
						throw haxe_Exception.thrown("Error: Vec2 is immutable");
					}
					if(_this._isimmutable != null) {
						_this._isimmutable();
					}
					if(cur.zpp_inner._inuse) {
						throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
					}
					let inner = cur.zpp_inner;
					cur.zpp_inner.outer = null;
					cur.zpp_inner = null;
					let o = cur;
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
					tmp = true;
				} else {
					tmp = false;
				}
				if(tmp) {
					lv.splice(i,1);
					continue;
				}
				++i;
			}
		} else if(((localVerts) instanceof Vec2List)) {
			let lv = localVerts;
			if(lv.zpp_inner._validate != null) {
				lv.zpp_inner._validate();
			}
			let ins = lv.zpp_inner.inner;
			let pre = null;
			let cur = ins.head;
			while(cur != null) {
				let x = cur.elt;
				if(x.outer.zpp_inner.weak) {
					cur = ins.erase(pre);
					if(x.outer.zpp_inner.weak) {
						let _this = x.outer;
						if(_this != null && _this.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = _this.zpp_inner;
						if(_this1._immutable) {
							throw haxe_Exception.thrown("Error: Vec2 is immutable");
						}
						if(_this1._isimmutable != null) {
							_this1._isimmutable();
						}
						if(_this.zpp_inner._inuse) {
							throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
						}
						let inner = _this.zpp_inner;
						_this.zpp_inner.outer = null;
						_this.zpp_inner = null;
						let o = _this;
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
				} else {
					pre = cur;
					cur = cur.next;
				}
			}
		}
		if(material == null) {
			if(ZPP_Material.zpp_pool == null) {
				this.zpp_inner.material = new ZPP_Material();
			} else {
				this.zpp_inner.material = ZPP_Material.zpp_pool;
				ZPP_Material.zpp_pool = this.zpp_inner.material.next;
				this.zpp_inner.material.next = null;
			}
		} else {
			this.zpp_inner.immutable_midstep("Shape::material");
			if(material == null) {
				throw haxe_Exception.thrown("Error: Cannot assign null as Shape material");
			}
			this.zpp_inner.setMaterial(material.zpp_inner);
			this.zpp_inner.material.wrapper();
		}
		if(filter == null) {
			if(ZPP_InteractionFilter.zpp_pool == null) {
				this.zpp_inner.filter = new ZPP_InteractionFilter();
			} else {
				this.zpp_inner.filter = ZPP_InteractionFilter.zpp_pool;
				ZPP_InteractionFilter.zpp_pool = this.zpp_inner.filter.next;
				this.zpp_inner.filter.next = null;
			}
		} else {
			this.zpp_inner.immutable_midstep("Shape::filter");
			if(filter == null) {
				throw haxe_Exception.thrown("Error: Cannot assign null as Shape filter");
			}
			this.zpp_inner.setFilter(filter.zpp_inner);
			this.zpp_inner.filter.wrapper();
		}
		this.zpp_inner_i.insert_cbtype(ZPP_CbType.ANY_SHAPE.zpp_inner);
	}
	get_localVerts() {
		if(this.zpp_inner_zn.wrap_lverts == null) {
			this.zpp_inner_zn.getlverts();
		}
		return this.zpp_inner_zn.wrap_lverts;
	}
	get_worldVerts() {
		if(this.zpp_inner_zn.wrap_gverts == null) {
			this.zpp_inner_zn.getgverts();
		}
		return this.zpp_inner_zn.wrap_gverts;
	}
	get_edges() {
		if(this.zpp_inner_zn.wrap_edges == null) {
			this.zpp_inner_zn.getedges();
		}
		return this.zpp_inner_zn.wrap_edges;
	}
	validity() {
		return this.zpp_inner_zn.valid();
	}
	static rect(x,y,width,height,weak) {
		if(weak == null) {
			weak = false;
		}
		if(x != x || y != y || width != width || height != height) {
			throw haxe_Exception.thrown("Error: Polygon.rect cannot accept NaN arguments");
		}
		let x1 = x;
		let y1 = y;
		let weak1 = weak;
		if(weak1 == null) {
			weak1 = false;
		}
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		if(x1 != x1 || y1 != y1) {
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
			ret1.x = x1;
			ret1.y = y1;
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
			if(x1 != x1 || y1 != y1) {
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
			if(ret.zpp_inner.x == x1) {
				if(ret != null && ret.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = ret.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				tmp = ret.zpp_inner.y == y1;
			} else {
				tmp = false;
			}
			if(!tmp) {
				ret.zpp_inner.x = x1;
				ret.zpp_inner.y = y1;
				let _this = ret.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
		}
		ret.zpp_inner.weak = weak1;
		let x2 = x + width;
		let y2 = y;
		let weak2 = weak;
		if(weak2 == null) {
			weak2 = false;
		}
		if(y2 == null) {
			y2 = 0;
		}
		if(x2 == null) {
			x2 = 0;
		}
		if(x2 != x2 || y2 != y2) {
			throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
		}
		let ret1;
		if(ZPP_PubPool.poolVec2 == null) {
			ret1 = new Vec2();
		} else {
			ret1 = ZPP_PubPool.poolVec2;
			ZPP_PubPool.poolVec2 = ret1.zpp_pool;
			ret1.zpp_pool = null;
			ret1.zpp_disp = false;
			if(ret1 == ZPP_PubPool.nextVec2) {
				ZPP_PubPool.nextVec2 = null;
			}
		}
		if(ret1.zpp_inner == null) {
			let ret;
			if(ZPP_Vec2.zpp_pool == null) {
				ret = new ZPP_Vec2();
			} else {
				ret = ZPP_Vec2.zpp_pool;
				ZPP_Vec2.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.weak = false;
			ret._immutable = false;
			ret.x = x2;
			ret.y = y2;
			ret1.zpp_inner = ret;
			ret1.zpp_inner.outer = ret1;
		} else {
			if(ret1 != null && ret1.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = ret1.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(x2 != x2 || y2 != y2) {
				throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
			}
			let tmp;
			if(ret1 != null && ret1.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = ret1.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			if(ret1.zpp_inner.x == x2) {
				if(ret1 != null && ret1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = ret1.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				tmp = ret1.zpp_inner.y == y2;
			} else {
				tmp = false;
			}
			if(!tmp) {
				ret1.zpp_inner.x = x2;
				ret1.zpp_inner.y = y2;
				let _this = ret1.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
		}
		ret1.zpp_inner.weak = weak2;
		let x3 = x + width;
		let y3 = y + height;
		let weak3 = weak;
		if(weak3 == null) {
			weak3 = false;
		}
		if(y3 == null) {
			y3 = 0;
		}
		if(x3 == null) {
			x3 = 0;
		}
		if(x3 != x3 || y3 != y3) {
			throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
		}
		let ret2;
		if(ZPP_PubPool.poolVec2 == null) {
			ret2 = new Vec2();
		} else {
			ret2 = ZPP_PubPool.poolVec2;
			ZPP_PubPool.poolVec2 = ret2.zpp_pool;
			ret2.zpp_pool = null;
			ret2.zpp_disp = false;
			if(ret2 == ZPP_PubPool.nextVec2) {
				ZPP_PubPool.nextVec2 = null;
			}
		}
		if(ret2.zpp_inner == null) {
			let ret;
			if(ZPP_Vec2.zpp_pool == null) {
				ret = new ZPP_Vec2();
			} else {
				ret = ZPP_Vec2.zpp_pool;
				ZPP_Vec2.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.weak = false;
			ret._immutable = false;
			ret.x = x3;
			ret.y = y3;
			ret2.zpp_inner = ret;
			ret2.zpp_inner.outer = ret2;
		} else {
			if(ret2 != null && ret2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = ret2.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(x3 != x3 || y3 != y3) {
				throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
			}
			let tmp;
			if(ret2 != null && ret2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = ret2.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			if(ret2.zpp_inner.x == x3) {
				if(ret2 != null && ret2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = ret2.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				tmp = ret2.zpp_inner.y == y3;
			} else {
				tmp = false;
			}
			if(!tmp) {
				ret2.zpp_inner.x = x3;
				ret2.zpp_inner.y = y3;
				let _this = ret2.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
		}
		ret2.zpp_inner.weak = weak3;
		let x4 = x;
		let y4 = y + height;
		let weak4 = weak;
		if(weak4 == null) {
			weak4 = false;
		}
		if(y4 == null) {
			y4 = 0;
		}
		if(x4 == null) {
			x4 = 0;
		}
		if(x4 != x4 || y4 != y4) {
			throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
		}
		let ret3;
		if(ZPP_PubPool.poolVec2 == null) {
			ret3 = new Vec2();
		} else {
			ret3 = ZPP_PubPool.poolVec2;
			ZPP_PubPool.poolVec2 = ret3.zpp_pool;
			ret3.zpp_pool = null;
			ret3.zpp_disp = false;
			if(ret3 == ZPP_PubPool.nextVec2) {
				ZPP_PubPool.nextVec2 = null;
			}
		}
		if(ret3.zpp_inner == null) {
			let ret;
			if(ZPP_Vec2.zpp_pool == null) {
				ret = new ZPP_Vec2();
			} else {
				ret = ZPP_Vec2.zpp_pool;
				ZPP_Vec2.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.weak = false;
			ret._immutable = false;
			ret.x = x4;
			ret.y = y4;
			ret3.zpp_inner = ret;
			ret3.zpp_inner.outer = ret3;
		} else {
			if(ret3 != null && ret3.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = ret3.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(x4 != x4 || y4 != y4) {
				throw haxe_Exception.thrown("Error: Vec2 components cannot be NaN");
			}
			let tmp;
			if(ret3 != null && ret3.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = ret3.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			if(ret3.zpp_inner.x == x4) {
				if(ret3 != null && ret3.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = ret3.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				tmp = ret3.zpp_inner.y == y4;
			} else {
				tmp = false;
			}
			if(!tmp) {
				ret3.zpp_inner.x = x4;
				ret3.zpp_inner.y = y4;
				let _this = ret3.zpp_inner;
				if(_this._invalidate != null) {
					_this._invalidate(_this);
				}
			}
		}
		ret3.zpp_inner.weak = weak4;
		return [ret,ret1,ret2,ret3];
	}
	static box(width,height,weak) {
		if(weak == null) {
			weak = false;
		}
		if(width != width || height != height) {
			throw haxe_Exception.thrown("Error: Polygon.box cannot accept NaN arguments");
		}
		return Polygon.rect(-width / 2,-height / 2,width,height,weak);
	}
	static regular(xRadius,yRadius,edgeCount,angleOffset,weak) {
		if(weak == null) {
			weak = false;
		}
		if(angleOffset == null) {
			angleOffset = 0.0;
		}
		if(xRadius != xRadius || yRadius != yRadius || angleOffset != angleOffset) {
			throw haxe_Exception.thrown("Error: Polygon.regular cannot accept NaN arguments");
		}
		let ret = [];
		let dangle = Math.PI * 2 / edgeCount;
		let _g = 0;
		let _g1 = edgeCount;
		while(_g < _g1) {
			let i = _g++;
			let ang = i * dangle + angleOffset;
			let x = Math.cos(ang) * xRadius;
			let y = Math.sin(ang) * yRadius;
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
			let ret1;
			if(ZPP_PubPool.poolVec2 == null) {
				ret1 = new Vec2();
			} else {
				ret1 = ZPP_PubPool.poolVec2;
				ZPP_PubPool.poolVec2 = ret1.zpp_pool;
				ret1.zpp_pool = null;
				ret1.zpp_disp = false;
				if(ret1 == ZPP_PubPool.nextVec2) {
					ZPP_PubPool.nextVec2 = null;
				}
			}
			if(ret1.zpp_inner == null) {
				let ret;
				if(ZPP_Vec2.zpp_pool == null) {
					ret = new ZPP_Vec2();
				} else {
					ret = ZPP_Vec2.zpp_pool;
					ZPP_Vec2.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.weak = false;
				ret._immutable = false;
				ret.x = x;
				ret.y = y;
				ret1.zpp_inner = ret;
				ret1.zpp_inner.outer = ret1;
			} else {
				if(ret1 != null && ret1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = ret1.zpp_inner;
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
				if(ret1 != null && ret1.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = ret1.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				if(ret1.zpp_inner.x == x) {
					if(ret1 != null && ret1.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this = ret1.zpp_inner;
					if(_this._validate != null) {
						_this._validate();
					}
					tmp = ret1.zpp_inner.y == y;
				} else {
					tmp = false;
				}
				if(!tmp) {
					ret1.zpp_inner.x = x;
					ret1.zpp_inner.y = y;
					let _this = ret1.zpp_inner;
					if(_this._invalidate != null) {
						_this._invalidate(_this);
					}
				}
			}
			ret1.zpp_inner.weak = weak1;
			let x1 = ret1;
			ret.push(x1);
		}
		return ret;
	}
}
