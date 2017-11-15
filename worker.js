var valg;
function start() {
  // Spillet startes efter tryk på en knap.
  $("#startside").css("display", "none");
  $("#game").css("display", "block");
  $.playSound('lyd/Drums1.mp3'); // Den har Jacob lavet :-D
  $("#dreng").addClass("valg_af_karakter");
  $("#pige").addClass("valg_af_karakter");
  $("#pige_figur").css("display", "block");
  $("#dreng_figur").css("display", "block");
}

function KarakterValg(karakter) {
   // Før spillet starter, skal der vælges en karakter. Valget bliver husket i det globale variabel "valg",
   // Som vi senere bruger til, blandt andet, at vælge grafik filer.
   valg = karakter;
   $.stopSound('lyd/Drums1.mp3');
   $.playSound('lyd/bensound-sexy.mp3', 'loop', 'music'); // Credits: bensound.com
   $("#dreng").css("display", "none");
   $("#pige").css("display", "none");
   $("#game").css("background", "url(billeder/"+valg+"værelse.svg) no-repeat");
    $("#"+valg+"_figur").addClass("flyt_dreng_figur");
    if (valg == "dreng") {$("#pige_figur").css("display", "none");} else {$("#dreng_figur").css("display", "none");}
	$("#telefon").css("display", "block");
    $("#telefon").css("background", "url(billeder/"+valg+"hånd_facebook.svg) no-repeat");
	setTimeout(function() {
	  $("#telefon").addClass("modtag_besked");$.playSound('lyd/message.mp3', false);
	  setTimeout(function() {
		$("#telefon").css("background", "url(billeder/"+valg+"hånd_snap.svg) no-repeat");
		$("#snap_button").css("display", "block");
		$("#haand_fri").css("display", "block");
		$("#haand_fri").css("background", "url(billeder/"+valg+"hånd2.svg) no-repeat");
	  }, 1000);
	}, 3000);
}

function vis_besked() {
  // Brugeren modtager en besked på sin telefon
  $("#snap_button").css("display", "none");
  $("#haand_fri").addClass("snap_ikon_tryk");
  setTimeout(function() {
	$("#telefon").css("background", "url(billeder/"+valg+"_dickpic.svg) no-repeat");
	$("#haand_fri").removeClass("snap_ikon_tryk");
	$("#haand_fri").addClass("haand_fri_pos");
	$("#haand_fri").addClass("haand_fri_flyt");
    setTimeout(function() {
	  $("#videresend_button").css("display", "block");
	  $("#slet_button").css("display", "block");
	}, 4000);
  }
  , 2200);
}

function videresend_besked() {
  $("#music").prop("volume", 0.3);
  $("#game").css("background", "url(billeder/vindue.svg) no-repeat");
  $("#telefon").css("display", "none"); 
  $("#haand_fri").css("display", "none");
  var showTime = 1000; // Vis hver baggrund i antal sekunder før vi skifter til næste
  for (videresendSprite=2;videresendSprite<=21;videresendSprite++) {
	var changeTime = videresendSprite*showTime;
	preload_svg('billeder/city/city_sprite_' +videresendSprite + '.svg'); // Sådan undgår vi at det blinker...
	show_sprite(videresendSprite, changeTime);
  }
  setTimeout(goToJail,changeTime+1000);

}
function slet_besked() {
	$("#telefon").css("background", "url(billeder/"+valg+"hånd_besked.svg) no-repeat");
	$("#telefon").addClass("zoom_telefon");
	$("#videresend_button").css("display", "none");
	$("#slet_button").css("display", "none");
}

function goToJail() {
	$("#music").prop("volume", 1);
	$("#scene").css("background", "url(billeder/"+valg+"værelse.svg) no-repeat");
	$("#game").css("background", "url(billeder/tremmer.svg) no-repeat");
	$.playSound('lyd/prison.mp3', false);
	$("#game").addClass("busted");
	$("#"+valg+"_figur").css("display", "none");
	setTimeout(function(){
	  $("#game").css("background", "url(billeder/"+valg+"_tremmer.svg) no-repeat");
	  $.stopSound('lyd/bensound-sexy.mp3'); // Credits: bensound.com
	  setTimeout(function(){
	    
	  },4000);
	},4000);
}

function roll_credits() {
  var showTime = 4000; // Vis hver item i antal sekunder før vi skifter til næste
  show_credit_item(1, 100);
  for (i=2;i<=5;i++) {
	var changeTime = i*showTime;
    show_credit_item(i, changeTime);
  }
  show_credit_item(item, changeTime);
}
function show_credit_item(item, changeTime) {
  setTimeout(function(){
    $("#credits"+item).css("display", "block");
	$("#credits"+item).addClass("credits_roll");
  }, changeTime);
}

function show_sprite(bgSprite, changeTime) {
	  setTimeout(function(){
	    $("#game").css("background", "url(billeder/city/city_sprite_"+bgSprite+".svg) no-repeat");
	    
	    if (bgSprite==9) { // city_sprite_9.svg
	      $.playSound('lyd/adhvorklamt.mp3', false); // "Ad hvor klamt"
	    } else if (bgSprite==13) { // city_sprite_13.svg
	      $.playSound('lyd/hvorforsendermansådannoget.mp3', false); // "Hvorfor sender man sådan noget"
	    } else if (bgSprite==17) { // city_sprite_17.svg
	      $.playSound('lyd/fuckhvorpinligt.mp3', false); // "Fuck hvor pinligt!"
	    } else if (bgSprite==21) { // city_sprite_21.svg
	      $.playSound('lyd/hvemerdet.mp3', false); // "Hvem er det?!"
	    }
	  }, changeTime);
}
function preload_svg(svgFile) {
	  // Vi havde et problem hvor .svg billederne "blinkede", når de blev indlæst
	  // det fandt vi ud af at undgå ved at lave en simpel pre-loader
	return $(
	         '<div style="background:url('+svgFile+');width:1px;height:1px;"></div>'
	         ).appendTo('#preloader');
	}
(function ($) {
    $.extend({
        playSound: function (sound_file, loop_audio=true, eID='') { // fil - gentag - element id
        	if (eID !== '') {eID = ' id="' + eID + '"';}
		    if (loop_audio==true){loop_audio=' loop';}
            return $(
                   '<audio class="sound-player" autoplay="autoplay"' + loop_audio + ' style="display:none;"'+eID+'>'
                     + '<source src="' + sound_file + '">'
                     + '<embed src="' + sound_file + '" hidden="true" autostart="true" '+ loop_audio +'>'
                   + '</audio>'
                 ).appendTo('body');
        },
        stopSound: function () {
            $(".sound-player").remove();
        }
    });
})(jQuery);