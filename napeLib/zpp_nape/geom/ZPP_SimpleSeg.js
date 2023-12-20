import ZPP_Set_ZPP_SimpleVert from '../util/ZPP_Set_ZPP_SimpleVert.js';
import ZPP_ID from '../ZPP_ID.js';
export default class ZPP_SimpleSeg {
	constructor() {
		this.node = null;
		this.prev = null;
		this.next = null;
		this.id = 0;
		this.vertices = null;
		this.right = null;
		this.left = null;
		this.id = ZPP_ID.ZPP_SimpleSeg();
		if(ZPP_Set_ZPP_SimpleVert.zpp_pool == null) {
			this.vertices = new ZPP_Set_ZPP_SimpleVert();
		} else {
			this.vertices = ZPP_Set_ZPP_SimpleVert.zpp_pool;
			ZPP_Set_ZPP_SimpleVert.zpp_pool = this.vertices.next;
			this.vertices.next = null;
		}
		this.vertices.lt = $bind(this,this.less_xy);
	}
	free() {
		this.left = this.right = null;
		this.prev = null;
		this.node = null;
		this.vertices.clear();
	}
	alloc() {
	}
	less_xy(a,b) {
		if(!(a.x < b.x)) {
			if(a.x == b.x) {
				return a.y < b.y;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	static get(left,right) {
		let ret;
		if(ZPP_SimpleSeg.zpp_pool == null) {
			ret = new ZPP_SimpleSeg();
		} else {
			ret = ZPP_SimpleSeg.zpp_pool;
			ZPP_SimpleSeg.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.left = left;
		ret.right = right;
		ret.vertices.insert(left);
		ret.vertices.insert(right);
		return ret;
	}
}
ZPP_SimpleSeg.zpp_pool = null;
