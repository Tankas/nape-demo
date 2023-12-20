import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
export default class Winding {
	constructor() {
		if(!ZPP_Flags.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate " + "Winding" + " derp!");
		}
	}
	toString() {
		if(ZPP_Flags.Winding_UNDEFINED == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.Winding_UNDEFINED = new Winding();
			ZPP_Flags.internal = false;
		}
		if(this == ZPP_Flags.Winding_UNDEFINED) {
			return "UNDEFINED";
		} else {
			if(ZPP_Flags.Winding_CLOCKWISE == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.Winding_CLOCKWISE = new Winding();
				ZPP_Flags.internal = false;
			}
			if(this == ZPP_Flags.Winding_CLOCKWISE) {
				return "CLOCKWISE";
			} else {
				if(ZPP_Flags.Winding_ANTICLOCKWISE == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.Winding_ANTICLOCKWISE = new Winding();
					ZPP_Flags.internal = false;
				}
				if(this == ZPP_Flags.Winding_ANTICLOCKWISE) {
					return "ANTICLOCKWISE";
				} else {
					return "";
				}
			}
		}
	}
	static get_UNDEFINED() {
		if(ZPP_Flags.Winding_UNDEFINED == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.Winding_UNDEFINED = new Winding();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.Winding_UNDEFINED;
	}
	static get_CLOCKWISE() {
		if(ZPP_Flags.Winding_CLOCKWISE == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.Winding_CLOCKWISE = new Winding();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.Winding_CLOCKWISE;
	}
	static get_ANTICLOCKWISE() {
		if(ZPP_Flags.Winding_ANTICLOCKWISE == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.Winding_ANTICLOCKWISE = new Winding();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.Winding_ANTICLOCKWISE;
	}
}
