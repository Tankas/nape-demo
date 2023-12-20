import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
export default class PreFlag {
	constructor() {
		if(!ZPP_Flags.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate " + "PreFlag" + " derp!");
		}
	}
	toString() {
		if(ZPP_Flags.PreFlag_ACCEPT == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.PreFlag_ACCEPT = new PreFlag();
			ZPP_Flags.internal = false;
		}
		if(this == ZPP_Flags.PreFlag_ACCEPT) {
			return "ACCEPT";
		} else {
			if(ZPP_Flags.PreFlag_IGNORE == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.PreFlag_IGNORE = new PreFlag();
				ZPP_Flags.internal = false;
			}
			if(this == ZPP_Flags.PreFlag_IGNORE) {
				return "IGNORE";
			} else {
				if(ZPP_Flags.PreFlag_ACCEPT_ONCE == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.PreFlag_ACCEPT_ONCE = new PreFlag();
					ZPP_Flags.internal = false;
				}
				if(this == ZPP_Flags.PreFlag_ACCEPT_ONCE) {
					return "ACCEPT_ONCE";
				} else {
					if(ZPP_Flags.PreFlag_IGNORE_ONCE == null) {
						ZPP_Flags.internal = true;
						ZPP_Flags.PreFlag_IGNORE_ONCE = new PreFlag();
						ZPP_Flags.internal = false;
					}
					if(this == ZPP_Flags.PreFlag_IGNORE_ONCE) {
						return "IGNORE_ONCE";
					} else {
						return "";
					}
				}
			}
		}
	}
	static get_ACCEPT() {
		if(ZPP_Flags.PreFlag_ACCEPT == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.PreFlag_ACCEPT = new PreFlag();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.PreFlag_ACCEPT;
	}
	static get_IGNORE() {
		if(ZPP_Flags.PreFlag_IGNORE == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.PreFlag_IGNORE = new PreFlag();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.PreFlag_IGNORE;
	}
	static get_ACCEPT_ONCE() {
		if(ZPP_Flags.PreFlag_ACCEPT_ONCE == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.PreFlag_ACCEPT_ONCE = new PreFlag();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.PreFlag_ACCEPT_ONCE;
	}
	static get_IGNORE_ONCE() {
		if(ZPP_Flags.PreFlag_IGNORE_ONCE == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.PreFlag_IGNORE_ONCE = new PreFlag();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.PreFlag_IGNORE_ONCE;
	}
}
