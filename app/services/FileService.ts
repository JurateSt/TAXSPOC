import fs from 'fs';
import S3Service from '#services/S3Service';

export default new (class FileService {
	private bucketName: string;
	constructor() {
		this.bucketName = process.env.AWS_BUCKET_NAME || '';
	}
	private checkBucketName(): boolean {
		if (!this.bucketName) {
			console.error('S3: Bucket name not found in environment variables');
			return false;
		}
		return true;
	}

	async upload(images: any[], article: any): Promise<any[]> {
		const articleImages: any[] = [];
		if (!images || images.length === 0) {
			console.error('S3: No images provided for upload');
			return articleImages;
		}
		if (!this.checkBucketName()) return articleImages;

		for (const image of images) {
			const randomSix = Math.floor(100000 + Math.random() * 900000);
			const fileName = `${article._id}-${randomSix}.${image.extname}`;
			console.log('IMAGE', image);

			try {
				if (!image.tmpPath) {
					console.error('S3: No tmpPath available for the uploaded file');
					continue;
				}
				const stream = fs.createReadStream(image.tmpPath);
				const url = await S3Service.uploadFile(this.bucketName, fileName, stream);
				articleImages.push({
					url,
					originalName: image.clientName,
				});
			} catch (error) {
				console.error('S3: Failed to upload image', error);
			}
		}
		return articleImages;
	}

	async uploadAuthor(image: any): Promise<any> {
		const uploadedImage: any = {};
		if (!image) {
			console.error('S3: No images provided for upload');
			return;
		}
		if (!this.checkBucketName()) return uploadedImage;

		// const randomSix = Math.floor(100000 + Math.random() * 900000);
		const fileName = `authors/${image.clientName}`;

		try {
			if (!image.tmpPath) {
				console.error('S3: No tmpPath available for the uploaded file');
				return uploadedImage;
			}
			const stream = fs.createReadStream(image.tmpPath);
			const url = await S3Service.uploadAuthorImage(this.bucketName, fileName, stream);
			return url;
		} catch (error) {
			console.error('S3: Failed to upload image', error);
		}
	}

	async deleteImage(article: any, imageUrl: string): Promise<any> {
		const articleImages = article?.images || [];
		const imageIndex = articleImages.findIndex((item: any) => item.url === imageUrl);

		if (!this.checkBucketName()) return article;

		if (imageIndex !== -1) {
			const image = articleImages[imageIndex];
			await S3Service.deleteFile(this.bucketName, image.url.split('/').pop()!);
			articleImages.splice(imageIndex, 1);
			article!.images = articleImages;
			await article?.save();
		}

		return article;
	}

	async deleteAllImages(article: any): Promise<void> {
		const articleImages = article?.images || [];

		if (!this.bucketName) {
			console.error('S3: Bucket name not found in environment variables');
			return;
		}

		for (const image of articleImages) {
			await S3Service.deleteFile(this.bucketName, image.url.split('/').pop()!);
		}
	}

	//authors
	async deleteAuthorImage(author: any): Promise<any> {
		if (!author || !author.image) {
			throw new Error('Author or image data not found');
		}

		if (!this.checkBucketName()) {
			return author;
		}

		const { url, originalUrl } = author.image;
		if (url) {
			await S3Service.deleteAuthor(this.bucketName, url.split('/').pop()!);
		}

		if (originalUrl) {
			await S3Service.deleteAuthor(this.bucketName, originalUrl.split('/').pop()!);
		}

		author.image = {};

		await author.save();

		return author;
	}

	async deleteAllAuthor(author: any): Promise<any> {
		if (!author || !author.image) {
			throw new Error('Author or image data not found');
		}

		if (!this.checkBucketName()) {
			return author;
		}

		const { url, originalUrl } = author.image;
		if (url) {
			await S3Service.deleteAuthor(this.bucketName, url.split('/').pop()!);
		}

		if (originalUrl) {
			await S3Service.deleteAuthor(this.bucketName, originalUrl.split('/').pop()!);
		}
	}
})();
