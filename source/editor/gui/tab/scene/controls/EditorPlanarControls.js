"use strict";

//The planar controls are used to control 2D movement
function EditorPlanarControls(mode)
{
	EditorOrbitControls.call(this);

	this.setMode(mode !== undefined ? mode : Settings.PLANAR_LEFT);
}

EditorPlanarControls.prototype = Object.create(EditorOrbitControls.prototype);

EditorPlanarControls.prototype.setOrientation = function(code){};

EditorPlanarControls.prototype.setMode = function(mode)
{
	this.mode = mode;

	if(mode === Settings.PLANAR_FRONT)
	{
		this.orientation.set(Math.PI / 2, 0);
	}
	else if(mode === Settings.PLANAR_BACK)
	{
		this.orientation.set(-Math.PI / 2, 0);
	}
	else if(mode === Settings.PLANAR_LEFT)
	{
		this.orientation.set(0, 0);
	}
	else if(mode === Settings.PLANAR_RIGHT)
	{
		this.orientation.set(Math.PI, 0);
	}
	else if(mode === Settings.PLANAR_TOP)
	{
		this.orientation.set(Math.PI, 1.57);
	}
	else if(mode === Settings.PLANAR_BOTTOM)
	{
		this.orientation.set(Math.PI, -1.57);
	}

	this.updateControls();
};

EditorPlanarControls.prototype.reset = function()
{
	this.distance = 10;
	this.center.set(0, 0, 0);
	this.updateControls();
};

EditorPlanarControls.prototype.update = function(mouse, keyboard)
{
	var needsUpdate = false;

	if(mouse.buttonPressed(Mouse.RIGHT))
	{
		var direction = this.getWorldDirection(this.tempVector);
		var up = direction.y > 0;
		direction.y = 0;
		direction.normalize();

		if(this.mode === Settings.PLANAR_TOP || this.mode === Settings.PLANAR_BOTTOM)
		{
			var y = mouse.delta.y * Editor.settings.editor.mouseLookSensitivity * this.distance;
			this.center.x -= direction.x * y;
			this.center.z -= direction.z * y;
		}
		else
		{
			this.center.y += mouse.delta.y * Editor.settings.editor.mouseLookSensitivity * this.distance;
		}

		direction.applyAxisAngle(EditorOrbitControls.UP, 1.57);

		var x = mouse.delta.x * Editor.settings.editor.mouseLookSensitivity * this.distance;
		this.center.x -= direction.x * x;
		this.center.z -= direction.z * x;

		needsUpdate = true;
	}

	if(mouse.wheel !== 0)
	{
		this.distance += mouse.wheel * Editor.settings.editor.mouseWheelSensitivity * this.distance;
		needsUpdate = true;
	}
	
	/*
	//WASD movement
	if(Editor.settings.editor.keyboardNavigation)
	{
		if(Editor.keyboard.keyPressed(Keyboard.W))
		{
			var direction = this.getWorldDirection(this.tempVector);
			direction.y = 0;
			direction.normalize();

			this.center.x -= direction.x * Editor.settings.editor.keyboardNavigationSpeed;
			this.center.z -= direction.z * Editor.settings.editor.keyboardNavigationSpeed;
			needsUpdate = true;
		}
		if(Editor.keyboard.keyPressed(Keyboard.A))
		{
			var direction = this.getWorldDirection(this.tempVector);
			direction.y = 0;
			direction.normalize();
			direction.applyAxisAngle(EditorOrbitControls.UP, 1.57);

			this.center.x -= direction.x * Editor.settings.editor.keyboardNavigationSpeed;
			this.center.z -= direction.z * Editor.settings.editor.keyboardNavigationSpeed;
			needsUpdate = true;
		}
		if(Editor.keyboard.keyPressed(Keyboard.S))
		{
			var direction = this.getWorldDirection(this.tempVector);
			direction.y = 0;
			direction.normalize();

			this.center.x += direction.x * Editor.settings.editor.keyboardNavigationSpeed;
			this.center.z += direction.z * Editor.settings.editor.keyboardNavigationSpeed;
			needsUpdate = true;
		}
		if(Editor.keyboard.keyPressed(Keyboard.D))
		{
			var direction = this.getWorldDirection(this.tempVector);
			direction.y = 0;
			direction.normalize();
			direction.applyAxisAngle(EditorOrbitControls.UP, 1.57);

			this.center.x += direction.x * Editor.settings.editor.keyboardNavigationSpeed;
			this.center.z += direction.z * Editor.settings.editor.keyboardNavigationSpeed;
			needsUpdate = true;
		}
	}
	*/

	if(needsUpdate === true)
	{
		this.updateControls();
	}
};