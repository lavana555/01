import { Request, Response } from 'express';
import Joi from 'joi';
import { db } from '../db/db';
import { Resolutions } from '../enum/enums';
import { VideoDBType } from '../db/video-db-types';

// Схема валидации для входных данных
const createVideoSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    availableResolutions: Joi.array().items(
        Joi.string().valid(...Object.values(Resolutions))
    ).required()
});


export const createVideosController = (req: Request, res: Response) => {
    const { error, value } = createVideoSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            errorsMessages: error.details.map(err => ({
                message: err.message,
                field: err.context?.key
            }))
        });
    }

    const createdAt = new Date();
    const publicationDate = new Date(createdAt);
    publicationDate.setDate(createdAt.getDate() + 1);

    const newVideo: VideoDBType = {
        id: Math.floor(Date.now() + Math.random() * 1000),
        title: value.title,
        author: value.author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions: value.availableResolutions
    };

    db.videos.push(newVideo);

    return res.status(201).json(newVideo);
}
