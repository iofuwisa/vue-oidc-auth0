import { defineStore } from 'pinia';
import axios from 'axios';

export const useTokensStore = defineStore({
  id: 'tokens',
  state: () => ({
    accessToken: null,
    idToken: null,
    state: null,
  }),
  getters: {},
  actions: {
    async codeExchange({ code, state }) {
      axios({
        method: 'post',
        url: `https://${import.meta.env.VITE_OIDC_PROVIDER}/oauth/token`,
        data: {
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_CLIENT_ID,
          client_secret: import.meta.env.VITE_CLIENT_SECRET,
          code: code,
          redirect_uri: `${window.location.protocol}//${window.location.host}/callback`,
        },
      })
        .then((response) => {
          this.accessToken = response.data.access_token;
          this.idToken = response.data.id_token;
          this.state = state;
          console.log(response);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
});
