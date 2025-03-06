import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import FileExplorer from './components/FileExplorer';
import Editor from './components/Editor';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="flex h-screen overflow-hidden">
          <FileExplorer />
          <Editor />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;