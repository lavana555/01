// src/db/video-db-type.ts
export interface VideoDBType {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    createdAt: string;
    publicationDate: string;
    availableResolutions: Resolutions[];
}

// src/input-output-types/video-types.ts
export enum Resolutions {
    P144 = "P144",
    P240 = "P240",
    P360 = "P360",
    P480 = "P480",
    P720 = "P720",
    P1080 = "P1080",
    P1440 = "P1440",
    P2160 = "P2160",
}

// src/db/db.ts

// export interface DBType {
//     videos: VideoDBType[];
// }
