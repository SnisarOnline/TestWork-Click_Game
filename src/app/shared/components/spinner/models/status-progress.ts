import {StatusCodes} from 'http-status-codes/build/es'; // https://www.npmjs.com/package/http-status-codes

export interface StatusProgress {
  progress: number; // прогрес загрузки/обработки
  statusCode: StatusCodes; // httpErrorCode: 200 / 400 / 404 ...
  statusType: 'success' | 'rejected' | 'pending'; // результат загрузки/обработки
  isFinished: boolean; // проверка конца обработки
  lastLogMessageHistory: string; // последние сообщение
  logMessageHistory: string[]; // весь список сообщение
}
