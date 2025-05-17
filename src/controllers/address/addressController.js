import { Address } from "../../models/address.js";

export const updateAddress = async (req, res) => {
  try {
    const { neighborhood, address, city, department } = req.body;
    const addressUser = await Address.findOne({
      where: { userId: req.uid },
    });

    if (!addressUser)
      return res
        .status(403)
        .json({ error: "No se ha encontrado la direccion del estudiante." });

    if (neighborhood && neighborhood !== addressUser.neighborhood)
      addressUser.neighborhood = neighborhood;
    if (address && address !== addressUser.address)
      addressUser.address = address;
    if (city && city !== addressUser.city) addressUser.city = city;
    if (department && department !== addressUser.department)
      addressUser.department = department;

    await addressUser.save();

    return res
      .status(200)
      .json({ message: "Dirección actualizada con exito." });
  } catch (error) {
    console.log(
      "Se ha presentado un error al intentar actualizar la direccion:",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intentar actualizar la direccion.",
    });
  }
};
