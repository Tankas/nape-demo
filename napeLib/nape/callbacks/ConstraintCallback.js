import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
import Callback from './Callback.js';
export default class ConstraintCallback extends Callback {
	constructor() {
		super();
	}
	get_constraint() {
		return this.zpp_inner.constraint.outer;
	}
	toString() {
		let ret = "Cb:";
		ret += ["WAKE","SLEEP","BREAK"][this.zpp_inner.event - ZPP_Flags.id_CbEvent_WAKE];
		ret += ":" + this.zpp_inner.constraint.outer.toString();
		ret += " : listener: " + Std.string(this.zpp_inner.listener.outer);
		return ret;
	}
}
