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

export type OptionProps = { id: string; text: string };

export type DropdownProps = Omit<TextInputProps, "input"> & {
  options: OptionProps[];
  onSelect: (n: string) => void;
};

export type MultiSelectDropdownProps = Omit<DropdownProps, "onSelect"> & {
  input?: InputProps;
  onSelect: (n: OptionProps[]) => void;
  selected: OptionProps[];
  setSelected: Dispatch<SetStateAction<OptionProps[]>>;
};