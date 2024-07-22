import { Request, Response } from 'express';
import { db } from '../db/db';

export const resetVideoController = (req: Request, res: Response<any>) => {
    db.videos = []; // Очищаем массив видео

    res.status(204).send(); // Отправляем статус 204 без тела ответа
};
