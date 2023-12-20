import ZPP_Set_ZPP_CbSet from '../../zpp_nape/util/ZPP_Set_ZPP_CbSet.js';
import ZPP_Set_ZPP_SimpleEvent from '../../zpp_nape/util/ZPP_Set_ZPP_SimpleEvent.js';
import ZPP_Set_ZPP_SimpleSeg from '../../zpp_nape/util/ZPP_Set_ZPP_SimpleSeg.js';
import ZPP_Set_ZPP_SimpleVert from '../../zpp_nape/util/ZPP_Set_ZPP_SimpleVert.js';
import ZPP_Set_ZPP_PartitionPair from '../../zpp_nape/util/ZPP_Set_ZPP_PartitionPair.js';
import ZPP_Set_ZPP_PartitionVertex from '../../zpp_nape/util/ZPP_Set_ZPP_PartitionVertex.js';
import ZPP_Set_ZPP_CbSetPair from '../../zpp_nape/util/ZPP_Set_ZPP_CbSetPair.js';
import ZPP_Set_ZPP_Body from '../../zpp_nape/util/ZPP_Set_ZPP_Body.js';
import ZPP_PubPool from '../../zpp_nape/util/ZPP_PubPool.js';
import ZNPNode_RayResult from '../../zpp_nape/util/ZNPNode_RayResult.js';
import ZNPNode_ZPP_GeomPoly from '../../zpp_nape/util/ZNPNode_ZPP_GeomPoly.js';
import ZNPNode_ConvexResult from '../../zpp_nape/util/ZNPNode_ConvexResult.js';
import ZNPNode_ZPP_ToiEvent from '../../zpp_nape/util/ZNPNode_ZPP_ToiEvent.js';
import ZNPNode_ZPP_Listener from '../../zpp_nape/util/ZNPNode_ZPP_Listener.js';
import ZNPNode_ZPP_ColArbiter from '../../zpp_nape/util/ZNPNode_ZPP_ColArbiter.js';
import ZNPNode_ZPP_SensorArbiter from '../../zpp_nape/util/ZNPNode_ZPP_SensorArbiter.js';
import ZNPNode_ZPP_FluidArbiter from '../../zpp_nape/util/ZNPNode_ZPP_FluidArbiter.js';
import ZNPNode_ZPP_InteractionGroup from '../../zpp_nape/util/ZNPNode_ZPP_InteractionGroup.js';
import ZNPNode_ZPP_AABBNode from '../../zpp_nape/util/ZNPNode_ZPP_AABBNode.js';
import ZNPNode_ZPP_Component from '../../zpp_nape/util/ZNPNode_ZPP_Component.js';
import ZNPNode_ZPP_Vec2 from '../../zpp_nape/util/ZNPNode_ZPP_Vec2.js';
import ZNPNode_ZPP_Edge from '../../zpp_nape/util/ZNPNode_ZPP_Edge.js';
import ZNPNode_ZPP_AABBPair from '../../zpp_nape/util/ZNPNode_ZPP_AABBPair.js';
import ZNPNode_ZPP_SimpleEvent from '../../zpp_nape/util/ZNPNode_ZPP_SimpleEvent.js';
import ZNPNode_ZPP_SimpleVert from '../../zpp_nape/util/ZNPNode_ZPP_SimpleVert.js';
import ZNPNode_ZPP_SimplifyP from '../../zpp_nape/util/ZNPNode_ZPP_SimplifyP.js';
import ZNPNode_ZPP_GeomVert from '../../zpp_nape/util/ZNPNode_ZPP_GeomVert.js';
import ZNPNode_ZPP_PartitionedPoly from '../../zpp_nape/util/ZNPNode_ZPP_PartitionedPoly.js';
import ZNPNode_ZPP_PartitionVertex from '../../zpp_nape/util/ZNPNode_ZPP_PartitionVertex.js';
import ZNPNode_ZPP_CutVert from '../../zpp_nape/util/ZNPNode_ZPP_CutVert.js';
import ZNPNode_ZPP_CutInt from '../../zpp_nape/util/ZNPNode_ZPP_CutInt.js';
import ZNPNode_ZPP_CbSetPair from '../../zpp_nape/util/ZNPNode_ZPP_CbSetPair.js';
import ZNPNode_ZPP_ConstraintListener from '../../zpp_nape/util/ZNPNode_ZPP_ConstraintListener.js';
import ZNPNode_ZPP_Arbiter from '../../zpp_nape/util/ZNPNode_ZPP_Arbiter.js';
import ZNPNode_ZPP_BodyListener from '../../zpp_nape/util/ZNPNode_ZPP_BodyListener.js';
import ZNPNode_ZPP_Interactor from '../../zpp_nape/util/ZNPNode_ZPP_Interactor.js';
import ZNPNode_ZPP_CbSet from '../../zpp_nape/util/ZNPNode_ZPP_CbSet.js';
import ZNPNode_ZPP_InteractionListener from '../../zpp_nape/util/ZNPNode_ZPP_InteractionListener.js';
import ZNPNode_ZPP_Compound from '../../zpp_nape/util/ZNPNode_ZPP_Compound.js';
import ZNPNode_ZPP_Constraint from '../../zpp_nape/util/ZNPNode_ZPP_Constraint.js';
import ZNPNode_ZPP_Body from '../../zpp_nape/util/ZNPNode_ZPP_Body.js';
import ZNPNode_ZPP_Shape from '../../zpp_nape/util/ZNPNode_ZPP_Shape.js';
import ZNPNode_ZPP_CallbackSet from '../../zpp_nape/util/ZNPNode_ZPP_CallbackSet.js';
import ZNPNode_ZPP_CbType from '../../zpp_nape/util/ZNPNode_ZPP_CbType.js';
import Hashable2_Boolfalse from '../../zpp_nape/util/Hashable2_Boolfalse.js';
import ZPP_Debug from '../../zpp_nape/util/ZPP_Debug.js';
import ZPP_SweepData from '../../zpp_nape/space/ZPP_SweepData.js';
import ZPP_CallbackSet from '../../zpp_nape/space/ZPP_CallbackSet.js';
import ZPP_Component from '../../zpp_nape/space/ZPP_Component.js';
import ZPP_Island from '../../zpp_nape/space/ZPP_Island.js';
import ZPP_AABBPair from '../../zpp_nape/space/ZPP_AABBPair.js';
import ZPP_AABBNode from '../../zpp_nape/space/ZPP_AABBNode.js';
import ZPP_Edge from '../../zpp_nape/shape/ZPP_Edge.js';
import ZPP_Material from '../../zpp_nape/phys/ZPP_Material.js';
import ZPP_FluidProperties from '../../zpp_nape/phys/ZPP_FluidProperties.js';
import ZPP_Vec2 from '../../zpp_nape/geom/ZPP_Vec2.js';
import ZPP_PartitionPair from '../../zpp_nape/geom/ZPP_PartitionPair.js';
import ZPP_ToiEvent from '../../zpp_nape/geom/ZPP_ToiEvent.js';
import ZPP_SimplifyP from '../../zpp_nape/geom/ZPP_SimplifyP.js';
import ZPP_SimplifyV from '../../zpp_nape/geom/ZPP_SimplifyV.js';
import ZPP_SimpleEvent from '../../zpp_nape/geom/ZPP_SimpleEvent.js';
import ZPP_SimpleSeg from '../../zpp_nape/geom/ZPP_SimpleSeg.js';
import ZPP_SimpleVert from '../../zpp_nape/geom/ZPP_SimpleVert.js';
import ZPP_PartitionedPoly from '../../zpp_nape/geom/ZPP_PartitionedPoly.js';
import ZPP_PartitionVertex from '../../zpp_nape/geom/ZPP_PartitionVertex.js';
import ZPP_Mat23 from '../../zpp_nape/geom/ZPP_Mat23.js';
import ZPP_MarchPair from '../../zpp_nape/geom/ZPP_MarchPair.js';
import ZPP_MarchSpan from '../../zpp_nape/geom/ZPP_MarchSpan.js';
import ZPP_GeomVertexIterator from '../../zpp_nape/geom/ZPP_GeomVertexIterator.js';
import ZPP_GeomVert from '../../zpp_nape/geom/ZPP_GeomVert.js';
import ZPP_CutInt from '../../zpp_nape/geom/ZPP_CutInt.js';
import ZPP_CutVert from '../../zpp_nape/geom/ZPP_CutVert.js';
import ZPP_AABB from '../../zpp_nape/geom/ZPP_AABB.js';
import ZPP_InteractionFilter from '../../zpp_nape/dynamics/ZPP_InteractionFilter.js';
import ZPP_Contact from '../../zpp_nape/dynamics/ZPP_Contact.js';
import ZPP_ColArbiter from '../../zpp_nape/dynamics/ZPP_ColArbiter.js';
import ZPP_FluidArbiter from '../../zpp_nape/dynamics/ZPP_FluidArbiter.js';
import ZPP_SensorArbiter from '../../zpp_nape/dynamics/ZPP_SensorArbiter.js';
import ZPP_Flags from '../../zpp_nape/util/ZPP_Flags.js';
import ZPP_CbSetPair from '../../zpp_nape/callbacks/ZPP_CbSetPair.js';
import ZPP_CbSet from '../../zpp_nape/callbacks/ZPP_CbSet.js';
import ZPP_Callback from '../../zpp_nape/callbacks/ZPP_Callback.js';
import ShapeIterator from '../shape/ShapeIterator.js';
import EdgeIterator from '../shape/EdgeIterator.js';
import InteractorIterator from '../phys/InteractorIterator.js';
import CompoundIterator from '../phys/CompoundIterator.js';
import BodyIterator from '../phys/BodyIterator.js';
import Vec2Iterator from '../geom/Vec2Iterator.js';
import RayResultIterator from '../geom/RayResultIterator.js';
import GeomPolyIterator from '../geom/GeomPolyIterator.js';
import ConvexResultIterator from '../geom/ConvexResultIterator.js';
import InteractionGroupIterator from '../dynamics/InteractionGroupIterator.js';
import ContactIterator from '../dynamics/ContactIterator.js';
import ArbiterIterator from '../dynamics/ArbiterIterator.js';
import Graphics from '../debug/Graphics.js';
import ConstraintIterator from '../constraint/ConstraintIterator.js';
import ListenerIterator from '../callbacks/ListenerIterator.js';
import CbTypeIterator from '../callbacks/CbTypeIterator.js';
export default class Debug {
	constructor() {
		if(Debug._hx_skip_constructor) {
			return;
		}
		this._hx_constructor();
	}
	_hx_constructor() {
		this.cullingEnabled = false;
		this.colour = null;
		this.drawConstraints = false;
		this.drawShapeAngleIndicators = false;
		this.drawShapeDetail = false;
		this.drawBodyDetail = false;
		this.drawBodies = false;
		this.drawSensorArbiters = false;
		this.drawFluidArbiters = false;
		this.drawCollisionArbiters = false;
		this.zpp_inner = null;
		if(!ZPP_Debug.internal) {
			throw haxe_Exception.thrown("Error: Cannot instantiate Debug derp! Use ShapeDebug, or BitmapDebug on flash10+");
		}
		this.drawCollisionArbiters = false;
		this.drawFluidArbiters = false;
		this.drawSensorArbiters = false;
		this.drawBodies = true;
		this.drawShapeAngleIndicators = true;
		this.drawBodyDetail = false;
		this.drawShapeDetail = false;
		this.drawConstraints = false;
		this.cullingEnabled = false;
		this.colour = null;
	}
	get_bgColour() {
		return this.zpp_inner.bg_col;
	}
	set_bgColour(bgColour) {
		this.zpp_inner.d_shape.setbg(bgColour);
		return this.zpp_inner.bg_col;
	}
	get_display() {
		return this.zpp_inner.d_shape.shape;
	}
	get_transform() {
		if(this.zpp_inner.xform == null) {
			this.zpp_inner.setform();
		}
		return this.zpp_inner.xform.outer;
	}
	set_transform(transform) {
		if(transform == null) {
			throw haxe_Exception.thrown("Error: Cannot set Debug::transform to null");
		}
		if(this.zpp_inner.xform == null) {
			this.zpp_inner.setform();
		}
		this.zpp_inner.xform.outer.set(transform);
		if(this.zpp_inner.xform == null) {
			this.zpp_inner.setform();
		}
		return this.zpp_inner.xform.outer;
	}
	clear() {
	}
	flush() {
	}
	draw(object) {
	}
	drawLine(start,end,colour) {
	}
	drawCurve(start,control,end,colour) {
	}
	drawCircle(position,radius,colour) {
	}
	drawAABB(aabb,colour) {
	}
	drawFilledTriangle(p0,p1,p2,colour) {
	}
	drawFilledCircle(position,radius,colour) {
	}
	drawPolygon(polygon,colour) {
	}
	drawFilledPolygon(polygon,colour) {
	}
	drawSpring(start,end,colour,coils,radius) {
		if(radius == null) {
			radius = 3.0;
		}
		if(coils == null) {
			coils = 3;
		}
	}
	static version() {
		return "Nape 2.0.19";
	}
	static clearObjectPools() {
		while(ConstraintIterator.zpp_pool != null) {
			let nxt = ConstraintIterator.zpp_pool.zpp_next;
			ConstraintIterator.zpp_pool.zpp_next = null;
			ConstraintIterator.zpp_pool = nxt;
		}
		while(InteractorIterator.zpp_pool != null) {
			let nxt = InteractorIterator.zpp_pool.zpp_next;
			InteractorIterator.zpp_pool.zpp_next = null;
			InteractorIterator.zpp_pool = nxt;
		}
		while(BodyIterator.zpp_pool != null) {
			let nxt = BodyIterator.zpp_pool.zpp_next;
			BodyIterator.zpp_pool.zpp_next = null;
			BodyIterator.zpp_pool = nxt;
		}
		while(CompoundIterator.zpp_pool != null) {
			let nxt = CompoundIterator.zpp_pool.zpp_next;
			CompoundIterator.zpp_pool.zpp_next = null;
			CompoundIterator.zpp_pool = nxt;
		}
		while(ListenerIterator.zpp_pool != null) {
			let nxt = ListenerIterator.zpp_pool.zpp_next;
			ListenerIterator.zpp_pool.zpp_next = null;
			ListenerIterator.zpp_pool = nxt;
		}
		while(CbTypeIterator.zpp_pool != null) {
			let nxt = CbTypeIterator.zpp_pool.zpp_next;
			CbTypeIterator.zpp_pool.zpp_next = null;
			CbTypeIterator.zpp_pool = nxt;
		}
		while(ConvexResultIterator.zpp_pool != null) {
			let nxt = ConvexResultIterator.zpp_pool.zpp_next;
			ConvexResultIterator.zpp_pool.zpp_next = null;
			ConvexResultIterator.zpp_pool = nxt;
		}
		while(GeomPolyIterator.zpp_pool != null) {
			let nxt = GeomPolyIterator.zpp_pool.zpp_next;
			GeomPolyIterator.zpp_pool.zpp_next = null;
			GeomPolyIterator.zpp_pool = nxt;
		}
		while(Vec2Iterator.zpp_pool != null) {
			let nxt = Vec2Iterator.zpp_pool.zpp_next;
			Vec2Iterator.zpp_pool.zpp_next = null;
			Vec2Iterator.zpp_pool = nxt;
		}
		while(RayResultIterator.zpp_pool != null) {
			let nxt = RayResultIterator.zpp_pool.zpp_next;
			RayResultIterator.zpp_pool.zpp_next = null;
			RayResultIterator.zpp_pool = nxt;
		}
		while(ShapeIterator.zpp_pool != null) {
			let nxt = ShapeIterator.zpp_pool.zpp_next;
			ShapeIterator.zpp_pool.zpp_next = null;
			ShapeIterator.zpp_pool = nxt;
		}
		while(EdgeIterator.zpp_pool != null) {
			let nxt = EdgeIterator.zpp_pool.zpp_next;
			EdgeIterator.zpp_pool.zpp_next = null;
			EdgeIterator.zpp_pool = nxt;
		}
		while(ContactIterator.zpp_pool != null) {
			let nxt = ContactIterator.zpp_pool.zpp_next;
			ContactIterator.zpp_pool.zpp_next = null;
			ContactIterator.zpp_pool = nxt;
		}
		while(ArbiterIterator.zpp_pool != null) {
			let nxt = ArbiterIterator.zpp_pool.zpp_next;
			ArbiterIterator.zpp_pool.zpp_next = null;
			ArbiterIterator.zpp_pool = nxt;
		}
		while(InteractionGroupIterator.zpp_pool != null) {
			let nxt = InteractionGroupIterator.zpp_pool.zpp_next;
			InteractionGroupIterator.zpp_pool.zpp_next = null;
			InteractionGroupIterator.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_CbType.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_CbType.zpp_pool.next;
			ZNPNode_ZPP_CbType.zpp_pool.next = null;
			ZNPNode_ZPP_CbType.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_CallbackSet.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_CallbackSet.zpp_pool.next;
			ZNPNode_ZPP_CallbackSet.zpp_pool.next = null;
			ZNPNode_ZPP_CallbackSet.zpp_pool = nxt;
		}
		while(ZPP_Material.zpp_pool != null) {
			let nxt = ZPP_Material.zpp_pool.next;
			ZPP_Material.zpp_pool.next = null;
			ZPP_Material.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_Shape.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_Shape.zpp_pool.next;
			ZNPNode_ZPP_Shape.zpp_pool.next = null;
			ZNPNode_ZPP_Shape.zpp_pool = nxt;
		}
		while(ZPP_FluidProperties.zpp_pool != null) {
			let nxt = ZPP_FluidProperties.zpp_pool.next;
			ZPP_FluidProperties.zpp_pool.next = null;
			ZPP_FluidProperties.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_Body.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_Body.zpp_pool.next;
			ZNPNode_ZPP_Body.zpp_pool.next = null;
			ZNPNode_ZPP_Body.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_Constraint.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_Constraint.zpp_pool.next;
			ZNPNode_ZPP_Constraint.zpp_pool.next = null;
			ZNPNode_ZPP_Constraint.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_Compound.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_Compound.zpp_pool.next;
			ZNPNode_ZPP_Compound.zpp_pool.next = null;
			ZNPNode_ZPP_Compound.zpp_pool = nxt;
		}
		while(ZPP_CbSetPair.zpp_pool != null) {
			let nxt = ZPP_CbSetPair.zpp_pool.next;
			ZPP_CbSetPair.zpp_pool.next = null;
			ZPP_CbSetPair.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_InteractionListener.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_InteractionListener.zpp_pool.next;
			ZNPNode_ZPP_InteractionListener.zpp_pool.next = null;
			ZNPNode_ZPP_InteractionListener.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_CbSet.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_CbSet.zpp_pool.next;
			ZNPNode_ZPP_CbSet.zpp_pool.next = null;
			ZNPNode_ZPP_CbSet.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_Interactor.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_Interactor.zpp_pool.next;
			ZNPNode_ZPP_Interactor.zpp_pool.next = null;
			ZNPNode_ZPP_Interactor.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_BodyListener.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_BodyListener.zpp_pool.next;
			ZNPNode_ZPP_BodyListener.zpp_pool.next = null;
			ZNPNode_ZPP_BodyListener.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_Arbiter.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_Arbiter.zpp_pool.next;
			ZNPNode_ZPP_Arbiter.zpp_pool.next = null;
			ZNPNode_ZPP_Arbiter.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_ConstraintListener.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_ConstraintListener.zpp_pool.next;
			ZNPNode_ZPP_ConstraintListener.zpp_pool.next = null;
			ZNPNode_ZPP_ConstraintListener.zpp_pool = nxt;
		}
		while(ZPP_Set_ZPP_Body.zpp_pool != null) {
			let nxt = ZPP_Set_ZPP_Body.zpp_pool.next;
			ZPP_Set_ZPP_Body.zpp_pool.next = null;
			ZPP_Set_ZPP_Body.zpp_pool = nxt;
		}
		while(ZPP_CbSet.zpp_pool != null) {
			let nxt = ZPP_CbSet.zpp_pool.next;
			ZPP_CbSet.zpp_pool.next = null;
			ZPP_CbSet.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_CbSetPair.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_CbSetPair.zpp_pool.next;
			ZNPNode_ZPP_CbSetPair.zpp_pool.next = null;
			ZNPNode_ZPP_CbSetPair.zpp_pool = nxt;
		}
		while(ZPP_Callback.zpp_pool != null) {
			let nxt = ZPP_Callback.zpp_pool.next;
			ZPP_Callback.zpp_pool.next = null;
			ZPP_Callback.zpp_pool = nxt;
		}
		while(ZPP_GeomVert.zpp_pool != null) {
			let nxt = ZPP_GeomVert.zpp_pool.next;
			ZPP_GeomVert.zpp_pool.next = null;
			ZPP_GeomVert.zpp_pool = nxt;
		}
		while(ZPP_GeomVertexIterator.zpp_pool != null) {
			let nxt = ZPP_GeomVertexIterator.zpp_pool.next;
			ZPP_GeomVertexIterator.zpp_pool.next = null;
			ZPP_GeomVertexIterator.zpp_pool = nxt;
		}
		while(ZPP_Set_ZPP_CbSetPair.zpp_pool != null) {
			let nxt = ZPP_Set_ZPP_CbSetPair.zpp_pool.next;
			ZPP_Set_ZPP_CbSetPair.zpp_pool.next = null;
			ZPP_Set_ZPP_CbSetPair.zpp_pool = nxt;
		}
		while(ZPP_Mat23.zpp_pool != null) {
			let nxt = ZPP_Mat23.zpp_pool.next;
			ZPP_Mat23.zpp_pool.next = null;
			ZPP_Mat23.zpp_pool = nxt;
		}
		while(ZPP_CutVert.zpp_pool != null) {
			let nxt = ZPP_CutVert.zpp_pool.next;
			ZPP_CutVert.zpp_pool.next = null;
			ZPP_CutVert.zpp_pool = nxt;
		}
		while(ZPP_CutInt.zpp_pool != null) {
			let nxt = ZPP_CutInt.zpp_pool.next;
			ZPP_CutInt.zpp_pool.next = null;
			ZPP_CutInt.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_CutInt.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_CutInt.zpp_pool.next;
			ZNPNode_ZPP_CutInt.zpp_pool.next = null;
			ZNPNode_ZPP_CutInt.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_CutVert.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_CutVert.zpp_pool.next;
			ZNPNode_ZPP_CutVert.zpp_pool.next = null;
			ZNPNode_ZPP_CutVert.zpp_pool = nxt;
		}
		while(ZPP_Vec2.zpp_pool != null) {
			let nxt = ZPP_Vec2.zpp_pool.next;
			ZPP_Vec2.zpp_pool.next = null;
			ZPP_Vec2.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_PartitionVertex.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_PartitionVertex.zpp_pool.next;
			ZNPNode_ZPP_PartitionVertex.zpp_pool.next = null;
			ZNPNode_ZPP_PartitionVertex.zpp_pool = nxt;
		}
		while(ZPP_PartitionVertex.zpp_pool != null) {
			let nxt = ZPP_PartitionVertex.zpp_pool.next;
			ZPP_PartitionVertex.zpp_pool.next = null;
			ZPP_PartitionVertex.zpp_pool = nxt;
		}
		while(ZPP_Set_ZPP_PartitionVertex.zpp_pool != null) {
			let nxt = ZPP_Set_ZPP_PartitionVertex.zpp_pool.next;
			ZPP_Set_ZPP_PartitionVertex.zpp_pool.next = null;
			ZPP_Set_ZPP_PartitionVertex.zpp_pool = nxt;
		}
		while(ZPP_PartitionedPoly.zpp_pool != null) {
			let nxt = ZPP_PartitionedPoly.zpp_pool.next;
			ZPP_PartitionedPoly.zpp_pool.next = null;
			ZPP_PartitionedPoly.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_PartitionedPoly.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_PartitionedPoly.zpp_pool.next;
			ZNPNode_ZPP_PartitionedPoly.zpp_pool.next = null;
			ZNPNode_ZPP_PartitionedPoly.zpp_pool = nxt;
		}
		while(ZPP_PartitionPair.zpp_pool != null) {
			let nxt = ZPP_PartitionPair.zpp_pool.next;
			ZPP_PartitionPair.zpp_pool.next = null;
			ZPP_PartitionPair.zpp_pool = nxt;
		}
		while(ZPP_Set_ZPP_PartitionPair.zpp_pool != null) {
			let nxt = ZPP_Set_ZPP_PartitionPair.zpp_pool.next;
			ZPP_Set_ZPP_PartitionPair.zpp_pool.next = null;
			ZPP_Set_ZPP_PartitionPair.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_GeomVert.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_GeomVert.zpp_pool.next;
			ZNPNode_ZPP_GeomVert.zpp_pool.next = null;
			ZNPNode_ZPP_GeomVert.zpp_pool = nxt;
		}
		while(ZPP_SimplifyV.zpp_pool != null) {
			let nxt = ZPP_SimplifyV.zpp_pool.next;
			ZPP_SimplifyV.zpp_pool.next = null;
			ZPP_SimplifyV.zpp_pool = nxt;
		}
		while(ZPP_SimplifyP.zpp_pool != null) {
			let nxt = ZPP_SimplifyP.zpp_pool.next;
			ZPP_SimplifyP.zpp_pool.next = null;
			ZPP_SimplifyP.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_SimplifyP.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_SimplifyP.zpp_pool.next;
			ZNPNode_ZPP_SimplifyP.zpp_pool.next = null;
			ZNPNode_ZPP_SimplifyP.zpp_pool = nxt;
		}
		while(ZPP_AABB.zpp_pool != null) {
			let nxt = ZPP_AABB.zpp_pool.next;
			ZPP_AABB.zpp_pool.next = null;
			ZPP_AABB.zpp_pool = nxt;
		}
		while(ZPP_ToiEvent.zpp_pool != null) {
			let nxt = ZPP_ToiEvent.zpp_pool.next;
			ZPP_ToiEvent.zpp_pool.next = null;
			ZPP_ToiEvent.zpp_pool = nxt;
		}
		while(ZPP_Set_ZPP_SimpleVert.zpp_pool != null) {
			let nxt = ZPP_Set_ZPP_SimpleVert.zpp_pool.next;
			ZPP_Set_ZPP_SimpleVert.zpp_pool.next = null;
			ZPP_Set_ZPP_SimpleVert.zpp_pool = nxt;
		}
		while(ZPP_SimpleVert.zpp_pool != null) {
			let nxt = ZPP_SimpleVert.zpp_pool.next;
			ZPP_SimpleVert.zpp_pool.next = null;
			ZPP_SimpleVert.zpp_pool = nxt;
		}
		while(ZPP_SimpleSeg.zpp_pool != null) {
			let nxt = ZPP_SimpleSeg.zpp_pool.next;
			ZPP_SimpleSeg.zpp_pool.next = null;
			ZPP_SimpleSeg.zpp_pool = nxt;
		}
		while(ZPP_Set_ZPP_SimpleSeg.zpp_pool != null) {
			let nxt = ZPP_Set_ZPP_SimpleSeg.zpp_pool.next;
			ZPP_Set_ZPP_SimpleSeg.zpp_pool.next = null;
			ZPP_Set_ZPP_SimpleSeg.zpp_pool = nxt;
		}
		while(ZPP_MarchSpan.zpp_pool != null) {
			let nxt = ZPP_MarchSpan.zpp_pool.next;
			ZPP_MarchSpan.zpp_pool.next = null;
			ZPP_MarchSpan.zpp_pool = nxt;
		}
		while(ZPP_MarchPair.zpp_pool != null) {
			let nxt = ZPP_MarchPair.zpp_pool.next;
			ZPP_MarchPair.zpp_pool.next = null;
			ZPP_MarchPair.zpp_pool = nxt;
		}
		while(ZPP_Set_ZPP_SimpleEvent.zpp_pool != null) {
			let nxt = ZPP_Set_ZPP_SimpleEvent.zpp_pool.next;
			ZPP_Set_ZPP_SimpleEvent.zpp_pool.next = null;
			ZPP_Set_ZPP_SimpleEvent.zpp_pool = nxt;
		}
		while(ZPP_SimpleEvent.zpp_pool != null) {
			let nxt = ZPP_SimpleEvent.zpp_pool.next;
			ZPP_SimpleEvent.zpp_pool.next = null;
			ZPP_SimpleEvent.zpp_pool = nxt;
		}
		while(Hashable2_Boolfalse.zpp_pool != null) {
			let nxt = Hashable2_Boolfalse.zpp_pool.next;
			Hashable2_Boolfalse.zpp_pool.next = null;
			Hashable2_Boolfalse.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_SimpleVert.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_SimpleVert.zpp_pool.next;
			ZNPNode_ZPP_SimpleVert.zpp_pool.next = null;
			ZNPNode_ZPP_SimpleVert.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_SimpleEvent.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_SimpleEvent.zpp_pool.next;
			ZNPNode_ZPP_SimpleEvent.zpp_pool.next = null;
			ZNPNode_ZPP_SimpleEvent.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_AABBPair.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_AABBPair.zpp_pool.next;
			ZNPNode_ZPP_AABBPair.zpp_pool.next = null;
			ZNPNode_ZPP_AABBPair.zpp_pool = nxt;
		}
		while(ZPP_Edge.zpp_pool != null) {
			let nxt = ZPP_Edge.zpp_pool.next;
			ZPP_Edge.zpp_pool.next = null;
			ZPP_Edge.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_Edge.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_Edge.zpp_pool.next;
			ZNPNode_ZPP_Edge.zpp_pool.next = null;
			ZNPNode_ZPP_Edge.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_Vec2.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_Vec2.zpp_pool.next;
			ZNPNode_ZPP_Vec2.zpp_pool.next = null;
			ZNPNode_ZPP_Vec2.zpp_pool = nxt;
		}
		while(ZPP_SweepData.zpp_pool != null) {
			let nxt = ZPP_SweepData.zpp_pool.next;
			ZPP_SweepData.zpp_pool.next = null;
			ZPP_SweepData.zpp_pool = nxt;
		}
		while(ZPP_AABBNode.zpp_pool != null) {
			let nxt = ZPP_AABBNode.zpp_pool.next;
			ZPP_AABBNode.zpp_pool.next = null;
			ZPP_AABBNode.zpp_pool = nxt;
		}
		while(ZPP_AABBPair.zpp_pool != null) {
			let nxt = ZPP_AABBPair.zpp_pool.next;
			ZPP_AABBPair.zpp_pool.next = null;
			ZPP_AABBPair.zpp_pool = nxt;
		}
		while(ZPP_Contact.zpp_pool != null) {
			let nxt = ZPP_Contact.zpp_pool.next;
			ZPP_Contact.zpp_pool.next = null;
			ZPP_Contact.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_Component.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_Component.zpp_pool.next;
			ZNPNode_ZPP_Component.zpp_pool.next = null;
			ZNPNode_ZPP_Component.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_AABBNode.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_AABBNode.zpp_pool.next;
			ZNPNode_ZPP_AABBNode.zpp_pool.next = null;
			ZNPNode_ZPP_AABBNode.zpp_pool = nxt;
		}
		while(ZPP_Island.zpp_pool != null) {
			let nxt = ZPP_Island.zpp_pool.next;
			ZPP_Island.zpp_pool.next = null;
			ZPP_Island.zpp_pool = nxt;
		}
		while(ZPP_Component.zpp_pool != null) {
			let nxt = ZPP_Component.zpp_pool.next;
			ZPP_Component.zpp_pool.next = null;
			ZPP_Component.zpp_pool = nxt;
		}
		while(ZPP_CallbackSet.zpp_pool != null) {
			let nxt = ZPP_CallbackSet.zpp_pool.next;
			ZPP_CallbackSet.zpp_pool.next = null;
			ZPP_CallbackSet.zpp_pool = nxt;
		}
		while(ZPP_Set_ZPP_CbSet.zpp_pool != null) {
			let nxt = ZPP_Set_ZPP_CbSet.zpp_pool.next;
			ZPP_Set_ZPP_CbSet.zpp_pool.next = null;
			ZPP_Set_ZPP_CbSet.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_InteractionGroup.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_InteractionGroup.zpp_pool.next;
			ZNPNode_ZPP_InteractionGroup.zpp_pool.next = null;
			ZNPNode_ZPP_InteractionGroup.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_FluidArbiter.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_FluidArbiter.zpp_pool.next;
			ZNPNode_ZPP_FluidArbiter.zpp_pool.next = null;
			ZNPNode_ZPP_FluidArbiter.zpp_pool = nxt;
		}
		while(ZPP_InteractionFilter.zpp_pool != null) {
			let nxt = ZPP_InteractionFilter.zpp_pool.next;
			ZPP_InteractionFilter.zpp_pool.next = null;
			ZPP_InteractionFilter.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_SensorArbiter.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_SensorArbiter.zpp_pool.next;
			ZNPNode_ZPP_SensorArbiter.zpp_pool.next = null;
			ZNPNode_ZPP_SensorArbiter.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_ColArbiter.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_ColArbiter.zpp_pool.next;
			ZNPNode_ZPP_ColArbiter.zpp_pool.next = null;
			ZNPNode_ZPP_ColArbiter.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_Listener.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_Listener.zpp_pool.next;
			ZNPNode_ZPP_Listener.zpp_pool.next = null;
			ZNPNode_ZPP_Listener.zpp_pool = nxt;
		}
		while(ZPP_SensorArbiter.zpp_pool != null) {
			let nxt = ZPP_SensorArbiter.zpp_pool.next;
			ZPP_SensorArbiter.zpp_pool.next = null;
			ZPP_SensorArbiter.zpp_pool = nxt;
		}
		while(ZPP_FluidArbiter.zpp_pool != null) {
			let nxt = ZPP_FluidArbiter.zpp_pool.next;
			ZPP_FluidArbiter.zpp_pool.next = null;
			ZPP_FluidArbiter.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_ToiEvent.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_ToiEvent.zpp_pool.next;
			ZNPNode_ZPP_ToiEvent.zpp_pool.next = null;
			ZNPNode_ZPP_ToiEvent.zpp_pool = nxt;
		}
		while(ZPP_ColArbiter.zpp_pool != null) {
			let nxt = ZPP_ColArbiter.zpp_pool.next;
			ZPP_ColArbiter.zpp_pool.next = null;
			ZPP_ColArbiter.zpp_pool = nxt;
		}
		while(ZNPNode_ConvexResult.zpp_pool != null) {
			let nxt = ZNPNode_ConvexResult.zpp_pool.next;
			ZNPNode_ConvexResult.zpp_pool.next = null;
			ZNPNode_ConvexResult.zpp_pool = nxt;
		}
		while(ZNPNode_ZPP_GeomPoly.zpp_pool != null) {
			let nxt = ZNPNode_ZPP_GeomPoly.zpp_pool.next;
			ZNPNode_ZPP_GeomPoly.zpp_pool.next = null;
			ZNPNode_ZPP_GeomPoly.zpp_pool = nxt;
		}
		while(ZNPNode_RayResult.zpp_pool != null) {
			let nxt = ZNPNode_RayResult.zpp_pool.next;
			ZNPNode_RayResult.zpp_pool.next = null;
			ZNPNode_RayResult.zpp_pool = nxt;
		}
		while(ZPP_PubPool.poolGeomPoly != null) {
			let nxt = ZPP_PubPool.poolGeomPoly.zpp_pool;
			ZPP_PubPool.poolGeomPoly.zpp_pool = null;
			ZPP_PubPool.poolGeomPoly = nxt;
		}
		while(ZPP_PubPool.poolVec2 != null) {
			let nxt = ZPP_PubPool.poolVec2.zpp_pool;
			ZPP_PubPool.poolVec2.zpp_pool = null;
			ZPP_PubPool.poolVec2 = nxt;
		}
		while(ZPP_PubPool.poolVec3 != null) {
			let nxt = ZPP_PubPool.poolVec3.zpp_pool;
			ZPP_PubPool.poolVec3.zpp_pool = null;
			ZPP_PubPool.poolVec3 = nxt;
		}
	}
	static createGraphic(body) {
		if(body == null) {
			throw haxe_Exception.thrown("Error: Cannot create debug graphic for null Body");
		}
		let ret = Graphics.createGraphics();
		let graphics = ret;
		let idc = 16777215 * Math.exp(-body.zpp_inner_i.id / 1500) | 0;
		let _r = ((idc & 16711680) >> 16) * 0.7;
		let _g = ((idc & 65280) >> 8) * 0.7;
		let _b = (idc & 255) * 0.7;
		let col = (_r | 0) << 16 | (_g | 0) << 8 | (_b | 0);
		graphics.lineStyle(0.1,col,1);
		let _this = body.zpp_inner.wrap_shapes;
		_this.zpp_inner.valmod();
		let _g1 = ShapeIterator.get(_this);
		while(true) {
			_g1.zpp_inner.zpp_inner.valmod();
			let _this = _g1.zpp_inner;
			_this.zpp_inner.valmod();
			if(_this.zpp_inner.zip_length) {
				_this.zpp_inner.zip_length = false;
				_this.zpp_inner.user_length = _this.zpp_inner.inner.length;
			}
			let length = _this.zpp_inner.user_length;
			_g1.zpp_critical = true;
			let tmp;
			if(_g1.zpp_i < length) {
				tmp = true;
			} else {
				_g1.zpp_next = ShapeIterator.zpp_pool;
				ShapeIterator.zpp_pool = _g1;
				_g1.zpp_inner = null;
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			_g1.zpp_critical = false;
			let s = _g1.zpp_inner.at(_g1.zpp_i++);
			if(s.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE) {
				let c = s.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE ? s.zpp_inner.circle.outer_zn : null;
				if(c.zpp_inner.wrap_localCOM == null) {
					if(c.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE) {
						c.zpp_inner.circle.setupLocalCOM();
					} else {
						c.zpp_inner.polygon.setupLocalCOM();
					}
				}
				let _this = c.zpp_inner.wrap_localCOM;
				if(_this != null && _this.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = _this.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				let tmp = _this.zpp_inner.x;
				if(c.zpp_inner.wrap_localCOM == null) {
					if(c.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE) {
						c.zpp_inner.circle.setupLocalCOM();
					} else {
						c.zpp_inner.polygon.setupLocalCOM();
					}
				}
				let _this2 = c.zpp_inner.wrap_localCOM;
				if(_this2 != null && _this2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this3 = _this2.zpp_inner;
				if(_this3._validate != null) {
					_this3._validate();
				}
				graphics.drawCircle(tmp,_this2.zpp_inner.y,c.zpp_inner_zn.radius);
			} else {
				let p = s.zpp_inner.type == ZPP_Flags.id_ShapeType_POLYGON ? s.zpp_inner.polygon.outer_zn : null;
				if(s.zpp_inner.wrap_localCOM == null) {
					if(s.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE) {
						s.zpp_inner.circle.setupLocalCOM();
					} else {
						s.zpp_inner.polygon.setupLocalCOM();
					}
				}
				let _this = s.zpp_inner.wrap_localCOM;
				if(_this != null && _this.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = _this.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				let tmp = _this.zpp_inner.x;
				if(s.zpp_inner.wrap_localCOM == null) {
					if(s.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE) {
						s.zpp_inner.circle.setupLocalCOM();
					} else {
						s.zpp_inner.polygon.setupLocalCOM();
					}
				}
				let _this2 = s.zpp_inner.wrap_localCOM;
				if(_this2 != null && _this2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this3 = _this2.zpp_inner;
				if(_this3._validate != null) {
					_this3._validate();
				}
				graphics.moveTo(tmp,_this2.zpp_inner.y);
				let _g = 0;
				if(p.zpp_inner_zn.wrap_gverts == null) {
					p.zpp_inner_zn.getgverts();
				}
				let _g1 = p.zpp_inner_zn.wrap_gverts.zpp_gl();
				while(_g < _g1) {
					let i = _g++;
					if(p.zpp_inner_zn.wrap_lverts == null) {
						p.zpp_inner_zn.getlverts();
					}
					let px = p.zpp_inner_zn.wrap_lverts.at(i);
					if(px != null && px.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this = px.zpp_inner;
					if(_this._validate != null) {
						_this._validate();
					}
					let tmp = px.zpp_inner.x;
					if(px != null && px.zpp_disp) {
						throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
					}
					let _this1 = px.zpp_inner;
					if(_this1._validate != null) {
						_this1._validate();
					}
					graphics.lineTo(tmp,px.zpp_inner.y);
				}
				if(p.zpp_inner_zn.wrap_lverts == null) {
					p.zpp_inner_zn.getlverts();
				}
				let px = p.zpp_inner_zn.wrap_lverts.at(0);
				if(px != null && px.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this4 = px.zpp_inner;
				if(_this4._validate != null) {
					_this4._validate();
				}
				let tmp1 = px.zpp_inner.x;
				if(px != null && px.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this5 = px.zpp_inner;
				if(_this5._validate != null) {
					_this5._validate();
				}
				graphics.lineTo(tmp1,px.zpp_inner.y);
			}
			if(s.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE) {
				let c = s.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE ? s.zpp_inner.circle.outer_zn : null;
				if(c.zpp_inner.wrap_localCOM == null) {
					if(c.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE) {
						c.zpp_inner.circle.setupLocalCOM();
					} else {
						c.zpp_inner.polygon.setupLocalCOM();
					}
				}
				let _this = c.zpp_inner.wrap_localCOM;
				if(_this != null && _this.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this1 = _this.zpp_inner;
				if(_this1._validate != null) {
					_this1._validate();
				}
				let tmp = _this.zpp_inner.x + c.zpp_inner_zn.radius * 0.3;
				if(c.zpp_inner.wrap_localCOM == null) {
					if(c.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE) {
						c.zpp_inner.circle.setupLocalCOM();
					} else {
						c.zpp_inner.polygon.setupLocalCOM();
					}
				}
				let _this2 = c.zpp_inner.wrap_localCOM;
				if(_this2 != null && _this2.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this3 = _this2.zpp_inner;
				if(_this3._validate != null) {
					_this3._validate();
				}
				graphics.moveTo(tmp,_this2.zpp_inner.y);
				if(c.zpp_inner.wrap_localCOM == null) {
					if(c.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE) {
						c.zpp_inner.circle.setupLocalCOM();
					} else {
						c.zpp_inner.polygon.setupLocalCOM();
					}
				}
				let _this4 = c.zpp_inner.wrap_localCOM;
				if(_this4 != null && _this4.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this5 = _this4.zpp_inner;
				if(_this5._validate != null) {
					_this5._validate();
				}
				let tmp1 = _this4.zpp_inner.x + c.zpp_inner_zn.radius;
				if(c.zpp_inner.wrap_localCOM == null) {
					if(c.zpp_inner.type == ZPP_Flags.id_ShapeType_CIRCLE) {
						c.zpp_inner.circle.setupLocalCOM();
					} else {
						c.zpp_inner.polygon.setupLocalCOM();
					}
				}
				let _this6 = c.zpp_inner.wrap_localCOM;
				if(_this6 != null && _this6.zpp_disp) {
					throw haxe_Exception.thrown("Error: " + "Vec2" + " has been disposed and cannot be used!");
				}
				let _this7 = _this6.zpp_inner;
				if(_this7._validate != null) {
					_this7._validate();
				}
				graphics.lineTo(tmp1,_this6.zpp_inner.y);
			}
		}
		return ret;
	}
}
Debug._hx_skip_constructor = false;
