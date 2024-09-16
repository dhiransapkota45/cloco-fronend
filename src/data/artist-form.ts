import { FieldDetails } from "./user-form";
import * as z from "zod";

export const artistFormDetails: FieldDetails[] = [
  {
    label: "Artist Name",
    name: "name",
    type: "text",
  },
  {
    label: "Date of Birth",
    name: "dob",
    type: "date",
  },
  {
    label: "Gender",
    name: "gender",
    type: "select",
    options: [
      { label: "Male", value: "m" },
      { label: "Female", value: "f" },
      { label: "Other", value: "o" },
    ],
  },
  {
    label: "Address",
    name: "address",
    type: "text",
  },
  {
    label: "First Release Year",
    name: "first_release_year",
    type: "number",
  },
  {
    label: "Number of Albums Released",
    name: "no_of_albums_released",
    type: "number",
  },
];

export const artistFormSchema = z.object({
  name: z.string().min(1, "Artist name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["m", "f", "o"]),
  address: z.string().min(1, "Address is required"),
  first_release_year: z
    .any()
    .refine((val) => Number(val) > 0, {
      message: "First release year is required",
    }),
  no_of_albums_released: z.any().optional(),
});
