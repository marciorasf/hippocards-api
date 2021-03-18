import { __node_env__ } from "../env-variables";

class ErrorService {
  handleError(error: Error) {
    if (__node_env__ === "development") {
      this.handleErrorDevelopment(error);
    } else {
      this.handleErrorProduction(error);
    }
  }

  handleErrorDevelopment(error: Error) {
    console.log({ error });
  }

  handleErrorProduction(error: Error) {
    console.log({ error });
  }
}

export default new ErrorService();
