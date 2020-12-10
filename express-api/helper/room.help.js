module.exports = (req, room) => {
    if (req.price)
        room.price = req.price;
    if (req.numberOfRoom)
        room.numberOfRoom = req.numberOfRoom;
    if (req.carParking)
        room.carParking = req.carParking;
    if (req.bikeParking)
        room.bikeParking = req.bikeParking;
    if (req.address)
        room.address = req.address;

    return room;
}