import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import ZPP_MarchingSquares from '../../zpp_nape/geom/ZPP_MarchingSquares.js';
import GeomPolyList from './GeomPolyList.js';
export default class MarchingSquares {
	static run(iso,bounds,cellsize,quality,subgrid,combine,output) {
		if(combine == null) {
			combine = true;
		}
		if(quality == null) {
			quality = 2;
		}
		if(cellsize != null && cellsize.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(subgrid != null && subgrid.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		if(iso == null) {
			throw haxe_Exception.thrown("Error: MarchingSquares requires an iso function to operate");
		}
		if(bounds == null) {
			throw haxe_Exception.thrown("Error: MarchingSquares requires an AABB to define bounds of surface extraction");
		}
		if(cellsize == null) {
			throw haxe_Exception.thrown("Error: MarchingSquares requires a Vec2 to define cell size for surface extraction");
		}
		let tmp;
		if(cellsize != null && cellsize.zpp_disp) {
			throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
		}
		let _this = cellsize.zpp_inner;
		if(_this._validate != null) {
			_this._validate();
		}
		if(!(cellsize.zpp_inner.x <= 0)) {
			if(cellsize != null && cellsize.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = cellsize.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			tmp = cellsize.zpp_inner.y <= 0;
		} else {
			tmp = true;
		}
		if(tmp) {
			throw haxe_Exception.thrown("Error: MarchingSquares cannot operate with non-positive cell dimensions");
		}
		if(quality < 0) {
			throw haxe_Exception.thrown("Error: MarchingSquares cannot use a negative quality value for interpolation");
		}
		let tmp1;
		if(subgrid != null) {
			if(subgrid != null && subgrid.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = subgrid.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			if(!(subgrid.zpp_inner.x <= 0)) {
				if(subgrid != null && subgrid.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = subgrid.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				tmp1 = subgrid.zpp_inner.y <= 0;
			} else {
				tmp1 = true;
			}
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			throw haxe_Exception.thrown("Error: MarchingSquares cannot with non-positive sub-grid dimensions");
		}
		let ret = output != null ? output : new GeomPolyList();
		if(subgrid == null) {
			let _this = bounds.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let tmp = bounds.zpp_inner.minx;
			let _this1 = bounds.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			let tmp1 = bounds.zpp_inner.miny;
			let _this2 = bounds.zpp_inner.getmax();
			if(_this2 != null && _this2.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this3 = _this2.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			let tmp2 = _this2.zpp_inner.x;
			let _this4 = bounds.zpp_inner.getmax();
			if(_this4 != null && _this4.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this5 = _this4.zpp_inner;
			if(_this5._validate != null) {
				_this5._validate();
			}
			ZPP_MarchingSquares.run(iso,tmp,tmp1,tmp2,_this4.zpp_inner.y,cellsize,quality,combine,ret);
		} else {
			let _this = bounds.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			let _this1 = bounds.zpp_inner;
			let xp = _this1.maxx - _this1.minx;
			if(subgrid != null && subgrid.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this2 = subgrid.zpp_inner;
			if(_this2._validate != null) {
				_this2._validate();
			}
			let xp1 = xp / subgrid.zpp_inner.x;
			let _this3 = bounds.zpp_inner;
			if(_this3._validate != null) {
				_this3._validate();
			}
			let _this4 = bounds.zpp_inner;
			let yp = _this4.maxy - _this4.miny;
			if(subgrid != null && subgrid.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this5 = subgrid.zpp_inner;
			if(_this5._validate != null) {
				_this5._validate();
			}
			let yp1 = yp / subgrid.zpp_inner.y;
			let xn = xp1 | 0;
			let yn = yp1 | 0;
			if(xn != xp1) {
				++xn;
			}
			if(yn != yp1) {
				++yn;
			}
			let _g = 0;
			let _g1 = xn;
			while(_g < _g1) {
				let x = _g++;
				let _this = bounds.zpp_inner;
				if(_this._validate != null) {
					_this._validate();
				}
				let x0 = bounds.zpp_inner.minx;
				if(subgrid != null && subgrid.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = subgrid.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				let x01 = x0 + subgrid.zpp_inner.x * x;
				let x1;
				if(x == xn - 1) {
					let _this = bounds.zpp_inner.getmax();
					if(_this != null && _this.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this1 = _this.zpp_inner;
					if(_this1._validate != null) {
						_this1._validate();
					}
					x1 = _this.zpp_inner.x;
				} else {
					if(subgrid != null && subgrid.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this = subgrid.zpp_inner;
					if(_this._validate != null) {
						_this._validate();
					}
					x1 = x01 + subgrid.zpp_inner.x;
				}
				let _g1 = 0;
				let _g2 = yn;
				while(_g1 < _g2) {
					let y = _g1++;
					let _this = bounds.zpp_inner;
					if(_this._validate != null) {
						_this._validate();
					}
					let y0 = bounds.zpp_inner.miny;
					if(subgrid != null && subgrid.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this1 = subgrid.zpp_inner;
					if(_this1._validate != null) {
						_this1._validate();
					}
					let y01 = y0 + subgrid.zpp_inner.y * y;
					let y1;
					if(y == yn - 1) {
						let _this = bounds.zpp_inner.getmax();
						if(_this != null && _this.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this1 = _this.zpp_inner;
						if(_this1._validate != null) {
							_this1._validate();
						}
						y1 = _this.zpp_inner.y;
					} else {
						if(subgrid != null && subgrid.zpp_disp) {
							throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
						}
						let _this = subgrid.zpp_inner;
						if(_this._validate != null) {
							_this._validate();
						}
						y1 = y01 + subgrid.zpp_inner.y;
					}
					ZPP_MarchingSquares.run(iso,x01,y01,x1,y1,cellsize,quality,combine,ret);
				}
			}
		}
		if(cellsize.zpp_inner.weak) {
			if(cellsize != null && cellsize.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = cellsize.zpp_inner;
			if(_this._immutable) {
				throw haxe_Exception.thrown("Error: Vec2 is immutable");
			}
			if(_this._isimmutable != null) {
				_this._isimmutable();
			}
			if(cellsize.zpp_inner._inuse) {
				throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
			}
			let inner = cellsize.zpp_inner;
			cellsize.zpp_inner.outer = null;
			cellsize.zpp_inner = null;
			let o = cellsize;
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
		if(subgrid != null) {
			if(subgrid.zpp_inner.weak) {
				if(subgrid != null && subgrid.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = subgrid.zpp_inner;
				if(_this._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this._isimmutable != null) {
					_this._isimmutable();
				}
				if(subgrid.zpp_inner._inuse) {
					throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
				}
				let inner = subgrid.zpp_inner;
				subgrid.zpp_inner.outer = null;
				subgrid.zpp_inner = null;
				let o = subgrid;
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
		}
		return ret;
	}
}
