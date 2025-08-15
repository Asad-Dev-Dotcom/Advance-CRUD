const User = require("../models/user.model");

exports.add = async (req, res) => {
  const data = req.body;

  try {
    const exits = await User.findOne({ phone: data.phone });
    if (exits)
      return res.status(404).send({ message: "User already exists!!" });

    await User.create({
      firstname: data.fname,
      lastname: data.lname,
      phone: data.phone,
      age: data.age,
      gender: data.gender,
      address: {
        country: data.address.country,
        state: data.address.state,
        city: data.address.city,
        street: data.address.street,
        house: data.address.house,
        postalcode: data.address.postalcode,
      },
    });
    res.status(200).send({ message: "User added successfully" });
  } catch {
    res.status(404).send({ message: "Error adding user in DB!!" });
  }
};

exports.display = async (req, res) => {
  const data = await User.find();

  if (data) return res.status(201).send(data);
};

exports.delete = async (req, res) => {
  const data = req.params.phone;

  try {
    await User.deleteOne({ phone: data });

    res.status(201).send({ message: "user deleted successfully!!" });
  } catch {
    res.status(400).send({ message: "user deleted error!!" });
  }
};

exports.update = async (req, res) => {
  const dataphone = req.params.phone;
  const data = req.body;

  try {
    await User.updateOne(
      { phone: dataphone },
      {
        $set: {
          firstname: data.fname,
          lastname: data.lname,
          phone: data.phone,
          age: data.age,
          gender: data.gender,
          address: {
            country: data.address.country,
            state: data.address.state,
            city: data.address.city,
            street: data.address.street,
            house: data.address.house,
            postalcode: data.address.postalcode,
          },
        },
      }
    );

    res.status(200).send({ message: "User updated successfully!!" });
  } catch {
    res.status(400).send({ message: "Error in updating user!!" });
  }
};
