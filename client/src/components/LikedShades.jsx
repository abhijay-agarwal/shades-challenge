import Shade from "./Shade";
import React, { useState } from "react";
import { getBySearchTerm } from "../api/getShadeInfo";
import { Flex, Text, TextInput, ScrollArea, Title, Paper, Divider } from "@mantine/core";
import { IconSearch } from '@tabler/icons-react';
import '@mantine/core/styles.css';


function LikedShades() {
  const [likedShades, setLikedShades] = useState([]);



  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      gap="md"
    >
      <Title>
        Liked shades
      </Title>
      <Paper withBorder miw={500} p={10}>
        <ScrollArea type="always" h={750} >
          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <>
                <Shade key={result._id} data={result} />
                <Divider />
              </>
            ))
          ) : (
            <Text>No results</Text>
          )}
        </ScrollArea>
      </Paper>
    </Flex>
  );
}

export default LikedShades;