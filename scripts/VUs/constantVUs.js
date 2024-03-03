
import http from 'k6/http';
import { group, sleep } from 'k6';

const BASE_URL = `http://10.1.10.210:8080/tools.descartes.teastore.webui`;

const groupResponseTimes = {};

export const options = {
  discardResponseBodies: true,
  scenarios: {
    blackTeaBrowse: {
        executor: 'constant-vus',
        vus: 100,
        duration: '30s',
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