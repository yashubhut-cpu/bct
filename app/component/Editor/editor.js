/* Imports */
import React, { useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

/*functions*/
export default function Home() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const config = useMemo(
    () => ({
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
      },
      removePlugins: ["about"],
      statusbar: false,
    }),
    []
  );

  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <>
      <JoditEditor
        ref={editor} //This is important
        value={content} //This is important
        config={config} //Only use when you declare some custom configs
        onChange={handleChange} //handle the changes
        className="w-full h-[70%] mt-10 bg-white"
      />
      <style>
        {`.jodit-wysiwyg{height:300px !important}
          .jodit-wysiwyg{background: #1c2546 !important}
          .jodit-container.jodit.jodit_theme_default.jodit-wysiwyg_mode.w-full.h-\[70\%\].mt-10.bg-white {
                background-color: #f5f5f6;
                border: 1px solid #999;
                border-radius: 12px;
            }
          .jodit-ui-group_separated_true:not(:last-child):not(.jodit-ui-group_before-spacer_true):after {
                border-left: 0;
                border-right: 1px solid #999;
                content: "";
                cursor: default;
                margin: 2px;
                padding: 0;
            }
          .jodit-toolbar-editor-collection_mode_horizontal:after{
                background-color: transparent;
                bottom: 0;
                content: "";
                display: block;
                height: 1px;
                left: 0;
                position: absolute;
                width: 100%;
            }
          .jodit-toolbar__box:not(:empty) .jodit-toolbar-editor-collection:after{
                background-color: #1c2546;
            }
          .jodit-toolbar-button__trigger svg{
                width: calc(14px - 4px);
                background: white;
            }
          .jodit-container:not(.jodit_inline){
                border: 1px solid #999;
                border-radius: 3px;
                margin-top: 10px
            }
          .jodit-toolbar__box:not(:empty):not(:empty) {
                background-color: #1c2546;
            }
          .jodit-toolbar__box:not(:empty){
                background-color: #1c2546;
                border-bottom: 1px solid #999;
                border-radius: 3px 3px 0 0;
                position: relative;
            }
          .jodit-icon{
                fill: white;
            }
           p {
            color: white;
            }
          .jodit-toolbar-button__button:hover:not([disabled]){
                background-color: transparent;
                opacity: 1;
                outline: 0;
            }
        `}
      </style>
    </>
  );
}
