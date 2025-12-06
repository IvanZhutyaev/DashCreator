import { Save, PanelLeft, PanelRight, Undo, Redo } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useDashboardStore } from '@/core/stores/dashboardStore';
import { Input } from '@/components/ui/Input';
import { ExportMenu } from '@/modules/sharing/components/ExportMenu';
import { RealtimeIndicator } from './RealtimeIndicator';

interface ToolbarProps {
  onSave: () => void;
  onToggleLeftPanel: () => void;
  onToggleRightPanel: () => void;
}

export function Toolbar({ onSave, onToggleLeftPanel, onToggleRightPanel }: ToolbarProps) {
  const { currentDashboard, updateDashboard, undo, redo, canUndo, canRedo } =
    useDashboardStore();

  return (
    <div className="h-14 border-b bg-background flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onToggleLeftPanel}>
          <PanelLeft className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onToggleRightPanel}>
          <PanelRight className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-2" />
        <Button variant="ghost" size="icon" onClick={undo} disabled={!canUndo()}>
          <Undo className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={redo} disabled={!canRedo()}>
          <Redo className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-2" />
        <RealtimeIndicator />
      </div>

      <div className="flex items-center gap-4">
        {currentDashboard && (
          <Input
            value={currentDashboard.name}
            onChange={(e) => updateDashboard({ name: e.target.value })}
            className="w-64"
            placeholder="Название дашборда"
          />
        )}
        <ExportMenu />
        <Button onClick={onSave}>
          <Save className="w-4 h-4 mr-2" />
          Сохранить
        </Button>
      </div>
    </div>
  );
}

