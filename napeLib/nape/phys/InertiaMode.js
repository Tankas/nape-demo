import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
export default class InertiaMode {
	constructor() {
		if(!ZPP_Flags.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate " + "InertiaMode" + " derp!");
		}
	}
	toString() {
		if(ZPP_Flags.InertiaMode_DEFAULT == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.InertiaMode_DEFAULT = new InertiaMode();
			ZPP_Flags.internal = false;
		}
		if(this == ZPP_Flags.InertiaMode_DEFAULT) {
			return "DEFAULT";
		} else {
			if(ZPP_Flags.InertiaMode_FIXED == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InertiaMode_FIXED = new InertiaMode();
				ZPP_Flags.internal = false;
			}
			if(this == ZPP_Flags.InertiaMode_FIXED) {
				return "FIXED";
			} else {
				return "";
			}
		}
	}
	static get_DEFAULT() {
		if(ZPP_Flags.InertiaMode_DEFAULT == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.InertiaMode_DEFAULT = new InertiaMode();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.InertiaMode_DEFAULT;
	}
	static get_FIXED() {
		if(ZPP_Flags.InertiaMode_FIXED == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.InertiaMode_FIXED = new InertiaMode();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.InertiaMode_FIXED;
	}
}
