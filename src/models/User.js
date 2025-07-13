//Modelo de usuario
import { db } from "../config/firebase.config.js";
import { collection, doc, addDoc, deleteDoc, getDoc, getDocs } from "firebase/firestore";

const usersCollection = collection(db, "users");

export class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

export const getAllUsers = async () => {
    try {
        const users = await getDocs(usersCollection);
        const usersData = users.docs.map((doc) => {
            const data = doc.data();
            return new User(doc.id, data.name, data.email, data.password);
        });
        return usersData;
    } catch (error) {
        throw new Error("[Model] Error al obtener los usuarios");
    }
}

export const createUser = async (user) => {
    try {
        const userRef = await addDoc(usersCollection, user);
        return new User(userRef.id, user.name, user.email, "********");
    } catch (error) {
        throw new Error("[Model] Error al crear el usuario");
    }
}

export const getUserById = async (id) => {
    try {
        const userRef = await getDoc(doc(usersCollection, id));
        const data = userRef.data();
        return new User(userRef.id, data.name, data.email, "********");
    } catch (error) {
        throw new Error("[Model] Error al obtener el usuario");
    }
}

export const deleteUser = async (id) => {
    try {
        const userRef = await deleteDoc(doc(usersCollection, id));
        return userRef;
    } catch (error) {
        throw new Error("[Model] Error al eliminar el usuario");
    }
}
