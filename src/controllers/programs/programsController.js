<<<<<<< HEAD
import { Faculty } from "../../models/faculties.js";
import { Institution } from "../../models/institutions.js";
=======
>>>>>>> Correccion-controladores
import { Program } from "../../models/programs.js";

// Controlador encargado de obtener todos los programas
export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll({
<<<<<<< HEAD
      include: ["id", "program_name", "code", "facultyId"],
=======
      attributes: ["id", "program_name", "code", "facultyId"],
>>>>>>> Correccion-controladores
    });

    return res.status(200).json(programs);
  } catch (error) {
    console.log(
      "Se ha presentado un error al intenter optener los programas:",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intenter optener los programas.",
    });
  }
};

// Controlador encargado de registrar un programa academico
export const registerProgram = async (req, res) => {
  try {
    const { program_name, code, facultyId } = req.body;

    await Program.create({ program_name, code, facultyId });

    return res.status(200).json({ message: "Programa registrado con exito." });
  } catch (error) {
    console.log(
      "Se ha presentado un error al intenter registrar el programa:",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intenter registrar el programa.",
    });
  }
};

// Controlador encargado de actualizar un programa
export const updateProgram = async (req, res) => {
  try {
    const { programId } = req.params;
    const { program_name, code } = req.body;

<<<<<<< HEAD
    const program = await Faculty.findByPk(programId);
    if (!program)
      return res.status(404).json({ error: "Programa no encontrado." });

    program.program_name = program_name;
    program.code = code;
=======
    const program = await Program.findByPk(programId);
    if (!program)
      return res.status(404).json({ error: "Programa no encontrado." });

    if (program_name && program_name !== program.program_name)
      program.program_name = program_name;
    if (code && code !== program.code) program.code = code;
>>>>>>> Correccion-controladores

    await program.save();

    return res.status(200).json({ message: "Programa actualizado con exito." });
  } catch (error) {
    console.log(
      "Se ha presentado un error al intenter actualizar la Programa:",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intenter actualizar la Programa.",
    });
  }
};

// Controlador encargado de eliminar un programa
export const deleteProgram = async (req, res) => {
  try {
    const { programId } = req.params;

<<<<<<< HEAD
    const program = await Faculty.findByPk(programId);
=======
    const program = await Program.findByPk(programId);
>>>>>>> Correccion-controladores
    if (!program)
      return res.status(404).json({ error: "Programa no encontrada." });

    await program.destroy();

    return res.status(200).json({ message: "Programa eliminado con exito." });
  } catch (error) {
    console.log(
      "Se ha presentado un error al intenter eliminar la Programa:",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intenter eliminar la Programa.",
    });
  }
};
<<<<<<< HEAD

// Controlador encargado de obtener una facultad por ID
export const getInstitutionById = async (req, res) => {
  try {
    const { programId } = req.params;

    const faculty = await Institution.findByPk(programId, {
      include: {
        model: Faculty,
        include: [Program],
      },
    });
    if (!faculty)
      return res.status(404).json({ error: "Facultad no encontrada." });

    return res.status(200).json(faculty);
  } catch (error) {
    console.log(
      "Se ha presentado un error al intenter eliminar la Facultad:",
      error
    );

    return res.status(500).json({
      error: "Se ha presentado un error al intenter eliminar la Facultdad.",
    });
  }
};
=======
>>>>>>> Correccion-controladores
