import { Download, FileImage, FileText, FileJson, Upload } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu';
import { ExportService } from '@/services/export-service/ExportService';
import { useDashboardStore } from '@/core/stores/dashboardStore';
import { useRef } from 'react';

export function ExportMenu() {
  const { currentDashboard } = useDashboardStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportPNG = async () => {
    const canvas = document.getElementById('dashboard-canvas');
    if (!canvas || !currentDashboard) return;

    try {
      await ExportService.exportToPNG(canvas as HTMLElement, `${currentDashboard.name}.png`);
    } catch (error) {
      alert('Ошибка экспорта в PNG');
    }
  };

  const handleExportPDF = async () => {
    const canvas = document.getElementById('dashboard-canvas');
    if (!canvas || !currentDashboard) return;

    try {
      await ExportService.exportToPDF(canvas as HTMLElement, `${currentDashboard.name}.pdf`);
    } catch (error) {
      alert('Ошибка экспорта в PDF');
    }
  };

  const handleExportJSON = () => {
    if (!currentDashboard) return;

    try {
      ExportService.exportToJSON(currentDashboard, `${currentDashboard.name}.json`);
    } catch (error) {
      alert('Ошибка экспорта в JSON');
    }
  };

  const handleImportJSON = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const dashboard = await ExportService.importFromJSON(file);
      useDashboardStore.getState().setCurrentDashboard(dashboard);
    } catch (error) {
      alert('Ошибка импорта JSON: ' + (error instanceof Error ? error.message : 'Неизвестная ошибка'));
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImportJSON}
        className="hidden"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Экспорт
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleExportPNG}>
            <FileImage className="w-4 h-4 mr-2" />
            PNG
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportPDF}>
            <FileText className="w-4 h-4 mr-2" />
            PDF
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportJSON}>
            <FileJson className="w-4 h-4 mr-2" />
            JSON
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
            <Upload className="w-4 h-4 mr-2" />
            Импорт JSON
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

