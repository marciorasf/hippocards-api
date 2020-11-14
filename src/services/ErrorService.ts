import { node_env } from "../config";

class ErrorService {
  handleError(error: Error) {
    if (node_env === "development") {
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
