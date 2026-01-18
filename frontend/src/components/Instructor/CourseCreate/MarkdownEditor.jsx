import React, { useState } from "react";
import MDEditor from '@uiw/react-md-editor';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MarkdownEditor = ({ value, onChange }) => {
  return (
    <div className="w-full font-sans">
      <div className="mb-4 flex items-center justify-between">
        <label className="text-sm font-bold text-gray-700 block">Lesson Content (Markdown)</label>
        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full uppercase tracking-wider">
          Live Preview Active
        </span>
      </div>

      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white" data-color-mode="light">
        <MDEditor
          value={value}
          onChange={onChange}
          preview="live"
          height={500}
          visibleDragbar={false}
          className="upskillr-mde"
          textareaProps={{
            placeholder:"Start Typing Lesson Content using Markdown Syntax here ... ",
            autoFocus:true
          }}
        />
      </div>
      
      <p className="mt-2 text-[10px] text-gray-400 font-medium italic">
        * Use markdown for headers, bold text, and code blocks.
      </p>
    </div>
  );
};

export default MarkdownEditor;