import Shade from "./Shade";
import React, { useEffect, useState } from "react";
import { getByAbstractSearchText } from "../utils/sanityClient";
import { checkArrayForImage } from "../utils/helpers";
import { Flex, Text, TextInput, ScrollArea, Title, Paper, Divider, Stack } from "@mantine/core";
import { useViewportSize } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import '@mantine/core/styles.css';

const icon = <IconSearch style={{ width: 16, height: 16 }} />;

function ShadeSearch() {
  const [queryString, setQueryString] = useState('');
  const [searchResults, setSearchResults] = useState(["default"]);
  const [hasImage, setHasImage] = useState([]);
  const [noImage, setNoImage] = useState([]);

  // const [partitioned, setPartitioned] = useState([]);


  // useEffect(() => {
  //   if (searchResults.length > 0) {
  //     const partitionedResults = partition(searchResults, queryString);
  //     console.log("partitionedResults", partitionedResults);
  //     setPartitioned(partitionedResults);
  //   } else {
  //     setPartitioned([]);
  //   }
  // }, [searchResults]);

  // useEffect(() => {
  //   if (partitioned) {
  //     checkArrayForImage(partitioned);
  //   }
  // }, [partitioned]);

  const { height, width } = useViewportSize();
  const useWidth = width * 0.4;
  const useHeight = height * 0.75;
  const useHeight2 = height * 0.65;

  const handleSearch = () => {
    getByAbstractSearchText(queryString).then((data) => {
      console.log(data);
      setSearchResults(data);
      const [hasImage, noImage] = checkArrayForImage(data);
      setHasImage(hasImage);
      setNoImage(noImage);
    });
  }


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log("searching for", queryString);
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
              value={queryString}
              onChange={(e) => setQueryString(e.currentTarget.value)}
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