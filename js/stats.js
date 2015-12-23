var stats = {

    // Retrieve saved stats, if none exist, create empty stats
    initialize: function() {
        this.getstats = window.localStorage.getItem('allstats');
        
        if (null == this.getstats || this.getstats == "null") {
            this.reset();
        } else {
            this.allstats = jQuery.parseJSON(this.getstats);
        }
        this.draw();
    },
    
    // Set all stats to zero
    reset: function() {
        if (typeof(window[this.allstats]) == 'undefined' || window[this.allstats] == null) { this.allstats = new Object(); }
        this.allstats.winx = this.allstats.losex = this.allstats.drawx = 0;
        this.allstats.wino = this.allstats.loseo = this.allstats.drawo = 0;
        this.update();
        this.draw();
    },
    
    // Save current stats to local storage and update show stats
    update: function() {
        window.localStorage.setItem('allstats', JSON.stringify(this.allstats));
    },
    
    // Add a completed game result o the stats
    setNew: function(player, result) {
        if (player == 1) {
            if (result == 0) { this.allstats.drawx++; }
            else if (result == 1) { this.allstats.winx++; }
            else if (result == 2) { this.allstats.losex++; }
        } else {
            if (result == 0) { this.allstats.drawo++; }
            else if (result == 1) { this.allstats.loseo++; }
            else if (result == 2) { this.allstats.wino++; }
        }
        this.update();
        this.draw();
    },
    
    // Update statistics table with current results
    draw: function() {
        // All as X updates
        $('#stxplay').empty().text(this.allstats.winx + this.allstats.losex + this.allstats.drawx);
        $('#stxwon').empty().text(this.allstats.winx);
        $('#stxlost').empty().text(this.allstats.losex);
        $('#stxdraw').empty().text(this.allstats.drawx);
        if (this.allstats.winx + this.allstats.losex == 0 ) var perc = 0;
        else var perc = this.allstats.winx / (this.allstats.winx + this.allstats.losex);
        $('#stxperc').empty().text(Math.round(perc*1000)/10+"%");
        
        // All as O updates
        $('#stoplay').empty().text(this.allstats.wino + this.allstats.loseo + this.allstats.drawo);
        $('#stowon').empty().text(this.allstats.wino);
        $('#stolost').empty().text(this.allstats.loseo);
        $('#stodraw').empty().text(this.allstats.drawo);
        if (this.allstats.wino + this.allstats.loseo == 0) var perc = 0;
        else var perc = this.allstats.wino / (this.allstats.wino + this.allstats.loseo);
        $('#stoperc').empty().text(Math.round(perc*1000)/10+"%");
        
        // Total plays updates
        $('#sttotplay').empty().text(this.allstats.winx + this.allstats.losex + this.allstats.drawx + this.allstats.wino + this.allstats.loseo + this.allstats.drawo);
        $('#sttotwon').empty().text(this.allstats.winx + this.allstats.wino);
        $('#sttotlost').empty().text(this.allstats.losex + this.allstats.loseo);
        $('#sttotdraw').empty().text(this.allstats.drawx + this.allstats.drawo);
        if (this.allstats.wino + this.allstats.loseo + this.allstats.winx + this.allstats.losex == 0) var perc = 0;
        else var perc = (this.allstats.winx + this.allstats.wino) / (this.allstats.winx + this.allstats.wino + this.allstats.losex + this.allstats.loseo);
        $('#sttotperc').empty().text(Math.round(perc*1000)/10+"%");
        
    }


};
