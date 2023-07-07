import {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export type InputProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement> &
    InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  type?: HTMLInputTypeAttribute | "textarea";
};

export type TextInputProps = {
  input: InputProps;
  label?: string;
  inputCls?: string;
  containerCls?: string;
};

export type DropdownProps = Omit<TextInputProps, "input"> & {
  options: string[];
};