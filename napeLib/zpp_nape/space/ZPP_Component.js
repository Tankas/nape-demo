export default class ZPP_Component {
	constructor() {
		this.woken = false;
		this.waket = 0;
		this.sleeping = false;
		this.island = null;
		this.constraint = null;
		this.body = null;
		this.isBody = false;
		this.rank = 0;
		this.parent = null;
		this.next = null;
		this.sleeping = false;
		this.island = null;
		this.parent = this;
		this.rank = 0;
		this.woken = false;
	}
	free() {
		this.body = null;
		this.constraint = null;
	}
	alloc() {
	}
	reset() {
		this.sleeping = false;
		this.island = null;
		this.parent = this;
		this.rank = 0;
	}
}
ZPP_Component.zpp_pool = null;
