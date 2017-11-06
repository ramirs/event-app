(function () {

  var appHeadMini = document.getElementById('app-ui-header-mini');
  document.getElementById('app-view-schedule').onscroll = function () {
    if(this.scrollTop <= 360) {
        appHeadMini.style.display = 'none';
    } else {
      appHeadMini.style.display = 'inline';
    }
  };
  appHeadMini.style.display = 'none';

  var swapSvgForPngID = function (tag, fallback) {
    document.getElementById(tag).src = fallback;
  };
  var swapSvgForPngClass = function (tag, fallback) {
    let arr = document.getElementsByClassName(tag);
    for(let i = 0; i < arr.length; i++) {
      arr[i].src = fallback;
    }
  };

  if(!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")) {
    //if browser doesn't support svg implementation...
    swapSvgForPngID('ic_add', 'assets/fallback/ic_add.png');
    swapSvgForPngClass('ic_checkmark', 'assets/fallback/ic_checkmark.png');
    swapSvgForPngClass('ic_clock', 'assets/fallback/ic_clock.png');
    swapSvgForPngID('ic_close', 'assets/fallback/ic_close.png');
    swapSvgForPngID('ic_events', 'assets/fallback/ic_events.png');
    swapSvgForPngID('ic_hack', 'assets/fallback/ic_hack.png');
    swapSvgForPngID('ic_home', 'assets/fallback/ic_home.png');
    swapSvgForPngID('ic_keynote', 'assets/fallback/ic_keynote.png');
    swapSvgForPngID('ic_menu', 'assets/fallback/ic_menu.png');
    swapSvgForPngID('ic_preso', 'assets/fallback/ic_preso.png');
    swapSvgForPngID('ic_remove', 'assets/fallback/ic_remove.png');
    swapSvgForPngID('ic_workshop', 'assets/fallback/ic_workshop.png');
  } else {
    //use this area for testing fallback
  }

})();
