export default class ZPP_Set_ZPP_SimpleVert {
	constructor() {
		this.colour = 0;
		this.parent = null;
		this.next = null;
		this.prev = null;
		this.data = null;
		this.swapped = null;
		this.lt = null;
	}
	free() {
		this.data = null;
		this.lt = null;
		this.swapped = null;
	}
	alloc() {
	}
	verify() {
		if(!this.empty()) {
			let set_ite = this.parent;
			while(set_ite.prev != null) set_ite = set_ite.prev;
			while(set_ite != null) {
				let i = set_ite.data;
				let prei = true;
				if(!this.empty()) {
					let set_ite = this.parent;
					while(set_ite.prev != null) set_ite = set_ite.prev;
					while(set_ite != null) {
						let j = set_ite.data;
						if(!prei) {
							if(!this.lt(i,j) && this.lt(j,i)) {
								return false;
							}
						} else if(i == j) {
							prei = false;
						} else if(!this.lt(j,i) && this.lt(i,j)) {
							return false;
						}
						if(set_ite.next != null) {
							set_ite = set_ite.next;
							while(set_ite.prev != null) set_ite = set_ite.prev;
						} else {
							while(set_ite.parent != null && set_ite == set_ite.parent.next) set_ite = set_ite.parent;
							set_ite = set_ite.parent;
						}
					}
				}
				if(set_ite.next != null) {
					set_ite = set_ite.next;
					while(set_ite.prev != null) set_ite = set_ite.prev;
				} else {
					while(set_ite.parent != null && set_ite == set_ite.parent.next) set_ite = set_ite.parent;
					set_ite = set_ite.parent;
				}
			}
		}
		return true;
	}
	empty() {
		return this.parent == null;
	}
	singular() {
		if(this.parent != null && this.parent.prev == null) {
			return this.parent.next == null;
		} else {
			return false;
		}
	}
	size() {
		let ret = 0;
		if(!this.empty()) {
			let set_ite = this.parent;
			while(set_ite.prev != null) set_ite = set_ite.prev;
			while(set_ite != null) {
				let i = set_ite.data;
				++ret;
				if(set_ite.next != null) {
					set_ite = set_ite.next;
					while(set_ite.prev != null) set_ite = set_ite.prev;
				} else {
					while(set_ite.parent != null && set_ite == set_ite.parent.next) set_ite = set_ite.parent;
					set_ite = set_ite.parent;
				}
			}
		}
		return ret;
	}
	has(obj) {
		return this.find(obj) != null;
	}
	find(obj) {
		let cur = this.parent;
		while(cur != null && cur.data != obj) if(this.lt(obj,cur.data)) {
			cur = cur.prev;
		} else {
			cur = cur.next;
		}
		return cur;
	}
	has_weak(obj) {
		return this.find_weak(obj) != null;
	}
	find_weak(obj) {
		let cur = this.parent;
		while(cur != null) if(this.lt(obj,cur.data)) {
			cur = cur.prev;
		} else if(this.lt(cur.data,obj)) {
			cur = cur.next;
		} else {
			break;
		}
		return cur;
	}
	lower_bound(obj) {
		let ret = null;
		if(!this.empty()) {
			let set_ite = this.parent;
			while(set_ite.prev != null) set_ite = set_ite.prev;
			while(set_ite != null) {
				let elt = set_ite.data;
				if(!this.lt(elt,obj)) {
					ret = elt;
					break;
				}
				if(set_ite.next != null) {
					set_ite = set_ite.next;
					while(set_ite.prev != null) set_ite = set_ite.prev;
				} else {
					while(set_ite.parent != null && set_ite == set_ite.parent.next) set_ite = set_ite.parent;
					set_ite = set_ite.parent;
				}
			}
		}
		return ret;
	}
	first() {
		let cur = this.parent;
		while(cur.prev != null) cur = cur.prev;
		return cur.data;
	}
	pop_front() {
		let cur = this.parent;
		while(cur.prev != null) cur = cur.prev;
		let ret = cur.data;
		this.remove_node(cur);
		return ret;
	}
	remove(obj) {
		let node = this.find(obj);
		this.remove_node(node);
	}
	successor_node(cur) {
		if(cur.next != null) {
			cur = cur.next;
			while(cur.prev != null) cur = cur.prev;
		} else {
			let pre = cur;
			cur = cur.parent;
			while(cur != null && cur.prev != pre) {
				pre = cur;
				cur = cur.parent;
			}
		}
		return cur;
	}
	predecessor_node(cur) {
		if(cur.prev != null) {
			cur = cur.prev;
			while(cur.next != null) cur = cur.next;
		} else {
			let pre = cur;
			cur = cur.parent;
			while(cur != null && cur.next != pre) {
				pre = cur;
				cur = cur.parent;
			}
		}
		return cur;
	}
	successor(obj) {
		let node = this.successor_node(this.find(obj));
		if(node == null) {
			return null;
		} else {
			return node.data;
		}
	}
	predecessor(obj) {
		let node = this.predecessor_node(this.find(obj));
		if(node == null) {
			return null;
		} else {
			return node.data;
		}
	}
	remove_node(cur) {
		if(cur.next != null && cur.prev != null) {
			let sm = cur.next;
			while(sm.prev != null) sm = sm.prev;
			let t = cur.data;
			cur.data = sm.data;
			sm.data = t;
			if(this.swapped != null) {
				this.swapped(cur.data,sm.data);
			}
			cur = sm;
		}
		let child = cur.prev == null ? cur.next : cur.prev;
		if(cur.colour == 1) {
			if(cur.prev != null || cur.next != null) {
				child.colour = 1;
			} else if(cur.parent != null) {
				let parent = cur.parent;
				while(true) {
					parent.colour++;
					parent.prev.colour--;
					parent.next.colour--;
					let child = parent.prev;
					if(child.colour == -1) {
						this.__fix_neg_red(child);
						break;
					} else if(child.colour == 0) {
						if(child.prev != null && child.prev.colour == 0) {
							this.__fix_dbl_red(child.prev);
							break;
						}
						if(child.next != null && child.next.colour == 0) {
							this.__fix_dbl_red(child.next);
							break;
						}
					}
					let child1 = parent.next;
					if(child1.colour == -1) {
						this.__fix_neg_red(child1);
						break;
					} else if(child1.colour == 0) {
						if(child1.prev != null && child1.prev.colour == 0) {
							this.__fix_dbl_red(child1.prev);
							break;
						}
						if(child1.next != null && child1.next.colour == 0) {
							this.__fix_dbl_red(child1.next);
							break;
						}
					}
					if(parent.colour == 2) {
						if(parent.parent == null) {
							parent.colour = 1;
						} else {
							parent = parent.parent;
							continue;
						}
					}
					break;
				}
			}
		}
		let par = cur.parent;
		if(par == null) {
			this.parent = child;
		} else if(par.prev == cur) {
			par.prev = child;
		} else {
			par.next = child;
		}
		if(child != null) {
			child.parent = par;
		}
		cur.parent = cur.prev = cur.next = null;
		let o = cur;
		o.data = null;
		o.lt = null;
		o.swapped = null;
		o.next = ZPP_Set_ZPP_SimpleVert.zpp_pool;
		ZPP_Set_ZPP_SimpleVert.zpp_pool = o;
	}
	clear() {
		if(this.parent != null) {
			let cur = this.parent;
			while(cur != null) if(cur.prev != null) {
				cur = cur.prev;
			} else if(cur.next != null) {
				cur = cur.next;
			} else {
				let ret = cur.parent;
				if(ret != null) {
					if(cur == ret.prev) {
						ret.prev = null;
					} else {
						ret.next = null;
					}
					cur.parent = null;
				}
				let o = cur;
				o.data = null;
				o.lt = null;
				o.swapped = null;
				o.next = ZPP_Set_ZPP_SimpleVert.zpp_pool;
				ZPP_Set_ZPP_SimpleVert.zpp_pool = o;
				cur = ret;
			}
			this.parent = null;
		}
	}
	clear_with(lambda) {
		if(this.parent == null) {
			return;
		} else {
			let cur = this.parent;
			while(cur != null) if(cur.prev != null) {
				cur = cur.prev;
			} else if(cur.next != null) {
				cur = cur.next;
			} else {
				lambda(cur.data);
				let ret = cur.parent;
				if(ret != null) {
					if(cur == ret.prev) {
						ret.prev = null;
					} else {
						ret.next = null;
					}
					cur.parent = null;
				}
				let o = cur;
				o.data = null;
				o.lt = null;
				o.swapped = null;
				o.next = ZPP_Set_ZPP_SimpleVert.zpp_pool;
				ZPP_Set_ZPP_SimpleVert.zpp_pool = o;
				cur = ret;
			}
			this.parent = null;
		}
	}
	clear_node(node,lambda) {
		lambda(node.data);
		let ret = node.parent;
		if(ret != null) {
			if(node == ret.prev) {
				ret.prev = null;
			} else {
				ret.next = null;
			}
			node.parent = null;
		}
		let o = node;
		o.data = null;
		o.lt = null;
		o.swapped = null;
		o.next = ZPP_Set_ZPP_SimpleVert.zpp_pool;
		ZPP_Set_ZPP_SimpleVert.zpp_pool = o;
		return ret;
	}
	__fix_neg_red(negred) {
		let parent = negred.parent;
		let child;
		if(parent.prev == negred) {
			let nl = negred.prev;
			let nr = negred.next;
			let trl = nr.prev;
			let trr = nr.next;
			nl.colour = 0;
			negred.colour = parent.colour = 1;
			negred.next = trl;
			if(trl != null) {
				trl.parent = negred;
			}
			let t = parent.data;
			parent.data = nr.data;
			nr.data = t;
			if(this.swapped != null) {
				this.swapped(parent.data,nr.data);
			}
			nr.prev = trr;
			if(trr != null) {
				trr.parent = nr;
			}
			nr.next = parent.next;
			if(parent.next != null) {
				parent.next.parent = nr;
			}
			parent.next = nr;
			if(nr != null) {
				nr.parent = parent;
			}
			child = nl;
		} else {
			let nl = negred.next;
			let nr = negred.prev;
			let trl = nr.next;
			let trr = nr.prev;
			nl.colour = 0;
			negred.colour = parent.colour = 1;
			negred.prev = trl;
			if(trl != null) {
				trl.parent = negred;
			}
			let t = parent.data;
			parent.data = nr.data;
			nr.data = t;
			if(this.swapped != null) {
				this.swapped(parent.data,nr.data);
			}
			nr.next = trr;
			if(trr != null) {
				trr.parent = nr;
			}
			nr.prev = parent.prev;
			if(parent.prev != null) {
				parent.prev.parent = nr;
			}
			parent.prev = nr;
			if(nr != null) {
				nr.parent = parent;
			}
			child = nl;
		}
		if(child.prev != null && child.prev.colour == 0) {
			this.__fix_dbl_red(child.prev);
		} else if(child.next != null && child.next.colour == 0) {
			this.__fix_dbl_red(child.next);
		}
	}
	__fix_dbl_red(x) {
		while(true) {
			let par = x.parent;
			let g = par.parent;
			if(g == null) {
				par.colour = 1;
				break;
			}
			let n1;
			let n2;
			let n3;
			let t1;
			let t2;
			let t3;
			let t4;
			if(par == g.prev) {
				n3 = g;
				t4 = g.next;
				if(x == par.prev) {
					n1 = x;
					n2 = par;
					t1 = x.prev;
					t2 = x.next;
					t3 = par.next;
				} else {
					n1 = par;
					n2 = x;
					t1 = par.prev;
					t2 = x.prev;
					t3 = x.next;
				}
			} else {
				n1 = g;
				t1 = g.prev;
				if(x == par.prev) {
					n2 = x;
					n3 = par;
					t2 = x.prev;
					t3 = x.next;
					t4 = par.next;
				} else {
					n2 = par;
					n3 = x;
					t2 = par.prev;
					t3 = x.prev;
					t4 = x.next;
				}
			}
			let par1 = g.parent;
			if(par1 == null) {
				this.parent = n2;
			} else if(par1.prev == g) {
				par1.prev = n2;
			} else {
				par1.next = n2;
			}
			if(n2 != null) {
				n2.parent = par1;
			}
			n1.prev = t1;
			if(t1 != null) {
				t1.parent = n1;
			}
			n1.next = t2;
			if(t2 != null) {
				t2.parent = n1;
			}
			n2.prev = n1;
			if(n1 != null) {
				n1.parent = n2;
			}
			n2.next = n3;
			if(n3 != null) {
				n3.parent = n2;
			}
			n3.prev = t3;
			if(t3 != null) {
				t3.parent = n3;
			}
			n3.next = t4;
			if(t4 != null) {
				t4.parent = n3;
			}
			n2.colour = g.colour - 1;
			n1.colour = 1;
			n3.colour = 1;
			if(n2 == this.parent) {
				this.parent.colour = 1;
			} else if(n2.colour == 0 && n2.parent.colour == 0) {
				x = n2;
				continue;
			}
			break;
		}
	}
	try_insert_bool(obj) {
		let x = null;
		let cur = null;
		if(this.parent == null) {
			if(ZPP_Set_ZPP_SimpleVert.zpp_pool == null) {
				x = new ZPP_Set_ZPP_SimpleVert();
			} else {
				x = ZPP_Set_ZPP_SimpleVert.zpp_pool;
				ZPP_Set_ZPP_SimpleVert.zpp_pool = x.next;
				x.next = null;
			}
			x.data = obj;
			this.parent = x;
		} else {
			cur = this.parent;
			while(true) if(this.lt(obj,cur.data)) {
				if(cur.prev == null) {
					if(ZPP_Set_ZPP_SimpleVert.zpp_pool == null) {
						x = new ZPP_Set_ZPP_SimpleVert();
					} else {
						x = ZPP_Set_ZPP_SimpleVert.zpp_pool;
						ZPP_Set_ZPP_SimpleVert.zpp_pool = x.next;
						x.next = null;
					}
					x.data = obj;
					cur.prev = x;
					x.parent = cur;
					break;
				} else {
					cur = cur.prev;
				}
			} else if(this.lt(cur.data,obj)) {
				if(cur.next == null) {
					if(ZPP_Set_ZPP_SimpleVert.zpp_pool == null) {
						x = new ZPP_Set_ZPP_SimpleVert();
					} else {
						x = ZPP_Set_ZPP_SimpleVert.zpp_pool;
						ZPP_Set_ZPP_SimpleVert.zpp_pool = x.next;
						x.next = null;
					}
					x.data = obj;
					cur.next = x;
					x.parent = cur;
					break;
				} else {
					cur = cur.next;
				}
			} else {
				break;
			}
		}
		if(x == null) {
			return false;
		} else {
			if(x.parent == null) {
				x.colour = 1;
			} else {
				x.colour = 0;
				if(x.parent.colour == 0) {
					this.__fix_dbl_red(x);
				}
			}
			return true;
		}
	}
	try_insert(obj) {
		let x = null;
		let cur = null;
		if(this.parent == null) {
			if(ZPP_Set_ZPP_SimpleVert.zpp_pool == null) {
				x = new ZPP_Set_ZPP_SimpleVert();
			} else {
				x = ZPP_Set_ZPP_SimpleVert.zpp_pool;
				ZPP_Set_ZPP_SimpleVert.zpp_pool = x.next;
				x.next = null;
			}
			x.data = obj;
			this.parent = x;
		} else {
			cur = this.parent;
			while(true) if(this.lt(obj,cur.data)) {
				if(cur.prev == null) {
					if(ZPP_Set_ZPP_SimpleVert.zpp_pool == null) {
						x = new ZPP_Set_ZPP_SimpleVert();
					} else {
						x = ZPP_Set_ZPP_SimpleVert.zpp_pool;
						ZPP_Set_ZPP_SimpleVert.zpp_pool = x.next;
						x.next = null;
					}
					x.data = obj;
					cur.prev = x;
					x.parent = cur;
					break;
				} else {
					cur = cur.prev;
				}
			} else if(this.lt(cur.data,obj)) {
				if(cur.next == null) {
					if(ZPP_Set_ZPP_SimpleVert.zpp_pool == null) {
						x = new ZPP_Set_ZPP_SimpleVert();
					} else {
						x = ZPP_Set_ZPP_SimpleVert.zpp_pool;
						ZPP_Set_ZPP_SimpleVert.zpp_pool = x.next;
						x.next = null;
					}
					x.data = obj;
					cur.next = x;
					x.parent = cur;
					break;
				} else {
					cur = cur.next;
				}
			} else {
				break;
			}
		}
		if(x == null) {
			return cur;
		} else {
			if(x.parent == null) {
				x.colour = 1;
			} else {
				x.colour = 0;
				if(x.parent.colour == 0) {
					this.__fix_dbl_red(x);
				}
			}
			return x;
		}
	}
	insert(obj) {
		let x;
		if(ZPP_Set_ZPP_SimpleVert.zpp_pool == null) {
			x = new ZPP_Set_ZPP_SimpleVert();
		} else {
			x = ZPP_Set_ZPP_SimpleVert.zpp_pool;
			ZPP_Set_ZPP_SimpleVert.zpp_pool = x.next;
			x.next = null;
		}
		x.data = obj;
		if(this.parent == null) {
			this.parent = x;
		} else {
			let cur = this.parent;
			while(true) if(this.lt(x.data,cur.data)) {
				if(cur.prev == null) {
					cur.prev = x;
					x.parent = cur;
					break;
				} else {
					cur = cur.prev;
				}
			} else if(cur.next == null) {
				cur.next = x;
				x.parent = cur;
				break;
			} else {
				cur = cur.next;
			}
		}
		if(x.parent == null) {
			x.colour = 1;
		} else {
			x.colour = 0;
			if(x.parent.colour == 0) {
				this.__fix_dbl_red(x);
			}
		}
		return x;
	}
}
ZPP_Set_ZPP_SimpleVert.zpp_pool = null;
