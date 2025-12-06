import { useState } from 'react';
import { Copy, Check, Globe, Lock, Users, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { useDashboardStore } from '@/core/stores/dashboardStore';
import { dashboardApi } from '@/lib/api/dashboards';
import { DASHBOARD_ACCESS_LEVELS } from '@/core/constants';

export function SharingPanel() {
  const { currentDashboard, updateDashboard } = useDashboardStore();
  const [copied, setCopied] = useState(false);

  if (!currentDashboard) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Выберите дашборд для настройки доступа
        </CardContent>
      </Card>
    );
  }

  const shareUrl = `${window.location.origin}/dashboards/${currentDashboard.id}?share=true`;
  const embedCode = `<iframe src="${shareUrl}" width="100%" height="600" frameborder="0"></iframe>`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAccessChange = async (accessLevel: string) => {
    try {
      await dashboardApi.update(currentDashboard.id, { accessLevel: accessLevel as any });
      updateDashboard({ accessLevel: accessLevel as any });
    } catch (error) {
      alert('Ошибка обновления доступа');
    }
  };

  const getAccessIcon = () => {
    switch (currentDashboard.accessLevel) {
      case 'public':
        return <Globe className="w-4 h-4" />;
      case 'team':
        return <Users className="w-4 h-4" />;
      default:
        return <Lock className="w-4 h-4" />;
    }
  };

  const getAccessLabel = () => {
    switch (currentDashboard.accessLevel) {
      case 'public':
        return 'Публичный';
      case 'team':
        return 'Команда';
      default:
        return 'Приватный';
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Настройки доступа
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Уровень доступа</Label>
            <Select
              value={currentDashboard.accessLevel}
              onValueChange={handleAccessChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Приватный - только вы
                  </div>
                </SelectItem>
                <SelectItem value="team">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Команда - внутри организации
                  </div>
                </SelectItem>
                <SelectItem value="public">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Публичный - доступ по ссылке
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {getAccessIcon()}
            <span>Текущий статус: {getAccessLabel()}</span>
          </div>
        </CardContent>
      </Card>

      {(currentDashboard.accessLevel === 'public' || currentDashboard.accessLevel === 'team') && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Публичная ссылка</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>URL для шеринга</Label>
                <div className="flex gap-2">
                  <Input value={shareUrl} readOnly className="flex-1" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopy(shareUrl)}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <Label>Embed код</Label>
                <div className="flex gap-2">
                  <Input value={embedCode} readOnly className="flex-1 font-mono text-xs" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopy(embedCode)}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Вставьте этот код на ваш сайт для встраивания дашборда
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {currentDashboard.accessLevel === 'private' && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            <Lock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Дашборд приватный. Измените уровень доступа для шеринга.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

