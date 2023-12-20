import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
export default class InteractionType {
	constructor() {
		if(!ZPP_Flags.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate " + "InteractionType" + " derp!");
		}
	}
	toString() {
		if(ZPP_Flags.InteractionType_COLLISION == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.InteractionType_COLLISION = new InteractionType();
			ZPP_Flags.internal = false;
		}
		if(this == ZPP_Flags.InteractionType_COLLISION) {
			return "COLLISION";
		} else {
			if(ZPP_Flags.InteractionType_SENSOR == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_SENSOR = new InteractionType();
				ZPP_Flags.internal = false;
			}
			if(this == ZPP_Flags.InteractionType_SENSOR) {
				return "SENSOR";
			} else {
				if(ZPP_Flags.InteractionType_FLUID == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.InteractionType_FLUID = new InteractionType();
					ZPP_Flags.internal = false;
				}
				if(this == ZPP_Flags.InteractionType_FLUID) {
					return "FLUID";
				} else {
					if(ZPP_Flags.InteractionType_ANY == null) {
						ZPP_Flags.internal = true;
						ZPP_Flags.InteractionType_ANY = new InteractionType();
						ZPP_Flags.internal = false;
					}
					if(this == ZPP_Flags.InteractionType_ANY) {
						return "ANY";
					} else {
						return "";
					}
				}
			}
		}
	}
	static get_COLLISION() {
		if(ZPP_Flags.InteractionType_COLLISION == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.InteractionType_COLLISION = new InteractionType();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.InteractionType_COLLISION;
	}
	static get_SENSOR() {
		if(ZPP_Flags.InteractionType_SENSOR == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.InteractionType_SENSOR = new InteractionType();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.InteractionType_SENSOR;
	}
	static get_FLUID() {
		if(ZPP_Flags.InteractionType_FLUID == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.InteractionType_FLUID = new InteractionType();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.InteractionType_FLUID;
	}
	static get_ANY() {
		if(ZPP_Flags.InteractionType_ANY == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.InteractionType_ANY = new InteractionType();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.InteractionType_ANY;
	}
}
