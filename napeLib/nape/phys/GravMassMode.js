import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
export default class GravMassMode {
	constructor() {
		if(!ZPP_Flags.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate " + "GravMassMode" + " derp!");
		}
	}
	toString() {
		if(ZPP_Flags.GravMassMode_DEFAULT == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.GravMassMode_DEFAULT = new GravMassMode();
			ZPP_Flags.internal = false;
		}
		if(this == ZPP_Flags.GravMassMode_DEFAULT) {
			return "DEFAULT";
		} else {
			if(ZPP_Flags.GravMassMode_FIXED == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.GravMassMode_FIXED = new GravMassMode();
				ZPP_Flags.internal = false;
			}
			if(this == ZPP_Flags.GravMassMode_FIXED) {
				return "FIXED";
			} else {
				if(ZPP_Flags.GravMassMode_SCALED == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.GravMassMode_SCALED = new GravMassMode();
					ZPP_Flags.internal = false;
				}
				if(this == ZPP_Flags.GravMassMode_SCALED) {
					return "SCALED";
				} else {
					return "";
				}
			}
		}
	}
	static get_DEFAULT() {
		if(ZPP_Flags.GravMassMode_DEFAULT == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.GravMassMode_DEFAULT = new GravMassMode();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.GravMassMode_DEFAULT;
	}
	static get_FIXED() {
		if(ZPP_Flags.GravMassMode_FIXED == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.GravMassMode_FIXED = new GravMassMode();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.GravMassMode_FIXED;
	}
	static get_SCALED() {
		if(ZPP_Flags.GravMassMode_SCALED == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.GravMassMode_SCALED = new GravMassMode();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.GravMassMode_SCALED;
	}
}
