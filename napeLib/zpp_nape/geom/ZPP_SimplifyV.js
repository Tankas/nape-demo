export default class ZPP_SimplifyV {
	constructor() {
		this.forced = false;
		this.flag = false;
		this.prev = null;
		this.next = null;
		this.y = 0.0;
		this.x = 0.0;
	}
	free() {
	}
	alloc() {
	}
	static get(v) {
		let ret;
		if(ZPP_SimplifyV.zpp_pool == null) {
			ret = new ZPP_SimplifyV();
		} else {
			ret = ZPP_SimplifyV.zpp_pool;
			ZPP_SimplifyV.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.x = v.x;
		ret.y = v.y;
		ret.flag = false;
		return ret;
	}
}
ZPP_SimplifyV.zpp_pool = null;
