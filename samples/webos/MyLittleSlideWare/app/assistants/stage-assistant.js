var MyLittleSlideWare = {};

MyLittleSlideWare.MenuAttr = {omitDefaultItems: true};

MyLittleSlideWare.MenuModel = {
    visible: true,
    items: [
            {label: "Slide 1", command: "do-slide1"},
            {label: "Slide 2", command: "do-slide2"},
            {label: "Slide 3", command: "do-slide3"}
    ]
};

function StageAssistant() {
	/* this is the creator function for your stage assistant object */
}

StageAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the stage is first created */
    this.controller.pushScene("slide1");

};

StageAssistant.prototype.handleCommand = function(event) {
    if(event.type == Mojo.Event.command) {
        switch(event.command) {
            case "do-slide1":
                Mojo.Controller.stageController.pushScene("slide1");
            break;

            case "do-slide2":
                Mojo.Controller.stageController.pushScene("slide2");
            break;

            case "do-slide3":
                Mojo.Controller.stageController.pushScene("slide3");
            break;
        }
    }
};