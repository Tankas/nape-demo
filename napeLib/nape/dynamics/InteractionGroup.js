import ZPP_InteractionGroupList from '../../zpp_nape/util/ZPP_InteractionGroupList.js';
import ZPP_InteractorList from '../../zpp_nape/util/ZPP_InteractorList.js';
import ZPP_InteractionGroup from '../../zpp_nape/dynamics/ZPP_InteractionGroup.js';
export default class InteractionGroup {
	constructor(ignore) {
		if(ignore == null) {
			ignore = false;
		}
		this.zpp_inner = null;
		this.zpp_inner = new ZPP_InteractionGroup();
		this.zpp_inner.outer = this;
		if(this.zpp_inner.ignore != ignore) {
			this.zpp_inner.invalidate(true);
			this.zpp_inner.ignore = ignore;
		}
	}
	get_group() {
		if(this.zpp_inner.group == null) {
			return null;
		} else {
			return this.zpp_inner.group.outer;
		}
	}
	set_group(group) {
		if(group == this) {
			throw haxe_Exception.thrown("Error: Cannot assign InteractionGroup to itself");
		}
		this.zpp_inner.setGroup(group == null ? null : group.zpp_inner);
		if(this.zpp_inner.group == null) {
			return null;
		} else {
			return this.zpp_inner.group.outer;
		}
	}
	get_ignore() {
		return this.zpp_inner.ignore;
	}
	set_ignore(ignore) {
		if(this.zpp_inner.ignore != ignore) {
			this.zpp_inner.invalidate(true);
			this.zpp_inner.ignore = ignore;
		}
		return this.zpp_inner.ignore;
	}
	get_interactors() {
		if(this.zpp_inner.wrap_interactors == null) {
			this.zpp_inner.wrap_interactors = ZPP_InteractorList.get(this.zpp_inner.interactors,true);
		}
		return this.zpp_inner.wrap_interactors;
	}
	get_groups() {
		if(this.zpp_inner.wrap_groups == null) {
			this.zpp_inner.wrap_groups = ZPP_InteractionGroupList.get(this.zpp_inner.groups,true);
		}
		return this.zpp_inner.wrap_groups;
	}
	toString() {
		let ret = "InteractionGroup";
		if(this.zpp_inner.ignore) {
			ret += ":ignore";
		}
		return ret;
	}
}
