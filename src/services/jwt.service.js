import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (user) => {
    return jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw new Error("[Service] Token inválido");
        }
        return decoded;
    });
}

export const decodeToken = (token) => {
    return jwt.decode(token);
}