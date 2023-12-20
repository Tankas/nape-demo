import GeomVertexIterator from '../../nape/geom/GeomVertexIterator.js';
export default class ZPP_GeomVertexIterator {
	constructor() {
		this.next = null;
		this.outer = null;
		this.forward = false;
		this.first = false;
		this.start = null;
		this.ptr = null;
		ZPP_GeomVertexIterator.internal = true;
		this.outer = new GeomVertexIterator();
		ZPP_GeomVertexIterator.internal = false;
	}
	free() {
		this.outer.zpp_inner = null;
		this.ptr = this.start = null;
	}
	alloc() {
	}
	static get(poly,forward) {
		let ret;
		if(ZPP_GeomVertexIterator.zpp_pool == null) {
			ret = new ZPP_GeomVertexIterator();
		} else {
			ret = ZPP_GeomVertexIterator.zpp_pool;
			ZPP_GeomVertexIterator.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.outer.zpp_inner = ret;
		ret.ptr = poly;
		ret.forward = forward;
		ret.start = poly;
		ret.first = poly != null;
		return ret.outer;
	}
}
ZPP_GeomVertexIterator.zpp_pool = null;
ZPP_GeomVertexIterator.internal = false;
