import ZPP_CbTypeList from '../util/ZPP_CbTypeList.js';
import ZNPNode_ZPP_CbType from '../util/ZNPNode_ZPP_CbType.js';
import ZNPList_ZPP_CbType from '../util/ZNPList_ZPP_CbType.js';
import OptionType from '../../nape/callbacks/OptionType.js';
import CbTypeList from '../../nape/callbacks/CbTypeList.js';
import CbTypeIterator from '../../nape/callbacks/CbTypeIterator.js';
import CbType from '../../nape/callbacks/CbType.js';
export default class ZPP_OptionType {
	constructor() {
		this.wrap_excludes = null;
		this.wrap_includes = null;
		this.excludes = null;
		this.includes = null;
		this.handler = null;
		this.outer = null;
		this.includes = new ZNPList_ZPP_CbType();
		this.excludes = new ZNPList_ZPP_CbType();
	}
	setup_includes() {
		this.wrap_includes = ZPP_CbTypeList.get(this.includes,true);
	}
	setup_excludes() {
		this.wrap_excludes = ZPP_CbTypeList.get(this.excludes,true);
	}
	excluded(xs) {
		return this.nonemptyintersection(xs,this.excludes);
	}
	included(xs) {
		return this.nonemptyintersection(xs,this.includes);
	}
	compatible(xs) {
		if(this.nonemptyintersection(xs,this.includes)) {
			return !this.nonemptyintersection(xs,this.excludes);
		} else {
			return false;
		}
	}
	nonemptyintersection(xs,ys) {
		let ret = false;
		let xite = xs.head;
		let eite = ys.head;
		while(eite != null && xite != null) {
			let ex = eite.elt;
			let xi = xite.elt;
			if(ex == xi) {
				ret = true;
				break;
			} else if(ex.id < xi.id) {
				eite = eite.next;
			} else {
				xite = xite.next;
			}
		}
		return ret;
	}
	effect_change(val,included,added) {
		if(included) {
			if(added) {
				let pre = null;
				let cx_ite = this.includes.head;
				while(cx_ite != null) {
					let j = cx_ite.elt;
					if(val.id < j.id) {
						break;
					}
					pre = cx_ite;
					cx_ite = cx_ite.next;
				}
				let _this = this.includes;
				let ret;
				if(ZNPNode_ZPP_CbType.zpp_pool == null) {
					ret = new ZNPNode_ZPP_CbType();
				} else {
					ret = ZNPNode_ZPP_CbType.zpp_pool;
					ZNPNode_ZPP_CbType.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.elt = val;
				let temp = ret;
				if(pre == null) {
					temp.next = _this.head;
					_this.head = temp;
				} else {
					temp.next = pre.next;
					pre.next = temp;
				}
				_this.pushmod = _this.modified = true;
				_this.length++;
			} else {
				this.includes.remove(val);
			}
		} else if(added) {
			let pre = null;
			let cx_ite = this.excludes.head;
			while(cx_ite != null) {
				let j = cx_ite.elt;
				if(val.id < j.id) {
					break;
				}
				pre = cx_ite;
				cx_ite = cx_ite.next;
			}
			let _this = this.excludes;
			let ret;
			if(ZNPNode_ZPP_CbType.zpp_pool == null) {
				ret = new ZNPNode_ZPP_CbType();
			} else {
				ret = ZNPNode_ZPP_CbType.zpp_pool;
				ZNPNode_ZPP_CbType.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = val;
			let temp = ret;
			if(pre == null) {
				temp.next = _this.head;
				_this.head = temp;
			} else {
				temp.next = pre.next;
				pre.next = temp;
			}
			_this.pushmod = _this.modified = true;
			_this.length++;
		} else {
			this.excludes.remove(val);
		}
	}
	append_type(list,val) {
		if(list == this.includes) {
			if(!this.includes.has(val)) {
				if(!this.excludes.has(val)) {
					if(this.handler != null) {
						this.handler(val,true,true);
					} else {
						let pre = null;
						let cx_ite = this.includes.head;
						while(cx_ite != null) {
							let j = cx_ite.elt;
							if(val.id < j.id) {
								break;
							}
							pre = cx_ite;
							cx_ite = cx_ite.next;
						}
						let _this = this.includes;
						let ret;
						if(ZNPNode_ZPP_CbType.zpp_pool == null) {
							ret = new ZNPNode_ZPP_CbType();
						} else {
							ret = ZNPNode_ZPP_CbType.zpp_pool;
							ZNPNode_ZPP_CbType.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.elt = val;
						let temp = ret;
						if(pre == null) {
							temp.next = _this.head;
							_this.head = temp;
						} else {
							temp.next = pre.next;
							pre.next = temp;
						}
						_this.pushmod = _this.modified = true;
						_this.length++;
					}
				} else if(this.handler != null) {
					this.handler(val,false,false);
				} else {
					this.excludes.remove(val);
				}
			}
		} else if(!this.excludes.has(val)) {
			if(!this.includes.has(val)) {
				if(this.handler != null) {
					this.handler(val,false,true);
				} else {
					let pre = null;
					let cx_ite = this.excludes.head;
					while(cx_ite != null) {
						let j = cx_ite.elt;
						if(val.id < j.id) {
							break;
						}
						pre = cx_ite;
						cx_ite = cx_ite.next;
					}
					let _this = this.excludes;
					let ret;
					if(ZNPNode_ZPP_CbType.zpp_pool == null) {
						ret = new ZNPNode_ZPP_CbType();
					} else {
						ret = ZNPNode_ZPP_CbType.zpp_pool;
						ZNPNode_ZPP_CbType.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = val;
					let temp = ret;
					if(pre == null) {
						temp.next = _this.head;
						_this.head = temp;
					} else {
						temp.next = pre.next;
						pre.next = temp;
					}
					_this.pushmod = _this.modified = true;
					_this.length++;
				}
			} else if(this.handler != null) {
				this.handler(val,true,false);
			} else {
				this.includes.remove(val);
			}
		}
	}
	set(options) {
		if(options != this) {
			while(this.includes.head != null) this.append_type(this.excludes,this.includes.head.elt);
			while(this.excludes.head != null) this.append_type(this.includes,this.excludes.head.elt);
			let cx_ite = options.excludes.head;
			while(cx_ite != null) {
				let i = cx_ite.elt;
				this.append_type(this.excludes,i);
				cx_ite = cx_ite.next;
			}
			let cx_ite1 = options.includes.head;
			while(cx_ite1 != null) {
				let i = cx_ite1.elt;
				this.append_type(this.includes,i);
				cx_ite1 = cx_ite1.next;
			}
		}
		return this;
	}
	append(list,val) {
		if(val == null) {
			throw haxe_Exception.thrown("Error: Cannot append null, only CbType and CbType list values");
		}
		if(((val) instanceof CbType)) {
			let cb = val;
			this.append_type(list,cb.zpp_inner);
		} else if(((val) instanceof CbTypeList)) {
			let cbs = val;
			cbs.zpp_inner.valmod();
			let _g = CbTypeIterator.get(cbs);
			while(true) {
				_g.zpp_inner.zpp_inner.valmod();
				let _this = _g.zpp_inner;
				_this.zpp_inner.valmod();
				if(_this.zpp_inner.zip_length) {
					_this.zpp_inner.zip_length = false;
					_this.zpp_inner.user_length = _this.zpp_inner.inner.length;
				}
				let length = _this.zpp_inner.user_length;
				_g.zpp_critical = true;
				let tmp;
				if(_g.zpp_i < length) {
					tmp = true;
				} else {
					_g.zpp_next = CbTypeIterator.zpp_pool;
					CbTypeIterator.zpp_pool = _g;
					_g.zpp_inner = null;
					tmp = false;
				}
				if(!tmp) {
					break;
				}
				_g.zpp_critical = false;
				let cb = _g.zpp_inner.at(_g.zpp_i++);
				this.append_type(list,cb.zpp_inner);
			}
		} else if(((val) instanceof Array)) {
			let cbs = val;
			let _g = 0;
			while(_g < cbs.length) {
				let cb = cbs[_g];
				++_g;
				if(!((cb) instanceof CbType)) {
					throw haxe_Exception.thrown("Error: Cannot append non-CbType or CbType list value");
				}
				let cbx = cb;
				this.append_type(list,cbx.zpp_inner);
			}
		} else {
			throw haxe_Exception.thrown("Error: Cannot append non-CbType or CbType list value");
		}
	}
	static argument(val) {
		if(val == null) {
			return new OptionType();
		} else if(((val) instanceof OptionType)) {
			return val;
		} else {
			return new OptionType().including(val);
		}
	}
}
