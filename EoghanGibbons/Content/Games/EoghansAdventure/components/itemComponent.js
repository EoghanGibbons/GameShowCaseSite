ProjBel.ItemComponent = function (command) {
    'use strict';
    this.command = command;
    return this;
};

ProjBel.ItemComponent.prototype = {
  use : function (actor) {
      'use strict';
      this.command.execute();
  }
};
