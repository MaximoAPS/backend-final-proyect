//Servicios de autenticación
import * as UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import * as JwtService from "./jwt.service.js";

export const registerUser = async (user) => {
    // Validar el usuario
    await validateUser(user);
    //Hashear la contraseña
    const hashedPassword = await bcrypt.hash(user.password, 10);
    //Crear el usuario
    const newUser = {
        ...user,
        password: hashedPassword
    }
    try {
        const user = await UserModel.createUser(newUser);
        return user;
    } catch (error) {
        throw new Error("[Service] Error al registrar el usuario");
    }
}

export const getUserByEmail = async (email) => {
    const users = await UserModel.getAllUsers();
    const user = users.find((user) => user.email === email);
    return user;
}

export const getUserByName = async (name) => {
    const users = await UserModel.getAllUsers();
    const user = users.find((user) => user.name === name);
    return user;
}

export const loginUser = async (emailOrName, password) => {
    let user = await getUserByEmail(emailOrName);   
    if (!user) {
        user = await getUserByName(emailOrName);
    }
    if (!user) {
        throw new Error("[Service] Usuario no encontrado");
    }
    try {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("[Service] Contraseña incorrecta");
        }
        const token = JwtService.generateToken(user);
        return token;
    } catch (error) {
        throw new Error("[Service] Error al iniciar sesión");
    }
}

export const deleteUser = async (id) => {
    const user = await UserModel.getUserById(id);
    
    // Validar que el usuario exista
    if (!user) {
        throw new Error("[Service] Usuario no encontrado");
    }
    try {
        await UserModel.deleteUser(id);
    } catch (error) {
        throw new Error("[Service] Error al eliminar el usuario");
    }
    return { message: "Usuario eliminado correctamente" };
}

// Validaciones
const validateUser = async (user) => {
    // Validar que los campos no estén vacíos
    if (!user.name || !user.email || !user.password) {
        throw new Error("[Service] Datos incompletos");
    }
    // Validar la contraseña tenga al menos 8 caracteres, tenga al menos una letra mayúscula, una letra minúscula, un número y un caracter especial.
    // Validas cada condicion con un if
    if (user.password.length < 8) {
        throw new Error("[Service] La contraseña debe tener al menos 8 caracteres");
    } else if (!user.password.match(/[A-Z]/)) {
        throw new Error("[Service] La contraseña debe tener al menos una letra mayúscula");
    } else if (!user.password.match(/[a-z]/)) {
        throw new Error("[Service] La contraseña debe tener al menos una letra minúscula");
    } else if (!user.password.match(/\d/)) {
        throw new Error("[Service] La contraseña debe tener al menos un número");
    } else if (!user.password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
        throw new Error("[Service] La contraseña debe tener al menos un caracter especial");
    }
    // Validar el email
    // Validar que el email tenga un @ y un .
    if (!user.email.includes("@")) {
        throw new Error("[Service] El email no es válido");
    }
    // Validar que el email tenga un @ y un .
    if (!user.email.includes(".")) {
        throw new Error("[Service] El email no es válido");
    }
    // Validar el nombre
    if (user.name.length < 3) {
        throw new Error("[Service] El nombre debe tener al menos 3 caracteres");
    }
    if (user.name.length > 50) {
        throw new Error("[Service] El nombre no puede tener más de 50 caracteres");
    }
    // Validar que el email no esté en uso
    let userByEmail = await getUserByEmail(user.email);
    if (userByEmail) {
        throw new Error("[Service] El email ya está en uso");
    }
    // Validar que el nombre no esté en uso
    let userByName = await getUserByName(user.name);
    if (userByName) {
        throw new Error("[Service] El nombre ya está en uso");
    }
}
