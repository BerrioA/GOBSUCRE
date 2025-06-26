import { Document } from "../../models/documents.js";
import { Rol } from "../../models/roles.js";
import { User } from "../../models/users.js";
import { DocumentType } from "../../models/documentTypes.js";
import { PractitionerInformation } from "../../models/practitionerInformation.js";
import { Institution } from "../../models/institutions.js";
import { Faculty } from "../../models/faculties.js";
import { Program } from "../../models/programs.js";

export const getStudents = async (req, res) => {
  try {
    const studens = await User.findAll({
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
        },
      ],
    });

    return res.status(200).json(studens);
  } catch (error) {
    console.log(
      "Se ha presentado un error al intentar optener los datos de los estudiantes.",
      error
    );

    return res.status(500).json({
      error:
        "Se ha presentado un error al intentar optener los datos de los estudiantes.",
    });
  }
};

// Controlador encargado de buscar un estudiante por id
export const getStudentById = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({
        error: "No he da podido encontrar el usuario.",
      });
    }

    const student = await User.findOne({
      where: { id: studentId },
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
        },
        {
          model: Document,
          attributes: ["document", "fileUrl"],
          include: [
            {
              model: DocumentType,
              attributes: ["document_name"],
            },
          ],
        },
        {
          model: PractitionerInformation,
          attributes: [
            "id",
            "start_date",
            "end_date",
            "status",
            "facultyId",
            "programId",
          ],
          include: [
            {
              model: Institution,
              attributes: ["university_name"],
            },
            {
              model: Faculty,
              attributes: ["faculty_name"],
            },
            {
              model: Program,
              attributes: ["program_name"],
            },
          ],
        },
      ],
    });

    if (!student) {
      return res.status(404).json({
        error: "Estudiante no encontrado.",
      });
    }

    // Aplanando respuesta
    const infoStudent = {
      id: student.id,
      name: student.name,
      middle_name: student.middle_name,
      last_name: student.last_name,
      second_last_name: student.second_last_name,
      document_type: student.document_type,
      document_number: student.document_number,
      cellphone: student.cellphone,
      email: student.email,
      role_name: student.role?.role_name || null,
      start_date: student.practitioner_information?.start_date || null,
      end_date: student.practitioner_information?.end_date || null,
      status: student.practitioner_information?.status || null,
      institution_name:
        student.practitioner_information?.institution?.university_name || null,
      faculty_name:
        student.practitioner_information?.faculty?.faculty_name || null,
      program_name:
        student.practitioner_information?.program?.program_name || null,
      documents: student.documents.map((doc) => ({
        document: doc.document,
        fileUrl: doc.fileUrl,
        document_name: doc.document_type?.document_name || null,
      })),
    };

    return res.status(200).json(infoStudent);
  } catch (error) {
    console.error("Error al obtener los datos del estudiante:", error);
    return res.status(500).json({
      error:
        "Se ha presentado un error al intentar obtener los datos del estudiante.",
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
          attributes: ["role_name"],
        },
        {
          model: Document,
          attributes: ["document", "fileUrl"],
          include: [
            {
              model: DocumentType,
              attributes: ["document_name"],
            },
          ],
        },
        {
          model: PractitionerInformation,
          attributes: [
            "id",
            "start_date",
            "end_date",
            "status",
            "facultyId",
            "programId",
          ],
          include: [
            {
              model: Institution,
              attributes: ["university_name"],
            },
            {
              model: Faculty,
              attributes: ["faculty_name"],
            },
            {
              model: Program,
              attributes: ["program_name"],
            },
          ],
        },
      ],
    });

    if (!student) {
      return res.status(404).json({
        error: "Estudiante no encontrado.",
      });
    }

    // Aplanando respuesta
    const infoStudent = {
      id: student.id,
      name: student.name,
      middle_name: student.middle_name,
      last_name: student.last_name,
      second_last_name: student.second_last_name,
      document_type: student.document_type,
      document_number: student.document_number,
      cellphone: student.cellphone,
      email: student.email,
      role_name: student.role?.role_name || null,
      start_date: student.practitioner_information?.start_date || null,
      end_date: student.practitioner_information?.end_date || null,
      status: student.practitioner_information?.status || null,
      institution_name:
        student.practitioner_information?.institution?.university_name || null,
      faculty_name:
        student.practitioner_information?.faculty?.faculty_name || null,
      program_name:
        student.practitioner_information?.program?.program_name || null,
      documents: student.documents.map((doc) => ({
        document: doc.document,
        fileUrl: doc.fileUrl,
        document_name: doc.document_type?.document_name || null,
      })),
    };

    return res.status(200).json(infoStudent);
  } catch (error) {
    console.error("Error al obtener los datos del estudiante:", error);
    return res.status(500).json({
      error:
        "Se ha presentado un error al intentar obtener los datos del estudiante.",
    });
  }
};
