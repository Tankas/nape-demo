import ZPP_OptionType from '../../zpp_nape/callbacks/ZPP_OptionType.js';
import ZPP_ConstraintListener from '../../zpp_nape/callbacks/ZPP_ConstraintListener.js';
import ZPP_Listener from '../../zpp_nape/callbacks/ZPP_Listener.js';
import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
import CbEvent from './CbEvent.js';
import Listener from './Listener.js';
export default class ConstraintListener extends Listener {
	constructor(event,options,handler,precedence) {
		Listener._hx_skip_constructor = true;
		super();
		Listener._hx_skip_constructor = false;
		this._hx_constructor(event,options,handler,precedence);
	}
	_hx_constructor(event,options,handler,precedence) {
		if(precedence == null) {
			precedence = 0;
		}
		this.zpp_inner_zn = null;
		ZPP_Listener.internal = true;
		super._hx_constructor();
		ZPP_Listener.internal = false;
		if(handler == null) {
			throw haxe_Exception.thrown("Error: ConstraintListener::handler cannot be null");
		}
		let xevent = -1;
		if(ZPP_Flags.CbEvent_WAKE == null) {
			ZPP_Flags.internal = true;
			ZPP_Flags.CbEvent_WAKE = new CbEvent();
			ZPP_Flags.internal = false;
		}
		if(event == ZPP_Flags.CbEvent_WAKE) {
			xevent = ZPP_Flags.id_CbEvent_WAKE;
		} else {
			if(ZPP_Flags.CbEvent_SLEEP == null) {
				ZPP_Flags.internal = true;
				ZPP_Flags.CbEvent_SLEEP = new CbEvent();
				ZPP_Flags.internal = false;
			}
			if(event == ZPP_Flags.CbEvent_SLEEP) {
				xevent = ZPP_Flags.id_CbEvent_SLEEP;
			} else {
				if(ZPP_Flags.CbEvent_BREAK == null) {
					ZPP_Flags.internal = true;
					ZPP_Flags.CbEvent_BREAK = new CbEvent();
					ZPP_Flags.internal = false;
				}
				if(event == ZPP_Flags.CbEvent_BREAK) {
					xevent = ZPP_Flags.id_CbEvent_BREAK;
				} else {
					throw haxe_Exception.thrown("Error: cbEvent '" + event.toString() + "' is not a valid event type for a ConstraintListener");
				}
			}
		}
		this.zpp_inner_zn = new ZPP_ConstraintListener(ZPP_OptionType.argument(options),xevent,handler);
		this.zpp_inner = this.zpp_inner_zn;
		this.zpp_inner.outer = this;
		this.zpp_inner_zn.outer_zn = this;
		this.zpp_inner.precedence = precedence;
	}
	get_options() {
		return this.zpp_inner_zn.options.outer;
	}
	set_options(options) {
		this.zpp_inner_zn.options.set(options.zpp_inner);
		return this.zpp_inner_zn.options.outer;
	}
	get_handler() {
		return this.zpp_inner_zn.handler;
	}
	set_handler(handler) {
		if(handler == null) {
			throw haxe_Exception.thrown("Error: ConstraintListener::handler cannot be null");
		}
		this.zpp_inner_zn.handler = handler;
		return this.zpp_inner_zn.handler;
	}
}
