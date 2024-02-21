import Shade from "./Shade";
import React, { useEffect, useState } from "react";
import { getAll } from "../api/vercelClient";
import { Flex, Text, TextInput, ScrollArea, Title, Paper, Divider } from "@mantine/core";
import { useViewportSize } from '@mantine/hooks';
import '@mantine/core/styles.css';


function LikedShades() {
  const [likedShades, setLikedShades] = useState([]);

  const { height, width } = useViewportSize();
  const useWidth1 = width * 0.45;
  const useHeight1 = height * 0.75;

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
      direction="row"
      gap="md"
      wrap="wrap"
    >
      <Title> Liked shades </Title>
      <Paper withBorder w={useWidth1} h={useHeight1} p={10}>
        <ScrollArea type="always" h={useHeight1} >
          {likedShades.length > 0 ? (
            likedShades.map((id) => (
              <>
                <Shade key={id} id={id} />
                <Divider />
              </>
            ))
          ) : (
            <Text>No liked shades</Text>
          )}
        </ScrollArea>
      </Paper>
    </Flex>
  );
}

export default LikedShades;