import { type Metadata } from 'next';
import { fetchClient } from '@/common/fetch';
import { graphql } from '@/common/graphql';
import { Child, collectionFragment } from '@/views/Child';
import { Box } from '@mui/material';

export const metadata: Metadata = {
  title: 'Best Ecommerce Suite Solution | Hyperse',
  description:
    'Hyperse, One of the best ecommerce suite partners, dedicated to support and prospering the ecommerce industry globally. So Hurry up and grab your opportunities.',
};

const Collection = graphql(
  `
    query Collection($options: CollectionListOptions!) {
      collections(options: $options) {
        items {
          ...ChildCollection
        }
      }
    }
  `,
  [collectionFragment]
);

export default async function Home() {
  const { data } = await fetchClient.query({
    query: Collection,
    variables: {
      options: {
        take: 10,
        skip: 0,
      },
    },
  });

  return (
    <Box>
      hello hyperse
      <Box>
        {data.collections.items.map((s) => {
          return <Child key={s.id} item={s}></Child>;
        })}
      </Box>
    </Box>
  );
}
