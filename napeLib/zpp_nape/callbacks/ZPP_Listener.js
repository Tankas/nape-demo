import ZPP_Flags from '../util/ZPP_Flags.js';
import ZPP_ID from '../ZPP_ID.js';
import ListenerType from '../../nape/callbacks/ListenerType.js';
import CbEvent from '../../nape/callbacks/CbEvent.js';
export default class ZPP_Listener {
	constructor() {
		if(ZPP_Listener._hx_skip_constructor) {
			return;
		}
		this._hx_constructor();
	}
	_hx_constructor() {
		this.space = null;
		this.interaction = null;
		this.constraint = null;
		this.body = null;
		this.precedence = 0;
		this.event = 0;
		this.type = 0;
		this.id = 0;
		this.outer = null;
		this.id = ZPP_ID.Listener();
	}
	swapEvent(event) {
	}
	invalidate_precedence() {
	}
	addedToSpace() {
	}
	removedFromSpace() {
	}
	static setlt(a,b) {
		if(a.precedence <= b.precedence) {
			if(a.precedence == b.precedence) {
				return a.id > b.id;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
}
ZPP_Listener._hx_skip_constructor = false;
ZPP_Listener.internal = false;
ZPP_Listener.types = (function($this) {
	var $r;
	if(ZPP_Flags.ListenerType_BODY == null) {
		ZPP_Flags.internal = true;
		ZPP_Flags.ListenerType_BODY = new ListenerType();
		ZPP_Flags.internal = false;
	}
	let tmp = ZPP_Flags.ListenerType_BODY;
	if(ZPP_Flags.ListenerType_CONSTRAINT == null) {
		ZPP_Flags.internal = true;
		ZPP_Flags.ListenerType_CONSTRAINT = new ListenerType();
		ZPP_Flags.internal = false;
	}
	let tmp1 = ZPP_Flags.ListenerType_CONSTRAINT;
	if(ZPP_Flags.ListenerType_INTERACTION == null) {
		ZPP_Flags.internal = true;
		ZPP_Flags.ListenerType_INTERACTION = new ListenerType();
		ZPP_Flags.internal = false;
	}
	let tmp2 = ZPP_Flags.ListenerType_INTERACTION;
	if(ZPP_Flags.ListenerType_PRE == null) {
		ZPP_Flags.internal = true;
		ZPP_Flags.ListenerType_PRE = new ListenerType();
		ZPP_Flags.internal = false;
	}
	$r = [tmp,tmp1,tmp2,ZPP_Flags.ListenerType_PRE];
	return $r;
}(this));
ZPP_Listener.events = (function($this) {
	var $r;
	if(ZPP_Flags.CbEvent_BEGIN == null) {
		ZPP_Flags.internal = true;
		ZPP_Flags.CbEvent_BEGIN = new CbEvent();
		ZPP_Flags.internal = false;
	}
	let tmp = ZPP_Flags.CbEvent_BEGIN;
	if(ZPP_Flags.CbEvent_END == null) {
		ZPP_Flags.internal = true;
		ZPP_Flags.CbEvent_END = new CbEvent();
		ZPP_Flags.internal = false;
	}
	let tmp1 = ZPP_Flags.CbEvent_END;
	if(ZPP_Flags.CbEvent_WAKE == null) {
		ZPP_Flags.internal = true;
		ZPP_Flags.CbEvent_WAKE = new CbEvent();
		ZPP_Flags.internal = false;
	}
	let tmp2 = ZPP_Flags.CbEvent_WAKE;
	if(ZPP_Flags.CbEvent_SLEEP == null) {
		ZPP_Flags.internal = true;
		ZPP_Flags.CbEvent_SLEEP = new CbEvent();
		ZPP_Flags.internal = false;
	}
	let tmp3 = ZPP_Flags.CbEvent_SLEEP;
	if(ZPP_Flags.CbEvent_BREAK == null) {
		ZPP_Flags.internal = true;
		ZPP_Flags.CbEvent_BREAK = new CbEvent();
		ZPP_Flags.internal = false;
	}
	let tmp4 = ZPP_Flags.CbEvent_BREAK;
	if(ZPP_Flags.CbEvent_PRE == null) {
		ZPP_Flags.internal = true;
		ZPP_Flags.CbEvent_PRE = new CbEvent();
		ZPP_Flags.internal = false;
	}
	let tmp5 = ZPP_Flags.CbEvent_PRE;
	if(ZPP_Flags.CbEvent_ONGOING == null) {
		ZPP_Flags.internal = true;
		ZPP_Flags.CbEvent_ONGOING = new CbEvent();
		ZPP_Flags.internal = false;
	}
	$r = [tmp,tmp1,tmp2,tmp3,tmp4,tmp5,ZPP_Flags.CbEvent_ONGOING];
	return $r;
}(this));
