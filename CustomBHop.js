var scriptName = "CustomBHop";
var scriptVersion = 1.5;
var scriptAuthor = "Sms_Gamer+Marko64";

var customBHopModule = new CustomBHopModule();
var customBHopModuleClient;

var Strafe = moduleManager.getModule("Strafe");

var c03packetplayer = Java.type("net.minecraft.network.play.client.C03PacketPlayer");

var client;
var client2;
var client3;
var inrunAirSpeed;
var x;
var z;

function CustomBHopModule() {
	var resetH = value.createBoolean("resetH", true);
	var resetY = value.createBoolean("resetY", true);
	var strafing = value.createBoolean("strafing", true);
	var timer = value.createBoolean("timer", false);
	var stairorslab = value.createBoolean("stairorslab", true);
	var sneakjump = value.createBoolean("sneakjump", true);
	var waterjump = value.createBoolean("waterjump", false);
	var inrunspeed = value.createBoolean("inrunspeed", true);
	var jumpY = value.createFloat("jumpY", 0.42, 0.2, 0.55);
	var vClipJumpY = value.createFloat("vClipJumpY", 0, 0, 0.5);
	var jumpHType = value.createList("jumpHType", ["Add", "Set", "Times"], "Add");
	var jumpHforward = value.createFloat("jumpHforward", 0.2, 0.00, 0.50);
	var jumpHbackward = value.createFloat("jumpHbackward", 0.2, 0.00, 0.50);
	var jumpHsideways = value.createFloat("jumpHsideways", 0.2, 0.00, 0.50);
	var jumpHaslant = value.createFloat("jumpHaslant", 0.2, 0.00, 0.50);
	var jumpHClip = value.createFloat("jumpHClip", 0, -0.10, 0.10);
	var jumpSlab = value.createFloat("jumpSlab", 0.15, 0.00, 0.50);
	var SlabY = value.createFloat("SlabY", -0.10, -1.00, 0.00);
	var inrunsteps = value.createInteger("inrunsteps", 5, 1, 20);
	var maxinrunjumpY = value.createFloat("maxinrunjumpY", 0.0, 0.00, 1.00);
	var maxinrunjumpH = value.createFloat("maxinrunjumpH", 0.2, 0.00, 1.00);
	var maxinrunAirSpeed = value.createFloat("maxinrunAirSpeed", 0.2, 0.00, 1.00);
	var maxinrunTimer = value.createFloat("maxinrunTimer", 0, 0.0, 10);
	var upYType = value.createList("upYType", ["Add", "Set", "Times"], "Add");
	var upY = value.createFloat("upY", 0, -0.10, 0.10);
	var upHType = value.createList("upHType", ["Add", "Set", "Times"], "Add");
	var upH = value.createFloat("upH",0 , -0.10, 0.10);
	var upTimer = value.createFloat("upTimer", 1, 0.1, 10);
	var upAirSpeed = value.createFloat("upAirSpeed", 0.2, 0.00, 0.50);
	var downYType = value.createList("downYType", ["Add", "Set", "Times"], "Add");
	var downY = value.createFloat("downY", 0, -0.10, 0.10);
	var downHType = value.createList("downHType", ["Add", "Set", "Times"], "Add");
	var downH = value.createFloat("downH", 0, -0.10, 0.10);
	var downTimer = value.createFloat("downTimer", 1, 0.1, 10);
	var downAirSpeed = value.createFloat("downAirSpeed", 0.2, 0.00, 0.50);
	var beforeYType = value.createList("beforeYType", ["Add", "Set", "Times"], "Add");
	var beforeY = value.createFloat("beforeY", 0, -0.10, 0.10);
	var beforeHType = value.createList("beforeHType", ["Add", "Set", "Times"], "Add");
	var beforeH = value.createFloat("beforeH",0 , -0.10, 0.10);
	var beforeTimer = value.createFloat("beforeTimer", 1, 0.1, 10);
	var beforeAirSpeed = value.createFloat("beforeAirSpeed", 0.2, 0.00, 0.50);
	var ticksAction = value.createInteger("ticksAction", 0, 0, 20);
	var whenYType = value.createList("whenYType", ["Add", "Set", "Times"], "Add");
	var whenY = value.createFloat("whenY", 0, -0.10, 0.10);
	var whenHType = value.createList("whenHType", ["Add", "Set", "Times"], "Add");
	var whenH = value.createFloat("whenH",0 , -0.10, 0.10);
	var whenTimer = value.createFloat("whenTimer", 1, 0.1, 10);
	var whenAirSpeed = value.createFloat("whenAirSpeed", 0.2, 0.00, 0.50);
	var afterYType = value.createList("afterYType", ["Add", "Set", "Times"], "Add");
	var afterY = value.createFloat("afterY", 0, -0.10, 0.10);
	var afterHType = value.createList("afterHType", ["Add", "Set", "Times"], "Add");
	var afterH = value.createFloat("afterH",0 , -0.10, 0.10);
	var afterTimer = value.createFloat("afterTimer", 1, 0.1, 10);
	var afterAirSpeed = value.createFloat("afterAirSpeed", 0.20, 0.00, 0.40);
  
	var start;
	var inrunstep;
	var inrunspeed2;
	var inrunspeedGumper;
	var inrunTimer;
	var airSpeed1;
	var airSpeed2;
	var jumph;
	var jumpH2;
	var jumpY2;
	var ticks;
	var posY;
	var SlabY2;
	var posX;
	var posZ;
	var Ymax;
	var accuracy = 1.4;

    this.getName = function() {
        return "CustomBHop";
    };

    this.getDescription = function() {
        return "Custom bHop";
    };

    this.getCategory = function() {
        return "Movement";
    };
	
	
    this.onEnable = function() {
      ticks = 0;
	  inrunspeedGumper = 0;
	  inrunspeed2 = 0;
		if(strafing.get()){
			Strafe.setState(true);
		};
    };
	
    this.onUpdate = function() {
		posY = mc.thePlayer.posY;
	
		if (mc.gameSettings.keyBindForward.isKeyDown()){
			x = 90;
			z = 90;
			jumph = jumpHforward.get();
			
		}else if (mc.gameSettings.keyBindBack.isKeyDown()){
			x = 270;
			z = 270;
			jumph = jumpHbackward.get();
		};

		if (mc.gameSettings.keyBindRight.isKeyDown()){
			x = 180;
			z = 180;
			jumph = jumpHsideways.get();
			
		}else if (mc.gameSettings.keyBindLeft.isKeyDown()){
			x = 360;
			z = 360;
			jumph = jumpHsideways.get();
		};

		if (mc.gameSettings.keyBindForward.isKeyDown() && mc.gameSettings.keyBindRight.isKeyDown()){
			x = 135;
			z = 135;
			jumph = jumpHaslant.get();
		}else if (mc.gameSettings.keyBindForward.isKeyDown() && mc.gameSettings.keyBindLeft.isKeyDown()){
			x = 45;
			z = 45;
			jumph = jumpHaslant.get();
		};

		if (mc.gameSettings.keyBindBack.isKeyDown() && mc.gameSettings.keyBindRight.isKeyDown()){
			x = 225;
			z = 225;
			jumph = jumpHaslant.get();
		}else if (mc.gameSettings.keyBindBack.isKeyDown() && mc.gameSettings.keyBindLeft.isKeyDown()){
			x = 315;
			z = 315;
			jumph = jumpHaslant.get();
		};

				if ((!(Math.round(posY - 0.1) == Math.round(posY)) && !(mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0, mc.thePlayer.motionY - 1, 0).expand(0, 0, 0)).isEmpty())) && stairorslab.get() && (maxinrunjumpY.get() <= 0.60)){
			jumph = jumpSlab.get();
			inrunspeed2 = -2;
			SlabY2 = SlabY.get();
		}else if (!(mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0, mc.thePlayer.motionY - 1, 0).expand(0, 0, 0)).isEmpty())){
			SlabY2 = 0;
		};


		if (mc.gameSettings.keyBindForward.isKeyDown() && mc.gameSettings.keyBindBack.isKeyDown()){
			x = 90;
			z = 90;
			jumph = 0;
			inrunspeed2 = 0;
		}else if (mc.gameSettings.keyBindRight.isKeyDown() && mc.gameSettings.keyBindLeft.isKeyDown()){
			x = 180;
			z = 180;
			jumph = 0;
			inrunspeed2 = 0;
		};

        if ((mc.gameSettings.keyBindForward.isKeyDown() || mc.gameSettings.keyBindLeft.isKeyDown() || mc.gameSettings.keyBindRight.isKeyDown() || mc.gameSettings.keyBindBack.isKeyDown()) && !(mc.thePlayer.isSneaking() && !sneakjump.get()) && !((mc.thePlayer.isInWater() || mc.thePlayer.isInLava()) && !waterjump.get()) && start == 1) {
			mc.thePlayer.setSprinting(true);
			mc.gameSettings.keyBindJump.pressed = false;
			if (inrunspeed.get()){
				if (!(mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0, mc.thePlayer.motionY - 1, 0).expand(0, 0, 0)).isEmpty()) && inrunspeedGumper == 0){
					inrunspeedGumper = 1;
					inrunspeed2++;
				}else if ((mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0, mc.thePlayer.motionY - 1, 0).expand(0, 0, 0)).isEmpty()) && inrunspeedGumper == 1){	
					inrunspeedGumper = 0;
				};
				if(inrunspeed2 < 0){
					if (jumpSlab.get() <= jumph){
						jumpY2 = 0;
						jumpH2 = jumpSlab.get();
						inrunAirSpeed = 0;
					}else{
						jumpY2 = 0;
						jumpH2 = jumph;
						inrunAirSpeed = 0;
					};
				}else if(inrunspeed2 == 0){
					jumpY2 = 0;
					jumpH2 = (jumpSlab.get() / 2) + (jumph / 2);
					inrunAirSpeed = 0;
				};
				if (!((!(Math.round(posY - 0.1) == Math.round(posY)) && !(mc.theWorld.getCollidingBoundingBoxes(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0, mc.thePlayer.motionY - 1, 0).expand(0, 0, 0)).isEmpty())) && stairorslab.get()) && inrunspeed2 >= 0){

					if (inrunspeed2 >= inrunsteps.get()){
						inrunstep =	inrunsteps.get();
						if (maxinrunjumpY.get() == 0){
							jumpY2 = 0;
						}else{
							jumpY2 = maxinrunjumpY.get() / (1 * (inrunstep / inrunsteps.get()));
						};
						if (maxinrunjumpH.get() == 0){
							jumpH2 = 0;
						}else{
							jumpH2 = jumph + (maxinrunjumpH.get() / (1 * (inrunstep / inrunsteps.get())));
						};
						if (maxinrunAirSpeed.get() == 0){
							inrunAirSpeed = 0;
						}else{
							inrunAirSpeed = (maxinrunAirSpeed.get() / (10 * (inrunstep / inrunsteps.get())));
						};
						if (maxinrunTimer.get() == 0){
							inrunTimer = 0;
						}else{
							inrunTimer = (maxinrunTimer.get() / (1 * (inrunstep / inrunsteps.get())));
						};
					}else{
						inrunstep =	inrunsteps.get() / inrunspeed2;
						if (maxinrunjumpY.get() == 0){
							jumpY2 = 0;
						}else{
							jumpY2 = maxinrunjumpY.get() / (10 * (inrunstep / inrunsteps.get()));
						};
						if (maxinrunjumpH.get() == 0){
							jumpH2 = 0;
						}else{
							jumpH2 = jumph + (maxinrunjumpH.get() / (10 * (inrunstep / inrunsteps.get())));
						};
						if (maxinrunAirSpeed.get() == 0){
							inrunAirSpeed = 0;
						}else{
							inrunAirSpeed = (maxinrunAirSpeed.get() / (100 * (inrunstep / inrunsteps.get())));
						};
						if (maxinrunTimer.get() == 0){
							inrunTimer = 0;
						}else{
							inrunTimer = (maxinrunTimer.get() / (10 * (inrunstep / inrunsteps.get())));
						};
					};
				};
			}else{
				jumpY2 = 0;
				jumpH2 = jumph;
				inrunAirSpeed = 0;
			};
			if (posX <= mc.thePlayer.posX && posZ <= mc.thePlayer.posZ && (!(posX < mc.thePlayer.posX && posX + (airSpeed2 - (airSpeed2 /  accuracy)) <= mc.thePlayer.posX) && !(posZ < mc.thePlayer.posZ && posZ + (airSpeed2 - (airSpeed2 /  accuracy)) <= mc.thePlayer.posZ)) || (posX <= mc.thePlayer.posX && posZ >= mc.thePlayer.posZ && (!(posX < mc.thePlayer.posX && posX + (airSpeed2 - (airSpeed2 /  accuracy)) <= mc.thePlayer.posX) && !(posZ > mc.thePlayer.posZ && posZ - (airSpeed2 - (airSpeed2 /  accuracy)) >= mc.thePlayer.posZ))) || (posX >= mc.thePlayer.posX && posZ >= mc.thePlayer.posZ && (!(posX > mc.thePlayer.posX && posX - (airSpeed2 - (airSpeed2 /  accuracy)) >= mc.thePlayer.posX) && !(posZ > mc.thePlayer.posZ && posZ - (airSpeed2 - (airSpeed2 /  accuracy)) >= mc.thePlayer.posZ))) || (posX >= mc.thePlayer.posX && posZ <= mc.thePlayer.posZ && (!(posX > mc.thePlayer.posX && posX - (airSpeed2 - (airSpeed2 /  accuracy)) >= mc.thePlayer.posX) && !(posZ < mc.thePlayer.posZ && posZ + (airSpeed2 - (airSpeed2 /  accuracy)) <= mc.thePlayer.posZ)))){
				inrunspeed2 = -2;
			};
			posX = mc.thePlayer.posX;
			posZ = mc.thePlayer.posZ;
			if(mc.thePlayer.onGround){
				ticks=0;
				vClip(vClipJumpY.get());
				hClip(jumpHClip.get());
				mc.thePlayer.motionY = jumpY.get() + jumpY2 ;
				mXZ(jumpHType.get(), jumpH2);
			}else{
				airSpeed2 = 0;
				ticks++;
				if(mc.thePlayer.motionY > 0){
					if (timer.get()) {
						mc.timer.timerSpeed = upTimer.get() + inrunTimer;
					};
					mY(upYType.get(), upY.get() + SlabY2);
					mXZ(upHType.get(), upH.get());
					airSpeed((upAirSpeed.get())/10);
					airSpeed1 =(upAirSpeed.get())/10;
					airSpeed2 += airSpeed1 * 10;
					airSpeed1 
				};
				if(mc.thePlayer.motionY < 0){
					if (timer.get()) {
						mc.timer.timerSpeed = downTimer.get() + inrunTimer;
					};
					mY(downYType.get(), downY.get());
					mXZ(downHType.get(), downH.get());
					airSpeed((downAirSpeed.get())/10);
					airSpeed1 =(downAirSpeed.get())/10;
					airSpeed2 += airSpeed1 * 10;
				};
				if(ticks < ticksAction.get()){
					if (timer.get()) {
						mc.timer.timerSpeed = beforeTimer.get() + inrunTimer;
					};
					mY(beforeYType.get(), beforeY.get());
					mXZ(beforeHType.get(), beforeH.get());
					airSpeed((beforeAirSpeed.get())/10);
					airSpeed1 =(beforeAirSpeed.get())/10;
					airSpeed2 += airSpeed1 * 10;
				};
				if(ticks > ticksAction.get()){
					if (timer.get()) {
						mc.timer.timerSpeed = afterTimer.get() + inrunTimer;
					};
					mY(afterYType.get(), afterY.get());
					mXZ(afterHType.get(), afterH.get());
					airSpeed((afterAirSpeed.get())/10);
					airSpeed1 =(afterAirSpeed.get())/10;
					airSpeed2 += airSpeed1 * 10;
				};
				if(ticks == ticksAction.get()){
					if (timer.get()) {
						mc.timer.timerSpeed = whenTimer.get() + inrunTimer;
					};
					mY(whenYType.get(), whenY.get());
					mXZ(whenHType.get(), whenH.get());
					airSpeed((whenAirSpeed.get())/10);
					airSpeed1 =(whenAirSpeed.get())/10;
					airSpeed2 += airSpeed1 * 10;
				};
			};
        }else{
			inrunspeed2 = 0;
			mc.thePlayer.speedInAir = 0.02;
			if (timer.get()){
				mc.timer.timerSpeed = 1
			};
			start = 1;
        };
    };
	
    this.onDisable = function () {
		mc.thePlayer.speedInAir = 0.02;
		if (timer.get()) {
			mc.timer.timerSpeed = 1
		};
		Strafe.setState(false);
		if(resetH.get()){
			mc.thePlayer.motionX = 0;
			mc.thePlayer.motionZ = 0;
		};
		if(resetY.get() && mc.thePlayer.motionY > 0){
			mc.thePlayer.motionY = 0;
		};
    };
	
    this.addValues = function(values) {
		values.add(resetH);
		values.add(resetY);
		values.add(strafing);
		values.add(timer);
		values.add(stairorslab);
		values.add(sneakjump);
		values.add(waterjump);
		values.add(inrunspeed);
		values.add(jumpY);
		values.add(vClipJumpY);
		values.add(jumpHType);
		values.add(jumpHforward);
		values.add(jumpHbackward);
		values.add(jumpHsideways);
		values.add(jumpHaslant);
		values.add(jumpHClip);
		values.add(jumpSlab);
		values.add(SlabY);
		values.add(inrunsteps);
		values.add(maxinrunjumpY);
		values.add(maxinrunjumpH);
		values.add(maxinrunAirSpeed);
		values.add(maxinrunTimer);
		values.add(upYType);
		values.add(upY);
		values.add(upHType);
		values.add(upH);
		values.add(upAirSpeed);
		values.add(upTimer);
		values.add(downYType);
		values.add(downY);
		values.add(downHType);
		values.add(downH);
		values.add(downAirSpeed);
		values.add(downTimer);
		values.add(beforeYType);
		values.add(beforeY);
		values.add(beforeHType);
		values.add(beforeH);
		values.add(beforeAirSpeed);
		values.add(beforeTimer);
		values.add(ticksAction);
		values.add(whenYType);
		values.add(whenY);
		values.add(whenHType);
		values.add(whenH);
		values.add(whenAirSpeed);
		values.add(whenTimer);
		values.add(afterYType);
		values.add(afterY);
		values.add(afterHType);
		values.add(afterH);
		values.add(afterAirSpeed);
		values.add(afterTimer);
    };
};

 // Converts from degrees to radians.
Math.radians = function(degrees) {
	return degrees * Math.PI / 180;
};
   
  // Converts from radians to degrees.
Math.degrees = function(radians) {
	return radians * 180 / Math.PI;
};


function vClip(offset) {
    mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + offset, mc.thePlayer.posZ); 
};

function hClip(offset) {
    var playerYaw = Math.radians(mc.thePlayer.rotationYaw);
    mc.thePlayer.setPosition(mc.thePlayer.posX - (Math.sin(playerYaw) * offset), mc.thePlayer.posY, mc.thePlayer.posZ + (Math.cos(playerYaw) * offset));
};

function airSpeed(offset) {
    mc.thePlayer.speedInAir = (offset + inrunAirSpeed);
};

function speedMultiply(offset) {
  mc.thePlayer.motionX *= offset;
  mc.thePlayer.motionZ *= offset;
};

function timer(offset){
	if (timer.get()) {
		mc.timer.timerSpeed = offset;
	};
};

function mY(type, offset){
	if(type.equals("Set")){
		mc.thePlayer.motionY = offset;
	};
	if(type.equals("Times")){
		mc.thePlayer.motionY *= offset;
	};
	if(type.equals("Add")){
		mc.thePlayer.motionY += offset;
	};
};

function mXZ(type, offset){
	var playerYaw = Math.radians(mc.thePlayer.rotationYaw);
	if(type.equals("Times")){
		mc.thePlayer.motionX *= offset;
		mc.thePlayer.motionZ *= offset;
	};
	if(type.equals("Add")){
		mc.thePlayer.motionX += Math.cos(Math.radians(mc.thePlayer.rotationYaw + x)) * offset;
		mc.thePlayer.motionZ += Math.sin(Math.radians(mc.thePlayer.rotationYaw + z)) * offset;
	};
	if(type.equals("Set")){
		mc.thePlayer.motionX = Math.cos(Math.radians(mc.thePlayer.rotationYaw + x)) * offset;
		mc.thePlayer.motionZ = Math.sin(Math.radians(mc.thePlayer.rotationYaw + z)) * offset;
	};
};

function onLoad() {
	start = 0;
};

function onEnable() {
    customBHopModuleClient = moduleManager.registerModule(customBHopModule);
};

function onDisable() {
    moduleManager.unregisterModule(customBHopModuleClient);
};
