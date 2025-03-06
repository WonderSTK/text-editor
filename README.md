# VS Code-like Text Editor

A lightweight, web-based text editor inspired by Visual Studio Code, built with modern web technologies. This editor provides essential features for managing and editing text files with a familiar and intuitive interface.

## 🚀 Features

### File Management
- **File Creation**: Create new `.txt` files anywhere in the file hierarchy
- **Folder Organization**: Create and manage folders for better file organization
- **Nested Structure**: Support for nested folders and files
- **Context Menu**: Right-click menu for quick file and folder operations

### Editor Features
- **Multi-tab Editing**: Open multiple files in tabs
- **Tab Management**: 
  - Switch between open files
  - Close tabs individually
  - Visual indication of active tab
- **File Explorer**:
  - Tree view of files and folders
  - Expand/collapse folders
  - Quick actions for file/folder creation
  - Visual hover states and interactions

### Persistence
- **State Preservation**: All files, folders, and content persist across page reloads
- **Tab State**: Open tabs and their content are preserved

## 🛠️ Technology Stack

### Core Technologies
- **React**: UI framework for building the interface
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework for styling

### State Management
- **Redux Toolkit**: Efficient state management
- **Redux Persist**: State persistence across sessions

### UI Components
- **Lucide React**: Modern icon set
- **Custom Components**: 
  - File Explorer
  - Tab System
  - Text Editor

## 📁 Project Structure

```
src/
├── components/
│   ├── Editor.tsx        # Main editor component
│   └── FileExplorer.tsx  # File tree navigation
├── store/
│   ├── editorSlice.ts    # Redux state management
│   └── store.ts          # Redux store configuration
├── types/
│   └── editor.ts         # TypeScript definitions
├── App.tsx               # Root component
└── main.tsx             # Application entry point
```

## 🎨 Design Features

- VS Code-inspired dark theme
- Professional color scheme
- Intuitive icons and visual feedback
- Responsive layout
- Clean typography

## 💻 Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## 🔧 Technical Implementation

### State Management
- Uses Redux Toolkit for predictable state management
- Implements file system operations through actions
- Persists state using redux-persist

### File System
- Virtual file system implementation
- Support for nested folder structures
- Unique IDs for files and folders
- Parent-child relationship tracking

### UI Components
- Modular component architecture
- Reusable UI elements
- Consistent styling with Tailwind CSS
- Responsive design patterns



