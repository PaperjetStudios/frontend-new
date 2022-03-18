import { Button } from '@mui/material';
import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import { currentApi } from '../../config/config';
import Box from '../box';
import { Icons } from '../icons';
import Loader from '../loader';
import { Product } from './types';

import _ from 'lodash';

type Props = {
	className?: string;
	product: Product;
};

type GalleryImage = {
	url: string;
};

export const ProductGallery: FC<Props> = ({ product }) => {
	const [currentImage, setCurrentImage] = useState<number>(0);
	const [currentGallery, setCurrentGallery] = useState<GalleryImage[]>();

	useEffect(() => {
		if (product.attributes.Gallery.data.length > 0) {
			const galleryImages: GalleryImage[] = product.attributes.Gallery.data.map(img => {
				if (img.attributes.url !== '') {
					return { url: img.attributes.url };
				} else {
					return { url: '' };
				}
			});

			if (product.attributes.Featured_Image.data.attributes.url !== '') {
				galleryImages.push({
					url: product.attributes.Featured_Image.data.attributes.url,
				});
			}

			setCurrentGallery(_.reverse(galleryImages));
		}
	}, [product]);

	if (!currentGallery) {
		return <Loader />;
	}

	const len = currentGallery.length;

	const changeImage = (delta: number) => {
		const newDelta = currentImage + delta;
		if (newDelta === len) {
			setCurrentImage(0);
		} else if (newDelta > -1 && newDelta < len) {
			setCurrentImage(delta + currentImage);
		} else if (newDelta < 0) {
			setCurrentImage(len - 1);
		}
	};

	return (
		<Box>
			<Box className='relative border-grey border bg-grey-light pb-1/4 overflow-hidden min-h-[400px] md:min-h-[520px] md:max-w-[600px] w-full flex justify-items-center align-items-center'>
				<img
					className='object-center object-contain w-full h-full absolute top-0 bottom-0'
					src={`${currentApi.url + currentGallery[currentImage].url}`}
					alt={product.attributes.Title}
				/>
				<Box className='absolute items-end flex justify-end gap-2 w-full  right-7 bottom-7'>
					{len > 1 && (
						<>
							<Button
								className='shadow-md h-10 w-10'
								sx={{
									background: '#fff',
								}}
								onClick={() => {
									changeImage(-1);
								}}>
								{Icons.chevron.left}
							</Button>
							<Button
								className='bg-white shadow-md h-10 w-10'
								sx={{
									background: '#fff',
								}}
								onClick={() => {
									changeImage(1);
								}}>
								{Icons.chevron.right}
							</Button>
						</>
					)}
				</Box>
			</Box>

			<Box className='flex mt-5 gap-5'>
				{currentGallery.map((img, ind) => {
					return (
						<Box key={`gallery_${ind}`}>
							<GalleryThumbnail
								active={ind === currentImage}
								key={`${product.attributes.slug}_${ind}`}
								alt={`${product.attributes.slug}_${ind}`}
								imageUrl={img.url}
								onClick={() => {
									setCurrentImage(ind);
								}}
							/>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

type ThumbnailProps = {
	imageUrl: string;
	alt: string;
	onClick: () => void;
	active: boolean;
};

export const GalleryThumbnail: FC<ThumbnailProps> = ({ imageUrl, alt, active, onClick }) => {
	return (
		<Box
			onClick={onClick}
			className={classNames(
				'border-2 cursor-pointer bg-grey-light',
				{ 'border-dark': active },
				{ 'border-grey-light': !active }
			)}>
			<img className='object-center w-20' src={`${currentApi.url + imageUrl}`} alt={alt} />
		</Box>
	);
};
