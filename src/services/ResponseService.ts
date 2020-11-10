import { Response } from "express";

export default class ResponseService {
  static ok(response: Response, data: any) {
    return response.status(200).json(data);
  }

  static created(response: Response, data: any) {
    return response.status(201).json(data);
  }

  static noContent(response: Response) {
    return response.status(204);
  }

  static badRequest(response: Response, data: any) {
    return response.status(400).json(data);
  }

  static unauthorized(response: Response, data?: any) {
    return response.status(401).json(data);
  }

  static forbidden(response: Response, data?: any) {
    return response.status(403).json(data);
  }

  static notFound(response: Response, data?: any) {
    return response.status(404).json(data);
  }

  static internalServerError(response: Response, data: any) {
    return response.status(500).json(data);
  }
}
