const fs = require("fs");
const insertInLog = () => {
  let date = new Date();
  let message = `Object created at: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `;
  //   console.log(message);
  // add the log filr
  let currentLog = fs.readFileSync("./log.txt", "utf8");
  fs.writeFileSync("./log.txt", currentLog + message + "\n");
};

module.exports = { insertInLog };