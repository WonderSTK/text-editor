import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { RootState } from '../store/store';
import { closeTab, setActiveTab, updateFileContent } from '../store/editorSlice';

const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const { nodes, tabs, activeTabId } = useSelector((state: RootState) => state.editor);

  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  const activeFile = activeTab
    ? nodes.find((node) => node.type === 'file' && node.id === activeTab.fileId)
    : null;

  const handleTabClick = (tabId: string) => {
    dispatch(setActiveTab(tabId));
  };

  const handleTabClose = (tabId: string) => {
    dispatch(closeTab(tabId));
  };

  const handleContentChange = (content: string) => {
    if (activeFile) {
      dispatch(updateFileContent({ fileId: activeFile.id, content }));
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-[#1e1e1e]">
      {tabs.length > 0 && (
        <div className="flex bg-[#252526] border-b border-[#3c3c3c]">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`group flex items-center h-9 px-3 cursor-pointer text-sm ${
                tab.id === activeTabId ? 'tab-active' : 'tab-inactive'
              }`}
              onClick={() => handleTabClick(tab.id)}
            >
              <span className="mr-2">{tab.fileName}</span>
              <button
                className="opacity-0 group-hover:opacity-100 hover:bg-[#37373d] rounded p-0.5"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTabClose(tab.id);
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex-1 p-4">
        {activeFile ? (
          <textarea
            value={activeFile.content}
            onChange={(e) => handleContentChange(e.target.value)}
            className="editor-textarea w-full h-full resize-none border border-[#3c3c3c] rounded p-4"
            placeholder="Start typing..."
            spellCheck={false}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No file selected
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;