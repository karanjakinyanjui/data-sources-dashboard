import React, { useEffect, useState } from 'react';
import { LayoutDashboard } from 'lucide-react';
import { DataSourceForm } from './components/DataSourceForm';
import { DataSourceList } from './components/DataSourceList';
import { addDataSource, getAllDataSources, deleteDataSource, type DataSource } from './lib/db';

function App() {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);

  useEffect(() => {
    loadDataSources();
  }, []);

  const loadDataSources = async () => {
    const sources = await getAllDataSources();
    setDataSources(sources);
  };

  const handleAddDataSource = async (name: string, url: string) => {
    await addDataSource({ name, url });
    loadDataSources();
  };

  const handleDeleteDataSource = async (id: number) => {
    await deleteDataSource(id);
    loadDataSources();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-3 mb-8">
          <LayoutDashboard className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Data Sources Dashboard</h1>
        </div>
        
        <div className="grid gap-8 md:grid-cols-[400px,1fr]">
          <div>
            <h2 className="text-lg font-medium mb-4">Add New Data Source</h2>
            <DataSourceForm onSubmit={handleAddDataSource} />
          </div>
          
          <div>
            <h2 className="text-lg font-medium mb-4">Your Data Sources</h2>
            <DataSourceList 
              dataSources={dataSources} 
              onDelete={handleDeleteDataSource}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;