import { Document } from "../../models/documents.js";
import { Rol } from "../../models/roles.js";
import { User } from "../../models/users.js";
import { DocumentType } from "../../models/documentTypes.js";
import { PractitionerInformation } from "../../models/practitionerInformation.js";

export const getStudents = async (req, res) => {
  try {
    const studens = await User.findAll({
<<<<<<< HEAD
      include: [
        {
          model: Rol,
          where: {
            role_name: "Estudiante",
          },
=======
      attributes: [
        "id",
        "name",
        "middle_name",
        "last_name",
        "second_last_name",
        "document_type",
        "document_number",
        "cellphone",
        "email",
      ],
      include: [
        {
          model: Rol,
          where: { role_name: "Estudiante" },
          attributes: ["role_name"],
>>>>>>> Correccion-controladores
        },
      ],
    });

    return res.status(200).json(studens);
  } catch (error) {
    console.log(
<<<<<<< HEAD
      "Se ha presentado un error al intentar optener los datos de los estudiantes."
=======
      "Se ha presentado un error al intentar optener los datos de los estudiantes.",
      error
>>>>>>> Correccion-controladores
    );

    return res.status(500).json({
      error:
        "Se ha presentado un error al intentar optener los datos de los estudiantes.",
    });
  }
};

// Controlador encargado de buscar un estudiante por número de documento
export const getStudentByDocumentId = async (req, res) => {
  try {
    const { documentId } = req.params;

    if (!documentId) {
      return res.status(400).json({
        error: "El número de documento es requerido.",
      });
    }

    const student = await User.findOne({
      where: { document_number: documentId },
      attributes: [
        "id",
        "name",
        "middle_name",
        "last_name",
        "second_last_name",
        "document_type",
        "document_number",
        "cellphone",
        "email",
      ],
      include: [
        {
          model: Rol,
          where: { role_name: "Estudiante" },
        },
        {
          model: Document,
          attributes: ["id", "document", "fileUrl", "documentTypesId"],
          include: [
            {
              model: DocumentType,
              attributes: ["id", "document_name"],
            },
          ],
        },
        {
          model: PractitionerInformation,
          attributes: [
            "id",
            "start_date",
            "status",
            "institutionId",
            "FacultyId",
            "programId",
          ],
        },
      ],
    });

    if (!student) {
      return res.status(404).json({
        error: "Estudiante no encontrado.",
      });
    }

    return res.status(200).json(student);
  } catch (error) {
    console.error("Error al obtener los datos del estudiante:", error);
    return res.status(500).json({
      error:
        "Se ha presentado un error al intentar obtener los datos del estudiante.",
    });
  }
};
