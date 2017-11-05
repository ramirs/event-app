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

})();
