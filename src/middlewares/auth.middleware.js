// Middleware de autenticación
import * as JwtService from "../services/jwt.service.js";

export const requireAuth = async (req, res, next) => {
    const token = req.session.token;
    if (!token) {
        return res.status(401).json({ message: "No autorizado" });
    }
    try {
        const decoded = JwtService.verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
}

export const requireNoAuth = async (req, res, next) => {
    const token = req.session.token;
    if (token) {
        return res.status(401).json({ message: "Debes cerrar sesión para continuar" });
    }
    next();
}

// Bearer token
export const requireBearerToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No autorizado" });
        }       
        // Verificar si el token es válido
        const decoded = JwtService.verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
}