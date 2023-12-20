export default class Interactor {
	constructor() {
		if(Interactor._hx_skip_constructor) {
			return;
		}
		this._hx_constructor();
	}
	_hx_constructor() {
		this.userData = { };
		this.zpp_inner_i = null;
		if(!Interactor.zpp_internalAlloc) {
			throw haxe_Exception.thrown("Error: Cannot instantiate an Interactor, only Shape/Body/Compound");
		}
	}
	get_id() {
		return this.zpp_inner_i.id;
	}
	get_userData() {
		return this.userData;
	}
	isShape() {
		return this.zpp_inner_i.ishape != null;
	}
	isBody() {
		return this.zpp_inner_i.ibody != null;
	}
	isCompound() {
		return this.zpp_inner_i.icompound != null;
	}
	get_castShape() {
		if(this.zpp_inner_i.ishape != null) {
			return this.zpp_inner_i.ishape.outer;
		} else {
			return null;
		}
	}
	get_castBody() {
		if(this.zpp_inner_i.ibody != null) {
			return this.zpp_inner_i.ibody.outer;
		} else {
			return null;
		}
	}
	get_castCompound() {
		if(this.zpp_inner_i.icompound != null) {
			return this.zpp_inner_i.icompound.outer;
		} else {
			return null;
		}
	}
	get_group() {
		if(this.zpp_inner_i.group == null) {
			return null;
		} else {
			return this.zpp_inner_i.group.outer;
		}
	}
	set_group(group) {
		this.zpp_inner_i.immutable_midstep("Interactor::group");
		this.zpp_inner_i.setGroup(group == null ? null : group.zpp_inner);
		if(this.zpp_inner_i.group == null) {
			return null;
		} else {
			return this.zpp_inner_i.group.outer;
		}
	}
	get_cbTypes() {
		if(this.zpp_inner_i.wrap_cbTypes == null) {
			this.zpp_inner_i.setupcbTypes();
		}
		return this.zpp_inner_i.wrap_cbTypes;
	}
	toString() {
		return "";
	}
}
Interactor._hx_skip_constructor = false;
Interactor.zpp_internalAlloc = false;
