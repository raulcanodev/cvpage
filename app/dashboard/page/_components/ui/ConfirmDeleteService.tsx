import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Button,
} from '@/components/ui';
import { Trash2 } from 'lucide-react';

interface ConfirmDeleteServiceProps {
  serviceId: string;
  onDelete: (serviceId: string) => Promise<void>;
}

export function ConfirmDeleteService({ serviceId, onDelete }: ConfirmDeleteServiceProps) {
  const handleDelete = async () => {
    try {
      await onDelete(serviceId);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button aria-label="Delete service" className="hover:text-red-600 transition-colors">
          <Trash2 className="w-5 h-5 text-zinc-400 dark:text-zinc-400" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6 rounded-lg shadow-lg bg-white dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-zinc-900 dark:text-white">
            Delete Service
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            This action cannot be undone. This will permanently delete the service from your
            profile.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex justify-center gap-4">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="w-full sm:w-auto text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-red-600 hover:bg-red-800 text-white"
              onClick={handleDelete}
            >
              Delete Service
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}