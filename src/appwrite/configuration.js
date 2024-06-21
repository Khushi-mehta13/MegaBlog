import config from "../config/config";

import {Client, ID, Databases, Storage , Query} from "appwrite";

export class Service{
    client = new Client();

    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({title, slug, content, featureImage , status, userId}){
        try {
            return await this.database.createDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug,{
                title,
                content,
                featureImage,
                status,
                userId,
            })
            
        } catch (error) {
            console.log("Appwrite error in createPost",error);
        }
    }

    async updatePost(slug,{title, content, featureImage,status}){
        try {
            return await this.database.updateDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug,{
                title,
                content,
                featureImage,
                status,
            })
        } catch (error) {
            console.log("Error in Appwrite while updating",error)
        }
    }

    async deletePost(slug){
        try {
            await this.database.deleteDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug)
            return true
        } catch (error) {
            console.log("Error in Appwrite while deleting",error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log("Error in Appwrite while delete the post",error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Error in Appwrite while getting the posts",error)
            return false
        }
    }

    //file UPload service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )

        } catch (error) {
            console.log("Error in Appwrite while uploading the file",error)
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
            
        } catch (error) {
            console.log("Error in Appwrite while delete the file",error)
            return false
        }
    }

    getPreview(fileId){
        try {
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId
            )
            
        } catch (error) {
            console.log("Error in Appwrite while get the preview",error)
            return false
        }
    }

}



const service = new Service()

export default service