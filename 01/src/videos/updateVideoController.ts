import { Request, Response } from 'express';
import Joi from 'joi';
import { db } from '../db/db';
import { Resolutions } from '../db/video-db-types';

// Validation schema for path parameters
const findVideoParamsSchema = Joi.object({
    id: Joi.number().integer().required()
});

// Validation schema for request body
const updateVideoSchema = Joi.object({
    title: Joi.string().max(40),
    author: Joi.string().max(20),
    availableResolutions: Joi.array().items(
        Joi.string().valid(...Object.values(Resolutions))
    ).allow(null),
    canBeDownloaded: Joi.boolean().allow(null),
    minAgeRestriction: Joi.number().integer().min(0).max(20).allow(null),
    publicationDate: Joi.string().isoDate().allow(null)
});

export const updateVideoController = (req: Request, res: Response<any>) => {
    const { error: paramsError, value: paramsValue } = findVideoParamsSchema.validate(req.params);
    const { error: bodyError, value: bodyValue } = updateVideoSchema.validate(req.body, { abortEarly: false });

    if (paramsError) {
        return res.status(400).json({
            errorsMessages: paramsError.details.map(err => ({
                message: err.message || null,
                field: err.context?.key || null
            }))
        });
    }

    if (bodyError) {
        return res.status(400).json({
            errorsMessages: bodyError.details.map(err => ({
                message: err.message || null,
                field: err.context?.key || null
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
