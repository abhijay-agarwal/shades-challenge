import { getById } from "../utils/sanityClient";
import { getLike, setLike, delLike } from "../utils/vercelClient";
import { conciseSummary } from "../utils/helpers";
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

  const { height, width } = useViewportSize();

  useEffect(() => {
    if (id) {
      getById(id).then((data) => {
        setTitle(data.title);
        setSummary(conciseSummary(data.summary));
        setImage(data.image);
      });
    }
    getLike(id).then((data) => {
      if (data.data === 1) {
        setLikedState(true);
      } else {
        setLikedState(false);
      }
    });
  }, [id]);

  const handleSwitch = async (e) => {
    setLikedState(e.target.checked);
    try {
      const isChecked = e.target.checked;
      const response = isChecked ? await setLike(id) : await delLike(id);
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
      maw={width * 0.35}
      mah={height * 0.25}
    >
      <Image maw={100} src={image ? image : "https://seeeff-prod-static-images.imgix.net/shades_logo.png"} />
      <Stack w={width * 0.3}>
        <Title>{title}</Title>
        <Text style={{ fontSize: 12 }}>{summary}</Text>
      </Stack>
      {showLiked && <Switch size="lg" checked={likedState} onLabel="LIKED" onChange={handleSwitch} />}
      {/* <input type="checkbox" checked={likedState} onChange={handleSwitch} style={{ size: 50 }} /> */}
    </Flex>
  );
}

export default Shade;