import { __node_env__ } from "../config/environment";

const errorService = {
  handle(error: Error) {
    if (__node_env__ === "development") {
      this.handleInDevelopment(error);
    } else {
      this.handleInProduction(error);
    }
  },

  handleInDevelopment(error: Error) {
    console.log({ error });
  },

  handleInProduction(error: Error) {
    console.log({ error });
  },
};

export default errorService;
