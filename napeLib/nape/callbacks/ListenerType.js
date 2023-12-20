import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
export default class ListenerType {
	constructor() {
		if(!ZPP_Flags.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate " + "ListenerType" + " derp!");
		}
	}
	toString() {
		if(ZPP_Flags.ListenerType_BODY == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.ListenerType_BODY = new ListenerType();
			ZPP_Flags.internal = false;
		}
		if(this == ZPP_Flags.ListenerType_BODY) {
			return "BODY";
		} else {
			if(ZPP_Flags.ListenerType_CONSTRAINT == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.ListenerType_CONSTRAINT = new ListenerType();
				ZPP_Flags.internal = false;
			}
			if(this == ZPP_Flags.ListenerType_CONSTRAINT) {
				return "CONSTRAINT";
			} else {
				if(ZPP_Flags.ListenerType_INTERACTION == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.ListenerType_INTERACTION = new ListenerType();
					ZPP_Flags.internal = false;
				}
				if(this == ZPP_Flags.ListenerType_INTERACTION) {
					return "INTERACTION";
				} else {
					if(ZPP_Flags.ListenerType_PRE == null) {
						ZPP_Flags.internal = true;
						ZPP_Flags.ListenerType_PRE = new ListenerType();
						ZPP_Flags.internal = false;
					}
					if(this == ZPP_Flags.ListenerType_PRE) {
						return "PRE";
					} else {
						return "";
					}
				}
			}
		}
	}
	static get_BODY() {
		if(ZPP_Flags.ListenerType_BODY == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.ListenerType_BODY = new ListenerType();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.ListenerType_BODY;
	}
	static get_CONSTRAINT() {
		if(ZPP_Flags.ListenerType_CONSTRAINT == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.ListenerType_CONSTRAINT = new ListenerType();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.ListenerType_CONSTRAINT;
	}
	static get_INTERACTION() {
		if(ZPP_Flags.ListenerType_INTERACTION == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.ListenerType_INTERACTION = new ListenerType();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.ListenerType_INTERACTION;
	}
	static get_PRE() {
		if(ZPP_Flags.ListenerType_PRE == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.ListenerType_PRE = new ListenerType();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.ListenerType_PRE;
	}
}
