import ZPP_OptionType from '../../zpp_nape/callbacks/ZPP_OptionType.js';
import ZPP_InteractionListener from '../../zpp_nape/callbacks/ZPP_InteractionListener.js';
import ZPP_Listener from '../../zpp_nape/callbacks/ZPP_Listener.js';
import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
import InteractionType from './InteractionType.js';
import CbEvent from './CbEvent.js';
import Listener from './Listener.js';
export default class InteractionListener extends Listener {
	constructor(event,interactionType,options1,options2,handler,precedence) {
		Listener._hx_skip_constructor = true;
		super();
		Listener._hx_skip_constructor = false;
		this._hx_constructor(event,interactionType,options1,options2,handler,precedence);
	}
	_hx_constructor(event,interactionType,options1,options2,handler,precedence) {
		if(precedence == null) {
			precedence = 0;
		}
		this.zpp_inner_zn = null;
		ZPP_Listener.internal = true;
		super._hx_constructor();
		ZPP_Listener.internal = false;
		if(handler == null) {
			throw haxe_Exception.thrown("Error: InteractionListener::handler cannot be null");
		}
		if(event == null) {
			throw haxe_Exception.thrown("Error: CbEvent cannot be null for InteractionListener");
		}
		let xevent = -1;
		if(ZPP_Flags.CbEvent_BEGIN == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.CbEvent_BEGIN = new CbEvent();
			ZPP_Flags.internal = false;
		}
		if(event == ZPP_Flags.CbEvent_BEGIN) {
			xevent = ZPP_Flags.id_CbEvent_BEGIN;
		} else {
			if(ZPP_Flags.CbEvent_END == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.CbEvent_END = new CbEvent();
				ZPP_Flags.internal = false;
			}
			if(event == ZPP_Flags.CbEvent_END) {
				xevent = ZPP_Flags.id_CbEvent_END;
			} else {
				if(ZPP_Flags.CbEvent_ONGOING == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.CbEvent_ONGOING = new CbEvent();
					ZPP_Flags.internal = false;
				}
				if(event == ZPP_Flags.CbEvent_ONGOING) {
					xevent = ZPP_Flags.id_CbEvent_ONGOING;
				} else {
					throw haxe_Exception.thrown("Error: CbEvent '" + event.toString() + "' is not a valid event type for InteractionListener");
				}
			}
		}
		this.zpp_inner_zn = new ZPP_InteractionListener(ZPP_OptionType.argument(options1),ZPP_OptionType.argument(options2),xevent,ZPP_Flags.id_ListenerType_INTERACTION);
		this.zpp_inner = this.zpp_inner_zn;
		this.zpp_inner.outer = this;
		this.zpp_inner_zn.outer_zni = this;
		this.zpp_inner.precedence = precedence;
		this.zpp_inner_zn.handleri = handler;
		if(interactionType == null) {
			throw haxe_Exception.thrown("Error: Cannot set listener interaction type to null");
		}
		let ret = this.zpp_inner_zn.itype;
		let tmp;
		if(ret == ZPP_Flags.id_InteractionType_COLLISION) {
			if(ZPP_Flags.InteractionType_COLLISION == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_COLLISION = new InteractionType();
				ZPP_Flags.internal = false;
			}
			tmp = ZPP_Flags.InteractionType_COLLISION;
		} else if(ret == ZPP_Flags.id_InteractionType_SENSOR) {
			if(ZPP_Flags.InteractionType_SENSOR == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_SENSOR = new InteractionType();
				ZPP_Flags.internal = false;
			}
			tmp = ZPP_Flags.InteractionType_SENSOR;
		} else if(ret == ZPP_Flags.id_InteractionType_FLUID) {
			if(ZPP_Flags.InteractionType_FLUID == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_FLUID = new InteractionType();
				ZPP_Flags.internal = false;
			}
			tmp = ZPP_Flags.InteractionType_FLUID;
		} else if(ret == ZPP_Flags.id_InteractionType_ANY) {
			if(ZPP_Flags.InteractionType_ANY == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_ANY = new InteractionType();
				ZPP_Flags.internal = false;
			}
			tmp = ZPP_Flags.InteractionType_ANY;
		} else {
			tmp = null;
		}
		if(tmp != interactionType) {
			let xtype;
			if(ZPP_Flags.InteractionType_COLLISION == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_COLLISION = new InteractionType();
				ZPP_Flags.internal = false;
			}
			if(interactionType == ZPP_Flags.InteractionType_COLLISION) {
				xtype = ZPP_Flags.id_InteractionType_COLLISION;
			} else {
				if(ZPP_Flags.InteractionType_SENSOR == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.InteractionType_SENSOR = new InteractionType();
					ZPP_Flags.internal = false;
				}
				if(interactionType == ZPP_Flags.InteractionType_SENSOR) {
					xtype = ZPP_Flags.id_InteractionType_SENSOR;
				} else {
					if(ZPP_Flags.InteractionType_FLUID == null) {
						ZPP_Flags.internal = true;
						ZPP_Flags.InteractionType_FLUID = new InteractionType();
						ZPP_Flags.internal = false;
					}
					xtype = interactionType == ZPP_Flags.InteractionType_FLUID ? ZPP_Flags.id_InteractionType_FLUID : ZPP_Flags.id_InteractionType_ANY;
				}
			}
			this.zpp_inner_zn.itype = xtype;
		}
		let ret1 = this.zpp_inner_zn.itype;
		if(ret1 == ZPP_Flags.id_InteractionType_COLLISION) {
			if(ZPP_Flags.InteractionType_COLLISION == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_COLLISION = new InteractionType();
				ZPP_Flags.internal = false;
			}
		} else if(ret1 == ZPP_Flags.id_InteractionType_SENSOR) {
			if(ZPP_Flags.InteractionType_SENSOR == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_SENSOR = new InteractionType();
				ZPP_Flags.internal = false;
			}
		} else if(ret1 == ZPP_Flags.id_InteractionType_FLUID) {
			if(ZPP_Flags.InteractionType_FLUID == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_FLUID = new InteractionType();
				ZPP_Flags.internal = false;
			}
		} else if(ret1 == ZPP_Flags.id_InteractionType_ANY) {
			if(ZPP_Flags.InteractionType_ANY == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_ANY = new InteractionType();
				ZPP_Flags.internal = false;
			}
		}
	}
	get_options1() {
		return this.zpp_inner_zn.options1.outer;
	}
	set_options1(options1) {
		this.zpp_inner_zn.options1.set(options1.zpp_inner);
		return this.zpp_inner_zn.options1.outer;
	}
	get_options2() {
		return this.zpp_inner_zn.options2.outer;
	}
	set_options2(options2) {
		this.zpp_inner_zn.options2.set(options2.zpp_inner);
		return this.zpp_inner_zn.options2.outer;
	}
	get_interactionType() {
		let ret = this.zpp_inner_zn.itype;
		if(ret == ZPP_Flags.id_InteractionType_COLLISION) {
			if(ZPP_Flags.InteractionType_COLLISION == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_COLLISION = new InteractionType();
				ZPP_Flags.internal = false;
			}
			return ZPP_Flags.InteractionType_COLLISION;
		} else if(ret == ZPP_Flags.id_InteractionType_SENSOR) {
			if(ZPP_Flags.InteractionType_SENSOR == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_SENSOR = new InteractionType();
				ZPP_Flags.internal = false;
			}
			return ZPP_Flags.InteractionType_SENSOR;
		} else if(ret == ZPP_Flags.id_InteractionType_FLUID) {
			if(ZPP_Flags.InteractionType_FLUID == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_FLUID = new InteractionType();
				ZPP_Flags.internal = false;
			}
			return ZPP_Flags.InteractionType_FLUID;
		} else if(ret == ZPP_Flags.id_InteractionType_ANY) {
			if(ZPP_Flags.InteractionType_ANY == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_ANY = new InteractionType();
				ZPP_Flags.internal = false;
			}
			return ZPP_Flags.InteractionType_ANY;
		} else {
			return null;
		}
	}
	set_interactionType(interactionType) {
		if(interactionType == null) {
			throw haxe_Exception.thrown("Error: Cannot set listener interaction type to null");
		}
		let ret = this.zpp_inner_zn.itype;
		let tmp;
		if(ret == ZPP_Flags.id_InteractionType_COLLISION) {
			if(ZPP_Flags.InteractionType_COLLISION == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_COLLISION = new InteractionType();
				ZPP_Flags.internal = false;
			}
			tmp = ZPP_Flags.InteractionType_COLLISION;
		} else if(ret == ZPP_Flags.id_InteractionType_SENSOR) {
			if(ZPP_Flags.InteractionType_SENSOR == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_SENSOR = new InteractionType();
				ZPP_Flags.internal = false;
			}
			tmp = ZPP_Flags.InteractionType_SENSOR;
		} else if(ret == ZPP_Flags.id_InteractionType_FLUID) {
			if(ZPP_Flags.InteractionType_FLUID == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_FLUID = new InteractionType();
				ZPP_Flags.internal = false;
			}
			tmp = ZPP_Flags.InteractionType_FLUID;
		} else if(ret == ZPP_Flags.id_InteractionType_ANY) {
			if(ZPP_Flags.InteractionType_ANY == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_ANY = new InteractionType();
				ZPP_Flags.internal = false;
			}
			tmp = ZPP_Flags.InteractionType_ANY;
		} else {
			tmp = null;
		}
		if(tmp != interactionType) {
			let xtype;
			if(ZPP_Flags.InteractionType_COLLISION == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_COLLISION = new InteractionType();
				ZPP_Flags.internal = false;
			}
			if(interactionType == ZPP_Flags.InteractionType_COLLISION) {
				xtype = ZPP_Flags.id_InteractionType_COLLISION;
			} else {
				if(ZPP_Flags.InteractionType_SENSOR == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.InteractionType_SENSOR = new InteractionType();
					ZPP_Flags.internal = false;
				}
				if(interactionType == ZPP_Flags.InteractionType_SENSOR) {
					xtype = ZPP_Flags.id_InteractionType_SENSOR;
				} else {
					if(ZPP_Flags.InteractionType_FLUID == null) {
						ZPP_Flags.internal = true;
						ZPP_Flags.InteractionType_FLUID = new InteractionType();
						ZPP_Flags.internal = false;
					}
					xtype = interactionType == ZPP_Flags.InteractionType_FLUID ? ZPP_Flags.id_InteractionType_FLUID : ZPP_Flags.id_InteractionType_ANY;
				}
			}
			this.zpp_inner_zn.itype = xtype;
		}
		let ret1 = this.zpp_inner_zn.itype;
		if(ret1 == ZPP_Flags.id_InteractionType_COLLISION) {
			if(ZPP_Flags.InteractionType_COLLISION == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_COLLISION = new InteractionType();
				ZPP_Flags.internal = false;
			}
			return ZPP_Flags.InteractionType_COLLISION;
		} else if(ret1 == ZPP_Flags.id_InteractionType_SENSOR) {
			if(ZPP_Flags.InteractionType_SENSOR == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_SENSOR = new InteractionType();
				ZPP_Flags.internal = false;
			}
			return ZPP_Flags.InteractionType_SENSOR;
		} else if(ret1 == ZPP_Flags.id_InteractionType_FLUID) {
			if(ZPP_Flags.InteractionType_FLUID == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_FLUID = new InteractionType();
				ZPP_Flags.internal = false;
			}
			return ZPP_Flags.InteractionType_FLUID;
		} else if(ret1 == ZPP_Flags.id_InteractionType_ANY) {
			if(ZPP_Flags.InteractionType_ANY == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.InteractionType_ANY = new InteractionType();
				ZPP_Flags.internal = false;
			}
			return ZPP_Flags.InteractionType_ANY;
		} else {
			return null;
		}
	}
	get_handler() {
		return this.zpp_inner_zn.handleri;
	}
	set_handler(handler) {
		if(handler == null) {
			throw haxe_Exception.thrown("Error: InteractionListener::handler cannot be null");
		}
		this.zpp_inner_zn.handleri = handler;
		return this.zpp_inner_zn.handleri;
	}
	get_allowSleepingCallbacks() {
		return this.zpp_inner_zn.allowSleepingCallbacks;
	}
	set_allowSleepingCallbacks(allowSleepingCallbacks) {
		this.zpp_inner_zn.allowSleepingCallbacks = allowSleepingCallbacks;
		return this.zpp_inner_zn.allowSleepingCallbacks;
	}
}
