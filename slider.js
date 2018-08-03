/*!
 * Slider 1.0.0
 * Copyright (C) 2018 - Developed by Kendra Mukhia
 */


;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var defaults = {
            slidesToShow    : 1,
            dots            : false,
            arrows          : true,
            prevArrow       : '<a class="prev">Previous</a>',
            nextArrow       : '<a class="next">Next</a>',
        };

    // The actual plugin constructor
    function Slider( element, options ) {

        var _this = this;
        this.element = element;
        this.$slider = $(element);
        this.slideIndex = 1;

        // jQuery has an extend method that merges the 
        // contents of two or more objects, storing the 
        // result in the first object. The first object 
        // is generally empty because we don't want to alter 
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;

        this.changeSlide = $.proxy(this.changeSlide, this);

        this.init();

        
    }

    Slider.prototype.init = function () {
       this.buildRows();
       this.showSlides(this.slideIndex);
       this.buildArrows();
       this.buildDots();
       this.initializeEvents();
    };

    Slider.prototype.buildRows = function() {

        var slides = this.$slider.children();

        this.length = slides.length;
        this.slides = slides;

    };

    Slider.prototype.showSlides = function() {

   
        if (this.slideIndex > this.length) { this.slideIndex = 1}
        if (this.slideIndex < 1) { this.slideIndex = this.length }
        for (i = 0; i < this.length; i++) {
            this.slides[i].style.display = "none";
        }

        this.slides[this.slideIndex-1].style.display = "block";

    };

    Slider.prototype.buildArrows = function() {

        if (this.options.arrows === true ) {

            var arrowHtml = $('<div></div>');

            arrowHtml.append(this.options.prevArrow);
            arrowHtml.append(this.options.nextArrow);

            this.$slider.append(arrowHtml);

        }

    };

    Slider.prototype.buildDots = function() {

        if (this.options.dots === true ) {

            
            var dotHtml = $('<div style="text-align:center"></div>');

            
            for(i=0; i<this.length; i++){

                let active_class = '';

                if( i == 0)
                    active_class = 'active';

                var row = $('<span class="dot '+active_class+'" data-index="'+(i+1)+'"></span> ');
                dotHtml.append(row);
            }

            this.$slider.append(dotHtml);

        }

    };


    Slider.prototype.initializeEvents = function() {

        this.initArrowEvents();
        this.initDotEvents();

    };

    Slider.prototype.changeSlide = function(state) {

    
        switch (state) {

            case 'previous':
                this.slideIndex -= 1;
                this.showSlides();
                break;

            case 'next':
                this.slideIndex += 1;
                this.showSlides();
                break;

            default:
                return;
        }

    };

    Slider.prototype.initArrowEvents = function() {

        var _this = this;
        if (this.options.arrows === true) {
          
            this.$prevArrow = $(this.options.prevArrow);
           
            this.$slider.find('.prev').on('click',  function(){
                _this.slideIndex -= 1;
                _this.showSlides();
                _this.updateDots();
            } );


            this.$slider.find('.next').on('click',  function(){
                _this.slideIndex += 1;
                _this.showSlides();
                _this.updateDots();
            } );
           
        }

    };

    Slider.prototype.updateDots = function() {

        var _this = this;

        this.$slider.find('.dot').removeClass('active');
        this.$slider.find('.dot[data-index="'+this.slideIndex+'"]').addClass('active');


    };

    Slider.prototype.initDotEvents = function() {

        var _this = this;

        if (this.options.dots === true) {
          
            this.$slider.find('.dot').on('click',  function(){

                
                let index = $(this).data('index');
                
                _this.slideIndex = index;
                _this.showSlides();
                _this.updateDots();
            } );
           
        }

    };

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn.slider = function () {

         var self = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = self.length,
            i,
            ret;

        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined'){
                self[i].slider = new Slider(self[i], opt);
            }
           
            if (typeof ret != 'undefined') return ret;
        }
        return self;

    }

})( jQuery, window, document );

