import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DATA_SOURCE_TYPES, AUTH_TYPES } from '@/core/constants';
import type { DataSource } from '../types';
import { useDataSourceStore } from '@/core/stores/dataSourceStore';
import { dataSourceApi } from '@/lib/api/dataSources';
import { useState } from 'react';

const schema = z.object({
  name: z.string().min(1, 'Обязательное поле'),
  type: z.enum(['rest_api', 'graphql', 'csv', 'excel', 'google_analytics', 'google_sheets']),
  url: z.string().optional(),
  endpoint: z.string().optional(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE']).optional(),
  authType: z.enum(['none', 'bearer', 'basic', 'oauth2']).optional(),
  token: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  cacheTTL: z.number().optional(),
  refreshInterval: z.number().optional(),
});

type FormData = z.infer<typeof schema>;

interface DataSourceFormProps {
  dataSource?: DataSource;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function DataSourceForm({ dataSource, onSuccess, onCancel }: DataSourceFormProps) {
  const { addDataSource, updateDataSource } = useDataSourceStore();
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message?: string } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: dataSource
      ? {
          name: dataSource.name,
          type: dataSource.type,
          url: dataSource.config.url,
          endpoint: dataSource.config.endpoint,
          method: dataSource.config.method || 'GET',
          authType: dataSource.auth?.type || 'none',
          token: dataSource.auth?.token,
          username: dataSource.auth?.username,
          password: dataSource.auth?.password,
          cacheTTL: dataSource.cacheTTL ? dataSource.cacheTTL / 1000 : undefined,
          refreshInterval: dataSource.refreshInterval ? dataSource.refreshInterval / 60000 : undefined,
        }
      : {
          type: 'rest_api',
          method: 'GET',
          authType: 'none',
        },
  });

  const selectedType = watch('type');
  const authType = watch('authType');

  const handleTest = async (data: FormData) => {
    setIsTesting(true);
    setTestResult(null);

    try {
      const result = await dataSourceApi.test({
        name: data.name,
        type: data.type,
        config: {
          url: data.url,
          endpoint: data.endpoint,
          method: data.method,
        },
        auth:
          data.authType && data.authType !== 'none'
            ? {
                type: data.authType,
                token: data.token,
                username: data.username,
                password: data.password,
              }
            : undefined,
      });

      setTestResult({ success: result.success, message: result.message });
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : 'Ошибка тестирования',
      });
    } finally {
      setIsTesting(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const sourceData = {
        name: data.name,
        type: data.type,
        config: {
          url: data.url,
          endpoint: data.endpoint,
          method: data.method,
        },
        auth:
          data.authType && data.authType !== 'none'
            ? {
                type: data.authType,
                token: data.token,
                username: data.username,
                password: data.password,
              }
            : undefined,
        cacheTTL: data.cacheTTL ? data.cacheTTL * 1000 : undefined,
        refreshInterval: data.refreshInterval ? data.refreshInterval * 60000 : undefined,
      };

      if (dataSource) {
        const updated = await dataSourceApi.update(dataSource.id, sourceData);
        updateDataSource(dataSource.id, updated);
      } else {
        const created = await dataSourceApi.create(sourceData);
        addDataSource(created);
      }

      onSuccess?.();
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Ошибка сохранения источника данных');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dataSource ? 'Редактировать источник' : 'Новый источник данных'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Название</Label>
            <Input {...register('name')} placeholder="Мой REST API" />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label>Тип источника</Label>
            <Select {...register('type')} defaultValue={selectedType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(DATA_SOURCE_TYPES).map(([key, value]) => (
                  <SelectItem key={value} value={value}>
                    {key.replace('_', ' ').toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(selectedType === 'rest_api' || selectedType === 'graphql') && (
            <>
              <div>
                <Label>URL</Label>
                <Input {...register('url')} placeholder="https://api.example.com" />
              </div>

              <div>
                <Label>Endpoint</Label>
                <Input {...register('endpoint')} placeholder="/api/data" />
              </div>

              {selectedType === 'rest_api' && (
                <div>
                  <Label>Метод</Label>
                  <Select {...register('method')} defaultValue="GET">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label>Тип авторизации</Label>
                <Select {...register('authType')} defaultValue="none">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(AUTH_TYPES).map(([key, value]) => (
                      <SelectItem key={value} value={value}>
                        {key === 'NONE' ? 'Нет' : key.replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {authType === 'bearer' && (
                <div>
                  <Label>Bearer Token</Label>
                  <Input {...register('token')} type="password" placeholder="your-token" />
                </div>
              )}

              {authType === 'basic' && (
                <>
                  <div>
                    <Label>Username</Label>
                    <Input {...register('username')} placeholder="username" />
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input {...register('password')} type="password" placeholder="password" />
                  </div>
                </>
              )}
            </>
          )}

          {selectedType === 'google_sheets' && (
            <>
              <div>
                <Label>Sheet ID</Label>
                <Input {...register('endpoint')} placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms" />
              </div>
              <div>
                <Label>Range</Label>
                <Input {...register('url')} placeholder="A1:D10" />
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Cache TTL (секунды)</Label>
              <Input {...register('cacheTTL', { valueAsNumber: true })} type="number" placeholder="300" />
            </div>
            <div>
              <Label>Refresh Interval (минуты)</Label>
              <Input
                {...register('refreshInterval', { valueAsNumber: true })}
                type="number"
                placeholder="5"
              />
            </div>
          </div>

          {testResult && (
            <div
              className={`p-3 rounded ${
                testResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {testResult.message || (testResult.success ? 'Подключение успешно' : 'Ошибка подключения')}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleSubmit(handleTest)}
              disabled={isTesting}
            >
              {isTesting ? 'Тестирование...' : 'Тест подключения'}
            </Button>
            <div className="flex-1" />
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Отмена
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Сохранение...' : dataSource ? 'Сохранить' : 'Создать'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

