import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Edit } from 'lucide-react';
import { dashboardApi } from '@/lib/api/dashboards';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { format } from 'date-fns';

export function DashboardListPage() {
  const { data: dashboards, isLoading } = useQuery({
    queryKey: ['dashboards'],
    queryFn: () => dashboardApi.getAll(),
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
        <h1 className="text-3xl font-bold">Мои дашборды</h1>
        <Link to="/dashboards/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Создать дашборд
          </Button>
        </Link>
      </div>

      {!dashboards || dashboards.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">У вас пока нет дашбордов</p>
            <Link to="/dashboards/new">
              <Button>Создать первый дашборд</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboards.map((dashboard) => (
            <Card key={dashboard.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{dashboard.name}</CardTitle>
                {dashboard.description && (
                  <CardDescription>{dashboard.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  <p>Виджетов: {dashboard.widgets.length}</p>
                  <p>
                    Обновлено:{' '}
                    {format(new Date(dashboard.updatedAt), 'dd MMM yyyy')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link to={`/dashboards/${dashboard.id}`} className="flex-1">
                    <Button variant="default" className="w-full">
                      <Edit className="w-4 h-4 mr-2" />
                      Открыть
                    </Button>
                  </Link>
                  <Button variant="destructive" size="icon">
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

