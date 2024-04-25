
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

        const loginActionPayload = {
            "referer": `${BASE_URL}/`,
            "username": "user2",
            "password": "password",
            "signin": "Sign in"
        };

        http.post(`${BASE_URL}/loginAction`, loginActionPayload, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
        );

        const end = new Date();
        const duration = end - start;
        groupResponseTimes['TeaStore Login User'] = (groupResponseTimes['TeaStore Login User'] || 0) + duration;
        // sleep(1); Instant
    });

    group('TeaStore Homepage', () => {
        const start = new Date();
        http.get(`${BASE_URL}/`);
        const end = new Date();
        const duration = end - start;
        groupResponseTimes['TeaStore Homepage'] = (groupResponseTimes['TeaStore Homepage'] || 0) + duration;
        sleep(1);
    });

    group('TeaStore Black Tea Page', () => {
        const start = new Date();
        http.get(`${BASE_URL}/category?category=2&page=1`);
        const end = new Date();
        const duration = end - start;
        groupResponseTimes['TeaStore Black Tea Page'] = (groupResponseTimes['TeaStore Black Tea Page'] || 0) + duration;
        sleep(1);
    });

    group('TeaStore Green Tea Page', () => {
        const start = new Date();
        http.get(`${BASE_URL}/category?category=3&page=1`);
        const end = new Date();
        const duration = end - start;
        groupResponseTimes['TeaStore Green Tea Page'] = (groupResponseTimes['TeaStore Green Tea Page'] || 0) + duration;
        sleep(1);
    });

    group('TeaStore Add to Cart', () => {
        const cartActionPayload = {
            "productid": 107,
            "addToCart": "Add to Cart"
        };

        postCartAction(cartActionPayload);
    });

    group('TeaStore Cart', () => {
        getCart();
    });

    group('TeaStore Black Tea Page', () => {
        const start = new Date();
        http.get(`${BASE_URL}/category?category=2&page=1`);
        const end = new Date();
        const duration = end - start;
        groupResponseTimes['TeaStore Black Tea Page'] = (groupResponseTimes['TeaStore Black Tea Page'] || 0) + duration;
        sleep(1);
    });

    group('TeaStore Add to Cart', () => {
        const cartActionPayload = {
            "productid": 7,
            "addToCart": "Add to Cart"
        };

        postCartAction(cartActionPayload);
    });

    group('TeaStore Cart', () => {
        getCart();
    });

    group('TeaStore Update Cart', () => {
        const updateCartActionPayload = {
            "productid": 107,
            "orderitem_107": 1,
            "productid": 7,
            "orderitem_7": 2,
            "updateCartQuantities": "Update Cart"
        };

        postCartAction(updateCartActionPayload);
    });

    group('TeaStore Cart', () => {
        getCart();
    });

    group('TeaStore Remove Cart', () => {
        const removeCartActionPayload = {
            "productid": 107,
            "orderitem_107": 1,
            "removeProduct_107": "",
            "productid": 7,
            "orderitem_7": 2
        };

        postCartAction(removeCartActionPayload);
    });

    group('TeaStore Cart', () => {
        getCart();
    });

    group('TeaStore Payment', () => {
        const paymentActionPayload = {
            "firstname": "Jon",
            "lastname": "Snow",
            "address1": "Winterfell",
            "address2": "11111 The North, Westeros",
            "cardtype": "volvo",
            "cardnumber": "314159265359",
            "expirydate": "12/2025",
            "confirm": "Confirm"
        };

        postCartAction(paymentActionPayload);
    });


    group('TeaStore Order', () => {
        const start = new Date();
        http.get(`${BASE_URL}/order`);
        const end = new Date();
        const duration = end - start;
        groupResponseTimes['TeaStore Order'] = (groupResponseTimes['TeaStore Order'] || 0) + duration;
        sleep(1);
    });

    group('TeaStore Proceed to Checkout', () => {
        const checkoutActionPayload = {
            "productid": 7,
            "orderitem_7": 2,
            "proceedtoCheckout": "Proceed to Checkout"
        };

        postCartAction(checkoutActionPayload);
    });


    group('TeaStore Homepage', () => {
        const start = new Date();
        http.get(`${BASE_URL}/`);
        const end = new Date();
        const duration = end - start;
        groupResponseTimes['TeaStore Homepage'] = (groupResponseTimes['TeaStore Homepage'] || 0) + duration;
        sleep(1);
    });
}

export function handleSummary(data) {
    console.log("\nResponse times by group:");
    for (const groupName in groupResponseTimes) {
        console.log(`   ${groupName}: ${groupResponseTimes[groupName]} ms`);
    }
}


// ! Helper Functions
const postCartAction = (payload) => {
    const start = new Date();

    http.post(`${BASE_URL}/cartAction`, payload, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
    );

    const end = new Date();
    const duration = end - start;
    groupResponseTimes['TeaStore CRUD Cart'] = (groupResponseTimes['TeaStore CRUD Cart'] || 0) + duration;
    // sleep(1); Instant
}

const getCart = () => {
    const start = new Date();
    http.get(`${BASE_URL}/cart`);
    const end = new Date();
    const duration = end - start;
    groupResponseTimes['TeaStore Cart'] = (groupResponseTimes['TeaStore Cart'] || 0) + duration;
    sleep(1);
}
