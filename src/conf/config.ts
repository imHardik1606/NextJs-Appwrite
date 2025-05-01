// gets you confirm that env variable will be available
const conf = {
    appwriteUrl : String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    appwritProjectId : String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
}

export default conf;