import { gql } from '@apollo/client';

export const BASE_REVIEW = gql`
	fragment BASE_REVIEW on Review {
		Message
		Rating
		Title
	}
`;

export const single_review_by_id = gql`
	${BASE_REVIEW}
	query ($id: ID!) {
		review(id: $id) {
			data {
				attributes {
					...BASE_REVIEW
					createdAt
				}
			}
		}
	}
`;

export const all_reviews_by_filter = (productId: string, storeSlug: string) => {
	let filters = '';

	if (productId !== '' && storeSlug === '') {
		filters += `Product:{id:{containsi:${productId}}}`;
	}

	if (storeSlug !== '' && productId === '') {
		filters += `Store:{slug: {contains:"${storeSlug}"}}`;
	}

	return gql`
    query {
     reviews(
         filters: {
            ${filters}
         }
         sort: "Rating"
     ) {
        data {
           id
           attributes {
              Rating
           }
        }
     }
  }
  `;
};

export const paginated_reviews = (productId: string, storeSlug: string) => {
	let filters = '';

	if (productId !== '') {
		filters += `Product:{id:{containsi:${productId}}}`;
	}

	if (storeSlug !== '' && productId === '') {
		filters += `Store:{slug: {contains:"${storeSlug}"}}`;
	}

	return gql`
    query (
    $page: Int
    $pageSize: Int
  ) {
     reviews(
        pagination: { page: $page, pageSize: $pageSize }
         filters: {
            ${filters}
         }
     ) {
        meta {
           pagination {
              total
              pageCount
              pageSize
              page
           }
        }
        data {
           id
        }
     }
  }
  `;
};
