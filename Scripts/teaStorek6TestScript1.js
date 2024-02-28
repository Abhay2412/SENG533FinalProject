import { group, sleep } from 'k6';

import http from 'k6/http';

export const options = {
    stages: [
        { duration: '10s', target: 5 },
        { duration: '10s', target: 20 },
        { duration: '5m', target: 10 },
    ],
};

const AHAD_IP = '10.1.9.58'
const ABHAY_IP = '10.1.10.50'
const MUSH_IP = ''
const PARBIR_IP = ''

export default function () {
    const BASE_URL = `http://${ABHAY_IP}:8080/tools.descartes.teastore.webui`;

    group('TeaStore Homepage Browse', () => {
        http.get(`${BASE_URL}/`);
        sleep(1);
    });

    group('TeaStore Login User', () => {
        http.get(`${BASE_URL}/login`);
        sleep(1);
    });

    group('Black Tea Category Browse', () => {
        http.get(`${BASE_URL}/category?category=2&page=1`);
        sleep(1);
    });

    group('Earl Grey (loose) Tea Product View', () => {
        http.get(`${BASE_URL}/product?id=7`);
        sleep(1);
    });

    group('TeaStore ViewCart', () => {
        http.get(`${BASE_URL}/cart`);
        sleep(1);
    });

    group('TeaStore Checkout', () => {
        http.get(`${BASE_URL}/order`);
        sleep(1);
    });
}