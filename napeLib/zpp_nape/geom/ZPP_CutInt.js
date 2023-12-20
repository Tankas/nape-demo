export default class ZPP_CutInt {
	constructor() {
		this.path1 = null;
		this.start = null;
		this.end = null;
		this.path0 = null;
		this.vertex = false;
		this.virtualint = false;
		this.time = 0.0;
		this.next = null;
	}
	alloc() {
	}
	free() {
		this.end = this.start = null;
		this.path0 = this.path1 = null;
	}
	static get(time,end,start,path0,path1,virtualint,vertex) {
		if(vertex == null) {
			vertex = false;
		}
		if(virtualint == null) {
			virtualint = false;
		}
		let ret;
		if(ZPP_CutInt.zpp_pool == null) {
			ret = new ZPP_CutInt();
		} else {
			ret = ZPP_CutInt.zpp_pool;
			ZPP_CutInt.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.virtualint = virtualint;
		ret.end = end;
		ret.start = start;
		ret.path0 = path0;
		ret.path1 = path1;
		ret.time = time;
		ret.vertex = vertex;
		return ret;
	}
}
ZPP_CutInt.zpp_pool = null;
