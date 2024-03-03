import { group, sleep } from 'k6';

import http from 'k6/http';

const groupResponseTimes = {};

export const options = {
    stages: [
        { duration: '10s', target: 5 },
        { duration: '10s', target: 20 },
        { duration: '5m', target: 10 },
    ],
};

const AHAD_IP = '10.1.9.58'
const ABHAY_IP = '10.1.10.50'
const MUSH_IP = '10.1.3.222'
const PARBIR_IP = '10.1.10.210'

export default function () {
    const BASE_URL = `http://${ABHAY_IP}:8080/tools.descartes.teastore.webui`;

    group('TeaStore Homepage Browse', () => {
        const start = new Date();
        http.get(`${BASE_URL}/`);
        const end = new Date();
        const duration = end - start;
        groupResponseTimes['TeaStore Homepage Browse'] = (groupResponseTimes['TeaStore Homepage Browse'] || 0) + duration;
        sleep(1);
    });

    group('TeaStore Login User', () => {
        const start = new Date();
        http.get(`${BASE_URL}/login`);
        const end = new Date();
        const duration = end - start;
        groupResponseTimes['TeaStore Login User'] = (groupResponseTimes['TeaStore Login User'] || 0) + duration;
        sleep(1);   
    });

    group('Black Tea Category Browse', () => {
        const start = new Date();
        http.get(`${BASE_URL}/category?category=2&page=1`);
        const end = new Date();
        const duration = end - start;
        groupResponseTimes['Black Tea Category Browse'] = (groupResponseTimes['Black Tea Category Browse'] || 0) + duration;
        sleep(1);
    });

    group('Earl Grey (loose) Tea Product View', () => {
        const start = new Date();
        http.get(`${BASE_URL}/product?id=7`);
        const end = new Date();
        const duration = end - start;
        groupResponseTimes['Earl Grey (loose) Tea Product View'] = (groupResponseTimes['Earl Grey (loose) Tea Product View'] || 0) + duration;
        sleep(1);
    });

    group('TeaStore View Cart', () => {
        const start = new Date();
        http.get(`${BASE_URL}/cart`);
        const end = new Date();
        const duration = end - start;
        groupResponseTimes['TeaStore View Cart'] = (groupResponseTimes['TeaStore View Cart'] || 0) + duration;
        sleep(1);
    });

    group('TeaStore Checkout', () => {
        const start = new Date();
        http.get(`${BASE_URL}/order`);
        const end = new Date();
        const duration = end - start;
        groupResponseTimes['TeaStore Checkout'] = (groupResponseTimes['TeaStore Checkout'] || 0) + duration;
        sleep(1);
    });
}

export function handleSummary(data) {
    console.log("\nResponse times by group:");
    for (const groupName in groupResponseTimes) {
        console.log(`   ${groupName}: ${groupResponseTimes[groupName]} ms`);
    }
}
