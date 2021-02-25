import { Socket } from "phoenix";

let socket = new Socket(
  "/socket",
  { params: { token: "" } }
);

socket.connect()

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("game:lobby", {});

let state = {
    gameReady: null,
    users: [],
    bulls: [],
    guesses: [],
    gameOver: null,
    message: null,
};

let callback = null;

function state_update(st) {
  console.log("New State", st)
  state = st;
  if (callback) {
    callback(st);
  }
}

export function ch_join(cb) {
  callback = cb;
  callback(state)
}

export function ch_login(user, gameName) {
  channel = socket.channel(`game:${gameName}`)
  channel.join()
    .receive("ok", state_update)
    .receive("error", resp => {
      console.log("Unable to join", resp)
    })
  channel.push("login", user)
    .receive("ok", state_update)
    .receive("error", resp => {
      console.log("Unable to push", resp)
    });
}

export function ch_push(guess) {
  console.log(channel)
  channel.push("guess", guess)
    .receive("ok", state_update)
    .receive("error", resp => {
      console.log("Unable to push", resp)
    });
}

export function ch_ready(username) {
  channel.push("ready", username)
  .receive("ok", state_update)
  .receive("error", resp => {
    console.log("Unable to push", resp)
  });
}

export function ch_player(username, player) {
  console.log("Name: " + username)
  console.log("Player: " + player)
  channel.push("player", {name: username, player: player})
  .receive("ok", state_update)
  .receive("error", resp => {
    console.log("Unable to push", resp)
  });
}

export function ch_reset() {
  channel.push("reset", {})
    .receive("ok", state_update)
    .receive("error", resp => {
      console.log("Unable to push", resp)
    });
}

channel.join()
  .receive("ok", state_update)
  .receive("error", resp => {
    console.log("Unable to join", resp)
  })

channel.on("view", state_update);

export default socket
