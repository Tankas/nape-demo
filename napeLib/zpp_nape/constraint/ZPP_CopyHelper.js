export default class ZPP_CopyHelper {
	constructor() {
		this.cb = null;
		this.bc = null;
		this.id = 0;
	}
	static dict(id,bc) {
		let ret = new ZPP_CopyHelper();
		ret.id = id;
		ret.bc = bc;
		return ret;
	}
	static todo(id,cb) {
		let ret = new ZPP_CopyHelper();
		ret.id = id;
		ret.cb = cb;
		return ret;
	}
}
