(function() {
  //TODO
  //email notifications(?)
  //app state (loading, waiting messages, etc.)
  // transitions for schedule and singe elements (click triggers)

  this.scheduleManager = new LocalScheduleManager();

  var startTimeSort = function(a, b) {
    if(a.start < b.start) {
      return -1;
    }
    if(a.start > b.start) {
      return 1;
    }

    return 0;
  };

  var app = new Vue({
    el: '#app-container',
    data: {
      app: {
        message: 'hello world'
      },
      events: eventFeed.sort(startTimeSort),
      initMsg: '',
      userEvents: [],
      singleEvent: {},
      singleToggle: false,
      listToggle: true
    },
    methods: {
      showSingleEventView: function (el) {
        this.singleToggle = true;
        this.singleEvent = el;
      },
      closeSingleEventView: function () {
        this.singleToggle = false;
      },
      saveEvent: function () {
        let uniqueEvent = true;
        this.userEvents.forEach((el) => {
          if(el.id === this.singleEvent.id) {
            uniqueEvent = false;
          }
        });

        if(uniqueEvent) {
          this.userEvents.push(this.singleEvent);
          scheduleManager.setSchedule(this.userEvents);
          this.userEvents.sort(startTimeSort);
          this.closeSingleEventView();
        } else {
          console.log('youve already saved this event! :)');
        }
      },
      deleteEvent: function (ev) {
        this.closeSingleEventView();
        this.userEvents.forEach((el, i) => {
            if(el.id === ev.id) {
              this.userEvents.splice(i, 1);
            }
        });
        scheduleManager.setSchedule(this.userEvents);
      },
      toggleList: function(bool) {
        this.listToggle = bool;
        this.closeSingleEventView();
      }
    }
  });

  //IF localStorage, grab storage and map to userEvents
  // ELSE notify user they won't be able to save events :(
  app.userEvents = this.scheduleManager.getSchedule();
  // this.scheduleManager.showSchedule();

  if(app.userEvents.length == 0 && this.scheduleManager.storageAvailable) {
    app.initMsg = 'Your device can save events! Try adding events and they will appear here.';
  } else if(app.userEvents.length == 0 && this.scheduleManager.storageAvailable) {
    app.initMsg = 'Your device cannot save events... This list is only temporary :( sorry for the inconvenience';
  } else if (app.userEvents.length > 0){
    app.userEvents.sort(startTimeSort);
  }

})();
