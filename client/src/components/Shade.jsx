import { getById } from "../api/sanityClient";
import { getLike, setLike, delLike } from "../api/vercelClient";
import React, { useState, useEffect } from "react";
import { Group, Text, Image, Stack, Switch, Title } from "@mantine/core";
import { useLikedShades } from "../context/LikedShadesContext";
import '@mantine/core/styles.css';

function Shade({ id }) {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [likedState, setLikedState] = useState(false);

  const { refreshLikedShades } = useLikedShades();

  useEffect(() => {
    if (id) {
      console.log(id);
      getById(id).then((data) => {
        console.log(data);
        setTitle(data.title);
        const rawSummary = data.summary;
        const wordLimit = 50;
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
    <Group grow maw={500} gap="md" p={10}>
      <Image mah={200} src={image ? image : "https://images.bannerbear.com/direct/XNblonZr44E1Prw7v3/requests/000/016/445/892/w0gWbdEPaYaoqwxZ6rVklOA5j/c30f70a3dfd2385daf733f0dbae4793e2818ebba.png"} />
      <Stack miw={250}>
        <Title>{title}</Title>
        <Text style={{ fontSize: 12 }}>{summary}</Text>
      </Stack>
      <Switch size="xl" checked={likedState} onLabel="LIKED" onChange={handleSwitch} />
    </Group>
  );
}

export default Shade;