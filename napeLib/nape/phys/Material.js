import ZPP_ShapeList from '../../zpp_nape/util/ZPP_ShapeList.js';
import ZPP_Material from '../../zpp_nape/phys/ZPP_Material.js';
export default class Material {
	constructor(elasticity,dynamicFriction,staticFriction,density,rollingFriction) {
		if(rollingFriction == null) {
			rollingFriction = 0.001;
		}
		if(density == null) {
			density = 1;
		}
		if(staticFriction == null) {
			staticFriction = 2.0;
		}
		if(dynamicFriction == null) {
			dynamicFriction = 1.0;
		}
		if(elasticity == null) {
			elasticity = 0.0;
		}
		this.zpp_inner = null;
		if(ZPP_Material.zpp_pool == null) {
			this.zpp_inner = new ZPP_Material();
		} else {
			this.zpp_inner = ZPP_Material.zpp_pool;
			ZPP_Material.zpp_pool = this.zpp_inner.next;
			this.zpp_inner.next = null;
		}
		this.zpp_inner.outer = this;
		if(elasticity != this.zpp_inner.elasticity) {
			if(elasticity != elasticity) {
				throw haxe_Exception.thrown("Error: Material::" + "elasticity" + " cannot be NaN");
			}
			this.zpp_inner.elasticity = elasticity / 1;
			this.zpp_inner.invalidate(ZPP_Material.WAKE | ZPP_Material.ARBITERS);
		}
		if(dynamicFriction != this.zpp_inner.dynamicFriction) {
			if(dynamicFriction != dynamicFriction) {
				throw haxe_Exception.thrown("Error: Material::" + "dynamicFriction" + " cannot be NaN");
			}
			if(dynamicFriction < 0) {
				throw haxe_Exception.thrown("Error: Material::" + "dynamicFriction" + " cannot be negative");
			}
			this.zpp_inner.dynamicFriction = dynamicFriction / 1;
			this.zpp_inner.invalidate(ZPP_Material.WAKE | ZPP_Material.ANGDRAG | ZPP_Material.ARBITERS);
		}
		if(staticFriction != this.zpp_inner.staticFriction) {
			if(staticFriction != staticFriction) {
				throw haxe_Exception.thrown("Error: Material::" + "staticFriction" + " cannot be NaN");
			}
			if(staticFriction < 0) {
				throw haxe_Exception.thrown("Error: Material::" + "staticFriction" + " cannot be negative");
			}
			this.zpp_inner.staticFriction = staticFriction / 1;
			this.zpp_inner.invalidate(ZPP_Material.WAKE | ZPP_Material.ARBITERS);
		}
		if(density != this.zpp_inner.density * 1000) {
			if(density != density) {
				throw haxe_Exception.thrown("Error: Material::" + "density" + " cannot be NaN");
			}
			if(density < 0) {
				throw haxe_Exception.thrown("Error: Material::density must be positive");
			}
			if(density < 0) {
				throw haxe_Exception.thrown("Error: Material::" + "density" + " cannot be negative");
			}
			this.zpp_inner.density = density / 1000;
			this.zpp_inner.invalidate(ZPP_Material.WAKE | ZPP_Material.PROPS);
		}
		if(rollingFriction != this.zpp_inner.rollingFriction) {
			if(rollingFriction != rollingFriction) {
				throw haxe_Exception.thrown("Error: Material::" + "rollingFriction" + " cannot be NaN");
			}
			if(rollingFriction < 0) {
				throw haxe_Exception.thrown("Error: Material::" + "rollingFriction" + " cannot be negative");
			}
			this.zpp_inner.rollingFriction = rollingFriction / 1;
			this.zpp_inner.invalidate(ZPP_Material.WAKE | ZPP_Material.ARBITERS);
		}
	}
	get_userData() {
		if(this.zpp_inner.userData == null) {
			this.zpp_inner.userData = { };
		}
		return this.zpp_inner.userData;
	}
	get_shapes() {
		if(this.zpp_inner.wrap_shapes == null) {
			this.zpp_inner.wrap_shapes = ZPP_ShapeList.get(this.zpp_inner.shapes,true);
		}
		return this.zpp_inner.wrap_shapes;
	}
	copy() {
		let ret = new Material(this.zpp_inner.elasticity,this.zpp_inner.dynamicFriction,this.zpp_inner.staticFriction,this.zpp_inner.density * 1000,this.zpp_inner.rollingFriction);
		if(this.zpp_inner.userData != null) {
			ret.zpp_inner.userData = Reflect.copy(this.zpp_inner.userData);
		}
		return ret;
	}
	get_elasticity() {
		return this.zpp_inner.elasticity;
	}
	set_elasticity(elasticity) {
		if(elasticity != this.zpp_inner.elasticity) {
			if(elasticity != elasticity) {
				throw haxe_Exception.thrown("Error: Material::" + "elasticity" + " cannot be NaN");
			}
			this.zpp_inner.elasticity = elasticity / 1;
			this.zpp_inner.invalidate(ZPP_Material.WAKE | ZPP_Material.ARBITERS);
		}
		return this.zpp_inner.elasticity;
	}
	get_dynamicFriction() {
		return this.zpp_inner.dynamicFriction;
	}
	set_dynamicFriction(dynamicFriction) {
		if(dynamicFriction != this.zpp_inner.dynamicFriction) {
			if(dynamicFriction != dynamicFriction) {
				throw haxe_Exception.thrown("Error: Material::" + "dynamicFriction" + " cannot be NaN");
			}
			if(dynamicFriction < 0) {
				throw haxe_Exception.thrown("Error: Material::" + "dynamicFriction" + " cannot be negative");
			}
			this.zpp_inner.dynamicFriction = dynamicFriction / 1;
			this.zpp_inner.invalidate(ZPP_Material.WAKE | ZPP_Material.ANGDRAG | ZPP_Material.ARBITERS);
		}
		return this.zpp_inner.dynamicFriction;
	}
	get_staticFriction() {
		return this.zpp_inner.staticFriction;
	}
	set_staticFriction(staticFriction) {
		if(staticFriction != this.zpp_inner.staticFriction) {
			if(staticFriction != staticFriction) {
				throw haxe_Exception.thrown("Error: Material::" + "staticFriction" + " cannot be NaN");
			}
			if(staticFriction < 0) {
				throw haxe_Exception.thrown("Error: Material::" + "staticFriction" + " cannot be negative");
			}
			this.zpp_inner.staticFriction = staticFriction / 1;
			this.zpp_inner.invalidate(ZPP_Material.WAKE | ZPP_Material.ARBITERS);
		}
		return this.zpp_inner.staticFriction;
	}
	get_density() {
		return this.zpp_inner.density * 1000;
	}
	set_density(density) {
		if(density != this.zpp_inner.density * 1000) {
			if(density != density) {
				throw haxe_Exception.thrown("Error: Material::" + "density" + " cannot be NaN");
			}
			if(density < 0) {
				throw haxe_Exception.thrown("Error: Material::density must be positive");
			}
			if(density < 0) {
				throw haxe_Exception.thrown("Error: Material::" + "density" + " cannot be negative");
			}
			this.zpp_inner.density = density / 1000;
			this.zpp_inner.invalidate(ZPP_Material.WAKE | ZPP_Material.PROPS);
		}
		return this.zpp_inner.density * 1000;
	}
	get_rollingFriction() {
		return this.zpp_inner.rollingFriction;
	}
	set_rollingFriction(rollingFriction) {
		if(rollingFriction != this.zpp_inner.rollingFriction) {
			if(rollingFriction != rollingFriction) {
				throw haxe_Exception.thrown("Error: Material::" + "rollingFriction" + " cannot be NaN");
			}
			if(rollingFriction < 0) {
				throw haxe_Exception.thrown("Error: Material::" + "rollingFriction" + " cannot be negative");
			}
			this.zpp_inner.rollingFriction = rollingFriction / 1;
			this.zpp_inner.invalidate(ZPP_Material.WAKE | ZPP_Material.ARBITERS);
		}
		return this.zpp_inner.rollingFriction;
	}
	toString() {
		return "{ elasticity: " + this.zpp_inner.elasticity + " dynamicFriction: " + this.zpp_inner.dynamicFriction + " staticFriction: " + this.zpp_inner.staticFriction + " density: " + this.zpp_inner.density * 1000 + " rollingFriction: " + this.zpp_inner.rollingFriction + " }";
	}
	static wood() {
		return new Material(0.4,0.2,0.38,0.7,0.005);
	}
	static steel() {
		return new Material(0.2,0.57,0.74,7.8,0.001);
	}
	static ice() {
		return new Material(0.3,0.03,0.1,0.9,0.0001);
	}
	static rubber() {
		return new Material(0.8,1.0,1.4,1.5,0.01);
	}
	static glass() {
		return new Material(0.4,0.4,0.94,2.6,0.002);
	}
	static sand() {
		return new Material(-1.0,0.45,0.6,1.6,16.0);
	}
}
