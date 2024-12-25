import type { PropsWithChildren } from 'react';
import { fetchClient } from '@/common/fetch';
import { graphql } from '@/common/graphql';
import { Child, collectionFragment } from '@/views/Child';
import { Box, Divider } from '@mui/material';
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

export default async function Layout({
  children,
}: PropsWithChildren<PageProps>) {
  const { data } = await fetchClient.query({
    query: Collection,
    variables: {
      options: { skip: 0, take: 10 },
    },
    context: {},
  });
  const { items } = data.collections;
  return (
    <Box>
      {items.map((child) => {
        return <Child item={child} key={child.id} />;
      })}
      <Divider>Children </Divider>
      {children}
    </Box>
  );
}
