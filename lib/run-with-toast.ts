import toast from "react-hot-toast";

type ToastMessages = {
  error: string;
  connectionError: string;
  success: string;
};

type ActionResult = {
  error?: { message?: string } | null;
};

export async function runWithToast<T extends ActionResult>(
  setLoading: (loading: boolean) => void,
  action: () => Promise<T>,
  messages: ToastMessages,
): Promise<boolean> {
  setLoading(true);

  try {
    const { error } = await action();
    if (error) {
      toast.error(error.message || messages.error);
      return false;
    }

    toast.success(messages.success);
    return true;
  } catch {
    toast.error(messages.connectionError);
    return false;
  } finally {
    setLoading(false);
  }
}
