export default class ZPP_SweepData {
	constructor() {
		this.aabb = null;
		this.shape = null;
		this.prev = null;
		this.next = null;
	}
	free() {
		this.prev = null;
		this.shape = null;
		this.aabb = null;
	}
	alloc() {
	}
	gt(x) {
		return this.aabb.minx > x.aabb.minx;
	}
}
ZPP_SweepData.zpp_pool = null;
