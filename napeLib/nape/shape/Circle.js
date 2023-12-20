import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZPP_Circle from '../../zpp_nape/shape/ZPP_Circle.js';
import ZPP_Material from '../../zpp_nape/phys/ZPP_Material.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import ZPP_InteractionFilter from '../../zpp_nape/dynamics/ZPP_InteractionFilter.js';
import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
import ZPP_CbType from '../../zpp_nape/callbacks/ZPP_CbType.js';
import Shape from './Shape.js';
import Interactor from '../phys/Interactor.js';
import Config from '../Config.js';
export default class Circle extends Shape {
	constructor(radius,localCOM,material,filter) {
		Interactor._hx_skip_constructor = true;
		super();
		Interactor._hx_skip_constructor = false;
		this._hx_constructor(radius,localCOM,material,filter);
	}
	_hx_constructor(radius,localCOM,material,filter) {
		this.zpp_inner_zn = null;
		Shape.zpp_internalAlloc = true;
		super._hx_constructor();
		Shape.zpp_internalAlloc = false;
		this.zpp_inner_zn = new ZPP_Circle();
		this.zpp_inner_zn.outer = this;
		this.zpp_inner_zn.outer_zn = this;
		this.zpp_inner = this.zpp_inner_zn;
		this.zpp_inner_i = this.zpp_inner;
		this.zpp_inner_i.outer_i = this;
		this.zpp_inner.immutable_midstep("Circle::radius");
		if(this.zpp_inner.body != null && this.zpp_inner.body.type == ZPP_Flags.id_BodyType_STATIC && this.zpp_inner.body.space != null) {
			throw haxe_Exception.thrown("Error: Cannot modifiy radius of Circle contained in static object once added to space");
		}
		if(radius != this.zpp_inner_zn.radius) {
			if(radius != radius) {
				throw haxe_Exception.thrown("Error: Circle::radius cannot be NaN");
			}
			if(radius < Config.epsilon) {
				throw haxe_Exception.thrown("Error: Circle::radius (" + radius + ") must be > Config.epsilon");
			}
			if(radius > 1e100) {
				throw haxe_Exception.thrown("Error: Circle::radius (" + radius + ") must be < PR(Const).FMAX");
			}
			this.zpp_inner_zn.radius = radius;
			this.zpp_inner_zn.invalidate_radius();
		}
		if(localCOM == null) {
			this.zpp_inner.localCOMx = 0;
			this.zpp_inner.localCOMy = 0;
		} else {
			if(localCOM != null && localCOM.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			if(localCOM != null && localCOM.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this = localCOM.zpp_inner;
			if(_this._validate != null) {
				_this._validate();
			}
			this.zpp_inner.localCOMx = localCOM.zpp_inner.x;
			if(localCOM != null && localCOM.zpp_disp) {
				throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
			}
			let _this1 = localCOM.zpp_inner;
			if(_this1._validate != null) {
				_this1._validate();
			}
			this.zpp_inner.localCOMy = localCOM.zpp_inner.y;
			if(localCOM.zpp_inner.weak) {
				if(localCOM != null && localCOM.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this = localCOM.zpp_inner;
				if(_this._immutable) {
					throw haxe_Exception.thrown("Error: Vec2 is immutable");
				}
				if(_this._isimmutable != null) {
					_this._isimmutable();
				}
				if(localCOM.zpp_inner._inuse) {
					throw haxe_Exception.thrown("Error: This Vec2 is not disposable");
				}
				let inner = localCOM.zpp_inner;
				localCOM.zpp_inner.outer = null;
				localCOM.zpp_inner = null;
				let o = localCOM;
				o.zpp_pool = null;
				if(ZPP_PubPool.nextVec2 != null) {
					ZPP_PubPool.nextVec2.zpp_pool = o;
				} else {
					ZPP_PubPool.poolVec2 = o;
				}
				ZPP_PubPool.nextVec2 = o;
				o.zpp_disp = true;
				let o1 = inner;
				if(o1.outer != null) {
					o1.outer.zpp_inner = null;
					o1.outer = null;
				}
				o1._isimmutable = null;
				o1._validate = null;
				o1._invalidate = null;
				o1.next = ZPP_Vec2.zpp_pool;
				ZPP_Vec2.zpp_pool = o1;
			}
		}
		if(material == null) {
			if(ZPP_Material.zpp_pool == null) {
				this.zpp_inner.material = new ZPP_Material();
			} else {
				this.zpp_inner.material = ZPP_Material.zpp_pool;
				ZPP_Material.zpp_pool = this.zpp_inner.material.next;
				this.zpp_inner.material.next = null;
			}
		} else {
			this.zpp_inner.immutable_midstep("Shape::material");
			if(material == null) {
				throw haxe_Exception.thrown("Error: Cannot assign null as Shape material");
			}
			this.zpp_inner.setMaterial(material.zpp_inner);
			this.zpp_inner.material.wrapper();
		}
		if(filter == null) {
			if(ZPP_InteractionFilter.zpp_pool == null) {
				this.zpp_inner.filter = new ZPP_InteractionFilter();
			} else {
				this.zpp_inner.filter = ZPP_InteractionFilter.zpp_pool;
				ZPP_InteractionFilter.zpp_pool = this.zpp_inner.filter.next;
				this.zpp_inner.filter.next = null;
			}
		} else {
			this.zpp_inner.immutable_midstep("Shape::filter");
			if(filter == null) {
				throw haxe_Exception.thrown("Error: Cannot assign null as Shape filter");
			}
			this.zpp_inner.setFilter(filter.zpp_inner);
			this.zpp_inner.filter.wrapper();
		}
		this.zpp_inner_i.insert_cbtype(ZPP_CbType.ANY_SHAPE.zpp_inner);
	}
	get_radius() {
		return this.zpp_inner_zn.radius;
	}
	set_radius(radius) {
		this.zpp_inner.immutable_midstep("Circle::radius");
		if(this.zpp_inner.body != null && this.zpp_inner.body.type == ZPP_Flags.id_BodyType_STATIC && this.zpp_inner.body.space != null) {
			throw haxe_Exception.thrown("Error: Cannot modifiy radius of Circle contained in static object once added to space");
		}
		if(radius != this.zpp_inner_zn.radius) {
			if(radius != radius) {
				throw haxe_Exception.thrown("Error: Circle::radius cannot be NaN");
			}
			if(radius < Config.epsilon) {
				throw haxe_Exception.thrown("Error: Circle::radius (" + radius + ") must be > Config.epsilon");
			}
			if(radius > 1e100) {
				throw haxe_Exception.thrown("Error: Circle::radius (" + radius + ") must be < PR(Const).FMAX");
			}
			this.zpp_inner_zn.radius = radius;
			this.zpp_inner_zn.invalidate_radius();
		}
		return this.zpp_inner_zn.radius;
	}
}
