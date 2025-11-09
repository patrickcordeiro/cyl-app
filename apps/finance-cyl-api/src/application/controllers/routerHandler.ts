/* eslint-disable @typescript-eslint/ban-ts-comment */

import { NextFunction, Request, Response } from 'express';

type ExpressFunction<T> = (req: Request, res: Response) => Promise<T>;

type CustomFunctionResponse<T> = (
  data: T,
  req: Request,
  res: Response
) => Response;

type CustomFunction<T> = (data: T, req: Request, res: Response) => T;

type ExtractPromise<T> = T extends Promise<infer U> ? U : T;

// @ts-ignore
type CallbackFunction<T, K> = CustomFunction<ExtractPromise<ReturnType<T[K]>>>;

type Options = {
  /**
   * default: 200 (httpStatus.OK)
   */
  status?: number;
  /**
   * If it is true, will not change anything on the response
   * it will only return the raw response with statusCode 200
   *
   * Default: false
   */
  rawResponse?: boolean;
  /**
   * If it is false, will use the function res.send()
   *
   * Default: true
   */
  isJson?: boolean;
};

type RouterHandlerCallbackType<T, K> = (
  result: ReturnType<CallbackFunction<T, K>>,
  req: Request,
  res: Response
) => Response;

type RouterHandlerOption<T, K> = Options | RouterHandlerCallbackType<T, K>;

type HandleFunctionResponse<T, K> =
  RouterHandlerOption<T, K> extends object ? Response : undefined | void;

async function handleFunction<T, K>(
  fn: ExpressFunction<T>,
  req: Request,
  res: Response,
  next: NextFunction,
  configs: Options | CustomFunctionResponse<T>
): Promise<HandleFunctionResponse<T, K>> {
  try {
    const result = await fn(req, res);

    if (typeof configs === 'object') {
      res.status(configs.status ?? 200);

      if (configs.rawResponse) {
        return res;
      }

      if ('isJson' in configs && configs.isJson === false) {
        return res.send(result);
      }

      return res.json(result);
    }

    return configs(result, req, res);
  } catch (e) {
    // @ts-ignore
    return next(e);
  }
}

/**
 * Resolve a express router
 * @param {T} controllerInstance Instance of a valid controller
 * @param {keyof T} functionName Name of controller function that should be called
 * @param {object | function} options Object of options or callback(controllerResult, req, res) => res
 */
export const routerHandler =
  <T, K extends keyof T>(
    controllerInstance: T,
    functionName: K,
    options: RouterHandlerOption<T, K>
  ) =>
  (req: Request, res: Response, next: NextFunction) =>
    handleFunction<T, K>(
      // @ts-ignore
      (controllerInstance[functionName] as ExpressFunction<unknown>).bind(
        controllerInstance
      ),
      req,
      res,
      next,
      options
    );

export default routerHandler;
