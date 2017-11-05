(function () {

  var appHead = document.getElementById('app-ui-header');
  var sixLogo = document.getElementById('br_logo');
  var appTitle = document.getElementById('app-title');
  document.getElementById('app-view-schedule').onscroll = function () {

    if(this.scrollTop <= 360) {
        appHead.style.height = (420 - this.scrollTop) + 'px';
        sixLogo.style.display = 'inline';
        appTitle.style.display = 'none';
    } else {
      appHead.style.height = 60 + 'px';
      sixLogo.style.display = 'none';
      appTitle.style.display = 'inline';
    }
  };

  sixLogo.style.display = 'inline';
  appTitle.style.display = 'none';

})();
