import { Button, FileInput, Select, TextInput } from "flowbite-react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function CreatePost() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-3 text-center">Create Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-6 sm:flex-row justify-between">
          <TextInput
            type="text"
            className="flex-1"
            placeholder="title"
            id="title"
            required
          ></TextInput>
          <Select>
            <option value="uncategorized">Select a Category</option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="fashion">Fashion</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
            <option value="music">Music</option>
            <option value="art">Art</option>
            <option value="science">Science</option>
            <option value="history">History</option>
            <option value="politics">Politics</option>
            <option value="education">Education</option>
            <option value="health">Health</option>
            <option value="environment">Environment</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Sports</option>
          </Select>
        </div>
        <div className="flex gap-6 items-center justify-between border-4 border-teal-950 border-dotted p-4">
          <FileInput type="file" accept="image/*" />
          <Button type="button">Upload Image</Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="write relevent things"
          className="h-60 mb-16"
        />
        <Button type="submit">Upload Post</Button>
      </form>
    </div>
  );
}
