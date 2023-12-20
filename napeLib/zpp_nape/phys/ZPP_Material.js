import ZNPList_ZPP_Shape from '../util/ZNPList_ZPP_Shape.js';
import Material from '../../nape/phys/Material.js';
export default class ZPP_Material {
	constructor() {
		this.rollingFriction = 0.0;
		this.elasticity = 0.0;
		this.density = 0.0;
		this.staticFriction = 0.0;
		this.dynamicFriction = 0.0;
		this.wrap_shapes = null;
		this.shapes = null;
		this.outer = null;
		this.userData = null;
		this.next = null;
		this.shapes = new ZNPList_ZPP_Shape();
		this.elasticity = 0;
		this.dynamicFriction = 1;
		this.staticFriction = 2;
		this.density = 0.001;
		this.rollingFriction = 0.01;
	}
	wrapper() {
		if(this.outer == null) {
			this.outer = new Material();
			let o = this.outer.zpp_inner;
			o.outer = null;
			o.next = ZPP_Material.zpp_pool;
			ZPP_Material.zpp_pool = o;
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
		let ret = new ZPP_Material();
		ret.dynamicFriction = this.dynamicFriction;
		ret.staticFriction = this.staticFriction;
		ret.density = this.density;
		ret.elasticity = this.elasticity;
		ret.rollingFriction = this.rollingFriction;
		return ret;
	}
	set(x) {
		this.dynamicFriction = x.dynamicFriction;
		this.staticFriction = x.staticFriction;
		this.density = x.density;
		this.elasticity = x.elasticity;
		this.rollingFriction = x.rollingFriction;
	}
	invalidate(x) {
		let cx_ite = this.shapes.head;
		while(cx_ite != null) {
			let s = cx_ite.elt;
			s.invalidate_material(x);
			cx_ite = cx_ite.next;
		}
	}
}
ZPP_Material.zpp_pool = null;
ZPP_Material.WAKE = 1;
ZPP_Material.PROPS = 2;
ZPP_Material.ANGDRAG = 4;
ZPP_Material.ARBITERS = 8;
