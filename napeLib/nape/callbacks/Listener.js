import ZPP_Listener from '../../zpp_nape/callbacks/ZPP_Listener.js';
import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
import CbEvent from './CbEvent.js';
export default class Listener {
	constructor() {
		if(Listener._hx_skip_constructor) {
			return;
		}
		this._hx_constructor();
	}
	_hx_constructor() {
		this.zpp_inner = null;
		if(!ZPP_Listener.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate Listener derp!");
		}
	}
	get_type() {
		return ZPP_Listener.types[this.zpp_inner.type];
	}
	get_event() {
		return ZPP_Listener.events[this.zpp_inner.event];
	}
	set_event(event) {
		if(event == null) {
			throw haxe_Exception.thrown("Error: Cannot set listener event type to null");
		}
		if(ZPP_Listener.events[this.zpp_inner.event] != event) {
			let xevent;
			if(ZPP_Flags.CbEvent_BEGIN == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.CbEvent_BEGIN = new CbEvent();
				ZPP_Flags.internal = false;
			}
			if(event == ZPP_Flags.CbEvent_BEGIN) {
				xevent = ZPP_Flags.id_CbEvent_BEGIN;
			} else {
				if(ZPP_Flags.CbEvent_ONGOING == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.CbEvent_ONGOING = new CbEvent();
					ZPP_Flags.internal = false;
				}
				if(event == ZPP_Flags.CbEvent_ONGOING) {
					xevent = ZPP_Flags.id_CbEvent_ONGOING;
				} else {
					if(ZPP_Flags.CbEvent_END == null) {
						ZPP_Flags.internal = true;
						ZPP_Flags.CbEvent_END = new CbEvent();
						ZPP_Flags.internal = false;
					}
					if(event == ZPP_Flags.CbEvent_END) {
						xevent = ZPP_Flags.id_CbEvent_END;
					} else {
						if(ZPP_Flags.CbEvent_SLEEP == null) {
							ZPP_Flags.internal = true;
							ZPP_Flags.CbEvent_SLEEP = new CbEvent();
							ZPP_Flags.internal = false;
						}
						if(event == ZPP_Flags.CbEvent_SLEEP) {
							xevent = ZPP_Flags.id_CbEvent_SLEEP;
						} else {
							if(ZPP_Flags.CbEvent_WAKE == null) {
								ZPP_Flags.internal = true;
								ZPP_Flags.CbEvent_WAKE = new CbEvent();
								ZPP_Flags.internal = false;
							}
							if(event == ZPP_Flags.CbEvent_WAKE) {
								xevent = ZPP_Flags.id_CbEvent_WAKE;
							} else {
								if(ZPP_Flags.CbEvent_PRE == null) {
									ZPP_Flags.internal = true;
									ZPP_Flags.CbEvent_PRE = new CbEvent();
									ZPP_Flags.internal = false;
								}
								xevent = event == ZPP_Flags.CbEvent_PRE ? ZPP_Flags.id_CbEvent_PRE : ZPP_Flags.id_CbEvent_BREAK;
							}
						}
					}
				}
			}
			this.zpp_inner.swapEvent(xevent);
		}
		return ZPP_Listener.events[this.zpp_inner.event];
	}
	get_precedence() {
		return this.zpp_inner.precedence;
	}
	set_precedence(precedence) {
		if(this.zpp_inner.precedence != precedence) {
			this.zpp_inner.precedence = precedence;
			this.zpp_inner.invalidate_precedence();
		}
		return this.zpp_inner.precedence;
	}
	get_space() {
		if(this.zpp_inner.space == null) {
			return null;
		} else {
			return this.zpp_inner.space.outer;
		}
	}
	set_space(space) {
		if((this.zpp_inner.space == null ? null : this.zpp_inner.space.outer) != space) {
			if(this.zpp_inner.space != null) {
				this.zpp_inner.space.outer.zpp_inner.wrap_listeners.remove(this);
			}
			if(space != null) {
				let _this = space.zpp_inner.wrap_listeners;
				if(_this.zpp_inner.reverse_flag) {
					_this.push(this);
				} else {
					_this.unshift(this);
				}
			} else {
				this.zpp_inner.space = null;
			}
		}
		if(this.zpp_inner.space == null) {
			return null;
		} else {
			return this.zpp_inner.space.outer;
		}
	}
	toString() {
		let event = ["BEGIN","END","WAKE","SLEEP","BREAK","PRE","ONGOING"][this.zpp_inner.event];
		if(this.zpp_inner.type == ZPP_Flags.id_ListenerType_BODY) {
			let body = this.zpp_inner.body;
			return "BodyListener{" + event + "::" + Std.string(body.outer_zn.zpp_inner_zn.options.outer) + "}";
		} else if(this.zpp_inner.type == ZPP_Flags.id_ListenerType_CONSTRAINT) {
			let con = this.zpp_inner.constraint;
			return "ConstraintListener{" + event + "::" + Std.string(con.outer_zn.zpp_inner_zn.options.outer) + "}";
		} else {
			let con = this.zpp_inner.interaction;
			let itype;
			let _g = con.itype;
			let x = _g;
			if(x == ZPP_Flags.id_InteractionType_COLLISION) {
				itype = "COLLISION";
			} else {
				let x = _g;
				if(x == ZPP_Flags.id_InteractionType_SENSOR) {
					itype = "SENSOR";
				} else {
					let x = _g;
					itype = x == ZPP_Flags.id_InteractionType_FLUID ? "FLUID" : "ALL";
				}
			}
			return (this.zpp_inner.type == ZPP_Flags.id_ListenerType_INTERACTION ? "InteractionListener{" + event + "#" + itype + "::" + Std.string(con.outer_zni.zpp_inner_zn.options1.outer) + ":" + Std.string(con.outer_zni.zpp_inner_zn.options2.outer) + "}" : "PreListener{" + itype + "::" + Std.string(con.outer_znp.zpp_inner_zn.options1.outer) + ":" + Std.string(con.outer_znp.zpp_inner_zn.options2.outer) + "}") + " precedence=" + this.zpp_inner.precedence;
		}
	}
}
Listener._hx_skip_constructor = false;
