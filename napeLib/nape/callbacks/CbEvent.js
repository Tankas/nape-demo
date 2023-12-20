import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
export default class CbEvent {
	constructor() {
		if(!ZPP_Flags.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate " + "CbEvent" + " derp!");
		}
	}
	toString() {
		if(ZPP_Flags.CbEvent_PRE == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.CbEvent_PRE = new CbEvent();
			ZPP_Flags.internal = false;
		}
		if(this == ZPP_Flags.CbEvent_PRE) {
			return "PRE";
		} else {
			if(ZPP_Flags.CbEvent_BEGIN == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.CbEvent_BEGIN = new CbEvent();
				ZPP_Flags.internal = false;
			}
			if(this == ZPP_Flags.CbEvent_BEGIN) {
				return "BEGIN";
			} else {
				if(ZPP_Flags.CbEvent_ONGOING == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.CbEvent_ONGOING = new CbEvent();
					ZPP_Flags.internal = false;
				}
				if(this == ZPP_Flags.CbEvent_ONGOING) {
					return "ONGOING";
				} else {
					if(ZPP_Flags.CbEvent_END == null) {
						ZPP_Flags.internal = true;
						ZPP_Flags.CbEvent_END = new CbEvent();
						ZPP_Flags.internal = false;
					}
					if(this == ZPP_Flags.CbEvent_END) {
						return "END";
					} else {
						if(ZPP_Flags.CbEvent_WAKE == null) {
							ZPP_Flags.internal = true;
							ZPP_Flags.CbEvent_WAKE = new CbEvent();
							ZPP_Flags.internal = false;
						}
						if(this == ZPP_Flags.CbEvent_WAKE) {
							return "WAKE";
						} else {
							if(ZPP_Flags.CbEvent_SLEEP == null) {
								ZPP_Flags.internal = true;
								ZPP_Flags.CbEvent_SLEEP = new CbEvent();
								ZPP_Flags.internal = false;
							}
							if(this == ZPP_Flags.CbEvent_SLEEP) {
								return "SLEEP";
							} else {
								if(ZPP_Flags.CbEvent_BREAK == null) {
									ZPP_Flags.internal = true;
									ZPP_Flags.CbEvent_BREAK = new CbEvent();
									ZPP_Flags.internal = false;
								}
								if(this == ZPP_Flags.CbEvent_BREAK) {
									return "BREAK";
								} else {
									return "";
								}
							}
						}
					}
				}
			}
		}
	}
	static get_BEGIN() {
		if(ZPP_Flags.CbEvent_BEGIN == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.CbEvent_BEGIN = new CbEvent();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.CbEvent_BEGIN;
	}
	static get_ONGOING() {
		if(ZPP_Flags.CbEvent_ONGOING == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.CbEvent_ONGOING = new CbEvent();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.CbEvent_ONGOING;
	}
	static get_END() {
		if(ZPP_Flags.CbEvent_END == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.CbEvent_END = new CbEvent();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.CbEvent_END;
	}
	static get_WAKE() {
		if(ZPP_Flags.CbEvent_WAKE == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.CbEvent_WAKE = new CbEvent();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.CbEvent_WAKE;
	}
	static get_SLEEP() {
		if(ZPP_Flags.CbEvent_SLEEP == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.CbEvent_SLEEP = new CbEvent();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.CbEvent_SLEEP;
	}
	static get_BREAK() {
		if(ZPP_Flags.CbEvent_BREAK == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.CbEvent_BREAK = new CbEvent();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.CbEvent_BREAK;
	}
	static get_PRE() {
		if(ZPP_Flags.CbEvent_PRE == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.CbEvent_PRE = new CbEvent();
			ZPP_Flags.internal = false;
		}
		return ZPP_Flags.CbEvent_PRE;
	}
}
