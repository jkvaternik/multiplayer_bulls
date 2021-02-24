import { Socket } from "phoenix";

let socket = new Socket(
  "/socket",
  { params: { token: "" } }
);

socket.connect()

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("game:1", {});

let state = {
  user: [],
  bulls: [],
  guesses: [],
  gameOver: '',
  message: null
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

export function ch_login(name) {
  channel.push("login", {name: name})
    .receive("ok", state_update)
    .receive("error", resp => {
      console.log("Unable to push", resp)
    });
}

export function ch_push(guess) {
  channel.push("guess", guess)
    .receive("ok", state_update)
    .receive("error", resp => {
      console.log("Unable to push", resp)
    });
}

export function ch_ready(userName) {
  channel.push("ready", userName)
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
