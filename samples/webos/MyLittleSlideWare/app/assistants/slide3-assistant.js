function Slide3Assistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

Slide3Assistant.prototype.setup = function() {
     this.cmdHomeAttributes = {};
     this.cmdPreviousAttributes = {};

     this.cmdHomeModel = {
         "label" : "Home",
         "buttonClass" : "",
         "disabled" : false
     };

     this.cmdPreviousModel = {
         "label" : "Previous",
         "buttonClass" : "",
         "disabled" : false
     };

     this.controller.setupWidget("cmdHome", this.cmdHomeAttributes, this.cmdHomeModel);
     this.controller.setupWidget("cmdPrevious", this.cmdPreviousAttributes, this.cmdPreviousModel);

    Mojo.Event.listen(this.controller.get("cmdHome"), Mojo.Event.tap,
        this.handleCmdHomePress.bind(this));

    Mojo.Event.listen(this.controller.get("cmdPrevious"), Mojo.Event.tap,
        this.handleCmdPreviousPress.bind(this));

    this.controller.setupWidget(Mojo.Menu.appMenu, MyLittleSlideWare.MenuAttr, MyLittleSlideWare.MenuModel);
};

Slide3Assistant.prototype.handleCmdHomePress = function(event){
    Mojo.Controller.stageController.pushScene("slide1");
};

Slide3Assistant.prototype.handleCmdPreviousPress = function(event){
    Mojo.Controller.stageController.pushScene("slide2");
};


Slide3Assistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

Slide3Assistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

Slide3Assistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};
