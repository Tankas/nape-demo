import ZPP_AABB from '../geom/ZPP_AABB.js';
export default class ZPP_AABBNode {
	constructor() {
		this.first_sync = false;
		this.synced = false;
		this.snext = null;
		this.moved = false;
		this.mnext = null;
		this.next = null;
		this.rayt = 0.0;
		this.height = 0;
		this.child2 = null;
		this.child1 = null;
		this.parent = null;
		this.dyn = false;
		this.shape = null;
		this.aabb = null;
		this.height = -1;
	}
	alloc() {
		if(ZPP_AABB.zpp_pool == null) {
			this.aabb = new ZPP_AABB();
		} else {
			this.aabb = ZPP_AABB.zpp_pool;
			ZPP_AABB.zpp_pool = this.aabb.next;
			this.aabb.next = null;
		}
		this.moved = false;
		this.synced = false;
		this.first_sync = false;
	}
	free() {
		this.height = -1;
		let o = this.aabb;
		if(o.outer != null) {
			o.outer.zpp_inner = null;
			o.outer = null;
		}
		o.wrap_min = o.wrap_max = null;
		o._invalidate = null;
		o._validate = null;
		o.next = ZPP_AABB.zpp_pool;
		ZPP_AABB.zpp_pool = o;
		this.child1 = this.child2 = this.parent = null;
		this.next = null;
		this.snext = null;
		this.mnext = null;
	}
	isLeaf() {
		return this.child1 == null;
	}
}
ZPP_AABBNode.zpp_pool = null;
