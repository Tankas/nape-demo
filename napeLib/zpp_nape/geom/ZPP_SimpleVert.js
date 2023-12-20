import ZPP_Set_ZPP_SimpleVert from '../util/ZPP_Set_ZPP_SimpleVert.js';
import ZPP_ID from '../ZPP_ID.js';
export default class ZPP_SimpleVert {
	constructor() {
		this.node = null;
		this.next = null;
		this.id = 0;
		this.links = null;
		this.y = 0.0;
		this.x = 0.0;
		this.forced = false;
		this.id = ZPP_ID.ZPP_SimpleVert();
		if(ZPP_Set_ZPP_SimpleVert.zpp_pool == null) {
			this.links = new ZPP_Set_ZPP_SimpleVert();
		} else {
			this.links = ZPP_Set_ZPP_SimpleVert.zpp_pool;
			ZPP_Set_ZPP_SimpleVert.zpp_pool = this.links.next;
			this.links.next = null;
		}
		this.links.lt = ZPP_SimpleVert.less_xy;
	}
	free() {
		this.links.clear();
		this.node = null;
		this.forced = false;
	}
	alloc() {
	}
	static less_xy(p,q) {
		if(!(p.y < q.y)) {
			if(p.y == q.y) {
				return p.x < q.x;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	static swap_nodes(p,q) {
		let t = p.node;
		p.node = q.node;
		q.node = t;
	}
	static get(x,y) {
		let ret;
		if(ZPP_SimpleVert.zpp_pool == null) {
			ret = new ZPP_SimpleVert();
		} else {
			ret = ZPP_SimpleVert.zpp_pool;
			ZPP_SimpleVert.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.x = x;
		ret.y = y;
		return ret;
	}
}
ZPP_SimpleVert.zpp_pool = null;
