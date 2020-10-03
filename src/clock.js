/* ecmaVersion:6 */

export class Clock {
  constructor(config) {
    this.config = config;
    this.name = 'clock';
    this.mode = config.clock_config.mode;
    this.maintime = config.clock_config.maintime;
  this.extratime  = config.clock_config.extratime;

    this.white = {
      name: config.white,
      maintime: this.maintime,
      extratime: this.extratime,
    };
    this.black = {
      name: config.black,
      maintime: this.maintime,
      extratime: this.extratime,
    };
    this.toplay = 'white';
    this.timer = null;
  
    // this.useConfig ();
    this.reset ();
  } // constructor

  // useConfig () {
  //   Object.assign (this.config, this);
  // }
  run () {
    if (['white', 'black'].indexOf (this.runstate) < 0) {
      if (this.timer) {
        clearTimeout (this.timer);
        this.timer = null;
      }
      return;
    }
    let times = this[this.toplay];
    if (this.mode === 'delay') {
      if (times.extratime > 0) {
        times.extratime -= 1;
      } else {
        times.maintime -= 1;
      }
    } else {
      times.maintime -= 1;
    }
    if (times.maintime <= 0) {
      this.runstate = 'pause';
    }
    clearTimeout (this.timer);
    this.timer = setTimeout (this.run, 1000);
  }

  reset () {
    ['white', 'black'].forEach (player => {
      ['maintime', 'extratime'].forEach (time => {
        this[player][time] = this[time];
      });
    });
    this.toplay = 'white';
    this.runstate = 'reset';
  }

  start (player) {
    player = player || this.toplay;
    console.log (`start(${player})`);
    if (player.maintime <= 0) {
      return;
    }
    if (this.mode === 'increment' && this.runstate !== 'reset') {
      // Don't add time to black on move 1
      let opponent = player === 'white' ? 'black' : 'white';
      this[opponent].maintime += this.opponent.extratime;
    }
    this.runstate = player;
    this.toplay = player;
    if (this.mode === 'delay') {
      this[player].extratime = this.extratime;
    } else if (this.mode === '') this.run ();
  }
  pause () {
    this.runstate = 'pause';
  }
  newGame () {
    this.reset ();
  }
}


/* Move these functions to Clock.vue 
    onFormOk: function (evt) {
      this.mode = this.form.mode;
      this.extratime = this.form.extratime;
      this.reset ();
    },
    onFormCancel: function (evt) {
      this.reset ();
    },
    settingsSummary: function (mode, maintime, extratime) {
      let str = `${capitalise (mode)}: ${formatTime (maintime)}`;
      if (mode != 'standard') {
        str = `${str} + ${extratime} s`;
      }
      return str;
    },
    timeClass: function (player) {
      if (this.white.maintime === 0 || this.black.maintime === 0) {
        return 'text-secondary';
      }
      return this[player].maintime > 10 ? 'text-dark' : 'text-danger';
    },

  },
  filters: {
    time_display: function (txt) {
      return formatTime (txt);
    },
  },
  created () {
    console.log ('created()');
    this.reset ();
  },
  computed: {
    extratime_label: function () {
      if (this.form.mode === 'standard') {
        return null;
      } else {
        return capitalise (this.form.mode) + ' (s)';
      }
    },

    clock_settings_popover: function () {
      let content = `[${capitalise (this.mode)} ${formatTime (this.maintime)}`;
      if (this.mode !== 'standard') {
        content += '+' + this.extratime + 's';
      }
      content += ']';
      return {
        title: 'Clock settings',
        content: content,
      };
    },
    maintime: function () {
      let form_t = this.form.maintime;
      return 3600 * form_t.h + 60 * form_t.m + form_t.s;
    },
});

function formatTime (sec) {
  let [hours, mins, secs] = split_time (sec);
  let str = '';
  if (hours > 0) {
    str += hours + ':';
  }
  str += ('00' + mins).slice (-2) + '.';
  str += ('00' + secs).slice (-2);
  return str;
}

function split_time (sec) {
  let hours = Math.trunc (sec / 3600);
  let mins = Math.trunc ((sec - 3600 * hours) / 60);
  let secs = Math.trunc (sec - 3600 * hours - 60 * mins);
  return [hours, mins, secs];
}

function capitalise (str) {
  return str.charAt (0).toUpperCase () + str.slice (1);
}
*/
