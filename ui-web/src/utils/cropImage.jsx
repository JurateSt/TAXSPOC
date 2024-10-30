export default async function cropImage(imageSrc, croppedAreaPixels, rotation = 0) {
	console.log('cropImage', croppedAreaPixels);
	const createImage = (url) =>
		new Promise((resolve, reject) => {
			const image = new Image();
			image.crossOrigin = 'anonymous';
			image.src = url;
			image.onload = () => resolve(image);
			image.onerror = (error) => reject(error);
		});

	const image = await createImage(imageSrc);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	if (!ctx) {
		return null;
	}

	// Calculate the rotation in radians
	const rotRad = (rotation * Math.PI) / 180;

	// const safeArea = Math.max(image.width, image.height) * 2;
	// Calculate the bounding box of the rotated image
	const safeAreaWidth =
		Math.abs(Math.cos(rotRad) * image.width) + Math.abs(Math.sin(rotRad) * image.height);
	const safeAreaHeight =
		Math.abs(Math.sin(rotRad) * image.width) + Math.abs(Math.cos(rotRad) * image.height);

	// Set the canvas to the calculated bounding box size
	canvas.width = safeAreaWidth;
	canvas.height = safeAreaHeight;

	// Translate to center of canvas, apply rotation, and translate back
	ctx.translate(safeAreaWidth / 2, safeAreaHeight / 2);
	ctx.rotate(rotRad);
	ctx.translate(-image.width / 2, -image.height / 2);

	// Draw the rotated image on the canvas
	ctx.drawImage(image, 0, 0);

	// Create a second canvas for the cropped area
	const croppedCanvas = document.createElement('canvas');
	const croppedCtx = croppedCanvas.getContext('2d');

	if (!croppedCtx) {
		return null;
	}

	// Set the size of the cropped canvas
	croppedCanvas.width = croppedAreaPixels.width;
	croppedCanvas.height = croppedAreaPixels.height;

	// Draw the cropped area from the main canvas onto the cropped canvas
	croppedCtx.drawImage(
		canvas,
		croppedAreaPixels.x,
		croppedAreaPixels.y,
		croppedAreaPixels.width,
		croppedAreaPixels.height,
		0,
		0,
		croppedAreaPixels.width,
		croppedAreaPixels.height
	);

	// Return the cropped image as a blob
	return new Promise((resolve) => {
		croppedCanvas.toBlob((blob) => {
			resolve(blob);
		}, 'image/jpeg');
	});
}
