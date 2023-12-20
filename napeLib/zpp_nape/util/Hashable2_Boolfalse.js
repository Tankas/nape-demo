export default class Hashable2_Boolfalse {
	constructor() {
		this.di = 0;
		this.id = 0;
		this.hnext = null;
		this.next = null;
		this.value = false;
	}
	free() {
	}
	alloc() {
	}
	static get(id,di,val) {
		let ret;
		if(Hashable2_Boolfalse.zpp_pool == null) {
			ret = new Hashable2_Boolfalse();
		} else {
			ret = Hashable2_Boolfalse.zpp_pool;
			Hashable2_Boolfalse.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.id = id;
		ret.di = di;
		let ret1 = ret;
		ret1.value = val;
		return ret1;
	}
	static getpersist(id,di) {
		let ret;
		if(Hashable2_Boolfalse.zpp_pool == null) {
			ret = new Hashable2_Boolfalse();
		} else {
			ret = Hashable2_Boolfalse.zpp_pool;
			Hashable2_Boolfalse.zpp_pool = ret.next;
			ret.next = null;
		}
		ret.id = id;
		ret.di = di;
		return ret;
	}
	static ordered_get(id,di,val) {
		if(id <= di) {
			let ret;
			if(Hashable2_Boolfalse.zpp_pool == null) {
				ret = new Hashable2_Boolfalse();
			} else {
				ret = Hashable2_Boolfalse.zpp_pool;
				Hashable2_Boolfalse.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.id = id;
			ret.di = di;
			let ret1 = ret;
			ret1.value = val;
			return ret1;
		} else {
			let ret;
			if(Hashable2_Boolfalse.zpp_pool == null) {
				ret = new Hashable2_Boolfalse();
			} else {
				ret = Hashable2_Boolfalse.zpp_pool;
				Hashable2_Boolfalse.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.id = di;
			ret.di = id;
			let ret1 = ret;
			ret1.value = val;
			return ret1;
		}
	}
	static ordered_get_persist(id,di) {
		if(id <= di) {
			let ret;
			if(Hashable2_Boolfalse.zpp_pool == null) {
				ret = new Hashable2_Boolfalse();
			} else {
				ret = Hashable2_Boolfalse.zpp_pool;
				Hashable2_Boolfalse.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.id = id;
			ret.di = di;
			return ret;
		} else {
			let ret;
			if(Hashable2_Boolfalse.zpp_pool == null) {
				ret = new Hashable2_Boolfalse();
			} else {
				ret = Hashable2_Boolfalse.zpp_pool;
				Hashable2_Boolfalse.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.id = di;
			ret.di = id;
			return ret;
		}
	}
}
Hashable2_Boolfalse.zpp_pool = null;
