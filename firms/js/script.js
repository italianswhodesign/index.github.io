$(".category").click(function() {
  var category = $(".category:checked").map(function(){
    return this.value;
  }).toArray();
  if($(".category:checked").length >=1) {
    $('.item').hide();
    $("input[name='filter']").prop('checked',false);
    $(".item").each(function() {
      if (category.length == 1 && $(this).data("category").indexOf(category[0]) > -1) {
        $(this).show();
      }
      else if (category.length == 2 && $(this).data("category").indexOf(category[0]) > -1 && $(this).data("category").indexOf(category[1]) > -1) {
        $(this).show();
      }
      else if (category.length == 3 && $(this).data("category").indexOf(category[0]) > -1 && $(this).data("category").indexOf(category[1]) > -1
          && $(this).data("category").indexOf(category[2]) > -1) {
        $(this).show();
      }
      else if (category.length == 4 && $(this).data("category").indexOf(category[0]) > -1 && $(this).data("category").indexOf(category[1]) > -1
          && $(this).data("category").indexOf(category[2]) > -1 && $(this).data("category").indexOf(category[3]) > -1) {
        $(this).show();
      }
      else if (category.length == 5 && $(this).data("category").indexOf(category[0]) > -1 && $(this).data("category").indexOf(category[1]) > -1
          && $(this).data("category").indexOf(category[2]) > -1 && $(this).data("category").indexOf(category[3]) > -1 && $(this).data("category").indexOf(category[4]) > -1) {
        $(this).show();
      }
      else if (category.length == 6 && $(this).data("category").indexOf(category[0]) > -1 && $(this).data("category").indexOf(category[1]) > -1
          && $(this).data("category").indexOf(category[2]) > -1 && $(this).data("category").indexOf(category[3]) > -1 && $(this).data("category").indexOf(category[4]) > -1 && $(this).data("category").indexOf(category[5]) > -1) {
        $(this).show();
      }
    });
  }

  else {
    $("input[name='filter']").prop('checked',false);
    $(".category").prop('checked',false);
    $('.item').show();
  }
  var getLength = $('#shuffle').find(".Title:visible").length;
  if (getLength >=1) {
    jQuery('#info-message').addClass('hidden');
  }
  else {
    jQuery('#info-message').removeClass('hidden');
  }
});

$("input[name='filter']").click(function() {
  $('.item').hide();
  $(".category").prop('checked',false);
  $(".item[data-category*='"+$(this).val()+"']").show();
  var getLength = $('#shuffle').find(".Title:visible").length;
  if (getLength >=1) {
    jQuery('#info-message').addClass('hidden');
  }
  else {
    jQuery('#info-message').removeClass('hidden');
  }
});

$('.reset').click(function(e){
  e.preventDefault();
  $("input[name='filter']").prop('checked',false);
  $(".category").prop('checked',false);
  $('.item').show();
  jQuery('#info-message').addClass('hidden');
});

jQuery(function() {
  initMobileNav();
});


// mobile menu init
function initMobileNav() {
  jQuery('body').mobileNav({
    menuActiveClass: 'side-active',
    menuOpener: '.side-opener',
    hideOnClickOutside: true,
    menuDrop: '.side-menu'
  });
}


/*
 * Simple Mobile Navigation
 */
;(function($) {
  function MobileNav(options) {
    this.options = $.extend({
      container: null,
      hideOnClickOutside: false,
      menuActiveClass: 'nav-active',
      menuOpener: '.nav-opener',
      menuDrop: '.nav-drop',
      toggleEvent: 'click',
      outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
    }, options);
    this.initStructure();
    this.attachEvents();
  }
  MobileNav.prototype = {
    initStructure: function() {
      this.page = $('html');
      this.container = $(this.options.container);
      this.opener = this.container.find(this.options.menuOpener);
      this.drop = this.container.find(this.options.menuDrop);
    },
    attachEvents: function() {
      var self = this;

      if(activateResizeHandler) {
        activateResizeHandler();
        activateResizeHandler = null;
      }

      this.outsideClickHandler = function(e) {
        if(self.isOpened()) {
          var target = $(e.target);
          if(!target.closest(self.opener).length && !target.closest(self.drop).length) {
            self.hide();
          }
        }
      };

      this.openerClickHandler = function(e) {
        e.preventDefault();
        self.toggle();
      };

      this.opener.on(this.options.toggleEvent, this.openerClickHandler);
    },
    isOpened: function() {
      return this.container.hasClass(this.options.menuActiveClass);
    },
    show: function() {
      this.container.addClass(this.options.menuActiveClass);
      if(this.options.hideOnClickOutside) {
        this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
      }
    },
    hide: function() {
      this.container.removeClass(this.options.menuActiveClass);
      if(this.options.hideOnClickOutside) {
        this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
      }
    },
    toggle: function() {
      if(this.isOpened()) {
        this.hide();
      } else {
        this.show();
      }
    },
    destroy: function() {
      this.container.removeClass(this.options.menuActiveClass);
      this.opener.off(this.options.toggleEvent, this.clickHandler);
      this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
    }
  };

  var activateResizeHandler = function() {
    var win = $(window),
      doc = $('html'),
      resizeClass = 'resize-active',
      flag, timer;
    var removeClassHandler = function() {
      flag = false;
      doc.removeClass(resizeClass);
    };
    var resizeHandler = function() {
      if(!flag) {
        flag = true;
        doc.addClass(resizeClass);
      }
      clearTimeout(timer);
      timer = setTimeout(removeClassHandler, 500);
    };
    win.on('resize orientationchange', resizeHandler);
  };

  $.fn.mobileNav = function(opt) {
    var args = Array.prototype.slice.call(arguments);
    var method = args[0];

    return this.each(function() {
      var $container = jQuery(this);
      var instance = $container.data('MobileNav');

      if (typeof opt === 'object' || typeof opt === 'undefined') {
        $container.data('MobileNav', new MobileNav($.extend({
          container: this
        }, opt)));
      } else if (typeof method === 'string' && instance) {
        if (typeof instance[method] === 'function') {
          args.shift();
          instance[method].apply(instance, args);
        }
      }
    });
  };
}(jQuery));
