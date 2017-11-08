$(window).on("load", startWorker);

function startWorker() {
    console.log("1 startWorker");
	$("button.start").on("click", busPickup);
	/* busPickup(); */
}

function objectEnters() {
    console.log("objectEnters");
	disableButton("button.start");
    $("#objectID").addClass("move_object_into_scene");
	$.playSound('sound_file.mp3');
	setTimeout(busLeave, 24000);
}
function moveObjectOutFromScene() {
    console.log("MoveObjectOutFromScene");
    $("#objectID").removeClass("move_object_into_scene"); /* Remove the "move in" class, and remember location via  "object_stop_location" */
	$("#objectID").addClass("object_stop_location"); /* Same as move_object_out_from_scene */
	$("#objectID").addClass("move_object_out_from_scene"); /* move_object_out_from_scene */
}



function disableButton(buttonHandle) {
	$(buttonHandle).prop("disabled",true);
	$("#StartWorker").removeClass("button");
	$("#StartWorker").addClass("buttonDisabled");
}


(function ($) {
    $.extend({
        playSound: function () {
            return $(
                   '<audio class="sound-player" autoplay="autoplay" style="display:none;">'
                     + '<source src="' + arguments[0] + '" />'
                     + '<embed src="' + arguments[0] + '" hidden="true" autostart="true" loop="false"/>'
                   + '</audio>'
                 ).appendTo('body');
        },
        stopSound: function () {
            $(".sound-player").remove();
        }
    });
})(jQuery);