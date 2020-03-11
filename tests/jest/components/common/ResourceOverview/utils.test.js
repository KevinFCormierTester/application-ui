/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017, 2019. All Rights Reserved.
 *  Copyright (c) 2020 Red Hat, Inc
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *******************************************************************************/

import {
  getChannelsList,
  getNumClustersForApp,
  getNumDeployables,
  getNumDeployments,
  getNumCompletedDeployments,
  getNumInProgressDeployments,
  getNumFailedDeployments,
  getNumPolicyViolations,
  getPoliciesLinkForOneApplication,
  getResourceChannels,
  getSearchLinkForAllApplications,
  getSearchLinkForAllChannels,
  getSearchLinkForAllClusters,
  getSearchLinkForAllPlacementRules,
  getSearchLinkForAllSubscriptions,
  getSearchLinkForOneApplication
} from "../../../../../src-web/components/common/ResourceOverview/utils";

const query_data1 = {
  name: "val",
  namespace: "default",
  _uid: "local-cluster/e04141c7-4377-11ea-a84e-00000a100f99",
  dashboard:
    "localhost/grafana/dashboard/db/val-dashboard-via-federated-prometheus?namespace=default",
  created: "2020-01-30T15:47:53Z",
  remoteSubscriptionStatusCount: {
    Subscribed: 4,
    Failed: 5,
    null: 3
  },
  podStatusCount: {
    Running: 4,
    Error: 5,
    ImagePullBackOff: 3,
    ContainerCreating: 6,
    Ready: 8
  },
  clusterCount: 4,
  hubSubscriptions: [
    {
      _uid: "local-cluster/66426f24-3bd3-11ea-a488-00000a100f99",
      status: "Propagated",
      channel: "dev1/dev1"
    },
    {
      _uid: "local-cluster/bdced01f-3bd4-11ea-a488-00000a100f99",
      status: null,
      channel: "dev1/dev1"
    },
    {
      _uid: "local-cluster/b218636d-3d5e-11ea-8ed1-00000a100f99",
      status: "Propagated",
      channel: "default/mortgage-channel"
    }
  ]
};

const query_data2 = {
  name: "appdemo-gbapp",
  namespace: "ibmcom"
};

const data1 = {
  name: "appdemo-gbapp",
  namespace: "ibmcom",
  selfLink:
    "/apis/app.k8s.io/v1beta1/namespaces/ibmcom/applications/appdemo-gbapp",
  _uid: "",
  created: "2019-08-10T12:14:24Z",
  apigroup: "app.k8s.io",
  cluster: "local-cluster",
  kind: "application",
  label: "release=appdemo; app=gbapp; chart=gbapp-0.1.0; heritage=Tiller",
  _hubClusterResource: "true",
  _rbac: "ibmcom_app.k8s.io_applications",
  related: [
    {
      kind: "release",
      count: 5,
      items: [
        {
          name: "appdemo",
          status: "Deployed"
        },
        {
          name: "appdemo2",
          status: "PENDING"
        },
        {
          name: "appdemo3",
          status: "In Progress"
        },
        {
          name: "appdemo4",
          status: "FAILED"
        },
        {
          name: "appdemo5",
          status: "CreationError"
        }
      ],
      __typename: "SearchRelatedResult"
    },
    {
      kind: "deployable",
      count: 2,
      items: [
        {
          name: "appdemo"
        },
        {
          name: "appdemo2"
        }
      ]
    },
    {
      kind: "placementbinding",
      count: 1,
      items: [
        {
          name: "appdemo"
        }
      ]
    },
    {
      kind: "subscription",
      count: 1,
      items: [
        {
          name: "appdemo"
        }
      ]
    },
    {
      kind: "cluster",
      count: 1,
      items: [
        {
          name: "appdemo"
        },
        {
          name: "local-cluster"
        }
      ]
    },
    {
      kind: "vulnerabilitypolicy",
      items: [
        {
          kind: "vulnerabilitypolicy",
          name: "policy-vulnerabilitypolicy-example",
          vulnerableResources: 2
        },
        {
          kind: "vulnerabilitypolicy",
          name: "va-policy-release-check",
          vulnerableResources: 2
        },
        {
          kind: "vulnerabilitypolicy",
          name: "policy-f8-example",
          vulnerableResources: 2
        }
      ]
    },
    {
      kind: "mutationpolicy",
      items: [
        {
          kind: "mutationpolicy",
          name: "policy-mutationpolicy-example",
          vulnerableResources: 2
        },
        {
          kind: "mutationpolicy",
          name: "va-policy-release-check",
          vulnerableResources: 2
        }
      ]
    }
  ],
  remoteSubs: [
    {
      kind: "subscription",
      name: "appdemo1",
      status: "Subscribed"
    },
    {
      kind: "subscription",
      name: "appdemo2",
      status: "Failed"
    },
    {
      kind: "subscription",
      name: "appdemo3",
      status: null
    },
    {
      kind: "subscription",
      name: "appdemo4",
      status: ""
    },
    {
      kind: "subscription",
      name: "appdemo5"
    }
  ]
};

const data2 = {
  name: "appdemo-gbapp",
  namespace: "ibmcom",
  selfLink:
    "/apis/app.k8s.io/v1beta1/namespaces/ibmcom/applications/appdemo-gbapp",
  _uid: "",
  created: "2019-08-10T12:14:24Z",
  apigroup: "app.k8s.io",
  cluster: "local-cluster",
  kind: "application",
  label: "release=appdemo; app=gbapp; chart=gbapp-0.1.0; heritage=Tiller",
  _hubClusterResource: "true",
  _rbac: "ibmcom_app.k8s.io_applications",
  related: []
};

describe("getChannelsList", () => {
  const channelList = [
    {
      items: [
        {
          metadata: {
            name: "name1",
            pending: 1,
            inprogress: 2,
            failed: 3
          }
        },
        {
          metadata: {
            name: "name3",
            pending: 1,
            failed: 2
          }
        }
      ]
    }
  ];
  const channelDud = {
    itteemmss: [{ channel: [{}, {}] }, { deployables: [{}] }]
  };
  it("should return channel list to be displayed in cards on overview tab", () => {
    const result = [
      {
        counts: {
          completed: { total: 0 },
          inProgress: { total: 0 },
          failed: { total: 0 }
        },
        name: ""
      }
    ];
    expect(getChannelsList(channelList)).toEqual(result);
  });
  it("should return blank array", () => {
    expect(getChannelsList(channelDud)).toEqual([]);
  });
});

describe("getNumClustersForApp", () => {
  it("should return cluster count", () => {
    const result = 4;
    expect(getNumClustersForApp(query_data1)).toEqual(result);
  });
  it("should return 0 if related is empty", () => {
    expect(getNumClustersForApp(query_data2)).toEqual(0);
  });
});

describe("getNumDeployables", () => {
  it("should return deployable count", () => {
    const result = 2;
    expect(getNumDeployables(data1)).toEqual(result);
  });
  it("should return 0 if related is empty", () => {
    expect(getNumDeployables(data2)).toEqual(0);
  });
});

describe("getNumDeployments", () => {
  it("should return deployment count", () => {
    const result = 5;
    expect(getNumDeployments(data1)).toEqual(result);
  });
  it("should return 0 if related is empty", () => {
    expect(getNumDeployments(data2)).toEqual(0);
  });
});

describe("getNumCompletedDeployments", () => {
  it("should return completed deployment count", () => {
    const result = 1;
    expect(getNumCompletedDeployments(data1)).toEqual(result);
  });
  it("should return 0 if related is empty", () => {
    expect(getNumCompletedDeployments(data2)).toEqual(0);
  });
});

describe("getNumInProgressDeployments", () => {
  it("should return in progress deployment count", () => {
    const result = 2;
    expect(getNumInProgressDeployments(data1)).toEqual(result);
  });
  it("should return 0 if related is empty", () => {
    expect(getNumInProgressDeployments(data2)).toEqual(0);
  });
});

describe("getNumFailedDeployments", () => {
  it("should return failed deployment count", () => {
    const result = 2;
    expect(getNumFailedDeployments(data1)).toEqual(result);
  });
  it("should return 0 if related is empty", () => {
    expect(getNumFailedDeployments(data2)).toEqual(0);
  });
});

describe("getResourceChannels", () => {
  it("should return list of channels", () => {
    const result = ["chn-gb/gbchn", "chn-gb/gbchn2", "chn-gb/gbchn"];
    expect(getResourceChannels(realDataSampleWithSubscriptions)).toEqual(
      result
    );
  });
  it("should return a blank list of channels because of no subscrition", () => {
    const result = [];
    expect(getResourceChannels(realDataSampleWithNOSubscriptions)).toEqual(
      result
    );
  });
  it("should handle undefined object", () => {
    expect(getResourceChannels(undefined)).toEqual([]);
  });
});

describe("getNumPolicyViolations", () => {
  it("should return policy violations count", () => {
    expect(getNumPolicyViolations(query_data1)).toEqual(0);
  });
  it("should return zero for no violations", () => {
    expect(getNumPolicyViolations(query_data1)).toEqual(0);
  });
  it("should handle undefined object", () => {
    expect(getNumPolicyViolations(undefined)).toEqual(0);
  });
});

describe("getPoliciesLinkForOneApplication", () => {
  it("should return link to policies for one application", () => {
    const appName = "test-app";
    const result = `/multicloud/policies/all?card=false&filters=%7B"textsearch"%3A%5B"${appName}"%5D%7D&index=2`;
    expect(getPoliciesLinkForOneApplication({ name: appName })).toEqual(result);
  });
  it("should return empty string if name param is empty", () => {
    expect(getPoliciesLinkForOneApplication()).toEqual("");
  });
});

describe("getSearchLinkForOneApplication", () => {
  const appName = "test-app";
  it("should return general search link for one application", () => {
    const result = `/multicloud/search?filters={"textsearch":"kind%3Aapplication%20name%3A${appName}"}`;
    expect(
      getSearchLinkForOneApplication({
        name: appName
      })
    ).toEqual(result);
  });
  it("should return cluster related search link for one application", () => {
    const related = "cluster";
    const result = `/multicloud/search?filters={"textsearch":"kind%3Aapplication%20name%3A${appName}"}&showrelated=${related}`;
    expect(
      getSearchLinkForOneApplication({
        name: appName,
        showRelated: related
      })
    ).toEqual(result);
  });
  it("should return empty string if name param is empty", () => {
    expect(getSearchLinkForOneApplication()).toEqual("");
  });
});

describe("getSearchLinkForAllApplications", () => {
  it("should return search link for all application", () => {
    const result =
      '/multicloud/search?filters={"textsearch":"kind%3Aapplication"}';
    expect(getSearchLinkForAllApplications()).toEqual(result);
  });
});

describe("getSearchLinkForAllSubscriptions", () => {
  it("should return search link for all subscriptions", () => {
    const result =
      '/multicloud/search?filters={"textsearch":"kind%3Asubscription%20status%3APropagated"}';
    expect(getSearchLinkForAllSubscriptions()).toEqual(result);
  });
});

describe("getSearchLinkForAllClusters", () => {
  it("should return search link for all clusters", () => {
    const result = '/multicloud/search?filters={"textsearch":"kind%3Acluster"}';
    expect(getSearchLinkForAllClusters()).toEqual(result);
  });
});

describe("getSearchLinkForAllChannels", () => {
  it("should return search link for all channels", () => {
    const result = '/multicloud/search?filters={"textsearch":"kind%3Achannel"}';
    expect(getSearchLinkForAllChannels()).toEqual(result);
  });
});

describe("getSearchLinkForAllPlacementRules", () => {
  it("should return search link for all placement rules", () => {
    const result =
      '/multicloud/search?filters={"textsearch":"kind%3Aplacementrule"}';
    expect(getSearchLinkForAllPlacementRules()).toEqual(result);
  });
});

// Yes yes this is a huge chunk of data ... but hey nothing like real world data :)
const realDataSampleWithSubscriptions = {
  name: "apptest-gbapp",
  namespace: "project-workspace",
  dashboard: "",
  selfLink:
    "/apis/app.k8s.io/v1beta1/namespaces/project-workspace/applications/apptest-gbapp",
  _uid: "",
  created: "2019-08-11T02:55:06Z",
  apigroup: "app.k8s.io",
  cluster: "local-cluster",
  kind: "application",
  label: "app=gbapp; chart=gbapp-0.1.0; heritage=Tiller; release=apptest",
  _hubClusterResource: "true",
  _rbac: "project-workspace_app.k8s.io_applications",
  related: [
    {
      kind: "release",
      count: 1,
      items: [
        {
          cluster: "local-cluster",
          chartName: "gbapp",
          chartVersion: "0.1.0",
          status: "DEPLOYED",
          kind: "release",
          name: "apptest",
          namespace: "PICKME",
          _rbac: "project-workspace_null_releases",
          _uid: "local-cluster/Release/apptest",
          _hubClusterResource: "true",
          revision: 1,
          updated: "2019-08-11T02:55:05Z"
        }
      ],
      __typename: "SearchRelatedResult"
    },
    {
      kind: "cluster",
      count: 1,
      items: [
        {
          apigroup: "clusterregistry.k8s.io",
          created: "2019-08-14T15:49:33Z",
          consoleURL: "https://9.30.230.96:8443",
          cpu: 40,
          selfLink:
            "/apis/clusterregistry.k8s.io/v1alpha1/namespaces/local-cluster/clusters/local-cluster",
          storage: "2296Gi",
          status: "OK",
          kubernetesVersion: "v1.13.5+icp-ee",
          kind: "cluster",
          klusterletVersion: "3.2.0-10+94ee790ac3208b",
          memory: "96327Mi",
          name: "local-cluster",
          namespace: "local-cluster",
          nodes: 5,
          _rbac: "local-cluster_clusterregistry.k8s.io_clusters",
          _uid: "1c7e2439-beab-11e9-bbb3-d659679b8eb9"
        }
      ],
      __typename: "SearchRelatedResult"
    },
    {
      kind: "deployable",
      count: 6,
      items: [
        {
          apigroup: "app.ibm.com",
          created: "2019-08-06T20:50:55Z",
          cluster: "local-cluster",
          selfLink:
            "/apis/app.ibm.com/v1alpha1/namespaces/chn-gb/deployables/gbchn-gbchn-redismasterservice",
          status: "Deployed",
          kind: "deployable",
          name: "PICKME",
          namespace: "chn-gb",
          _rbac: "chn-gb_app.ibm.com_deployables",
          _uid: "local-cluster/e2fd5a6a-b88b-11e9-82a0-00163e019f14",
          _hubClusterResource: "true",
          label: "app=gbchn; chart=gbchn-0.1.0; heritage=Tiller; release=gbchn"
        }
      ],
      __typename: "SearchRelatedResult"
    },
    {
      kind: "pod",
      count: 6,
      items: [
        {
          created: "2019-08-14T00:27:14Z",
          container: "gbchn",
          cluster: "search-squad-remote",
          selfLink:
            "/api/v1/namespaces/default/pods/gbchn-gbchn-redisslave-6bfbf95955-mnph5",
          status: "Pending",
          kind: "pod",
          name: "gbchn-gbchn-redisslave-6bfbf95955-mnph5",
          namespace: "PICKME",
          _rbac: "search-squad-remote_null_pods",
          _uid: "search-squad-remote/439ba0d5-be2a-11e9-833e-eeeeeeeeeeee",
          _clusterNamespace: "search-squad-remote",
          label:
            "tier=backend; app=gbchn; pod-template-hash=6bfbf95955; release=gbchn; role=slave",
          restarts: 0,
          image: "gcr.io/google_samples/gb-redisslave:v3"
        },
        {
          created: "2019-08-14T00:27:14Z",
          container: "redis",
          cluster: "search-squad-remote",
          selfLink:
            "/api/v1/namespaces/default/pods/gbchn-gbchn-redismaster-6d78d7969b-kmpwm",
          status: "Pending",
          kind: "pod",
          name: "gbchn-gbchn-redismaster-6d78d7969b-kmpwm",
          namespace: "default",
          _rbac: "search-squad-remote_null_pods",
          _uid: "search-squad-remote/4383c417-be2a-11e9-833e-eeeeeeeeeeee",
          _clusterNamespace: "search-squad-remote",
          label:
            "tier=backend; app=gbchn; pod-template-hash=6d78d7969b; release=gbchn; role=master",
          restarts: 0,
          image: "gcr.io/kubernetes-e2e-test-images/redis:1.0"
        }
      ],
      __typename: "SearchRelatedResult"
    },
    {
      kind: "service",
      count: 6,
      items: [
        {
          created: "2019-08-14T00:27:13Z",
          cluster: "search-squad-remote",
          clusterIP: "10.0.72.53",
          selfLink: "/api/v1/namespaces/default/services/gbchn-gbchn",
          kind: "service",
          name: "gbchn-gbchn",
          namespace: "PICKME",
          _rbac: "search-squad-remote_null_services",
          _uid: "search-squad-remote/4319d66a-be2a-11e9-833e-eeeeeeeeeeee",
          _hostingSubscription: "default/apptest-gbapp-guestbook",
          _hostingDeployable: "chn-gb/gbchn-gbchn-service",
          _clusterNamespace: "search-squad-remote",
          label: "release=gbchn; app=gbchn; chart=gbchn-0.1.0; heritage=Tiller",
          port: "80:30603/TCP",
          type: "NodePort"
        }
      ],
      __typename: "SearchRelatedResult"
    },
    {
      kind: "replicaset",
      count: 6,
      items: [
        {
          apigroup: "apps",
          created: "2019-08-14T00:27:14Z",
          cluster: "search-squad-remote",
          current: 1,
          selfLink:
            "/apis/apps/v1/namespaces/default/replicasets/gbchn-gbchn-redisslave-6bfbf95955",
          kind: "replicaset",
          name: "gbchn-gbchn-redisslave-6bfbf95955",
          namespace: "default",
          _rbac: "search-squad-remote_apps_replicasets",
          _uid: "search-squad-remote/4399a7dd-be2a-11e9-833e-eeeeeeeeeeee",
          _hostingSubscription: "default/apptest-gbapp-guestbook",
          _hostingDeployable: "chn-gb/gbchn-gbchn-redisslave",
          _clusterNamespace: "search-squad-remote",
          label:
            "pod-template-hash=6bfbf95955; release=gbchn; role=slave; tier=backend; app=gbchn",
          desired: 1
        }
      ],
      __typename: "SearchRelatedResult"
    },
    {
      kind: "deployment",
      count: 6,
      items: [
        {
          apigroup: "apps",
          available: 0,
          created: "2019-08-14T00:27:14Z",
          cluster: "search-squad-remote",
          current: 1,
          selfLink:
            "/apis/apps/v1/namespaces/default/deployments/gbchn-gbchn-redisslave",
          kind: "deployment",
          name: "gbchn-gbchn-redisslave",
          namespace: "PICKME",
          _rbac: "search-squad-remote_apps_deployments",
          _uid: "search-squad-remote/43983ef0-be2a-11e9-833e-eeeeeeeeeeee",
          _hostingSubscription: "default/apptest-gbapp-guestbook",
          _hostingDeployable: "chn-gb/gbchn-gbchn-redisslave",
          _clusterNamespace: "search-squad-remote",
          label: "release=gbchn; app=gbchn; chart=gbchn-0.1.0; heritage=Tiller",
          desired: 1,
          ready: 0
        }
      ],
      __typename: "SearchRelatedResult"
    },
    {
      kind: "subscription",
      count: 2,
      items: [
        {
          created: "2019-08-11T03:20:42Z",
          cluster: "local-cluster",
          channel: "chn-gb/gbchn",
          selfLink:
            "/apis/app.ibm.com/v1alpha1/namespaces/default/subscriptions/apptest-gbapp-guestbook",
          kind: "subscription",
          name: "apptest-gbapp-guestbook",
          namespace: "PICKME",
          _rbac: "default_null_subscriptions",
          _uid: "local-cluster/003b9d4c-bbe7-11e9-82a0-00163e019f14",
          _hubClusterResource: "true",
          _hostingSubscription: "project-workspace/apptest-gbapp-guestbook",
          _hostingDeployable:
            "local-cluster/apptest-gbapp-guestbook-deployable-6gh2v",
          label:
            "chart=gbapp-0.1.0; heritage=Tiller; hosting-deployable-name=apptest-gbapp-guestbook-deployable; release=apptest; app=gbapp"
        },
        {
          created: "2019-08-11T03:20:42Z",
          cluster: "local-cluster",
          channel: "chn-gb/gbchn2",
          selfLink:
            "/apis/app.ibm.com/v1alpha1/namespaces/default/subscriptions/apptest-gbapp-guestbook",
          kind: "subscription",
          name: "apptest-gbapp-guestbook",
          namespace: "PICKME",
          _rbac: "default_null_subscriptions",
          _uid: "local-cluster/003b9d4c-bbe7-11e9-82a0-00163e019f14",
          _hubClusterResource: "true",
          _hostingSubscription: "project-workspace/apptest-gbapp-guestbook",
          _hostingDeployable:
            "local-cluster/apptest-gbapp-guestbook-deployable-6gh2v",
          label:
            "chart=gbapp-0.1.0; heritage=Tiller; hosting-deployable-name=apptest-gbapp-guestbook-deployable; release=apptest; app=gbapp"
        },
        {
          created: "2019-08-11T02:55:06Z",
          cluster: "local-cluster",
          channel: "chn-gb/gbchn",
          selfLink:
            "/apis/app.ibm.com/v1alpha1/namespaces/project-workspace/subscriptions/apptest-gbapp-guestbook",
          kind: "subscription",
          name: "apptest-gbapp-guestbook",
          namespace: "project-workspace",
          _rbac: "project-workspace_null_subscriptions",
          _uid: "local-cluster/6c563052-bbe3-11e9-82a0-00163e019f14",
          _hubClusterResource: "true",
          label:
            "chart=gbapp-0.1.0; heritage=Tiller; release=apptest; app=gbapp"
        }
      ],
      __typename: "SearchRelatedResult"
    }
  ]
};

const realDataSampleWithNOSubscriptions = {
  name: "apptest-gbapp",
  namespace: "project-workspace",
  dashboard: "",
  selfLink:
    "/apis/app.k8s.io/v1beta1/namespaces/project-workspace/applications/apptest-gbapp",
  _uid: "",
  created: "2019-08-11T02:55:06Z",
  apigroup: "app.k8s.io",
  cluster: "local-cluster",
  kind: "application",
  label: "app=gbapp; chart=gbapp-0.1.0; heritage=Tiller; release=apptest",
  _hubClusterResource: "true",
  _rbac: "project-workspace_app.k8s.io_applications",
  related: [
    {
      kind: "release",
      count: 1,
      items: [
        {
          cluster: "local-cluster",
          chartName: "gbapp",
          chartVersion: "0.1.0",
          status: "DEPLOYED",
          kind: "release",
          name: "apptest",
          namespace: "project-workspace",
          _rbac: "project-workspace_null_releases",
          _uid: "local-cluster/Release/apptest",
          _hubClusterResource: "true",
          revision: 1,
          updated: "2019-08-11T02:55:05Z"
        }
      ],
      __typename: "SearchRelatedResult"
    },
    {
      kind: "cluster",
      count: 1,
      items: [
        {
          apigroup: "clusterregistry.k8s.io",
          created: "2019-08-14T15:49:33Z",
          consoleURL: "https://9.30.230.96:8443",
          cpu: 40,
          selfLink:
            "/apis/clusterregistry.k8s.io/v1alpha1/namespaces/local-cluster/clusters/local-cluster",
          storage: "2296Gi",
          status: "OK",
          kubernetesVersion: "v1.13.5+icp-ee",
          kind: "cluster",
          klusterletVersion: "3.2.0-10+94ee790ac3208b",
          memory: "96327Mi",
          name: "local-cluster",
          namespace: "local-cluster",
          nodes: 5,
          _rbac: "local-cluster_clusterregistry.k8s.io_clusters",
          _uid: "1c7e2439-beab-11e9-bbb3-d659679b8eb9"
        }
      ],
      __typename: "SearchRelatedResult"
    },
    {
      kind: "deployable",
      count: 6,
      items: [
        {
          apigroup: "app.ibm.com",
          created: "2019-08-06T20:50:55Z",
          cluster: "local-cluster",
          selfLink:
            "/apis/app.ibm.com/v1alpha1/namespaces/chn-gb/deployables/gbchn-gbchn-redismasterservice",
          status: "Deployed",
          kind: "deployable",
          name: "PICKME",
          namespace: "chn-gb",
          _rbac: "chn-gb_app.ibm.com_deployables",
          _uid: "local-cluster/e2fd5a6a-b88b-11e9-82a0-00163e019f14",
          _hubClusterResource: "true",
          label: "app=gbchn; chart=gbchn-0.1.0; heritage=Tiller; release=gbchn"
        }
      ],
      __typename: "SearchRelatedResult"
    },
    {
      kind: "pod",
      count: 6,
      items: [
        {
          created: "2019-08-14T00:27:14Z",
          container: "gbchn",
          cluster: "search-squad-remote",
          selfLink:
            "/api/v1/namespaces/default/pods/gbchn-gbchn-redisslave-6bfbf95955-mnph5",
          status: "Pending",
          kind: "pod",
          name: "gbchn-gbchn-redisslave-6bfbf95955-mnph5",
          namespace: "PICKME",
          _rbac: "search-squad-remote_null_pods",
          _uid: "search-squad-remote/439ba0d5-be2a-11e9-833e-eeeeeeeeeeee",
          _clusterNamespace: "search-squad-remote",
          label:
            "tier=backend; app=gbchn; pod-template-hash=6bfbf95955; release=gbchn; role=slave",
          restarts: 0,
          image: "gcr.io/google_samples/gb-redisslave:v3"
        },
        {
          created: "2019-08-14T00:27:14Z",
          container: "redis",
          cluster: "search-squad-remote",
          selfLink:
            "/api/v1/namespaces/default/pods/gbchn-gbchn-redismaster-6d78d7969b-kmpwm",
          status: "Pending",
          kind: "pod",
          name: "gbchn-gbchn-redismaster-6d78d7969b-kmpwm",
          namespace: "default",
          _rbac: "search-squad-remote_null_pods",
          _uid: "search-squad-remote/4383c417-be2a-11e9-833e-eeeeeeeeeeee",
          _clusterNamespace: "search-squad-remote",
          label:
            "tier=backend; app=gbchn; pod-template-hash=6d78d7969b; release=gbchn; role=master",
          restarts: 0,
          image: "gcr.io/kubernetes-e2e-test-images/redis:1.0"
        }
      ],
      __typename: "SearchRelatedResult"
    },
    {
      kind: "service",
      count: 6,
      items: [
        {
          created: "2019-08-14T00:27:13Z",
          cluster: "search-squad-remote",
          clusterIP: "10.0.72.53",
          selfLink: "/api/v1/namespaces/default/services/gbchn-gbchn",
          kind: "service",
          name: "gbchn-gbchn",
          namespace: "default",
          _rbac: "search-squad-remote_null_services",
          _uid: "search-squad-remote/4319d66a-be2a-11e9-833e-eeeeeeeeeeee",
          _hostingSubscription: "default/apptest-gbapp-guestbook",
          _hostingDeployable: "chn-gb/gbchn-gbchn-service",
          _clusterNamespace: "search-squad-remote",
          label: "release=gbchn; app=gbchn; chart=gbchn-0.1.0; heritage=Tiller",
          port: "80:30603/TCP",
          type: "NodePort"
        }
      ],
      __typename: "SearchRelatedResult"
    },
    {
      kind: "replicaset",
      count: 6,
      items: [
        {
          apigroup: "apps",
          created: "2019-08-14T00:27:14Z",
          cluster: "search-squad-remote",
          current: 1,
          selfLink:
            "/apis/apps/v1/namespaces/default/replicasets/gbchn-gbchn-redisslave-6bfbf95955",
          kind: "replicaset",
          name: "gbchn-gbchn-redisslave-6bfbf95955",
          namespace: "default",
          _rbac: "search-squad-remote_apps_replicasets",
          _uid: "search-squad-remote/4399a7dd-be2a-11e9-833e-eeeeeeeeeeee",
          _hostingSubscription: "default/apptest-gbapp-guestbook",
          _hostingDeployable: "chn-gb/gbchn-gbchn-redisslave",
          _clusterNamespace: "search-squad-remote",
          label:
            "pod-template-hash=6bfbf95955; release=gbchn; role=slave; tier=backend; app=gbchn",
          desired: 1
        }
      ],
      __typename: "SearchRelatedResult"
    },
    {
      kind: "deployment",
      count: 6,
      items: [
        {
          apigroup: "apps",
          available: 0,
          created: "2019-08-14T00:27:14Z",
          cluster: "search-squad-remote",
          current: 1,
          selfLink:
            "/apis/apps/v1/namespaces/default/deployments/gbchn-gbchn-redisslave",
          kind: "deployment",
          name: "gbchn-gbchn-redisslave",
          namespace: "default",
          _rbac: "search-squad-remote_apps_deployments",
          _uid: "search-squad-remote/43983ef0-be2a-11e9-833e-eeeeeeeeeeee",
          _hostingSubscription: "default/apptest-gbapp-guestbook",
          _hostingDeployable: "chn-gb/gbchn-gbchn-redisslave",
          _clusterNamespace: "search-squad-remote",
          label: "release=gbchn; app=gbchn; chart=gbchn-0.1.0; heritage=Tiller",
          desired: 1,
          ready: 0
        }
      ],
      __typename: "SearchRelatedResult"
    }
  ]
};