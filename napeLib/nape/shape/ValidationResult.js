import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
export default class ValidationResult {
	constructor() {
		if(!ZPP_Flags.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate " + "ValidationResult" + " derp!");
		}
	}
	toString() {
		if(ZPP_Flags.ValidationResult_VALID == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.ValidationResult_VALID = new ValidationResult();
			ZPP_Flags.internal = false;
		}
		if(this == ZPP_Flags.ValidationResult_VALID) {
			return "VALID";
		} else {
			if(ZPP_Flags.ValidationResult_DEGENERATE == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.ValidationResult_DEGENERATE = new ValidationResult();
				ZPP_Flags.internal = false;
			}
			if(this == ZPP_Flags.ValidationResult_DEGENERATE) {
				return "DEGENERATE";
			} else {
				if(ZPP_Flags.ValidationResult_CONCAVE == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.ValidationResult_CONCAVE = new ValidationResult();
					ZPP_Flags.internal = false;
				}
				if(this == ZPP_Flags.ValidationResult_CONCAVE) {
					return "CONCAVE";
				} else {
					if(ZPP_Flags.ValidationResult_SELF_INTERSECTING == null) {
						ZPP_Flags.internal = true;
						ZPP_Flags.ValidationResult_SELF_INTERSECTING = new ValidationResult();
						ZPP_Flags.internal = false;
					}
					if(this == ZPP_Flags.ValidationResult_SELF_INTERSECTING) {
						return "SELF_INTERSECTING";
					} else {
						return "";
					}
				}
			}
		}
	}
	static get_VALID() {
		if(ZPP_Flags.ValidationResult_VALID == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.ValidationResult_VALID = new ValidationResult();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.ValidationResult_VALID;
	}
	static get_DEGENERATE() {
		if(ZPP_Flags.ValidationResult_DEGENERATE == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.ValidationResult_DEGENERATE = new ValidationResult();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.ValidationResult_DEGENERATE;
	}
	static get_CONCAVE() {
		if(ZPP_Flags.ValidationResult_CONCAVE == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.ValidationResult_CONCAVE = new ValidationResult();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.ValidationResult_CONCAVE;
	}
	static get_SELF_INTERSECTING() {
		if(ZPP_Flags.ValidationResult_SELF_INTERSECTING == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.ValidationResult_SELF_INTERSECTING = new ValidationResult();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.ValidationResult_SELF_INTERSECTING;
	}
}
