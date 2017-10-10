function LocalScheduleManager() {
  this.storage = {};
  this.storageAvailable = false;

  if(window.localStorage) {
    //everything works as expected
    this.storage = window.localStorage;
    this.storageAvailable = true;
  } else {
    //simulate storage, won't persist data
    this.storage['six-disrupt-localEvents'] = [];
  }
}

LocalScheduleManager.prototype.getSchedule = function () {
  let savedEvents;
  let storageData = this.storage['six-disrupt-localEvents'];

  if(typeof storageData !== 'undefined') {
    savedEvents = JSON.parse(storageData);
  } else {
    savedEvents = [];
  }

  return savedEvents;
};

LocalScheduleManager.prototype.setSchedule = function (list) {
  this.storage['six-disrupt-localEvents'] = JSON.stringify(list);
};

LocalScheduleManager.prototype.showSchedule = function () {
  console.log(JSON.parse(this.storage['six-disrupt-localEvents']));
};
