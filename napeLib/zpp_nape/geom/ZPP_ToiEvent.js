import ZPP_Vec2 from './ZPP_Vec2.js';
export default class ZPP_ToiEvent {
	constructor() {
		this.kinematic = false;
		this.failed = false;
		this.slipped = false;
		this.axis = null;
		this.c2 = null;
		this.c1 = null;
		this.frozen2 = false;
		this.frozen1 = false;
		this.arbiter = null;
		this.s2 = null;
		this.s1 = null;
		this.toi = 0.0;
		this.next = null;
		this.c1 = new ZPP_Vec2();
		this.c2 = new ZPP_Vec2();
		this.axis = new ZPP_Vec2();
	}
	alloc() {
		this.failed = false;
		this.s1 = this.s2 = null;
		this.arbiter = null;
	}
	free() {
	}
}
ZPP_ToiEvent.zpp_pool = null;
