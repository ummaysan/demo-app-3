var playgrid = {
    // All startup values for a new game
    initialize: function() {
        this.gridval = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0 );
        this.turn = 1;
        this.moves = 0;
        $('#p1').animate({backgroundColor: 'rgba(247, 230, 83, 1)', color: '#862500'}, 500);
        $('.grid').empty();
        this.setPlayers();
    },

    // Determine starting player, get username, assign displays    
    setPlayers: function() {
        this.uname = window.localStorage.getItem("uname");
        if (null == this.uname || this.uname == "null") { this.uname = "Player 1"; }
        this.playerpos = Math.floor(Math.random() * 2) + 1;
        if (this.playerpos == 1) { this.aipos = 2; }
        else { 
            this.aipos = 1;
            ai.makemove(this.gridval, this.aipos);
        }
        $('#p'+this.playerpos+' > .pname').empty().text(this.uname);
        $('#p'+this.aipos+' > .pname').empty().text("AI");
        $('#p1 > .pname').append(" (X)");
        $('#p2 > .pname').append(" (O)");
    },
    
    // When a square is pressed...
    choose: function(id) {
        var chosen = parseInt(id.replace("grid", ""))-1;
        
        // ...check if it is available
        if (this.gridval[chosen] == 0) {
        
            // assign the square
            this.gridval[chosen] = this.turn;
            if (this.turn == 1) { var disp = "X"; var col = "#603200"; }
            else { var disp = "O"; var col = "#00760"; }
            $('#'+id).text(disp);
            $('#'+id).css('color', 'rgba(0, 0, 0, 0)');
            $('#'+id).animate({ color: col}, 200);
            this.moves++;
            // check for victory conditions, if no win, move to the next player
            if (this.checkwin() == 0) { this.nextturn(); }
            
        } else {
        
            // if it is not available, flash the square
            $('#'+id).animate({ backgroundColor: '#F55C5C'}, 100);
            $('#'+id).animate({ backgroundColor: 'rgba(245, 92, 92, 0)'}, 300);
        }
    },
    
    // When it is the next player's turn, set the variable and highlight the appropriate player
    nextturn: function() {
        if (this.turn == 1) {
            this.turn = 2;
            $('#p2').animate({backgroundColor: 'rgba(247, 230, 83, 1)', color: '#862500'}, 300);
            $('#p1').animate({backgroundColor: 'rgba(247, 230, 83, 0)', color: '#000'}, 300);
        } else {
            this.turn = 1;
            $('#p1').animate({backgroundColor: 'rgba(247, 230, 83, 1)', color: '#862500'}, 300);
            $('#p2').animate({backgroundColor: 'rgba(247, 230, 83, 0)', color: '#000'}, 300);
        }
        if (this.turn == this.aipos) { ai.makemove(this.gridval, this.aipos); }
    },
    
    // Conditions to check for victory. Checks values in grid for draw or all 8 possible wins
    checkwin: function() {
        if (this.checkset(this.gridval[0], this.gridval[1], this.gridval[2]) == 1) { return this.done(this.gridval[0]); }
        else if (this.checkset(this.gridval[3], this.gridval[4], this.gridval[5]) == 1) { return this.done(this.gridval[3]); }
        else if (this.checkset(this.gridval[6], this.gridval[7], this.gridval[8]) == 1) { return this.done(this.gridval[6]); }
        else if (this.checkset(this.gridval[0], this.gridval[3], this.gridval[6]) == 1) { return this.done(this.gridval[0]); }
        else if (this.checkset(this.gridval[1], this.gridval[4], this.gridval[7]) == 1) { return this.done(this.gridval[1]); }
        else if (this.checkset(this.gridval[2], this.gridval[5], this.gridval[8]) == 1) { return this.done(this.gridval[2]); }
        else if (this.checkset(this.gridval[0], this.gridval[4], this.gridval[8]) == 1) { return this.done(this.gridval[0]); }
        else if (this.checkset(this.gridval[2], this.gridval[4], this.gridval[6]) == 1) { return this.done(this.gridval[2]); }
        else if (this.moves == 9) { return this.done(0); }
        else { return 0; }
    },

    // Check the selected row for victory
    checkset: function(sq1, sq2, sq3) {
        if (sq1 != 0 && sq1 == sq2 && sq2 == sq3) { return 1; }
        else { return 0; }
    },
    
    // If someone has won, throw up a message, and reset the game board
    done: function(winner) {
        stats.setNew(this.playerpos, winner);
        if (winner == 0) { var winmsg = "Draw!"; }
        else { var winmsg = "Player "+winner+" wins!"; }
        winmsg = winmsg+"<br /><br /><div class='closebtn'>Next Game</div>";
        $('.gameover').empty();
        $('.gameover').html(winmsg);
        $('.gameover').animate({ top: '20%'}, 700);
    },
    
    resetboard: function() {
        $('#p1').animate({backgroundColor: 'rgba(247, 230, 83, 0)', color: '#000'}, 500);
        $('#p2').animate({backgroundColor: 'rgba(247, 230, 83, 0)', color: '#000'}, 500);
        this.initialize();
        return 1;
    }
};


