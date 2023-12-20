export default class ZPP_CutVert {
	constructor() {
		this.used = false;
		this.rank = 0;
		this.parent = null;
		this.positive = false;
		this.value = 0.0;
		this.vert = null;
		this.posy = 0.0;
		this.posx = 0.0;
		this.next = null;
		this.prev = null;
	}
	alloc() {
	}
	free() {
		this.vert = null;
		this.parent = null;
	}
	static path(poly) {
		let ret;
		if(ZPP_CutVert.zpp_pool == null) {
			ret = new ZPP_CutVert();
		} else {
			ret = ZPP_CutVert.zpp_pool;
			ZPP_CutVert.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.vert = poly;
		ret.parent = ret;
		ret.rank = 0;
		ret.used = false;
		return ret;
	}
}
ZPP_CutVert.zpp_pool = null;
