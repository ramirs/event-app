(function () {

  document.getElementById('scroll-header').style.height = '200px';

  document.getElementById('scroll-container').onscroll = function () {
    if(200 - this.scrollTop >= 80) {
      document.getElementById('scroll-header').style.height = (200 - this.scrollTop) + 'px';
    }
  }

})();
