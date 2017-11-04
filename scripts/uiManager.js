(function () {

  //refs
  var scrollHeader = document.getElementById('scroll-header');
  var scrollHeaderTitle = document.getElementById('scroll-header-title');
  var eventFab = document.getElementById('event-fab');

  //event listener and actions
  document.getElementById('scroll-container').onscroll = function () {

    if(200 - this.scrollTop >= 80) {
      scrollHeader.style.height = (200 - this.scrollTop) + 'px';
    } else if (this.scrollTop >= 120) {
      scrollHeader.style.height = 80 + 'px';
    }

    if(this.scrollTop <= 120) {
      scrollHeaderTitle.style.paddingTop = 80 - (this.scrollTop / 3) + 'px';
      scrollHeaderTitle.style.fontSize = 1.0 - (this.scrollTop / 300) + 'em';
    } else if (this.scrollTop > 120){
      scrollHeaderTitle.style.paddingTop = 30 + 'px';
      scrollHeaderTitle.style.fontSize = '0.6em';
    }

    if(this.scrollTop >= 285) {
      eventFab.style.display = 'inline';
    } else {
      eventFab.style.display = 'none';
    }

  }

  var appTitle = document.getElementById('app-title');
  var titleDisplay = document.getElementById('title-display');
  var titleTimer;
  document.getElementById('app-view-schedule').onscroll = function () {
    appTitle.style.height = '65px';
    titleDisplay.style.display = 'none';
    clearTimeout(titleTimer);
    titleTimer = setTimeout(function() {
      titleDisplay.style.display = 'inline';
      appTitle.style.height = '90px';
    }, 750);

  }

  //init state
  scrollHeader.style.height = '200px';
  eventFab.style.display = 'none';

})();
