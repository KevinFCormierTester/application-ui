/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 * Copyright (c) 2020 Red Hat, Inc
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *******************************************************************************/

import {
  secondaryHeader,
  resourceReducerFunction,
  getItems,
  getItemsPerPage,
  getPage,
  getSearch,
  getSortColumn,
  getSortDirection,
  INITIAL_STATE
} from "../../../src-web/reducers/common";

import { QueryApplicationList } from "../components/TestingData";

describe("secondaryHeader creation", () => {
  it("should return a default state", () => {
    const action = {};
    const expectedValue = {
      title: "",
      tabs: [],
      breadcrumbItems: [],
      links: []
    };
    expect(secondaryHeader(undefined, action)).toEqual(expectedValue);
  });
  it("should return a state with title", () => {
    const state = {};
    const action = {
      title: "Clusters",
      tabs: "",
      breadcrumbItems: "",
      links: "",
      type: "SECONDARY_HEADER_UPDATE"
    };
    const expectedValue = {
      title: "Clusters",
      tabs: "",
      breadcrumbItems: "",
      links: ""
    };
    expect(secondaryHeader(state, action)).toEqual(expectedValue);
  });
});

describe("resourceReducerFunction", () => {
  it("should return the initial state", () => {
    const action = {
      type: "unit-test"
    };
    expect(resourceReducerFunction(undefined, action)).toEqual(INITIAL_STATE);
  });
  it("should return a state with IN_PROGRESS status", () => {
    const state = {
      test: "test",
      status: "INCEPTION"
    };
    const action = {
      status: "IN_PROGRESS",
      type: "RESOURCE_REQUEST"
    };
    const expectedValue = {
      test: "test",
      status: "IN_PROGRESS"
    };
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue);
  });
  it("should return a state with DONE status", () => {
    const state = {
      test: "test"
    };
    const action = {
      type: "RESOURCE_RECEIVE_SUCCESS",
      items: [],
      resourceVersion: 0
    };
    const expectedValue = {
      test: "test",
      status: "DONE",
      items: [],
      page: 1,
      resourceVersion: 0
    };
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue);
  });
  it("should return a state with ERROR status", () => {
    const state = {
      test: "test"
    };
    const action = {
      type: "RESOURCE_RECEIVE_FAILURE",
      err: "error"
    };
    const expectedValue = {
      test: "test",
      status: "ERROR",
      err: "error"
    };
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue);
  });
  it("should return a state with post:IN_PROGRESS status", () => {
    const state = {
      test: "test"
    };
    const action = {
      type: "POST_REQUEST"
    };
    const expectedValue = {
      test: "test",
      postStatus: "IN_PROGRESS"
    };
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue);
  });
  it("should return a state with post:DONE status", () => {
    const state = {
      test: "test",
      items: ["test"]
    };
    const action = {
      type: "POST_RECEIVE_SUCCESS",
      item: ["test1"]
    };
    const expectedValue = {
      test: "test",
      items: ["test", "test1"],
      postStatus: "DONE"
    };
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue);
  });
  it("should return a state with post:ERROR status", () => {
    const state = {
      test: "test"
    };
    const action = {
      type: "POST_RECEIVE_FAILURE",
      err: {
        error: {
          response: {
            status: 404
          },
          message: "error"
        }
      }
    };
    const expectedValue = {
      test: "test",
      postStatusCode: 404,
      postErrorMsg: "error",
      postStatus: "ERROR"
    };
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue);
  });
  it("should return a state with put:IN_PROGRESS status", () => {
    const state = {
      test: "test"
    };
    const action = {
      type: "PUT_REQUEST"
    };
    const expectedValue = {
      test: "test",
      putStatus: "IN_PROGRESS"
    };
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue);
  });
  it("should return a state with put:DONE status", () => {
    const state = {
      test: "test"
    };
    const action = {
      type: "PUT_RECEIVE_SUCCESS"
    };
    const expectedValue = {
      test: "test",
      putStatus: "DONE"
    };
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue);
  });
  it("should return a state with put:ERROR status", () => {
    const state = {
      test: "test"
    };
    const action = {
      type: "PUT_RECEIVE_FAILURE",
      err: {
        error: {
          message: "error"
        }
      }
    };
    const expectedValue = {
      test: "test",
      putErrorMsg: "error",
      putStatus: "ERROR"
    };
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue);
  });
  it("should return a state with clear action", () => {
    const state = {
      test: "test"
    };
    const action = {
      type: "CLEAR_REQUEST_STATUS"
    };
    const expectedValue = {
      test: "test",
      postStatus: undefined,
      postStatusCode: undefined,
      postErrorMsg: undefined,
      putStatus: undefined,
      putErrorMsg: undefined
    };
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue);
  });
  it("should return a state for table search action", () => {
    const state = {
      test: "test"
    };
    const action = {
      type: "TABLE_SEARCH",
      search: "search"
    };
    const expectedValue = {
      test: "test",
      search: "search",
      page: 1
    };
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue);
  });
  it("should return a state for table sort action", () => {
    const state = {
      test: "test"
    };
    const action = {
      type: "TABLE_SORT",
      sortDirection: "test",
      sortColumn: "test"
    };
    const expectedValue = {
      test: "test",
      sortDirection: "test",
      sortColumn: "test"
    };
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue);
  });
  it("should return a state for table page change action", () => {
    const state = {
      test: "test"
    };
    const action = {
      type: "TABLE_PAGE_CHANGE",
      page: 1,
      pageSize: 10
    };
    const expectedValue = {
      test: "test",
      page: 1,
      itemsPerPage: 10
    };
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue);
  });

  it("should return a state for resource delete action", () => {
    const state = {
      test: "test",
      items: ["test"]
    };
    const action = {
      type: "RESOURCE_DELETE"
    };
    const expectedValue = {
      test: "test",
      items: []
    };
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue);
  });
  it("should return a state for non-existing action", () => {
    const state = {
      test: "test"
    };
    const action = {
      type: "unit-test"
    };
    const expectedValue = {
      test: "test"
    };
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue);
  });
});

const state = { QueryApplicationList: QueryApplicationList };
const props = {
  storeRoot: "QueryApplicationList"
};

describe("getItems", () => {
  it("should return getItems for resource type", () => {
    const expectedValue = QueryApplicationList.items;
    expect(getItems(state, props, "items")).toEqual(expectedValue);
  });
});

describe("getItemsPerPage", () => {
  it("should return getItemsPerPage for resource type", () => {
    const expectedValue = 20;
    expect(getItemsPerPage(state, props, "itemsPerPage")).toEqual(
      expectedValue
    );
  });
});

describe("getPage", () => {
  it("should return getPage for resource type", () => {
    const expectedValue = 1;
    expect(getPage(state, props, "page")).toEqual(expectedValue);
  });
});

describe("getSearch", () => {
  it("should return getSearch for resource type", () => {
    const expectedValue = "aa";

    expect(getSearch(state, props, "search")).toEqual(expectedValue);
  });
});

describe("getSortColumn", () => {
  it("should return getSortColumn for resource type", () => {
    const expectedValue = "name";

    expect(getSortColumn(state, props, "sortColumn")).toEqual(expectedValue);
  });
});

describe("getSortDirection", () => {
  it("should return getSortDirection for resource type", () => {
    const expectedValue = "asc";

    expect(getSortDirection(state, props, "sortDirection")).toEqual(
      expectedValue
    );
  });
});
