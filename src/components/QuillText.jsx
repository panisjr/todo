import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { GiWhiteBook } from "react-icons/gi";

const QuillText = () => {
    const editorRef = useRef(null);
    const toolbarRef = useRef(null); // Reference for custom toolbar

    useEffect(() => {
        if (editorRef.current && toolbarRef.current) {
            new Quill(editorRef.current, {
                modules: {
                    toolbar: {
                        container: toolbarRef.current, // Attach toolbar to custom container
                    },
                },
                theme: "snow",
            });
        }
    }, []);

    return (
        <div>
            {/* Custom Toolbar */}
            <div ref={toolbarRef}>
                <button className="ql-bold">adsfas</button>
                <button className="ql-italic"></button>
                <button className="ql-underline"></button>
                <button className="ql-strike"></button>
                <button className="ql-link"></button>
                <button className="ql-image"></button>
                <button className="ql-video"></button>
                <select className="ql-header">
                    <option value="1"></option>
                    <option value="2"></option>
                    <option selected></option>
                </select>
                <select className="ql-color"></select>
                <select className="ql-background"></select>
                <select className="ql-font"></select>
                <select className="ql-size">
                    <option value="small"></option>
                    <option selected></option>
                    <option value="large"></option>
                    <option value="huge"></option>
                </select>
                <select className="ql-align"></select>
                <button className="ql-clean"></button>
            </div>

            {/* Quill Editor */}
            <div ref={editorRef} className="h-[300px] bg-white text-black" />
        </div>
    );
};

export default QuillText;
