<script setup>
import HelloWorld from '@/components/HelloWorld.vue';
import { useTokensStore } from '@/stores/tokens.js';
import { storeToRefs } from 'pinia';
import auth0 from 'auth0-js';

const tokensStore = useTokensStore();
const { accessToken } = storeToRefs(tokensStore);

const webAuth = new auth0.WebAuth({
  domain: import.meta.env.VITE_OIDC_PROVIDER,
  clientID: import.meta.env.VITE_CLIENT_ID,
  redirectUri: `${window.location.protocol}//${window.location.host}/callback`,
  audience: import.meta.env.VITE_API_IDENTIFIER,
  scope: 'openid profile email read:to-dos delete:to-dos',
  responseType: 'code',
});

const login = () => {
  webAuth.login(
    {
      email: 'hogehoge@sample.com',
      password: '12345678Ab-',
      realm: import.meta.env.VITE_DB_CONNECTION,
    },
    function (err) {
      if (err) return alert('Something went wrong: ' + err.message);
      return alert('success signup without login!');
    },
  );
};

const signup = () => {
  webAuth.signup(
    {
      email: 'hogehoge@sample.com',
      password: '12345678Ab-',
      connection: import.meta.env.VITE_DB_CONNECTION,
    },
    function (err) {
      if (err) return alert('Something went wrong: ' + err.message);
      return alert('success signup without login!');
    },
  );
};
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <div v-if="accessToken == null">
        <button @click="login">login</button>
        <button @click="signup">signup</button>
      </div>
      <div v-else>
        <p>AccessToken: {{ accessToken }}</p>
      </div>

      <nav>
        <RouterLink to="/"> Home </RouterLink>
        <RouterLink to="/about"> About </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
@import '@/assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
