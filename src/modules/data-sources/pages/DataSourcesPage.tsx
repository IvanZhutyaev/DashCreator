import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { dataSourceApi } from '@/lib/api/dataSources';
import { useDataSourceStore } from '@/core/stores/dataSourceStore';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { DataSourceForm } from '../components/DataSourceForm';
import type { DataSource } from '../types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';

export function DataSourcesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSource, setEditingSource] = useState<DataSource | null>(null);
  const { removeDataSource } = useDataSourceStore();

  const { data: dataSources, isLoading, refetch } = useQuery({
    queryKey: ['data-sources'],
    queryFn: () => dataSourceApi.getAll(),
  });

  const handleCreate = () => {
    setEditingSource(null);
    setIsFormOpen(true);
  };

  const handleEdit = (source: DataSource) => {
    setEditingSource(source);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Удалить источник данных?')) {
      try {
        await dataSourceApi.delete(id);
        removeDataSource(id);
      } catch (error) {
        alert('Ошибка удаления');
      }
    }
  };

  const handleSuccess = () => {
    setIsFormOpen(false);
    setEditingSource(null);
    refetch();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Источники данных</h1>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Добавить источник
        </Button>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSource ? 'Редактировать источник' : 'Новый источник данных'}
            </DialogTitle>
          </DialogHeader>
          <DataSourceForm dataSource={editingSource || undefined} onSuccess={handleSuccess} onCancel={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>

      {!dataSources || dataSources.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">У вас пока нет источников данных</p>
            <Button onClick={handleCreate}>Добавить первый источник</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataSources.map((source) => (
            <Card key={source.id}>
              <CardHeader>
                <CardTitle>{source.name}</CardTitle>
                <CardDescription>{source.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4 space-y-1">
                  <p>TTL: {source.cacheTTL ? `${source.cacheTTL / 1000}s` : 'Не установлен'}</p>
                  {source.refreshInterval && (
                    <p>Обновление: каждые {source.refreshInterval / 60000} мин</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(source)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Редактировать
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(source.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
