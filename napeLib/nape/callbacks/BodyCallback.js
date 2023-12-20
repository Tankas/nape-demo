import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
import Callback from './Callback.js';
export default class BodyCallback extends Callback {
	constructor() {
		super();
	}
	get_body() {
		return this.zpp_inner.body.outer;
	}
	toString() {
		let ret = "Cb:";
		ret += ["WAKE","SLEEP"][this.zpp_inner.event - ZPP_Flags.id_CbEvent_WAKE];
		ret += ":" + this.zpp_inner.body.outer.toString();
		ret += " : listener: " + Std.string(this.zpp_inner.listener.outer);
		return ret;
	}
}
