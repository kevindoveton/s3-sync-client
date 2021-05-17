async function emptyBucket(bucket) {
    const bucketObjects = await this.listBucketObjects(bucket);
    const keysToDelete = Array.from(bucketObjects.keys());
    await this.deleteBucketObjects(bucket, keysToDelete);
}

module.exports = emptyBucket;