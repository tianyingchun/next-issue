import type { FragmentOf } from 'gql.tada';
import { graphql } from '@/common/graphql';
import { Box } from '@mui/material';

export const collectionFragment = graphql(`
  fragment ChildCollection on Collection {
    id
    parentId
    name
  }
`);

type ChildProps = {
  item: FragmentOf<typeof collectionFragment>;
};

export const Child = ({ item }: ChildProps) => {
  return <Box>{item.name}</Box>;
};
