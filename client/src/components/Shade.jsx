import { getById } from "../api/sanityClient";
import { getLike, setLike, delLike } from "../api/vercelClient";
import React, { useState, useEffect } from "react";
import { Flex, Group, Text, Image, Stack, Switch, Title } from "@mantine/core";
import { useLikedShades } from "../context/LikedShadesContext";
import { useViewportSize } from '@mantine/hooks';
import '@mantine/core/styles.css';

function Shade({ id, showLiked }) {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [likedState, setLikedState] = useState(false);

  const { refreshLikedShades } = useLikedShades();

  const { width } = useViewportSize();

  useEffect(() => {
    if (id) {
      console.log(id);
      getById(id).then((data) => {
        console.log(data);
        setTitle(data.title);
        const rawSummary = data.summary;
        const wordLimit = 75;
        const cappedSummary = rawSummary.split(' ').slice(0, wordLimit).join(' ') + '...';
        setSummary(cappedSummary);
        setImage(data.image);
      });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getLike(id).then((res) => {
        console.log("LIKED?: ", res.data);
        res.data && setLikedState(true);
      });
    }
  }, [id]);

  const handleSwitch = async (e) => {
    setLikedState(e.target.checked);
    try {
      const isChecked = e.target.checked;
      const response = isChecked ? await setLike(id, true) : await delLike(id);
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    refreshLikedShades();
  };

  return (
    <Flex
      justify="center"
      align="center"
      direction="row"
      gap="md"
      wrap="nowrap"
      py={10}
    >
      <Image maw={100} src={image ? image : "https://seeeff-prod-static-images.imgix.net/shades_logo.png"} />
      <Stack w={width * 0.3}>
        <Title>{title}</Title>
        <Text style={{ fontSize: 12 }}>{summary}</Text>
      </Stack>
      {showLiked && <Switch size="xl" checked={likedState} onLabel="LIKED" onChange={handleSwitch} />}
      {/* <input type="checkbox" checked={likedState} onChange={handleSwitch} style={{ size: 50 }} /> */}
    </Flex>
  );
}

export default Shade;