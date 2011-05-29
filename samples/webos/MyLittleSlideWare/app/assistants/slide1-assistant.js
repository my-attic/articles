function Slide1Assistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

Slide1Assistant.prototype.setup = function() {
  // a local object for button attributes
     this.cmdNextAttributes = {};
  // a local object for button model
     this.cmdNextModel = {
         "label" : "Next",
         "buttonClass" : "",
         "disabled" : false
     };
  // set up the button
     this.controller.setupWidget("cmdNext", this.cmdNextAttributes, this.cmdNextModel);
  // bind the button to its handler
    Mojo.Event.listen(this.controller.get("cmdNext"), Mojo.Event.tap,
        this.handleButtonPress.bind(this));

    this.controller.setupWidget(Mojo.Menu.appMenu, MyLittleSlideWare.MenuAttr, MyLittleSlideWare.MenuModel);
};

Slide1Assistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

Slide1Assistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

Slide1Assistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};

Slide1Assistant.prototype.handleButtonPress = function(event){
    Mojo.Controller.stageController.pushScene("slide2");
};
