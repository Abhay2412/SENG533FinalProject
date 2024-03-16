import { group, sleep } from 'k6';

import http from 'k6/http';

const BASE_URL = `http://${__ENV.HOST || 'localhost'}:8080/tools.descartes.teastore.webui`;

const groupResponseTimes = {};

export const options = {
    stages: [
        { duration: '10s', target: 5 },
        { duration: '10s', target: 20 },
        { duration: '5m', target: 10 },
    ],
};


const loginActionPayload = {
    "referer": "http://10.1.9.58:8080/tools.descartes.teastore.webui/",
    "username": "user2",
    "password": "password",
    "signin": "Sign in"
}

// const formData = new FormData()

// for (const key in loginActionPayload) {
//     formData.append(key, loginActionPayload[key]);
// }

export default function () {

    group('TeaStore Login', () => {
        const start = new Date();
        http.get(`${BASE_URL}/login`);
        const end = new Date();
        const duration = end - start;
        groupResponseTimes['TeaStore Login'] = (groupResponseTimes['TeaStore Login'] || 0) + duration;
        // sleep(1); Instant
    });

    group('TeaStore Login User', () => {
        const start = new Date();


        http.post(`${BASE_URL}/loginAction`, loginActionPayload, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
        );

        const end = new Date();
        const duration = end - start;
        groupResponseTimes['TeaStore Login User'] = (groupResponseTimes['TeaStore Login User'] || 0) + duration;
        sleep(1);
    });

    // group('Black Tea Category Browse', () => {
    //     const start = new Date();
    //     http.get(`${BASE_URL}/category?category=2&page=1`);
    //     const end = new Date();
    //     const duration = end - start;
    //     groupResponseTimes['Black Tea Category Browse'] = (groupResponseTimes['Black Tea Category Browse'] || 0) + duration;
    //     sleep(1);
    // });

    // group('Earl Grey (loose) Tea Product View', () => {
    //     const start = new Date();
    //     http.get(`${BASE_URL}/product?id=7`);
    //     const end = new Date();
    //     const duration = end - start;
    //     groupResponseTimes['Earl Grey (loose) Tea Product View'] = (groupResponseTimes['Earl Grey (loose) Tea Product View'] || 0) + duration;
    //     sleep(1);
    // });

    // group('TeaStore View Cart', () => {
    //     const start = new Date();
    //     http.get(`${BASE_URL}/cart`);
    //     const end = new Date();
    //     const duration = end - start;
    //     groupResponseTimes['TeaStore View Cart'] = (groupResponseTimes['TeaStore View Cart'] || 0) + duration;
    //     sleep(1);
    // });

    // group('TeaStore Checkout', () => {
    //     const start = new Date();
    //     http.get(`${BASE_URL}/order`);
    //     const end = new Date();
    //     const duration = end - start;
    //     groupResponseTimes['TeaStore Checkout'] = (groupResponseTimes['TeaStore Checkout'] || 0) + duration;
    //     sleep(1);
    // });
}

export function handleSummary(data) {
    console.log("\nResponse times by group:");
    for (const groupName in groupResponseTimes) {
        console.log(`   ${groupName}: ${groupResponseTimes[groupName]} ms`);
    }
}
