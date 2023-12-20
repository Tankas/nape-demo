export default class ZNPNode_ZPP_SimplifyP {
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
ZNPNode_ZPP_SimplifyP.zpp_pool = null;
