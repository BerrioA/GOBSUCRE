import { Program } from "../../models/programs.js";

// Controlador encargado de obtener todos los programas
export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll({
      attributes: ["id", "program_name", "code", "facultyId"],
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

    const program = await Program.findByPk(programId);
    if (!program)
      return res.status(404).json({ error: "Programa no encontrado." });

    if (program_name && program_name !== program.program_name)
      program.program_name = program_name;
    if (code && code !== program.code) program.code = code;

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

    const program = await Program.findByPk(programId);
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
