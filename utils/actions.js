export const NEXT = 'NEXT';
export const PREV = 'PREV';
export const POPULAR = 'POPULAR';
export const UPCOMING = 'UPCOMING';
export const NEW = 'NEW';

export const customImg = (path, size) => {
    let image = '';
    if (path) {
        image = path.match(/media\/screenshots/)
        ? path.replace("media/screenshots", `media/resize/${size}/-/screenshots`)
        : path.match(/media\/games/)
        ? path.replace("media/games", `media/resize/${size}/-/games`)
        : path;    
    }
    

    return image; 
}