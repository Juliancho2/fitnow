export const extractorIdVideo = (url: string) => {

    const urlVideo = url;
    const videoID = urlVideo.split("v=")[1].split("&")[0];
    return videoID;

}