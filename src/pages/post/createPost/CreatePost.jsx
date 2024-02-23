import { Button, FileInput, Select, TextInput } from "flowbite-react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  return (
    <div className="min-h-screen p-4 max-w-3xl mx-auto ">
      <h1 className="text-2xl font-bold mb-4 text-center">Create a Post</h1>
      <div>
        <form className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <TextInput
              type="text"
              required
              placeholder="Title"
              className="flex-1"
            />
            <Select>
              <option value="uncategorized">Select A category</option>
              <option value="educational">Educational</option>
              <option value="entertainment">Entertainment</option>
              <option value="technology">Technology</option>
              <option value="political">Political</option>
              <option value="sports">Sports</option>
              <option value="history">History</option>
              <option value="Food">Food</option>
              <option value="culture">culture</option>
              <option value="travel">Travel</option>
              <option value="SoftwareEngineering"> Software Engeerning</option>
            </Select>
          </div>
          <div className="px-4 py-6 border-2 border-blue-600 border-dashed">
            <FileInput type="file" required accept="image/*" />
          </div>
          <ReactQuill theme="snow" placeholder="write your post" />
          <Button type="submit" outline gradientDuoTone="pinkToOrange">
            Create A post
          </Button>
        </form>
      </div>
    </div>
  );
}
