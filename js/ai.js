var ai = {

    makemove: function(board, player) {
        this.nboard = board.slice(0);
        this.player = player;
        if (this.player == 1) { this.opp = 2; }
        else { this.opp = 1; }
        var best = this.determine(2, this.player);
        this.select(best[1]);
    },
    
    findAvail: function() {
        var j = 0;
        var avail = new Array();
        for ( var i = 0; i < this.nboard.length; i++ ) {
            if (this.nboard[i] == 0) {
                avail[j] = i;
                j++;
            }
        }
        return avail;
    },

    determine: function(depth, mover) {
        if (mover == this.player) { var bestscore = -1000; }
        else { var bestscore = 1000; }
        var bestmove = -1;
        var avail = this.findAvail();
        
        if (avail.length == 0 || depth == 0) { bestscore = this.evaluateBoard(); }
        else {
            for ( var i = 0; i < avail.length; i++ ) {
                this.nboard[avail[i]] = mover;
                if (mover == this.player) {
                    var score = this.determine(depth - 1, this.opp);
                    if (score[0] > bestscore) {
                        bestscore = score[0];
                        bestmove = avail[i];
                    }
                } else {
                    var score = this.determine(depth - 1, this.player);
                    if (score[0] < bestscore) {
                        bestscore = score[0];
                        bestmove = avail[i];
                    }
                }
                this.nboard[avail[i]] = 0;
            }
        }
        return [bestscore, bestmove];
    },
    
    evaluateBoard: function(mover) {
        var score = 0;
        score += this.evaluateLine(0, 1, 2);
        score += this.evaluateLine(3, 4, 5);
        score += this.evaluateLine(6, 7, 8);
        score += this.evaluateLine(0, 3, 6);
        score += this.evaluateLine(1, 4, 7);
        score += this.evaluateLine(2, 5, 8);
        score += this.evaluateLine(0, 4, 8);
        score += this.evaluateLine(2, 4, 6);
        return score;
    },
    
    evaluateLine: function(b1, b2, b3) {
        var score = 0;
        if (this.nboard[b1] == this.player) { score = 1; }
        else if (this.nboard[b1] != 0) { score = -1; }
        
        if (this.nboard[b2] == this.player) {
            if (score == 1) { score = 10; }
            else if (score == -1) { return 0; }
            else { score = 1; }
        } else if (this.nboard[b2] != 0) {
            if (score == -1) { score = -10; }
            else if (score == 1) { return 0; }
            else { score = -1; }
        }
        
        if (this.nboard[b3] == this.player) {
            if (score > 0) { score *= 10; }
            else if (score < 0) { return 0; }
            else { score = 1; }
        } else if (this.nboard[b3] != 0) {
            if (score < 0) { score *= 10; }
            else if (score > 1) { return 0; }
            else { score = -1; }
        }
        return score;
    },

    select: function(id) {
        playgrid.choose("grid"+(id+1));
    }
};
