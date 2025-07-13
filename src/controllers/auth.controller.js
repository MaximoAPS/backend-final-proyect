//Controladores de autenticación
import * as AuthService from "../services/auth.service.js";

export const registerUser = async (req, res) => {
    try {
        const user = await AuthService.registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { emailOrName, password } = req.body;
        const token = await AuthService.loginUser(emailOrName, password);
        // Guardar el token en la sesión
        req.session.token = token;

        // Bearer token
        res.setHeader("Authorization", `Bearer ${token}`);

        res.status(200).send({ 
            message: "Usuario logueado correctamente", 
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await AuthService.deleteUser(id);
        // Validar que el usuario sea el mismo que el que está logueado
        if (id !== req.user.id) {
            throw new Error("[Service] No tienes permisos para eliminar este usuario");
        }
        // Eliminar el token de la sesión
        req.session.token = null;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const logoutUser = async (req, res) => {
    try {
        req.session = null;
        res.status(200).json({ message: "Usuario deslogueado correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

