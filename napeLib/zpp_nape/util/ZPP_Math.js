export default class ZPP_Math {
	static sqrt(x) {
		return Math.sqrt(x);
	}
	static invsqrt(x) {
		return 1.0 / Math.sqrt(x);
	}
	static sqr(x) {
		return x * x;
	}
	static clamp2(x,a) {
		let a1 = -a;
		if(x < a1) {
			return a1;
		} else if(x > a) {
			return a;
		} else {
			return x;
		}
	}
	static clamp(x,a,b) {
		if(x < a) {
			return a;
		} else if(x > b) {
			return b;
		} else {
			return x;
		}
	}
}
