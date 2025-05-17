import { PractitionerInformation } from "../../models/practitionerInformation.js";

export const validateExistingInformationUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const practitionerInformation = await PractitionerInformation.findOne({
      where: { userId },
    });

    if (practitionerInformation)
      return res.status(403).json({
        error:
          "Vaya, al parecer este practicante ya cuenta con la informacion registrada.",
      });

    next();
  } catch (error) {
    console.log(
      "Se ha presentado un error al intentar validar la informacion registrada:",
      error
    );

    return res.status(500).json({
      error:
        "Se ha presentado un error al intentar validar la informacion registrada..",
    });
  }
};
