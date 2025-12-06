import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { Dashboard } from '@/modules/dashboard/types';

export class ExportService {
  /**
   * Экспорт дашборда в PNG
   */
  static async exportToPNG(element: HTMLElement, filename: string = 'dashboard.png'): Promise<void> {
    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Ошибка экспорта в PNG:', error);
      throw new Error('Не удалось экспортировать в PNG');
    }
  }

  /**
   * Экспорт дашборда в PDF
   */
  static async exportToPDF(
    element: HTMLElement,
    filename: string = 'dashboard.pdf'
  ): Promise<void> {
    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(filename);
    } catch (error) {
      console.error('Ошибка экспорта в PDF:', error);
      throw new Error('Не удалось экспортировать в PDF');
    }
  }

  /**
   * Экспорт дашборда в JSON
   */
  static exportToJSON(dashboard: Dashboard, filename: string = 'dashboard.json'): void {
    try {
      const dataStr = JSON.stringify(dashboard, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Ошибка экспорта в JSON:', error);
      throw new Error('Не удалось экспортировать в JSON');
    }
  }

  /**
   * Импорт дашборда из JSON
   */
  static importFromJSON(file: File): Promise<Dashboard> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const dashboard = JSON.parse(content) as Dashboard;
          resolve(dashboard);
        } catch (error) {
          reject(new Error('Неверный формат JSON файла'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Ошибка чтения файла'));
      };

      reader.readAsText(file);
    });
  }
}

