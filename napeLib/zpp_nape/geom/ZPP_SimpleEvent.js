export default class ZPP_SimpleEvent {
	constructor() {
		this.next = null;
		this.node = null;
		this.segment2 = null;
		this.segment = null;
		this.vertex = null;
		this.type = 0;
	}
	free() {
		this.vertex = null;
		this.segment = this.segment2 = null;
		this.node = null;
	}
	alloc() {
	}
	static swap_nodes(a,b) {
		let t = a.node;
		a.node = b.node;
		b.node = t;
	}
	static less_xy(a,b) {
		if(a.vertex.x < b.vertex.x) {
			return true;
		} else if(a.vertex.x > b.vertex.x) {
			return false;
		} else if(a.vertex.y < b.vertex.y) {
			return true;
		} else if(a.vertex.y > b.vertex.y) {
			return false;
		} else {
			return a.type < b.type;
		}
	}
	static get(v) {
		let ret;
		if(ZPP_SimpleEvent.zpp_pool == null) {
			ret = new ZPP_SimpleEvent();
		} else {
			ret = ZPP_SimpleEvent.zpp_pool;
			ZPP_SimpleEvent.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.vertex = v;
		return ret;
	}
}
ZPP_SimpleEvent.zpp_pool = null;
