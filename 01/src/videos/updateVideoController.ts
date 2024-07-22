import { Request, Response } from 'express';
import Joi from 'joi';
import { db } from '../db/db';
import {Resolutions} from "../db/video-db-types";

// Схема валидации для параметров пути
const findVideoParamsSchema = Joi.object({
    id: Joi.number().integer().required()
});

// Схема валидации для данных тела запроса
const updateVideoSchema = Joi.object({
    title: Joi.string().max(40),
    author: Joi.string().max(20),
    availableResolutions: Joi.array().items(
        Joi.string().valid(...Object.values(Resolutions))
    ),
    canBeDownloaded: Joi.boolean(),
    minAgeRestriction: Joi.number().integer().min(0).max(20).allow(null),
    publicationDate: Joi.string().isoDate()
});



export const updateVideoController = (req: Request, res: Response<any>) => {
    const { error: paramsError, value: paramsValue } = findVideoParamsSchema.validate(req.params);
    const { error: bodyError, value: bodyValue } = updateVideoSchema.validate(req.body);

    if (paramsError) {
        return res.status(400).json({
            errorsMessages: paramsError.details.map(err => ({
                message: err.message,
                field: err.context?.key
            }))
        });
    }

    if (bodyError) {
        return res.status(400).json({
            errorsMessages: bodyError.details.map(err => ({
                message: err.message,
                field: err.context?.key
            }))
        });
    }

    const videoIndex = db.videos.findIndex(({ id }) => id === +paramsValue.id);
    if (videoIndex !== -1) {
        db.videos[videoIndex] = {
            ...db.videos[videoIndex],
            ...bodyValue
        };
        return res.status(204).send(); // No Content
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
};
