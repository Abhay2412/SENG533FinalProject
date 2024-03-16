
import http from 'k6/http';
import { group, sleep } from 'k6';

const BASE_URL = `http://${__ENV.HOST || 'localhost'}:8080/tools.descartes.teastore.webui`;

const groupResponseTimes = {};

//Spikes
export const options = {
  discardResponseBodies: true,
  scenarios: {
    blackTeaBrowse: {
        executor: 'ramping-vus',
        startVUs: 0,
        stages: [
        { duration: '30s', target: 25 },
        { duration: '30s', target: 100 },
        { duration: '1m', target: 100 },
        { duration: '30s', target: 0 },
        ],
        gracefulRampDown: '0s',
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