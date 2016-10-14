(function ($, window, document, undefined) {

    'use strict';
    var pluginName = 'loadingModal',
        defaults = {
            position: 'auto',
            text: '',
            color: '#fff',
            opacity: '0.7',
            backgroundColor: 'rgb(0,0,0)',
            animation: 'doubleBounce'
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        var $that = this;
        this.element = element;
        this.animations = {
            doubleBounce: {html: '<div class="sk-double-bounce"><div class="sk-child sk-double-bounce1"></div><div class="sk-child sk-double-bounce2"></div></div>'},
            rotatingPlane: {html: '<div class="sk-rotating-plane"></div>', setBackground: function(color) {
                $that.animationBox.find('*').each(function (k, e) {
                    if ($(e).css('background-color') && $(e).css('background-color') != 'rgba(0, 0, 0, 0)') {
                        $(e).css('background-color', color);
                    }
                });
            }},
            wave: {html: '<div class="sk-wave"> <div class="sk-rect sk-rect1"></div> <div class="sk-rect sk-rect2"></div> <div class="sk-rect sk-rect3"></div> <div class="sk-rect sk-rect4"></div> <div class="sk-rect sk-rect5"></div> </div>'},
            wanderingCubes: {html: '<div class="sk-wandering-cubes"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div></div>'},
            spinner: {html: '<div class="sk-spinner sk-spinner-pulse"></div>'},
            chasingDots: {html: '<div class="sk-chasing-dots"><div class="sk-child sk-dot1"></div><div class="sk-child sk-dot2"></div></div>'},
            threeBounce: {html: '<div class="sk-three-bounce"><div class="sk-child sk-bounce1"></div><div class="sk-child sk-bounce2"></div><div class="sk-child sk-bounce3"></div></div>'},
            circle: {html: '<div class="sk-circle"> <div class="sk-circle1 sk-child"></div> <div class="sk-circle2 sk-child"></div> <div class="sk-circle3 sk-child"></div> <div class="sk-circle4 sk-child"></div> <div class="sk-circle5 sk-child"></div> <div class="sk-circle6 sk-child"></div> <div class="sk-circle7 sk-child"></div> <div class="sk-circle8 sk-child"></div> <div class="sk-circle9 sk-child"></div> <div class="sk-circle10 sk-child"></div> <div class="sk-circle11 sk-child"></div> <div class="sk-circle12 sk-child"></div> </div>', setBackground: function(color) {
                $that.animationBox.children().find('*').each(function (k, e) {
                    if(window.getComputedStyle(e, ':before').getPropertyValue('background-color') !== 'rgba(0, 0, 0, 0)') {
                        $('body').append($('<style data-custom-style>.' + $(e).attr('class').split(' ')[0] + ':before {background-color: ' + color + ' !important;}</style>'));
                    }
                });
            }},
            cubeGrid: {html: '<div class="sk-cube-grid"> <div class="sk-cube sk-cube1"></div> <div class="sk-cube sk-cube2"></div> <div class="sk-cube sk-cube3"></div> <div class="sk-cube sk-cube4"></div> <div class="sk-cube sk-cube5"></div> <div class="sk-cube sk-cube6"></div> <div class="sk-cube sk-cube7"></div> <div class="sk-cube sk-cube8"></div> <div class="sk-cube sk-cube9"></div> </div>'},
            fadingCircle: {html: '<div class="sk-fading-circle"> <div class="sk-circle1 sk-circle"></div> <div class="sk-circle2 sk-circle"></div> <div class="sk-circle3 sk-circle"></div> <div class="sk-circle4 sk-circle"></div> <div class="sk-circle5 sk-circle"></div> <div class="sk-circle6 sk-circle"></div> <div class="sk-circle7 sk-circle"></div> <div class="sk-circle8 sk-circle"></div> <div class="sk-circle9 sk-circle"></div> <div class="sk-circle10 sk-circle"></div> <div class="sk-circle11 sk-circle"></div> <div class="sk-circle12 sk-circle"></div> </div>', setBackground: function(color) {
                $that.animationBox.children().find('*').each(function (k, e) {
                    if(window.getComputedStyle(e, ':before').getPropertyValue('background-color') !== 'rgba(0, 0, 0, 0)') {
                        $('body').append($('<style data-custom-style>.' + $(e).attr('class').split(' ')[0] + ':before {background-color: ' + color + ' !important;}</style>'));
                    }
                });
            }},
            foldingCube: {html: '<div class="sk-folding-cube"> <div class="sk-cube1 sk-cube"></div> <div class="sk-cube2 sk-cube"></div> <div class="sk-cube4 sk-cube"></div> <div class="sk-cube3 sk-cube"></div> </div>', setBackground: function(color) {
                $that.animationBox.find('*').each(function (k, e) {
                    if(window.getComputedStyle(e, ':before').getPropertyValue('background-color') !== 'rgba(0, 0, 0, 0)') {
                        $('body').append($('<style data-custom-style>.' + $(e).attr('class').split(' ')[0] + ':before {background-color: ' + color + ' !important;}</style>'));
                    }
                });
            }}
        };

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this.modal = null;
        this.modalText = null;
        this.animationBox = null;
        this.modalBg = null;
        this.currenAnimation = null;
        this.init();
        return this;
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
            // Create all elements
            var $modal = $('<div class="jquery-loading-modal jquery-loading-modal--visible"></div>');
            var $modalBg = $('<div class="jquery-loading-modal__bg"></div>');
            var $animationBox = $('<div class="jquery-loading-modal__animation"></div>');
            var $infoBox = $('<div class="jquery-loading-modal__info-box"></div>');
            var $text = $('<div class="jquery-loading-modal__text"></div>');

            // Hide text element if no text available
            if (this.settings.text !== '') {
                $text.html(this.settings.text);
            } else {
                $text.hide();
            }

            // Add selected animation loader element
            this.currenAnimation = this.animations[this.settings.animation];
            $animationBox.append(this.currenAnimation.html);
            $infoBox.append($animationBox).append($text);

            $modal.append($modalBg);
            $modal.append($infoBox);

            if(this.settings.position === 'auto' && this.element.tagName.toLowerCase() !== 'body') {
                $modal.css('position', 'absolute');
                $(this.element).css('position', 'relative');
            } else if(this.settings.position !== 'auto') {
                $(this.element).css('position', this.settings.position);
            }

            $(this.element).append($modal);

            this.modalBg = $modalBg;
            this.modal = $modal;
            this.modalText = $text;
            this.animationBox = $animationBox;
            this.color(this.settings.color);
            this.backgroundColor(this.settings.backgroundColor);
            this.opacity(this.settings.opacity);
        },
        hide: function () {
            var modal = this.modal;
            modal.removeClass('jquery-loading-modal--visible').addClass('jquery-loading-modal--hidden');
            setTimeout(function(){
                modal.hide();
            }, 1000);
        },
        backgroundColor: function (color) {
            this.modalBg.css({'background-color': color});
        },
        color: function (color) {
            $('[data-custom-style]').remove();

            this.modalText.css('color', color);

            if(this.currenAnimation.setBackground) {
                this.currenAnimation.setBackground(color);
            } else {
                this.animationBox.children().find('*').each(function (k, e) {
                    if ($(e).css('background-color') && $(e).css('background-color') != 'rgba(0, 0, 0, 0)') {
                        $(e).css('background-color', color);
                    }

                    if(window.getComputedStyle(e, ':before').getPropertyValue('background-color') !== 'rgba(0, 0, 0, 0)') {
                        $('body').append($('<style data-custom-style>.' + $(e).attr('class').split(' ')[0] + ':before {background-color: ' + color + ' !important;}</style>'));
                    }
                });
            }
        },
        opacity: function (opacity) {
            this.modalBg.css({'opacity': opacity});
        },
        show: function () {
            this.modal.show().removeClass('jquery-loading-modal--hidden').addClass('jquery-loading-modal--visible');
        },
        animation: function (animation) {
            this.animationBox.html('');
            this.currenAnimation = this.animations[animation];
            this.animationBox.append(this.currenAnimation.html);
        },
        destroy: function () {
            $('[data-custom-style]').remove();
            this.modal.remove();
        },
        text: function (text) {
            this.modalText.html(text);
        }
    });

    // You don't need to change something below:
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations and allowing any
    // public function (ie. a function whose name doesn't start
    // with an underscore) to be called via the jQuery plugin,
    // e.g. $(element).defaultPluginName('functionName', arg1, arg2)
    $.fn[pluginName] = function (options) {
        var args = arguments;

        // Is the first parameter an object (options), or was omitted,
        // instantiate a new instance of the plugin.
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {

                // Only allow the plugin to be instantiated once,
                // so we check that the element has no plugin instantiation yet
                if (!$.data(this, 'plugin_' + pluginName)) {

                    // if it has no instance, create a new one,
                    // pass options to our plugin constructor,
                    // and store the plugin instance
                    // in the elements jQuery data object.
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
            });

            // If the first parameter is a string and it doesn't start
            // with an underscore or "contains" the `init`-function,
            // treat this as a call to a public method.
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

            // Cache the method call
            // to make it possible
            // to return a value
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);

                // Tests that there's already a plugin-instance
                // and checks that the requested public method exists
                if (instance instanceof Plugin && typeof instance[options] === 'function') {

                    // Call the method of our plugin instance,
                    // and pass it the supplied arguments.
                    returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }

                // Allow instances to be destroyed via the 'destroy' method
                if (options === 'destroy') {
                    $.data(this, 'plugin_' + pluginName, null);
                }
            });

            // If the earlier cached method
            // gives a value back return the value,
            // otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
    };

})(jQuery, window, document);