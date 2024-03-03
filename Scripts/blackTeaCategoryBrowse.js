import http from "k6/http";

export const options = {
  scenarios: {
    shared_iter_scenario: {
      executor: "shared-iterations",
      vus: 10,
      iterations: 100,
      startTime: "0s",
    },
    per_vu_scenario: {
      executor: "per-vu-iterations",
      vus: 10,
      iterations: 10,
      startTime: "10s",
    },
  },
};

const BASE_URL = `http://${'10.1.9.58' || 'localhost'}:8080/tools.descartes.teastore.webui`;

export default function () {
//   http.get("https://test.k6.io/");
  http.get(`${BASE_URL}/category?category=2&page=1`);
}
