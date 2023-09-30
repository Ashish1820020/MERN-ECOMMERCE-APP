



export const isPresent = (arr, _id, color) => {
    // console.log(arr, id, color);
    return !!arr.find(elem => (elem._id + elem.color === _id + color));
}