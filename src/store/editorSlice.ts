import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { EditorState, FileNode, FolderNode, Node, Tab } from '../types/editor';

const initialState: EditorState = {
  nodes: [],
  activeTabId: null,
  tabs: [],
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    createFolder: (state, action: PayloadAction<{ name: string; parentId: string | null }>) => {
      const newFolder: FolderNode = {
        id: uuidv4(),
        name: action.payload.name,
        type: 'folder',
        isExpanded: true,
        parentId: action.payload.parentId,
      };
      state.nodes.push(newFolder);
    },
    createFile: (state, action: PayloadAction<{ name: string; parentId: string | null }>) => {
      const newFile: FileNode = {
        id: uuidv4(),
        name: action.payload.name.endsWith('.txt') ? action.payload.name : `${action.payload.name}.txt`,
        type: 'file',
        content: '',
        parentId: action.payload.parentId,
      };
      state.nodes.push(newFile);
    },
    toggleFolder: (state, action: PayloadAction<string>) => {
      const folder = state.nodes.find(
        (node): node is FolderNode => node.type === 'folder' && node.id === action.payload
      );
      if (folder) {
        folder.isExpanded = !folder.isExpanded;
      }
    },
    updateFileContent: (state, action: PayloadAction<{ fileId: string; content: string }>) => {
      const file = state.nodes.find(
        (node): node is FileNode => node.type === 'file' && node.id === action.payload.fileId
      );
      if (file) {
        file.content = action.payload.content;
      }
    },
    openTab: (state, action: PayloadAction<{ fileId: string; fileName: string }>) => {
      const existingTab = state.tabs.find((tab) => tab.fileId === action.payload.fileId);
      if (!existingTab) {
        const newTab: Tab = {
          id: uuidv4(),
          fileId: action.payload.fileId,
          fileName: action.payload.fileName,
        };
        state.tabs.push(newTab);
        state.activeTabId = newTab.id;
      } else {
        state.activeTabId = existingTab.id;
      }
    },
    closeTab: (state, action: PayloadAction<string>) => {
      state.tabs = state.tabs.filter((tab) => tab.id !== action.payload);
      if (state.activeTabId === action.payload) {
        state.activeTabId = state.tabs[state.tabs.length - 1]?.id || null;
      }
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTabId = action.payload;
    },
  },
});

export const {
  createFolder,
  createFile,
  toggleFolder,
  updateFileContent,
  openTab,
  closeTab,
  setActiveTab,
} = editorSlice.actions;

export default editorSlice.reducer;