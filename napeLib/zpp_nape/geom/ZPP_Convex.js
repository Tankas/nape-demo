export default class ZPP_Convex {
	static isinner(a,b,c) {
		let ux = 0.0;
		let uy = 0.0;
		ux = a.x - b.x;
		uy = a.y - b.y;
		let vx = 0.0;
		let vy = 0.0;
		vx = c.x - b.x;
		vy = c.y - b.y;
		return vy * ux - vx * uy >= 0;
	}
	static optimise(P) {
		let F = P.vertices;
		let L = P.vertices;
		if(F != null) {
			let nite = F;
			while(true) {
				let p = nite;
				p.sort();
				nite = nite.next;
				if(!(nite != L)) {
					break;
				}
			}
		}
		let F1 = P.vertices;
		let L1 = P.vertices;
		if(F1 != null) {
			let nite = F1;
			while(true) {
				let p = nite;
				let pright = p.prev;
				let ppre = null;
				let cx_ite = p.diagonals.head;
				while(cx_ite != null) {
					let pdiag = cx_ite.elt;
					let pleft = cx_ite.next == null ? p.next : cx_ite.next.elt;
					if(!ZPP_Convex.isinner(pleft,p,pright)) {
						ppre = cx_ite;
						pright = pdiag;
						cx_ite = cx_ite.next;
						continue;
					}
					let removable = true;
					let q = pdiag;
					let qright = q.prev;
					let qpre = null;
					let cx_ite1 = q.diagonals.head;
					while(cx_ite1 != null) {
						let qdiag = cx_ite1.elt;
						if(qdiag == p) {
							let qleft = cx_ite1.next == null ? q.next : cx_ite1.next.elt;
							removable = ZPP_Convex.isinner(qleft,q,qright);
							break;
						}
						qright = qdiag;
						qpre = cx_ite1;
						cx_ite1 = cx_ite1.next;
					}
					if(removable) {
						cx_ite = p.diagonals.erase(ppre);
						q.diagonals.erase(qpre);
						continue;
					}
					pright = pdiag;
					ppre = cx_ite;
					cx_ite = cx_ite.next;
				}
				nite = nite.next;
				if(!(nite != L1)) {
					break;
				}
			}
		}
	}
}
