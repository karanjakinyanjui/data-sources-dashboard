import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface DataSourceFormProps {
  onSubmit: (name: string, url: string) => void;
}

export const DataSourceForm: React.FC<DataSourceFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && url) {
      onSubmit(name, url);
      setName('');
      setUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-lg shadow-sm">
      <div className="space-y-2">
        <Label htmlFor="name">Data Source Name</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Analytics API"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/data"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Data Source
      </Button>
    </form>
  );
};