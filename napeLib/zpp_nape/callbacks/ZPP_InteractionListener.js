import ZPP_Set_ZPP_CbSetPair from '../util/ZPP_Set_ZPP_CbSetPair.js';
import ZNPNode_ZPP_CbSet from '../util/ZNPNode_ZPP_CbSet.js';
import ZNPNode_ZPP_InteractionListener from '../util/ZNPNode_ZPP_InteractionListener.js';
import ZNPNode_ZPP_CbType from '../util/ZNPNode_ZPP_CbType.js';
import ZNPList_ZPP_CbType from '../util/ZNPList_ZPP_CbType.js';
import ZPP_Listener from './ZPP_Listener.js';
import ZPP_Flags from '../util/ZPP_Flags.js';
import ZNPList_ZPP_CbSet from '../util/ZNPList_ZPP_CbSet.js';
import ZPP_CbSetPair from './ZPP_CbSetPair.js';
import ZPP_CbSet from './ZPP_CbSet.js';
export default class ZPP_InteractionListener extends ZPP_Listener {
	constructor(options1,options2,event,type) {
		ZPP_Listener._hx_skip_constructor = true;
		super();
		ZPP_Listener._hx_skip_constructor = false;
		this._hx_constructor(options1,options2,event,type);
	}
	_hx_constructor(options1,options2,event,type) {
		this.handlerp = null;
		this.pure = false;
		this.allowSleepingCallbacks = false;
		this.handleri = null;
		this.options2 = null;
		this.options1 = null;
		this.itype = 0;
		this.outer_znp = null;
		this.outer_zni = null;
		super._hx_constructor();
		this.type = type;
		this.interaction = this;
		this.event = event;
		this.options1 = options1.zpp_inner;
		this.options2 = options2.zpp_inner;
		this.allowSleepingCallbacks = false;
	}
	setInteractionType(itype) {
		this.itype = itype;
	}
	wake() {
		let ite1 = this.options1.includes.head;
		let ite2 = this.options2.includes.head;
		while(ite1 != null && ite2 != null) {
			let cb1 = ite1.elt;
			let cb2 = ite2.elt;
			if(cb1 == cb2) {
				let cx_ite = cb1.interactors.head;
				while(cx_ite != null) {
					let i = cx_ite.elt;
					i.wake();
					cx_ite = cx_ite.next;
				}
				ite1 = ite1.next;
				ite2 = ite2.next;
			} else if(cb1.id < cb2.id) {
				let cx_ite = cb1.interactors.head;
				while(cx_ite != null) {
					let i = cx_ite.elt;
					i.wake();
					cx_ite = cx_ite.next;
				}
				ite1 = ite1.next;
			} else {
				let cx_ite = cb2.interactors.head;
				while(cx_ite != null) {
					let i = cx_ite.elt;
					i.wake();
					cx_ite = cx_ite.next;
				}
				ite2 = ite2.next;
			}
		}
		while(ite1 != null) {
			let cx_ite = ite1.elt.interactors.head;
			while(cx_ite != null) {
				let i = cx_ite.elt;
				i.wake();
				cx_ite = cx_ite.next;
			}
			ite1 = ite1.next;
		}
		while(ite2 != null) {
			let cx_ite = ite2.elt.interactors.head;
			while(cx_ite != null) {
				let i = cx_ite.elt;
				i.wake();
				cx_ite = cx_ite.next;
			}
			ite2 = ite2.next;
		}
	}
	CbSetset(A,B,lambda) {
		let U = ZPP_InteractionListener.UCbSet;
		let V = ZPP_InteractionListener.VCbSet;
		let W = ZPP_InteractionListener.WCbSet;
		let aite = A.head;
		let bite = B.head;
		while(aite != null && bite != null) {
			let a = aite.elt;
			let b = bite.elt;
			if(a == b) {
				let ret;
				if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
					ret = new ZNPNode_ZPP_CbSet();
				} else {
					ret = ZNPNode_ZPP_CbSet.zpp_pool;
					ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.elt = a;
				let temp = ret;
				temp.next = W.head;
				W.head = temp;
				W.modified = true;
				W.length++;
				aite = aite.next;
				bite = bite.next;
			} else if(ZPP_CbSet.setlt(a,b)) {
				let ret;
				if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
					ret = new ZNPNode_ZPP_CbSet();
				} else {
					ret = ZNPNode_ZPP_CbSet.zpp_pool;
					ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.elt = a;
				let temp = ret;
				temp.next = U.head;
				U.head = temp;
				U.modified = true;
				U.length++;
				aite = aite.next;
			} else {
				let ret;
				if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
					ret = new ZNPNode_ZPP_CbSet();
				} else {
					ret = ZNPNode_ZPP_CbSet.zpp_pool;
					ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.elt = b;
				let temp = ret;
				temp.next = V.head;
				V.head = temp;
				V.modified = true;
				V.length++;
				bite = bite.next;
			}
		}
		while(aite != null) {
			let o = aite.elt;
			let ret;
			if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
				ret = new ZNPNode_ZPP_CbSet();
			} else {
				ret = ZNPNode_ZPP_CbSet.zpp_pool;
				ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = o;
			let temp = ret;
			temp.next = U.head;
			U.head = temp;
			U.modified = true;
			U.length++;
			aite = aite.next;
		}
		while(bite != null) {
			let o = bite.elt;
			let ret;
			if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
				ret = new ZNPNode_ZPP_CbSet();
			} else {
				ret = ZNPNode_ZPP_CbSet.zpp_pool;
				ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = o;
			let temp = ret;
			temp.next = V.head;
			V.head = temp;
			V.modified = true;
			V.length++;
			bite = bite.next;
		}
		while(U.head != null) {
			let x = U.pop_unsafe();
			let cx_ite = B.head;
			while(cx_ite != null) {
				let y = cx_ite.elt;
				lambda(x,y);
				cx_ite = cx_ite.next;
			}
		}
		while(V.head != null) {
			let x = V.pop_unsafe();
			let cx_ite = W.head;
			while(cx_ite != null) {
				let y = cx_ite.elt;
				lambda(x,y);
				cx_ite = cx_ite.next;
			}
		}
		while(W.head != null) {
			let x = W.pop_unsafe();
			lambda(x,x);
			let cx_ite = W.head;
			while(cx_ite != null) {
				let y = cx_ite.elt;
				lambda(x,y);
				cx_ite = cx_ite.next;
			}
		}
	}
	CbTypeset(A,B,lambda) {
		let U = ZPP_InteractionListener.UCbType;
		let V = ZPP_InteractionListener.VCbType;
		let W = ZPP_InteractionListener.WCbType;
		let aite = A.head;
		let bite = B.head;
		while(aite != null && bite != null) {
			let a = aite.elt;
			let b = bite.elt;
			if(a == b) {
				let ret;
				if(ZNPNode_ZPP_CbType.zpp_pool == null) {
					ret = new ZNPNode_ZPP_CbType();
				} else {
					ret = ZNPNode_ZPP_CbType.zpp_pool;
					ZNPNode_ZPP_CbType.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.elt = a;
				let temp = ret;
				temp.next = W.head;
				W.head = temp;
				W.modified = true;
				W.length++;
				aite = aite.next;
				bite = bite.next;
			} else if(a.id < b.id) {
				let ret;
				if(ZNPNode_ZPP_CbType.zpp_pool == null) {
					ret = new ZNPNode_ZPP_CbType();
				} else {
					ret = ZNPNode_ZPP_CbType.zpp_pool;
					ZNPNode_ZPP_CbType.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.elt = a;
				let temp = ret;
				temp.next = U.head;
				U.head = temp;
				U.modified = true;
				U.length++;
				aite = aite.next;
			} else {
				let ret;
				if(ZNPNode_ZPP_CbType.zpp_pool == null) {
					ret = new ZNPNode_ZPP_CbType();
				} else {
					ret = ZNPNode_ZPP_CbType.zpp_pool;
					ZNPNode_ZPP_CbType.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.elt = b;
				let temp = ret;
				temp.next = V.head;
				V.head = temp;
				V.modified = true;
				V.length++;
				bite = bite.next;
			}
		}
		while(aite != null) {
			let o = aite.elt;
			let ret;
			if(ZNPNode_ZPP_CbType.zpp_pool == null) {
				ret = new ZNPNode_ZPP_CbType();
			} else {
				ret = ZNPNode_ZPP_CbType.zpp_pool;
				ZNPNode_ZPP_CbType.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = o;
			let temp = ret;
			temp.next = U.head;
			U.head = temp;
			U.modified = true;
			U.length++;
			aite = aite.next;
		}
		while(bite != null) {
			let o = bite.elt;
			let ret;
			if(ZNPNode_ZPP_CbType.zpp_pool == null) {
				ret = new ZNPNode_ZPP_CbType();
			} else {
				ret = ZNPNode_ZPP_CbType.zpp_pool;
				ZNPNode_ZPP_CbType.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = o;
			let temp = ret;
			temp.next = V.head;
			V.head = temp;
			V.modified = true;
			V.length++;
			bite = bite.next;
		}
		while(U.head != null) {
			let x = U.pop_unsafe();
			let cx_ite = B.head;
			while(cx_ite != null) {
				let y = cx_ite.elt;
				lambda(x,y);
				cx_ite = cx_ite.next;
			}
		}
		while(V.head != null) {
			let x = V.pop_unsafe();
			let cx_ite = W.head;
			while(cx_ite != null) {
				let y = cx_ite.elt;
				lambda(x,y);
				cx_ite = cx_ite.next;
			}
		}
		while(W.head != null) {
			let x = W.pop_unsafe();
			lambda(x,x);
			let cx_ite = W.head;
			while(cx_ite != null) {
				let y = cx_ite.elt;
				lambda(x,y);
				cx_ite = cx_ite.next;
			}
		}
	}
	with_uniquesets(fresh) {
		let set;
		if(ZPP_Set_ZPP_CbSetPair.zpp_pool == null) {
			set = new ZPP_Set_ZPP_CbSetPair();
		} else {
			set = ZPP_Set_ZPP_CbSetPair.zpp_pool;
			ZPP_Set_ZPP_CbSetPair.zpp_pool = set.next;
			set.next = null;
		}
		set.lt = ZPP_CbSetPair.setlt;
		let _gthis = this;
		let B = this.options2.includes;
		let U = ZPP_InteractionListener.UCbType;
		let V = ZPP_InteractionListener.VCbType;
		let W = ZPP_InteractionListener.WCbType;
		let aite = this.options1.includes.head;
		let bite = B.head;
		while(aite != null && bite != null) {
			let a = aite.elt;
			let b = bite.elt;
			if(a == b) {
				let ret;
				if(ZNPNode_ZPP_CbType.zpp_pool == null) {
					ret = new ZNPNode_ZPP_CbType();
				} else {
					ret = ZNPNode_ZPP_CbType.zpp_pool;
					ZNPNode_ZPP_CbType.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.elt = a;
				let temp = ret;
				temp.next = W.head;
				W.head = temp;
				W.modified = true;
				W.length++;
				aite = aite.next;
				bite = bite.next;
			} else if(a.id < b.id) {
				let ret;
				if(ZNPNode_ZPP_CbType.zpp_pool == null) {
					ret = new ZNPNode_ZPP_CbType();
				} else {
					ret = ZNPNode_ZPP_CbType.zpp_pool;
					ZNPNode_ZPP_CbType.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.elt = a;
				let temp = ret;
				temp.next = U.head;
				U.head = temp;
				U.modified = true;
				U.length++;
				aite = aite.next;
			} else {
				let ret;
				if(ZNPNode_ZPP_CbType.zpp_pool == null) {
					ret = new ZNPNode_ZPP_CbType();
				} else {
					ret = ZNPNode_ZPP_CbType.zpp_pool;
					ZNPNode_ZPP_CbType.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.elt = b;
				let temp = ret;
				temp.next = V.head;
				V.head = temp;
				V.modified = true;
				V.length++;
				bite = bite.next;
			}
		}
		while(aite != null) {
			let o = aite.elt;
			let ret;
			if(ZNPNode_ZPP_CbType.zpp_pool == null) {
				ret = new ZNPNode_ZPP_CbType();
			} else {
				ret = ZNPNode_ZPP_CbType.zpp_pool;
				ZNPNode_ZPP_CbType.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = o;
			let temp = ret;
			temp.next = U.head;
			U.head = temp;
			U.modified = true;
			U.length++;
			aite = aite.next;
		}
		while(bite != null) {
			let o = bite.elt;
			let ret;
			if(ZNPNode_ZPP_CbType.zpp_pool == null) {
				ret = new ZNPNode_ZPP_CbType();
			} else {
				ret = ZNPNode_ZPP_CbType.zpp_pool;
				ZNPNode_ZPP_CbType.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = o;
			let temp = ret;
			temp.next = V.head;
			V.head = temp;
			V.modified = true;
			V.length++;
			bite = bite.next;
		}
		while(U.head != null) {
			let x = U.pop_unsafe();
			let cx_ite = B.head;
			while(cx_ite != null) {
				let y = cx_ite.elt;
				let B = y.cbsets;
				let U = ZPP_InteractionListener.UCbSet;
				let V = ZPP_InteractionListener.VCbSet;
				let W = ZPP_InteractionListener.WCbSet;
				let aite = x.cbsets.head;
				let bite = B.head;
				while(aite != null && bite != null) {
					let a = aite.elt;
					let b = bite.elt;
					if(a == b) {
						let ret;
						if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
							ret = new ZNPNode_ZPP_CbSet();
						} else {
							ret = ZNPNode_ZPP_CbSet.zpp_pool;
							ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.elt = a;
						let temp = ret;
						temp.next = W.head;
						W.head = temp;
						W.modified = true;
						W.length++;
						aite = aite.next;
						bite = bite.next;
					} else if(ZPP_CbSet.setlt(a,b)) {
						let ret;
						if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
							ret = new ZNPNode_ZPP_CbSet();
						} else {
							ret = ZNPNode_ZPP_CbSet.zpp_pool;
							ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.elt = a;
						let temp = ret;
						temp.next = U.head;
						U.head = temp;
						U.modified = true;
						U.length++;
						aite = aite.next;
					} else {
						let ret;
						if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
							ret = new ZNPNode_ZPP_CbSet();
						} else {
							ret = ZNPNode_ZPP_CbSet.zpp_pool;
							ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.elt = b;
						let temp = ret;
						temp.next = V.head;
						V.head = temp;
						V.modified = true;
						V.length++;
						bite = bite.next;
					}
				}
				while(aite != null) {
					let o = aite.elt;
					let ret;
					if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
						ret = new ZNPNode_ZPP_CbSet();
					} else {
						ret = ZNPNode_ZPP_CbSet.zpp_pool;
						ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = o;
					let temp = ret;
					temp.next = U.head;
					U.head = temp;
					U.modified = true;
					U.length++;
					aite = aite.next;
				}
				while(bite != null) {
					let o = bite.elt;
					let ret;
					if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
						ret = new ZNPNode_ZPP_CbSet();
					} else {
						ret = ZNPNode_ZPP_CbSet.zpp_pool;
						ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = o;
					let temp = ret;
					temp.next = V.head;
					V.head = temp;
					V.modified = true;
					V.length++;
					bite = bite.next;
				}
				while(U.head != null) {
					let x = U.pop_unsafe();
					let cx_ite = B.head;
					while(cx_ite != null) {
						let y = cx_ite.elt;
						x.validate();
						y.validate();
						if(ZPP_CbSet.single_intersection(x,y,_gthis)) {
							let ret;
							if(ZPP_CbSetPair.zpp_pool == null) {
								ret = new ZPP_CbSetPair();
							} else {
								ret = ZPP_CbSetPair.zpp_pool;
								ZPP_CbSetPair.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.zip_listeners = true;
							if(ZPP_CbSet.setlt(x,y)) {
								ret.a = x;
								ret.b = y;
							} else {
								ret.a = y;
								ret.b = x;
							}
							set.try_insert(ret);
						}
						cx_ite = cx_ite.next;
					}
				}
				while(V.head != null) {
					let x = V.pop_unsafe();
					let cx_ite = W.head;
					while(cx_ite != null) {
						let y = cx_ite.elt;
						x.validate();
						y.validate();
						if(ZPP_CbSet.single_intersection(x,y,_gthis)) {
							let ret;
							if(ZPP_CbSetPair.zpp_pool == null) {
								ret = new ZPP_CbSetPair();
							} else {
								ret = ZPP_CbSetPair.zpp_pool;
								ZPP_CbSetPair.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.zip_listeners = true;
							if(ZPP_CbSet.setlt(x,y)) {
								ret.a = x;
								ret.b = y;
							} else {
								ret.a = y;
								ret.b = x;
							}
							set.try_insert(ret);
						}
						cx_ite = cx_ite.next;
					}
				}
				while(W.head != null) {
					let x = W.pop_unsafe();
					x.validate();
					x.validate();
					if(ZPP_CbSet.single_intersection(x,x,_gthis)) {
						let ret;
						if(ZPP_CbSetPair.zpp_pool == null) {
							ret = new ZPP_CbSetPair();
						} else {
							ret = ZPP_CbSetPair.zpp_pool;
							ZPP_CbSetPair.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.zip_listeners = true;
						if(ZPP_CbSet.setlt(x,x)) {
							ret.a = x;
							ret.b = x;
						} else {
							ret.a = x;
							ret.b = x;
						}
						set.try_insert(ret);
					}
					let cx_ite = W.head;
					while(cx_ite != null) {
						let y = cx_ite.elt;
						x.validate();
						y.validate();
						if(ZPP_CbSet.single_intersection(x,y,_gthis)) {
							let ret;
							if(ZPP_CbSetPair.zpp_pool == null) {
								ret = new ZPP_CbSetPair();
							} else {
								ret = ZPP_CbSetPair.zpp_pool;
								ZPP_CbSetPair.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.zip_listeners = true;
							if(ZPP_CbSet.setlt(x,y)) {
								ret.a = x;
								ret.b = y;
							} else {
								ret.a = y;
								ret.b = x;
							}
							set.try_insert(ret);
						}
						cx_ite = cx_ite.next;
					}
				}
				cx_ite = cx_ite.next;
			}
		}
		while(V.head != null) {
			let x = V.pop_unsafe();
			let cx_ite = W.head;
			while(cx_ite != null) {
				let y = cx_ite.elt;
				let B = y.cbsets;
				let U = ZPP_InteractionListener.UCbSet;
				let V = ZPP_InteractionListener.VCbSet;
				let W = ZPP_InteractionListener.WCbSet;
				let aite = x.cbsets.head;
				let bite = B.head;
				while(aite != null && bite != null) {
					let a = aite.elt;
					let b = bite.elt;
					if(a == b) {
						let ret;
						if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
							ret = new ZNPNode_ZPP_CbSet();
						} else {
							ret = ZNPNode_ZPP_CbSet.zpp_pool;
							ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.elt = a;
						let temp = ret;
						temp.next = W.head;
						W.head = temp;
						W.modified = true;
						W.length++;
						aite = aite.next;
						bite = bite.next;
					} else if(ZPP_CbSet.setlt(a,b)) {
						let ret;
						if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
							ret = new ZNPNode_ZPP_CbSet();
						} else {
							ret = ZNPNode_ZPP_CbSet.zpp_pool;
							ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.elt = a;
						let temp = ret;
						temp.next = U.head;
						U.head = temp;
						U.modified = true;
						U.length++;
						aite = aite.next;
					} else {
						let ret;
						if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
							ret = new ZNPNode_ZPP_CbSet();
						} else {
							ret = ZNPNode_ZPP_CbSet.zpp_pool;
							ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.elt = b;
						let temp = ret;
						temp.next = V.head;
						V.head = temp;
						V.modified = true;
						V.length++;
						bite = bite.next;
					}
				}
				while(aite != null) {
					let o = aite.elt;
					let ret;
					if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
						ret = new ZNPNode_ZPP_CbSet();
					} else {
						ret = ZNPNode_ZPP_CbSet.zpp_pool;
						ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = o;
					let temp = ret;
					temp.next = U.head;
					U.head = temp;
					U.modified = true;
					U.length++;
					aite = aite.next;
				}
				while(bite != null) {
					let o = bite.elt;
					let ret;
					if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
						ret = new ZNPNode_ZPP_CbSet();
					} else {
						ret = ZNPNode_ZPP_CbSet.zpp_pool;
						ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = o;
					let temp = ret;
					temp.next = V.head;
					V.head = temp;
					V.modified = true;
					V.length++;
					bite = bite.next;
				}
				while(U.head != null) {
					let x = U.pop_unsafe();
					let cx_ite = B.head;
					while(cx_ite != null) {
						let y = cx_ite.elt;
						x.validate();
						y.validate();
						if(ZPP_CbSet.single_intersection(x,y,_gthis)) {
							let ret;
							if(ZPP_CbSetPair.zpp_pool == null) {
								ret = new ZPP_CbSetPair();
							} else {
								ret = ZPP_CbSetPair.zpp_pool;
								ZPP_CbSetPair.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.zip_listeners = true;
							if(ZPP_CbSet.setlt(x,y)) {
								ret.a = x;
								ret.b = y;
							} else {
								ret.a = y;
								ret.b = x;
							}
							set.try_insert(ret);
						}
						cx_ite = cx_ite.next;
					}
				}
				while(V.head != null) {
					let x = V.pop_unsafe();
					let cx_ite = W.head;
					while(cx_ite != null) {
						let y = cx_ite.elt;
						x.validate();
						y.validate();
						if(ZPP_CbSet.single_intersection(x,y,_gthis)) {
							let ret;
							if(ZPP_CbSetPair.zpp_pool == null) {
								ret = new ZPP_CbSetPair();
							} else {
								ret = ZPP_CbSetPair.zpp_pool;
								ZPP_CbSetPair.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.zip_listeners = true;
							if(ZPP_CbSet.setlt(x,y)) {
								ret.a = x;
								ret.b = y;
							} else {
								ret.a = y;
								ret.b = x;
							}
							set.try_insert(ret);
						}
						cx_ite = cx_ite.next;
					}
				}
				while(W.head != null) {
					let x = W.pop_unsafe();
					x.validate();
					x.validate();
					if(ZPP_CbSet.single_intersection(x,x,_gthis)) {
						let ret;
						if(ZPP_CbSetPair.zpp_pool == null) {
							ret = new ZPP_CbSetPair();
						} else {
							ret = ZPP_CbSetPair.zpp_pool;
							ZPP_CbSetPair.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.zip_listeners = true;
						if(ZPP_CbSet.setlt(x,x)) {
							ret.a = x;
							ret.b = x;
						} else {
							ret.a = x;
							ret.b = x;
						}
						set.try_insert(ret);
					}
					let cx_ite = W.head;
					while(cx_ite != null) {
						let y = cx_ite.elt;
						x.validate();
						y.validate();
						if(ZPP_CbSet.single_intersection(x,y,_gthis)) {
							let ret;
							if(ZPP_CbSetPair.zpp_pool == null) {
								ret = new ZPP_CbSetPair();
							} else {
								ret = ZPP_CbSetPair.zpp_pool;
								ZPP_CbSetPair.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.zip_listeners = true;
							if(ZPP_CbSet.setlt(x,y)) {
								ret.a = x;
								ret.b = y;
							} else {
								ret.a = y;
								ret.b = x;
							}
							set.try_insert(ret);
						}
						cx_ite = cx_ite.next;
					}
				}
				cx_ite = cx_ite.next;
			}
		}
		while(W.head != null) {
			let x = W.pop_unsafe();
			let B = x.cbsets;
			let U = ZPP_InteractionListener.UCbSet;
			let V = ZPP_InteractionListener.VCbSet;
			let W1 = ZPP_InteractionListener.WCbSet;
			let aite = x.cbsets.head;
			let bite = B.head;
			while(aite != null && bite != null) {
				let a = aite.elt;
				let b = bite.elt;
				if(a == b) {
					let ret;
					if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
						ret = new ZNPNode_ZPP_CbSet();
					} else {
						ret = ZNPNode_ZPP_CbSet.zpp_pool;
						ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = a;
					let temp = ret;
					temp.next = W1.head;
					W1.head = temp;
					W1.modified = true;
					W1.length++;
					aite = aite.next;
					bite = bite.next;
				} else if(ZPP_CbSet.setlt(a,b)) {
					let ret;
					if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
						ret = new ZNPNode_ZPP_CbSet();
					} else {
						ret = ZNPNode_ZPP_CbSet.zpp_pool;
						ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = a;
					let temp = ret;
					temp.next = U.head;
					U.head = temp;
					U.modified = true;
					U.length++;
					aite = aite.next;
				} else {
					let ret;
					if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
						ret = new ZNPNode_ZPP_CbSet();
					} else {
						ret = ZNPNode_ZPP_CbSet.zpp_pool;
						ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = b;
					let temp = ret;
					temp.next = V.head;
					V.head = temp;
					V.modified = true;
					V.length++;
					bite = bite.next;
				}
			}
			while(aite != null) {
				let o = aite.elt;
				let ret;
				if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
					ret = new ZNPNode_ZPP_CbSet();
				} else {
					ret = ZNPNode_ZPP_CbSet.zpp_pool;
					ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.elt = o;
				let temp = ret;
				temp.next = U.head;
				U.head = temp;
				U.modified = true;
				U.length++;
				aite = aite.next;
			}
			while(bite != null) {
				let o = bite.elt;
				let ret;
				if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
					ret = new ZNPNode_ZPP_CbSet();
				} else {
					ret = ZNPNode_ZPP_CbSet.zpp_pool;
					ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.elt = o;
				let temp = ret;
				temp.next = V.head;
				V.head = temp;
				V.modified = true;
				V.length++;
				bite = bite.next;
			}
			while(U.head != null) {
				let x = U.pop_unsafe();
				let cx_ite = B.head;
				while(cx_ite != null) {
					let y = cx_ite.elt;
					x.validate();
					y.validate();
					if(ZPP_CbSet.single_intersection(x,y,_gthis)) {
						let ret;
						if(ZPP_CbSetPair.zpp_pool == null) {
							ret = new ZPP_CbSetPair();
						} else {
							ret = ZPP_CbSetPair.zpp_pool;
							ZPP_CbSetPair.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.zip_listeners = true;
						if(ZPP_CbSet.setlt(x,y)) {
							ret.a = x;
							ret.b = y;
						} else {
							ret.a = y;
							ret.b = x;
						}
						set.try_insert(ret);
					}
					cx_ite = cx_ite.next;
				}
			}
			while(V.head != null) {
				let x = V.pop_unsafe();
				let cx_ite = W1.head;
				while(cx_ite != null) {
					let y = cx_ite.elt;
					x.validate();
					y.validate();
					if(ZPP_CbSet.single_intersection(x,y,_gthis)) {
						let ret;
						if(ZPP_CbSetPair.zpp_pool == null) {
							ret = new ZPP_CbSetPair();
						} else {
							ret = ZPP_CbSetPair.zpp_pool;
							ZPP_CbSetPair.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.zip_listeners = true;
						if(ZPP_CbSet.setlt(x,y)) {
							ret.a = x;
							ret.b = y;
						} else {
							ret.a = y;
							ret.b = x;
						}
						set.try_insert(ret);
					}
					cx_ite = cx_ite.next;
				}
			}
			while(W1.head != null) {
				let x = W1.pop_unsafe();
				x.validate();
				x.validate();
				if(ZPP_CbSet.single_intersection(x,x,_gthis)) {
					let ret;
					if(ZPP_CbSetPair.zpp_pool == null) {
						ret = new ZPP_CbSetPair();
					} else {
						ret = ZPP_CbSetPair.zpp_pool;
						ZPP_CbSetPair.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.zip_listeners = true;
					if(ZPP_CbSet.setlt(x,x)) {
						ret.a = x;
						ret.b = x;
					} else {
						ret.a = x;
						ret.b = x;
					}
					set.try_insert(ret);
				}
				let cx_ite = W1.head;
				while(cx_ite != null) {
					let y = cx_ite.elt;
					x.validate();
					y.validate();
					if(ZPP_CbSet.single_intersection(x,y,_gthis)) {
						let ret;
						if(ZPP_CbSetPair.zpp_pool == null) {
							ret = new ZPP_CbSetPair();
						} else {
							ret = ZPP_CbSetPair.zpp_pool;
							ZPP_CbSetPair.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.zip_listeners = true;
						if(ZPP_CbSet.setlt(x,y)) {
							ret.a = x;
							ret.b = y;
						} else {
							ret.a = y;
							ret.b = x;
						}
						set.try_insert(ret);
					}
					cx_ite = cx_ite.next;
				}
			}
			let cx_ite = W.head;
			while(cx_ite != null) {
				let y = cx_ite.elt;
				let B = y.cbsets;
				let U = ZPP_InteractionListener.UCbSet;
				let V = ZPP_InteractionListener.VCbSet;
				let W = ZPP_InteractionListener.WCbSet;
				let aite = x.cbsets.head;
				let bite = B.head;
				while(aite != null && bite != null) {
					let a = aite.elt;
					let b = bite.elt;
					if(a == b) {
						let ret;
						if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
							ret = new ZNPNode_ZPP_CbSet();
						} else {
							ret = ZNPNode_ZPP_CbSet.zpp_pool;
							ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.elt = a;
						let temp = ret;
						temp.next = W.head;
						W.head = temp;
						W.modified = true;
						W.length++;
						aite = aite.next;
						bite = bite.next;
					} else if(ZPP_CbSet.setlt(a,b)) {
						let ret;
						if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
							ret = new ZNPNode_ZPP_CbSet();
						} else {
							ret = ZNPNode_ZPP_CbSet.zpp_pool;
							ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.elt = a;
						let temp = ret;
						temp.next = U.head;
						U.head = temp;
						U.modified = true;
						U.length++;
						aite = aite.next;
					} else {
						let ret;
						if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
							ret = new ZNPNode_ZPP_CbSet();
						} else {
							ret = ZNPNode_ZPP_CbSet.zpp_pool;
							ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.elt = b;
						let temp = ret;
						temp.next = V.head;
						V.head = temp;
						V.modified = true;
						V.length++;
						bite = bite.next;
					}
				}
				while(aite != null) {
					let o = aite.elt;
					let ret;
					if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
						ret = new ZNPNode_ZPP_CbSet();
					} else {
						ret = ZNPNode_ZPP_CbSet.zpp_pool;
						ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = o;
					let temp = ret;
					temp.next = U.head;
					U.head = temp;
					U.modified = true;
					U.length++;
					aite = aite.next;
				}
				while(bite != null) {
					let o = bite.elt;
					let ret;
					if(ZNPNode_ZPP_CbSet.zpp_pool == null) {
						ret = new ZNPNode_ZPP_CbSet();
					} else {
						ret = ZNPNode_ZPP_CbSet.zpp_pool;
						ZNPNode_ZPP_CbSet.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = o;
					let temp = ret;
					temp.next = V.head;
					V.head = temp;
					V.modified = true;
					V.length++;
					bite = bite.next;
				}
				while(U.head != null) {
					let x = U.pop_unsafe();
					let cx_ite = B.head;
					while(cx_ite != null) {
						let y = cx_ite.elt;
						x.validate();
						y.validate();
						if(ZPP_CbSet.single_intersection(x,y,_gthis)) {
							let ret;
							if(ZPP_CbSetPair.zpp_pool == null) {
								ret = new ZPP_CbSetPair();
							} else {
								ret = ZPP_CbSetPair.zpp_pool;
								ZPP_CbSetPair.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.zip_listeners = true;
							if(ZPP_CbSet.setlt(x,y)) {
								ret.a = x;
								ret.b = y;
							} else {
								ret.a = y;
								ret.b = x;
							}
							set.try_insert(ret);
						}
						cx_ite = cx_ite.next;
					}
				}
				while(V.head != null) {
					let x = V.pop_unsafe();
					let cx_ite = W.head;
					while(cx_ite != null) {
						let y = cx_ite.elt;
						x.validate();
						y.validate();
						if(ZPP_CbSet.single_intersection(x,y,_gthis)) {
							let ret;
							if(ZPP_CbSetPair.zpp_pool == null) {
								ret = new ZPP_CbSetPair();
							} else {
								ret = ZPP_CbSetPair.zpp_pool;
								ZPP_CbSetPair.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.zip_listeners = true;
							if(ZPP_CbSet.setlt(x,y)) {
								ret.a = x;
								ret.b = y;
							} else {
								ret.a = y;
								ret.b = x;
							}
							set.try_insert(ret);
						}
						cx_ite = cx_ite.next;
					}
				}
				while(W.head != null) {
					let x = W.pop_unsafe();
					x.validate();
					x.validate();
					if(ZPP_CbSet.single_intersection(x,x,_gthis)) {
						let ret;
						if(ZPP_CbSetPair.zpp_pool == null) {
							ret = new ZPP_CbSetPair();
						} else {
							ret = ZPP_CbSetPair.zpp_pool;
							ZPP_CbSetPair.zpp_pool = ret.next;
							ret.next = null;
						}
						ret.zip_listeners = true;
						if(ZPP_CbSet.setlt(x,x)) {
							ret.a = x;
							ret.b = x;
						} else {
							ret.a = x;
							ret.b = x;
						}
						set.try_insert(ret);
					}
					let cx_ite = W.head;
					while(cx_ite != null) {
						let y = cx_ite.elt;
						x.validate();
						y.validate();
						if(ZPP_CbSet.single_intersection(x,y,_gthis)) {
							let ret;
							if(ZPP_CbSetPair.zpp_pool == null) {
								ret = new ZPP_CbSetPair();
							} else {
								ret = ZPP_CbSetPair.zpp_pool;
								ZPP_CbSetPair.zpp_pool = ret.next;
								ret.next = null;
							}
							ret.zip_listeners = true;
							if(ZPP_CbSet.setlt(x,y)) {
								ret.a = x;
								ret.b = y;
							} else {
								ret.a = y;
								ret.b = x;
							}
							set.try_insert(ret);
						}
						cx_ite = cx_ite.next;
					}
				}
				cx_ite = cx_ite.next;
			}
		}
		if(set.parent != null) {
			let cur = set.parent;
			while(cur != null) if(cur.prev != null) {
				cur = cur.prev;
			} else if(cur.next != null) {
				cur = cur.next;
			} else {
				let pair = cur.data;
				if(fresh) {
					_gthis.space.freshListenerType(pair.a,pair.b);
				} else {
					_gthis.space.nullListenerType(pair.a,pair.b);
				}
				let o = pair;
				o.a = o.b = null;
				o.listeners.clear();
				o.next = ZPP_CbSetPair.zpp_pool;
				ZPP_CbSetPair.zpp_pool = o;
				let ret = cur.parent;
				if(ret != null) {
					if(cur == ret.prev) {
						ret.prev = null;
					} else {
						ret.next = null;
					}
					cur.parent = null;
				}
				let o1 = cur;
				o1.data = null;
				o1.lt = null;
				o1.swapped = null;
				o1.next = ZPP_Set_ZPP_CbSetPair.zpp_pool;
				ZPP_Set_ZPP_CbSetPair.zpp_pool = o1;
				cur = ret;
			}
			set.parent = null;
		}
		let o = set;
		o.data = null;
		o.lt = null;
		o.swapped = null;
		o.next = ZPP_Set_ZPP_CbSetPair.zpp_pool;
		ZPP_Set_ZPP_CbSetPair.zpp_pool = o;
	}
	with_union(lambda) {
		let ite1 = this.options1.includes.head;
		let ite2 = this.options2.includes.head;
		while(ite1 != null && ite2 != null) {
			let cb1 = ite1.elt;
			let cb2 = ite2.elt;
			if(cb1 == cb2) {
				lambda(cb1);
				ite1 = ite1.next;
				ite2 = ite2.next;
			} else if(cb1.id < cb2.id) {
				lambda(cb1);
				ite1 = ite1.next;
			} else {
				lambda(cb2);
				ite2 = ite2.next;
			}
		}
		while(ite1 != null) {
			lambda(ite1.elt);
			ite1 = ite1.next;
		}
		while(ite2 != null) {
			lambda(ite2.elt);
			ite2 = ite2.next;
		}
	}
	addedToSpace() {
		let pre = this.type == ZPP_Flags.id_ListenerType_PRE;
		let _gthis = this;
		let ite1 = this.options1.includes.head;
		let ite2 = this.options2.includes.head;
		while(ite1 != null && ite2 != null) {
			let cb1 = ite1.elt;
			let cb2 = ite2.elt;
			if(cb1 == cb2) {
				let pre1 = null;
				let cx_ite = cb1.listeners.head;
				while(cx_ite != null) {
					let j = cx_ite.elt;
					if(_gthis.precedence > j.precedence || _gthis.precedence == j.precedence && _gthis.id > j.id) {
						break;
					}
					pre1 = cx_ite;
					cx_ite = cx_ite.next;
				}
				let _this = cb1.listeners;
				let ret;
				if(ZNPNode_ZPP_InteractionListener.zpp_pool == null) {
					ret = new ZNPNode_ZPP_InteractionListener();
				} else {
					ret = ZNPNode_ZPP_InteractionListener.zpp_pool;
					ZNPNode_ZPP_InteractionListener.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.elt = _gthis;
				let temp = ret;
				if(pre1 == null) {
					temp.next = _this.head;
					_this.head = temp;
				} else {
					temp.next = pre1.next;
					pre1.next = temp;
				}
				_this.pushmod = _this.modified = true;
				_this.length++;
				let cx_ite1 = cb1.cbsets.head;
				while(cx_ite1 != null) {
					let cb = cx_ite1.elt;
					cb.zip_listeners = true;
					cb.invalidate_pairs();
					cx_ite1 = cx_ite1.next;
				}
				if(pre) {
					let cx_ite = cb1.interactors.head;
					while(cx_ite != null) {
						let i = cx_ite.elt;
						i.wake();
						cx_ite = cx_ite.next;
					}
				}
				ite1 = ite1.next;
				ite2 = ite2.next;
			} else if(cb1.id < cb2.id) {
				let pre1 = null;
				let cx_ite = cb1.listeners.head;
				while(cx_ite != null) {
					let j = cx_ite.elt;
					if(_gthis.precedence > j.precedence || _gthis.precedence == j.precedence && _gthis.id > j.id) {
						break;
					}
					pre1 = cx_ite;
					cx_ite = cx_ite.next;
				}
				let _this = cb1.listeners;
				let ret;
				if(ZNPNode_ZPP_InteractionListener.zpp_pool == null) {
					ret = new ZNPNode_ZPP_InteractionListener();
				} else {
					ret = ZNPNode_ZPP_InteractionListener.zpp_pool;
					ZNPNode_ZPP_InteractionListener.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.elt = _gthis;
				let temp = ret;
				if(pre1 == null) {
					temp.next = _this.head;
					_this.head = temp;
				} else {
					temp.next = pre1.next;
					pre1.next = temp;
				}
				_this.pushmod = _this.modified = true;
				_this.length++;
				let cx_ite1 = cb1.cbsets.head;
				while(cx_ite1 != null) {
					let cb = cx_ite1.elt;
					cb.zip_listeners = true;
					cb.invalidate_pairs();
					cx_ite1 = cx_ite1.next;
				}
				if(pre) {
					let cx_ite = cb1.interactors.head;
					while(cx_ite != null) {
						let i = cx_ite.elt;
						i.wake();
						cx_ite = cx_ite.next;
					}
				}
				ite1 = ite1.next;
			} else {
				let pre1 = null;
				let cx_ite = cb2.listeners.head;
				while(cx_ite != null) {
					let j = cx_ite.elt;
					if(_gthis.precedence > j.precedence || _gthis.precedence == j.precedence && _gthis.id > j.id) {
						break;
					}
					pre1 = cx_ite;
					cx_ite = cx_ite.next;
				}
				let _this = cb2.listeners;
				let ret;
				if(ZNPNode_ZPP_InteractionListener.zpp_pool == null) {
					ret = new ZNPNode_ZPP_InteractionListener();
				} else {
					ret = ZNPNode_ZPP_InteractionListener.zpp_pool;
					ZNPNode_ZPP_InteractionListener.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.elt = _gthis;
				let temp = ret;
				if(pre1 == null) {
					temp.next = _this.head;
					_this.head = temp;
				} else {
					temp.next = pre1.next;
					pre1.next = temp;
				}
				_this.pushmod = _this.modified = true;
				_this.length++;
				let cx_ite1 = cb2.cbsets.head;
				while(cx_ite1 != null) {
					let cb = cx_ite1.elt;
					cb.zip_listeners = true;
					cb.invalidate_pairs();
					cx_ite1 = cx_ite1.next;
				}
				if(pre) {
					let cx_ite = cb2.interactors.head;
					while(cx_ite != null) {
						let i = cx_ite.elt;
						i.wake();
						cx_ite = cx_ite.next;
					}
				}
				ite2 = ite2.next;
			}
		}
		while(ite1 != null) {
			let cb = ite1.elt;
			let pre1 = null;
			let cx_ite = cb.listeners.head;
			while(cx_ite != null) {
				let j = cx_ite.elt;
				if(_gthis.precedence > j.precedence || _gthis.precedence == j.precedence && _gthis.id > j.id) {
					break;
				}
				pre1 = cx_ite;
				cx_ite = cx_ite.next;
			}
			let _this = cb.listeners;
			let ret;
			if(ZNPNode_ZPP_InteractionListener.zpp_pool == null) {
				ret = new ZNPNode_ZPP_InteractionListener();
			} else {
				ret = ZNPNode_ZPP_InteractionListener.zpp_pool;
				ZNPNode_ZPP_InteractionListener.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = _gthis;
			let temp = ret;
			if(pre1 == null) {
				temp.next = _this.head;
				_this.head = temp;
			} else {
				temp.next = pre1.next;
				pre1.next = temp;
			}
			_this.pushmod = _this.modified = true;
			_this.length++;
			let cx_ite1 = cb.cbsets.head;
			while(cx_ite1 != null) {
				let cb = cx_ite1.elt;
				cb.zip_listeners = true;
				cb.invalidate_pairs();
				cx_ite1 = cx_ite1.next;
			}
			if(pre) {
				let cx_ite = cb.interactors.head;
				while(cx_ite != null) {
					let i = cx_ite.elt;
					i.wake();
					cx_ite = cx_ite.next;
				}
			}
			ite1 = ite1.next;
		}
		while(ite2 != null) {
			let cb = ite2.elt;
			let pre1 = null;
			let cx_ite = cb.listeners.head;
			while(cx_ite != null) {
				let j = cx_ite.elt;
				if(_gthis.precedence > j.precedence || _gthis.precedence == j.precedence && _gthis.id > j.id) {
					break;
				}
				pre1 = cx_ite;
				cx_ite = cx_ite.next;
			}
			let _this = cb.listeners;
			let ret;
			if(ZNPNode_ZPP_InteractionListener.zpp_pool == null) {
				ret = new ZNPNode_ZPP_InteractionListener();
			} else {
				ret = ZNPNode_ZPP_InteractionListener.zpp_pool;
				ZNPNode_ZPP_InteractionListener.zpp_pool = ret.next;
				ret.next = null;
			}
			ret.elt = _gthis;
			let temp = ret;
			if(pre1 == null) {
				temp.next = _this.head;
				_this.head = temp;
			} else {
				temp.next = pre1.next;
				pre1.next = temp;
			}
			_this.pushmod = _this.modified = true;
			_this.length++;
			let cx_ite1 = cb.cbsets.head;
			while(cx_ite1 != null) {
				let cb = cx_ite1.elt;
				cb.zip_listeners = true;
				cb.invalidate_pairs();
				cx_ite1 = cx_ite1.next;
			}
			if(pre) {
				let cx_ite = cb.interactors.head;
				while(cx_ite != null) {
					let i = cx_ite.elt;
					i.wake();
					cx_ite = cx_ite.next;
				}
			}
			ite2 = ite2.next;
		}
		this.options1.handler = $bind(this,this.cbtype_change1);
		this.options2.handler = $bind(this,this.cbtype_change2);
		this.with_uniquesets(true);
	}
	removedFromSpace() {
		this.with_uniquesets(false);
		let pre = this.type == ZPP_Flags.id_ListenerType_PRE;
		let _gthis = this;
		let ite1 = this.options1.includes.head;
		let ite2 = this.options2.includes.head;
		while(ite1 != null && ite2 != null) {
			let cb1 = ite1.elt;
			let cb2 = ite2.elt;
			if(cb1 == cb2) {
				cb1.listeners.remove(_gthis);
				let cx_ite = cb1.cbsets.head;
				while(cx_ite != null) {
					let cb = cx_ite.elt;
					cb.zip_listeners = true;
					cb.invalidate_pairs();
					cx_ite = cx_ite.next;
				}
				if(pre) {
					let cx_ite = cb1.interactors.head;
					while(cx_ite != null) {
						let i = cx_ite.elt;
						i.wake();
						cx_ite = cx_ite.next;
					}
				}
				ite1 = ite1.next;
				ite2 = ite2.next;
			} else if(cb1.id < cb2.id) {
				cb1.listeners.remove(_gthis);
				let cx_ite = cb1.cbsets.head;
				while(cx_ite != null) {
					let cb = cx_ite.elt;
					cb.zip_listeners = true;
					cb.invalidate_pairs();
					cx_ite = cx_ite.next;
				}
				if(pre) {
					let cx_ite = cb1.interactors.head;
					while(cx_ite != null) {
						let i = cx_ite.elt;
						i.wake();
						cx_ite = cx_ite.next;
					}
				}
				ite1 = ite1.next;
			} else {
				cb2.listeners.remove(_gthis);
				let cx_ite = cb2.cbsets.head;
				while(cx_ite != null) {
					let cb = cx_ite.elt;
					cb.zip_listeners = true;
					cb.invalidate_pairs();
					cx_ite = cx_ite.next;
				}
				if(pre) {
					let cx_ite = cb2.interactors.head;
					while(cx_ite != null) {
						let i = cx_ite.elt;
						i.wake();
						cx_ite = cx_ite.next;
					}
				}
				ite2 = ite2.next;
			}
		}
		while(ite1 != null) {
			let cb = ite1.elt;
			cb.listeners.remove(_gthis);
			let cx_ite = cb.cbsets.head;
			while(cx_ite != null) {
				let cb = cx_ite.elt;
				cb.zip_listeners = true;
				cb.invalidate_pairs();
				cx_ite = cx_ite.next;
			}
			if(pre) {
				let cx_ite = cb.interactors.head;
				while(cx_ite != null) {
					let i = cx_ite.elt;
					i.wake();
					cx_ite = cx_ite.next;
				}
			}
			ite1 = ite1.next;
		}
		while(ite2 != null) {
			let cb = ite2.elt;
			cb.listeners.remove(_gthis);
			let cx_ite = cb.cbsets.head;
			while(cx_ite != null) {
				let cb = cx_ite.elt;
				cb.zip_listeners = true;
				cb.invalidate_pairs();
				cx_ite = cx_ite.next;
			}
			if(pre) {
				let cx_ite = cb.interactors.head;
				while(cx_ite != null) {
					let i = cx_ite.elt;
					i.wake();
					cx_ite = cx_ite.next;
				}
			}
			ite2 = ite2.next;
		}
		this.options1.handler = null;
		this.options2.handler = null;
	}
	invalidate_precedence() {
		let _gthis = this;
		if(this.space != null) {
			let pre = this.type == ZPP_Flags.id_ListenerType_PRE;
			let ite1 = this.options1.includes.head;
			let ite2 = this.options2.includes.head;
			while(ite1 != null && ite2 != null) {
				let cb1 = ite1.elt;
				let cb2 = ite2.elt;
				if(cb1 == cb2) {
					cb1.listeners.remove(_gthis);
					let cx_ite = cb1.cbsets.head;
					while(cx_ite != null) {
						let cb = cx_ite.elt;
						cb.zip_listeners = true;
						cb.invalidate_pairs();
						cx_ite = cx_ite.next;
					}
					let pre1 = null;
					let cx_ite1 = cb1.listeners.head;
					while(cx_ite1 != null) {
						let j = cx_ite1.elt;
						if(_gthis.precedence > j.precedence || _gthis.precedence == j.precedence && _gthis.id > j.id) {
							break;
						}
						pre1 = cx_ite1;
						cx_ite1 = cx_ite1.next;
					}
					let _this = cb1.listeners;
					let ret;
					if(ZNPNode_ZPP_InteractionListener.zpp_pool == null) {
						ret = new ZNPNode_ZPP_InteractionListener();
					} else {
						ret = ZNPNode_ZPP_InteractionListener.zpp_pool;
						ZNPNode_ZPP_InteractionListener.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = _gthis;
					let temp = ret;
					if(pre1 == null) {
						temp.next = _this.head;
						_this.head = temp;
					} else {
						temp.next = pre1.next;
						pre1.next = temp;
					}
					_this.pushmod = _this.modified = true;
					_this.length++;
					let cx_ite2 = cb1.cbsets.head;
					while(cx_ite2 != null) {
						let cb = cx_ite2.elt;
						cb.zip_listeners = true;
						cb.invalidate_pairs();
						cx_ite2 = cx_ite2.next;
					}
					if(pre) {
						let cx_ite = cb1.interactors.head;
						while(cx_ite != null) {
							let i = cx_ite.elt;
							i.wake();
							cx_ite = cx_ite.next;
						}
					}
					ite1 = ite1.next;
					ite2 = ite2.next;
				} else if(cb1.id < cb2.id) {
					cb1.listeners.remove(_gthis);
					let cx_ite = cb1.cbsets.head;
					while(cx_ite != null) {
						let cb = cx_ite.elt;
						cb.zip_listeners = true;
						cb.invalidate_pairs();
						cx_ite = cx_ite.next;
					}
					let pre1 = null;
					let cx_ite1 = cb1.listeners.head;
					while(cx_ite1 != null) {
						let j = cx_ite1.elt;
						if(_gthis.precedence > j.precedence || _gthis.precedence == j.precedence && _gthis.id > j.id) {
							break;
						}
						pre1 = cx_ite1;
						cx_ite1 = cx_ite1.next;
					}
					let _this = cb1.listeners;
					let ret;
					if(ZNPNode_ZPP_InteractionListener.zpp_pool == null) {
						ret = new ZNPNode_ZPP_InteractionListener();
					} else {
						ret = ZNPNode_ZPP_InteractionListener.zpp_pool;
						ZNPNode_ZPP_InteractionListener.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = _gthis;
					let temp = ret;
					if(pre1 == null) {
						temp.next = _this.head;
						_this.head = temp;
					} else {
						temp.next = pre1.next;
						pre1.next = temp;
					}
					_this.pushmod = _this.modified = true;
					_this.length++;
					let cx_ite2 = cb1.cbsets.head;
					while(cx_ite2 != null) {
						let cb = cx_ite2.elt;
						cb.zip_listeners = true;
						cb.invalidate_pairs();
						cx_ite2 = cx_ite2.next;
					}
					if(pre) {
						let cx_ite = cb1.interactors.head;
						while(cx_ite != null) {
							let i = cx_ite.elt;
							i.wake();
							cx_ite = cx_ite.next;
						}
					}
					ite1 = ite1.next;
				} else {
					cb2.listeners.remove(_gthis);
					let cx_ite = cb2.cbsets.head;
					while(cx_ite != null) {
						let cb = cx_ite.elt;
						cb.zip_listeners = true;
						cb.invalidate_pairs();
						cx_ite = cx_ite.next;
					}
					let pre1 = null;
					let cx_ite1 = cb2.listeners.head;
					while(cx_ite1 != null) {
						let j = cx_ite1.elt;
						if(_gthis.precedence > j.precedence || _gthis.precedence == j.precedence && _gthis.id > j.id) {
							break;
						}
						pre1 = cx_ite1;
						cx_ite1 = cx_ite1.next;
					}
					let _this = cb2.listeners;
					let ret;
					if(ZNPNode_ZPP_InteractionListener.zpp_pool == null) {
						ret = new ZNPNode_ZPP_InteractionListener();
					} else {
						ret = ZNPNode_ZPP_InteractionListener.zpp_pool;
						ZNPNode_ZPP_InteractionListener.zpp_pool = ret.next;
						ret.next = null;
					}
					ret.elt = _gthis;
					let temp = ret;
					if(pre1 == null) {
						temp.next = _this.head;
						_this.head = temp;
					} else {
						temp.next = pre1.next;
						pre1.next = temp;
					}
					_this.pushmod = _this.modified = true;
					_this.length++;
					let cx_ite2 = cb2.cbsets.head;
					while(cx_ite2 != null) {
						let cb = cx_ite2.elt;
						cb.zip_listeners = true;
						cb.invalidate_pairs();
						cx_ite2 = cx_ite2.next;
					}
					if(pre) {
						let cx_ite = cb2.interactors.head;
						while(cx_ite != null) {
							let i = cx_ite.elt;
							i.wake();
							cx_ite = cx_ite.next;
						}
					}
					ite2 = ite2.next;
				}
			}
			while(ite1 != null) {
				let cb = ite1.elt;
				cb.listeners.remove(_gthis);
				let cx_ite = cb.cbsets.head;
				while(cx_ite != null) {
					let cb = cx_ite.elt;
					cb.zip_listeners = true;
					cb.invalidate_pairs();
					cx_ite = cx_ite.next;
				}
				let pre1 = null;
				let cx_ite1 = cb.listeners.head;
				while(cx_ite1 != null) {
					let j = cx_ite1.elt;
					if(_gthis.precedence > j.precedence || _gthis.precedence == j.precedence && _gthis.id > j.id) {
						break;
					}
					pre1 = cx_ite1;
					cx_ite1 = cx_ite1.next;
				}
				let _this = cb.listeners;
				let ret;
				if(ZNPNode_ZPP_InteractionListener.zpp_pool == null) {
					ret = new ZNPNode_ZPP_InteractionListener();
				} else {
					ret = ZNPNode_ZPP_InteractionListener.zpp_pool;
					ZNPNode_ZPP_InteractionListener.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.elt = _gthis;
				let temp = ret;
				if(pre1 == null) {
					temp.next = _this.head;
					_this.head = temp;
				} else {
					temp.next = pre1.next;
					pre1.next = temp;
				}
				_this.pushmod = _this.modified = true;
				_this.length++;
				let cx_ite2 = cb.cbsets.head;
				while(cx_ite2 != null) {
					let cb = cx_ite2.elt;
					cb.zip_listeners = true;
					cb.invalidate_pairs();
					cx_ite2 = cx_ite2.next;
				}
				if(pre) {
					let cx_ite = cb.interactors.head;
					while(cx_ite != null) {
						let i = cx_ite.elt;
						i.wake();
						cx_ite = cx_ite.next;
					}
				}
				ite1 = ite1.next;
			}
			while(ite2 != null) {
				let cb = ite2.elt;
				cb.listeners.remove(_gthis);
				let cx_ite = cb.cbsets.head;
				while(cx_ite != null) {
					let cb = cx_ite.elt;
					cb.zip_listeners = true;
					cb.invalidate_pairs();
					cx_ite = cx_ite.next;
				}
				let pre1 = null;
				let cx_ite1 = cb.listeners.head;
				while(cx_ite1 != null) {
					let j = cx_ite1.elt;
					if(_gthis.precedence > j.precedence || _gthis.precedence == j.precedence && _gthis.id > j.id) {
						break;
					}
					pre1 = cx_ite1;
					cx_ite1 = cx_ite1.next;
				}
				let _this = cb.listeners;
				let ret;
				if(ZNPNode_ZPP_InteractionListener.zpp_pool == null) {
					ret = new ZNPNode_ZPP_InteractionListener();
				} else {
					ret = ZNPNode_ZPP_InteractionListener.zpp_pool;
					ZNPNode_ZPP_InteractionListener.zpp_pool = ret.next;
					ret.next = null;
				}
				ret.elt = _gthis;
				let temp = ret;
				if(pre1 == null) {
					temp.next = _this.head;
					_this.head = temp;
				} else {
					temp.next = pre1.next;
					pre1.next = temp;
				}
				_this.pushmod = _this.modified = true;
				_this.length++;
				let cx_ite2 = cb.cbsets.head;
				while(cx_ite2 != null) {
					let cb = cx_ite2.elt;
					cb.zip_listeners = true;
					cb.invalidate_pairs();
					cx_ite2 = cx_ite2.next;
				}
				if(pre) {
					let cx_ite = cb.interactors.head;
					while(cx_ite != null) {
						let i = cx_ite.elt;
						i.wake();
						cx_ite = cx_ite.next;
					}
				}
				ite2 = ite2.next;
			}
		}
	}
	cbtype_change1(cb,included,added) {
		this.cbtype_change(this.options1,cb,included,added);
	}
	cbtype_change2(cb,included,added) {
		this.cbtype_change(this.options2,cb,included,added);
	}
	cbtype_change(options,cb,included,added) {
		this.removedFromSpace();
		if(included) {
			if(added) {
				let pre = null;
				let cx_ite = options.includes.head;
				while(cx_ite != null) {
					let j = cx_ite.elt;
					if(cb.id < j.id) {
						break;
					}
					pre = cx_ite;
					cx_ite = cx_ite.next;
				}
				let _this = options.includes;
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
			} else {
				options.includes.remove(cb);
			}
		} else if(added) {
			let pre = null;
			let cx_ite = options.excludes.head;
			while(cx_ite != null) {
				let j = cx_ite.elt;
				if(cb.id < j.id) {
					break;
				}
				pre = cx_ite;
				cx_ite = cx_ite.next;
			}
			let _this = options.excludes;
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
		} else {
			options.excludes.remove(cb);
		}
		this.addedToSpace();
	}
	swapEvent(newev) {
		if(this.type == ZPP_Flags.id_ListenerType_PRE) {
			throw haxe_Exception.thrown("Error: PreListener event can only be PRE");
		} else if(newev != ZPP_Flags.id_CbEvent_BEGIN && newev != ZPP_Flags.id_CbEvent_END && newev != ZPP_Flags.id_CbEvent_ONGOING) {
			throw haxe_Exception.thrown("Error: InteractionListener event must be either BEGIN, END, ONGOING");
		}
		this.removedFromSpace();
		this.event = newev;
		this.addedToSpace();
	}
}
ZPP_InteractionListener.UCbSet = new ZNPList_ZPP_CbSet();
ZPP_InteractionListener.VCbSet = new ZNPList_ZPP_CbSet();
ZPP_InteractionListener.WCbSet = new ZNPList_ZPP_CbSet();
ZPP_InteractionListener.UCbType = new ZNPList_ZPP_CbType();
ZPP_InteractionListener.VCbType = new ZNPList_ZPP_CbType();
ZPP_InteractionListener.WCbType = new ZNPList_ZPP_CbType();
