import HelloWorld from '@/components/HelloWorld.vue';
import { RouterLink, RouterView } from 'vue-router';

export default await (async () => {
  // @ts-ignore
  return (await import('vue')).defineComponent({
    setup() {
      () => {
        // @ts-ignore
        [HelloWorld, RouterLink, RouterView];
        // @ts-ignore
        [];
      };
      return {};
    },
  });
})();
