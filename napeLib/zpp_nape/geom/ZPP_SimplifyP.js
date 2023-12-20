export default class ZPP_SimplifyP {
	constructor() {
		this.max = null;
		this.min = null;
		this.next = null;
	}
	free() {
		this.min = this.max = null;
	}
	alloc() {
	}
	static get(min,max) {
		let ret;
		if(ZPP_SimplifyP.zpp_pool == null) {
			ret = new ZPP_SimplifyP();
		} else {
			ret = ZPP_SimplifyP.zpp_pool;
			ZPP_SimplifyP.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.min = min;
		ret.max = max;
		return ret;
	}
}
ZPP_SimplifyP.zpp_pool = null;
