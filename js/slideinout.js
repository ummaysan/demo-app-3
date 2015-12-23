var slider = {

    initialize: function() {
        this.current = "intro";    
    },
    
    slidein: function(page) {
        $('.'+this.current).animate({ left: '-150%' }, 500);
        $('.'+page).animate({ left: '0%' }, 500);
        this.current = page;
    },

    slideout: function() {
       $('.'+this.current).animate({ left: '150%' }, 500);
       $('.intro').animate({ left: '0%' }, 500);
       this.current = "intro";
    }
};
