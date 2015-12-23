document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    document.addEventListener("backbutton", onBackKeyDown, false);

}

function onBackKeyDown() {
    if (slider.current == "intro") {
        navigator.app.exitApp();
    } else {
        slider.slideout();
    }
}
