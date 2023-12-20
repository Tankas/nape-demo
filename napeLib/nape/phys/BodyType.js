import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
export default class BodyType {
	constructor() {
		if(!ZPP_Flags.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate " + "BodyType" + " derp!");
		}
	}
	toString() {
		if(ZPP_Flags.BodyType_STATIC == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.BodyType_STATIC = new BodyType();
			ZPP_Flags.internal = false;
		}
		if(this == ZPP_Flags.BodyType_STATIC) {
			return "STATIC";
		} else {
			if(ZPP_Flags.BodyType_DYNAMIC == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.BodyType_DYNAMIC = new BodyType();
				ZPP_Flags.internal = false;
			}
			if(this == ZPP_Flags.BodyType_DYNAMIC) {
				return "DYNAMIC";
			} else {
				if(ZPP_Flags.BodyType_KINEMATIC == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.BodyType_KINEMATIC = new BodyType();
					ZPP_Flags.internal = false;
				}
				if(this == ZPP_Flags.BodyType_KINEMATIC) {
					return "KINEMATIC";
				} else {
					return "";
				}
			}
		}
	}
	static get_STATIC() {
		if(ZPP_Flags.BodyType_STATIC == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.BodyType_STATIC = new BodyType();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.BodyType_STATIC;
	}
	static get_DYNAMIC() {
		if(ZPP_Flags.BodyType_DYNAMIC == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.BodyType_DYNAMIC = new BodyType();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.BodyType_DYNAMIC;
	}
	static get_KINEMATIC() {
		if(ZPP_Flags.BodyType_KINEMATIC == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.BodyType_KINEMATIC = new BodyType();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.BodyType_KINEMATIC;
	}
}
