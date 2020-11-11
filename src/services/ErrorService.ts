import { environment } from "../config";

class ErrorService {
  handleError(error: Error) {
    if (environment === "development") {
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
