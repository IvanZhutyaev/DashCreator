import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { dataSourceApi } from '@/lib/api/dataSources';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export function DataSourcesPage() {
  const { data: dataSources, isLoading } = useQuery({
    queryKey: ['data-sources'],
    queryFn: () => dataSourceApi.getAll(),
  });

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
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Добавить источник
        </Button>
      </div>

      {!dataSources || dataSources.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">У вас пока нет источников данных</p>
            <Button>Добавить первый источник</Button>
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
                <div className="text-sm text-muted-foreground">
                  <p>TTL: {source.cacheTTL ? `${source.cacheTTL / 1000}s` : 'Не установлен'}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

