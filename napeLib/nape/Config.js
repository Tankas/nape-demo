export default class Config {
	constructor() {
	}
}
Config.epsilon = 1e-8;
Config.fluidAngularDragFriction = 2.5;
Config.fluidAngularDrag = 100;
Config.fluidVacuumDrag = 0.5;
Config.fluidLinearDrag = 0.5;
Config.collisionSlop = 0.2;
Config.collisionSlopCCD = 0.5;
Config.distanceThresholdCCD = 0.05;
Config.staticCCDLinearThreshold = 0.05;
Config.staticCCDAngularThreshold = 0.005;
Config.bulletCCDLinearThreshold = 0.125;
Config.bulletCCDAngularThreshold = 0.0125;
Config.dynamicSweepLinearThreshold = 17;
Config.dynamicSweepAngularThreshold = 0.6;
Config.angularCCDSlipScale = 0.75;
Config.arbiterExpirationDelay = 6;
Config.staticFrictionThreshold = 2;
Config.elasticThreshold = 20;
Config.sleepDelay = 60;
Config.linearSleepThreshold = 0.2;
Config.angularSleepThreshold = 0.4;
Config.contactBiasCoef = 0.3;
Config.contactStaticBiasCoef = 0.6;
Config.contactContinuousBiasCoef = 0.4;
Config.contactContinuousStaticBiasCoef = 0.5;
Config.constraintLinearSlop = 0.1;
Config.constraintAngularSlop = 1e-3;
Config.illConditionedThreshold = 2e+8;
