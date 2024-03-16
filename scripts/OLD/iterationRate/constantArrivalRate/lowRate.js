import http from 'k6/http';
import { group, sleep } from 'k6';

const BASE_URL = `http://${__ENV.HOST || 'localhost'}:8080/tools.descartes.teastore.webui`;

const groupResponseTimes = {};

export const options = {
    discardResponseBodies: true,
    scenarios: {
        lowRate: {
            executor: 'constant-arrival-rate',
            duration: '60s',
            rate: 20,
            timeUnit: '1s',
            preAllocatedVUs: 50,
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
        // Sleep time is 1000ms. Total iteration time is sleep + time to finish request.
        sleep(1);
    });
}