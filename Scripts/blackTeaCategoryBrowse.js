// import http from "k6/http";

// export const options = {
//   scenarios: {
//     shared_iter_scenario: {
//       executor: "shared-iterations",
//       vus: 10,
//       iterations: 100,
//       startTime: "0s",
//     },
//     per_vu_scenario: {
//       executor: "per-vu-iterations",
//       vus: 10,
//       iterations: 10,
//       startTime: "10s",
//     },
//   },
// };

// const BASE_URL = `http://${'10.1.9.58' || 'localhost'}:8080/tools.descartes.teastore.webui`;

// export default function () {
// //   http.get("https://test.k6.io/");
//   http.get(`${BASE_URL}/category?category=2&page=1`);
// }

import http from 'k6/http';
import { sleep } from 'k6';

const BASE_URL = `http://${'10.1.9.58' || 'localhost'}:8080/tools.descartes.teastore.webui`;

export const options = {
  discardResponseBodies: true,
  scenarios: {
    blackTeaBrowse: {
      executor: 'ramping-arrival-rate',
      startRate: 50,
      timeUnit: '1s',
      preAllocatedVUs: 50,
      maxVUs: 100,
      stages: [
        { duration: '1m', target: 100 },
        { duration: '3m', target: 200 },
        { duration: '2m', target: 300 },
      ],
      startTime: '10s',
      gracefulRampDown: '20s',
    },
  },
};

export default function () {
  group('Black Tea Category Browse', () => {
    const start = new Date();
    http.get(`${BASE_URL}/category?category=2&page=1`);
    const end = new Date();
    const duration = end - start;
    groupResponseTimes['Black Tea Category Browse'] = (groupResponseTimes['Black Tea Category Browse'] || 0) + duration;
    sleep(1);
  });
}
