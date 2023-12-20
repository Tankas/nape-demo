import ZPP_CbTypeList from '../util/ZPP_CbTypeList.js';
import ZNPNode_ZPP_CbType from '../util/ZNPNode_ZPP_CbType.js';
import ZNPList_ZPP_CallbackSet from '../util/ZNPList_ZPP_CallbackSet.js';
import ZNPList_ZPP_CbType from '../util/ZNPList_ZPP_CbType.js';
import ZPP_CbSet from '../callbacks/ZPP_CbSet.js';
import ZPP_ID from '../ZPP_ID.js';
import CbTypeIterator from '../../nape/callbacks/CbTypeIterator.js';
export default class ZPP_Interactor {
	constructor() {
		if(ZPP_Interactor._hx_skip_constructor) {
			return;
		}
		this._hx_constructor();
	}
	_hx_constructor() {
		this.wrap_cbTypes = null;
		this.cbSet = null;
		this.cbTypes = null;
		this.group = null;
		this.cbsets = null;
		this.icompound = null;
		this.ibody = null;
		this.ishape = null;
		this.userData = null;
		this.id = 0;
		this.outer_i = null;
		this.id = ZPP_ID.Interactor();
		this.cbsets = new ZNPList_ZPP_CallbackSet();
		this.cbTypes = new ZNPList_ZPP_CbType();
	}
	isShape() {
		return this.ishape != null;
	}
	isBody() {
		return this.ibody != null;
	}
	isCompound() {
		return this.icompound != null;
	}
	__iaddedToSpace() {
		if(this.group != null) {
			this.group.interactors.add(this);
		}
		let cx_ite = this.cbTypes.head;
		while(cx_ite != null) {
			let cb = cx_ite.elt;
			cb.interactors.add(this);
			cx_ite = cx_ite.next;
		}
		this.alloc_cbSet();
	}
	__iremovedFromSpace() {
		if(this.group != null) {
			this.group.interactors.remove(this);
		}
		let cx_ite = this.cbTypes.head;
		while(cx_ite != null) {
			let cb = cx_ite.elt;
			cb.interactors.remove(this);
			cx_ite = cx_ite.next;
		}
		this.dealloc_cbSet();
	}
	wake() {
		if(this.ishape != null) {
			let body = this.ishape.body;
			if(body != null && body.space != null) {
				body.space.non_inlined_wake(body);
			}
		} else if(this.ibody != null) {
			if(this.ibody.space != null) {
				this.ibody.space.non_inlined_wake(this.ibody);
			}
		} else if(this.icompound.space != null) {
			this.icompound.space.wakeCompound(this.icompound);
		}
	}
	getSpace() {
		if(this.ishape != null) {
			if(this.ishape.body == null) {
				return null;
			} else {
				return this.ishape.body.space;
			}
		} else if(this.ibody != null) {
			return this.ibody.space;
		} else {
			return this.icompound.space;
		}
	}
	setupcbTypes() {
		this.wrap_cbTypes = ZPP_CbTypeList.get(this.cbTypes);
		this.wrap_cbTypes.zpp_inner.adder = $bind(this,this.wrap_cbTypes_adder);
		this.wrap_cbTypes.zpp_inner.subber = $bind(this,this.wrap_cbTypes_subber);
		this.wrap_cbTypes.zpp_inner.dontremove = true;
		this.wrap_cbTypes.zpp_inner._modifiable = $bind(this,this.immutable_cbTypes);
	}
	immutable_cbTypes() {
		this.immutable_midstep("Interactor::cbTypes");
	}
	wrap_cbTypes_subber(pcb) {
		let cb = pcb.zpp_inner;
		if(this.cbTypes.has(cb)) {
			let space = this.ishape != null ? this.ishape.body == null ? null : this.ishape.body.space : this.ibody != null ? this.ibody.space : this.icompound.space;
			if(space != null) {
				this.dealloc_cbSet();
				cb.interactors.remove(this);
			}
			this.cbTypes.remove(cb);
			if(space != null) {
				this.alloc_cbSet();
				this.wake();
			}
		}
	}
	wrap_cbTypes_adder(cb) {
		this.insert_cbtype(cb.zpp_inner);
		return false;
	}
	insert_cbtype(cb) {
		if(!this.cbTypes.has(cb)) {
			let space = this.ishape != null ? this.ishape.body == null ? null : this.ishape.body.space : this.ibody != null ? this.ibody.space : this.icompound.space;
			if(space != null) {
				this.dealloc_cbSet();
				cb.interactors.add(this);
			}
			let pre = null;
			let cx_ite = this.cbTypes.head;
			while(cx_ite != null) {
				let j = cx_ite.elt;
				if(cb.id < j.id) {
					break;
				}
				pre = cx_ite;
				cx_ite = cx_ite.next;
			}
			let _this = this.cbTypes;
			let ret;
			if(ZNPNode_ZPP_CbType.zpp_pool == null) {
				ret = new ZNPNode_ZPP_CbType();
			} else {
				ret = ZNPNode_ZPP_CbType.zpp_pool;
				ZNPNode_ZPP_CbType.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = cb;
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
			if(space != null) {
				this.alloc_cbSet();
				this.wake();
			}
		}
	}
	alloc_cbSet() {
		let space = this.ishape != null ? this.ishape.body == null ? null : this.ishape.body.space : this.ibody != null ? this.ibody.space : this.icompound.space;
		if((this.cbSet = space.cbsets.get(this.cbTypes)) != null) {
			this.cbSet.count++;
			this.cbSet.interactors.add(this);
			this.cbSet.validate();
			space.freshInteractorType(this);
		}
	}
	dealloc_cbSet() {
		let space = this.ishape != null ? this.ishape.body == null ? null : this.ishape.body.space : this.ibody != null ? this.ibody.space : this.icompound.space;
		if(this.cbSet != null) {
			this.cbSet.interactors.remove(this);
			space.nullInteractorType(this);
			if(--this.cbSet.count == 0) {
				space.cbsets.remove(this.cbSet);
				let o = this.cbSet;
				o.listeners.clear();
				o.zip_listeners = true;
				o.bodylisteners.clear();
				o.zip_bodylisteners = true;
				o.conlisteners.clear();
				o.zip_conlisteners = true;
				while(o.cbTypes.head != null) {
					let cb = o.cbTypes.pop_unsafe();
					cb.cbsets.remove(o);
				}
				o.next = ZPP_CbSet.zpp_pool;
				ZPP_CbSet.zpp_pool = o;
			}
			this.cbSet = null;
		}
	}
	setGroup(group) {
		if(this.group != group) {
			let inspace = (this.ishape != null ? this.ishape.body == null ? null : this.ishape.body.space : this.ibody != null ? this.ibody.space : this.icompound.space) != null;
			if(inspace && this.group != null) {
				this.group.interactors.remove(this);
			}
			this.group = group;
			if(inspace && group != null) {
				group.interactors.add(this);
			}
			if(inspace) {
				if(this.ishape != null) {
					this.ishape.body.wake();
				} else if(this.ibody != null) {
					this.ibody.wake();
				} else {
					this.icompound.wake();
				}
			}
		}
	}
	immutable_midstep(n) {
		if(this.ibody != null) {
			let _this = this.ibody;
			if(_this.space != null && _this.space.midstep) {
				throw haxe_Exception.thrown("Error: " + n + " cannot be set during a space step()");
			}
		} else if(this.ishape != null) {
			this.ishape.__immutable_midstep(n);
		} else {
			this.icompound.__imutable_midstep(n);
		}
	}
	lookup_group() {
		let cur = this;
		while(cur != null && cur.group == null) if(cur.ishape != null) {
			cur = cur.ishape.body;
		} else if(cur.icompound != null) {
			cur = cur.icompound.compound;
		} else {
			cur = cur.ibody.compound;
		}
		if(cur == null) {
			return null;
		} else {
			return cur.group;
		}
	}
	copyto(ret) {
		ret.zpp_inner_i.group = this.group;
		let _this = this.outer_i;
		if(_this.zpp_inner_i.wrap_cbTypes == null) {
			_this.zpp_inner_i.setupcbTypes();
		}
		let _this1 = _this.zpp_inner_i.wrap_cbTypes;
		_this1.zpp_inner.valmod();
		let _g = CbTypeIterator.get(_this1);
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
			if(ret.zpp_inner_i.wrap_cbTypes == null) {
				ret.zpp_inner_i.setupcbTypes();
			}
			let _this1 = ret.zpp_inner_i.wrap_cbTypes;
			if(_this1.zpp_inner.reverse_flag) {
				_this1.push(cb);
			} else {
				_this1.unshift(cb);
			}
		}
		if(this.userData != null) {
			ret.zpp_inner_i.userData = Reflect.copy(this.userData);
		}
	}
	static get(i1,i2) {
		let id = i1.id < i2.id ? i1.id : i2.id;
		let di = i1.id < i2.id ? i2.id : i1.id;
		let xs = i1.cbsets.length < i2.cbsets.length ? i1.cbsets : i2.cbsets;
		let ret = null;
		let cx_ite = xs.head;
		while(cx_ite != null) {
			let x = cx_ite.elt;
			if(x.id == id && x.di == di) {
				ret = x;
				break;
			}
			cx_ite = cx_ite.next;
		}
		return ret;
	}
	static int_callback(set,x,cb) {
		let o1 = set.int1;
		let o2 = set.int2;
		let tmp;
		let _this = x.options1;
		let xs = o1.cbTypes;
		if(_this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes)) {
			let _this = x.options2;
			let xs = o2.cbTypes;
			tmp = _this.nonemptyintersection(xs,_this.includes) && !_this.nonemptyintersection(xs,_this.excludes);
		} else {
			tmp = false;
		}
		if(tmp) {
			cb.int1 = o1;
			cb.int2 = o2;
		} else {
			cb.int1 = o2;
			cb.int2 = o1;
		}
	}
}
ZPP_Interactor._hx_skip_constructor = false;
