import ArbiterList from '../../nape/dynamics/ArbiterList.js';
import Arbiter from '../../nape/dynamics/Arbiter.js';
export default class ZPP_SpaceArbiterList extends ArbiterList {
	constructor() {
		ArbiterList._hx_skip_constructor = true;
		super();
		ArbiterList._hx_skip_constructor = false;
		this._hx_constructor();
	}
	_hx_constructor() {
		this.at_index_3 = 0;
		this.at_index_2 = 0;
		this.at_index_1 = 0;
		this.at_index_0 = 0;
		this.ite_3 = null;
		this.ite_2 = null;
		this.ite_1 = null;
		this.ite_0 = null;
		this.lengths = null;
		this.zip_length = false;
		this._length = 0;
		this.space = null;
		super._hx_constructor();
		this.at_index_0 = 0;
		this.at_index_1 = 0;
		this.at_index_2 = 0;
		this.at_index_3 = 0;
		this.zip_length = true;
		this._length = 0;
		this.lengths = [];
		this.lengths.push(0);
		this.lengths.push(0);
		this.lengths.push(0);
		this.lengths.push(0);
	}
	zpp_gl() {
		this.zpp_vm();
		if(this.zip_length) {
			this._length = 0;
			let ind = 0;
			let len = 0;
			let cx_ite = this.space.c_arbiters_true.head;
			while(cx_ite != null) {
				let i = cx_ite.elt;
				if(i.active) {
					++len;
				}
				cx_ite = cx_ite.next;
			}
			this.lengths[ind++] = len;
			this._length += len;
			let len1 = 0;
			let cx_ite1 = this.space.c_arbiters_false.head;
			while(cx_ite1 != null) {
				let i = cx_ite1.elt;
				if(i.active) {
					++len1;
				}
				cx_ite1 = cx_ite1.next;
			}
			this.lengths[ind++] = len1;
			this._length += len1;
			let len2 = 0;
			let cx_ite2 = this.space.f_arbiters.head;
			while(cx_ite2 != null) {
				let i = cx_ite2.elt;
				if(i.active) {
					++len2;
				}
				cx_ite2 = cx_ite2.next;
			}
			this.lengths[ind++] = len2;
			this._length += len2;
			let len3 = 0;
			let cx_ite3 = this.space.s_arbiters.head;
			while(cx_ite3 != null) {
				let i = cx_ite3.elt;
				if(i.active) {
					++len3;
				}
				cx_ite3 = cx_ite3.next;
			}
			this.lengths[ind++] = len3;
			this._length += len3;
			this.zip_length = false;
		}
		return this._length;
	}
	zpp_vm() {
		let modified = false;
		if(this.space.c_arbiters_true.modified) {
			modified = true;
			this.space.c_arbiters_true.modified = false;
		}
		if(this.space.c_arbiters_false.modified) {
			modified = true;
			this.space.c_arbiters_false.modified = false;
		}
		if(this.space.f_arbiters.modified) {
			modified = true;
			this.space.f_arbiters.modified = false;
		}
		if(this.space.s_arbiters.modified) {
			modified = true;
			this.space.s_arbiters.modified = false;
		}
		if(modified) {
			this.zip_length = true;
			this._length = 0;
			this.ite_0 = null;
			this.ite_1 = null;
			this.ite_2 = null;
			this.ite_3 = null;
		}
	}
	push(obj) {
		throw haxe_Exception.thrown("Error: ArbiterList is immutable");
	}
	pop() {
		throw haxe_Exception.thrown("Error: ArbiterList is immutable");
	}
	unshift(obj) {
		throw haxe_Exception.thrown("Error: ArbiterList is immutable");
	}
	shift() {
		throw haxe_Exception.thrown("Error: ArbiterList is immutable");
	}
	remove(obj) {
		throw haxe_Exception.thrown("Error: ArbiterList is immutable");
	}
	clear() {
		throw haxe_Exception.thrown("Error: ArbiterList is immutable");
	}
	at(index) {
		this.zpp_vm();
		if(index < 0 || index >= this.zpp_gl()) {
			throw haxe_Exception.thrown("Error: Index out of bounds");
		}
		let ret = null;
		let accum_length = 0;
		if(ret == null) {
			if(index < accum_length + this.lengths[0]) {
				let offset = index - accum_length;
				if(offset < this.at_index_0 || this.ite_0 == null) {
					this.at_index_0 = 0;
					this.ite_0 = this.space.c_arbiters_true.head;
					while(true) {
						let x = this.ite_0.elt;
						if(x.active) {
							break;
						}
						this.ite_0 = this.ite_0.next;
					}
				}
				while(this.at_index_0 != offset) {
					this.at_index_0++;
					this.ite_0 = this.ite_0.next;
					while(true) {
						let x = this.ite_0.elt;
						if(x.active) {
							break;
						}
						this.ite_0 = this.ite_0.next;
					}
				}
				ret = this.ite_0.elt.wrapper();
			} else {
				accum_length += this.lengths[0];
			}
		}
		if(ret == null) {
			if(index < accum_length + this.lengths[1]) {
				let offset = index - accum_length;
				if(offset < this.at_index_1 || this.ite_1 == null) {
					this.at_index_1 = 0;
					this.ite_1 = this.space.c_arbiters_false.head;
					while(true) {
						let x = this.ite_1.elt;
						if(x.active) {
							break;
						}
						this.ite_1 = this.ite_1.next;
					}
				}
				while(this.at_index_1 != offset) {
					this.at_index_1++;
					this.ite_1 = this.ite_1.next;
					while(true) {
						let x = this.ite_1.elt;
						if(x.active) {
							break;
						}
						this.ite_1 = this.ite_1.next;
					}
				}
				ret = this.ite_1.elt.wrapper();
			} else {
				accum_length += this.lengths[1];
			}
		}
		if(ret == null) {
			if(index < accum_length + this.lengths[2]) {
				let offset = index - accum_length;
				if(offset < this.at_index_2 || this.ite_2 == null) {
					this.at_index_2 = 0;
					this.ite_2 = this.space.f_arbiters.head;
					while(true) {
						let x = this.ite_2.elt;
						if(x.active) {
							break;
						}
						this.ite_2 = this.ite_2.next;
					}
				}
				while(this.at_index_2 != offset) {
					this.at_index_2++;
					this.ite_2 = this.ite_2.next;
					while(true) {
						let x = this.ite_2.elt;
						if(x.active) {
							break;
						}
						this.ite_2 = this.ite_2.next;
					}
				}
				ret = this.ite_2.elt.wrapper();
			} else {
				accum_length += this.lengths[2];
			}
		}
		if(ret == null) {
			if(index < accum_length + this.lengths[3]) {
				let offset = index - accum_length;
				if(offset < this.at_index_3 || this.ite_3 == null) {
					this.at_index_3 = 0;
					this.ite_3 = this.space.s_arbiters.head;
					while(true) {
						let x = this.ite_3.elt;
						if(x.active) {
							break;
						}
						this.ite_3 = this.ite_3.next;
					}
				}
				while(this.at_index_3 != offset) {
					this.at_index_3++;
					this.ite_3 = this.ite_3.next;
					while(true) {
						let x = this.ite_3.elt;
						if(x.active) {
							break;
						}
						this.ite_3 = this.ite_3.next;
					}
				}
				ret = this.ite_3.elt.wrapper();
			} else {
				accum_length += this.lengths[3];
			}
		}
		return ret;
	}
}
