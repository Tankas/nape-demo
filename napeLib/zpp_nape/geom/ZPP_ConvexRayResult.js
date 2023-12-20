import ZPP_PubPool from '../util/ZPP_PubPool.js';
import ZPP_Vec2 from './ZPP_Vec2.js';
import RayResult from '../../nape/geom/RayResult.js';
import ConvexResult from '../../nape/geom/ConvexResult.js';
export default class ZPP_ConvexRayResult {
	constructor() {
		this.toiDistance = 0.0;
		this.next = null;
		this.inner = false;
		this.ray = null;
		this.position = null;
		this.convex = null;
		this.shape = null;
		this.normal = null;
	}
	disposed() {
		if(this.next != null) {
			throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
		}
	}
	free() {
		this.normal.zpp_inner._immutable = false;
		let _this = this.normal;
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
		if(this.position != null) {
			this.position.zpp_inner._immutable = false;
			let _this = this.position;
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
		this.shape = null;
		this.toiDistance = 0.0;
		if(this.convex != null) {
			this.next = ZPP_ConvexRayResult.convexPool;
			ZPP_ConvexRayResult.convexPool = this;
		} else {
			this.next = ZPP_ConvexRayResult.rayPool;
			ZPP_ConvexRayResult.rayPool = this;
		}
	}
	static getRay(normal,time,inner,shape) {
		let ret;
		if(ZPP_ConvexRayResult.rayPool == null) {
			ZPP_ConvexRayResult.internal = true;
			ret = new RayResult();
			ret.zpp_inner = new ZPP_ConvexRayResult();
			ret.zpp_inner.ray = ret;
			ZPP_ConvexRayResult.internal = false;
		} else {
			ret = ZPP_ConvexRayResult.rayPool.ray;
			ZPP_ConvexRayResult.rayPool = ZPP_ConvexRayResult.rayPool.next;
			ret.zpp_inner.next = null;
		}
		let zinner = ret.zpp_inner;
		zinner.normal = normal;
		normal.zpp_inner._immutable = true;
		zinner.toiDistance = time;
		zinner.inner = inner;
		zinner.shape = shape;
		return ret;
	}
	static getConvex(normal,position,toiDistance,shape) {
		let ret;
		if(ZPP_ConvexRayResult.convexPool == null) {
			ZPP_ConvexRayResult.internal = true;
			ret = new ConvexResult();
			ret.zpp_inner = new ZPP_ConvexRayResult();
			ret.zpp_inner.convex = ret;
			ZPP_ConvexRayResult.internal = false;
		} else {
			ret = ZPP_ConvexRayResult.convexPool.convex;
			ZPP_ConvexRayResult.convexPool = ZPP_ConvexRayResult.convexPool.next;
			ret.zpp_inner.next = null;
		}
		let inner = ret.zpp_inner;
		inner.normal = normal;
		inner.position = position;
		normal.zpp_inner._immutable = true;
		position.zpp_inner._immutable = true;
		inner.toiDistance = toiDistance;
		inner.shape = shape;
		return ret;
	}
}
ZPP_ConvexRayResult.convexPool = null;
ZPP_ConvexRayResult.rayPool = null;
ZPP_ConvexRayResult.internal = false;
