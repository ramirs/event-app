(function() {
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
  var preSelectCheck = function (e) {
    let check = false;
    app.userEvents.forEach(function(event) {
      if(event.id == e.id) {
        check = true;
      }
    });
    return check;
  };
  var keynoteFilter = function (data) {
    let obj = {};
    data.forEach(function(d) {
      if(!obj[d.type]) {
        obj[d.type] = [];
        obj[d.type].push(d);
      } else {
        obj[d.type].push(d);
      }
    });
    return obj;
  };
  var checkListItem = function (id) {
    eventFeed.forEach(function(ev) {
      if(ev.id == id) {
        ev.checked = true;
      }
    });
  };
  var uncheckListItem = function (id) {
    eventFeed.forEach(function(ev) {
      if(ev.id == id) {
        ev.checked = false;
      }
    });
  };

  var app = new Vue({
    el: '#app-container',
    data: {
      app: {
        message: 'hello world'
      },
      events: eventFeed.sort(startTimeSort),
      sortedEvents: keynoteFilter(eventFeed),
      initMsg: '',
      singleEvent: {},
      storageAvailable: false,
      singleToggle: false,
      listToggle: true,
      userListToggle: false,
      filterOverlay: false,
      filteredEventList: eventFeed.sort(startTimeSort),
      listSubtitle: 'Full Schedule'
    },
    methods: {
      showSingleEventView: function (el) {
        this.singleToggle = true;
        this.listToggle = preSelectCheck(el);
        this.singleEvent = el;
      },
      closeSingleEventView: function () {
        this.singleToggle = false;
      },
      saveEvent: function () {
        let uniqueEvent = true;
        this.userEvents.forEach(function (el, i){
          if(el.id === app.singleEvent.id) {
            uniqueEvent = false;
          }
        });
        if(uniqueEvent && app.storageAvailable) {
          checkListItem(this.singleEvent.id);
          this.userEvents.push(this.singleEvent);
          scheduleManager.setSchedule(this.userEvents);
          this.userEvents.sort(startTimeSort);
          this.closeSingleEventView();
        } else {
          console.log({err: 'Duplicate event error, user has already saved event'});
        }
      },
      deleteEvent: function (ev) {
        uncheckListItem(ev.id);
        this.closeSingleEventView();
        this.userEvents.forEach(function (el, i){
            if(el.id === ev.id) {
              app.userEvents.splice(i, 1);
            }
        });
        scheduleManager.setSchedule(this.userEvents);
      },
      toggleList: function(bool) {
        this.userListToggle = bool;
        this.closeSingleEventView();
      },
      toggleFilter: function () {
        this.filterOverlay = !this.filterOverlay;
      },
      filterBy: function (sel) {
        if(parseInt(sel) == 0) {
          this.filteredEventList = this.events;
          this.listSubtitle = 'Full Schedule';
        } else if (parseInt(sel) == 1) {
          this.filteredEventList = this.sortedEvents['Workshop'];
          this.listSubtitle = 'Workshops';
        } else if (parseInt(sel) == 2) {
          this.filteredEventList = this.sortedEvents['Keynote'];
          this.listSubtitle = 'Keynotes';
        } else if (parseInt(sel) == 3) {
          this.filteredEventList = this.sortedEvents['Talk'];
          this.listSubtitle = 'Presentations';
        } else if(parseInt(sel) == 4) {
          this.filteredEventList = this.sortedEvents['Hack'];
          this.listSubtitle = 'Hack Day Prep';
        } else if(parseInt(sel) == 5) {
         this.filteredEventList = this.userEvents;
         this.listSubtitle = 'Saved Events';
       }
        this.toggleFilter();
      }
    },
    filters: {
      timeFormat: function (val) {
        if(!val) {
          return '';
        } else {
          let hr = Math.floor(val/100); //gets first two ints
          let dayPart = 'am';
          if(hr>=12) {
            dayPart = 'pm';
          }
          return (hr%12 == 0 ? 12: hr%12) + ':' + val.toString().charAt(2) + val.toString().charAt(3) + ' ' + dayPart;
        }
      }
    }
  });

  app.userEvents = this.scheduleManager.getSchedule();

  if(app.userEvents.length == 0 && this.scheduleManager.storageAvailable) {
    app.initMsg = 'Your device can save events! Try adding events and they will appear here.';
  } else if(app.userEvents.length == 0 && this.scheduleManager.storageAvailable) {
    app.initMsg = 'Your device cannot save events... This list is only temporary :( sorry for the inconvenience';
  } else if (app.userEvents.length > 0) {
    app.userEvents.sort(startTimeSort);
    app.userEvents.forEach(function(ev) {
      checkListItem(ev.id);
      ev['checked'] = true;
    });
  }

  app.storageAvailable = this.scheduleManager.storageAvailable;

})();
