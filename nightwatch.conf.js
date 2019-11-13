/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *******************************************************************************/
var fs = require("fs"),
  config = require("./config");

const argv = require("minimist")(process.argv.slice(2));

module.exports = (settings => {
  if (!fs.existsSync("node_modules/selenium-standalone/.selenium")) {
    console.log("Selenium server not installed.  Installing..."); // eslint-disable-line no-console
    const execSync = require("child_process").execSync;
    execSync("npm run test:install-selenium", { stdio: [0, 1, 2] });
  }

  if (argv.env === "phantom" || argv.env === "local")
    settings.selenium.start_process = true;

  var defaultUrl = `https://localhost:${config.get("httpPort")}`;
  settings.test_settings.default.launch_url = defaultUrl;
  settings.selenium.server_path += fs.readdirSync(
    "node_modules/selenium-standalone/.selenium/selenium-server/"
  );
  return settings;
})(require("./nightwatch.json"));
