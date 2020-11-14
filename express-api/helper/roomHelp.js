module.exports = (req, room) => {
    if (req.discription)
        room.discription = req.discription;
    if (req.price)
        room.price = req.price;
    if (req.image)
        room.image = req.image;

    return room;
}