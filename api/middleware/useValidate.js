module.exports = (req, res, next) => {
    const {day,exersiceItem}= req.body
    if(!day || !exersiceItem){
        return res.status(404).json({message:"day and exercise are required"})
    }
    next()
}
