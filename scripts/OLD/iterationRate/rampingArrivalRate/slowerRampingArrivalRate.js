import http from 'k6/http';
import { group, sleep } from 'k6';

const BASE_URL = `http://${__ENV.HOST || 'localhost'}:8080/tools.descartes.teastore.webui`;

const groupResponseTimes = {};

export const options = {
    discardResponseBodies: true,
    scenarios: {
        fastRampingArrivalRate: {
            executor: 'ramping-arrival-rate',

            // Start `startRate` iterations per second
            timeUnit: '1m',

            // Pre-allocate necessary VUs.
            preAllocatedVUs: 100,

            stages: [

                { target: 20, duration: '1min' },

                { target: 50, duration: '1min' },

                { target: 100, duration: '1min' },

                { target: 200, duration: '2min' },

                { target: 50, duration: '2min' },

                { target: 50, duration: '30s' },
            ],
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