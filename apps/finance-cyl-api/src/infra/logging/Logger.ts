/* eslint-disable no-console */
import colors from 'colors';

function getCurrentTimeFormatted() {
  return colors.bold(colors.grey(new Date().toLocaleTimeString()));
}

export default abstract class Logger {
  static log(message: string): void {
    console.log(
      `[${colors.white('LOG')}] ${getCurrentTimeFormatted()} ${message}`
    );
  }

  static debug(message: string): void {
    console.debug(
      `[${colors.blue('DEBUG')}] ${getCurrentTimeFormatted()} ${message}`
    );
  }

  static info(message: string): void {
    console.info(
      `[${colors.cyan('INFO')}] ${getCurrentTimeFormatted()} ${message}`
    );
  }

  static warn(message: string): void {
    console.warn(
      `[${colors.yellow('WARN')}] ${getCurrentTimeFormatted()} ${message}`
    );
  }

  static error(message: string | undefined): void {
    const error = message ?? 'No stack trace.';
    console.error(
      `${colors.bgRed(' ERROR ')} ${getCurrentTimeFormatted()} ${error}`
    );
  }

  static success(message: string): void {
    console.log(
      `[${colors.green('SUCCESS')}] ${getCurrentTimeFormatted()} ${message}`
    );
  }

  static criticalError(origin: string, message: string | undefined): void {
    const error = message ?? 'No stack trace.';
    const originText = `[${origin}]`;
    const messageText = `${getCurrentTimeFormatted()} ${error}`;
    console.error(
      `${colors.bgRed(colors.white(originText))} ${colors.red(messageText)}`
    );
  }

  static applicationError<T extends Error>(errorClass: T): void {
    const { name, message } = errorClass;
    const errorName = colors.bgRed(` ${name} `);

    console.error(`${errorName} ${getCurrentTimeFormatted()} ${message}`);
  }

  static systemStarted(serverPort?: string): void {
    const port = serverPort || '80';

    this.success('🚀 Server started successfully');
    this.info(`Server running at: http://localhost:${port}`);
  }

  static httpDebugStart(method: string, route: string): void {
    console.debug(
      colors.gray(`[${method}] ${getCurrentTimeFormatted()} ${route}`)
    );
  }

  static httpDebugEnd(
    method: string,
    route: string,
    status: number,
    responseTime: number
  ): void {
    const httpMethod = `[${colors.blue(method)}]`;
    const statusCode = `[${colors.cyan(String(status))}]`;
    const timeInMilliseconds = colors.magenta(`${responseTime}ms`);

    console.debug(
      `${httpMethod} ${getCurrentTimeFormatted()} ${route} ${statusCode} ${timeInMilliseconds}`
    );
  }
}
