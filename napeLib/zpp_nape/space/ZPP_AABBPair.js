export default class ZPP_AABBPair {
	constructor() {
		this.next = null;
		this.arb = null;
		this.di = 0;
		this.id = 0;
		this.sleeping = false;
		this.first = false;
		this.n2 = null;
		this.n1 = null;
	}
	alloc() {
	}
	free() {
		this.n1 = this.n2 = null;
		this.sleeping = false;
	}
}
ZPP_AABBPair.zpp_pool = null;
