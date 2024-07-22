import { Request, Response } from 'express';
import Joi from 'joi';
import { db } from '../db/db';
import { Resolutions } from '../enum/enums';
import { VideoDBType } from '../db/video-db-types';

// Validation schema for input data with custom error messages
const createVideoSchema = Joi.object({
    title: Joi.string().max(40).required(),
    author: Joi.string().max(20).required(),
    availableResolutions: Joi.array().items(
        Joi.string().valid(...Object.values(Resolutions)).messages({
            'any.only': 'availableResolutions contains invalid resolution'
        })
    ).min(1).allow(null).messages({
        'array.min': 'availableResolutions contains invalid resolution',
        'array.base': 'availableResolutions must be an array'
    })
});

// Controller for creating a video
export const createVideosController = (req: Request, res: Response<any>) => {
    const { error, value } = createVideoSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            errorsMessages: error.details.map(err => ({
                message: err.message || null,
                field: err.path[0] || null
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
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions: value.availableResolutions
    };

    db.videos.push(newVideo);

    return res.status(201).json(newVideo);
};
