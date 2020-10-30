/*******************************************************************************
 * Copyright (c) 2020 Red Hat, Inc.
 *******************************************************************************/

const config = JSON.parse(Cypress.env("TEST_CONFIG"));
import { createApplication } from "../../views/application";
import { getManagedClusterName } from "../../views/resources";

describe("Application Creation Test", () => {
  it(`get the name of the managed OCP cluster`, () => {
    getManagedClusterName();
  });
  for (const type in config) {
    const data = config[type].data;

    if (data.enable) {
      it(`Verify application can be created from resource type ${type} using template editor`, () => {
        const clusterName = Cypress.env("managedCluster");
        createApplication(clusterName, data, type);
      });
    } else {
      it(`disable creation on resource ${type}`, () => {
        cy.log(`skipping wizard: ${type} - ${data.name}`);
      });
    }
  }
});
