export interface FileNode {
  id: string;
  name: string;
  type: 'file';
  content: string;
  parentId: string | null;
}

export interface FolderNode {
  id: string;
  name: string;
  type: 'folder';
  isExpanded: boolean;
  parentId: string | null;
}

export type Node = FileNode | FolderNode;

export interface Tab {
  id: string;
  fileId: string;
  fileName: string;
}

export interface EditorState {
  nodes: Node[];
  activeTabId: string | null;
  tabs: Tab[];
}