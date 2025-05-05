import { Rol } from "./roles.js";
import { User } from "./users.js";
import { Address } from "./address.js";

// Relación un rol tiene muchos usuarios
Rol.hasMany(User, { foreignKey: "rolId" });
User.belongsTo(Rol, { foreignKey: "rolId" });

// Relación un usuario tiene una dirección
User.hasOne(Address, { foreignKey: "userId" }); 
Address.belongsTo(User, { foreignKey: "userId" });
