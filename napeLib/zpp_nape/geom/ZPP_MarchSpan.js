export default class ZPP_MarchSpan {
	constructor() {
		this.next = null;
		this.out = false;
		this.rank = 0;
		this.parent = null;
		this.parent = this;
	}
	free() {
		this.parent = this;
	}
	alloc() {
		this.out = false;
		this.rank = 0;
	}
}
ZPP_MarchSpan.zpp_pool = null;
