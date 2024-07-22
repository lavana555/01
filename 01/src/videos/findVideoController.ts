import { Request, Response } from 'express';
import Joi from 'joi';
import { Resolutions } from '../db/video-db-types';
import { db } from '../db/db';

// Схема валидации для параметров пути
const findVideoParamsSchema = Joi.object({
    id: Joi.number().integer().required()
});

export const findVideoController = (req: Request, res: Response<any>) => {
    const { error, value } = findVideoParamsSchema.validate(req.params);

    if (error) {
        return res.status(400).json({
            errorsMessages: error.details.map(err => ({
                message: err.message,
                field: err.context?.key
            }))
        });
    }

    const findVideo = db.videos.find(({ id }) => id === +value.id);

    if (findVideo) {
        return res.status(200).json(findVideo);
    } else {
        return res.status(404).json({
            errorsMessages: [
                {
                    message: "Video not found",
                    field: "id"
                }
            ]
        });
    }
}
