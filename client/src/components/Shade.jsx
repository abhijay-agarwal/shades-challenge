import { getOneTest, getById } from "../api/getShadeInfo";
import { getLike, setLike, delLike } from "../api/vercelClient";
import React, { useState, useEffect } from "react";
import { Paper, Group, Text, Image, Stack, Switch, Title } from "@mantine/core";
import '@mantine/core/styles.css';

function Shade({ data }) {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [likedState, setLikedState] = useState(false);

  useEffect(() => {
    if (data) {
      console.log(data);
      setTitle(data.title);
      const rawSummary = data.summary;
      const wordLimit = 50;
      const cappedSummary = rawSummary.split(' ').slice(0, wordLimit).join(' ') + '...';
      setSummary(cappedSummary);
      setImage(data.image);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      getLike(data._id).then((res) => {
        console.log("LIKED?: ", res.data);
        res.data && setLikedState(true);
      });
    }
  }, [data]);

  const handleSwitch = async (e) => {
    try {
      const isChecked = e.target.checked;
      const response = isChecked ? await setLike(data._id, true) : await delLike(data._id);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setLikedState(e.target.checked);
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