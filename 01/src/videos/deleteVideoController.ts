import { Request, Response } from 'express';
import Joi from 'joi';
import { db } from '../db/db';

const deleteVideoParamsSchema = Joi.object({
    id: Joi.number().integer().required()
});



export const deleteVideoController = (req: Request, res: Response<any>) => {
    const { error, value } = deleteVideoParamsSchema.validate(req.params);

    if (error) {
        return res.status(400).json({
            errorsMessages: error.details.map(err => ({
                message: err.message,
                field: err.context?.key
            }))
        });
    }

    const videoIndex = db.videos.findIndex(({ id }) => id === +value.id);
    if (videoIndex !== -1) {
        db.videos.splice(videoIndex, 1);
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
