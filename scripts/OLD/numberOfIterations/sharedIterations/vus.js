import http from 'k6/http';
import { group, sleep } from 'k6';

const BASE_URL = `http://${__ENV.HOST || 'localhost'}:8080/tools.descartes.teastore.webui`;

const groupResponseTimes = {};


export const options = {
    discardResponseBodies: true,
    scenarios: {
        lowVus: {
            executor: 'shared-iterations',
            vus: 10,
            iterations: 500,
            maxDuration: '60s',
        },
        mediumVus: {
            executor: 'shared-iterations',
            vus: 30,
            iterations: 500,
            maxDuration: '60s',
        },
        highVus: {
            executor: 'shared-iterations',
            vus: 60,
            iterations: 500,
            maxDuration: '60s',
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
