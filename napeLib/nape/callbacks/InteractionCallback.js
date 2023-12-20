import Callback from './Callback.js';
export default class InteractionCallback extends Callback {
	constructor() {
		super();
	}
	get_int1() {
		return this.zpp_inner.int1.outer_i;
	}
	get_int2() {
		return this.zpp_inner.int2.outer_i;
	}
	get_arbiters() {
		return this.zpp_inner.wrap_arbiters;
	}
	toString() {
		let ret = "Cb:";
		ret += ["BEGIN","END","","","","","ONGOING"][this.zpp_inner.event];
		ret += ":" + this.zpp_inner.int1.outer_i.toString() + "/" + this.zpp_inner.int2.outer_i.toString();
		ret += " : " + this.zpp_inner.wrap_arbiters.toString();
		ret += " : listener: " + Std.string(this.zpp_inner.listener.outer);
		return ret;
	}
}
