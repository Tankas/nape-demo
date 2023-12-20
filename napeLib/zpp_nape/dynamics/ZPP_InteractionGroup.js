import ZNPList_ZPP_InteractionGroup from '../util/ZNPList_ZPP_InteractionGroup.js';
import ZNPList_ZPP_Interactor from '../util/ZNPList_ZPP_Interactor.js';
export default class ZPP_InteractionGroup {
	constructor() {
		this.depth = 0;
		this.wrap_interactors = null;
		this.interactors = null;
		this.wrap_groups = null;
		this.groups = null;
		this.group = null;
		this.ignore = false;
		this.outer = null;
		this.depth = 0;
		this.groups = new ZNPList_ZPP_InteractionGroup();
		this.interactors = new ZNPList_ZPP_Interactor();
	}
	setGroup(group) {
		if(this.group != group) {
			if(this.group != null) {
				this.group.groups.remove(this);
				this.depth = 0;
				this.group.invalidate(true);
			}
			this.group = group;
			if(group != null) {
				group.groups.add(this);
				this.depth = group.depth + 1;
				group.invalidate(true);
			} else {
				this.invalidate(true);
			}
		}
	}
	invalidate(force) {
		if(force == null) {
			force = false;
		}
		if(!(force || this.ignore)) {
			return;
		}
		let cx_ite = this.interactors.head;
		while(cx_ite != null) {
			let b = cx_ite.elt;
			if(b.ibody != null) {
				b.ibody.wake();
			} else if(b.ishape != null) {
				b.ishape.body.wake();
			} else {
				b.icompound.wake();
			}
			cx_ite = cx_ite.next;
		}
		let cx_ite1 = this.groups.head;
		while(cx_ite1 != null) {
			let g = cx_ite1.elt;
			g.invalidate(force);
			cx_ite1 = cx_ite1.next;
		}
	}
	addGroup(group) {
		this.groups.add(group);
		group.depth = this.depth + 1;
	}
	remGroup(group) {
		this.groups.remove(group);
		group.depth = 0;
	}
	addInteractor(intx) {
		this.interactors.add(intx);
	}
	remInteractor(intx,flag) {
		if(flag == null) {
			flag = -1;
		}
		this.interactors.remove(intx);
	}
}
ZPP_InteractionGroup.SHAPE = 1;
ZPP_InteractionGroup.BODY = 2;
