//Modelo de producto
import { db } from "../config/firebase.config.js";
import { 
    collection, 
    getDocs, 
    getDoc, 
    doc, 
    addDoc, 
    deleteDoc, 
    updateDoc, 
    query, 
    where, 
    orderBy 
} from "firebase/firestore";

const productsCollection = collection(db, "products");

export class Product {
    constructor(id, name, description, price, categories, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.categories = categories;
        this.image = image;
    }
}

export const getAllProducts = async () => {
    try {
        const snapshot = await getDocs(productsCollection);
        const products = snapshot.docs.map((doc) => {
            const data = doc.data();
            return new Product(doc.id, data.name, data.description, data.price, data.categories, data.image);
        });
        return products;
    } catch (error) {
        console.error("[Model] Error in getAllProducts:", error);
        throw new Error("[Model] Error al obtener los productos");
    }
};

export const getProductById = async (id) => {
    try {
        const productDoc = await getDoc(doc(productsCollection, id));
        if (!productDoc.exists()) {
            throw new Error("Producto no encontrado");
        }
        const data = productDoc.data();
        return new Product(productDoc.id, data.name, data.description, data.price, data.categories, data.image);
    } catch (error) {
        console.error("[Model] Error in getProductById:", error);
        throw new Error("[Model] Error al obtener el producto");
    }
};

export const createProduct = async (product) => {
    try {
        const docRef = await addDoc(productsCollection, product);
        return docRef;
    } catch (error) {
        console.error("[Model] Error in createProduct:", error);
        throw new Error("[Model] Error al crear el producto");
    }
};

export const deleteProduct = async (id) => {
    try {
        await deleteDoc(doc(productsCollection, id));
    } catch (error) {
        console.error("[Model] Error in deleteProduct:", error);
        throw new Error("[Model] Error al eliminar el producto");
    }
};

export const updateProduct = async (id, product) => {
    try {
        await updateDoc(doc(productsCollection, id), product);
    } catch (error) {
        console.error("[Model] Error in updateProduct:", error);
        throw new Error("[Model] Error al actualizar el producto");
    }
};


