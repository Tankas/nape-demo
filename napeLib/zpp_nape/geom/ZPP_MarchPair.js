export default class ZPP_MarchPair {
	constructor() {
		this.next = null;
		this.spanr = null;
		this.span2 = null;
		this.span1 = null;
		this.pd = null;
		this.okeyr = 0;
		this.keyr = 0;
		this.pr = null;
		this.okey2 = 0;
		this.key2 = 0;
		this.p2 = null;
		this.okey1 = 0;
		this.key1 = 0;
		this.p1 = null;
	}
	free() {
		this.p1 = this.p2 = this.pr = this.pd = null;
		this.span1 = this.span2 = this.spanr = null;
	}
	alloc() {
	}
}
ZPP_MarchPair.zpp_pool = null;
