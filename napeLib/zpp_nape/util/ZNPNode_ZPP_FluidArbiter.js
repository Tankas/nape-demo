export default class ZNPNode_ZPP_FluidArbiter {
	constructor() {
		this.elt = null;
		this.next = null;
	}
	alloc() {
	}
	free() {
		this.elt = null;
	}
	elem() {
		return this.elt;
	}
}
ZNPNode_ZPP_FluidArbiter.zpp_pool = null;
