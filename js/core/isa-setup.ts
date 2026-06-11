(function () {
  "use strict";
  window.ISAFront.registerApp({
    ns: "CONV",
    api: {
      local: "http://localhost:8785",
      online: "https://conversations.jeffaporta.workers.dev",
      lsKey: "conversations:local",
      event: "conversations:target",
    },
    theme: { lsKey: "conversations:theme" },
    widgets: { targetStyle: "switch" },
    loginGate: "inline",
  });
})();
