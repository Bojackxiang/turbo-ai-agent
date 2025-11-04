import { api } from "@repo/backend/convex/_generated/api";
import { useAction } from "convex/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAssistants } from "../../../packages/backend/convex/private/vapi";

type PhoneNumbers = typeof api.private.vapi.getPhoneNumber._returnType;
type Assistants = typeof api.private.vapi.getAssistants._returnType;

export const useVapiNumbers = (): {
  data: PhoneNumbers;
  error: Error | null;
  loading: boolean;
} => {
  const [data, setData] = useState<PhoneNumbers>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const phoneNumbersAction = useAction(api.private.vapi.getPhoneNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await phoneNumbersAction();
        setData(result);
        setError(null);
      } catch (error) {
        setError(error as Error);
        console.error((error as Error).message);
        toast.error("Fail to get phone numbers");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
  };
};

export const useVapiAssistants = (): {
  data: Assistants;
  error: Error | null;
  loading: boolean;
} => {
  const [data, setData] = useState<Assistants>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const useAssistantAction = useAction(api.private.vapi.getAssistants);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await useAssistantAction();
        setData(result);
        setError(null);
      } catch (error) {
        setError(error as Error);
        console.error((error as Error).message);
        toast.error("Fail to get assistants");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
  };
};
