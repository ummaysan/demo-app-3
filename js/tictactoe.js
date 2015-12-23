$(document).ready(function(){

    // Setup slide effects for each page
    slider.initialize();
    $('.backbtn').click(function() { slider.slideout(); });
    $('#startgame').click(function() { slider.slidein('app'); });
    $('#stats').click(function() { slider.slidein('statpage'); });        
    $('#opts').click(function() { slider.slidein('optpage'); });
    $('#credits').click(function() { slider.slidein('creditpage'); });

    // Setup display of game grid based upon device screen size
    if ($(window).width() < $(window).height()) {
        var size = Math.round($(window).width()/4);
    } else {
        var size = Math.round($(window).height()/4);
    }
    $('.grid').width(size);
    $('.grid').height(size);
    $('.grid').css('line-height', Math.round(size/73)+"em");
    $('.playtbl').css('margin-left', Math.round(size/2)+"px");
    
    // Loading and saving the username
    var uname = window.localStorage.getItem("uname");
    if (null == uname || uname == "null") { uname = "Player 1"; }
    $('#uname').val(uname);
    $('.savebtn').click(function() {
        $('.loading').show();
        window.localStorage.setItem("uname", $('#uname').val());
        playgrid.initialize();
        setTimeout(function() { $('.loading').hide(); }, 500);
    });
    
    stats.initialize();
    $('.resetbtn').click(function() { stats.reset(); });
    
    // Start it up, and assign click triggers
    playgrid.initialize();
    
    $('.gameover').click(function() {
        $('.gameover').animate({ top: '150%' }, 500);
        playgrid.resetboard();
    });

    $('.grid').click(function() {
        playgrid.choose($(this).attr('id'));
    });

});

