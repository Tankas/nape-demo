import ZPP_InteractorList from '../../zpp_nape/util/ZPP_InteractorList.js';
import ZPP_ConstraintList from '../../zpp_nape/util/ZPP_ConstraintList.js';
import ZPP_CbType from '../../zpp_nape/callbacks/ZPP_CbType.js';
import OptionType from './OptionType.js';
export default class CbType {
	constructor() {
		this.zpp_inner = null;
		this.zpp_inner = new ZPP_CbType();
		this.zpp_inner.outer = this;
	}
	get_id() {
		return this.zpp_inner.id;
	}
	including(includes) {
		return new OptionType(this).including(includes);
	}
	excluding(excludes) {
		return new OptionType(this).excluding(excludes);
	}
	get_userData() {
		if(this.zpp_inner.userData == null) {
			this.zpp_inner.userData = { };
		}
		return this.zpp_inner.userData;
	}
	get_interactors() {
		if(this.zpp_inner.wrap_interactors == null) {
			this.zpp_inner.wrap_interactors = ZPP_InteractorList.get(this.zpp_inner.interactors,true);
		}
		return this.zpp_inner.wrap_interactors;
	}
	get_constraints() {
		if(this.zpp_inner.wrap_constraints == null) {
			this.zpp_inner.wrap_constraints = ZPP_ConstraintList.get(this.zpp_inner.constraints,true);
		}
		return this.zpp_inner.wrap_constraints;
	}
	toString() {
		if(this == ZPP_CbType.ANY_BODY) {
			return "ANY_BODY";
		} else if(this == ZPP_CbType.ANY_SHAPE) {
			return "ANY_SHAPE";
		} else if(this == ZPP_CbType.ANY_COMPOUND) {
			return "ANY_COMPOUND";
		} else if(this == ZPP_CbType.ANY_CONSTRAINT) {
			return "ANY_CONSTRAINT";
		} else {
			return "CbType#" + this.zpp_inner.id;
		}
	}
	static get_ANY_BODY() {
		return ZPP_CbType.ANY_BODY;
	}
	static get_ANY_CONSTRAINT() {
		return ZPP_CbType.ANY_CONSTRAINT;
	}
	static get_ANY_SHAPE() {
		return ZPP_CbType.ANY_SHAPE;
	}
	static get_ANY_COMPOUND() {
		return ZPP_CbType.ANY_COMPOUND;
	}
}
