import Shade from "./Shade";
import React, { useEffect, useState } from "react";
import { getAll } from "../api/vercelClient";
import { Flex, Text, Stack, ScrollArea, Title, Paper, Divider } from "@mantine/core";
import { useViewportSize } from '@mantine/hooks';
import { useLikedShades } from "../context/LikedShadesContext";
import '@mantine/core/styles.css';


function LikedShades() {
  const { likedShades, refreshLikedShades } = useLikedShades();

  const { height, width } = useViewportSize();
  const useWidth = width * 0.4;
  const useHeight = height * 0.75;
  const useHeight2 = height * 0.7;

  useEffect(() => {
    refreshLikedShades();
  }, []);

  return (
    <Flex
      justify="center"
      align="center"
      direction="row"
      gap="md"
      wrap="nowrap"
    >
      <Stack align="center">
        <Title> Liked shades </Title>
        <Paper withBorder w={useWidth} h={useHeight} p={10}>
          <ScrollArea h={useHeight2} >
            {likedShades.length > 0 ? (
              likedShades.map((id) => (
                <>
                  <Shade key={id} id={id} showLiked={false} />
                  <Divider />
                </>
              ))
            ) : (
              <Text>No liked shades</Text>
            )}
          </ScrollArea>
        </Paper>
      </Stack>
    </Flex>
  );
}

export default LikedShades;