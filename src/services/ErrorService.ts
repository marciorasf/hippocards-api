class ErrorService {
  handleError(error: Error) {
    if (process.env.NODE_ENV) {
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
