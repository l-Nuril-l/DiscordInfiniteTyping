function startTypingInterval(channelId) {
  var intervalId = setInterval(() => {
    fetch(`https://discord.com/api/v9/channels/${channelId}/typing`, {
      headers: {
        authorization: (webpackChunkdiscord_app.push([[''], {}, e => { m = []; for (let c in e.c) m.push(e.c[c]) }]), m).find(m => m?.exports?.default?.getToken !== void 0).exports.default.getToken()
      },
      method: "POST",
      credentials: "include"
    });
  }, 8000);

  let obj = targets.find((x) => x.channelId === channelId);
  if (!targets.some((x) => x.channelId === channelId)) {
    targets.push({ intervalId, channelId });
  } else {
    obj.intervalId = intervalId;
  }
}

var targets = [];
var qActive = false;

document.addEventListener("keydown", (event) => {
  let channelId = window.location.href.split("/").pop();
  if (event.key === "+") {
    startTypingInterval(channelId);
    qActive = true;
    console.log("Typing started");
  } else if (event.key === "-") {
    targets.forEach((x) => clearInterval(x.intervalId));
    qActive = false;
    console.log("Paused");
  } else if (event.key === "/") {
    let index = targets.findIndex((x) => x.channelId === channelId);
    if (index !== -1) {
      if (qActive === true) clearInterval(targets[index].intervalId);
      targets.splice(index, 1);
      console.log("Typing stopped in " + channelId + "!");
    }
  } else if (event.key === "*") {
    console.log("Status: " + qActive);
    console.log("Targets: ", targets);
  }
});
