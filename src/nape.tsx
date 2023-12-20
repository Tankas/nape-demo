import Space from '../napeLib/nape/space/Space.js'
import InteractionFilter from '../napeLib/nape/dynamics/InteractionFilter.js';
import InteractionGroup from '../napeLib/nape/dynamics/InteractionGroup.js';
import ArbiterType from '../napeLib/nape/dynamics/ArbiterType.js';
import ConstraintList from '../napeLib/nape/constraint/ConstraintList.js';
import WeldJoint from '../napeLib/nape/constraint/WeldJoint.js';
import PivotJoint from '../napeLib/nape/constraint/PivotJoint.js';
import AngleJoint from '../napeLib/nape/constraint/AngleJoint.js';
import DistanceJoint from '../napeLib/nape/constraint/DistanceJoint.js';
import LineJoint from '../napeLib/nape/constraint/LineJoint.js';
import PulleyJoint from '../napeLib/nape/constraint/PulleyJoint.js';
import SpringJoint from '../napeLib/nape/constraint/SpringJoint.js';
import RubberJoint from '../napeLib/nape/constraint/RubberJoint.js';
import BodyListener from '../napeLib/nape/callbacks/BodyListener.js';
import CbType from '../napeLib/nape/callbacks/CbType.js';
import CbEvent from '../napeLib/nape/callbacks/CbEvent.js';
import InteractionType from '../napeLib/nape/callbacks/InteractionType.js';
import InteractionListener from '../napeLib/nape/callbacks/InteractionListener.js';
import PreListener from '../napeLib/nape/callbacks/PreListener.js';
import PreFlag from '../napeLib/nape/callbacks/PreFlag.js';
import Circle from '../napeLib/nape/shape/Circle.js';
import Polygon from '../napeLib/nape/shape/Polygon.js';
import ShamCircle from '../napeLib/nape/shape/ShamCircle.js';
import LiquidShape from '../napeLib/nape/shape/LiquidShape.js';
import BodyType from '../napeLib/nape/phys/BodyType.js';
import Body from '../napeLib/nape/phys/Body.js';
import Compound from '../napeLib/nape/phys/Compound.js';
import Material from '../napeLib/nape/phys/Material.js';
import BodyList from '../napeLib/nape/phys/BodyList.js';
import GravMassMode from '../napeLib/nape/phys/GravMassMode.js';
import FluidProperties from '../napeLib/nape/phys/FluidProperties.js';
import Vec2 from '../napeLib/nape/geom/Vec2.js';
import Mat23 from '../napeLib/nape/geom/Mat23.js';
import Geom from '../napeLib/nape/geom/Geom.js';
import Ray from '../napeLib/nape/geom/Ray.js';
import MarchingSquares from '../napeLib/nape/geom/MarchingSquares.js';
import Vec2List from '../napeLib/nape/geom/Vec2List.js';
import GeomPoly from '../napeLib/nape/geom/GeomPoly.js';
import GeomPolyList from '../napeLib/nape/geom/GeomPolyList.js';
import Graphics from '../napeLib/nape/debug/Graphics.js';
import ShapeDebug from '../napeLib/nape/util/ShapeDebug.js';
import Debug from '../napeLib/nape/util/Debug.js';

window.nape = {
  space: {
    Space,
  },
  dynamics: {
    InteractionFilter,
    InteractionGroup,
    ArbiterType,
  },
  callbacks: {
    BodyListener,
    CbType,
    CbEvent,
    InteractionType,
    InteractionListener,
    PreListener,
    PreFlag,
  },
  shape: {
    Circle,
    Polygon,
    ShamCircle,
    LiquidShape,
  },
  phys: {
    BodyType,
    Body,
    Material,
    BodyList,
    Compound,
    GravMassMode,
    FluidProperties,
  },
  constraint: {
    ConstraintList,
    WeldJoint,
    PivotJoint,
    AngleJoint,
    DistanceJoint,
    LineJoint,
    PulleyJoint,
    SpringJoint,
    RubberJoint,
  },
  geom: {
    Vec2,
    Mat23,
    Vec2List,
    GeomPoly,
    GeomPolyList,
    Geom,
    Ray,
    MarchingSquares,
  },
  debug: {
    Graphics,
  },
  util: {
    ShapeDebug,
    Debug,
  },
};

console.log(window.nape.space)

let $haxeUID = 0;

window.$bind = function (o, m) {
  if (m == null) {
    return null;
  }
  if (m.__id__ == null) {
    m.__id__ = $haxeUID++;
  }
  let f;
  if (o.hx__closures__ == null) {
    o.hx__closures__ = {};
  } else {
    f = o.hx__closures__[m.__id__];
  }
  if (f == null) {
    f = m.bind(o);
    o.hx__closures__[m.__id__] = f;
  }
  return f;
};


