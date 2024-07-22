import express from 'express'
import cors from 'cors'
import {getVideosController} from "./videos/getVideosContrller";
import {SETTINGS} from "./settings";
import {videosRouter} from "./videos";
import {resetVideoController} from "./videos/resetVideoController";


export const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) =>{
    res.status(200).json({version: '1.0.5'})
})
app.delete(SETTINGS.PATH.TESTING, resetVideoController);
app.get(SETTINGS.PATH.VIDEOS, getVideosController)
app.use(SETTINGS.PATH.VIDEOS, videosRouter)
