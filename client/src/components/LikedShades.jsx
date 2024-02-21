import Shade from "./Shade";
import React, { useEffect, useState } from "react";
import { getAll } from "../api/vercelClient";
import { Flex, Text, TextInput, ScrollArea, Title, Paper, Divider } from "@mantine/core";
import { IconSearch } from '@tabler/icons-react';
import '@mantine/core/styles.css';


function LikedShades() {
  const [likedShades, setLikedShades] = useState([]);

  useEffect(() => {
    getAll().then((res) => {
      console.log("liked shades ", res.data);
      setLikedShades(res.data);
    });
  }, []);

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
          {likedShades.length > 0 ? (
            likedShades.map((result) => (
              <>
                <Shade key={result._id} id={result._id} />
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