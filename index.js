const config = require('./package');
const tasks = Object.keys(config.scripts);

tasks.forEach((task, index) => {
  console.log(`${index+1}. npm ${task} - creates nlurls in resource-locator from a JSON file of nlurl payload \n`);
});