(function () {

  //refs
  var scrollHeader = document.getElementById('scroll-header');
  var scrollHeaderTitle = document.getElementById('scroll-header-title');
  var backLabel = document.getElementById('back-label');
  var eventFab = document.getElementById('event-fab');


  //event listener and actions
  document.getElementById('scroll-container').onscroll = function () {
    if(this.scrollTop >= 25) {
      backLabel.style.display = 'none';
    } else {
      backLabel.style.display = 'inline';
    }

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

  //init state
  scrollHeader.style.height = '200px';
  eventFab.style.display = 'none';

})();
