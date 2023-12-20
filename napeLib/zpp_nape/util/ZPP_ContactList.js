import ZPP_Contact from '../dynamics/ZPP_Contact.js';
import ContactList from '../../nape/dynamics/ContactList.js';
export default class ZPP_ContactList {
	constructor() {
		this.user_length = 0;
		this.zip_length = false;
		this.push_ite = null;
		this.at_ite = null;
		this.at_index = 0;
		this.reverse_flag = false;
		this.dontremove = false;
		this.subber = null;
		this.post_adder = null;
		this.adder = null;
		this._modifiable = null;
		this._validate = null;
		this._invalidate = null;
		this._invalidated = false;
		this.immutable = false;
		this.inner = null;
		this.outer = null;
		this.inner = new ZPP_Contact();
		this._invalidated = true;
	}
	valmod() {
		this.validate();
		if(this.inner.modified) {
			if(this.inner.pushmod) {
				this.push_ite = null;
			}
			this.at_ite = null;
			this.inner.modified = false;
			this.inner.pushmod = false;
			this.zip_length = true;
		}
	}
	modified() {
		this.zip_length = true;
		this.at_ite = null;
		this.push_ite = null;
	}
	modify_test() {
		if(this._modifiable != null) {
			this._modifiable();
		}
	}
	validate() {
		if(this._invalidated) {
			this._invalidated = false;
			if(this._validate != null) {
				this._validate();
			}
		}
	}
	invalidate() {
		this._invalidated = true;
		if(this._invalidate != null) {
			this._invalidate(this);
		}
	}
	static get(list,imm) {
		if(imm == null) {
			imm = false;
		}
		let ret = new ContactList();
		ret.zpp_inner.inner = list;
		if(imm) {
			ret.zpp_inner.immutable = true;
		}
		ret.zpp_inner.zip_length = true;
		return ret;
	}
}
ZPP_ContactList.internal = false;
