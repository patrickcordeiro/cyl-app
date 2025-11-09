export interface ControllerBase {
  [key: string]: { request: unknown; response: unknown };
}
