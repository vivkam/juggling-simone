simone = {
  init : function () {
    simone.random = new Random();
    simone.juggling = {};
    simone.settings = {};
    simone.elements = simone.getElements();
    simone.elements.trigger.click(simone.toggle);
    simone.elements.clear.click(simone.clear);
    $('.integer').keydown(simone.enforceInteger);
    simone.populateSettings();
  },
  getElements : function () {
    return {
      trigger : $('#trigger'),
      output : $('#output'),
      clear : $('#clear'),
      items : $('#items'),
      delay : $('#delay'),
      minInterval : $('#minInterval'),
      maxInterval : $('#maxInterval')
    };
  },
  getSettings : function () {
    return {
      items : simone.elements.items.val(),
      delay : simone.elements.delay.val(),
      minInterval : simone.elements.minInterval.val(),
      maxInterval : simone.elements.maxInterval.val()
    };
  },
  populateSettings : function () {
    var settings = localStorage.settings ? JSON.parse(localStorage.settings) : {
      items : [ 'randomize' , 'these' , 'things'],
      delay : 3,
      minInterval : 5,
      maxInterval : 8
    };
    settings.items.forEach(function (item) {
      simone.elements.items.tagsinput('add', item);
    });
    simone.elements.delay.val(settings.delay);
    simone.elements.minInterval.val(settings.minInterval);
    simone.elements.maxInterval.val(settings.maxInterval);
  }, 
  toggle : function () {
    if (simone.elements.trigger.html() === 'Start') {
      simone.start();
    } else {
      simone.stop();
    }
  },
  start : function () {
    if (!simone.validate()) {
      return;
    }
    simone.elements.trigger.html('Stop');
    simone.elements.trigger.addClass('btn-danger');
    simone.elements.trigger.removeClass('btn-success');
    simone.elements.clear.addClass('hidden');
    simone.settings = simone.getSettings();
    simone.loadAudio(simone.settings.items);
    simone.write('start juggling');
    simone.juggling.timeout = setTimeout(function () {
      simone.juggling.startTime = new Date();
      simone.juggle();
    }, simone.settings.delay * 1000);
    localStorage.settings = JSON.stringify(simone.settings);
  },
  stop : function () {
    clearTimeout(simone.juggling.timeout);
    simone.elements.trigger.html('Start');
    simone.elements.trigger.addClass('btn-success');
    simone.elements.trigger.removeClass('btn-danger');
    simone.elements.clear.removeClass('hidden');
    simone.write('stop juggling' + (simone.juggling.startTime ? ' (' + (new Date() - simone.juggling.startTime) / 1000 + 's total)' : ''));
    simone.juggling = {};
  },
  juggle : function () {
    var item, interval;
    if (simone.elements.trigger.html() === 'Stop') {
      item = simone.getItem();
      interval = simone.getInterval();
      simone.write('- ' + item + ' (' + interval + 's)');
      simone.playItem(item);
      simone.juggling.timeout = setTimeout(simone.juggle, interval * 1000);
    }      
  },
  getInterval : function () {
    return simone.random.integer(simone.settings.minInterval, simone.settings.maxInterval);
  },
  getItem : function () {
    if ($.isEmptyObject(simone.juggling.items)) {
      simone.juggling.items = simone.settings.items.slice(0);
      simone.random.shuffle(simone.juggling.items);
    }
    var items = simone.juggling.items
      , item = items.pop();
    if (item === simone.juggling.lastItem) {
      items.push(item);
      item = items.shift();
    }
    simone.juggling.lastItem = item;
    return item;
  },
  playItem : function (item) {
    $('audio[item="' + item + '"]')[0].play();
  },
  loadAudio : function (items) {
    var audioDiv = $('#audio');
    items.forEach(function (item) {
      if ($('audio[item="' + item + '"]').length === 0) {
        audioDiv.append('<audio item="' + item + '" src="http://translate.google.com/translate_tts?tl=en&q=' + item + '" preload="auto">');
      }
    });
  },
  enforceInteger : function (e) {
    if (e.keyCode == 8 || e.keyCode == 9) {
      return;
    } else if (e.shiftKey || e.keyCode < 48 || (e.keyCode > 57 && e.keyCode < 96) || e.keyCode > 105 ) {
      e.preventDefault();
    }
  },
  validate : function () {
    var settings = simone.getSettings()
      , valid = true;
    for (var key in settings) {
      if ($.isEmptyObject(settings[key])) {
        $('span[for="' + key + '"]').html('please enter a value');
        valid = false;
      } else {
        $('span[for="' + key + '"]').html('');
      }
    }
    if (parseInt(settings.minInterval, 10) > parseInt(settings.maxInterval, 10)) {
      $('span[for="minInterval"]').html('min cannot be greater than max');
      valid = false;
    }
    return valid;
  },
  clear : function () {
    simone.elements.output.html('');
  },
  write : function (text) {
    simone.elements.output.append(text + '<br>');
    simone.elements.output.scrollTop(simone.elements.output.prop('scrollHeight'));
  }
};

$('document').ready(function () {
  simone.init();
});
