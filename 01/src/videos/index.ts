import {Router} from "express";
import {getVideosController} from "./getVideosContrller";
import {createVideosController} from "./createVideosController";
import {findVideoController} from "./findVideoController";
import {updateVideoController} from "./updateVideoController";
import {deleteVideoController} from "./deleteVideoController";


export const videosRouter = Router()

videosRouter.get('/', getVideosController)
videosRouter.post('/', createVideosController)
videosRouter.get('/:id', findVideoController)
videosRouter.put('/:id', updateVideoController)
videosRouter.delete('/:id', deleteVideoController)
