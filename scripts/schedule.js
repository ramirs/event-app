function LocalScheduleManager() {
  this.storage = {};
  this.storageAvailable = false;
  if(this.checkLocalStorage()) {
    this.storageAvailable = true;
  } else {
    this.storage = {};
    this.storage['six-disrupt-localEvents'] = [];
  }
}

LocalScheduleManager.prototype.checkLocalStorage = function () {
  try {
    this.storage = window.localStorage;
    this.storage.setItem('testkey1230', '1');
    this.storage.removeItem('testkey1230');
    return true;
  } catch (error) {
    return false;
  }
};

LocalScheduleManager.prototype.getSchedule = function () {
  let savedEvents;
  let storageData = this.storage['six-disrupt-localEvents'];
  console.log(this.storage);

  if(typeof storageData !== 'undefined' && storageData.length > 0) {
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
