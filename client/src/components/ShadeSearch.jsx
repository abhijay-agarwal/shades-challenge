import Shade from "./Shade";
import React, { useState } from "react";
import { getBySearchTerm } from "../api/sanityClient";
import { Flex, Text, TextInput, ScrollArea, Title, Paper, Divider, Stack } from "@mantine/core";
import { useViewportSize } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import '@mantine/core/styles.css';

const icon = <IconSearch style={{ width: 16, height: 16 }} />;

function ShadeSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const { height, width } = useViewportSize();
  const useWidth1 = width * 0.45;
  const useWidth2 = width * 0.4;
  const useHeight1 = height * 0.75;
  const useHeight2 = height * 0.65;

  const handleSearch = () => {
    getBySearchTerm(searchTerm).then((data) => {
      console.log(data);
      setSearchResults(data);
    });
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
    >
      <Title> Search for shades </Title>
      <Paper withBorder w={useWidth1} h={useHeight1} p={10}>
        <Stack gap="md">
          <TextInput
            placeholder="Search for a shade"
            rightSectionPointerEvents={() => handleSearch}
            rightSection={icon}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            onKeyDown={handleKeyPress} />
          <ScrollArea h={useHeight2} type="always" >
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <>
                  <Shade key={result._id} id={result._id} />
                  <Divider />
                </>
              ))
            ) : (
              <Text>No results</Text>
            )}
          </ScrollArea>
        </Stack>
      </Paper>
    </Flex>
  );
}

export default ShadeSearch;