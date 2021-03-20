import { Response } from "express";

export default {
  ok(response: Response, data?: any) {
    return response.status(200).json(data);
  },

  created(response: Response, data?: any) {
    return response.status(201).json(data);
  },

  noContent(response: Response) {
    return response.status(204).json();
  },

  badRequest(response: Response, data?: any) {
    return response.status(400).json(data);
  },

  unauthorized(response: Response, data?: any) {
    return response.status(401).json(data);
  },

  forbidden(response: Response, data?: any) {
    return response.status(403).json(data);
  },

  notFound(response: Response, data?: any) {
    return response.status(404).json(data);
  },

  internalServerError(response: Response, data?: any) {
    return response.status(500).json(data);
  },
};
