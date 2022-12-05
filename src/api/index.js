import {api} from './api';
import http from './http';

const user = {
    authenticate: (form) => new Promise(async (resolve, reject) => {
        try {
            const res = await http.post(api.LOGIN, form);
            resolve(res);
        } catch (e) {
            reject(e);
        }
    })
};

export const services = {
  user,
};
