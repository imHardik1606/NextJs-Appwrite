//file to talk to appwrite
import conf from "@/conf/config";
import {Client, Account, ID} from "appwrite";

//creating types (solution for 'any')
type CreateUserAccount = {
    email: string,
    password: string,
    name: string,
}

type LoginUserAccount = {
    email: string,
    password: string,
}

//creating object from client/taking reference
const appwriteClient = new Client();

//setting URL & projectID
appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwritProjectId);

//taking reference of Account
export const account = new Account(appwriteClient);

export class AppwriteService{
    //create a new record of user inside appwrite
    async createUserAccount({email, password, name}: CreateUserAccount){
        try {
            const userAccount = await account.create(ID.unique(), email, password, name);

            if(userAccount){
                return this.login({email, password})
            } else {
                return userAccount;
            }
        } catch (error:any) {
            throw error;
        }
    }

    //Login user
    async login({email, password} : LoginUserAccount){
        try {
            return await account.createEmailPasswordSession(email, password);
        } catch (error:any) {
            throw error;
        }
    }

    async isLoggedIn():Promise<boolean> {
        try {
            const data = await this.getCurrentUser();
            //if there is data then true, otherwise false
            return Boolean(data);
        } catch (error) {}
        return false;
    }

    async getCurrentUser() {
        try {
            // getting all details of current user
            return account.get();
        } catch (error) {
            console.log("getCurrentUser error: " +  error);
        }

        return null;
    }

    async logout() {
        try {
            //removes the current session
            return await account.deleteSession("current")
        } catch (error) {
            console.log("logout error: " +  error);
        }
    }
}

const appwriteService = new AppwriteService()

export default appwriteService;