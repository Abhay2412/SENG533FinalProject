import http from 'k6/http';
import { group, sleep } from 'k6';

const BASE_URL = `http://${__ENV.HOST || 'localhost'}:8080/tools.descartes.teastore.webui`;

const groupResponseTimes = {};

export const options = {
    discardResponseBodies: true,
    scenarios: {
        scenario1: {
            executor: 'constant-arrival-rate',
            duration: '60s',
            rate: 100,
            timeUnit: '1s',
            preAllocatedVUs: 100,
        },
        // scenario2: {
        //     executor: 'constant-arrival-rate',
        //     duration: '30s',
        //     rate: 100,
        //     timeUnit: '1s',
        //     preAllocatedVUs: 1,
        // },
        // scenario3: {
        //     executor: 'constant-arrival-rate',
        //     duration: '30s',
        //     rate: 50,
        //     timeUnit: '1s',
        //     preAllocatedVUs: 1,
        // },
        // scenario4: {
        //     executor: 'constant-arrival-rate',
        //     duration: '30s',
        //     rate: 30,
        //     timeUnit: '1s',
        //     preAllocatedVUs: 1,
        // },
        // scenario5: {
        //     executor: 'constant-arrival-rate',
        //     duration: '120s',
        //     rate: 5,
        //     timeUnit: '1s',
        //     preAllocatedVUs: 1,
        // },
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