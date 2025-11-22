
require('dotenv').config();
const { S3Client, PutObjectCommand, ListBucketsCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const mime = require('mime-types');

// 1. Configure the S3 Client
const s3Client = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME;
const PUBLIC_R2_URL = process.env.R2_PUBLIC_URL;

// 2. Function to List Buckets
const listBuckets = async () => {
    try {
        console.log("Attempting to list buckets to verify credentials and names...");
        const { Buckets } = await s3Client.send(new ListBucketsCommand({}));
        
        if (!Buckets || Buckets.length === 0) {
            console.log("Could not find any buckets. Please check your token permissions.");
            return [];
        }

        const bucketNames = Buckets.map(b => b.Name);
        console.log("Successfully listed available buckets:");
        console.log(bucketNames.join('\n'));
        return bucketNames;

    } catch (error) {
        console.error("Error listing buckets:", error.message);
        console.error("This might be a permission issue. Please ensure your R2 API token has 'List All Buckets' permission.");
        throw error;
    }
};

// 3. Function to Upload a Single File
const uploadFileToR2 = async (filePath, originalRelativePath) => {
    const fileStream = fs.createReadStream(filePath);
    const contentType = mime.lookup(filePath) || 'application/octet-stream';
    const key = `images/${originalRelativePath.replace(/\\/g, '/')}`;

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: fileStream,
        ContentType: contentType,
        ACL: 'public-read',
    });

    try {
        await s3Client.send(command);
        const fileUrl = `${PUBLIC_R2_URL}/${key}`;
        console.log(`Successfully uploaded ${originalRelativePath} to ${fileUrl}`);
        return fileUrl;
    } catch (error) {
        // We already know the bucket exists from the check, so this error is likely something else.
        console.error(`Error uploading ${originalRelativePath}:`, error.message);
        throw error;
    }
};

// 4. Main Migration Logic
const migrateImages = async () => {
    try {
        // Step 1: List buckets and find the correct one
        const availableBuckets = await listBuckets();

        // Step 2: Check if the bucket specified in .env exists
        if (!availableBuckets.includes(BUCKET_NAME)) {
            console.error(`---`);
            console.error(`CRITICAL ERROR: The bucket named '${BUCKET_NAME}' was not found!`);
            console.error(`Please check the R2_BUCKET_NAME in your .env file and make sure it matches one of the available buckets listed above.`);
            console.error(`---`);
            // Stop execution if bucket not found
            process.exit(1); 
        }

        console.log(`Bucket '${BUCKET_NAME}' confirmed. Starting image migration...`);

        // Step 3: Proceed with migration
        const imageDir = path.join(__dirname, '..', 'src', 'assets', 'images');
        const imagePaths = glob.sync('**/*', { cwd: imageDir, nodir: true });

        if (imagePaths.length === 0) {
            console.log("No images found to migrate.");
            return;
        }

        for (const imagePath of imagePaths) {
            const fullPath = path.join(imageDir, imagePath);
            await uploadFileToR2(fullPath, imagePath);
        }

    } catch (error) {
        // The error from listBuckets is already handled, so this will catch other issues.
        console.error('Image migration process failed.', error.message);
        process.exit(1);
    }
};

// 5. Run the migration
migrateImages().then(() => {
    console.log('Image migration process finished successfully.');
}).catch(error => {
    // This catch is for any unhandled promise rejections, though we tried to handle them inside.
    console.error('An unexpected error occurred during the migration process.');
});
