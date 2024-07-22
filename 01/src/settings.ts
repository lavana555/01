import {config} from 'dotenv'
config() // добавление переменных из файла .env в process.env

export const SETTINGS = {
    // все хардкодные значения должны быть здесь, для удобства их изменения
    PORT: process.env.PORT || 5001,
    PATH: {
        VIDEOS: '/videos',
        TESTING: '/testing/all-data',
    },
}
