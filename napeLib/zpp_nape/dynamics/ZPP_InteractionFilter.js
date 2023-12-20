import ZNPList_ZPP_Shape from '../util/ZNPList_ZPP_Shape.js';
import InteractionFilter from '../../nape/dynamics/InteractionFilter.js';
export default class ZPP_InteractionFilter {
	constructor() {
		this.fluidMask = 0;
		this.fluidGroup = 0;
		this.sensorMask = 0;
		this.sensorGroup = 0;
		this.collisionMask = 0;
		this.collisionGroup = 0;
		this.wrap_shapes = null;
		this.shapes = null;
		this.outer = null;
		this.userData = null;
		this.next = null;
		this.shapes = new ZNPList_ZPP_Shape();
		this.collisionGroup = this.sensorGroup = this.fluidGroup = 1;
		this.collisionMask = this.sensorMask = this.fluidMask = -1;
	}
	wrapper() {
		if(this.outer == null) {
			this.outer = new InteractionFilter();
			let o = this.outer.zpp_inner;
			o.outer = null;
			o.next = ZPP_InteractionFilter.zpp_pool;
			ZPP_InteractionFilter.zpp_pool = o;
			this.outer.zpp_inner = this;
		}
		return this.outer;
	}
	free() {
		this.outer = null;
	}
	alloc() {
	}
	feature_cons() {
		this.shapes = new ZNPList_ZPP_Shape();
	}
	addShape(shape) {
		this.shapes.add(shape);
	}
	remShape(shape) {
		this.shapes.remove(shape);
	}
	copy() {
		let ret;
		if(ZPP_InteractionFilter.zpp_pool == null) {
			ret = new ZPP_InteractionFilter();
		} else {
			ret = ZPP_InteractionFilter.zpp_pool;
			ZPP_InteractionFilter.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.collisionGroup = this.collisionGroup;
		ret.collisionMask = this.collisionMask;
		ret.sensorGroup = this.sensorGroup;
		ret.sensorMask = this.sensorMask;
		ret.fluidGroup = this.fluidGroup;
		ret.fluidMask = this.fluidMask;
		return ret;
	}
	shouldCollide(x) {
		if((this.collisionMask & x.collisionGroup) != 0) {
			return (x.collisionMask & this.collisionGroup) != 0;
		} else {
			return false;
		}
	}
	shouldSense(x) {
		if((this.sensorMask & x.sensorGroup) != 0) {
			return (x.sensorMask & this.sensorGroup) != 0;
		} else {
			return false;
		}
	}
	shouldFlow(x) {
		if((this.fluidMask & x.fluidGroup) != 0) {
			return (x.fluidMask & this.fluidGroup) != 0;
		} else {
			return false;
		}
	}
	invalidate() {
		let cx_ite = this.shapes.head;
		while(cx_ite != null) {
			let s = cx_ite.elt;
			s.invalidate_filter();
			cx_ite = cx_ite.next;
		}
	}
}
ZPP_InteractionFilter.zpp_pool = null;
