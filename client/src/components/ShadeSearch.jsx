import Shade from "./Shade";
import React, { useState } from "react";
import { getBySearchText } from "../api/sanityClient";
import { Flex, Text, TextInput, ScrollArea, Title, Paper, Divider, Stack } from "@mantine/core";
import { useViewportSize } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import '@mantine/core/styles.css';

const icon = <IconSearch style={{ width: 16, height: 16 }} />;

function ShadeSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(["default"]);
  const [hasImage, setHasImage] = useState([]);
  const [noImage, setNoImage] = useState([]);

  const { height, width } = useViewportSize();
  const useWidth = width * 0.4;
  const useHeight = height * 0.75;
  const useHeight2 = height * 0.65;

  const handleSearch = () => {
    getBySearchText(searchTerm).then((data) => {
      console.log(data);
      setSearchResults(data);
      checkArrayForImage(data);
    });
  }

  const checkArrayForImage = (arr) => {
    const hasImage = arr.filter((item) => item.image);
    const noImage = arr.filter((item) => !item.image);
    setHasImage(hasImage);
    setNoImage(noImage);
    console.log("hasImage", hasImage);
    console.log("noImage", noImage);
  }


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log("searching for", searchTerm);
      handleSearch();
    }
  }

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      gap="md"
      wrap="nowrap"
    >
      <Stack align="center">
        <Title> Search for shades </Title>
        <Paper withBorder w={useWidth} h={useHeight} p={10}>
          <Stack gap="md">
            <TextInput
              placeholder="Search for a shade"
              rightSectionPointerEvents={() => handleSearch}
              rightSection={icon}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
              onKeyDown={handleKeyPress} />
            <ScrollArea h={useHeight2}>
              {searchResults.length === 0 ? (
                <Text>No results</Text>
              ) : searchResults[0] === "default" ? (
                <Text>Search shades from the box above</Text>
              ) : (hasImage.length > 0 && (
                hasImage.map((result) => (
                  <>
                    <Shade key={result._id} id={result._id} showLiked={true} />
                    <Divider />
                  </>
                ))
              ))
              }
              {noImage[0] !== "default" && (
                noImage.map((result) => (
                  <>
                    <Shade key={result._id} id={result._id} showLiked={true} />
                    <Divider />
                  </>
                ))
              )}
            </ScrollArea>
          </Stack>
        </Paper>
      </Stack>
    </Flex>
  );
}

export default ShadeSearch;