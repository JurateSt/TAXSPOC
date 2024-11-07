import AWS from 'aws-sdk';

export default new (class S3Service {
	private s3: AWS.S3;

	constructor() {
		this.s3 = new AWS.S3({
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			region: process.env.AWS_REGION,
			endpoint: process.env.AWS_ENDPOINT,
		});
	}

	public async uploadFile(bucket: string, key: string, body: any) {
		const params = {
			Bucket: bucket,
			Key: `articles/images/${key}`,
			Body: body,
			ACL: 'public-read',
		};

		try {
			const response = await this.s3.upload(params).promise();

			return response.Location;
		} catch (error) {
			console.error(error);
		}
	}

	async uploadAuthorImage(bucket: string, key: string, body: any) {
		const params = {
			Bucket: bucket,
			Key: key,
			Body: body,
			ACL: 'public-read',
		};

		try {
			const response = await this.s3.upload(params).promise();

			return response.Location;
		} catch (error) {
			console.error(error);
		}
	}

	async deleteFile(bucket: string, key: string) {
		const params = {
			Bucket: bucket,
			Key: `articles/images/${key}`,
		};

		try {
			await this.s3.deleteObject(params).promise();
		} catch (error) {
			console.error(error);
		}
	}

	async deleteAuthors(bucket: string, key: string) {
		const params = {
			Bucket: bucket,
			Key: `articles/images/${key}`,
		};

		try {
			await this.s3.deleteObject(params).promise();
		} catch (error) {
			console.error(error);
		}
	}
})();
