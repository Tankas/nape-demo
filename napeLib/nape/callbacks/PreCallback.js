import Callback from './Callback.js';
export default class PreCallback extends Callback {
	constructor() {
		super();
	}
	get_arbiter() {
		return this.zpp_inner.pre_arbiter.wrapper();
	}
	get_int1() {
		return this.zpp_inner.int1.outer_i;
	}
	get_int2() {
		return this.zpp_inner.int2.outer_i;
	}
	get_swapped() {
		return this.zpp_inner.pre_swapped;
	}
	toString() {
		let ret = "Cb:PRE:";
		ret += ":" + this.zpp_inner.int1.outer_i.toString() + "/" + this.zpp_inner.int2.outer_i.toString();
		ret += " : " + this.zpp_inner.pre_arbiter.wrapper().toString();
		ret += " : listnener: " + Std.string(this.zpp_inner.listener.outer);
		return ret;
	}
}
