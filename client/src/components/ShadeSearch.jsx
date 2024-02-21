import Shade from "./Shade";
import React, { useState } from "react";
import { getBySearchTerm } from "../api/getShadeInfo";
import { Flex, Text, TextInput, ScrollArea, Title, Paper, Divider } from "@mantine/core";
import { IconSearch } from '@tabler/icons-react';
import '@mantine/core/styles.css';

const icon = <IconSearch style={{ width: 16, height: 16 }} />;

function ShadeSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
      <Title>
        Search for shades
      </Title>
      <TextInput miw={500} placeholder="Search for a shade" rightSectionPointerEvents={handleSearch} rightSection={icon} value={searchTerm} onChange={(e) => setSearchTerm(e.currentTarget.value)} onKeyDown={handleKeyPress} />
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

export default ShadeSearch;