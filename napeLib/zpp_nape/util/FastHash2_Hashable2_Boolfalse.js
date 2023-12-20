export default class FastHash2_Hashable2_Boolfalse {
	constructor() {
		this.cnt = 0;
		this.table = null;
		this.cnt = 0;
		this.table = [];
		let _g = 0;
		let _g1 = 1048576;
		while(_g < _g1) {
			let i = _g++;
			this.table.push(null);
		}
	}
	empty() {
		return this.cnt == 0;
	}
	clear() {
		let _g = 0;
		let _g1 = this.table.length;
		while(_g < _g1) {
			let i = _g++;
			let n = this.table[i];
			if(n == null) {
				continue;
			}
			while(n != null) {
				let t = n.hnext;
				n.hnext = null;
				n = t;
			}
			this.table[i] = null;
		}
	}
	get(id,di) {
		let n = this.table[id * 106039 + di & 1048575];
		if(n == null) {
			return null;
		} else if(n.id == id && n.di == di) {
			return n;
		} else {
			while(true) {
				n = n.hnext;
				if(!(n != null && (n.id != id || n.di != di))) {
					break;
				}
			}
			return n;
		}
	}
	ordered_get(id,di) {
		if(id > di) {
			let t = id;
			id = di;
			di = t;
		}
		let n = this.table[id * 106039 + di & 1048575];
		if(n == null) {
			return null;
		} else if(n.id == id && n.di == di) {
			return n;
		} else {
			while(true) {
				n = n.hnext;
				if(!(n != null && (n.id != id || n.di != di))) {
					break;
				}
			}
			return n;
		}
	}
	has(id,di) {
		let n = this.table[id * 106039 + di & 1048575];
		if(n == null) {
			return false;
		} else if(n.id == id && n.di == di) {
			return true;
		} else {
			while(true) {
				n = n.hnext;
				if(!(n != null && (n.id != id || n.di != di))) {
					break;
				}
			}
			return n != null;
		}
	}
	maybeAdd(arb) {
		let h = arb.id * 106039 + arb.di & 1048575;
		let n = this.table[h];
		let cont = true;
		if(n == null) {
			this.table[h] = arb;
			arb.hnext = null;
		} else if(cont) {
			arb.hnext = n.hnext;
			n.hnext = arb;
		}
		if(cont) {
			this.cnt++;
		}
	}
	add(arb) {
		let h = arb.id * 106039 + arb.di & 1048575;
		let n = this.table[h];
		if(n == null) {
			this.table[h] = arb;
			arb.hnext = null;
		} else {
			arb.hnext = n.hnext;
			n.hnext = arb;
		}
		this.cnt++;
	}
	remove(arb) {
		let h = arb.id * 106039 + arb.di & 1048575;
		let n = this.table[h];
		if(n == arb) {
			this.table[h] = n.hnext;
		} else if(n != null) {
			let pre;
			while(true) {
				pre = n;
				n = n.hnext;
				if(!(n != null && n != arb)) {
					break;
				}
			}
			pre.hnext = n.hnext;
		}
		arb.hnext = null;
		this.cnt--;
	}
	hash(id,di) {
		return id * 106039 + di & 1048575;
	}
}
