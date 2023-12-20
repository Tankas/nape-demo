import ZPP_ConvexRayResult from '../../zpp_nape/geom/ZPP_ConvexRayResult.js';
export default class RayResult {
	constructor() {
		this.zpp_inner = null;
		if(!ZPP_ConvexRayResult.internal) {
			throw haxe_Exception.thrown("Error: RayResult cannot be instantiated derp!");
		}
	}
	get_normal() {
		if(this.zpp_inner.next != null) {
			throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
		}
		return this.zpp_inner.normal;
	}
	get_distance() {
		if(this.zpp_inner.next != null) {
			throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
		}
		return this.zpp_inner.toiDistance;
	}
	get_inner() {
		if(this.zpp_inner.next != null) {
			throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
		}
		return this.zpp_inner.inner;
	}
	get_shape() {
		if(this.zpp_inner.next != null) {
			throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
		}
		return this.zpp_inner.shape;
	}
	dispose() {
		if(this.zpp_inner.next != null) {
			throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
		}
		this.zpp_inner.free();
	}
	toString() {
		if(this.zpp_inner.next != null) {
			throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
		}
		if(this.zpp_inner.next != null) {
			throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
		}
		let tmp = "{ shape: " + Std.string(this.zpp_inner.shape) + " distance: ";
		if(this.zpp_inner.next != null) {
			throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
		}
		let tmp1 = tmp + this.zpp_inner.toiDistance + " ?inner: ";
		if(this.zpp_inner.next != null) {
			throw haxe_Exception.thrown("Error: This object has been disposed of and cannot be used");
		}
		return tmp1 + Std.string(this.zpp_inner.inner) + " }";
	}
}
