import {
  Dispatch,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  SetStateAction,
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
  onSelect: (n: string) => void;
};

export type MultiSelectDropdownProps = Omit<DropdownProps, "onSelect"> & {
  input?: InputProps;
  onSelect: (n: string[]) => void;
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
};