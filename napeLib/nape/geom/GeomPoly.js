import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZNPList_ZPP_GeomVert from '../../zpp_nape/util/ZNPList_ZPP_GeomVert.js';
import ZNPList_ZPP_PartitionedPoly from '../../zpp_nape/util/ZNPList_ZPP_PartitionedPoly.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import ZPP_Triangular from '../../zpp_nape/geom/ZPP_Triangular.js';
import ZPP_Simplify from '../../zpp_nape/geom/ZPP_Simplify.js';
import ZPP_Simple from '../../zpp_nape/geom/ZPP_Simple.js';
import ZPP_PartitionedPoly from '../../zpp_nape/geom/ZPP_PartitionedPoly.js';
import ZPP_Monotone from '../../zpp_nape/geom/ZPP_Monotone.js';
import ZPP_GeomVertexIterator from '../../zpp_nape/geom/ZPP_GeomVertexIterator.js';
import ZPP_GeomPoly from '../../zpp_nape/geom/ZPP_GeomPoly.js';
import ZPP_GeomVert from '../../zpp_nape/geom/ZPP_GeomVert.js';
import ZPP_Cutter from '../../zpp_nape/geom/ZPP_Cutter.js';
import ZPP_Convex from '../../zpp_nape/geom/ZPP_Convex.js';
import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
import Winding from './Winding.js';
import Vec2List from './Vec2List.js';
import Vec2Iterator from './Vec2Iterator.js';
import Vec2 from './Vec2.js';
import GeomPolyList from './GeomPolyList.js';
import Geom from './Geom.js';
import AABB from './AABB.js';
import Config from '../Config.js';
export default class GeomPoly {
	constructor(vertices) {
		this.zpp_inner = null;
		this.zpp_pool = null;
		this.zpp_inner = new ZPP_GeomPoly(this);
		if(vertices != null) {
			if(((vertices) instanceof Array)) {
				let lv = vertices;
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
					let v = vite;
					if(v != null && v.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					if(v != null && v.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this = v.zpp_inner;
					if(_this._validate != null) {
						_this._validate();
					}
					let x = v.zpp_inner.x;
					if(v != null && v.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this1 = v.zpp_inner;
					if(_this1._validate != null) {
						_this1._validate();
					}
					let y = v.zpp_inner.y;
					let ret;
					if(ZPP_GeomVert.zpp_pool == null) {
						ret = new ZPP_GeomVert();
					} else {
						ret = ZPP_GeomVert.zpp_pool;
						ZPP_GeomVert.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.forced = false;
					ret.x = x;
					ret.y = y;
					let obj = ret;
					if(this.zpp_inner.vertices == null) {
						this.zpp_inner.vertices = obj.prev = obj.next = obj;
					} else {
						obj.prev = this.zpp_inner.vertices;
						obj.next = this.zpp_inner.vertices.next;
						this.zpp_inner.vertices.next.prev = obj;
						this.zpp_inner.vertices.next = obj;
					}
					this.zpp_inner.vertices = obj;
				}
			} else if(((vertices) instanceof Vec2List)) {
				let lv = vertices;
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
					let v = _g.zpp_inner.at(_g.zpp_i++);
					if(v == null) {
						throw haxe_Exception.thrown("Error: Vec2List contains null objects");
					}
					if(v != null && v.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					if(v != null && v.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this = v.zpp_inner;
					if(_this._validate != null) {
						_this._validate();
					}
					let x = v.zpp_inner.x;
					if(v != null && v.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this1 = v.zpp_inner;
					if(_this1._validate != null) {
						_this1._validate();
					}
					let y = v.zpp_inner.y;
					let ret;
					if(ZPP_GeomVert.zpp_pool == null) {
						ret = new ZPP_GeomVert();
					} else {
						ret = ZPP_GeomVert.zpp_pool;
						ZPP_GeomVert.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.forced = false;
					ret.x = x;
					ret.y = y;
					let obj = ret;
					if(this.zpp_inner.vertices == null) {
						this.zpp_inner.vertices = obj.prev = obj.next = obj;
					} else {
						obj.prev = this.zpp_inner.vertices;
						obj.next = this.zpp_inner.vertices.next;
						this.zpp_inner.vertices.next.prev = obj;
						this.zpp_inner.vertices.next = obj;
					}
					this.zpp_inner.vertices = obj;
				}
			} else if(((vertices) instanceof GeomPoly)) {
				let lv = vertices;
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
						let v = ret;
						vite = vite.next;
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = v.zpp_inner;
						if(_this._validate != null) {
							_this._validate();
						}
						let x1 = v.zpp_inner.x;
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = v.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						let y1 = v.zpp_inner.y;
						let ret1;
						if(ZPP_GeomVert.zpp_pool == null) {
							ret1 = new ZPP_GeomVert();
						} else {
							ret1 = ZPP_GeomVert.zpp_pool;
							ZPP_GeomVert.zpp_pool = ret1.next;
							ret1.next = null;
						}
						ret1.forced = false;
						ret1.x = x1;
						ret1.y = y1;
						let obj = ret1;
						if(this.zpp_inner.vertices == null) {
							this.zpp_inner.vertices = obj.prev = obj.next = obj;
						} else {
							obj.prev = this.zpp_inner.vertices;
							obj.next = this.zpp_inner.vertices.next;
							this.zpp_inner.vertices.next.prev = obj;
							this.zpp_inner.vertices.next = obj;
						}
						this.zpp_inner.vertices = obj;
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this2 = v.zpp_inner;
						if(_this2._immutable) {
							throw haxe_Exception.thrown("Error: Vec2 is immutable");
						}
						if(_this2._isimmutable != null) {
							_this2._isimmutable();
						}
						if(v.zpp_inner._inuse) {
							throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
						}
						let inner = v.zpp_inner;
						v.zpp_inner.outer = null;
						v.zpp_inner = null;
						let o = v;
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
			this.skipForward(1);
			if(((vertices) instanceof Array)) {
				let lv = vertices;
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
			} else if(((vertices) instanceof Vec2List)) {
				let lv = vertices;
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
		}
	}
	empty() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		return this.zpp_inner.vertices == null;
	}
	size() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		let ret = 0;
		let F = this.zpp_inner.vertices;
		let L = this.zpp_inner.vertices;
		if(F != null) {
			let nite = F;
			while(true) {
				let i = nite;
				++ret;
				nite = nite.next;
				if(!(nite != L)) {
					break;
				}
			}
		}
		return ret;
	}
	iterator() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		return ZPP_GeomVertexIterator.get(this.zpp_inner.vertices,true);
	}
	forwardIterator() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		return ZPP_GeomVertexIterator.get(this.zpp_inner.vertices,true);
	}
	backwardsIterator() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		return ZPP_GeomVertexIterator.get(this.zpp_inner.vertices,false);
	}
	current() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.vertices == null) {
			throw haxe_Exception.thrown("Error: GeomPoly is empty");
		}
		let _this = this.zpp_inner.vertices;
		if(_this.wrap == null) {
			let x = _this.x;
			let y = _this.y;
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
			_this.wrap = ret;
			_this.wrap.zpp_inner._inuse = true;
			_this.wrap.zpp_inner._invalidate = $bind(_this,_this.modwrap);
			_this.wrap.zpp_inner._validate = $bind(_this,_this.getwrap);
		}
		return _this.wrap;
	}
	push(vertex) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(vertex != null && vertex.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(vertex == null) {
			throw haxe_Exception.thrown("Error: Cannot push null vertex");
		}
		if(vertex != null && vertex.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = vertex.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let x = vertex.zpp_inner.x;
		if(vertex != null && vertex.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = vertex.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let y = vertex.zpp_inner.y;
		let ret;
		if(ZPP_GeomVert.zpp_pool == null) {
			ret = new ZPP_GeomVert();
		} else {
			ret = ZPP_GeomVert.zpp_pool;
			ZPP_GeomVert.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.forced = false;
		ret.x = x;
		ret.y = y;
		let obj = ret;
		if(this.zpp_inner.vertices == null) {
			this.zpp_inner.vertices = obj.prev = obj.next = obj;
		} else {
			obj.prev = this.zpp_inner.vertices;
			obj.next = this.zpp_inner.vertices.next;
			this.zpp_inner.vertices.next.prev = obj;
			this.zpp_inner.vertices.next = obj;
		}
		this.zpp_inner.vertices = obj;
		if(vertex.zpp_inner.weak) {
			if(vertex != null && vertex.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = vertex.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(vertex.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = vertex.zpp_inner;
			vertex.zpp_inner.outer = null;
			vertex.zpp_inner = null;
			let o = vertex;
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
	pop() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.vertices == null) {
			throw haxe_Exception.thrown("Error: Cannot pop from empty polygon");
		}
		let retv = this.zpp_inner.vertices;
		let tmp;
		if(this.zpp_inner.vertices != null && this.zpp_inner.vertices.prev == this.zpp_inner.vertices) {
			this.zpp_inner.vertices.next = this.zpp_inner.vertices.prev = null;
			tmp = null;
		} else {
			let retnodes = this.zpp_inner.vertices.prev;
			this.zpp_inner.vertices.prev.next = this.zpp_inner.vertices.next;
			this.zpp_inner.vertices.next.prev = this.zpp_inner.vertices.prev;
			this.zpp_inner.vertices.next = this.zpp_inner.vertices.prev = null;
			this.zpp_inner.vertices = null;
			tmp = retnodes;
		}
		this.zpp_inner.vertices = tmp;
		let o = retv;
		if(o.wrap != null) {
			o.wrap.zpp_inner._inuse = false;
			let _this = o.wrap;
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
			let o1 = _this;
			o1.zpp_pool = null;
			if(ZPP_PubPool.nextVec2 != null) {
				ZPP_PubPool.nextVec2.zpp_pool = o1;
			} else {
				ZPP_PubPool.poolVec2 = o1;
			}
			ZPP_PubPool.nextVec2 = o1;
			o1.zpp_disp = true;
			let o2 = inner;
			if(o2.outer != null) {
				o2.outer.zpp_inner = null;
				o2.outer = null;
			}
			o2._isimmutable = null;
			o2._validate = null;
			o2._invalidate = null;
			o2.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o2;
			o.wrap = null;
		}
		o.prev = o.next = null;
		o.next = ZPP_GeomVert.zpp_pool;
		ZPP_GeomVert.zpp_pool = o;
		return this;
	}
	unshift(vertex) {
		if(vertex != null && vertex.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(vertex == null) {
			throw haxe_Exception.thrown("Error: Cannot unshift null vertex");
		}
		if(vertex != null && vertex.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = vertex.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let x = vertex.zpp_inner.x;
		if(vertex != null && vertex.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = vertex.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let y = vertex.zpp_inner.y;
		let ret;
		if(ZPP_GeomVert.zpp_pool == null) {
			ret = new ZPP_GeomVert();
		} else {
			ret = ZPP_GeomVert.zpp_pool;
			ZPP_GeomVert.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.forced = false;
		ret.x = x;
		ret.y = y;
		let obj = ret;
		if(this.zpp_inner.vertices == null) {
			this.zpp_inner.vertices = obj.prev = obj.next = obj;
		} else {
			obj.next = this.zpp_inner.vertices;
			obj.prev = this.zpp_inner.vertices.prev;
			this.zpp_inner.vertices.prev.next = obj;
			this.zpp_inner.vertices.prev = obj;
		}
		this.zpp_inner.vertices = obj;
		if(vertex.zpp_inner.weak) {
			if(vertex != null && vertex.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = vertex.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(vertex.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = vertex.zpp_inner;
			vertex.zpp_inner.outer = null;
			vertex.zpp_inner = null;
			let o = vertex;
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
	shift() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.vertices == null) {
			throw haxe_Exception.thrown("Error: Cannot shift from empty polygon");
		}
		let retv = this.zpp_inner.vertices;
		let tmp;
		if(this.zpp_inner.vertices != null && this.zpp_inner.vertices.prev == this.zpp_inner.vertices) {
			this.zpp_inner.vertices.next = this.zpp_inner.vertices.prev = null;
			tmp = this.zpp_inner.vertices = null;
		} else {
			let retnodes = this.zpp_inner.vertices.next;
			this.zpp_inner.vertices.prev.next = this.zpp_inner.vertices.next;
			this.zpp_inner.vertices.next.prev = this.zpp_inner.vertices.prev;
			this.zpp_inner.vertices.next = this.zpp_inner.vertices.prev = null;
			this.zpp_inner.vertices = null;
			tmp = retnodes;
		}
		this.zpp_inner.vertices = tmp;
		let o = retv;
		if(o.wrap != null) {
			o.wrap.zpp_inner._inuse = false;
			let _this = o.wrap;
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
			let o1 = _this;
			o1.zpp_pool = null;
			if(ZPP_PubPool.nextVec2 != null) {
				ZPP_PubPool.nextVec2.zpp_pool = o1;
			} else {
				ZPP_PubPool.poolVec2 = o1;
			}
			ZPP_PubPool.nextVec2 = o1;
			o1.zpp_disp = true;
			let o2 = inner;
			if(o2.outer != null) {
				o2.outer.zpp_inner = null;
				o2.outer = null;
			}
			o2._isimmutable = null;
			o2._validate = null;
			o2._invalidate = null;
			o2.next = ZPP_Vec2.zpp_pool;
			ZPP_Vec2.zpp_pool = o2;
			o.wrap = null;
		}
		o.prev = o.next = null;
		o.next = ZPP_GeomVert.zpp_pool;
		ZPP_GeomVert.zpp_pool = o;
		return this;
	}
	skipForward(times) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.vertices != null) {
			if(times > 0) {
				while(times-- > 0) this.zpp_inner.vertices = this.zpp_inner.vertices.next;
			} else if(times < 0) {
				while(times++ < 0) this.zpp_inner.vertices = this.zpp_inner.vertices.prev;
			}
		}
		return this;
	}
	skipBackwards(times) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		return this.skipForward(-times);
	}
	erase(count) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		while(count != 0 && this.zpp_inner.vertices != null) {
			let retv = this.zpp_inner.vertices;
			if(count > 0) {
				let tmp;
				if(this.zpp_inner.vertices != null && this.zpp_inner.vertices.prev == this.zpp_inner.vertices) {
					this.zpp_inner.vertices.next = this.zpp_inner.vertices.prev = null;
					tmp = this.zpp_inner.vertices = null;
				} else {
					let retnodes = this.zpp_inner.vertices.next;
					this.zpp_inner.vertices.prev.next = this.zpp_inner.vertices.next;
					this.zpp_inner.vertices.next.prev = this.zpp_inner.vertices.prev;
					this.zpp_inner.vertices.next = this.zpp_inner.vertices.prev = null;
					this.zpp_inner.vertices = null;
					tmp = retnodes;
				}
				this.zpp_inner.vertices = tmp;
				--count;
			} else if(count < 0) {
				let tmp;
				if(this.zpp_inner.vertices != null && this.zpp_inner.vertices.prev == this.zpp_inner.vertices) {
					this.zpp_inner.vertices.next = this.zpp_inner.vertices.prev = null;
					tmp = null;
				} else {
					let retnodes = this.zpp_inner.vertices.prev;
					this.zpp_inner.vertices.prev.next = this.zpp_inner.vertices.next;
					this.zpp_inner.vertices.next.prev = this.zpp_inner.vertices.prev;
					this.zpp_inner.vertices.next = this.zpp_inner.vertices.prev = null;
					this.zpp_inner.vertices = null;
					tmp = retnodes;
				}
				this.zpp_inner.vertices = tmp;
				++count;
			}
			let o = retv;
			if(o.wrap != null) {
				o.wrap.zpp_inner._inuse = false;
				let _this = o.wrap;
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
				let o1 = _this;
				o1.zpp_pool = null;
				if(ZPP_PubPool.nextVec2 != null) {
					ZPP_PubPool.nextVec2.zpp_pool = o1;
				} else {
					ZPP_PubPool.poolVec2 = o1;
				}
				ZPP_PubPool.nextVec2 = o1;
				o1.zpp_disp = true;
				let o2 = inner;
				if(o2.outer != null) {
					o2.outer.zpp_inner = null;
					o2.outer = null;
				}
				o2._isimmutable = null;
				o2._validate = null;
				o2._invalidate = null;
				o2.next = ZPP_Vec2.zpp_pool;
				ZPP_Vec2.zpp_pool = o2;
				o.wrap = null;
			}
			o.prev = o.next = null;
			o.next = ZPP_GeomVert.zpp_pool;
			ZPP_GeomVert.zpp_pool = o;
		}
		return this;
	}
	clear() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		while(this.zpp_inner.vertices != null) {
			let tmp = this.zpp_inner.vertices;
			let tmp1;
			if(this.zpp_inner.vertices != null && this.zpp_inner.vertices.prev == this.zpp_inner.vertices) {
				this.zpp_inner.vertices.next = this.zpp_inner.vertices.prev = null;
				tmp1 = this.zpp_inner.vertices = null;
			} else {
				let retnodes = this.zpp_inner.vertices.next;
				this.zpp_inner.vertices.prev.next = this.zpp_inner.vertices.next;
				this.zpp_inner.vertices.next.prev = this.zpp_inner.vertices.prev;
				this.zpp_inner.vertices.next = this.zpp_inner.vertices.prev = null;
				this.zpp_inner.vertices = null;
				tmp1 = retnodes;
			}
			this.zpp_inner.vertices = tmp1;
			let o = tmp;
			if(o.wrap != null) {
				o.wrap.zpp_inner._inuse = false;
				let _this = o.wrap;
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
				let o1 = _this;
				o1.zpp_pool = null;
				if(ZPP_PubPool.nextVec2 != null) {
					ZPP_PubPool.nextVec2.zpp_pool = o1;
				} else {
					ZPP_PubPool.poolVec2 = o1;
				}
				ZPP_PubPool.nextVec2 = o1;
				o1.zpp_disp = true;
				let o2 = inner;
				if(o2.outer != null) {
					o2.outer.zpp_inner = null;
					o2.outer = null;
				}
				o2._isimmutable = null;
				o2._validate = null;
				o2._invalidate = null;
				o2.next = ZPP_Vec2.zpp_pool;
				ZPP_Vec2.zpp_pool = o2;
				o.wrap = null;
			}
			o.prev = o.next = null;
			o.next = ZPP_GeomVert.zpp_pool;
			ZPP_GeomVert.zpp_pool = o;
		}
		return this;
	}
	copy() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		let ret = GeomPoly.get();
		let F = this.zpp_inner.vertices;
		let L = this.zpp_inner.vertices;
		if(F != null) {
			let nite = F;
			while(true) {
				let v = nite;
				let x = v.x;
				let y = v.y;
				let ret1;
				if(ZPP_GeomVert.zpp_pool == null) {
					ret1 = new ZPP_GeomVert();
				} else {
					ret1 = ZPP_GeomVert.zpp_pool;
					ZPP_GeomVert.zpp_pool = ret1.next;
					ret1.next = null;
				}
				ret1.forced = false;
				ret1.x = x;
				ret1.y = y;
				let obj = ret1;
				if(ret.zpp_inner.vertices == null) {
					ret.zpp_inner.vertices = obj.prev = obj.next = obj;
				} else {
					obj.prev = ret.zpp_inner.vertices;
					obj.next = ret.zpp_inner.vertices.next;
					ret.zpp_inner.vertices.next.prev = obj;
					ret.zpp_inner.vertices.next = obj;
				}
				ret.zpp_inner.vertices = obj;
				nite = nite.next;
				if(!(nite != L)) {
					break;
				}
			}
		}
		return ret.skipForward(1);
	}
	dispose() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		this.clear();
		let o = this;
		o.zpp_pool = null;
		if(ZPP_PubPool.nextGeomPoly != null) {
			ZPP_PubPool.nextGeomPoly.zpp_pool = o;
		} else {
			ZPP_PubPool.poolGeomPoly = o;
		}
		ZPP_PubPool.nextGeomPoly = o;
		o.zpp_disp = true;
	}
	toString() {
		let ret = "GeomPoly[";
		let F = this.zpp_inner.vertices;
		let L = this.zpp_inner.vertices;
		if(F != null) {
			let nite = F;
			while(true) {
				let v = nite;
				if(v != this.zpp_inner.vertices) {
					ret += ",";
				}
				ret += "{" + v.x + "," + v.y + "}";
				nite = nite.next;
				if(!(nite != L)) {
					break;
				}
			}
		}
		return ret + "]";
	}
	area() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.vertices == null || this.zpp_inner.vertices.next == null || this.zpp_inner.vertices.prev == this.zpp_inner.vertices.next) {
			return 0.0;
		} else {
			let area = 0.0;
			let F = this.zpp_inner.vertices;
			let L = this.zpp_inner.vertices;
			if(F != null) {
				let nite = F;
				while(true) {
					let v = nite;
					area += v.x * (v.next.y - v.prev.y);
					nite = nite.next;
					if(!(nite != L)) {
						break;
					}
				}
			}
			let ret = area * 0.5;
			if(ret < 0) {
				return -ret;
			} else {
				return ret;
			}
		}
	}
	winding() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.vertices == null || this.zpp_inner.vertices.next == null || this.zpp_inner.vertices.prev == this.zpp_inner.vertices.next) {
			if(ZPP_Flags.Winding_UNDEFINED == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.Winding_UNDEFINED = new Winding();
				ZPP_Flags.internal = false;
			}
			return ZPP_Flags.Winding_UNDEFINED;
		} else {
			let area = 0.0;
			let F = this.zpp_inner.vertices;
			let L = this.zpp_inner.vertices;
			if(F != null) {
				let nite = F;
				while(true) {
					let v = nite;
					area += v.x * (v.next.y - v.prev.y);
					nite = nite.next;
					if(!(nite != L)) {
						break;
					}
				}
			}
			let area1 = area * 0.5;
			if(area1 > 0) {
				if(ZPP_Flags.Winding_CLOCKWISE == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.Winding_CLOCKWISE = new Winding();
					ZPP_Flags.internal = false;
				}
				return ZPP_Flags.Winding_CLOCKWISE;
			} else if(area1 == 0) {
				if(ZPP_Flags.Winding_UNDEFINED == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.Winding_UNDEFINED = new Winding();
					ZPP_Flags.internal = false;
				}
				return ZPP_Flags.Winding_UNDEFINED;
			} else {
				if(ZPP_Flags.Winding_ANTICLOCKWISE == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.Winding_ANTICLOCKWISE = new Winding();
					ZPP_Flags.internal = false;
				}
				return ZPP_Flags.Winding_ANTICLOCKWISE;
			}
		}
	}
	contains(point) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(point != null && point.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(point == null) {
			throw haxe_Exception.thrown("Error: GeomPoly::contains point cannot be null");
		}
		if(point != null && point.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = point.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		let x = point.zpp_inner.x;
		if(point != null && point.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this1 = point.zpp_inner;
		if(_this1._validate != null) {
			_this1._validate();
		}
		let y = point.zpp_inner.y;
		let ret = false;
		let F = this.zpp_inner.vertices;
		let L = this.zpp_inner.vertices;
		if(F != null) {
			let nite = F;
			while(true) {
				let p = nite;
				let q = p.prev;
				if((p.y < y && q.y >= y || q.y < y && p.y >= y) && (p.x <= x || q.x <= x)) {
					if(p.x + (y - p.y) / (q.y - p.y) * (q.x - p.x) < x) {
						ret = !ret;
					}
				}
				nite = nite.next;
				if(!(nite != L)) {
					break;
				}
			}
		}
		let ret1 = ret;
		if(point.zpp_inner.weak) {
			if(point != null && point.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = point.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(point.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = point.zpp_inner;
			point.zpp_inner.outer = null;
			point.zpp_inner = null;
			let o = point;
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
		return ret1;
	}
	isClockwise() {
		let tmp = this.winding();
		if(ZPP_Flags.Winding_CLOCKWISE == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.Winding_CLOCKWISE = new Winding();
			ZPP_Flags.internal = false;
		}
		return tmp == ZPP_Flags.Winding_CLOCKWISE;
	}
	isConvex() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.vertices == null || this.zpp_inner.vertices.next == null || this.zpp_inner.vertices.prev == this.zpp_inner.vertices.next) {
			return true;
		} else {
			let neg = false;
			let pos = false;
			let ret = true;
			let F = this.zpp_inner.vertices;
			let L = this.zpp_inner.vertices;
			if(F != null) {
				let nite = F;
				while(true) {
					let v = nite;
					let u = v.prev;
					let w = v.next;
					let ax = 0.0;
					let ay = 0.0;
					ax = w.x - v.x;
					ay = w.y - v.y;
					let bx = 0.0;
					let by = 0.0;
					bx = v.x - u.x;
					by = v.y - u.y;
					let dot = by * ax - bx * ay;
					if(dot > 0.0) {
						pos = true;
					} else if(dot < 0.0) {
						neg = true;
					}
					if(pos && neg) {
						ret = false;
						break;
					}
					nite = nite.next;
					if(!(nite != L)) {
						break;
					}
				}
			}
			return ret;
		}
	}
	isSimple() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.vertices == null || this.zpp_inner.vertices.next == null || this.zpp_inner.vertices.prev == this.zpp_inner.vertices.next) {
			return true;
		} else {
			return ZPP_Simple.isSimple(this.zpp_inner.vertices);
		}
	}
	isMonotone() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.vertices == null || this.zpp_inner.vertices.next == null || this.zpp_inner.vertices.prev == this.zpp_inner.vertices.next) {
			return true;
		} else {
			return ZPP_Monotone.isMonotone(this.zpp_inner.vertices);
		}
	}
	isDegenerate() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.vertices == null || this.zpp_inner.vertices.next == null || this.zpp_inner.vertices.prev == this.zpp_inner.vertices.next) {
			return true;
		} else {
			return this.area() < Config.epsilon;
		}
	}
	simplify(epsilon) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(epsilon <= 0.0) {
			throw haxe_Exception.thrown("Error: Epsilon should be > 0 for simplifying a GeomPoly");
		}
		if(this.zpp_inner.vertices == null || this.zpp_inner.vertices.next == null || this.zpp_inner.vertices.prev == this.zpp_inner.vertices.next) {
			return this.copy();
		} else {
			let x = ZPP_Simplify.simplify(this.zpp_inner.vertices,epsilon);
			let ret = GeomPoly.get();
			ret.zpp_inner.vertices = x;
			return ret;
		}
	}
	simpleDecomposition(output) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.vertices == null || this.zpp_inner.vertices.next == null || this.zpp_inner.vertices.prev == this.zpp_inner.vertices.next) {
			throw haxe_Exception.thrown("Error: Cannot decompose a degenerate polygon");
		}
		let MPs = this.zpp_inner.vertices;
		if(ZPP_PartitionedPoly.sharedGVList == null) {
			ZPP_PartitionedPoly.sharedGVList = new ZNPList_ZPP_GeomVert();
		}
		let MPs1 = ZPP_Simple.decompose(MPs,ZPP_PartitionedPoly.sharedGVList);
		let ret = output == null ? new GeomPolyList() : output;
		while(MPs1.head != null) {
			let MP = MPs1.pop_unsafe();
			let x = GeomPoly.get();
			x.zpp_inner.vertices = MP;
			if(ret.zpp_inner.reverse_flag) {
				ret.push(x);
			} else {
				ret.unshift(x);
			}
		}
		return ret;
	}
	monotoneDecomposition(output) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.vertices == null || this.zpp_inner.vertices.next == null || this.zpp_inner.vertices.prev == this.zpp_inner.vertices.next) {
			throw haxe_Exception.thrown("Error: Cannot decompose a degenerate polygon");
		}
		let poly = this.zpp_inner.vertices;
		if(ZPP_Monotone.sharedPPoly == null) {
			ZPP_Monotone.sharedPPoly = new ZPP_PartitionedPoly();
		}
		let poly1 = ZPP_Monotone.decompose(poly,ZPP_Monotone.sharedPPoly);
		if(ZPP_PartitionedPoly.sharedGVList == null) {
			ZPP_PartitionedPoly.sharedGVList = new ZNPList_ZPP_GeomVert();
		}
		let MPs = poly1.extract(ZPP_PartitionedPoly.sharedGVList);
		let ret = output == null ? new GeomPolyList() : output;
		while(MPs.head != null) {
			let MP = MPs.pop_unsafe();
			let x = GeomPoly.get();
			x.zpp_inner.vertices = MP;
			if(ret.zpp_inner.reverse_flag) {
				ret.push(x);
			} else {
				ret.unshift(x);
			}
		}
		return ret;
	}
	convexDecomposition(delaunay,output) {
		if(delaunay == null) {
			delaunay = false;
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.vertices == null || this.zpp_inner.vertices.next == null || this.zpp_inner.vertices.prev == this.zpp_inner.vertices.next) {
			throw haxe_Exception.thrown("Error: Cannot decompose a degenerate polygon");
		}
		let poly = this.zpp_inner.vertices;
		if(ZPP_Monotone.sharedPPoly == null) {
			ZPP_Monotone.sharedPPoly = new ZPP_PartitionedPoly();
		}
		let poly1 = ZPP_Monotone.decompose(poly,ZPP_Monotone.sharedPPoly);
		if(ZPP_PartitionedPoly.sharedPPList == null) {
			ZPP_PartitionedPoly.sharedPPList = new ZNPList_ZPP_PartitionedPoly();
		}
		let MPs = poly1.extract_partitions(ZPP_PartitionedPoly.sharedPPList);
		let ret = output == null ? new GeomPolyList() : output;
		while(MPs.head != null) {
			let MP = MPs.pop_unsafe();
			ZPP_Triangular.triangulate(MP);
			if(delaunay) {
				ZPP_Triangular.optimise(MP);
			}
			ZPP_Convex.optimise(MP);
			if(ZPP_PartitionedPoly.sharedGVList == null) {
				ZPP_PartitionedPoly.sharedGVList = new ZNPList_ZPP_GeomVert();
			}
			let MQs = MP.extract(ZPP_PartitionedPoly.sharedGVList);
			let o = MP;
			o.next = ZPP_PartitionedPoly.zpp_pool;
			ZPP_PartitionedPoly.zpp_pool = o;
			while(MQs.head != null) {
				let MQ = MQs.pop_unsafe();
				let x = GeomPoly.get();
				x.zpp_inner.vertices = MQ;
				if(ret.zpp_inner.reverse_flag) {
					ret.push(x);
				} else {
					ret.unshift(x);
				}
			}
		}
		return ret;
	}
	triangularDecomposition(delaunay,output) {
		if(delaunay == null) {
			delaunay = false;
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.vertices == null || this.zpp_inner.vertices.next == null || this.zpp_inner.vertices.prev == this.zpp_inner.vertices.next) {
			throw haxe_Exception.thrown("Error: Cannot decompose a degenerate polygon");
		}
		let poly = this.zpp_inner.vertices;
		if(ZPP_Monotone.sharedPPoly == null) {
			ZPP_Monotone.sharedPPoly = new ZPP_PartitionedPoly();
		}
		let poly1 = ZPP_Monotone.decompose(poly,ZPP_Monotone.sharedPPoly);
		if(ZPP_PartitionedPoly.sharedPPList == null) {
			ZPP_PartitionedPoly.sharedPPList = new ZNPList_ZPP_PartitionedPoly();
		}
		let MPs = poly1.extract_partitions(ZPP_PartitionedPoly.sharedPPList);
		let ret = output == null ? new GeomPolyList() : output;
		while(MPs.head != null) {
			let MP = MPs.pop_unsafe();
			ZPP_Triangular.triangulate(MP);
			if(delaunay) {
				ZPP_Triangular.optimise(MP);
			}
			if(ZPP_PartitionedPoly.sharedGVList == null) {
				ZPP_PartitionedPoly.sharedGVList = new ZNPList_ZPP_GeomVert();
			}
			let MQs = MP.extract(ZPP_PartitionedPoly.sharedGVList);
			let o = MP;
			o.next = ZPP_PartitionedPoly.zpp_pool;
			ZPP_PartitionedPoly.zpp_pool = o;
			while(MQs.head != null) {
				let MQ = MQs.pop_unsafe();
				let x = GeomPoly.get();
				x.zpp_inner.vertices = MQ;
				if(ret.zpp_inner.reverse_flag) {
					ret.push(x);
				} else {
					ret.unshift(x);
				}
			}
		}
		return ret;
	}
	inflate(inflation) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		let ret = GeomPoly.get();
		let tmp = this.winding();
		if(ZPP_Flags.Winding_CLOCKWISE == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.Winding_CLOCKWISE = new Winding();
			ZPP_Flags.internal = false;
		}
		if(tmp == ZPP_Flags.Winding_CLOCKWISE) {
			inflation = -inflation;
		}
		let F = this.zpp_inner.vertices;
		let L = this.zpp_inner.vertices;
		if(F != null) {
			let nite = F;
			while(true) {
				let p = nite;
				let prev = p.prev;
				let next = p.next;
				let ax = 0.0;
				let ay = 0.0;
				let bx = 0.0;
				let by = 0.0;
				ax = p.x - prev.x;
				ay = p.y - prev.y;
				bx = next.x - p.x;
				by = next.y - p.y;
				let apx = 0.0;
				let apy = 0.0;
				let bpx = 0.0;
				let bpy = 0.0;
				apx = ax;
				apy = ay;
				let d = apx * apx + apy * apy;
				let imag = 1.0 / Math.sqrt(d);
				let t = imag;
				apx *= t;
				apy *= t;
				let t1 = apx;
				apx = -apy;
				apy = t1;
				let t2 = inflation;
				apx *= t2;
				apy *= t2;
				bpx = bx;
				bpy = by;
				let d1 = bpx * bpx + bpy * bpy;
				let imag1 = 1.0 / Math.sqrt(d1);
				let t3 = imag1;
				bpx *= t3;
				bpy *= t3;
				let t4 = bpx;
				bpx = -bpy;
				bpy = t4;
				let t5 = inflation;
				bpx *= t5;
				bpy *= t5;
				let bapx = 0.0;
				let bapy = 0.0;
				bapx = bpx - apx;
				bapy = bpy - apy;
				let num = by * bapx - bx * bapy;
				let t6 = num == 0 ? 0 : num / (by * ax - bx * ay);
				let px = 0.0;
				let py = 0.0;
				px = p.x + apx;
				py = p.y + apy;
				let t7 = t6;
				px += ax * t7;
				py += ay * t7;
				let x = px;
				let y = py;
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
				ret1.zpp_inner.weak = false;
				ret.push(ret1);
				nite = nite.next;
				if(!(nite != L)) {
					break;
				}
			}
		}
		return ret.skipForward(1);
	}
	cut(start,end,boundedStart,boundedEnd,output) {
		if(boundedEnd == null) {
			boundedEnd = false;
		}
		if(boundedStart == null) {
			boundedStart = false;
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(!(this.zpp_inner.vertices == null || this.zpp_inner.vertices.next == null || this.zpp_inner.vertices.prev == this.zpp_inner.vertices.next ? true : ZPP_Simple.isSimple(this.zpp_inner.vertices))) {
			throw haxe_Exception.thrown("Error: Cut requires a truly simple polygon");
		}
		if(start == null || end == null) {
			throw haxe_Exception.thrown("Error: Cannot cut with null start/end's");
		}
		if(start != null && start.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(end != null && end.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let ret = ZPP_Cutter.run(this.zpp_inner.vertices,start,end,boundedStart,boundedEnd,output);
		if(start.zpp_inner.weak) {
			if(start != null && start.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = start.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(start.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = start.zpp_inner;
			start.zpp_inner.outer = null;
			start.zpp_inner = null;
			let o = start;
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
		if(end.zpp_inner.weak) {
			if(end != null && end.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = end.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(end.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = end.zpp_inner;
			end.zpp_inner.outer = null;
			end.zpp_inner = null;
			let o = end;
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
		return ret;
	}
	transform(matrix) {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(matrix == null) {
			throw haxe_Exception.thrown("Error: Cannot transform by null matrix");
		}
		let F = this.zpp_inner.vertices;
		let L = this.zpp_inner.vertices;
		if(F != null) {
			let nite = F;
			while(true) {
				let v = nite;
				let t = matrix.zpp_inner.a * v.x + matrix.zpp_inner.b * v.y + matrix.zpp_inner.tx;
				v.y = matrix.zpp_inner.c * v.x + matrix.zpp_inner.d * v.y + matrix.zpp_inner.ty;
				v.x = t;
				nite = nite.next;
				if(!(nite != L)) {
					break;
				}
			}
		}
		return this;
	}
	bounds() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.vertices == null) {
			throw haxe_Exception.thrown("Error: empty GeomPoly has no defineable bounds");
		}
		let minx = 1e100;
		let miny = 1e100;
		let maxx = -1e+100;
		let maxy = -1e+100;
		let F = this.zpp_inner.vertices;
		let L = this.zpp_inner.vertices;
		if(F != null) {
			let nite = F;
			while(true) {
				let v = nite;
				if(v.x < minx) {
					minx = v.x;
				}
				if(v.y < miny) {
					miny = v.y;
				}
				if(v.x > maxx) {
					maxx = v.x;
				}
				if(v.y > maxy) {
					maxy = v.y;
				}
				nite = nite.next;
				if(!(nite != L)) {
					break;
				}
			}
		}
		return new AABB(minx,miny,maxx - minx,maxy - miny);
	}
	top() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.vertices == null) {
			throw haxe_Exception.thrown("Error: empty GeomPoly has no defineable topmost vertex");
		}
		let min = this.zpp_inner.vertices;
		let F = this.zpp_inner.vertices.next;
		let L = this.zpp_inner.vertices;
		if(F != null) {
			let nite = F;
			while(true) {
				let v = nite;
				if(v.y < min.y) {
					min = v;
				}
				nite = nite.next;
				if(!(nite != L)) {
					break;
				}
			}
		}
		if(min.wrap == null) {
			let x = min.x;
			let y = min.y;
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
			min.wrap = ret;
			min.wrap.zpp_inner._inuse = true;
			min.wrap.zpp_inner._invalidate = $bind(min,min.modwrap);
			min.wrap.zpp_inner._validate = $bind(min,min.getwrap);
		}
		return min.wrap;
	}
	bottom() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.vertices == null) {
			throw haxe_Exception.thrown("Error: empty GeomPoly has no defineable bottommost vertex");
		}
		let max = this.zpp_inner.vertices;
		let F = this.zpp_inner.vertices.next;
		let L = this.zpp_inner.vertices;
		if(F != null) {
			let nite = F;
			while(true) {
				let v = nite;
				if(v.y > max.y) {
					max = v;
				}
				nite = nite.next;
				if(!(nite != L)) {
					break;
				}
			}
		}
		if(max.wrap == null) {
			let x = max.x;
			let y = max.y;
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
			max.wrap = ret;
			max.wrap.zpp_inner._inuse = true;
			max.wrap.zpp_inner._invalidate = $bind(max,max.modwrap);
			max.wrap.zpp_inner._validate = $bind(max,max.getwrap);
		}
		return max.wrap;
	}
	left() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.vertices == null) {
			throw haxe_Exception.thrown("Error: empty GeomPoly has no defineable leftmost vertex");
		}
		let min = this.zpp_inner.vertices;
		let F = this.zpp_inner.vertices.next;
		let L = this.zpp_inner.vertices;
		if(F != null) {
			let nite = F;
			while(true) {
				let v = nite;
				if(v.x < min.x) {
					min = v;
				}
				nite = nite.next;
				if(!(nite != L)) {
					break;
				}
			}
		}
		if(min.wrap == null) {
			let x = min.x;
			let y = min.y;
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
			min.wrap = ret;
			min.wrap.zpp_inner._inuse = true;
			min.wrap.zpp_inner._invalidate = $bind(min,min.modwrap);
			min.wrap.zpp_inner._validate = $bind(min,min.getwrap);
		}
		return min.wrap;
	}
	right() {
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "GeomPoly" + " has been disposed and cannot be used!");
		}
		if(this.zpp_inner.vertices == null) {
			throw haxe_Exception.thrown("Error: empty GeomPoly has no defineable rightmmost vertex");
		}
		let max = this.zpp_inner.vertices;
		let F = this.zpp_inner.vertices.next;
		let L = this.zpp_inner.vertices;
		if(F != null) {
			let nite = F;
			while(true) {
				let v = nite;
				if(v.x > max.x) {
					max = v;
				}
				nite = nite.next;
				if(!(nite != L)) {
					break;
				}
			}
		}
		if(max.wrap == null) {
			let x = max.x;
			let y = max.y;
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
			max.wrap = ret;
			max.wrap.zpp_inner._inuse = true;
			max.wrap.zpp_inner._invalidate = $bind(max,max.modwrap);
			max.wrap.zpp_inner._validate = $bind(max,max.getwrap);
		}
		return max.wrap;
	}
	static get(vertices) {
		let ret;
		if(ZPP_PubPool.poolGeomPoly == null) {
			ret = new GeomPoly();
		} else {
			ret = ZPP_PubPool.poolGeomPoly;
			ZPP_PubPool.poolGeomPoly = ret.zpp_pool;
			ret.zpp_pool = null;
			ret.zpp_disp = false;
			if(ret == ZPP_PubPool.nextGeomPoly) {
				ZPP_PubPool.nextGeomPoly = null;
			}
		}
		if(vertices != null) {
			if(((vertices) instanceof Array)) {
				let lv = vertices;
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
					let v = vite;
					if(v != null && v.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					if(v != null && v.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this = v.zpp_inner;
					if(_this._validate != null) {
						_this._validate();
					}
					let x = v.zpp_inner.x;
					if(v != null && v.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this1 = v.zpp_inner;
					if(_this1._validate != null) {
						_this1._validate();
					}
					let y = v.zpp_inner.y;
					let ret1;
					if(ZPP_GeomVert.zpp_pool == null) {
						ret1 = new ZPP_GeomVert();
					} else {
						ret1 = ZPP_GeomVert.zpp_pool;
						ZPP_GeomVert.zpp_pool = ret1.next;
						ret1.next = null;
					}
					ret1.forced = false;
					ret1.x = x;
					ret1.y = y;
					let obj = ret1;
					if(ret.zpp_inner.vertices == null) {
						ret.zpp_inner.vertices = obj.prev = obj.next = obj;
					} else {
						obj.prev = ret.zpp_inner.vertices;
						obj.next = ret.zpp_inner.vertices.next;
						ret.zpp_inner.vertices.next.prev = obj;
						ret.zpp_inner.vertices.next = obj;
					}
					ret.zpp_inner.vertices = obj;
				}
			} else if(((vertices) instanceof Vec2List)) {
				let lv = vertices;
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
					let v = _g.zpp_inner.at(_g.zpp_i++);
					if(v == null) {
						throw haxe_Exception.thrown("Error: Vec2List contains null objects");
					}
					if(v != null && v.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					if(v != null && v.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this = v.zpp_inner;
					if(_this._validate != null) {
						_this._validate();
					}
					let x = v.zpp_inner.x;
					if(v != null && v.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this1 = v.zpp_inner;
					if(_this1._validate != null) {
						_this1._validate();
					}
					let y = v.zpp_inner.y;
					let ret1;
					if(ZPP_GeomVert.zpp_pool == null) {
						ret1 = new ZPP_GeomVert();
					} else {
						ret1 = ZPP_GeomVert.zpp_pool;
						ZPP_GeomVert.zpp_pool = ret1.next;
						ret1.next = null;
					}
					ret1.forced = false;
					ret1.x = x;
					ret1.y = y;
					let obj = ret1;
					if(ret.zpp_inner.vertices == null) {
						ret.zpp_inner.vertices = obj.prev = obj.next = obj;
					} else {
						obj.prev = ret.zpp_inner.vertices;
						obj.next = ret.zpp_inner.vertices.next;
						ret.zpp_inner.vertices.next.prev = obj;
						ret.zpp_inner.vertices.next = obj;
					}
					ret.zpp_inner.vertices = obj;
				}
			} else if(((vertices) instanceof GeomPoly)) {
				let lv = vertices;
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
						ret1.zpp_inner.weak = false;
						let v = ret1;
						vite = vite.next;
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = v.zpp_inner;
						if(_this._validate != null) {
							_this._validate();
						}
						let x1 = v.zpp_inner.x;
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = v.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						let y1 = v.zpp_inner.y;
						let ret2;
						if(ZPP_GeomVert.zpp_pool == null) {
							ret2 = new ZPP_GeomVert();
						} else {
							ret2 = ZPP_GeomVert.zpp_pool;
							ZPP_GeomVert.zpp_pool = ret2.next;
							ret2.next = null;
						}
						ret2.forced = false;
						ret2.x = x1;
						ret2.y = y1;
						let obj = ret2;
						if(ret.zpp_inner.vertices == null) {
							ret.zpp_inner.vertices = obj.prev = obj.next = obj;
						} else {
							obj.prev = ret.zpp_inner.vertices;
							obj.next = ret.zpp_inner.vertices.next;
							ret.zpp_inner.vertices.next.prev = obj;
							ret.zpp_inner.vertices.next = obj;
						}
						ret.zpp_inner.vertices = obj;
						if(v != null && v.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this2 = v.zpp_inner;
						if(_this2._immutable) {
							throw haxe_Exception.thrown("Error: Vec2 is immutable");
						}
						if(_this2._isimmutable != null) {
							_this2._isimmutable();
						}
						if(v.zpp_inner._inuse) {
							throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
						}
						let inner = v.zpp_inner;
						v.zpp_inner.outer = null;
						v.zpp_inner = null;
						let o = v;
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
						if(!(vite != verts)) {
							break;
						}
					}
				}
			} else {
				throw haxe_Exception.thrown("Error: Invalid type for polygon object, should be Array<Vec2>, Vec2List, GeomPoly or for flash10+ flash.Vector<Vec2>");
			}
			ret.skipForward(1);
			if(((vertices) instanceof Array)) {
				let lv = vertices;
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
			} else if(((vertices) instanceof Vec2List)) {
				let lv = vertices;
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
		}
		return ret;
	}
}
