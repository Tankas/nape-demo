import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
export default class ArbiterType {
	constructor() {
		if(!ZPP_Flags.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate " + "ArbiterType" + " derp!");
		}
	}
	toString() {
		if(ZPP_Flags.ArbiterType_COLLISION == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.ArbiterType_COLLISION = new ArbiterType();
			ZPP_Flags.internal = false;
		}
		if(this == ZPP_Flags.ArbiterType_COLLISION) {
			return "COLLISION";
		} else {
			if(ZPP_Flags.ArbiterType_SENSOR == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.ArbiterType_SENSOR = new ArbiterType();
				ZPP_Flags.internal = false;
			}
			if(this == ZPP_Flags.ArbiterType_SENSOR) {
				return "SENSOR";
			} else {
				if(ZPP_Flags.ArbiterType_FLUID == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.ArbiterType_FLUID = new ArbiterType();
					ZPP_Flags.internal = false;
				}
				if(this == ZPP_Flags.ArbiterType_FLUID) {
					return "FLUID";
				} else {
					return "";
				}
			}
		}
	}
	static get_COLLISION() {
		if(ZPP_Flags.ArbiterType_COLLISION == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.ArbiterType_COLLISION = new ArbiterType();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.ArbiterType_COLLISION;
	}
	static get_SENSOR() {
		if(ZPP_Flags.ArbiterType_SENSOR == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.ArbiterType_SENSOR = new ArbiterType();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.ArbiterType_SENSOR;
	}
	static get_FLUID() {
		if(ZPP_Flags.ArbiterType_FLUID == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.ArbiterType_FLUID = new ArbiterType();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.ArbiterType_FLUID;
	}
}
