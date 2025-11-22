import { defineComponent, h } from 'vue-demi';
import { config } from 'wc-renderer-markdown';

const Markdown = defineComponent<{
  content: string,
  dark?: boolean,
  autoScroll2End?: boolean,
}>({
  name: 'Markdown',
  props: {
    content: String,
    dark: Boolean,
    autoScroll2End: Boolean,
  },
  setup (props, { attrs, slots }) {
    return () => h(
      `${config.componentPrefix}-markdown`,
      {
        ...attrs,
        ...props,
      },
      slots.default?.(),
    );
  },
});

export { default as use } from './use';
export default Markdown;
