import {
  Container,
  ListItemButton,
  ListItemText,
  Typography,
  Grid,
  TextField,
  Checkbox,
  Button,
  Select,
} from "@material-ui/core";
import { Formik, Field, Form, useField, FieldAttributes } from "formik";
import React from "react";
import Link from "next/link";
import * as yup from "yup";

//Name, Date. Active Boolean Switch, Age select from 1-70

export default function Question1() {
  const CustomTextField: React.FC<FieldAttributes<{}>> = ({
    placeholder,
    ...props
  }) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
      <TextField
        placeholder={placeholder}
        {...field}
        helperText={errorText}
        error={!!errorText}
      />
    );
  };

  const ageRange = [...new Array(70)].map((_, i) => i + 1);

  const validationSchema = yup.object({
    name: yup.string().required().max(20),
    age: yup.number().min(1),
  });

  return (
    <Container sx={{ pt: 2 }}>
      <Grid>
        <Link href="/" passHref>
          <ListItemButton component="a">
            <ListItemText>Back to Home</ListItemText>
          </ListItemButton>
        </Link>
        <Link href="/question2" passHref>
          <ListItemButton component="a">
            <ListItemText>Go to Question 2</ListItemText>
          </ListItemButton>
        </Link>
      </Grid>

      <Typography variant="h5">Question 1</Typography>

      <h1> Form</h1>
      <Formik
        initialValues={{ name: "", isActive: false, date: "", age: 0 }}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          console.log(data);
          setSubmitting(false);
          resetForm();
        }}
        validationSchema={validationSchema}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <CustomTextField placeholder="Name" name="name" />
            <div>
              <Field name="isActive" type="checkbox" as={Checkbox} /> Active
            </div>
            <div>
              <div>Date:</div>
              <Field placeholder="Date" name="date" type="date" />
            </div>
            <div>
              <div>Age: </div>
              <Field as="select" name="age">
                {/* need to add error message */}
                {ageRange.map((possAge) => {
                  return (
                    <option key={possAge} value={possAge}>
                      {possAge}
                    </option>
                  );
                })}
              </Field>
            </div>
            <div>
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
