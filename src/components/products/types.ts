import { Review } from '../reviews/types';

export type Product = {
	id: string | number;
	attributes: {
		Title: string;
		Description: string;
		Condition: string;
		Rating: string;
		On_Sale: boolean;
		slug: string;
		Variation: {
			Quantity: string;
			SKU: string;
			Price: string;
			Sale_Price: string;
		}[];
		Store: {
			data: {
				id: string;
				attributes: {
					Title: string;
					slug: string;
				};
			};
		};
		Featured_Image: {
			data: {
				attributes: {
					url: string;
				};
			};
		};
		Gallery: {
			data: {
				attributes: {
					url: string;
				};
			}[];
		};
		Tags: {
			data: {
				id: string;
				attributes: {
					Title: string;
					slug: string;
				};
			}[];
		};
		Reviews: {
			data: {
				attributes: Review[];
			};
		};
	};
};
