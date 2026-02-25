"use client";

import styled from "styled-components";

export const FormLabel = styled.label`
  display: block;
  font-size: 1.2rem;
`;

export const FormInput = styled.input`
  display: block;
  margin-block: 4px 20px;
  height: 40px;
  width: 300px;
  text-indent: 5px;
  font-size: 1.2rem;
  outline: none;
  border: none;
  border-bottom: 2px gray solid;
  background: hsl(0, 0%, 98%);

  &:disabled {
    background: hsl(0, 0%, 90%);
    border-color: black;
  }

  &.wide {
    width: 100%;
  }

  @media (max-width: 850px) {
    width: 100%;
  }
`;

export const FormTextArea = styled.textarea<{ height?: string }>`
  font-family: inherit;
  display: block;
  margin-block: 10px 20px;
  padding: 10px;
  min-height: ${(props) => props.height || "300"}px;
  width: 100%;
  max-width: 100%;
  text-indent: 5px;
  font-size: 1.2rem;
  border-radius: 3px;
  outline: none;
  border: 1px gray solid;
  background: transparent;

  &:disabled {
    background: hsl(36, 20%, 90%);
  }
`;

export const FormSelect = styled.select`
  display: block;
  height: 35px;
  margin-block: 10px 20px;
  text-indent: 5px;
  font-size: 1.2rem;
  border-radius: 5px;
  border: 1px gray solid;
  background: hsl(36, 47%, 98%);

  &:disabled {
    background: hsl(36, 20%, 90%);
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileInputLabel = styled.label`
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  margin-block: 5px 20px;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;

  .file-placeholder {
    height: 100%;
    display: flex;
    background-color: lightgray;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    transition: background 0.2s ease;
    color: whitesmoke;

    &:hover {
      background-color: hsl(0, 0%, 78%);
    }
  }

  .file-preview {
    height: 100%;
    width: 100%;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &:hover:after {
      content: "Click to change";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      color: white;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const ImagePreview = styled.div`
  width: 200px;
  height: 120px;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  &:hover:after {
    content: "Delete";
    color: red;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    color: white;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }
`;

export const AdditionalFilesContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 5px;

  label {
    margin: 0;
  }
`;

export const EditorContainer = styled.div`
  position: relative;
  margin-block: 15px;
`;
