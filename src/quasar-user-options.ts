import "./styles/quasar.scss";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import { Notify } from "quasar";

// To be used on app.use(Quasar, { ... })

export default {
  plugins: { Notify },
  config: {
    notify: {
      timeout: 3000,
      textColor: "white",
      actions: [{ icon: "close", color: "white" }],
    },
    brand: {
      darkPage: "#272b33",
    },
  } as any,
};
