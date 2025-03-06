import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronRight, ChevronDown, Folder, FileText, Plus, MoreVertical } from 'lucide-react';
import { RootState } from '../store/store';
import { createFile, createFolder, toggleFolder, openTab } from '../store/editorSlice';
import { Node } from '../types/editor';

interface FileExplorerItemProps {
  node: Node;
  level: number;
}

const FileExplorerItem: React.FC<FileExplorerItemProps> = ({ node, level }) => {
  const dispatch = useDispatch();
  const nodes = useSelector((state: RootState) => state.editor.nodes);
  const [isCreating, setIsCreating] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemType, setNewItemType] = useState<'file' | 'folder' | null>(null);
  const [showContextMenu, setShowContextMenu] = useState(false);

  const childNodes = nodes.filter((n) => n.parentId === node.id);

  const handleCreate = (type: 'file' | 'folder') => {
    setNewItemType(type);
    setIsCreating(true);
    setShowContextMenu(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName && newItemType) {
      if (newItemType === 'file') {
        dispatch(createFile({ name: newItemName, parentId: node.id }));
      } else {
        dispatch(createFolder({ name: newItemName, parentId: node.id }));
      }
      setNewItemName('');
      setIsCreating(false);
      setNewItemType(null);
    }
  };

  const handleClick = () => {
    if (node.type === 'folder') {
      dispatch(toggleFolder(node.id));
    } else {
      dispatch(openTab({ fileId: node.id, fileName: node.name }));
    }
  };

  return (
    <div>
      <div
        className="file-explorer-item flex items-center py-1.5 px-2 cursor-pointer text-sm relative group"
        style={{ paddingLeft: `${level * 12}px` }}
      >
        <div className="flex items-center flex-1 group" onClick={handleClick}>
          {node.type === 'folder' && (
            <>
              {(node as FolderNode).isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
              <Folder className="w-4 h-4 ml-1 text-[#dcb67a]" />
            </>
          )}
          {node.type === 'file' && <FileText className="w-4 h-4 ml-5 text-[#8fa7b5]" />}
          <span className="ml-2 group-hover:text-white truncate">{node.name}</span>
        </div>
        
        {node.type === 'folder' && (
          <div className="flex items-center">
            <div className="flex space-x-1 opacity-0 group-hover:opacity-100">
              <button
                className="p-1 hover:bg-[#37373d] rounded"
                onClick={() => handleCreate('file')}
                title="New File"
              >
                <Plus className="w-3.5 h-3.5 text-gray-400" />
              </button>
              <button
                className="p-1 hover:bg-[#37373d] rounded"
                onClick={() => handleCreate('folder')}
                title="New Folder"
              >
                <Folder className="w-3.5 h-3.5 text-gray-400" />
              </button>
              <button
                className="p-1 hover:bg-[#37373d] rounded"
                onClick={() => setShowContextMenu(!showContextMenu)}
                title="More Actions"
              >
                <MoreVertical className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>

            {showContextMenu && (
              <div className="absolute right-0 top-full mt-1 bg-[#252526] border border-[#3c3c3c] rounded shadow-lg z-10">
                <div className="py-1">
                  <button
                    className="w-full px-4 py-1.5 text-left text-sm hover:bg-[#37373d] text-gray-300"
                    onClick={() => handleCreate('file')}
                  >
                    New File
                  </button>
                  <button
                    className="w-full px-4 py-1.5 text-left text-sm hover:bg-[#37373d] text-gray-300"
                    onClick={() => handleCreate('folder')}
                  >
                    New Folder
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {isCreating && (
        <form onSubmit={handleSubmit} className="ml-8">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder={`New ${newItemType}`}
            className="w-full px-2 py-1 text-sm bg-[#3c3c3c] border border-[#0078d4] rounded text-white focus:outline-none"
            autoFocus
            onBlur={() => {
              setIsCreating(false);
              setNewItemName('');
            }}
          />
        </form>
      )}

      {node.type === 'folder' && (node as FolderNode).isExpanded && (
        <div>
          {childNodes.map((childNode) => (
            <FileExplorerItem key={childNode.id} node={childNode} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const FileExplorer: React.FC = () => {
  const dispatch = useDispatch();
  const nodes = useSelector((state: RootState) => state.editor.nodes);
  const rootNodes = nodes.filter((node) => node.parentId === null);
  const [showContextMenu, setShowContextMenu] = useState(false);

  const handleCreateRoot = (type: 'file' | 'folder') => {
    const name = prompt(`Enter ${type} name:`);
    if (name) {
      if (type === 'file') {
        dispatch(createFile({ name, parentId: null }));
      } else {
        dispatch(createFolder({ name, parentId: null }));
      }
    }
  };

  return (
    <div className="w-64 bg-[#252526] border-r border-[#3c3c3c] h-screen overflow-y-auto">
      <div className="p-4 border-b border-[#3c3c3c] flex justify-between items-center">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-gray-400">Explorer</h2>
        <div className="flex space-x-1">
          <button
            className="p-1 hover:bg-[#37373d] rounded group"
            onClick={() => handleCreateRoot('file')}
            title="New File"
          >
            <Plus className="w-4 h-4 text-gray-400 group-hover:text-white" />
          </button>
          <button
            className="p-1 hover:bg-[#37373d] rounded group"
            onClick={() => handleCreateRoot('folder')}
            title="New Folder"
          >
            <Folder className="w-4 h-4 text-gray-400 group-hover:text-white" />
          </button>
          <button
            className="p-1 hover:bg-[#37373d] rounded group"
            onClick={() => setShowContextMenu(!showContextMenu)}
            title="More Actions"
          >
            <MoreVertical className="w-4 h-4 text-gray-400 group-hover:text-white" />
          </button>
        </div>
      </div>
      <div className="py-2">
        {rootNodes.map((node) => (
          <FileExplorerItem key={node.id} node={node} level={1} />
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;