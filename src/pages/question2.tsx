import {
  Container,
  Grid,
  ListItemButton,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React from "react";
import Link from "next/link";

//using interface to make sure incoming Obj is of correct structure
interface NameObj {
  id: string;
  name: string;
}
//includes 2 proper entires and 2 error entries
let testData = [
  { id: "1", name: "test1" },
  { id: "2", name: "test2" },
  { id: "3", firstName: "test3" },
  { test: "4", name: "test4" },
];

type finalDataEntry = {
  id: string;
};

let finalData: Array<Object> = [];

//checking to see if object has the right format to be processed
function instaceOfNameObj(object: any): object is NameObj {
  return "id" in object && "name" in object;
}

export default function Question2() {
  function handleData(data: Array<Object>) {
    data.forEach((entry) => {
      if (instaceOfNameObj(entry)) {
        const newId = entry.id;
        const newVal = entry.name;
        let newEntry = {} as finalDataEntry;
        newEntry.id = newVal;
        finalData.push(newEntry);
        console.log(finalData);
      } else {
        console.log(entry, "Error, this entry is not formatted correctly");
      }
    });
  }

  return (
    <Container sx={{ pt: 2 }}>
      <Grid>
        <Link href="/question1" passHref>
          <ListItemButton component="a">
            <ListItemText>Go to Question 1</ListItemText>
          </ListItemButton>
        </Link>
        <Link href="/question3" passHref>
          <ListItemButton component="a">
            <ListItemText>Go to Question 3</ListItemText>
          </ListItemButton>
        </Link>
      </Grid>
      <Typography variant="h5">Question 2</Typography>
      <button onClick={() => handleData(testData)}>Convert Data</button>
    </Container>
  );
}
