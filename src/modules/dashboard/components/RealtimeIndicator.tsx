import { Wifi, WifiOff } from 'lucide-react';
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';

export function RealtimeIndicator() {
  const { isConnected } = useRealtimeUpdates(true);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 px-2 py-1 rounded bg-muted">
            {isConnected ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-muted-foreground" />
            )}
            <span className="text-xs text-muted-foreground">
              {isConnected ? 'Real-time' : 'Offline'}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isConnected ? 'Real-time обновления активны' : 'Real-time обновления недоступны'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

