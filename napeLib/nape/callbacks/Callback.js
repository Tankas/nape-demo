import ZPP_Listener from '../../zpp_nape/callbacks/ZPP_Listener.js';
import ZPP_Callback from '../../zpp_nape/callbacks/ZPP_Callback.js';
export default class Callback {
	constructor() {
		this.zpp_inner = null;
		if(!ZPP_Callback.internal) {
			throw haxe_Exception.thrown("Error: Callback cannot be instantiated derp!");
		}
	}
	get_event() {
		return ZPP_Listener.events[this.zpp_inner.event];
	}
	get_listener() {
		return this.zpp_inner.listener.outer;
	}
	toString() {
		return "";
	}
}
