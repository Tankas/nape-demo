export default class ZPP_VecMath {
	static vec_dsq(ax,ay,bx,by) {
		let dx = 0.0;
		let dy = 0.0;
		dx = ax - bx;
		dy = ay - by;
		return dx * dx + dy * dy;
	}
	static vec_distance(ax,ay,bx,by) {
		let dx = 0.0;
		let dy = 0.0;
		dx = ax - bx;
		dy = ay - by;
		return Math.sqrt(dx * dx + dy * dy);
	}
}
