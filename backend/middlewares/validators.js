export const uservalidator = (req, res, next)=>{
    const fname = req.body.fname
    const lname = req.body.lname
    const phone = req.body.phone
    const age = req.body.age
    const gender = req.body.gender
    const country = req.body.address.country
    const state = req.body.address.state
    const city = req.body.address.city
    const street = req.body.address.street
    const house = req.body.address.house
    const postalcode = req.body.address.postalcode

    if(!fname && !lname && !phone && !age && !gender && !country && !state && !city && !street && !house && !postalcode){
        return res.status(404).send({ message : "Fill all entries" })
    }

    next()

}