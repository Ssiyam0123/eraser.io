'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const EditorJS = dynamic(() => import('@editorjs/editorjs'), { ssr: false });

const Editor = () => {
  const editorInstance = useRef(null);
  const [editor, setEditor] = useState(null);

//   useEffect(() => {
//     if (typeof window !== 'undefined' && !editor) {
//       const newEditor = new EditorJS({
//         holder: 'editorjs-container',
//         tools: {
//           header: {
//             class: require('@editorjs/header'),
//             inlineToolbar: true,
//           },
//           list: {
//             class: require('@editorjs/list'),
//             inlineToolbar: true,
//           },
//           image: {
//             class: require('@editorjs/image'),
//             inlineToolbar: true,
//             config: {
//               uploader: {
//                 uploadByUrl: (url) => {
//                   return new Promise((resolve) => {
//                     resolve({
//                       success: 1,
//                       file: {
//                         url,
//                       },
//                     });
//                   });
//                 },
//               },
//             },
//           },
//         },
//       });
//       setEditor(newEditor);
//       editorInstance.current = newEditor;
//     }

//     // Cleanup on unmount
//     return () => {
//       if (editorInstance.current && typeof editorInstance.current.destroy === 'function') {
//         editorInstance.current.destroy();
//       }
//     };
//   }, [editor]);



useEffect(() => {
    if (typeof window !== 'undefined' && !editor) {
      const newEditor = new EditorJS({
        holder: 'editorjs-container',
        tools: {
          header: {
            class: require('@editorjs/header'),
            inlineToolbar: true,
          },
          list: {
            class: require('@editorjs/list'),
            inlineToolbar: true,
          },
          image: {
            class: require('@editorjs/image'),
            inlineToolbar: true,
            config: {
              uploader: {
                uploadByUrl: (url) => {
                  return new Promise((resolve) => {
                    resolve({
                      success: 1,
                      file: {
                        url,
                      },
                    });
                  });
                },
              },
            },
          },
        },
      });
      console.log('Editor initialized:', newEditor); // Debugging log
      setEditor(newEditor);
      editorInstance.current = newEditor;
    }
  }, [editor]);
  
  const saveContent = async () => {
    if (editorInstance.current) {
      const savedData = await editorInstance.current.save();
      console.log('Saved data:', savedData);
    }
  };

  return (
    <div>
      <div id="editorjs-container" style={{ minHeight: '500px', border: '1px solid #ccc' }}></div>
      <button onClick={saveContent}>Save Content</button>
    </div>
  );
};

export default Editor;
