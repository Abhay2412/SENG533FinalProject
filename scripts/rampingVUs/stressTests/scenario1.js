
import http from 'k6/http';
import { group, sleep } from 'k6';

const BASE_URL = `http://${__ENV.HOST || 'localhost'}:8080/tools.descartes.teastore.webui`;

const groupResponseTimes = {};


//Stress
export const options = {
    discardResponseBodies: true,
    scenarios: {
      blackTeaBrowse: {
        executor: 'ramping-vus',
        startVUs: 0,
        stages: [
          { duration: '20s', target: 10 },
          { duration: '30s', target: 50 },
          { duration: '30s', target: 75 },
          { duration: '30s', target: 100 },
        ],
        gracefulRampDown: '0s',
      },
    },
  };

export default function () {
    group('TeaStore Homepage', () => {
        getTeaStoreHomepage();
    });
    group('TeaStore Login', () => {
        getLogin();
    });

    group('TeaStore Login Action', () => {
        const loginActionPayload = {
            "referer": `${BASE_URL}/`,
            "username": "user",
            "password": "password",
            "signin": "Sign in",
        };

        postLoginAction(loginActionPayload);
    });

    group('TeaStore Login', () => {
        getLogin();
    });

    group('TeaStore Login Action', () => {
        const loginActionPayload = {
            "referer": `${BASE_URL}/`,
            "username": "user2",
            "password": "password",
            "signin": "Sign in",
        };

        postLoginAction(loginActionPayload);
    });
    group('TeaStore Homepage', () => {
        getTeaStoreHomepage();
    });
    group('TeaStore Herbal Tea Browse', () => {
        getTeaStoreProductBrowse("4");
    });
    group('TeaStore Rooibos Tea Browse', () => {
        getTeaStoreProductBrowse("5");
    });
    group('TeaStore White Tea Browse', () => {
        getTeaStoreProductBrowse("6");
    });
    group('TeaStore View Profile', () => {
        const start = new Date();
        http.get(`${BASE_URL}/profile`);
        const end = new Date();
        const duration = end - start;
        groupResponseTimes['TeaStore View Profile'] = (groupResponseTimes['TeaStore View Profile'] || 0) + duration;
        sleep(1);
    });
    group('TeaStore Login Action', () => {
        const loginActionPayload = {
            "logout": "",
        };

        postLoginAction(loginActionPayload);
    });
    group('TeaStore Homepage', () => {
        getTeaStoreHomepage();
    });
}

export function handleSummary() {
    console.log("\nResponse times by group:");
    for (const groupName in groupResponseTimes) {
        console.log(`   ${groupName}: ${groupResponseTimes[groupName]} ms`);
    }
}


// ! Helper Functions for the Login Action
const getTeaStoreHomepage = () => {
    const start = new Date();
    http.get(`${BASE_URL}/`);
    const end = new Date();
    const duration = end - start;
    groupResponseTimes['TeaStore Homepage'] = (groupResponseTimes['TeaStore Homepage'] || 0) + duration;
}

const postLoginAction = (payload) => {
    const start = new Date();

    http.post(`${BASE_URL}/loginAction`, payload, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
    );

    const end = new Date();
    const duration = end - start;
    groupResponseTimes['TeaStore CRUD Login'] = (groupResponseTimes['TeaStore CRUD Login'] || 0) + duration;
    // sleep(1); Instant
}

const getLogin = () => {
    const start = new Date();
    http.get(`${BASE_URL}/login`);
    const end = new Date();
    const duration = end - start;
    groupResponseTimes['TeaStore Login'] = (groupResponseTimes['TeaStore Login'] || 0) + duration;
    sleep(1);
}

const getTeaStoreProductBrowse = (categoryNumber) => {
    const start = new Date();
    http.get(`${BASE_URL}/category?category=${categoryNumber}&page=1`);
    const end = new Date();
    const duration = end - start;
    groupResponseTimes['TeaStore Product Browse'] = (groupResponseTimes['TeaStore Product Browse'] || 0) + duration;
    sleep(1);
}