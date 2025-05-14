import { Address } from "../../models/address.js";

export const getAdressById = async (req, res) => {
  try {
    const { idUser } = req.params;

    const addressUser = await Address.findOne({
      where: { userId: idUser },
      attributes: ["neighborhood", "address", "city", "department"],
    });
    if (!addressUser)
      return res.status(404).json({
        error: "No se ha encontrado una dirección para este usuario.",
      });

    return res.status(200).json(addressUser);
  } catch (error) {
    console.log(
      "Se ha presentado un error al intentar obtener la dirección del usuario:",
      error
    );

    return res.status({
      error:
        "Se ha presentado un error al intentar obtener la dirección del usuario.",
    });
  }
};

export const updateAdress = async (req, res) => {
  try {
    const { idUser } = req.params;
    const { neighborhood, address } = req.body;

    const addressUser = await Address.findOne({ where: { userId: idUser } });
    if (!addressUser)
      return res.status(404).json({
        error: "No se ha encontrado una dirección para este usuario.",
      });

    if (neighborhood && neighborhood !== addressUser.neighborhood)
      addressUser.neighborhood = neighborhood;
    if (address && address !== addressUser.address)
      addressUser.address = address;

    await addressUser.save();

    return res
      .status(200)
      .json({ message: "Dirección actualizada con exito." });
  } catch (error) {
    console.log(
      "Se ha presentado un error al intentar actualizar la dirección:",
      error
    );

    return res.status({
      error: "Se ha presentado un error al intentar actualizar la dirección.",
    });
  }
};
