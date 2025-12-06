import { Link } from 'react-router-dom';
import { LayoutDashboard, Database, Zap } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            DashCreator
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Low-code платформа для создания бизнес-дашбордов. Создавайте
            профессиональные дашборды за 10-15 минут без программирования.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/dashboards/new"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Создать дашборд
            </Link>
            <Link
              to="/dashboards"
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
            >
              Мои дашборды
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <LayoutDashboard className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Drag & Drop</h3>
            <p className="text-muted-foreground">
              Перетаскивайте виджеты и создавайте дашборды интуитивно
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <Database className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Множество источников</h3>
            <p className="text-muted-foreground">
              Подключайте REST API, GraphQL, CSV, Google Sheets и многое другое
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <Zap className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Быстро и просто</h3>
            <p className="text-muted-foreground">
              От идеи до готового дашборда за 15 минут
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

