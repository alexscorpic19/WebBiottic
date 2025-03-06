type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const isDevelopment = process.env.NODE_ENV === 'development';

class Logger {
  private static formatMessage(level: LogLevel, message: string): string {
    return `[${level.toUpperCase()}] ${message}`;
  }

  static debug(message: string, ...args: any[]): void {
    if (isDevelopment) {
      console.debug(this.formatMessage('debug', message), ...args);
    }
  }

  static info(message: string, ...args: any[]): void {
    if (isDevelopment) {
      console.info(this.formatMessage('info', message), ...args);
    }
  }

  static warn(message: string, ...args: any[]): void {
    console.warn(this.formatMessage('warn', message), ...args);
  }

  static error(message: string, ...args: any[]): void {
    console.error(this.formatMessage('error', message), ...args);
  }
}

export default Logger;
