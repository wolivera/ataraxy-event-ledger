
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type StatusType = 'pending' | 'ethereum' | 'bitcoin' | 'verified' | 'failed';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch(status) {
      case 'pending':
        return {
          label: 'Pending',
          variant: 'outline' as const,
          tooltipText: 'Event is being processed'
        };
      case 'ethereum':
        return {
          label: 'Ethereum',
          variant: 'secondary' as const,
          tooltipText: 'Anchored on Ethereum (Polygon)'
        };
      case 'bitcoin':
        return {
          label: 'Bitcoin',
          variant: 'default' as const,
          tooltipText: 'Anchored on Bitcoin'
        };
      case 'verified':
        return {
          label: 'Verified',
          variant: 'success' as const,
          tooltipText: 'Event verified successfully'
        };
      case 'failed':
        return {
          label: 'Failed',
          variant: 'destructive' as const,
          tooltipText: 'Event verification failed'
        };
      default:
        return {
          label: status,
          variant: 'outline' as const,
          tooltipText: 'Status information'
        };
    }
  };

  const { label, variant, tooltipText } = getStatusConfig();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant={variant} 
            className={cn(
              "capitalize",
              variant === 'success' && "bg-green-500 hover:bg-green-600",
              status === 'ethereum' && "bg-ataraxy-purple hover:bg-ataraxy-purple-secondary text-white",
              status === 'bitcoin' && "bg-amber-500 hover:bg-amber-600",
              className
            )}
          >
            {label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
