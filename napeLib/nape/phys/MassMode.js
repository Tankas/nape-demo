import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
export default class MassMode {
	constructor() {
		if(!ZPP_Flags.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate " + "MassMode" + " derp!");
		}
	}
	toString() {
		if(ZPP_Flags.MassMode_DEFAULT == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.MassMode_DEFAULT = new MassMode();
			ZPP_Flags.internal = false;
		}
		if(this == ZPP_Flags.MassMode_DEFAULT) {
			return "DEFAULT";
		} else {
			if(ZPP_Flags.MassMode_FIXED == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.MassMode_FIXED = new MassMode();
				ZPP_Flags.internal = false;
			}
			if(this == ZPP_Flags.MassMode_FIXED) {
				return "FIXED";
			} else {
				return "";
			}
		}
	}
	static get_DEFAULT() {
		if(ZPP_Flags.MassMode_DEFAULT == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.MassMode_DEFAULT = new MassMode();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.MassMode_DEFAULT;
	}
	static get_FIXED() {
		if(ZPP_Flags.MassMode_FIXED == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.MassMode_FIXED = new MassMode();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.MassMode_FIXED;
	}
}
