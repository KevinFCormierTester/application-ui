/** *****************************************************************************
 * Licensed Materials - Property of Red Hat, Inc.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

import {
  getTimeWindowType,
  validateTimewindow,
  validateCreation,
  passTimeWindowType
} from "../../views/application";
const { wizards } = JSON.parse(Cypress.env("TEST_CONFIG"));

describe("Application", () => {
  for (const type in wizards) {
    const { name, enable } = wizards[type];
    if (enable) {
      it(`timewindow - should be validated - ${type}: ${name}`, () => {
        const timeWindowType = getTimeWindowType(name);
        const timeWindowData = passTimeWindowType(timeWindowType)
          .timeWindowData;
        validateTimewindow(name, timeWindowType, timeWindowData);
      });
    } else {
      it(`disable validation on resource ${type}`, () => {
        cy.log(`skipping ${type} - ${name}`);
      });
    }
  }
});