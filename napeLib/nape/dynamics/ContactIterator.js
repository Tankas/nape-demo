import ZPP_ContactList from '../../zpp_nape/util/ZPP_ContactList.js';
export default class ContactIterator {
	constructor() {
		this.zpp_next = null;
		this.zpp_critical = false;
		this.zpp_i = 0;
		this.zpp_inner = null;
		if(!ZPP_ContactList.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate " + "Contact" + "Iterator derp!");
		}
	}
	hasNext() {
		this.zpp_inner.zpp_inner.valmod();
		let _this = this.zpp_inner;
		_this.zpp_inner.valmod();
		if(_this.zpp_inner.zip_length) {
			_this.zpp_inner.zip_length = false;
			_this.zpp_inner.user_length = 0;
			let cx_ite = _this.zpp_inner.inner.next;
			while(cx_ite != null) {
				let i = cx_ite;
				if(i.active && i.arbiter.active) {
					_this.zpp_inner.user_length++;
				}
				cx_ite = cx_ite.next;
			}
		}
		let length = _this.zpp_inner.user_length;
		this.zpp_critical = true;
		if(this.zpp_i < length) {
			return true;
		} else {
			this.zpp_next = ContactIterator.zpp_pool;
			ContactIterator.zpp_pool = this;
			this.zpp_inner = null;
			return false;
		}
	}
	next() {
		this.zpp_critical = false;
		return this.zpp_inner.at(this.zpp_i++);
	}
	static get(list) {
		let ret;
		if(ContactIterator.zpp_pool == null) {
			ZPP_ContactList.internal = true;
			let ret1 = new ContactIterator();
			ZPP_ContactList.internal = false;
			ret = ret1;
		} else {
			let r = ContactIterator.zpp_pool;
			ContactIterator.zpp_pool = r.zpp_next;
			ret = r;
		}
		ret.zpp_i = 0;
		ret.zpp_inner = list;
		ret.zpp_critical = false;
		return ret;
	}
}
ContactIterator.zpp_pool = null;
