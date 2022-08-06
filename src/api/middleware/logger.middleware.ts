import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import chalk from 'chalk';

const getProcessingTimeInMs = (time: [number, number]): string => {
    return `${(time[0] * 1000 + time[1] / 1e6).toFixed(2)}ms`
}

async function logger(_req: Request, _res: Response, next: NextFunction) {
    const id = uuidv4();

    const now = new Date();
    const timestamp = [
        now.getMonth() + 1,
        '-',
        now.getDate(),
        '-',
        now.getFullYear(),
        ' ',
        now.getHours(),
        ':',
        now.getMinutes(),
        ':',
        now.getSeconds()
    ].join('');

    const { method, url } = _req;

    const start = process.hrtime();
    const startText = chalk.green(`START:${getProcessingTimeInMs(start)}`);
    const idText = chalk.blue(`[${id}]`);
    const timeStampText = chalk.blueBright(`[${timestamp}]`);
    console.log(`${idText}${timeStampText} ${method}:${url} ${startText}`);

    _res.once('finish', () => {
        const end = process.hrtime(start);
        const endText = chalk.red(`END:${getProcessingTimeInMs(end)}`);
        console.log(`${idText}${timeStampText} ${method}:${url} ${_res.statusCode} ${endText}`);
    });
    next();
}

export default logger;
